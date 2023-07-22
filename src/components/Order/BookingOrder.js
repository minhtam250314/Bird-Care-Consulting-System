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

export default function BookingOrder(Bookings) {
  console.log(Bookings);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Tất Cả Lịch Hẹn" {...a11yProps(0)} />
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
                <h3>Mã</h3>
                <h3>Họ và Tên</h3>
                <h3>Ngày Hẹn</h3>
                <h3 className="Quantity">Giá</h3>
                <h3 className="total">Trạng Thái</h3>
                <h3>Thông Tin</h3>
              </div>
              <div className="cart-items">
                {Bookings.Bookings?.map(booking => {
                  return (
                    <div className="cart-item2" key={booking.bookingId}>
                      <div>{booking.bookingId}</div>
                      <div>{booking.fullName}</div>
                      <div>
                        <div>
                          <h5>{booking.bookingDate.slice(8,10)+"-"+booking.bookingDate.slice(5,7)+"-"+booking.bookingDate.slice(0,4)+" "+booking.bookingDate.slice(11,19)}</h5>
                        </div>
                      </div>
                      <div className="cart-product-quantity">
                        <div className="count">{(booking.price).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</div>
                      </div>
                      <div className="cart-product-total-price">
                        {booking.statusId == 1 ? <div>Chờ Xác Nhận</div> :
                          booking.statusId == 2 ? <div>Đã Xác Nhận</div> :
                            booking.statusId == 3 ? <div>Hoàn Thành</div> :
                                                    <div>Đã Hủy</div>}
                      </div>
                      <div>
                        <Link to={`/lich-hen/${booking.bookingId}`}>
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
                <h3>Mã</h3>
                <h3>Họ và Tên</h3>
                <h3>Ngày Hẹn</h3>
                <h3 className="Quantity">Giá</h3>
                <h3 className="total">Trạng Thái</h3>
                <h3>Thông Tin</h3>
              </div>
              <div className="cart-items">
                {Bookings.Bookings?.map(booking => {
                  if(booking.statusId == 1){
                  return (
                    <div className="cart-item2" key={booking.bookingId}>
                      <div>{booking.bookingId}</div>
                      <div>{booking.fullName}</div>
                      <div>
                        <div>
                          <h5>{booking.bookingDate.slice(8,10)+"-"+booking.bookingDate.slice(5,7)+"-"+booking.bookingDate.slice(0,4)+" "+booking.bookingDate.slice(11,19)}</h5>
                        </div>
                      </div>
                      <div className="cart-product-quantity">
                        <div className="count">{(booking.price).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</div>
                      </div>
                      <div className="cart-product-total-price">
                        Chờ Xác Nhận
                      </div>
                      <div>
                        <Link to={`/lich-hen/${booking.bookingId}`}>
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
                <h3>Mã</h3>
                <h3>Họ và Tên</h3>
                <h3>Ngày Hẹn</h3>
                <h3 className="Quantity">Giá</h3>
                <h3 className="total">Trạng Thái</h3>
                <h3>Thông Tin</h3>
              </div>
              <div className="cart-items">
                {Bookings.Bookings?.map(booking => {
                  if(booking.statusId == 2){
                  return (
                    <div className="cart-item2" key={booking.bookingId}>
                      <div>{booking.bookingId}</div>
                      <div>{booking.fullName}</div>
                      <div>
                        <div>
                          <h5>{booking.bookingDate.slice(8,10)+"-"+booking.bookingDate.slice(5,7)+"-"+booking.bookingDate.slice(0,4)+" "+booking.bookingDate.slice(11,19)}</h5>
                        </div>
                      </div>
                      <div className="cart-product-quantity">
                        <div className="count">{(booking.price).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</div>
                      </div>
                      <div className="cart-product-total-price">
                        Đã Xác Nhận
                      </div>
                      <div>
                        <Link to={`/lich-hen/${booking.bookingId}`}>
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
                <h3>Mã</h3>
                <h3>Họ và Tên</h3>
                <h3>Ngày Hẹn</h3>
                <h3 className="Quantity">Giá</h3>
                <h3 className="total">Trạng Thái</h3>
                <h3>Thông Tin</h3>
              </div>
              <div className="cart-items">
                {Bookings.Bookings?.map(booking => {
                  if(booking.statusId == 3){
                  return (
                    <div className="cart-item2" key={booking.bookingId}>
                      <div>{booking.bookingId}</div>
                      <div>{booking.fullName}</div>
                      <div>
                        <div>
                          <h5>{booking.bookingDate.slice(8,10)+"-"+booking.bookingDate.slice(5,7)+"-"+booking.bookingDate.slice(0,4)+" "+booking.bookingDate.slice(11,19)}</h5>
                        </div>
                      </div>
                      <div className="cart-product-quantity">
                        <div className="count">{(booking.price).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</div>
                      </div>
                      <div className="cart-product-total-price">
                        Hoàn Thành
                      </div>
                      <div>
                        <Link to={`/lich-hen/${booking.bookingId}`}>
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
                <h3>Mã</h3>
                <h3>Họ và Tên</h3>
                <h3>Ngày Hẹn</h3>
                <h3 className="Quantity">Giá</h3>
                <h3 className="total">Trạng Thái</h3>
                <h3>Thông Tin</h3>
              </div>
              <div className="cart-items">
                {Bookings.Bookings?.map(booking => {
                  if(booking.statusId == 4){
                  return (
                    <div className="cart-item2" key={booking.bookingId}>
                      <div>{booking.bookingId}</div>
                      <div>{booking.fullName}</div>
                      <div>
                        <div>
                          <h5>{booking.bookingDate.slice(8,10)+"-"+booking.bookingDate.slice(5,7)+"-"+booking.bookingDate.slice(0,4)+" "+booking.bookingDate.slice(11,19)}</h5>
                        </div>
                      </div>
                      <div className="cart-product-quantity">
                        <div className="count">{(booking.price).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</div>
                      </div>
                      <div className="cart-product-total-price">
                        Đã Hủy
                      </div>
                      <div>
                        <Link to={`/lich-hen/${booking.bookingId}`}>
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