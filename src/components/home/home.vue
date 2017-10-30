<template>
    <div class="home">
        <div v-show="loading">
            <div class="header border-1px">
                <div class="txt">
                    <i class="iconfont icon-vuejs"></i>
                    <span>小说阅读器</span>
                </div>
                <div class="user" @click="showUser">
                    <img src="../../common/images/author.jpg" alt="dreaming">
                </div>
            </div>
            <div class="body-wrapper" ref="bodyWrapper">
                <div>
                    <p ref="dropDown" class="drop-down">下拉刷新</p>
                    <lineBg></lineBg>
                    <div class="swiper-wrapper">
                        <swiper :options="swiperOption">
                            <swiper-slide v-for="(slide,index) in swiperSlides" :key="index">
                                <img :src="slide" alt="index">
                            </swiper-slide>
                            <div class="swiper-pagination" slot="pagination"></div>
                        </swiper>
                    </div>
                    <ul class="tab-wrapper">
                        <router-link
                                class="tab-item"
                                tag="li"
                                :to="{path: 'types/'+type.tid}"
                                v-for="(type, index) in types"
                                :key="index"
                        >
                            <i class="iconfont" :class="type.icon"></i>
                            <h1>{{type.word}}</h1>
                        </router-link>
                    </ul>
                    <lineBg></lineBg>
                    <recommend :bookList="bookList | hot" title="排行榜"></recommend>
                    <lineBg></lineBg>
                    <bookList :bookList="bookList | free" title="限时免费"></bookList>
                    <lineBg></lineBg>
                    <bookList :bookList="bookList | end" title="人气完本"></bookList>
                    <lineBg></lineBg>
                    <recommend :bookList="bookList | news" title="新书速递"></recommend>
                    <lineBg></lineBg>
                    <recommend :bookList="bookList | top" title="编辑推荐"></recommend>
                    <p ref="loadMore" class="load-more">上滑加载更多</p>
                </div>
            </div>
            <div ref="alert" class="alert">刷新成功</div>
            <user ref="user"></user>
        </div>
        <div v-show="!loading" class="loading-content">
            <loading></loading>
        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import img01 from '../../common/images/1.jpg'
    import img02 from '../../common/images/2.jpg'
    import img03 from '../../common/images/3.jpg'
    import img04 from '../../common/images/4.jpg'
    import img05 from '../../common/images/5.jpg'
    import {swiper, swiperSlide} from 'vue-awesome-swiper'
    import recommend from '@/components/recommend/recommend'
    import bookList from '@/components/bookList/bookList'
    import user from '@/components/user/user'
    import lineBg from '@/base/line/line'
    import loading from '@/base/loading/loading'

    import BScroll from 'better-scroll'
    import {api} from '@/common/js/config'

    export default {
        data() {
            return {
                loading: false,
                swiperOption: {
                    autoplay: 4000,
                    loop: true,
                    initialSlide: 0,
                    autoplayDisableOnInteraction: false,
                    setWrapperSize: true,
                    spaceBetween: 1,
                    pagination: '.swiper-pagination',
                    paginationClickable: true,
                    mousewheelControl: true,
                    observeParents: true,
                },
                swiperSlides: [img01, img02, img03, img04, img05],
                types: [
                    {
                        tid: 1,
                        word: '玄幻',
                        icon: 'icon-xuanhuanyanqingcopy'
                    },
                    {
                        tid: 2,
                        word: '修真',
                        icon: 'icon-xianxiaqiyuancopy'
                    },
                    {
                        tid: 3,
                        word: '都市',
                        icon: 'icon-dushu'
                    },
                    {
                        tid: 4,
                        word: '历史',
                        icon: 'icon-lishi1'
                    },
                    {
                        tid: 5,
                        word: '网游',
                        icon: 'icon-wangyeyouxi'
                    },
                ],
                bookList: [],
            }
        },
        /*created() {
            this._getBookList();
        },*/
        async mounted() {
            await this._getBookList();
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
            _getBookList() {
                this.$http.get(`${api.url}/booklist`).then((res) => {
                    this.bookList = res.data;
                    this.loading = true;
                })
            },
            mainScroll() {
                this.scroll = new BScroll(this.$refs.bodyWrapper, {
                    probeType: 1,
                    click: true
                });
                this.scroll.on('scroll', (pos) => {
                    if(pos.y > 30){
                        this.$refs.dropDown.innerHTML = '释放立即刷新'
                    }
                });
                this.scroll.on('touchEnd', (pos) => {
//                    console.log(this.scroll.maxScrollY);
//                    console.log(pos.y);
                    if(pos.y > 30){
                        setTimeout(() => {
                            this.$refs.dropDown.innerHTML = '下拉刷新';
                            this.$router.replace('/home');
                            this.refreshAlert('刷新成功');
                            this.$nextTick(() => {
                                this.scroll.refresh();
                            })
                        }, 1000)
                    }else if(pos.y < (this.scroll.maxScrollY - 30)){
                        this.$refs.loadMore.innerHTML = '<i></i>加载中……';
                        setTimeout(() => {
                            this.$refs.loadMore.innerHTML = '上滑加载更多';
                            this.loadMore();
                            this.$nextTick(() => {
                                this.scroll.refresh();
                            })
                        }, 1000)
                    }
                })
            },
            showUser(){
                this.$refs.user.show();
            },
            refreshAlert(text){
                text = text || '操作成功';
                this.$refs.alert.style.display = 'block';
                setTimeout(() => {
                    this.$refs.alert.style.display = 'none';
                }, 1000)
            },
            loadMore(){
                console.log('加载完成')
            }
        },
        filters: {
            hot(value) {
                if (!value) {
                    return ''
                }
                let arr = [];
                value.forEach((item, index) => {
                    if (index < 20 && index % 2 === 1) {
                        arr.push(item)
                    }
                });
                return arr
            },
            free(value) {
                if (!value) {
                    return ''
                }
                let arr = [];
                value.forEach((item, index) => {
                    if (index < 30 && index % 5 === 1) {
                        arr.push(item)
                    }
                });
                return arr.splice(2, 5)
            },
            end(value) {
                if (!value) {
                    return ''
                }
                let arr = [];
                value.forEach((item, index) => {
                    if (item.serialize === '完本') {
                        arr.push(item)
                    }
                });
                return arr
            },
            news(value) {
                if (!value) {
                    return '';
                }
                let arr = [];
                value.forEach((item, index) => {
                    if (index < 20 && index % 3 === 0) {
                        arr.push(item)
                    }
                });
                return arr
            },
            top(value){
                if(!value){
                    return ''
                }
                let arr = [];
                value.forEach((item, index) => {
                    if(index < 30 && index % 4 === 1){
                        arr.push(item)
                    }
                });
                return arr
            }
        },
        components: {
            swiper,
            swiperSlide,
            recommend,
            bookList,
            user,
            lineBg,
            loading
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../common/style/base";
    @import "../../common/style/mixin";
    @import "home";
</style>