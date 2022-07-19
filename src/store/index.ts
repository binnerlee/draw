/*
 * @Author: lgb
 * @Date: 2022-07-18 22:22:37
 * @LastEditors: lgb
 * @LastEditTime: 2022-07-19 09:08:28
 * @Description: 
 */
import { StateType } from "../interface";

const state: StateType = {
    employees: [],
    determineList: []
};

function reducer (state: any, action: any) {

    const { determineList } = state;

    switch (action.type) {
        case 'setEmployees':
            const len = action.payload;
            if (len <= 0) {
                alert('输入不正确');
                return;
            }
            const arr = [];
            // 根据传入的长度，生成人员数据
            for(let i = 0; i < len; i++) {
                arr.push({ name: i, key: i });
            }
            // 重新生成列表时，指定项清空
            return { employees: arr, determineList: [] };
        case 'addDetermine':
            {
                // 获取要添加到指定中奖名单的选项。
                let addItem = action.payload;
                // 判断是否已经添加过
                if (determineList.some(t => t.key === addItem.key)) {
                    return state;
                }
                // 将选项添加到指定中奖名单列表，并更新数据。
                let newArr = [...determineList];
                newArr.push(addItem);
                return { ...state, determineList: newArr };
            }
        case 'delDetermine':
            {
                // 获取要从中奖名单中删除的选项。
                const delItem = action.payload;
                // 判断指定中奖名单中是否存在此项。
                const index = determineList.findIndex(t => t.key === delItem.key);
                if (index < 0) {
                    return state;
                }
                // 删除项并更新数据
                let newArr = [...determineList];
                newArr.splice(index, 1);
                return { ...state, determineList: newArr };
            }
        default:
            return state;
    }
}

export {
    state,
    reducer
};
