import {createSlice} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import axios from "axios";


const initialState = {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    cartTotalQuantity: 0,
    cartTotalAmount: 0,
};



const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const itemIndex = state.cartItems.findIndex(item => item.productId === action.payload.productId);
            if (itemIndex >= 0 && state.cartItems[itemIndex].cartQuantity < state.cartItems[itemIndex].quantity) {
                state.cartItems[itemIndex].cartQuantity += 1;
                toast.success("Đã thêm sản phẩm vào giỏ hàng", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else if(itemIndex >= 0 && state.cartItems[itemIndex].cartQuantity == state.cartItems[itemIndex].quantity){
                toast.error("Số lượng sản phẩm trong kho không đủ", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            } else {
                console.log(action.payload);
                const tempProduct = { ...action.payload, cartQuantity: 1 };
                state.cartItems.push(tempProduct);
                toast.success("Đã thêm sản phẩm vào giỏ hàng", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
            
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        removeFromCart(state, action) {
            const nextCartItems = state.cartItems.filter(
                cartItem => cartItem.productId !== action.payload.productId
            )
            state.cartItems = nextCartItems;
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            toast.success("Đã xóa sản phẩm khỏi giỏ hàng", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        },
        decreaseQuantity(state, action) {
            const itemindex = state.cartItems.findIndex(
                cartItem => cartItem.productId === action.payload.productId
            )

            if (state.cartItems[itemindex].cartQuantity > 1){
                state.cartItems[itemindex].cartQuantity -= 1;
            } else if (state.cartItems[itemindex].cartQuantity === 1){
                const nextCartItems = state.cartItems.filter(
                    cartItem => cartItem.productId !== action.payload.productId
                )
                state.cartItems = nextCartItems;
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
                toast.success("Đã xóa sản phẩm khỏi giỏ hàng", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        },
        increaseQuantity(state, action) {
            const itemindex = state.cartItems.findIndex(
                cartItem => cartItem.productId === action.payload.productId
            )
            if(state.cartItems[itemindex].cartQuantity >= 1 && state.cartItems[itemindex].cartQuantity < state.cartItems[itemindex].quantity){
                state.cartItems[itemindex].cartQuantity += 1
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            }else if(state.cartItems[itemindex].cartQuantity == state.cartItems[itemindex].quantity){
                toast.error("Số lượng sản phẩm trong kho không đủ", {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        },
        clearCart(state) {
            state.cartItems = [];
            toast.success("Đã xóa tất cả sản phẩm khỏi giỏ hàng", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            // axios.put('https://63e4419cc04baebbcda2eb0c.mockapi.io/CartV2/1', {
            //     cartItems: []
            //     })
            //     .then(function (response) {
            //         console.log(response);
            //         })
            //     .catch(function (error) {
            //         console.log(error);
            //     }
            // );
        },
        getTotals(state) {
            let { cartTotalQuantity, cartTotalAmount } = state.cartItems.reduce(
                (cartTotal, cartItem) => {
                    const { cartQuantity, price } = cartItem;
                    const itemTotal = cartQuantity * price;

                    cartTotal.cartTotalQuantity += cartQuantity;
                    cartTotal.cartTotalAmount += itemTotal;

                    return cartTotal;
                },
                {
                    cartTotalQuantity: 0,
                    cartTotalAmount: 0,
                }
            );
            state.cartTotalQuantity = cartTotalQuantity;
            state.cartTotalAmount = cartTotalAmount;
        }
    }
});

export const {addToCart, removeFromCart, decreaseQuantity, increaseQuantity, clearCart, getTotals} = cartSlice.actions;
export default cartSlice.reducer;