import { auth } from "../config/firebase";
import { Button, useToast } from "@chakra-ui/react";

export const SignoutButton = () => {
  const toast = useToast();
  const handleSignOut = async () => {
    try {
      await auth.signOut();
      toast({
        title: "Signed Out",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
    } catch (err) {
      toast({
        title: "Sign out Failed",
        description: "how do I mess up signing out bruh",
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button
                size="md"
                marginLeft={5}
                borderLeftRadius={3.3}
                borderRightRadius={3.3}
                fontSize={20}
                onClick={handleSignOut}
              >
                Logout
              </Button>
    </>
  );
};
