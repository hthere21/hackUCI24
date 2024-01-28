import React, { useState, useEffect, useRef } from "react";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import {
  Box,
  Text,
  Input,
  Button,
  VStack,
  HStack,
  Spacer,
} from "@chakra-ui/react";
import { doc, getDoc } from "firebase/firestore";
import { db } from '../config/firebase';

import ChatSideBar from "./ChatSideBar";

const Chat = ({ userUid }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [recipientUid, setRecipientUid] = useState(null);
  const [recipientName, setRecipientName] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Fetch messages for the selected recipientUid
    if (recipientUid) {
      const messagesRef = collection(getFirestore(), "messages");
      const q = query(messagesRef, orderBy("timestamp"));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const newMessages = snapshot.docs.map((doc) => doc.data());
        setMessages(newMessages);
        scrollToBottom();
      });

      return () => {
        unsubscribe();
      };
    }
  }, [userUid, recipientUid]);

  const fetchRecipientName = async (selectedRecipientUid) => {
    try {
      const recipientDocRef = doc(db, "users", selectedRecipientUid);
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
    setRecipientUid(selectedRecipientUid);
    fetchRecipientName(selectedRecipientUid);
  };

  const sendMessage = async () => {
    const messagesRef = collection(getFirestore(), "messages");
    await addDoc(messagesRef, {
      senderUid: userUid,
      receiverUid: recipientUid,
      message: newMessage,
      timestamp: serverTimestamp(),
    });

    setNewMessage("");
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <HStack style={{ height: "100vh", width: "100%" }}>
      <ChatSideBar userUid={userUid} onSelectChat={onSelectChat} />
      <VStack
        align="start"
        spacing={4}
        style={{
          flex: "1",
          overflowY: "auto",
          // padding: "16px",
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
              <span
                style={{
                  marginLeft: "8px",
                  fontSize: "0.8em",
                  color: "#6c757d",
                }}
              >
                {new Date(
                  message.timestamp?.seconds * 1000
                ).toLocaleTimeString()}
              </span>
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
    </HStack>
  );
};

export default Chat;
