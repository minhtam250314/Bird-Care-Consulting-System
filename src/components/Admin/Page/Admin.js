import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import { Link } from "react-router-dom";
import { Button } from '@mui/material';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from "react";
import callerApi from '../../../utils/APICaller';
import callerApi2 from '../../../utils/APICaller_Account';
import { toast } from 'react-toastify';
import { Container, Card, CardContent, CardActions } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Grid from '@mui/material/Grid';
import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import InventoryIcon from '@mui/icons-material/Inventory';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import BarChartIcon from '@mui/icons-material/BarChart';
import PaidIcon from '@mui/icons-material/Paid';
import GigaChart from '../GigaChart';

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 5 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function TabPanel2(props){
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 5 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function TabPanel3(props){
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 5 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

TabPanel2.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

TabPanel3.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

function a11yProps2(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

function a11yProps3(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export default function Admin() {
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };
    const [value, setValue] = React.useState((localStorage.getItem("tabValue"))? JSON.parse(localStorage.getItem("tabValue")) : 0);
    const [value2, setValue2] = React.useState((localStorage.getItem("tabValue2"))? JSON.parse(localStorage.getItem("tabValue2")) : 0);
    const [value3, setValue3] = React.useState((localStorage.getItem("tabValue3"))? JSON.parse(localStorage.getItem("tabValue3")) : 0);
    const [search, setSearch] = useState("");
    const [search2, setSearch2] = useState("");
    const [search3, setSearch3] = useState("");
    const [products, setProducts] = useState([]);
    const [productList, setProductList] = useState([]);
    const [services, setServices] = useState([]);
    const [serviceList, setServiceList] = useState([]);
    const [posts, setPosts] = useState([]);
    const [postList, setPostList] = useState([]);
    const [orders, setOrders] = useState([]);
    const [bookings, setBookings] = useState([]);
    const [status, setStatus] = React.useState('');
    const [birds, setBirds] = React.useState([]);
    const [serviceSale, setServiceSale] = useState("");
    const [productSale, setProductSale] = useState("");
    const [revenue, setRevenue] = useState("");
    const [categorySale, setCategorySale] = useState([]);
    const [mostSoldProduct, setMostSoldProduct] = useState("");
    const [deleteId, setDeleteId] = useState("");
    const [open, setOpen] = React.useState(false);
    const handleOpen =  () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [
            {
                label: "",
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 0,
            },
        ],
    });
    const [chartOptions, setChartOptions] = useState({
        plugins: {
            datalabels: {
                formatter: (value) => {
                    const total = 0;
                    const percent = ((value / total) * 100).toFixed(2);
                    return percent + "%";
                },
                color: 'white',
            },
        },
    });

    const [chartData2, setChartData2] = useState({
        labels: [],
        datasets: [
            {
                label: "",
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 0,
            },
        ],
    });

    const [chartOptions2, setChartOptions2] = useState({
        plugins: {
            datalabels: {
                formatter: (value) => {
                    const total = 0;
                    const percent = ((value / total) * 100).toFixed(2);
                    return percent + "%";
                },
                color: 'white',
            },
        },
    });



    async function getProducts() {
        await callerApi("Product/GetAllProduct/Filter?filterPrice=nothing&filterCategory=nothing", "GET", null).then(res => {
            setProducts(res.data);
        });
    }

    async function getServices() {
        await callerApi("Service/GetAllServices", "GET", null).then(res => {
            setServices(res.data);
        });
    }

    async function getPosts() {
        await callerApi("Post/GetAllPost/FilterByDate?filter=newest", "GET", null).then(res => {
            setPosts(res.data);
        });
    }

    async function getOrders() {
        await callerApi("Order/GetOrder", "GET", null).then(res => {
            setOrders(res.data);
        });
    }

    async function getBookings() {
        await callerApi2("Booking/GetAllBooking", "GET", null).then(res => {
            setBookings(res.data);
        });
    }

    async function getBirds() {
        await callerApi("Bird/GetAllBirdtype", "GET", null).then(res => {
            setBirds(res.data);
        });
    }

    async function getServiceSale(){
        await callerApi("Sale/CaculateServiceSaleInCurrentMonth", "GET", null).then(res => {
            setServiceSale(res.data);
        })
    }

    async function getProductSale(){
        await callerApi("Sale/CaculateProductSaleInCurrentMonth", "GET", null).then(res => {
            setProductSale(res.data);
        })
    }

    async function getRevenue(){
        await callerApi("Sale/Revenue", "GET", null).then(res => {
            setRevenue(res.data);
        })
    }

    async function getCategorySale(){
        await callerApi("Sale/Category", "GET", null).then(res => {
            setCategorySale(res.data);
        })
    }

    async function getMostSoldProduct(){
        await callerApi("Sale/orders/most-sold-product", "GET", null).then(res => {
            setMostSoldProduct(res.data);
        })
    }

    useEffect(() => {
        getMostSoldProduct();
        getCategorySale();
        getRevenue();
        getProductSale();
        getServiceSale();
        getBirds();
        getBookings();
        getOrders();
        getPosts();
        getServices();
        getProducts();
    }, [])

    //Cho Search
    useEffect(() => {
        setProductList(products.filter((product) => {
            return product.productName.toLowerCase().includes(search.toLowerCase())
        }));
    }, [search, products])

    useEffect(() => {
        setServiceList(services.filter((service) => {
            return service.serviceName.toLowerCase().includes(search2.toLowerCase())
        }));
    }, [search2, services])

    useEffect(() => {
        setPostList(posts.filter((post) => {
            return post.title.toLowerCase().includes(search3.toLowerCase())
        }));
    }, [search3, posts])

    useEffect(() => {
        if (categorySale) {
            setChartData({
                labels: ["Thức Ăn", "Thuốc"],
                datasets: [
                    {
                        label: "Số lượng bán ra",
                        data: [categorySale.foodQuantity, categorySale.medicineQuantity],
                        backgroundColor: ["#3e95cd", "#8e5ea2"],
                        borderColor: ["#3e95cd", "#8e5ea2"],
                        borderWidth: 1,
                    },
                ],
            });
            setChartOptions({
                plugins: {
                    datalabels: {
                        formatter: (value) => {
                            const total = categorySale.foodQuantity + categorySale.medicineQuantity;
                            const percent = ((value / total) * 100).toFixed(2);
                            return percent + "%";
                        },
                        color: 'white',
                    },
                },
            });
            setChartData2({
                labels: ["Thức Ăn", "Thuốc"],
                datasets: [
                    {
                        label: "Doanh thu thu được",
                        data: [categorySale.foodAmount, categorySale.medicineAmount],
                        backgroundColor: ["#3e95cd", "#8e5ea2"],
                        borderColor: ["#3e95cd", "#8e5ea2"],
                        borderWidth: 1,
                    },
                ],
            });
        }
        setChartOptions2({
            plugins: {
                datalabels: {
                    formatter: (value) => {
                        const total = categorySale.foodAmount + categorySale.medicineAmount;
                        const percent = ((value / total) * 100).toFixed(2);
                        return percent + "%";
                    },
                    color: 'white',
                },
            },
        });
    }, [categorySale])

    function deleteModal(){
        if(localStorage.getItem("tabValue")==="1"){
            deleteProduct(deleteId);
        }else if(localStorage.getItem("tabValue")==="2"){
            deleteService(deleteId);
        }else if(localStorage.getItem("tabValue")==="3"){
            deletePost(deleteId);
        }
    }

    function deleteProduct(id) {
        callerApi2("Product/DeteleProduct?proId=" + id, "DELETE", null).then(res => {
            console.log(res);
            if (res.status === 200) {
                toast.success("Xóa thành công");
                setInterval(() => {
                    window.location.reload();
                }, 3000);
            }
        }).catch(err => {
            toast.error("Xóa thất bại");
        });
    }

    function deleteService(id) {
        callerApi2("Service/DeleteService?id=" + id, "DELETE", null).then(res => {
            console.log(res);
            if (res.status === 200) {
                toast.success("Xóa thành công");
                setInterval(() => {
                    window.location.reload();
                }, 3000);
            }
        }).catch(err => {
            toast.error("Xóa thất bại");
        });;
    }

    function deletePost(id) {
        callerApi2("Post/DeletePost?postId=" + id, "DELETE", null).then(res => {
            console.log(res);
            if (res.status === 200) {
                toast.success("Xóa thành công");
                setInterval(() => {
                    window.location.reload();
                }, 3000);
            }
        }).catch(err => {
            toast.error("Xóa thất bại");
        });
    }


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChange2 = (event, newValue) => {
        setValue2(newValue);
    };

    const handleChange3 = (event, newValue) => {
        setValue3(newValue);
    };

    function setTabValue(value) {
        localStorage.setItem("tabValue", value);
    }

    function setTabValue2(value) {
        localStorage.setItem("tabValue2", value);
    }

    function setTabValue3(value) {
        localStorage.setItem("tabValue3", value);
    }

    return (
        <Box
            sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex' }}
        >
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography style={{ fontWeight: "bold" }} id="modal-modal-title" variant="h6" component="h2">
                        Xác Nhận Xóa?
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Button onClick={()=>deleteModal()} variant="contained" style={{ backgroundColor: "green", color: "white", marginRight: "10px" }}>Xóa</Button>
                        <Button onClick={handleClose} variant="contained" style={{ backgroundColor: "red", color: "white" }}>Hủy</Button>
                    </Typography>
                </Box>
            </Modal>
            <Tabs
                orientation="vertical"
                variant="scrollable"
                value={value}
                onChange={handleChange}
                aria-label="Vertical tabs example"
                sx={{ borderRight: 1, borderColor: 'divider', backgroundColor: "#f5f5f5" }}
                
            >
                <Tab  onClick={()=> setTabValue(0)} style={{backgroundColor: "white"}} icon={<BarChartIcon style={{color: "red"}} />} iconPosition="start" label="Bảng Điều Khiển" {...a11yProps(0)} />
                <Tab onClick={()=> setTabValue(1)} style={{backgroundColor: "white"}} icon={<InventoryIcon style={{color: "red"}} />} iconPosition="start" label="Quản Lý Sản Phẩm" {...a11yProps(1)} />
                <Tab onClick={()=> setTabValue(2)} style={{backgroundColor: "white"}} icon={<HomeIcon style={{color: "red"}} />} iconPosition="start" label="Quản Lý Dịch Vụ" {...a11yProps(2)} />
                <Tab onClick={()=> setTabValue(3)} style={{backgroundColor: "white"}} icon={<ArticleIcon style={{color: "red"}} />} iconPosition="start" label="Quản Lý Bài Viết" {...a11yProps(3)} />
                <Tab onClick={()=> setTabValue(4)} style={{backgroundColor: "white"}} icon={<ShoppingCartIcon style={{color: "red"}} />} iconPosition="start" label="Quản Lý Đơn Hàng" {...a11yProps(4)} />
                <Tab onClick={()=> setTabValue(5)} style={{backgroundColor: "white"}} icon={<CalendarMonthIcon style={{color: "red"}} />} iconPosition="start" label="Quản Lý Đặt Lịch" {...a11yProps(5)} />
            </Tabs>

            <TabPanel value={value} index={0} style={{ marginBottm: "10px", backgroundColor: '#f5f5f5' }}>
                <div>
                    <div className="introHeading">Tổng Quan</div>
                    <div className="bottom-line2" style={{ marginTop: "25px" }}></div>
                    <Grid container spacing={2} style={{width: "1200px"}}>
                        <Grid item xs={12} sm={6} md={3}>
                        <Container>
                            <Card sx={{ minWidth: 260 }} style={{ backgroundColor: "#fff" }}>
                                <CardContent>
                                    <Typography style={{fontSize: 20, color: "#8898aa"}} color="text.secondary" gutterBottom>
                                        Tổng Số Sản Phẩm
                                        <InventoryIcon style={{ fontSize: 28, marginLeft: "20px", color: "#f5365c"}} />
                                    </Typography>
                                    <Typography sx={{fontSize: 18, fontWeight: "bold" }} color="text.secondary">
                                        {products.length}
                                    </Typography>
                                </CardContent>
                                <CardActions style={{fontSize: 15, color: "#8898aa", marginLeft: "10px", cursor: "pointer"}} onClick={()=> setValue(1)}>
                                    Chi Tiết <ArrowForwardIcon style={{ fontSize: 28, color: "#f5365c" }} />
                                </CardActions>
                            </Card>
                        </Container>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                        <Container>
                            <Card sx={{ minWidth: 260 }} style={{ backgroundColor: "#fff", width: "100px" }}>
                                <CardContent>
                                    <Typography style={{fontSize: 20, color: "#8898aa"}} color="text.secondary" gutterBottom>
                                        Tổng Số Dịch Vụ
                                        <HomeIcon style={{ fontSize: 28, marginLeft: "20px", color: "#f5365c"}} />
                                    </Typography>
                                    <Typography sx={{fontSize: 18, fontWeight: "bold" }} color="text.secondary">
                                        {services.length}
                                    </Typography>
                                </CardContent>
                                <CardActions style={{fontSize: 15, color: "#8898aa", marginLeft: "10px", cursor: "pointer"}} onClick={()=> setValue(2)}>
                                    Chi Tiết <ArrowForwardIcon style={{ fontSize: 28, color: "#f5365c" }} />
                                </CardActions>
                            </Card>
                        </Container>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                        <Container>
                            <Card sx={{ minWidth: 260 }} style={{ backgroundColor: "#fff" }}>
                                <CardContent>
                                    <Typography style={{fontSize: 20, color: "#8898aa"}} color="text.secondary" gutterBottom>
                                        Tổng Số Bài Viết
                                        <ArticleIcon style={{ fontSize: 28, marginLeft: "20px", color: "#f5365c"}} />
                                    </Typography>
                                    <Typography sx={{fontSize: 18, fontWeight: "bold" }} color="text.secondary">
                                        {posts.length}
                                    </Typography>
                                </CardContent>
                                <CardActions style={{fontSize: 15, color: "#8898aa", marginLeft: "10px", cursor: "pointer"}} onClick={()=> setValue(3)}>
                                    Chi Tiết <ArrowForwardIcon style={{ fontSize: 28, color: "#f5365c" }} />
                                </CardActions>
                            </Card>
                        </Container>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                        <Container>
                            <Card sx={{ minWidth: 260 }} style={{ backgroundColor: "#fff" }}>
                                <CardContent>
                                    <Typography style={{fontSize: 20, color: "#8898aa"}} color="text.secondary" gutterBottom>
                                        Tổng Số Đơn Hàng
                                        <ShoppingCartIcon style={{ fontSize: 28, marginLeft: "20px", color: "#f5365c"}} />
                                    </Typography>
                                    <Typography sx={{fontSize: 18, fontWeight: "bold" }} color="text.secondary">
                                        {orders.length}
                                    </Typography>
                                </CardContent>
                                <CardActions style={{fontSize: 15, color: "#8898aa", marginLeft: "10px", cursor: "pointer"}} onClick={()=> setValue(4)}>
                                    Chi Tiết <ArrowForwardIcon style={{ fontSize: 28, color: "#f5365c" }} />
                                </CardActions>
                            </Card>
                        </Container>
                        </Grid>
                        <Grid item xs={12} sm={6} md={3}>
                        <Container>
                            <Card sx={{ minWidth: 260 }} style={{ backgroundColor: "#fff" }}>
                                <CardContent>
                                    <Typography style={{fontSize: 20, color: "#8898aa"}} color="text.secondary" gutterBottom>
                                        Tổng Số Lịch Hẹn
                                        <CalendarMonthIcon style={{ fontSize: 28, marginLeft: "20px", color: "#f5365c"}} />
                                    </Typography>
                                    <Typography sx={{fontSize: 18, fontWeight: "bold" }} color="text.secondary">
                                        {bookings.length}
                                    </Typography>
                                </CardContent>
                                <CardActions style={{fontSize: 15, color: "#8898aa", marginLeft: "10px", cursor: "pointer"}} onClick={()=> setValue(5)}>
                                    Chi Tiết <ArrowForwardIcon style={{ fontSize: 28, color: "#f5365c" }} />
                                </CardActions>
                            </Card>
                        </Container>
                        </Grid>
                    </Grid>
                    <div>
                    </div>

                    <div>
                        <div className="introHeading">Tổng Doanh Thu Tháng Này</div>
                        <div className="bottom-line2" style={{ marginTop: "25px" }}></div>
                        <Grid container spacing={2} style={{width: "1200px"}}>
                            <Grid item xs={12} sm={6} md={3}>
                                <Container>
                                    <Card sx={{ minWidth: 260, marginLeft: 20 }} style={{ backgroundColor: "#fff" }}>
                                        <CardContent>
                                            <Typography style={{ fontSize: 19, color: "#8898aa" }} color="text.secondary" gutterBottom>
                                                Doanh Số Sản Phẩm
                                                <PaidIcon style={{ fontSize: 25, marginLeft: "20px", color: "#f5365c" }} />
                                            </Typography>
                                            <Typography sx={{ fontSize: 18, fontWeight: "bold" }} color="text.secondary">
                                                {(productSale.total)?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Container>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Container>
                                    <Card sx={{ minWidth: 260, marginLeft: 20 }} style={{ backgroundColor: "#fff" }}>
                                        <CardContent>
                                            <Typography style={{ fontSize: 19, color: "#8898aa" }} color="text.secondary" gutterBottom>
                                                Doanh Số Dich Vụ
                                                <PaidIcon style={{ fontSize: 25, marginLeft: "20px", color: "#f5365c" }} />
                                            </Typography>
                                            <Typography sx={{ fontSize: 18, fontWeight: "bold" }} color="text.secondary">
                                                {(serviceSale.total)?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Container>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Container>
                                    <Card sx={{ minWidth: 260, marginLeft: 20 }} style={{ backgroundColor: "#fff" }}>
                                        <CardContent>
                                            <Typography style={{ fontSize: 19, color: "#8898aa" }} color="text.secondary" gutterBottom>
                                                Tổng Doanh Số
                                                <PaidIcon style={{ fontSize: 25, marginLeft: "20px", color: "#f5365c" }} />
                                            </Typography>
                                            <Typography sx={{ fontSize: 18, fontWeight: "bold" }} color="text.secondary">
                                                {revenue.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Container>
                            </Grid>
                        </Grid>
                    </div>

                    <div style={{width: "1200px"}}>
                        <div className="introHeading">Hiệu Suất Bán Hàng Tháng Này</div>
                        <div className="bottom-line2" style={{ marginTop: "25px" }}></div>
                        <div style={{display: "flex"}}>
                        <div style={{width: "680px", height: "450px"}}>
                            <GigaChart chartData={chartData} chartOptions={chartOptions} />
                            <div style={{textAlign: "center"}}>Số Lượng</div>
                        </div>
                        <div style={{width: "600px", height: "450px"}}>
                            <GigaChart chartData={chartData2} chartOptions={chartOptions2} />
                            <div style={{textAlign: "center"}}>Doanh Thu</div>
                        </div>
                        </div>
                    </div>

  
                    <div className="introHeading">Các Đơn Hàng Gần Đây</div>
                    <div className="bottom-line2" style={{ marginTop: "25px" }}></div>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{fontWeight: "bold"}}>ID</TableCell>
                                <TableCell sx={{fontWeight: "bold"}}>Tên Khách Hàng</TableCell>
                                <TableCell sx={{fontWeight: "bold"}}>Địa Chỉ</TableCell>
                                <TableCell sx={{fontWeight: "bold"}}>Số Điện Thoại</TableCell>
                                <TableCell sx={{fontWeight: "bold"}}>Ngày Đặt Hàng</TableCell>
                                <TableCell sx={{fontWeight: "bold"}}>Trạng Thái</TableCell>
                                <TableCell sx={{fontWeight: "bold"}}>Chi Tiết</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {((orders.slice(orders.length-5,orders.length)).reverse()).map((order) => (
                                <TableRow key={order.orderId}>
                                    <TableCell>{order.orderId}</TableCell>
                                    <TableCell>{order.fullName}</TableCell>
                                    <TableCell>{order.address}</TableCell>
                                    <TableCell>{order.phone}</TableCell>
                                    <TableCell>{order.orderDate.slice(8, 10) + "/" + order.orderDate.slice(5, 7) + "/" + order.orderDate.slice(0, 4) + " " + order.orderDate.slice(11, 16)}</TableCell>
                                    <TableCell>
                                        <div>
                                            {order.statusId == 1 ? <div>Chờ Xác Nhận</div> :
                                                order.statusId == 2 ? <div>Đã Xác Nhận</div> :
                                                    order.statusId == 3 ? <div>Hoàn Thành</div> :
                                                        <div>Đã Hủy</div>}
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/admin/don-hang/${order.orderId}`}>
                                            <Button variant="contained" style={{ backgroundColor: "#f5365c", color: "#fff" }}>
                                                Chi Tiết
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {/* 5 lịch hẹn mới nhất */}
                    <div className="introHeading">Các Lịch Hẹn Gần Đây</div>
                    <div className="bottom-line2" style={{ marginTop: "25px" }}></div>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{fontWeight: "bold"}}>ID</TableCell>
                                <TableCell sx={{fontWeight: "bold"}}>Tên Khách Hàng</TableCell>
                                <TableCell sx={{fontWeight: "bold"}}>Địa Chỉ</TableCell>
                                <TableCell sx={{fontWeight: "bold"}}>Số Điện Thoại</TableCell>
                                <TableCell sx={{fontWeight: "bold"}}>Ngày Đặt Hẹn</TableCell>
                                <TableCell sx={{fontWeight: "bold"}}>Trạng Thái</TableCell>
                                <TableCell sx={{fontWeight: "bold"}}>Chi Tiết</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {((bookings.slice(bookings.length-5, bookings.length)).reverse()).map((booking) => (
                                <TableRow key={booking.bookingId}>
                                    <TableCell>{booking.bookingId}</TableCell>
                                    <TableCell>{booking.fullName}</TableCell>
                                    <TableCell>{booking.address}</TableCell>
                                    <TableCell>{booking.phone}</TableCell>
                                    <TableCell>{booking.bookingDate.slice(8,10)+"-"+booking.bookingDate.slice(5,7)+"-"+booking.bookingDate.slice(0,4)+" "+booking.bookingDate.slice(11,19)}</TableCell>
                                    <TableCell>
                                        {booking.statusId == 1 ? <div>Chờ Xác Nhận</div> :
                                            booking.statusId == 2 ? <div>Đã Xác Nhận</div> :
                                                booking.statusId == 3 ? <div>Hoàn Thành</div> :
                                                    <div>Đã Hủy</div>}
                                    </TableCell>
                                    <TableCell>
                                        <Link to={`/admin/lich-hen/${booking.bookingId}`}>
                                            <Button variant="contained" style={{ backgroundColor: "#f5365c", color: "#fff" }}>
                                                Chi Tiết
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                </div>
            </TabPanel>
            <TabPanel value={value} index={1} style={{ backgroundColor: '#f5f5f5' }}>
                <div>
                    <div className="introHeading">Quản Lý Sản Phẩm</div>
                    <div className="bottom-line2" style={{ marginTop: "25px" }}></div>
                    <div className="row" style={{ width: '1200px' }}>
                        <div>
                        <Link to="/admin/them-san-pham">
                            <Button variant="contained" style={{ float: "left" }}>
                                <AddIcon />
                                Thêm Sản Phẩm Mới
                            </Button>
                        </Link>
                        <div style={{float: "right", width: "500px"}}><input onChange={(e)=>setSearch(e.target.value)} type="text" placeholder="Tìm kiếm sản phẩm.." name="search" /></div>
                        </div>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{fontWeight: "bold"}}>ID</TableCell>
                                    <TableCell sx={{fontWeight: "bold"}}>Hình Ảnh</TableCell>
                                    <TableCell sx={{fontWeight: "bold"}}>Tên Sản Phẩm</TableCell>
                                    <TableCell sx={{fontWeight: "bold"}}>Giá</TableCell>
                                    <TableCell sx={{fontWeight: "bold"}}>Số Lượng</TableCell>
                                    <TableCell sx={{fontWeight: "bold"}}>Mô Tả</TableCell>
                                    <TableCell sx={{fontWeight: "bold"}}>Mục</TableCell>
                                    <TableCell sx={{fontWeight: "bold"}}>Quản Lý</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {productList.map((product) => (
                                    <TableRow key={product.productId}>
                                        <TableCell>{product.productId}</TableCell>
                                        <TableCell>
                                            <img style={{ width: "200px", height: "200px" }} src={product.image} alt={product.productName} width="100px" />
                                        </TableCell>
                                        <TableCell>{product.productName}</TableCell>
                                        <TableCell>{(product.price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</TableCell>
                                        <TableCell>{product.quantity}</TableCell>
                                        <TableCell>{product.description}</TableCell>
                                        <TableCell>{product.category}</TableCell>
                                        <TableCell>
                                            <Link to={`/admin/quan-ly-san-pham/${product.productId}`}>
                                                <Button variant="contained" color="primary">
                                                    <EditIcon />
                                                </Button>
                                            </Link>
                                            <Button variant="contained" color="secondary" onClick={()=>{handleOpen();setDeleteId(product.productId)}}>
                                                <DeleteIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </TabPanel>
            <TabPanel value={value} index={2} style={{ backgroundColor: '#f5f5f5' }}>
                <div>
                    <div className="introHeading">Quản Lý Dịch Vụ</div>
                    <div className="bottom-line2" style={{ marginTop: "25px" }}></div>
                    <div className="row" style={{ width: '1200px' }}>
                        <Link to="/admin/them-dich-vu">
                            <Button variant="contained" style={{ float: "left" }}>
                                <AddIcon />
                                Thêm Dịch Vụ Mới
                            </Button>
                        </Link>
                        <div style={{float: "right", width: "500px"}}><input onChange={(e)=>setSearch2(e.target.value)} type="text" placeholder="Tìm kiếm dịch vụ.." name="search" /></div>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{fontWeight: "bold"}}>ID</TableCell>
                                    <TableCell sx={{fontWeight: "bold"}}>Hình Ảnh</TableCell>
                                    <TableCell sx={{fontWeight: "bold"}}>Tên Dịch Vụ</TableCell>
                                    <TableCell sx={{fontWeight: "bold"}}>Giá</TableCell>
                                    <TableCell sx={{fontWeight: "bold"}}>Mô Tả</TableCell>
                                    <TableCell sx={{fontWeight: "bold"}}>Quản Lý</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {serviceList.map((service) => (
                                    <TableRow key={service.serviceId}>
                                        <TableCell>{service.serviceId}</TableCell>
                                        <TableCell>
                                            <img style={{ width: "200px", height: "200px" }} src={service.image} alt={service.serviceName} width="100px" />
                                        </TableCell>
                                        <TableCell>{service.serviceName}</TableCell>
                                        <TableCell>{(service.price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</TableCell>
                                        <TableCell>{service.desciption}</TableCell>
                                        <TableCell>
                                            <Link to={`/admin/quan-ly-dich-vu/${service.serviceId}`}>
                                                <Button variant="contained" color="primary">
                                                    <EditIcon />
                                                </Button>
                                            </Link>
                                            <Button variant="contained" color="secondary" onClick={()=>{handleOpen();setDeleteId(service.serviceId)}}>
                                                <DeleteIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </TabPanel>
            <TabPanel value={value} index={3} style={{ backgroundColor: '#f5f5f5' }}>
                <div>
                    <div className="introHeading">Quản Lý Bài Viết</div>
                    <div className="bottom-line2" style={{ marginTop: "25px" }}></div>
                    <div className="row" style={{ width: '1200px' }}>
                        <Link to="/admin/them-bai-viet">
                            <Button variant="contained" style={{ float: "left" }}>
                                <AddIcon />
                                Thêm Bài Viết Mới
                            </Button>
                        </Link>
                        <div style={{float: "right", width: "500px"}}><input onChange={(e)=>setSearch3(e.target.value)} type="text" placeholder="Tìm kiếm bài viết.." name="search" /></div>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{fontWeight: "bold"}}>ID</TableCell>
                                    <TableCell sx={{fontWeight: "bold"}}>Hình Ảnh</TableCell>
                                    <TableCell sx={{fontWeight: "bold"}}>Tiêu Đề</TableCell>
                                    <TableCell sx={{fontWeight: "bold"}}>Tác Giả</TableCell>
                                    <TableCell sx={{fontWeight: "bold"}}>Ngày Đăng</TableCell>
                                    <TableCell sx={{fontWeight: "bold"}}>Mục Chim</TableCell>
                                    <TableCell sx={{fontWeight: "bold"}}>Mô Tả</TableCell>
                                    <TableCell sx={{fontWeight: "bold"}}>Quản Lý</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {postList.map((post) => (
                                    <TableRow key={post.postId}>
                                        <TableCell>{post.postId}</TableCell>
                                        <TableCell>
                                            <img style={{ width: "200px", height: "200px" }} src={post.image} alt={post.title} width="100px" />
                                        </TableCell>
                                        <TableCell><div style={{width: "150px"}}>{post.title}</div></TableCell>
                                        <TableCell>{(post.author).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</TableCell>
                                        <TableCell><div style={{ width: "105px" }}>{post.date.slice(8, 10) + "/" + post.date.slice(5, 7) + "/" + post.date.slice(0, 4) + " " + post.date.slice(11, 16)}</div></TableCell>
                                        <TableCell>
                                            {birds.map((bird) => (
                                                bird.birdId === post.birdType ? <div>{bird.birdName}</div> : null
                                            ))}
                                        </TableCell>
                                        <TableCell><div className="PostDescription" style={{ width: "350px" }} >{post.description}</div></TableCell>
                                        <TableCell>
                                            <Link to={`/admin/quan-ly-bai-viet/${post.postId}`}>
                                                <Button variant="contained" color="primary">
                                                    <EditIcon />
                                                </Button>
                                            </Link>
                                            <Button variant="contained" color="secondary" onClick={()=>{handleOpen();setDeleteId(post.postId)}}>
                                                <DeleteIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                    </div>
                </div>
            </TabPanel>
            <TabPanel value={value} index={4} style={{ backgroundColor: '#f5f5f5' }}>
                <div>
                    <div className="introHeading">Quản Lý Đơn Hàng</div>
                    <div className="bottom-line2" style={{ marginTop: "25px" }}></div>
                    <div className="row" style={{ width: '1200px' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', display: "flex", justifyContent: "center", alignContent: "center" }} >
                            <Tabs
                                value={value2}
                                onChange={handleChange2}
                                aria-label="Vertical tabs example"
                                sx={{ borderRight: 1, borderColor: 'divider', backgroundColor: "#f5f5f5" }}
                            >
                                <Tab onClick={() => setTabValue2(0)} label="Tất Cả Đơn Hàng" {...a11yProps2(0)} />
                                <Tab onClick={() => setTabValue2(1)} label="Chờ Xác Nhận" {...a11yProps2(1)} />
                                <Tab onClick={() => setTabValue2(2)} label="Đã Xác Nhận" {...a11yProps2(2)} />
                                <Tab onClick={() => setTabValue2(3)} label="Hoàn Thành" {...a11yProps2(3)} />
                                <Tab onClick={() => setTabValue2(4)} label="Đã Hủy" {...a11yProps2(4)} />
                            </Tabs>
                        </Box>
                        <TabPanel2 value={value2} index={0} style={{ backgroundColor: '#f5f5f5' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{fontWeight: "bold"}}>ID</TableCell>
                                        <TableCell sx={{fontWeight: "bold"}}>Tên Khách Hàng</TableCell>
                                        <TableCell sx={{fontWeight: "bold"}}>Địa Chỉ</TableCell>
                                        <TableCell sx={{fontWeight: "bold"}}>Số Điện Thoại</TableCell>
                                        <TableCell sx={{fontWeight: "bold"}}>Ngày Đặt Hàng</TableCell>
                                        <TableCell sx={{fontWeight: "bold"}}>Trạng Thái</TableCell>
                                        <TableCell sx={{fontWeight: "bold"}}>Chi Tiết</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders.map((order) => (
                                        <TableRow key={order.orderId}>
                                            <TableCell>{order.orderId}</TableCell>
                                            <TableCell>{order.fullName}</TableCell>
                                            <TableCell>{order.address}</TableCell>
                                            <TableCell>{order.phone}</TableCell>
                                            <TableCell>{order.orderDate.slice(8, 10) + "/" + order.orderDate.slice(5, 7) + "/" + order.orderDate.slice(0, 4) + " " + order.orderDate.slice(11, 16)}</TableCell>
                                            <TableCell>
                                                <div>
                                                    {order.statusId == 1 ? <div>Chờ Xác Nhận</div> :
                                                        order.statusId == 2 ? <div>Đã Xác Nhận</div> :
                                                            order.statusId == 3 ? <div>Hoàn Thành</div> :
                                                                <div>Đã Hủy</div>}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <Link to={`/admin/don-hang/${order.orderId}`}>
                                                    <Button variant="contained" style={{ backgroundColor: "#f5365c", color: "#fff" }}>
                                                        Chi Tiết
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TabPanel2>
                        <TabPanel2 value={value2} index={1} style={{ backgroundColor: '#f5f5f5' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Tên Khách Hàng</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Địa Chỉ</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Số Điện Thoại</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Ngày Đặt Hàng</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Trạng Thái</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Chi Tiết</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders.map((order) => (
                                        order.statusId === 1 && (
                                            <TableRow key={order.orderId}>
                                                <TableCell>{order.orderId}</TableCell>
                                                <TableCell>{order.fullName}</TableCell>
                                                <TableCell>{order.address}</TableCell>
                                                <TableCell>{order.phone}</TableCell>
                                                <TableCell>{order.orderDate.slice(8, 10) + "/" + order.orderDate.slice(5, 7) + "/" + order.orderDate.slice(0, 4) + " " + order.orderDate.slice(11, 16)}</TableCell>
                                                <TableCell>
                                                    <div>
                                                        {order.statusId == 1 ? <div>Chờ Xác Nhận</div> :
                                                            order.statusId == 2 ? <div>Đã Xác Nhận</div> :
                                                                order.statusId == 3 ? <div>Hoàn Thành</div> :
                                                                    <div>Đã Hủy</div>}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Link to={`/admin/don-hang/${order.orderId}`}>
                                                        <Button variant="contained" style={{ backgroundColor: "#f5365c", color: "#fff" }}>
                                                            Chi Tiết
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    ))}
                                </TableBody>
                            </Table>
                        </TabPanel2>
                        <TabPanel2 value={value2} index={2} style={{ backgroundColor: '#f5f5f5' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Tên Khách Hàng</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Địa Chỉ</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Số Điện Thoại</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Ngày Đặt Hàng</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Trạng Thái</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Chi Tiết</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders.map((order) => (
                                        order.statusId === 2 && (
                                            <TableRow key={order.orderId}>
                                                <TableCell>{order.orderId}</TableCell>
                                                <TableCell>{order.fullName}</TableCell>
                                                <TableCell>{order.address}</TableCell>
                                                <TableCell>{order.phone}</TableCell>
                                                <TableCell>{order.orderDate.slice(8, 10) + "/" + order.orderDate.slice(5, 7) + "/" + order.orderDate.slice(0, 4) + " " + order.orderDate.slice(11, 16)}</TableCell>
                                                <TableCell>
                                                    <div>
                                                        {order.statusId == 1 ? <div>Chờ Xác Nhận</div> :
                                                            order.statusId == 2 ? <div>Đã Xác Nhận</div> :
                                                                order.statusId == 3 ? <div>Hoàn Thành</div> :
                                                                    <div>Đã Hủy</div>}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Link to={`/admin/don-hang/${order.orderId}`}>
                                                        <Button variant="contained" style={{ backgroundColor: "#f5365c", color: "#fff" }}>
                                                            Chi Tiết
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    ))}
                                </TableBody>
                            </Table>
                        </TabPanel2>
                        <TabPanel2 value={value2} index={3} style={{ backgroundColor: '#f5f5f5' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Tên Khách Hàng</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Địa Chỉ</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Số Điện Thoại</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Ngày Đặt Hàng</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Trạng Thái</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Chi Tiết</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders.map((order) => (
                                        order.statusId === 3 && (
                                            <TableRow key={order.orderId}>
                                                <TableCell>{order.orderId}</TableCell>
                                                <TableCell>{order.fullName}</TableCell>
                                                <TableCell>{order.address}</TableCell>
                                                <TableCell>{order.phone}</TableCell>
                                                <TableCell>{order.orderDate.slice(8, 10) + "/" + order.orderDate.slice(5, 7) + "/" + order.orderDate.slice(0, 4) + " " + order.orderDate.slice(11, 16)}</TableCell>
                                                <TableCell>
                                                    <div>
                                                        {order.statusId == 1 ? <div>Chờ Xác Nhận</div> :
                                                            order.statusId == 2 ? <div>Đã Xác Nhận</div> :
                                                                order.statusId == 3 ? <div>Hoàn Thành</div> :
                                                                    <div>Đã Hủy</div>}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Link to={`/admin/don-hang/${order.orderId}`}>
                                                        <Button variant="contained" style={{ backgroundColor: "#f5365c", color: "#fff" }}>
                                                            Chi Tiết
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    ))}
                                </TableBody>
                            </Table>
                        </TabPanel2>
                        <TabPanel2 value={value2} index={4} style={{ backgroundColor: '#f5f5f5' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Tên Khách Hàng</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Địa Chỉ</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Số Điện Thoại</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Ngày Đặt Hàng</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Trạng Thái</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Chi Tiết</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {orders.map((order) => (
                                        order.statusId === 4 && (
                                            <TableRow key={order.orderId}>
                                                <TableCell>{order.orderId}</TableCell>
                                                <TableCell>{order.fullName}</TableCell>
                                                <TableCell>{order.address}</TableCell>
                                                <TableCell>{order.phone}</TableCell>
                                                <TableCell>{order.orderDate.slice(8, 10) + "/" + order.orderDate.slice(5, 7) + "/" + order.orderDate.slice(0, 4) + " " + order.orderDate.slice(11, 16)}</TableCell>
                                                <TableCell>
                                                    <div>
                                                        {order.statusId == 1 ? <div>Chờ Xác Nhận</div> :
                                                            order.statusId == 2 ? <div>Đã Xác Nhận</div> :
                                                                order.statusId == 3 ? <div>Hoàn Thành</div> :
                                                                    <div>Đã Hủy</div>}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Link to={`/admin/don-hang/${order.orderId}`}>
                                                        <Button variant="contained" style={{ backgroundColor: "#f5365c", color: "#fff" }}>
                                                            Chi Tiết
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    ))}
                                </TableBody>
                            </Table>
                        </TabPanel2>
                    </div>
                </div>
            </TabPanel>
            <TabPanel value={value} index={5} style={{ backgroundColor: '#f5f5f5' }}>
                <div>
                    <div className="introHeading">Quản Lý Đặt Lịch</div>
                    <div className="bottom-line2" style={{ marginTop: "25px" }}></div>
                    <div className="row" style={{ width: '1200px' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', display: "flex", justifyContent: "center", alignContent: "center" }} >
                            <Tabs
                                value={value3}
                                onChange={handleChange3}
                                aria-label="Vertical tabs example"
                                sx={{ borderRight: 1, borderColor: 'divider', backgroundColor: "#f5f5f5" }}
                            >
                                <Tab onClick={() => setTabValue3(0)} label="Tất Cả Lịch Hẹn" {...a11yProps3(0)} />
                                <Tab onClick={() => setTabValue3(1)} label="Chờ Xác Nhận" {...a11yProps3(1)} />
                                <Tab onClick={() => setTabValue3(2)} label="Đã Xác Nhận" {...a11yProps3(2)} />
                                <Tab onClick={() => setTabValue3(3)} label="Hoàn Thành" {...a11yProps3(3)} />
                                <Tab onClick={() => setTabValue3(4)} label="Đã Hủy" {...a11yProps3(4)} />
                            </Tabs>
                        </Box>
                        <TabPanel3 value={value3} index={0} style={{ backgroundColor: '#f5f5f5' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{fontWeight: "bold"}}>ID</TableCell>
                                        <TableCell sx={{fontWeight: "bold"}}>Tên Khách Hàng</TableCell>
                                        <TableCell sx={{fontWeight: "bold"}}>Địa Chỉ</TableCell>
                                        <TableCell sx={{fontWeight: "bold"}}>Số Điện Thoại</TableCell>
                                        <TableCell sx={{fontWeight: "bold"}}>Ngày Đặt Hàng</TableCell>
                                        <TableCell sx={{fontWeight: "bold"}}>Trạng Thái</TableCell>
                                        <TableCell sx={{fontWeight: "bold"}}>Chi Tiết</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {bookings.map((booking) => (
                                        <TableRow key={booking.bookingId}>
                                            <TableCell>{booking.bookingId}</TableCell>
                                            <TableCell>{booking.fullName}</TableCell>
                                            <TableCell>{booking.address}</TableCell>
                                            <TableCell>{booking.phone}</TableCell>
                                            <TableCell>{booking.bookingDate.slice(8, 10) + "-" + booking.bookingDate.slice(5, 7) + "-" + booking.bookingDate.slice(0, 4) + " " + booking.bookingDate.slice(11, 19)}</TableCell>
                                            <TableCell>
                                                {booking.statusId == 1 ? <div>Chờ Xác Nhận</div> :
                                                    booking.statusId == 2 ? <div>Đã Xác Nhận</div> :
                                                        booking.statusId == 3 ? <div>Hoàn Thành</div> :
                                                            <div>Đã Hủy</div>}
                                            </TableCell>
                                            <TableCell>
                                                <Link to={`/admin/lich-hen/${booking.bookingId}`}>
                                                    <Button variant="contained" style={{ backgroundColor: "#f5365c", color: "#fff" }}>
                                                        Chi Tiết
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TabPanel3>
                        <TabPanel3 value={value3} index={1} style={{ backgroundColor: '#f5f5f5' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{fontWeight: "bold"}}>ID</TableCell>
                                        <TableCell sx={{fontWeight: "bold"}}>Tên Khách Hàng</TableCell>
                                        <TableCell sx={{fontWeight: "bold"}}>Địa Chỉ</TableCell>
                                        <TableCell sx={{fontWeight: "bold"}}>Số Điện Thoại</TableCell>
                                        <TableCell sx={{fontWeight: "bold"}}>Ngày Đặt Hàng</TableCell>
                                        <TableCell sx={{fontWeight: "bold"}}>Trạng Thái</TableCell>
                                        <TableCell sx={{fontWeight: "bold"}}>Chi Tiết</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {bookings.map((booking) => (
                                        booking.statusId === 1 && (
                                        <TableRow key={booking.bookingId}>
                                            <TableCell>{booking.bookingId}</TableCell>
                                            <TableCell>{booking.fullName}</TableCell>
                                            <TableCell>{booking.address}</TableCell>
                                            <TableCell>{booking.phone}</TableCell>
                                            <TableCell>{booking.bookingDate.slice(8, 10) + "-" + booking.bookingDate.slice(5, 7) + "-" + booking.bookingDate.slice(0, 4) + " " + booking.bookingDate.slice(11, 19)}</TableCell>
                                            <TableCell>
                                                {booking.statusId == 1 ? <div>Chờ Xác Nhận</div> :
                                                    booking.statusId == 2 ? <div>Đã Xác Nhận</div> :
                                                        booking.statusId == 3 ? <div>Hoàn Thành</div> :
                                                            <div>Đã Hủy</div>}
                                            </TableCell>
                                            <TableCell>
                                                <Link to={`/admin/lich-hen/${booking.bookingId}`}>
                                                    <Button variant="contained" style={{ backgroundColor: "#f5365c", color: "#fff" }}>
                                                        Chi Tiết
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                        </TableRow>
                                        )
                                    ))}
                                </TableBody>
                            </Table>
                        </TabPanel3>
                        <TabPanel3 value={value3} index={2} style={{ backgroundColor: '#f5f5f5' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Tên Khách Hàng</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Địa Chỉ</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Số Điện Thoại</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Ngày Đặt Hàng</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Trạng Thái</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Chi Tiết</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {bookings.map((booking) => (
                                        booking.statusId === 2 && (
                                            <TableRow key={booking.bookingId}>
                                                <TableCell>{booking.bookingId}</TableCell>
                                                <TableCell>{booking.fullName}</TableCell>
                                                <TableCell>{booking.address}</TableCell>
                                                <TableCell>{booking.phone}</TableCell>
                                                <TableCell>{booking.bookingDate.slice(8, 10) + "-" + booking.bookingDate.slice(5, 7) + "-" + booking.bookingDate.slice(0, 4) + " " + booking.bookingDate.slice(11, 19)}</TableCell>
                                                <TableCell>
                                                    {booking.statusId == 1 ? <div>Chờ Xác Nhận</div> :
                                                        booking.statusId == 2 ? <div>Đã Xác Nhận</div> :
                                                            booking.statusId == 3 ? <div>Hoàn Thành</div> :
                                                                <div>Đã Hủy</div>}
                                                </TableCell>
                                                <TableCell>
                                                    <Link to={`/admin/lich-hen/${booking.bookingId}`}>
                                                        <Button variant="contained" style={{ backgroundColor: "#f5365c", color: "#fff" }}>
                                                            Chi Tiết
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    ))}
                                </TableBody>
                            </Table>
                        </TabPanel3>
                        <TabPanel3 value={value3} index={3} style={{ backgroundColor: '#f5f5f5' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Tên Khách Hàng</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Địa Chỉ</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Số Điện Thoại</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Ngày Đặt Hàng</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Trạng Thái</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Chi Tiết</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {bookings.map((booking) => (
                                        booking.statusId === 3 && (
                                            <TableRow key={booking.bookingId}>
                                                <TableCell>{booking.bookingId}</TableCell>
                                                <TableCell>{booking.fullName}</TableCell>
                                                <TableCell>{booking.address}</TableCell>
                                                <TableCell>{booking.phone}</TableCell>
                                                <TableCell>{booking.bookingDate.slice(8, 10) + "-" + booking.bookingDate.slice(5, 7) + "-" + booking.bookingDate.slice(0, 4) + " " + booking.bookingDate.slice(11, 19)}</TableCell>
                                                <TableCell>
                                                    {booking.statusId == 1 ? <div>Chờ Xác Nhận</div> :
                                                        booking.statusId == 2 ? <div>Đã Xác Nhận</div> :
                                                            booking.statusId == 3 ? <div>Hoàn Thành</div> :
                                                                <div>Đã Hủy</div>}
                                                </TableCell>
                                                <TableCell>
                                                    <Link to={`/admin/lich-hen/${booking.bookingId}`}>
                                                        <Button variant="contained" style={{ backgroundColor: "#f5365c", color: "#fff" }}>
                                                            Chi Tiết
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    ))}
                                </TableBody>
                            </Table>
                        </TabPanel3>
                        <TabPanel3 value={value3} index={4} style={{ backgroundColor: '#f5f5f5' }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell sx={{ fontWeight: "bold" }}>ID</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Tên Khách Hàng</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Địa Chỉ</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Số Điện Thoại</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Ngày Đặt Hàng</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Trạng Thái</TableCell>
                                        <TableCell sx={{ fontWeight: "bold" }}>Chi Tiết</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {bookings.map((booking) => (
                                        booking.statusId === 4 && (
                                            <TableRow key={booking.bookingId}>
                                                <TableCell>{booking.bookingId}</TableCell>
                                                <TableCell>{booking.fullName}</TableCell>
                                                <TableCell>{booking.address}</TableCell>
                                                <TableCell>{booking.phone}</TableCell>
                                                <TableCell>{booking.bookingDate.slice(8, 10) + "-" + booking.bookingDate.slice(5, 7) + "-" + booking.bookingDate.slice(0, 4) + " " + booking.bookingDate.slice(11, 19)}</TableCell>
                                                <TableCell>
                                                    {booking.statusId == 1 ? <div>Chờ Xác Nhận</div> :
                                                        booking.statusId == 2 ? <div>Đã Xác Nhận</div> :
                                                            booking.statusId == 3 ? <div>Hoàn Thành</div> :
                                                                <div>Đã Hủy</div>}
                                                </TableCell>
                                                <TableCell>
                                                    <Link to={`/admin/lich-hen/${booking.bookingId}`}>
                                                        <Button variant="contained" style={{ backgroundColor: "#f5365c", color: "#fff" }}>
                                                            Chi Tiết
                                                        </Button>
                                                    </Link>
                                                </TableCell>
                                            </TableRow>
                                        )
                                    ))}
                                </TableBody>
                            </Table>
                        </TabPanel3>
                    </div>
                </div>
            </TabPanel>
        </Box>
    );
}