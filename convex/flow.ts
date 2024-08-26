import { v } from "convex/values";
import { mutation } from "./_generated/server"

const images = [
    "/empty.png",
]

export const create = mutation({
    args: {
        orgId: v.string(),
        title: v.string(),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Não Autorizado");
        }

        const randomImage = images[Math.floor(Math.random() * images.length)];

        const flow = await ctx.db.insert("flows", {
            title: args.title,
            orgId: args.orgId,
            authorId: identity.subject,
            authorName: identity.name!,
            imageUrl: randomImage,
        });

        return flow
    }
})