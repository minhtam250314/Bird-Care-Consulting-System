import { Link } from 'react-router-dom'
import { Container,Row,Col,Card,Button } from 'react-materialize'
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
export default function NewestPost({Posts}) {
    return (
        <div style={{font: "marope"}}>
            <br/>
            <div className="bottom-line2" style={{marginTop: "25px"}}></div>
            <div className="introHeading">Các Bài Viết Mới Nhất</div>
            <Container>
                <br/>
                <Row >
                    {Posts.slice(0,3).map((post) =>
                    (<Col s={12} m={6} l={4}  >
                        <Card>
                         <img style={{width: "300px", height: "200px"}} src={post.image} />
                         <span style={{float: "left", display: "flex", justifyContent: "center", alignContent: "center", fontSize: "13px"}}>
                            <span>
                                <PersonIcon/>
                            </span>
                            {post.author}
                        </span>
                        <span style={{float: "right", display: "flex", justifyContent: "center", alignContent: "center", fontSize: "13px"}}>
                            <AccessTimeIcon/>
                        {
                            post.date.slice(8, 10) + "/" + post.date.slice(5, 7) + "/" + post.date.slice(0, 4) + " " + post.date.slice(11, 16)
                        }
                         </span>
                         <Link to={`bai-viet/${post.postId}`}>
                         <h3 className='ProductTitle'>{post.title}</h3>
                         </Link>
                            <div className="PostDescription" >{post.description}</div>
                        </Card>
                    </Col>))}
                </Row>
            </Container>
            <Link to={"/bai-viet"} style={{display: "flex", justifyContent: "center", alignContent: "center"}}>
                <Button>Xem Thêm</Button>
            </Link>
        </div>
    )
}