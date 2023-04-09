import {useState} from "react";
import {Button, Col, Container, Modal, Row, Table} from "react-bootstrap";
import shortid from "shortid";

export default function ProgramIntro({division, intro, schedule, days}) {
    let [proShow,setProShow] = useState(Array(schedule.length).fill(false))

    const showProModal = (e) => {
        let index = e.target.getAttribute("index")
        let newProShow = [...proShow];
        newProShow[index] = !proShow[index];
        setProShow(newProShow)
    };
    const closeProShow = (e) => {
        let index = e.target.getAttribute("index")
        let newProShow = [...proShow];
        newProShow[index] = !proShow[index];
        setProShow(newProShow)
    };

    return(
        <>
            <div  style={{marginTop:`28px`}} id={'contentWrapper'}>
                <div id={'contentContainer'}>
                    <p className="fs-3 fw-bold text-secondary">프로그램 소개</p>
                    <p> <span className={'text-warning fs-4'}>{division}</span>&nbsp;{intro}</p>
                </div>
            </div>
            <div style={{marginTop:`56px`}} id={'scheduleWrapper'}>
                <Container id={'scheduleContainer'}>
                    <Row>
                        <Col md={3}>
                            <p className={'fs-5 mb-4 fw-bold'}>프로그램 일정</p>
                            {(schedule.length > 0) ? (schedule.map( (proInfo,index) => {
                                    return(<div>
                                            <p index={index} className={'mb-2 fw-bold'} onClick={showProModal} >{proInfo.P_DES}</p>
                                            <Modal className={'modal-dialog-centered'} show={proShow[index]} index={index} >
                                                <Modal.Header style={{justifyContent: "center", height: "45px", color: "#331904"}}>
                                                    <Modal.Title>{proInfo.P_DES}</Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body className="cal">
                                                    <p>&nbsp;{proInfo.P_DETAIL}</p>
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button index={index} onClick={closeProShow} variant="secondary" style={{backgroundColor: "#331904"}}>
                                                        닫기
                                                    </Button>
                                                </Modal.Footer>
                                            </Modal>
                                        </div>
                                    )
                                }
                            )):(<div></div>)}
                        </Col>
                        <Col md={9}>
                            {days.map(day => (
                                    <Row key={shortid.generate()}>
                                        <Col key={shortid.generate()}>
                                            <p className={'fs-5 fw-bold'} key={shortid.generate()}>{day.P_DAY}</p>
                                            <Table key={shortid.generate()}>
                                                <thead key={shortid.generate()}>
                                                <tr key={shortid.generate()}>
                                                    <th style={{width:'50%'}} key={shortid.generate()}>시작시간</th>
                                                    <th key={shortid.generate()}>일정명</th>
                                                </tr>
                                                </thead>
                                                <tbody key={shortid.generate()}>

                                                {day.P_INFO.map(sch => (
                                                    <tr key={shortid.generate()}>
                                                        <td style={{width:'50%'}} key={shortid.generate()}>{sch.P_TIME}</td>
                                                        <td key={shortid.generate()}>{sch.P_CONTENT}</td>
                                                    </tr>
                                                ))}
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                )
                            )}
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}