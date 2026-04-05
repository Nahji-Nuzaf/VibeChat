import React, { createContext, ReactNode, useContext, useState } from "react";

export interface EventRegistrationData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  maxAttendees: string;
}
interface EventRegistrationContextType {
  newEvent: EventRegistrationData;
  setNewEvent: React.Dispatch<React.SetStateAction<EventRegistrationData>>;
}

const EventRegistrationContext = createContext<
  EventRegistrationContextType | undefined
>(undefined);

export const EventRegistrationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [newEvent, setNewEvent] = useState<EventRegistrationData>({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    maxAttendees: "",
  });
  return (
    <EventRegistrationContext.Provider value={{ newEvent, setNewEvent }}>
      {children}
    </EventRegistrationContext.Provider>
  );
};

export const useEventRegistration = (): EventRegistrationContextType => {
  const ctx = useContext(EventRegistrationContext);
  if (!ctx) {
    throw new Error(
      "useEventRegistration must be used within a EventRegistrationProvider"
    );
  }
  return ctx;
};
