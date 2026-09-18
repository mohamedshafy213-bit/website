import shotDashboard    from "./assets/clinic/dashboard.png";
import shotCalendar     from "./assets/clinic/calendar.png";
import shotPatientFile  from "./assets/clinic/patient-file.png";
import shotPrescription from "./assets/clinic/e-prescription.png";
import shotPricing      from "./assets/clinic/services-pricing.png";
import shotReports      from "./assets/clinic/financial-reports.png";

import posDashboard     from "./assets/pos/dashboard.png";
import posCashier       from "./assets/pos/pos-cashier.png";
import posInventory     from "./assets/pos/inventory-receiving.png";
import posStockAudit    from "./assets/pos/stock-audit.png";

import invDashboard     from "./assets/inventory/dashboard.png";
import invCatalog       from "./assets/inventory/products-catalog.png";
import invCustodyIssue  from "./assets/inventory/custody-issue.png";
import invCustodyReturn from "./assets/inventory/custody-return.png";
import invCompass       from "./assets/inventory/asset-compass.png";
import invCategories    from "./assets/inventory/categories.png";
import invBarcodeModal  from "./assets/inventory/barcode-modal.png";

// ============================================================
//  Aura Systems — Data Layer (i18n.js)
//  Specialized: Custom Software & Digital Systems Company
// ============================================================

export const BRAND = "Shaghal";
export const EMAIL = "hello@shaghal.net";

export const CLINIC_SCREENSHOTS = [
  { src: shotDashboard,    labelAr: "لوحة المؤشرات",         labelEn: "Live KPI Dashboard" },
  { src: shotCalendar,     labelAr: "التقويم التفاعلي",       labelEn: "Interactive Calendar" },
  { src: shotPatientFile,  labelAr: "الملف الطبي للمريض",     labelEn: "Digital Patient File" },
  { src: shotPrescription, labelAr: "الروشتة الإلكترونية",    labelEn: "E-Prescription" },
  { src: shotPricing,      labelAr: "الخدمات والتسعير",       labelEn: "Services & Pricing" },
  { src: shotReports,      labelAr: "التقارير المالية",       labelEn: "Financial Reports" },
];

export const POS_SCREENSHOTS = [
  { src: posCashier,     labelAr: "شاشة الكاشير ونقطة البيع السريعة", labelEn: "POS Cashier & Checkout Terminal" },
  { src: posDashboard,   labelAr: "لوحة التحكم والمؤشرات المالية",  labelEn: "Live KPI & Financial Dashboard" },
  { src: posInventory,   labelAr: "إدارة المخزون واستلام الشحنات", labelEn: "Warehouse & Shipments Receiving" },
  { src: posStockAudit,  labelAr: "الجرد الدوري ومطابقة الأرصدة",   labelEn: "Periodic Stocktaking & Audit" },
];

export const WAREHOUSE_SCREENSHOTS = [
  { src: invDashboard,     labelAr: "لوحة التحكم ومؤشرات الأصول والعهد",         labelEn: "Live KPI & Asset Value Dashboard" },
  { src: invCatalog,       labelAr: "إدارة المنتجات والأصناف وقائمة الـ SKU",     labelEn: "Product & SKU Inventory Catalog" },
  { src: invCustodyIssue,  labelAr: "طلبات صرف العهدة ودورة الاعتماد المزدوجة",    labelEn: "Dual-Approval Custody Issue Workflow" },
  { src: invCustodyReturn, labelAr: "طلبات إرجاع العهد وإدخال المستودع",          labelEn: "Custody Returns & Warehouse Inward" },
  { src: invCompass,       labelAr: "بوصلة العهد والأجهزة وتتبع السيريال (S/N)",   labelEn: "Asset Compass & Serial Number Tracker" },
  { src: invCategories,    labelAr: "تصنيف فئات المنتجات والأصول",               labelEn: "Asset & Product Categories" },
  { src: invBarcodeModal,  labelAr: "المسح الذكي للباركود وإرجاع العهدة",         labelEn: "Smart Barcode Scanner & Return Modal" },
];

export const CLINIC_PRICING_PLANS = {
  basePlans: [
    {
      name: "Small Clinic",
      priceAr: "15,999 ج.م / سنوياً",
      priceEn: "EGP 15,999 / year",
      subtitleAr: "للعيادات الفردية والصغيرة",
      subtitleEn: "For solo & small clinics",
      featured: false,
      featuresAr: [
        "الفروع: 1 فرع تشغيلي",
        "المستخدمين: حتى 5 أطباء ومستخدمين",
        "إدارة المواعيد والتقويم الفوري (منع تعارض الحجوزات)",
        "الملف الطبي الإلكتروني (EMR) والمؤشرات الحيوية",
        "الفواتير وسندات القبض والصرف (أقساط، سداد جزئي، تحصيل فوري)",
      ],
      featuresEn: [
        "Branches: 1 operating branch",
        "Users: up to 5 doctors/staff",
        "Live scheduling & calendar (prevents double-booking)",
        "Digital patient file (EMR) with vital signs",
        "Invoicing & payment vouchers (installments, partial payment, instant collection)",
      ],
    },
    {
      name: "Large Clinic",
      priceAr: "24,999 ج.م / سنوياً",
      priceEn: "EGP 24,999 / year",
      subtitleAr: "للمراكز والعيادات المتعددة",
      subtitleEn: "For multi-branch medical centers",
      featured: true,
      badgeAr: "الخيار الأكثر طلباً",
      badgeEn: "Most Requested",
      featuresAr: [
        "الفروع: حتى 2 فروع تشغيلية (كل فرع بمخزون وجداول منفصلة)",
        "المستخدمين: حتى 15 طبيب ومستخدم",
        "جميع ميزات باقة Small Clinic",
        "إدارة الفروع والموظفين بصلاحيات متقدمة (RBAC)",
        "التقارير المالية وتدفقات نقدية لحظية",
        "محاسبة الأطباء (حساب نسب الأطباء تلقائياً)",
      ],
      featuresEn: [
        "Branches: up to 2 operating branches (separate inventory & schedules each)",
        "Users: up to 15 doctors/staff",
        "Everything in Small Clinic",
        "Branch & staff management with advanced permissions (RBAC)",
        "Real-time financial reports & cash flow",
        "Doctor accounting (automatic commission calculation)",
      ],
    },
  ],
  dentalPlans: [
    {
      name: "Small Dental Pro",
      priceAr: "19,999 ج.م / سنوياً",
      priceEn: "EGP 19,999 / year",
      descAr: "تشمل: باقة Small Clinic الأساسية + جناح طب الأسنان التفاعلي الكامل.",
      descEn: "Includes: the Small Clinic base plan + the full interactive dental treatment wing.",
      noteAr: "ملاحظة: توفير 499 ج.م مقارنة بشراء الإضافة بشكل منفصل.",
      noteEn: "Note: saves EGP 499 vs. buying the add-on separately.",
    },
    {
      name: "Large Dental Pro",
      priceAr: "28,999 ج.م / سنوياً",
      priceEn: "EGP 28,999 / year",
      descAr: "تشمل: باقة Large Clinic الأساسية + جناح طب الأسنان التفاعلي الكامل.",
      descEn: "Includes: the Large Clinic base plan + the full interactive dental treatment wing.",
      noteAr: "ملاحظة: توفير 499 ج.م مقارنة بشراء الإضافة بشكل منفصل.",
      noteEn: "Note: saves EGP 499 vs. buying the add-on separately.",
    },
  ],
  addons: [
    { nameAr: "جناح الأسنان التفاعلي (مخطط أسنان 3D، تتبع أسطح وإجراءات)", nameEn: "Interactive Dental Wing (3D tooth chart, surfaces & procedures)", priceAr: "4,499 ج.م", priceEn: "EGP 4,499" },
    { nameAr: "التأمين الطبي (إدارة المطالبات، نسب التحمل، الموافقات المسبقة)", nameEn: "Medical Insurance (claims management, co-pay ratios, pre-approvals)", priceAr: "2,999 ج.م", priceEn: "EGP 2,999" },
    { nameAr: "رسائل SMS / واتساب", nameEn: "SMS / WhatsApp Messages", priceAr: "يبدأ من 2,199 ج.م", priceEn: "From EGP 2,199" },
    { nameAr: "الروشتة الإلكترونية (قوالب أدوية، دعم الورق المروس)", nameEn: "E-Prescription (drug templates, letterhead paper support)", priceAr: "1,499 ج.م", priceEn: "EGP 1,499" },
    { nameAr: "محاسبة أطباء متقدمة (نماذج مرنة: نسبة، مرتب، إيجار عيادة)", nameEn: "Advanced Doctor Accounting (flexible models: percentage, salary, room rental)", priceAr: "1,499 ج.م", priceEn: "EGP 1,499" },
    { nameAr: "نظام الحضور والانصراف (للطاقم الطبي والموظفين)", nameEn: "Attendance & Check-in System (medical staff & employees)", priceAr: "1,299 ج.م", priceEn: "EGP 1,299" },
    { nameAr: "الربط الخارجي API (معامل، مراكز أشعة، أنظمة خارجية)", nameEn: "External API Integration (labs, imaging centers, external systems)", priceAr: "متاح حسب المتطلبات والاتفاق", priceEn: "Available per requirements & agreement" },
  ],
  footerNoteAr: "منظومة Shaghal Clinics SaaS — عزل تام للبيانات وقواعد تشغيل آمنة 100%، بدون أي رسوم إضافية خفية.",
  footerNoteEn: "Shaghal Clinics SaaS — full data isolation and 100% secure operating infrastructure, with no hidden extra fees.",
};

export const TRUST_LOGOS = [
  { name: "هايبر مارت", tag: "سلسلة سوبر ماركت" },
  { name: "Apex Distribution", tag: "توزيع وتجارة" },
  { name: "مركز الرعاية الطبية", tag: "عيادات طبية" },
  { name: "Al Nile Retail", tag: "تجزئة" },
  { name: "MedCare Clinics", tag: "مراكز صحية" },
  { name: "GlobalStore Chain", tag: "سلاسل تجارية" },
];

// ── Realistic Environment Photos for System Cards ──────────
export const SERVICE_IMAGES = {
  pos:       "https://images.unsplash.com/photo-1556740758-90de374c12ad?w=1200&q=80&auto=format&fit=crop",
  warehouse: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80&auto=format&fit=crop",
  clinic:    "https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&q=80&auto=format&fit=crop",
};

export const PORTFOLIO_IMAGES = [
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80&auto=format&fit=crop",
];

export const ABOUT_IMAGE =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80&auto=format&fit=crop";

export const TESTIMONIAL_AVATARS = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80&auto=format&fit=crop", // Ahmed (Man)
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&q=80&auto=format&fit=crop", // Khaled (Man)
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&q=80&auto=format&fit=crop", // Mona (Woman)
];

// ── Copy ─────────────────────────────────────────────────────
export const COPY = {
  ar: {
    dir: "rtl",
    font: "'Tajawal', sans-serif",
    displayFont: "'Cairo', sans-serif",

    nav: {
      home:         "الرئيسية",
      about:        "من إحنا",
      services:     "أنظمتنا",
      process:      "طريقة عملنا",
      work:         "أعمالنا",
      testimonials: "آراء العملاء",
      faq:          "الأسئلة الشائعة",
    },

    cta:  "اطلب عرض سعر",
    menu: "القائمة",

    hero: {
      eyebrow:   "استوديو تقني متخصص في الأنظمة الرقمية",
      titleLine1: "نبني الأنظمة اللي",
      titleLine2: "بتشغّل مشروعك",
      title:     "نبني الأنظمة اللي\nبتشغّل مشروعك",
      titleAccent: "بكفاءة وذكاء",
      desc:      "نصمم وننفذ أنظمة برمجية مخصصة للشركات والمنشآت — من نقاط البيع وإدارة المخازن لأنظمة العيادات الطبية — كل شيء تحت سقف تقني واحد.",
      explore:   "استكشف أنظمتنا",
      portfolio: "شاهد أعمالنا",
    },

    stats: [
      { n: "٨٥+",  l: "نظام تم تسليمه" },
      { n: "٧",    l: "سنوات خبرة" },
      { n: "٩٨٪",  l: "عملاء راضيين" },
      { n: "٢٤/٧", l: "دعم فني مستمر" },
    ],

    trustSection: {
      eyebrow: "عملاؤنا",
      title:   "شركات ومنشآت وثقت بـ شغال",
    },

    about: {
      eyebrow:  "مين إحنا",
      title:    "استوديو تقني واحد، تخصص واحد",
      titleAccent: "بناء الأنظمة الرقمية",
      p1:       "بدأنا كفريق من مهندسي البرمجيات المتخصصين في تطوير أنظمة مخصصة للشركات. لاحظنا إن كتير من المنشآت بتعاني من أنظمة قديمة أو حلول جاهزة مش بتناسب طبيعة شغلها.",
      p2:       "قررنا نبني شركة متخصصة حصرياً في تطوير وتنفيذ الأنظمة الرقمية المخصصة — نظام يُبنى على قياس احتياجك، مع دعم فني حقيقي بعد التسليم.",
      imageAlt: "فريق شغال يعمل على تطوير نظام",
      badgeTitle: "فريق هندسي داخلي",
      badgeSub:   "مهندسون متخصصون بدون وسطاء",
      highlights: [
        ["فريق هندسي داخلي متكامل", "كل مشروع بيتنفذ بفريق من مهندسين متخصصين في داخل الشركة، مش شركاء خارجيين أو فريلانسرز."],
        ["متابعة لحظية وتحديثات مستمرة", "من لحظة بدء المشروع لحد ما بعد التسليم، بتتابع كل شيء من لوحة تحكم خاصة."],
        ["سعر شفاف وعرض مكتوب من البداية", "مفيش مفاجآت في السعر أو المدة — بتاخد عرض مكتوب بالتفاصيل قبل ما نبدأ."],
      ],
    },

    servicesSection: {
      eyebrow: "أنظمتنا",
      title:   "ثلاثة أنظمة رائدة",
      desc:    "حلول برمجية مخصصة بُنيت لتلبية احتياجات القطاعات الأكثر تعقيداً",
      from:    "يبدأ من",
      learnMore: "اعرف أكتر",
    },

    services: [
      {
        key:       "pos",
        label:     "٠١",
        title:     "نظام نقاط البيع",
        sub:       "POS للسوبر ماركت والمتاجر",
        desc:      "نظام نقاط بيع متكامل مخصص للسوبر ماركت والمحلات التجارية — إدارة مخزون لحظي، مسح باركود، فواتير إلكترونية، ربط فروع متعددة، صلاحيات كاشيرات، وتقارير أرباح يومية وشهرية.",
        tags:      ["نقاط بيع", "باركود", "تقارير مبيعات", "إدارة فروع"],
        priceFrom: "٢٥٬٠٠٠ ج.م",
        timeline:  "٢١ - ٤٥ يوم عمل",
        tools:     ["React", "Node.js", "PostgreSQL", "Electron", "Thermal Printer SDK"],
        screenshots: POS_SCREENSHOTS,
        deliverables: [
          "واجهة كاشير سريعة متوافقة مع الطابعات الحرارية وأجهزة الباركود",
          "لوحة تحكم إدارية كاملة مع تقارير المبيعات اليومية والشهرية",
          "نظام ربط فروع مع تزامن لحظي للمخزون والأسعار",
          "إدارة صلاحيات الكاشيرات والمديرين بالكامل",
          "دعم فني وتحديثات لمدة 12 شهراً بعد التسليم",
        ],
      },
      {
        key:       "warehouse",
        label:     "٠٢",
        title:     "نظام العهدة وإدارة المخزون",
        sub:       "Enterprise Custody & Inventory (v2.5)",
        desc:      "منظومة سحابية متقدمة لإدارة المخازن، الأصول والعهد — دورة اعتماد مزدوجة لصرف وإرجاع العهد، بوصلة تتبع الأرقام التسلسلية (S/N)، ماسح باركود وQR فوري، تنبيهات حد الأمان، ودعم كامل لاستيراد وتصدير إكسل.",
        tags:      ["إدارة عهد ومخازن", "أصول ثابتة (Assets)", "تتبع سيريال S/N", "اعتماد مزدوج", "باركود ذكي", "تنبيهات حد الأمان"],
        priceFrom: "٣٥٬٠٠٠ ج.م",
        timeline:  "٣٠ - ٦٠ يوم عمل",
        tools:     ["React", "Node.js", "PostgreSQL", "Barcode SDK", "Excel XLSX Engine", "RBAC Security"],
        screenshots: WAREHOUSE_SCREENSHOTS,
        deliverables: [
          "لوحة تحكم تفاعلية مع متابعة القيمة الإجمالية للعهد وتنبيهات نقص الرصيد اللحظية",
          "دورة اعتماد مزدوجة لطلبات صرف وإرجاع العهد (المشرف والمدير) مع توثيق الأسباب",
          "بوصلة العهد والأجهزة للبحث والتدقيق التاريخي بالأرقام التسلسلية (Serial Numbers)",
          "إدارة المنتجات والأصناف مع دعم الأصول الثابتة ومشتريات المخزون واستيراد/تصدير Excel",
          "دعم القارئ اليدوي والكاميرا لمسح الباركود وQR السريع",
          "صلاحيات متعددة المستويات (RBAC) وأمان عالي لكافة العمليات",
        ],
      },
      {
        key:       "clinic",
        label:     "٠٣",
        title:     "نظام إدارة العيادات",
        sub:       "Clinic & Medical Center Management",
        desc:      "نظام طبي متكامل للعيادات والمراكز الصحية — حجز مواعيد إلكتروني، ملفات مرضى رقمية، إدارة جداول الأطباء، فواتير وتأمين طبي، وإشعارات تذكير أوتوماتيكية للمرضى.",
        tags:      ["حجز مواعيد", "ملفات مرضى", "جدولة أطباء", "فواتير طبية"],
        priceFrom: "٣٠٬٠٠٠ ج.م",
        timeline:  "٢١ - ٤٥ يوم عمل",
        tools:     ["React", "Node.js", "PostgreSQL", "Twilio SMS", "PDF Generator"],
        screenshots: CLINIC_SCREENSHOTS,
        pricingPlans: CLINIC_PRICING_PLANS,
        deliverables: [
          "نظام حجز مواعيد إلكتروني مع تطبيق للمرضى (Android/iOS)",
          "ملفات المرضى الرقمية مع السجل الطبي الكامل والوصفات",
          "لوحة تحكم الأطباء والجداول مع تنبيهات المواعيد القادمة",
          "نظام الفواتير والتأمين الطبي مع إصدار التقارير",
          "إشعارات SMS تذكير تلقائية للمرضى قبل موعدهم",
        ],
      },
    ],

    serviceDetailModal: {
      title:            "تفاصيل النظام والتسليمات",
      deliverablesLabel:"ماذا تستلم بالتفصيل",
      screenshotsLabel: "لقطات حقيقية من النظام الفعلي",
      pricingLabel:     "الباقات والأسعار المعتمدة",
      dentalProLabel:   "باقات عيادات الأسنان (Dental Pro Suite)",
      addonsLabel:      "الإضافات التخصصية الاختيارية (Add-ons)",
      timelineLabel:    "المدة الزمنية المتوقعة",
      toolsLabel:       "التقنيات المستخدمة",
      cta:              "اطلب عرض سعر لهذا النظام",
      close:            "إغلاق",
    },

    processSection: {
      eyebrow: "إزاي بنشتغل",
      title:   "طريقة العمل",
      desc:    "أربع خطوات واضحة من أول فكرتك لحد التسليم والدعم",
    },
    process: [
      { n: "٠١", t: "الاستشارة الأولى",  d: "بنسمع احتياجك الحقيقي، نحلل البيزنس، ونوضح الحل المناسب لمشروعك بالتفصيل." },
      { n: "٠٢", t: "العرض والخطة",      d: "تصور كامل للنظام، جدول زمني مكتوب، وسعر نهائي ثابت — يُرسل على إيميلك خلال 24 ساعة." },
      { n: "٠٣", t: "التطوير والتنفيذ",  d: "فريقنا الهندسي يبني النظام بأسبوعية مراجعة معك لحتى تبقى متابع كل خطوة." },
      { n: "٠٤", t: "التسليم والدعم",    d: "تسليم مُختبَر ومكتمل مع تدريب الفريق ودعم فني حقيقي بعد التشغيل." },
    ],

    workSection: {
      eyebrow: "نماذج",
      title:   "من أعمالنا",
      desc:    "اضغط على أي مشروع لمشاهدة تفاصيل التحدي والحل والنتائج",
      viewCase: "التحدي والنتائج",
      filters: {
        all:       "الكل",
        pos:       "نقاط بيع",
        warehouse: "مخازن",
        clinic:    "عيادات",
        software:  "برمجيات",
      },
    },
    portfolio: [
      {
        id:      "portfolio-pos-1",
        key:     "pos",
        image:   posCashier,
        title:   "نظام POS — سلسلة هايبر مارت",
        sub:     "٦ فروع مربوطة بنظام واحد",
        client:  "هايبر مارت للتجزئة",
        year:    "٢٠٢٥",
        challenge: "كانت الإدارة تعاني من عدم تزامن المخزون بين الفروع الستة وتأخر في إعداد تقارير المبيعات اليومية.",
        solution:  "بُني نظام POS مخصص يربط الفروع الستة في لحظة واحدة مع داشبورد مركزي للإدارة وإعداد التقارير الآلية.",
        results:   "تخفيض وقت إعداد التقارير اليومية بنسبة ٩٠٪ وصفر أخطاء جرد بعد أول شهر تشغيل.",
        deliverables: ["نظام POS متعدد الفروع", "داشبورد مركزي", "تقارير مبيعات آلية"],
      },
      {
        id:      "portfolio-wh-1",
        key:     "warehouse",
        image:   invDashboard,
        title:   "منظومة العهدة والمخزون — Apex Enterprise",
        sub:     "إدارة الأصول والعهد والمستودعات بدورة اعتماد مزدوجة",
        client:  "شركة أبكس للتوزيع والخدمات",
        year:    "٢٠٢٥",
        challenge: "صعوبة تتبع حركة العهد والأجهزة المسلمة للموظفين والميدان وضياع الأرقام التسلسلية وفقدان الرقابة على أرصدة المستودع.",
        solution:  "تطبيق منظومة العهدة وإدارة المخزون مع بوصلة تتبع السيريال (S/N)، مسح الباركود، ودورة موافقات مرحلية لصرف وإرجاع الأصول.",
        results:   "تتبع دقيق 100% لكافة الأجهزة والعهد، القضاء على فاقد الأصول، وخفض وقت إنجاز طلبات الصرف بنسبة 80%.",
        deliverables: ["منظومة العهدة والمخازن", "بوصلة تتبع السيريال S/N", "دورة الاعتماد المزدوجة", "ماسح الباركود الذكي"],
      },
      {
        id:      "portfolio-clinic-1",
        key:     "clinic",
        image:   shotCalendar,
        title:   "نظام مواعيد — مركز الرعاية الطبية",
        sub:     "٨ أطباء، ٢٠٠+ موعد أسبوعياً",
        client:  "مركز الرعاية الطبية",
        year:    "٢٠٢٥",
        challenge: "إدارة مواعيد ٨ أطباء بشكل يدوي أدت لتضارب المواعيد وفقدان بيانات المرضى.",
        solution:  "نظام إدارة عيادة متكامل مع تطبيق حجز للمرضى وملفات رقمية وتنبيهات SMS تلقائية.",
        results:   "صفر تضارب في المواعيد، تقليل الغيابات بنسبة ٤٠٪ بسبب التنبيهات التلقائية.",
        deliverables: ["تطبيق حجز مواعيد", "ملفات مرضى رقمية", "إشعارات SMS"],
      },
      {
        id:      "portfolio-sw-1",
        key:     "software",
        image:   "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop",
        title:   "بوابة E-Commerce — لومينا ريتيل",
        sub:     "متجر إلكتروني فائق السرعة",
        client:  "لومينا للتجزئة",
        year:    "٢٠٢٤",
        challenge: "ارتفاع معدل ترك السلة بسبب بطء صفحات المنتجات وتعقيد خطوات الدفع.",
        solution:  "متجر إلكتروني مبني على Next.js مع تجربة مستخدم سلسة وبوابة دفع إلكتروني آمنة.",
        results:   "ارتفاع معدل التحويل ٨٥٪ وتضاعف المبيعات خلال الشهر الأول.",
        deliverables: ["متجر إلكتروني Next.js", "ربط بوابات دفع", "داشبورد إدارة"],
      },
      {
        id:      "portfolio-pos-2",
        key:     "pos",
        image:   "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=900&q=80&auto=format&fit=crop",
        title:   "نظام POS — سلسلة Al Nile Retail",
        sub:     "١٢ نقطة كاشير في وقت واحد",
        client:  "Al Nile Retail Chain",
        year:    "٢٠٢٤",
        challenge: "نظام قديم يتعطل بشكل متكرر أثناء ساعات الذروة مما يسبب طوابير وخسارة مبيعات.",
        solution:  "نظام POS جديد مبني على Electron مع قاعدة بيانات محلية لضمان الاستمرارية حتى بدون إنترنت.",
        results:   "صفر انقطاعات في التشغيل على مدار ٩ أشهر متواصلة منذ التشغيل.",
        deliverables: ["POS Offline-First", "مزامنة سحابية", "لوحة مراقبة"],
      },
      {
        id:      "portfolio-wh-2",
        key:     "warehouse",
        image:   "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=900&q=80&auto=format&fit=crop",
        title:   "إدارة مخازن — GlobalStore Chain",
        sub:     "مركز توزيع رئيسي + ٤ مستودعات",
        client:  "GlobalStore Chain",
        year:    "٢٠٢٤",
        challenge: "تنسيق الشحنات بين المركز الرئيسي والمستودعات الفرعية كان يعتمد بالكامل على الهاتف والإكسيل.",
        solution:  "منصة لإدارة سلسلة التوريد مع تتبع الشحنات لحظياً وأوامر نقل بين المستودعات آلياً.",
        results:   "تخفيض وقت معالجة أوامر النقل من ٢ ساعة إلى ٨ دقائق فقط.",
        deliverables: ["منصة إدارة سلسلة توريد", "تطبيق موبايل للمستودعات", "لوحة تحكم مركزية"],
      },
    ],

    caseStudyModal: {
      title:            "تفاصيل المشروع",
      clientLabel:      "العميل",
      yearLabel:        "سنة التسليم",
      challengeLabel:   "التحدي والاحتياج",
      solutionLabel:    "الحل من Aura Systems",
      resultsLabel:     "النتائج والإنجاز",
      deliverablesLabel:"مخرجات التسليم",
      cta:              "اطلب نظاماً مماثلاً",
      close:            "إغلاق",
    },

    testimonialsSection: {
      eyebrow: "آراء عملائنا",
      title:   "شركات تعاملت معانا وتتكلم",
    },
    testimonials: [
      {
        name: "أحمد سامي",
        role: "صاحب سلسلة سوبر ماركت — القاهرة",
        text: "نظام الـ POS غيّر طريقة شغلنا بالكامل. الكاشير بقى أسرع، والجرد بقى دقيق والتقارير اليومية وصلاني على موبايلي قبل ما أوصل الفرع. أنصح بيه جداً.",
      },
      {
        name: "خالد إبراهيم",
        role: "مدير عمليات — شركة توزيع وتجارة",
        text: "قبل نظام المخازن، كنا بنفقد يومياً بضاعة ومش عارفين ليه. دلوقتي ممكن أعرف حركة أي صنف من أول ما دخل المستودع لحد ما خرج. قلل الفاقد بشكل مش طبيعي.",
      },
      {
        name: "د. منى فؤاد",
        role: "طبيبة ومديرة — مركز طبي",
        text: "نظام الحجز بسّط الحياة تماماً. المرضى بيحجزوا أون لاين والتذكيرات بتبعت أوتوماتيك وملف كل مريض في الشاشة قبلي. وفّر علينا وقت وجهد كتير.",
      },
    ],

    faqSection: {
      eyebrow: "أسئلة شائعة",
      title:   "محتاج تعرف حاجة؟",
    },
    faqSearch: {
      placeholder: "ابحث في الأسئلة (مثل: سعر، مواعيد، دعم...)",
      noResults:   "لم نجد أسئلة تطابق بحثك — يسعدنا الإجابة مباشرة.",
    },
    faqs: [
      { q: "هل الأنظمة بتشتغل بدون إنترنت؟",         a: "نعم، معظم أنظمتنا مصممة بنموذج Offline-First — بتشتغل بشكل كامل بدون إنترنت وبتتزامن لما الاتصال يرجع." },
      { q: "ما هي مدة تطوير النظام؟",                  a: "بتختلف حسب حجم المشروع — الأنظمة الأساسية بتاخد من ٢١ لـ ٤٥ يوم عمل، والمشاريع الكبيرة من ٦٠ لـ ٩٠ يوم. هتاخد جدول زمني مكتوب من البداية." },
      { q: "هل ممكن تعديل النظام بعد التسليم؟",       a: "أكيد — كل أنظمتنا مصممة عشان تتطور. بنوفر حزم دعم وتحديثات دورية، وأي تعديلات جديدة بتُقدَّر بشكل منفصل وشفاف." },
      { q: "هل فيه تدريب على استخدام النظام؟",         a: "أيوه، التسليم بيشمل جلسات تدريب كاملة للفريق والمديرين، مع فيديوهات توضيحية وكتيب استخدام مكتوب." },
      { q: "هل الأنظمة بتتزامن بين أكتر من فرع؟",    a: "أيوه — بنصمم من البداية دعم متعدد الفروع مع تزامن لحظي للبيانات والأسعار والمخزون بين كل الفروع." },
      { q: "كيف أتابع مشروعي أثناء التطوير؟",          a: "بتوصلك دعوة لـ Project Dashboard مخصص بتشوف فيه كل مرحلة وتقدر تعلق وتوافق على كل خطوة قبل ما نكمل." },
    ],

    contact: {
      eyebrow:           "ابدأ مشروعك",
      title:             "محتاج نظام مخصص؟",
      desc:              "احكيلنا عن مشروعك وفريقنا هيبعتلك تحليل مبدئي وعرض سعر تقريبي على إيميلك خلال يوم عمل واحد.",
      location:          "القاهرة، مصر",
      social:            ["LinkedIn", "X (Twitter)", "GitHub"],
      namePh:            "الاسم بالكامل",
      contactPh:         "البريد الإلكتروني أو رقم الهاتف",
      servicePh:         "النظام اللي محتاجه",
      detailsPh:         "وصف مختصر للمشروع واحتياجاتك",
      submit:            "إرسال الطلب (سيصلك الرد على الإيميل)",
      sent:              "تم الإرسال! سنتواصل معك خلال ٢٤ ساعة عمل",
      sendAnother:       "إرسال طلب آخر",
      selectPlaceholder: "اختر النظام...",
      sending:           "جاري الإرسال...",
      serviceOptions:    ["نظام نقاط البيع (POS)", "نظام إدارة المخازن", "نظام إدارة العيادات", "نظام مخصص آخر"],
    },

    footer: {
      tagline: "استوديو تقني متخصص في بناء الأنظمة الرقمية المخصصة للشركات والمنشآت.",
      links:   "روابط",
      services:"أنظمتنا",
      contact: "تواصل",
      rights:  "© شغال — كل الحقوق محفوظة",
    },

    float: {
      top:      "ارجع لفوق",
      whatsapp: "تواصل واتساب",
    },
    toast: {
      emailCopied:   "تم نسخ البريد الإلكتروني إلى الحافظة!",
      formSubmitted: "تم إرسال طلبك! سنتواصل معك خلال ٢٤ ساعة عمل.",
    },
    langSwitch: "EN",
  },

  en: {
    dir: "ltr",
    font: "'Inter', system-ui, sans-serif",
    displayFont: "'Inter', system-ui, sans-serif",

    nav: {
      home:         "Home",
      about:        "About",
      services:     "Systems",
      process:      "Process",
      work:         "Work",
      testimonials: "Testimonials",
      faq:          "FAQ",
    },

    cta:  "Get a Quote",
    menu: "Menu",

    hero: {
      eyebrow:     "Specialized Digital Systems Studio",
      title:       "We build the systems that power your business",
      titleAccent: "with precision & intelligence",
      desc:        "We design and deliver custom software systems for businesses — from point-of-sale and warehouse management to clinic systems — all under one technical roof.",
      explore:     "Explore Our Systems",
      portfolio:   "View Our Work",
    },

    stats: [
      { n: "85+",  l: "Systems Delivered" },
      { n: "7",    l: "Years Experience" },
      { n: "98%",  l: "Client Satisfaction" },
      { n: "24/7", l: "Ongoing Support" },
    ],

    trustSection: {
      eyebrow: "Our Clients",
      title:   "Businesses that trust Shaghal",
    },

    about: {
      eyebrow:     "Who We Are",
      title:       "One technical studio, one specialty:",
      titleAccent: "building digital systems",
      p1:          "We started as a team of software engineers specializing in custom business systems. We noticed many businesses struggling with outdated off-the-shelf software that never quite fits their real workflow.",
      p2:          "We built a company exclusively focused on designing and delivering tailor-made digital systems — built to your exact specifications, with real post-delivery support.",
      imageAlt:    "Shaghal team developing a custom system",
      badgeTitle:  "In-House Engineering Team",
      badgeSub:    "Specialized engineers with zero middlemen",
      highlights: [
        ["In-house engineering team", "Every project is built by dedicated in-house engineers — no outsourcing, no middlemen."],
        ["Real-time tracking & continuous updates", "From kick-off to post-delivery, track every milestone in your dedicated project dashboard."],
        ["Transparent pricing, fixed scope", "No surprises on price or timeline — you get a detailed written proposal before we start."],
      ],
    },

    servicesSection: {
      eyebrow: "Our Systems",
      title:   "Three flagship systems",
      desc:    "Custom software solutions built for the most demanding business sectors",
      from:    "Starting from",
      learnMore: "Learn More",
    },

    services: [
      {
        key:       "pos",
        label:     "01",
        title:     "Point of Sale System",
        sub:       "POS for Supermarkets & Retail Stores",
        desc:      "Full-featured POS system built for supermarkets and retail chains — real-time inventory, barcode scanning, electronic invoicing, multi-branch sync, cashier permissions, and daily P&L reports.",
        tags:      ["Point of Sale", "Barcode", "Sales Reports", "Branch Management"],
        priceFrom: "EGP 25,000",
        timeline:  "21 - 45 Business Days",
        tools:     ["React", "Node.js", "PostgreSQL", "Electron", "Thermal Printer SDK"],
        screenshots: POS_SCREENSHOTS,
        deliverables: [
          "Fast cashier UI compatible with thermal printers & barcode scanners",
          "Admin dashboard with automated daily & monthly sales reports",
          "Multi-branch real-time inventory and pricing sync",
          "Full cashier and manager permission management",
          "12 months support & updates post-delivery",
        ],
      },
      {
        key:       "warehouse",
        label:     "02",
        title:     "Custody & Inventory System",
        sub:       "Enterprise Custody & Inventory (v2.5)",
        desc:      "Enterprise cloud platform for warehouse, fixed assets, and custody management — dual-approval workflow for issuance and returns, serial number (S/N) compass tracking, smart barcode scanning, safety stock alerts, and Excel import/export.",
        tags:      ["Custody & Warehouse", "Fixed Assets", "Serial S/N Tracker", "Dual Approval", "Smart Barcode", "Safety Stock Alerts"],
        priceFrom: "EGP 35,000",
        timeline:  "30 - 60 Business Days",
        tools:     ["React", "Node.js", "PostgreSQL", "Barcode SDK", "Excel XLSX Engine", "RBAC Security"],
        screenshots: WAREHOUSE_SCREENSHOTS,
        deliverables: [
          "Interactive live dashboard tracking total custody asset valuation and real-time low-stock alerts",
          "Dual-approval workflow for custody issuance and return requests (Supervisor & Manager) with reason logging",
          "Asset Compass for historical audit and tracking by unique Serial Numbers (S/N)",
          "Product & SKU catalog with support for fixed assets, purchases, and Excel XLSX import/export",
          "Fast barcode & QR code scanner integration (handheld readers & camera)",
          "Multi-level Role-Based Access Control (RBAC) and enterprise-grade security",
        ],
      },
      {
        key:       "clinic",
        label:     "03",
        title:     "Clinic Management System",
        sub:       "Medical Center & Clinic Platform",
        desc:      "Complete clinic platform for medical centers — online appointment booking, digital patient files, doctor scheduling, billing & insurance, and automated SMS reminders.",
        tags:      ["Appointment Booking", "Patient Files", "Doctor Scheduling", "Medical Billing"],
        priceFrom: "EGP 30,000",
        timeline:  "21 - 45 Business Days",
        tools:     ["React", "Node.js", "PostgreSQL", "Twilio SMS", "PDF Generator"],
        screenshots: CLINIC_SCREENSHOTS,
        pricingPlans: CLINIC_PRICING_PLANS,
        deliverables: [
          "Online booking system with patient app (Android/iOS)",
          "Digital patient files with full medical history & prescriptions",
          "Doctor dashboard with upcoming appointment alerts",
          "Billing & insurance module with report generation",
          "Automated SMS reminders for upcoming appointments",
        ],
      },
    ],

    serviceDetailModal: {
      title:            "System Details & Deliverables",
      deliverablesLabel:"What You Get",
      screenshotsLabel: "Real screens from the live system",
      pricingLabel:     "Official Plans & Pricing",
      dentalProLabel:   "Dental Clinic Packages (Dental Pro Suite)",
      addonsLabel:      "Optional Specialized Add-ons",
      timelineLabel:    "Estimated Delivery Time",
      toolsLabel:       "Technologies Used",
      cta:              "Request a Quote for This System",
      close:            "Close",
    },

    processSection: {
      eyebrow: "How We Work",
      title:   "Our Process",
      desc:    "Four clear steps from your idea to delivery and support",
    },
    process: [
      { n: "01", t: "Discovery Call",     d: "We listen to your real needs, analyze your workflow, and clarify the best technical solution for your project." },
      { n: "02", t: "Proposal & Plan",    d: "A full system concept, clear written timeline, and fixed final price — sent to your email within 24 hours." },
      { n: "03", t: "Build & Deliver",    d: "Our engineering team builds the system with weekly review sessions so you're in the loop every step of the way." },
      { n: "04", t: "Launch & Support",   d: "Fully tested deployment, team training, and real post-launch technical support." },
    ],

    workSection: {
      eyebrow: "Portfolio",
      title:   "Selected Work",
      desc:    "Click any project to view its case study, challenge, solution & results",
      viewCase: "View Case Study",
      filters: {
        all:       "All",
        pos:       "POS",
        warehouse: "Warehouse",
        clinic:    "Clinic",
        software:  "Software",
      },
    },
    portfolio: [
      {
        id:      "portfolio-pos-1",
        key:     "pos",
        image:   posCashier,
        title:   "POS System — Hyper Mart Chain",
        sub:     "6 branches unified in one system",
        client:  "Hyper Mart Retail",
        year:    "2025",
        challenge: "Management struggled with unsynchronized inventory across 6 branches and delayed daily sales reports.",
        solution:  "Built a custom POS system connecting all 6 branches in real-time with a central management dashboard and automated reporting.",
        results:   "90% reduction in daily report preparation time and zero inventory discrepancies after the first month.",
        deliverables: ["Multi-branch POS", "Central Dashboard", "Automated Sales Reports"],
      },
      {
        id:      "portfolio-wh-1",
        key:     "warehouse",
        image:   invDashboard,
        title:   "Custody & Inventory System — Apex Enterprise",
        sub:     "Enterprise fixed assets & custody management with dual approval",
        client:  "Apex Enterprise Distribution",
        year:    "2025",
        challenge: "Lack of visibility on issued employee custody assets, lost serial numbers, and inaccurate warehouse inventory balances.",
        solution:  "Deployed the Enterprise Custody & Inventory platform with serial number tracking, barcode scanner, and staged approval workflow.",
        results:   "100% traceability on all hardware and assets, zero missing custody items, and 80% faster issue approval cycles.",
        deliverables: ["Custody & Warehouse Platform", "Serial S/N Compass", "Dual Approval Workflow", "Smart Barcode Scanner"],
      },
      {
        id:      "portfolio-clinic-1",
        key:     "clinic",
        image:   shotCalendar,
        title:   "Clinic System — Al Raya Medical Center",
        sub:     "8 doctors, 200+ weekly appointments",
        client:  "Al Raya Medical Center",
        year:    "2025",
        challenge: "Managing appointments for 8 doctors manually led to overlapping schedules and lost patient data.",
        solution:  "Full clinic management system with patient booking app, digital files, and automated SMS reminders.",
        results:   "Zero appointment conflicts, 40% reduction in no-shows due to automated reminders.",
        deliverables: ["Appointment Booking App", "Digital Patient Files", "SMS Reminders"],
      },
      {
        id:      "portfolio-sw-1",
        key:     "software",
        image:   "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80&auto=format&fit=crop",
        title:   "E-Commerce Store — Lumina Retail",
        sub:     "Ultra-fast shopping interface",
        client:  "Lumina Fashion Retail",
        year:    "2024",
        challenge: "High cart abandonment rates due to slow page loads and complex checkout flow.",
        solution:  "Built an ultra-fast Next.js storefront with frictionless one-step checkout and secure payment gateway.",
        results:   "85% increase in conversion rate and double the sales in the first month.",
        deliverables: ["Next.js Storefront", "Payment Gateway", "Admin Dashboard"],
      },
      {
        id:      "portfolio-pos-2",
        key:     "pos",
        image:   "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=900&q=80&auto=format&fit=crop",
        title:   "POS System — Al Nile Retail Chain",
        sub:     "12 cashier points running simultaneously",
        client:  "Al Nile Retail Chain",
        year:    "2024",
        challenge: "Legacy system crashed repeatedly during peak hours causing queues and lost sales.",
        solution:  "New Electron-based POS with local database for offline-first operation and cloud sync.",
        results:   "Zero downtime incidents over 9 consecutive months since launch.",
        deliverables: ["Offline-First POS", "Cloud Sync", "Monitoring Dashboard"],
      },
      {
        id:      "portfolio-wh-2",
        key:     "warehouse",
        image:   "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=900&q=80&auto=format&fit=crop",
        title:   "Warehouse Management — GlobalStore Chain",
        sub:     "Main distribution center + 4 warehouses",
        client:  "GlobalStore Chain",
        year:    "2024",
        challenge: "Coordinating shipments between the main hub and 4 sub-warehouses relied entirely on phone calls and Excel sheets.",
        solution:  "Supply chain management platform with real-time shipment tracking and automated inter-warehouse transfer orders.",
        results:   "Transfer order processing time cut from 2 hours to just 8 minutes.",
        deliverables: ["Supply Chain Platform", "Warehouse Mobile App", "Central Control Panel"],
      },
    ],

    caseStudyModal: {
      title:            "Project Case Study",
      clientLabel:      "Client",
      yearLabel:        "Year Delivered",
      challengeLabel:   "The Challenge",
      solutionLabel:    "Our Solution",
      resultsLabel:     "Results & Impact",
      deliverablesLabel:"Key Deliverables",
      cta:              "Request a Similar System",
      close:            "Close",
    },

    testimonialsSection: {
      eyebrow: "Client Reviews",
      title:   "What Our Clients Say",
    },
    testimonials: [
      {
        name: "Ahmed Sami",
        role: "Supermarket Chain Owner — Cairo",
        text: "The POS system completely changed how we operate. Checkout is faster, inventory is accurate, and daily reports hit my phone before I reach the branch. Highly recommended.",
      },
      {
        name: "Khaled Ibrahim",
        role: "Operations Manager — Distribution Company",
        text: "Before the warehouse system, we were losing stock daily without knowing why. Now I can trace every SKU's movement from entry to exit. Shrinkage dropped dramatically.",
      },
      {
        name: "Dr. Mona Fouad",
        role: "Doctor & Director — Medical Center",
        text: "The booking system simplified everything. Patients book online, reminders go out automatically, and every patient's file is on my screen before they walk in. It saves us enormous time.",
      },
    ],

    faqSection: {
      eyebrow: "FAQ",
      title:   "Got a question?",
    },
    faqSearch: {
      placeholder: "Search FAQs (e.g. price, timeline, support...)",
      noResults:   "No matching questions — feel free to contact us directly.",
    },
    faqs: [
      { q: "Do the systems work without internet?",          a: "Yes — most of our systems are designed Offline-First. They operate fully without internet and sync automatically when the connection is restored." },
      { q: "How long does development take?",                a: "Depends on project scope. Standard systems take 21-45 business days; larger projects take 60-90. You'll receive a written schedule before we start." },
      { q: "Can the system be customized after delivery?",   a: "Absolutely — all our systems are designed to evolve. We offer support & update packages, and any new features are scoped and priced transparently." },
      { q: "Is there training included?",                    a: "Yes — delivery includes full training sessions for staff and management, plus tutorial videos and a written user guide." },
      { q: "Do the systems support multiple branches?",      a: "Yes — multi-branch support with real-time sync for data, pricing, and inventory across all branches is built in by design." },
      { q: "How do I track my project during development?",  a: "You'll receive an invite to a dedicated Project Dashboard where you can track every phase, comment, and approve each milestone before we proceed." },
    ],

    contact: {
      eyebrow:           "Start Your Project",
      title:             "Need a custom system?",
      desc:              "Tell us about your project and our team will send you an initial analysis and pricing estimate to your email within one business day.",
      location:          "Cairo, Egypt",
      social:            ["LinkedIn", "X (Twitter)", "GitHub"],
      namePh:            "Full name",
      contactPh:         "Email or phone number",
      servicePh:         "System you need",
      detailsPh:         "Brief project description and requirements",
      submit:            "Send Request (Email response)",
      sent:              "Sent! We'll reply to your email within 24 business hours.",
      sendAnother:       "Send Another Request",
      selectPlaceholder: "Select system...",
      sending:           "Sending...",
      serviceOptions:    ["Point of Sale (POS) System", "Warehouse Management System", "Clinic Management System", "Custom Software System"],
    },

    footer: {
      tagline: "Specialized digital systems studio — custom software built for businesses and organizations.",
      links:   "Links",
      services:"Systems",
      contact: "Contact",
      rights:  "© Shaghal — All rights reserved",
    },

    float: {
      top:      "Back to top",
      whatsapp: "WhatsApp",
    },
    toast: {
      emailCopied:   "Email copied to clipboard!",
      formSubmitted: "Request submitted! We'll reply within 24 business hours.",
    },
    langSwitch: "عربي",
  },
};
