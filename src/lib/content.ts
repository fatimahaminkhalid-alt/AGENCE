/**
 * All the page text in one place.
 * To change a word or add a service, edit here only; the components read from this file.
 * Later this data can come from a database or a CMS without changing the components.
 */

import type { IconName } from "@/components/ui/Icon";

export const routes = {
  home: "/",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  registerClient: "/register/client",
  registerProvider: "/register/provider",
  dashboardClient: "/dashboard/client",
  privacy: "/privacy",
  terms: "/terms",
} as const;

export const navLinks = [
  { href: "#home", label: "الرئيسية" },
  { href: "#services", label: "الخدمات" },
  { href: "#how", label: "كيف تعمل المنصة؟" },
  { href: "#contact", label: "تواصل معنا" },
];

export const hero = {
  tag: "المنصة السعودية للخدمات الإعلامية والإبداعية",
  title: "كل ما يحتاجه مشروعك الإعلامي في مكان واحد",
  text: "AGENCE منصة سعودية تربط المستفيدين من الخدمات الإعلامية بالوكالات والمستقلين المتخصصين. أنشئ طلبك، استقبل العروض، وقارن بينها لاختيار مقدم الخدمة المناسب لمشروعك.",
};

export const tickerItems = [
  "الإنتاج",
  "التسويق",
  "العلاقات العامة",
  "الاستشارات",
  "إنتاج الفيديو",
  "إدارة الحملات",
  "إدارة السمعة",
];

export const about = {
  eyebrow: "عن AGENCE",
  title: "نربط احتياجك بالخبرة المناسبة",
  paragraphs: [
    "تسهّل عليك AGENCE الوصول إلى الوكالات والمستقلين المتخصصين في الخدمات الإعلامية، دون الحاجة إلى البحث عبر جهات وقنوات متعددة.",
    "أضف تفاصيل مشروعك، استقبل عروض مقدمي الخدمات المهتمين، وقارن بين الخبرات والخيارات قبل اتخاذ قرارك.",
    "كما تتيح المنصة لمقدمي الخدمات مساحة مهنية لعرض خبراتهم وأعمالهم والوصول إلى مشروعات وفرص جديدة.",
  ],
};

export type Service = { title: string; icon: IconName; items: string[] };

export const services: Service[] = [
  {
    title: "التسويق",
    icon: "megaphone",
    items: ["استراتيجيات التسويق", "إدارة الحملات", "إدارة منصات التواصل الاجتماعي", "صناعة المحتوى", "الإعلانات الرقمية"],
  },
  {
    title: "العلاقات العامة والاتصال",
    icon: "newspaper",
    items: ["العلاقات الإعلامية", "الاتصال المؤسسي", "الحملات الإعلامية", "إدارة السمعة", "البيانات الصحفية"],
  },
  {
    title: "الاستشارات الإعلامية",
    icon: "bulb",
    items: ["بناء الاستراتيجيات الإعلامية", "تحليل الاحتياج", "تطوير الرسائل", "تقييم الأداء الإعلامي"],
  },
  {
    title: "الإنتاج",
    icon: "clapper",
    items: ["إنتاج الفيديو", "التصوير الفوتوغرافي", "البودكاست", "الموشن جرافيك", "الإنتاج الصوتي"],
  },
];

export type Path = {
  badge: string;
  title: string;
  steps: { title: string; text: string }[];
  cta: { label: string; href: string };
  variant: "blue" | "white";
};

export const paths: Path[] = [
  {
    badge: "المسار الأول",
    title: "للمستفيدين",
    variant: "blue",
    steps: [
      { title: "أنشئ طلبك", text: "اختر الخدمة التي تحتاجها، وأضف تفاصيل مشروعك وأهدافه وميزانيته." },
      { title: "استقبل العروض", text: "استقبل عروضًا من وكالات ومستقلين مهتمين بتنفيذ مشروعك." },
      { title: "قارن واختر", text: "راجع العروض والخبرات، واختر مقدم الخدمة المناسب لاحتياجك وميزانيتك." },
    ],
    cta: { label: "أنشئ طلبك الآن", href: routes.registerClient },
  },
  {
    badge: "المسار الثاني",
    title: "لمقدمي الخدمات",
    variant: "white",
    steps: [
      { title: "أنشئ ملفك المهني", text: "أضف نبذة عنك، وحدد خدماتك، واعرض نماذج من أعمالك السابقة." },
      { title: "اكتشف الفرص", text: "اطّلع على طلبات الخدمات والمشروعات التي تناسب مجال خبرتك." },
      { title: "قدّم عرضك", text: "أرسل عرضك للمشروعات المناسبة، وابدأ في الوصول إلى مستفيدين جدد." },
    ],
    cta: { label: "سجّل كمقدم خدمة", href: routes.registerProvider },
  },
];

export const audiences = [
  {
    image: { src: "/AGENCE/images/صورة المستفيد.jpg", alt: "صورة توضيحية للمستفيدين من منصة AGENCE" },
    eyebrow: "للمستفيدين",
    title: "لا تشتّت بحثك بين أكثر من جهة",
    text: "عندما يحتاج مشروعك إلى خدمة إعلامية، تساعدك AGENCE على بدء البحث من مكان واحد. أنشئ طلبًا يوضح احتياجك، واستقبل عروضًا من وكالات ومستقلين مهتمين بمشروعك، ثم قارن بين الخيارات واختر ما يناسبك.",
    link: { label: "اطلب خدمة إعلامية", href: routes.registerClient },
  },
  {
    image: { src: "/AGENCE/images/صورة مقدم الخدمة.jpg", alt: "صورة توضيحية لمقدمي الخدمات على منصة AGENCE" },
    eyebrow: "لمقدمي الخدمات",
    title: "حوّل خبرتك إلى فرص جديدة",
    text: "سواء كنت مستقلًا أو تمثل وكالة متخصصة في الخدمات الإعلامية، تمنحك AGENCE مساحة لعرض خدماتك وخبراتك وأعمالك السابقة. أنشئ ملفك المهني، اكتشف المشروعات المناسبة لتخصصك، وقدّم عروضك للوصول إلى مستفيدين جدد.",
    link: { label: "ابدأ كمقدم خدمة", href: routes.registerProvider },
  },
];

export const contactInfo: { icon: IconName; label: string; value: string }[] = [
  { icon: "mail", label: "البريد الإلكتروني", value: "يضاف البريد الرسمي" },
  { icon: "phone", label: "رقم التواصل", value: "يضاف الرقم الرسمي" },
  { icon: "share", label: "منصات التواصل الاجتماعي", value: "تضاف الروابط المعتمدة" },
];

export const footerColumns = [
  {
    title: "المنصة",
    links: [
      { href: "#home", label: "الرئيسية" },
      { href: "#services", label: "الخدمات" },
      { href: "#how", label: "كيف تعمل المنصة؟" },
      { href: "#contact", label: "تواصل معنا" },
    ],
  },
  {
    title: "الحساب",
    links: [
      { href: routes.login, label: "تسجيل الدخول" },
      { href: routes.registerClient, label: "إنشاء حساب مستفيد" },
      { href: routes.registerProvider, label: "التسجيل كمقدم خدمة" },
    ],
  },
  {
    title: "قانوني",
    links: [
      { href: routes.privacy, label: "سياسة الخصوصية" },
      { href: routes.terms, label: "الشروط والأحكام" },
    ],
  },
];
