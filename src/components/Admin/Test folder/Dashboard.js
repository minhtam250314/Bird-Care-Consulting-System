import React from 'react';
import { Table, TableHead, TableRow, TableCell, Button, TableBody } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useEffect, useState } from "react";
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { Link } from "react-router-dom";
import APICaller3 from "../../../utils/APICaller3";
export default function Dashboard() {
    const [OrderList, setOrderList] = useState([])

    async function getData() {
        await APICaller3("order", "GET", null).then(res => {
            setOrderList(res.data)
        });
        console.log(OrderList);
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div>
            <Link to="/add">
                <Button variant="contained" style={{ float: "left" }}>
                    <AddIcon />
                    Add New Film
                </Button>
            </Link>
            <Table style={{ marginBottom: "20px" }}>
                <TableHead>
                    <TableRow>
                        <TableCell>Mã Đơn Hàng</TableCell>
                        <TableCell>Ngày Đặt</TableCell>
                        <TableCell>Số Lượng</TableCell>
                        <TableCell>Giá</TableCell>
                        <TableCell>Địa Chỉ & Liên Hệ</TableCell>
                        <TableCell>Ghi chú</TableCell>
                        <TableCell>Phương Thức Thanh Toán</TableCell>
                        <TableCell>Trạng Thái</TableCell>
                        <TableCell>Thông Tin</TableCell>
                    </TableRow>
                </TableHead>
                {OrderList
                    .map((order, index) => (
                        <TableBody>
                            <TableRow key={index}>
                                <TableCell>{order.id}</TableCell>
                                <TableCell>{order.OrderDate}</TableCell>
                                <TableCell>{order.ProductQuantity}</TableCell>
                                <TableCell>{order.TotalPrice} VND</TableCell>
                                <TableCell>

                                    <h5 style={{ fontSize: '15px' }}>Địa chỉ nhận hàng: {order.adress}</h5>
                                    <h5 style={{ fontSize: '15px' }}>Số Điện Thoại: {order.phone}</h5>
                                    <h5 style={{ fontSize: '15px' }}>Email: {order.email}</h5>

                                </TableCell>
                                <TableCell>{order.note}</TableCell>
                                <TableCell>
                                    {order.paymentType}
                                </TableCell>
                                <TableCell>
                                    <FormControl>
                                        <NativeSelect
                                        defaultValue={order.Status}>
                                            <option value={"Chờ Xác Nhận"}>Chờ Xác Nhận</option>
                                            <option value={"Đã Xác Nhận"}>Đã Xác Nhận</option>
                                            <option value={"Hoàn Thành"}>Hoàn Thành</option>
                                            <option value={"Đã Hủy"}>Đã Hủy</option>
                                        </NativeSelect>
                                    </FormControl>
                                </TableCell>
                                <TableCell>
                                    <Link to={`/don-hang/${order.id}`}>
                                        <Button>Chi Tiết</Button>
                                    </Link>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    ))}
            </Table>
        </div>
    );
}