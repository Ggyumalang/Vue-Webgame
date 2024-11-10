<template>
    <div>
      <mine-form />
      <div>{{ timer }}</div>
      <table-component />
      <div>{{ result }}</div>
    </div>
</template>
<script> 
  import { mapState, mapGetters } from 'vuex';
  import TableComponent from './TableComponent';
  import { store } from './src/store';

  export default {
    store,
    components : {
      TableComponent
    },
    computed : {
      ...mapState(['timer', 'result'])
    },
    methods: {

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
