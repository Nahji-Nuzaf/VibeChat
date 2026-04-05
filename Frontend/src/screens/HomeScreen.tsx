// import { AntDesign, Entypo, Feather, FontAwesome6, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { FlatList, Image, Pressable, StatusBar, Text, TextInput, TouchableOpacity, useColorScheme, View } from "react-native";
// import { AlertNotificationRoot } from "react-native-alert-notification";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { RootStack } from "../../App";
// import { useNavigation } from "@react-navigation/native";
// import { useLayoutEffect, useState } from "react";
// import { Chat } from "../socket/chat";
// import { User } from "../socket/chat";
// import { useChatList } from "../socket/UseChatList";
// import { formatChatTime } from "../util/DateFormatter";
// import { useWebSocketPing } from "../socket/UseWebSocketPing";

// const chats = [
//     {
//         id: 1,
//         name: "Sahan Perera",
//         lastMessage: "Hello, Kamal",
//         time: "9:46 pm",
//         unread: 2,
//         profile: require("../../assets/avatar/avatar_1.png"),
//     },
//     {
//         id: 2,
//         name: "Fathima",
//         lastMessage: "Hello, Sahn. Oyata kohomada, oya hodin innawada,",
//         time: "Yesterday",
//         unread: 1,
//         profile: require("../../assets/avatar/avatar_2.png"),
//     },
//     {
//         id: 3,
//         name: "Nayana",
//         lastMessage: "Hello, Kamal, Oyata kohomada, oya hodin innawada,",
//         time: "2025/9/24",
//         unread: 2,
//         profile: require("../../assets/avatar/avatar_3.png"),
//     },
//     {
//         id: 4,
//         name: "Tharaka Sankalpa Sir",
//         lastMessage: "Sir,",
//         time: "10.00 pm",
//         unread: 1,
//         profile: require("../../assets/avatar/avatar_4.png"),
//     },
//     {
//         id: 5,
//         name: "Pansilu Piyumantha ACH",
//         lastMessage: "Mokada Karanne",
//         time: "2025/09/20",
//         unread: 2,
//         profile: require("../../assets/avatar/avatar_5.png"),
//     },
//     {
//         id: 6,
//         name: "Hasitha Lakmal",
//         lastMessage: "Mokada karanne pavani",
//         time: "2025/09/18",
//         unread: 2,
//         profile: require("../../assets/avatar/avatar_6.png"),
//     },
//     {
//         id: 7,
//         name: "Nahji Nuzaf",
//         lastMessage: "Mokada wenne ajey",
//         time: "2025/09/18",
//         unread: 2,
//         profile: require("../../assets/avatar/avatar_6.png"),
//     },
//     {
//         id: 8,
//         name: "Zaahi",
//         lastMessage: "Mokada karanne ",
//         time: "2025/09/18",
//         unread: 2,
//         profile: require("../../assets/avatar/avatar_6.png"),
//     },
//     {
//         id: 9,
//         name: "Zaahi",
//         lastMessage: "Mokada karanne ",
//         time: "2025/09/18",
//         unread: 2,
//         profile: require("../../assets/avatar/avatar_6.png"),
//     },
//     {
//         id: 10,
//         name: "Zaahi",
//         lastMessage: "Mokada karanne ",
//         time: "2025/09/18",
//         unread: 2,
//         profile: require("../../assets/avatar/avatar_6.png"),
//     },
// ];

// type HomeProps = NativeStackNavigationProp<RootStack, "HomeScreen">;

// export default function HomeScreen() {


//     const navigation = useNavigation<HomeProps>();
//     const [search, setSearch] = useState("");
//     const chatList = useChatList();
//     useWebSocketPing(60000); // 1000 * 60 * 4

//     const avatars = [
//         require("../../assets/avatar/avatar_1.png"),
//         require("../../assets/avatar/avatar_2.png"),
//         require("../../assets/avatar/avatar_3.png"),
//         require("../../assets/avatar/avatar_4.png"),
//         require("../../assets/avatar/avatar_5.png"),
//         require("../../assets/avatar/avatar_5.png"),
//         require("../../assets/avatar/avatar_5.png"),
//     ];

//     const filterdChats = [...chatList].filter((chat) => {
//         return (
//             chat.friendName.toLowerCase().includes(search.toLowerCase()) ||
//             chat.lastMessage.toLowerCase().includes(search.toLowerCase())
//         );
//     })
//         .sort(
//             (a, b) =>
//                 new Date(b.lastTimeStamp).getTime() -
//                 new Date(a.lastTimeStamp).getTime()
//         );

//     const renderItem = ({ item }: { item: Chat }) => (
//         <TouchableOpacity
//             className="flex-row items-center py-4 px-3 bg-gray-100 dark:bg-gray-800 dark:border-gray-800 border border-gray-200 mt-1.5 mx-2 rounded-2xl"
//             onPress={() => {
//                 navigation.navigate("SingleChatScreen", {
//                     chatId: item.friendId,
//                     friendName: item.friendName,
//                     lastSeenTime: formatChatTime(item.lastTimeStamp),
//                     profileImage: item.profileImage
//                         ? item.profileImage
//                         : `https://ui-avatars.com/api/?name=${item.friendName.replace(
//                             " ",
//                             "+"
//                         )}&background=random`,
//                 });
//             }}
//         >
//             <TouchableOpacity className="h-14 w-14 rounded-full border-1 border-[#8042EA] justify-center items-center">
//                 {item.profileImage ? (
//                     <Image
//                         source={{ uri: item.profileImage }}
//                         className="h-14 w-14 border border-[#a876ff] rounded-full"
//                     />
//                 ) : (
//                     <Image
//                         source={{
//                             uri: `https://ui-avatars.com/api/?name=${item.friendName.replace(
//                                 " ",
//                                 "+"
//                             )}&background=random`,
//                         }}
//                         className="h-14 w-14 border border-[#a876ff] rounded-full"
//                     />
//                 )}
//             </TouchableOpacity>
//             <View className="flex-1 ms-3">
//                 <View className="flex-row justify-between">
//                     <Text
//                         className="font-bold text-xl text-gray-600 dark:text-gray-100"
//                         numberOfLines={1}
//                         ellipsizeMode="tail"
//                     >
//                         {item.friendName}
//                     </Text>
//                     <Text className="font-semibold text-xs text-gray-500 dark:text-gray-400">
//                         {formatChatTime(item.lastTimeStamp)}
//                     </Text>
//                 </View>
//                 <View className="flex-row justify-between items-center">
//                     <Text
//                         className="text-gray-500 flex-1 text-base dark:text-gray-400"
//                         numberOfLines={1}
//                         ellipsizeMode="tail"
//                     >
//                         {item.lastMessage}
//                     </Text>
//                     {item.unreadCount > 0 && (
//                         <View className="bg-[#673AB7] rounded-full px-2 py-1 ms-2">
//                             <Text className="text-slate-50 text-xs font-bold">
//                                 {item.unreadCount}
//                             </Text>
//                         </View>
//                     )}
//                 </View>
//             </View>
//         </TouchableOpacity>
//     );


//     const colorScheme = useColorScheme(); // returns "light" or "dark"

//     const isDark = colorScheme === 'dark';
//     const textColor = isDark ? '#fff' : '#000'; // white for dark mode, black for light mode


//     return (

//         <AlertNotificationRoot>
//             <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
//                 <StatusBar hidden={true} />
//                 <View className="px-4">
//                     <View className="relative items-center justify-center mt-10 mb-7">
//                         <Pressable
//                             // onPress={() => navigation.navigate("ContactScreen")}
//                             className="absolute left-0"
//                         >
//                             <Text className="text-[25px] font-bold text-purple-900 dark:text-white">Messages</Text>
//                         </Pressable>
//                         {/* <Feather name="arrow-left" size={28} color="black" /> */}
//                         <View className="flex flex-row gap-2 right-0 absolute">
//                             <View className="h-10 w-10 rounded-full border-black border justify-center items-center bg-slate-200">
//                                 <Entypo name="camera" size={20} color="black" />
//                             </View>
//                             <View className="h-10 w-10 rounded-full border-black border justify-center items-center bg-slate-200">
//                                 <Ionicons name="notifications" size={20} color="black" />
//                             </View>
//                         </View>
//                     </View>

//                     <View className="items-center flex-row border-[#8042EA] bg-[#FAF8FF] border-2 rounded-2xl px-3 h-14 mt-3 dark:bg-gray-950">
//                         <Ionicons name="search" size={20} color={"gray"} />
//                         <TextInput
//                             className="flex-1 text-lg font-medium ps-2 dark:text-white"
//                             placeholder="Search"
//                             value={search}
//                             onChangeText={(text) => setSearch(text)}
//                             placeholderTextColor={"gray"}
//                         />
//                     </View>

//                     <View className="relative items-center justify-center my-11">

//                         <View className="absolute left-0 flex flex-row max-w-[330px]">

//                             <FlatList
//                                 data={avatars}
//                                 horizontal
//                                 keyExtractor={(_, index) => index.toString()}
//                                 renderItem={({ item }) => (
//                                     <TouchableOpacity className="h-14 w-14 border border-gray-400 rounded-full items-center justify-center me-2 ">
//                                         <Image source={item} className="h-12 w-12 rounded-full" />
//                                     </TouchableOpacity>
//                                 )}

//                                 contentContainerStyle={{ paddingHorizontal: 10 }}
//                                 showsHorizontalScrollIndicator={false}
//                             />

//                         </View>

//                         <TouchableOpacity onPress={() => { navigation.navigate("SettingsScreen") }} className="right-0 absolute me-3">
//                             <SimpleLineIcons name="options" size={24} color={textColor} />
//                         </TouchableOpacity>

//                     </View>
//                 </View>

//                 <View className="mt-1">
//                     <FlatList
//                         data={filterdChats}
//                         renderItem={renderItem}
//                         contentContainerStyle={{ paddingBottom: 80 }}
//                     />
//                 </View>

//                 <View className="absolute dark:bg-[#B188F9] bg-[#B188F9] bottom-8 right-6 h-[60px] w-[60px] rounded-full dark:rounded-full">
//                     <TouchableOpacity className="h-[60px] w-[60px] rounded-3xl justify-center items-center" onPress={() => navigation.navigate("NewChatScreen")}>
//                         <FontAwesome6 name="plus" size={32} color={textColor} />
//                     </TouchableOpacity>
//                 </View>

//             </SafeAreaView>
//         </AlertNotificationRoot>

//     );
// }




import { AntDesign, Entypo, Feather, FontAwesome6, Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { FlatList, Image, Pressable, StatusBar, Text, TextInput, TouchableOpacity, useColorScheme, View } from "react-native";
import { AlertNotificationRoot } from "react-native-alert-notification";
import { SafeAreaView } from "react-native-safe-area-context";
import { RootStack } from "../../App";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { Chat } from "../socket/chat";
import { User } from "../socket/chat";
import { useChatList } from "../socket/UseChatList";
import { formatChatTime } from "../util/DateFormatter";
import { useWebSocketPing } from "../socket/UseWebSocketPing";

// --- 1. IMPORT THE COMPONENT ---
import { LanguageBottomSheet } from "../components/LanguageBottomSheet";

const chats = [
    {
        id: 1,
        name: "Sahan Perera",
        lastMessage: "Hello, Kamal",
        time: "9:46 pm",
        unread: 2,
        profile: require("../../assets/avatar/avatar_1.png"),
    },
    {
        id: 2,
        name: "Fathima",
        lastMessage: "Hello, Sahn. Oyata kohomada, oya hodin innawada,",
        time: "Yesterday",
        unread: 1,
        profile: require("../../assets/avatar/avatar_2.png"),
    },
    {
        id: 3,
        name: "Nayana",
        lastMessage: "Hello, Kamal, Oyata kohomada, oya hodin innawada,",
        time: "2025/9/24",
        unread: 2,
        profile: require("../../assets/avatar/avatar_3.png"),
    },
    {
        id: 4,
        name: "Tharaka Sankalpa Sir",
        lastMessage: "Sir,",
        time: "10.00 pm",
        unread: 1,
        profile: require("../../assets/avatar/avatar_4.png"),
    },
    {
        id: 5,
        name: "Pansilu Piyumantha ACH",
        lastMessage: "Mokada Karanne",
        time: "2025/09/20",
        unread: 2,
        profile: require("../../assets/avatar/avatar_5.png"),
    },
    {
        id: 6,
        name: "Hasitha Lakmal",
        lastMessage: "Mokada karanne pavani",
        time: "2025/09/18",
        unread: 2,
        profile: require("../../assets/avatar/avatar_6.png"),
    },
    {
        id: 7,
        name: "Nahji Nuzaf",
        lastMessage: "Mokada wenne ajey",
        time: "2025/09/18",
        unread: 2,
        profile: require("../../assets/avatar/avatar_6.png"),
    },
    {
        id: 8,
        name: "Zaahi",
        lastMessage: "Mokada karanne ",
        time: "2025/09/18",
        unread: 2,
        profile: require("../../assets/avatar/avatar_6.png"),
    },
    {
        id: 9,
        name: "Zaahi",
        lastMessage: "Mokada karanne ",
        time: "2025/09/18",
        unread: 2,
        profile: require("../../assets/avatar/avatar_6.png"),
    },
    {
        id: 10,
        name: "Zaahi",
        lastMessage: "Mokada karanne ",
        time: "2025/09/18",
        unread: 2,
        profile: require("../../assets/avatar/avatar_6.png"),
    },
];

type HomeProps = NativeStackNavigationProp<RootStack, "HomeScreen">;

export default function HomeScreen() {

    const navigation = useNavigation<HomeProps>();
    const [search, setSearch] = useState("");

    // --- 2. ADD STATE FOR LANGUAGE SHEET ---
    const [isLanguageSheetVisible, setLanguageSheetVisible] = useState(false);

    const chatList = useChatList();
    useWebSocketPing(60000); // 1000 * 60 * 4

    const avatars = [
        require("../../assets/avatar/avatar_1.png"),
        require("../../assets/avatar/avatar_2.png"),
        require("../../assets/avatar/avatar_3.png"),
        require("../../assets/avatar/avatar_4.png"),
        require("../../assets/avatar/avatar_5.png"),
        require("../../assets/avatar/avatar_5.png"),
        require("../../assets/avatar/avatar_5.png"),
    ];

    const filterdChats = [...chatList].filter((chat) => {
        return (
            chat.friendName.toLowerCase().includes(search.toLowerCase()) ||
            chat.lastMessage.toLowerCase().includes(search.toLowerCase())
        );
    })
        .sort(
            (a, b) =>
                new Date(b.lastTimeStamp).getTime() -
                new Date(a.lastTimeStamp).getTime()
        );

    const renderItem = ({ item }: { item: Chat }) => (
        <TouchableOpacity
            className="flex-row items-center py-4 px-3 bg-gray-100 dark:bg-gray-800 dark:border-gray-800 border border-gray-200 mt-1.5 mx-2 rounded-2xl"
            onPress={() => {
                navigation.navigate("SingleChatScreen", {
                    chatId: item.friendId,
                    friendName: item.friendName,
                    lastSeenTime: formatChatTime(item.lastTimeStamp),
                    profileImage: item.profileImage
                        ? item.profileImage
                        : `https://ui-avatars.com/api/?name=${item.friendName.replace(
                            " ",
                            "+"
                        )}&background=random`,
                });
            }}
        >
            <TouchableOpacity className="h-14 w-14 rounded-full border-1 border-[#8042EA] justify-center items-center">
                {item.profileImage ? (
                    <Image
                        source={{ uri: item.profileImage }}
                        className="h-14 w-14 border border-[#a876ff] rounded-full"
                    />
                ) : (
                    <Image
                        source={{
                            uri: `https://ui-avatars.com/api/?name=${item.friendName.replace(
                                " ",
                                "+"
                            )}&background=random`,
                        }}
                        className="h-14 w-14 border border-[#a876ff] rounded-full"
                    />
                )}
            </TouchableOpacity>
            <View className="flex-1 ms-3">
                <View className="flex-row justify-between">
                    <Text
                        className="font-bold text-xl text-gray-600 dark:text-gray-100"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {item.friendName}
                    </Text>
                    <Text className="font-semibold text-xs text-gray-500 dark:text-gray-400">
                        {formatChatTime(item.lastTimeStamp)}
                    </Text>
                </View>
                <View className="flex-row justify-between items-center">
                    <Text
                        className="text-gray-500 flex-1 text-base dark:text-gray-400"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {item.lastMessage}
                    </Text>
                    {item.unreadCount > 0 && (
                        <View className="bg-[#673AB7] rounded-full px-2 py-1 ms-2">
                            <Text className="text-slate-50 text-xs font-bold">
                                {item.unreadCount}
                            </Text>
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );


    const colorScheme = useColorScheme(); // returns "light" or "dark"

    const isDark = colorScheme === 'dark';
    const textColor = isDark ? '#fff' : '#000'; // white for dark mode, black for light mode


    return (

        <AlertNotificationRoot>
            <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
                <StatusBar hidden={true} />
                <View className="px-4">
                    <View className="relative items-center justify-center mt-10 mb-7">
                        <Pressable
                            // onPress={() => navigation.navigate("ContactScreen")}
                            className="absolute left-0"
                        >
                            <Text className="text-[25px] font-bold text-purple-900 dark:text-white">Messages</Text>
                        </Pressable>
                        {/* <Feather name="arrow-left" size={28} color="black" /> */}
                        <View className="flex flex-row gap-2 right-0 absolute">
                            <View className="h-10 w-10 rounded-full border-black border justify-center items-center bg-slate-200">
                                <Entypo name="camera" size={20} color="black" />
                            </View>

                            {/* --- 3. UPDATE NOTIFICATION ICON TO OPEN SHEET --- */}
                            <TouchableOpacity
                                onPress={() => setLanguageSheetVisible(true)}
                                className="h-10 w-10 rounded-full border-black border justify-center items-center bg-slate-200"
                            >
                                {/* <Ionicons name="notifications" size={20} color="black" /> */}
                                <Ionicons name="language" size={20} color="black" />
                            </TouchableOpacity>

                        </View>
                    </View>

                    <View className="items-center flex-row border-[#8042EA] bg-[#FAF8FF] border-2 rounded-2xl px-3 h-14 mt-3 dark:bg-gray-950">
                        <Ionicons name="search" size={20} color={"gray"} />
                        <TextInput
                            className="flex-1 text-lg font-medium ps-2 dark:text-white"
                            placeholder="Search"
                            value={search}
                            onChangeText={(text) => setSearch(text)}
                            placeholderTextColor={"gray"}
                        />
                    </View>

                    <View className="relative items-center justify-center my-11">

                        <View className="absolute left-0 flex flex-row max-w-[330px]">

                            <FlatList
                                data={avatars}
                                horizontal
                                keyExtractor={(_, index) => index.toString()}
                                renderItem={({ item }) => (
                                    <TouchableOpacity className="h-14 w-14 border border-gray-400 rounded-full items-center justify-center me-2 ">
                                        <Image source={item} className="h-12 w-12 rounded-full" />
                                    </TouchableOpacity>
                                )}

                                contentContainerStyle={{ paddingHorizontal: 10 }}
                                showsHorizontalScrollIndicator={false}
                            />

                        </View>

                        <TouchableOpacity onPress={() => { navigation.navigate("SettingsScreen") }} className="right-0 absolute me-3">
                            <SimpleLineIcons name="options" size={24} color={textColor} />
                        </TouchableOpacity>

                    </View>
                </View>

                <View className="mt-1">
                    <FlatList
                        data={filterdChats}
                        renderItem={renderItem}
                        contentContainerStyle={{ paddingBottom: 80 }}
                    />
                </View>

                <View className="absolute dark:bg-[#B188F9] bg-[#B188F9] bottom-8 right-6 h-[60px] w-[60px] rounded-full dark:rounded-full">
                    <TouchableOpacity className="h-[60px] w-[60px] rounded-3xl justify-center items-center" onPress={() => navigation.navigate("NewChatScreen")}>
                        <FontAwesome6 name="plus" size={32} color={textColor} />
                    </TouchableOpacity>
                </View>

                {/* --- 4. ADD THE COMPONENT HERE --- */}
                <LanguageBottomSheet
                    visible={isLanguageSheetVisible}
                    onClose={() => setLanguageSheetVisible(false)}
                    onSelect={(id) => {
                        console.log("Language Selected:", id);
                        setLanguageSheetVisible(false);
                    }}
                />

            </SafeAreaView>
        </AlertNotificationRoot>

    );
}



