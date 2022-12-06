import React from 'react';
import MainContent from "../Components/Tables/MainContent";
import MainCarousel from "../Components/Loyaut/MainCarousel";
import {Container} from "react-bootstrap";

const StartPage = () => {
    return (
        <Container>
            <MainContent/>
            <MainCarousel/>
        </Container>
    );
};

export default StartPage;