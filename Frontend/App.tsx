import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import "./global.css"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from './src/screens/SplashScreen';
import { ThemeProvider } from './src/theme/ThemeProvider';
import { UserRegistrationProvider } from './src/components/UserContext';
import { AlertNotificationRoot } from 'react-native-alert-notification';
import IntroScreenOne from './src/screens/IntroScreenOne';
import IntroScreenTwo from './src/screens/IntroScreenTwo';
import IntroScreenThree from './src/screens/IntroScreenThree';
import ContactScreen from './src/screens/ContactScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import SuccessScreen from './src/screens/SuccessScreen';
import HomeScreen from './src/screens/HomeScreen';
import SingleChatScreen from './src/screens/SingleChatScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import NewContactScreen from './src/screens/NewContactScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import HomeTabs from './src/screens/HomeTabs';
import { WebSocketProvider } from './src/socket/WebSocketProvider';
import { useContext } from 'react';
import { AuthContext, AuthProvider } from './src/components/AuthProvider';
import NewChatScreen from './src/screens/NewChatScreen';
import SignInScreen from './src/screens/SignInScreen';
import UserProfileScreen from './src/screens/userProfileScreen';
import { EventRegistrationProvider } from './src/components/EventContext';

export type RootStack = {
  SplashScreen: undefined;
  IntroScreenOne: undefined;
  IntroScreenTwo: undefined;
  IntroScreenThree: undefined;
  ContactScreen: undefined;
  SignUpScreen: undefined;
  SuccessScreen: undefined;
  HomeScreen: undefined;
  SingleChatScreen: {
    chatId: number;
    friendName: string;
    lastSeenTime: string;
    profileImage: string;
  };
  ProfileScreen: undefined;
  userProfileScreen: {
    id: number;
    friendName: string;
    profileImage: string;
  };

  NewContactScreen: undefined;
  SettingsScreen: undefined;
  NewChatScreen: undefined;
  SignInScreen: undefined;

}
const Stack = createNativeStackNavigator<RootStack>();

function VibeChat() {
  const auth = useContext(AuthContext);
  // 
  return (
    <AlertNotificationRoot>
      <WebSocketProvider userId={auth ? Number(auth.userId) : 0}>
        <ThemeProvider>
          <EventRegistrationProvider>
            <UserRegistrationProvider>
              <NavigationContainer>
                <Stack.Navigator
                  initialRouteName="SplashScreen"
                  screenOptions={{ animation: "slide_from_right" }}
                >
                  {auth?.isLoading && (
                    <Stack.Screen
                      name="SplashScreen"
                      component={SplashScreen}
                      options={{ headerShown: false }}
                    />
                  )}

                  {!auth?.isLoading && auth?.userId === null && (
                    <Stack.Group>
                      <Stack.Screen
                        name="IntroScreenOne"
                        component={IntroScreenOne}
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="IntroScreenTwo"
                        component={IntroScreenTwo}
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="IntroScreenThree"
                        component={IntroScreenThree}
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="ContactScreen"
                        component={ContactScreen}
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="SignUpScreen"
                        component={SignUpScreen}
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="SuccessScreen"
                        component={SuccessScreen}
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="SignInScreen"
                        component={SignInScreen}
                        options={{ headerShown: false }}
                      />
                    </Stack.Group>
                  )}

                  {!auth?.isLoading && auth?.userId !== null && (
                    <Stack.Group>
                      <Stack.Screen
                        name="HomeScreen"
                        component={HomeTabs}
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="SingleChatScreen"
                        component={SingleChatScreen}
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="ProfileScreen"
                        component={ProfileScreen}
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="NewContactScreen"
                        component={NewContactScreen}
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="SettingsScreen"
                        component={SettingsScreen}
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="NewChatScreen"
                        component={NewChatScreen}
                        options={{ headerShown: false }}
                      />
                      <Stack.Screen
                        name="userProfileScreen"
                        component={UserProfileScreen}
                        options={{ headerShown: false }}
                      />
                    </Stack.Group>
                  )}
                </Stack.Navigator>
              </NavigationContainer>
            </UserRegistrationProvider>
          </EventRegistrationProvider>
        </ThemeProvider>
      </WebSocketProvider>
    </AlertNotificationRoot>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <VibeChat />
    </AuthProvider>
  );
}