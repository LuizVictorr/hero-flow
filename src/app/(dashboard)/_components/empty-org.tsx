import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { CreateOrganization } from "@clerk/nextjs"
import Image from "next/image"


export const EmptyOrg = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image
                height={300}
                width={300}
                alt="Empty"
                src="/empty.png"
            />
            <h2 className="text-2xl font-semibold mt-6">
                Bem vindo ao HeroFlow
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Cria sua organização para começar
            </p>
            <div className="mt-6">
                <Dialog>
                    <DialogTrigger>
                        <Button size="lg">
                            Criar Organização
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="p-0 bg-transparent border-none max-w-[430px]">
                        <CreateOrganization routing="hash" />
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    )
}