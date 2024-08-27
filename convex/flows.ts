import { v } from "convex/values";
import { query } from "./_generated/server";
import { getAllOrThrow } from "convex-helpers/server/relationships"

export const get = query({
    args: {
        orgId: v.string(),
        search: v.optional(v.string()),
        favorites: v.optional(v.string())
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Não Autorizado");
        }

        console.log("Valor de args.favorites:", args);

        if (args.favorites) {
            const favoritedFlows = await ctx.db.query("userFavorites")
                .withIndex("by_user", (q) => q.eq("userId", identity.subject)
                )
                .order("desc")
                .collect();

            const ids = favoritedFlows.map((f) => f.flowId);

            const flows = await getAllOrThrow(ctx.db, ids)

            return flows.map((flow) => ({
                ...flow,
                isFavorite: true,
            }));
        }

        let flows = []
        const title = args.search as string;

        if (title) {
            flows = await ctx.db.query("flows")
                .withSearchIndex("search_title", (q) => q.search("title", title)
                    .eq("orgId", args.orgId)
                )
                .collect();

        } else {
            flows = await ctx.db.query("flows")
                .withIndex("by_org", (q) => q.eq("orgId", args.orgId))
                .order("desc")
                .collect();
        }

        const flowsWithFavoriteRelation = flows.map((flow) => {
            return ctx.db.query("userFavorites")
                .withIndex("by_user_flow", (q) => q.eq("userId", identity.subject)
                    .eq("flowId", flow._id)
                )
                .unique()
                .then((favorite) => {
                    return {
                        ...flow,
                        isFavorite: !!favorite,
                    };
                });
        });

        const flowsWithFavoriteBoolean = Promise.all(flowsWithFavoriteRelation)

        return flowsWithFavoriteBoolean;
    }
});