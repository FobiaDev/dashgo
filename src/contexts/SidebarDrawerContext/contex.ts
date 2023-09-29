import { createContext } from "react";

import { UseDisclosureReturn } from "@chakra-ui/react";

type SidebarDrawerContextData = UseDisclosureReturn

export const SidebarDrawerContext = createContext({} as SidebarDrawerContextData);