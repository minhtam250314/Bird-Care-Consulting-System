import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import callerApi from '../../utils/APICaller';
import { Container,Row,Col,Card,Button } from 'react-materialize'
import ClassIcon from '@mui/icons-material/Class';
import PersonIcon from '@mui/icons-material/Person';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
export default function PostDetail() {
    const Postid = useParams();
    const [post, setPost] = useState([])
    const [birdtype, setBirdType] = useState([])
    console.log(Postid);

    function getData() {
        callerApi(`Post/GetPostById?id=` + Postid.id, 'GET', null).then(res => {
            console.log(res.data);
            setPost(res.data);
        })
    }

    function getBirdType() {
        callerApi(`Bird/GetBirdtypeByID?id=` + post.birdType, 'GET', null).then(res => {
            console.log(res.data);
            setBirdType(res.data);
        })
    }

    useEffect(()=>{
        getData();
    },[])

    useEffect(()=>{
        if(post && post.birdType){
            getBirdType();
        }
    },[post])

    return (
      <div>
        <Container>
            <Row>
                <Col s={12} m={12} l={12}>
                    <Card>
                        <h5 style={{textAlign: "center", fontWeight: "bold"}}>{post.title}</h5>
                        <div className="bottom-line2"></div>
                        <div style={{display: "flex", justifyContent: "center", alignContent: "center", fontSize: "15px"}}>
                            <div>
                                <PersonIcon/>
                            </div>
                            <p style={{marginRight: "10px"}}>{post.author}</p>

                            <div>
                                <ClassIcon/>
                            </div>
                            <p style={{marginRight: "10px"}}>{birdtype.birdName}</p>

                            <span style={{display: "flex", justifyContent: "center", alignContent: "center", fontSize: "15px"}}>
                            <AccessTimeIcon/>
                            {
                            post.date?.slice(8, 10) + "/" + post.date?.slice(5, 7) + "/" + post.date?.slice(0, 4) + " " + post.date?.slice(11, 16)
                            }
                            </span>
                        </div>
                        <div style={{display: "flex",justifyContent: "center",alignContent: "center", marginTop: "20px"}}>
                            <img style={{width: "600px", height: "500px"}} src={post.image}/>
                        </div>
                        <div>{post.description}</div>
                    </Card>
                </Col>
            </Row>
        </Container>
      </div>
    );
}