import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList } from 'react-native';
import { db } from './firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export default function FeedScreen() {
  const [post, setPost] = useState('');
  const [posts, setPosts] = useState([]);

  const publishPost = async () => {
    await addDoc(collection(db, 'posts'), {
      content: post,
      createdAt: Date.now(),
    });
    setPost('');
    loadPosts();
  };

  const loadPosts = async () => {
    const snapshot = await getDocs(collection(db, 'posts'));
    const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setPosts(list);
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
