import React, { useState, useEffect, useRef } from "react";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  where,
  getDocs,
} from "firebase/firestore";
import { Box, Text, Input, Button, VStack, HStack } from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";

import ChatSideBar from "./ChatSideBar";

const Chat = (props) => {
  const userUid = props.userUid;
  const recipientUid = props.recipientUid;
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // Use history.goBack() if using React Router
  };

  const fetchMessages = async (recipientUid) => {
    try {
      console.log("Fetching messages for recipient:", recipientUid);

      const messagesRef = collection(getFirestore(), "messages");

      const q1 = query(
        messagesRef,
        orderBy("timestamp"),
        where("senderUid", "==", userUid),
        where("receiverUid", "==", recipientUid)
      );

      const q2 = query(
        messagesRef,
        orderBy("timestamp"),
        where("senderUid", "==", recipientUid),
        where("receiverUid", "==", userUid)
      );

      const [snapshot1, snapshot2] = await Promise.all([
        getDocs(q1),
        getDocs(q2),
      ]);

      const messagesFromQ1 = snapshot1.docs.map((doc) => doc.data());
      const messagesFromQ2 = snapshot2.docs.map((doc) => doc.data());

      // Combine and sort messages
      const allMessages = [...messagesFromQ1, ...messagesFromQ2].sort(
        (a, b) => a.timestamp?.seconds - b.timestamp?.seconds
      );

      console.log("Fetched messages:", allMessages);

      setMessages((prevMessages) => [...prevMessages, ...allMessages]);

      scrollToBottom();
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const fetchRecipientName = async (selectedRecipientUid) => {
    try {
      const recipientDocRef = doc(db, "users", selectedRecipientUid); // Correct path
      const recipientDocSnapshot = await getDoc(recipientDocRef);

      if (recipientDocSnapshot.exists()) {
        const recipientData = recipientDocSnapshot.data();
        setRecipientName(recipientData.name);
      } else {
        console.warn("Recipient document does not exist.");
      }
    } catch (error) {
      console.error("Error fetching recipient's name:", error);
    }
  };

  const onSelectChat = (selectedRecipientUid) => {
    fetchMessages(selectedRecipientUid);
    fetchRecipientName(selectedRecipientUid); // Add this line
  };

  const sendMessage = async () => {
    try {
      const messagesRef = collection(getFirestore(), "messages");
      await addDoc(messagesRef, {
        senderUid: userUid,
        receiverUid: props.recipientUid,
        message: newMessage,
        timestamp: new Date(), // Use current timestamp
      });

      // Use the callback version of setMessages
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          senderUid: userUid,
          receiverUid: props.recipientUid,
          message: newMessage,
          timestamp: new Date(),
        },
      ]);

      setNewMessage("");
      scrollToBottom(); // Scroll to bottom after updating state
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    if (props.recipientUid) {
      fetchMessages(props.recipientUid);
      fetchRecipientName(props.recipientUid);
    }
  }, [props.recipientUid]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <>
      <HStack style={{ height: "100vh", width: "100%" }}>
        {/* <ChatSideBar userUid={userUid} onSelectChat={onSelectChat} /> */}
        <VStack
          align="start"
          spacing={4}
          style={{
            flex: "1",
            overflowY: "auto",
            background: "#f8f9fa",
          }}
        >
          {recipientName && (
            <Text style={{ fontSize: "1.5em", fontWeight: "bold" }}>
              Chat with {recipientName}
            </Text>
          )}
          <Box
            style={{
              width: "100%",
              height: "60vh",
              overflowY: "auto",
              marginBottom: "auto",
              display: "flex",
              padding: "10px",
              flexDirection: "column",
              alignItems: "flex-start",
              backgroundColor: "white",
            }}
          >
            {messages.map((message) => (
              <Box
                key={message.timestamp}
                style={{
                  alignSelf:
                    message.senderUid === userUid ? "flex-start" : "flex-end",
                  marginBottom: "8px",
                  maxWidth: "70%",
                  textAlign: message.senderUid === userUid ? "left" : "right",
                }}
              >
                <Text
                  style={{
                    backgroundColor:
                      message.senderUid === userUid ? "#3498db" : "#ecf0f1",
                    color: message.senderUid === userUid ? "#ffffff" : "black",
                    padding: "8px",
                    borderRadius: "8px",
                  }}
                >
                  {message.message}
                </Text>
                {/* <span
                style={{
                  marginLeft: "8px",
                  fontSize: "0.8em",
                  color: "#6c757d",
                }}
              >
                {new Date(
                  message.timestamp?.seconds * 1000
                ).toLocaleTimeString()}
              </span> */}
              </Box>
            ))}
            <div ref={messagesEndRef}></div>
          </Box>
          <HStack style={{ width: "100%" }}>
            <Input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              style={{
                flex: "1",
                borderRadius: "8px",
                marginRight: "8px",
                padding: "8px",
              }}
            />
            <Button
              onClick={sendMessage}
              style={{
                backgroundColor: "#2ecc71",
                color: "#ffffff",
                borderRadius: "8px",
                padding: "8px",
              }}
            >
              Send
            </Button>
          </HStack>
        </VStack>
        <HStack>
          <Button onClick={goBack}>Back</Button>
        </HStack>
      </HStack>
    </>
  );
};

export default Chat;
