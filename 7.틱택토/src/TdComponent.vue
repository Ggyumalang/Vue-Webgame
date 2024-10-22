<template>
    <td @click="onClickTd"> {{ cellData }}</td>
</template>
<script>
export default {
    props: {
        cellData: String,
        rowIndex: Number,
        cellIndex: Number
    },
    methods: {
        onClickTd() {
            //다른 사람이 이미 누른 칸이라면 아무것도 일어나지 않도록 return 해줍니다.
            if(this.cellData) return;

            const rootData = this.$parent.$parent.$parent.$data;
            console.log(this.rowIndex)
            console.log(this.cellIndex)
            //강의인 vue2에서는 $root 를 썼는데.. vue3는 아마도 막힌 것 같다 $root.$data.turn 은 아무 값도 불러오지 못한다.
            console.log(rootData.turn)
            console.log(this.$parent.$data)
            // 원래는 인덱스를 사용해 데이터를 바꾸면 vue 에서는 반영이 안된다. 즉, 화면이 안 뿌려진다고 하는데 vue3에서는 가능함
            // rootData.tableData[this.rowIndex][this.cellIndex] = rootData.turn
            // 아래처럼 this.$set(바꿀 행위치, 열위치, 변경할 값) 이것 또한 vue2에서만 가능해보임
            // this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn);
            rootData.tableData[this.rowIndex][this.cellIndex] = rootData.turn;

            let win = false;

            //가로 3줄
            if(rootData.tableData[this.rowIndex][0] === rootData.turn 
                && rootData.tableData[this.rowIndex][1] === rootData.turn 
                && rootData.tableData[this.rowIndex][2] === rootData.turn
            ) {
                win = true;
            }

            //세로 3줄
            if(rootData.tableData[0][this.cellIndex] === rootData.turn 
                && rootData.tableData[1][this.cellIndex] === rootData.turn 
                && rootData.tableData[2][this.cellIndex] === rootData.turn
            ) {
                win = true;
            }

            //대각선1
            if(rootData.tableData[0][0] === rootData.turn 
                && rootData.tableData[1][1] === rootData.turn 
                && rootData.tableData[2][2] === rootData.turn
            ) {
                win = true;
            }
            
            //대각선2
            if(rootData.tableData[0][2] === rootData.turn 
                && rootData.tableData[1][1] === rootData.turn 
                && rootData.tableData[2][0] === rootData.turn
            ) {
                win = true;
            }
            
            //이긴 경우 : 3줄 달성
            if(win) {
                //승자 기록
                rootData.winner = rootData.turn;
                //데이터 초기화
                rootData.turn = 'O';
                rootData.tableData = [
                    ['','',''],
                    ['','',''],
                    ['','','']
                ]
            } else {
                //무승부인 경우 
                let all = true; //all 이 true 면 무승부
                rootData.tableData.forEach((row) => {
                    row.forEach((cell) => {
                        if(!cell) {
                            all = false;
                        }
                    }) 
                })

                if(all) {
                    //무승부인 경우
                    rootData.winner = '무승부가 발생했습니다!';
                    //데이터 초기화
                    rootData.turn = 'O';
                    rootData.tableData = [
                        ['','',''],
                        ['','',''],
                        ['','','']
                    ]
                } else {
                    // 아직 게임 중인 경우
                    rootData.turn = rootData.turn === 'O' ? 'X' : 'O';
                }
            }


        }
    }
}
</script>
