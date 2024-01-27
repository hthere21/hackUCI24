// ParentComponent.js
import React from "react";
import Chat from "./Chat";

const ParentComponent = () => {
  // Replace the following UIDs with your actual user UIDs
  //   const userUid = "5TQISjezH0MlL8sc8ywKHpZL7rc2";
  //   const recipientUid = "jJRnHH1t8lfYsCXUnNdy0wSu3yu1";

  const userUid = "jJRnHH1t8lfYsCXUnNdy0wSu3yu1";
  const recipientUid = "5TQISjezH0MlL8sc8ywKHpZL7rc2";

  return (
    <div>
      <Chat userUid={userUid} recipientUid={recipientUid} />
    </div>
  );
};

export default ParentComponent;
