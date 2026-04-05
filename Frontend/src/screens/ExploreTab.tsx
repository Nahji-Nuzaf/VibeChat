// components/ExploreTab.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather, Ionicons } from '@expo/vector-icons';
import { Event, EventCategory } from '../socket/event';

const ExploreTab: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [loading, setLoading] = useState<boolean>(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [apiEvents, setApiEvents] = useState<Event[]>([]);

  const fetchEvents = async () => {
    try {
      console.log("Fetching events from Eventbrite...");
      const response = await fetch(
        "https://www.eventbriteapi.com/v3/organizations/2965079963781/events/?token=YKM5VS6ZRXT3VXJQJQMK"
      );
      const data = await response.json();
      console.log("✅ Raw API response:", data);

      if (data.events && data.events.length > 0) {
        const formattedEvents = data.events.map((ev: any) => ({
          id: ev.id,
          title: ev.name?.text || "Untitled Event",
          date: new Date(ev.start.local).toDateString(),
          time: new Date(ev.start.local).toLocaleTimeString(),
          location: ev.venue?.address?.localized_address_display || "Venue not listed",
          attendees: 0,
          category: ev.category_id || "General",
          image: ev.logo ? { uri: ev.logo.url } : require("../../assets/ex.jpg"),
          description: ev.description?.text || ev.summary || "No description available.",
        }));

        console.log("✅ Formatted events:", formattedEvents);
        setEvents(formattedEvents);
      } else {
        console.log("⚠️ No events found:", data);
      }
    } catch (error) {
      console.error("❌ Error fetching events:", error);
    } finally {
      setLoading(false); // 🧠 Crucial — stops the loader
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // 🔍 Filter search
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter((event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  }, [searchQuery, events]);



  // const events: Event[] = [
  //   {
  //     id: '1',
  //     title: 'Tech Meetup 2025',
  //     date: 'Jan 25, 2025',
  //     time: '6:00 PM',
  //     location: 'Downtown Convention Center',
  //     attendees: 156,
  //     category: 'Tech',
  //     image: require('../../assets/Texh.jpg'),
  //   },
  //   {
  //     id: '2',
  //     title: 'Jazz Night Live',
  //     date: 'Jan 22, 2025',
  //     time: '8:00 PM',
  //     location: 'Blue Note Club',
  //     attendees: 89,
  //     category: 'Music',
  //     image: require('../../assets/events.jpg'),
  //   },
  //   {
  //     id: '3',
  //     title: 'Agro Expo',
  //     date: 'Jan 28, 2025',
  //     time: '12:00 PM',
  //     location: 'BMICH',
  //     attendees: 234,
  //     category: 'Food',
  //     image: require('../../assets/ex.jpg'),
  //   },
  // ];

  // const filteredEvents = events.filter(event =>
  //   (selectedCategory === 'All' || event.category === selectedCategory) &&
  //   event.title.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  const renderEventCard = ({ item }: { item: Event }) => (
    // <View className="bg-gray-800 rounded-2xl mx-4 mb-5 overflow-hidden">
    //   <Image
    //     source={item.image}
    //     className="w-full h-40"
    //     resizeMode="cover"
    //   />
    //   <View className="p-4">
    //     <Text className="text-white text-lg font-semibold mb-2">{item.title}</Text>
    //     <View className="flex-row items-center mb-2">
    //       <Feather name="calendar" size={14} color="#9CA3AF" />
    //       <Text className="text-gray-400 ml-2 text-sm">{item.date} • {item.time}</Text>
    //     </View>
    //     <View className="flex-row items-center mb-3">
    //       <Feather name="map-pin" size={14} color="#9CA3AF" />
    //       <Text className="text-gray-400 ml-2 text-sm flex-1">{item.location}</Text>
    //     </View>
    //     <View className="flex-row justify-between items-center">
    //       <View className="flex-row items-center">
    //         <Feather name="users" size={14} color="#9CA3AF" />
    //         <Text className="text-gray-400 ml-2 text-sm">{item.attendees} attending</Text>
    //       </View>
    //       <TouchableOpacity className="bg-purple-600 px-6 py-2 rounded-full">
    //         <Text className="text-white font-medium">Join</Text>
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    // </View>

    <View className="bg-gray-800 rounded-2xl mx-4 mb-5 overflow-hidden">
      {item.image ? (
        <Image source={item.image} className="w-full h-40" resizeMode="cover" />
      ) : (
        <View className="w-full h-40 bg-gray-700 items-center justify-center">
          <Text className="text-gray-400">No Image</Text>
        </View>
      )}

      <View className="p-4">
        <Text className="text-white text-lg font-semibold mb-2">
          {item.title}
        </Text>

        <View className="flex-row items-center mb-2">
          <Feather name="calendar" size={14} color="#9CA3AF" />
          <Text className="text-gray-400 ml-2 text-sm">
            {item.date} • {item.time}
          </Text>
        </View>

        <View className="flex-row items-center mb-3">
          <Feather name="map-pin" size={14} color="#9CA3AF" />
          <Text className="text-gray-400 ml-2 text-sm flex-1">
            {item.location}
          </Text>
        </View>

        <View className="flex-row justify-between items-center">
          <View className="flex-row items-center">
            <Feather name="users" size={14} color="#9CA3AF" />
            <Text className="text-gray-400 ml-2 text-sm">
              {item.attendees} attending
            </Text>
          </View>
          <TouchableOpacity className="bg-purple-600 px-6 py-2 rounded-full">
            <Text className="text-white font-medium">Join</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>




  );

  return (
    // <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">

    //   <View className="px-4 mt-5 mb-7">
    //     <Text className=" font-bold  dark:text-white text-[25px] text-purple-900">Explore Events</Text>

    //     <View className="items-center flex-row border-[#8042EA] bg-[#FAF8FF] border-2 rounded-2xl dark:bg-gray-950 px-3 h-14 mt-4 ">
    //       <Ionicons name="search" size={20} color={"gray"} />
    //       <TextInput
    //         className="flex-1 text-lg font-medium ps-2 dark:text-white"
    //         placeholder="Search events..."
    //         value={searchQuery}
    //         onChangeText={setSearchQuery}
    //         placeholderTextColor={"gray"}
    //       />
    //       <TouchableOpacity>
    //         <Feather name="filter" size={20} color="#9CA3AF" />
    //       </TouchableOpacity>
    //     </View>

    //   </View>

    //   {/* Events List */}
    //   <FlatList
    //     data={filteredEvents}
    //     renderItem={renderEventCard}
    //     keyExtractor={(item) => item.id}
    //     showsVerticalScrollIndicator={false}
    //     contentContainerStyle={{ paddingBottom: 100 }}
    //   />

    // </SafeAreaView>


    <SafeAreaView className="flex-1 bg-white dark:bg-gray-900">
      <View className="px-4 mt-5 mb-7">
        <Text className="font-bold dark:text-white text-[25px] text-purple-900">
          Explore Events
        </Text>

        <View className="items-center flex-row border-[#8042EA] bg-[#FAF8FF] border-2 rounded-2xl dark:bg-gray-950 px-3 h-14 mt-4">
          <Ionicons name="search" size={20} color={"gray"} />
          <TextInput
            className="flex-1 text-lg font-medium ps-2 dark:text-white"
            placeholder="Search events..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={"gray"}
          />
          <TouchableOpacity>
            <Feather name="filter" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>
      </View>

      {loading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#8042EA" />
          <Text className="text-gray-500 mt-2">Loading events...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredEvents}
          renderItem={renderEventCard}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      )}
    </SafeAreaView>




  );
};

export default ExploreTab;
