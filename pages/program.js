import Carousel from "react-bootstrap/Carousel";
import {Button, Card, Col, Container, Modal, NavLink, Row, Table, Form} from "react-bootstrap";
import {BsCheck2} from "react-icons/bs";
import axios from "axios";
import Layout from "./layout/Layout";
import Nav from "./layout/Nav";
import shortid from 'shortid'
import {handleImgError, dateFomatter, milliFomatter} from "../components/Util";
import {useState} from "react";
import DatePicker from "react-datepicker";
import {ko} from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
//shortid.generate()


export async function getServerSideProps(ctx) {

    let {pid} = ctx.query

    let param = `?pid=${pid}`
    let url = `http://localhost:3000/api/program${param}`

    const res = await axios.get(url)

    let proData = await res.data;

    proData.push(pid)

    return {props:{proData}}
}

export default function Program ({proData}) {
    const unit = 28

    // 내일의 날짜를 구하기
    const tomorrow = new Date().setDate(new Date().getDate() + 1);

    // state 보여주는 부분
    const [show, setShow] = useState(false);

    const [startDate, setStartDate] = useState(tomorrow);
    const [endDate, setEndDate] = useState(null);

    // 모달 on/off 해주는 함수
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    //날짜가 선택되면 state를 변경해주는 함수
    const onChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);
    };

    // 인원 선택 관련 함수
    // 모달 on/off
    const [show2, setShow2] = useState(false);
    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);

    // 선택 인원 관리 함수
    const [selectedOptions, setSelectedOptions] = useState([]);

        // 예약정보에 키 추가.
    const handleSelectChange = (e, index) => {
        const selectedValue = e.target.value;
        setSelectedOptions((prevSelectedOptions) => {
            const newSelectedOptions = [...prevSelectedOptions];
            newSelectedOptions[index] = selectedValue;
            return newSelectedOptions;
        });
    }

    // 날짜 관리 스테이트 startDate, endDate

    // 예약정보를 state로 관리합니다.
    // {userId:'test',
    //  reservInfo : {
    //      people : {
    //          성인 : [수,가격],
    //          중고생 : [수, 가격],
    //          ...
    //      },
    //      dates : [
    //          2013-03-21,2013-03-30
    //      ]
    //      }
    //  }

    const [reservInfo, setReservInfo] =useState({userId:'test', reservInfo :{pid:'', people: {"성인":[null,0],"중고생":[null,0],"초등생":[null,0],"미취학":[null,0]}, dates:[]}})


    const process_reservation = async (url, data) => {
        console.log('reservation -',data.reservInfo.pid)
        // json 형식으로 전처리
        let preReservationDate = [
            {userId:data.userId},{PID:data.reservInfo.pid},{strData:data.reservInfo.dates[0]},
            {endDate: (data.reservInfo.dates[1] === null) ? data.reservInfo.dates[0] : data.reservInfo.dates[1]},
            {adult: (data.reservInfo.people["성인"][0] === null) ? 0 : Number(data.reservInfo.people["성인"][0])},
            {middle: (data.reservInfo.people["중고생"][0] === null) ? 0 : Number(data.reservInfo.people["중고생"][0])},
            {young:(data.reservInfo.people["초등생"][0] === null) ? 0 : Number(data.reservInfo.people["초등생"][0])},
            {preschool:(data.reservInfo.people["미취학"][0] === null) ? 0 : Number(data.reservInfo.people["미취학"][0])}
        ]
        console.log(preReservationDate)

        const cnt = fetch(url, {
            method: 'POST', mode: 'cors',
            body: JSON.stringify(preReservationDate),
            headers: {'Content-Type': 'application/json'}
        }).then(res => res.json());

        return (await cnt).cnt;
    }



    const handelReserve = () => {
        setReservInfo((prevReservInfo) => {
            const newReservInfo = {...prevReservInfo}
            proData[2].map((clas,index) => {
                let sumPrice = selectedOptions[index] * clas.PRICE

                newReservInfo.reservInfo.people[clas.PR_CLASS] = [(selectedOptions[index] === undefined) ? null : selectedOptions[index], isNaN(sumPrice) ? 0 : sumPrice]
            })
            newReservInfo.reservInfo.pid = proData[6]


            let strDate = dateFomatter(startDate)
            if (strDate === null) {
                strDate = milliFomatter(tomorrow)
            }

            newReservInfo.reservInfo.dates = [strDate,dateFomatter(endDate)]

            let sum = 0;
            for (let key in newReservInfo.reservInfo.people) {
                sum += newReservInfo.reservInfo.people[key][1];
            }

            newReservInfo.reservInfo.sum = sum

            if(sum === 0) {
                // 성인이 1이상 있는 것으로, 조건을 바꿔보자.
                alert('인원을 선택하세요.')
            } else {
               process_reservation('/api/reservation',newReservInfo)

            }

            return newReservInfo
        })
    }

    return(
        <div className={'container'} style={{marginTop:`${unit*2}px`}} id={'programWrapper'}>

            <div id={'titleWrapper'}>
                <h3 className={"text-primary ps-4"}>{proData[0][0].P_NAME}</h3>
            </div>
            <div style={{marginTop:`${unit*1}px`}} id={'imgWrapper'}>
                <div id="carouseContainer">

                    <Carousel>

                        { (proData[1].length > 0) ? (proData[1].map(pic => (
                                <Carousel.Item key={shortid.generate()}>
                                    <img
                                        className="d-block w-100"
                                        src={pic}
                                        alt="First slide"
                                        height="800px"
                                        onError={handleImgError}
                                        key={shortid.generate()}
                                    />
                                </Carousel.Item>
                            ))) :
                            (
                                <Carousel.Item key={shortid.generate()}>
                                    <img
                                        className="d-block w-100"
                                        src={'https://www.templestay.com/images/templeinfo-00.jpg'}
                                        alt="First slide"
                                        height="800px"
                                        onError={handleImgError}
                                        key={shortid.generate()}
                                    />
                                </Carousel.Item>
                            )
                        }
                    </Carousel>

                </div>
            </div>
            <div style={{marginTop:`${unit*1}px`}} id={'selectWrapper'}>

                <Container id={'selectContainer'}>
                    <Row className={'d-flex justify-content-center'}>
                        <Col className={'d-flex  justify-content-end me-5' }>
                            <Row>
                                <Button className="calbtn" onClick={handleShow}><p className={'text-center m-0 fs-3 text-primary'}>일정 <BsCheck2 className={"mb-2"}/></p></Button>
                                <Modal show={show} onHide={handleClose}>
                                    <Modal.Header style={{justifyContent: "center", height: "45px", color: "#331904"}}>
                                        <Modal.Title>날짜 선택</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className="cal">
                                        <DatePicker
                                            selected={startDate}
                                            onChange={onChange}
                                            inline
                                            startDate={startDate}
                                            endDate={endDate}
                                            minDate={tomorrow}
                                            monthsShown={2}
                                            selectsRange
                                            dateFormat="yyyy-mm-dd"
                                            locale={ko}
                                        />
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={handleClose} style={{backgroundColor: "#331904"}}>
                                            닫기
                                        </Button>
                                        <Button variant="primary" onClick={handleClose}>
                                            선택
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </Row>
                        </Col>
                        <Col className={'d-flex  justify-content-start ms-5'}>
                            <Button className="calbtn" onClick={handleShow2}><p className={'text-start m-0 fs-3 text-primary'}>인원 <BsCheck2 className={"mb-2"}/></p></Button>
                            <Modal show={show2} onHide={handleClose2}>
                                <Modal.Header style={{justifyContent: "center", height: "45px", color: "#331904"}}>
                                    <Modal.Title>인원 선택</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="cal">

                                    {proData[2].map((clas, index) =>(
                                        <Form.Select value={selectedOptions[index]} onChange={(e) => handleSelectChange(e, index)} key={shortid.generate()} aria-label="Default select example">
                                            <option key={shortid.generate()} >{clas.PR_CLASS}</option>
                                            <option value="1"  key={shortid.generate()} >1명</option>
                                            <option value="2"  key={shortid.generate()} >2명</option>
                                            <option value="3"  key={shortid.generate()} >3명</option>
                                            <option value="4"  key={shortid.generate()} >4명</option>
                                            <option value="5"  key={shortid.generate()} >5명</option>
                                            <option value="6"  key={shortid.generate()} >6명</option>
                                            <option value="7"  key={shortid.generate()} >7명</option>
                                            <option value="8"  key={shortid.generate()} >8명</option>
                                            <option value="9"  key={shortid.generate()} >9명</option>
                                            <option value="10"  key={shortid.generate()} >10명</option>
                                            <option value="11"  key={shortid.generate()} >11명</option>
                                            <option value="12"  key={shortid.generate()} >12명</option>
                                            <option value="13"  key={shortid.generate()} >13명</option>
                                            <option value="14"  key={shortid.generate()} >14명</option>
                                            <option value="15"  key={shortid.generate()} >15명</option>
                                            <option value="16"  key={shortid.generate()} >16명</option>
                                            <option value="17"  key={shortid.generate()} >17명</option>
                                            <option value="18"  key={shortid.generate()} >18명</option>
                                            <option value="19"  key={shortid.generate()} >19명</option>
                                            <option value="20"  key={shortid.generate()} >20명</option>
                                            <option value="21"  key={shortid.generate()} >21명</option>
                                            <option value="22"  key={shortid.generate()} >22명</option>
                                            <option value="23"  key={shortid.generate()} >23명</option>
                                            <option value="24"  key={shortid.generate()} >24명</option>
                                            <option value="25"  key={shortid.generate()} >25명</option>
                                            <option value="26"  key={shortid.generate()} >26명</option>
                                            <option value="27"  key={shortid.generate()} >27명</option>
                                            <option value="28"  key={shortid.generate()} >28명</option>
                                            <option value="29"  key={shortid.generate()} >29명</option>
                                            <option value="30"  key={shortid.generate()} >30명</option>
                                        </Form.Select>
                                    ))}


                                </Modal.Body>
                                <Modal.Footer>
                                    <Button variant="secondary" onClick={handleClose2} style={{backgroundColor: "#331904"}}>
                                        닫기
                                    </Button>
                                    <Button variant="primary" onClick={handleClose2}>
                                        선택
                                    </Button>
                                </Modal.Footer>
                            </Modal>

                        </Col>
                    </Row>
                </Container>

            </div>
            <div id={'reservWrapper'}>

                <Container>
                    <Row>
                        <Col>
                            { dateFomatter(endDate) ? (<p className={'text-end pt-2 m-0 fw-1 fw-semibold'} style={{paddingRight: '10px'}}>{(dateFomatter(startDate) === null) ? milliFomatter(tomorrow) : dateFomatter(startDate)}~{dateFomatter(endDate)}</p>):(<p className={'text-end pt-2 m-0 fw-1 fw-semibold'} style={{paddingRight:'60px'}} >{dateFomatter(startDate)}</p>)}
                        </Col>
                        <Col>
                            <Row>
                                <Col><p className={'text-start pt-2 m-0'}>(2박) 2인</p></Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>

            </div>
            <div id={'priceInfoWrapper'}>

                <Container>
                    <Row className="justify-content-center">
                        <Col md={11}>
                            <span className={'fs-3 me-3 text-primary'}>참가비용</span> <span className={'ms-5 text-danger'}>{proData[0][0].P_CAUTION}</span>
                            <div className={'mt-2'} id={'priceTableContainer'}>
                                <Table striped bordered hover>
                                    <thead>
                                    <tr>
                                        <th>구 분</th>
                                        {proData[2].map(clas =>(
                                            <th key={shortid.generate()}>{clas.PR_CLASS}</th>
                                        ))}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>{proData[2][0].DIVISION}</td>
                                        {proData[2].map(pri =>(
                                            <td key={shortid.generate()}>{pri.PRICE}</td>
                                        ))}
                                    </tr>
                                    </tbody>
                                </Table>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <Container>
                    <div>
                        <Button onClick={handelReserve}>예약하기</Button>
                    </div>
                </Container>

            </div>
            <div  style={{marginTop:`${unit*4}px`}} id={'contentWrapper'}>
                <div id={'contentContainer'}>
                    <p className="fs-3 fw-bold text-secondary">프로그램 소개</p>
                    <p> <span className={'text-warning fs-4'}> {proData[2][0].DIVISION}</span>&nbsp;{proData[0][0].P_INTRO}</p>
                </div>
            </div>
            <div style={{marginTop:`${unit*2}px`}} id={'scheduleWrapper'}>
                <Container id={'scheduleContainer'}>
                    <Row>
                        <Col md={3}>
                            <p className={'fs-5 fw-bold'}>프로그램 일정</p>
                            <p>기타 코멘트</p>
                        </Col>
                        <Col md={9}>
                            {proData[4].map(day => (
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
            <div style={{marginTop:`${unit*2}px`, marginBottom:`${unit*5}px`}} id={'otherProWrapper'}>

                <div id="programContainer">
                    <p className={'fs-3 fw-bold text-secondary'} id="programTitle">다른 프로그램</p>
                    <Container style={{marginTop:`${unit}px`}} id={'cardContainer'}>
                        <Row>
                            {(proData[5].length > 0 ) ? (proData[5].map(program => (
                                <Col md={4} style={{ marginTop:`${unit}px`, flexBasis: '432px' }} key={shortid.generate()}>

                                    <Card style={{ width: '100%' }} key={shortid.generate()}>
                                        <Card.Img variant="top" src={program.P_PICLINK} onError={handleImgError} style={{height: '280px'}} key={shortid.generate()}/>
                                        <Card.Body key={shortid.generate()}>
                                            <Card.Title style={{height:`70px`}} key={shortid.generate()}>
                                                {program.P_NAME}
                                            </Card.Title>
                                            <Button variant="primary" key={shortid.generate()}><NavLink href={`/program?pid=${program.PID}`} key={shortid.generate()}>예약하러 가기</NavLink></Button>
                                        </Card.Body>
                                    </Card>
                                </Col>

                            ))) : ( <Col md={4} style={{ marginTop:`${unit}px`, flexBasis: '432px' }} key={shortid.generate()}>

                            </Col>)
                            }
                        </Row>
                    </Container>
                </div>

            </div>

        </div>

    )
}
