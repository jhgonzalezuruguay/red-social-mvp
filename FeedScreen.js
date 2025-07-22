// FeedScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, FlatList } from "react-native";
import { db } from "./firebaseConfig";

export default function FeedScreen() {
  const [post, setPost] = useState("");
  const [posts, setPosts] = useState([]);

  const publishPost = async () => {
    try {
      await db.collection("posts").add({
        content: post,
        createdAt: Date.now()
      });
      setPost("");
      loadPosts();
    } catch (e) {
      alert(e.message);
    }
  };

  const loadPosts = async () => {
    try {
      const snapshot = await db.collection("posts").get();
      const list = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setPosts(list);
    } catch (e) {
      alert(e.message);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <View style={{ padding: 20 }}>
      <Text>Escribe algo:</Text>
      <TextInput value={post} onChangeText={setPost} />
      <Button title="Publicar" onPress={publishPost} />
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 10 }}>
            <Text>{item.content}</Text>
          </View>
        )}
      />
    </View>
  );
}

