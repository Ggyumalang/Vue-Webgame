<template>
    <table>
        <tr v-for="(rowData, rowIndex) in tableData" :key="rowIndex">
            <td 
              v-for="(colData, colIndex) in rowData" 
              :key="colIndex" 
              :style="cellDataStyle(rowIndex, colIndex)" 
              @click="onClickTd(rowIndex, colIndex)"              
              @contextmenu.prevent="onRightClickTd(rowIndex, colIndex)"
            >
               {{ cellDataText(rowIndex, colIndex) }}
            </td>
        </tr>
    </table>
</template>
<script>
  import { mapState } from 'vuex';
  import { CLICK_MINE, CODE, FLAG_CELL, NORMALIZE_CELL, OPEN_CELL, QUESTION_CELL } from './store';

  export default {
    computed : {
        ...mapState(['tableData', 'halted']),
        // 화살표 함수 사용 시 this.$store 가 작동 x 하므로 일반 함수로 수정
        // cellDataStyle : (state) => (row,col) => {
        cellDataStyle(state) {
            //내부는 화살표 함수 사용해야 정상 동작
            return (row,col) => {
              switch(state.tableData[row][col]) {
                case CODE.NORMAL:
                case CODE.MINE:
                  return {
                    background: '#444'
                  }
                case CODE.CLICKED_MINE:
                case CODE.OPENED:
                  return {
                    background : 'white'
                  }
                case CODE.FLAG:
                case CODE.FLAG_MINE:
                    return {
                      background : 'red'
                    }
                case CODE.QUESTION:
                case CODE.QUESTION_MINE:
                    return {
                      background : 'yellow'
                    }
                default:
                    return {};
              }
          }
        },
        cellDataText() {
          return (row,col) => {
            switch(this.$store.state.tableData[row][col]) {
              case CODE.MINE:
                return 'X';
              case CODE.NORMAL:
                return '';
              case CODE.FLAG:
              case CODE.FLAG_MINE:
                  return '!';
              case CODE.QUESTION:
              case CODE.QUESTION_MINE:
                  return '?';
              case CODE.CLICKED_MINE:
                  return '펑';
              default:
                return this.$store.state.tableData[row][col] || ''; 
            }
          }
        }        
      },
      methods : {
        onClickTd(row, col) {
          if(this.halted) {
            return;
          }
          if(this.tableData[row][col] === CODE.MINE) {
            this.$store.commit(CLICK_MINE, {row, col});
          } else {
            this.$store.commit(OPEN_CELL, {row, col});
          }
        },
        onRightClickTd(row, col) {
          if(this.halted) {
            return;
          }
          //순환 관계
          //NORMAL -> FLAG -> QUESTION -> NORMAL
          switch(this.tableData[row][col]) {
            case CODE.NORMAL:
            case CODE.MINE:
              this.$store.commit(FLAG_CELL, {row, col});
              return;
            case CODE.FLAG_MINE:
            case CODE.FLAG:
              this.$store.commit(QUESTION_CELL, {row, col});
              return;
            case CODE.QUESTION_MINE:
            case CODE.QUESTION:
              this.$store.commit(NORMALIZE_CELL, {row, col});
              return;
          }          
        }
      }
  }
</script>
<style scoped>

</style>
