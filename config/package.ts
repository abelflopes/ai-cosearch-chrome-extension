import { z } from "zod";

const PackageJsonSchema = z.object({
  name: z.string().min(1),
  displayName: z.string().min(1),
  description: z.string().min(1),
  version: z.string().min(5),
});

const packageJson = PackageJsonSchema.parse(process.env);

export { packageJson };
