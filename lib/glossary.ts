// מילון מונחי לידים — מקור אמת יחיד למונחון האתר.
// משמש גם להצגה בעמוד /guides/milon וגם לסכמת DefinedTermSet (GEO/AI-SEO).
// כל מונח = הגדרה קצרה, עצמאית, שמנוע AI יכול לצטט כפי שהיא.

export type Term = {
  term: string;
  aka?: string[]; // מונחים נרדפים / אנגלית
  def: string;
  anchor: string; // slug לעוגן (#) בעמוד
  guide?: string; // slug של מדריך מעמיק, אם יש
};

export const glossary: Term[] = [
  {
    term: "ליד",
    aka: ["lead", "לידים"],
    def: "לקוח פוטנציאלי שהביע עניין בשירות או מוצר. בהקשר עסקי בישראל, ליד אורגני מקבוצת פייסבוק הוא פוסט פומבי של אדם שמחפש שירות — למשל 'מחפשת קונדיטוריה לחתונה'.",
    anchor: "lead",
    guide: "what-is-a-lead",
  },
  {
    term: "ליד חם",
    aka: ["hot lead"],
    def: "ליד שהפנייה שלו טרייה ואקטיבית (נכתב בדקות/שעות האחרונות). שיעור הסגירה שלו גבוה משמעותית מליד קר, כי הלקוח עדיין בתהליך חיפוש פעיל.",
    anchor: "hot-lead",
    guide: "hot-vs-cold-leads",
  },
  {
    term: "ליד קר",
    aka: ["cold lead"],
    def: "ליד שהתעניין בעבר אך אינו בשל כרגע לרכישה, או שהפנייה שלו ישנה. דורש טיפוח (nurturing) ומעקב לאורך זמן לפני סגירה.",
    anchor: "cold-lead",
    guide: "follow-up-cold-leads",
  },
  {
    term: "ליד אורגני",
    aka: ["organic lead"],
    def: "ליד שמגיע ללא תשלום על פרסום ממומן — למשל מפוסט פומבי בקבוצת פייסבוק. עלותו נמוכה משמעותית מליד ממומן.",
    anchor: "organic-lead",
    guide: "organic-vs-paid-leads",
  },
  {
    term: "ליד ממומן",
    aka: ["paid lead"],
    def: "ליד שהושג באמצעות פרסום בתשלום (Facebook Lead Ads, Google Ads). העלות ליד גבוהה יותר והאיכות משתנה.",
    anchor: "paid-lead",
    guide: "organic-vs-paid-leads",
  },
  {
    term: "עלות לליד",
    aka: ["CPL", "cost per lead"],
    def: "סך ההוצאה על ערוץ שיווקי חלקי מספר הלידים שהתקבלו ממנו. כולל תקציב מדיה, דמי ניהול וכלים — לא רק עלות המודעה.",
    anchor: "cpl",
    guide: "calculate-cost-per-lead",
  },
  {
    term: "עלות לרכישה",
    aka: ["CPA", "cost per acquisition"],
    def: "העלות לכל לקוח משלם בפועל — עלות לליד חלקי שיעור הסגירה. זהו המדד הנכון להשוואת ערוצי לידים, לא מחיר הליד הבודד.",
    anchor: "cpa",
    guide: "calculate-cost-per-lead",
  },
  {
    term: "שיעור המרה",
    aka: ["conversion rate"],
    def: "אחוז הלידים שהפכו לפעולה הרצויה (פנייה, פגישה, עסקה). מדד מרכזי לאיכות הלידים ולאפקטיביות תהליך המכירה.",
    anchor: "conversion-rate",
    guide: "lead-kpis",
  },
  {
    term: "שיעור סגירה",
    aka: ["close rate"],
    def: "אחוז הלידים שהפכו ללקוחות משלמים. שיעור סגירה של 20% אומר שמכל 5 לידים נסגרת עסקה אחת.",
    anchor: "close-rate",
    guide: "lead-kpis",
  },
  {
    term: "מהירות תגובה לליד",
    aka: ["speed to lead"],
    def: "הזמן שחולף מרגע קבלת הליד ועד יצירת הקשר הראשונה. תגובה תוך 5 דקות מעלה דרמטית את סיכויי הסגירה — הראשון שמגיב לרוב זוכה.",
    anchor: "speed-to-lead",
    guide: "speed-to-lead",
  },
  {
    term: "משפך לידים",
    aka: ["lead funnel", "משפך שיווקי"],
    def: "המסע של הלקוח מפנייה ראשונה ועד לקוח משלם, בשלבים: מודעות → עניין → החלטה → פעולה. לידים 'נופלים' בין השלבים אם אין מעקב.",
    anchor: "lead-funnel",
    guide: "lead-funnel",
  },
  {
    term: "ליד בלעדי",
    aka: ["exclusive lead"],
    def: "ליד שנמסר לעסק אחד בלבד. עולה יותר מליד משותף אך שיעור הסגירה גבוה בהרבה כי אין תחרות מיידית על אותה פנייה.",
    anchor: "exclusive-lead",
    guide: "exclusive-vs-shared-leads",
  },
  {
    term: "ליד משותף",
    aka: ["shared lead"],
    def: "אותה פנייה שנמכרת במקביל לכמה עסקים (בדרך כלל 3-5). זול יותר, אך הלקוח מוצף פניות ושיעור הסגירה צונח.",
    anchor: "shared-lead",
    guide: "exclusive-vs-shared-leads",
  },
  {
    term: "ליד מוסמך",
    aka: ["MQL", "qualified lead"],
    def: "ליד שעבר סינון וזוהה כבעל פוטנציאל אמיתי לרכישה — לפי תקציב, צורך, סמכות החלטה ותזמון.",
    anchor: "mql",
    guide: "filter-facebook-leads",
  },
  {
    term: "טיפוח לידים",
    aka: ["lead nurturing"],
    def: "תהליך בניית קשר עם ליד שאינו בשל לרכישה מיידית, באמצעות מעקב, תוכן ומענה לאורך זמן, עד שיהיה מוכן לסגור.",
    anchor: "lead-nurturing",
    guide: "follow-up-cold-leads",
  },
  {
    term: "ROI",
    aka: ["החזר על השקעה", "return on investment"],
    def: "היחס בין הרווח מפעילות שיווקית לעלותה. נוסחה: (רווח − עלות) ÷ עלות × 100. מדד העל לרווחיות ערוץ לידים.",
    anchor: "roi",
    guide: "lead-cost-facebook-2026",
  },
  {
    term: "כוונת קנייה",
    aka: ["purchase intent"],
    def: "מידת הנכונות של אדם לבצע רכישה. פוסט 'מחפש שיפוצניק דחוף' משדר כוונת קנייה גבוהה מאוד לעומת 'מתעניין בשיפוץ בעתיד'.",
    anchor: "purchase-intent",
    guide: "hot-vs-cold-leads",
  },
  {
    term: "ליד ג'אנק",
    aka: ["junk lead", "ליד פסול"],
    def: "פנייה חסרת ערך — מספר שגוי, מתעניין שלא זוכר שהשאיר פרטים, ספאם, או משתתף בהגרלה. שכיח במיוחד בלידים ממומנים.",
    anchor: "junk-lead",
    guide: "filter-facebook-leads",
  },
  {
    term: "לנדינג פייג'",
    aka: ["landing page", "דף נחיתה"],
    def: "עמוד ייעודי שאליו מגיע גולש ממודעה או חיפוש, מותאם למטרה אחת — לרוב השארת פרטים או פנייה.",
    anchor: "landing-page",
  },
  {
    term: "ליד מגנט",
    aka: ["lead magnet"],
    def: "הצעת ערך חינמית (מדריך, מחשבון, ייעוץ) שמטרתה לגרום לגולש להשאיר פרטים והופכת אותו לליד.",
    anchor: "lead-magnet",
    guide: "free-leads",
  },
  {
    term: "CRM",
    aka: ["ניהול קשרי לקוחות"],
    def: "מערכת לניהול לידים ולקוחות — מעקב אחר כל פנייה, סטטוס, ותזכורות. מונע מלידים 'ליפול בין הכיסאות'.",
    anchor: "crm",
    guide: "manage-leads-whatsapp",
  },
  {
    term: "אוטומציית לידים",
    aka: ["lead automation"],
    def: "מכון של שלבים בתהליך הליד — איתור, התראה, תגובה ראשונה ומעקב — כדי שאף פנייה לא תאבד בגלל עומס או שכחה.",
    anchor: "lead-automation",
    guide: "lead-automation",
  },
  {
    term: "Facebook Lead Ads",
    aka: ["מודעות לידים"],
    def: "פורמט מודעה של פייסבוק שאוסף פרטי לקוח בתוך הפלטפורמה בלחיצה. נוח לגולש, אך מייצר לעיתים לידים באיכות נמוכה.",
    anchor: "lead-ads",
    guide: "facebook-lead-ads-vs-groups",
  },
  {
    term: "לידים מקבוצות פייסבוק",
    aka: ["Facebook group leads"],
    def: "לידים אורגניים המבוססים על פוסטים פומביים בקבוצות — אנשים שמבקשים המלצה או שירות. פנייה חמה בכוונת קנייה גבוהה ובעלות נמוכה.",
    anchor: "group-leads",
    guide: "leads-from-facebook-groups",
  },
];
