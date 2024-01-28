import React, { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import Navbar from "../components/Navbar";
import UserProfile from "../components/UserProfile";
import CardUser from "../components/CardUser";

function Profile() {
  // const { user, updateUser } = useAuth();
  // const [userData, setUserData] = useState(null);

  // const fetchUserData = async () => {
  //   try {
  //     if (user) {
  //       // Create a reference to the user's document in the 'users' collection
  //       const userDocRef = doc(db, "users", user.uid);

  //       // Fetch the document data from Firestore
  //       const userDocSnapshot = await getDoc(userDocRef);

  //       if (userDocSnapshot.exists()) {
  //         // If the document exists, update the user information
  //         const userData = userDocSnapshot.data();
  //         updateUser({
  //           ...user,
  //           // Add the additional fields from the user's document
  //           age: userData.age,
  //           gender: userData.gender,
  //           university: userData.university,
  //           bio: userData.bio,
  //           // Add more fields as needed
  //         });
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchUserData();
  // }, []);

  // console.log(userData);

  return (
    <>
      {/* NavBar */}
      <Navbar />

      {/* Profile Card (Name, Gender, Age, Email) */}
      {/* <CardUser user= {userData}/> */}
      <CardUser />

      {/* <div>
        {user ? (
          <div>
            <p>User Information:</p>
            <p>Email: {user.email}</p>
            {/* <img src="https://firebasestorage.googleapis.com/v0/b/hackuci2024.appspot.com/o/listings%2F944fe7dc31af348cab1b528ad1192dab.jpeg?alt=media&token=645bb6d8-324f-4770-87c3-59a46e3c08e7"></img> */}
            {userData && (
              <div>
                <p>Additional Information:</p>
                <p>Name: {userData.name}</p>
                <p>Age: {userData.age}</p>
                <p>Gender: {userData.gender}</p>
                <p>University: {userData.university}</p>
                <p>Bio: {userData.bio}</p>
                
              </div>
            )}
          {/* </div>
        ) : (
          <p>No user logged in.</p>
        )}
      </div>  */}
    </>
  );
}

export default Profile;
