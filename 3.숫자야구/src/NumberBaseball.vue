<template>
    <div>
        <h1>{{ result }}</h1>
        <form @submit="onSubmitForm">
            <input maxlength="4" ref="inputVal" v-model="value" />
            <button>입력</button>
        </form>
        <div> 시도 : {{ tryNumber }}</div>
        <div> {{ strikeNumber }} 스트라이크 {{ ballNumber }} 볼입니다.</div>
    </div>
</template>
<script>
export default ({
    data() {
        return {
            value : '',
            result : '',
            answer: this.generateAnswer(),
            tryNumber : 0,
            strikeNumber : 0,
            ballNumber : 0,
        }
    },
    methods : {
        generateAnswer() {
            let digits = [];
            while (digits.length < 4) {
                const digit = Math.ceil(Math.random() * 9).toString();
                if (!digits.includes(digit)) {
                    digits.push(digit);
                }
            }
            return digits.join(''); // 숫자가 아닌 문자열을 반환
        },

        onSubmitForm(e) {
            e.preventDefault();
            if (this.value.length !== 4) {
                this.result = '4자리 숫자를 입력해주세요.';
                return;
            }
            if (!/^\d{4}$/.test(this.value)) {
                this.result = '숫자만 입력해주세요.';
                return;
            }
            this.checkAnswer();
            this.tryNumber++;

            if (this.strikeNumber === 4) {
                this.result = `정답입니다! ${this.tryNumber}번 만에 맞추셨습니다.`;
                this.answer = this.generateAnswer();
                this.tryNumber = 0;
            } else {
                this.result = `${this.strikeNumber} 스트라이크, ${this.ballNumber} 볼입니다.`;
            }
            this.value = '';
        },

        checkAnswer() {
            console.log(this.answer);
            this.strikeNumber = 0;
            this.ballNumber = 0;

            const answerArray = this.answer.split('');
            const valueArray = this.value.split('');

            //스트라이크 및 볼 개수 계산하기
            for(let i = 0; i < 4; i++) {
                
                console.log("valueArray >>> ", valueArray[i]);
                console.log("answerArray >>> ", answerArray[i]);

                if(valueArray[i] === answerArray[i]) {
                    this.strikeNumber++;
                } else if(answerArray.includes(valueArray[i])) {
                    this.ballNumber++;
                }
            }
        }
    }
})
</script>
<style>

</style>
