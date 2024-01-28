import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  doc,
  getDoc,
  setDoc,
  getFirestore,
  updateDoc,
} from "../config/firebase";
import {
  faHeart as solidHeart,
  faHeart as regularHeart,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "./AuthContext";

const HeartButton = ({ id }) => {
  const cardId = id;
  const { user } = useAuth();
  const [userLikedArray, setUserLikedArray] = useState([]);
  const [isLiked, setLiked] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const fetchUserLikedArray = async () => {
    if (user) {
      const db = getFirestore();
      const userDocRef = doc(db, "users", user.uid);

      try {
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const likedArray = userDocSnapshot.data().liked || [];
          setUserLikedArray(likedArray);

          // Set initial isLiked based on whether cardId is in the likedArray
          setLiked(likedArray.includes(cardId));
        } else {
          // If the document doesn't exist, create it with an empty 'liked' array
          await setDoc(userDocRef, { liked: [] }, { merge: true });
        }
      } catch (error) {
        console.error("Error fetching/updating user document:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserLikedArray();
  }, [user, cardId]);

  const handleLikeToggle = async () => {
    if (isLoading) return; // Avoid toggling when still loading

    setLoading(true);

    // Update the Firestore document when the button is clicked
    const db = getFirestore();
    const userDocRef = doc(db, "users", user.uid);

    try {
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const likedArray = userDocSnapshot.data().liked || [];

        // Check if cardId is in the likedArray
        const cardIsLiked = likedArray.includes(cardId);

        // Update the Firestore document with the new likedArray
        const updatedLikedArray = cardIsLiked
          ? likedArray.filter((itemId) => itemId !== cardId)
          : [...likedArray, cardId];

        // Toggle isLiked state
        setLiked(!cardIsLiked);

        // Update the likedArray in Firestore
        await updateDoc(userDocRef, { liked: updatedLikedArray });
      }
    } catch (error) {
      console.error("Error updating user liked array:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleLikeToggle} disabled={isLoading}>
      <FontAwesomeIcon
        icon={isLiked ? solidHeart : regularHeart}
        color={isLiked ? "red" : "black"}
      />
    </button>
  );
};

export default HeartButton;
