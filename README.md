# Vai trò của quần chúng nhân dân và lãnh tụ trong lịch sử

Website giáo dục về chủ đề "Vai trò của quần chúng nhân dân và lãnh tụ trong lịch sử" theo mục 3.2 – Giáo trình Triết học Mác – Lênin.

## Công nghệ sử dụng

- **Next.js 14** - Framework React với App Router
- **TypeScript** - Type safety
- **CSS Modules** - Styling hiện đại và responsive

## Cài đặt và chạy local

1. Cài đặt dependencies:
```bash
npm install
```

2. Chạy development server:
```bash
npm run dev
```

3. Mở trình duyệt tại [http://localhost:3000](http://localhost:3000)

## Build cho production

```bash
npm run build
npm start
```

## Deploy lên Vercel

### Cách 1: Deploy qua Vercel CLI

1. Cài đặt Vercel CLI:
```bash
npm i -g vercel
```

2. Đăng nhập vào Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

### Cách 2: Deploy qua GitHub

1. Đẩy code lên GitHub repository

2. Vào [vercel.com](https://vercel.com) và đăng nhập

3. Click "Add New Project"

4. Import repository từ GitHub

5. Vercel sẽ tự động detect Next.js và deploy

6. Website sẽ được deploy tự động mỗi khi bạn push code lên GitHub

## Tính năng

- ✅ Giao diện hiện đại, đẹp mắt
- ✅ Responsive design (tối ưu cho mobile và desktop)
- ✅ Typography dễ đọc
- ✅ Nội dung đầy đủ theo giáo trình
- ✅ Ví dụ minh họa rõ ràng
- ✅ Tối ưu SEO

## Cấu trúc dự án

```
├── app/
│   ├── layout.tsx      # Layout chính
│   ├── page.tsx        # Trang chủ
│   └── globals.css     # Styles toàn cục
├── package.json
├── next.config.js
├── tsconfig.json
└── README.md
```

## License

MIT
