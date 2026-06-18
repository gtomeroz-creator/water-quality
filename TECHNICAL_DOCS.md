# 🔧 דוקומנטציה טכנית - Water Quality PWA

## 📦 טכנולוגיות

- **HTML5** - מבנה הדף
- **CSS3** - עיצוב + Grid/Flexbox responsive
- **Vanilla JavaScript** - כל ההיגיון (ללא frameworks)
- **IndexedDB** - אחסון מקומי
- **Service Worker** - Offline + Caching
- **jsPDF** - יצירת PDF בעברית
- **HTML2Canvas** - Capture של HTML כתמונה (option)

---

## 🗄️ ארכיטקטורה IndexedDB

```javascript
Database: WaterQualityDB
Store: tests
  ├─ keyPath: 'id' (auto-increment)
  ├─ Index: locality
  ├─ Index: timestamp
  └─ Index: date
```

### דוגמה record:
```javascript
{
  id: 1,
  locality: "נצרת",           // string
  meter: "מד-001",            // string
  turbidity: 0.5,             // number (NTU)
  chlorine: 0.8,              // number (mg/L)
  pH: 7.2,                    // number
  timestamp: 1718700000000,   // milliseconds
  date: "2024-06-18"          // ISO format
}
```

---

## 🔍 פונקציות עיקריות

### `initDB()`
```javascript
// initialization של IndexedDB
// מוקרא בעת load הדף
// יוצר object store אם לא קיים
```

### `saveTest(testData)`
```javascript
const testData = {
  locality, meter, turbidity, chlorine, pH,
  timestamp: Date.now(),
  date: new Date().toISOString().split('T')[0]
};
await saveTest(testData);
// יוצר ID אוטומטי
```

### `getTests()`
```javascript
const allTests = await getTests();
// מחזירה מערך של כל הרשומות
// ממויין by timestamp (חדש ראשון)
```

### `deleteTest(id)`
```javascript
await deleteTest(testId);
// מוחק רשומה בודדת
```

### `clearAllTests()`
```javascript
await clearAllTests();
// מוחק את כל ה-store
// ⚠️ NO UNDO!
```

---

## 🎨 פונקציות UI

### `getQualityStatus(turbidity, chlorine, pH)`
```javascript
// בדיקת איכות מול סטנדרטים
// מחזיר: { status, badge, issues }

// סטנדרטים:
// turbidity > 1 NTU        → בעיה
// chlorine < 0.2 or > 1.0  → בעיה
// pH < 6.5 or > 8.5        → בעיה
```

### `showAlert(message, type)`
```javascript
showAlert('✅ בדיקה נשמרה!', 'success');
showAlert('❌ שגיאה!', 'error');
// alert עם auto-hide אחרי 3 שניות
```

### `formatDate(date)`
```javascript
// מחזירה string בעברית
// "18/06/2024, 10:30"
```

### `loadRecords()`
```javascript
// טוען את כל הרשומות מ-DB
// משדרת את ה-DOM
// מעדכן סטטיסטיקות
```

---

## 📄 PDF Export

### `generateTestPDF(testId)`
```javascript
// מייצר PDF לבדיקה בודדת
// כולל:
// - כותרת + חברה
// - פרטי בדיקה
// - הערות איכות
// - מקום לחתימה

// שם הקובץ:
// בדיקה_[ישוב]_[תאריך].pdf
```

### `exportAllPDF()`
```javascript
// מייצר PDF עם כל הבדיקות
// כולל:
// - טבלה מלאה
// - סטטיסטיקות
// - עיצוב עברית RTL

// שם הקובץ:
// דוח_איכות_מים_[תאריך].pdf
```

---

## 🔐 Service Worker (sw.js)

```javascript
// Cache Strategy: Network First with Cache Fallback
// 1. try fetch מהרשת
// 2. אם נכשל, חזור מ-cache
// 3. אם אין cache, offline error
```

### Events:
- **install** - קאש את הקבצים ב-install
- **activate** - נקה cache ישן
- **fetch** - הנדל network requests

---

## 🎯 Manifest.json

```json
{
  "name": "שם ארוך של האפ",
  "short_name": "שם קצר",
  "display": "standalone",  // כמו native app
  "start_url": "/",
  "theme_color": "#0077be", // צבע כיתוב
  "background_color": "#fff", // צבע background
  "icons": [ ... ],
  "shortcuts": [ ... ]  // הקצרות בעמודת ההשראה
}
```

---

## 🛠️ הרחבות עתידיות

### 1️⃣ Google Sheets Sync
```javascript
// שלח נתונים ל-Google Sheets
const gapiKey = 'YOUR_API_KEY';
const spreadsheetId = 'YOUR_SHEET_ID';

async function syncToSheets() {
  const tests = await getTests();
  // POST ל-Google Sheets API
  // שלח כל רשומה
}
```

### 2️⃣ QR Code Scanner
```html
<script src="https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.js"></script>

// בשדה "מד מים"
// לחץ על icon
// לסרוק QR code
// הערך מתעדכן אוטומטי
```

### 3️⃣ גרפיקות + Recharts
```bash
npm install recharts
```

```javascript
// import Chart from recharts
// תרשים של pH לאורך זמן
// trend line של עכירות
```

### 4️⃣ Excel Export
```bash
npm install xlsx
```

```javascript
// import * as XLSX from 'xlsx'
// יצור Excel מ-getTests()
// עם Sheet בן-כותרות
```

### 5️⃣ PWA Push Notifications
```javascript
// זמן שנתונה משתנה בצורה חשודה
// עכירות עלתה 50% בשעה אחרונה!
// push notification: "בדוק מידי"
```

---

## 🧪 בדיקה מקומית

```bash
# Python 3.x
python -m http.server 8000

# Node.js
npx http-server

# npm
npm install -g http-server
http-server
```

ואז בדפדפן:
```
http://localhost:8000
```

**DevTools:**
- `F12` → Application → Local Storage / IndexedDB
- בדוק את ה-Cache בתוך Service Workers

---

## 🐛 Debug Tips

### IndexedDB Browser
```javascript
// בקונסולה:
const db = indexedDB.databases();
console.log(db);

// רואה את כל DBs
```

### Service Worker Debug
```javascript
// בדוק בקונסולה:
navigator.serviceWorker.getRegistrations()
  .then(registrations => console.log(registrations));
```

### Network Throttling
- DevTools → Network → "Slow 3G"
- בדוק אם עובד ב-offline

### Clear Cache
```javascript
// בקונסולה:
caches.keys().then(names => {
  names.forEach(name => caches.delete(name));
});
```

---

## 📝 משימות עתידיות

- [ ] Sync to Google Sheets
- [ ] QR Code Scanner
- [ ] Charts (Recharts/Chart.js)
- [ ] Excel Export
- [ ] Push Notifications
- [ ] Dark Mode
- [ ] Multi-language (English/Arabic)
- [ ] Photo Capture
- [ ] Voice Notes
- [ ] Cloud Backup

---

## 🔗 מקורות שימושיים

- **MDN - IndexedDB**: https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API
- **MDN - Service Workers**: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
- **jsPDF Docs**: https://github.com/parallax/jsPDF
- **PWA Checklist**: https://web.dev/pwa-checklist/
- **GitHub Pages**: https://pages.github.com/

---

## 📧 זיהוי בעיות נפוצות

### בעיה: "DB לא משתמר בין רענון"
**פתרון:**
```javascript
// ודא שלא מחקת את הDB בטעות
indexedDB.deleteDatabase('WaterQualityDB');
// צריך ליצור מחדש אחרי זה
```

### בעיה: "PDF לא כתוב בעברית"
**פתרון:**
```javascript
// jsPDF יהיה צריך font עברית
doc.addFont('Roboto', 'normal');
doc.setFont('Roboto');
```

### בעיה: "Service Worker לא עובד"
**בדיקה:**
```javascript
// DevTools → Application → Service Workers
// אם אדום - יש בעיה
// בדוק console לשגיאות
```

---

**Last Updated:** June 2024
**Version:** 1.0.0 Technical Docs
