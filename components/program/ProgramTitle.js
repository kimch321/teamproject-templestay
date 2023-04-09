import {NavLink} from "react-bootstrap";

export default function ProgramTitle({tid, tname, prePname}) {
    // 제목 문자열 만들기
    const startIdx = prePname.P_NAME.indexOf('['); // 첫번째 '['의 인덱스 찾기
    const endIdx = prePname.P_NAME.indexOf(']'); // 첫번째 ']'의 인덱스 찾기
    const pName = prePname.P_NAME.slice(0, startIdx) + prePname.P_NAME.slice(endIdx + 1); // '['와 ']' 사이의 문자열 제거하기

    return(
        <div id={'titleWrapper'}>
            <h3 className={"text-primary ps-4"}><NavLink href={`/temple?id=${tid}`} style={{display:'inline-block'}}><span>[{tname}]</span></NavLink>{pName}</h3>
        </div>
    )
}