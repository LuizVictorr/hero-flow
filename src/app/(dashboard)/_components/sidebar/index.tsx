import { List } from "./list"
import { NewButton } from "./new-button"


export const Sidebar = () => {
    return (
        <div className="w-[60px] fixed z-[1] left-0 bg-blue-950 h-full flex p-3 flex-col gap-y-4 text-white">
            <List />
            <NewButton />
        </div>
    )
}