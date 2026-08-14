// ─────────────────────────────────────────────────────────────────────────
// Local-SEO geo matrix: profession × city.
// Each combination becomes a unique static page under
// /lidim/<professionSlug>/<citySlug> with its own H1, LocalBusiness/Service
// schema (areaServed = the city), and city-specific body copy.
//
// Content is templated but *varied*: sentence banks are keyed by a stable
// hash of (profession, city) so no two pages read identically — this is
// programmatic SEO done responsibly (real local intent, no doorway spam).
// ─────────────────────────────────────────────────────────────────────────

export type City = {
  slug: string; // URL segment (transliterated)
  name: string; // Hebrew display name
  region: "מרכז" | "שרון" | "דרום" | "צפון" | "ירושלים" | "שפלה";
  nearby: string[]; // neighboring cities/areas — used to enrich copy
};

export const cities: City[] = [
  { slug: "tel-aviv", name: "תל אביב", region: "מרכז", nearby: ["רמת גן", "גבעתיים", "בת ים", "חולון"] },
  { slug: "jerusalem", name: "ירושלים", region: "ירושלים", nearby: ["מבשרת ציון", "מעלה אדומים", "בית שמש"] },
  { slug: "haifa", name: "חיפה", region: "צפון", nearby: ["קריות", "נשר", "טירת כרמל"] },
  { slug: "rishon-lezion", name: "ראשון לציון", region: "מרכז", nearby: ["נס ציונה", "רחובות", "באר יעקב"] },
  { slug: "petah-tikva", name: "פתח תקווה", region: "מרכז", nearby: ["ראש העין", "אלעד", "גבעת שמואל", "קרית אונו"] },
  { slug: "netanya", name: "נתניה", region: "שרון", nearby: ["חדרה", "כפר יונה", "אבן יהודה"] },
  { slug: "ashdod", name: "אשדוד", region: "דרום", nearby: ["אשקלון", "יבנה", "גן יבנה"] },
  { slug: "beer-sheva", name: "באר שבע", region: "דרום", nearby: ["עומר", "להבים", "אופקים", "דימונה"] },
  { slug: "holon", name: "חולון", region: "מרכז", nearby: ["בת ים", "אזור", "ראשון לציון"] },
  { slug: "ramat-gan", name: "רמת גן", region: "מרכז", nearby: ["גבעתיים", "בני ברק", "תל אביב"] },
  { slug: "rehovot", name: "רחובות", region: "שפלה", nearby: ["נס ציונה", "יבנה", "מזכרת בתיה"] },
  { slug: "kfar-saba", name: "כפר סבא", region: "שרון", nearby: ["רעננה", "הוד השרון", "הרצליה"] },
  { slug: "herzliya", name: "הרצליה", region: "שרון", nearby: ["רמת השרון", "הוד השרון", "כפר שמריהו"] },
  { slug: "raanana", name: "רעננה", region: "שרון", nearby: ["כפר סבא", "הוד השרון", "הרצליה"] },
  { slug: "modiin", name: "מודיעין", region: "מרכז", nearby: ["רעות", "מכבים", "שוהם", "לוד"] },
  { slug: "ashkelon", name: "אשקלון", region: "דרום", nearby: ["אשדוד", "קרית גת", "שדרות"] },
  { slug: "bat-yam", name: "בת ים", region: "מרכז", nearby: ["חולון", "תל אביב", "ראשון לציון"] },
  { slug: "givatayim", name: "גבעתיים", region: "מרכז", nearby: ["רמת גן", "תל אביב", "בני ברק"] },
  { slug: "kiryat-gat", name: "קרית גת", region: "דרום", nearby: ["אשקלון", "קרית מלאכי", "שדרות"] },
  { slug: "nes-ziona", name: "נס ציונה", region: "שפלה", nearby: ["רחובות", "ראשון לציון", "רמלה"] },
  { slug: "hod-hasharon", name: "הוד השרון", region: "שרון", nearby: ["כפר סבא", "רעננה", "רמת השרון"] },
  { slug: "beit-shemesh", name: "בית שמש", region: "ירושלים", nearby: ["ירושלים", "מודיעין", "קרית גת"] },
  { slug: "nahariya", name: "נהריה", region: "צפון", nearby: ["עכו", "כרמיאל", "מעלות"] },
  { slug: "tveria", name: "טבריה", region: "צפון", nearby: ["כרמיאל", "צפת", "בית שאן"] },
];

// professionSlug MUST match an existing entry in landing-pages.ts so the geo
// page can link "up" to the profession pillar page.
export type GeoProfession = {
  professionSlug: string; // e.g. "lidim-leshipuznik"
  noun: string; // "שיפוצניק"
  nounGenitive: string; // form after ל: "לשיפוצניק"
  service: string; // "שיפוצים"
  searchExamples: string[]; // realistic group-post phrasings (no city — city injected)
};

export const geoProfessions: GeoProfession[] = [
  { professionSlug: "lidim-leshipuznik", noun: "שיפוצניק", nounGenitive: "לשיפוצניק", service: "שיפוצים", searchExamples: ["מחפש שיפוצניק אמין", "המלצות על שיפוצניק", "מי עושה שיפוץ אמבטיה"] },
  { professionSlug: "lidim-leinstalator", noun: "אינסטלטור", nounGenitive: "לאינסטלטור", service: "אינסטלציה", searchExamples: ["צריך אינסטלטור דחוף", "יש נזילה מי ממליץ על אינסטלטור", "מחפשת שרברב"] },
  { professionSlug: "lidim-lehashmalai", noun: "חשמלאי", nounGenitive: "לחשמלאי", service: "עבודות חשמל", searchExamples: ["מחפש חשמלאי מוסמך", "מי ממליץ על חשמלאי", "צריך חשמלאי לתיקון"] },
  { professionSlug: "lidim-lehandimen", noun: "הנדימן", nounGenitive: "להנדימן", service: "עבודות תחזוקה", searchExamples: ["מחפשת הנדימן לתיקונים קטנים", "מי עושה עבודות הנדימן", "צריך בעל מקצוע לתיקונים בבית"] },
  { professionSlug: "lidim-laman-ulan", noun: "מנעולן", nounGenitive: "למנעולן", service: "פריצת מנעולים", searchExamples: ["ננעלתי בחוץ צריך מנעולן דחוף", "מי ממליץ על מנעולן", "מחפש מנעולן"] },
  { professionSlug: "lidim-lehovalot", noun: "מוביל", nounGenitive: "למוביל", service: "הובלות", searchExamples: ["מחפש חברת הובלות", "מי ממליץ על מובילים", "צריך הובלה לדירה"] },
  { professionSlug: "lidim-leganan", noun: "גנן", nounGenitive: "לגנן", service: "גינון", searchExamples: ["מחפשת גנן קבוע", "מי ממליץ על גנן", "צריך גנן לתחזוקת גינה"] },
  { professionSlug: "lidim-lemadbir", noun: "מדביר", nounGenitive: "למדביר", service: "הדברה", searchExamples: ["צריך מדביר דחוף", "מי ממליץ על הדברה", "מחפש חברת הדברה"] },
  { professionSlug: "lidim-letechnai-mazganim", noun: "טכנאי מזגנים", nounGenitive: "לטכנאי מזגנים", service: "תיקון מזגנים", searchExamples: ["המזגן לא מקרר צריך טכנאי", "מי ממליץ על טכנאי מזגנים", "מחפש טכנאי למיזוג"] },
  { professionSlug: "lidim-letzabai", noun: "צבעי", nounGenitive: "לצבעי", service: "צביעת דירות", searchExamples: ["מחפש צבעי לדירה", "מי ממליץ על צבעי", "צריך לצבוע דירה"] },
  { professionSlug: "lidim-lekablan", noun: "קבלן שיפוצים", nounGenitive: "לקבלן", service: "עבודות קבלנות", searchExamples: ["מחפש קבלן שיפוצים", "מי ממליץ על קבלן אמין", "צריך הצעת מחיר לשיפוץ כללי"] },
  { professionSlug: "lidim-lenagar", noun: "נגר", nounGenitive: "לנגר", service: "נגרות", searchExamples: ["מחפש נגר לארונות", "מי ממליץ על נגר", "צריך נגר לרהיטים בהזמנה"] },
  { professionSlug: "lidim-leitum", noun: "איטום גגות", nounGenitive: "לאיטום", service: "איטום", searchExamples: ["יש רטיבות מי עושה איטום", "מחפש חברת איטום", "צריך איטום גג דחוף"] },
  { professionSlug: "lidim-lealuminium", noun: "מסגר אלומיניום", nounGenitive: "לאלומיניום", service: "עבודות אלומיניום", searchExamples: ["מחפש בעל מקצוע לאלומיניום", "מי עושה חלונות אלומיניום", "צריך פרגולת אלומיניום"] },
  { professionSlug: "lidim-leparket", noun: "מתקין פרקט", nounGenitive: "להתקנת פרקט", service: "התקנת פרקט", searchExamples: ["מחפש מתקין פרקט", "מי ממליץ על פרקטן", "צריך הצעה להתקנת פרקט"] },
  { professionSlug: "lidim-letzalam", noun: "צלם", nounGenitive: "לצלם", service: "צילום אירועים", searchExamples: ["מחפשת צלם לאירוע", "מי ממליץ על צלם", "צריך צלם לחתונה"] },
  { professionSlug: "lidim-lemaeperet", noun: "מאפרת", nounGenitive: "למאפרת", service: "איפור", searchExamples: ["מחפשת מאפרת לאירוע", "מי ממליצה על מאפרת", "צריך איפור כלה"] },
  { professionSlug: "lidim-lekonditor", noun: "קונדיטור", nounGenitive: "לקונדיטור", service: "עוגות מעוצבות", searchExamples: ["מחפשת עוגת יום הולדת", "מי ממליץ על קונדיטוריה", "צריך עוגה מעוצבת לאירוע"] },
  { professionSlug: "lidim-lekietering", noun: "קייטרינג", nounGenitive: "לקייטרינג", service: "קייטרינג", searchExamples: ["מחפשת קייטרינג לאירוע", "מי ממליץ על קייטרינג", "צריך הצעת מחיר לקייטרינג"] },
  { professionSlug: "lidim-ledj", noun: "תקליטן", nounGenitive: "לתקליטן", service: "תקליטנות", searchExamples: ["מחפשת DJ לאירוע", "מי ממליץ על תקליטן", "צריך תקליטן לחתונה"] },
  { professionSlug: "lidim-leorech-din", noun: "עורך דין", nounGenitive: "לעורך דין", service: "ייעוץ משפטי", searchExamples: ["מחפש עורך דין", "מי ממליץ על עו\"ד", "צריך ייעוץ משפטי"] },
  { professionSlug: "lidim-lesochen-bituach", noun: "סוכן ביטוח", nounGenitive: "לסוכן ביטוח", service: "ביטוח", searchExamples: ["מחפש סוכן ביטוח טוב", "מי ממליץ על סוכן ביטוח", "צריך לעשות סדר בביטוחים"] },
  { professionSlug: "lidim-lekosmetikait", noun: "קוסמטיקאית", nounGenitive: "לקוסמטיקאית", service: "טיפולי קוסמטיקה", searchExamples: ["מחפשת קוסמטיקאית טובה", "מי ממליצה על קוסמטיקאית", "צריך טיפול פנים"] },
  { professionSlug: "lidim-lesapar", noun: "מספרה", nounGenitive: "לספר", service: "עיצוב שיער", searchExamples: ["מחפשת מספרה טובה", "מי ממליץ על ספר", "צריך תספורת"] },
  { professionSlug: "lidim-lemanikuristit", noun: "מניקוריסטית", nounGenitive: "למניקוריסטית", service: "מניקור פדיקור", searchExamples: ["מחפשת מניקוריסטית", "מי ממליצה על לק ג'ל", "צריך מניקור פדיקור"] },
  { professionSlug: "lidim-lemoosach", noun: "מוסך", nounGenitive: "למוסך", service: "טיפול ותיקון רכב", searchExamples: ["מחפש מוסך אמין", "מי ממליץ על מוסך", "צריך מוסך לרכב"] },
  { professionSlug: "lidim-lemore-nehiga", noun: "מורה נהיגה", nounGenitive: "למורה נהיגה", service: "שיעורי נהיגה", searchExamples: ["מחפש מורה נהיגה טוב", "מי ממליץ על מורה נהיגה", "צריך מורה נהיגה"] },
  { professionSlug: "lidim-letechnay-mahsehvim", noun: "טכנאי מחשבים", nounGenitive: "לטכנאי מחשבים", service: "תיקון מחשבים", searchExamples: ["המחשב לא נדלק צריך טכנאי", "מי ממליץ על טכנאי מחשבים", "מחפש טכנאי למחשב"] },
  { professionSlug: "lidim-leveterinar", noun: "וטרינר", nounGenitive: "לוטרינר", service: "טיפול וטרינרי", searchExamples: ["מחפש וטרינר טוב", "מי ממליץ על וטרינר", "צריך וטרינר דחוף"] },
  { professionSlug: "lidim-lesokhen-nadlan", noun: "מתווך נדל\"ן", nounGenitive: "למתווך נדל\"ן", service: "תיווך נדל\"ן", searchExamples: ["מחפש מתווך אמין", "מי ממליץ על מתווך", "מוכר דירה מחפש מתווך"] },
  { professionSlug: "lidim-leroe-cheshbon", noun: "רואה חשבון", nounGenitive: "לרואה חשבון", service: "הנהלת חשבונות", searchExamples: ["מחפש רואה חשבון לעסק", "מי ממליץ על רו\"ח", "צריך רואה חשבון"] },
  { professionSlug: "lidim-lemeamen-koshen", noun: "מאמן כושר", nounGenitive: "למאמן כושר", service: "אימוני כושר", searchExamples: ["מחפש מאמן כושר אישי", "מי ממליץ על מאמן כושר", "צריך מאמן כושר"] },
  { professionSlug: "lidim-lemeatzevet-pnim", noun: "מעצבת פנים", nounGenitive: "למעצבת פנים", service: "עיצוב פנים", searchExamples: ["מחפשת מעצבת פנים", "מי ממליץ על מעצב פנים", "צריך ייעוץ עיצוב לבית"] },
  { professionSlug: "lidim-lematzlemot-avtacha", noun: "מתקין מצלמות אבטחה", nounGenitive: "למצלמות אבטחה", service: "התקנת מצלמות אבטחה", searchExamples: ["מחפש להתקין מצלמות אבטחה", "מי ממליץ על מצלמות אבטחה", "צריך מערכת מצלמות לבית"] },
  { professionSlug: "lidim-lemore-prati", noun: "מורה פרטי", nounGenitive: "למורה פרטי", service: "שיעורים פרטיים", searchExamples: ["מחפשת מורה פרטי למתמטיקה", "מי ממליץ על מורה פרטי", "צריך מורה פרטי לאנגלית"] },
  { professionSlug: "lidim-leozeret-bayit", noun: "עוזרת בית", nounGenitive: "לעוזרת בית", service: "ניקיון בית", searchExamples: ["מחפשת עוזרת בית", "מי ממליצה על עוזרת בית", "צריך עוזרת בית קבועה"] },
  { professionSlug: "lidim-lemetapelet-kshishim", noun: "מטפלת קשישים", nounGenitive: "למטפלת קשישים", service: "טיפול בקשישים", searchExamples: ["מחפשים מטפלת לקשיש", "מי ממליץ על מטפלת סיעודית", "צריך מטפלת להורה"] },
  { professionSlug: "lidim-lemaalef-klavim", noun: "מאלף כלבים", nounGenitive: "למאלף כלבים", service: "אילוף כלבים", searchExamples: ["מחפש מאלף כלבים", "מי ממליץ על מאלף", "צריך אילוף לגור"] },
  { professionSlug: "lidim-leyoetz-mashkantaot", noun: "יועץ משכנתאות", nounGenitive: "ליועץ משכנתאות", service: "ייעוץ משכנתאות", searchExamples: ["מחפש יועץ משכנתאות", "מי ממליץ על יועץ משכנתא", "צריך עזרה עם משכנתא"] },
  { professionSlug: "lidim-lemnahel-social", noun: "מנהל סושיאל", nounGenitive: "למנהל סושיאל", service: "ניהול רשתות חברתיות", searchExamples: ["מחפש מנהל סושיאל לעסק", "מי מנהל אינסטגרם לעסקים", "צריך מישהו לרשתות החברתיות"] },
  { professionSlug: "lidim-leyotzer-tochen", noun: "יוצר תוכן", nounGenitive: "ליוצר תוכן", service: "יצירת תוכן", searchExamples: ["מחפש יוצר תוכן לעסק", "מי עושה רילסים טובים", "צריך עורך וידאו לתוכן"] },
  { professionSlug: "lidim-lemashpian", noun: "משפיען", nounGenitive: "למשפיען", service: "שיתופי פעולה עם משפיענים", searchExamples: ["מחפש משפיען לקידום העסק", "מי מכיר משפיענית באזור", "צריך שיתוף פעולה עם משפיען"] },
];

// ── lookups ────────────────────────────────────────────────────────────────
export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}
export function getGeoProfession(slug: string): GeoProfession | undefined {
  return geoProfessions.find((p) => p.professionSlug === slug);
}

// All static params — every profession × every city.
export function allGeoParams(): { slug: string; city: string }[] {
  const out: { slug: string; city: string }[] = [];
  for (const p of geoProfessions) {
    for (const c of cities) {
      out.push({ slug: p.professionSlug, city: c.slug });
    }
  }
  return out;
}

// Stable, deterministic hash (no Math.random — must be reproducible per build).
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

// pick one variant from a bank, deterministically per (profession, city)
function pick<T>(bank: T[], seed: string): T {
  return bank[hash(seed) % bank.length];
}

export type GeoContent = {
  metaTitle: string;
  metaDescription: string;
  h1: string;
  kicker: string;
  subheading: string;
  intro: string[];
  benefits: string[];
  faq: { q: string; a: string }[];
  nearbyLine: string;
};

// Build the full page content for a profession × city combination.
export function buildGeoContent(
  p: GeoProfession,
  c: City,
  monthly: number,
  refundDays: number
): GeoContent {
  const seed = `${p.professionSlug}|${c.slug}`;
  const ex = p.searchExamples;
  const example = pick(ex, seed);

  const kickerBank = [`לידים ${c.name} 2026`, `לידים באזור ${c.name}`, `${p.noun} · ${c.name}`];
  const kicker = pick(kickerBank, seed + "k");

  const h1 = `לידים ${p.nounGenitive} ב${c.name} — מקבוצות פייסבוק, ישר לוואטסאפ`;

  const metaTitle = `לידים ${p.nounGenitive} ב${c.name} | ${p.service} — FGMP`;

  const metaDescription = `מחפש לידים ${p.nounGenitive} ב${c.name}? FGMP סורקת את קבוצות הפייסבוק של ${c.name} והאזור 24/7 ושולחת כל פנייה ל${p.service} ישר לוואטסאפ שלך. ${monthly}₪/חודש · ערבות החזר ${refundDays} ימים.`;

  const subheading = `בכל יום מתפרסמים בקבוצות של ${c.name} והסביבה פוסטים כמו "${example} ב${c.name}". FGMP מאתרת אותם בזמן אמת ושולחת לך את הליד לוואטסאפ — לפני שהמתחרים בכלל ראו.`;

  const introBank1 = [
    `אם אתה ${p.noun} שעובד ב${c.name} ובאזור ${c.region}, הלקוחות הבאים שלך כבר מחפשים אותך — בקבוצות הפייסבוק המקומיות. תושבי ${c.name} שואלים כל יום "${example}" ומקבלים עשרות תגובות. הבעיה: אי אפשר לשבת כל היום ולסרוק את כל הקבוצות של ${c.name}, ${c.nearby.slice(0, 2).join(" ו")} והסביבה.`,
    `${c.name} היא אחת הערים שבהן הביקוש ל${p.service} גבוה במיוחד — ודווקא שם התחרות על כל פנייה חדה. עשרות פוסטים בשבוע של אנשים שכותבים "${example}" מתפרסמים בקבוצות המקומיות של ${c.name} ושל ${c.nearby[0]}, ורובם נסגרים עם מי שהגיב ראשון.`,
    `בעל מקצוע ב${c.name} לא צריך עוד מודעה ממומנת יקרה — הוא צריך להגיע ראשון לפניות ה${p.service} שכבר מתפרסמות בקבוצות הפייסבוק של העיר. אנשים ב${c.name} מחפשים "${example}" מדי יום, וכל פוסט כזה הוא לקוח פוטנציאלי חם.`,
    `הלקוחות של ${p.service} ב${c.name} כבר נמצאים בקבוצות הפייסבוק המקומיות — הם פשוט לא יודעים עליך, ואתה לא רואה אותם. בכל שבוע נכתבות באזור ${c.name} ו${c.region} עשרות בקשות בסגנון "${example}", והפנייה שלהן פתוחה למי שמזדרז לענות.`,
  ];

  const introBank2 = [
    `FGMP סורקת ברקע יותר מ-50,000 קבוצות פייסבוק פעילות בישראל — כולל כל הקבוצות המקומיות של ${c.name} ו${c.region}. ברגע שמתפרסם פוסט שמחפש ${p.service} באזור שלך, המערכת מזהה אותו תוך פחות מדקה, כותבת תגובה מוצעת ב-AI, ושולחת לך התראה לוואטסאפ עם קישור ישיר לפוסט.`,
    `המערכת של FGMP עוקבת אחרי הקבוצות של ${c.name}, ${c.nearby.join(", ")} וכל אזור ${c.region} — 24 שעות ביממה. כשמישהו מבקש המלצה על ${p.noun}, אתה מקבל את הפוסט לוואטסאפ תוך שניות, עם תגובה מוכנה שנכתבה במיוחד לאותה פנייה.`,
    `במקום שתחפש לקוחות, FGMP מביאה אותם אליך: היא מנטרת את קבוצות הפייסבוק של ${c.name} והסביבה ומזהה כל פנייה ל${p.service}. ההתראה מגיעה לוואטסאפ שלך בזמן אמת — עם קישור לפוסט המקורי ותגובה מוצעת שכתב AI.`,
  ];

  const introBank3 = [
    `במקום לשלם 50-200 ₪ על כל ליד בודד מחברת לידים (שממילא מוכרת אותו גם ל-3 מתחרים ב${c.name}), אתה משלם ${monthly} ₪ קבוע בחודש ומקבל את כל הפניות ל${p.service} באזור שלך — בלי הגבלה. עסקה אחת מכסה את המנוי לחודשים.`,
    `העלות: ${monthly} ₪ לחודש, בלי תשלום פר ליד ובלי התחייבות. בתחום פעיל כמו ${p.service} ב${c.name} זה יוצא בפועל כמה שקלים בודדים לליד — פי כמה זול מקניית לידים או ממודעות ממומנות. ואם תוך ${refundDays} ימים לא ראית פניות אמיתיות — מקבלים את הכסף בחזרה.`,
    `בזמן שמתחרים ב${c.name} משלמים מאות שקלים על כל ליד בודד, אתה משלם ${monthly} ₪ קבוע לחודש על כל זרם הפניות ל${p.service} באזור — בלי הגבלה. וכדי שתבדוק בלי סיכון, יש ערבות החזר מלא ל-${refundDays} ימים.`,
  ];

  const intro = [pick(introBank1, seed + "1"), pick(introBank2, seed + "2"), pick(introBank3, seed + "3")];

  const benefits = [
    `**כיסוי מלא של ${c.name} והאזור** — כל הקבוצות המקומיות של ${c.name}, ${c.nearby.slice(0, 3).join(", ")} וסביבתן נסרקות ברצף.`,
    `**אתה הראשון שמגיב** — הפוסט מגיע לוואטסאפ שלך תוך פחות מדקה. ב${p.service}, מי שעונה ראשון סוגר.`,
    `**תגובה מוצעת ע"י AI לכל פנייה** — מותאמת לפוסט המסוים ולעסק שלך ב${c.name}, לא תבנית קבועה.`,
    `**עלות קבועה — ${monthly} ₪/חודש** — בלי תשלום פר ליד, בלי תקציב מדיה, בלי הפתעות.`,
    `**לידים בלעדיים בפועל** — הפנייה המקורית מהקבוצה, לא ליד משומש שנמכר לחצי מבעלי המקצוע ב${c.name}.`,
  ];

  const faq = [
    {
      q: `כמה לידים ${p.nounGenitive} אפשר לקבל ב${c.name}?`,
      a: `זה תלוי בעונה ובהיקף הקבוצות המקומיות, אבל ${c.name} היא אזור פעיל — בעלי מקצוע בתחום ${p.service} מקבלים בממוצע עשרות פניות בחודש מהקבוצות של העיר והסביבה. בזכות ערבות ההחזר ל-${refundDays} ימים אפשר פשוט לבדוק בלי סיכון.`,
    },
    {
      q: `אני עובד גם מחוץ ל${c.name} — זה מתאים לי?`,
      a: `בהחלט. אפשר להגדיר כמה אזורי שירות — למשל ${c.name} יחד עם ${c.nearby.slice(0, 2).join(" ו")} וכל ${c.region}. המערכת תשלח לך פניות ל${p.service} מכל האזורים שבחרת.`,
    },
    {
      q: `כמה זה עולה?`,
      a: `${monthly} ₪ לחודש כולל מע"מ, בלי תשלום פר ליד ובלי התחייבות. ערבות החזר מלא ${refundDays} ימים — אם לא קיבלת פניות אמיתיות ${p.nounGenitive} ב${c.name}, מקבלים את הכסף בחזרה.`,
    },
  ];

  const nearbyLine = `לידים ${p.nounGenitive} גם ב: ${c.nearby.join(" · ")}`;

  return { metaTitle, metaDescription, h1, kicker, subheading, intro, benefits, faq, nearbyLine };
}
