// LoginScreen.js
import React, { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { auth } from "./firebaseConfig";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const register = async () => {
    try {
      await auth.createUserWithEmailAndPassword(email, password);
      setError("");
    } catch (e) {
      setError(e.message);
    }
  };

  const login = async () => {
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setError("");
      navigation.navigate("Feed");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} autoCapitalize="none" />
      <Text>Password</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Registrarse" onPress={register} />
      <Button title="Iniciar sesión" onPress={login} />
      {error ? <Text style={{ color: "red" }}>{error}</Text> : null}
    </View>
  );
}

