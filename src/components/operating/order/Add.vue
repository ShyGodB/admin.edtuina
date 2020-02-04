<template>
    <div id="Order" class="bg-white">
        <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="用户手机" prop="userPhone">
                        <el-input v-model="ruleForm.userPhone"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="6">
                    <el-form-item label="订单类型" prop="orderType">
                        <el-select v-model="ruleForm.orderType" placeholder="请选择订单类型">
                            <el-option label="普通" value="普通"></el-option>
                            <el-option label="加单" value="加单"></el-option>
                            <el-option label="加钟" value="加钟"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="6" v-if="ruleForm.orderType && ruleForm.orderType !== '普通'">
                    <el-form-item label="原始订单号" prop="orderId">
                        <el-input v-model="ruleForm.orderId" placeholder="普通订单不需要填写"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item label="正常项目" prop="normalProjects">
                        <el-checkbox-group @change="normalChange" v-model="ruleForm.normalProjects" size="medium">
                            <el-checkbox-button v-for="item in normalProjects" :label="item.projectId"
                                :key="item.projectId" :index="item.projectId">{{ item.name }}
                            </el-checkbox-button>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item label="加钟项目" prop="clockProjects">
                        <el-checkbox-group @change="clockChange" v-model="ruleForm.clockProjects" size="medium">
                            <el-checkbox-button v-for="item in clockProjects" :label="item.projectId"
                                :key="item.projectId" :index="item.projectId">{{ item.name }}
                            </el-checkbox-button>
                        </el-checkbox-group>
                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item label="选择地址" prop="mapAddress">
                        <el-input v-model="ruleForm.mapAddress" id="choloc" @focus="mapDialog = true"
                            style="cursor: pointer;" placeholder="省市区"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item label="门牌号" prop="address">
                        <el-input v-model="ruleForm.address" placeholder="门牌"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="6">
                    <el-form-item label="技师手机" prop="techPhone">
                        <el-input v-model="ruleForm.techPhone"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="6">
                    <el-form-item label="技师姓名" prop="techName">
                        <el-input v-model="ruleForm.techName"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="6" class="ml-3">
                    <!-- <el-form-item> -->
                    <el-button type="primary" @click="searchTech">查询技师</el-button>
                    <!-- </el-form-item> -->
                </el-col>

                <el-col :span="24">
                    <el-form-item label="服务时间" prop="serviceTime">
                        <el-date-picker v-model="ruleForm.serviceTime" type="datetime" placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item label="备注" prop="techPhone">
                        <el-input v-model="ruleForm.remark"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="6">
                    <el-form-item label="服务费" prop="payService">
                        <el-input v-model="ruleForm.payService"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="6">
                    <el-form-item label="交通费" prop="payTrans">
                        <el-input v-model="ruleForm.payTrans"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="6">
                    <el-form-item label="优惠卷" prop="payCoupon">
                        <el-input v-model="ruleForm.payCoupon"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="6">
                    <el-form-item label="服务时长" prop="time">
                        <el-input v-model="ruleForm.time"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="6">
                    <el-form-item label="支付方式" prop="payType">
                        <el-select v-model="ruleForm.payType" placeholder="请选择支付方式">
                            <el-option label="余额" value="余额"></el-option>
                            <el-option label="现金" value="现金"></el-option>
                            <el-option label="到位" value="到位"></el-option>
                            <el-option label="美团" value="美团"></el-option>
                            <el-option label="口碑" value="口碑"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="6">
                    <el-form-item label="订单来源" prop="source">
                        <el-select v-model="ruleForm.source" placeholder="请选择订单类来源">
                            <el-option label="自营" value="自营"></el-option>
                            <el-option label="到位" value="到位"></el-option>
                            <el-option label="企业" value="企业"></el-option>
                            <el-option label="口碑" value="口碑"></el-option>
                            <el-option label="美团" value="美团"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="6">
                    <el-form-item label="订单状态" prop="state">
                        <el-select v-model="ruleForm.state" placeholder="请选择订单状态">
                            <el-option label="未接单" value="1"></el-option>
                            <el-option label="已接单" value="2"></el-option>
                            <el-option label="已完成" value="6"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

            </el-row>

            <el-form-item class="pb-3">
                <el-button type="primary" @click="addOrder">确定添加</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>

        <el-dialog title="项目设置" :visible.sync="mapDialog">
            <iframe id="myMap" width="100%" height="400px" frameborder="0"
                :src="'https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp'">
            </iframe>

            <div slot="footer" class="dialog-footer">
                <el-button @click="mapDialog = false">取 消</el-button>
                <el-button @click="sure">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="项目设置" :visible.sync="techSelectDailog">
            <el-table :data="teches" @row-click="select" style="width: 100%">
                <el-table-column prop="realName" label="技师姓名" width="120"></el-table-column>

                <el-table-column prop="phone" label="手机" width="120"></el-table-column>

                <el-table-column prop="location" label="位置"></el-table-column>

                <el-table-column prop="distance" label="距离" width="100"></el-table-column>

                <el-table-column prop="ifAccept" label="可否接单" width="80"></el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
import util from "../../../../util";
let mapAddress = ''
let lng = 0
let lat = 0

window.addEventListener('message', function (event) {
    const loc = event.data
    if (loc && loc.module == 'locationPicker') {//防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
        mapAddress = loc.poiaddress;
        lng = loc.latlng.lng
        lat = loc.latlng.lat
    }
}, false);

export default {
    name: "Order",
    data () {
        return {
            mapDialog: false,
            techSelectDailog: false,
            normalProjects: [],
            clockProjects: [],
            teches: [],
            ruleForm: {
                userPhone: "",
                orderType: "",
                orderId: "",
                normalProjects: [],
                clockProjects: [],
                mapAddress: '',
                address: '',
                lng: 0,
                lat: 0,
                techPhone: '',
                techName: '',
                serviceTime: '',
                remark: '',
                payService: '',
                payTrans: 0,
                payCoupon: 0,
                time: 0,
                payType: '',
                source: '',
                state: '',
            }
        };
    },
    methods: {
        normalChange (value) { },
        clockChange (value) { },
        select () { },
        async listProjects (projectIds) {
            const res = await this.$api.get("/project/listProject", {});
            this.normalProjects = res.data.data.normalProjects;
            this.clockProjects = res.data.data.clockProjects;
        },
        async listTech () {
            const res = await this.$api.get("/tech/listTech", {
                realName: this.ruleForm.realName || '',
                phone: this.ruleForm.phone || '',
                lng: this.ruleForm.lng || 0 || '',
                lat: this.ruleForm.lat || 0 || '',
                projectIds: this.ruleForm.normalProjects.concat(this.ruleForm.clockProjects) || []
            });
            this.teches = res.data.data.list;
        },
        sure () {
            this.ruleForm.mapAddress = mapAddress
            this.ruleForm.lng = lng
            this.ruleForm.lat = lat
            this.mapDialog = false
        },
        searchTech () {
            this.techSelectDailog = true
            this.listTech()
        },
        async addOrder () {

        },
        resetForm (formName) {
            this.$refs[formName].resetFields();
        }
    },
    created () {
        this.listProjects()
    }
};
</script>

<style scoped>
</style>

