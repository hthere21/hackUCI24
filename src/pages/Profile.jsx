import * as React from "react";
import { useNavigate } from "react-router-dom";
// import { Container, Box, Center, Text, Stack } from "@chakra-ui/react";
import { useAuth } from "../components/AuthContext";
import { SignoutButton } from "../components/SignoutButton";
import Navbar from "../components/Navbar";

function Profile() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const handleGoBack = () => {
    // Navigate back to the home page
    navigate("/");
  };

  // Log the entire user object to the console
  console.log("User Information:", user);
  return (
    <>
      <Navbar />
      <button onClick={handleGoBack}>Go Back to Home</button>
      <div>
        {user ? (
          <div>
            <p>User Information:</p>
            <p>uid: {user.uid}</p>
            <p>Name: {user.displayName}</p>
            <p>Email: {user.email}</p>
            {/* Add more information as needed */}
          </div>
        ) : (
          <p>No user logged in.</p>
        )}
      </div>
      <SignoutButton />
    </>
  );
}

export default Profile;
