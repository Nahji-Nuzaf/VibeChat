import { Entypo, Feather, FontAwesome, FontAwesome6, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import { useRef, useState } from "react";
import { FlatList, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StatusBar, Text, TextInput, Touchable, TouchableOpacity, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStack } from "../../App";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useSingleChat } from "../socket/UseSingleChat";
import { Chat } from "../socket/chat";
import { formatChatTime } from "../util/DateFormatter";
import { useSendChat } from "../socket/UseSendChat";


type SingleChatScreenProps = NativeStackScreenProps<RootStack, "SingleChatScreen">;

export default function SingleChatScreen({ route, navigation }: SingleChatScreenProps) {

    const { chatId, friendName, lastSeenTime, profileImage } = route.params;

    const singleChat = useSingleChat(chatId); // chatId == friendId
    const messages = singleChat.messages;
    const friend = singleChat.friend;
    const sendMessage = useSendChat();
    const [input, setInput] = useState("");

    const renderItem = ({ item }: { item: Chat }) => {
        const isMe = item.from.id !== chatId;
        return (

            <View
                className={`my-1 px-3 py-2 max-w-[75%] ${isMe
                    ? `self-end bg-violet-500 rounded-xl rounded-br-none`
                    : `rounded-xl rounded-bl-none self-start bg-gray-700`
                    }`}
            >
                <Text className={`text-white text-base`}>{item.message}</Text>
                <View className="flex-row justify-end items-center mt-1">
                    <Text className={`text-white italic text-xs me-2`}>
                        {formatChatTime(item.createdAt)}
                    </Text>
                    {isMe && (
                        <Ionicons
                            name={
                                item.status === "READ"
                                    ? "checkmark-done-sharp"
                                    : item.status === "DELIVERED"
                                        ? "checkmark-done-sharp"
                                        : "checkmark"
                            }
                            size={20}
                            color={item.status === "read" ? "#0284c7" : "#9ca3af"}
                        />
                    )}
                </View>
            </View>


        );
    };

    const handleSendChat = () => {
        if (!input.trim()) {
            return;
        }
        sendMessage(chatId, input);
        setInput("");
    };

    const colorScheme = useColorScheme(); // returns "light" or "dark"

    const isDark = colorScheme === 'dark';
    const textColor = isDark ? '#fff' : '#000'; // white for dark mode, black for light mode

    return (
        <SafeAreaView className="flex-1 bg-violet-100 dark:bg-gray-800">
            <StatusBar hidden />

            <KeyboardAvoidingView
                className="flex-1"
                behavior={Platform.OS === "android" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === "android" ? 0 : 50}
            >

                {/* Header */}
                <View className="flex-row items-center justify-between px-4 py-4 bg-white dark:bg-gray-900">
                    <View className="flex-row items-center">
                        <TouchableOpacity className="flex-row items-center" onPress={() => {
                            navigation.goBack();
                        }}>
                            <Ionicons name="chevron-back" size={28} color={textColor} />
                            <View className="ml-1 h-14 w-14 rounded-full bg-slate-200 justify-center items-center border border-black">
                                <Image
                                    source={{ uri: profileImage }}
                                    className="h-14 w-14 rounded-full"
                                />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity

                            onPress={() => {
                                if (friend) {
                                    navigation.navigate("userProfileScreen", {
                                        id: friend.id,
                                        friendName: `${friend.firstName} ${friend.lastName}`,
                                        profileImage: friend.profileImage
                                            ? friend.profileImage
                                            : `https://ui-avatars.com/api/?name=${friend.firstName}+${friend.lastName}&background=random`,
                                    });
                                }
                            }}
                        >

                            <View className="ms-4">
                                <Text className="text-xl font-bold text-gray-800 dark:text-white">{friend ? friend.firstName + " " + friend.lastName : friendName}</Text>
                                <Text className="text-sm text-gray-500 dark:text-gray-400">{friend?.status === "ONLINE"
                                    ? "Online"
                                    : `Last seen ${formatChatTime(friend?.updatedAt ?? "")}`}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View className="flex-row gap-3 items-center">
                        {/* <View className="h-10 w-10 bg-slate-200 rounded-full border border-black justify-center items-center"> */}
                        {/* </View> */}
                        <View className="h-10 w-10 bg-slate-200 rounded-full border border-black justify-center items-center">
                            <Ionicons name="videocam-outline" size={20} color="black" />
                        </View>
                        <View className="h-10 w-10 bg-slate-200 rounded-full border border-black justify-center items-center">
                            <Ionicons name="call-outline" size={20} color="black" />
                        </View>
                        <SimpleLineIcons name="options-vertical" size={20} color={textColor} />
                    </View>
                </View>
                {/* Header */}
                <View className="h-[1px] bg-gray-400 dark:bg-gray-600"></View>

                <FlatList
                    data={messages}
                    renderItem={renderItem}
                    className="px-3 flex-1"
                    inverted
                    keyExtractor={(_, index) => index.toString()}
                    contentContainerStyle={{ paddingBottom: 60 }}
                />

                {/* Input Bar */}
                <View className="flex-row items-center px-4 py-3 bg-white h-20 dark:bg-gray-900 mx-2 rounded-full mt-2">

                    <Pressable className=" bg-slate-300 border border-gray-800 rounded-full p-2">
                        <FontAwesome6 name="plus" size={17} color="black" />
                    </Pressable>

                    <TextInput
                        value={input}
                        onChangeText={(text) => setInput(text)}
                        multiline
                        placeholder="Type a message"
                        className="ml-3 flex-1 bg-gray-100 px-4 py-2 rounded-full text-lg text-gray-700 dark:bg-gray-500 dark:text-white"
                    />
                    <Pressable className="ml-3 bg-violet-500 rounded-full p-3" onPress={handleSendChat}>
                        <FontAwesome name="send" size={16} color="white" />
                    </Pressable>
                </View>

            </KeyboardAvoidingView>
        </SafeAreaView>
    );

}