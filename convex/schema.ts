import { v } from "convex/values"
import { defineSchema, defineTable } from "convex/server"

export default defineSchema({
    flows: defineTable({
        title: v.string(),
        orgId: v.string(),
        authorId: v.string(),
        authorName: v.string(),
        imageUrl: v.string(),
    })
        .index("by_org", ["orgId"])
        .searchIndex("search_title", {
            searchField: "title",
            filterFields: ["orgId"]
        }),

    userFavorites: defineTable({
        orgId: v.string(),
        userId: v.string(),
        flowId: v.id("flows")
    })
        .index("by_flow", ["flowId"])
        .index("by_user", ["userId"])
        .index("by_user_org", ["userId", "orgId"])
        .index("by_user_flow", ["userId", "flowId"])
        .index("by_user_flow_org", ["userId", "flowId", "orgId"])
});