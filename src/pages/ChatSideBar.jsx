// ChatSidebar.jsx
import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  getDocs,
} from "firebase/firestore";
import { VStack, Text, Box } from "@chakra-ui/react";
import { db } from "../config/firebase";

const ChatSideBar = ({ userUid, onSelectChat }) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const usersCollection = collection(db, "users");
        const usersSnapshot = await getDocs(usersCollection);

        const chatList = [];
        usersSnapshot.forEach((userDoc) => {
          const userId = userDoc.id;
          if (userId !== userUid) {
            chatList.push({
              uid: userId,
              name: userDoc.data().name,
            });
          }
        });

        setChats(chatList);
      } catch (error) {
        console.error("Error fetching chat list:", error);
      }
    };

    fetchChats();
  }, [userUid]);

  return (
    <VStack
      align="start"
      spacing={4}
      bg="gray.900"
      p={4}
      boxShadow="md"
      borderRadius="md"
    >
      {chats.map((chat) => (
        <Box
          key={chat.uid}
          onClick={() => onSelectChat(chat.uid)}
          p={2}
          borderRadius="md"
          _hover={{ bg: "gray.700", cursor: "pointer" }}
        >
          <Text color="white">{chat.name}</Text>
        </Box>
      ))}
    </VStack>
  );
};

export default ChatSideBar;
