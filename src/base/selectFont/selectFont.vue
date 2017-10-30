<template>
    <transition name="fade">
        <div class="font" v-show="showSelectFont">
            <div class="size">
                <span class="text">字号</span>
                <div class="size-list">
                    <span @click="addFontSize">大</span>
                    <span @click="subFontSize">小</span>
                </div>
            </div>
            <div class="color">
                <span class="text">背景</span>
                <div class="color-list">
                    <span v-for="(item, index) in 6" :key="index"
                          :class="currentColor === index ? 'active' : ''"
                          @click="changeTheme(index)"
                    ></span>
                </div>
            </div>
        </div>
    </transition>
</template>
<script type="text/ecmascript-6">
    import {mapGetters, mapMutations} from 'vuex'

    export default {
        data() {
            return {}
        },
        methods: {
            changeTheme(index){
                this.setCurrentColor(index);
            },
            ...mapMutations({
                setCurrentColor: 'SET_CURRENT_COLOR',
                addFontSize: 'ADD_FONT_SIZE',
                subFontSize: 'SUB_FONT_SIZE'
            })
        },
        computed: {
            ...mapGetters([
                'showSelectFont',
                'currentColor'
            ])
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../common/style/base";
    @import "../../common/style/mixin";

    .font {
        position: absolute;
        top: -118px;
        left: 0;
        width: 100%;
        padding: 20px 10px;
        box-sizing: border-box;
        background: rgba(0, 0, 0, .8);
        color: #fff;
        opacity: 1;
        .size, .color {
            position: relative;
            padding-left: 60px;
            .text {
                font-size: 14px;
                line-height: 28px;
                position: absolute;
                top: 0;
                left: 10px;
            }
        }
        .size {
            margin-bottom: 20px;
        }
        .size-list {
            font-size: 0;
            span {
                box-sizing: border-box;
                display: inline-block;
                font-size: 14px;
                width: 80px;
                text-align: center;
                line-height: 28px;
                border-radius: 15px;
                border: 1px solid #fff;
                &:first-child {
                    margin-right: 10px;
                }
            }
        }
        .color-list {
            font-size: 0;
            span {
                box-sizing: border-box;
                display: inline-block;
                @include wh(28px, 28px);
                border-radius: 50%;
                background: #fff;
                margin-right: 8px;
                border: 1px solid transparent;
                &.active {
                    border: 1px solid #ff7800;
                }
                &:nth-child(1) {
                    background: $reader-bg01;
                }
                &:nth-child(2) {
                    background: $reader-bg02;
                }
                &:nth-child(3) {
                    background: $reader-bg03;
                }
                &:nth-child(4) {
                    background: $reader-bg04;
                }
                &:nth-child(5) {
                    background: $reader-bg05;
                }
                &:nth-child(6) {
                    background: $reader-bg06;
                }
                &:last-child {
                    margin-right: 0;
                }
            }
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: all .3s;
    }

    .fade-enter, .fade-leave-to {
        opacity: 0;
        transform: translate3d(0, 100%, 0);
    }
</style>