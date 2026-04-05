import { Entypo, Feather, FontAwesome, Ionicons, Octicons, SimpleLineIcons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { Image, Pressable, StatusBar, Text, TouchableOpacity, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker';
import { useUserRegistration } from "../components/UserContext";
import { AuthContext } from "../components/AuthProvider";
import { uploadProfileImage } from "../api/UserService";
import { useUserProfile } from "../socket/UseUserProfile";
import { useTheme } from "../theme/ThemeProvider";

export default function ProfileScreen() {

    const [image, setImage] = useState<string | null>(null);
    const { userData, setUserData } = useUserRegistration();
    const userProfile = useUserProfile();
    const { applied } = useTheme();

    const auth = useContext(AuthContext);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            uploadProfileImage(String(auth ? auth.userId : 0), result.assets[0].uri);
        }
    };

    const colorScheme = useColorScheme(); 

    const isDark = colorScheme === 'dark';
    const textColor = isDark ? '#fff' : '#000';

    return (
        <SafeAreaView className="dark:bg-gray-900 bg-white flex-1 px-4">
            <StatusBar hidden={true} />

            <View className="mb-2 relative items-center justify-center mt-3">
                <Pressable
                    // onPress={() => navigation.navigate("ContactScreen")}
                    className="absolute left-0 ms-1"
                >
                    <Feather name="arrow-left" size={26} color={textColor} />
                </Pressable>
                <Text className="text-2xl font-semibold text-center dark:text-white">My Profile</Text>
                <Pressable
                    onPress={() => {
                        pickImage();
                    }}
                    className="absolute right-0 me-1"
                >
                    <Feather name="edit-3" size={20} color={textColor} />
                </Pressable>
            </View>

            <View className="items-center justify-center mb-3 mt-10 px-2">

                <Pressable className="w-36 h-36 rounded-full bg-[#f0e6ff] justify-center items-center border-2 border-[#8042EA]"

                >
                    {image ? (
                        <Image
                            className="w-40 h-40 rounded-full border-gray-300 border-2"
                            source={{ uri: image }}
                        />
                    ) : (
                        <Image
                            className="w-40 h-40 rounded-full border-gray-300 border-2"
                            source={{ uri: userProfile?.profileImage }}
                        />
                    )}
                </Pressable>
                <Text className="text-3xl my-5 text-slate-800 font-semibold dark:text-white">{userProfile?.firstName} {userProfile?.lastName}</Text>
            </View>

            <View className="items-center justify-center mb-10">
                <View className="flex-row gap-5 items-center">
                    <View className="h-12 w-12 bg-slate-200 rounded-full border border-black justify-center items-center">
                        <Ionicons name="videocam-outline" size={22} color="black" />
                    </View>
                    <View className="h-12 w-12 bg-slate-200 rounded-full border border-black justify-center items-center">
                        <Ionicons name="call-outline" size={22} color="black" />
                    </View>
                    <View className="h-12 w-12 bg-slate-200 rounded-full border border-black justify-center items-center">
                        <FontAwesome name="star-o" size={24} color="black" />
                    </View>
                </View>
            </View>

            <View className="px-4 mb-3">
                <Text className="font-semibold text-base mb-2 dark:text-gray-300">Mobile Number</Text>
                <View className="flex-row items-center gap-5">
                    <View className="h-11 w-11 rounded-full justify-center items-center bg-[#f0e6ff]">
                        <Ionicons name="call-outline" size={22} color="purple" />
                    </View>
                    <Text className="text-lg font-medium dark:text-white">{userProfile?.countryCode} {userProfile?.contactNo}</Text>
                </View>
            </View>

            <View className="h-[1px] bg-gray-200"></View>

            <View className="px-4 mt-3">
                <Text className="font-semibold text-base mb-2 dark:text-gray-300">Country</Text>
                <View className="flex-row items-center gap-5">
                    <View className="h-11 w-11 rounded-full  justify-center items-center bg-[#f0e6ff]">
                        <Entypo name="location-pin" size={22} color="purple" />
                    </View>
                    <Text className="text-lg font-medium dark:text-white">Sri Lanka</Text>
                </View>
            </View>

            <TouchableOpacity className="mt-10 bg-[#f0e6ff] flex-row gap-3 p-3 justify-center rounded-full border border-[#8042EA]"
                onPress={() => {
                    if (auth) auth.signOut();
                }}
            >
                <Text className="text-lg font-medium">Sign Out</Text>
                <Octicons name="sign-out" size={24} color="black" />
            </TouchableOpacity>

        </SafeAreaView>
    );
}