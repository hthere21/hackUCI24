import React, { useEffect } from "react";
import { useAuth } from "./AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase";

const UserProfile = () => {
  const { user, updateUser } = useAuth();

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
            updateUser({
              ...user,
              // Add the additional fields from the user's document
              age: userData.age,
              gender: userData.gender,
              university: userData.university,
              bio: userData.bio,
              // Add more fields as needed
            });
          }
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user, updateUser]);

  return (
    <div>
      <h2>User Profile</h2>
      {user && (
        <ul>
          <li>Name: {user.displayName}</li>
          <li>Email: {user.email}</li>
          <li>Age: {user.age}</li>
          <li>Gender: {user.gender}</li>
          <li>University: {user.university}</li>
          <li>Bio: {user.bio}</li>
          {/* Add more fields as needed */}
        </ul>
      )}
    </div>
  );
};

export default UserProfile;
