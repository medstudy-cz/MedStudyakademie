import { z } from "zod";

export type ContactFormMessages = {
  nameRequired: string;
  emailInvalid: string;
  phoneRequired: string;
  subjectRequired: string;
  messageMin: string;
};

export function createContactSchema(messages: ContactFormMessages) {
  return z.object({
    name: z.string().trim().min(1, messages.nameRequired),
    email: z.string().trim().email(messages.emailInvalid),
    phone: z.string().trim().min(1, messages.phoneRequired),
    subject: z.string().trim().min(1, messages.subjectRequired),
    message: z.string().trim().min(10, messages.messageMin),
  });
}

export type ContactFormValues = z.infer<
  ReturnType<typeof createContactSchema>
>;
