import {useState} from "react";
import {Button, Col, Container, Row, Table} from "react-bootstrap";
import shortid from "shortid";

export default function ProgramPrice({priceClass, division, email, PID, B_strDate, B_endDate, adult, middle, young, preschool}) {
    // 예약하기 버튼 비활성화 state
    const [isSubmitting, setIsSubmitting] = useState(false);
    console.log('priceClass',priceClass)
    const handleReserve = async (email, PID, B_strDate, B_endDate, adult, middle, young, preschool) => {
        async function bookOne () {
            let inputData = [email, PID, B_strDate, B_endDate, adult, middle, young, preschool]

            return inputData
        }

        const process_reservation = async (inputData) => {
            // console.log('here',inputData)

            const cnt = await fetch('/api/preBook', {
                method: 'POST', mode: 'cors',
                body: JSON.stringify(inputData),
                headers: {'Content-Type': 'application/json'}
            }).then(res => res.json());
            let result = false;
            if(await cnt.cnt >0) result = true

            return {result};
        }

        async function redirect (result) {
            if(result) {
                location.href = `/preBook?email=${email}`
            }
        }
        // 실행부
        if(email !== null) {
            // 클릭시 버튼 비활성화
            setIsSubmitting(true)
            if(Number(adult)+Number(middle)+Number(young)+Number(preschool) <= 0) {
                setIsSubmitting(false)
                alert('인원을 선택하세요!')
            } else{
                bookOne().then(process_reservation).then(({result, inputData}) => redirect(result,inputData))
            }
        } else {
            alert('로그인해 주세요!')
        }
    }

    return(
        <div id={'priceInfoWrapper'}>
            <Container>
                <Row className="justify-content-center">
                    <Col md={11}>
                        <span className={'fs-3 me-3 text-primary'}>참가비용</span> {/*<span className={'ms-5 text-danger'}>{proData[0][0].P_CAUTION}</span>*/}
                        <div className={'mt-2'} id={'priceTableContainer'}>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>구 분</th>
                                    {priceClass.map(clas =>(
                                        <th key={shortid.generate()}>{clas.PR_CLASS}</th>
                                    ))}
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{division}</td>
                                    {priceClass.map(pri =>(
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
                <div className={'d-flex justify-content-end'}>
                    <Button
                        onClick={() => handleReserve(email, PID, B_strDate, B_endDate, adult, middle, young, preschool)}
                        disabled={isSubmitting}
                    >예약하기</Button>
                </div>
            </Container>
        </div>
    )



}