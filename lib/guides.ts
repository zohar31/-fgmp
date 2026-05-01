// אינדקס מדריכים — מקור אמת יחיד למטא-דאטה של כל דף מדריך
// כל מדריך = קובץ ייעודי תחת app/guides/<slug>/page.tsx, אבל המטא-דאטה והקישורים מנוהלים כאן

export type Guide = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;     // משפט פתיחה לכרטיסי אינדקס
  category: string;
  readTime: number;    // דקות
  publishedAt: string; // ISO date
  updatedAt: string;   // ISO date
  keywords: string[];
};

export const guides: Guide[] = [
  {
    slug: "leads-from-facebook-groups",
    title: "איך משיגים לידים חמים מקבוצות פייסבוק ב-2026 — המדריך המלא",
    description:
      "המדריך המקיף לאיתור לידים מקבוצות פייסבוק: למה זה עובד, איך לסנן את הזבל, באילו כלים להשתמש, כמה זה עולה, ואיך אוטומציה משנה את המשחק.",
    excerpt:
      "אלפי פוסטים פומביים בקבוצות פייסבוק כל יום מכילים שאלות של אנשים שמחפשים עכשיו את השירות שלך. הנה איך להפוך את זה לזרם לידים חמים יומי.",
    category: "מדריכי לידים",
    readTime: 12,
    publishedAt: "2026-04-30",
    updatedAt: "2026-05-02",
    keywords: [
      "לידים מקבוצות פייסבוק",
      "איך להשיג לידים",
      "לידים חמים",
      "סריקת קבוצות פייסבוק",
      "מערכת לידים אוטומטית",
    ],
  },
];

export function getGuide(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}
