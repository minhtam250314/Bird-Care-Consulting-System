import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as Config from "../../../utils/Config";
import axios from "axios";
import { Link } from "react-router-dom"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Button, Container } from "react-materialize";
import callerApi1 from '../../../utils/APICaller_Account';
import Grid from "@mui/system/Unstable_Grid/Grid";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
export default function UserDetailBooking() {
    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
      }));

      const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        '&:nth-of-type(even)': {
            backgroundColor: theme.palette.action.hover,
          }
      }));

    const bookingid = useParams();
    const [userbooking, setUserBooking] = useState([]);
    const [bookingdetail, setBookingDetail] = useState([]);
    const [serviceDetail, setServiceDetail] = useState([]);
    const [status, setStatus] = useState('');

    const handleChangeStatus = (event, bookingId) => {
        setStatus(event.target.value);
        callerApi1("Booking/UpdateStaus", "PUT", {
            bookingId: bookingId,
            statusId: event.target.value
        }).then(res => {
            console.log(res);
            window.location.reload();
        });
    };

    function ShowSubmit1(event, bookingId) {
        handleChangeStatus(event, bookingId);
    }

    function ShowSubmit2(event, bookingId) {
        handleChangeStatus(event, bookingId);
    }

    function getBookingUserInfo() {
        callerApi1("Booking/GetBookingByBookingIdAdmin?id=" + bookingid.bookingId, "GET", null)
            .then(response => response.data).then((data) => {
                console.log(data)
                setUserBooking(data)
            });
    }
    function getBookingDetail() {
        axios.get(`${Config.API_URL}/Booking/GetBookingDetailByBookingId?bookingId=` + bookingid.bookingId)
            .then(response => response.data)
            .then((data) => {
                console.log(data)
                setBookingDetail(data)
            });
    }

    function getServiceDetail() {
        bookingdetail.map(bookingdetail => {
            axios.get(`${Config.API_URL}/Service/GetServiceById?id=` + bookingdetail.serviceId)
                .then(response => response.data)
                .then((data) => {
                    setServiceDetail(serviceDetail => [...serviceDetail, data])
                });
        })
    }

    useEffect(() => {
        getBookingUserInfo();
        getBookingDetail();
    }, [])
    useEffect(() => {
        if (bookingdetail) {
            getServiceDetail();
        }
    }, [JSON.stringify(bookingdetail)])

    return (
        <div>
            <div className="start-shopping">
                <Link to="/admin">
                    <div style={{ display: "flex" }}><KeyboardBackspaceIcon />Quay Về</div><br />
                </Link>
            </div>
            <Container>
                <div className="introHeading">Chi tiết đơn hàng</div>
                <div className="bottom-line2" style={{ marginTop: "25px" }}></div>
                <br />
                <div>
                    <h4 className="UDetail-intro" >Thông tin đặt lịch</h4>
                    <div style={{ position: "relative", left: "9%", marginTop: "20px", marginBottom: "20px" }}>
                        <Grid container spacing={1}>
                            <Grid xs={5}>
                                <div className="form-group">
                                    <label className="Register-title" htmlFor="user">
                                        <text>Họ và Tên</text>
                                    </label>
                                    <input style={{
                                        display: "block",
                                        width: "70%",
                                        height: "34px",
                                        padding: "6px 12px",
                                        fontSize: "16px",
                                        color: "#797b7c",
                                        backgroundColor: "#fff",
                                        border: "1px solid #ccc"

                                    }}
                                        type="text" className="form-control" value={userbooking.fullName} disabled />
                                </div>

                                <div className="form-group">
                                    <label className="Register-title" htmlFor="phone">
                                        <text>Số điện thoại</text>
                                    </label>
                                    <input style={{
                                        display: "block",
                                        width: "70%",
                                        height: "34px",
                                        padding: "6px 12px",
                                        fontSize: "16px",
                                        color: "#797b7c",
                                        backgroundColor: "#fff",
                                        border: "1px solid #ccc"
                                    }}
                                        className="form-control" value={userbooking.phone} disabled />

                                </div>
                                <div className="form-group">
                                    <label className="Register-title" htmlFor="address">
                                        <text>Địa chỉ</text>
                                    </label>
                                    <input style={{
                                        display: "block",
                                        maxWidth: "70%",
                                        height: "34px",
                                        padding: "6px 12px",
                                        fontSize: "16px",
                                        color: "#797b7c",
                                        backgroundColor: "#fff",
                                        border: "1px solid #ccc"
                                    }}
                                        type="text" className="form-control" value={userbooking.address} disabled />
                                </div>
                            </Grid>
                            <Grid xs={5}>
                                <div className="form-group">
                                    <label className="Register-title" htmlFor="note">
                                        <text>Ghi chú</text>
                                    </label>
                                    <input style={{
                                        display: "block",
                                        maxWidth: "70%",
                                        height: "34px",
                                        padding: "6px 12px",
                                        fontSize: "16px",
                                        color: "#797b7c",
                                        backgroundColor: "#fff",
                                        border: "1px solid #ccc"
                                    }}
                                        type="text" className="form-control" value={userbooking.note} disabled />
                                </div>
                                <div className="form-group">
                                    <label className="Register-title" htmlFor="type">
                                        <text>Trạng thái lịch hẹn</text>
                                    </label>
                                    <input style={{
                                        display: "block",
                                        maxWidth: "70%",
                                        height: "34px",
                                        padding: "6px 12px",
                                        fontSize: "16px",
                                        color: "#797b7c",
                                        backgroundColor: "#fff",
                                        border: "1px solid #ccc"
                                    }}
                                        type="text" className="form-control" value={userbooking.statusId == 1 ? "Chờ Xác Nhận" :
                                            userbooking.statusId == 2 ? "Đã Xác Nhận" :
                                                userbooking.statusId == 3 ? "Hoàn Thành" :
                                                    "Đã Hủy"
                                        } disabled />
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <br />
                <h4 className="UDetail-intro" >Dịch vụ đã chọn</h4>
                <br />
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell align ="center" style={{borderRight:"1px solid white"}}>Hình ảnh</StyledTableCell>
                                <StyledTableCell align ="center" style={{borderRight:"1px solid white"}}>Dịch vụ</StyledTableCell>
                                <StyledTableCell align ="center" style={{borderRight:"1px solid white"}}>Giá</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {serviceDetail.map((serviceDetail, index) => (
                                <StyledTableRow key={index}>
                                    <TableCell align ="center"><img style={{ width: "200px", height: "200px" }} src={serviceDetail.image} alt="" /></TableCell>
                                    <TableCell align ="center">{serviceDetail.serviceName}</TableCell>
                                    <TableCell align ="center">{(bookingdetail[index].price)?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</TableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div style={{ textAlign: "center", width: "200px", position: "relative", left: "40%", marginTop: "70px", marginBottom: "70px" }}>
                    <div className="button-block">
                        {userbooking.statusId == 1
                            ? <Button id="submit1" onClick={(e) => ShowSubmit1(e, userbooking.bookingId)} value={2} style={{ display: "block" }}>Xác nhận</Button>
                            : userbooking.statusId == 2
                                ? <Button id="submit2" onClick={(e) => ShowSubmit2(e, userbooking.bookingId)} value={3} style={{ display: "block" }}>Hoàn thành</Button>
                                : userbooking.statusId == 3
                                    ? <></>
                                    : <></>
                        }
                        {userbooking.statusId == 1 || userbooking.statusId == 2
                            ? <Button onClick={(e) => handleChangeStatus(e, userbooking.bookingId)} value={4} style={{ marigin: "10px", backgroundColor: "red" }}>Hủy</Button>
                            : <></>
                        }
                    </div>
                </div>
            </Container>
        </div>
    )
}