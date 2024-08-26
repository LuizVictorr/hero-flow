"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { api } from "../../../../convex/_generated/api"
import { useOrganization } from "@clerk/nextjs"
import { useApiMutation } from "../../../../hooks/use-api-mutation"
import { toast } from "sonner"

export const EmptyFlow = () => {

    const { pending, mutate } = useApiMutation(api.flow.create)
    const { organization } = useOrganization();

    const onClick = () => {

        if (!organization) return

        mutate({
            orgId: organization?.id,
            title: "Sem titulo"
        })
            .then((id) => {
                toast.success("Flow criado com sucesso")
            })
            .catch(() => toast.error("Falha ao criar seu flow"))
    }


    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image
                src="/empty.png"
                alt="Empty Search"
                width={300}
                height={300}
            />
            <h2 className="text-2xl font-semibold mt-6">
                Crie seu primeiro flow
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Começe criando um flow para sua organização
            </p>
            <div className="mt-6">
                <Button size="lg" disabled={pending} onClick={onClick}>
                    Criar Flow
                </Button>
            </div>
        </div>
    )
}