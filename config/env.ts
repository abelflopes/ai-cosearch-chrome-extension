import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z.union([z.literal("development"), z.literal("production")]),
});

const env = EnvSchema.parse(process.env);

export { env };
