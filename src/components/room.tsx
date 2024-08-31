"use client"

import { ReactNode } from "react"
import { ClientSideSuspense, LiveblocksProvider, RoomProvider } from "@liveblocks/react"
import { LiveList, LiveMap, LiveObject } from "@liveblocks/client";
import { Layer } from "../../types/canvas";

interface RoomProps {
    children: ReactNode;
    roomId: string
    fallback: NonNullable<ReactNode> | null
}

export const Room = ({ children, roomId, fallback }: RoomProps) => {

    const authEndpoint = "/api/liveblocks-auth"

    return (
        <LiveblocksProvider authEndpoint={authEndpoint}>
            <RoomProvider
                id={roomId}
                initialPresence={{
                    cursor: null,
                    selection: []

                }}
                initialStorage={{
                    layers: new LiveMap<string, LiveObject<Layer>>(),
                    layerIds: new LiveList([]),
                }}
            >
                <ClientSideSuspense fallback={fallback}>
                    {() => children}
                </ClientSideSuspense>
            </RoomProvider>
        </LiveblocksProvider>
    )
}