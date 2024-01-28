// ParentComponent.js
import React, { useState, useEffect, useRef } from "react";
import Chat from "./Chat";
import { useParams } from "react-router-dom";

const ParentComponent = () => {
  //   const { userUid, recipientUid } = useParams();
  // Replace the following UIDs with your actual user UIDs
  //   const userUid = "5TQISjezH0MlL8sc8ywKHpZL7rc2";
  //   const recipientUid = "jJRnHH1t8lfYsCXUnNdy0wSu3yu1";

  //   const userUid = "jJRnHH1t8lfYsCXUnNdy0wSu3yu1";
  //   const recipientUid = "5TQISjezH0MlL8sc8ywKHpZL7rc2";
  // Function to update recipientUid when a chat is selected
  const recipientUid = "jJRnHH1t8lfYsCXUnNdy0wSu3yu1";
  const userUid = "DCoWadAngsToz2EF9F4rFtqmnz32";
  // recipientUid = "jJRnHH1t8lfYsCXUnNdy0wSu3yu1";

  console.log("In ParentComponent");
  return (
    <>
      <Chat userUid={userUid} recipientUid={recipientUid} />
    </>
  );
};

export default ParentComponent;
