"use client"

import { DialogTitle } from "@radix-ui/react-dialog";
import { useRenameModal } from "../../../store/use-rename-modal"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader } from "../ui/dialog";
import { FormEventHandler, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useApiMutation } from "../../../hooks/use-api-mutation";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";

export const RenameModal = () => {

    const { isOpen, onClose, initialValues } = useRenameModal();

    const [title, setTitle] = useState(initialValues.title);

    const { mutate, pending } = useApiMutation(api.flow.update)

    useEffect(() => {
        setTitle(initialValues.title);
    }, [initialValues.title]);

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        mutate({
            id: initialValues.id,
            title: title,
        })
            .then(() => {
                toast.success("Flow renomeado com sucesso")
                onClose();
            })
            .catch(() => toast.error("Erro ao renomear o flow"))
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Renomear flow
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    Entre com o novo titulo do flow
                </DialogDescription>
                <form onSubmit={onSubmit} className="space-y-4">
                    <Input
                        disabled={pending}
                        required
                        maxLength={60}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Titulo do flow"
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="outline">
                                Cancelar
                            </Button>
                        </DialogClose>
                        <Button disabled={pending} type="submit">
                            Salvar
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>

        </Dialog>
    )
}