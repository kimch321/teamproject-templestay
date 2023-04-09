import {useEffect} from "react";
import {Col, Container, Row} from "react-bootstrap";

export default function TempleAddr({addr, phone}) {
    useEffect(() => {
        const script = document.createElement('script');
        script.async = true;
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=89da95ceb6fd3e9c3e590a9f8786d5e8&libraries=services&autoload=false`;
        script.id = `mapScript`

        document.head.appendChild(script);

        const onLoadKakaoMap = () => {
            kakao.maps.load(() => {
                let mapContainer = document.getElementById('map'), // 지도를 표시할 div
                    mapOption = {
                        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                        level: 3 // 지도의 확대 레벨
                    };
                // 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
                let map = new kakao.maps.Map(mapContainer, mapOption);
                let geocoder = new kakao.maps.services.Geocoder();
                // 주소로 좌표를 검색합니다
                geocoder.addressSearch(addr, function(result, status) {
                    // 정상적으로 검색이 완료됐으면
                    if (status === kakao.maps.services.Status.OK) {
                        let coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                        // 결과값으로 받은 위치를 마커로 표시합니다
                        let marker = new kakao.maps.Marker({
                            map: map,
                            position: coords
                        });
                        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                        map.setCenter(coords);
                        // script 태그 삭제
                        const scriptTag = document.getElementById('mapScript');
                        scriptTag.remove();
                    }
                });
            });
        };
        script.addEventListener('load', onLoadKakaoMap);
    }, []);
    return(
        <div className="bg-light border-top border-bottom border-1 border-primary"style={{marginTop:`112px`}} id="mapWrapper">
            <Container id="mapContainer">
                <Row id="mapRow">

                    <Col sm={4}>
                        <div className="mapTextWrapper ">
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <p className="fs-4 text-center fw-bold">오시는길</p>
                            <p className="fs-5 text-center fw-bold" key={addr}>{addr}</p>
                            <p className="fs-5 text-center fw-bold" key={phone}>{phone}</p>
                        </div>

                    </Col>
                    <Col sm={8}>
                        <div id="mapWrap" key={'mapWrap'}>
                            <div style={{width: '100%', height: '600px'}} id='map' key={'map'} />
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}