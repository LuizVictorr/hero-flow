"use client"

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { Icon, LucideIcon } from "lucide-react";

interface ToolButtonProps {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
    isDesabled?: boolean;
}

export const ToolButton = ({ label, icon: Icon, onClick, isActive, isDesabled }: ToolButtonProps) => {

    return (
        <Hint label={label} side="right" sideOffset={14}>
            <Button
                disabled={isDesabled}
                onClick={onClick}
                size="icon"
                variant={isActive ? "flowActive" : "flow"}
            >
                <Icon />
            </Button>
        </Hint>
    );
};