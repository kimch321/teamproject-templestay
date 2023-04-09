import axios from 'axios'
import TempleCarousel from "../components/temple/TempleCarousel";
import TempleContent from "../components/temple/TempleContent";
import TempleAddr from "../components/temple/TempleAddr";
import TempleProgram from "../components/temple/TempleProgram";

// 캐러셀에 들어갈 사진은 서버에서 불러온 다음에 제공되어야 한다. 만약 그렇지 않으면 페이지가 로드된 후에 다운받기 때문에 잘린 이미지나,
// 빈 화면이 표시 될 수 있다.


export default function temple ({temple, distintTemplePic, distinctProPic, pid}) {
    return(
        <div id="templeWrapper">
            <div className='container' id='templeContainer'>
                <TempleCarousel distintTemplePic = { distintTemplePic } />
                <TempleContent templeContent = {temple[0]} />
                <TempleAddr addr={temple[0].ADDR} phone={temple[0].T_PHONE} />
                <TempleProgram distinctProPic = {distinctProPic} pid = {pid} />
            </div>
        </div>
    )
}

export async function getServerSideProps(ctx) {
    let {id, pid = null} = ctx.query

    let param = `?id=${id}`
    let url = `http://localhost:3000/api/temple${param}`
    const res = await axios.get(url)

    let {temple, distintTemplePic, distinctProPic} = await res.data;

    return {props:{temple,distintTemplePic,distinctProPic,pid}}
}