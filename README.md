# My-Fit Web Service

[![Latest Release](https://img.shields.io/github/v/release/MyFIT-MobileAssignment-C03043/my-fit-webservice)](https://github.com/MyFIT-MobileAssignment-C03043/my-fit-webservice/releases/latest)
[![NestJS CI/CD Pipeline](https://github.com/MyFIT-MobileAssignment-C03043/my-fit-webservice/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/MyFIT-MobileAssignment-C03043/my-fit-webservice/actions/workflows/ci-cd.yml)

Đây là một API backend được xây dựng bằng NestJS để theo dõi các chỉ số sức khỏe cá nhân.

## Mô tả

Dự án cung cấp các endpoint API để quản lý thông tin người dùng, đặt mục tiêu sức khỏe (ví dụ: lượng nước uống, số bước chân, calo tiêu thụ) và ghi lại các bản ghi hàng ngày.

## API Documentation (Swagger)

Tài liệu API chi tiết được cung cấp thông qua Swagger UI, đã được triển khai và có thể truy cập tại:

[`https://my-fit-webservice.onrender.com/api`](https://my-fit-webservice.onrender.com/api)


## Tính năng chính

* **Quản lý Người dùng:** Tạo, xem, xóa thông tin người dùng cơ bản (tên, email, tuổi, chiều cao, cân nặng,...).
* **Quản lý Mục tiêu:** Đặt và theo dõi các mục tiêu sức khỏe cá nhân theo loại (nước, bước chân, calo, giấc ngủ, cân nặng,...).
* **Quản lý Bản ghi Hàng ngày:** Ghi lại, cập nhật, xem và xóa các chỉ số sức khỏe hàng ngày (lượng nước, số bước, calo nạp vào, giờ ngủ).

## Công nghệ sử dụng

* **Framework:** NestJS
* **Ngôn ngữ:** TypeScript
* **Database:** MongoDB (với Mongoose ODM)
* **Deployment:** OnRender
* **CI/CD:** GitHub Actions

## Cài đặt và Chạy dự án

1.  **Clone repository:**
    ```bash
    git clone [https://github.com/](https://github.com/)MyFIT-MobileAssignment-C03043/my-fit-webservice.git
    cd my-fit-webservice
    ```
2.  **Cài đặt dependencies:**
    ```bash
    npm install
    ```
    *Hoặc dùng `npm ci` nếu bạn muốn cài đặt chính xác từ `package-lock.json`.*
3.  **Cấu hình môi trường:**
    * Tạo file `.env` trong thư mục gốc.
    * Thêm biến `MONGODB_URI` với chuỗi kết nối MongoDB của bạn:
        ```
        MONGODB_URI=mongodb+srv://<username>:<password>@yourcluster...
        ```
4.  **Chạy ứng dụng (Development):**
    ```bash
    npm run start:dev
    ```
    Ứng dụng sẽ chạy trên `http://localhost:3000`.

## CI/CD (Tích hợp và Triển khai Liên tục)

Dự án này sử dụng GitHub Actions để tự động hóa quy trình CI/CD:

* **Continuous Integration (CI):** Mỗi khi có push hoặc pull request vào nhánh `main`, workflow sẽ tự động chạy:
    * Cài đặt dependencies.
    * Build ứng dụng (`npm run build`).
* **Continuous Deployment (CD):** Nếu CI thành công trên nhánh `main` (chỉ khi `push`), workflow sẽ tự động trigger một deploy mới trên OnRender thông qua Deploy Hook.