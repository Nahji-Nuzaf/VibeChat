import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import "../../global.css"
import CircleShape from "../components/CircleShape";
import { useEffect, useRef } from "react";
// import { useSharedValue } from "react-native-worklets-core";
import Animated, { withTiming, useSharedValue, useAnimatedStyle } from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { runOnJS } from "react-native-worklets";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "../theme/ThemeProvider";
import { useWebSocketPing } from "../socket/UseWebSocketPing";

type Props = NativeStackNavigationProp<RootStack, "SplashScreen">;

export default function SplashScreen() {

    const navigation = useNavigation<Props>();

    const opacity = useSharedValue(0);
    useWebSocketPing(60000); // 1000 * 60 * 4

    useEffect(() => {
        opacity.value = withTiming(1, { duration: 2000 });
        const timer = setInterval(() => {
            navigation.replace("IntroScreenOne");
        }, 5000);

        return () => {
            clearTimeout(timer);
        }

    }, [navigation, opacity]);

    const animatedStyle = useAnimatedStyle(() => {
        return { opacity: opacity.value };
    });

    const { applied } = useTheme();

    const logo = applied === "dark" ? require("../../assets/logo-darkmode.png") : require("../../assets/logo-lightmode.png");

    return (
        <SafeAreaView className="flex-1 justify-center items-center bg-white dark:bg-gray-950">
            <StatusBar hidden={true} />
            <Animated.View style={animatedStyle}>
                <Image source={logo} className="h-[380px] w-[300px]" />
            </Animated.View>

            <Animated.View style={animatedStyle} className="absolute justify-center items-center bottom-12">
                    <Text className="text-slate-500 font-semibold text-sm">Developed By: {process.env.EXPO_PUBLIC_APP_OWNER}</Text>
                    <Text className="text-slate-500 font-semibold text-sm">Version: {process.env.EXPO_PUBLIC_APP_VERSION}</Text>
            </Animated.View>
        </SafeAreaView>
    );
}
