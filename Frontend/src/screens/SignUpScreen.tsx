import { ActivityIndicator, FlatList, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, useColorScheme, View } from "react-native";
import { ALERT_TYPE, AlertNotificationRoot, Toast } from "react-native-alert-notification";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from 'expo-image-picker';
import { useContext, useState } from "react";
import { AntDesign, Feather, FontAwesome6 } from "@expo/vector-icons";
import { validateFirstName, validateLastName, validateProfileImage } from "../util/Validation";
import { useUserRegistration } from "../components/UserContext";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { createNewAccount } from "../api/UserService";
import { Asset } from 'expo-asset';
import { AuthContext } from "../components/AuthProvider";

type ContactProps = NativeStackNavigationProp<RootStack, "SignUpScreen">;

export default function SignUpScreen() {

    const navigation = useNavigation<ContactProps>();

    const [image, setImage] = useState<string | null>(null);

    const [loading, setLoading] = useState(false);


    const { userData, setUserData } = useUserRegistration();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");


    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        // console.log(result);
        if (!result.canceled) {
            setImage(result.assets[0].uri);
            setUserData((previous) => ({
                ...previous,
                profileImage: result.assets[0].uri,
            }));
        }
        // console.log(image);
    };

    const avatars = [
        require("../../assets/avatar/avatar_1.png"),
        require("../../assets/avatar/avatar_2.png"),
        require("../../assets/avatar/avatar_3.png"),
        require("../../assets/avatar/avatar_4.png"),
        require("../../assets/avatar/avatar_5.png"),
    ];

    const handleAvatarSelect = async (avatarAsset: any) => {
        try {
            const asset = Asset.fromModule(avatarAsset);
            await asset.downloadAsync();

            const fileUri = asset.localUri || asset.uri;

            setImage(fileUri);
            setUserData((previous) => ({
                ...previous,
                profileImage: fileUri,
            }));
        } catch (error) {
            console.error("Failed to load avatar file:", error);
        }
    };

    const auth = useContext(AuthContext);

    const colorScheme = useColorScheme(); // returns "light" or "dark"

    const isDark = colorScheme === 'dark';
    const textColor = isDark ? '#fff' : '#000'; // white for dark mode, black for light mode

    return (

        <AlertNotificationRoot>

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                >

                    <SafeAreaView className=" px-5 py-5 dark:bg-gray-900 bg-white flex-1" >
                        <StatusBar hidden={true} />

                        <View className="mb-2 relative items-center">
                            <Pressable
                                onPress={() => {
                                    navigation.goBack();
                                }}
                                className="absolute left-0"
                            >
                                <Feather name="arrow-left" size={28} color={textColor} />
                            </Pressable>
                            <Text className="text-2xl font-semibold text-center dark:text-gray-300" >Fill Your Profile</Text>
                        </View>

                        <View className="items-center justify-center mb-10 mt-16 px-2">

                            <Pressable className="w-36 h-36 rounded-full bg-[#f0e6ff] dark:bg-gray-800 justify-center items-center border-2 border-[#8042EA]"
                                onPress={pickImage}>
                                {image ? (
                                    <Image source={{ uri: image }} className="h-[120] w-[120] rounded-full" />
                                ) : (
                                    <View className="items-center">
                                        <Text className="font-bold text-2xl text-slate-500 dark:text-white">+</Text>
                                        <Text className="font-bold text-lg text-slate-500 dark:text-white">Add Image</Text>
                                    </View>
                                )}
                            </Pressable>
                            <Text className="text-base my-5 text-slate-400 font-normal ">Select an Image or an Avatar</Text>
                            <FlatList
                                data={avatars}
                                horizontal
                                keyExtractor={(_, index) => index.toString()}
                                renderItem={({ item }) => (
                                    // <TouchableOpacity onPress={() => {
                                    //     setImage(Image.resolveAssetSource(item).uri);
                                    //     setUserData((previous) => ({
                                    //         ...previous,
                                    //         profileImage: Image.resolveAssetSource(item).uri,
                                    //     }));
                                    // }}>
                                    //     <Image source={item} className="h-20 w-20 rounded-full mx-2 border-2 border-gray-200" />
                                    // </TouchableOpacity>

                                    <TouchableOpacity onPress={() => handleAvatarSelect(item)}>
                                        <Image source={item} className="h-20 w-20 rounded-full mx-2 border-2 border-gray-200 dark:border-purple-500" />
                                    </TouchableOpacity>

                                )}

                                contentContainerStyle={{ paddingHorizontal: 10 }}
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>

                        <View className="px-2">

                            <TextInput className="text-lg bg-[#FAF8FF] dark:bg-[#1E1E24] dark:text-white text-start mt-2 border-2 font-medium rounded-2xl border-[#8042EA] w-full ps-5"
                                placeholder="First Name"
                                value={userData.firstName}
                                onChangeText={(text) => {
                                    setUserData((previous) => ({
                                        ...previous,
                                        firstName: text,
                                    }));
                                }}
                                placeholderTextColor={"gray"}
                            />
                            <TextInput className="text-lg bg-[#FAF8FF] dark:bg-[#1E1E24] dark:text-white  text-start mt-5 border-2 font-medium rounded-2xl border-[#8042EA] w-full ps-5"
                                placeholder="Last Name"
                                value={userData.lastName}
                                onChangeText={(text) => {
                                    setUserData((previous) => ({
                                        ...previous,
                                        lastName: text,
                                    }));
                                }}
                                placeholderTextColor={"gray"}
                            />
                        </View>


                        <View className=" w-full justify-center items-center mt-56">
                            <TouchableOpacity className="rounded-full bg-[#673AB7] p-4 w-96"
                                disabled={loading ? true : false}
                                onPress={async () => {

                                    const validateProfile = validateProfileImage(
                                        userData.profileImage ? { uri: userData.profileImage, type: "", fileSize: 0 } : null
                                    );

                                    let validFirstName = validateFirstName(userData.firstName);
                                    let validLastName = validateLastName(userData.lastName);

                                    if (validateProfile) {
                                        Toast.show({
                                            type: ALERT_TYPE.WARNING,
                                            title: "Warning",
                                            textBody: "Select a Profile Image or an Avatar",
                                        });
                                    } else if (validFirstName) {
                                        Toast.show({
                                            type: ALERT_TYPE.WARNING,
                                            title: "Warning",
                                            textBody: validFirstName,
                                        });
                                    } else if (validLastName) {
                                        Toast.show({
                                            type: ALERT_TYPE.WARNING,
                                            title: "Warning",
                                            textBody: validLastName,
                                        });
                                    } else {

                                        try {
                                            setLoading(true);
                                            const response = await createNewAccount(userData);
                                            if (response.status) {
                                                const id = response.userId;
                                                if (auth) {
                                                    await auth.signUp(String(id));
                                                    // navigation.replace("HomeScreen");
                                                }

                                            } else {
                                                Toast.show({
                                                    type: ALERT_TYPE.WARNING,
                                                    title: "Warning",
                                                    textBody: response.message,
                                                });
                                            }
                                        } catch (error) {
                                            console.log(error);
                                        } finally {
                                            setLoading(false);
                                        }

                                    }
                                }}>

                                {loading ? (
                                    <ActivityIndicator size={"large"} color={"blue"} />
                                ) : (
                                    <Text className="text-white text-[20px] font-bold text-center">
                                        Continue
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>

                </ScrollView>

            </KeyboardAvoidingView >
        </AlertNotificationRoot>
    );
}