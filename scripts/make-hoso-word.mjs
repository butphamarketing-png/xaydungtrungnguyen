import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import {
  AlignmentType,
  BorderStyle,
  Document,
  Footer,
  Header,
  HeadingLevel,
  Packer,
  PageNumber,
  Paragraph,
  ShadingType,
  Table,
  TableCell,
  TableRow,
  TextRun,
  VerticalAlign,
  WidthType,
} from "docx";

const require = createRequire(import.meta.url);
const data = require("../src/data/content.json");
const { site, projects, products, services, news } = data;

const GOLD = "B08A4A";
const INK = "1A1410";
const MUTED = "5A4E42";
const CREAM = "F3EAD8";
const WHITE = "FFFFFF";
const THIN = { style: BorderStyle.SINGLE, size: 4, color: "D4C4A4" };
const NONE = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const NO_BORDERS = { top: NONE, bottom: NONE, left: NONE, right: NONE };

function run(text, opts = {}) {
  return new TextRun({
    text,
    font: opts.font || "Calibri",
    size: opts.size || 22,
    bold: !!opts.bold,
    italics: !!opts.italics,
    color: opts.color || INK,
  });
}

function p(text, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after ?? 160, before: opts.before ?? 0, line: opts.line ?? 276 },
    alignment: opts.align || AlignmentType.LEFT,
    children: [run(text, opts)],
  });
}

function heading(text, level = HeadingLevel.HEADING_1) {
  return new Paragraph({
    heading: level,
    spacing: { before: 360, after: 160 },
    border:
      level === HeadingLevel.HEADING_1
        ? { bottom: { style: BorderStyle.SINGLE, size: 12, color: GOLD, space: 4 } }
        : undefined,
    children: [
      new TextRun({
        text,
        font: "Calibri",
        bold: true,
        color: GOLD,
        size: level === HeadingLevel.HEADING_1 ? 32 : 26,
      }),
    ],
  });
}

function cell(text, opts = {}) {
  return new TableCell({
    width: { size: opts.width || 4500, type: WidthType.DXA },
    shading: opts.fill ? { type: ShadingType.CLEAR, fill: opts.fill } : undefined,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    verticalAlign: VerticalAlign.CENTER,
    children: [
      new Paragraph({
        children: [run(text, { bold: opts.bold, size: opts.size || 20, color: opts.color || INK })],
      }),
    ],
  });
}

function infoTable(rows) {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [2800, 6560],
    rows: rows.map(([k, v]) => new TableRow({ children: [cell(k, { bold: true, fill: CREAM, width: 2800 }), cell(v, { width: 6560 })] })),
  });
}

function priceTable() {
  const packs = [
    ["Xây dựng phần thô", "3.500.000đ/m²", "Móng – khung – mái, điện nước âm tường, vật tư cam kết"],
    ["Thi công hoàn thiện", "Từ 1.300.000đ/m²", "Sơn – lát – ốp, điện nước hoàn thiện, thiết bị theo lựa chọn"],
    ["Xây nhà trọn gói", "Từ 5.050.000đ/m²", "Thiết kế → xin phép → thi công → hoàn thiện → bàn giao chìa khóa"],
  ];
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [2800, 2400, 4160],
    rows: [
      new TableRow({
        children: [
          cell("Hạng mục", { bold: true, fill: GOLD, color: WHITE, width: 2800 }),
          cell("Đơn giá", { bold: true, fill: GOLD, color: WHITE, width: 2400 }),
          cell("Nội dung", { bold: true, fill: GOLD, color: WHITE, width: 4160 }),
        ],
      }),
      ...packs.map((row) => new TableRow({ children: row.map((t, i) => cell(t, { width: [2800, 2400, 4160][i], fill: i === 0 ? CREAM : WHITE })) })),
    ],
  });
}

function bullet(text) {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { after: 80 },
    children: [run(text, { size: 21 })],
  });
}

const aboutBody = String(site.aboutHtml || "")
  .replace(/<br\s*\/?>/gi, "\n")
  .replace(/<\/p>/gi, "\n")
  .replace(/<[^>]+>/g, " ")
  .replace(/&nbsp;/g, " ")
  .replace(/&amp;/g, "&")
  .replace(/\s+\n/g, "\n")
  .replace(/\n{3,}/g, "\n\n")
  .replace(/[ \t]{2,}/g, " ")
  .trim();

const aboutParas = aboutBody
  .split(/\n+/)
  .map((s) => s.trim())
  .filter((s) => s.length > 20 && !/^Kiến trúc xây dựng việt dũng phát$/i.test(s));

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: "Calibri", size: 22, color: INK } },
    },
  },
  sections: [
    {
      properties: {
        page: { margin: { top: 900, bottom: 900, left: 1080, right: 1080 } },
      },
      headers: {
        default: new Header({
          children: [
            new Paragraph({
              border: { bottom: { style: BorderStyle.SINGLE, size: 8, color: GOLD, space: 6 } },
              spacing: { after: 200 },
              children: [
                run("CÔNG TY TNHH KIẾN TRÚC XÂY DỰNG VIỆT DŨNG PHÁT", { size: 16, bold: true, color: GOLD }),
                run("    |    Hồ sơ năng lực", { size: 16, color: MUTED }),
              ],
            }),
          ],
        }),
      },
      footers: {
        default: new Footer({
          children: [
            new Paragraph({
              alignment: AlignmentType.CENTER,
              border: { top: { style: BorderStyle.SINGLE, size: 6, color: GOLD, space: 8 } },
              children: [
                run("vietdungphat.vercel.app  ·  ", { size: 16, color: MUTED }),
                run(site.phone, { size: 16, color: MUTED }),
                run("  ·  Trang ", { size: 16, color: MUTED }),
                new TextRun({ children: [PageNumber.CURRENT], font: "Calibri", size: 16, color: MUTED }),
              ],
            }),
          ],
        }),
      },
      children: [
        p("HỒ SƠ NĂNG LỰC", { size: 20, bold: true, color: GOLD, align: AlignmentType.CENTER, after: 40 }),
        p(site.name, { size: 44, bold: true, align: AlignmentType.CENTER, after: 80 }),
        p("Thiết kế · Xây dựng · Cải tạo · Nội thất", { size: 22, italics: true, color: MUTED, align: AlignmentType.CENTER, after: 280 }),

        heading("1. Thông tin doanh nghiệp"),
        infoTable([
          ["Tên công ty", site.name],
          ["Thương hiệu", site.shortName],
          ["Điện thoại", site.phone],
          ["Hotline", site.hotline],
          ["Email", site.email],
          ["Trụ sở", site.address],
          ["Showroom", site.showroom],
          ["Xưởng", site.workshop],
          ["Website", "https://vietdungphat.vercel.app/"],
          ["Facebook", site.facebook],
          ["Zalo", site.zalo],
          ["YouTube", site.youtube],
        ]),

        heading("2. Giới thiệu"),
        p(
          "Công ty TNHH Kiến trúc Xây dựng Việt Dũng Phát đồng hành thiết kế, xây dựng và cải tạo nhà ở tại TP.HCM và các tỉnh lân cận. Đội ngũ thi công trực tiếp, không bán thầu; vật tư và tiến độ được cam kết minh bạch.",
          { size: 22 }
        ),
        ...aboutParas.slice(0, 12).map((t) => p(t, { size: 21, after: 140 })),

        heading("3. Lĩnh vực hoạt động"),
        ...site.fields.map((f) => bullet(f)),
        bullet("Sản xuất, phân phối và lắp đặt nội thất, đồ trang trí, thiết bị – phụ kiện."),

        heading("4. Dịch vụ chính trên website"),
        bullet("Thiết kế: kiến trúc và nội thất nhà phố, biệt thự, căn hộ — hồ sơ đầy đủ để thi công."),
        bullet("Xây dựng: phần thô đến chìa khóa trao tay, giám sát tại công trình, không bán thầu."),
        bullet("Cải tạo: sửa chữa, nâng cấp nhà cũ — kết cấu, hoàn thiện và nội thất."),
        p("Các bài dịch vụ gốc:", { bold: true, after: 80, before: 160 }),
        ...services.map((s) => bullet(s.title)),

        heading("5. Báo giá tham khảo"),
        p("Đơn giá theo m² mang tính tham khảo. Báo giá thực tế sau khảo sát hiện trạng, phong cách và vật tư.", { size: 21 }),
        priceTable(),
        p("Trên website có công cụ tính diện tích và chi phí xây dựng tại mục Báo giá.", { size: 20, italics: true, color: MUTED, before: 160 }),

        heading("6. Cam kết"),
        bullet("Tin cậy: thiết kế và thi công nhà phố, biệt thự tại TP.HCM, Bình Dương, Đồng Nai và các tỉnh lân cận."),
        bullet("Cam kết chất lượng – tiến độ; không bán thầu."),
        bullet("Minh bạch vật tư và tài chính."),
        bullet("An toàn lao động theo tiêu chuẩn thi công."),
        bullet("Tôn trọng pháp luật, khách hàng, đối tác và người lao động."),

        heading("7. Website"),
        p("Website mới (Vite/React) giữ nguyên nội dung gốc từ vietdungphat.com, giao diện editorial sáng, hero video, đặt lịch hẹn tư vấn và thước lỗ ban.", { size: 21 }),
        ...[
          ["Trang chủ", "https://vietdungphat.vercel.app/"],
          ["Giới thiệu", "https://vietdungphat.vercel.app/gioi-thieu"],
          ["Dịch vụ", "https://vietdungphat.vercel.app/dich-vu"],
          ["Mẫu nhà", "https://vietdungphat.vercel.app/mau-nha"],
          ["Sản phẩm", "https://vietdungphat.vercel.app/san-pham"],
          ["Báo giá", "https://vietdungphat.vercel.app/bao-gia"],
          ["Thước lỗ ban", "https://vietdungphat.vercel.app/thuoc-lo-ban"],
          ["Tin tức", "https://vietdungphat.vercel.app/tin-tuc"],
          ["Liên hệ", "https://vietdungphat.vercel.app/lien-he"],
        ].map(([k, v]) => bullet(`${k}: ${v}`)),
        p(`Kho nội dung: ${projects.length} mẫu nhà · ${products.length} sản phẩm · ${services.length} bài dịch vụ · ${news.length} tin tức.`, { before: 120, bold: true }),

        heading("8. Danh mục mẫu nhà"),
        ...projects.map((proj, i) => bullet(`${i + 1}. ${proj.title}`)),

        heading("9. Sản phẩm nội thất"),
        ...products.map((item, i) => bullet(`${i + 1}. ${item.title}`)),

        heading("10. Liên hệ tư vấn"),
        p(`Quý khách vui lòng gọi ${site.phone} hoặc gửi email ${site.email}. Có thể đặt lịch hẹn tư vấn ngay trên website.`, { size: 22 }),
        p("Đơn giá trên hồ sơ chỉ mang tính tham khảo. Chi phí thực tế được xác định theo diện tích, hiện trạng, phong cách thiết kế và vật tư lựa chọn.", { size: 20, italics: true, color: MUTED, before: 200 }),
      ],
    },
  ],
});

const outDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const fileName = "Ho-so-nang-luc-Viet-Dung-Phat.docx";
const dests = [path.join(outDir, fileName), path.join(process.env.USERPROFILE, "Desktop", fileName)];

const buf = await Packer.toBuffer(doc);
for (const dest of dests) {
  try {
    fs.writeFileSync(dest, buf);
    console.log("Wrote", dest);
  } catch (err) {
    console.error("Skip", dest, err.message);
  }
}
