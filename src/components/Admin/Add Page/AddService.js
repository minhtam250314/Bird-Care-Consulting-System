import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-materialize';
import { Card, CardContent, CardHeader } from '@mui/material';
import { useFormik } from "formik";
import * as Yup from "yup";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { toast } from 'react-toastify';
import callerApi2 from '../../../utils/APICaller_Account';
export default function AddService() {
    const formik = useFormik({
        initialValues: {
            serviceName: "",
            price: "",
            desciption: "",
            image: "",
        },
        validationSchema: Yup.object({
            serviceName: Yup.string().required("Không được để trống").max(50, "Tên dịch vụ không được hơn 50 ký tự").typeError("Không được để trống"),
            price: Yup.number().required("Không được để trống").min(0, "Giá không được âm").max(1000000000,"Giá không được hơn 1 tỷ").typeError("Chỉ cho phép số"),
            desciption: Yup.string().required("Không được để trống").typeError("Không được để trống"),
            image: Yup.string().required("Không được để trống").typeError("Không được để trống"),
        }),
        onSubmit: (values) => {
            callerApi2("Service/CreateService", "POST", {
                serviceName: values.serviceName,
                price: values.price,
                desciption: values.desciption,
                image: values.image,
                video: ""
            }).then(res => {
                if (res.status === 200) {
                    toast.success("Thêm dịch vụ thành công");
                }
            }).catch(err => {
                if (err.response.data === "Service already existed") {
                    toast.error("Dịch vụ đã tồn tại");
                }else{
                    toast.error("Thêm dịch vụ thất bại");
                }
            })
            console.log(values);
        },
    });
    return(
        <div>
            <div>
                <Link to='/admin'><Button variant="contained" color="primary">Quay Về</Button></Link>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px', marginBottom: '30px' }}>
                <Card style={{ width: '1000px' }}>
                    <div style={{ textAlign: "center" }}>
                        <CardHeader title="Thêm Dịch Vụ" />
                    </div>
                    <CardContent>
                        <form onSubmit={formik.handleSubmit}>
                            <div>
                                <label>Tên Dịch Vụ</label>
                                <input type="text" className="form-control" id="serviceName" value={formik.values.serviceName} onChange={formik.handleChange} />
                                {formik.errors.serviceName && formik.touched.serviceName && (<p style={{color: "red"}}>{formik.errors.serviceName}</p>)}
                            </div>
                            <div style={{marginTop: "20px"}}>
                                <label>{"Hình Ảnh Dịch Vụ (Đường dẫn http://xxxxx/x.png)"}</label>
                                <input type="text" className="form-control" id="image" value={formik.values.image} onChange={formik.handleChange} />
                                {formik.errors.image && formik.touched.image && (<p style={{color: "red"}}>{formik.errors.image}</p>)}
                            </div>
                            <div style={{marginTop: "20px"}}>
                                <label>Giá Dịch Vụ</label>
                                <input type="text" className="form-control" id="price" value={formik.values.price} onChange={formik.handleChange} />
                                {formik.errors.price && formik.touched.price && (<p style={{color: "red"}}>{formik.errors.price}</p>)}
                            </div>
                            <div style={{marginTop: "20px"}}>
                                <label>Mô Tả Dịch Vụ</label>
                                <TextareaAutosize id="desciption" aria-label="minimum height" value={formik.values.desciption} onChange={formik.handleChange} minRows={3}  style={{ width: '100%', resize: "none" }} />
                                {formik.errors.desciption && formik.touched.desciption && (<p style={{color: "red"}}>{formik.errors.desciption}</p>)}
                            </div>
                            <div style={{ textAlign: "center", marginTop: "20px" }}>
                                <Button variant="contained" color="primary" type="submit">Thêm</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}