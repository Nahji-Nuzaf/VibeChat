import { ActivityIndicator, Image, KeyboardAvoidingView, Platform, ScrollView, StatusBar, Text, TextInput, TouchableOpacity, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CountryPicker, { Country, CountryCode } from "react-native-country-picker-modal";
import { useContext, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { useUserRegistration } from "../components/UserContext";
import { validateCountryCode, validatePhoneNo } from "../util/Validation";
import { ALERT_TYPE, AlertNotificationRoot, Toast } from "react-native-alert-notification";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { loginUser } from "../api/UserService";
import { AuthContext } from "../components/AuthProvider";
import { useTheme } from "../theme/ThemeProvider";

type SignInProps = NativeStackNavigationProp<RootStack, "ContactScreen">;

export default function SignInScreen() {

    const navigation = useNavigation<SignInProps>();

    const [countryCode, setCountryCode] = useState<CountryCode>("LK");
    const [country, setCountry] = useState<Country | null>(null);
    const [show, setShow] = useState<boolean>(false);

    const { userData, setUserData } = useUserRegistration();
    const [callingCode, setCallingCode] = useState("+94");
    const [phoneNo, setPhoneNo] = useState("");

    const [loading, setLoading] = useState(false);
    const auth = useContext(AuthContext);

    const { applied } = useTheme();

    const logo = applied === "dark" ? require("../../assets/logo-darkmode.png") : require("../../assets/logo-lightmode.png");

    const colorScheme = useColorScheme(); // returns "light" or "dark"

    const isDark = colorScheme === 'dark';
    const textColor = isDark ? '#fff' : '#000'; // white for dark mode, black for light mode

    return (
        // <AlertNotificationRoot>
        //     <KeyboardAvoidingView
        //         behavior={Platform.OS === 'android' ? 'padding' : 'height'}
        //         keyboardVerticalOffset={100}
        //     >

        //         <SafeAreaView>
        //             <StatusBar hidden={true} />

        //             {/* <KeyboardAvoidingView behavior={Platform.OS === "android" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "android" ? 10 : 10} > */}
        //             <View className="p-5 items-center">

        //                 <View>
        //                     <Image source={require("../../assets/logo-lightmode.png")} className="h-80 w-80" />
        //                 </View>
        //                 <View>
        //                     <Text className="font-bold text-3xl -mt-8 text-center text-orange-600" >LogIn to VibeChat</Text>
        //                     <Text className="font-normal text-sm text-center mt-2 mx-9 text-slate-500" >Enter your mobile number to continue using VibeChat</Text>
        //                 </View>

        //                 <View className=" w-full flex flex-row justify-center items-center h-14 mt-4">
        //                     <CountryPicker
        //                         countryCode={countryCode}
        //                         withFilter
        //                         withFlag
        //                         withCountryNameButton
        //                         withCallingCode
        //                         visible={show}
        //                         onClose={() => { setShow(false) }}
        //                         onSelect={(c) => {
        //                             setCountryCode(c.cca2);
        //                             setCountry(c);
        //                             setShow(false);
        //                         }}
        //                     />
        //                     <AntDesign name="caret-down" size={16} color="black" style={{ marginTop: 5 }} className="ms-3" />
        //                 </View>
        //                 <View className="mt-2 flex flex-row gap-x-1">
        //                     <TextInput inputMode="tel" className="text-lg text-center bg-[#F5F6FA] mt-2 border-2 font-bold rounded-2xl border-[#8042EA] w-[18%]"
        //                         placeholder="+94"
        //                         value={country ? `+${country.callingCode}` : callingCode}
        //                         onChangeText={(text) => {
        //                             setCallingCode(text);
        //                         }}
        //                         editable={true}
        //                     />

        //                     <TextInput inputMode="tel" className="text-lg bg-[#F5F6FA] text-center mt-2 border-2 font-bold rounded-2xl border-[#8042EA] w-[75%] ml-1"
        //                         placeholder="Your Mobile Number"
        //                         value={phoneNo}
        //                         onChangeText={(text) => {
        //                             setPhoneNo(text);
        //                         }}
        //                     />
        //                 </View>
        //             </View>

        //             <View className="items-center mt-5">
        //                 <View className="flex-row">
        //                     <Text>New to VibeChat? </Text>
        //                     <TouchableOpacity onPress={() => { navigation.navigate("ContactScreen") }}>
        //                         <Text className="font-bold text-orange-600">SignUp</Text>
        //                     </TouchableOpacity>
        //                 </View>
        //             </View>


        //             <View className=" w-full justify-center items-center mt-60">

        //             </View>

        //         </SafeAreaView>

        //     </KeyboardAvoidingView>
        // </AlertNotificationRoot>

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
                    <SafeAreaView className="dark:bg-gray-900 bg-white flex-1">
                        <StatusBar hidden={true} />

                        <View className="p-5 items-center">
                            <Image source={logo} className="h-80 w-80" />

                            <Text className="font-bold text-3xl -mt-8 text-center text-orange-600">
                                LogIn to VibeChat
                            </Text>
                            <Text className="font-normal text-sm text-center mt-2 mx-9 text-slate-500">
                                Enter your mobile number to continue using VibeChat
                            </Text>

                            {/* Country picker */}
                            <View className="w-full flex flex-row justify-center items-center h-14 mt-4">
                                <CountryPicker
                                    countryCode={countryCode}
                                    withFilter
                                    withFlag
                                    withCountryNameButton
                                    withCallingCode
                                    visible={show}
                                    onClose={() => setShow(false)}
                                    onSelect={(c) => {
                                        setCountryCode(c.cca2);
                                        setCountry(c);
                                        setShow(false);
                                    }}
                                    theme={{
                                        onBackgroundTextColor: textColor,
                                        backgroundColor: isDark ? '#000' : '#fff',
                                    }}
                                />
                                <AntDesign name="caret-down" size={16} color={textColor} style={{ marginTop: 5 }} />
                            </View>

                            {/* Phone input */}
                            <View className="mt-2 flex flex-row gap-x-1">
                                <TextInput
                                    inputMode="tel"
                                    className="text-lg text-center bg-[#F5F6FA] dark:bg-[#1E1E24] mt-2 border-2 font-bold rounded-2xl dark:text-white border-[#8042EA] w-[18%]"
                                    placeholder="+94"
                                    value={country ? `+${country.callingCode}` : callingCode}
                                    onChangeText={setCallingCode}
                                    editable={true}
                                />
                                <TextInput
                                    inputMode="tel"
                                    className="text-lg bg-[#F5F6FA] text-center mt-2 border-2 font-bold dark:bg-[#1E1E24] rounded-2xl dark:text-white border-[#8042EA] w-[75%] ml-1"
                                    placeholder="Your Mobile Number"
                                    placeholderTextColor={"gray"}
                                    value={phoneNo}
                                    onChangeText={setPhoneNo}
                                />
                            </View>

                            {/* Already have account */}
                            <View className="items-center mt-5">
                                <View className="flex-row">
                                    <Text className="dark:text-gray-500">New to VibeChat? </Text>
                                    <TouchableOpacity onPress={() => navigation.navigate("ContactScreen")}>
                                        <Text className="font-bold text-orange-600">SignUp</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            {/* Button */}
                            <View className="w-full justify-center items-center mt-60">
                                <TouchableOpacity className="rounded-full bg-[#673AB7] p-4 w-96 "
                                    disabled={loading ? true : false}
                                    onPress={async () => {

                                        const validCountryCode = validateCountryCode(callingCode);
                                        const validPhoneNo = validatePhoneNo(phoneNo);

                                        console.log(validCountryCode);
                                        console.log(validPhoneNo);

                                        if (validCountryCode) {
                                            Toast.show({
                                                type: ALERT_TYPE.WARNING,
                                                title: "Warning",
                                                textBody: validCountryCode,
                                            });
                                        } else if (validPhoneNo) {
                                            Toast.show({
                                                type: ALERT_TYPE.WARNING,
                                                title: "Warning",
                                                textBody: validPhoneNo,
                                            });
                                        } else {

                                            try {
                                                setLoading(true);

                                                const response = await loginUser(callingCode, phoneNo);

                                                if (response.status) {
                                                    const id = response.userId;
                                                    if (auth) {
                                                        await auth.signIn(String(id));
                                                    }
                                                    // navigation.replace("HomeScreen", { userId: id });
                                                } else {
                                                    Toast.show({
                                                        type: ALERT_TYPE.WARNING,
                                                        title: "User Not Found",
                                                        textBody: response.message || "No account found. Please sign up first.",
                                                    });
                                                    // navigation.navigate("SignUpScreen");
                                                }
                                            } catch (error) {
                                                console.log("Login error:", error);
                                                Toast.show({
                                                    type: ALERT_TYPE.DANGER,
                                                    title: "Error",
                                                    textBody: "Something went wrong. Try again later.",
                                                });
                                            } finally {
                                                setLoading(false);
                                            }
                                        }
                                    }}
                                >
                                    {loading ? (
                                        <ActivityIndicator size={"large"} color={"blue"} />
                                    ) : (
                                        <Text className="text-white text-[20px] font-bold text-center">Get Started</Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </SafeAreaView>
                </ScrollView>
            </KeyboardAvoidingView>
        </AlertNotificationRoot>


    );
}

// setUserData((previous) => ({
//                                         ...previous,
//                                         countryCode: country
//                                             ? `+${country.callingCode}`
//                                             : callingCode,
//                                         contactNo: phoneNo,
//                                     }));