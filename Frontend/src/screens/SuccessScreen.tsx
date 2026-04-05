import { Feather } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";

type ContactProps = NativeStackNavigationProp<RootStack, "SuccessScreen">;

export default function SuccessScreen() {

    const navigation = useNavigation<ContactProps>();

    return (
        <SafeAreaView className="items-center justify-center flex-1">
            <View className=" items-center justify-center -mt-14">
                <View className="h-28 w-28 rounded-[25px] bg-purple-300 items-center justify-center">
                    <Feather name="check" size={55} color="#673AB7" />
                </View>
                <Text className="mt-8 font-semibold text-[22px]">Profile Created Successfully!</Text>
                <Text className="mt-5 font-normal text-slate-500 text-sm text-center mx-12">Successfully created your account, tap the finish button to open your VibeChat.</Text>

            </View>

            <View className=" w-full justify-center items-center absolute bottom-16">
                <TouchableOpacity className="rounded-full bg-[#673AB7] p-4 w-96 "

                    onPress={() => {
                        navigation.replace("HomeScreen");
                    }}

                >
                    <Text className="text-white text-[20px] font-bold text-center">Finish</Text>
                </TouchableOpacity>
            </View>

        </SafeAreaView>
    );
}