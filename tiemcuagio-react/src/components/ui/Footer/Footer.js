import { useQuery } from "@tanstack/react-query"
import { fetchData } from "../../../fuctions";
import styles from "./Footer.module.css"


export default function Footer(props) {
    const { data:logo } = useQuery({ 
            queryKey : ['gets_logo', 'footer'],
            queryFn : () => fetchData("/api/home/1/logo/")
    });
    return <div className={styles.footer}>
        <div className={styles.flexContainer}>
            <section className={styles.gpdkkd}>
                <p>
                    <img src={logo?.image} alt="" />
                    Namvuong.org - Website thương mại điện tử thuộc Công ty TNHH Tiệm Của Gió
                </p>
                <p>
                    GPĐKKD số 0301464830 do Sở KHĐT TP. Hồ Chí Minh cấp ngày 14/03/2024.
                </p>
            </section>
            <section className={styles.address}>
                <p>Địa chỉ tiệm bánh</p>
                <p><span>Chi nhánh chính: </span>1314 Đường Huyền Trân Công Chúa, Phường Tiên Nữ, Quận Ngũ Phúc, Tp Đà Nãng</p>
            </section>
            <section className={styles.support}>
                <p>Hotline: 0352 011 887 <br/> Thứ 2 - CN (8h - 17h)</p>
                <ul>
                    <li>- Hướng dẫn mua hàng </li>
                    <li>- Hướng dẫn thanh toán</li>
                    <li>- Chính sách giao hàng</li>
                    <li>- Chính sách rút tiền</li>
                </ul>
            </section>
            <section className={styles.moreInfo}>
                <p>Về NAMVUONG.ORG</p>
                <ul>
                    <li>- Giới thiệu</li>
                    <li>- Dịch vụ làm bánh sỉ</li>
                    <li>- Chính sách bảo mật chung</li>
                    <li>- Chính sách bảo mật thông tin cá nhân</li>
                    <li>- Thông tin liên hệ</li>
                </ul>
            </section>
        </div>
        <section className={styles.copyright}>
            <p>2024 &copy; Namvuong.org - Bản quyền thuộc Công ty TNHH Tiệm Của Gió</p>
        </section>
    </div>
}