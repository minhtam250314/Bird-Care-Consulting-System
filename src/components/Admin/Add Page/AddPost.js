import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-materialize';
import { Card, CardContent, CardHeader } from '@mui/material';
import { useFormik } from "formik";
import * as Yup from "yup";
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { toast } from 'react-toastify';
import callerApi from '../../../utils/APICaller';
import callerApi2 from '../../../utils/APICaller_Account';
import {useEffect} from 'react';
import { FormControl} from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
export default function AddPost() {
    const [birdList, setBirdList] = React.useState([]);
    const date = new Date();
    const formik = useFormik({
        initialValues: {
            description : "",
            author : "",
            date : date,
            birdType : "",
            image : "",
            title: ""
        },
        validationSchema: Yup.object({
            description: Yup.string().required("Không được để trống").typeError("Không được để trống"),
            author: Yup.string().required("Không được để trống").max(50, "Tên không được hơn 50 ký tự").typeError("Không được để trống"),
            birdType: Yup.string().required("Không được để trống").typeError("Không được để trống"),
            image: Yup.string().required("Không được để trống").typeError("Không được để trống"),
            title: Yup.string().required("Không được để trống").max(100, "Tiêu đề không được hơn 100 ký tự").typeError("Không được để trống")
        }),
        onSubmit: (values) => {
            callerApi2("Post/AddPost", "POST", {
                description: values.description,
                author: values.author,
                date: values.date,
                birdType: values.birdType,
                image: values.image,
                video: "",
                title: values.title
            }).then(res => {
                if (res.status === 200) {
                    toast.success("Thêm bài viết thành công");
                }
            }).catch(err => {
                if (err.response.data === "Post already existed") {
                    toast.error("Bài viết đã tồn tại");
                }else{
                    toast.error("Thêm bài viết thất bại");
                }
            })
            console.log(values);
        },
    });

    async function getBirdData() {
        await callerApi("Bird/GetAllBirdtype", "GET", null).then((res) => {
            setBirdList(res.data);
        })
    }

    useEffect(() => {
        getBirdData();
    }, [])

    return(
        <div>
            <div>
                <Link to='/admin'><Button variant="contained" color="primary">Quay Về</Button></Link>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '30px', marginBottom: '30px' }}>
                <Card style={{ width: '1000px' }}>
                    <div style={{ textAlign: "center" }}>
                        <CardHeader title="Thêm Bài Viết" />
                    </div>
                    <CardContent>
                        <form onSubmit={formik.handleSubmit}>
                            <div>
                                <label>Tiêu Đề</label>
                                <input type="text" className="form-control" id="title" value={formik.values.title} onChange={formik.handleChange} />
                                {formik.errors.title && formik.touched.title && (<p style={{color: "red"}}>{formik.errors.title}</p>)}
                            </div>
                            <div style={{marginTop: "20px"}}>
                                <label>Hình Ảnh</label>
                                <input type="text" className="form-control" id="image" value={formik.values.image} onChange={formik.handleChange} />
                                {formik.errors.image && formik.touched.image && (<p style={{color: "red"}}>{formik.errors.image}</p>)}
                            </div>
                            <div style={{marginTop: "20px"}}>
                                <label>Mục Chim</label>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="birdType"
                                        id="birdType"
                                        name='birdType'
                                        value={formik.values.birdType}
                                        onChange={formik.handleChange}
                                    >
                                        {birdList.map((item) => {
                                            return (
                                                <MenuItem value={item.birdId}>{item.birdName}</MenuItem>
                                            )
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div style={{marginTop: "20px"}}>
                                <label>Tác Giả</label>
                                <input type="text" className="form-control" id="author" value={formik.values.author} onChange={formik.handleChange} />
                                {formik.errors.author && formik.touched.author && (<p style={{color: "red"}}>{formik.errors.author}</p>)}
                            </div>
                            <div style={{marginTop: "20px"}}>
                                <label>Nội Dung</label>
                                <TextareaAutosize id="description" aria-label="minimum height" value={formik.values.description} onChange={formik.handleChange} minRows={3}  style={{ width: '100%', resize: "none" }} />
                                {formik.errors.description && formik.touched.description && (<p style={{color: "red"}}>{formik.errors.description}</p>)}
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