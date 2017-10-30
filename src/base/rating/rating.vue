<template>
    <div class="rating">
        <span class="rating-item" v-for="itemClass in itemClasses" :class="itemClass"></span>
        <span class="score">{{score}}</span>
    </div>
</template>
<script type="text/ecmascript-6">
    const LENGTH = 5;
    const CLS_ON = 'on';
    const CLS_HALF = 'half';
    const CLS_OFF = 'off';

    export default {
        props: {
            score: {
                type: Number,
                default: 0
            }
        },
        computed: {
            itemClasses() {
                let result = [];
                let score = Math.floor(this.score * 2) / 2;
                let hasDecimal = score % 1 != 0;
                let integer = Math.floor(score);
                for (let i = 0; i < integer; i++) {
                    result.push(CLS_ON)
                }
                if(hasDecimal){
                    result.push(CLS_HALF)
                }
                while (result.length < LENGTH){
                    result.push(CLS_OFF)
                }
                return result
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../common/style/base";
    @import "../../common/style/mixin";
    .rating{
        font-size: 0;
        margin-top: 10px;
    }
    .rating-item{
        display: inline-block;
        vertical-align: middle;
        @include wh(15px, 15px);
        margin-right: 2px;
        &.on{
            background: url("./star_on.png") no-repeat center center/cover;
        }
        &.off{
            background: url("./star_off.png") no-repeat center center/cover;
        }
        &.half{
            background: url("./star_half.png") no-repeat center center/cover;
        }
    }
    .score{
        display: inline-block;
        vertical-align: middle;
        margin-left: 10px;
        font-size: 15px;
        line-height: 20px;
        color: #999;
        position: relative;
        top: 1px;
    }
</style>