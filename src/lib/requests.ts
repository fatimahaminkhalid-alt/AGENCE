export type RequestStatus =
  | "draft"
  | "published"
  | "receiving"
  | "selected"
  | "completed"
  | "cancelled";

export interface ServiceRequest {
  id: string;
  title: string;
  category: string;
  status: RequestStatus;
  publishedAt: string | null;
  offersCount: number;
  updatedAt: string;
  // Request details (the "تفاصيل الطلب" page)
  description: string;
  budget: string;
  duration: string;
  deadline: string | null;
}

// بيانات تجريبية — استبدلها لاحقًا بجلب من API أو قاعدة بيانات
export const requests: ServiceRequest[] = [
  {
    id: "1",
    title: "فيديو تعريفي لمنتج جديد",
    category: "إنتاج الفيديو",
    status: "receiving",
    publishedAt: "12 أكتوبر 2026",
    offersCount: 5,
    updatedAt: "منذ ساعتين",
    description:
      "نحتاج فيديو تعريفيًا لمنتج تقني جديد، مدته بين 60 و90 ثانية، يوضح فكرة المنتج ومزاياه للجمهور في السعودية، ويُستخدم في الموقع ومنصات التواصل.",
    budget: "15,000 ر.س",
    duration: "3 أسابيع",
    deadline: "30 أكتوبر 2026",
  },
  {
    id: "2",
    title: "حملة إطلاق على منصات التواصل",
    category: "إدارة الحملات",
    status: "selected",
    publishedAt: "3 أكتوبر 2026",
    offersCount: 8,
    updatedAt: "أمس",
    description:
      "نخطط لإطلاق علامة تجارية جديدة ونحتاج حملة متكاملة على منصات التواصل لمدة شهر، تشمل المحتوى والتصميم وإدارة الإعلانات.",
    budget: "12,000 ر.س",
    duration: "شهر واحد",
    deadline: "20 أكتوبر 2026",
  },
  {
    id: "3",
    title: "بيان صحفي لافتتاح فرع جديد",
    category: "البيانات الصحفية",
    status: "draft",
    publishedAt: null,
    offersCount: 0,
    updatedAt: "قبل 3 أيام",
    description: "بيان صحفي يعلن افتتاح فرعنا الجديد في جدة، مع توزيعه على الصحف والمواقع الإخبارية المحلية.",
    budget: "3,000 ر.س",
    duration: "أسبوع",
    deadline: null,
  },
];

export const getRequest = (id: string) => requests.find((r) => r.id === id);
