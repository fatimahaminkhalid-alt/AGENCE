/**
 * Sample data for the beneficiary dashboard pages (offers, saved providers, messages, notifications, support).
 * The text is from the Figma design. Later this data comes from the database instead of this file.
 */

/* ---------- Received offers ---------- */
export type Offer = {
  id: string;
  requestId: string;
  requestTitle: string;
  provider: string;
  initial: string;
  kind: "وكالة" | "مستقل";
  specialty: string;
  price: string;
  duration: string;
  summary: string;
};

export const offers: Offer[] = [
  {
    id: "o1",
    requestId: "1",
    requestTitle: "فيديو تعريفي لمنتج جديد",
    provider: "استوديو لقطة",
    initial: "ل",
    kind: "وكالة",
    specialty: "إنتاج الفيديو",
    price: "6,500 ر.س",
    duration: "8 أيام",
    summary: "نقترح فيديو مدته 90 ثانية بأسلوب سينمائي، يشمل كتابة السيناريو والتصوير والمونتاج مع جولتي تعديل.",
  },
  {
    id: "o2",
    requestId: "1",
    requestTitle: "فيديو تعريفي لمنتج جديد",
    provider: "فهد القحطاني",
    initial: "ف",
    kind: "مستقل",
    specialty: "الموشن جرافيك",
    price: "4,200 ر.س",
    duration: "10 أيام",
    summary: "فيديو موشن جرافيك ثنائي الأبعاد مع تعليق صوتي احترافي، وتسليم بمقاسات المنصات المختلفة.",
  },
  {
    id: "o3",
    requestId: "1",
    requestTitle: "فيديو تعريفي لمنتج جديد",
    provider: "وكالة أفق للإنتاج",
    initial: "أ",
    kind: "وكالة",
    specialty: "إنتاج الفيديو",
    price: "9,800 ر.س",
    duration: "14 يومًا",
    summary: "فريق كامل للتصوير في موقعكم مع إضاءة احترافية، ونسخة قصيرة مدتها 15 ثانية للإعلانات.",
  },
  {
    id: "o4",
    requestId: "2",
    requestTitle: "حملة إطلاق على منصات التواصل",
    provider: "صدى للعلاقات العامة",
    initial: "ص",
    kind: "وكالة",
    specialty: "العلاقات العامة",
    price: "12,000 ر.س",
    duration: "شهر واحد",
    summary: "خطة إطلاق متكاملة تشمل المحتوى والتصميم وإدارة الإعلانات لمدة شهر، مع تقرير أداء أسبوعي.",
  },
];

/* ---------- Saved providers ---------- */
export type SavedProvider = {
  id: string;
  name: string;
  initial: string;
  kind: "وكالة" | "مستقل" | "مستقلة";
  specialty: string;
  city: string;
  tags: [string, string];
  tone: "blue" | "orange"; // avatar color, as in the design
};

export const savedProviders: SavedProvider[] = [
  { id: "p1", name: "فهد القحطاني", initial: "ف", kind: "مستقل", specialty: "الموشن جرافيك", city: "الدمام", tags: ["تعليق صوتي", "موشن جرافيك"], tone: "orange" },
  { id: "p2", name: "استوديو لقطة", initial: "ل", kind: "وكالة", specialty: "إنتاج الفيديو", city: "جدة", tags: ["إعلانات", "فيديو تعريفي"], tone: "blue" },
  { id: "p3", name: "ريم العتيبي", initial: "ر", kind: "مستقلة", specialty: "التصوير الفوتوغرافي", city: "الرياض", tags: ["تصوير فعاليات", "تصوير منتجات"], tone: "orange" },
  { id: "p4", name: "أفق للاستشارات", initial: "أ", kind: "وكالة", specialty: "الاستشارات الإعلامية", city: "الرياض", tags: ["تحليل الأداء", "استراتيجيات"], tone: "blue" },
  { id: "p5", name: "نورة الشهري", initial: "ن", kind: "مستقلة", specialty: "صناعة المحتوى", city: "الخبر", tags: ["منصات التواصل", "كتابة محتوى"], tone: "orange" },
  { id: "p6", name: "صدى للعلاقات العامة", initial: "ص", kind: "وكالة", specialty: "العلاقات العامة", city: "الرياض", tags: ["بيانات صحفية", "إدارة السمعة"], tone: "blue" },
];

/* ---------- Messages ---------- */
export type ChatMessage = { id: string; from: "them" | "me"; text: string; time: string };
export type Conversation = {
  id: string;
  name: string;
  initial: string;
  tone: "blue" | "orange";
  requestTitle: string;
  lastTime: string;
  unread: boolean;
  messages: ChatMessage[];
};

export const conversations: Conversation[] = [
  {
    id: "c1",
    name: "استوديو لقطة",
    initial: "ل",
    tone: "blue",
    requestTitle: "فيديو تعريفي لمنتج جديد",
    lastTime: "10:24 ص",
    unread: false,
    messages: [
      { id: "m1", from: "them", text: "مرحبًا، اطلعنا على طلبكم ونسعد بتنفيذ الفيديو. هل لديكم هوية بصرية جاهزة للمنتج؟", time: "10:12 ص" },
      { id: "m2", from: "me", text: "أهلًا بكم، نعم الهوية جاهزة وسأرسل لكم الملفات.", time: "10:20 ص" },
      { id: "m3", from: "them", text: "ممتاز، وبعد استلامها نرسل لكم السيناريو المقترح خلال يومين.", time: "10:24 ص" },
    ],
  },
  {
    id: "c2",
    name: "صدى للعلاقات العامة",
    initial: "ص",
    tone: "blue",
    requestTitle: "حملة إطلاق على منصات التواصل",
    lastTime: "أمس",
    unread: true,
    messages: [{ id: "m1", from: "them", text: "أرفقنا لكم خطة الإطلاق المقترحة.", time: "أمس" }],
  },
  {
    id: "c3",
    name: "فهد القحطاني",
    initial: "ف",
    tone: "orange",
    requestTitle: "فيديو تعريفي لمنتج جديد",
    lastTime: "الإثنين",
    unread: false,
    messages: [{ id: "m1", from: "them", text: "شكرًا لكم على التواصل.", time: "الإثنين" }],
  },
];

/* ---------- Notifications ---------- */
export type NotificationIcon = "offer" | "message" | "published" | "deadline";
export type AppNotification = {
  id: string;
  icon: NotificationIcon;
  text: string;
  time: string;
  group: "today" | "week";
  unread: boolean;
};

export const notifications: AppNotification[] = [
  { id: "n1", icon: "offer", text: "وصلك عرض جديد من استوديو لقطة على طلب «فيديو تعريفي لمنتج جديد».", time: "منذ ساعتين", group: "today", unread: true },
  { id: "n2", icon: "message", text: "رسالة جديدة من صدى للعلاقات العامة.", time: "منذ 4 ساعات", group: "today", unread: true },
  { id: "n3", icon: "published", text: "تم نشر طلبك «فيديو تعريفي لمنتج جديد» وأصبح يستقبل العروض.", time: "12 أكتوبر 2026", group: "week", unread: false },
  { id: "n4", icon: "deadline", text: "يتبقى 3 أيام على آخر موعد لاستقبال العروض على طلبك.", time: "10 أكتوبر 2026", group: "week", unread: false },
  { id: "n5", icon: "offer", text: "وصلك عرض جديد من فهد القحطاني.", time: "9 أكتوبر 2026", group: "week", unread: false },
];

/* ---------- Support: frequently asked questions ----------
   The design shows only the answer to the first question. The rest are suggested answers: review them before launch. */
export const faqs = [
  {
    q: "كيف أنشئ طلبًا جديدًا؟",
    a: "من لوحة التحكم اضغط «أنشئ طلبًا جديدًا»، ثم أضف تفاصيل مشروعك والخدمة المطلوبة وانشر الطلب.",
  },
  {
    q: "متى تصلني العروض؟",
    a: "تبدأ العروض بالوصول بعد نشر الطلب مباشرة، وتستمر حتى آخر موعد حددته لاستقبال العروض. يصلك إشعار مع كل عرض جديد.",
  },
  {
    q: "هل يمكنني تعديل الطلب بعد نشره؟",
    a: "نعم، افتح الطلب واضغط «تعديل الطلب». يُبلَّغ مقدمو الخدمات الذين أرسلوا عروضهم بالتعديل حتى يحدّثوا عروضهم إن لزم.",
  },
  {
    q: "كيف أختار مقدم الخدمة المناسب؟",
    a: "قارن بين العروض من حيث السعر ومدة التنفيذ وتفاصيل العرض، واطّلع على ملف كل مقدم خدمة وأعماله السابقة، ثم اضغط «اختيار مقدم الخدمة».",
  },
  {
    q: "كيف أتواصل مع مقدم الخدمة؟",
    a: "من صفحة «الرسائل» يمكنك مراسلة أي مقدم خدمة أرسل عرضًا على طلباتك.",
  },
];

/* Service types for the "إنشاء طلب" form */
export const serviceTypes = [
  "استراتيجيات التسويق",
  "إدارة الحملات",
  "إدارة منصات التواصل الاجتماعي",
  "صناعة المحتوى",
  "الإعلانات الرقمية",
  "العلاقات الإعلامية",
  "البيانات الصحفية",
  "إدارة السمعة",
  "الاستشارات الإعلامية",
  "إنتاج الفيديو",
  "التصوير الفوتوغرافي",
  "الموشن جرافيك",
  "البودكاست",
  "الإنتاج الصوتي",
];
