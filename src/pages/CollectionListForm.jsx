import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Navbar from "../components/Navbar";
import { key } from "../config/melissa";

import {
  Button,
  FormControl,
  Textarea,
  FormLabel,
  Container,
  Stack,
  Input,
  Select,
  Heading,
  Center,
  Card,
  Box,
  NumberInput,
  NumberInputField,
  Textarea,
} from "@chakra-ui/react";

// Initialize Firebase Storage
const storage = getStorage();

const CollectionListForm = () => {
  const [listings, setListings] = useState([]);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [end, setEnd] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [start, setStart] = useState("");
  const [state, setState] = useState("");
  const [type, setType] = useState("");
  const [zip, setZip] = useState("");
  const [error, setError] = useState(null);
  const [alert, setAlert] = useState(false);
  const navigate = useNavigate();

  const [image, setImage] = useState(null); // State to store the selected image file

  function generateMelissaUrl() {
    const url = new URL(
      "https://address.melissadata.net/v3/WEB/GlobalAddress/doGlobalAddress"
    );
    url.search = new URLSearchParams({
      t: "zotLeaseRequest",
      id: key,
      a1: address,
      loc: city,
      admarea: state,
      postal: zip,
      ctry: "USA",
      format: "json",
    });
    return url;
  }

  const fetchData = async (requestURL) => {
    try {
      const response = await fetch(requestURL);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Data retrieve success", data);
      return data; // Return the data for immediate use
    } catch (err) {
      setError(err);
      console.log(error);
      return null; // Return null in case of an error
    }
  };

  const handleImageChange = (e) => {
    // Set the selected image file to the state
    const file = e.target.files[0];
    setImage(file);
  };

  const handleAddListing = async () => {
    try {
      const defaultImageUrl =
        "https://www.irvinecompany.com/images/apartments-1-1080x720.webp";

      const geoData = await fetchData(generateMelissaUrl());
      let latitude = geoData.Records[0].Latitude;
      let longitude = geoData.Records[0].Longitude;

      let formattedCity = city.replace(/\W/g, "").toLowerCase();
      let formattedState = state.toLowerCase();
      setCity(formattedCity);
      setState(state.toLowerCase());
      let newListing = {
        address,
        city: formattedCity,
        description,
        end: Timestamp.fromDate(new Date(end)),
        imageUrl: defaultImageUrl, // Default image URL
        name,
        price: Number(price),
        start: Timestamp.fromDate(new Date(start)),
        state: formattedState,
        type,
        zip,
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
      };

      console.log(newListing);

      // Upload image to Firebase Storage
      if (image) {
        const storageRef = ref(storage, `listings/${image.name}`);
        await uploadBytes(storageRef, image);
        const imageUrl = await getDownloadURL(storageRef);

        // Update the newListing object with the actual image URL
        newListing = {
          ...newListing,
          imageUrl,
        };
      }

      // Create a Firestore document for the listing
      const listingsRef = collection(db, "listings");
      await addDoc(listingsRef, {
        ...newListing,
        userId: auth.currentUser.uid,
        createdAt: serverTimestamp(),
      });

      // Update local state with the new listing
      setListings([...listings, newListing]);

      // Clear form fields after adding a listing
      setAddress("");
      setCity("");
      setDescription("");
      setEnd("");
      setName("");
      setPrice("");
      setStart("");
      setState("");
      setType("");
      setZip("");
      setAlert(false);
      navigate("/manage-sublets");
    } catch (error) {
      console.error("Error adding listing:", error);
      setAlert(true);
    }
  };

  const handleClearAndGoBack = () => {
    setListings([]);
    // Clear form fields
    setAddress("");
    setCity("");
    setDescription("");
    setEnd("");
    setName("");
    setPrice("");
    setStart("");
    setState("");
    setType("");
    setZip("");
    // Navigate back
    navigate(-1);
  };

  // List of U.S. states
  const usStates = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];
  // console.log(alert);
  return (
    <>
      <Navbar />

      <Container maxW={"-moz-max-content"} p={0}>
        <Box
          position="relative"
          bgImage="url('https://images.squarespace-cdn.com/content/v1/5b60d4fa70e802968763e7f5/1576788003994-PYV0Z6XT8J0L3BJUXTQF/ME_towers_082919_0036_sz-2.jpg')"
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
            <Stack>
              <Box
                paddingTop={10}
                backgroundImage={
                  "https://resource.rentcafe.com/image/upload/x_0,y_0,w_2260,h_2000,c_crop/q_auto,f_auto,c_fill,w_576,ar_0.939,g_auto/s3/2/55533/jefferson%20innova%20-%20exterior%20corner%20twilight(2).jpg"
                }
                backgroundRepeat={"no-repeat"}
                bgSize={"cover"}
              >
                <Center>
                  <Heading
                    color="white"
                    // textShadow={"-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"}
                    textShadow={"2px 2px 5px black"}
                    fontFamily={"New Century Schoolbook"}
                    fontSize={43}
                  >
                    Listing Form
                  </Heading>
                </Center>
                <Center>
                  <Card
                    p={10}
                    marginTop={10}
                    maxW={"3xl"}
                    borderRadius={15}
                    boxShadow={"5px 10px 18px gray"}
                  >
                    <FormControl mt={4}>
                      <FormLabel>Title</FormLabel>
                      <Input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </FormControl>

                    <FormControl>
                      <FormLabel>Address</FormLabel>
                      <Input
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>City</FormLabel>
                      <Input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Zip</FormLabel>
                      <Input
                        type="text"
                        value={zip}
                        onChange={(e) => setZip(e.target.value)}
                      />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>State</FormLabel>
                      <Select
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      >
                        <option value="" disabled>
                          Select a state
                        </option>
                        {usStates.map((usState) => (
                          <option key={usState} value={usState}>
                            {usState}
                          </option>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Price</FormLabel>
                      <NumberInput>
                        <NumberInputField
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </NumberInput>
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Type</FormLabel>

                      <Select
                        placeholder="Select Sublet Type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                      >
                        <option value={"Room"}>Room</option>
                        <option value={"Apartment"}>Apartment</option>
                      </Select>
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Description</FormLabel>
                      {/* <Input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      /> */}

                      <Textarea
                        placeholder="Write a short description about your listing"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>Start Date</FormLabel>
                      <Input
                        type="date"
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                      />
                    </FormControl>

                    <FormControl mt={4}>
                      <FormLabel>End Date</FormLabel>
                      <Input
                        type="date"
                        value={end}
                        onChange={(e) => setEnd(e.target.value)}
                      />
                    </FormControl>
                    <FormControl mt={4}>
                      <FormLabel>Image</FormLabel>
                      <Input type="file" onChange={handleImageChange} />
                    </FormControl>

                    <Button
                      mt={4}
                      colorScheme="teal"
                      onClick={handleAddListing}
                      borderRadius={15}
                    >
                      Add Listing
                    </Button>

                    <Button
                      mt={4}
                      colorScheme="blue"
                      onClick={handleClearAndGoBack}
                      borderRadius={15}
                    >
                      Go Back
                    </Button>
                  </Card>
                </Center>
              </Box>
            </Stack>
          </Center>
        </Box>
      </Container>

      {/* backgroundColor={"#9eadc1"} */}
    </>
  );
};

export default CollectionListForm;
