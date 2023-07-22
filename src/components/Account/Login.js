import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import callerAPI from "../../utils/APICaller";
import { toast } from 'react-toastify';


// const theme = createTheme();

export default function Login() {

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Mail không hợp lệ')
        .required('Không được để trống'),
      password: Yup.string()
        .required('không được để trống'),
    }),
    onSubmit: values => {
      callerAPI('Customer/Login', 'POST', {
        email: values.email,
        password: values.password,
      }).then(res => {
        if (res.status === 200){
          toast.success("Đăng nhập thành công");
          setInterval(() => {
            checkLogin();
          }, 2000);
        }
      }).catch(err => {
        toast.error("Sai email hoặc mật khẩu");
      })
      console.log(values);
    },
  });

  function checkLogin(){
    callerAPI('Customer/GetCurrentCustomer', 'GET', null).then(res => {
      if (res.data.roleId === 1){
        window.location.href = "/";
      } else if (res.data.roleId === 2){
        window.location.href = "/admin";
      }
    }).catch(err => {
      console.log(err);
    })
  }


  return (
    <div>
      {/* <ThemeProvider theme={theme}> */}
      <form component="form" onSubmit={formik.handleSubmit}>
        <Grid container component="main" sx={{ height: '100vh' }}>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              backgroundImage: 'url(https://indianaaudubon.org/wp-content/uploads/2016/02/colourful-bird-high-definition-wallpaper-for-desktop-background-download-free.jpg)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Đăng Nhập
              </Typography>
              <TextField
                multiline
                placeholder="Nhập Email..."
                id="email"
                onChange={formik.handleChange}
                fullWidth
              />
              {formik.errors.email && formik.touched.email && (<p style={{ color: "red" }}>{formik.errors.email}</p>)}

              <TextField
                multiline
                placeholder="Nhập Mật Khẩu..."
                id="password"
                type="password"
                onChange={formik.handleChange}
                fullWidth
              />
              {formik.errors.password && formik.touched.password && (<p style={{ color: "red" }}>{formik.errors.password}</p>)}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Đăng Nhập
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="/khoi-phuc-tai-khoan" variant="body2">
                    Quên mật khẩu?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/dang-ky" variant="body2">
                    Bạn chưa có tài khoản? Đăng Ký
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </form>
      {/* </ThemeProvider> */}
    </div>
  );
}