export type RegionGroup = {
  name: string;
  items: string[];
};

export const REGION_GROUPS: RegionGroup[] = [
  {
    name: "ארצי",
    items: ["כל הארץ"],
  },
  {
    name: "צפון",
    items: [
      "גליל עליון, אצבע הגליל והגולן",
      "גליל מערבי",
      "חיפה והקריות",
      "הכרמל",
      "גליל תחתון, עמקים וגלבוע",
      "נצרת והאזור",
      "צפת והרי מירון",
    ],
  },
  {
    name: "מרכז",
    items: [
      "תל אביב",
      "גוש דן",
      "השרון",
      "פתח תקווה והסביבה",
      "ראשון לציון, חולון, בת ים",
      "נתניה והסביבה",
      "השפלה",
      "מישור החוף",
    ],
  },
  {
    name: "שומרון",
    items: ["שומרון", "אריאל והסביבה", "בקעת הירדן"],
  },
  {
    name: "ירושלים והאזור",
    items: [
      "ירושלים",
      "הרי ירושלים",
      "בית שמש והאזור",
      "גוש עציון",
      "מעלה אדומים",
    ],
  },
  {
    name: "דרום",
    items: [
      "אשקלון, אשדוד והסביבה",
      "שדרות ועוטף עזה",
      "באר שבע והסביבה",
      "צפון הנגב",
      "מרכז הנגב והמכתשים",
      "ים המלח ומדבר יהודה",
      "ערבה דרומית",
      "אילת",
    ],
  },
];

// כשמשתמש בוחר אחד מהאיטמים, אוטומטית גם נוספים אלה ברשימה
// (לדוגמה: "תל אביב" כולל את כל הגוש המרכזי)
export const EXPANSION_RULES: Record<string, string[]> = {
  "תל אביב": [
    "גוש דן",
    "השרון",
    "פתח תקווה והסביבה",
    "ראשון לציון, חולון, בת ים",
    "נתניה והסביבה",
    "השפלה",
    "מישור החוף",
  ],
};

export const ALL_AREAS: string[] = REGION_GROUPS.flatMap((g) => g.items).filter(
  (item) => item !== "כל הארץ"
);

export function expandSelection(selected: Set<string>): Set<string> {
  const next = new Set(selected);
  if (next.has("כל הארץ")) {
    ALL_AREAS.forEach((a) => next.add(a));
  }
  for (const item of selected) {
    const expansions = EXPANSION_RULES[item];
    if (expansions) expansions.forEach((e) => next.add(e));
  }
  return next;
}
