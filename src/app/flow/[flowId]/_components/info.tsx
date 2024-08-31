"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "convex/react"
import { api } from "../../../../../convex/_generated/api"
import { Id } from "../../../../../convex/_generated/dataModel"
import { Poppins } from "next/font/google"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Hint } from "@/components/hint"
import { useRenameModal } from "../../../../../store/use-rename-modal"
import { Actions } from "@/components/actions"
import { Menu } from "lucide-react"

interface InfoProps {
    flowId: string
}

const font = Poppins({
    subsets: ["latin"],
    weight: ["700"]
})

const TabSeparator = () => {
    return (
        <div className="text-neutral-300 px-1.5">
            |
        </div>
    )
}

export const Info = ({ flowId }: InfoProps) => {

    const { onOpen } = useRenameModal();

    const data = useQuery(api.flow.get, {
        id: flowId as Id<"flows">
    })

    if (!data) return <InfoSkeleton />

    return (
        <div className="absolute top-2 left-2 bg-white rounded-md px-1.5 h-12 flex items-center shadow-md">
            <Hint label="Voltar para os flows" side="bottom" sideOffset={10}>
                <Button className="px-2" variant="flow" asChild>
                    <Link href="/">
                        <Image
                            src="/logo-light.png"
                            alt="Logo"
                            height={40}
                            width={40}
                            className="p-1"
                        />
                        <span className={cn(
                            "font-semibold text-xl ml-2 text-black",
                            font.className,
                        )}>
                            HeroFlow
                        </span>
                    </Link>
                </Button>
            </Hint>
            <TabSeparator />
            <Hint label="Edite seu titulo" side="bottom" sideOffset={10}>
                <Button
                    variant="flow"
                    className="text-base font-normal px-2"
                    onClick={() => onOpen(data._id, data.title)}

                >
                    {data.title}
                </Button>
            </Hint>
            <TabSeparator />
            <Actions
                id={data._id}
                title={data.title}
                side="bottom"
                sideOffset={10}
            >
                <div>
                    <Hint label="Menu Principal" side="bottom" sideOffset={10}>
                        <Button size="icon" variant="flow">
                            <Menu />
                        </Button>
                    </Hint>
                </div>
            </Actions>
        </div >
    )
}

export const InfoSkeleton = () => {
    return (
        <div className="absolute top-2 left-2 bg-white rounded-md h-12 flex items-center shadow-md w-[300px]">
            <Skeleton className="h-full w-full bg-muted" />
        </div>
    )
}