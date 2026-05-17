import { z } from 'zod';

export const rsvpSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  attendance: z.enum(['come', 'with', 'no']),
  guestsCount: z.number().min(1).max(5).nullable().optional(),
  guestNames: z.array(z.string().min(1).max(100)).optional(),
  phone: z.string().optional(),
});

export type RSVPFormData = z.infer<typeof rsvpSchema>;