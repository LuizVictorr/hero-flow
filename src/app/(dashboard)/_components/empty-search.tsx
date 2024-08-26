import Image from "next/image"

export const EmptySearch = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center">
            <Image
                src="/empty.png"
                alt="Empty Search"
                width={300}
                height={300}
            />
            <h2 className="text-2xl font-semibold mt-6">
                Nenhum resultado encontrado
            </h2>
            <p className="text-muted-foreground text-sm mt-2">
                Tente pesquisar por outros nomes
            </p>
        </div>
    )
}