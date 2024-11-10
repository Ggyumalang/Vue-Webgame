<template>
    <div>
      <div> {{ turn }}님의 턴입니다.</div>
      <!-- 제어의 역전.. 원래 자식 컴포넌트에서 보여줘야할 것을 부모 컴포넌트에서 보여줌. 데이터를 부모의 것을 활용-->
      <table-component>
        <tr v-for= "(rowData, rowIndex) in tableData" :key="rowIndex">
          <td @click="onClickTd(rowIndex, colIndex)" v-for = "(_, colIndex) in rowData" :key="colIndex"> {{ cellData }}</td>
        </tr>
      </table-component>
       <!-- <table>
        <tr v-for= "(_, rowIndex) in tableData" :key="rowIndex">
          <td v-for = "(_, colIndex) in tableData" :key="colIndex"> {{  cellData }}</td>
        </tr>
       </table> -->
      <div v-if="winner"> {{ turnMessage }} </div>
    </div>
</template>
<script> 
  import { mapState, mapGetters } from 'vuex';
  import TableComponent from './TableComponent';
  import { store } from './store';

  export default {
    store,
    components : {
      TableComponent
    },
    computed : {
      ...mapState(['turn', 'winner']),
      ...mapGetters(['turnMessage'])
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
