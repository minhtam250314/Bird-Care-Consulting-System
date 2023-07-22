import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-materialize';
import { Card, CardContent, CardHeader } from '@mui/material';
import { useFormik } from "formik";
import * as Yup from "yup";
import { FormControl} from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useParams } from "react-router-dom";
import callerApi from '../../../utils/APICaller';
import callerApi2 from '../../../utils/APICaller_Account';
export default function ManageProduct() {
    const [birdList, setBirdList] = React.useState([]);
    const productid = useParams();
    const formik = useFormik({
        initialValues: {
            name: "",
            image: "",
            price: "",
            category: "",
            description: "",
            quantity: "",
            forBird: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Không được để trống").max(100, "Tên sản phẩm không được hơn 100 ký tự").typeError("Không được để trống"),
            image: Yup.string().required("Không được để trống").typeError("Không được để trống"),
            price: Yup.number().required("Không được để trống").min(0, "Giá không được âm").max(1000000000,"Giá không được hơn 1 tỷ").typeError("Chỉ cho phép số"),
            category: Yup.string().required("Vui lòng chọn 1 loại sản phẩm").typeError("Không được để trống"),
            description: Yup.string().required("Không được để trống").typeError("Không được để trống"),
            quantity: Yup.number().required("Không được để trống").min(0, "Số lượng không được âm").max(999, "Số lượng không được vượt quá 999").typeError("Chỉ cho phép số"),
            forBird: Yup.string().required("Vui lòng chọn 1 loại chim").typeError("Không được để trống"),
        }),
        onSubmit: (values) => {
            callerApi2("Product/UpdateProduct", "PUT", {
                productId: productid.id,
                productName: values.name,
                price: values.price,
                quantity: values.quantity,
                description: values.description,
                birdId: values.forBird,
                category: values.category,
                image: values.image,
            }).then(res => {
                if (res.status === 200) {
                    toast.success("Chỉnh sửa thành công");
                }
            }).catch(err => {
                toast.error("Chỉnh sửa thất bại");
            })
            console.log(values);
        },
    });

    async function getBirdData() {
        await callerApi("Bird/GetAllBirdtype", "GET", null).then((res) => {
            setBirdList(res.data);
        })
    }

    async function getProductData() {
        await callerApi("Product/GetProductById?id="+productid.id, "GET", null).then((res) => {
            formik.setFieldValue("name", res.data.productName);
            formik.setFieldValue("image", res.data.image);
            formik.setFieldValue("price", res.data.price);
            formik.setFieldValue("category", res.data.category);
            formik.setFieldValue("description", res.data.description);
            formik.setFieldValue("quantity", res.data.quantity);
            formik.setFieldValue("forBird", res.data.birdId);
        })
    }

    useEffect(() => {
        getProductData();
        getBirdData();
    }, [])

    return (
        <div>
            <div>
                <Link to='/admin'><Button variant="contained" color="primary">Quay Về</Button></Link>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px', marginBottom: '30px' }}>
                <Card style={{ width: '1000px' }}>
                    <div style={{ textAlign: "center" }}>
                        <CardHeader title="Chỉnh Sửa Sản Phẩm" />
                    </div>
                    <CardContent>
                        <form onSubmit={formik.handleSubmit}>
                            <div>
                                <label>Tên Sản Phẩm</label>
                                <input type="text" className="form-control" id="name" value={formik.values.name} onChange={formik.handleChange} />
                                {formik.errors.name && formik.touched.name && (<p style={{color: "red"}}>{formik.errors.name}</p>)}
                            </div>
                            <div style={{marginTop: "20px"}}>
                                <label>Ảnh Sản Phẩm</label>
                                <input type="text" className="form-control" id="image" value={formik.values.image} onChange={formik.handleChange} />
                                {formik.errors.image && formik.touched.image && (<p style={{color: "red"}}>{formik.errors.image}</p>)}
                            </div>
                            <div style={{marginTop: "20px"}}>
                                <label>Giá Sản Phẩm</label>
                                <input type="text" className="form-control" id="price" value={formik.values.price} onChange={formik.handleChange} />
                                {formik.errors.price && formik.touched.price && (<p style={{color: "red"}}>{formik.errors.price}</p>)}
                            </div>
                            <div style={{marginTop: "20px"}}>
                                <label>Chọn Loại Sản Phẩm</label>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="category"
                                        id="category"
                                        name='category'
                                        value={formik.values.category}
                                        onChange={formik.handleChange}
                                    >
                                        <MenuItem value={'Thức Ăn'}>Thức Ăn</MenuItem>
                                        <MenuItem value={'Thuốc'}>Thuốc</MenuItem>
                                    </Select>
                                </FormControl>
                                {formik.errors.category && formik.touched.category && (<p style={{color: "red"}}>{formik.errors.category}</p>)}
                            </div>
                            <div style={{marginTop: "20px"}}>
                                <label>Mô Tả Sản Phẩm</label>
                                <TextareaAutosize id="description" aria-label="minimum height" value={formik.values.description} onChange={formik.handleChange} minRows={3}  style={{ width: '100%', resize: "none" }} />
                                {formik.errors.description && formik.touched.description && (<p style={{color: "red"}}>{formik.errors.description}</p>)}
                            </div>
                            <div style={{marginTop: "20px"}}>
                                <label>Số Lượng</label>
                                <input type="number" min={1} className="form-control" id="quantity" value={formik.values.quantity} onChange={formik.handleChange} />
                                {formik.errors.quantity && formik.touched.quantity && (<p style={{color: "red"}}>{formik.errors.quantity}</p>)}
                            </div>
                            <div style={{marginTop: "20px"}}>
                                <label>Cho Loài Chim</label>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="forBird"
                                        id="forBird"
                                        name='forBird'
                                        value={formik.values.forBird}
                                        onChange={formik.handleChange}
                                    >
                                        {birdList.map((item) => {
                                            return (
                                                <MenuItem value={item.birdId}>{item.birdName}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                                {formik.errors.forBird && formik.touched.forBird && (<p style={{color: "red"}}>{formik.errors.forBird}</p>)}
                            </div>
                            <div style={{ textAlign: "center", marginTop: "20px" }}>
                                <Button variant="contained" color="primary" type="submit">Chỉnh Sửa</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}