# 📸 Hướng dẫn thêm ảnh vào website

## Cấu trúc thư mục

Mỗi folder tương ứng với một vùng ảnh trên website. **Chỉ cần đặt ảnh vào đúng folder với đúng tên file là xong!**

---

## 📁 Danh sách các folder và ảnh cần có:

### 1. `/hero/` - Hero Background (Ảnh đầu trang lớn)
- **Tên file:** `hero-bg.jpg` (hoặc .png, .webp)
- **Vị trí:** Background cho phần hero section (phần đầu trang lớn)
- **Kích thước:** 1920x1080px hoặc lớn hơn

### 2. `/about/` - About Section Background
- **Tên file:** `about-bg.jpg`
- **Vị trí:** Background cho section Giới thiệu
- **Kích thước:** 1920x800px hoặc lớn hơn

### 3. `/character/` - Character Section
- **Tên file:** 
  - `character-bg.jpg` - Background cho section nhân vật
  - `character-main.jpg` - Ảnh nhân vật chính (Hồ Chí Minh)
- **Vị trí:** Section Nhân vật tiêu biểu
- **Kích thước:** 1920x800px (bg), 600x800px (main)

### 4. `/content/` - Content Cards Images (6 ảnh)
- **Tên file:**
  - `concept-masses.jpg` - Ảnh cho phần "1. Khái niệm quần chúng nhân dân"
  - `concept-leader.jpg` - Ảnh cho phần "2. Khái niệm lãnh tụ"
  - `role.jpg` - Ảnh cho phần "3. Vai trò quần chúng nhân dân"
  - `leader.jpg` - Ảnh cho phần "4. Vai trò lãnh tụ"
  - `relationship.jpg` - Ảnh cho phần "5. Mối quan hệ biện chứng"
  - `methodology.jpg` - Ảnh cho phần "6. Ý nghĩa phương pháp luận"
- **Vị trí:** Các content cards trong section Nội dung
- **Kích thước:** 400x300px

### 5. `/features/` - Feature Items Images (3 ảnh)
- **Tên file:**
  - `feature-2-1.jpg` - Ảnh cho "Lực lượng sản xuất cơ bản" (2.1)
  - `feature-2-2.jpg` - Ảnh cho "Động lực cách mạng" (2.2)
  - `feature-2-3.jpg` - Ảnh cho "Sáng tạo văn hóa" (2.3)
- **Vị trí:** Các feature boxes trong section "Vai trò quần chúng nhân dân"
- **Kích thước:** 400x300px
- **Lưu ý:** Ảnh sẽ hiển thị như background với opacity 0.2

### 6. `/gallery/` - Gallery Images (4 ảnh)
- **Tên file:**
  - `gallery-1.jpg` - Cách mạng Tháng Tám 1945
  - `gallery-2.jpg` - Lao động sản xuất
  - `gallery-3.jpg` - Văn hóa dân gian
  - `gallery-4.jpg` - Lãnh đạo cách mạng
- **Vị trí:** Section Gallery
- **Kích thước:** 600x400px

---

## ✅ Tổng kết số lượng ảnh cần có:

1. **Hero:** 1 ảnh
2. **About:** 1 ảnh
3. **Character:** 2 ảnh
4. **Content:** 6 ảnh (đã tách phần Khái niệm thành 2)
5. **Features:** 3 ảnh
6. **Gallery:** 4 ảnh

**Tổng cộng: 17 ảnh**

---

## 🎯 Cách sử dụng

1. Chọn ảnh phù hợp
2. Đặt vào đúng folder với đúng tên file
3. Refresh trang web để xem kết quả

**Không cần chỉnh sửa code gì cả!** 🎉

---

## 📝 Lưu ý

- Đảm bảo tên file chính xác (phân biệt chữ hoa/thường)
- Định dạng: JPG, PNG, hoặc WebP
- Ảnh sẽ tự động được Next.js tối ưu hóa
- Nếu chưa có ảnh, website vẫn hoạt động bình thường (sẽ hiển thị gradient fallback)
