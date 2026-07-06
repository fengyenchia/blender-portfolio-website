# Blender Portfolio Website

這是 Yen-Chia Feng 的 Blender 課程作品集網站。專案使用 Next.js App Router、MDX 與 Tailwind CSS 建置，內容主要由 `markdown/` 裡的 MDX 檔案與 `config/AllData.ts` 管理。

## 技術架構

- Next.js 15
- React 19
- MDX
- Tailwind CSS 4
- pnpm

## 開發指令

安裝套件：

```bash
pnpm install
```

啟動本機開發伺服器：

```bash
pnpm dev
```

預設網址：

```txt
http://localhost:3000
```

正式建置：

```bash
pnpm build
```

## 內容結構

目前公開內容主要是 GC / Computer Animation 課程，MDX 放在：

```txt
markdown/
  homework/computer-animation/
  project/computer-animation/
  paper/computer-animation/
```

頁面清單、導覽名稱、banner 圖片與路由資料放在：

```txt
config/AllData.ts
```

`AllData.ts` 欄位說明：

- `name`：完整頁面標題，顯示在頁面 banner 上
- `navName`：短標題，顯示在 navbar 與 mobile menu
- `slug`：路由片段，通常也對應 MDX 檔名
- `image`：banner 圖片路徑
- `children`：project 的第二層詳細頁使用

## 新增內容流程

之後不再使用 `/website` 匯入流程，新增內容請手動處理：

1. 在 `markdown/` 對應分類新增 MDX 檔案。
2. 在 `config/AllData.ts` 新增頁面資料。
3. 頁面圖片放到 `public/images/`。
4. 下載檔案放到 `public/files/`。
5. banner 圖片放到 `public/thumbs/`。

範例：

```txt
markdown/homework/computer-animation/CG_HW02.mdx
```

對應路由：

```txt
/homework/computer-animation/CG_HW02
```

## 路由規則

一般內容頁：

```txt
/{category}/{course}/{weekly}
```

Project 詳細頁：

```txt
/project/computer-animation/project01/CG_Proj01
/project/computer-animation/project02/CG_Proj02_W11
```

Resume：

```txt
/resume
```

## MDX 可用元件

MDX 內可使用的主要元件：

- `MarkdownMeta`：製作時數與檔案連結
- `ImageCarousel`：圖片輪播
- `YouTubeEmbed`：YouTube 影片嵌入

元件註冊位置：

```txt
mdx-components.tsx
```

## 素材位置

公開素材放在：

```txt
public/images/
public/files/
public/thumbs/
```

Resume 使用的素材：

```txt
public/images/resume/profile.jpg
public/files/resume/gc-resume.pdf
```

## 3D 課程狀態

3D 課程內容目前先不處理，相關 placeholder 檔案可以保留，之後再新增正式內容。

目前 `AllData.ts` 沒有把 3D 課程掛到導覽中，所以網站公開導覽只會顯示 GC / Computer Animation 內容。

## 部署

部署目標是 Vercel。部署前請確認這些檔案與資料夾都有 commit：

```txt
package.json
pnpm-lock.yaml
config/AllData.ts
markdown/
public/
```

如果 Vercel 出現 `module not found`，先確認該套件是否已寫入 `package.json` 與 `pnpm-lock.yaml`，不要只依賴本機 `node_modules`。

## 注意事項

- `paper` 頁面不顯示製作時數，只保留下載連結。
- navbar 使用 `navName` 短標題，banner 使用 `name` 完整標題。
- 如果本機樣式消失或 `_next/static` 回 404，通常是 `.next` cache 和 dev/build 同時寫入造成；停掉 dev server、刪除 `.next` 後重啟即可。
