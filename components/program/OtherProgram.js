import {Button, Card, Col, Container, NavLink, Row} from "react-bootstrap";
import shortid from "shortid";
import {handleImgError} from "../../models/Utils";

export default function OtherProgram({programInfo}) {
    return(
        <div style={{marginTop:`56px`, marginBottom:`140px`}} id={'otherProWrapper'}>
            <div id="programContainer">
                <p className={'fs-3 fw-bold text-secondary'} id="programTitle">다른 프로그램</p>
                <Container style={{marginTop:`28px`}} id={'cardContainer'}>
                    <Row>
                        {(programInfo.length > 0 ) ? (programInfo.map(program => (
                            <Col md={4} style={{ marginTop:`28px`, flexBasis: '420px' }} key={shortid.generate()}>

                                <Card style={{ width: '100%' }} key={shortid.generate()}>
                                    <Card.Img variant="top" src={(program.P_PICLINK.length < 40) ? 'https://www.templestay.com/images/templeinfo-00.jpg' : program.P_PICLINK} onError={handleImgError} style={{height: '280px'}} key={shortid.generate()}/>
                                    <Card.Body className={'bg-light'} key={shortid.generate()}>
                                        <Card.Title style={{height:`70px`}} key={shortid.generate()}>
                                            {program.P_NAME}
                                        </Card.Title>
                                        <Button variant="primary" key={shortid.generate()}><NavLink href={`/program?pid=${program.PID}`} key={shortid.generate()}>예약하러 가기</NavLink></Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))) : ( <Col md={4} style={{ marginTop:`28px`, flexBasis: '432px' }} key={shortid.generate()}>
                        </Col>)
                        }
                    </Row>
                </Container>
            </div>
        </div>

    )
}