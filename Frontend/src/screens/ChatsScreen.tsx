import { SafeAreaView } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./HomeScreen";
import NewChatScreen from "./NewChatScreen";
import SettingsScreen from "./SettingsScreen";
const Stack = createNativeStackNavigator();

export default function ChatsScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="NewChatScreen" component={NewChatScreen} options={{ headerShown: false }} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}
