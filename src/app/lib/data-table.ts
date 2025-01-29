import { OutlineIconName, SolidIconName } from "./sidebar";

export interface TableStruct {
  view: string | React.ReactNode;
  control:
    | string
    | Function
    | Array<TableButtonAct | TableButtonPth>
  sort?: number;
  classList?: {
    head: string,
    body: string | Function
  };
}

export interface TableButtonAct {
  action: Function;
}

export interface TableButtonPth {
  tooltip: Function|string;
  icon: SolidIconName | OutlineIconName;
  path: Function;
  className?: string;
}
