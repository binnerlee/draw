/*
 * @Author: lgb
 * @Date: 2022-07-18 15:43:23
 * @LastEditors: lgb
 * @LastEditTime: 2022-07-19 09:17:55
 * @Description: 
 */
import React, { useContext, useEffect, useState } from 'react';
import { StateContext } from '../../App';
import { Employee, IStateContext } from '../../interface';

export default () => {
    // 获取全部人员列表和指定中奖人员
    const { state } = useContext<IStateContext>(StateContext);
    const { employees, determineList } = state;

    // 指定当前中奖人员
    const [current, setCurrent] = useState<Employee>(undefined);
    // 获取当前全部参与抽奖的人
    const [empList, setEmpList] = useState<Employee[]>([]);
    // 已经中奖人员列表
    const [wins, setWins] = useState([]);
    // 是否已经完成抽奖
    const [finished, setFinished] = useState<boolean>(false);
    
    useEffect(() => {
        // 将指定中奖人员与全员人员合并、去重。
        const ret = employees.reduce((prev, cur) => {
            if (prev.indexOf(cur) < 0) {
                prev.push(cur);
            }
            return prev;
        }, [...determineList]);

        setEmpList(ret);
    }, []);

    const handleClick = () => {
        // 判断是否还有没中奖的人
        if (empList.length <= 0) {
            setFinished(true);
            return;
        }
        // 获取随机数最大长度，
        // 如果【指定中奖人员数量 > 已中奖数量】，表示指定中奖人员还没抽完，则只随机剩下的指定中奖人员数量
        // 如果指定中奖人员已经抽完奖，则使用全部参与抽奖人数随机
        const total = determineList.length - wins.length > 0 ? determineList.length - wins.length : empList.length;
        // 根据随机数获取当前下标
        const rNum = Math.floor(Math.random() * total);
        // 取出中奖人员
        let val = empList.splice(rNum, 1);
        if (val.length <= 0) {
            return;
        }
        // 更新数据
        setCurrent(val[0]);
        wins.push(val[0]);

        setWins(wins);
    }

    return <>
        {
            finished ? <p>抽奖完毕！</p> : <button onClick={handleClick}>抽奖</button>
        }
        <p>当前中奖者：{current?.name}</p>
        <ul>
            {
                wins.map((t) => (<li key={t.key} style={{ display: "inline-block", marginLeft: "10px" }}>{t.name}</li>))
            }
        </ul>
    </>
}