import { Button, Text, View } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Welcome to Arjunaloka 🧴🌸</Text>
      <Button title="Start Scan" onPress={() => navigation.navigate('Scan')} />
    </View>
  );
}
