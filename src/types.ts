export type AppPhase = 'envelope' | 'cover' | 'main';

export interface RSVPData {
  guestName: string;
  attendeesCount: number;
  attendance: 'wedding' | 'reception' | 'both' | 'declining' | '';
}
