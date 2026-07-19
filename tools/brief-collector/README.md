# 攝影師需求收集包（本機工具）

**不必部署到網路。** 把整個 `tools/brief-collector/` 資料夾傳給朋友，用瀏覽器打開 `index.html` 即可。

## 朋友怎麼用

1. 收到資料夾後，雙擊打開 `index.html`（或用 Chrome / Edge 開啟）。
2. 依欄位填：品牌名、標語、關於我、社群。
3. **作品分類自己新增**（名稱 + 一句描述 + 該分類封面圖）；可加可刪，不限漢服／和服。
4. 再上傳 Hero、精選、關於我照片。
5. 按「產生 ZIP 並下載」。
6. 把下載的 `photographer-brief-....zip` 丟回給你／丟進 Cursor。

## ZIP 裡面有什麼

```text
photographer-brief-xxx.zip
├── BRIEF.md           ← 給 AI 主讀（結構化需求）
├── CHECKLIST.txt      ← 缺圖／缺欄提醒
├── README_給AI.txt
└── photos/
    ├── hero/
    ├── categories/
    ├── featured/
    └── about/
```

## 對 AI 怎麼說

> 請解壓這個 ZIP，讀 BRIEF.md，依 creater_web 專案結構更新文案與圖片。

## 注意

- 資料只在朋友自己的瀏覽器處理，**不會上傳到伺服器**。
- 單張超過約 3MB 或最長邊很大時，工具會在打包前自動縮小壓縮。
- 需保留同資料夾的 `vendor/jszip.min.js`，整包一起給朋友。

## 開發者

對應規劃：`docs/BRIEF_COLLECTION_PLAN.md`
