export type AppPhase = 'envelope' | 'cover' | 'main' | 'admin';

export interface RSVPData {
  guestName: string;
  attendeesCount: number;
  attendance: 'wedding' | 'reception' | 'both' | 'declining' | '';
}
