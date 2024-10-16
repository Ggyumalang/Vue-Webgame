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
            const rootData = this.$parent.$parent.$parent.$data;
            console.log(this.rowIndex)
            console.log(this.cellIndex)
            //강의인 vue2에서는 $root 를 썼는데.. vue3는 아마도 막힌 것 같다 $root.$data.turn 은 아무 값도 불러오지 못한다.
            console.log(rootData.turn)
            console.log(this.$parent.$data)
            // 원래는 인덱스를 사용해 데이터를 바꾸면 vue 에서는 반영이 안된다. 즉, 화면이 안 뿌려진다고 하는데 vue3에서는 가능함
            // rootData.tableData[this.rowIndex][this.cellIndex] = rootData.turn
            // 아래처럼 this.$set(바꿀 행위치, 열위치, 변경할 값) 이것 또한 vue2에서만 가능해보임
            // this.$set(rootData.tableData[this.rowIndex], this.cellIndex, rootData.turn)
            rootData.tableData[this.rowIndex][this.cellIndex] = rootData.turn
            rootData.turn = rootData.turn === 'O' ? 'X' : 'O';
        }
    }
}
</script>
