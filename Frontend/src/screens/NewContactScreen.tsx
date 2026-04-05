import { AntDesign, Feather } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StatusBar, Text, TextInput, TouchableOpacity, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUserRegistration } from "../components/UserContext";
import CountryPicker, { Country, CountryCode } from "react-native-country-picker-modal";
import { validateCountryCode, validateFirstName, validateLastName, validatePhoneNo } from "../util/Validation";
import { ALERT_TYPE, AlertNotificationRoot, Toast } from "react-native-alert-notification";
import { useSendNewContact } from "../socket/UseSendNewContact";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";

type NewContactScreenProp = NativeStackNavigationProp<
    RootStack,
    "NewContactScreen"
>;

export default function NewContactScreen() {

    const navigation = useNavigation<NewContactScreenProp>();

    const [loading, setLoading] = useState(false);


    // const { userData, setUserData } = useUserRegistration();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    const [countryCode, setCountryCode] = useState<CountryCode>("LK");
    const [country, setCountry] = useState<Country | null>(null);
    const [show, setShow] = useState<boolean>(false);

    const [callingCode, setCallingCode] = useState("+94");
    const [phoneNo, setPhoneNo] = useState("");

    const newContact = useSendNewContact();
    const sendNewContact = newContact.sendNewContact;
    const responseText = newContact.responseText;

    const sendData = () => {
        sendNewContact({
            id: 0,
            firstName: firstName,
            lastName: lastName,
            countryCode: callingCode,
            contactNo: phoneNo,
            createdAt: "",
            updatedAt: "",
            status: "",
        });
        setFirstName("");
        setLastName("");
        setCallingCode("+94");
        setPhoneNo("");
    };

    const colorScheme = useColorScheme(); // returns "light" or "dark"

    const isDark = colorScheme === 'dark';
    const textColor = isDark ? '#fff' : '#000'; // white for dark mode, black for light mode


    return (
        <AlertNotificationRoot>
            <SafeAreaView className="py-5 dark:bg-gray-900 h-full flex-1 bg-white">
                <StatusBar hidden={true} />

                <View className="mb-3 relative items-center px-5">
                    <Pressable
                        onPress={() => {
                            navigation.goBack();
                        }}
                        className="absolute left-0 ms-3"
                    >
                        <Feather name="arrow-left" size={28} color={textColor} />
                    </Pressable>
                    <Text className="text-2xl font-semibold text-center dark:text-white">New Contact</Text>

                </View>

                <View className="h-[1px] bg-gray-400"></View>

                <View className="px-5 mt-10">

                    <TextInput className="text-lg bg-[#FAF8FF] dark:bg-[#1E1E24] dark:text-white text-start mt-2 border-2 font-medium rounded-2xl border-[#8042EA] w-full ps-5"
                        placeholder="First Name"
                        value={firstName}
                        onChangeText={(text) => setFirstName(text)}
                        placeholderTextColor={"gray"}
                    />
                    <TextInput className="text-lg bg-[#FAF8FF] dark:bg-[#1E1E24] dark:text-white text-start mt-5 border-2 font-medium rounded-2xl border-[#8042EA] w-full ps-5"
                        placeholder="Last Name"
                        value={lastName}
                        onChangeText={(text) => setLastName(text)}
                        placeholderTextColor={"gray"}
                    />
                </View>

                <View className="px-5">


                    <View className=" w-full flex flex-row justify-center items-center h-14 mt-4">
                        <CountryPicker
                            countryCode={countryCode}
                            withFilter
                            withFlag
                            withCountryNameButton
                            withCallingCode
                            visible={show}
                            onClose={() => { setShow(false) }}
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
                        <AntDesign name="caret-down" size={16} color={textColor} style={{ marginTop: 5 }} className="ms-3" />
                    </View>
                    <View className="mt-2 flex flex-row gap-x-1">
                        <TextInput inputMode="tel" className="text-lg text-center dark:bg-[#1E1E24] dark:text-white bg-[#F5F6FA] mt-2 border-2 font-bold rounded-2xl border-[#8042EA] w-[18%]"
                            placeholder="+94"
                            editable={false}
                            value={country ? `+${country.callingCode}` : callingCode}
                            onChangeText={(text) => {
                                setCallingCode(text);
                            }}
                        />

                        <TextInput inputMode="tel" className="text-lg dark:bg-[#1E1E24] dark:text-white bg-[#F5F6FA] text-center mt-2 border-2 font-bold rounded-2xl border-[#8042EA] w-[80%] ml-1"
                            placeholder="Mobile Number"
                            value={phoneNo}
                            onChangeText={(text) => {
                                setPhoneNo(text);
                            }}
                            placeholderTextColor={"gray"}
                        />
                    </View>

                </View>


                <View className=" justify-center items-center mt-16 px-5">
                    <TouchableOpacity className="rounded-full bg-[#673AB7] p-4 w-full "

                        onPress={() => {
                            const firstNameValid = validateFirstName(firstName);
                            const lastNameValid = validateLastName(lastName);
                            const countryCodeValid = validateCountryCode(callingCode);
                            const phoneNoValid = validatePhoneNo(phoneNo);

                            if (firstNameValid) {
                                Toast.show({
                                    type: ALERT_TYPE.WARNING,
                                    title: "Warning",
                                    textBody: firstNameValid,
                                });
                            } else if (lastNameValid) {
                                Toast.show({
                                    type: ALERT_TYPE.WARNING,
                                    title: "Warning",
                                    textBody: lastNameValid,
                                });
                            } else if (countryCodeValid) {
                                Toast.show({
                                    type: ALERT_TYPE.WARNING,
                                    title: "Warning",
                                    textBody: countryCodeValid,
                                });
                            } else if (phoneNoValid) {
                                Toast.show({
                                    type: ALERT_TYPE.WARNING,
                                    title: "Warning",
                                    textBody: phoneNoValid,
                                });
                            } else {
                                sendData();
                            }
                        }}

                    >
                        <Text className="text-white text-[20px] font-bold text-center">Save</Text>
                    </TouchableOpacity>
                </View>

            </SafeAreaView>
        </AlertNotificationRoot>
    );
}