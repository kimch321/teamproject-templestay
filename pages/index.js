import Container from "react-bootstrap/Container";
import React from "react";
import axios from "axios";
import {getSession} from "next-auth/client";
import EditorNav from "../components/index/EditorNav";
import SearchResult from "../components/index/SearchResult";


export default function Home({searchInfo,likeData, email}) {
        return (
            <div className="bg-white" id="wrapper" style={{marginTop:'65px'}}>
                    <Container fluid>
                            <EditorNav />
                            <SearchResult searchInfo = {searchInfo} likeData = {likeData} email = {email}/>
                    </Container>

            </div>
        )
}

export async function getServerSideProps(ctx) {
        let {lid ,str,end,epic = '1'} = ctx.query
        if(lid === undefined) lid = null;
        if(str === undefined) str = null;
        if(end === undefined) end = null;
        if(epic === undefined) epic = null;
        let sess = await getSession(ctx);
        let searchInfo;
        let result;
        // 세션 여부에 따라 email 값 분기
        let email;
        (sess?.user?.email !== undefined) ? email = sess.user.email : email = null

        if(lid === null && str === null && end === null) {
                let param = `?epic=${epic}`
                let url = `http://localhost:3000/api/editorpick/${param}`
                const res = await axios.get(url)
                result = res.data

        } else {
                // param 선언
                let searchParam = `?lid=${lid}&str=${str}&end=${end}`
                // URL
                let url = `http://localhost:3000/api/${searchParam}`
                const res = await axios.get(url)
                result = res.data
        }

        // likeData
        let likeData = null;

        if(email !== null) {
                let likeParam = `?email=${email}`
                let likeUrl = `http://localhost:3000/api/like/${likeParam}`
                const likeRes = await axios.get(likeUrl)

                likeData = likeRes.data
        }

        searchInfo = result
        return {props:{searchInfo, likeData, email}}
}