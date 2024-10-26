<template>
    <td @click="onClickTd"> {{ cellData }}</td>
</template>
<script>
import EventBus from './EventBus';
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
            EventBus.emit("clickTd", this.rowIndex, this.cellIndex);

        }
    }
}
</script>
