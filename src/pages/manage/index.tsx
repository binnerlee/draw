/*
 * @Author: lgb
 * @Date: 2022-07-18 15:43:23
 * @LastEditors: lgb
 * @LastEditTime: 2022-07-19 09:33:18
 * @Description: 
 */
import React, { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';
import { StateContext } from '../../App';
import { Employee, IStateContext } from '../../interface';

export default () => {
    
    const { state, dispatch } = useContext<IStateContext>(StateContext);

    const { employees, determineList } = state;

    const inputRef = useRef<HTMLInputElement>();

    /**
     * 点击生成按钮，重新生成数据。
     * @returns 
     */
    const handleClick = () => {
        const inputElement = inputRef.current;

        if (!inputElement || !inputElement.value) {
            return;
        }
        // 将值转成number类型，并判断输入的长度是否符合。
        const len = Math.floor(Number(inputElement.value));

        if (len <= 0) {
            alert('输入不正确');
            return;
        }
        // 调用修改数据方法
        dispatch?.({
            type: 'setEmployees',
            payload: len
        });
    }
    /**
     * 点击全部人员列表中的选项事件，将点击的选项添加到 指定中奖人员 列表中。
     * @param item 
     */
    const handleTagClick = (item: Employee) => {
        dispatch?.({
            type: 'addDetermine',
            payload: item
        });
    }

    /**
     * 点击指定中奖人员列表中的选项，将选项删除。
     * @param item 
     */ 
    const handleSelectedItemClick = (item: Employee) => {
        dispatch?.({
            type: 'delDetermine',
            payload: item
        });
    }

    return <>
        <table border={1} style={{ "width": "100%" }}>
            <tbody>
            <tr>
                <td style={{ "width": "120px", "padding": "14px 0" }}>设置抽奖人数：</td>
                <td><input defaultValue={200} placeholder="设置生成人数" ref={inputRef} /></td>
                <td style={{ "width": "150px" }}><button onClick={handleClick}>生成</button></td>
            </tr>
            <tr>
                <td style={{ "width": "120px", "padding": "14px 0" }}>指定中奖人员：</td>
                <td>
                    <ul>
                        {
                            determineList.map((t: Employee, i: number) => (
                                <li key={i}
                                    style={{ "marginLeft": "10px", "display": "inline-block", "cursor": "pointer" }}
                                    onClick={() => handleSelectedItemClick(t)}
                                >
                                    {t.name}
                                </li>
                            ))
                        }
                    </ul>
                </td>
                <td>
                    在选项上单击，将选项从指定中奖人员中删除。
                </td>
            </tr>
            <tr>
                <td style={{ "width": "120px", "padding": "14px 0" }}>全部人员列表：</td>
                <td>
                    <ul>
                        {
                            employees.map((t: Employee, i: number) => (
                                <li
                                    key={i}
                                    style={{ "marginLeft": "10px", "display": "inline-block", "cursor": "pointer" }}
                                    onClick={() => handleTagClick(t)}
                                >
                                    {t.name}
                                </li>
                            ))
                        }
                    </ul>
                </td>
                <td>
                    在选项上单击，将选项添加到指定中奖人员名单。
                </td>
            </tr>
            <tr>
                <td colSpan={3} style={{ "textAlign": "center", "padding": "14px 0" }}>
                    <Link to={"/draw"}>去抽奖</Link>
                </td>
            </tr>
            <tr>
                <td colSpan={3}>
                    这个程序带有map文件，在chrome源码选项中可以查看代码。
                    也可以在github上查看源码：https://github.com/binnerlee/draw
                </td>
            </tr>
            </tbody>
        </table>
    </>
}