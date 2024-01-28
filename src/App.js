import * as React from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import Listings from "./pages/Listings";
import Login from "./components/login/CardLogin";
import Signup from "./components/signup/CardSignup";
import Profile from "./pages/Profile";
import AdditionalInfoForm from "./pages/AdditionalInfoForm";
import { AuthProvider } from "./components/AuthContext";
import ListingsTest from "./pages/ListingsTest";
import CollectionListForm from "./pages/CollectionListForm";
import ParentComponent from "./pages/ParentComponent";
import Favorites from "./pages/Favorites";
import ManageSublet from "./pages/ManageSublet";

function App() {
  return (
    <AuthProvider>
      <ChakraProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/home" element={<Landing />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/chat" element={<ParentComponent />} />
            <Route path="/search/" element={<Listings />} />
            <Route path="/allListings/:selectedListing" element={<Listings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/additional-info" element={<AdditionalInfoForm />} />
            <Route path="/listingsTest" element={<ListingsTest />} />
            <Route path="/post" element={<CollectionListForm />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/manage-sublets" element={<ManageSublet />} />
            {/* <Route path="/allListings/:listingID" element={<ListingCard />} /> */}
          </Routes>
        </Router>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default App;
