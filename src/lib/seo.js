import { findKeyword, keywordNewsPath } from "../data/keywords.js";

export const SITE_URL = "https://xaydungtrungnguyen.com";
export const DEFAULT_OG = `${SITE_URL}/villas/villa-mansard-rong.jpg`;

export const PAGE_SEO = {
  "/": {
    title: "Xây nhà trọn gói, sửa chữa và cải tạo | Xây Dựng Trung Nguyễn",
    description:
      "Công ty TNHH Xây Dựng và Điện Lạnh Trung Nguyễn — xây nhà trọn gói, sửa chữa, cải tạo và hoàn thiện công trình dân dụng tại Dĩ An, TP.HCM. Uy tín – Chất lượng – Tận tâm.",
    keywords:
      "xây nhà trọn gói, sửa chữa nhà, cải tạo nhà, thi công nhà phố, biệt thự, Xây Dựng Trung Nguyễn",
  },
  "/gioi-thieu": {
    title: "Giới thiệu Xây Dựng Trung Nguyễn | Uy tín – Chất lượng – Tận tâm",
    description:
      "Tìm hiểu Công ty TNHH Xây Dựng và Điện Lạnh Trung Nguyễn — thương hiệu thiết kế, thi công nhà phố, biệt thự tân cổ điển tại Hồ Chí Minh và các tỉnh lân cận.",
  },
  "/dich-vu": {
    title: "Dịch vụ thiết kế, xây dựng, cải tạo nhà | Xây Dựng Trung Nguyễn",
    description:
      "Thiết kế kiến trúc — nội thất, xây nhà trọn gói và cải tạo nhà cũ tại TP.HCM. Hồ sơ thi công đầy đủ, giám sát tại công trình.",
  },
  "/mau-nha": {
    title: "Mẫu nhà tân cổ điển và công trình thực tế | Xây Dựng Trung Nguyễn",
    description:
      "Xem mẫu biệt thự, nhà phố tân cổ điển và các công trình Xây Dựng Trung Nguyễn đã thiết kế, thi công tại TP.HCM và nhiều tỉnh thành.",
  },
  "/du-an": {
    title: "Dự án và mẫu nhà | Xây Dựng Trung Nguyễn",
    description: "Danh sách dự án thiết kế, xây dựng nhà ở của Xây Dựng Trung Nguyễn — biệt thự, nhà phố, cải tạo.",
    canonical: "/mau-nha",
  },
  "/san-pham": {
    title: "Nội thất và combo từ xưởng | Xây Dựng Trung Nguyễn",
    description: "Nội thất tân cổ điển, combo căn hộ và sản phẩm từ xưởng sản xuất của Xây Dựng Trung Nguyễn.",
  },
  "/bao-gia": {
    title: "Báo giá xây nhà phần thô và trọn gói | Xây Dựng Trung Nguyễn",
    description:
      "Đơn giá xây dựng phần thô 3.950.000đ/m² và xây nhà trọn gói 5.950.000đ/m². Bảng giá tham khảo, khảo sát miễn phí tại TP.HCM.",
  },
  "/thuoc-lo-ban": {
    title: "Thước lỗ ban online | Xây Dựng Trung Nguyễn",
    description: "Tra thước lỗ ban 52.2, 42.9 và 38.8 — kích thước tốt xấu cho cửa, bậc, bàn thờ. Công cụ tham khảo phong thủy.",
  },
  "/tin-tuc": {
    title: "Tin tức xây nhà, thiết kế, cải tạo | Xây Dựng Trung Nguyễn",
    description:
      "100 bài tin tức theo từ khóa: xây nhà trọn gói, tân cổ điển, phần thô 3.950.000đ/m², cải tạo và báo giá tại TP.HCM.",
  },
  "/lien-he": {
    title: "Liên hệ và đặt lịch khảo sát | Xây Dựng Trung Nguyễn",
    description: "Liên hệ Xây Dựng Trung Nguyễn: 0767 135 189 – 0977 359 439. 27/5 An Bình, phường Dĩ An, TP.HCM.",
  },
  "/tu-khoa": {
    title: "100 từ khóa xây nhà tân cổ điển, trọn gói, cải tạo | Xây Dựng Trung Nguyễn",
    description:
      "100 từ khóa phù hợp năng lực Xây Dựng Trung Nguyễn: xây nhà tân cổ điển, phần thô 3.950.000đ/m², trọn gói 5.950.000đ/m², thiết kế và cải tạo tại TP.HCM.",
  },
};

export function escapeAttr(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function pageUrl(path = "/") {
  if (!path || path === "/") return `${SITE_URL}/`;
  const encoded = String(path)
    .split("/")
    .map((seg) => encodeURIComponent(seg))
    .join("/");
  return `${SITE_URL}${encoded.startsWith("/") ? encoded : `/${encoded}`}`;
}

export function toIsoDate(date) {
  const match = String(date || "").match(/(\d{1,2})[/.](\d{1,2})[/.](\d{4})/);
  if (!match) return undefined;
  return `${match[3]}-${match[2].padStart(2, "0")}-${match[1].padStart(2, "0")}`;
}

export function absolutize(url) {
  if (!url) return DEFAULT_OG;
  if (/^https?:\/\//i.test(url)) return url;
  const path = url.startsWith("/") ? url : `/${url}`;
  return `${SITE_URL}${path}`;
}

export function excerptFromHtml(html, max = 158) {
  const text = String(html || "")
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/\s+/g, " ")
    .trim();
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1)}…`;
}

function upsertMeta(attr, key, value) {
  if (!value) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

function upsertLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]:not([hreflang])`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertHreflang(lang, href) {
  let el = document.head.querySelector(`link[rel="alternate"][hreflang="${lang}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", "alternate");
    el.setAttribute("hreflang", lang);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function upsertJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement("script");
    el.type = "application/ld+json";
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

export function localBusinessJson(site = {}, extras = {}) {
  const phone = String(site.phone || "0767135189").replace(/\D/g, "");
  const json = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: site.name || "Công ty TNHH Xây Dựng và Điện Lạnh Trung Nguyễn",
    alternateName: site.shortName || "Xây Dựng Trung Nguyễn",
    url: SITE_URL,
    logo: absolutize(site.logo || "/logo.png"),
    image: DEFAULT_OG,
    telephone: phone ? `+84${phone.replace(/^0/, "")}` : undefined,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address,
      addressLocality: "Dĩ An",
      addressRegion: "Hồ Chí Minh",
      addressCountry: "VN",
    },
    geo: site.map?.lat
      ? { "@type": "GeoCoordinates", latitude: site.map.lat, longitude: site.map.lng }
      : undefined,
    sameAs: [site.facebook, site.youtube, site.zalo].filter(Boolean),
    areaServed: ["TP. Hồ Chí Minh", "Bình Dương", "Đồng Nai"],
    priceRange: "$$",
    inLanguage: "vi-VN",
    knowsAbout: [
      "Xây nhà trọn gói",
      "Sửa chữa nhà",
      "Cải tạo, nâng cấp nhà",
      "Thi công nhà phố, biệt thự",
      "Thi công và hoàn thiện công trình dân dụng",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: phone ? `+84${phone.replace(/^0/, "")}` : "+84767135189",
      contactType: "customer service",
      areaServed: "VN",
      availableLanguage: "Vietnamese",
    },
    makesOffer: [
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Thiết kế kiến trúc và nội thất" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Xây dựng nhà phố, biệt thự" } },
      { "@type": "Offer", itemOffered: { "@type": "Service", name: "Cải tạo nhà" } },
    ],
  };
  if (extras.reviews?.length) {
    json.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: "5",
      bestRating: "5",
      reviewCount: String(extras.reviews.length),
    };
    json.review = extras.reviews.slice(0, 3).map((row) => ({
      "@type": "Review",
      author: { "@type": "Person", name: row.name },
      reviewBody: row.quote,
      reviewRating: { "@type": "Rating", ratingValue: "5", bestRating: "5" },
    }));
  }
  return json;
}

export function pageSeoFromCms(pathname, cms) {
  const path = pathname.replace(/\/+$/, "") || "/";
  const staticPage = PAGE_SEO[path];
  if (staticPage) {
    return {
      title: staticPage.title,
      description: staticPage.description,
      keywords: staticPage.keywords,
      path: staticPage.canonical || path,
      image: path === "/" ? cms.home?.poster || DEFAULT_OG : DEFAULT_OG,
      type: "website",
      reviews: path === "/" ? cms.reviews : undefined,
      pricePacks: path === "/bao-gia" ? cms.pricePacks : undefined,
      breadcrumbs:
        path === "/"
          ? []
          : [
              { name: "Trang chủ", path: "/" },
              { name: staticPage.title.split("|")[0].trim(), path },
            ],
    };
  }

  if (path.startsWith("/tu-khoa/")) {
    const item = findKeyword(path.slice("/tu-khoa/".length));
    if (!item) {
      return {
        title: "Không tìm thấy từ khóa | Xây Dựng Trung Nguyễn",
        description: PAGE_SEO["/tu-khoa"].description,
        path,
        noindex: true,
      };
    }
    const newsPath = keywordNewsPath(item);
    return {
      title: item.title,
      description: item.description,
      path: newsPath,
      image: item.image,
      type: "article",
      noindex: true,
      article: { title: item.phrase },
      faq: item.faqs,
      breadcrumbs: [
        { name: "Trang chủ", path: "/" },
        { name: "Tin tức", path: "/tin-tuc" },
        { name: item.phrase, path: newsPath },
      ],
    };
  }

  const slug = path.slice(1);
  if (!slug || slug.includes("/")) {
    return {
      title: "Không tìm thấy trang | Xây Dựng Trung Nguyễn",
      description: PAGE_SEO["/"].description,
      path,
      noindex: true,
    };
  }

  const post = typeof cms.findPost === "function" ? cms.findPost(slug) : null;
  if (!post || post.visible === false) {
    return {
      title: "Không tìm thấy bài viết | Xây Dựng Trung Nguyễn",
      description: "Nội dung không tồn tại hoặc đã được gỡ khỏi website Xây Dựng Trung Nguyễn.",
      path,
      noindex: true,
    };
  }

  const meta = typeof cms.kindOf === "function"
    ? cms.kindOf(slug)
    : { label: "Bài viết", path: "/mau-nha" };
  const rawTitle = (post.seoTitle || post.title || "").trim();
  const title = /Xây Dựng Trung Nguyễn/i.test(rawTitle) ? rawTitle : `${rawTitle} | Xây Dựng Trung Nguyễn`;
  const description = (
    post.seoDesc ||
    post.desc ||
    excerptFromHtml(post.html) ||
    PAGE_SEO["/"].description
  ).slice(0, 160);

  return {
    title,
    description,
    path,
    image: post.image,
    type: "article",
    noindex: !!post.noindex,
    article: { title: post.title, datePublished: toIsoDate(post.date) },
    faq: post.faqs,
    breadcrumbs: [
      { name: "Trang chủ", path: "/" },
      { name: meta.label, path: meta.path },
      { name: post.title, path },
    ],
  };
}

export function injectSeoIntoHtml(html, { title, description, path, image, type = "website", noindex = false, keywords }) {
  const url = path ? pageUrl(path) : "";
  const img = absolutize(image);
  const esc = escapeAttr;
  let out = html;
  out = out.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(title)}</title>`);
  out = out.replace(
    /<meta\s+name="description"[^>]*>/i,
    `<meta name="description" content="${esc(description)}" />`,
  );
  const tags = [
    ["name", "robots", noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"],
    ["name", "twitter:card", "summary_large_image"],
    ["property", "og:type", type],
    ["property", "og:locale", "vi_VN"],
    ["property", "og:site_name", "Xây Dựng Trung Nguyễn"],
    ["property", "og:title", title],
    ["property", "og:description", description],
    ["property", "og:image", img],
    ["property", "og:image:alt", title],
    ["property", "og:image:width", "1200"],
    ["property", "og:image:height", "630"],
    ["name", "twitter:title", title],
    ["name", "twitter:description", description],
    ["name", "twitter:image", img],
  ];
  if (url) {
    tags.push(["property", "og:url", url]);
  }
  if (keywords) tags.push(["name", "keywords", keywords]);
  for (const [attr, key, value] of tags) {
    const re = new RegExp(`<meta\\s+${attr}="${key}"[^>]*>`, "i");
    const tag = `<meta ${attr}="${key}" content="${esc(value)}" />`;
    out = re.test(out) ? out.replace(re, tag) : out.replace("</head>", `    ${tag}\n  </head>`);
  }
  if (url) {
    if (/<link\s+rel="canonical"/i.test(out)) {
      out = out.replace(/<link\s+rel="canonical"[^>]*>/i, `<link rel="canonical" href="${esc(url)}" />`);
    } else {
      out = out.replace("</head>", `    <link rel="canonical" href="${esc(url)}" />\n  </head>`);
    }
    out = out.replace(/<link\s+rel="alternate"\s+hreflang="vi"[^>]*>/i, `<link rel="alternate" hreflang="vi" href="${esc(url)}" />`);
    out = out.replace(
      /<link\s+rel="alternate"\s+hreflang="x-default"[^>]*>/i,
      `<link rel="alternate" hreflang="x-default" href="${esc(url)}" />`,
    );
  }
  if (!url) {
    out = out.replace(/<link\s+rel="canonical"[^>]*>/i, "");
    out = out.replace(/<link\s+rel="alternate"[^>]*>/gi, "");
  }
  if (!keywords) {
    out = out.replace(/<meta\s+name="keywords"[^>]*>/i, "");
  }
  return out;
}

export function seoArticleHtml({ title, keyword }) {
  const kw = String(keyword || title || "").trim();
  return `<p><strong>${kw}</strong> là nhu cầu nhiều gia chủ tại TP.HCM tìm đến Công ty TNHH Xây Dựng và Điện Lạnh Trung Nguyễn. Bài viết nêu khi nào nên làm, quy trình khảo sát — thiết kế — thi công, và cách nhận báo giá minh bạch.</p>
<nav class="toc"><strong>Mục lục</strong>
<ol>
<li><a href="#phu-hop">${kw} phù hợp khi nào?</a></li>
<li><a href="#quy-trinh">Quy trình làm việc</a></li>
<li><a href="#chi-phi">Chi phí tham khảo</a></li>
</ol>
</nav>
<h2 id="phu-hop">${kw} phù hợp khi nào?</h2>
<p>Gia chủ nên làm rõ hiện trạng đất/nhà, công năng từng tầng, ngân sách và tiến độ trước khi chốt phương án. Xây Dựng Trung Nguyễn khảo sát tại chỗ, tư vấn hướng nhà, kết cấu và vật tư — không bán thầu.</p>
<h2 id="quy-trinh">Quy trình làm việc</h2>
<p>1. Khảo sát và trao đổi nhu cầu. 2. Phác thảo mặt bằng / phối cảnh (nếu thuộc thiết kế). 3. Báo giá theo m² hoặc hạng mục. 4. Thi công, giám sát, bàn giao. Bạn có thể đặt lịch tại trang liên hệ.</p>
<h2 id="chi-phi">Chi phí tham khảo</h2>
<p>Đơn giá xây phần thô và nhà trọn gói được niêm yết tại trang báo giá. Mỗi công trình ${kw} vẫn cần đo đạc thực tế vì móng, số tầng và hoàn thiện làm thay đổi dự toán.</p>
<h2>Câu hỏi thường gặp về ${kw}</h2>
<h3>Khảo sát có mất phí không?</h3>
<p>Khảo sát nhà tại TP.HCM được Xây Dựng Trung Nguyễn hỗ trợ theo lịch hẹn. Mang theo sổ hồng / bản vẽ hiện trạng nếu có để tư vấn chính xác hơn.</p>
<h3>Thi công mất bao lâu?</h3>
<p>Tiến độ phụ thuộc diện tích, số tầng và phạm vi ${kw}. Sau khảo sát, bạn nhận mốc thời gian theo giai đoạn phần thô và hoàn thiện.</p>
<p>Xem thêm <a href="/bao-gia">bảng báo giá</a>, <a href="/mau-nha">mẫu nhà</a> và <a href="https://dichvucong.gov.vn">Cổng Dịch vụ công Quốc gia</a> nếu cần thủ tục pháp lý.</p>
<p><img src="/villas/neo-01.jpg" alt="${kw}" /></p>
<p><img src="/villas/neo-07.jpg" alt="${kw} — công trình Xây Dựng Trung Nguyễn" /></p>
<p><img src="/villas/neo-11.jpg" alt="Mẫu nhà liên quan ${kw}" /></p>
<p><img src="/services/xay-dung.jpg" alt="Thi công ${kw} tại TP.HCM" /></p>`;
}

function parsePrice(text) {
  const digits = String(text || "").split("/")[0].replace(/\D/g, "");
  return digits ? Number(digits) : undefined;
}

export function priceOffersJson(packs = []) {
  const services = packs
    .map((pack) => ({ pack, price: parsePrice(pack.price) }))
    .filter(({ price }) => price)
    .map(({ pack, price }) => ({
      "@type": "Service",
      name: pack.title,
      description: pack.lead,
      serviceType: pack.tag,
      areaServed: ["TP. Hồ Chí Minh", "Bình Dương", "Đồng Nai"],
      provider: { "@type": "HomeAndConstructionBusiness", name: "Xây Dựng Trung Nguyễn", url: SITE_URL },
      offers: {
        "@type": "Offer",
        priceCurrency: "VND",
        priceSpecification: {
          "@type": "UnitPriceSpecification",
          price,
          priceCurrency: "VND",
          unitText: "m²",
          ...(/^\s*từ/i.test(pack.price) ? { minPrice: price } : {}),
        },
        url: `${SITE_URL}/bao-gia`,
      },
    }));
  if (!services.length) return null;
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Bảng báo giá xây dựng Trung Nguyễn",
    itemListElement: services.map((item, i) => ({ "@type": "ListItem", position: i + 1, item })),
  };
}

export function applySeo({ title, description, path, image, type = "website", noindex = false, breadcrumbs, article, site, faq, reviews, keywords, pricePacks }) {
  const url = pageUrl(path);
  const img = absolutize(image);
  document.title = title;
  upsertMeta("name", "description", description);
  if (keywords) upsertMeta("name", "keywords", keywords);
  else document.head.querySelector('meta[name="keywords"]')?.remove();
  upsertMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large");
  upsertMeta("property", "og:type", type);
  upsertMeta("property", "og:locale", "vi_VN");
  upsertMeta("property", "og:site_name", "Xây Dựng Trung Nguyễn");
  upsertMeta("property", "og:title", title);
  upsertMeta("property", "og:description", description);
  upsertMeta("property", "og:url", url);
  upsertMeta("property", "og:image", img);
  upsertMeta("property", "og:image:alt", title);
  upsertMeta("property", "og:image:width", "1200");
  upsertMeta("property", "og:image:height", "630");
  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:title", title);
  upsertMeta("name", "twitter:description", description);
  upsertMeta("name", "twitter:image", img);
  if (article?.datePublished) upsertMeta("property", "article:published_time", article.datePublished);
  else document.head.querySelector('meta[property="article:published_time"]')?.remove();
  upsertLink("canonical", url);
  upsertHreflang("vi", url);
  upsertHreflang("x-default", url);

  if (site) upsertJsonLd("ld-org", localBusinessJson(site, { reviews: path === "/" ? reviews : undefined }));
  upsertJsonLd("ld-website", {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Xây Dựng Trung Nguyễn",
    url: SITE_URL,
    inLanguage: "vi-VN",
    publisher: { "@type": "Organization", name: "Công ty TNHH Xây Dựng và Điện Lạnh Trung Nguyễn" },
  });

  if (breadcrumbs?.length > 1) {
    upsertJsonLd("ld-breadcrumb", {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        item: pageUrl(item.path),
      })),
    });
  } else {
    document.getElementById("ld-breadcrumb")?.remove();
  }

  if (article) {
    upsertJsonLd("ld-article", {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.title,
      image: img,
      inLanguage: "vi-VN",
      datePublished: article.datePublished,
      dateModified: article.datePublished,
      mainEntityOfPage: url,
      author: { "@type": "Organization", name: "Xây Dựng Trung Nguyễn" },
      publisher: {
        "@type": "Organization",
        name: "Xây Dựng Trung Nguyễn",
        logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
      },
    });
  } else {
    document.getElementById("ld-article")?.remove();
  }

  if (faq?.length) {
    upsertJsonLd("ld-faq", {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((row) => ({
        "@type": "Question",
        name: row.q,
        acceptedAnswer: { "@type": "Answer", text: row.a },
      })),
    });
  } else {
    document.getElementById("ld-faq")?.remove();
  }

  const offers = pricePacks?.length ? priceOffersJson(pricePacks) : null;
  if (offers) upsertJsonLd("ld-offers", offers);
  else document.getElementById("ld-offers")?.remove();
}
