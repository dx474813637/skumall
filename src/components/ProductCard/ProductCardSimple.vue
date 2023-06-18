<template>
	<div class="product-card">
		<div class="product-img">
			<el-image lazy src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" fit="cover" /> 
			<div class="product-btns u-flex u-font-12">
				<div class="item u-flex-1">
					<span>友盟鞋业 2023</span>
				</div> 
			</div>
		</div>
		<div class="product-content u-p-l-10 u-p-r-10 u-p-b-10 u-p-t-5">
			<div class="content-item">
				<div class="item">
					<div class="price">
						<div class="price-unit u-font-14">￥</div>
						<div class="price-num">
							<el-statistic :value="89" :precision="2" value-style="color: #ff0000"></el-statistic>
						</div>
					</div>
				</div>
				<div class="item product-eva">
					<div class="u-m-r-4">已售</div>
					<div class="product-eva-num">999+</div>
				</div>
			</div>
			  
		</div>
	</div>
</template>

<script setup lang="ts"></script>
<style lang="scss" scoped>
.product-card {
	width: 100%;
	border-radius: 5px;
	background-color: #fff;
	transition: all .2s;
	// box-shadow: 0 0 20px rgba(0, 0, 0, 0);
	&:hover {
		// box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
	}
	.product-content {
		.content-item {
			width: 100%;
			@include flex(x, between);
            margin-bottom: 3px;
			.item {
				&.product-title {
                    font-size: 14px;
                    color: #666;
					width: 100%;
                    cursor: pointer;
                    &:hover {
                        color: $uni-color-primary;
                    }
				}
				&.product-eva {
                    color: #999;
                    @include flex(x);
                    font-size: 12px;
                    .product-eva-num {
                        color: $uni-color-paragraph;
                        font-weight: bold;
                        cursor: pointer;
                    }
				}
                &.shop-name {
                    color: #999;
                    font-size: 12px;
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
                        font-size: 15px; 
						font-weight: bold;
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
		border-radius: 5px ;
		cursor: pointer;
		.el-image {
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			transition: all .5s;
		}
		&:after {
			content: '';
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0,0,0,.05);
			z-index: 19;
		}
		.product-btns {
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 30px;
			background-color: rgba(0, 122, 255,70%);
			color: #fff;
			z-index: 20;
			transform: translateY(100%);
			transition: all .2s;
			.item {
				@include flex(x, center, center);  
				height: 100%;
				transition: all .2s;
				&:hover {
					background-color: $uni-color-primary;
				}
			}
		}
	}
	
	&:hover {
		.product-img {
			img {
				transform: scale(1.2);
				transition-duration: .2s;
			}
			.product-btns {
				transform: translateY(0);
			}
		}
			
	}
}
</style>
