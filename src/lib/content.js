import data from "../data/content.json";

export const { site: cmsSite, projects, products, services, news, extras = [] } = data;

export const site = {
  ...cmsSite,
  facebook: cmsSite.facebook || "",
  messenger: cmsSite.messenger || "",
  logo: "/logo.png",
  aboutImage: "/villas/neo-10.jpg",
  profilePdf: "",
};

const all = [...projects, ...products, ...services, ...news, ...extras];

export function findPost(slug) {
  return all.find((p) => p.slug === slug);
}

export function kindOf(slug) {
  if (projects.some((p) => p.slug === slug)) return { kind: "projects", label: "Mẫu nhà", path: "/mau-nha" };
  if (products.some((p) => p.slug === slug)) return { kind: "products", label: "Sản phẩm", path: "/san-pham" };
  if (services.some((p) => p.slug === slug)) return { kind: "services", label: "Dịch vụ", path: "/dich-vu" };
  if (news.some((p) => p.slug === slug)) return { kind: "news", label: "Tin tức", path: "/tin-tuc" };
  if (extras.some((p) => p.slug === slug)) return { kind: "extras", label: "Bài viết", path: "/" };
  return { kind: "projects", label: "Bài viết", path: "/mau-nha" };
}

export const lists = {
  projects: { title: "Mẫu nhà", kicker: "Mẫu nhà", items: projects, intro: "Công trình tiêu biểu từ tư liệu mới và các dự án đã thiết kế, thi công." },
  products: { title: "Sản phẩm", kicker: "Sản phẩm", items: products, intro: "Nội thất và combo từ xưởng sản xuất của Xây Dựng Trung Nguyễn." },
  services: { title: "Dịch vụ", kicker: "Dịch vụ", items: services, intro: "Thiết kế, xây dựng và cải tạo nhà ở — toàn bộ bài viết gốc được giữ lại." },
  news: {
    title: "Tin tức",
    kicker: "Tin tức",
    items: news,
    intro: "100 bài theo từ khóa xây nhà, thiết kế, cải tạo cùng các tin gốc của Xây Dựng Trung Nguyễn.",
  },
};

export const coreServices = [
  {
    title: "Xây nhà trọn gói",
    slug: "xay-nha-tron-goi",
    href: "/xay-dung-nha-tron-goi-tai-ho-chi-minh",
    image: "/hero/cong-trinh-01.jpg",
    desc: "Khảo sát, thi công và bàn giao chìa khóa trao tay cho nhà phố, biệt thự.",
  },
  {
    title: "Sửa chữa nhà",
    slug: "sua-chua-nha",
    href: "/bao-gia-sua-chu-nha-tron-goi-2025",
    image: "/news/news-cai-tao.jpg",
    desc: "Xử lý xuống cấp, chống thấm, sửa điện nước và hoàn thiện hạng mục hư hỏng.",
  },
  {
    title: "Cải tạo, nâng cấp nhà",
    slug: "cai-tao-nang-cap",
    href: "/bao-gia-sua-chu-nha-tron-goi-2025",
    image: "/services/cai-tao.jpg",
    desc: "Cơi nới, nâng tầng, đổi công năng và làm mới nhà hiện hữu.",
  },
  {
    title: "Thi công nhà phố, biệt thự",
    slug: "nha-pho-biet-thu",
    href: "/mau-nha",
    image: "/studio/01.jpg",
    desc: "Thi công theo hồ sơ, bám tiến độ và hiện trạng thực tế.",
  },
  {
    title: "Thi công và hoàn thiện dân dụng",
    slug: "hoan-thien-dan-dung",
    href: "/thiet-ke-noi-that-nha-o",
    image: "/cai-tao.jpg",
    desc: "Tô, ốp lát, sơn, trần, cửa và hệ thống điện nước.",
  },
];

const SERVICE_PHOTOS = {
  "xay-nha-tron-goi": "/hero/cong-trinh-01.jpg",
  "sua-chua-nha": "/news/news-cai-tao.jpg",
  "cai-tao-nang-cap": "/services/cai-tao.jpg",
  "nha-pho-biet-thu": "/studio/01.jpg",
  "hoan-thien-dan-dung": "/cai-tao.jpg",
};

export function withServicePhotos(list = coreServices) {
  return list.map((item) => {
    const src = String(item.image || "");
    if (/supabase\.co|r2\.dev|\/media\//i.test(src)) return item;
    const slug = String(item.slug || "");
    if (SERVICE_PHOTOS[slug]) return { ...item, image: SERVICE_PHOTOS[slug] };
    const title = String(item.title || "");
    if (/trọn gói/i.test(title)) return { ...item, image: SERVICE_PHOTOS["xay-nha-tron-goi"] };
    if (/sửa chữa/i.test(title)) return { ...item, image: SERVICE_PHOTOS["sua-chua-nha"] };
    if (/cải tạo|nâng cấp/i.test(title)) return { ...item, image: SERVICE_PHOTOS["cai-tao-nang-cap"] };
    if (/biệt thự|nhà phố/i.test(title)) return { ...item, image: SERVICE_PHOTOS["nha-pho-biet-thu"] };
    if (/hoàn thiện/i.test(title)) return { ...item, image: SERVICE_PHOTOS["hoan-thien-dan-dung"] };
    return item;
  });
}

export const reviews = [
  {
    name: "Anh Tân",
    place: "Nhà phố Thủ Đức",
    quote: "Gia đình hài lòng vì tiến độ rõ ràng, KTS tư vấn công năng rất thực tế. Ngôi nhà 230m² đúng như phối cảnh.",
  },
  {
    name: "Chị Trang",
    place: "Đồng Nai",
    quote: "Từ thiết kế đến thi công đều có người phụ trách. Vật tư minh bạch, không phát sinh lung tung.",
  },
  {
    name: "Anh Bình",
    place: "Dĩ An, Bình Dương",
    quote: "Chọn Xây Dựng Trung Nguyễn vì thấy nhiều công trình thực tế. Đội thợ đều, hoàn thiện sạch sẽ.",
  },
];

export const pricePacks = [
  {
    tag: "Phần thô",
    icon: "frame",
    title: "Xây dựng phần thô",
    price: "3.950.000đ/m²",
    lead: "Phù hợp với khách hàng muốn chủ động lựa chọn vật liệu hoàn thiện.",
    points: [
      "Kết cấu móng – khung – mái",
      "Hệ thống điện nước âm tường",
      "Vật tư theo tiêu chuẩn cam kết",
      "Hỗ trợ hồ sơ & giấy phép",
      "Giám sát quá trình thi công",
    ],
    href: "/don-gia-xay-dung-nha-tron-goi-tai-tp-hcm-nam-2022",
    image: "/hero/cong-trinh-01.jpg",
  },
  {
    tag: "Hoàn thiện",
    icon: "finish",
    title: "Thi công hoàn thiện",
    price: "Từ 1.300.000đ/m²",
    lead: "Phù hợp với khách hàng đã có phần thô và cần hoàn thiện công trình.",
    points: [
      "Vật tư hoàn thiện rõ ràng",
      "Điện nước hoàn thiện",
      "Sơn – lát – ốp",
      "Thiết bị theo lựa chọn",
      "Bảo hành công trình",
    ],
    href: "/thiet-ke-noi-that-nha-o",
    image: "/cai-tao.jpg",
  },
  {
    tag: "Trọn gói",
    icon: "home",
    featured: true,
    badge: "Lựa chọn toàn diện",
    title: "Xây nhà trọn gói",
    price: "5.950.000đ/m²",
    lead: "Thiết kế → Xin phép → Thi công → Hoàn thiện → Bàn giao",
    points: [
      "Chìa khóa trao tay",
      "Không phát sinh ngoài thỏa thuận",
      "Vật tư minh bạch",
      "Đội ngũ thi công trực tiếp",
      "Bảo hành dài hạn",
    ],
    href: "/xay-dung-nha-tron-goi-tai-ho-chi-minh",
    image: "/studio/01.jpg",
  },
];

const PRICE_PHOTOS = {
  "Phần thô": "/hero/cong-trinh-01.jpg",
  "Hoàn thiện": "/cai-tao.jpg",
  "Trọn gói": "/studio/01.jpg",
};

export function withPricePhotos(list = pricePacks) {
  return list.map((item) => {
    const src = String(item.image || "");
    if (/supabase\.co|r2\.dev|\/media\//i.test(src)) return item;
    const tag = String(item.tag || "");
    if (PRICE_PHOTOS[tag]) return { ...item, image: PRICE_PHOTOS[tag] };
    return item;
  });
}
