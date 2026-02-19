import { z } from 'zod';

const removeWrappingQuotes = (value: string) => {
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    return value.slice(1, -1);
  }

  return value;
};

const normalizeEnvValue = (value: unknown) => {
  if (typeof value !== 'string') {
    return value;
  }

  return removeWrappingQuotes(value).trim();
};

const nonEmptyString = z.preprocess(
  normalizeEnvValue,
  z.string().min(1, 'Cannot be empty')
);

const envSchema = z.object({
  PORT: z.preprocess(
    normalizeEnvValue,
    z.coerce.number().int().positive()
  ),
  DB_STRING: nonEmptyString,
  DB_ATLAS: nonEmptyString,
  PRIVATE_KEY: nonEmptyString,
  PUBLIC_KEY: nonEmptyString,
  DEFAULT_FRIEND_EMAIL: nonEmptyString,
  DEFAULT_FRIEND_USERNAME: nonEmptyString,
  WELCOME_MESSAGE: nonEmptyString,
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error('Invalid environment variables:');
  console.error(parsedEnv.error.flatten().fieldErrors);
  process.exit(1);
}

export const ENV = parsedEnv.data;
