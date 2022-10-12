import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ButtonProps {
  title: string;
}

function Button(props: ButtonProps) {
  return (
    <TouchableOpacity style={{backgroundColor: '#fff', paddingVertical: 15, paddingHorizontal: 20,borderRadius: 20, marginTop: 20}}>
      <Text style={{fontSize: 18}}>
        {props.title}
      </Text>
    </TouchableOpacity>
  )
}

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello React Native!</Text>

      <Button title="Send 1"/>
      <Button title="Send 2"/>
      <Button title="Send 3"/>
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: "#fff", 
    fontSize: 30
  }
});
