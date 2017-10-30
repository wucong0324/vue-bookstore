<template>
    <router-link :to="{path: `/detail/${like}`}" tag="div">
        <div class="img">
            <img v-lazy="bookDetail.images" :alt="bookDetail.name" @error="loadImg($event)">
        </div>
        <p class="name">{{bookDetail.name}}</p>
    </router-link>
</template>
<script type="text/ecmascript-6">
    import imgUrl from '../../common/images/error_img.jpg'
    export default {
        data() {
            return {
                bookDetail: {}
            }
        },
        props: {
            like: {
                type: String,
                required: true
            }
        },
        created(){
            this._getBookDetail(this.like);
        },
        methods: {
            _getBookDetail(id){
                this.$http.get(`http://39.108.14.248:3333/booklist?id=${id}`).then((res) => {
                    this.bookDetail = res.data;
                })
            },
            loadImg(e){
                e.target.src = imgUrl
            }
        },
        watch: {
            like(newVal, oldVal){
                this._getBookDetail(newVal);
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../common/style/base";
    @import "../../common/style/mixin";
    .img{
        width: 100px;
        img{
            width: 100%;
            height: 134px;
        }
    }
    .name{
        font-size: 14px;
        line-height: 20px;
        color: #888;
        @include no-wrap();
    }
</style>