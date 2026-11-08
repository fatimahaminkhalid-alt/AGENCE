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
  },
  {
    id: "2",
    title: "حملة إطلاق على منصات التواصل",
    category: "إدارة الحملات",
    status: "selected",
    publishedAt: "3 أكتوبر 2026",
    offersCount: 8,
    updatedAt: "أمس",
  },
  {
    id: "3",
    title: "بيان صحفي لافتتاح فرع جديد",
    category: "البيانات الصحفية",
    status: "draft",
    publishedAt: null,
    offersCount: 0,
    updatedAt: "قبل 3 أيام",
  },
];