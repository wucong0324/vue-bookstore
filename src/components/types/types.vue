<template>
    <slide>
        <div class="types">
            <div v-show="!loading" class="loading-content">
                <loading></loading>
            </div>
            <div v-show="loading">
                <div class="back border-1px" @click="back()">
                    <i class="iconfont icon-fanhui"></i>
                    <span>{{getTitle}}</span>
                </div>
                <div class="type-wrapper" ref="typeWrapper">
                    <div>
                        <p ref="dropDown" class="drop-down">下拉刷新</p>
                        <lineBg></lineBg>
                        <bookList :bookList="typeBookList" display="none"></bookList>
                        <p ref="loadMore" class="load-more">上滑加载更多</p>
                    </div>
                </div>
                <div ref="alert" class="alert">刷新成功</div>
            </div>
        </div>
    </slide>
</template>
<script type="text/ecmascript-6">
    import loading from '@/base/loading/loading'
    import lineBg from '@/base/line/line'
    import bookList from '@/components/bookList/bookList'
    import slide from '@/base/slide/slide'
    import {api} from '@/common/js/config'

    import BScroll from 'better-scroll'

    export default {
        data() {
            return {
                typeBookList: [],
                loading: false
            }
        },
        /*created() {
            this._getTypeBook(this.$route.params.id)
        },*/
        async mounted() {
            await this._getTypeBook(this.$route.params.id);
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
            _getTypeBook(type) {
                this.$http.get(`${api.url}/type?type=${type}`).then((res) => {
                    this.typeBookList = res.data;
                    this.loading = true;
                })
            },
            back() {
                this.$router.back();
            },
            mainScroll() {
                this.scroll = new BScroll(this.$refs.typeWrapper, {
                    probeType: 1,
                    click: true
                });
                this.scroll.on('scroll', (pos) => {
                    if (pos.y > 30) {
                        this.$refs.dropDown.innerHTML = '释放立即刷新'
                    }
                });
                this.scroll.on('touchEnd', (pos) => {
//                    console.log(this.scroll.maxScrollY);
//                    console.log(pos.y);
                    if (pos.y > 30) {
                        setTimeout(() => {
                            this.$refs.dropDown.innerHTML = '下拉刷新';
//                            this.$router.replace(`/type${this.$route.params.id}`);
                            this.refreshAlert('刷新成功');
                            this.$nextTick(() => {
                                this.scroll.refresh();
                            })
                        }, 1000)
                    } else if (pos.y < (this.scroll.maxScrollY - 30)) {
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
            refreshAlert(text) {
                text = text || '操作成功';
                this.$refs.alert.style.display = 'block';
                setTimeout(() => {
                    this.$refs.alert.style.display = 'none';
                }, 1000)
            },
            loadMore() {
                console.log('加载完成')
            }
        },
        computed: {
            getTitle() {
                switch (this.$route.params.id) {
                    case '1':
                        return '玄幻';
                        break;
                    case '2':
                        return '修真';
                        break;
                    case '3':
                        return '都市';
                        break;
                    case '4':
                        return '历史';
                        break;
                    case '5':
                        return '网游';
                        break;
                    default:
                        return '分类'
                }
            }
        },
        components: {
            loading,
            bookList,
            lineBg,
            slide
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../common/style/base";
    @import "../../common/style/mixin";
    @import "types";
</style>