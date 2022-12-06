import {createStore} from "redux";

const defaultState = {
    current_user: {
        'id': 0,
        'username': 'anon',
        'first_name': 'Не авторизованный пользователь',
        'last_name': '',
        'token': '',
        'role': '',
        'authenticated': false,
    },
    show_auth_modal: false,
    show_logout_modal: false,
    show_machine_modal: false,

    show_search_info: false,
    auth_info: {
        show: false,
        text: ''
    },
    show_info: {
        show: false,
        text: ''
    },

    machine_info: undefined,
    maintenance_info: undefined,
    complaints_info: undefined,

    machine_list_data: undefined,

    active_page: 'machine',
    target_machin_num: ''
}

const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case "SET_MACHINE_LIST_DATA":
            return {...state, machine_list_data: action.payload}

        case "SHOW_AUTH_MODAL":
            return {...state, show_auth_modal: !state.show_auth_modal}

        case "SHOW_LOGOUT_MODAL":
            return {...state, show_logout_modal: !state.show_logout_modal}

        case "SHOW_MACHINE_MODAL":
            return {...state, show_machine_modal: !state.show_machine_modal}

        case "SHOW_AUTH_INFO":
            return {...state, auth_info: action.payload}

        case "SHOW_INFO":
            return {...state, show_info: action.payload}

        case "AUTHORISATION_SUCCESS":
            return {...state, current_user: action.payload}

        case "LOGOUT":
            state = defaultState
            return {...state}

        case "SET_MACHINE_INFO":
            return {...state, machine_info: action.payload}

        case "UPDATE_MACHINE_INFO":
            let result = state.machine_info
            result[action.key] = action.value
            return {...state, machine_info: result}
        case "SET_MAINTENANCE_INFO":
            return {...state, maintenance_info: action.payload}
        case "SET_COMPLAINS_INFO":
            return {...state, complaints_info: action.payload}

        case "SET_TARGET_MACHIN_NUM":
            return {...state, target_machin_num: action.payload}

        case "SET_ACTIVE_PAGE":
            return {...state, active_page: action.payload}

        case "SHOW_SEARCH_INFO":
            return {...state, show_search_info: action.payload}

        default:
            return state
    }
}

export const store = createStore(reducer)