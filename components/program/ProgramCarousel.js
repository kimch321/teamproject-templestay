import React from "react";
import Carousel from "react-bootstrap/Carousel";
import shortid from "shortid";
import {handleImgError} from "../../models/Utils";

export default function ProgramCarousel({pImgs}) {
    return(
        <div style={{marginTop:`28px`}} id={'imgWrapper'}>
            <div id="carouseContainer">
                <Carousel>
                    { (pImgs.length > 0) ? (pImgs.map(pic => (
                            <Carousel.Item key={shortid.generate()}>
                                <img
                                    className="d-block w-100"
                                    src={(pic.length < 40) ? 'https://www.templestay.com/images/templeinfo-00.jpg' : pic}
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
    )
}