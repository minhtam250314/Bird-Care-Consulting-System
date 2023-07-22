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
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const USER_REGEX = /^[AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+ [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]+(?: [AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬBCDĐEÈẺẼÉẸÊỀỂỄẾỆFGHIÌỈĨÍỊJKLMNOÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢPQRSTUÙỦŨÚỤƯỪỬỮỨỰVWXYỲỶỸÝỴZ][aàảãáạăằẳẵắặâầẩẫấậbcdđeèẻẽéẹêềểễếệfghiìỉĩíịjklmnoòỏõóọôồổỗốộơờởỡớợpqrstuùủũúụưừửữứựvwxyỳỷỹýỵz]*)*$/;
const PHONE_REGEX = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
const Register = () => {
    const userRef = useRef();

    const [user, setUser] = useState('');
    const [validUser, setValidUser] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [phone, setPhone] = useState('');
    const [validPhone, setValidPhone] = useState(false);
    const [phoneFocus, setPhoneFocus] = useState(false);

    const [adress, setAdress] = useState('');

    const [email, setEmail] = useState('');
    const [validName, setValidName] = useState(false);
    const [mailFocus, setEmailFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidUser(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPhone(PHONE_REGEX.test(phone));
    }, [phone])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [email,user,phone,adress,pwd,matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const v1 = EMAIL_REGEX.test(email);
        const v2 = PWD_REGEX.test(pwd);
        const v3 = USER_REGEX.test(user);
        const v4 = PHONE_REGEX.test(phone);
        if (!v1 || !v2  || !v3 || !v4) {
            setErrMsg("Invalid Entry");
            return;
        }
            callerApi("Customer/RegisterAccount?confirmPassword="+ matchPwd, "POST", {
                fullName: user,
                phone: phone,
                address: adress,
                password: pwd,
                mail: email
            }).then(response => {
                console.log(response?.data);
                console.log(JSON.stringify(response))
                if (response?.status === 200) {
                    console.log(response.data);
                    toast.success("Đăng ký thành công")
                    window.location.href = "/dang-nhap";
                }
            }).catch(err =>{
                console.log(err.response.status);
                toast.error("Đăng ký thất bại");
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
        <div className="Register-main">
            <div className="Register">
                <Card className="Register-form">
                
                        <section>

                            <h4>Đăng ký</h4>
                            <form onSubmit={handleSubmit}>


                                <label className="Register-title" htmlFor="user">
                                    <text>Họ và Tên</text>
                                    <BeenhereIcon className={validUser ? "valid" : "hide"} />
                                    <ErrorIcon className={validUser || !user ? "hide" : "invalid"} />
                                </label>
                                <input
                                    type="text"
                                    placeholder="Nhập Họ Tên..."
                                    id="user"
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setUser(e.target.value)}
                                    value={user}
                                    required
                                    aria-invalid={validUser ? "false" : "true"}
                                    aria-describedby="usernote"
                                    onFocus={() => setUserFocus(true)}
                                    onBlur={() => setUserFocus(false)}
                                />
                                <p id="usernote" className={userFocus && user && !validUser ? "instructions" : "offscreen"}>
                                    <InfoIcon />
                                    <div>Viết đúng họ tên , ví dụ :Nguyễn Văn A</div>
                                </p>                                 

                                <label className="Register-title" htmlFor="phone">
                                    <text>Số điện thoại</text>
                                    <BeenhereIcon className={validPhone ? "valid" : "hide"} />
                                    <ErrorIcon className={validPhone || !phone ? "hide" : "invalid"} />
                                </label>
                                <input
                                    type="text"
                                    id="phone"
                                    placeholder="Nhập số điện thoại..."
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setPhone(e.target.value)}
                                    value={phone}
                                    required
                                    aria-invalid={validName ? "false" : "true"}
                                    aria-describedby="phonenote"
                                    onFocus={() => setPhoneFocus(true)}
                                    onBlur={() => setPhoneFocus(false)}
                                />
                                <p id="phonenote" className={phoneFocus && phone && !validPhone ? "instructions" : "offscreen"}>
                                    <InfoIcon />
                                    <div>0xxx xxx xxx</div>
                                </p>

                                <label className="Register-title" htmlFor="adress">
                                    <text>Địa chỉ</text>
                                </label>
                                <input
                                    type="text"
                                    id="adress"
                                    placeholder="Nhập địa chỉ..."
                                    ref={userRef}
                                    autoComplete="off"
                                    onChange={(e) => setAdress(e.target.value)}
                                    value={adress}
                                    required
                                />

                                <label className="Register-title" htmlFor="email">
                                    <text>Email</text>
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


                                <label className="Register-title" htmlFor="password">
                                    Mật khẩu:
                                    <BeenhereIcon className={validPwd ? "valid" : "hide"} />
                                    <ErrorIcon className={validPwd || !pwd ? "hide" : "invalid"} />
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Nhập mật khẩu..."
                                    onChange={(e) => setPwd(e.target.value)}
                                    value={pwd}
                                    required
                                    aria-invalid={validPwd ? "false" : "true"}
                                    aria-describedby="pwdnote"
                                    onFocus={() => setPwdFocus(true)}
                                    onBlur={() => setPwdFocus(false)}
                                />
                                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}>
                                    <InfoIcon />
                                    <div>Mật khẩu từ 8 đến 24 kí tự, bao gồm in hoa , in thường , số và kí tự đặt biệt</div>
                                </p>


                                <label className="Register-title" htmlFor="confirm_pwd">
                                    <div>Xác nhận mật khẩu:</div>
                                    <BeenhereIcon className={validMatch && matchPwd ? "valid" : "hide"} />
                                    <ErrorIcon className={validMatch || !matchPwd ? "hide" : "invalid"} />
                                </label>
                                <input
                                    type="password"
                                    id="confirm_pwd"
                                    placeholder="Nhập lại mật khẩu..."
                                    onChange={(e) => setMatchPwd(e.target.value)}
                                    value={matchPwd}
                                    required
                                    aria-invalid={validMatch ? "false" : "true"}
                                    aria-describedby="confirmnote"
                                    onFocus={() => setMatchFocus(true)}
                                    onBlur={() => setMatchFocus(false)}
                                />
                                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                                    <InfoIcon />
                                    <div className="Register-alert">phải khớp với mật khẩu nhập vào phía trên</div>
                                </p>
                                <div style={{
                                    textAlign: "center",
                                    margin:"15px 0 0 0 "
                                }}>
                                    <button className="Register-button" disabled={!validName || !validPwd || !validMatch ? true : false}>Đăng ký</button>
                                </div>

                            </form>
                            <div style={{
                                position: "relative",
                                textAlign: "center"
                            }}>
                                Đã có tài khoản?
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

export default Register