import { z } from 'zod';
import { MessageSchema, StatusSchema } from './schemas';

export type MessageType = z.infer<typeof MessageSchema>;

export type StatusType = z.infer<typeof StatusSchema>;
