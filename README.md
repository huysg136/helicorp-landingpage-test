# AuraRing X — Landing Page

> **Ứng viên:** Thái Gia Huy  
> **Vị trí:** Thực tập sinh IT Phát triển Website — HeliCorp Recruitment Test V2

---

## 🔗 Đường dẫn

| | |
|---|---|
| **Live Demo** | [https://helicorp-landingpage-test.vercel.app/](https://helicorp-landingpage-test.vercel.app/) |
| **PageSpeed Insights** | <img width="568" height="170" alt="image" src="https://github.com/user-attachments/assets/491805ab-1f56-4df5-ba76-a06d5b1e1592" />
 |

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

*© 2026 AuraRing Tech. Dự án dành cho mục đích tuyển dụng.*
