# Cherry WoO Photography

這是 Cherry WoO Photography 的作品集網站，使用 Next.js 建置，並以 macOS 作為主要開發環境。

## macOS 開發方式

1. 安裝 Node.js 20 或以上版本。
2. 在此資料夾開啟「終端機」。
3. 執行 `npm install` 安裝 macOS 相容的套件。
4. 執行 `npm run dev`，並在瀏覽器開啟 `http://localhost:3000`。

## 專案內容

- `app/`：網站頁面、元件與樣式
- `content/site.ts`：品牌文案、分類與社群連結；更新作品資料時，優先修改此檔案
- `public/`：作品照片與網站素材
- `tools/brief-collector/`：攝影師需求收集頁

> 不要從舊的 Windows 壓縮檔複製 `node_modules/`。每台 mac 都應在本機執行 `npm install`，以取得正確的平台相依套件。

網站字體使用 macOS 內建的繁中字體，因此即使在沒有網路的環境中也可以完成建置。

## 上線

網站可部署到 Cloudflare Pages。部署前先執行 `npm run build` 確認建置成功。

## 本次版本資料

- 品牌：Cherry WoO Photography
- 攝影師：Cherry
- 作品分類：新中式、婚禮攝影、職人形象照、活動攝影、全家福寫真、時尚寫真
- 照片來源：`photographer-brief-Cherry-20260719.zip`
- 精選作品輪播：使用 ZIP 內 `photos/featured/01.jpg` 至 `10.jpg`
- 照片呈現：全站維持攝影作品的原始色調，不使用暖色染色或點擊還原效果
- 個人資料來源：`website/sns.pages`（社群連結或聯絡資料異動時，以此檔為準）
