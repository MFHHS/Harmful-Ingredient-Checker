import { useRouter } from 'expo-router';
import { Button, Text, View } from 'react-native';

export default function ScanScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>This is the Scan Page 🔍</Text>
      <Button title="Analyse" onPress={() => router.push('/result')} />
    </View>
  );
}
