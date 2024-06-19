<template>
    <div>
        <h1>{{ result }}</h1>
        <form @submit.prevent="onSubmitForm">
            <input maxlength="4" ref="inputVal" v-model="value" />
            <button>입력</button>
        </form>
        <div> 시도 : {{ tries.length }}</div>
        <ul>
            <li v-for="t in tries">
                <div>{{ t.try }}</div>
                <div>{{ t.result }}</div>
            </li>
        </ul>
    </div>
</template>
<script>

//일반 메서드.. 
const generateAnswer = () => {
    let digits = [];
    while (digits.length < 4) {
        const digit = Math.ceil(Math.random() * 9).toString();
        if (!digits.includes(digit)) {
            digits.push(digit);
        }
    }
    return digits.join(''); // 숫자가 아닌 문자열을 반환
}

export default ({
    data() {
        return {
            value : '',
            result : '',
            answer: generateAnswer(),
            tries : []
        }
    },
    methods : {
        onSubmitForm() {

            console.log(this.answer);
 
            if (this.value.length !== 4) {
                this.result = '4자리 숫자를 입력해주세요.';
                return;
            }
            if (!/^\d{4}$/.test(this.value)) {
                this.result = '숫자만 입력해주세요.';
                return;
            }

            if (this.value === this.answer) {
                this.result = `정답입니다! ${this.tries.length + 1}번 만에 맞추셨습니다.`;
                this.answer = generateAnswer();
                this.tries.push({
                    try : this.value,
                    result : '홈런',
                });
                alert('게임을 다시 시작합니다.');
                this.tries = [];
            } else {

                if(this.tries.length >= 9) {
                    this.result = `10번 넘게 틀려서 실패! 답은 ${this.answer}입니다!`;
                    alert('게임을 다시 시작합니다.');
                    this.tries = [];
                    this.value = '';
                    this.answer = generateAnswer(); 
                    this.$refs.inputVal.focus();
                } else {
                    let strike = 0;
                    let ball = 0;

                    const answerArr = this.value.split('').map(v => parseInt(v));
                    for(let i = 0 ; i < 4; i++) {
                        if(answerArr[i] === this.answer[i]) {
                            strike++;
                        } else if(this.answer.includes(answerArr[i])) {
                            ball++;
                        }
                    }
                    this.result = `실패입니다.`;
                    this.tries.push({
                        try : this.value,
                        result : `${strike} 스트라이크 ${ball} 볼 입니다.`,
                    });
                }
            }
            
            this.$refs.inputVal.focus();
            this.value = ''; 
        },
    }
})
</script>
<style>

</style>
