# Tổng quan trang web TIỆM CỦA GIÓ


# Tài khoản đăng nhập
Trang web bán bánh

**Website:** https://namvuong.org/

**username:** tiemcuagio_admin

**password:** cachmangthang8
## Mục tiêu
- Tạo đơn, thanh toán
- Thanh toán trực tuyến, thanh toán dư sẽ lưu vào số dư trong tài khoản
- NGười dùng có thể yêu cầu rút tiền dư trong tài khoản 
- Xem trạng thái đơn hàng, hủy đơn
- Nhận thông báo khi lên cấp và trạng thái đơn hàng thay đổi
- 
- Người dùng có cấp độ khác nhau
- Sửa thông tin
- Bình luận, trả lời bình luận
- 
- Trang admin chỉnh sửa nội dung trang web
- Thêm sản phẩm, viết bài, duyệt đơn

## Tổ chức code
### website-design
Viết chi tiết thiết kế backend. Database-schema là trái tim của dự án vẽ lại toàn bộ cơ sở dữ liệu và liên kết.
Thư mục diagrams chứa cách flowchart của các chức năng như thanh toán, bình luận..

File api_documentation.odt ghi toàn bộ api links

restrictions.txt ghi hạn chế, updates ghi nâng cấp sau này

customer_requests.odt bao gồm toàn bộ yêu cầu của khách hàng

### web-servers
Các files dùng cho webserver django --> gunicorn --> socket --> nginx. 
Các file này trở thành symbolic links liên kết trong thư mục /etc/nginx/sites-enables và /etc/systemd/system/.
Khi server khởi động lại gunicorn, nginx tự động được bật lên

có file bash resize.sh để giảm kích thước ảnh giúp website mượt mà hơn.

### tiemcuagio_django 
Chứa phần backend của website

## tiemcuagio-react
Chứa phần font-end của website

## Minh họa website
Càng lên cấp trang web càng được trang trí nhiều hơn
![level](./images/level.png)

Xem trạng thái đơn hàng
![order_status](./images/order_status.png)


---
**ADMIN**
Viết bài cho sản phẩm 
![create_product](./images/create_product.png)

Cập nhật trạng thái đơn hàng
![update_order_status](./images/update_order_status.png)

Chỉnh sửa hình slider ở home page
![slider](./images/slider.png)






















