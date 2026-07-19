(() => {
  const MAX_EDGE = 2000;
  const MAX_BYTES = 3 * 1024 * 1024;
  const JPEG_QUALITY = 0.82;

  const EXAMPLE_CATEGORIES = [
    { title: "中式漢服", description: "在傳統與現代之間，找到屬於你的東方韻味。" },
    { title: "日式和服", description: "和服的溫柔，也在你放鬆下來的那個瞬間。" },
    { title: "創作攝影", description: "當影像不只是拍照，而是只有你能演繹的故事。" },
    { title: "美式風格", description: "復古、自由、一點帥氣，像電影劇照一樣的氛圍。" }
  ];

  const categoriesEl = document.getElementById("categories");
  const addCategoryBtn = document.getElementById("add-category");
  const form = document.getElementById("brief-form");
  const statusEl = document.getElementById("status");
  const generateBtn = document.getElementById("generate-btn");

  let categorySeq = 0;

  function setStatus(text) {
    statusEl.textContent = text;
  }

  function lines(text) {
    return String(text || "")
      .split(/\r?\n/)
      .map((s) => s.trim())
      .filter(Boolean);
  }

  function safeName(name, fallback) {
    const base = (name || fallback || "image")
      .replace(/\.[^.]+$/, "")
      .normalize("NFKD")
      .replace(/[^\w\-]+/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 40);
    return base || fallback || "image";
  }

  function slugFromTitle(title, index) {
    const slug = safeName(title, "");
    if (slug && /[a-zA-Z0-9]/.test(slug)) return slug.toLowerCase();
    return `category-${index + 1}`;
  }

  function updateFileStatus(statusEl, input) {
    const files = [...(input.files || [])];
    if (!files.length) {
      statusEl.textContent = "";
      statusEl.className = "file-status";
      return;
    }
    const totalMb = files.reduce((sum, f) => sum + f.size, 0) / (1024 * 1024);
    const big = files.filter((f) => f.size > MAX_BYTES).length;
    statusEl.className = `file-status ${big ? "warn" : "ok"}`;
    statusEl.textContent = big
      ? `已選 ${files.length} 張（約 ${totalMb.toFixed(1)} MB），其中 ${big} 張偏大，產生 ZIP 時會自動壓縮`
      : `已選 ${files.length} 張（約 ${totalMb.toFixed(1)} MB）`;
  }

  function bindStatus(input, statusEl) {
    input.addEventListener("change", () => updateFileStatus(statusEl, input));
  }

  function addCategoryRow(preset = {}) {
    const id = `cat-${++categorySeq}`;
    const row = document.createElement("div");
    row.className = "cat-row";
    row.dataset.catId = id;
    row.innerHTML = `
      <div class="cat-row-head">
        <strong>分類 ${categorySeq}</strong>
        <button type="button" class="btn-remove" data-action="remove">移除</button>
      </div>
      <div class="cat-row-fields">
        <label>分類名稱*
          <input class="cat-title" required placeholder="例：情侶寫真、風景、產品…" value="${preset.title || ""}" />
        </label>
        <label>一句描述*
          <input class="cat-desc" required placeholder="例：用影像留下兩人最自然的樣子。" value="${preset.description || ""}" />
        </label>
      </div>
      <label class="upload">這個分類的封面圖*
        <input type="file" class="cat-cover" accept="image/*" required />
        <span class="file-status"></span>
      </label>
    `;
    categoriesEl.appendChild(row);

    const coverInput = row.querySelector(".cat-cover");
    const status = row.querySelector(".file-status");
    bindStatus(coverInput, status);

    row.querySelector('[data-action="remove"]').addEventListener("click", () => {
      if (categoriesEl.children.length <= 1) {
        setStatus("至少保留一個作品分類。");
        return;
      }
      row.remove();
      renumberCategories();
    });
  }

  function renumberCategories() {
    [...categoriesEl.querySelectorAll(".cat-row")].forEach((row, index) => {
      row.querySelector("strong").textContent = `分類 ${index + 1}`;
    });
  }

  function getCategoryRows() {
    return [...categoriesEl.querySelectorAll(".cat-row")].map((row, index) => {
      const title = row.querySelector(".cat-title").value.trim();
      const description = row.querySelector(".cat-desc").value.trim();
      const coverInput = row.querySelector(".cat-cover");
      return {
        index,
        title,
        description,
        id: slugFromTitle(title, index),
        coverFile: coverInput.files?.[0] || null
      };
    });
  }

  // 預設給兩列空白範例提示（可改、可刪、可再加）
  addCategoryRow(EXAMPLE_CATEGORIES[0]);
  addCategoryRow(EXAMPLE_CATEGORIES[1]);
  addCategoryBtn.addEventListener("click", () => addCategoryRow());

  const fixedInputs = {
    hero: document.getElementById("file-hero"),
    featured: document.getElementById("file-featured"),
    "about-main": document.getElementById("file-about-main"),
    "about-detail": document.getElementById("file-about-detail")
  };

  Object.entries(fixedInputs).forEach(([key, input]) => {
    const status = document.querySelector(`.file-status[data-for="${key}"]`);
    bindStatus(input, status);
  });

  function loadImage(file) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const img = new Image();
      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };
      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error(`無法讀取圖片：${file.name}`));
      };
      img.src = url;
    });
  }

  async function compressImage(file) {
    const img = await loadImage(file);
    const scale = Math.min(1, MAX_EDGE / Math.max(img.width, img.height));
    const width = Math.max(1, Math.round(img.width * scale));
    const height = Math.max(1, Math.round(img.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);

    let quality = JPEG_QUALITY;
    let blob = await canvasToBlob(canvas, "image/jpeg", quality);
    while (blob.size > MAX_BYTES && quality > 0.5) {
      quality -= 0.08;
      blob = await canvasToBlob(canvas, "image/jpeg", quality);
    }

    return {
      blob,
      width,
      height,
      originalName: file.name,
      originalSize: file.size,
      compressedSize: blob.size,
      wasCompressed: blob.size < file.size || scale < 1
    };
  }

  function canvasToBlob(canvas, type, quality) {
    return new Promise((resolve) => canvas.toBlob(resolve, type, quality));
  }

  async function processFileList(fileList) {
    const out = [];
    for (const file of [...fileList]) {
      out.push(await compressImage(file));
    }
    return out;
  }

  function buildAbout(data) {
    if (data.aboutLong.trim()) return data.aboutLong.trim();
    const parts = [
      `嗨，我是 ${data.photographer}，一名熱愛影像的攝影師。`,
      data.oneLiner ? `我希望客人記得：${data.oneLiner}` : "",
      data.career || data.years || data.area
        ? `目前以${data.career || "攝影"}為主${data.years ? `，約 ${data.years}` : ""}${data.area ? `，服務地區：${data.area}` : ""}。`
        : "",
      "我喜歡捕捉真實情感，相信每個人都有屬於自己的故事；我的任務，就是用影像替你保存那些美好瞬間。"
    ];
    return parts.filter(Boolean).join("\n\n");
  }

  function buildBriefMarkdown(data, inventory, checklist) {
    const cats = data.categories
      .map((c) => {
        const cover = c.coverPath || "(尚未提供)";
        return `### ${c.title}\n- id: ${c.id}\n- description: ${c.description || "(待補)"}\n- cover: ${cover}`;
      })
      .join("\n\n");

    const featuredList = inventory.featured
      .map((f, i) => `  - photos/featured/${String(i + 1).padStart(2, "0")}.jpg  (${f.originalName})`)
      .join("\n");

    return `# Photographer Website Brief

> 本檔由「攝影師需求收集包」本機工具產生。請 AI 直接依此更新網站。
> 作品分類為使用者自訂，請勿強制改成漢服／和服等預設分類。

## Brand
- name_zh: ${data.nameZh}
- name_en: ${data.nameEn || data.nameZh}
- photographer_name: ${data.photographer}
- tagline: ${data.tagline}
- tone: ${data.tone}${data.toneNote ? `（${data.toneNote}）` : ""}

## Categories (custom)
${cats || "(尚未新增分類)"}

## About
- career: ${data.career}
- years: ${data.years || "(未填)"}
- area: ${data.area || "(未填)"}
- one_liner: ${data.oneLiner || "(未填)"}
- short: 嗨，我是 ${data.photographer}，職業／人像攝影師。
- long: |
${buildAbout(data)
  .split("\n")
  .map((line) => `  ${line}`)
  .join("\n")}

## Social
- instagram:
${lines(data.instagram)
  .map((x) => `  - ${x}`)
  .join("\n") || "  - (未填)"}
- facebook:
${lines(data.facebook)
  .map((x) => `  - ${x}`)
  .join("\n") || "  - (未填)"}
- threads:
${lines(data.threads)
  .map((x) => `  - ${x}`)
  .join("\n") || "  - (未填)"}
- other_contact: ${data.otherContact || "(未填)"}
- footer_mode: ${data.footerMode}
- contact_preference: ${data.contactPrefer}
- pricing_on_site: ${data.pricing}

## Photos inventory
- hero: ${inventory.hero ? "photos/hero/hero-01.jpg" : "(缺少)"}
- categories:
${data.categories
  .map((c) => `  - ${c.id} (${c.title}): ${c.coverPath || "(缺少)"}`)
  .join("\n")}
- featured:
${featuredList || "  - (缺少)"}
- about_main: ${inventory.aboutMain ? "photos/about/about-main.jpg" : "(缺少)"}
- about_detail: ${inventory.aboutDetail ? "photos/about/about-detail.jpg" : "(選填未提供)"}

## Compression notes
${inventory.compressionNotes.join("\n") || "- (無)"}

## Notes for AI
- 請依本 BRIEF 的「自訂分類」更新 content/site.ts，分類名稱與數量以本檔為準
- 封面圖路徑見 photos/categories/
- 保持暖色大地色調；照片預設染色，hover／點擊還原
- 精選區右→左無限輪播；手機版獨立排版
- 部署請對照 docs/CLOUDFLARE_DEPLOY.md
- 額外備註：${data.notes || "(無)"}

## Checklist warnings
${checklist.map((x) => `- ${x}`).join("\n") || "- 無重大缺漏"}
`;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (typeof JSZip === "undefined") {
      setStatus("找不到 JSZip，請確認 vendor/jszip.min.js 存在。");
      return;
    }

    generateBtn.disabled = true;
    setStatus("處理中：壓縮照片與產生 BRIEF.md……");

    try {
      const fd = new FormData(form);
      const categories = getCategoryRows();

      const data = {
        nameZh: String(fd.get("nameZh") || "").trim(),
        nameEn: String(fd.get("nameEn") || "").trim(),
        photographer: String(fd.get("photographer") || "").trim(),
        tagline: String(fd.get("tagline") || "").trim(),
        tone: String(fd.get("tone") || "").trim(),
        toneNote: String(fd.get("toneNote") || "").trim(),
        career: String(fd.get("career") || "").trim(),
        years: String(fd.get("years") || "").trim(),
        area: String(fd.get("area") || "").trim(),
        oneLiner: String(fd.get("oneLiner") || "").trim(),
        aboutLong: String(fd.get("aboutLong") || "").trim(),
        instagram: String(fd.get("instagram") || ""),
        facebook: String(fd.get("facebook") || ""),
        threads: String(fd.get("threads") || ""),
        otherContact: String(fd.get("otherContact") || "").trim(),
        footerMode: String(fd.get("footerMode") || "all"),
        contactPrefer: String(fd.get("contactPrefer") || ""),
        pricing: String(fd.get("pricing") || "no"),
        notes: String(fd.get("notes") || "").trim(),
        categories
      };

      // 避免同名 slug 撞車
      const usedIds = new Set();
      data.categories.forEach((c, index) => {
        let id = c.id;
        let n = 2;
        while (usedIds.has(id)) {
          id = `${c.id}-${n++}`;
        }
        usedIds.add(id);
        c.id = id;
        if (!c.title) c.title = `分類 ${index + 1}`;
      });

      const checklist = [];
      if (!categories.length) checklist.push("尚未新增任何作品分類");
      categories.forEach((c, index) => {
        if (!c.title) checklist.push(`分類 ${index + 1} 缺少名稱`);
        if (!c.description) checklist.push(`分類「${c.title || index + 1}」缺少描述`);
        if (!c.coverFile) checklist.push(`分類「${c.title || index + 1}」缺少封面圖`);
      });
      if (!fixedInputs.hero.files?.length) checklist.push("缺少 Hero 主視覺");
      if (!fixedInputs["about-main"].files?.length) checklist.push("缺少關於我主圖");
      if (!fixedInputs.featured.files?.length) checklist.push("缺少精選作品");
      if (fixedInputs.featured.files && fixedInputs.featured.files.length < 6) {
        checklist.push(`精選作品目前 ${fixedInputs.featured.files.length} 張，建議至少 6 張`);
      }

      const compressionNotes = [];
      const zip = new JSZip();
      const photos = zip.folder("photos");
      const heroFolder = photos.folder("hero");
      const catFolder = photos.folder("categories");
      const featuredFolder = photos.folder("featured");
      const aboutFolder = photos.folder("about");

      const inventory = {
        hero: false,
        aboutMain: false,
        aboutDetail: false,
        featured: [],
        compressionNotes
      };

      async function addSingle(file, folder, filename, onOk) {
        if (!file) return;
        const result = await compressImage(file);
        folder.file(filename, result.blob);
        onOk?.(result);
        compressionNotes.push(
          `- ${filename}: ${result.originalName} → ${(result.compressedSize / 1024).toFixed(0)} KB` +
            ` (${result.width}x${result.height}` +
            `${result.wasCompressed ? ", 已壓縮" : ""})`
        );
      }

      await addSingle(fixedInputs.hero.files?.[0], heroFolder, "hero-01.jpg", () => {
        inventory.hero = true;
      });
      await addSingle(fixedInputs["about-main"].files?.[0], aboutFolder, "about-main.jpg", () => {
        inventory.aboutMain = true;
      });
      await addSingle(fixedInputs["about-detail"].files?.[0], aboutFolder, "about-detail.jpg", () => {
        inventory.aboutDetail = true;
      });

      for (const cat of data.categories) {
        if (!cat.coverFile) continue;
        const filename = `${cat.id}.jpg`;
        await addSingle(cat.coverFile, catFolder, filename, () => {
          cat.coverPath = `photos/categories/${filename}`;
        });
      }

      if (fixedInputs.featured.files?.length) {
        const featured = await processFileList(fixedInputs.featured.files);
        featured.forEach((result, index) => {
          const name = `${String(index + 1).padStart(2, "0")}.jpg`;
          featuredFolder.file(name, result.blob);
          inventory.featured.push(result);
          compressionNotes.push(
            `- featured/${name}: ${safeName(result.originalName)} → ${(result.compressedSize / 1024).toFixed(0)} KB` +
              `${result.wasCompressed ? "（已壓縮）" : ""}`
          );
        });
      }

      const brief = buildBriefMarkdown(data, inventory, checklist);
      zip.file("BRIEF.md", brief);
      zip.file(
        "CHECKLIST.txt",
        [
          "攝影師需求收集包 — 檢查清單",
          `產生時間：${new Date().toLocaleString("zh-TW")}`,
          "",
          checklist.length ? checklist.map((x) => `[!] ${x}`).join("\n") : "[OK] 必要欄位大致齊全",
          "",
          "請把整個 ZIP 交給 AI，並說：",
          "請解壓此 ZIP，讀 BRIEF.md，依 creater_web 專案結構更新文案與圖片。",
          "作品分類以 BRIEF 的自訂分類為準，不要強制改成預設四大類。"
        ].join("\n")
      );
      zip.file(
        "README_給AI.txt",
        [
          "請解壓後先讀 BRIEF.md。",
          "Categories 為使用者自訂；名稱、數量、封面都以 BRIEF 為準。",
          "photos/categories/ 檔名對應各分類 id。",
          "若 CHECKLIST.txt 有 [!] 警告，先跟使用者確認缺圖／缺文，再繼續建站。"
        ].join("\n")
      );

      setStatus("打包 ZIP 中……");
      const blob = await zip.generateAsync({ type: "blob", compression: "DEFLATE" });
      const stamp = new Date().toISOString().slice(0, 10).replace(/-/g, "");
      const filename = `photographer-brief-${safeName(data.photographer, "friend")}-${stamp}.zip`;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      a.click();
      URL.revokeObjectURL(url);

      setStatus(
        `已下載 ${filename}` +
          (checklist.length ? `（有 ${checklist.length} 項提醒，見 CHECKLIST.txt）` : "（檢查大致通過）")
      );
    } catch (error) {
      console.error(error);
      setStatus(error?.message || "產生失敗，請再試一次。");
    } finally {
      generateBtn.disabled = false;
    }
  });
})();
