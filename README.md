# AuraRing X — Landing Page

> **Ứng viên:** Thái Gia Huy  
> **Vị trí:** Thực tập sinh IT Phát triển Website — HeliCorp Recruitment Test V2

---

## 🔗 Đường dẫn

| | |
|---|---|
| **Live Demo** | [(https://helicorp-landingpage-test.vercel.app/)](https://helicorp-landingpage-test.vercel.app/) |
| **PageSpeed Insights** | *(Đính kèm ảnh chụp màn hình vào `/docs`)* |

---

## 🛠️ Tech Stack

| Lớp | Công nghệ |
|---|---|
| **UI Framework** | React 19 + TypeScript |
| **Build Tool** | Vite 8 |
| **Styling** | Tailwind CSS v4 |
| **Animation** | Framer Motion |
| **State Management** | Zustand (persist middleware) |
| **AI Chatbot** | Groq API (llama-3.3-70b-versatile) — có fallback giả lập |
| **Icons** | Lucide React |
| **Flag Icons** | country-flag-icons |

---

## ✨ Tính năng đã triển khai

### 🛒 Mini E-commerce
- **Giỏ hàng (Cart Drawer):** Thêm / xóa từng sản phẩm theo biến thể (màu sắc + size). Hiển thị số lượng badge trên icon. Thanh toán giả lập tự động xóa giỏ hàng.
- **Danh sách yêu thích (Wishlist Drawer):** Lưu từng biến thể sản phẩm cụ thể (không phải toggle boolean). Hỗ trợ "Thêm vào giỏ" nhanh từ wishlist. Icon ❤️ hiển thị filled/unfilled theo từng biến thể đang chọn.
- Toàn bộ trạng thái được persist vào `localStorage` qua Zustand.

### 🌐 Đa ngôn ngữ (i18n)
- Hỗ trợ **Tiếng Anh (EN)** và **Tiếng Việt (VI)**.
- Mặc định: **Tiếng Anh**.
- Nút chuyển đổi ngôn ngữ hiển thị lá cờ quốc gia (thư viện `country-flag-icons`).
- Lưu lựa chọn ngôn ngữ vào `localStorage`, tự động áp dụng ở lần truy cập tiếp theo.
- Toàn bộ nội dung trang (Hero, Features, Specs, Product Config, Newsletter, Footer, Chatbot) đều được dịch đồng bộ.

### 🤖 AI Chatbot
- Trợ lý ảo **Aura Assistant** tích hợp ở góc màn hình.
- Kết nối **Groq API** (llama-3.3-70b-versatile). Khi không có API Key, tự động chuyển sang chế độ giả lập thông minh.
- Tự động điều chỉnh ngôn ngữ (EN/VI) theo lựa chọn của người dùng.
- Retry tự động với exponential backoff khi gặp lỗi 429/503.

### 🔔 Toast Notifications
- Hệ thống toast glassmorphic cao cấp thay thế hoàn toàn `window.alert()`.
- 3 loại: `success` (xanh), `error` (đỏ), `info` (xanh dương).
- Hiệu ứng xuất hiện / biến mất mượt mà với Framer Motion.
- Tự động đóng sau 4 giây.

### 🎨 UI/UX
- Dark Mode / Light Mode (toggle, persist vào localStorage).
- Scroll animations với Framer Motion + IntersectionObserver.
- Glassmorphism, gradient, micro-animations trên toàn trang.
- Responsive hoàn toàn (Mobile / Tablet / Desktop).
- Bento Grid layout cho phần Features.

### 🔍 SEO
- **Title** và **Meta Description** tối ưu.
- **Open Graph** (og:title, og:description, og:image, og:locale).
- **Twitter Card** (summary_large_image).
- **Canonical URL**.
- **JSON-LD Structured Data** (Product schema).
- `lang="en"` và `theme-color` trên `<html>`.

---

## ⚙️ Cấu hình môi trường

Tạo file `.env` ở thư mục gốc:

```env
# Groq API Key (để chatbot hoạt động với AI thật)
VITE_AI_API_KEY=your_groq_api_key_here
```

> Nếu không có key, chatbot sẽ tự động dùng fallback giả lập — trang vẫn hoạt động hoàn toàn bình thường.

---

## 🚀 Chạy dự án

```bash
# 1. Clone repo
git clone <repo-url>
cd helicorp

# 2. Cài đặt dependencies
npm install

# 3. Cấu hình biến môi trường
cp .env.example .env
# Điền VITE_AI_API_KEY vào .env

# 4. Chạy development server
npm run dev

# 5. Build production
npm run build

# 6. Preview bản build
npm run preview
```

---

## 📁 Cấu trúc thư mục

```
src/
├── assets/             # Hình ảnh, logo
├── components/
│   ├── chatbot/        # ChatWindow, ChatButton
│   ├── layout/         # Navbar, Footer
│   ├── sections/       # Hero, Insights, SpecsGrid, ProductConfig, Newsletter
│   └── ui/             # Button, Input, ColorSwatch, SizeBadge, Toast
├── hooks/              # useScrollAnimation
├── services/           # gemini.ts (Groq API client)
├── store/              # useStore, useToastStore, useLanguageStore
├── types/              # TypeScript interfaces
└── utils/              # translations.ts, validation.ts
```

---

## 📝 Ghi chú

- Webhook Telegram/Discord đã được **loại bỏ** và thay bằng hệ thống Toast notification nội bộ.
- Toàn bộ dữ liệu được xử lý **client-side**, không có backend thật.

---

*© 2026 AuraRing Tech. Dự án dành cho mục đích tuyển dụng.*
