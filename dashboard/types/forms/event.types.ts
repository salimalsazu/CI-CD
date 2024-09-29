export type ICreateEvent = {
  hallId: string;
  eventId: string;
  event: {
    eventDate: string; // Change the type as needed, e.g., Date
    title: string;
  }[];
};
