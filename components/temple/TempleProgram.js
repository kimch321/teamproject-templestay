import {Button, Card, Col, Container, NavLink, Row} from "react-bootstrap";
import shortid from "shortid";
import {HiBadgeCheck} from "react-icons/hi";
import {handleImgError} from "../../models/Utils";

export default function TempleProgram({distinctProPic, pid}) {
    return(
        <div style={{marginTop:`140px`}} id="programWrapper">
            <div style={{marginBottom:`140px`}} id="programContainer">
                <h1 className="fw-bold text-secondary ps-4" id="programTitle">프로그램</h1>
                <Container style={{marginTop:`28px`}} id={'cardContainer'}>
                    <Row>
                        {
                            distinctProPic.map((program)=>(
                                <Col md={4} style={{ marginTop:`28px`, flexBasis: '420px' }} key={shortid.generate()}>
                                    <Card style={{ width: '100%' }} key={shortid.generate()}>
                                        <Card.Img variant="top" src={(program.P_PICLINK.length < 40) ? 'https://www.templestay.com/images/templeinfo-00.jpg' : program.P_PICLINK} onError={handleImgError} style={{height: '280px'}} key={shortid.generate()}/>
                                        <Card.Body className={'bg-light'} key={shortid.generate()}>
                                            <Card.Title style={{height:`70px`}} key={shortid.generate()}>{program.P_NAME}
                                            </Card.Title>
                                            <Button variant="primary" key={shortid.generate()}><NavLink href={`/program?pid=${program.PID}`} key={shortid.generate()}>예약하러 가기</NavLink></Button>
                                            <span key={shortid.generate()} > {(pid === program.PID) ? <HiBadgeCheck className={'fs-1 text-success'} key={shortid.generate()}/> : ''}</span>
                                        </Card.Body>
                                    </Card>
                                </Col>

                            ))}
                    </Row>
                </Container>
            </div>
        </div>
    )
}