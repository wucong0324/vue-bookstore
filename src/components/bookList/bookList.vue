<template>
    <div class="bookList clearfix">
        <h1 class="title" :style="{display: display}">{{title}}</h1>
        <ul class="book-wrapper">
            <router-link class="book-item border-1px"
                         v-for="(book, index) in bookList"
                         :key="index"
                         tag="li"
                         :to="{path: `/detail/${book.id}`}"
            >
                <div class="book-img">
                    <img v-lazy="book.images" :alt="book.name">
                </div>
                <div class="book-detail">
                    <h2 class="name">{{book.name}}</h2>
                    <p class="intro">{{book.intro}}</p>
                    <div class="desc-wrapper">
                        <div class="author">
                            <i class="iconfont icon-lanmuzuozhe"></i>
                            <span>{{book.author}}</span>
                        </div>
                        <div class="desc">
                            <span class="yellow border-all-1px">{{book.type}}</span>
                            <span class="red border-all-1px">{{book.serialize}}</span>
                            <span class="blue border-all-1px">{{book.wordcount}}万</span>
                        </div>
                    </div>
                </div>
            </router-link>
        </ul>
    </div>
</template>
<script type="text/ecmascript-6">

    export default {
        props: {
            bookList: {
                type: Array,
                default: null
            },
            title: {
                type: String,
                default: ''
            },
            display: {
                type: String,
                default: 'block'
            }
        },
        components: {}
    }
</script>
<style lang="scss" scoped>
    @import "../../common/style/base";
    @import "../../common/style/mixin";
    @import "bookList";
</style>