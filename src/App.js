import * as React from "react";
import "./App.css";
import { ChakraProvider } from "@chakra-ui/react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import LoginSuccess from "./pages/LoginSuccess";
import SearchListings from "./pages/SearchListings";
import Listings from "./pages/Listings";
import Login from "./components/CardLogin";
import Signup from "./components/CardSignup";
import Profile from "./pages/Profile";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/loginSuccess" element={<LoginSuccess />} />
          <Route path="/searchResults" element={<SearchListings />} />
          <Route path="/allListings" element={<Listings />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          {/* <Route path="/allListings/:listingID" element={<ListingCard />} /> */}
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
