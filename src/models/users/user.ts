import { z } from "zod";

// Простая схема без transform
const userSchemaSimpleBase = z.object({
  id: z.union([z.string(), z.number()]).optional(),
  uid: z.union([z.string(), z.number()]).optional(),
  display: z.string(),
});

export const userSchemaSimple = userSchemaSimpleBase.transform((user) => ({
  ...user,
  id: user.id ?? user.uid,
  uid: user.id ?? user.uid,
}));

export type SimpleUser = z.infer<typeof userSchemaSimple>;

// Сложная схема на основе простой (расширяем базу, потом transform)
const userSchemaBase = userSchemaSimpleBase.extend({
  self: z.string().optional(),
  login: z.string().optional(),
  trackerUid: z.number().optional(),
  passportUid: z.number().optional(),
  cloudUid: z.string().optional(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  hasLicense: z.boolean().optional(),
  dismissed: z.boolean().optional(),
  disableNotifications: z.boolean().optional(),
  firstLoginDate: z.string().optional(),
  lastLoginDate: z.string().optional(),
  welcomeMailSent: z.boolean().optional(),
});

export const userSchema = userSchemaBase.transform((user) => ({
  ...user,
  id: user.id ?? user.uid,
  uid: user.id ?? user.uid,
}));

export type User = z.infer<typeof userSchema>;
