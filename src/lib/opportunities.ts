/**
 * Opportunities: service requests published by beneficiaries, which service providers see and send offers on.
 * Sample data from the Figma design. Later it comes from an API or a database instead of this file.
 */

export interface OpportunityClient {
  name: string;
  initial: string;
  city: string;
  memberSince: string;
}

export interface Opportunity {
  id: string;
  title: string;
  category: string;
  /** Short description for the card (2 lines) */
  description: string;
  /** Full description for the details page "عن المشروع" */
  about: string;
  /** The "المطلوب" list on the details page */
  requirements: string[];
  budget: string;
  duration: string;
  deadline: string;
  postedAt: string;
  offersCount: number;
  client: OpportunityClient;
}

export const opportunities: Opportunity[] = [
  {
    id: "1",
    title: "إدارة حسابات التواصل لمطعم",
    category: "إدارة منصات التواصل الاجتماعي",
    description: "إدارة ثلاثة حسابات لمدة ثلاثة أشهر، تشمل خطة المحتوى والتصميم والنشر.",
    about:
      "إدارة ثلاثة حسابات لمطعم على منصات التواصل لمدة ثلاثة أشهر، تشمل خطة محتوى شهرية وتصميم المنشورات والنشر والرد على التعليقات.",
    requirements: [
      "خطة محتوى شهرية تناسب هوية المطعم.",
      "تصميم 12 منشورًا شهريًا لكل حساب.",
      "تقرير أداء في نهاية كل شهر.",
    ],
    budget: "غير معلنة",
    duration: "3 أشهر",
    deadline: "30 أكتوبر 2026",
    postedAt: "نُشر اليوم",
    offersCount: 3,
    client: { name: "مطعم سفرة", initial: "س", city: "جدة", memberSince: "2026" },
  },
  {
    id: "2",
    title: "تصوير منتجات لمتجر إلكتروني",
    category: "التصوير الفوتوغرافي",
    description: "نحتاج جلسة تصوير لـ 40 منتجًا بخلفية بيضاء، مع صور استخدام للمنتجات في بيئة طبيعية.",
    about:
      "نحتاج جلسة تصوير لـ 40 منتجًا بخلفية بيضاء، مع صور استخدام للمنتجات في بيئة طبيعية تناسب هوية المتجر. الصور ستُستخدم في المتجر الإلكتروني ومنصات التواصل.",
    requirements: [
      "تصوير 40 منتجًا بخلفية بيضاء.",
      "صور استخدام للمنتجات في بيئة طبيعية.",
      "تعديل الصور وتسليمها بدقة عالية.",
    ],
    budget: "8,000 ر.س",
    duration: "10 أيام",
    deadline: "25 أكتوبر 2026",
    postedAt: "نُشر منذ يومين",
    offersCount: 5,
    client: { name: "متجر بيت الأناقة", initial: "ب", city: "الرياض", memberSince: "2025" },
  },
  {
    id: "3",
    title: "خطة اتصال لإطلاق مبادرة",
    category: "الاتصال المؤسسي",
    description: "إعداد خطة اتصال ورسائل رئيسية لإطلاق مبادرة مجتمعية.",
    about:
      "إعداد خطة اتصال متكاملة لإطلاق مبادرة مجتمعية، تشمل الرسائل الرئيسية والجمهور المستهدف والقنوات والجدول الزمني للإطلاق.",
    requirements: [
      "تحليل الجمهور المستهدف للمبادرة.",
      "صياغة الرسائل الرئيسية.",
      "جدول زمني للإطلاق والقنوات المقترحة.",
    ],
    budget: "20,000 ر.س",
    duration: "شهر واحد",
    deadline: "2 نوفمبر 2026",
    postedAt: "نُشر منذ 4 أيام",
    offersCount: 2,
    client: { name: "جمعية أثر", initial: "أ", city: "الرياض", memberSince: "2026" },
  },
  {
    id: "4",
    title: "موشن جرافيك لشرح خدمة",
    category: "الموشن جرافيك",
    description: "فيديو قصير مدته 60 ثانية يشرح خطوات الاستفادة من الخدمة.",
    about:
      "فيديو موشن جرافيك قصير مدته 60 ثانية يشرح خطوات الاستفادة من خدمتنا بأسلوب بسيط، مع تعليق صوتي باللغة العربية.",
    requirements: [
      "كتابة سيناريو الفيديو واعتماده.",
      "رسوم متحركة ثنائية الأبعاد بهوية الشركة.",
      "تعليق صوتي احترافي باللغة العربية.",
    ],
    budget: "12,000 ر.س",
    duration: "3 أسابيع",
    deadline: "28 أكتوبر 2026",
    postedAt: "نُشر منذ 3 أيام",
    offersCount: 6,
    client: { name: "شركة نماء", initial: "ن", city: "الدمام", memberSince: "2025" },
  },
  {
    id: "5",
    title: "محتوى موقع شركة ناشئة",
    category: "كتابة المحتوى",
    description: "كتابة محتوى خمس صفحات لموقع الشركة بنبرة احترافية وواضحة.",
    about:
      "كتابة محتوى خمس صفحات لموقع شركة ناشئة (الرئيسية، من نحن، الخدمات، الأسئلة الشائعة، تواصل معنا) بنبرة احترافية وواضحة.",
    requirements: [
      "كتابة محتوى خمس صفحات.",
      "مراعاة الكلمات المفتاحية لمحركات البحث.",
      "جولتا تعديل بعد التسليم.",
    ],
    budget: "4,000 ر.س",
    duration: "أسبوعان",
    deadline: "2 نوفمبر 2026",
    postedAt: "نُشر منذ 4 أيام",
    offersCount: 4,
    client: { name: "شركة مدار", initial: "م", city: "الرياض", memberSince: "2026" },
  },
  {
    id: "6",
    title: "هوية بصرية لمقهى",
    category: "التصميم الجرافيكي",
    description: "تصميم شعار وألوان ومطبوعات أساسية لمقهى جديد في الرياض.",
    about:
      "تصميم هوية بصرية لمقهى جديد في الرياض، تشمل الشعار والألوان والخطوط والمطبوعات الأساسية مثل الأكواب والقوائم.",
    requirements: [
      "تصميم الشعار بثلاثة مقترحات.",
      "دليل هوية مختصر (الألوان والخطوط).",
      "تصميم الأكواب وقائمة المشروبات.",
    ],
    budget: "7,000 ر.س",
    duration: "4 أسابيع",
    deadline: "5 نوفمبر 2026",
    postedAt: "نُشر منذ أسبوع",
    offersCount: 9,
    client: { name: "مقهى ركن", initial: "ر", city: "الرياض", memberSince: "2026" },
  },
  {
    id: "7",
    title: "فيديو تعريفي لمنتج جديد",
    category: "إنتاج الفيديو",
    description: "فيديو مدته بين 60 و90 ثانية يوضح فكرة المنتج ومزاياه للجمهور في السعودية.",
    about:
      "نحتاج فيديو تعريفيًا لمنتج تقني جديد، مدته بين 60 و90 ثانية، يوضح فكرة المنتج ومزاياه للجمهور في السعودية، ويُستخدم في الموقع ومنصات التواصل.",
    requirements: [
      "كتابة السيناريو واعتماده.",
      "التصوير والمونتاج والتلوين.",
      "نسخ بمقاسات منصات التواصل.",
    ],
    budget: "15,000 ر.س",
    duration: "3 أسابيع",
    deadline: "30 أكتوبر 2026",
    postedAt: "نُشر منذ 5 أيام",
    offersCount: 5,
    client: { name: "نورة السبيعي", initial: "ن", city: "الرياض", memberSince: "2026" },
  },
];

/** The opportunities that match the provider's specialty (shown on the dashboard home, as in the design) */
export const suggestedOpportunities = opportunities.slice(0, 4);

export const getOpportunity = (id: string) => opportunities.find((o) => o.id === id);

/** Filters for the opportunities page. "match" is the text searched for in the category */
export const opportunityFilters = [
  { label: "الكل", match: "" },
  { label: "إنتاج الفيديو", match: "إنتاج الفيديو" },
  { label: "التصوير الفوتوغرافي", match: "التصوير الفوتوغرافي" },
  { label: "الموشن جرافيك", match: "الموشن جرافيك" },
  { label: "كتابة المحتوى", match: "كتابة المحتوى" },
  { label: "إدارة منصات التواصل", match: "إدارة منصات التواصل" },
];
