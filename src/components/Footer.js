import React from 'react';
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
export default function Footer() {
    const location = useLocation();
    const pathName = location.pathname;
    return(
        <div className="footer" style={{
            backgroundImage: "url('')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
        }}>
            <div className="footer-box">
                <Link to="/" style={{textDecoration: "none"}}>
                    <img src="https://cdn.discordapp.com/attachments/1074987128984973365/1075688774006218752/logo.png" alt="logo" width="50" height="50" />
                </Link>

                <Link to="/" style={{textDecoration: "none", color: "black"}}>
                    <div style={{fontWeight: "bold"}}>Bird Care Consulting</div>
                </Link>
            </div>

            <div className="footer-box">
                <div style={{fontWeight: "bold"}}>Thời Gian Hoạt Động:</div>
                <div>Thứ 2 tới Thứ 6: 6h sáng-5h chiều</div>
                <div>Thứ 7 tới Chủ Nhật: Đóng Cửa</div>
            </div>

            <div className="footer-box">
                <div style={{fontWeight: "bold"}}>Các Dịch Vụ:</div>
                <Link to="/dich-vu/1" style={{textDecoration: "none", color: "black"}}>
                    <div>Trị Bệnh Cho Chim</div>
                </Link>
                <Link to="/dich-vu/2" style={{textDecoration: "none", color: "black"}}>
                    <div>Làm Đẹp Cho Chim</div>
                </Link>
                <Link to="/dich-vu/3" style={{textDecoration: "none", color: "black"}}>
                    <div>Ngừa Bệnh Cho Chim</div>
                </Link>
                <Link to="/dich-vu/4" style={{textDecoration: "none", color: "black"}}>
                    <div>Khám Sức Khỏe Định Kì</div>
                </Link>
                <Link to="/dich-vu/5" style={{textDecoration: "none", color: "black"}}>
                    <div>Khách Sạn Cho Chim</div>
                </Link>
            </div>

            <div className="footer-box">
                <div><div style={{fontWeight: "bold"}}>Địa Chỉ:</div> Lô E2a-7, Đường D1, Đ. D1, Long Thạnh Mỹ, Thành Phố Thủ Đức, Thành phố Hồ Chí Minh 700000</div>
                <div><div style={{fontWeight: "bold"}}>Số Điện Thoại:</div> 19001080</div>
            </div>

            <div className="footer-box">
                <Link to="/lien-he" style={{textDecoration: "none"}}>
                    <div style={{fontWeight: "bold"}}>Tìm Hiểu Thêm</div>
                </Link>
            </div>

        </div>
    )
}