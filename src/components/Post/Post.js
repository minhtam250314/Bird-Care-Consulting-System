import { Link } from 'react-router-dom'
import { Container, Row, Col, Card, Button, Select } from 'react-materialize'
import FormControl from '@mui/material/FormControl';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import callerApi from '../../utils/APICaller';
import { useEffect, useState } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
export default function Post({ Posts }) {
    const [postList, setPostList] = useState([]);
    const [search, setSearch] = useState("");
    const formik = useFormik({
        initialValues: {
            filterDate: 'nothing',
        },
        validationSchema: Yup.object({
            filterDate: Yup.string().required('Vui lòng chọn 1 loại mục'),
        }),
        onSubmit: values => {
            callerApi(`Post/GetAllPost/FilterByDate?filter=${values.filterDate}`, 'GET', null).then(res => {
                console.log(res.data);
                setPostList(res.data);
            })
        },
    });

    useEffect(() => {
        setPostList(Posts.filter((post) => {
            return post.title.toLowerCase().includes(search.toLowerCase())
        }))
    }, [search, Posts])

    return (
        <div style={{ font: "marope" }}>
            <br />
            <h3 class="AboutTitle">Các Bài Viết</h3>
            <div className="bottom-line2"></div>
            <div style={{ width: "700px", margin: "0 auto" }}>
                <input onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Nhập tiêu đề để tìm kiếm bài viết.." name="search" />
            </div>
            <div>
                <form onSubmit={formik.handleSubmit}>
                    <Row>
                        <div style={{marginLeft: "390px"}}>
                            <Col s={12} m={6} l={4}>
                                <FormControl fullWidth>
                                    <Select
                                        labelId="filterDate"
                                        id="filterDate"
                                        value={formik.values.filterDate}
                                        label="Hiển thị theo"
                                        onChange={formik.handleChange}
                                    >
                                        <option value={'nothing'}></option>
                                        <option value={'newest'}>Bài viết mới nhất</option>
                                        <option value={'oldest'}>Bài viết cũ nhất</option>
                                    </Select>
                                </FormControl>
                                <div style={{marginLeft: "10px"}}  >
                                <Button className='btn btn-primary' type="submit">Hiển thị</Button>
                                </div>
                            </Col>
                        </div>
                    </Row>
                </form>
            </div>
            <Container>
                <Row>
                    {postList.map((post) =>
                    (<Col s={12} m={6} l={4}  >
                        <Card>
                            <img style={{ width: "300px", height: "200px" }} src={post.image} />
                            <span style={{ float: "left", display: "flex", justifyContent: "center", alignContent: "center", fontSize: "13px" }}>
                                <span>
                                    <PersonIcon />
                                </span>
                                {post.author}
                            </span>
                            <span style={{ float: "right", display: "flex", justifyContent: "center", alignContent: "center", fontSize: "13px" }}>
                                <AccessTimeIcon />
                                {
                                    post.date.slice(8, 10) + "/" + post.date.slice(5, 7) + "/" + post.date.slice(0, 4) + " " + post.date.slice(11, 16)
                                }
                            </span>
                            <Link to={`/bai-viet/${post.postId}`}>
                                <h3 className='ProductTitle'>{post.title}</h3>
                            </Link>
                            <div className="PostDescription">{post.description}</div>
                        </Card>
                    </Col>))}
                </Row>
            </Container>
        </div>
    )
}