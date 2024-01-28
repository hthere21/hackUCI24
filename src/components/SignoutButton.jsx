import { auth } from "../config/firebase";
import { Button, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const SignoutButton = () => {
  const navigate = useNavigate();

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
      navigate("/home");
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
        borderRadius={10}
        fontSize={20}
        onClick={handleSignOut}
      >
        Logout
      </Button>
    </>
  );
};
