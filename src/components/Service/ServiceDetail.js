import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Container, Card } from 'react-materialize'
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import callerApi from '../../utils/APICaller';
import './Service.css'
import { Button } from '@mui/material';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from "react-datepicker";
export default function ServiceDetail() {
    var time = new Date();
    var hours = time.getHours();
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const Serviceid = useParams();
    const [service, setService] = useState([])
    const [booking, setBooking] = useState([
        {
            day: "",
            id: ""
        }
    ])
    function getData() {
        callerApi(`Service/GetServiceByID?id=${Serviceid.id}`, 'GET', null).then(res => {
            console.log(res.data);
            setService(res.data);
        })
    }
    function showScheduleButton(pickedTime) {
        document.getElementById("schedule").style.display = "block";
        setSelectedTime(pickedTime);
        setBooking([{
            day: selectedDate.getDate() + "/" + (selectedDate.getMonth() + 1) + "/" + selectedDate.getFullYear() + " - " + pickedTime,
            id: Serviceid.id,
            oday: selectedDate,
            otime: pickedTime
        }])
        // localStorage.setItem("BookingDate", "[{" + "day: " + selectedDate.getDate() + "/" + (selectedDate.getMonth() + 1) + "/" + selectedDate.getFullYear() + " - " + pickedTime + "," + "ID: " + Serviceid.id + "}]");
    }
    useEffect(() => {
        getData();
    }, [])
    useEffect(() => {
        localStorage.setItem("BookingDate", JSON.stringify(booking));
        var bookingDate = JSON.parse(localStorage.getItem("BookingDate"));
        console.log(bookingDate[0].day);
    }, [booking])
    return (
        <div>
            <Container>
                <Card>
                    <div className="Service-detail">
                        <div className="continue-shopping">
                            <Link to="/dich-vu">
                                <KeyboardBackspaceIcon />
                            </Link>
                        </div>
                        <div className="Service-media">
                            <img style={{ height: "500px", width: "500px" }} src={service.image} />
                        </div>
                        <div className="Service-info-main">
                            <div className="Service-info-title">
                                <h1 style={{ fontWeight: "700", fontSize: "40px", lineHeight: "5px" }} className='ServiceName'>{service.serviceName}</h1>
                            </div>
                            <div className="bottom-line2" style={{marginTop: "25px"}}></div>
                            <div className="Service-add-form">
                                <span style={{ fontSize: "30px", fontWeight: "bold" }}>Thông tin dịch vụ: </span>
                                <div className="Service-description">
                                    <div style={{ fontSize: "20px", width: "500px" }}>{service.desciption}</div>
                                </div>
                                <div className="bottom-line2" style={{marginTop: "25px"}}></div>
                                <div className="Service-option">
                                    <div>
                                        <span style={{ fontSize: "30px", fontWeight: "bold" }}>Đặt Lịch Hẹn: </span>
                                        <div style={{color: "red", fontWeight: "bold", textTransform: "uppercase"}}>Lưu ý:</div>
                                        <div className='warningBox'>
                                            <div>Nếu đặt trong ngày, chúng tôi cần 1 tiếng để sắp xếp tới nhà quý khách</div>
                                            <div>Quý khách vui lòng chọn giờ hẹn trước 1 tiếng</div>
                                        </div>
                                        <div className="ServiceDate">
                                            <span style={{ fontSize: "20px", fontWeight: "bold" }}>Ngày hẹn: </span> 
                                            <DatePicker
                                                selected={selectedDate}
                                                onChange={date => setSelectedDate(date)}
                                                dateFormat="dd/MM/yyyy"
                                                minDate={new Date()}
                                                filterDate={date => date.getDay() !== 0 && date.getDay() !== 6}
                                                placeholderText='Vui lòng chọn ngày hẹn'
                                                required
                                            />
                                        </div>
                                        {selectedDate? (
                                            <Fragment>
                                                <div style={{ fontSize: "20px", fontWeight: "bold" }}>Giờ hẹn: </div>
                                                {selectedDate.getDate() === new Date().getDate() ? (
                                                    <div className="ServiceTime">
                                                        {(hours < 6 && 6 - hours > 1) ? <Button onClick={() => showScheduleButton("6h Sáng")}>6:00 Sáng</Button> : <Button onClick={() => showScheduleButton("6h Sáng")} disabled>6:00 Sáng</Button>}
                                                        {(hours < 7 && 7 - hours > 1) ? <Button onClick={() => showScheduleButton("7h Sáng")}>7:00 Sáng</Button> : <Button onClick={() => showScheduleButton("7h Sáng")} disabled>7:00 Sáng</Button>}
                                                        {(hours < 8 && 8 - hours > 1) ? <Button onClick={() => showScheduleButton("8h Sáng")}>8:00 Sáng</Button> : <Button onClick={() => showScheduleButton("8h Sáng")} disabled>8:00 Sáng</Button>}
                                                        {(hours < 9 && 9 - hours > 1) ? <Button onClick={() => showScheduleButton("9h Sáng")}>9:00 Sáng</Button> : <Button onClick={() => showScheduleButton("9h Sáng")} disabled>9:00 Sáng</Button>}
                                                        {(hours < 10 && 10 - hours > 1) ? <Button onClick={() => showScheduleButton("10h Sáng")}>10:00 Sáng</Button> : <Button onClick={() => showScheduleButton("10h Sáng")} disabled>10:00 Sáng</Button>}
                                                        {(hours < 11 && 11 - hours > 1) ? <Button onClick={() => showScheduleButton("11h Sáng")}>11:00 Sáng</Button> : <Button onClick={() => showScheduleButton("11h Sáng")} disabled>11:00 Sáng</Button>}
                                                        {(hours < 12 && 12 - hours > 1) ? <Button onClick={() => showScheduleButton("12h Sáng")}>12:00 Sáng</Button> : <Button onClick={() => showScheduleButton("12h Sáng")} disabled>12:00 Sáng</Button>}
                                                        {(hours < 13 && 13 - hours > 1) ? <Button onClick={() => showScheduleButton("13h Chiều")}>13:00 Chiều</Button> : <Button onClick={() => showScheduleButton("13h Chiều")} disabled>13:00 Chiều</Button>}
                                                        {(hours < 14 && 14 - hours > 1) ? <Button onClick={() => showScheduleButton("14h Chiều")}>14:00 Chiều</Button> : <Button onClick={() => showScheduleButton("14h Chiều")} disabled>14:00 Chiều</Button>}
                                                        {(hours < 15 && 15 - hours > 1) ? <Button onClick={() => showScheduleButton("15h Chiều")}>15:00 Chiều</Button> : <Button onClick={() => showScheduleButton("15h Chiều")} disabled>15:00 Chiều</Button>}
                                                        {(hours < 16 && 16 - hours > 1) ? <Button onClick={() => showScheduleButton("16h Chiều")}>16:00 Chiều</Button> : <Button onClick={() => showScheduleButton("16h Chiều")} disabled>16:00 Chiều</Button>}
                                                        {(hours < 17 && 17 - hours > 1) ? <Button onClick={() => showScheduleButton("17h Chiều")}>17:00 Chiều</Button> : <Button onClick={() => showScheduleButton("17h Chiều")} disabled>17:00 Chiều</Button>}
                                                        {hours > 17 ? <div>Chúng tôi hiện tại đã đóng cửa</div> : null}
                                                    </div>
                                                ) : (
                                                    <div className="ServiceTime">
                                                        <Button onClick={() => showScheduleButton("6h Sáng")}>6:00 Sáng</Button>
                                                        <Button onClick={() => showScheduleButton("7h Sáng")}>7:00 Sáng</Button>
                                                        <Button onClick={() => showScheduleButton("8h Sáng")}>8:00 Sáng</Button>
                                                        <Button onClick={() => showScheduleButton("9h Sáng")}>9:00 Sáng</Button>
                                                        <Button onClick={() => showScheduleButton("10h Sáng")}>10:00 Sáng</Button>
                                                        <Button onClick={() => showScheduleButton("11h Sáng")}>11:00 Sáng</Button>
                                                        <Button onClick={() => showScheduleButton("12h Sáng")}>12:00 Sáng</Button>
                                                        <Button onClick={() => showScheduleButton("13h Chiều")}>13:00 Chiều</Button>
                                                        <Button onClick={() => showScheduleButton("14h Chiều")}>14:00 Chiều</Button>
                                                        <Button onClick={() => showScheduleButton("15h Chiều")}>15:00 Chiều</Button>
                                                        <Button onClick={() => showScheduleButton("16h Chiều")}>16:00 Chiều</Button>
                                                        <Button onClick={() => showScheduleButton("17h Chiều")}>17:00 Chiều</Button>
                                                    </div>
                                                )}
                                            </Fragment>
                                        ):(
                                            <div className="ServiceTime">

                                            </div>
                                        )}
                                        <div id="schedule" style={{ display: "none" }} className='ServiceSummary'>
                                            <div>Thông Tin Ngày Hẹn</div>
                                            <div>Thời Gian: {booking[0].day}</div>
                                            <Link to="/dat-lich">
                                                <Button style={{ marginTop: "20px", backgroundColor: "pink", color: "black" }}>Đặt Lịch</Button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>
            </Container>
        </div>
    )
}