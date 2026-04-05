import { Feather, Ionicons, MaterialCommunityIcons, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStack } from "../../App";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NewChatScreenProp = NativeStackNavigationProp<RootStack, "SettingsScreen">;

export default function SettingsScreen() {

    const navigation = useNavigation<NewChatScreenProp>();

    const colorScheme = useColorScheme();

    const isDark = colorScheme === 'dark';
    const textColor = isDark ? '#fff' : '#000';

    return (
        <SafeAreaView className="flex-1 px-4 dark:bg-gray-900 bg-white">

            <View className="mb-2 relative items-center justify-center mt-3">
                <Pressable
                    onPress={() => {
                            navigation.goBack();
                        }}
                    className="absolute left-0 ms-1"
                >
                    <Feather name="arrow-left" size={26} color={textColor} />
                </Pressable>
                <Text className="text-2xl text-black font-semibold text-center dark:text-white">Settings</Text>
                <Pressable
                    // onPress={() => navigation.navigate("ContactScreen")}
                    className="absolute right-0 me-1"
                >
                    <SimpleLineIcons name="options-vertical" size={20} color={textColor} />
                </Pressable>
            </View>


            <View className="px-4 mt-7 gap-4">
                <Text className="font-semibold text-base mb-2 dark:text-gray-300">Choose Theme</Text>

                <View className="flex-row items-center gap-5">
                    <View className="h-12 w-12 rounded-full  justify-center items-center bg-[#f0e6ff]">
                        <MaterialCommunityIcons name="theme-light-dark" size={21} color="purple" />
                    </View>
                    <Text className="text-lg font-medium dark:text-white">Default</Text>
                </View>

                <View className="flex-row items-center gap-5">
                    <View className="h-12 w-12 rounded-full  justify-center items-center bg-[#f0e6ff]">
                        <MaterialIcons name="dark-mode" size={21} color="purple" />
                    </View>
                    <Text className="text-lg font-medium dark:text-white">Dark</Text>
                </View>

                <View className="flex-row items-center gap-5">
                    <View className="h-12 w-12 rounded-full  justify-center items-center bg-[#f0e6ff]">
                        <MaterialIcons name="light-mode" size={21} color="purple" />
                    </View>
                    <Text className="text-lg font-medium dark:text-white">Light</Text>
                </View>

            </View>


        </SafeAreaView>
    );
}