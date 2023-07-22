import { Button, Row, Col, Container, Card } from "react-materialize";
import { Link } from "react-router-dom";
import React from 'react';
export default function Service({ Services }) {
    console.log(Services);
    return (
        <div>
            <h3 class="AboutTitle">Các Dịch Vụ</h3>
            <div className="bottom-line2"></div>
            <br/>
            <Container>
                <Row>
                    {Services.map((service) =>
                    (<Col s={12} m={6} l={4}  >
                        <div className='Service-info'>
                            <Card style={{ borderRadius: "20px"}}>
                                <img style={{ width: "300px", height: "300px" }} src={service.image} />
                                <p style={{ textAlign: "center", fontWeight: "bold", color: "black" }} className='Service'>{service.serviceName}</p>
                                <div className='Service-item-price'>
                                    <div className='Price-money'>
                                        <p style={{ textAlign: "center" }}>{(service.price).toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</p>
                                    </div>
                                </div>
                                <p style={{ textAlign: "center", marginTop: "10px" }}>
                                    <Link to={`/dich-vu/${service.serviceId}`}>
                                        <Button>
                                            Chi tiết
                                        </Button>
                                    </Link>
                                </p>
                            </Card>
                        </div>
                    </Col>))}
                </Row>
            </Container>
        </div >
    );

}
