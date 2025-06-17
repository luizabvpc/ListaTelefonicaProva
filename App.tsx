import {NavigationContainer} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListaContatos from "./pages/ListaContatos";
import AdicionarContato from "./pages/AdicionarContato";
import EditarContato from "./pages/EditarContato";


const Stack = createNativeStackNavigator();

export default function App()
{
  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name= "ListaContatos"
        component={ListaContatos}
      />
      <Stack.Screen
        name="AdicionarContato"
        component={AdicionarContato}
      />
      <Stack.Screen
        name= "EditarContato"
        component={EditarContato}
      />
    </Stack.Navigator>
  </NavigationContainer>
}