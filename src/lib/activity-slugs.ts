export const ACTIVITY_SLUGS = [
  "education",
  "healthcare",
  "events",
  "consulting",
  "partnership",
  "support",
] as const;

export type ActivitySlug = (typeof ACTIVITY_SLUGS)[number];

/** Order matches `activities.items` on the home page. */
export const ACTIVITY_SLUG_BY_INDEX: ActivitySlug[] = [
  "education",
  "healthcare",
  "events",
  "consulting",
  "partnership",
  "support",
];

export function isActivitySlug(value: string): value is ActivitySlug {
  return (ACTIVITY_SLUGS as readonly string[]).includes(value);
}
