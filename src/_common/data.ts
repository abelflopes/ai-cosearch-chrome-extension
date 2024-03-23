import { z } from "zod";

export const DataSchema = z.object({
  url: z.string().url(),
  html: z.string().min(1),
});

export type Data = z.infer<typeof DataSchema>;

export function asData(value: unknown): Data {
  return DataSchema.parse(value);
}
