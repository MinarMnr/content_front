import * as HIconsSolid from "@heroicons/react/24/solid";
import * as HIconsOutline from "@heroicons/react/24/outline";

export type SolidIconName = keyof typeof HIconsSolid;
export type OutlineIconName = keyof typeof HIconsOutline;

export interface SidebarMenu{
    id: number;
    title: string;
    path: string;
    icon: SolidIconName | OutlineIconName;
    permissions?: SidebarMenu[];
    actions?: (MenuActionsBtn | MenuActionsRou)[];
}

export interface MenuActionsBtn{
    tooltip: string;
    icon: SolidIconName | OutlineIconName;
    action: string;
    type?: 'no-table'
}

export interface MenuActionsRou{
    tooltip: string;
    icon: SolidIconName | OutlineIconName;
    path: string;
    type?: 'no-table'
}