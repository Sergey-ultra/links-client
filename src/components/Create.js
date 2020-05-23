import React, {useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/auth.context";
import{useHistory} from 'react-router-dom'
import {Loader} from "./Loader";

export const Create =() => {
    const history = useHistory()
    const auth = useContext(AuthContext)

    useEffect(() => {
        window.M.updateTextFields()
    },[])

    const {request} = useHttp()

    const [link, setLink] = useState('')

    const pressHandler = async  event => {
        if (event.key === 'Enter') {
            try {
               const data = await request('https://guarded-journey-36681.herokuapp.com/api/link/generate','POST',{from:link},{
                   Authorization:`Bearer ${auth.token}`
               })
               console.log('После нажатия',data)
                history.push(`/detail/${data.link._id}`)

            } catch (e) {}
        }

    }
    return(
        <div className ="row">
            <div className="col s8 offset-s2" style={{paddingTop:'2rem'}}>
                <div className="input-field">
                    <input placeholder="Вставьте ссылку"
                           id="link"
                           type="text"
                           value={link}
                           onChange={e => setLink(e.target.value)}
                           onKeyPress={pressHandler}
                    />
                    <label htmlFor="ink">Введите ссылку</label>
                </div>
            </div>
        </div>
    )
}