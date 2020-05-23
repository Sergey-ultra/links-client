import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/auth.context";

export const Auth =() => {
    const auth =useContext(AuthContext)
    //импорт функции показа ошибки
    const  message = useMessage()
    const {loading, error, clearError, request} =useHttp()
    const [form,setForm] = useState({
        email:'',
        password:''
    })

    useEffect(() => {
        message(error)
        clearError()
    },[error, message, clearError])

    useEffect(() => {
        window.M.updateTextFields()
    },[])

    const changeHandler = event => {
        setForm({...form, [event.target.name]:event.target. value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('https://guarded-journey-36681.herokuapp.com/api/auth/register', 'POST', {...form})
           message(data.message)
        }catch (e){

        }
    }
    const loginHandler = async () => {
        try {
            const data = await request('https://guarded-journey-36681.herokuapp.com/api/auth/login', 'POST', {...form})
           auth.login(data.token, data.userId)
        }catch (e){

        }
    }

    return(
        <div className ='row'>
            <div className="col s6 offset-s3">
                <h1>Сократи ссылку</h1>
                <div className="card blue  darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <input placeholder="Введите email"
                                       id="email"
                                       type="text"
                                       name="email"
                                       value={form.email}
                                       className='yellow-input'
                                       onChange={changeHandler}
                                />
                                <label htmlFor="email">Email</label>
                            </div>
                            <div className="input-field">
                                <input placeholder="Введите пароль"
                                       id="password"
                                       type="password"
                                       name='password'
                                       value={form.password}
                                       className='yellow-input'
                                       onChange={changeHandler}
                                />
                                <label htmlFor="password">Пароль</label>
                            </div>
                        </div>
                        <div className="card-action">
                            <button
                                className='btn yellow darken-4'
                                style={{marginRight: 10}}
                                onClick={loginHandler}
                                disabled={loading}
                            >
                                Войти
                            </button>
                            <button
                                className='btn grey lighten-1 black-text'
                                onClick={registerHandler}
                                disabled={loading}
                            >
                                Регистрация
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}