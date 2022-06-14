import React, { createContext, useEffect, useReducer } from 'react'
import jwtDecode from 'jwt-decode'
import axios from 'axios.js'
import 'react-notifications/lib/notifications.css'
import { API_URL_LOGIN, GOOGLE_CONFIRM, generalFunction } from '../constant/Common'
import { MatxLoading } from 'app/components'
import { useNavigate } from 'react-router-dom'
import { NotificationManager, NotificationContainer } from 'react-notifications'
import { useDispatch } from 'react-redux'
import { loginConstant } from '../constant/ActionTypes'
import validator from 'validator'
let users = localStorage.getItem('auth_user')

const initialState = {
    isAuthenticated: users ? true : false,
    isInitialised: false,
    user: users ? users : null,
}

const isValidToken = (accessToken) => {
    if (!accessToken) {
        return false
    }

    const decodedToken = jwtDecode(accessToken)

    // console.log('decodedToken', decodedToken)
    //const currentTime = Date.now() / 1000
    //console.log("return time",decodedToken.exp > currentTime)
    //return decodedToken.exp > currentTime
    return decodedToken.loginId > 0 && decodedToken.loginToken
}

const setSession = (accessToken) => {
    // console.log('Set Session', accessToken)
    if (accessToken != null) {
        localStorage.setItem('tokenId', accessToken)
        axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
    } else {
        localStorage.removeItem('tokenId')
        delete axios.defaults.headers.common.Authorization
    }
}

const clearLocalStorage = () => {
    localStorage.clear()
}
const reducer = (state, action) => {
    switch (action.type) {
        case 'INIT': {
            const { isAuthenticated, user } = action.payload
            // console.log('reducerlogin', user, isAuthenticated)
            return {
                ...state,
                isAuthenticated,
                isInitialised: true,
                user,
            }
        }
        case 'LOGIN': {
            const { user } = action.payload
            // console.log('reducerlogin1', user)
            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        case 'LOGOUT': {
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            }
        }
        case 'REGISTER': {
            const { user } = action.payload

            return {
                ...state,
                isAuthenticated: true,
                user,
            }
        }
        default: {
            return { ...state }
        }
    }
}

const AuthContext = createContext({
    ...initialState,
    method: 'JWT',
    login: () => Promise.resolve(),
    logout: () => {},
    register: () => Promise.resolve(),
})

export const AuthProvider = ({ children }) => {
    const dispatched= useDispatch();
    const [state, dispatch] = useReducer(reducer, initialState)
    const navigate = useNavigate()

    const login = async (username, password,code) => {
        if (!validator.isEmail(username)) {
            NotificationManager.error('Invalid email id')
            return
        }
        dispatch({
            type: loginConstant.LOGIN_LOADING,
            payload: {},
        })
        const response = await axios.post(API_URL_LOGIN.api + GOOGLE_CONFIRM, {
            username,
            password,
            code
        })
         console.log('usererefef', response)
        const { token, data } = response.data.response;
          var ExportToken =response.data.response.data.token
        //  console.log("vdvdf",data);
        if (response.status === 200) {
            if (response.data.response.status == '1') {
                localStorage.setItem(
                    'user_id',
                    response.data.response.data.loginId
                )
                localStorage.setItem(
                    'tokenId',
                    response.data.response.data.token
                )
                localStorage.setItem(
                    'auth_user',
                    JSON.stringify(response.data.response.data)
                )
                localStorage.setItem(
                    'menuDetails',
                  (
                        JSON.stringify(response.data.response.data.menuDetails)
                    )
                )
                // console.log( "menuId",generalFunction.encryptedString(JSON.stringify(response.data.response.data.menuUid)))
                localStorage.setItem(
                    'menuId',
                (
                        JSON.stringify(response.data.response.data.menuUid)
                    )
                )
                sessionStorage.setItem(
                    'tokenId',
                    response.data.response.data.token
                )
               // setSession(response.data.response.data.token)
               dispatched({
                    type: loginConstant.LOGIN_SUCCESS,
                    payload: response.data,
                })
                navigate('/dashboard/default');
               window.location.reload();
                const user = data
                dispatch({
                    type: 'LOGIN',
                    payload: {
                        user,
                    },
                })

                //  console.log("vdvdf",user);
            } else if (response.data.response.status == '100') {
                dispatch({
                    type: loginConstant.CHANGE_PASSWORD,
                    payload: response.data,
                })
                navigate('/sess/cngPass')
            } else {
                //Invalid User Details
                //console.log(response.data.response.message)
                NotificationManager.error(response.data.response.message)
                dispatch({
                    type: loginConstant.LOGIN_ERROR,
                    payload: { error: response.message },
                })
            }
            //  console.log('usererefef', response)
        } else {
            NotificationManager.error(response.message)
            dispatch({
                type: loginConstant.LOGIN_ERROR,
                payload: { error: 'Something went wrong' },
            })
        }
    }
    const register = async (email, username, password) => {
        const response = await axios.post('/api/auth/register', {
            email,
            username,
            password,
        })

        const { accessToken, user } = response.data

        setSession(accessToken)

        dispatch({
            type: 'REGISTER',
            payload: {
                user,
            },
        })
    }

    const logout = () => {
        setSession(null)
        clearLocalStorage()
        dispatch({ type: 'LOGOUT' })
    }

    useEffect(() => {
        ;(async () => {
            try {
                const accessToken = localStorage.getItem('tokenId')
                // console.log('Access Storage', accessToken)
                if (accessToken && isValidToken(accessToken)) {
                    setSession(accessToken)
                    //const response = await axios.get('/api/auth/profile')
                    let userss = localStorage.getItem('auth_user')

                    //   console.log('Access Storage1', userss)
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: true,
                            user: userss,
                        },
                    })
                } else {
                    dispatch({
                        type: 'INIT',
                        payload: {
                            isAuthenticated: false,
                            user: null,
                        },
                    })
                }
            } catch (err) {
                console.error(err)
                dispatch({
                    type: 'INIT',
                    payload: {
                        isAuthenticated: false,
                        user: null,
                    },
                })
            }
        })()
    }, [])

    if (!state.isInitialised) {
        return <MatxLoading />
    }

    return (
        <AuthContext.Provider
            value={{
                ...state,
                method: 'JWT',
                login,
                logout,
                register,
            }}
        >
            {children}
            <NotificationContainer />
        </AuthContext.Provider>
    )
}
export default AuthContext
