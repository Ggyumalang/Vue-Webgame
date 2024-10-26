<template>
    <tr>
        <td-component v-for="(cellData, index) in rowData" :cell-index="index" :row-index="rowIndex" :key="index"></td-component>
    </tr>
</template>
<script>
import { mapState } from 'vuex/dist/vuex.cjs.js';
import TdComponent from './TdComponent';
export default {
    components : {
        TdComponent
    },
    data() {
        return {
            parent: '부모 컴포넌트다'
        }
    },
    computed : {
        ...mapState({
            rowData(state) {
                return state.tableData[this.rowIndex];
            }
        })
    },
    props : {
        rowIndex: Number
    }
}
</script>
<style scoped>

</style>
