import { Text } from "@chakra-ui/react";

const Logo = (): JSX.Element => {
  return (
    <Text
      fontSize={["2xl", "3xl"]}
      fontWeight="bold"
      letterSpacing="tight"
      w="64"
    >
      dashgo
      <Text as="span" color="pink.500">
        .
      </Text>
    </Text>
  );
};

export default Logo;
