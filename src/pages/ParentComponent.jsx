// ParentComponent.js
import React, { useState, useEffect, useRef } from "react";
import Chat from "./Chat";
import { useParams } from "react-router-dom";

const ParentComponent = () => {
  // Function to update recipientUid when a chat is selected
  const recipientUid = "jJRnHH1t8lfYsCXUnNdy0wSu3yu1";
  const userUid = "DCoWadAngsToz2EF9F4rFtqmnz32";

  console.log("In ParentComponent");
  return (
    <>
      <Chat userUid={userUid} recipientUid={recipientUid} />
    </>
  );
};

export default ParentComponent;
