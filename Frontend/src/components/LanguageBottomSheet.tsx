// File: src/components/LanguageBottomSheet.tsx

import React from 'react';
import { View, Text, Modal, TouchableOpacity } from 'react-native';

interface LanguageOption {
    id: string;
    label: string;
    nativeLabel: string;
}

const LANGUAGES: LanguageOption[] = [
    { id: 'si', label: 'Sinhala', nativeLabel: 'සිංහල' },
    { id: 'ta', label: 'Tamil', nativeLabel: 'தமிழ்' },
    { id: 'en', label: 'English', nativeLabel: 'English' },
];

interface LanguageSheetProps {
    visible: boolean;
    onClose: () => void;
    onSelect: (langId: string) => void;
}

export const LanguageBottomSheet: React.FC<LanguageSheetProps> = ({
    visible,
    onClose,
    onSelect
}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View className="flex-1 bg-black/30 justify-end">
                <TouchableOpacity className="flex-1" activeOpacity={1} onPress={onClose} />
                <View className="bg-[#F2F2F7] rounded-t-3xl overflow-hidden">
                    <View className="items-center pt-3 pb-2">
                        <View className="w-10 h-1.5 bg-gray-400 rounded-full opacity-50" />
                    </View>
                    <View className="pb-4 pt-1">
                        <Text className="text-center text-lg font-semibold text-black">Select Language</Text>
                    </View>
                    <View className="pb-8">
                        {LANGUAGES.map((lang) => (
                            <TouchableOpacity
                                key={lang.id}
                                onPress={() => onSelect(lang.id)}
                                activeOpacity={0.7}
                                className="bg-[#E5E5EA] py-4 justify-center items-center mb-[1px]"
                            >
                                <Text className="text-lg text-black font-medium">{lang.nativeLabel}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View className="bg-[#E5E5EA] h-6" />
                </View>
            </View>
        </Modal>
    );
};