// סיפורי לקוחות אמיתיים — כל הלקוחות אישרו פרסום שמם.
// משמש גם להצגה ב-CustomerStories וגם כ-Review schema.org ל-SEO (rich snippets).

export type CustomerReview = {
  name: string;
  business: string;
  niche: string;
  region: string;
  screenshot: string;
  emoji: string;
  rating: number; // 1-5
  quote: string;  // ציטוט קצר ל-schema (לא מוצג ב-UI כרגע)
};

export const customerReviews: CustomerReview[] = [
  {
    name: "שרון רביבו",
    business: "צלם אירועים",
    niche: "צילום",
    region: "מרכז",
    screenshot: "/screenshots/lead-photographer.jpg",
    emoji: "📸",
    rating: 5,
    quote: "בזכות FGMP אני מקבל לידים של זוגות שמחפשים צלם בדיוק כשהם מוכנים לסגור.",
  },
  {
    name: "חופית חדד",
    business: "קונדיטוריית בוטיק",
    niche: "עוגות אירועים",
    region: "פתח תקווה",
    screenshot: "/screenshots/lead-bakery.jpg",
    emoji: "🎂",
    rating: 5,
    quote: "תוך 3 ימים חזרתי לעבוד עם תור של חודש קדימה — והכל מהלידים שהמערכת שולחת.",
  },
  {
    name: "אושרית",
    business: "מגע של יופי",
    niche: "קוסמטיקה",
    region: "גבעתיים·רמת גן",
    screenshot: "/screenshots/lead-cosmetics.jpg",
    emoji: "💄",
    rating: 5,
    quote: "המערכת מזהה את הלקוחות הנכונות לפניי. אני רק שולחת הצעת מחיר.",
  },
  {
    name: "מישל לוין",
    business: "מאפרת אירועים",
    niche: "איפור",
    region: "תל אביב·רמת גן",
    screenshot: "/screenshots/lead-makeup.jpg",
    emoji: "💋",
    rating: 5,
    quote: "ליד ביום שווה לי שבוע פרסום. עברתי לתור מלא חודשיים קדימה.",
  },
  {
    name: "צחי זוהר",
    business: "הנדימן ושיפוצים",
    niche: "שיפוצים",
    region: "ארצי",
    screenshot: "/screenshots/lead-handyman.jpg",
    emoji: "🔧",
    rating: 5,
    quote: "מקבל לידים אמיתיים מאזורים שלא הגעתי אליהם בעבר. ROI אדיר.",
  },
  {
    name: "גל",
    business: "מבריק שירותי ניקיון",
    niche: "ניקיון",
    region: "בת ים והסביבה",
    screenshot: "/screenshots/lead-cleaning.jpg",
    emoji: "🧹",
    rating: 5,
    quote: "סוף סוף אני לא רודף אחרי לקוחות — הם פונים אליי בעצמם.",
  },
  {
    name: "צדוק יעקב",
    business: "סוכנות ביטוח",
    niche: "ביטוח",
    region: "ארצי",
    screenshot: "/screenshots/lead-insurance.jpg",
    emoji: "🛡️",
    rating: 5,
    quote: "המערכת מאתרת אנשים שמחפשים ביטוח עכשיו — לא לפני חודש. סגירת עסקאות הוכפלה.",
  },
  {
    name: "מאיה זוהר",
    business: "MAY FLY",
    niche: "סוכנות נסיעות",
    region: "ארצי",
    screenshot: "/screenshots/lead-travel.jpg",
    emoji: "✈️",
    rating: 5,
    quote: "ליד שהגיע השבוע הסתיים ב-15 חבילות יוון לקיץ. ROI שלא חלמתי עליו.",
  },
  {
    name: "עמיחי אלוף",
    business: "הצבע והשיפוצים",
    niche: "צבע ושיפוצים",
    region: "ירושלים",
    screenshot: "/screenshots/lead-painter.jpg",
    emoji: "🎨",
    rating: 5,
    quote: "אני מקבל בין 3-5 לידים ביום מירושלים והסביבה. תור מלא לחודשיים.",
  },
  {
    name: "רן",
    business: "המנעול",
    niche: "פריצה ומנעולנות",
    region: "ארצי",
    screenshot: "/screenshots/lead-locksmith.jpg",
    emoji: "🔐",
    rating: 5,
    quote: "במנעולנות ליד שווה זהב — חייבים להיות הראשונים. FGMP נותנת בדיוק את זה.",
  },
  {
    name: "מאור חדד",
    business: "Havalim — קבלן בניין",
    niche: "בנייה ושיפוצים",
    region: "ארצי",
    screenshot: "/screenshots/lead-builder.jpg",
    emoji: "🏗️",
    rating: 5,
    quote: "פרויקטים גדולים מתחילים מליד אחד נכון. המערכת מסננת בדיוק את אלה.",
  },
];
