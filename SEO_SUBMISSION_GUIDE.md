# دليل أرشفة وظهور الموقع على محرك بحث جوجل خطوة بخطوة
# Complete Google & Search Engine Indexing Guide for Shaghal (شغال)

تم تجهيز موقعك بالكامل من الناحية التقنية (Technical SEO) ليتطابق مع أحدث معايير محركات البحث لعام 2025.
لكي يظهر موقعك عند البحث عنه باسم **شغال** أو **Shaghal**، يجب إبلاغ جوجل رسمياً بوجود الموقع عبر لوحة **Google Search Console**.

فيما يلي الخطوات التفصيلية بالترتيب:

---

## الخطوة 1: ربط الموقع بـ Google Search Console (الأهم إطلاقاً)

جوجل لا يعرف المواقع الجديدة تلقائياً إلا بعد تقديمها رسمياً.

1. افتح الرابط: [https://search.google.com/search-console](https://search.google.com/search-console)
2. سجّل الدخول بحساب الجيميل الخاص بك أو بالشركة.
3. اضغط على **"Add Property"** (إضافة موقع).
4. ستظهر لك نافذتان:
   - **Domain**: يتطلب إضافة سجل DNS TXT في لوحة تحكم الدومين (مثل Namecheap, GoDaddy, Cloudflare). *هذا هو الخيار الأفضل لأنه يغطي جميع الـ subdomains و https*.
   - **URL Prefix**: أدخل رابط موقعك كاملاً (مثال: `https://shaghal.io`).
5. **طريقة إثبات الملكية**:
   - إذا اخترت **URL Prefix**، اختر التحقق بواسطة **HTML Tag**.
   - ستعطيك جوجل كوداً مثل هذا: `<meta name="google-site-verification" content="XXXXXXXXX" />`
   - انسخ كود الـ content وضعه في ملف `index.html` في السطر:
     ```html
     <meta name="google-site-verification" content="كود_جوجل_هنا" />
     ```
   - ارفع الملف واضغط **Verify** في جوجل.

---

## الخطوة 2: تقديم خريطة الموقع (Submit Sitemap)

1. بعد إثبات الملكية، من القائمة الجانبية في Google Search Console اختر **Sitemaps** (خرائط الموقع).
2. في خانة "Add a new sitemap"، اكتب:
   ```text
   sitemap.xml
   ```
3. اضغط **Submit** (إرسال).
4. ستظهر لك الحالة باللون الأخضر **Success**، وسيقوم Googlebot فوراً بالتعرف على صفحات الموقع ومحتواها العربي والإنجليزي.

---

## الخطوة 3: طلب الفهرسة الفورية (Request Indexing)

بدلاً من الانتظار أياماً، يمكنك إجبار روبوت جوجل على فحص الموقع خلال 24-48 ساعة:

1. في أعلى شاشة Google Search Console، ستجد شريط بحث مكتوب عليه **"Inspect any URL in..."**.
2. اكتب رابط موقعك الرئيسي (مثلاً `https://shaghal.io/`) واضغط Enter.
3. ستظهر رسالة "URL is not on Google" (إذا كان الموقع جديداً).
4. اضغط على زر **"TEST LIVE URL"** (اختبار عنوان URL المباشر).
5. بعد انتهاء الفحص بنجاح، اضغط على زر **"REQUEST INDEXING"** (طلب الفهرسة).

---

## الخطوة 4: التحقق من ملف الروبوت (robots.txt)

تم إنشاء ملف `robots.txt` وهو متاح على الرابط:
`https://shaghal.io/robots.txt`

يسمح الملف لجميع محركات البحث الرئيسية (Googlebot, Bingbot, Applebot) بفهرسة الموقع دون أي حجب ويوجههم تلقائياً لخريطة الموقع.

---

## الخطوة 5: ربط الموقع بـ Bing Webmaster Tools

محرك Bing يغذي كلاً من: Bing و Yahoo و DuckDuckGo.
1. ادخل على [https://www.bing.com/webmasters](https://www.bing.com/webmasters).
2. اختر **"Import from Google Search Console"** (استيراد من جوجل سيرش كونسول).
3. سيتم استيراد الموقع وخريطة الموقع بضغطة زر واحدة دون الحاجة لأي خطوات يدوية إضافية!

---

## الخطوة 6: الظهور للبحث المحلي (Google Business Profile)

لظهور كارت الشركة الجانبي على جوجل عند البحث عن كلمة **"شغال"** أو **"Shaghal"**:
1. سجّل شركتك في [Google Business Profile](https://www.google.com/business/).
2. حدد الاسم: **شغال | Shaghal — لأنظمة البرمجيات المخصصة**.
3. التصنيف: **Software Company** / **شركة برمجيات**.
4. ضع رابط الموقع والإيميل (`hello@shaghal.io`).
5. هذا يرفع نسبة ظهور اسم الشركة في نتائج البحث بنسبة تفوق 300%.

---

## ملخص التعديلات البرمجية المنفذة في الموقع (Technical SEO Changelog)

| البند | ما تم إنجازه |
| :--- | :--- |
| **`index.html` Meta Tags** | إضافة العناوين الرئيسية والكلمات المفتاحية والوصف الكامل باللغتين العربية والإنجليزية. |
| **Open Graph & Twitter Cards** | إضافة بطاقات المشاركة الاجتماعية مع صورة معاينة احترافية بدقة 1200x630 لتظهر كمعاينة غنية عند مشاركة الرابط على واتساب ولينكدإن وتويتر وفيسبوك. |
| **Schema.org Structured Data** | إضافة 4 هياكل بيانات رقمية JSON-LD رسمية (Organization, WebSite, Software Products, FAQPage) لتمكين مقتطفات الأسئلة الشائعة في جوجل. |
| **Crawler Semantic Pre-rendered Shell** | تضمين هيكل HTML دلالي غني بالعناوين (`h1`, `h2`, `h3`) داخل كود الصفحة الأساسي ليقرأه زاحف جوجل مباشرة قبل معالجة الجافاسكريبت. |
| **Robots & Sitemap Directives** | إنشاء ملفي `public/robots.txt` و `public/sitemap.xml` المتوافقين مع معايير محركات البحث العالمية. |
| **Dynamic Language SEO** | تحديث `title` و `meta description` تلقائياً عبر React عند التبديل بين اللغتين العربية والإنجليزية. |
