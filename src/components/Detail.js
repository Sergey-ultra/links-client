import React, {Fragment, useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/auth.context";
import {Loader} from "./Loader";
import {LinkCard} from "./LinkCard";

export const Detail =() => {

    const {token} =useContext(AuthContext)
    const [link,setLink] = useState(null)
    const linkId = useParams().id

    const {request,loading}  = useHttp()

    const getLink = useCallback(async () => {
        try {
            const fetched = await request(`/api/link/${linkId}`, 'GET', null, {
                Authorization:`Bearer ${token} `

            })
            setLink(fetched)
        }
        catch (e) {

        }
    },[token,linkId,request])

    useEffect(() => {
        getLink()
    }, [getLink])

    if (loading){
        return <Loader/>
    }

    return(
        <Fragment>
            {!loading && link && <LinkCard link ={link}/>}
        </Fragment>
    )
}