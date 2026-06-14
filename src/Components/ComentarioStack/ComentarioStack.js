import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../Screens/Home/Home';
import Comentarios from '../../Screens/Comentarios/Comentarios';

const Stack = createNativeStackNavigator();

function ComentarioStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Comentarios" component={Comentarios} />
    </Stack.Navigator>
  );
}

export default ComentarioStack;
