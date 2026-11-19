/**
 * Sample data for the service provider dashboard pages (proposals, projects, services, portfolio, messages, notifications, support).
 * The text is from the Figma design. Later this data comes from the database instead of this file.
 */

import type { AppNotification, Conversation } from "./client-dashboard";
import type { Faq } from "@/components/dashboard/SupportCenter";
import type { Account, Pref } from "@/components/dashboard/SettingsForms";

/* ---------- The account owner ---------- */
export const provider = {
  name: "خالد العتيبي",
  firstName: "خالد",
  initial: "خ",
  kind: "مستقل",
  headline: "مصور ومخرج إعلانات",
  city: "الرياض",
  website: "",
  bio: "",
  specialties: ["التصوير الفوتوغرافي", "الموشن جرافيك", "إنتاج الفيديو"],
};

/* ---------- My proposals (عروضي) ---------- */
export type ProposalStatus = "accepted" | "review" | "rejected";

export type Proposal = {
  id: string;
  opportunityId: string; // "عرض التفاصيل" opens the opportunity the proposal was sent on
  title: string;
  client: string;
  submittedAt: string;
  status: ProposalStatus;
  price: string;
};

export const proposalStatusLabels: Record<ProposalStatus, string> = {
  accepted: "مقبول",
  review: "قيد المراجعة",
  rejected: "غير مقبول",
};

export const proposals: Proposal[] = [
  { id: "pr1", opportunityId: "7", title: "فيديو تعريفي لمنتج جديد", client: "نورة السبيعي", submittedAt: "20 أكتوبر 2026", status: "accepted", price: "6,500 ر.س" },
  { id: "pr2", opportunityId: "2", title: "تصوير منتجات لمتجر إلكتروني", client: "متجر بيت الأناقة", submittedAt: "24 أكتوبر 2026", status: "review", price: "7,500 ر.س" },
  { id: "pr3", opportunityId: "1", title: "إدارة حسابات التواصل لمطعم", client: "مطعم سفرة", submittedAt: "26 أكتوبر 2026", status: "review", price: "9,000 ر.س" },
  { id: "pr4", opportunityId: "6", title: "هوية بصرية لمقهى", client: "مقهى ركن", submittedAt: "18 أكتوبر 2026", status: "rejected", price: "6,000 ر.س" },
];

/** The numbers in the stat cards, as in the design (the account's full totals, not just the 4 rows shown) */
export const proposalStats = { total: 12, review: 5, accepted: 4, rejected: 3 };

/* ---------- My projects (مشروعاتي) ---------- */
export type ProjectStatus = "inProgress" | "awaitingReview" | "completed";

export type Project = {
  id: string;
  title: string;
  client: string;
  status: ProjectStatus;
  progress: number; // 0–100
  dueDate: string;
  value: string;
};

export const projectStatusLabels: Record<ProjectStatus, string> = {
  inProgress: "قيد التنفيذ",
  awaitingReview: "بانتظار مراجعة العميل",
  completed: "مكتمل",
};

export const projects: Project[] = [
  { id: "pj1", title: "فيديو تعريفي لمنتج جديد", client: "نورة السبيعي", status: "inProgress", progress: 40, dueDate: "18 نوفمبر 2026", value: "6,500 ر.س" },
  { id: "pj2", title: "موشن جرافيك لشرح خدمة", client: "شركة نماء", status: "awaitingReview", progress: 85, dueDate: "14 نوفمبر 2026", value: "6,000 ر.س" },
  // Completed projects: the design shows only their count (5), so these are sample entries. Review them before launch
  { id: "pj3", title: "تصوير فعالية افتتاح معرض", client: "شركة مدار", status: "completed", progress: 100, dueDate: "2 أكتوبر 2026", value: "5,500 ر.س" },
  { id: "pj4", title: "إعلان رمضاني لمطعم", client: "مطعم سفرة", status: "completed", progress: 100, dueDate: "20 فبراير 2026", value: "9,000 ر.س" },
  { id: "pj5", title: "جلسة تصوير لمجموعة عطور", client: "متجر بيت الأناقة", status: "completed", progress: 100, dueDate: "12 يناير 2026", value: "4,000 ر.س" },
  { id: "pj6", title: "فيديو إطلاق تطبيق توصيل", client: "شركة نماء", status: "completed", progress: 100, dueDate: "5 ديسمبر 2025", value: "11,000 ر.س" },
  { id: "pj7", title: "تغطية مؤتمر تقني", client: "جمعية أثر", status: "completed", progress: 100, dueDate: "18 نوفمبر 2025", value: "7,000 ر.س" },
];

/* ---------- My services (خدماتي) ---------- */
export type ServiceIcon = "camera" | "video" | "pen" | "motion" | "other";

export type Service = {
  id: string;
  title: string;
  icon: ServiceIcon;
  description: string;
  startingPrice: string; // a number only, e.g. "3,000"
  duration: string;
  active: boolean;
};

export const services: Service[] = [
  { id: "s1", title: "التصوير الفوتوغرافي", icon: "camera", description: "تصوير منتجات وفعاليات وبورتريه بإضاءة احترافية وتعديل كامل.", startingPrice: "3,000", duration: "من 5 أيام", active: true },
  { id: "s2", title: "إنتاج الفيديو", icon: "video", description: "فيديوهات تعريفية وإعلانية من كتابة السيناريو حتى المونتاج النهائي.", startingPrice: "12,000", duration: "من 3 أسابيع", active: true },
  { id: "s3", title: "كتابة المحتوى", icon: "pen", description: "سيناريوهات ونصوص إعلانية ومحتوى لمنصات التواصل.", startingPrice: "2,000", duration: "من 5 أيام", active: false },
  { id: "s4", title: "الموشن جرافيك", icon: "motion", description: "فيديوهات شرح قصيرة ورسوم متحركة تبسّط فكرتك.", startingPrice: "5,000", duration: "من أسبوعين", active: true },
];

/* ---------- Portfolio (معرض الأعمال) ---------- */
export type WorkCategory = "إنتاج الفيديو" | "التصوير الفوتوغرافي" | "الموشن جرافيك";

export type Work = {
  id: string;
  title: string;
  category: WorkCategory;
  year: string;
  /** The cover gradient until real images are added (from the design) */
  cover: string;
};

export const workCategories: WorkCategory[] = ["إنتاج الفيديو", "التصوير الفوتوغرافي", "الموشن جرافيك"];

export const works: Work[] = [
  { id: "w1", title: "موشن جرافيك لمنصة تعليمية", category: "الموشن جرافيك", year: "2025", cover: "linear-gradient(135deg, #3b1cf0 0%, #b9adf7 50%, #fbf8f8 100%)" },
  { id: "w2", title: "جلسة تصوير لمجموعة عطور", category: "التصوير الفوتوغرافي", year: "2026", cover: "linear-gradient(135deg, #ec7a1e 0%, #f6c9a2 45%, #fbf8f8 100%)" },
  { id: "w3", title: "فيديو إطلاق تطبيق توصيل", category: "إنتاج الفيديو", year: "2026", cover: "linear-gradient(135deg, #3b1cf0 0%, #b46e8f 50%, #f0913f 100%)" },
  { id: "w4", title: "فيديو شرح خدمة", category: "الموشن جرافيك", year: "2024", cover: "linear-gradient(135deg, #3b1cf0 0%, #3d3a6e 55%, #4a4a4a 100%)" },
  { id: "w5", title: "إعلان رمضاني لمطعم", category: "إنتاج الفيديو", year: "2025", cover: "linear-gradient(135deg, #ec7a1e 0%, #8a52c8 50%, #5a3df0 100%)" },
  { id: "w6", title: "تغطية مؤتمر تقني", category: "التصوير الفوتوغرافي", year: "2025", cover: "linear-gradient(135deg, #222 0%, #3e2fae 55%, #5b45f2 100%)" },
];

/* ---------- Messages ---------- */
export const providerConversations: Conversation[] = [
  {
    id: "c1",
    name: "نورة السبيعي",
    initial: "ن",
    tone: "blue",
    requestTitle: "فيديو تعريفي لمنتج جديد",
    lastTime: "10:24 ص",
    unread: false,
    messages: [
      { id: "m1", from: "them", text: "مرحبًا، اطلعت على عرضكم وأرغب بمعرفة مراحل التنفيذ بالتفصيل.", time: "10:12 ص" },
      { id: "m2", from: "me", text: "أهلًا بك، نبدأ بالسيناريو ثم التصوير والمونتاج، ونرسل لك كل مرحلة للمراجعة.", time: "10:20 ص" },
      { id: "m3", from: "them", text: "ممتاز، سأرسل لكم ملفات الهوية اليوم.", time: "10:24 ص" },
    ],
  },
  {
    id: "c2",
    name: "شركة نماء",
    initial: "ش",
    tone: "blue",
    requestTitle: "موشن جرافيك لشرح خدمة",
    lastTime: "أمس",
    unread: true,
    messages: [{ id: "m1", from: "them", text: "هل يمكن إضافة ترجمة إنجليزية للفيديو؟", time: "أمس" }],
  },
  {
    id: "c3",
    name: "متجر بيت الأناقة",
    initial: "ب",
    tone: "orange",
    requestTitle: "تصوير منتجات لمتجر إلكتروني",
    lastTime: "الإثنين",
    unread: false,
    messages: [{ id: "m1", from: "them", text: "نرحب بعرضكم، متى يمكن البدء؟", time: "الإثنين" }],
  },
];

/* ---------- Notifications ---------- */
export const providerNotifications: AppNotification[] = [
  { id: "n1", icon: "offer", text: "تم قبول عرضك على «فيديو تعريفي لمنتج جديد»، ويمكنك البدء بالتنفيذ.", time: "منذ ساعتين", group: "today", unread: true },
  { id: "n2", icon: "message", text: "رسالة جديدة من نورة السبيعي.", time: "منذ 4 ساعات", group: "today", unread: true },
  { id: "n3", icon: "published", text: "فرصة جديدة تناسب تخصصك: «تصوير منتجات لمتجر إلكتروني».", time: "12 أكتوبر 2026", group: "week", unread: false },
  { id: "n4", icon: "deadline", text: "يتبقى يومان على آخر موعد للتقديم على فرصة «إدارة حسابات التواصل لمطعم».", time: "10 أكتوبر 2026", group: "week", unread: false },
  { id: "n5", icon: "offer", text: "لم يتم قبول عرضك على «هوية بصرية لمقهى».", time: "9 أكتوبر 2026", group: "week", unread: false },
];

/* ---------- Account settings ---------- */
export const providerAccount: Account = { fullName: "خالد العتيبي", email: "khalid@example.com" };

export const providerPrefs: Pref[] = [
  { key: "opportunities", title: "الفرص الجديدة", desc: "تنبيه عند نشر فرصة تناسب تخصصك.", on: true },
  { key: "messages", title: "الرسائل", desc: "تنبيه عند وصول رسالة من مستفيد.", on: true },
  { key: "newsletter", title: "النشرة البريدية", desc: "أخبار المنصة ونصائح لتطوير أعمالك.", on: false },
];

/* ---------- Support: frequently asked questions ----------
   The design shows only the answer to the first question. The rest are suggested answers: review them before launch. */
export const providerFaqs: Faq[] = [
  {
    q: "كيف أقدّم عرضًا على فرصة؟",
    a: "افتح الفرصة من «الفرص المتاحة»، ثم أدخل قيمة العرض ومدة التنفيذ ووصفه واضغط «تقديم العرض».",
  },
  {
    q: "كيف أعرف أن عرضي قُبل؟",
    a: "يصلك إشعار فور قبول عرضك، وتتغير حالته في صفحة «عروضي» إلى «مقبول»، ويظهر المشروع في «مشروعاتي».",
  },
  {
    q: "هل يمكنني تعديل عرضي بعد تقديمه؟",
    a: "نعم، يمكنك تعديل العرض ما دام قيد المراجعة وقبل آخر موعد للتقديم على الفرصة.",
  },
  {
    q: "كيف أضيف أعمالي إلى المعرض؟",
    a: "من صفحة «معرض الأعمال» اضغط «أضف عملًا»، ثم أدخل عنوان العمل ونوعه وسنة تنفيذه وأرفق صوره أو الفيديو.",
  },
  {
    q: "كيف أتواصل مع المستفيد؟",
    a: "من صفحة «الرسائل» يمكنك مراسلة المستفيدين الذين قدّمت عروضًا على فرصهم أو تعمل على مشروعاتهم.",
  },
];
