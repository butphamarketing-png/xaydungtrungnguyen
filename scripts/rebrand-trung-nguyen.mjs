import fs from "fs";
import path from "path";

const COMPANY = "Công ty TNHH Xây Dựng và Điện Lạnh Trung Nguyễn";
const SHORT = "Xây Dựng Trung Nguyễn";
const ADDRESS = "27/5 An Bình, phường Dĩ An, TP.HCM";
const FANPAGE = "Xây Dựng Trung Nguyễn – Xây Dựng & Cải Tạo Nhà Trọn Gói";

function rebrandText(input) {
  const holds = [];
  let t = String(input).replace(/https?:\/\/[^"'\\\s<]+/gi, (m) => {
    if (/weserv\.nl|\/upload\/|\.(jpe?g|png|webp|gif|mp4)(\?|#|$)/i.test(m)) {
      holds.push(m);
      return `\u0000${holds.length - 1}\u0000`;
    }
    return m;
  });
  t = t.replace(/Công ty TNHH\s+Kiến trúc Xây dựng Việt Dũng Phát/gi, COMPANY);
  t = t.replace(/KIẾN TRÚC\s+Việt Dũng Phát/g, SHORT);
  t = t.replace(/Việt Dũng Phát/g, SHORT);
  t = t.replace(/VIỆT DŨNG PHÁT/g, "XÂY DỰNG TRUNG NGUYÊN");
  t = t.replace(/việt dũng phát/gi, SHORT);
  t = t.replace(/Viet Dung Phat/gi, "Trung Nguyen");
  t = t.replace(/vietdungphatconstruction@gmail\.com/gi, "");
  t = t.replace(/098\.4444\.504/g, "0767 135 189");
  t = t.replace(/0984444504/g, "0767135189");
  t = t.replace(/\+84984444504/g, "+84767135189");
  t = t.replace(/08 6857 7057/g, "0767 135 189 – 0977 359 439");
  t = t.replace(/942\/2\/7 Kha Vạn Cân, KP 2, Phường Trường Thọ, Tp\. Thủ Đức/g, ADDRESS);
  t = t.replace(/website chính thức vietdungphat\.com/gi, "tại phường Dĩ An, TP.HCM");
  t = t.replace(/https?:\/\/(www\.)?facebook\.com\/vietdungphat\/?/gi, "#");
  t = t.replace(/https?:\/\/(www\.)?youtube\.com\/@vietdungphat\d*/gi, "#");
  t = t.replace(/https?:\/\/m\.me\/vietdungphat/gi, "#");
  t = t.replace(/vietdungphat\.com/gi, "xaydungtrungnguyen.com");
  return t.replace(/\u0000(\d+)\u0000/g, (_, i) => holds[Number(i)]);
}

function walk(value) {
  if (typeof value === "string") return rebrandText(value);
  if (Array.isArray(value)) return value.map(walk);
  if (value && typeof value === "object") {
    const out = {};
    for (const key of Object.keys(value)) out[key] = walk(value[key]);
    return out;
  }
  return value;
}

const contentPath = "src/data/content.json";
const data = walk(JSON.parse(fs.readFileSync(contentPath, "utf8")));
data.site.name = COMPANY;
data.site.shortName = SHORT;
data.site.tagline = "Uy tín – Chất lượng – Tận tâm";
data.site.hotline = "0767 135 189 – 0977 359 439";
data.site.phone = "0767 135 189";
data.site.email = "";
data.site.address = ADDRESS;
data.site.showroom = "";
data.site.workshop = "";
data.site.facebook = "";
data.site.messenger = "";
data.site.fanpage = FANPAGE;
data.site.zalo = "https://zalo.me/0767135189";
data.site.youtube = "";
data.site.logo = "/logo.png";
data.site.profilePdf = "";
data.site.map = {};
data.site.aboutIntro = [
  `${SHORT} là thương hiệu của ${COMPANY}, đóng tại ${ADDRESS}. Chúng tôi nhận xây nhà trọn gói, sửa chữa, cải tạo – nâng cấp, thi công nhà phố, biệt thự và hoàn thiện công trình dân dụng. Phương châm: Uy tín – Chất lượng – Tận tâm.`,
];
data.site.fields = [
  "Xây nhà trọn gói.",
  "Sửa chữa nhà.",
  "Cải tạo, nâng cấp nhà.",
  "Thi công nhà phố, biệt thự.",
  "Thi công và hoàn thiện công trình dân dụng.",
];
data.site.aboutHtml = `<div class="detail">
<h2>${SHORT}</h2>
<p><strong>${COMPANY}</strong> hoạt động trong lĩnh vực xây dựng dân dụng tại TP.HCM, với văn phòng tại ${ADDRESS}.</p>
<p>Slogan: <strong>Uy tín – Chất lượng – Tận tâm.</strong> Fanpage: ${FANPAGE}</p>
<h3>Dịch vụ</h3>
<ul>
<li>Xây nhà trọn gói, từ khảo sát đến bàn giao.</li>
<li>Sửa chữa nhà: chống thấm, điện nước, hoàn thiện lại hạng mục xuống cấp.</li>
<li>Cải tạo, nâng cấp nhà: cơi nới, nâng tầng, đổi công năng.</li>
<li>Thi công nhà phố, biệt thự theo hồ sơ và hiện trạng.</li>
<li>Thi công và hoàn thiện công trình dân dụng.</li>
</ul>
<p>Hotline: <a href="tel:0767135189">0767 135 189</a> – <a href="tel:0977359439">0977 359 439</a>.</p>
</div>`;
fs.writeFileSync(contentPath, JSON.stringify(data));

for (const file of ["src/data/keyword-news.json", "src/data/keyword-articles.json"]) {
  if (!fs.existsSync(file)) continue;
  const json = walk(JSON.parse(fs.readFileSync(file, "utf8")));
  fs.writeFileSync(file, JSON.stringify(json));
}

function rebrandCode(input) {
  let t = input;
  t = t.replace(/Công ty TNHH\s+Kiến trúc Xây dựng Việt Dũng Phát/gi, COMPANY);
  t = t.replace(/KIẾN TRÚC\s+Việt Dũng Phát/g, SHORT);
  t = t.replace(/Việt Dũng Phát/g, SHORT);
  t = t.replace(/VIỆT DŨNG PHÁT/g, "XÂY DỰNG TRUNG NGUYÊN");
  t = t.replace(/việt dũng phát/gi, SHORT);
  t = t.replace(/Viet Dung Phat/g, "Trung Nguyen");
  t = t.replace(/vietdungphatconstruction@gmail\.com/gi, "");
  t = t.replace(/admin@vietdungphat\.com/gi, "admin@xaydungtrungnguyen.com");
  t = t.replace(/098\.4444\.504/g, "0767 135 189");
  t = t.replace(/0984444504/g, "0767135189");
  t = t.replace(/\+84984444504/g, "+84767135189");
  t = t.replace(/942\/2\/7 Kha Vạn Cân, KP 2, Phường Trường Thọ, Tp\. Thủ Đức/g, ADDRESS);
  t = t.replace(/https?:\/\/(www\.)?vietdungphat\.com/gi, "https://xaydungtrungnguyen.com");
  return t;
}

function walkDir(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (["node_modules", "dist", ".git"].includes(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walkDir(full, acc);
    else if (/\.(js|jsx|html|md|css)$/.test(entry.name)) acc.push(full);
  }
  return acc;
}

const skip = new Set([
  path.normalize("src/lib/media.js"),
  path.normalize("scripts/rebrand-trung-nguyen.mjs"),
]);

for (const file of walkDir(".")) {
  const rel = path.normalize(file);
  if (skip.has(rel)) continue;
  if (rel.includes(`${path.sep}data${path.sep}`)) continue;
  const before = fs.readFileSync(file, "utf8");
  const after = rebrandCode(before);
  if (after !== before) fs.writeFileSync(file, after);
}

console.log("rebranded", data.projects.length, "projects");
