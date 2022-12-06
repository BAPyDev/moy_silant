import React, {useRef} from 'react';
import {Alert, Button, Form} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import MainAPI from "../../API/MainAPI";

const LoginForm = () => {
    const dispatch = useDispatch()
    const current_user = useSelector(state => state.current_user)
    const username_form = useRef()
    const password_form = useRef()
    const remember_user = useRef()

    const show_auth_info = (show, text) => {
        dispatch({type: "SHOW_INFO", payload: {show: show, text: text}})
    }

    async function submit(e) {
        e.preventDefault()
        let login = await MainAPI.login(username_form.current.value, password_form.current.value)
        if (login.authenticated) {
            dispatch({type: "AUTHORISATION_SUCCESS", payload: login})
            if (remember_user.current.checked) {
                localStorage.setItem('current_user', JSON.stringify(login))
            }
            setTimeout(() => dispatch({type: "SHOW_AUTH_MODAL"}), 1000)
        } else {
            dispatch({
                type: "SHOW_INFO", payload: {
                    show: true,
                    text: 'Ошибка авторизации. Логин или пароль не верны'
                }
            })
        }
    }

    return (
        <>
            {current_user.authenticated ?
                `Добро пожаловать ${current_user.username}!` :
                <Form onSubmit={(e) => submit(e)}>
                    <Form.Group className="mb-3" controlId="username">
                        <Form.Label>Логин</Form.Label>
                        <Form.Control ref={username_form} type="text" placeholder="Введите логин"/>
                        <Form.Text className="text-muted">
                            Логин пользователя выдается администратором.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Пароль</Form.Label>
                        <Form.Control ref={password_form} type="password" placeholder="Введите пароль"/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check ref={remember_user} type="checkbox" label="Запомнить на этом устройстве"/>
                    </Form.Group>

                    <Button variant="primary" type="submit">
                        Войти
                    </Button>
                </Form>
            }
        </>

    );
};

export default LoginForm;