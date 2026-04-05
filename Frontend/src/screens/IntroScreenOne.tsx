import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CircleShape from "../components/CircleShape";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../theme/ThemeProvider";

type ContactProps = NativeStackNavigationProp<RootStack, "IntroScreenOne">;

export default function IntroScreenOne() {

    const navigation = useNavigation<ContactProps>();

    const { applied } = useTheme();

    const logo = applied === "dark" ? require("../../assets/logo-darkmode.png") : require("../../assets/logo-lightmode.png");

    return (
        <SafeAreaView className="bg-[#DCCEF6] h-full  items-center dark:bg-[#6B37CD]">
            <StatusBar hidden={true} />
            <CircleShape width={620} height={750} borderRadius={999} leftValue={-100} topValue={-100} className="bg-white dark:bg-gray-900" />

            <Image source={require("../../assets/privatemsg.png")} className="h-[340px] w-[340px] mt-20" />

            <View className="items-center flex">
                <Text className="font-bold text-[23px] mt-2 mb-2 dark:text-[#6C63FF]">Secure & Private Messaging</Text>
                <Text className="font-medium text-slate-500 text-sm mx-10 text-center">Enjoy peace of mind with encrypted event chats.</Text>
            </View>

            <View className="justify-center items-center  absolute  bottom-16">
                <TouchableOpacity className="rounded-full bg-[#3f2769] p-4 w-96 " onPress={()=>navigation.replace("IntroScreenTwo")}>
                    <Text className="text-white text-[20px] font-bold text-center">Next</Text>
                </TouchableOpacity>
                <Text className="font-bold text-slate-600 text-base mt-7 dark:text-slate-400">Skip</Text>
            </View>
        </SafeAreaView>
    );
}