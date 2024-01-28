import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  db,
  auth,
  doc,
  getDoc,
  setDoc,
  onAuthStateChanged,
} from "../config/firebase";
import {
  Card,
  CardBody,
  Select,
  Container,
  Box,
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
  Avatar,
  Input,
  Textarea,
  Flex,
} from "@chakra-ui/react";

const CardUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);
  // const finalRef = React.useRef(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState(""); // Changed from text to select
  const [university, setUniversity] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const [overlay, setOverlay] = React.useState(<OverlayOne />);

  const handleSubmit = async () => {
    try {
      // Create a Firestore document for the user
      const userRef = doc(db, "users", auth.currentUser.uid);
      setEmail(auth.currentUser.email);
      await setDoc(userRef, {
        name,
        age,
        gender,
        university,
        bio,
        email,
      });

      // Redirect to the home page after submitting the form
      navigate("/profile");
    } catch (error) {
      console.error("Error updating user information:", error);
      // Handle error
    }
  };

  const handleSaveChanges = () => {
    handleSubmit();
    onClose();
  };

  useEffect(() => {
    let isSubscribed = true; // To prevent state update if component unmounts

    // Set up auth state change listener
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && isSubscribed) {
        // User is signed in, fetch user data
        fetchUserData(user).then((userData) => {
          setEmail(auth.currentUser.email);

          setCurrentUser(userData);
          try {
            setName(userData.name);
          } catch (err) {
            console.error(err);
          }

          try {
            setAge(userData.age);
          } catch (err) {
            console.error(err);
          }

          try {
            setGender(userData.gender);
          } catch (err) {
            console.error(err);
          }

          try {
            setUniversity(userData.university);
          } catch (err) {
            console.error(err);
          }

          try {
            setBio(userData.bio);
          } catch (err) {
            console.error(err);
          }

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
      <Container maxW={"-moz-max-content"} p={0}>
        <Box
          position="relative"
          bgImage="url('https://png.pngtree.com/thumb_back/fh260/background/20230421/pngtree-apartment-building-interior-decoration-image_2333111.jpg')"
          bgSize="cover"
          bgPosition="center"
          bgRepeat="no-repeat"
          left={0}
          right={0}
          width="100vw"
          maxWidth="100%"
        >
          <Box
            position="absolute"
            top={0}
            left={0}
            w="full"
            h="full"
            bg="black"
            opacity={0.5}
            bgBlendMode="multiply"
          />
          <Center
            position="relative"
            zIndex={1}
            textAlign="center"
            display="flex"
            justifyContent="center"
            minH={80}
          >
            <Flex
              flexDirection="column"
              width="100wh"
              height="100vh"
              justifyContent="center"
              alignItems="center"
            >
              {/* <Center marginTop={10}> */}
              <Heading
                color="white"
                textShadow={
                  "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
                }
                fontSize="5xl"
              >
                Profile
              </Heading>
              <Card
                maxW="lg"
                marginTop={7}
                padding={"4rem"}
                alignItems="center"
                borderRadius={15}
              >
                <Avatar size={"xl"} />
                <CardBody>
                  <Stack spacing="3" alignItems="center">
                    <Heading size="lg">{name ? name : "No Name"}</Heading>
                    <Text align="center" fontSize={"xl"}>
                      <Text as="b">Sex: </Text>
                      {gender ? gender : "N/A"} | <Text as="b">Age: </Text>
                      {age ? age : "N/A"}
                      <br />
                      <Text as="b">Email: </Text>
                      {email ? email : "N/A"}
                      <br />
                      <Text as="b">School: </Text>
                      {university ? university : "N/A"}
                      <br />
                      <Text as="b">Bio:</Text>
                      <br />
                      {bio ? bio : "N/A"}
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
                            <Input
                              ref={initialRef}
                              placeholder="Kayla Son"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          </FormControl>

                          <FormControl mt={4}>
                            <FormLabel>Gender</FormLabel>
                            <Select
                              placeholder="Select option"
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
                            >
                              <option>Female</option>
                              <option>Male</option>
                            </Select>
                          </FormControl>

                          <FormControl mt={4}>
                            <FormLabel>Age</FormLabel>
                            <Input
                              placeholder="20"
                              value={age}
                              onChange={(e) => setAge(e.target.value)}
                            />
                          </FormControl>

                          <FormControl mt={4}>
                            <FormLabel>School</FormLabel>
                            <Input
                              placeholder="UC Irvine"
                              value={university}
                              onChange={(e) => setUniversity(e.target.value)}
                            />
                          </FormControl>

                          <FormControl mt={4}>
                            <FormLabel>Bio</FormLabel>
                            <Textarea
                              placeholder="Enter a description about yourself."
                              value={bio}
                              onChange={(e) => setBio(e.target.value)}
                            />
                          </FormControl>
                        </ModalBody>
                        <ModalFooter>
                          <Button
                            colorScheme="blue"
                            onClick={handleSaveChanges}
                          >
                            Save Changes
                          </Button>
                        </ModalFooter>
                      </ModalContent>
                    </Modal>
                  </Stack>
                </CardBody>
                <Divider />
              </Card>
            </Flex>
          </Center>
          {/* </Center> */}
        </Box>
      </Container>
    </>
  );
};

export default CardUser;
