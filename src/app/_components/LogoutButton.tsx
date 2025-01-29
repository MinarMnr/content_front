"use client";

import { useRouter } from "next/navigation";
import { LOGOUT } from "../(authentication)/action";
import DynamicHeroIcon from "./DynamicHeroIcon";

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    router.push("/");
    await LOGOUT();
    location.reload();
  };

  return (
    <strong className="flex flex-row justify-start" onClick={handleLogout}>
      <DynamicHeroIcon s_icon="ArrowLeftStartOnRectangleIcon" className="size-6" />
      <span>Logout</span>
    </strong>
  );
};

export default LogoutButton;
