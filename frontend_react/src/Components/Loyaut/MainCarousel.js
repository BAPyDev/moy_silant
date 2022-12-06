import React from 'react';
import {Carousel, Container} from "react-bootstrap";
import icons1 from "../../Icons 1.jpg";
import icons2 from "../../Icons 2.jpg";

const MainCarousel = () => {
    return (
        <Container>
            <Carousel variant="dark">
                <Carousel.Item className='col-3'>
                    <img
                        className="d-block w-100 col-3"
                        src={icons1}
                        alt="First slide"
                    />
                </Carousel.Item>
                <Carousel.Item className='col-3'>
                    <img
                        className="d-block w-100 col-3"
                        src={icons2}
                        alt="Second slide"
                    />
                </Carousel.Item>
            </Carousel>
        </Container>
    );
};

export default MainCarousel;