import React, { useEffect, useState } from "react";
import { useAuth } from "../components/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import Navbar from "../components/Navbar";
import UserProfile from "../components/UserProfile";
import CardUser from "../components/CardUser";

function Profile() {
  return (
    <>
      <Navbar />
      <CardUser />
    </>
  );
}

export default Profile;
