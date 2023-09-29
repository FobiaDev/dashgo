import { ReactNode, useEffect } from "react";

import { useDisclosure } from "@chakra-ui/react";

import { SidebarDrawerContext } from "./contex";
import { useRouter } from "next/router";

interface SidebarDrawerProviderProps {
  children: ReactNode;
}

export const SidebarDrawerProvider = ({
  children,
}: SidebarDrawerProviderProps): JSX.Element => {
  const disclosure = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    disclosure.onClose();
  }, [router.asPath]);

  return (
    <SidebarDrawerContext.Provider value={disclosure}>
      {children}
    </SidebarDrawerContext.Provider>
  );
};
