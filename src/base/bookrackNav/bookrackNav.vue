<template>
    <transition name="fade">
        <div class="bookrack" @click="back" v-show="showNav">
            <i class="iconfont icon-fanhui"></i>
            <span>返回书架</span>
        </div>
    </transition>
</template>
<script type="text/ecmascript-6">
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {}
        },
        methods: {
            back() {
                this.$emit('back')
            }
        },
        computed: {
            ...mapGetters([
                'showNav'
            ])
        },
    }
</script>
<style lang="scss" scoped>
    .bookrack {
        position: absolute;
        z-index: 10;
        top: 0;
        left: 0;
        width: 100%;
        background: rgba(0, 0, 0, .8);
        color: #fff;
        padding: 0 10px;
        line-height: 48px;
        opacity: 1;
    }

    .fade-enter-active, .fade-leave-active {
        transition: all .3s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
        transform: translate3d(0, -100%, 0);
    }
</style>