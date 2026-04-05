// types/Event.ts
export interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  category: string;
  image: any;
  description?: string;
}

export interface EventCategory {
  id: string;
  name: string;
  active: boolean;
}

export interface UserEvent extends Event {
  status: 'active' | 'past' | 'scheduled';
  rating?: number;
  isOwner: boolean;
}

export interface CreateEventForm {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  maxAttendees: string;
}
