import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import callerApi from '../../utils/APICaller';
import callerApi2 from '../../utils/APICaller_Account';
import { useEffect } from 'react';
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from 'react-toastify';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import PasswordIcon from '@mui/icons-material/Password';

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
        <Box sx={{ p: 3 }}>
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
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function Profile() {
  const [value, setValue] = React.useState(0);
  const [userInfo, setUserInfo] = React.useState({});
  const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const formik = useFormik({
    initialValues: {
      fullName: "",
      mail: "",
      phone: "",
      address: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Vui lòng nhập họ tên").max(50, "Họ tên không được quá 50 ký tự"),
      mail: Yup.string().required("Vui lòng nhập email").max(50, "Email không được quá 50 ký tự"),
      phone: Yup.string().required("Vui lòng nhập số điện thoại").matches(phoneRegExp, "Số điện thoại không hợp lệ"),
      address: Yup.string().required("Vui lòng nhập địa chỉ").max(50, "Địa chỉ không được quá 50 ký tự"),
    }),
    onSubmit: (values) => {
      callerApi2("Customer/UpdateAccount", "PUT", {
        fullName: values.fullName,
        phone: values.phone,
        address: values.address,
        password: userInfo.password,
        mail: values.mail
      }).then((response) => {
        if (response.status === 200) {
          toast.success("Cập nhật thông tin thành công");
          setInterval(() => {
            window.location.reload();
          }, 2000);
        }
      }
      ).catch((error) => {
        toast.error("Cập nhật thông tin thất bại");
      });
    },
  });

  const formik2 = useFormik({
    initialValues: {
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      newPassword: Yup.string().required("Vui lòng nhập mật khẩu mới").max(50, "Mật khẩu mới không được quá 50 ký tự"),
      confirmPassword: Yup.string().required("Vui lòng nhập lại mật khẩu mới").oneOf([Yup.ref('newPassword'), null], 'Mật khẩu không khớp'),
    }),
    onSubmit: (values) => {
      callerApi2("Customer/ChangePassword?newPassword="+values.newPassword, "PUT", null).then((response) => {
        if (response.status === 200) {
          toast.success("Cập nhật mật khẩu thành công");
        }
      }
      ).catch((error) => {
        toast.error("Cập nhật mật khẩu thất bại");
      });
    },
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getCurrentUser() {
    await callerApi2("Customer/GetCurrentCustomer", "GET", null).then((response) => {
        setUserInfo(response.data);
        formik.setFieldValue("fullName", response.data.fullName);
        formik.setFieldValue("mail", response.data.mail);
        formik.setFieldValue("phone", response.data.phone);
        formik.setFieldValue("address", response.data.address);
    });
   }
  
   useEffect(() => {
    getCurrentUser();
    }, []);

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 600}}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', backgroundColor: "#f5f5f5" }}
      >
        <Tab style={{backgroundColor: "white"}} icon={<AccountCircleIcon style={{color: "blue"}}/>} iconPosition={"start"} label="Thông Tin Tài Khoản" {...a11yProps(0)} />
        <Tab style={{backgroundColor: "white"}} icon={<ManageAccountsIcon style={{color: "red"}}/>} iconPosition={"start"} label="Thay Đổi Thông Tin Cá Nhân" {...a11yProps(1)} />
        <Tab style={{backgroundColor: "white"}} icon={<PasswordIcon style={{color: "green"}}/>} iconPosition={"start"} label="Thay Đổi Mật Khẩu" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0} style={{marginBottm: "10px", backgroundColor: '#f5f5f5'}}>
        <div>
            <div className="introHeading">Thông Tin Tài Khoản</div>
            <div className="bottom-line2" style={{marginTop: "25px"}}></div>
            <div className="row">
                <div className="col-6" style={{width: '1300px'}}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Họ Tên</label>
                        <input value={userInfo?.fullName} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" disabled/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email</label>
                        <input value={userInfo?.mail} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" disabled/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Số Điện Thoại</label>
                        <input value={userInfo?.phone} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" disabled/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Địa Chỉ</label>
                        <input value={userInfo?.address}  type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" disabled/>
                    </div>
                </div>
            </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1} style={{backgroundColor: '#f5f5f5'}}>
              <form onSubmit={formik.handleSubmit}>
                  <div>
                      <div className="introHeading">Thay Đổi Thông Tin Cá Nhân</div>
                      <div className="bottom-line2" style={{ marginTop: "25px" }}></div>
                      <div className="row">
                          <div className="col-6" style={{ width: '1300px' }}>
                              <div className="form-group">
                                  <label>Họ Tên</label>
                                  <input type="text" className="form-control" id="fullName" value={formik.values.fullName} onChange={formik.handleChange} />
                                  {formik.errors.fullName ? <div style={{color: "red"}}>{formik.errors.fullName}</div> : null}
                              </div>
                              <div className="form-group">
                                  <label>Email</label>
                                  <input type="email" className="form-control" id="mail" value={formik.values.mail} onChange={formik.handleChange} />
                                  {formik.errors.mail ? <div style={{color: "red"}}>{formik.errors.mail}</div> : null}
                              </div>
                              <div className="form-group">
                                  <label>Số Điện Thoại</label>
                                  <input type="text" className="form-control" id="phone" value={formik.values.phone} onChange={formik.handleChange} />
                                  {formik.errors.phone ? <div style={{color: "red"}}>{formik.errors.phone}</div> : null}
                              </div>
                              <div className="form-group">
                                  <label>Địa Chỉ</label>
                                  <input type="text" className="form-control" id="address" value={formik.values.address} onChange={formik.handleChange} />
                                  {formik.errors.address ? <div style={{color: "red"}}>{formik.errors.address}</div> : null}
                              </div>
                              <div className="form-group" style={{textAlign: "center"}}>
                                  <button type="submit" className="btn btn-primary">Cập Nhật</button>
                              </div>
                          </div>
                      </div>
                  </div>
              </form>
      </TabPanel>
      <TabPanel value={value} index={2} style={{backgroundColor: '#f5f5f5'}}>
              <form onSubmit={formik2.handleSubmit} >
                  <div>
                      <div className="introHeading">Thay Đổi Mật Khẩu </div>
                      <div className="bottom-line2" style={{ marginTop: "25px" }}></div>
                      <div className="row">
                          <div className="col-6" style={{ width: '1300px' }}>
                              <div className="form-group">
                                  <label>Mật Khẩu Mới</label>
                                  <input type="password" className="form-control" value={formik2.values.newPassword} onChange={formik2.handleChange} id="newPassword" />
                                  {formik.errors.newPassword ? <div style={{ color: "red" }}>{formik.errors.newPassword}</div> : null}
                              </div>
                              <div className="form-group">
                                  <label>Nhập Lại Mật Khẩu Mới</label>
                                  <input type="password" className="form-control" value={formik2.values.confirmPassword} onChange={formik2.handleChange} id="confirmPassword" />
                                  {formik.errors.confirmPassword ? <div style={{ color: "red" }}>{formik.errors.confirmPassword}</div> : null}
                              </div>
                              <div className="form-group" style={{ textAlign: "center" }}>
                                  <button type="submit" className="btn btn-primary">Cập Nhật</button>
                              </div>
                          </div>
                      </div>
                  </div>
              </form>
      </TabPanel>
    </Box>
  );
}