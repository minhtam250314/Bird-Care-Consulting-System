import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import * as Config from "../../../utils/Config";
import axios from "axios";
import { Link } from "react-router-dom"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { FormControl, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Button, Container } from "react-materialize";
import callerApi1 from '../../../utils/APICaller_Account'
import { toast } from 'react-toastify';
import Grid from "@mui/system/Unstable_Grid/Grid";
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
export default function OrderDetail() {
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

    const orderid = useParams();
    const [userorder, setUserOrder] = useState([]);
    const [orderdetail, setOrderDetail] = useState([]);
    const [productdetail, setProductDetail] = useState([]);
    const [status, setStatus] = useState('');
    const [paymentMethod, setPaymentMethod] = useState(null);

    const handleChangeStatus = (event, orderId) => {
        setStatus(event.target.value);
        callerApi1("Order/UpdateStaus", "PUT", {
            orderId: orderId,
            statusId: event.target.value
        }).then(res => {
            console.log(res);
            window.location.reload();
        });
    };

    const handleChangePaymentMethod = (event, orderId) => {
        callerApi1("Order/UpdatePayMentMethodByOrderId", "PUT", {
            orderId: orderId,
            paymentMethod: event
        }).then(res => {
            console.log(res);
            callerApi1("Order/UpdateStaus", "PUT", {
                orderId: orderId,
                statusId: 3
            }).then(res => {
                console.log(res);
                window.location.reload();
            });
        });
    }

    function getOrderUserInfo() {
        callerApi1("Order/GetOrderByOrderIdAdmin?id=" + orderid.orderId, "GET", null)
            .then(response => response.data).then((data) => {
                console.log(data)
                setUserOrder(data)
            });
    }




    function getOrderDetail() {
        axios.get(`${Config.API_URL}/Order/GetOrderDetailByOrderId?orderId=` + orderid.orderId)
            .then(response => response.data)
            .then((data) => {
                console.log(data)
                setOrderDetail(data)
            });
    }

    function getProductDetail() {
        orderdetail.map(orderdetail => {
            axios.get(`${Config.API_URL}/Product/GetProductById?id=` + orderdetail.productId)
                .then(response => response.data)
                .then((data) => {
                    setProductDetail(productdetail => [...productdetail, data])
                });
        })
    }

    function ShowSubmit1(event, orderId) {
        handleChangeStatus(event, orderId);
    }

    function CheckAndSubmit(event, orderId) {
        if (userorder.paymentMethod.toLowerCase() == "online") {
            handleChangeStatus(event, orderId);
        }
        else {
            if (userorder.paymentMethod.toLowerCase() == "cod" && paymentMethod != null) {
                handleChangePaymentMethod(paymentMethod, orderId);
            } else {
                toast.error("Vui lòng cập nhật phương thức thanh toán", 2000);
                document.getElementById("error").innerHTML = "Vui lòng cập nhật phương thức thanh toán";
            }
        }
    }
    useEffect(() => {
        getOrderUserInfo();
        getOrderDetail();
    }, [])
    useEffect(() => {
        if (orderdetail) {
            getProductDetail();
        }
    }, [JSON.stringify(orderdetail)])

    return (
        <div>
            <div className="start-shopping">
                <Link to="/admin">
                    <div style={{ display: "flex" }}><KeyboardBackspaceIcon />Quay Về</div>
                </Link>
            </div>
            <Container>
                <div className="introHeading">Chi tiết đơn hàng</div>
                <div className="bottom-line2" style={{ marginTop: "25px" }}></div>
                <br />
                <div>
                    <h4 className="UDetail-intro" >Thông tin giao hàng</h4>
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
                                        type="text" className="form-control" value={userorder.fullName} disabled />

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
                                        className="form-control" value={userorder.phone} disabled />

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
                                        type="text" className="form-control" value={userorder.address} disabled />
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
                                        type="text" className="form-control" value={userorder.note} disabled />
                                </div>
                                <div className="form-group">
                                    <label className="Register-title" htmlFor="type">
                                        <text>Phương thức thanh toán</text>
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
                                        type="text" className="form-control" value={userorder.paymentMethod} disabled />
                                </div>
                                {userorder.statusId === 2 && userorder.paymentMethod.toLowerCase() === "cod" ? (
                                    <div id="showOfline">
                                        <FormControl>
                                            <label>Cập nhật phương thức thanh toán</label>
                                            <Select
                                                labelId="demo-simple-select-label"
                                                id="demo-simple-select"
                                                onChange={(e) => setPaymentMethod(e.target.value)}
                                                required
                                            >
                                                <MenuItem value={"COD - Banking"}>COD - Banking</MenuItem>
                                                <MenuItem value={"COD - Momo"}>COD - Momo</MenuItem>
                                                <MenuItem value={"COD - Visa/Mastercard"}>COD - Visa/Mastercard</MenuItem>
                                                <MenuItem value={"COD - Tiền Mặt"}>COD - Tiền Mặt</MenuItem>
                                            </Select>
                                        </FormControl>
                                        <div style={{ color: "red" }} id="error"></div>
                                    </div>) : <></>
                                }
                                <div className="form-group">
                                    <label className="Register-title" htmlFor="type">
                                        <text>Trạng thái đơn hàng</text>
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
                                        type="text" className="form-control" value={userorder.statusId == 1 ? "Chờ Xác Nhận" :
                                            userorder.statusId == 2 ? "Đã Xác Nhận" :
                                                userorder.statusId == 3 ? "Hoàn Thành" :
                                                    "Đã Hủy"
                                        } disabled />
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                </div>
                <br />
                <h4 className="UDetail-intro" >Các sản phẩm trong đơn hàng</h4>
                <br />
                <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow >
                            <StyledTableCell align ="center" style={{borderRight:"1px solid white"}}>Hình ảnh</StyledTableCell>
                            <StyledTableCell align ="center" style={{borderRight:"1px solid white"}}>Tên sản phẩm</StyledTableCell>
                            <StyledTableCell align ="center" style={{borderRight:"1px solid white"}}>Giá</StyledTableCell>
                            <StyledTableCell align ="center" style={{borderRight:"1px solid white"}}>Số lượng</StyledTableCell>
                            <StyledTableCell align ="center"style={{borderLeft:"1px solid white"}}>Tạm tính</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productdetail.map((productdetail, index) => (
                            <StyledTableRow key={index} >
                                <TableCell align="center"><img style={{ width: "200px", height: "200px" }} src={productdetail.image} alt="" /></TableCell>
                                <TableCell align="left">{productdetail.productName}</TableCell>
                                <TableCell align="right">{(orderdetail[index].price)?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</TableCell>
                                <TableCell align="right">{orderdetail[index].productQuantiy}</TableCell>
                                <TableCell align="right">{(orderdetail[index].price * orderdetail[index].productQuantiy)?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</TableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
                </TableContainer>
                <br />
                <div style={{ textAlign: "center", width: "200px", position: "relative", left: "40%", marginTop: "70px", marginBottom: "70px" }}>
                    <div className="button-block">
                        {userorder.statusId == 1
                            ? <Button id="submit1" onClick={(e) => ShowSubmit1(e, userorder.orderId)} value={2} style={{ display: "block" }}>Xác nhận</Button>
                            : userorder.statusId == 2
                                ? <Button id="submit2" onClick={(e) => CheckAndSubmit(e, userorder.orderId)} value={3} style={{ display: "block" }}>Hoàn thành</Button>
                                : userorder.statusId == 3
                                    ? <></>
                                    : <div></div>
                        }
                        {userorder.statusId == 1 || userorder.statusId == 2
                            ? <Button onClick={(e) => handleChangeStatus(e, userorder.orderId)} value={4} style={{ marigin: "10px", backgroundColor: "red" }}>Hủy</Button>
                            : <div></div>
                        }
                    </div>
                </div>
            </Container>
        </div>
    )
}