import { Grid } from "@mui/material";
import { Button } from "react-materialize";
import React from "react";
import { useEffect } from 'react';
import { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { toast } from "react-toastify";
import callerAPI from "../../utils/APICaller";
import callerAPI2 from "../../utils/APICaller_Account";

import ErrorIcon from '@mui/icons-material/Error';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import InfoIcon from '@mui/icons-material/Info';

export default function Booking() {
    //thông tin BookingDate từ local storage
    const BookingDate = JSON.parse(localStorage.getItem("BookingDate"));
    var DateSQL;
    var time1 = BookingDate[0].otime?.search("h");
    console.log(time1);
    if (time1 == 1) {
        DateSQL = BookingDate[0].oday?.slice(0, 11) + '0' + BookingDate[0].otime?.slice(0, time1) + ':00:00'
    } else {
        DateSQL = BookingDate[0].oday?.slice(0, 11) + BookingDate[0].otime?.slice(0, 2) + ':00:00'
    }
    console.log(DateSQL);
    //.slice(4, 8) + "-0" + BookingDate[0].day.slice(2, 3) + "-0" + BookingDate[0].day.slice(0, 1) + "T0" + BookingDate[0].day.slice(11, 12) + ":00:00";
    const [ServiceInformation, setServiceInformation] = useState([]);


    function getServiceInformation() {
        callerAPI("Service/GetServiceByID?id=" + BookingDate[0].id, "GET", null)
            .then((response) => {
                setServiceInformation(response.data);
                localStorage.setItem("ServiceInformation", JSON.stringify(response.data));
            })
    }

    useEffect(() => {
        getServiceInformation();
    }, [])


    //////////////////////////////////// Tich Hop Paypal

    ////////////////////////////////////
    //thông tin user điền form   
    const navigate = useNavigate();
    const [scheduleInfo, setScheduleInfo] = useState({ fullName: '', email: '', phone: '', address: "", note: "", Status: 1, paymentType: "" });
    localStorage.setItem("scheduleInfo", JSON.stringify(scheduleInfo));

    const [validUser, setValidUser] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);

    const USER_REGEX = /^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+ [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+(?: [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*)*$/;
    const PHONE_REGEX = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;

    function getCurrentUser() {
        callerAPI2('Customer/GetCurrentCustomer', 'GET', null).then(res => {
            setScheduleInfo(res.data);
        }).catch(err => {
            navigate('/dang-nhap');
        })
      }

      useEffect(() => {
        getCurrentUser();
      }, [])

    useEffect(() => {
        setValidUser(USER_REGEX.test(scheduleInfo.fullName));
    }, [scheduleInfo.fullName])

    useEffect(() => {
        setValidPhone(PHONE_REGEX.test(scheduleInfo.phone));
    }, [scheduleInfo.phone])

    const handleInput = (e) => {
        const { name, value } = e.target;
        setScheduleInfo({ ...scheduleInfo, [name]: value });
        const v3 = USER_REGEX.test(scheduleInfo.fullName);
        const v4 = PHONE_REGEX.test(scheduleInfo.phone);
        if (!v3 || !v4) {
            return;
        }
        console.log(scheduleInfo);
        localStorage.setItem("scheduleInfo", JSON.stringify(scheduleInfo));
    }
    const handleSubmit = async (e) => {
        localStorage.setItem("scheduleInfo", JSON.stringify(scheduleInfo));
        console.log(scheduleInfo);
        e.preventDefault();
        callerAPI2('Booking/CreateBooking', 'POST', {
            bookingdate: DateSQL,
            Price: ServiceInformation.price,
            Note: scheduleInfo.note,
            Phone: scheduleInfo.phone,
            address: scheduleInfo.address,
            fullName: scheduleInfo.fullName,
            service: [{ serviceId: ServiceInformation.serviceId }]
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
        submitScheduleInfo();
    }
    ////////////////////////////////////

    function submitScheduleInfo() {
        localStorage.removeItem("scheduleInfo");
        localStorage.removeItem("BookingDate");
        localStorage.removeItem("ServiceInformation");
        toast.success("Đặt hẹn thành công", {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            theme: "light",
        });
        setInterval(() => {
            window.location.href = "/";
        }, 3000);
    }
    ////////////////////////////////////

    // const {isAuthenticated} = useAuth0();
    // const checkUser = () => {
    //     if (isAuthenticated==false) {
    //         window.location.href = "http://localhost:3000/";
    //     }
    // }

    // useEffect(() => {
    //     checkUser();
    // }, [])
    // Đang cải thiện, không được uncomment

    return (
        <div>
            <div className="start-shopping">
                <Link to={`/dich-vu`}>
                    <div style={{ display: "flex" }}><KeyboardBackspaceIcon />Quay Về</div>
                </Link>
            </div>
            <div className="checkout">
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} >
                        <Grid xs={6}>
                            <div className="billing-detail">
                                <div className="section-title">
                                    <div className="checkout-title">THÔNG TIN LỊCH HẸN</div>
                                    <div className="checkout-text">Điền các thông tin dưới đây, chúng tôi sẽ liên lạc khi cần thiết</div>
                                </div>
                                <div className="form-group">
                                    <label className="Register-title" htmlFor="user">
                                        <text>Họ và Tên</text>
                                        <BeenhereIcon className={validUser ? "valid" : "hide"} />
                                        <ErrorIcon className={validUser || !scheduleInfo.fullName ? "hide" : "invalid"} />
                                    </label>
                                    <input style={{
                                        display: "block",
                                        width: "90%",
                                        height: "34px",
                                        padding: "6px 12px",
                                        fontSize: "16px",
                                        color: "#797b7c",
                                        backgroundColor: "#fff",
                                        border: "1px solid #ccc"
                                    }}
                                        type="text" className="form-control" placeholder="Họ tên" name="fullName"
                                        onChange={handleInput}
                                        value={scheduleInfo.fullName}
                                        aria-invalid={validUser ? "false" : "true"}
                                        aria-describedby="usernote"
                                        onFocus={() => setUserFocus(true)}
                                        onBlur={() => setUserFocus(false)}
                                        required />
                                    <p id="usernote" className={userFocus && scheduleInfo.fullName && !validUser ? "instructions" : "offscreen"}>
                                        <InfoIcon />
                                        <div>Viết đúng họ tên , ví dụ :Nguyễn Văn A</div>
                                    </p>
                                </div>
                                <div className="form-group">
                                    <label className="Register-title" htmlFor="phone">
                                        <text>Số điện thoại</text>
                                        <BeenhereIcon className={validPhone ? "valid" : "hide"} />
                                        <ErrorIcon className={validPhone || !scheduleInfo.phone ? "hide" : "invalid"} />
                                    </label>
                                    <input style={{
                                        display: "block",
                                        width: "90%",
                                        height: "34px",
                                        padding: "6px 12px",
                                        fontSize: "16px",
                                        color: "#797b7c",
                                        backgroundColor: "#fff",
                                        border: "1px solid #ccc"
                                    }}
                                        type="text" className="form-control" placeholder="Số điện thoại" name="phone"
                                        onChange={handleInput}
                                        value={scheduleInfo.phone}
                                        required
                                        aria-invalid={validPhone ? "false" : "true"}
                                        aria-describedby="phonenote"
                                        onFocus={() => setPhoneFocus(true)}
                                        onBlur={() => setPhoneFocus(false)} />
                                    <p id="phonenote" className={phoneFocus && scheduleInfo.phone && !validPhone ? "instructions" : "offscreen"}>
                                        <InfoIcon />
                                        <div>0xxx xxx xxx</div>
                                    </p>
                                </div>
                                <div className="form-group">
                                    <label className="Register-title" htmlFor="address">
                                        <text>Địa chỉ</text>
                                    </label>
                                    <input style={{
                                        display: "block",
                                        maxWidth: "90%",
                                        height: "34px",
                                        padding: "6px 12px",
                                        fontSize: "16px",
                                        color: "#797b7c",
                                        backgroundColor: "#fff",
                                        border: "1px solid #ccc"
                                    }}
                                        type="text" className="form-control" placeholder="Địa chỉ" name="address" value={scheduleInfo.address} onChange={handleInput} required />
                                </div>
                                <div className="form-group">
                                    <label className="Register-title" htmlFor="note">
                                        <text>Ghi chú</text>
                                    </label>
                                    <textarea style={{
                                        display: "block",
                                        maxWidth: "94%",
                                        height: "auto",
                                        padding: "6px 12px",
                                        fontSize: "16px",
                                        color: "#797b7c",
                                        backgroundColor: "#fff",
                                        border: "1px solid #ccc"
                                    }}
                                        type="text" className="form-control" placeholder="Ghi chú" name="note" value={scheduleInfo.note} onChange={handleInput} />
                                </div>
                            </div>
                        </Grid>
                        <Grid xs={6}>
                            <div className="order-detail">
                                <div className="section-title">
                                    <div style={{ textAlign: "center" }} className="checkout-title">LỊCH HẸN CỦA BẠN</div>
                                </div>
                            </div>
                            <div className="order-summary">
                                <div className='Product-item-price'>
                                    <div className='Price-money'>
                                        <span className='checkout-text'>Dịch Vụ</span>
                                        <span className="space"></span>
                                        <span className='checkout-text'>Ngày Hẹn</span>
                                        <span className="space"></span>
                                        <span className='checkout-text'>Giá Tiền</span>
                                    </div>
                                    <div>
                                        <div className='checkout-col' key={ServiceInformation.serviceId}>
                                            <span className=' checkout-text'>{ServiceInformation.serviceName}</span>
                                            <span className=' checkout-text'>{BookingDate[0].day}</span>
                                            <span className=' checkout-text'>{(ServiceInformation.price)?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
                                        </div>
                                    </div>


                                </div>
                                <div className="order-sum-title"></div>
                            </div>

                            <div style={{ textAlign: "center", marginTop: "50px" }} id="submit1">
                                <Button type="submit" style={{ backgroundColor: "red", color: "white" }} className='btn btn-primary'>Đặt Hẹn</Button>
                            </div>
                        </Grid>
                    </Grid>
                </form>
            </div>
        </div>
    )
}
