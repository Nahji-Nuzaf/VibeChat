import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CircleShape from "../components/CircleShape";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";

type ContactProps = NativeStackNavigationProp<RootStack, "IntroScreenThree">;

export default function IntroScreenThree() {

    const navigation = useNavigation<ContactProps>();

    return (
        <SafeAreaView className="bg-[#DCCEF6] h-full  items-center dark:bg-[#6B37CD]">
            <StatusBar hidden={true} />
            <CircleShape width={620} height={750} borderRadius={999} leftValue={-100} topValue={-100} className="bg-white dark:bg-gray-900" />

            <Image source={require("../../assets/eventfocusedimg.png")} className="h-[220px] w-[350px] mt-40" />

            <View className="items-center flex">
                <Text className="font-bold text-[23px] mt-7 mb-2 dark:text-[#6C63FF]">Event-focused communication</Text>
                <Text className="font-medium text-slate-500 text-sm mx-14 text-center">Chat with friends, colleagues or communities during live events and gathering.</Text>
            </View>

            <View className="justify-center items-center  absolute  bottom-24">
                <TouchableOpacity className="rounded-full  p-4 w-96 bg-[#3f2769]" onPress={()=>navigation.replace("ContactScreen")}>
                    <Text className="text-white text-[20px] font-bold text-center">Get Started</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}