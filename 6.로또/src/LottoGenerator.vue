<template>
    <div>
        <div>당첨 숫자</div>
        <div id="resultWindow">
            <lotto-ball v-for="ball in winBalls" :key="ball" :number="ball"/>
        </div>
        <div>보너스</div>        
        <lotto-ball v-if="bonusBall" :number="bonusBall"/>
        <button v-if="redo" @click="onClickRedo">한 번 더!</button>
    </div>
</template>
<script>
import LottoBall from './LottoBall'

const timeouts = [];
//아무 숫자나 7개 뽑기
function getWinNumbers() {
    console.log('getWinNumbers');
    const candidate = Array(45).fill().map((v,i) => i + 1);
    const shuffle = [];
    while (candidate.length > 0) {
        shuffle.push(candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]);
    }
    const bonusNumber = shuffle[shuffle.length-1];
    const winNumbers = shuffle.slice(0,6).sort((p,c) => p-c);
    console.log(winNumbers);
    return [...winNumbers, bonusNumber];
}

export default {
  components: { 
    'lotto-ball': LottoBall //호환이 되기 때문에 LottoBall 만 적어줘도 됩니다.
  },
    data() {
        return {
            winNumbers: getWinNumbers(), //처음으로 미리 값을 뽑음
            winBalls: [], //하나씩 뽑기 위함
            bonusBall: null,
            redo: false, //한번 더            
        }

    },
    computed: {

    },
    methods: {
        onClickRedo() {
            this.winNumbers = getWinNumbers();
            this.winBalls = [];
            this.bonusBall = null;
            this.redo = false;
            this.showBalls();
        },
        showBalls() {
            for(let i = 0; i < this.winNumbers.length - 1; i++) {
                timeouts[i] = setTimeout(() => {
                    this.winBalls.push(this.winNumbers[i]);
                }, (i + 1) * 1000)
            }
            timeouts[6] = setTimeout(() => {
                this.bonusBall = this.winNumbers[6];
                this.redo = true;
            }, 7000)
        }
    },
    mounted() {
        this.showBalls();
    },
    beforeDestroy() {
        timeouts.forEach((t) => {
            clearTimeout(t);
        })
    },
    watch() {

    }
}
    

</script>
<style scoped>

</style>
