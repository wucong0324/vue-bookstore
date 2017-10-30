<template>
    <div class="loading">
        <img src="./loading.gif">
        <p>{{title}}</p>
    </div>
</template>
<script type="text/ecmascript-6">

    export default {
        props: {
            title: {
                type: String,
                default: '正在载入……'
            }
        }
    }
</script>
<style lang="scss" scoped>
    .loading{
        width: 100%;
        text-align: center;
        img{
            width: 24px;
            height: 24px;
        }
        p{
            line-height: 20px;
            font-size: 14px;
        }
    }
</style>