import { Text, View, StyleSheet } from 'react-native';
import { instantiate } from 'mobilyflow-react-native-sdk';
import { useEffect, useRef, useState } from 'react';

export default function App() {
  const [uuid, setUUID] = useState('');
  const firstTime = useRef(true);
  useEffect(() => {
    if (firstTime.current) {
      firstTime.current = false;
      console.log('Instanciate');
      const instanceId = instantiate('', '', 0, {});
      console.log('Instance = ', instanceId);
      setUUID(instanceId);
    }
  }, []);
  return (
    <View style={styles.container}>
      <Text>Result: {uuid}</Text>
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
