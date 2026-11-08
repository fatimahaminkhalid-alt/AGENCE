export interface Opportunity {
  id: string;
  title: string;
  category: string;
  description: string;
  budget: string;
  duration: string;
  deadline: string;
  postedAt: string;
}

// بيانات تجريبية — استبدلها لاحقًا بجلب من API أو قاعدة بيانات
export const opportunities: Opportunity[] = [
  {
    id: "1",
    title: "إدارة حسابات التواصل لمطعم",
    category: "إدارة منصات التواصل الاجتماعي",
    description: "إدارة ثلاثة حسابات لمدة ثلاثة أشهر، تشمل خطة المحتوى والتصميم والنشر.",
    budget: "غير معلنة",
    duration: "3 أشهر",
    deadline: "30 أكتوبر 2026",
    postedAt: "نشر اليوم",
  },
  {
    id: "2",
    title: "تصوير منتجات لمتجر إلكتروني",
    category: "التصوير الفوتوغرافي",
    description: "نحتاج جلسة تصوير لـ 40 منتجًا بخلفية بيضاء، مع صور استخدام للمنتجات في بيئة طبيعية.",
    budget: "8,000 ر.س",
    duration: "10 أيام",
    deadline: "25 أكتوبر 2026",
    postedAt: "نشر منذ يومين",
  },
  {
    id: "3",
    title: "خطة اتصال لإطلاق مبادرة",
    category: "الاتصال المؤسسي",
    description: "إعداد خطة اتصال ورسائل رئيسية لإطلاق مبادرة مجتمعية.",
    budget: "20,000 ر.س",
    duration: "شهر واحد",
    deadline: "2 نوفمبر 2026",
    postedAt: "نشر منذ 4 أيام",
  },
  {
    id: "4",
    title: "موشن جرافيك لشرح خدمة",
    category: "الموشن جرافيك",
    description: "فيديو قصير مدته 60 ثانية يشرح خطوات الاستفادة من الخدمة.",
    budget: "12,000 ر.س",
    duration: "3 أسابيع",
    deadline: "28 أكتوبر 2026",
    postedAt: "نشر منذ 3 أيام",
  },
];