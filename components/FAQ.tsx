"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { SITE } from "@/lib/config";

const faqs = [
  {
    q: "איך זה עובד בעצם?",
    a: "אנחנו מפעילים מערכת AI שסורקת באופן רציף אלפי קבוצות פייסבוק רלוונטיות לתחום שלך. ברגע שמישהו מפרסם פוסט שמחפש את השירות שלך — המערכת מזהה את זה ושולחת לך הודעת וואטסאפ עם פרטי הפוסט וקישור ישיר אליו.",
  },
  {
    q: "מה קורה אם פניתי לליד והוא לא ענה לי?",
    a: "המערכת כוללת מנגנון Follow-up אוטומטי. אם לא קיבלת תשובה — היא שולחת ללקוח תזכורת ידידותית בוואטסאפ אחרי שעתיים, ויכולה לחזור פעם נוספת אחרי שעתיים נוספות. ברגע שהלקוח עונה — ה-Follow-up מתבטל אוטומטית. אתה לא צריך לעשות כלום.",
  },
  {
    q: "כמה זמן לוקח להתחיל לקבל לידים?",
    a: "בדרך כלל תוך 12-48 שעות מרגע ההרשמה. אנחנו צריכים להגדיר את הסינון לתחום שלך — ואז ההתראות מתחילות להגיע אוטומטית.",
  },
  {
    q: "מה כולל הניסיון החינם?",
    a: `${SITE.pricing.trialDays} ימים מלאים של גישה לכל היכולות של המערכת. ללא הגבלת לידים, ללא הבדל בשירות. אם לא תרצה להמשיך — פשוט תבטל לפני סיום הניסיון, ולא תחויב כלל.`,
  },
  {
    q: "כמה זה עולה אחרי הניסיון?",
    a: `${SITE.pricing.monthlyILS} ₪ לחודש כולל מע״מ. ללא חוזה, ללא התחייבות, ניתן לבטל בכל רגע מהאזור האישי או בהודעת וואטסאפ.`,
  },
  {
    q: "איך מבטלים?",
    a: "בלחיצה אחת מהאזור האישי באתר, או על ידי שליחת הודעת וואטסאפ למספר התמיכה. הביטול מיידי ולא נשארות התחייבויות.",
  },
  {
    q: "האם תקבלו ממני כרטיס אשראי כבר עכשיו?",
    a: "לא. כדי להתחיל את הניסיון אין צורך בכרטיס אשראי כלל. רק כשתחליט להמשיך אחרי הניסיון — נבקש פרטי תשלום דרך מערכת סליקה מאובטחת (Tranzila).",
  },
  {
    q: "האם הפעילות חוקית?",
    a: "כן. אנחנו לא נכנסים לקבוצות סגורות, לא משתפים תכנים ללא רשות, ולא מבצעים פעולות אוטומטיות בחשבון שלך. המערכת רק מנתחת תוכן ציבורי שכבר נראה לחברי הקבוצות.",
  },
  {
    q: "מה אם לא יגיעו לידים?",
    a: "בתחומים מסוימים כמות הלידים גבוהה מאוד, באחרים נמוכה יותר. בדיוק בשביל זה יש ניסיון חינם — תראה בעצמך לפני שאתה משלם.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="container-x">
        <div className="mx-auto max-w-2xl text-center">
          <div className="pill">שאלות נפוצות</div>
          <h2 className="mt-4 font-display text-3xl font-extrabold text-white sm:text-4xl text-balance">
            כל מה שרצית לדעת —{" "}
            <span className="gradient-text">בלי אותיות קטנות</span>
          </h2>
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`card overflow-hidden transition-all ${
                  isOpen ? "ring-brand-500/40" : ""
                }`}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-right"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-base font-bold text-white sm:text-lg">
                    {f.q}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-brand-300 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 leading-7 text-ink-300">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
