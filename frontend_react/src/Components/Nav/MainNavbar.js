import React from 'react';
import {Button, Container, Figure, Form, Nav, Navbar, NavDropdown} from "react-bootstrap";
import mainLogo from "../../Logotype accent RGB 2.jpg";
import {useDispatch, useSelector} from "react-redux";
import {LinkContainer} from 'react-router-bootstrap';

const MainNavbar = () => {
    const dispatch = useDispatch()
    const current_user = useSelector(state => state.current_user)
    const machine_info = useSelector(state => state.machine_info)

    const show_auth_modal = () => {
        dispatch({type: "SHOW_AUTH_MODAL"})
    }

    const show_logout_modal = () => {
        dispatch({type: "SHOW_LOGOUT_MODAL"})
    }

    return (
        <Navbar bg="primary bg-gradient" expand="lg" variant="dark">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand>
                        <Figure>
                            <Figure.Image
                                width={171}
                                height={180}
                                alt="171x180"
                                src={mainLogo}
                            />
                            <Figure.Caption>
                                Электронная сервисная книжка "Мой Силант"
                            </Figure.Caption>
                        </Figure>
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="navbarScroll"/>
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{maxHeight: '100px'}}
                        navbarScroll
                    >
                        {current_user.authenticated &&
                            <NavDropdown title="Разделы" id="navbarScrollingDropdown">

                                <LinkContainer to="/machine_list">
                                    <NavDropdown.Item>
                                        Список машин
                                    </NavDropdown.Item>
                                </LinkContainer>

                                <LinkContainer to="/">
                                    <NavDropdown.Item>
                                        Проверка существующей машины
                                    </NavDropdown.Item>
                                </LinkContainer>

                            </NavDropdown>
                        }

                        <Nav.Link href="https://t.me/MoySilant">+7-8352-20-12-09, telegram</Nav.Link>
                        <div className='mx-4'>
                            {current_user.authenticated ?
                                <Nav.Link href="#" onClick={() => {
                                    show_logout_modal()
                                }}>
                                    {`| ${current_user.username} >> Выйти из сервиса`}
                                </Nav.Link> :
                                <Nav.Link href="#" onClick={() => {
                                    show_auth_modal()
                                }}>
                                    Авторизация
                                </Nav.Link>
                            }
                        </div>


                    </Nav>
                    <Form className="d-flex" onSubmit={(e) => {
                        e.preventDefault()
                        dispatch({type: 'SET_TARGET_MACHIN_NUM', payload: e.nativeEvent.target[0].value})
                        dispatch({type: "SHOW_MACHINE_MODAL"})
                    }}>
                        <Form.Control
                            type="search"
                            placeholder="Зав.№"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button variant="outline-danger" type='submit'>Найти</Button>
                    </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MainNavbar;