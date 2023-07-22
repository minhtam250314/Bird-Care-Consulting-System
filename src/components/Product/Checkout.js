import { Grid } from "@mui/material";
import { Button } from "react-materialize";
import React from "react";
import { getTotals } from "../../context/CartSlice";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { useState } from "react";
import callerAPI from "../../utils/APICaller_Account";
import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { Link } from "react-router-dom";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { toast } from "react-toastify";
import ErrorIcon from '@mui/icons-material/Error';
import BeenhereIcon from '@mui/icons-material/Beenhere';
import InfoIcon from '@mui/icons-material/Info';
import { useNavigate } from "react-router-dom";

export default function Checkout() {
    //thông tin product từ cart    
    const cart = useSelector(state => state.cart);
    const [paymentType, setPaymentType] = useState();
    const dispatchh = useDispatch();
    const handleGetTotals = () => {
        dispatchh(getTotals())
    }
    const navigate = useNavigate();
    useEffect(() => {
        handleGetTotals();
    }, [cart])
    //////////////////////////////////// Tich Hop Paypal

    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    const [currency, setCurrency] = useState(options.currency);
    const onCurrencyChange = ({ target: { value } }) => {
        setCurrency(value);
        dispatchh({
            type: "resetOptions",
            value: {
                ...options,
                currency: value,
            },
        });
    }

    const onCreateOrder = (data, actions) => {
        var VNDToUSD = (cart.cartTotalAmount / 23000).toFixed(2);
        console.log(VNDToUSD);
        console.log(billingInfo)
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: VNDToUSD,
                    },
                },
            ],
        });
    }

    const onApproveOrder = (data, actions) => {
        return actions.order.capture().then((details) => {
            localStorage.setItem("paymentStatus", JSON.stringify([details]));
            var bill = JSON.parse(localStorage.getItem("billingInfo"));
            if (details.status === "COMPLETED") {
                callerAPI("Order/CreateOrder", "POST", {
                    note: bill.note,
                    address: bill.address,
                    phone: bill.phone,
                    fullName: bill.fullName,
                    amount: cart.cartTotalAmount,
                    paymentMethod: "Online",
                    product: cart.cartItems
                }).then(res => {
                    console.log(res);
                    console.log(details.status)
                    submitBillingInfo();
                });
            }else{
                toast.error("Thanh toán thất bại", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }
        });
    }

    //////////////////////////////////// Tich Hop Paypal

    ////////////////////////////////////
    //thời gian
    const time = new Date().toLocaleDateString();
    const [CurrentTime, setCurrentTime] = useState(time);
    const updateTime = () => {
        let time = new Date().toLocaleDateString();
        setCurrentTime(time);
    }
    const USER_REGEX = /^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+ [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+(?: [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*)*$/;
    const PHONE_REGEX = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;


    //thông tin user điền form   
    const [billingInfo, setBillingInfo] = useState({ fullName:'', phone:'', address: '', note: "", Status: "Chờ Xác Nhận", paymentType: "" });
    localStorage.setItem("billingInfo", JSON.stringify(billingInfo));
    
    const [validUser, setValidUser] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);

    
    function getCurrentUser() {
        callerAPI('Customer/GetCurrentCustomer', 'GET', null).then(res => {
            setBillingInfo(res.data);
        }).catch(err => {
            navigate('/dang-nhap');
        })
      }

      useEffect(() => {
        getCurrentUser();
      }, [])

    
    useEffect(() => {
        setValidUser(USER_REGEX.test(billingInfo.fullName));
    }, [billingInfo.fullName])

    useEffect(() => {
        setValidPhone(PHONE_REGEX.test(billingInfo.phone));
    }, [billingInfo.phone])

    const handleInput = (e) => {
        const { name, value } = e.target;
        setBillingInfo({ ...billingInfo, [name]: value });
        const v3 = USER_REGEX.test(billingInfo.fullName);
        const v4 = PHONE_REGEX.test(billingInfo.phone);
        if (!v3 || !v4) {
            return;
        }
        console.log(billingInfo);
        localStorage.setItem("billingInfo", JSON.stringify(billingInfo));
    }
    setInterval(updateTime, 1000);
    const handleSubmit = async (e) => {
        localStorage.setItem("billingInfo", JSON.stringify(billingInfo));
        console.log(billingInfo);
        e.preventDefault();
        if (paymentType == "cod") {
            callerAPI("Order/CreateOrder", "POST", {
                note: billingInfo.note,
                address: billingInfo.address,
                phone: billingInfo.phone,
                fullName: billingInfo.fullName,
                amount: cart.cartTotalAmount,
                paymentMethod: "COD",
                product: cart.cartItems
            }).then(res => {
                console.log(res);
            });
            submitBillingInfo();
        } else if (paymentType == "online") {
            showPaypalButton();
        }
    }
    ////////////////////////////////////

    //thông tin chọn phương thức thanh toán
    function showSubmit1() {
        document.getElementById("submit1").style.display = "block";
        document.getElementById("submit2").style.display = "none";
        document.getElementById("submit2_2").style.display = "none";
        setPaymentType("cod");
    }

    function showSubmit2() {
        if (document.getElementById("submit2").style.display == "none" && document.getElementById("submit2_2").style.display == "block") {
            document.getElementById("submit1").style.display = "none";
            document.getElementById("submit2").style.display = "block";
            document.getElementById("submit2_2").style.display = "none";
        } else {
            document.getElementById("submit1").style.display = "none";
            document.getElementById("submit2").style.display = "block";
        }
        setPaymentType("online");
    }

    function showPaypalButton() {
        document.getElementById("submit2").style.display = "none";
        document.getElementById("submit2_2").style.display = "block";
    }

    function submitBillingInfo() {
        localStorage.removeItem("billingInfo");
        localStorage.removeItem("paymentStatus");
        localStorage.removeItem("cartItems");
        toast.success("Đặt hàng thành công", {
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
        }, 5000);
    }
    ////////////////////////////////////

    return (
        <div>
            <div className="start-shopping">
                <Link to="/gio-hang">
                    <div style={{ display: "flex" }}><KeyboardBackspaceIcon />Quay Về</div>
                </Link>
            </div>
            <div className="checkout">
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2} >
                        <Grid xs={6}>
                            <div className="billing-detail">
                                <div className="section-title">
                                    <div className="checkout-title">THÔNG TIN GỬI HÀNG</div>
                                    <div className="checkout-text">Điền các thông tin dưới đây, chúng tôi sẽ liên lạc khi cần thiết</div>
                                </div>
                                <div className="form-group">
                                    <label className="Register-title" htmlFor="user">
                                        <text>Họ và Tên</text>
                                        <BeenhereIcon className={validUser ? "valid" : "hide"} />
                                        <ErrorIcon className={validUser || !billingInfo.fullName ? "hide" : "invalid"} />
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
                                        value={billingInfo.fullName}
                                        aria-invalid={validUser ? "false" : "true"}
                                        aria-describedby="usernote"
                                        onFocus={() => setUserFocus(true)}
                                        onBlur={() => setUserFocus(false)}
                                        required />
                                    <p id="usernote" className={userFocus && billingInfo.fullName && !validUser ? "instructions" : "offscreen"}>
                                        <InfoIcon />
                                        <div>Viết đúng họ tên , ví dụ :Nguyễn Văn A</div>
                                    </p>
                                </div>
                                <div className="form-group">
                                    <label className="Register-title" htmlFor="phone">
                                        <text>Số điện thoại</text>
                                        <BeenhereIcon className={validPhone ? "valid" : "hide"} />
                                        <ErrorIcon className={validPhone || !billingInfo.phone ? "hide" : "invalid"} />
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
                                        className="form-control" placeholder="Số điện thoại" name="phone"
                                        onChange={handleInput} 
                                        value={billingInfo.phone}
                                        required
                                        aria-invalid={validPhone ? "false" : "true"}
                                        aria-describedby="phonenote"
                                        onFocus={() => setPhoneFocus(true)}
                                        onBlur={() => setPhoneFocus(false)} />
                                    <p id="phonenote" className={phoneFocus && billingInfo.phone && !validPhone ? "instructions" : "offscreen"}>
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
                                        type="text" className="form-control" placeholder="Địa chỉ nhận hàng" name="address" value={billingInfo.address} onChange={handleInput} required />
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
                                        type="text" className="form-control" placeholder="Ghi chú" name="note" value={billingInfo.note} onChange={handleInput} />
                                </div>
                            </div>
                        </Grid>
                        <Grid xs={6}>
                            <div className="order-detail">
                                <div className="section-title">
                                    <div style={{ textAlign: "center" }} className="checkout-title">ĐƠN HÀNG CỦA BẠN</div>
                                </div>
                            </div>
                            <div className="order-summary">
                                <div className='Product-item-price'>
                                    <div className='Price-money'>
                                        <span className='checkout-text'>Sản Phẩm</span>
                                        <span className="space" style={{ marginLeft: "450px" }}></span>
                                        <span className='checkout-text'>Thành Tiền</span>
                                    </div>
                                    <div >
                                        {cart.cartItems?.map(cartItem => {
                                            return (
                                                <div className='checkout-col' key={cartItem.productId}>
                                                    <span className=' checkout-text'>{cartItem.productName} x {cartItem.cartQuantity}</span>
                                                    <span className=' checkout-text'>{(cartItem.price * cartItem.cartQuantity).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })} </span>
                                                </div>
                                            )
                                        })}
                                    </div>
                                    <div className='checkout-col'>
                                        <span style={{ fontWeight: "bold" }} className='checkout-text'>Tổng tiền</span>
                                        <span className='checkout-text'>{(cart.cartTotalAmount).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
                                    </div>
                                    <div>
                                        <div className="section-title">
                                            <div style={{ textAlign: "center" }} className="checkout-title">ĐƠN HÀNG CỦA BẠN</div>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
                                            <Button type="button" onClick={() => showSubmit1()} style={{ marginLeft: "10px" }}>Thanh toán khi nhận hàng</Button>
                                            <Button type="button" onClick={() => showSubmit2()} style={{ marginLeft: "30px" }}>Thanh toán online</Button>
                                        </div>
                                    </div>


                                </div>
                                <div className="order-sum-title"></div>
                            </div>

                            <div style={{ textAlign: "center", marginTop: "50px", display: "none" }} id="submit1">
                                <Button type="submit" style={{ backgroundColor: "red", color: "white" }} className='btn btn-primary'>Đặt hàng</Button>
                            </div>

                            {/* Thanh Toan Online */}
                            <div style={{ textAlign: "center", marginTop: "50px", display: "none" }} id="submit2">
                                <Button type="submit" style={{ backgroundColor: "red", color: "white" }} className='btn btn-primary'>Đặt hàng</Button>
                            </div>
                            <div style={{ width: '180px', height: '40px', marginLeft: "250px", marginTop: "50px", display: "none" }} id="submit2_2" >
                                <PayPalButtons
                                    style={{ layout: "vertical" }}
                                    createOrder={(data, actions) => onCreateOrder(data, actions)}
                                    onApprove={(data, actions) => onApproveOrder(data, actions)}
                                />
                            </div>
                            {/* Thanh Toan Online */}
                        </Grid>
                    </Grid>
                </form>
            </div>
        </div>
    )
}