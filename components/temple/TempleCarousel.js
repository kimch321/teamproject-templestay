import Carousel from "react-bootstrap/Carousel";
import shortid from "shortid";
import {handleImgError} from "../../models/Utils";

export default function TempleCarousel({distintTemplePic}) {
    return(
        <div id="carouselWrapper" style={{marginTop:`56px`}}>
            <div id="carouseContainer">
                <Carousel>
                    {(distintTemplePic.length > 0) ? (
                            distintTemplePic.map(pic => {
                                return(
                                    <Carousel.Item key={shortid.generate()}>
                                        <img
                                            className="d-block w-100"
                                            src={pic.T_PICTURE}
                                            onError={handleImgError}
                                            key={shortid.generate()}
                                            alt="First slide"
                                            height="800px"
                                        />
                                    </Carousel.Item>)
                            })
                        )
                        :
                        (<Carousel.Item key={shortid.generate()}>
                            <img
                                className="d-block w-100"
                                src={'https://www.templestay.com/images/templeinfo-00.jpg'}
                                key={shortid.generate()}
                                alt="First slide"
                                height="800px"
                            />
                        </Carousel.Item>)
                    }
                </Carousel>
            </div>
        </div>
    )
}