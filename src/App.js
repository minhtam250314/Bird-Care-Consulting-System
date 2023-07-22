import './App.css';
import "react-toastify/dist/ReactToastify.css"
import Navigation from './components/Navigation';
import Main from './components/Main';
import About from './components/About';
import Footer from './components/Footer';
import { Main_product } from './components/Product/Main_product';
import ProductDetail from './components/Product/ProductDetail';
import Cart from './components/Product/Cart';
import Checkout from './components/Product/Checkout';
import Login from './components/Account_v2/Login';
import Register from './components/Account_v2/Register';
import ForgetPassword from './components/Account_v2/ForgetPassword';
import Profile from './components/Account/Profile';
import Post_AllPost from './components/Post/Post_AllPost';
import PostDetail from './components/Post/PostDetail';
import Main_Order from './components/Order/Main_Order';
import OrderDetail from './components/Order/OrderDetail';

//admin
import Admin from './components/Admin/Page/Admin';
import ManageProduct from './components/Admin/Edit Page/ManageProduct';
import AddProduct from './components/Admin/Add Page/AddProduct';
import ManagePost from './components/Admin/Edit Page/ManagePost';
import AddPost from './components/Admin/Add Page/AddPost';
import ManageService from './components/Admin/Edit Page/ManageService';
import AddService from './components/Admin/Add Page/AddService';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css';
import Protected from './context/Protected';
import Main_service from './components/Service/Main_service';
import ServiceDetail from './components/Service/ServiceDetail';
import Booking from './components/Service/Booking';
import Main_Booking from './components/Order/Main_Booking';
import BookingOrderDetail from './components/Order/BookingOrderDetail';
import { ToastContainer } from 'react-toastify';
import Homepage_Product from './components/Homepage/Homepage_Product';

import AppRouter from './components/Account_v2/AppRoutes';
import UserOrderDetail from './components/Admin/AdminDetail/UserDetailOrder';
import UserDetailBooking from './components/Admin/AdminDetail/UserDetailBooking';
function App() {
  return (
    <div className="App">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Router>
        <Navigation />
        <Routes >
          {/* Homepage */}
          <Route path="/" element={<Main />} />
          <Route path="/lien-he" element={<About />} />
          <Route path="/lien-he" element={<About />} />
          <Route path="/test" element={<AppRouter />} />

          {/* Product */}
          <Route path="/san-pham" element={<Main_product />} />
          <Route path="/san-pham/chi-tiet-san-pham/:id" element={<ProductDetail />} />
          <Route path="/gio-hang" element={<Cart />} />
          <Route path="/thanh-toan" element={<Checkout />} />

          {/* Order */}
          <Route path="/don-hang" element={<Main_Order />} />
          <Route path="/don-hang/:id" element={<OrderDetail />} />

          {/* Account */}
          <Route path="/dang-nhap" element={<Login />} />
          <Route path="/dang-ky" element={<Register />} />
          <Route path="/khoi-phuc-tai-khoan" element={<ForgetPassword />} />
          <Route path="/profile" element={<Profile />} />

          {/* Post */}
          <Route path="/bai-viet" element={<Post_AllPost />} />
          <Route path="/bai-viet/:id" element={<PostDetail />} />

          {/* Schedule */}
          <Route path="/dich-vu" element={<Main_service />} />
          <Route path="/dich-vu/:id" element={<ServiceDetail />} />
          <Route path="/dat-lich" element={<Booking />} />
          <Route path="/lich-hen" element={<Main_Booking />} />
          <Route path="/lich-hen/:id" element={<BookingOrderDetail />} />


          {/* Admin */}

          <Route path="/admin" element={<Protected><Admin /></Protected>} />
          <Route path="/admin/quan-ly-san-pham/:id" element={<Protected><ManageProduct /></Protected>} />
          <Route path="/admin/them-san-pham" element={<Protected><AddProduct /></Protected>} />
          <Route path="/admin/quan-ly-bai-viet/:id" element={<Protected><ManagePost /></Protected>} />
          <Route path="/admin/them-bai-viet" element={<Protected><AddPost /></Protected>} />
          <Route path="/admin/quan-ly-dich-vu/:id" element={<Protected><ManageService /></Protected>} />
          <Route path="/admin/them-dich-vu" element={<Protected><AddService /></Protected>} />
          <Route path="/admin/don-hang/:orderId" element={<Protected><UserOrderDetail /></Protected>} />
          <Route path="/admin/lich-hen/:bookingId" element={<Protected><UserDetailBooking /></Protected>} />



          {/* 404 */}
          
          <Route path="*" element={<h1>404 Not Found</h1>} />
          
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
