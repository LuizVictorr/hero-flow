import { Canvas } from "./_components/canvas";
import { Room } from "@/components/room";
import { Loading } from "./_components/loading";

interface FlowIdPageProps {
    params: {
        flowId: string;
    };
};

const FlowIdPage = ({ params }: FlowIdPageProps) => {

    return (
        <Room roomId={params.flowId} fallback={<Loading />}>
            <Canvas flowId={params.flowId} />
        </Room>
    )
}

export default FlowIdPage;