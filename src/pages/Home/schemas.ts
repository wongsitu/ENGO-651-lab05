import { z } from 'zod';

export const StatusSchema = z.object({
  latitude: z.number(),
  longitude: z.number(),
  temperature: z.number(),
});

export const MessageSchema = z.object({
  message: z.string(),
});
