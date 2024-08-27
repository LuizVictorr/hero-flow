"use client"

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "../../hooks/use-api-mutation";
import { api } from "../../convex/_generated/api";
import { ConfirmModal } from "./modals/confirm-modal";
import { Button } from "./ui/button";
import { useRenameModal } from "../../store/use-rename-modal";

interface ActionsProps {
    children: React.ReactNode;
    side?: DropdownMenuContentProps["side"];
    sideOffset?: DropdownMenuContentProps["sideOffset"];
    id: string;
    title: string;
}

export const Actions = ({ children, side, sideOffset, id, title }: ActionsProps) => {

    const { onOpen } = useRenameModal();

    const { mutate, pending } = useApiMutation(api.flow.remove)

    const onCopyLink = () => {
        navigator.clipboard.writeText(
            `${window.location.origin}/board/${id}`,
        )
            .then(() => toast.success("Link copiado"))
            .catch(() => toast.error("Falha ao copiar o link"))
    }

    const onDelete = () => {
        mutate({ id })
            .then(() => toast.success("Flow deletado"))
            .catch(() => toast.error("Falha ao deletar flow"))
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent
                onClick={(e) => e.stopPropagation()}
                side={side}
                sideOffset={sideOffset}
                className="w-60"
            >
                <DropdownMenuItem
                    className="p-3 cursor-pointer"
                    onClick={onCopyLink}
                >
                    <Link2 className="h-4 w-4 mr-2" />
                    Copiar link do flow
                </DropdownMenuItem>
                <DropdownMenuItem
                    className="p-3 cursor-pointer"
                    onClick={() => onOpen(id, title)}
                >
                    <Pencil className="h-4 w-4 mr-2" />
                    Renomear
                </DropdownMenuItem>
                <ConfirmModal
                    header="Deletar flow"
                    description="você está preste a deletar esse flow e todo seu conteúdo"
                    disabled={pending}
                    onConfirm={onDelete}

                >
                    <Button
                        variant="ghost"
                        className="p-3 cursor-pointer text-sm w-full justify-start font-normal"
                    >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                    </Button>
                </ConfirmModal>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}