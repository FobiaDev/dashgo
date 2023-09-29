import { Flex, Icon, IconButton, useBreakpointValue } from "@chakra-ui/react";

import Logo from "./Logo";
import SearchBox from "./SearchBox";
import NotificationsNav from "./NotificationsNav";
import Profile from "./Profile";
import { useSidebarDrawer } from "../../utils/useSidebarDrawer";
import { RiMenuLine } from "react-icons/ri";

const Header = (): JSX.Element => {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const { onOpen } = useSidebarDrawer();

  return (
    <Flex
      w="100%"
      as="header"
      maxW="1480px"
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      {!isWideVersion && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        ></IconButton>
      )}

      <Logo />

      {isWideVersion && <SearchBox />}

      <Flex align="center" ml="auto">
        <NotificationsNav />
        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
};

export default Header;
