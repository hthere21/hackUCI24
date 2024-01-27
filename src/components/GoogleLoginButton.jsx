import React, { useEffect } from "react";
import { Button, useToast } from "@chakra-ui/react";
import { GoogleIcon } from "./GoogleIcon";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import {
  auth,
  googleProvider,
  onAuthStateChanged,
  signInWithPopup,
  // signOut,
  // setPersistence,
  // browserLocalPersistence,
} from "../config/firebase";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firestore = getFirestore();

export const GoogleLoginButton = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();

  console.log("Currently signed in user: " + user?.uid);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        updateUser(currentUser);

        // Check if the user exists in Firestore
        const userRef = doc(firestore, "users", currentUser.uid);
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
          // User doesn't exist in Firestore, prompt them to fill out a form
          navigate("/additional-info");
        } else {
          // User exists, proceed to the home page
          toast({
            title: "Login Successful",
            description: "debug use only",
            status: "success",
            duration: 1000,
            isClosable: true,
          });
          navigate("/home");
        }
      } else {

        // User is signed out
//         console.log(user);
//         console.log("User signed out");
//         setUser(null);
// =======
        updateUser(null);
      }
    });

    return () => unsubscribe();

//   });
  }, [updateUser, navigate]);

  const handleSignInWithGoogle = async () => {
    try {
      googleProvider.setCustomParameters({
        prompt: "select_account",
      });
      await signInWithPopup(auth, googleProvider);

      // User will be redirected to the form if not found in Firestore
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
