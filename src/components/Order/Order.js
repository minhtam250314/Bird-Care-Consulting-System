import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 4 }}>
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function Order(Orders) {
  console.log(Orders);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Tất Cả Đơn Hàng" {...a11yProps(0)} />
            <Tab label="Chờ Xác Nhận" {...a11yProps(1)} />
            <Tab label="Đã Xác Nhận" {...a11yProps(2)} />
            <Tab label="Hoàn Thành" {...a11yProps(3)} />
            <Tab label="Đã Hủy" {...a11yProps(4)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div className="cart-container2">
            <div>
              <div className="titles2">
                <h3>Mã Đơn Hàng</h3>
                <h3>Họ và Tên</h3>
                <h3 className="product-title">Ngày Đặt</h3>
                <h3 className="Quantity">Tổng Tiền</h3>
                <h3>Phương Thức Thanh Toán</h3>
                <h3 className="total">Trạng Thái</h3>
                <h3>Thông Tin</h3>
              </div>
              <div className="cart-items">
                {Orders.Orders?.map(order => {
                  return (
                    <div className="cart-item2" key={order.id}>
                      <div>{order.orderId}</div>
                      <div>{order.fullName}</div>
                      <div>
                        <div>
                          <h5>{order.orderDate.slice(8,10)+"-"+order.orderDate.slice(5,7)+"-"+order.orderDate.slice(0,4)+" "+order.orderDate.slice(11,19)}</h5>
                        </div>
                      </div>
                      {/* <div className="cart-product-price">{order.ProductQuantity}</div> */}
                      <div className="cart-product-quantity">
                        <div className="count">{(order.amount).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</div>
                      </div>
                      <div>
                        {order.paymentMethod}
                      </div>
                      <div className="cart-product-total-price">
                        {order.statusId == 1 ? <div>Chờ Xác Nhận</div> : 
                         order.statusId == 2 ? <div>Đã Xác Nhận</div> : 
                         order.statusId == 3 ? <div>Hoàn Thành</div> : 
                                               <div>Đã Hủy</div>}
                      </div>
                      <div>
                        <Link to={`/don-hang/${order.orderId}`}>
                          <Button>Chi Tiết</Button>
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
        <div className="cart-container2">
            <div>
              <div className="titles2">
                <h3>Mã Đơn Hàng</h3>
                <h3>Họ và Tên</h3>
                <h3 className="product-title">Ngày Đặt</h3>
                <h3 className="Quantity">Tổng Tiền</h3>
                <h3>Phương Thức Thanh Toán</h3>
                <h3 className="total">Trạng Thái</h3>
                <h3>Thông Tin</h3>
              </div>
              <div className="cart-items">
                {Orders.Orders?.map(order => {
                  if(order.statusId == 1){
                  return (
                    <div className="cart-item2" key={order.id}>
                      <div>{order.orderId}</div>
                      <div>{order.fullName}</div>
                      <div>
                        <div>
                          <h5>{order.orderDate.slice(8,10)+"-"+order.orderDate.slice(5,7)+"-"+order.orderDate.slice(0,4)+" "+order.orderDate.slice(11,19)}</h5>
                        </div>
                      </div>
                      {/* <div className="cart-product-price">{order.ProductQuantity}</div> */}
                      <div className="cart-product-quantity">
                        <div className="count">{(order.amount).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</div>
                      </div>
                      <div>
                        {order.paymentMethod}
                      </div>
                      <div className="cart-product-total-price">
                        Chờ Xác Nhận
                      </div>
                      <div>
                        <Link to={`/don-hang/${order.orderId}`}>
                          <Button>Chi Tiết</Button>
                        </Link>
                      </div>
                    </div>
                  )
                }})}
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={2}>
        <div className="cart-container2">
            <div>
              <div className="titles2">
                <h3>Mã Đơn Hàng</h3>
                <h3>Họ và Tên</h3>
                <h3 className="product-title">Ngày Đặt</h3>
                <h3 className="Quantity">Tổng Tiền</h3>
                <h3>Phương Thức Thanh Toán</h3>
                <h3 className="total">Trạng Thái</h3>
                <h3>Thông Tin</h3>
              </div>
              <div className="cart-items">
                {Orders.Orders?.map(order => {
                  if(order.statusId == 2){
                  return (
                    <div className="cart-item2" key={order.id}>
                      <div>{order.orderId}</div>
                      <div>{order.fullName}</div>
                      <div>
                        <div>
                          <h5>{order.orderDate.slice(8,10)+"-"+order.orderDate.slice(5,7)+"-"+order.orderDate.slice(0,4)+" "+order.orderDate.slice(11,19)}</h5>
                        </div>
                      </div>
                      {/* <div className="cart-product-price">{order.ProductQuantity}</div> */}
                      <div className="cart-product-quantity">
                        <div className="count">{(order.amount).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</div>
                      </div>
                      <div>
                        {order.paymentMethod}
                      </div>
                      <div className="cart-product-total-price">
                        Đã Xác Nhận
                      </div>
                      <div>
                        <Link to={`/don-hang/${order.orderId}`}>
                          <Button>Chi Tiết</Button>
                        </Link>
                      </div>
                    </div>
                  )
                }})}
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={3}>
        <div className="cart-container2">
            <div>
              <div className="titles2">
                <h3>Mã Đơn Hàng</h3>
                <h3>Họ và Tên</h3>
                <h3 className="product-title">Ngày Đặt</h3>
                <h3 className="Quantity">Tổng Tiền</h3>
                <h3>Phương Thức Thanh Toán</h3>
                <h3 className="total">Trạng Thái</h3>
                <h3>Thông Tin</h3>
              </div>
              <div className="cart-items">
                {Orders.Orders?.map(order => {
                  if(order.statusId == 3){
                  return (
                    <div className="cart-item2" key={order.id}>
                      <div>{order.orderId}</div>
                      <div>{order.fullName}</div>
                      <div>
                        <div>
                          <h5>{order.orderDate.slice(8,10)+"-"+order.orderDate.slice(5,7)+"-"+order.orderDate.slice(0,4)+" "+order.orderDate.slice(11,19)}</h5>
                        </div>
                      </div>
                      {/* <div className="cart-product-price">{order.ProductQuantity}</div> */}
                      <div className="cart-product-quantity">
                        <div className="count">{(order.amount).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</div>
                      </div>
                      <div>
                        {order.paymentMethod}
                      </div>
                      <div className="cart-product-total-price">
                        Hoàn Thành
                      </div>
                      <div>
                        <Link to={`/don-hang/${order.orderId}`}>
                          <Button>Chi Tiết</Button>
                        </Link>
                      </div>
                    </div>
                  )
                }})}
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel value={value} index={4}>
        <div className="cart-container2">
            <div>
              <div className="titles2">
                <h3>Mã Đơn Hàng</h3>
                <h3>Họ và Tên</h3>
                <h3 className="product-title">Ngày Đặt</h3>
                <h3 className="Quantity">Tổng Tiền</h3>
                <h3>Phương Thức Thanh Toán</h3>
                <h3 className="total">Trạng Thái</h3>
                <h3>Thông Tin</h3>
              </div>
              <div className="cart-items">
                {Orders.Orders?.map(order => {
                  if(order.statusId == 4){
                  return (
                    <div className="cart-item2" key={order.id}>
                      <div>{order.orderId}</div>
                      <div>{order.fullName}</div>
                      <div>
                        <div>
                          <h5>{order.orderDate.slice(8,10)+"-"+order.orderDate.slice(5,7)+"-"+order.orderDate.slice(0,4)+" "+order.orderDate.slice(11,19)}</h5>
                        </div>
                      </div>
                      {/* <div className="cart-product-price">{order.ProductQuantity}</div> */}
                      <div className="cart-product-quantity">
                        <div className="count">{(order.amount).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</div>
                      </div>
                      <div>
                        {order.paymentMethod}
                      </div>
                      <div className="cart-product-total-price">
                        Đã Hủy
                      </div>
                      <div>
                        <Link to={`/don-hang/${order.orderId}`}>
                          <Button>Chi Tiết</Button>
                        </Link>
                      </div>
                    </div>
                  )
                }})}
              </div>
            </div>
          </div>
        </TabPanel>
      </Box>
    </div>
  );
}