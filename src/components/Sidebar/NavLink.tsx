import NextLink from "next/link";

import { ComponentType } from "react";

import { IconBaseProps } from "react-icons";

import {
  Icon,
  Text,
  Link,
  LinkProps as ChakraLinkProps,
} from "@chakra-ui/react";
import ActiveLink from "../ActiveLink";

interface NavLinkProps extends ChakraLinkProps {
  children: string;
  icon: ComponentType<IconBaseProps>;
  href: string;
}

const NavLink = ({
  children,
  icon,
  href,
  ...rest
}: NavLinkProps): JSX.Element => {
  return (
    <ActiveLink href={href} passHref>
      <Link display="flex" align="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">
          {children}
        </Text>
      </Link>
    </ActiveLink>
  );
};

export default NavLink;
