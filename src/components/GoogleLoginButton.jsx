
import {
  Button
} from "@chakra-ui/react";

import {GoogleIcon} from './GoogleIcon';

import React, { useEffect, useState } from "react";

import { auth, googleProvider, onAuthStateChanged, signInWithPopup, signOut, setPersistence, browserLocalPersistence} from '../config/firebase';

export const GoogleLoginButton = () => {
    // const [email, setEmail] = useState("");
    // const [warning, setWarning] = useState("");
    const [user, setUser] = useState(null);
    console.log("Currently signed in user: " + auth?.currentUser?.uid);

    useEffect(() => {
        // This listener is called every time the user's sign-in status changes.
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            if (currentUser) {
                // User is signed in
                // console.log(currentUser.uid);
                setUser(currentUser);
            } else {
                // User is signed out
                console.log("User signed out")
                setUser(null);
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [auth]);


  const handleSignInWithGoogle = async () => {
    try {
        googleProvider.setCustomParameters({
            prompt: 'select_account'
            // hd: 'uci.edu'
        });
        await signInWithPopup(auth, googleProvider);
    } catch (err) {
        console.error(err);   
    }

  };

  const handleSignOut = async () => {
    try {
        console.log("Clicked Signout")
        await signOut(auth);
        localStorage.clear();
        sessionStorage.clear();

        setPersistence(auth, browserLocalPersistence).then(() => {
            // Redirect or perform any additional actions if needed
            window.location.reload();
        });
    } catch (err) {
        console.error(err);
    }
    
  };

    return (
        <Button onClick={handleSignInWithGoogle} marginTop={3} marginBottom={3} >
            <GoogleIcon marginRight={2}/> Continue with Google
        </Button>
        
    )

}