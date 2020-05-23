import React from'react'
import {Switch, Route, Redirect} from "react-router-dom";
import {Links} from "./components/Links";
import {Create} from "./components/Create";
import {Detail} from "./components/Detail";
import {Auth} from "./components/Auth";

export const useRoutes = isAuthenticated => {
   if (isAuthenticated){
       return(
           <Switch>
               <Route exact path='/links' >
                   <Links/>
               </Route>
               <Route exact path='/create' >
                   <Create/>
               </Route>
               <Route path='/detail/:id' >
                   <Detail/>
               </Route>
               <Redirect to='/create'/>
           </Switch>
       )
   }
   return(
       <Switch>
           <Route exact path='/'>
               <Auth/>
           </Route>
           <Redirect to='/'/>
       </Switch>
   )

}