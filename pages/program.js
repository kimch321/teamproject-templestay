import Carousel from "react-bootstrap/Carousel";
import {Button, Card, Col, Container, Modal, NavLink, Row, Table, Form} from "react-bootstrap";
import {BsCheck2} from "react-icons/bs";
import axios from "axios";
import shortid from 'shortid'
import {handleImgError, dateFomatter, milliFomatter} from "../models/Utils";
import {useState} from "react";
import DatePicker from "react-datepicker";
import {ko} from "date-fns/locale";
import "react-datepicker/dist/react-datepicker.css";
import {getSession} from "next-auth/client";
import ProgramTitle from "../components/program/ProgramTitle";
import ProgramCarousel from "../components/program/ProgramCarousel";
import Reserve from "../components/program/Reserve";
import ProgramPrice from "../components/program/ProgramPrice";
import ProgramIntro from "../components/program/ProgramIntro";
import OtherProgram from "../components/program/OtherProgram";

export async function getServerSideProps(ctx) {

    let sess = await getSession(ctx);
    // 세션 여부에 따라 email 값 분기
    let email;
    (sess?.user?.email !== undefined) ? email = sess.user.email : email = null

    let {pid} = ctx.query

    let param = `?pid=${pid}`
    let url = `http://localhost:3000/api/program${param}`

    const res = await axios.get(url)
    let proData = await res.data;

    proData.push(pid)

    return {props:{proData,email}}
}

export default function Program ({proData,email}) {
    let PID = proData[7]

    // 날짜 선택관련
    // 내일의 날짜를 구하기 (선택 가능 날짜.)
    const tomorrow = new Date().setDate(new Date().getDate() + 1);

    // state 보여주는 부분
    const [startDate, setStartDate] = useState(tomorrow);
    let [endDate, setEndDate] = useState(null);


    // 인원 선택 관련 함수
     //

    const [selectedOptions, setSelectedOptions] = useState({"성인": 0,"중고생":0,"초등생":0,"미취학":0});
    // 총원을 계산 하는 state
    const [total,setTotal] = useState(0)


    // 전 처리 부분
    // strDate, endDate 결정
    let B_strDate = milliFomatter(startDate)
    let B_endDate = dateFomatter(endDate)

    if (B_endDate === null) {
        B_endDate = B_strDate
    }

    // adult, middle,young,prescholl 선택 인원 추가.
    let adult = selectedOptions["성인"]
    let middle = selectedOptions["중고생"]
    let young = selectedOptions["초등생"]
    let preschool = selectedOptions["미취학"]


    return(
        <div className={'container'} style={{marginTop:`56px`}} id={'programWrapper'}>
            <ProgramTitle tid={proData[0][0].T_NAME} tname={proData[0][0].T_NAME} prePname={proData[0][0]} />
            <ProgramCarousel pImgs={proData[1]} />
            <Reserve P_CLASS ={proData[0][0].P_CLASS} price = {proData[2]} startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate} tomorrow={tomorrow} P_endDate={proData[0][0].P_ENDDATE} selectedOptions={selectedOptions} setSelectedOptions={setSelectedOptions} total={total} setTotal={setTotal}  />
            <ProgramPrice priceClass = {proData[2]} division = {proData[2][0].DIVISION} email = {email} PID={PID} B_strDate = {B_strDate} B_endDate = {B_endDate} adult = {adult} middle = {middle} young = {young} preschool = {preschool} />
            <ProgramIntro division = {proData[2][0].DIVISION} intro = {proData[0][0].P_INTRO} schedule = {proData[6]} days = {proData[4]} />
            <OtherProgram programInfo={proData[5]} />
        </div>
    )
}