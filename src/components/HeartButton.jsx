import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { doc, getDoc, getFirestore, updateDoc } from "../config/firebase";
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
      const userDocRef = doc(db, "liked", user.uid);

      try {
        setLoading(true);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const likedArray = userDocSnapshot.data().liked || [];
          setUserLikedArray(likedArray);

          // Check if cardId is in the likedArray
          const cardIsLiked = likedArray.includes(cardId);
          setLiked(cardIsLiked);
        }
      } catch (error) {
        console.error("Error fetching user liked array:", error);
      } finally {
        setLoading(false);
      }
    }
  };
  
  useEffect(() => {
    fetchUserLikedArray();
  }, [user, cardId]);

  const handleLikeToggle = () => {
    if (isLoading) return; // Avoid toggling when still loading

    // Update the Firestore document when the button is clicked
    const db = getFirestore();
    const userDocRef = doc(db, "liked", user.uid);

    // Toggle isLiked state
    setLiked(!isLiked);

    // Update the Firestore document with the new likedArray
    const updatedLikedArray = isLiked
      ? userLikedArray.filter((itemId) => itemId !== cardId)
      : [...userLikedArray, cardId];

    // Update the likedArray in Firestore
    updateDoc(userDocRef, { liked: updatedLikedArray }).catch((error) => {
      console.error("Error updating user liked array:", error);
    });
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
