import { createStore } from 'vuex';

export const SET_WINNER = 'SET_WINNER';
export const CLICK_CELL = 'CLICK_CELL';
export const CHANGE_TURN = 'CHANGE_TURN';
export const RESET_GAME = 'RESET_GAME';
export const NO_WINNER = 'NO_WINNER';

export const store = createStore({
    state: {
        tableData : [
            ['','',''],
            ['','',''],
            ['','','']
          ],
          turn: 'O',
          winner: ''
    }, //Vue의 data와 비슷
    getters: {
        turnMessage(state) {
            if(state.winner !== '무승부') {
                return state.winner + '님이 승리하셨습니다.';
            } else {
                return '무승부입니다.';
            }
        }
    }, //Vue의 computed와 비슷
    mutations: {
        [SET_WINNER](state, winner) {
            state.winner = winner;
        },
        [CLICK_CELL](state, { row, cell }) {
            state.tableData[row][cell] = state.turn;
        },
        [CHANGE_TURN](state) {
            state.turn = state.turn === 'O' ? 'X' : 'O'
        },
        [RESET_GAME](state) {
            state.turn = 'O';
            state.tableData = [
                ['','',''],
                ['','',''],
                ['','','']
            ];
        },
        [NO_WINNER](state) {
            state.winner = '무승부';
        }
    }, //state 를 수정 시 사용 동기적으로
    actions: {

    } //state 를 수정 시 사용 비동기적으로 / 또는 여러 뮤테이션을 연달아 실행할 때
})