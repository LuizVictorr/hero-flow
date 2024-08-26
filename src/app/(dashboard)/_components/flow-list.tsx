import { EmptyFavorites } from "./empty-favorites";
import { EmptyFlow } from "./empty-flow";
import { EmptySearch } from "./empty-search";


interface FlowListProps {
    orgId: string;
    query: {
        search?: string;
        favorites?: string;
    };
}

export const FlowList = ({ orgId, query }: FlowListProps) => {

    const data = [];

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
            {JSON.stringify(query)}
        </div>
    )
}