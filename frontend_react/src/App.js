import MainNavbar from "./Components/Nav/MainNavbar";
import MainFooter from "./Components/Nav/MainFooter";
import AuthPage from "./Components/Auth/AuthPage";
import React, {useEffect} from "react";
import LogoutPage from "./Components/Auth/LogoutPage";
import {useDispatch, useSelector} from "react-redux";
import {Route, Routes} from "react-router-dom";
import StartPage from "./Pages/StartPage";
import MachineListPage from "./Pages/MachineListPage";
import InfoModal from "./Components/Modal/InfoModal";
import MachineInfoModal from "./Components/Modal/MachineInfoModal";

function App() {
    const dispatch = useDispatch()
    const store_current_user = useSelector(state => state.current_user)

    useEffect(() => {
        let current_user = localStorage.getItem('current_user')
        if (current_user) {
            dispatch({type: 'AUTHORISATION_SUCCESS', payload: JSON.parse(current_user)})
        }
    }, [])


    return (
        <div>
            <MachineInfoModal/>
            <InfoModal/>
            <AuthPage/>
            <LogoutPage/>
            <MainNavbar/>
            <Routes>
                {store_current_user.authenticated &&
                    <Route path='/machine_list' element={<MachineListPage/>}/>
                }
                <Route path='*' element={<StartPage/>}/>
            </Routes>
            <MainFooter/>
        </div>
    );
}

export default App;
