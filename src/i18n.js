import clinicDashboard from "./assets/clinic/dashboard.webp";
import clinicCalendar from "./assets/clinic/calendar.webp";
import clinicProfile from "./assets/clinic/patient-profile.webp";
import clinicAppointments from "./assets/clinic/appointments.webp";
import clinicInvoices from "./assets/clinic/invoices.webp";
import clinicReports from "./assets/clinic/reports.webp";
import clinicPatients from "./assets/clinic/patients.webp";

import posDashboard from "./assets/pos/dashboard.png";
import posCashier from "./assets/pos/pos-cashier.png";
import posReceiving from "./assets/pos/inventory-receiving.png";
import posStockAudit from "./assets/pos/stock-audit.png";

import invDashboard from "./assets/inventory/dashboard.png";
import invCatalog from "./assets/inventory/products-catalog.png";
import invCustodyIssue from "./assets/inventory/custody-issue.png";
import invCustodyReturn from "./assets/inventory/custody-return.png";
import invCompass from "./assets/inventory/asset-compass.png";
import invBarcodeModal from "./assets/inventory/barcode-modal.png";

// ============================================================
//  Shaghal — content layer
// ============================================================

export const EMAIL = "shaghal.net00@gmail.com";
export const PHONE = "01141633200";
export const WHATSAPP_NUMBER = "201141633200";
export const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61594652096207";
export const INSTAGRAM_URL = "https://www.instagram.com/shaghal_net/";
export const whatsappLink = (text = "") =>
  `https://wa.me/${WHATSAPP_NUMBER}${text ? `?text=${encodeURIComponent(text)}` : ""}`;


export const SCREENSHOTS = {
  pos: [
    { src: posCashier, ar: "شاشة الكاشير", en: "Cashier screen" },
    { src: posDashboard, ar: "لوحة المؤشرات", en: "KPI dashboard" },
    { src: posReceiving, ar: "استلام البضاعة", en: "Goods receiving" },
    { src: posStockAudit, ar: "الجرد ومطابقة الأرصدة", en: "Stock audit" },
  ],
  warehouse: [
    { src: invDashboard, ar: "لوحة التحكم", en: "Dashboard" },
    { src: invCatalog, ar: "كتالوج الأصناف", en: "Product catalog" },
    { src: invCustodyIssue, ar: "صرف العهدة", en: "Custody issue" },
    { src: invCustodyReturn, ar: "إرجاع العهدة", en: "Custody return" },
    { src: invCompass, ar: "بوصلة العهد والسيريال", en: "Serial-number tracker" },
    { src: invBarcodeModal, ar: "مسح الباركود", en: "Barcode scanning" },
  ],
  clinic: [
    { src: clinicDashboard, ar: "لوحة المؤشرات", en: "Dashboard" },
    { src: clinicCalendar, ar: "تقويم المواعيد", en: "Appointments calendar" },
    { src: clinicProfile, ar: "ملف المريض", en: "Patient profile" },
    { src: clinicAppointments, ar: "قائمة مواعيد اليوم", en: "Today's appointments" },
    { src: clinicInvoices, ar: "الفواتير والتحصيل", en: "Billing & collections" },
    { src: clinicReports, ar: "التقارير المالية", en: "Financial reports" },
    { src: clinicPatients, ar: "سجل المرضى", en: "Patient registry" },
  ],
};

export const COPY = {
  ar: {
    dir: "rtl",
    langSwitch: "EN",
    brandAlt: "شغال",

    nav: {
      systems: "الأنظمة",
      why: "ليه شغال",
      process: "طريقة الشغل",
      faq: "أسئلة شائعة",
      contact: "تواصل",
    },
    cta: "اطلب عرض تجريبي",
    themeLight: "فاتح",
    themeDark: "داكن",

    hero: {
      eyebrow: "نقاط بيع · عيادات · مخازن",
      title: "أنظمة شغّالة،",
      accent: "عشان شغلك ما يقفش.",
      desc: "بنصمم ونبني أنظمة مخصصة لمحلك أو عيادتك أو مخزنك — بتشتغل أونلاين، وتكمّل أوفلاين لو النت فصل، وفريقنا معاك بعد التسليم.",
      primary: "اطلب عرض تجريبي",
      secondary: "شوف الأنظمة",
      points: ["تكمّل أوفلاين", "تزامن بين الفروع", "دعم ٢٤/٧"],
      tabs: { pos: "نقاط البيع", clinic: "العيادات", warehouse: "المخازن" },
    },

    sectors: {
      title: "بنخدم",
      items: ["السوبر ماركت والمحلات", "العيادات والمراكز الطبية", "المخازن والمستودعات", "شركات المقاولات والمصانع"],
    },

    systemsSection: {
      eyebrow: "الأنظمة",
      title: "ثلاثة أنظمة، مبنية على مقاس شغلك",
      desc: "كل نظام بيتظبط على طريقة عملك الحقيقية — مش برنامج جاهز تتأقلم إنت عليه.",
      forLabel: "مناسب لـ",
      timelineLabel: "مدة التنفيذ",
      viewScreens: "شوف الشاشات",
      requestDemo: "اطلب ديمو",
    },

    systems: [
      {
        key: "pos",
        title: "نظام نقاط البيع",
        tagline: "كاشير سريع وتقارير أرباح لحظية.",
        desc: "للسوبر ماركت والمحلات: بيع بالباركود، مخزون محدّث لحظياً، وربط كل فروعك في لوحة تحكم واحدة.",
        audience: "السوبر ماركت وسلاسل المحلات",
        timeline: "٢١ – ٤٥ يوم عمل",
        features: [
          "شاشة كاشير سريعة تدعم الطابعات الحرارية وقارئ الباركود والميزان",
          "ربط الفروع مع تزامن لحظي للأسعار والمخزون",
          "صلاحيات للكاشيرات والمديرين",
          "تقارير مبيعات وأرباح يومية وشهرية",
        ],
      },
      {
        key: "clinic",
        title: "نظام إدارة العيادات",
        tagline: "من الحجز للروشتة للفاتورة.",
        desc: "للعيادات والمجمعات الطبية: مواعيد، ملفات مرضى رقمية، روشتة إلكترونية، ومحاسبة الأطباء بأكثر من نظام.",
        audience: "العيادات الفردية والمجمعات متعددة التخصصات",
        timeline: "٢١ – ٤٥ يوم عمل",
        features: [
          "حجز مواعيد وتقويم تفاعلي مع رسائل تذكير SMS",
          "ملف طبي إلكتروني مشفّر لكل مريض مع الروشتات",
          "محاسبة الأطباء: نسبة، مرتب ثابت، أو إيجار عيادة",
          "فواتير وتأمين طبي وتقارير مالية",
        ],
      },
      {
        key: "warehouse",
        title: "نظام المخازن والعهد",
        tagline: "كل قطعة معروفة مكانها ومع مين.",
        desc: "للمخازن والمقاولات والمصانع: تتبع الأصول بالسيريال والباركود، ودورة اعتماد واضحة لصرف وإرجاع العهد.",
        audience: "المستودعات وشركات المقاولات والمصانع",
        timeline: "٣٠ – ٦٠ يوم عمل",
        features: [
          "صرف وإرجاع العهد باعتماد مزدوج (مشرف ومدير)",
          "تتبع الأصول بالسيريال وباركود QR من الموبايل",
          "تنبيهات حد الأمان واستيراد وتصدير Excel",
          "تقييم المخزون FIFO / LIFO / المتوسط المرجّح",
        ],
      },
    ],

    why: {
      eyebrow: "ليه شغال",
      title: "مبنية عشان تفضل شغّالة",
      items: [
        { icon: "offline", t: "تكمّل من غير نت", d: "النظام أونلاين للصيانة السريعة، ولو النت فصل يكمّل أوفلاين ويزامن كل حاجة أول ما يرجع." },
        { icon: "branches", t: "كل الفروع في مكان واحد", d: "المبيعات والمخزون والأسعار بتتزامن تلقائياً بين الفروع." },
        { icon: "security", t: "بياناتك معزولة", d: "قاعدة بيانات منفصلة لكل منشأة، وتشفير للسجلات الحساسة زي بيانات المرضى." },
        { icon: "support", t: "دعم حقيقي ٢٤/٧", d: "فريق هندسي داخلي — من غير وسطاء — ودعم وتحديثات ١٢ شهر بعد التسليم." },
      ],
    },

    process: {
      eyebrow: "طريقة الشغل",
      title: "من أول مكالمة لحد التشغيل",
      steps: [
        { t: "نسمعك", d: "مكالمة نفهم فيها شغلك واحتياجك الحقيقي." },
        { t: "عرض مكتوب", d: "خطة وجدول زمني وسعر ثابت — خلال ٢٤ ساعة." },
        { t: "نبني مع بعض", d: "مراجعة أسبوعية، وتتابع كل مرحلة من لوحة مشروعك." },
        { t: "تشغيل ودعم", d: "تسليم مُختبَر، تدريب لفريقك، ودعم بعد التشغيل." },
      ],
    },

    clients: {
      title: "شغّالين حالياً مع مراكز طبية في مصر",
      desc: "بنحترم خصوصية عملائنا، وبنوفّر مكالمة مرجعية مع عميل حالي للعملاء الجادين وقت العرض التجريبي.",
      cta: "اطلب مكالمة مرجعية",
      wa: "مرحباً، أود طلب مكالمة مرجعية وعرض تجريبي لأنظمة شغال.",
    },

    faq: {
      eyebrow: "أسئلة شائعة",
      title: "عندك سؤال؟",
      desc: "لو مش لاقي إجابتك، كلمنا واتساب ونرد عليك بسرعة.",
      ask: "اسأل على واتساب",
      items: [
        { q: "النظام بيشتغل من غير إنترنت؟", a: "أيوه. النظام أونلاين أساساً عشان الصيانة والتحديثات تبقى فورية، ولو النت فصل بيكمّل أوفلاين من غير ما يوقف الكاشير أو الحجوزات، وبيزامن كل البيانات أول ما الاتصال يرجع." },
        { q: "التنفيذ بياخد وقت قد إيه؟", a: "الأنظمة الأساسية من ٢١ لـ ٤٥ يوم عمل، والمشاريع الأكبر من ٦٠ لـ ٩٠ يوم. بتاخد جدول زمني مكتوب قبل ما نبدأ." },
        { q: "ينفع نعدّل النظام بعد التسليم؟", a: "أكيد. الأنظمة متصممة إنها تكبر معاك، وأي تعديل جديد بيتسعّر بشكل منفصل وواضح." },
        { q: "فيه تدريب على النظام؟", a: "أيوه — جلسات تدريب لفريقك ومديرينك، مع فيديوهات شرح ودليل استخدام مكتوب." },
        { q: "بيدعم أكتر من فرع؟", a: "أيوه، تعدد الفروع متصمم من البداية مع تزامن لحظي للبيانات والأسعار والمخزون." },
        { q: "أتابع مشروعي إزاي وقت التنفيذ؟", a: "بتوصلك دعوة للوحة مشروع خاصة بيك، تشوف فيها كل مرحلة وتعلّق وتوافق قبل ما نكمّل." },
      ],
    },

    contact: {
      eyebrow: "ابدأ مشروعك",
      title: "احكيلنا عن شغلك",
      desc: "املا البيانات وهتتفتح محادثة واتساب جاهزة بطلبك — أو كلمنا مباشرة.",
      name: "الاسم",
      namePh: "اسمك بالكامل",
      phone: "رقم الموبايل أو الإيميل",
      phonePh: "عشان نرد عليك",
      system: "النظام",
      systemOptions: ["نقاط البيع", "إدارة العيادات", "المخازن والعهد", "نظام مخصص آخر"],
      details: "تفاصيل",
      detailsPh: "عدد الفروع، طبيعة الشغل، أي حاجة مهمة…",
      submit: "ابعت على واتساب",
      note: "هيتفتح واتساب برسالة جاهزة — مفيش حاجة بتتبعت غير لما تضغط إرسال هناك.",
      waIntro: "مرحباً شغال، أود طلب عرض تجريبي.",
      waName: "الاسم", waContact: "التواصل", waSystem: "النظام", waDetails: "التفاصيل",
      emailLabel: "الإيميل",
      waLabel: "واتساب",
      location: "القاهرة، مصر",
      copy: "نسخ",
    },

    footer: {
      tagline: "أنظمة مخصصة لنقاط البيع والعيادات والمخازن — مبنية عشان تفضل شغّالة.",
      rights: "© شغال. كل الحقوق محفوظة.",
    },

    toast: { emailCopied: "تم نسخ الإيميل" },
    gallery: { close: "إغلاق", prev: "السابق", next: "التالي" },
    waFloat: "مرحباً، أود الاستفسار عن أنظمة شغال.",
  },

  en: {
    dir: "ltr",
    langSwitch: "عربي",
    brandAlt: "Shaghal",

    nav: {
      systems: "Systems",
      why: "Why Shaghal",
      process: "Process",
      faq: "FAQ",
      contact: "Contact",
    },
    cta: "Book a demo",
    themeLight: "Light",
    themeDark: "Dark",

    hero: {
      eyebrow: "POS · Clinics · Inventory",
      title: "Software that works,",
      accent: "so your business never stops.",
      desc: "We design and build custom systems for shops, clinics and warehouses. They run online, keep working offline when the internet drops, and our team stays with you after launch.",
      primary: "Book a demo",
      secondary: "See the systems",
      points: ["Works offline", "Multi-branch sync", "24/7 support"],
      tabs: { pos: "Point of sale", clinic: "Clinics", warehouse: "Inventory" },
    },

    sectors: {
      title: "Built for",
      items: ["Supermarkets & retail", "Clinics & medical centers", "Warehouses", "Contractors & factories"],
    },

    systemsSection: {
      eyebrow: "Systems",
      title: "Three systems, fitted to how you work",
      desc: "Each one is tailored to your real workflow — not off-the-shelf software you have to bend around.",
      forLabel: "Built for",
      timelineLabel: "Delivery",
      viewScreens: "View screens",
      requestDemo: "Request a demo",
    },

    systems: [
      {
        key: "pos",
        title: "Point of Sale",
        tagline: "Fast checkout, live profit reports.",
        desc: "For supermarkets and retail: barcode checkout, live stock levels, and every branch in one dashboard.",
        audience: "Supermarkets and retail chains",
        timeline: "21–45 business days",
        features: [
          "Fast cashier screen with thermal printer, scanner and scale support",
          "Multi-branch sync for prices and stock",
          "Cashier and manager permissions",
          "Daily and monthly sales & profit reports",
        ],
      },
      {
        key: "clinic",
        title: "Clinic Management",
        tagline: "From booking to prescription to invoice.",
        desc: "For clinics and polyclinics: appointments, digital patient files, e-prescriptions, and flexible doctor payroll.",
        audience: "Single clinics and multi-specialty centers",
        timeline: "21–45 business days",
        features: [
          "Booking and interactive calendar with SMS reminders",
          "Encrypted digital medical record with prescriptions",
          "Doctor payroll: revenue share, fixed salary, or room rental",
          "Billing, insurance and financial reports",
        ],
      },
      {
        key: "warehouse",
        title: "Inventory & Custody",
        tagline: "Know where every item is — and who has it.",
        desc: "For warehouses, contractors and factories: track assets by serial number and barcode, with a clear approval flow for issuing and returning custody.",
        audience: "Warehouses, contractors and factories",
        timeline: "30–60 business days",
        features: [
          "Dual-approval custody issue and return (supervisor + manager)",
          "Serial-number and QR tracking from a phone camera",
          "Low-stock alerts and Excel import/export",
          "FIFO / LIFO / weighted-average valuation",
        ],
      },
    ],

    why: {
      eyebrow: "Why Shaghal",
      title: "Built to keep working",
      items: [
        { icon: "offline", t: "Keeps going offline", d: "Runs online for instant maintenance; if the connection drops it carries on offline and syncs everything when it's back." },
        { icon: "branches", t: "Every branch, one view", d: "Sales, stock and prices sync automatically across branches." },
        { icon: "security", t: "Your data, isolated", d: "A separate database per business, with encryption for sensitive records like patient data." },
        { icon: "support", t: "Real 24/7 support", d: "An in-house engineering team — no middlemen — plus 12 months of support and updates." },
      ],
    },

    process: {
      eyebrow: "Process",
      title: "From first call to go-live",
      steps: [
        { t: "We listen", d: "A call to understand your business and what you really need." },
        { t: "Written proposal", d: "Plan, timeline and a fixed price — within 24 hours." },
        { t: "Build together", d: "Weekly reviews, with every milestone in your project dashboard." },
        { t: "Launch & support", d: "Tested delivery, team training, and support after go-live." },
      ],
    },

    clients: {
      title: "Running today in medical centers across Egypt",
      desc: "We respect our clients' privacy, and we arrange a reference call with a current client for serious prospects during the demo.",
      cta: "Request a reference call",
      wa: "Hello, I'd like to request a reference call and a demo of Shaghal's systems.",
    },

    faq: {
      eyebrow: "FAQ",
      title: "Got a question?",
      desc: "Can't find your answer? Message us on WhatsApp and we'll reply quickly.",
      ask: "Ask on WhatsApp",
      items: [
        { q: "Does it work without internet?", a: "Yes. It runs online so maintenance and updates are instant, and if the connection drops it keeps working offline — no stalled checkout or bookings — then syncs everything once you're back online." },
        { q: "How long does it take?", a: "Core systems take 21–45 business days; larger projects 60–90. You get a written schedule before we start." },
        { q: "Can it be changed after delivery?", a: "Of course. The systems are built to grow with you, and new changes are scoped and priced separately and clearly." },
        { q: "Is training included?", a: "Yes — training sessions for your staff and managers, plus walkthrough videos and a written guide." },
        { q: "Does it support multiple branches?", a: "Yes. Multi-branch is designed in from day one, with live sync of data, prices and stock." },
        { q: "How do I follow progress?", a: "You get an invite to your own project dashboard to see every phase, comment, and approve before we move on." },
      ],
    },

    contact: {
      eyebrow: "Start your project",
      title: "Tell us about your business",
      desc: "Fill this in and a WhatsApp chat opens with your request ready — or reach us directly.",
      name: "Name",
      namePh: "Your full name",
      phone: "Phone or email",
      phonePh: "So we can reply",
      system: "System",
      systemOptions: ["Point of sale", "Clinic management", "Inventory & custody", "Something custom"],
      details: "Details",
      detailsPh: "Number of branches, type of business, anything important…",
      submit: "Send on WhatsApp",
      note: "WhatsApp opens with a ready message — nothing is sent until you press send there.",
      waIntro: "Hello Shaghal, I'd like to request a demo.",
      waName: "Name", waContact: "Contact", waSystem: "System", waDetails: "Details",
      emailLabel: "Email",
      waLabel: "WhatsApp",
      location: "Cairo, Egypt",
      copy: "Copy",
    },

    footer: {
      tagline: "Custom systems for retail, clinics and warehouses — built to keep working.",
      rights: "© Shaghal. All rights reserved.",
    },

    toast: { emailCopied: "Email copied" },
    gallery: { close: "Close", prev: "Previous", next: "Next" },
    waFloat: "Hello, I'd like to ask about Shaghal's systems.",
  },
};
