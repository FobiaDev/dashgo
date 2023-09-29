import { useContext } from "react";

import { SidebarDrawerContext } from "../contexts/SidebarDrawerContext/contex";

export const useSidebarDrawer = () => useContext(SidebarDrawerContext);
