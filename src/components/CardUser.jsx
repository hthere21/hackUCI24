import React, { useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
// import { doc, getDoc } from "firebase/firestore";
import { db, auth, doc, getDoc, onAuthStateChanged } from "../config/firebase";

import {
  Card,
  CardBody,
  Stack,
  Text,
  Divider,
  Heading,
  Button,
  Center,
  ModalOverlay,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from "@chakra-ui/react";

const CardUser = () => {
  // const { user, updateUser } = useAuth();

  const [currentUser, setCurrentUser] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [loading, setLoading] = useState(true);

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const [overlay, setOverlay] = React.useState(<OverlayOne />);


  useEffect(() => {
    let isSubscribed = true; // To prevent state update if component unmounts
  
    // Set up auth state change listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && isSubscribed) {
        // User is signed in, fetch user data
        fetchUserData(user).then((userData) => {
          setCurrentUser(userData);
          setLoading(false);
        });
      } else {
        // User is signed out or initial load with no user
        if (isSubscribed) {
          setLoading(false);
        }
      }
    });
  
    // Clean up subscription and listener
    return () => {
      isSubscribed = false;
      unsubscribe();
    };
  }, []);

  const fetchUserData = async (user) => {
    try {
      // Create a reference to the user's document in the 'users' collection

      const userDocRef = doc(db, "users", user.uid);

      // Fetch the document data from Firestore
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        console.log(userData);
        return userData;

      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  if (loading) {
    return <div> Loading... </div>;
  }

  return (
    <>
      <Center>
        <Card maxW="sm" marginTop={10} alignItems="center">
          <CardBody>
            <Stack mt="6" spacing="3" alignItems="center">
              <Heading size="lg"> {currentUser.email}</Heading>
              <Text align="center">
                sex: {currentUser.gender} | age: {currentUser.age}
                <br />
                email: {currentUser.email}
                <br />
                School: {currentUser.university}
                <br />
                Bio:
                <br />
                {currentUser.bio}
              </Text>
              <Button
                onClick={() => {
                  setOverlay(<OverlayOne />);
                  onOpen();
                }}
              >
                Edit
              </Button>
              <Modal
                isCentered
                isOpen={isOpen}
                onClose={onClose}
                initialFocusRef={initialRef}
              >
                {overlay}
                <ModalContent>
                  <ModalHeader>Profile Settings</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <FormControl>
                      <FormLabel>Name</FormLabel>
                      <Input ref={initialRef} placeholder="Kayla Son" />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Gender</FormLabel>
                      <Input placeholder="Female" />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Age</FormLabel>
                      <Input placeholder="20" />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>School</FormLabel>
                      <Input placeholder="UC Irvine" />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Bio</FormLabel>
                      <Textarea placeholder="Enter a description about yourself." />
                    </FormControl>
                  </ModalBody>
                  <ModalFooter>
                    <Button colorScheme="blue" onClick={onClose}>
                      Save Changes
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Stack>
          </CardBody>
          <Divider />
        </Card>
      </Center>
    </>
  );
};

export default CardUser;
