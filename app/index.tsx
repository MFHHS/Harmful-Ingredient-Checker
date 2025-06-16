import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function Home() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Welcome to Arjunaloka 🧴🌸</Text>
      <Button title="Start Scan" onPress={() => router.push('/scan')} />
    </View>
  );
}
