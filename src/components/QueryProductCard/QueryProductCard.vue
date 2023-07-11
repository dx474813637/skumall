<template>
	<div class="card"> 
        <div class="bg"></div>
        <div class="card-header u-flex u-flex-between u-p-10 u-p-l-20 u-p-r-20">
            <div class="item u-flex">
                <div class="query-name u-m-r-10" @click="detailgoto">{{ origin.name }}</div>
                <el-tag  
                    type="warning" 
                    effect="dark"
                    size="small"
                    v-show="origin.status == '1'"
                >
                    激活
                </el-tag>
            </div>
            <div class="item u-flex ">
                <el-text type="info" >{{ origin.platform_company }}</el-text> 
            </div>
        </div>
        <div class="card-main u-flex u-flex-items-center u-p-20">
            <div class="item">
                <div>
                    <el-statistic :value="+origin.max_amount || 0" value-style="color:red"></el-statistic>
                </div>
                <div> 
                    <el-text type="info" >单用户最高额度(元)</el-text>
                </div>
            </div>
            <div class="item u-flex-1 u-m-l-10 u-m-r-10">
                <div class="data-wrap u-flex u-flex-between u-p-15" @click="detailgoto">
                    <div class="data-item">
                        <div class="data-title">银行利率(年化)</div>
                        <div class="data-value">{{ origin.annualized }}</div>
                    </div>
                    <el-divider direction="vertical" />
                    <div class="data-item">
                        <div class="data-title">所属银行</div>
                        <div class="data-value">{{ origin.bank_name }}</div>
                    </div>
                    <el-divider direction="vertical" />
                    <div class="data-item">
                        <div class="data-title">授信期限</div>
                        <div class="data-value">{{origin.credit_term}}{{ $filters.credit_mode2_str(origin.credit_mode) }}</div>
                    </div>
                    <el-divider direction="vertical" />
                    <div class="data-item">
                        <div class="data-title">贷款期限</div>
                        <div class="data-value">{{origin.loan_term}}{{ $filters.credit_mode2_str(origin.credit_mode) }}</div>
                    </div>
                </div>
            </div>
            <div class="item">
                <div class="u-flex u-flex-center u-m-b-10">
                    <el-button
                        type="primary"
                        @click="handlePaccBtn"
                        >预授信申请</el-button>
                    <el-button
                        class="u-m-l-30"
                        type="primary"
                        @click="handleOrderBtn"
                        >下单融资</el-button>
                </div>
                <div> 
                    <el-text size="small">专属融资，需向核心方申请后方可授信申请</el-text>
                </div>
            </div>
        </div>
	</div>
</template>

<script setup lang="ts"> 
import { ref, reactive, computed, watch } from 'vue';
import router from "@/router/guard"  
const props = defineProps({ 
	origin: {
		type: Object,
		default: () => ({})
	}, 
})  
const emits = defineEmits(['paccEvent', 'createOrderEvent'])

function detailgoto() {
    router.push({name: 'query_product', params: {id: props.origin.product_id}})
}
function handlePaccBtn() {
    // emits('paccEvent', props.origin)
    router.push({name: 'pacc_query_edit', params: {id: props.origin.product_id}})
}
function handleOrderBtn() {
    emits('createOrderEvent', props.origin)
    
}
</script>
<style lang="scss" scoped>
.card {
    box-shadow: 0 5px 6px rgba(0,0,0,.05);
    border-radius: 8px; 
    position: relative; 
    .bg { 
        position: absolute;
        left: 0;
        top: -4px;
        width: 100%;
        height: 20px;
        border-radius: 8px;
        background-color: var(--el-color-primary-dark-2);
        z-index: 10;
    }
    .card-header {
        background-color: var(--el-color-primary-light-9);
        border-radius: 8px 8px 0 0;
        position: relative; 
        z-index: 20;
        .query-name {
            cursor: pointer;
        }
    }
    .card-main {
        
    }
    .data-wrap {
        background-color: #fff5f3;
        border-radius: 10px;
        cursor: pointer;
        .data-item {
            padding: 0 10px;
            .data-title {
                margin-bottom: 5px;
                font-size: 14px;
                font-weight: 400;
                color: #c2847c;
            }
            .data-value {
                font-size: 16px;
                color: #a2483c; 

            }
        }
    }
    .el-divider--vertical {
        height: 3em;
        border-color: #ffe2de;
    }
} 
</style>