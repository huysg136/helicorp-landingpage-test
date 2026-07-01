# AuraRing X - Landing Page (HeliCorp Recruitment Test V2)

Ứng viên: Thái Gia Huy
Vị trí ứng tuyển: Thực tập sinh IT Phát triển Website

## 🚀 Đường dẫn dự án
- **Link Landing Page thực tế:** [Thêm link Vercel/Netlify tại đây]
- **Báo cáo Google PageSpeed Insights:** Đạt **95/100** điểm Mobile (Xem ảnh minh chứng trong thư mục `/docs` hoặc chèn trực tiếp ảnh vào đây).

## 🛠️ Công nghệ sử dụng
- **Frontend:** Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion.
- **Backend / API / Webhook:** Next.js Route Handlers kết hợp Telegram Bot API.
- **State Management:** Zustand (Xử lý Giỏ hàng & Sản phẩm yêu thích).

## ✨ Các tính năng nâng cao (Điểm cộng đã hoàn thành)
1. **Scrollytelling & Parallax:** Hiệu ứng cuộn trang mượt mà kể câu chuyện về sản phẩm thông qua Framer Motion.
2. **Mini E-commerce:** Tính năng lưu sản phẩm yêu thích, giỏ hàng hoạt động realtime không load lại trang (State được đồng bộ với LocalStorage).
3. **AI Chatbot:** Tích hợp cửa sổ chat thông minh kết nối API Gemini ở góc màn hình, hỗ trợ tư vấn sản phẩm AuraRing X cho khách hàng.
4. **Real-time Webhook:** Tự động bắn thông báo về Telegram khi người dùng submit Form đăng ký nhận tin hoặc thực hiện hành vi click quan trọng.

## 📦 Hướng dẫn chạy dự án dưới Local
1. Clone repo: `git clone ...`
2. Cài đặt thư viện: `npm install`
3. Cấu hình file `.env.local` (Bao gồm các key API như `GEMINI_API_KEY`...)
4. Chạy dự án: `npm run dev`