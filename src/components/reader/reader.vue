<template>
    <div class="reader">
        <div v-show="!loading" class="loading-content">
            <loading></loading>
        </div>
        <div v-show="loading">
            <bookrackNav @back="back" ref="bookrackNav"></bookrackNav>
            <div class="reader-wrapper"
                 ref="readerWrapper"
                 @click="toggleNav"
                 :bgColor="currentColor"
                 :mode="modeNight"
            >
                <div class="reader-content">
                    <h1 class="title border-1px">{{book.title}}</h1>
                    <div class="content" ref="content">
                        <p v-for="(item, index) in book.content" :key="index">{{item}}</p>
                    </div>
                    <div class="tab">
                        <span @click.stop="prev">上一章</span>
                        <span @click.stop="next">下一章</span>
                    </div>
                </div>
            </div>
            <readerMenu @showCatalog="showCatalog" ref="readerMenu"></readerMenu>
            <catalog :bookId="$route.params.id" ref="catalog"></catalog>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import loading from '@/base/loading/loading'
    import catalog from '@/base/catalog/catalog'
    import bookrackNav from '@/base/bookrackNav/bookrackNav'
    import readerMenu from '@/base/readerMenu/readerMenu'

    import BScroll from 'better-scroll'
    import {api} from '@/common/js/config'
    import {loadReader, saveReader} from '@/common/js/cache'

    import {mapMutations, mapActions, mapGetters} from 'vuex'

    export default {
        data() {
            return {
                loading: false,
                book: {},
                bookReadInfo: {}
            }
        },
        created(){
            this._initReader();
        },
        mounted(){
            this.$nextTick(() => {
                if (this.scroll) {
                    this.scroll.refresh();
                } else {
                    this.mainScroll();
                }
            })
        },
        updated(){
            this.$nextTick(() => {
                if (this.scroll) {
                    this.scroll.refresh();
                } else {
                    this.mainScroll();
                }
            })
        },
        methods: {
            _getBook(id, chapter){
                this.loading = false;
                this.$http.get(`${api.url}/book?book=${id}&id=${chapter}`).then((res) => {
                    this.book = res.data;
                    this.book.content = res.data.content.split('-');
                    this.loading = true
                })
            },
            _initReader(){
                let id = this.$route.params.id;
                //  获取本地存储字体大小
                if(typeof (loadReader('size')) === 'number'){
                    this.setFontSize(loadReader('size'))
                }
                //  获取本地存储主题颜色
                if(typeof (loadReader('theme')) === 'number'){
                    this.setCurrentColor(loadReader('theme'))
                }
                const info = loadReader('readInfo');
                //  本地获取读过的书，如果有，且读过这边书
                if(JSON.stringify(info) !== '[]' && info[id]){
                    this.bookReadInfo = loadReader('readInfo');
                    this._getBook(id, this.bookReadInfo[id].chapter);
                    this.setCurrentChapter(this.bookReadInfo[id].chapter);
                }else if(JSON.stringify(info) !== '[]'){
                    //  如果有，没有读过这本书
                    this.bookReadInfo = loadReader('readInfo');
                    this._getBook(id, 1);
                    this.setCurrentChapter(1);
                }else {
                    //  第一次进入
                    this.bookReadInfo[id] = {
                        book: id,
                        chapter: this.currentChapter
                    };
                    this._getBook(id, 1);
                    this.setCurrentChapter(1);
                }

            },
            mainScroll(){
                this.scroll = new BScroll(this.$refs.readerWrapper, {
                    probeType: 1,
                    click: true
                });
            },
            back(){
                this.$router.back();
                this.toggleNav();
            },
            showCatalog(){
                this.$refs.catalog.show();
            },
            prev(){
                this.prevChapter();
                this.savaBookInfo();
            },
            next(){
                this.nextChapter(this.maxChapter);
                this.savaBookInfo();
            },
            savaBookInfo(){
                let id = this.$route.params.id;
                this.bookReadInfo[id] = {
                    book: id,
                    chapter: this.currentChapter
                };
                saveReader('readInfo', this.bookReadInfo);
            },
            ...mapActions([
                'toggleNav'
            ]),
            ...mapMutations({
                setFontSize: 'SET_FONT_SIZE',
                setCurrentColor: 'SET_CURRENT_COLOR',
                setCurrentChapter: 'SET_CURRENT_CHAPTER',
                prevChapter: 'PREV_CHAPTER',
                nextChapter: 'NEXT_CHAPTER'
            })
        },
        computed: {
            ...mapGetters([
                'currentColor',
                'modeNight',
                'fontSize',
                'currentChapter',
                'maxChapter'
            ])
        },
        watch: {
            fontSize(newVal, oldVal){
                this.$refs.content.style.fontSize = `${this.fontSize}px`;
                this.$nextTick(() => {
                    if (this.scroll) {
                        this.scroll.refresh();
                    } else {
                        this.mainScroll();
                    }
                })
            },
            currentChapter(newVal, oldVal){
                let id = this.$route.params.id;
                this._getBook(id, this.currentChapter);
            }
        },
        components: {
            loading,
            catalog,
            readerMenu,
            bookrackNav
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../common/style/base";
    @import "../../common/style/mixin";
    @import "reader";
</style>