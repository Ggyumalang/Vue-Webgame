<template>
    <td @click="onClickTd"> {{ cellData }}</td>
</template>
<script>
import { mapState } from 'vuex/dist/vuex.cjs.js';
import { CHANGE_TURN, CLICK_CELL, NO_WINNER, RESET_GAME, SET_WINNER } from './store';
export default {
    props: {
        rowIndex: Number,
        cellIndex: Number
    },
    computed : {
        ...mapState({
            tableData: state => state.tableData,
            turn: state => state.turn,
            cellData(state) {
                return state.tableData[this.rowIndex][this.cellIndex];
            }
        }),        
    },
    methods: {
        onClickTd() {
            //다른 사람이 이미 누른 칸이라면 아무것도 일어나지 않도록 return 해줍니다.
            if(!this.tableData) winner = '';
            if(this.cellData) return;

            this.$store.commit(CLICK_CELL, {row : this.rowIndex, cell : this.cellIndex});

            let win = false;

            //가로 3줄
            if(this.tableData[this.rowIndex][0] === this.turn 
                && this.tableData[this.rowIndex][1] === this.turn 
                && this.tableData[this.rowIndex][2] === this.turn
            ) {
                win = true;
            }

            //세로 3줄
            if(this.tableData[0][this.cellIndex] === this.turn 
                && this.tableData[1][this.cellIndex] === this.turn 
                && this.tableData[2][this.cellIndex] === this.turn
            ) {
                win = true;
            }

            //대각선1
            if(this.tableData[0][0] === this.turn 
                && this.tableData[1][1] === this.turn 
                && this.tableData[2][2] === this.turn
            ) {
                win = true;
            }
            
            //대각선2
            if(this.tableData[0][2] === this.turn 
                && this.tableData[1][1] === this.turn 
                && this.tableData[2][0] === this.turn
            ) {
                win = true;
            }
            
            //이긴 경우 : 3줄 달성
            if(win) {
                //승자 기록
                this.$store.commit(SET_WINNER, this.turn);
                this.$store.commit(RESET_GAME);
            } else {
                //무승부인 경우 
                let all = true; //all 이 true 면 무승부
                this.tableData.forEach((row) => {
                    row.forEach((cell) => {
                        if(!cell) {
                            all = false;
                        }
                    }) 
                })

                if(all) {
                    //무승부인 경우
                    this.$store.commit(NO_WINNER);
                    this.$store.commit(RESET_GAME);
                } else {
                    // 아직 게임 중인 경우
                    this.$store.commit(CHANGE_TURN);
                }
            }


        }
    }
}
</script>
