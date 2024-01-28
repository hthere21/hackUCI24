import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../config/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
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
  const navigate = useNavigate();

  const [image, setImage] = useState(null); // State to store the selected image file

  const handleImageChange = (e) => {
    // Set the selected image file to the state
    const file = e.target.files[0];
    setImage(file);
  };

  const handleAddListing = async () => {
    try {
      const defaultImageUrl =
        "https://www.irvinecompany.com/images/apartments-1-1080x720.webp";
      let newListing = {
        address,
        city,
        description,
        end,
        imageUrl: defaultImageUrl, // Default image URL
        name,
        price,
        start,
        state,
        type,
        zip,
      };

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
    } catch (error) {
      console.error("Error adding listing:", error);
      // Handle error
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
    navigate("/profile");
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

  return (
    <>
      <h1>Listing Form</h1>
      <Box p={4}>
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
          <Select value={state} onChange={(e) => setState(e.target.value)}>
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
          <Input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Type</FormLabel>
          <Input
            type="text"
            value={type}
            placeholder="e.g.. 1 bedroom - 1 bathroom"
            onChange={(e) => setType(e.target.value)}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Description</FormLabel>
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Start (Timestamp)</FormLabel>
          <Input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
          />
          {/* You might want to use a date picker library for a better user experience */}
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

        <Button mt={4} colorScheme="teal" onClick={handleAddListing}>
          Add Listing
        </Button>

        <Button mt={4} colorScheme="blue" onClick={handleClearAndGoBack}>
          Go Back
        </Button>
      </Box>
    </>
  );
};

export default CollectionListForm;