"use client"

import { cn } from "@/lib/utils";
import { PlusCircle } from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import { useApiMutation } from "../../../../hooks/use-api-mutation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface NewFlowButtonProps {
    orgId: string;
    disabled?: boolean;
}

export const NewFlowButton = ({ disabled, orgId }: NewFlowButtonProps) => {

    const { mutate, pending } = useApiMutation(api.flow.create);
    const router = useRouter();

    const onClick = () => {
        mutate({
            orgId: orgId,
            title: "Novo Flow",
        })
            .then((id) => {
                toast.success("Flow criado com sucesso")
                router.push(`/flow/${id}`)
            })
            .catch(() => toast.error("Falha ao criar seu flow"));
    }

    return (
        <button
            disabled={pending || disabled}
            onClick={onClick}
            className={cn(
                "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",
                (pending || disabled) && "opacity-75 hover:bg-blue-600"
            )}
        >
            <div />
            <PlusCircle className="h-12 w-12 text-white stroke-1" />
            <p className="text-sm text-white font-light mt-3">
                Novo Flow
            </p>
        </button>
    )
}