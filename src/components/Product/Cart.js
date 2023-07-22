import {useSelector, useDispatch} from 'react-redux';
import { Link } from "react-router-dom"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Button from "@mui/material/Button";
import { removeFromCart, decreaseQuantity, increaseQuantity, clearCart, getTotals} from "../../context/CartSlice";
import { useEffect } from 'react';
import { toast } from "react-toastify";
import callerAPI from "../../utils/APICaller_Account";
import * as React from "react";
import { useNavigate } from 'react-router-dom';

export default function Cart() {
    const cart = useSelector(state => state.cart);
    const [user, setUser] = React.useState(null);
    const navigate = useNavigate();
    console.log(cart);
    const dispatch = useDispatch();
    const handleRemoveFromCart = (cartItem) => {
        dispatch(removeFromCart(cartItem))
    }
    const handleDecreaseQuantity = (cartItem) => {
        dispatch(decreaseQuantity(cartItem))
    }
    const handleIncreaseQuantity = (cartItem) => {
        dispatch(increaseQuantity(cartItem))
    }
    const handleClearCart = () => {
        dispatch(clearCart())
    }
    const handleGetTotals = () => {
        dispatch(getTotals())
    }

    function getCurrentUser() {
        callerAPI('Customer/GetCurrentCustomer', 'GET', null).then(res => {
          setUser(res.data);
        }).catch(err => {
          console.log(err);
        })
      }

    function checkout(){
        if(user === null){
            toast.error("Bạn cần đăng nhập để thanh toán");
            navigate("/dang-nhap");
        }else{
            window.location.href = "/thanh-toan";
        }
    }


    useEffect(() => {
        handleGetTotals();
    }, [cart])

    useEffect(() => {
        getCurrentUser();
    }, [])

    return (
        <div>
            <div className="cart-container">
                <h2>Giỏ Hàng</h2>
                { cart.cartItems.length === 0 ? (
                    <div className="cart-empty">
                        <p>Không có sản phẩm nào trong giỏ hàng của bạn.</p>
                        <div className="start-shopping">
                            <Link to="/san-pham">
                                <Button><KeyboardBackspaceIcon />Tiếp tục mua hàng</Button>
                            </Link>
                        </div>
                    </div>
                ): (
                    <div>
                        <div className="titles">
                            <h3 className="product-title">Sản Phẩm</h3>
                            <h3 className="price">Giá</h3>
                            <h3 className="Quantity">Số Lượng</h3>
                            <h3 className="total">Thành Tiền</h3>
                        </div>
                        <div className="cart-items">
                            {cart.cartItems?.map(cartItem => {
                                return (
                                    <div className="cart-item" key={cartItem.productId}>
                                        <div className="cart-product">
                                            <img src={cartItem.image} alt={cartItem.productName} />
                                            <div>
                                                <h3>{cartItem.productName}</h3>
                                                <Button onClick={() => handleRemoveFromCart(cartItem)}  >Xóa</Button>
                                            </div>
                                        </div>
                                        <div className="cart-product-price">{(cartItem.price)?.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</div>
                                        <div className="cart-product-quantity">
                                            <Button onClick={() => handleDecreaseQuantity(cartItem)}>-</Button>
                                            <div className="count">{cartItem.cartQuantity}</div>
                                            <Button onClick={() => handleIncreaseQuantity(cartItem)} >+</Button>
                                        </div>
                                        <div className="cart-product-total-price">
                                            {(cartItem.price * cartItem.cartQuantity)?.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="cart-summary">
                            <Button onClick={() => handleClearCart()}>Xóa Giỏ Hàng</Button>
                            <div className="cart-checkout">
                                <div className="subtotal">
                                    <span>Tổng Tiền</span>
                                    <span className="amount">{(cart.cartTotalAmount)?.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</span>
                                </div>
                                <p>Đã bao gồm VAT nếu có</p>

                                <Button onClick={() => checkout()}>Mua Hàng</Button>

                                <div className="continue-shopping">
                                        <Link to="/san-pham">
                                            <Button><KeyboardBackspaceIcon />Tiếp tục mua hàng</Button>
                                        </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}