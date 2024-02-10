import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import Feed from './Feed';
import RequestPage from './RequestPage';
import GiveStatusPage from './GiveStatusPage'

const Stack = createStackNavigator();
console.log("beginning")
function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Feed" component={Feed} />
      <Stack.Screen name="RequestPage" component={RequestPage} />
      <Stack.Screen name="GiveStatusPage" component={GiveStatusPage} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}
