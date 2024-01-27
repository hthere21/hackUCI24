import { Button, useToast } from "@chakra-ui/react";

import { GoogleIcon } from "./GoogleIcon";

import { useNavigate } from "react-router-dom";

import React, { useEffect, useState } from "react";

import {
  auth,
  googleProvider,
  onAuthStateChanged,
  signInWithPopup,
  // signOut,
  // setPersistence,
  // browserLocalPersistence,
} from "../config/firebase";

export const GoogleLoginButton = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  console.log("Currently signed in user: " + auth?.currentUser?.uid);

  useEffect(() => {
    // This listener is called every time the user's sign-in status changes.
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // User is signed in
        // console.log(currentUser.uid);
        setUser(currentUser);
      } else {
        // User is signed out
        console.log("User signed out");
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [auth]);

  const handleSignInWithGoogle = async () => {
    try {
      googleProvider.setCustomParameters({
        prompt: "select_account",
        // hd: 'uci.edu'
      });
      await signInWithPopup(auth, googleProvider);
      toast({
        title: "Login Successful",
        description: "debug use only",
        status: "success",
        duration: 1000,
        isClosable: true,
      });
      navigate("/home");
    } catch (err) {
      console.error(err);

      let errorMessage = "An unknown error occurred.";

      if (err.code === "auth/invalid-credential") {
        errorMessage = "This email is invalid.";
      } else if (err.code === "auth/wrong-password") {
        errorMessage = "The password is incorrect.";
      }

      toast({
        title: "Login Failed",
        description: errorMessage,
        status: "error",
        duration: 1000,
        isClosable: true,
      });
    }
  };

  return (
    <Button onClick={handleSignInWithGoogle} marginTop={3} marginBottom={3}>
      <GoogleIcon marginRight={2} /> Continue with Google
    </Button>
  );
};
