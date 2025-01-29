import React from "react";
import * as HIconsSolid from "@heroicons/react/24/solid";
import * as HIconsOutline from "@heroicons/react/24/outline";
import { OutlineIconName, SolidIconName } from "../lib/sidebar";

const DynamicHeroIcon = ({
  className,
  s_icon,
  o_icon
}: {
  className?: string
  s_icon?: SolidIconName;
  o_icon?: OutlineIconName;
}) => {
  if (s_icon && !o_icon) {
    let CustomIcon = HIconsSolid[s_icon];
    return <CustomIcon title="" titleId="" className={className ?? ''} />;
  } else if (!s_icon && o_icon) {
    let CustomIcon = HIconsOutline[o_icon];
    return <CustomIcon title="" titleId="" className={className ?? ''} />;
  }
  return <>No Icon</>;
};

export default DynamicHeroIcon;
