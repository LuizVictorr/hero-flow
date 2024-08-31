import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
    secret: "sk_dev_8BTvNdqW6nn59eZT6otjI_hUiGcqDVhgU3oHK7cSRoG8WHFS4v080uCZjfjQsbG4",
});

export async function POST(request: Request) {

    const authorization = await auth();
    const user = await currentUser();

    if (!authorization || !user) {
        return new Response("Não Autorizado", { status: 403 });
    }

    const { room } = await request.json();
    const flow = await convex.query(api.flow.get, { id: room });

    if (flow?.orgId !== authorization.orgId) {
        return new Response("Não Autorizado", { status: 403 });
    }

    const userInfo = {
        name: user.firstName || "Companheiro",
        avatar: user.imageUrl,
    };

    const session = liveblocks.prepareSession(
        user.id,
        { userInfo: userInfo }
    );

    if (room) {
        session.allow(room, session.FULL_ACCESS);
    }


    const { status, body } = await session.authorize();
    return new Response(body, { status });

};