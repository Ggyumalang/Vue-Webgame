<template>
    <div>
      <div> {{ turn }}님의 턴입니다.</div>
      <table-component :table-data="tableData"></table-component>
      <div v-if="winner"> {{ winner }}님의 승리입니다.</div>
    </div>
</template>
<script> 
  import TableComponent from './TableComponent';
  import EventBus from './EventBus';

  export default {
    components : {
      TableComponent
    },
    data() {
      return {
        tableData : [
          ['','',''],
          ['','',''],
          ['','','']
        ],
        turn: 'O',
        winner: ''
      }
    },
    computed : {

    },
    methods : {
      //가장 최상위 컴포넌트에서 모든 걸 처리할 수 있게 함.
      onClickTd(rowIndex, cellIndex) {
        console.log("tableData >>> ", this.tableData)
        console.log("turn >>> ", this.turn)
        console.log("winner >>> ", this.winner)
        
        console.log("rowIndex >>> ", rowIndex)
        console.log("cellIndex >>> ", cellIndex)
        this.tableData[rowIndex][cellIndex] = this.turn;

        let win = false;

        //가로 3줄
        if(this.tableData[rowIndex][0] === this.turn 
            && this.tableData[rowIndex][1] === this.turn 
            && this.tableData[rowIndex][2] === this.turn
        ) {
            win = true;
        }

        //세로 3줄
        if(this.tableData[0][cellIndex] === this.turn 
            && this.tableData[1][cellIndex] === this.turn 
            && this.tableData[2][cellIndex] === this.turn
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
            this.winner = this.turn;
            //데이터 초기화
            this.turn = 'O';
            this.tableData = [
                ['','',''],
                ['','',''],
                ['','','']
            ]
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
                this.winner = '무승부가 발생했습니다!';
                //데이터 초기화
                this.turn = 'O';
                this.tableData = [
                    ['','',''],
                    ['','',''],
                    ['','','']
                ]
            } else {
                // 아직 게임 중인 경우
                this.turn = this.turn === 'O' ? 'X' : 'O';
            }
        }
      }

    },
    created() {
      EventBus.on('clickTd', this.onClickTd);
    },
    mounted() {

    },
    beforeDestroy() {

    }
  }
</script>
<style>
  table {
    border-collapse: collapse;
  }
  td {
    border: 1px solid black;
    width: 40px;
    height: 40px;
    text-align: center;
  }
</style>
