/*
 * @Author: lgb
 * @Date: 2022-07-18 14:17:35
 * @LastEditors: lgb
 * @LastEditTime: 2022-07-19 09:08:48
 * @Description: 
 */
import React, { useReducer } from 'react';

import { Route, Routes } from 'react-router-dom';
import { INIT_STATE_CONTEXT, IStateContext, StateType } from './interface';
import Draw from './pages/draw';
import Manage from './pages/manage';
import NotFound from './pages/notFound';
import { reducer, state as initState } from './store';

// 创建全局上下文
export const StateContext = React.createContext<IStateContext<StateType>>(INIT_STATE_CONTEXT);

function App() {
    // 生成reducer并将state和dispatch对象放到全局上下文中。
    const [state, dispatch] = useReducer(reducer, initState);

    return (<StateContext.Provider value={{ state, dispatch }}>
        <Routes>
            <Route path="/" element={<Manage />}></Route>
            <Route path="/draw" element={<Draw />}></Route>
            <Route path="*" element={<NotFound />} />
        </Routes>
    </StateContext.Provider>);
}

export default App;