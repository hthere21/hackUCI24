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
      <Button onClick={handleSignOut}>Sign Out</Button>
    </>
  );
};
