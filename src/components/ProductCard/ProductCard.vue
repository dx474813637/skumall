<template>
	<div class="product-card u-p-10">
		<div class="product-img">
			<img
				src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
				alt=""
			/>
		</div>
		<div class="product-content u-p-t-5">
			<div class="content-item">
				<div class="item">
					<div class="price">
						<div class="price-unit">￥</div>
						<div class="price-num"><el-statistic :value="98500" :precision="2" value-style="color: #ff0000"></el-statistic></div>
					</div>
				</div>
				<div class="item"></div>
			</div>
			<div class="content-item">
				<div class="item product-title u-line-2">
					威尔胜（Wilson）篮球 NBA比赛室内外耐磨PU防滑蓝球7号
					TAKE-OFF系列-实战利器801
				</div>
			</div>
			<div class="content-item">
				<div class="item product-eva">
					<div class="product-eva-num">5000+</div>
					<div>条评价</div>
				</div>
			</div>
			<div class="content-item">
				<div class="item shop-name">威尔胜（Wilson）京东自营专区</div>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts"></script>
<style lang="scss" scoped>
.product-card {
	&:hover {
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
	}
	.product-content {
		.content-item {
			@include flex(x, between);
            margin-bottom: 3px;
			.item {
				&.product-title {
                    font-size: 14px;
                    color: #666;
                    cursor: pointer;
                    &:hover {
                        color: $uni-color-primary;
                    }
				}
				&.product-eva {
                    color: #999;
                    @include flex(x);
                    font-size: 14px;
                    .product-eva-num {
                        color: $uni-color-paragraph;
                        font-weight: bold;
                        cursor: pointer;
                    }
				}
                &.shop-name {
                    color: #999;
                    font-size: 14px;
                    cursor: pointer;
                    &:hover {
                        color: $uni-color-primary;
                    }
                }
				.price {
                    color: $uni-color-error;
                    @include flex(x, start, baseline);
					.price-unit {
					}
					.price-num {
                        font-size: 18px; 
					}
				}
			}
		}
	}
	.product-img {
		width: 100%;
		padding-top: 100%;
		position: relative;
		overflow: hidden;
		border-radius: 5px;
		cursor: pointer;
		&:hover {
			img {
				transform: scale(1.05);
			}
		}
		img {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			transition: all .5s;
		}
	}
}
</style>
