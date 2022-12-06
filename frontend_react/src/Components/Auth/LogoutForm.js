import React from 'react';
import {Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";

const LogoutForm = () => {
    const dispatch = useDispatch()
    const current_user = useSelector(state => state.current_user)

    const logout = () => {
        dispatch({type: "LOGOUT"})
        if (localStorage.getItem('current_user')) {
            localStorage.removeItem('current_user')
        }
        setTimeout(() => dispatch({type: "SHOW_LOGOUT_MODAL"}), 500)
        setTimeout(() => dispatch({type: "SHOW_LOGOUT_MODAL"}), 1500)
    }

    return (
        <div>
            {current_user.authenticated ?
                <>
                    <p>Вы действительно хотите выйти из системы?</p>
                    <Button type='button' onClick={() => {
                        logout()
                    }}>Выйти</Button>
                </> :
                <p>До новых встреч!</p>

            }
        </div>
    );
};

export default LogoutForm;