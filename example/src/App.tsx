import { StyleSheet, Text, View } from 'react-native';
import { instantiate, login } from 'mobilyflow-react-native-sdk';
import { useEffect, useRef, useState } from 'react';

export default function App() {
  const [result, setResult] = useState('');
  const firstTime = useRef(true);
  useEffect(() => {
    if (firstTime.current) {
      firstTime.current = false;
      const instanceId = instantiate('', '', 0, { languages: ['en', 'fr'] });
      instantiate('', '', 0, { languages: ['en', 'fr'] });
      login(instanceId, 'user-external-id');
      setResult(instanceId);
    }
  }, []);
  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
