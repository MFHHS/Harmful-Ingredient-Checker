import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function ResultScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Here’s the Scan Result ✅</Text>
      <Button title="Back to Home" onPress={() => router.replace('/')} />
    </View>
  );
}
