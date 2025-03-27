import { View, Text, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import {NavTab} from "./components/NavTab";

export default function App() {
  return (
      <NavigationContainer>
        <View style={styles.header}>
          <Image source={require('./assets/logo.png')} style={styles.logo} />
          <Text style={{ fontSize: 20, fontWeight: 'bold' }}>FirstMobileApp</Text>
        </View>

        <NavTab/>

        <View style={styles.footer}><Text>Павлусенко Олександр ІПЗ-23-2</Text></View>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 5
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer: {
    flex: 0.04,
    backgroundColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: '40%',
    height: 50,
  }
});
