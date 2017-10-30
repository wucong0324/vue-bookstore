<template>
    <transition name="fade">
        <div class="menu" v-show="showNav">
            <div class="menu-list">
                <div class="menu-item" @click="showCatalog">
                    <i class="iconfont icon-caidan"></i>
                    <p>目录</p>
                </div>
                <div class="menu-item" @click="toggleSelectFont">
                    <i class="iconfont icon-icon-yxj-font"></i>
                    <p>字号</p>
                </div>
                <div class="menu-item" @click="toggleMode">
                    <i class="iconfont" :class="modeClass"></i>
                    <p>模式</p>
                </div>
            </div>
            <selectFont ref="selectFont"></selectFont>
        </div>
    </transition>
</template>
<script type="text/ecmascript-6">
    import selectFont from '@/base/selectFont/selectFont'
    import {mapGetters, mapActions} from 'vuex'

    export default {
        data() {
            return {}
        },
        methods: {
            showCatalog() {
                this.$emit('showCatalog')
            },
            showSelectFont() {
                this.$refs.selectFont.toggleShow();
            },
            ...mapActions([
                'toggleSelectFont',
                'toggleMode'
            ])
        },
        computed: {
            ...mapGetters([
                'showNav',
                'modeNight'
            ]),
            modeClass() {
                return this.modeNight ? 'icon-yejianmoshi-dianjiguozhuangtai' : 'icon-mianbanbaitian'
            }
        },
        components: {
            selectFont
        }
    }
</script>
<style lang="scss" scoped>
    .menu {
        position: absolute;
        z-index: 10;
        bottom: 0;
        left: 0;
        width: 100%;
        background: rgba(0, 0, 0, .8);
        color: #fff;
        opacity: 1;
        .menu-list {
            display: flex;
            text-align: center;
        }
        .menu-item {
            flex: 1;
            padding: 10px 0;
            p {
                margin-top: 5px;
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