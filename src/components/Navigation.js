import * as React from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from "@mui/material/Button";
//
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';

import {getTotals} from "../../src/context/CartSlice";
import {useSelector, useDispatch} from 'react-redux';
import { useEffect } from 'react';
import callerAPI2 from "../utils/APICaller_Account";


export default function Navigation() {
    const [user, setUser] = React.useState(null);

    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const handleOpenUserMenu = (event) => {
      setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
    const handleGetTotals = () => {
      dispatch(getTotals())
  }

  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();


  useEffect(() => {
    handleGetTotals();
  }, [cart])

  function getCurrentUser() {
    callerAPI2('Customer/GetCurrentCustomer', 'GET', null).then(res => {
      setUser(res.data);
      if(res.data.roleId === 2){
        localStorage.setItem("isAdmin", true);
      }else{
        localStorage.setItem("isAdmin", false);
      }
    }).catch(err => {
      localStorage.setItem("isAdmin", false);
      console.log(err);
    })
  }

  function logout(){
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  useEffect(() => {
    getCurrentUser();
  }, [])


  return (
    <div className="Naviagation">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" style={{ color: "black", backgroundColor: "transparent", font: "manrope", fontWeight: "bold" }}>
          <Toolbar>

            {/* Logo */}
            <Link to="/">
              <img
                src={"https://cdn.discordapp.com/attachments/1074987128984973365/1075688774006218752/logo.png"}
                alt="logo"
                width="50"
                height="50"
              />
            </Link>
            {/* Logo */}

            {/* Home, Product, Post, Schedule */}
            <Link to="/" style={{textDecoration: "none"}}>
              <div style={{margin: "26px 4px 2px 1px", fontSize: "20px", color: "black"}}>Bird Care Consulting</div>
            </Link>

            <Link to="/" style={{textDecoration: "none"}} className="NavItem">
              <div style={{margin: "23px 2px 9px 60px"}}>Trang Chủ</div>
            </Link>

            <Link to="/san-pham" style={{textDecoration: "none"}} className="NavItem">
              <div style={{margin: "23px 2px 9px 60px"}}>Sản Phẩm</div>
            </Link>

            <Link to="/dich-vu" style={{textDecoration: "none"}} className="NavItem">
              <div style={{margin: "23px 2px 9px 60px"}}>Dịch Vụ Chim</div>
            </Link>

            <Link to="/bai-viet" style={{textDecoration: "none"}} className="NavItem">
              <div style={{margin: "23px 2px 9px 60px"}}>Thư Viện Chim</div>
            </Link>

            <Link to="/lien-he" style={{textDecoration: "none"}} className="NavItem">
              <div style={{margin: "23px 2px 9px 60px"}}>Liên Hệ</div>
            </Link>
            {/* Home, Product, Service, Post */}

            {/* random space */}
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            ></Typography>
            {/* random space */}

            {/* Cart */}
            <div style={{ margin: "10px 15px -4px 15px" }}>
              <Link to="/gio-hang" style={{ textDecoration: "none" }} className= "NavItem">
                <ShoppingCartIcon sx={{ my: 2, color: "black", display: "block",  "&:hover": { color: "blue"}}} />
                <span className="quantity">{cart.cartTotalQuantity}</span>
              </Link>
            </div>
            {/* Cart */}
              
            {/* Account */}
            {/* <div style={{margin: "10px 1px -4px 15px"}}>
              <Link to="" style={{ textDecoration: "none" }}>
                <Button sx={{ my: 2, color: "black", font: "manrope", fontWeight: "bold", display: "block" }} onClick={() => loginWithRedirect()}>
                  Đăng Nhập
                </Button>
                <Button sx={{ my: 2, color: "black", font: "manrope", fontWeight: "bold", display: "block" }} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
                  Đăng Xuất
                </Button>
              </Link>
            </div> */}
            {/* Account */}
            {/* //Login */}

            {/* Check Đăng Nhập Hay Chưa */}
            {user ? (<></>) : (
              <Link to="/dang-nhap" style={{ textDecoration: "none" }}>
                <Button>
                  <div className="NavItem">
                    Đăng Nhập
                  </div>
                </Button>
              </Link>
            )}

            {/* Nếu là user thì menu sẽ như thế này */}
            {user?.fullName && user?.mail && user?.roleId === 1 ? (
              <div>
                <Tooltip title="User Profile">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user.fullName} src={"https://www.angrybirdsnest.com/wp-content/uploads/2012/04/Angry-Birds-Space-Avatar-Bomb-Bird.jpg"} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link to="/profile" style={{ textDecoration: "none", color: "#000000DE" }}>
                        Hồ Sơ
                      </Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link to="/don-hang" style={{ textDecoration: "none", color: "#000000DE" }}>
                        Đơn Hàng
                      </Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link to="/lich-hen" style={{ textDecoration: "none", color: "#000000DE" }}>
                        Lịch Hẹn
                      </Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography textAlign="center" onClick={() => logout()}>
                      Đăng Xuất
                    </Typography>
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <></>
            )}

            {/* Nếu là admin thì menu sẽ như thế này */}
            {user?.fullName && user?.mail && user?.roleId === 2 ? (
              <div>
                <Tooltip title="User Profile">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={user.fullName} src={"https://www.angrybirdsnest.com/wp-content/uploads/2012/04/Angry-Birds-Space-Avatar-Bomb-Bird.jpg"} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link to="/profile" style={{ textDecoration: "none", color: "#000000DE" }}>
                        Hồ Sơ
                      </Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">
                      <Link to="/admin" style={{ textDecoration: "none", color: "#000000DE" }}>
                        Admin
                      </Link>
                    </Typography>
                  </MenuItem>
                  <MenuItem>
                    <Typography textAlign="center" onClick={() => logout()}>
                      Đăng Xuất
                    </Typography>
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <></>
            )}
            {/* //Login */}

          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
}