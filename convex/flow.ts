import { v } from "convex/values";
import { mutation } from "./_generated/server"

const images = [
    "/flow-image-example.png",
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

export const remove = mutation({
    args: { id: v.id("flows") },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Não autorizado");
        }

        const userId = identity.subject

        const existingFavorite = await ctx.db.query("userFavorites")
            .withIndex("by_user_flow", (q) => q.eq("userId", userId)
                .eq("flowId", args.id)
            )
            .unique();

        if (existingFavorite) {
            await ctx.db.delete(existingFavorite._id)
        }

        await ctx.db.delete(args.id)
    }
})

export const update = mutation({
    args: { id: v.id("flows"), title: v.string() },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Não Autorizado")
        }

        const title = args.title.trim();

        if (!title) {
            throw new Error("Título é necessário")
        }

        if (title.length > 60) {
            throw new Error("Titulo deve ser menor que 60 caracteres")
        }

        const flow = await ctx.db.patch(args.id, {
            title: args.title,
        });

        return flow
    }
})

export const favorite = mutation({
    args: {
        id: v.id("flows"),
        orgId: v.string()
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Não Autorizado");
        }

        const flow = await ctx.db.get(args.id);

        if (!flow) {
            throw new Error("Flow não encontrado");
        }

        const userId = identity.subject;

        const existingFavorite = await ctx.db.query("userFavorites")
            .withIndex("by_user_flow", (q) => q
                .eq("userId", userId)
                .eq("flowId", flow._id)
            )
            .unique()

        if (existingFavorite) {
            throw new Error("Flow já foi favoritado")
        }

        await ctx.db.insert("userFavorites", {
            userId: userId,
            flowId: flow._id,
            orgId: args.id,
        })

        return flow
    }
});

export const unfavorite = mutation({
    args: {
        id: v.id("flows"),
        orgId: v.string()
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Não Autorizado");
        }

        const flow = await ctx.db.get(args.id);

        if (!flow) {
            throw new Error("Flow não encontrado");
        }

        const userId = identity.subject;

        const existingFavorite = await ctx.db.query("userFavorites")
            .withIndex("by_user_flow", (q) => q
                .eq("userId", userId)
                .eq("flowId", flow._id)
            )
            .unique()

        if (!existingFavorite) {
            throw new Error("Flow não foi favoritado")
        }

        await ctx.db.delete(existingFavorite._id);

        return flow
    }
});


