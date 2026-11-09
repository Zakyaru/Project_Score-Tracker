import * as z from 'zod';

// 1. Le schéma : décrit ce qu'on attend, sans aucune valeur
const envSchema = z.object({
  PORT: z.coerce.number().int().positive(),
});

// 2. Le parsing : on confronte les vraies données au schéma
const result = envSchema.safeParse(process.env);

// 3. Fail fast : si la config est invalide, on refuse de démarrer
if (!result.success) {
  console.error('❌ Invalid environment variables:');
  console.error(z.prettifyError(result.error));
  process.exit(1);
}

// 4. On exporte la config validée et typée
export const env = result.data;
