"use client"

import { useQuery } from "convex/react";
import { EmptyFavorites } from "./empty-favorites";
import { EmptyFlow } from "./empty-flow";
import { EmptySearch } from "./empty-search";
import { api } from "../../../../convex/_generated/api";
import { FlowCard } from "./flow-card";
import { NewFlowButton } from "./new-flow-button";


interface FlowListProps {
    orgId: string;
    query: {
        search?: string;
        favorites?: string;
    };
}

export const FlowList = ({ orgId, query }: FlowListProps) => {

    const data = useQuery(api.flows.get, { orgId, search: query.search, favorites: query.favorites });

    if (data === undefined) {
        return (
            <div>
                <h2 className="text-3xl">
                    {query.favorites ? "Flows Favoritos" : "Flows do Time"}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
                    <NewFlowButton orgId={orgId} disabled />
                    <FlowCard.Skeleton />
                    <FlowCard.Skeleton />
                    <FlowCard.Skeleton />
                </div>
            </div>
        )
    }

    if (!data?.length && query.search) {
        return (
            <EmptySearch />
        );
    }

    if (!data?.length && query.favorites) {
        return (
            <EmptyFavorites />
        )
    }

    if (!data?.length) {
        return (
            <EmptyFlow />
        )
    }

    return (
        <div>
            <h2 className="text-3xl">
                {query.favorites ? "Flows Favoritos" : "Flows do Time"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
                <NewFlowButton orgId={orgId} />
                {data?.map((flow) => (
                    <FlowCard
                        key={flow._id}
                        id={flow._id}
                        title={flow.title}
                        imageUrl={flow.imageUrl}
                        authorId={flow.authorId}
                        authorName={flow.authorName}
                        createAt={flow._creationTime}
                        orgId={flow.orgId}
                        isFavorite={flow.isFavorite}
                    />
                ))}
            </div>
        </div>
    )
}