import { Redirect, Route, Switch } from 'react-router-dom'
import React from "react";

import './App.css'
import { NotFound } from "./components/other/NotFound/NotFound"
import Header from "./components/Header"
import HomePage from "./components/mainBlock/HomePage"
import Footer from "./components/Footer"
import Store from "./components/mainBlock/Store"
import Cart from "./components/mainBlock/Cart"
import OneBook from "./components/mainBlock/OneBook"
import Profile from "./components/mainBlock/Profile"


export const App = (props) => {
    return (
    	<>
    		<Header />
    		<div className={"wrapper"}>
	    		<div className={"mainBlock"}>
			        <Switch>
				  		<Route exact path="/">
				  			<Redirect to="/homepage"/>
				  		</Route>
				        <Route path="/homepage" render={() =>
				            <HomePage />}/>
				        <Route path="/store" render={() =>
				            <Store />}/>
				        <Route path="/cart" render={() =>
				            <Cart />}/>
				        <Route path="/profile:toggleEditMode?" render={() =>
				            <Profile />}/>
				        <Route path="/book/:bookId" render={() =>
				            <OneBook />}/>
				        <Route path="*" render={() =>
				            <NotFound />}/>
				    </Switch>
			    </div>
		    </div>
		    <Footer />
	    </>
    )
}
