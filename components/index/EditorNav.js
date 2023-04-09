import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import shortid from "shortid";
import {NavLink} from "react-bootstrap";
import {AiFillLike} from "react-icons/ai";
import {MdTempleBuddhist} from "react-icons/md";
import {BsCalendarHeartFill} from "react-icons/bs";
import {GoGlobe} from "react-icons/go";
import React from "react";

export default function EditorNav () {
    return(
        <Container fluid>
            <Row>
                <Col>
                    <Row>
                        <Col>
                            <div className={'text-start pb-3 ps-5'} key={shortid.generate()}>
                                <NavLink href={'/?epic=1'}> <AiFillLike
                                    className={"text-success fs-3"} key={shortid.generate()}/> </NavLink> </div>
                        </Col>
                        <Col>
                            <div className={'text-start pb-3 ps-5'} key={shortid.generate()}>
                                <NavLink href={'/?epic=2'}> <MdTempleBuddhist
                                    className={"text-dark fs-3"} key={shortid.generate()}/> </NavLink> </div>

                        </Col>
                        <Col>
                            <div className={'text-start pb-3 ps-5'} key={shortid.generate()}>
                                <NavLink href={'/?epic=3'}> <BsCalendarHeartFill
                                    className={"text-danger fs-3"} key={shortid.generate()}/> </NavLink> </div>
                        </Col>
                        <Col>
                            <div className={'text-start pb-3 ps-5'} key={shortid.generate()}>
                                <NavLink href={'/?epic=4'}> <GoGlobe
                                    className={"fs-3"} style={{color:'0D6EFD'}} key={shortid.generate()}/> </NavLink> </div>
                        </Col>
                    </Row>

                </Col>
                <Col></Col>
            </Row>
        </Container>
    )
}