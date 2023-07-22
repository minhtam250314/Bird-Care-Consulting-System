import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import callerApi from '../../utils/APICaller';
import { Container,Card,Button } from 'react-materialize'
import { addToCart } from '../../context/CartSlice'
import { useDispatch } from 'react-redux'
import { Link } from "react-router-dom"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { useNavigate } from "react-router-dom";
export default function ProductDetail() {
    const Productid = useParams();
    const [productlist, setProductList] = useState([])
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const handleAddToCart = (product) => {
        dispatch(addToCart(product))
    }
    const handleAddToCart2 = (product) => {
        dispatch(addToCart(product))
        navigate("/gio-hang");
    }
    console.log(Productid);

    function getData() {
        callerApi(`Product/GetProductById?id=${Productid.id}`, 'GET', null).then(res => {
            if(res.data.quantity === 0){
            console.log(res.data);
            window.location.href = "/";
            }
            setProductList(res.data);
        })
    }

    useEffect(()=>{
        getData();
    },[])

    return (
        <div>
           <Container>
            <Card>
                <div className="Product-detail">
                    <div className="continue-shopping">
                        <Link to="/san-pham">
                            <KeyboardBackspaceIcon />
                        </Link>
                    </div>
                    <div className="Product-media">
                        <img style={{height:"240px", width:"240px"}} src={productlist.image} />
                    </div>
                    <div className="Product-info-main">
                        <div className="Product-info-title">
                            <strong style={{fontWeight:"700",fontSize:"15px",lineHeight:"5px"}} className='ProductName'>{productlist.productName}</strong>
                        </div>
                        <div  className="Product-add-form">
                            <div className="Product-description">
                                <span className='label' style={{fontWeight: "bold"}}>Thông tin sản phẩm: </span>
                                <div className='Price'>{productlist.description}</div>
                            </div>
                            <div  className="Price-list">
                                <div style={{marginTop: "10px"}}>
                                    <span className='label' style={{fontWeight: "bold"}}>Giá: </span>
                                    <span className='Price'>{(productlist.price)?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span>
                                    <span style={{marginLeft: "20px"}}>
                                    <span className='label' style={{fontWeight: "bold"}}>Số lượng: </span>
                                    <span className='Price'>{productlist.quantity}</span>
                                    </span>
                                </div>
                            </div>
                            <div className="Product-option">
                            <div style={{display: "flex"}}>
                                        <Button onClick={() => { handleAddToCart(productlist) }} style={{  width: "160px", fontSize: "10px", marginTop: "10px" }}  className='btn btn-primary'>Thêm vào giỏ hàng</Button>
                                        <Button onClick={() => { handleAddToCart2(productlist) }} style={{ marginLeft: "5px", width: "160px", fontSize: "10px", marginTop: "10px" }} className='btn btn-primary'>Mua ngay</Button>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
           </Container>
        </div>
    );
}