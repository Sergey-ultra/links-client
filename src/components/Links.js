import React, {Fragment, useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/auth.context";
import {Loader} from "./Loader";
import {LinksList} from "./LinkLinks";

export const Links =() => {
    const [links,setLinks] = useState([])
    const {loading,request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request('/api/link','GET',null, {
                Authorization: `Bearer ${token} `
                })
            setLinks(fetched)
        } catch (e) {
        }
    }, [token,request])

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])


    if (loading) {
        return <Loader/>
    }
    return (
        <Fragment>
            {!loading && <LinksList links={links}/>}
        </Fragment>
    )
}