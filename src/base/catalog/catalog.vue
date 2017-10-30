<template>
    <transition name="fade">
        <div class="catalog" v-show="showFlag" @click="hide">
            <div class="catalog-wrapper" @click.stop ref="catalogWrapper">
                <div>
                    <div class="catalog-title" @click="hide">
                        <i class="iconfont icon-fanhui"></i>
                        <span>目录</span>
                    </div>
                    <div class="content">
                        <p class="title-item border-1px"
                           v-for="(title, index) in titles"
                           @click="selectChapter(index)"
                        >{{index+1}}、{{title}}</p>
                    </div>
                </div>
            </div>
        </div>
    </transition>

</template>
<script type="text/ecmascript-6">
    import BScroll from 'better-scroll'
    import {api} from '@/common/js/config'
    import {mapMutations} from 'vuex'

    export default {
        data() {
            return {
                showFlag: false,
                titles: []
            }
        },
        props: {
            bookId: {
                type: String,
                required: true
            }
        },
        async mounted() {
            await this._getBookCatalog();
            this.$nextTick(() => {
                if (this.scroll) {
                    this.scroll.refresh();
                } else {
                    this.mainScroll();
                }
            })
        },
        updated() {
            this.$nextTick(() => {
                if (this.scroll) {
                    this.scroll.refresh();
                } else {
                    this.mainScroll();
                }
            })
        },
        methods: {
            _getBookCatalog(){
                this.$http.get(`${api.url}/titles?id=${this.bookId}`).then((res) => {
                    this.titles = res.data.titles.split('-');
                    this.setMaxChapter(this.titles.length)
                })
            },
            show(){
                this.showFlag = true;
            },
            hide(){
                this.showFlag = false;
            },
            mainScroll(){
                this.scroll = new BScroll(this.$refs.catalogWrapper, {
                    probeType: 1,
                    click: true
                });
            },
            selectChapter(index){
                this.hide();
                this.setCurrentChapter(index+1);
            },
            ...mapMutations({
                setMaxChapter: 'SET_MAX_CHAPTER',
                setCurrentChapter: 'SET_CURRENT_CHAPTER'
            })
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../common/style/base";
    @import "../../common/style/mixin";
    @import "catalog";
</style>