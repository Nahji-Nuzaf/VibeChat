import { Feather, FontAwesome, FontAwesome5, Ionicons, MaterialIcons, SimpleLineIcons } from "@expo/vector-icons";
import { useState } from "react";
import { FlatList, Image, Pressable, StatusBar, Text, TextInput, TouchableOpacity, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { User } from "../socket/chat";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useUserList } from "../socket/UseUserList";

type NewChatScreenProp = NativeStackNavigationProp<RootStack, "NewChatScreen">;

export default function NewChatScreen() {

    const navigation = useNavigation<NewChatScreenProp>();
    const [search, setSearch] = useState("");
    const users = useUserList();

    const renderItem = ({ item }: { item: User }) => (
        <TouchableOpacity
            className="justify-start items-center gap-x-3 px-3 py-2 flex-row bg-gray-50 mt-1 dark:bg-gray-800"
            onPress={() => {
                navigation.navigate("SingleChatScreen", {
                    chatId: item.id,
                    friendName: `${item.firstName} ${item.lastName}`,
                    lastSeenTime: item.updatedAt,
                    profileImage: item.profileImage
                        ? item.profileImage
                        : `https://ui-avatars.com/api/?name=${item.firstName}+${item.lastName}&background=random`,
                });
            }}
        >
            <View>
                <TouchableOpacity className="h-14 w-14 rounded-full border-1 border-gray-300 justify-center items-center dark:border-purple-400">
                    {item.profileImage ? (
                        <Image
                            source={{ uri: item.profileImage }}
                            className="h-14 w-14 rounded-full"
                        />
                    ) : (
                        <Image
                            source={{
                                uri: `https://ui-avatars.com/api/?name=${item.firstName}+${item.lastName}&background=random`,
                            }}
                            className="h-14 w-14 rounded-full"
                        />
                    )}
                </TouchableOpacity>
            </View>
            <View className="flex-col gap-y-1">
                <Text className="font-bold text-xl dark:text-white">
                    {item.firstName} {item.lastName}
                </Text>
                <Text className="text-sm italic dark:text-white">
                    {item.status === "ACTIVE"
                        ? "Already in Friend List; Message Now"
                        : "Hey there! I am using VibeChat"}
                </Text>
            </View>
        </TouchableOpacity>
    );

    const filterdUsers = [...users]
        .filter((user) => {
            return (
                user.firstName.toLowerCase().includes(search.toLowerCase()) ||
                user.lastName.toLowerCase().includes(search.toLowerCase()) ||
                user.contactNo.includes(search)
            );
        })
        .sort((a, b) => a.firstName.localeCompare(b.firstName));


            const colorScheme = useColorScheme(); // returns "light" or "dark"
        
            const isDark = colorScheme === 'dark';
            const textColor = isDark ? '#fff' : '#000'; // white for dark mode, black for light mode

    return (
        <SafeAreaView className="dark:bg-gray-900 bg-white flex-1">
            <StatusBar hidden={true} />
            <View className="px-4">

                <View className="mb-4 relative items-center mt-3 justify-center">
                    <Pressable
                        onPress={() => {
                            navigation.goBack();
                        }}
                        className="absolute left-0 ms-1"
                    >
                        <Feather name="arrow-left" size={26} color={textColor} />
                    </Pressable>
                    <Text className="text-2xl font-semibold text-center dark:text-white">New Message</Text>
                    <Pressable
                        // onPress={() => navigation.navigate("ContactScreen")}
                        className="absolute right-0 me-1"
                    >
                        <SimpleLineIcons name="options-vertical" size={20} color={textColor} />
                    </Pressable>
                </View>
                <View className="h-[1px] bg-gray-400"></View>

                <View className="items-center flex-row border-[#8042EA] bg-[#FAF8FF] border-2 rounded-2xl px-3 h-14 mt-4  dark:bg-gray-950">
                    <Ionicons name="search" size={20} color={"gray"} />
                    <TextInput
                        className="flex-1 text-lg font-medium ps-2"
                        placeholder="Search"
                        value={search}
                        onChangeText={(text) => setSearch(text)}
                        placeholderTextColor={"gray"}
                    />
                </View>

                <View className="py-5">
                    <TouchableOpacity
                        className="justify-start gap-x-3 flex-row items-center h-14"
                        onPress={() => navigation.navigate("NewContactScreen")}
                    >
                        <View className="bg-[#e0cefb] items-center justify-center h-14 w-14 rounded-full">
                            <FontAwesome5 name="user-plus" size={21} color="purple" />
                        </View>
                        <Text className="text-xl font-semibold ms-3 dark:text-white">New Contact</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        className="justify-start gap-x-3 flex-row items-center h-14 mt-3"
                    // onPress={() => navigation.navigate("NewContactScreen")}
                    >
                        <View className="bg-[#e0cefb] items-center justify-center h-14 w-14 rounded-full">
                            <FontAwesome name="group" size={24} color="purple" />
                        </View>
                        <Text className="text-xl font-semibold ms-3 dark:text-white">New Group</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity
                        className="justify-start gap-x-3 flex-row items-center h-14 mt-3"
                    // onPress={() => navigation.navigate("NewContactScreen")}
                    >
                        <View className="bg-[#e0cefb] items-center justify-center h-14 w-14 rounded-full">
                            <MaterialIcons name="event" size={24} color="purple" />
                        </View>
                        <Text className="text-xl font-semibold ms-3 dark:text-white">New Event</Text>
                    </TouchableOpacity> */}
                    <TouchableOpacity
                        className="justify-start gap-x-3 flex-row items-center h-14 mt-3"
                    // onPress={() => navigation.navigate("NewContactScreen")}
                    >
                        <View className="bg-[#e0cefb] items-center justify-center h-14 w-14 rounded-full">
                            <Ionicons name="qr-code-outline" size={24} color="purple" />
                        </View>
                        <Text className="text-xl font-semibold ms-3 dark:text-white">Join Event</Text>
                    </TouchableOpacity>
                </View>

            </View>

            <View className="bg-purple-50 h-10 justify-center dark:bg-purple-950">
                <Text className="px-4 dark:text-white">Friends on VibeChat</Text>
            </View>

            <View className="mt-2">
                <FlatList
                    data={filterdUsers}
                    renderItem={renderItem}
                    keyExtractor={(_, index) => index.toString()}
                />
            </View>


        </SafeAreaView>
    );
}