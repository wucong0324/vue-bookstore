<template>
    <div class="recommend clearfix">
        <h1 class="title">{{title}}</h1>
        <div class="list-wrapper">
            <div class="wrapper" ref="listWrapper">
                <ul class="list" ref="list">
                    <router-link class="list-item"
                                 v-for="(book, index) in bookList"
                                 :key="index"
                                 tag="li"
                                 :to="{path: `/detail/${book.id}`}"
                    >
                        <img v-lazy="book.images" :alt="book.name">
                        <p class="name">{{book.name}}</p>
                        <p class="author">{{book.author}}</p>
                    </router-link>
                </ul>
            </div>

        </div>
    </div>
</template>
<script type="text/ecmascript-6">
    import BScroll from 'better-scroll'

    export default {
        props: {
            bookList: {
                type: Array,
                default: null
            },
            title: {
                type: String,
                default: ''
            }
        },
        mounted() {
            this.$nextTick(() => {
                this.picsScroll();
            })
        },
        updated() {
            this.$nextTick(() => {
                this.picsScroll();
            })
        },
        methods: {
            picsScroll() {
                const PICWIDTH = 100;
                const MAEGIN = 5;
                let picLen = this.bookList.length;
                this.$refs.list.style.width = PICWIDTH * picLen + MAEGIN * (picLen - 1) + 'px';
                this.picSctoll = new BScroll(this.$refs.listWrapper, {
                    probeType: 1,
                    scrollX: true,
                    click: true
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../common/style/base";
    @import "../../common/style/mixin";
    @import "recommend";
</style>