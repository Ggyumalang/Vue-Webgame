import { createStore } from 'vuex';

export const START_GAME = 'START_GAME';
export const OPEN_CELL = 'OPEN_CELL';
export const CLICK_MINE = 'CLICK_MINE';
export const FLAG_CELL = 'FLAG_CELL';
export const QUESTION_CELL = 'QUESTION_CELL';
export const NORMALIZE_CELL = 'NORMALIZE_CELL';
export const INCREMENT_TIMER = 'INCREMENT_TIMER';

export const CODE = {
    MINE: -7,
    NORMAL: -1,
    QUESTION: -2,
    FLAG: -3,
    QUESTION_MINE: -4,
    FLAG_MINE: -5,
    CLICKED_MINE: -6,
    OPENED: 0, // 0 이상이면 다 opened + 지뢰 건수 ]
}

const plantMine = (row, col, mine) => {
    console.log("started plantMine !!! row = %s, col = %s, mine = %s", row, col, mine);
    const candidate = Array(row * col).fill().map((arr, i) => {
        return i;
    });
    console.log("candidate >>> ", candidate);

    const shuffle = [];
    while (candidate.length > row * col - mine) {
        const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
        shuffle.push(chosen);
    }
    const data = [];
    for(let i = 0; i < row; i++) {
        const rowData = [];
        data.push(rowData);
        for(let j = 0; j < col; j++) {
            rowData.push(CODE.NORMAL);
        }
    }

    for(let k = 0; k < shuffle.length; k++) {
        const ver = Math.floor(shuffle[k] / col);
        const hor = shuffle[k] % col;
        data[ver][hor] = CODE.MINE;
    }

    console.log("data >>> ", data);
    return data;
}

export const store = createStore({
    state: {
        tableData : [],
        //행, 열, 지뢰
        data : {
            row: 0,
            col: 0,
            mine: 0,
        },
        timer: 0,
        halted: true, //게임이 중단된
        result: '',
        openedCount: 0
    }, //Vue의 data와 비슷
    getters: {
        
    }, //Vue의 computed와 비슷
    mutations: {
        //구조분해
        [START_GAME](state, {row, col, mine}){
            state.data = {
                row,
                col,
                mine
            }
            //state.data.row = row; 로 객체 내 특정 컬럼만 변경하면 화면이 안 바뀔 수 있음.
            //Vue.set(state.data, 'row', row); 이런 식으로 작성해야할 수 있음.

            //지뢰 심기
            state.tableData = plantMine(row, col, mine);
            state.timer = 0;
            state.halted = false;
            state.openedCount = 0;
            state.result = '';
        },
        [OPEN_CELL](state, {row, col}){
            const visited = [];         
            // 주변 8칸 지뢰 유무 확인
            function checkAround(row, col) {
                let checkUndefined = row < 0 || row >= state.tableData.length || col < 0 || col >= state.tableData[0].length
                //범위에 벗어나는 값 제외
                if(checkUndefined) {
                    return;
                }

                //이미 열려있거나, 플래그 혹은 퀘스쳔 마크가 있는 경우 제외
                if([CODE.OPENED, CODE.FLAG, CODE.FLAG_MINE, CODE.QUESTION_MINE, CODE.QUESTION].includes(state.tableData[row][col])) {
                    return;
                }

                //이미 방문한 곳이라면 return
                if(visited.includes(row + '/' + col)) {
                    return;
                } else {
                    visited.push(row + '/' + col);
                }

                let around = [];
                if(state.tableData[row - 1]) {
                    around = around.concat([
                        state.tableData[row - 1][col - 1], 
                        state.tableData[row - 1][col],
                        state.tableData[row - 1][col + 1],
                    ]);
                }

                if(state.tableData[row + 1]) {
                    around = around.concat([
                        state.tableData[row + 1][col - 1],
                        state.tableData[row + 1][col],
                        state.tableData[row + 1][col + 1],      
                    ]);
                }

                around = around.concat([
                    state.tableData[row][col - 1],
                    state.tableData[row][col + 1],
                ]);

                //지뢰, 깃발, 퀘스쳔 마크 체크
                const counted = around.filter(function(v) {
                    return [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v);
                })

                // 주변 칸에 지뢰가 하나도 없으면
                if(counted.length === 0 && row > -1) {
                    const near = [];
                    if(row - 1 > -1) {
                        near.push([row - 1, col - 1]);
                        near.push([row - 1, col]);
                        near.push([row - 1, col + 1]);
                    }
                    near.push([row, col - 1]);
                    near.push([row, col + 1]);
                    if(row + 1 < state.tableData.length) {
                        near.push([row + 1, col - 1]);
                        near.push([row + 1, col]);
                        near.push([row + 1, col + 1]);
                    }
                    near.forEach((n) => {
                        if(state.tableData[n[0]][n[1]] !== CODE.OPENED) {
                            checkAround(n[0], n[1]);
                        }
                    });
                }
                 // Vue2 에서는 이렇게 하면 안되고 아래와 같이 해야 화면이 바뀜
                 // Vue.set(state.tableData[row], col, CODE.OPENED);
                 if(state.tableData[row][col] === CODE.NORMAL) {
                    state.openedCount += 1;
                 }
                 state.tableData[row][col] = counted.length;
            }    
            checkAround(row,col);
            if(state.data.row * state.data.col - state.data.mine === state.openedCount) {
                state.halted = true;
                state.result = `${state.timer} 초 만에 승리하였습니다!`;
            }
        },
        [CLICK_MINE](state, {row, col}){
            state.halted = true;
            state.tableData[row][col] = CODE.CLICKED_MINE;
        },
        [FLAG_CELL](state, {row, col}){
            if(state.tableData[row][col] === CODE.MINE) {
                state.tableData[row][col] = CODE.FLAG_MINE;
            } else {
                state.tableData[row][col] = CODE.FLAG;
            }
        },
        [QUESTION_CELL](state, {row, col}){
            if(state.tableData[row][col] === CODE.FLAG_MINE) {
                state.tableData[row][col] = CODE.QUESTION_MINE;
            } else {
                state.tableData[row][col] = CODE.QUESTION;
            }
        },
        [NORMALIZE_CELL](state, {row, col}){
            if(state.tableData[row][col] === CODE.QUESTION_MINE) {
                state.tableData[row][col] = CODE.MINE;
            } else {
                state.tableData[row][col] = CODE.NORMAL;
            }
        },
        [INCREMENT_TIMER](state){
            state.timer++;
        }        
    }, //state 를 수정 시 사용 동기적으로
    actions: {

    } //state 를 수정 시 사용 비동기적으로 / 또는 여러 뮤테이션을 연달아 실행할 때
})