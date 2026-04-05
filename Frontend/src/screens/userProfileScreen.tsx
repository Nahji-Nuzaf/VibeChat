import { Entypo, Feather, FontAwesome, Ionicons, Octicons, SimpleLineIcons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { Image, Pressable, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker';
import { useUserRegistration } from "../components/UserContext";
import { AuthContext } from "../components/AuthProvider";
import { uploadProfileImage } from "../api/UserService";
import { useUserProfile } from "../socket/UseUserProfile";
import { useTheme } from "../theme/ThemeProvider";
import { User } from "../socket/chat";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStack } from "../../App";

type Props = NativeStackScreenProps<RootStack, "userProfileScreen">;

export default function UserProfileScreen({ route, navigation }: Props) {

    const { id, friendName, profileImage } = route.params;

    const [image, setImage] = useState<string | null>(profileImage ?? null);
    // const { userData, setUserData } = useUserRegistration();
    const userProfile = useUserProfile();
    const { applied } = useTheme();

    const auth = useContext(AuthContext);

    // const userProfile = useUserProfile(id); // Pass friend id to fetch their profile


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

      const displayUser: User | null = userProfile || null;

    const item: { item: User } | null = userProfile ? { item: userProfile } : null;

    return (
        <SafeAreaView className="py-5 px-4">
            <StatusBar hidden={true} />

            <View className="mb-2 relative items-center">
                <Pressable
                    // onPress={() => navigation.navigate("ContactScreen")}
                    className="absolute left-0 ms-3"
                >
                    <Feather name="arrow-left" size={28} color="black" />
                </Pressable>
                <Text className="text-2xl font-semibold text-center">My Profile</Text>
                <Pressable
                    onPress={() => {
                        pickImage();
                    }}
                    className="absolute right-0 me-3"
                >
                    <Feather name="edit-3" size={24} color="black" />
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
                            source={{ uri: item?.item.profileImage }}
                        />
                    )}
                </Pressable>
                <Text className="text-3xl my-5 text-slate-800 font-semibold ">{item?.item.firstName} {item?.item.lastName}</Text>
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
                <Text className="font-semibold text-base mb-2">Mobile Number</Text>
                <View className="flex-row items-center gap-5">
                    <View className="h-12 w-12 rounded-full  justify-center items-center bg-[#f0e6ff]">
                        <Ionicons name="call-outline" size={21} color="purple" />
                    </View>
                    <Text className="text-lg font-medium">{item?.item.countryCode} {item?.item.contactNo}</Text>
                </View>
            </View>

            <View className="h-[1px] bg-gray-200"></View>

            <View className="px-4 mt-3">
                <Text className="font-semibold text-base mb-2">Country</Text>
                <View className="flex-row items-center gap-5">
                    <View className="h-12 w-12 rounded-full  justify-center items-center bg-[#f0e6ff]">
                        <Entypo name="location-pin" size={21} color="purple" />
                    </View>
                    <Text className="text-lg font-medium">Sri Lanka</Text>
                </View>
            </View>


        </SafeAreaView>
    );
}