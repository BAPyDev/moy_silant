import React from 'react';
import {Container, Nav} from "react-bootstrap";
import LinkTelegram from "../Loyaut/LinkTelegram";
import {LinkContainer} from 'react-router-bootstrap';

const MainFooter = () => {
    return (
        <Container className='mt-4'>
            <footer className="bg-primary fixed-bottom">
                <Nav
                    className="d-flex justify-content-evenly my-2 my-lg-0"
                    style={{maxHeight: '100px'}}
                    navbarScroll
                >
                    <LinkTelegram/>
                <LinkContainer to="/">
                    <Nav.Link href="#action2">© Мой Силант 2022</Nav.Link>
                </LinkContainer>
                </Nav>
            </footer>
        </Container>
    );
};

export default MainFooter;