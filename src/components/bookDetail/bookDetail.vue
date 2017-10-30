<template>
    <slide>
        <div class="book-detail">
            <div v-show="!loading" class="loading-content">
                <loading></loading>
            </div>
            <div v-show="loading">
                <div class="back border-1px" @click="back()">
                    <i class="iconfont icon-fanhui"></i>
                    <span>{{bookDetail.name}}</span>
                </div>
                <div class="detail-wrapper" ref="detailWrapper">
                    <div>
                        <lineBg></lineBg>
                        <div class="content">
                            <div class="detail-content">
                                <img v-lazy="bookDetail.images" :alt="bookDetail.name">
                                <div class="desc">
                                    <h1 class="name">{{bookDetail.name}}</h1>
                                    <p class="author">{{bookDetail.author}}</p>
                                    <p class="type">{{bookDetail.type}}</p>
                                    <p class="wordcount">
                                        <span>{{bookDetail.wordcount}}万字</span>
                                        <span class="serialize">{{bookDetail.serialize}}</span>
                                    </p>
                                    <rating :score="bookDetail.ratings"></rating>
                                </div>
                            </div>
                            <div class="btn border-1px">
                                <span @click="readBook" class="border-all-1px">免费试读</span>
                                <span @click="readBook" class="border-all-1px">开始阅读</span>
                                <span class="border-all-1px">加书架</span>
                            </div>
                            <p class="intro">{{bookDetail.intro}}</p>
                            <h1 class="like-title border-1px">猜你喜欢</h1>
                            <ul class="like-list">
                                <li class="like-item" v-for="(like, index) in likes" :key="index">
                                    <like :like="like"></like>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </slide>
</template>
<script type="text/ecmascript-6">
    import loading from '@/base/loading/loading'
    import slide from '@/base/slide/slide'
    import lineBg from '@/base/line/line'
    import rating from '@/base/rating/rating'
    import like from '@/base/like/like'

    import BScroll from 'better-scroll'
    import {api} from '@/common/js/config'

    export default {
        data() {
            return {
                loading: false,
                bookDetail: {},
                likes: []
            }
        },
       /* created() {
            this._getBookDetail(this.$route.params.id);
        },*/
        async mounted(){
            await this._getBookDetail(this.$route.params.id);
            setTimeout(() => {
                if (this.scroll) {
                    this.scroll.refresh();
                } else {
                    this.mainScroll();
                }
            }, 500)
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
            _getBookDetail(id) {
                this.$http.get(`${api.url}/booklist?id=${id}`).then((res) => {
                    this.bookDetail = res.data;
                    this.loading = true;
                    this.likes = res.data.like.split('-');
                })
            },
            back() {
                this.$router.back();
            },
            readBook(){
                this.$router.push({path: `/reader/${this.bookDetail.id}`})
            },
            mainScroll(){
                this.scroll = new BScroll(this.$refs.detailWrapper, {
                    probeType: 1,
                    click: true
                });
            },
        },
        watch: {
            '$route'(to, from) {
                this._getBookDetail(this.$route.params.id);
                this.$nextTick(() => {
                    if (this.scroll) {
                        this.scroll.refresh();
                        this.scroll.scrollTo(0, 0, 100);
                    } else {
                        this.mainScroll();
                        this.scroll.scrollTo(0, 0, 100);
                    }
                })
            }
        },
        components: {
            loading,
            slide,
            lineBg,
            rating,
            like
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../common/style/base";
    @import "../../common/style/mixin";
    @import "bookDetail";
</style>