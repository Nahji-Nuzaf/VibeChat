// components/EventsTab.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from '@expo/vector-icons';
import { Event } from '../socket/event';
import { ALERT_TYPE, AlertNotificationRoot, Toast } from "react-native-alert-notification";
import { validateEventCategory, validateEventDate, validateEventDescription, validateEventLocation, validateEventMaxAttendees, validateEventTime, validateEventTitle } from '../util/Validation';
import { EventRegistrationProvider, useEventRegistration } from '../components/EventContext';
import { createNewEvent } from '../api/UserService';

interface UserEvent extends Event {
  status: 'active' | 'past' | 'scheduled';
  rating?: number;
  isOwner: boolean;
}

const EventsTab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'my' | 'past' | 'scheduled'>('my');
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const { newEvent, setNewEvent } = useEventRegistration();

  const renderEventItem = ({ item }: { item: UserEvent }) => (
    <View className="bg-gray-800 rounded-xl mx-4 mb-3 p-4">
      <View className="flex-row justify-between items-start mb-2">
        <Text className="text-white text-lg font-semibold flex-1">{item.title}</Text>
        {item.isOwner && activeTab === 'my' && (
          <TouchableOpacity className="ml-2">
            <Feather name="more-vertical" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>

      <View className="flex-row items-center mb-2">
        <Feather name="calendar" size={14} color="#9CA3AF" />
        <Text className="text-gray-400 ml-2 text-sm">{item.date} • {item.time}</Text>
      </View>

      <View className="flex-row items-center mb-3">
        <Feather name="map-pin" size={14} color="#9CA3AF" />
        <Text className="text-gray-400 ml-2 text-sm">{item.location}</Text>
      </View>

      <View className="flex-row justify-between items-center">
        <Text className="text-gray-400 text-sm">{item.attendees} attendees</Text>

        {activeTab === 'past' && item.rating && (
          <View className="flex-row items-center">
            <Feather name="star" size={14} color="#F59E0B" />
            <Text className="text-yellow-400 ml-1 text-sm">{item.rating}</Text>
          </View>
        )}

        {activeTab === 'my' && (
          <View className="flex-row gap-x-2">
            <TouchableOpacity className="bg-purple-600 px-4 py-1 rounded-full">
              <Text className="text-white text-sm">Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-700 px-4 py-1 rounded-full">
              <Text className="text-gray-300 text-sm">Share</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'scheduled' && (
          <TouchableOpacity className="bg-green-600 px-4 py-1 rounded-full">
            <Text className="text-white text-sm">View Details</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  const renderTabButton = (tab: 'my' | 'past' | 'scheduled', label: string) => (
    <TouchableOpacity
      onPress={() => setActiveTab(tab)}
      className={`flex-1 mt-3 mb-3 py-3 ${activeTab === tab ? 'border-b-2 border-purple-600' : ''}`}
    >
      <Text
        className={`text-center font-medium text-white ${activeTab === tab ? 'text-purple-400' : 'text-gray-400'}`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (

    // <AlertNotificationRoot>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
      style={{ flex: 1 }}
    >
      <EventRegistrationProvider>
        <SafeAreaView className="flex-1 dark:bg-gray-900">

          {/* Header */}
          <View className="flex-row justify-between items-center px-5 pt-4 pb-2">
            <Text className="text-purple-900 text-2xl font-bold dark:text-white text-[25px]">My Events</Text>
            <TouchableOpacity
              onPress={() => setShowCreateModal(true)}
              className="bg-purple-600 w-12 h-12 rounded-full items-center justify-center"
            >
              <Feather name="plus" size={25} color="white" />
            </TouchableOpacity>
          </View>

          {/* Tab Navigation */}
          <View className="flex-row mx-4 mb-4 ">
            {renderTabButton('my', 'Active Events')}
            {renderTabButton('past', 'Past Events')}
            {renderTabButton('scheduled', 'Scheduled')}
          </View>

          <Modal
            visible={showCreateModal}
            animationType="slide"
            presentationStyle="pageSheet"
          >
            <AlertNotificationRoot>

              <SafeAreaView className="flex-1 bg-black">
                <View className="flex-row justify-between items-center px-4 py-4 border-b border-gray-800">
                  <TouchableOpacity onPress={() => setShowCreateModal(false)}>
                    <Text className="text-purple-400 text-lg">Cancel</Text>
                  </TouchableOpacity>
                  <Text className="text-white text-lg font-semibold">Create Event</Text>
                  <TouchableOpacity
                    onPress={async () => {

                      let validTitle = validateEventTitle(newEvent.title);
                      let validDesc = validateEventDescription(newEvent.description);
                      let validDate = validateEventDate(newEvent.date);
                      let validTime = validateEventTime(newEvent.time);
                      let validLocation = validateEventLocation(newEvent.location);
                      let validCategory = validateEventCategory(newEvent.category);
                      let validMaxAttendees = validateEventMaxAttendees(newEvent.maxAttendees);

                      if (validTitle) {
                        Toast.show({
                          type: ALERT_TYPE.WARNING,
                          title: "Warning",
                          textBody: validTitle,
                        });
                      } else if (validDesc) {
                        Toast.show({
                          type: ALERT_TYPE.WARNING,
                          title: "Warning",
                          textBody: validDesc,
                        });
                      } else if (validDate) {
                        Toast.show({
                          type: ALERT_TYPE.WARNING,
                          title: "Warning",
                          textBody: validDate,
                        });
                      } else if (validTime) {
                        Toast.show({
                          type: ALERT_TYPE.WARNING,
                          title: "Warning",
                          textBody: validTime,
                        });
                      } else if (validLocation) {
                        Toast.show({
                          type: ALERT_TYPE.WARNING,
                          title: "Warning",
                          textBody: validLocation,
                        });
                      } else if (validCategory) {
                        Toast.show({
                          type: ALERT_TYPE.WARNING,
                          title: "Warning",
                          textBody: validCategory,
                        });
                      } else if (validMaxAttendees) {
                        Toast.show({
                          type: ALERT_TYPE.WARNING,
                          title: "Warning",
                          textBody: validMaxAttendees,
                        });
                      } else {

                        try {
                          const response = await createNewEvent(newEvent);
                          if (response.status) {
                            const id = response.userId;

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
                          // setLoading(false);
                        }

                      }
                    }}>
                    <Text className="text-purple-400 text-lg font-semibold">Create</Text>
                  </TouchableOpacity>
                </View>

                <ScrollView className="flex-1 px-4 py-6">
                  <View className="gap-y-4">
                    <View>
                      <Text className="text-gray-300 text-sm font-medium mb-2">Event Title *</Text>
                      <TextInput
                        value={newEvent.title}
                        onChangeText={(text) => setNewEvent({ ...newEvent, title: text })}
                        placeholder="Enter event title"
                        placeholderTextColor="#6B7280"
                        className="bg-gray-900 text-white p-4 rounded-xl"
                      />
                    </View>

                    <View>
                      <Text className="text-gray-300 text-sm font-medium mb-2">Description</Text>
                      <TextInput
                        value={newEvent.description}
                        onChangeText={(text) => setNewEvent({ ...newEvent, description: text })}
                        placeholder="Event description"
                        placeholderTextColor="#6B7280"
                        className="bg-gray-900 text-white p-4 rounded-xl"
                        multiline
                        numberOfLines={3}
                      />
                    </View>

                    <View className="flex-row gap-x-4">
                      <View className="flex-1">
                        <Text className="text-gray-300 text-sm font-medium mb-2">Date *</Text>
                        <TextInput
                          value={newEvent.date}
                          onChangeText={(text) => setNewEvent({ ...newEvent, date: text })}
                          placeholder="MM/DD/YYYY"
                          placeholderTextColor="#6B7280"
                          className="bg-gray-900 text-white p-4 rounded-xl"
                        />
                      </View>
                      <View className="flex-1">
                        <Text className="text-gray-300 text-sm font-medium mb-2">Time</Text>
                        <TextInput
                          value={newEvent.time}
                          onChangeText={(text) => setNewEvent({ ...newEvent, time: text })}
                          placeholder="HH:MM AM/PM"
                          placeholderTextColor="#6B7280"
                          className="bg-gray-900 text-white p-4 rounded-xl"
                        />
                      </View>
                    </View>

                    <View>
                      <Text className="text-gray-300 text-sm font-medium mb-2">Location *</Text>
                      <TextInput
                        value={newEvent.location}
                        onChangeText={(text) => setNewEvent({ ...newEvent, location: text })}
                        placeholder="Event location"
                        placeholderTextColor="#6B7280"
                        className="bg-gray-900 text-white p-4 rounded-xl"
                      />
                    </View>

                    <View className="flex-row gap-x-4">
                      <View className="flex-1">
                        <Text className="text-gray-300 text-sm font-medium mb-2">Category</Text>
                        <TextInput
                          value={newEvent.category}
                          onChangeText={(text) => setNewEvent({ ...newEvent, category: text })}
                          placeholder="e.g. Tech, Music"
                          placeholderTextColor="#6B7280"
                          className="bg-gray-900 text-white p-4 rounded-xl"
                        />
                      </View>
                      <View className="flex-1">
                        <Text className="text-gray-300 text-sm font-medium mb-2">Max Attendees</Text>
                        <TextInput
                          value={newEvent.maxAttendees}
                          onChangeText={(text) => setNewEvent({ ...newEvent, maxAttendees: text })}
                          placeholder="100"
                          placeholderTextColor="#6B7280"
                          className="bg-gray-900 text-white p-4 rounded-xl"
                          keyboardType="numeric"
                        />
                      </View>
                    </View>
                  </View>
                </ScrollView>
              </SafeAreaView>
            </AlertNotificationRoot>

          </Modal>
        </SafeAreaView>
      </EventRegistrationProvider>
    </KeyboardAvoidingView>
  );
};

export default EventsTab;
