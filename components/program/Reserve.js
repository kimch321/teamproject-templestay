import {useState} from "react";
import {Button, Col, Container, Form, Modal, Row} from "react-bootstrap";
import {BsCheck2} from "react-icons/bs";
import DatePicker from "react-datepicker";
import {ko} from "date-fns/locale";
import shortid from "shortid";
import {dateFomatter, milliFomatter} from "../../models/Utils";

export default function Reserve({P_CLASS, price, startDate, setStartDate, endDate, setEndDate, tomorrow, P_endDate, selectedOptions, setSelectedOptions, total, setTotal,}) {
    // 모달 on/off state
    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    let isDates = true; //

    if(P_CLASS === '당일형') { //
        isDates=false
    }

    // 프로그램 종료 날짜 생성
    let transDate = P_endDate.slice(0,10) //
    P_endDate = new Date(transDate) //

    //날짜가 선택되면 state를 변경해주는 함수
    const onChange = (dates) => { //
        if(P_CLASS === '당일형') {
            setStartDate(dates);
            setEndDate(dates);
        }else {
            const [start, end] = dates;
            setStartDate(start);
            setEndDate(end);
        }
    };

    const handleSubmit2 = () => {
        setTotal(() => {
            let sum = Number(selectedOptions["성인"])+Number(selectedOptions["중고생"])+Number(selectedOptions["초등생"])+Number(selectedOptions["미취학"])

            return sum
        } )
        setShow2(false);
    }

    const handleSelectChange = (e, clas) => { //
        const selectedValue = e.target.value;
        setSelectedOptions((prevSelectedOptions) => {
            const newSelectedOptions = {...prevSelectedOptions};

            // 만약 선택박스 맨 위 '성인' 부분을 선택했을 때, 0으로 변경해주는 부분
            isNaN(selectedValue) ? newSelectedOptions[clas] = 0 : newSelectedOptions[clas] = selectedValue;

            return newSelectedOptions;
        });
    }
    return(
        <>
            <div style={{marginTop:`28px`}} id={'selectWrapper'}>
                <Container id={'selectContainer'}>
                    <Row className={'d-flex justify-content-center'}>
                        <Col className={'d-flex  justify-content-end me-5' }>
                            <Row>
                                <Button className="calbtn" onClick={() => setShow(true)}><p className={'text-center m-0 fs-3 text-primary'}>일정 <BsCheck2 className={"mb-2"}/></p></Button>
                                <Modal show={show} onHide={() => setShow(false)}>
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
                                            maxDate={P_endDate}
                                            monthsShown={2}
                                            selectsRange={isDates}
                                            dateFormat="yyyy-mm-dd"
                                            locale={ko}
                                        />
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" onClick={() => setShow(false)} style={{backgroundColor: "#331904"}}>
                                            닫기
                                        </Button>
                                        <Button variant="primary" onClick={() => setShow(false)}>
                                            선택
                                        </Button>
                                    </Modal.Footer>
                                </Modal>
                            </Row>
                        </Col>
                        <Col className={'d-flex  justify-content-start ms-5'}>
                            <Button className="calbtn" onClick={() => setShow2(true)}><p className={'text-start m-0 fs-3 text-primary'}>인원 <BsCheck2 className={"mb-2"}/></p></Button>
                            <Modal show={show2} onHide={() => setShow2(false)}>
                                <Modal.Header style={{justifyContent: "center", height: "45px", color: "#331904"}}>
                                    <Modal.Title>인원 선택</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="cal">
                                    {price.map((clas) =>(
                                        <Form.Select value={selectedOptions[clas.PR_CLASS]} onChange={(e) => handleSelectChange(e,clas.PR_CLASS)} key={shortid.generate()} aria-label="Default select example">
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
                                    <Button variant="secondary" onClick={() => setShow2(false)} style={{backgroundColor: "#331904"}}>
                                        닫기
                                    </Button>
                                    <Button variant="primary" onClick={handleSubmit2}>
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
                            { dateFomatter(endDate) ? (<p className={'text-end pt-2 m-0 fw-1 fw-semibold'} style={{paddingRight: '10px'}}>{(milliFomatter(startDate) === null) ? milliFomatter(tomorrow) : milliFomatter(startDate)}~{dateFomatter(endDate)}</p>):(<p className={'text-end pt-2 m-0 fw-1 fw-semibold'} style={{paddingRight:'60px'}} >{milliFomatter(startDate)}</p>)}
                        </Col>
                        <Col>
                            <Row>
                                <Col><p className={'text-start ps-4 pt-2 m-0 fw-1 fw-semibold'}>총 인원 {
                                    (total === 0) ? <span className={'fw-normal text-danger ps-3'}>인원을 선택하세요</span> : <span className={'fw-normal text-success ps-5'}>{total}</span>}</p></Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        </>
    )
}