import { Link } from 'react-router-dom'
import { Container, Row, Col, Card, Button, Select } from 'react-materialize'
import FormControl from '@mui/material/FormControl';
import { addToCart } from '../../context/CartSlice'
import { useDispatch } from 'react-redux'
import Spinner from '../Spinner/spinner';
import { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import callerApi from '../../utils/APICaller';
import { useNavigate } from 'react-router-dom';

export default function Product({ Products }) {
    const [productList, setProductList] = useState([]);
    const dispatch = useDispatch();
    const [loading, setloading] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        setTimeout(setloading, 800, true);
    }, [Products])
    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }
    const handleAddToCart2 = (product) => {
        dispatch(addToCart(product))
        navigate("/gio-hang");
    }
    const [search, setSearch] = useState("");
    console.log(search);
    const formik = useFormik({
        initialValues: {
            filterPrice: 'nothing',
            filterCategory: 'nothing',
        },
        validationSchema: Yup.object({
            filterPrice: Yup.string().required('Vui lòng chọn 1 loại mục'),
            filterCategory: Yup.string().required('Vui lòng chọn 1 loại mục'),
        }),
        onSubmit: values => {
            callerApi(`Product/GetAllProduct/Filter?filterPrice=${values.filterPrice}&filterCategory=${values.filterCategory}`, 'GET', null).then(res => {
                console.log(res.data);
                setProductList(res.data);
            })
        },
        
    });

    useEffect(() => {
        setProductList(Products.filter((product) => {
            return product.productName.toLowerCase().includes(search.toLowerCase())
        }))
    }, [search, Products])



    return (
        <div>
            <Container>
                <br />
                <h3 class="AboutTitle">Các Sản Phẩm</h3>
                <div className="bottom-line2"></div>

                {!loading && <Spinner>LOADING . . . .</Spinner>}
                <div style={{width: "1000px", marginLeft: "20px"}}>
                    <input onChange={(e)=>setSearch(e.target.value)} type="text" placeholder="Nhập tên sản phẩm.." name="search" />
                </div>
                <div>
                    <form onSubmit={formik.handleSubmit}>
                        <Row>
                            <Col style={{ display: "flex", alignItems: "center", justifyItems: "center", marginTop: "15px" }} s={12} m={6} l={4}>
                                <FormControl fullWidth>
                                    <Select

                                        labelId="filterPrice"
                                        id="filterPrice"
                                        value={formik.values.filterPrice}
                                        label="Lọc theo giá"
                                        onChange={formik.handleChange}
                                    >
                                        <option value={'nothing'}></option>
                                        <option value={'priceSmallest'}>Giá tăng dần</option>
                                        <option value={'priceLargest'}>Giá giảm dần</option>
                                    </Select>
                                </FormControl>
                            </Col>
                            <Col style={{ display: "flex", alignItems: "center", justifyItems: "center", marginTop: "15px" }} s={12} m={6} l={4}>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="filterCategory"
                                        id="filterCategory"
                                        value={formik.values.filterCategory}
                                        label="Lọc theo danh mục"
                                        onChange={formik.handleChange}

                                    >
                                        <option value={'nothing'}></option>
                                        <option value={'Thức Ăn'}>Thức Ăn</option>
                                        <option value={'Thuốc'}>Thuốc</option>
                                    </Select>
                                </FormControl>
                            </Col>
                            <Col style={{ display: "flex", alignItems: "center", justifyItems: "center", marginTop: "20px" }} s={12} m={6} l={4}>
                                <Button className='btn btn-primary' type="submit">Lọc</Button>
                            </Col>
                        </Row>
                    </form>
                </div>


                <Row>
                    {productList
                    .map((product) => (
                        product.quantity > 0 && (
                    (<Col s={12} m={6} l={4}  >
                        <Card style={{ borderRadius: "12px" }}>
                            <div className='Product-info'>
                                <img src={product.image} />

                                <div className='Product-item-detail'>
                                    <Link style={{ textAlign: "center", fontWeight: "bold", color: "black" }} to={`/san-pham/chi-tiet-san-pham/${product.productId}`}>
                                        <p className='ProductName'>{product.productName}</p>
                                    </Link>
                                    <div className='Product-item-price'>
                                        <div className='Price-money'>
                                            <span className='Price'>{(product.price).toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
                                        </div>
                                    </div>
                                    <div style={{display: "flex"}}>
                                        <Button onClick={() => { handleAddToCart(product) }} style={{  width: "160px", fontSize: "10px", marginTop: "10px" }}  className='btn btn-primary'>Thêm vào giỏ hàng</Button>
                                        <Button onClick={() => { handleAddToCart2(product) }} style={{ marginLeft: "5px", width: "160px", fontSize: "10px", marginTop: "10px" }} className='btn btn-primary'>Mua ngay</Button>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>)
                        )
                    )
                    )}
                </Row>
            </Container>

        </div>

    )
}