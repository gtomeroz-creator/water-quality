# 💧 PWA בדיקות איכות מים

Progressive Web App (PWA) לבדיקות איכות מים עבור **הרי נצרת מפעלי מים וביוב בע"מ**.

## 🎯 תכונות

✅ **ממשק חברתי וקל לשימוש**
- טופס קלט פשוט עם שדות ברורים
- תמיכה בעברית RTL מלאה
- ממשק מגיב (responsive) לנייד ודסקטופ

✅ **עבודה בלא חיבור (Offline)**
- Service Worker לעבודה ללא אינטרנט
- שמירה של נתונים ב-IndexedDB
- הודעה בעמודת התחתונה כאשר בלא חיבור

✅ **אחסון נתונים**
- IndexedDB לאחסון מהיר ויעיל
- ללא שרתים - כל הנתונים בהתקן שלך
- סטטיסטיקות בזמן אמת

✅ **ייצוא לדוח PDF**
- דוח PDF בעברית לכל בדיקה
- דוח כללי עם כל הבדיקות
- טבלה מפורטת בדוח הכללי

✅ **התקנה כאפליקציה**
- קובץ Manifest.json להתקנה ישירה
- אייקון ושם אפליקציה מותאם
- ניתן להוסיף לעמודת ההשראה (Home Screen)

## 📋 שדות הקלט

| שדה | סוג | דוגמה |
|------|------|--------|
| **ישוב** | בחירה | נצרת / ריינה / יפיע / עילוט / איכסאל |
| **מד מים / עמדה** | טקסט | מד-001, עמדה A |
| **עכירות (NTU)** | מספר | 0.5 |
| **כלור נותר (mg/L)** | מספר | 0.8 |
| **pH** | מספר | 7.2 |

## 🚀 התקנה

### אפשרות 1: GitHub Pages (מומלץ)

1. **צור Repository חדש**
   ```
   https://github.com/YOUR-USERNAME/water-quality
   ```

2. **העלה את הקבצים**
   ```bash
   git clone https://github.com/YOUR-USERNAME/water-quality.git
   cd water-quality
   # העתק את כל הקבצים:
   # - index.html
   # - sw.js
   # - manifest.json
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

3. **הפעל GitHub Pages**
   - Settings → Pages
   - Source: `main` branch
   - URL: `https://YOUR-USERNAME.github.io/water-quality`

4. **התקן כאפליקציה**
   - פתח ב-Chrome / Safari / Firefox
   - לחץ על אייקון ההתקנה בסרגל הכתובת
   - בחר "הוסף ל-Home Screen"

### אפשרות 2: שרת מקומי

```bash
# Python 3
python -m http.server 8000

# או Node.js
npx http-server

# או npm
npm install -g http-server
http-server
```

ואז פתח: `http://localhost:8000`

### אפשרות 3: Netlify / Vercel

**Netlify:**
1. צור חשבון ב-netlify.com
2. Drag & Drop את התיקייה
3. הוא יוצר URL בעצמו

**Vercel:**
1. התחבר עם GitHub
2. בחר את ה-Repository
3. Deploy!

## 🛠️ קבצים בפרויקט

```
water-quality-pwa/
├── index.html       # ממשק הראשי + JavaScript
├── sw.js            # Service Worker (עבודה offline)
├── manifest.json    # הגדרות PWA
└── README.md        # קובץ זה
```

## 📊 מבנה נתונים (IndexedDB)

```javascript
{
  id: 1,
  locality: "נצרת",
  meter: "מד-001",
  turbidity: 0.5,
  chlorine: 0.8,
  pH: 7.2,
  timestamp: 1718700000000,
  date: "2024-06-18"
}
```

## 🔍 בדיקות איכות

**סטנדרטים בישראל:**
- **עכירות**: ≤ 1 NTU (חד משמעי)
- **כלור נותר**: 0.2 - 1.0 mg/L (תקן ישראל)
- **pH**: 6.5 - 8.5 (תקן ישראל)

היישום מציג הודעות אזהרה בעת חריגה מהנתונים.

## 🖨️ ייצוא PDF

### דוח בודד
- לחץ "PDF" ליד כל רשומה
- יתקבל קובץ PDF עם פרטי הבדיקה

### דוח כללי
- לחץ "📄 דוח PDF כללי"
- טבלה עם כל הבדיקות
- סטטיסטיקות כלליות

**שם הקובץ:**
```
בדיקה_נצרת_2024-06-18.pdf
דוח_איכות_מים_2024-06-18.pdf
```

## 💾 ניהול נתונים

### שמירה
- אוטומטית ב-IndexedDB
- עבודה אפילו בלא אינטרנט
- סנכרון אוטומטי בחזרה לחיבור

### מחיקה
- "🗑️ מחק" ליד כל רשומה
- "🗑️ מחק הכל" להסרת כל הנתונים
- שימו לב: מחיקה היא סופית!

### עדכוני נתונים
כדי לערוך רשומה קיימת:
1. מחק את הרשומה הישנה
2. הוסף רשומה חדשה עם הערכים המעודכנים

## 🔒 אבטחה ופרטיות

- ✅ כל הנתונים מאוחסנים בהתקן שלך
- ✅ ללא שליחת נתונים לשרתים
- ✅ עבודה offline מלאה
- ✅ אין עקיבה או analytics

## 🌐 תאימות דפדפנים

| דפדפן | תמיכה |
|-------|--------|
| Chrome | ✅ מלא |
| Firefox | ✅ מלא |
| Safari | ✅ חלקי |
| Edge | ✅ מלא |
| Samsung Internet | ✅ מלא |

## 🐛 פתרון בעיות

### "לא עובד ב-Safari"
- Safari בעברית זקוקה ל-iOS 15.2+
- בדוק את ההגדרות: Settings → Safari → Privacy

### "Service Worker לא מרשם"
- בדוק שהיישום ב-HTTPS (GitHub Pages זה אוטומטי)
- LocalHost זה בסדר בפיתוח

### "PDF לא מדפס בעברית"
- ודא שירי Fonts מותקנים
- נסה לברור PDF ואז להדפיס

### "קובץים לא מתעדכנים"
- מחק את ה-Cache: Ctrl+Shift+Delete (Chrome)
- או: Settings → Clear Browsing Data

## 📱 הוספה לעמודת ההשראה

**iOS (Safari):**
1. לחץ על כפתור Share
2. בחר "Add to Home Screen"
3. קרא ל"בדיקות מים"

**Android (Chrome):**
1. לחץ על ⋮ (עוד אפשרויות)
2. בחר "Install app" או "Add to Home Screen"
3. אישור

**Desktop (Chrome/Edge):**
1. לחץ על אייקון ההתקנה בסרגל הכתובת
2. "Install" 
3. יופיע ככל ה-Window זכות

## 🔄 עדכונים ודור הבא

תוכניות עתידיות:
- ✓ סנכרון ל-Google Sheets
- ✓ גרפיקות ותרשימים
- ✓ תנבואות וממוצעים
- ✓ Export ל-Excel
- ✓ QR Code Scanner (כמו במטרים)

## 📞 תמיכה

בעיות או הצעות?
- צור Issue ב-GitHub
- או שלח Email ל-Tomer

## 📄 רישיון

MIT License - ללא הגבלות שימוש

---

**יוצר:** Tomer Ozeri
**עדכון אחרון:** יוני 2024
**גרסה:** 1.0.0
