import React, { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import Navbar from "../components/Navbar";
import UserProfile from "../components/UserProfile";
import CardUser from "../components/CardUser";

function Profile() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (user) {
          // Create a reference to the user's document in the 'users' collection
          const userDocRef = doc(db, "users", user.uid);

          // Fetch the document data from Firestore
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            // If the document exists, update the user information
            const userData = userDocSnapshot.data();
            setUserData(userData);
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user]);

  console.log(userData);
  return (
    <>
      {/* NavBar */}
      <Navbar />

      {/* Profile Card (Name, Gender, Age, Email) */}
      <CardUser />

      <div>
        {user ? (
          <div>
            <p>User Information:</p>
            <p>Email: {user.email}</p>
            {userData && (
              <div>
                <p>Additional Information:</p>
                <p>Name: {userData.name}</p>
                <p>Age: {userData.age}</p>
                <p>Gender: {userData.gender}</p>
                <p>University: {userData.university}</p>
                <p>Bio: {userData.bio}</p>
                {/* Add more fields as needed */}
              </div>
            )}
          </div>
        ) : (
          <p>No user logged in.</p>
        )}
      </div>
    </>
  );
}

export default Profile;
