<template>
    <div>
      <div> {{ turn }}님의 턴입니다.</div>
      <table-component></table-component>
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
