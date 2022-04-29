import {createAction, handleActions} from 'redux-actions';
import {call, delay, put, takeLatest, select, throttle} from 'redux-saga/effects';
import {HYDRATE} from "next-redux-wrapper"
import axios from 'axios'

const SERVER = 'http://127.0.0.1:5000'
const headers = {
    "Content-Type": "application/json",
    Authorization: "JWT fefege..."
}
export const initialState = {
    loginUser: null,
    loginError: null,
    isLogined: false,
    token: ''
}

const LOGIN_REQUEST = 'auth/LOGIN_REQUEST';
const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
const LOGIN_FAILURE = 'auth/LOGIN_FAILURE';
const LOGIN_CANCELLED = 'auth/LOGIN_CANCELLED';
const LOGOUT_REQUEST = 'auth/LOGOUT_REQUEST';
const SAVE_TOKEN = 'auth/SAVE_TOKEN';
const DELETE_TOKEN = 'auth/DELETE_TOKEN';

export const loginRequest = createAction(LOGIN_REQUEST, data => data)
export const loginCancelled = createAction(LOGIN_CANCELLED, data => data)
export const logoutRequest = createAction(LOGOUT_REQUEST, data => data)

export function* loginSaga(){
    yield takeLatest(LOGIN_REQUEST, userLogin);
    yield takeLatest(LOGOUT_REQUEST, userLogout)
}

function* userLogin(action){
    try{
        console.log(" *** 핵심 *** " + JSON.stringify(action))
        const response = yield call(loginAPI, action.payload)
        console.log(" 로그인 서버 다녀왔습니다 : " + JSON.stringify(response))
        yield put({type : LOGIN_SUCCESS, payload: response.data})
        yield put({type: SAVE_TOKEN, payload : response.data})
        yield put(window.location.href="/")
    }catch(error){
        yield put({type: LOGIN_FAILURE, payload: error.message})
    }
}

const loginAPI = payload => axios.post(
    `${SERVER}/user/login`,
    payload,
    {headers}
)

function* userLogout(){
    try {
        console.log(" ***로그아웃*** ")
        
    } catch (error) {
        
    }
}

const login = handleActions({
    [HYDRATE] : (state, action) => ({
        ...state, ...action.payload
    }),
    [LOGIN_SUCCESS] : (state, action) => ({...state,loginUser: null,  isLogined: false}),
    [LOGIN_FAILURE] : (state, action) => ({...state}),
    [SAVE_TOKEN] : (state, action) => ({...state}),
    [DELETE_TOKEN] : (state, action) => ({...state})
}, initialState)

export default login