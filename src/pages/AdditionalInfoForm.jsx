import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../config/firebase";

const AdditionalInfoForm = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState(""); // Changed from text to select
  const [university, setUniversity] = useState("");
  const [bio, setBio] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      // Create a Firestore document for the user
      const userRef = doc(db, "users", auth.currentUser.uid);
      await setDoc(userRef, {
        name,
        age,
        gender,
        university,
        bio,
      });

      // Redirect to the home page after submitting the form
      navigate("/home");
    } catch (error) {
      console.error("Error updating user information:", error);
      // Handle error
    }
  };

  return (
    <form>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />

      <label>
        Age:
        <input
          type="text"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />
      </label>
      <br />

      <label>
        Gender:
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select</option>
          <option value="MALE">MALE</option>
          <option value="FEMALE">FEMALE</option>
        </select>
      </label>
      <br />

      <label>
        University:
        <input
          type="text"
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
        />
      </label>
      <br />

      <label>
        Bio:
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} />
      </label>
      <br />

      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
};

export default AdditionalInfoForm;
