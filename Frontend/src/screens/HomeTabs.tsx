import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatsScreen from "./ChatsScreen";
import StatusScreen from "./StatusScreen";
import CallsScreen from "./CallsScreen";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import ProfileScreen from "./ProfileScreen";
import ExploreTab from "./ExploreTab";
import EventsTab from "./EventTabs";

const Tabs = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({color}) => {
          let iconName = "chat-bubble";
          if (route.name === "Chats") iconName = "chat-bubble";
          else if (route.name === "Explore") iconName = "explore";
          else if (route.name === "Events") iconName = "event";
          else if (route.name === "Profile") iconName = "person"; 
          return <MaterialIcons name={iconName as any} size={26} color={color} />;
        },
        tabBarLabelStyle:{fontSize:15,fontWeight:'600'},
        tabBarActiveTintColor:"#ae80ff",
        tabBarInactiveTintColor:"#9ca3af",
        tabBarStyle:{
          height:80,
          backgroundColor:"#000000",
          paddingTop:5
        }
      })}
    >
      <Tabs.Screen
        name="Chats"
        component={ChatsScreen}
        options={{ headerShown: false }}
      />
      <Tabs.Screen name="Explore" component={ExploreTab} options={{ headerShown: false }} />
      <Tabs.Screen name="Events" component={EventsTab} options={{ headerShown: false }} />
      <Tabs.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }}/>
    </Tabs.Navigator>
  );
}
