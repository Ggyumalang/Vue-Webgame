<template>
    <table>
        <tr-component v-for="(rowData, index) in tableData" :row-index="index" :key="index"></tr-component>
    </table>
</template>
<script>
    import { mapState } from 'vuex/dist/vuex.cjs.js';
    import TrComponent from './TrComponent'

    export default {
        components : {
            TrComponent
        },
        computed : {
            ...mapState(['tableData'])            
        },
    }
</script>
<style scoped>

</style>
