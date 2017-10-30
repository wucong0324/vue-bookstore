<template>
    <transition name="slide">
        <div class="user" v-show="showFlag">
            <canvas id="canvas" :style="{'background-image': 'url('+bgImg+')'}"></canvas>
            <i class="iconfont icon-fanhui back" @click="hide"></i>
            <div class="user-info">
                <div>
                    <img src="../../common/images/author.jpg" alt="dreaming">
                    <h1>Dreaming</h1>
                    <!--<p>GitHub:https://github.com/wucong0324</p>
                    <p>邮箱:792113294@qq.com</p>-->
                </div>
            </div>
            <div class="user-wrapper" ref="userWrapper">
                <div>
                    <ul>
                        <li class="border-1px">
                            <i class="iconfont icon-lishi1"></i>
                            <span>阅读分析</span>
                            <i class="iconfont icon-fanhui"></i>
                        </li>
                        <li class="border-1px">
                            <i class="iconfont icon-dushu"></i>
                            <span>我的书架</span>
                            <i class="iconfont icon-fanhui"></i>
                        </li>
                        <li class="border-1px">
                            <i class="iconfont icon-xianxiaqiyuancopy"></i>
                            <span>我的收藏</span>
                            <i class="iconfont icon-fanhui"></i>
                        </li>
                    </ul>
                    <lineBg></lineBg>
                    <ul>
                        <li class="border-1px">
                            <i class="iconfont icon-xuanhuanyanqingcopy"></i>
                            <span>好友圈</span>
                            <i class="iconfont icon-fanhui"></i>
                        </li>
                        <li class="border-1px">
                            <i class="iconfont icon-lanmuzuozhe"></i>
                            <span>小说群组</span>
                            <i class="iconfont icon-fanhui"></i>
                        </li>
                    </ul>
                    <lineBg></lineBg>
                    <ul>
                        <li class="border-1px">
                            <i class="iconfont icon-wangyeyouxi"></i>
                            <span>雷达</span>
                            <i class="iconfont icon-fanhui"></i>
                        </li>
                        <li class="border-1px">
                            <i class="iconfont icon-mianbanbaitian"></i>
                            <span>同城活动</span>
                            <i class="iconfont icon-fanhui"></i>
                        </li>
                        <li class="border-1px">
                            <i class="iconfont icon-iconfontfanhuidingbu"></i>
                            <span>游戏厅</span>
                            <i class="iconfont icon-fanhui"></i>
                        </li>
                    </ul>
                    <lineBg></lineBg>
                    <ul>
                        <li class="border-1px">
                            <i class="iconfont icon-caidan"></i>
                            <span>设置</span>
                            <i class="iconfont icon-fanhui"></i>
                        </li>
                    </ul>
                    <lineBg></lineBg>
                </div>
            </div>
        </div>
    </transition>
</template>
<script type="text/ecmascript-6">
    import lineBg from '@/base/line/line'
    import BScroll from 'better-scroll'
    import img from '@/common/images/timg.jpg'
    export default {
        data() {
            return {
                showFlag: false,
                bgImg: img
            }
        },
        mounted() {
            this._initCanvas();
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
            show() {
                this.showFlag = true
            },
            hide() {
                this.showFlag = false
            },
            _initCanvas() {
                let canvas = document.querySelector('canvas'),
                    ctx = canvas.getContext('2d')
                canvas.width = window.innerWidth;
                canvas.height = 230;
                ctx.lineWidth = .15;
                ctx.strokeStyle = (new Color(150)).style;
                let mousePosition = {
                    x: canvas.width - 80,
                    y: canvas.height - 50
                };

                let dots = {
                    nb: 50,
                    distance: 50,
                    d_radius: 200,
                    array: []
                };

                function colorValue(min) {
                    return Math.floor(Math.random() * 255 + min);
                }

                function createColorStyle(r, g, b) {
                    return 'rgba(' + r + ',' + g + ',' + b + ', 0.9)';
                }

                function mixComponents(comp1, weight1, comp2, weight2) {
                    return (comp1 * weight1 + comp2 * weight2) / (weight1 + weight2);
                }

                function averageColorStyles(dot1, dot2) {
                    var color1 = dot1.color,
                        color2 = dot2.color;

                    var r = mixComponents(color1.r, dot1.radius, color2.r, dot2.radius),
                        g = mixComponents(color1.g, dot1.radius, color2.g, dot2.radius),
                        b = mixComponents(color1.b, dot1.radius, color2.b, dot2.radius);
                    return createColorStyle(Math.floor(r), Math.floor(g), Math.floor(b));
                }

                function Color(min) {
                    min = min || 0;
                    this.r = colorValue(min);
                    this.g = colorValue(min);
                    this.b = colorValue(min);
                    this.style = createColorStyle(this.r, this.g, this.b);
                }

                function Dot() {
                    this.x = Math.random() * canvas.width;
                    this.y = Math.random() * canvas.height;

                    this.vx = -.5 + Math.random();
                    this.vy = -.5 + Math.random();

                    this.radius = Math.random() * 2;

                    this.color = new Color();
                }

                Dot.prototype = {
                    draw: function () {
                        ctx.beginPath();
                        ctx.fillStyle = this.color.style;
                        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
                        ctx.fill();
                    }
                };

                function createDots() {
                    for (let i = 0; i < dots.nb; i++) {
                        dots.array.push(new Dot());
                    }
                }

                function moveDots() {
                    for (let i = 0; i < dots.nb; i++) {

                        let dot = dots.array[i];

                        if (dot.y < 0 || dot.y > canvas.height) {
                            dot.vx = dot.vx;
                            dot.vy = -dot.vy;
                        }
                        else if (dot.x < 0 || dot.x > canvas.width) {
                            dot.vx = -dot.vx;
                            dot.vy = dot.vy;
                        }
                        dot.x += dot.vx;
                        dot.y += dot.vy;
                    }
                }

                function connectDots() {
                    for (let i = 0; i < dots.nb; i++) {
                        for (let j = 0; j < dots.nb; j++) {
                            let i_dot = dots.array[i];
                            let j_dot = dots.array[j];

                            if ((i_dot.x - j_dot.x) < dots.distance && (i_dot.y - j_dot.y) < dots.distance && (i_dot.x - j_dot.x) > -dots.distance && (i_dot.y - j_dot.y) > -dots.distance) {
                                if ((i_dot.x - mousePosition.x) < dots.d_radius && (i_dot.y - mousePosition.y) < dots.d_radius && (i_dot.x - mousePosition.x) > -dots.d_radius && (i_dot.y - mousePosition.y) > -dots.d_radius) {
                                    ctx.beginPath();
                                    ctx.strokeStyle = averageColorStyles(i_dot, j_dot);
                                    ctx.moveTo(i_dot.x, i_dot.y);
                                    ctx.lineTo(j_dot.x, j_dot.y);
                                    ctx.stroke();
                                    ctx.closePath();
                                }
                            }
                        }
                    }
                }

                function drawDots() {
                    for (let i = 0; i < dots.nb; i++) {
                        let dot = dots.array[i];
                        dot.draw();
                    }
                }

                function animateDots() {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    moveDots();
                    connectDots();
                    drawDots();

                    requestAnimationFrame(animateDots);
                }

                //----------------------跟着鼠标动--------------------
                document.getElementById('canvas').addEventListener('mousemove', function (e) {
                    mousePosition.x = e.pageX;
                    mousePosition.y = e.pageY;
                });

                document.getElementById('canvas').addEventListener('mouseleave', function (e) {
                    mousePosition.x = canvas.width / 2;
                    mousePosition.y = canvas.height / 2;
                });
                //----------------------跟着鼠标动--------------------

                createDots();
                requestAnimationFrame(animateDots);
            },
            mainScroll() {
                this.scroll = new BScroll(this.$refs.userWrapper, {
                    probeType: 1,
                    click: true
                });
            }
        },
        components: {
            lineBg
        }
    }
</script>
<style lang="scss" scoped>
    @import "../../common/style/base";
    @import "../../common/style/mixin";
    @import "user";
</style>