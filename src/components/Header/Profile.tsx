import { Avatar, Box, Flex, Text } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData?: boolean;
}

const Profile = ({ showProfileData = true }: ProfileProps): JSX.Element => {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Fabio</Text>
          <Text color="gray.300" fontSize="small">
            fabio@email.com
          </Text>
        </Box>
      )}
      <Avatar size="md" name="faibo" />
    </Flex>
  );
};

export default Profile;
