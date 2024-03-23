import { z } from "zod";
import { DataSchema } from "../_common/data";

export const SendDataMessageSchema = z.object({
  action: z.literal("send-data"),
  data: DataSchema,
});

export type SendDataMessage = z.infer<typeof SendDataMessageSchema>;

export function isSendDataMessage(value: unknown): value is SendDataMessage {
  return SendDataMessageSchema.safeParse(value).success;
}
