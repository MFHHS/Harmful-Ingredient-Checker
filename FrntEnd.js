import React, { useState } from "react";
import { View, Text, TextInput, Button, ScrollView } from "react-native";
import axios from "axios";

export default function App() {
  const [ingredients, setIngredients] = useState("");
  const [result, setResult] = useState(null);

  const checkIngredients = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/check_ingredients", {
        ingredients: ingredients.split(",").map(i => i.trim()),
      });
      setResult(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>Hair Product Ingredient Checker</Text>
      <TextInput
        placeholder="Enter ingredients (comma-separated)"
        value={ingredients}
        onChangeText={setIngredients}
        style={{ borderWidth: 1, padding: 10, marginVertical: 10 }}
      />
      <Button title="Check" onPress={checkIngredients} />

      {result && (
        <ScrollView style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {result.safe ? "✅ Safe for curly hair!" : "⚠️ Harmful ingredients found!"}
          </Text>
          {result.harmful.length > 0 && (
            <Text>Harmful Ingredients: {result.harmful.join(", ")}</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
}