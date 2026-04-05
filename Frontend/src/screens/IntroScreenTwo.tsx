import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CircleShape from "../components/CircleShape";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../theme/ThemeProvider";

type ContactProps = NativeStackNavigationProp<RootStack, "IntroScreenTwo">;

export default function IntroScreenTwo() {

    const navigation = useNavigation<ContactProps>();

    const { applied } = useTheme();

    return (
        <SafeAreaView className="bg-[#DCCEF6] h-full  items-center dark:bg-[#6B37CD]">
            <StatusBar hidden={true} />
            <CircleShape width={620} height={750} borderRadius={999} leftValue={-100} topValue={-100} className="bg-white dark:bg-gray-900" />

            <Image source={require("../../assets/Groupchat.png")} className="h-[220px] w-[300px] mt-40" />

            <View className="items-center flex">
                <Text className="font-bold text-[23px] mt-7 mb-2 dark:text-[#6C63FF]">Real-Time Group Chats</Text>
                <Text className="font-medium text-slate-500 text-sm mx-10 text-center">Join event specific group chats and keep the conversation flowing.</Text>
            </View>

            <View className="justify-center items-center  absolute  bottom-16">
                <TouchableOpacity className="rounded-full bg-[#3f2769] p-4 w-96 " onPress={()=>navigation.replace("IntroScreenThree")}>
                    <Text className="text-white text-[20px] font-bold text-center">Next</Text>
                </TouchableOpacity>
                <Text className="font-bold text-slate-600 text-base mt-7 dark:text-slate-400">Skip</Text>
            </View>
        </SafeAreaView>
    );
}