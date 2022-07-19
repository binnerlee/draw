/*
 * @Author: lgb
 * @Date: 2022-07-18 14:24:33
 * @LastEditors: lgb
 * @LastEditTime: 2022-07-19 09:04:05
 * @Description: 
 */
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, HashRouter } from "react-router-dom";
import App from "./App";

ReactDOM.render((<HashRouter>
    <App />
</HashRouter>), document.getElementById('root'));