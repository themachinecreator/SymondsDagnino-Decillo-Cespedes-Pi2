import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/Screens/Login/Login';
import Register from './src/Screens/Register/Register';
import HomeMenu from './src/Components/HomeMenu/HomeMenu';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="HomeMenu" component={HomeMenu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App