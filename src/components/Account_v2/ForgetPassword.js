import { useRef, useState, useEffect } from "react";
import BeenhereIcon from '@mui/icons-material/Beenhere';
import callerApi from '../../utils/APICaller';
import InfoIcon from '@mui/icons-material/Info';
import ErrorIcon from '@mui/icons-material/Error';
import { Card } from "react-materialize";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import './Account.css'
import { Grid } from "@mui/material";
const EMAIL_REGEX = /^[a-z][a-z0-9_\.]{1,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/;
const ForgetPassword = () => {
    const userRef = useRef();

    const [email, setEmail] = useState('');
    const [validName, setValidName] = useState(false);
    const [mailFocus, setEmailFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setErrMsg('');
    }, [email])

    const handleSubmit = async (e) => {
        e.preventDefault();     
        const v1 = EMAIL_REGEX.test(email);
        if (!v1) {
            setErrMsg("Invalid Entry");
            return;
        }
            callerApi("Customer/GetPasswordByEmail?email="+ email, "Put", {
                mail: email
            }).then(response => {
                console.log(response?.data);
                console.log(JSON.stringify(response))
                if (response?.data === "Cannot Found User") {
                    console.log(response.data);
                    toast.error("Không tìm thấy email");
                }else{
                    toast.success("Gửi mail thành công")
                }
            }).catch(err =>{
                console.log(err.response.status);
                toast.error("Gửi mail thất bại");
            });

            //clear state and controlled inputs
            //need value attrib on inputs for thisS
            
    }

    return (
        <Grid container component="main" sx={{
            height: '100vh', backgroundImage: 'url(https://indianaaudubon.org/wp-content/uploads/2016/02/colourful-bird-high-definition-wallpaper-for-desktop-background-download-free.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }} >
        <div className="Forget-main">
            <div className="Forget">
                <Card className="Forget-form">
                
                        <section>
                        <div className="Forget-img">
                        <img class src="https://cdn.discordapp.com/attachments/1074987128984973365/1075688774006218752/logo.png"/>
                        </div>
                        
                            <h4>Tìm tài khoản của bạn</h4>
                            <form onSubmit={handleSubmit}>
                               
                                <label className="Register-title" htmlFor="email">
                                <text>Nhập email để xác nhận</text>
                                    <BeenhereIcon className={validName ? "valid" : "hide"} />
                                    <ErrorIcon className={validName || !email ? "hide" : "invalid"} />
                                </label>
                                <input
                                    type="text"
                                    id="email"
                                    placeholder="Nhập Email..."
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                    aria-invalid={validName ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                />
                                <p id="uidnote" className={mailFocus && email && !validName ? "instructions" : "offscreen"}>
                                    <InfoIcon />
                                    <div>Viết đúng mail , ví dụ: Example@gmail.com</div>
                                </p>

                   <div style={{
                                    textAlign: "center"
                                }}>
                                    <button className="Forget-button" disabled={!validName ? true : false}>Xác nhận</button>
                                </div>

                            </form>
                            <div style={{
                                position: "relative",
                                textAlign: "center",
                                margin:"10px 0 0 0"
                            }}>
                                Đã xác nhận thành công?
                                <span className="line">
                                    <Link to={'/dang-nhap'}>Đăng nhập</Link>
                                </span>
                            </div>
                            
                        </section>
                        
                    
                </Card>
            </div>
        </div>
        </Grid>
    )
}

export default ForgetPassword