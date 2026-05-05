/**
 * Deep-merge AI-generated content with the template's schema defaults so
 * renderers can safely access nested fields (`content.sale.end_days` etc.)
 * even when the LLM omitted parts of the JSON.
 *
 * Behaviour:
 *  - Object: every schema key exists in the result. Missing keys fall back
 *    to the schema's default value. Extra keys from the AI are preserved.
 *  - Array: if the AI provided an array, each item is merged against the
 *    schema's first item. If the AI omitted the array, returns [] so the
 *    renderer simply skips empty sections instead of crashing.
 *  - Primitive: AI value if present, otherwise the schema default.
 */

function isPlainObject(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

export function normalizeContent<T>(value: unknown, schema: T): T {
  if (Array.isArray(schema)) {
    if (!Array.isArray(value)) return [] as unknown as T;
    const itemSchema = schema[0];
    return value.map((v) =>
      isPlainObject(itemSchema) || Array.isArray(itemSchema)
        ? normalizeContent(v, itemSchema)
        : v ?? itemSchema
    ) as unknown as T;
  }

  if (isPlainObject(schema)) {
    const v = isPlainObject(value) ? value : {};
    const result: Record<string, unknown> = {};
    for (const key of Object.keys(schema)) {
      result[key] = normalizeContent(
        v[key],
        (schema as Record<string, unknown>)[key]
      );
    }
    // Preserve any extra keys the AI added that aren't in the schema.
    for (const key of Object.keys(v)) {
      if (!(key in result)) result[key] = v[key];
    }
    return result as T;
  }

  if (value === undefined || value === null) return schema;
  return value as T;
}
