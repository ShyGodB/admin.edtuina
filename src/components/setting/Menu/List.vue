<template>
    <div id="Menu-config">
        <div class="order-search">
            <el-form :model="ruleForm" ref="ruleForm" :inline="true" label-width="100px" class="demo-ruleForm">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="级别" prop="level">
                    <el-select v-model="ruleForm.level" placeholder="请选择级别">
                        <el-option label="一级" value="1"></el-option>
                        <el-option label="二级" value="2"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item class="ml-5">
                    <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                    <el-button type="success" @click="addMenuDialog = true">添加菜单</el-button>
                </el-form-item>
            </el-form>
        </div>

        <el-table :data="menus" style="width: 100%">
            <el-table-column prop="name" label="菜单名称"></el-table-column>

            <el-table-column prop="level" label="级别" width="60"></el-table-column>

            <el-table-column prop="path" label="路径" width="180"></el-table-column>

            <el-table-column prop="tab" label="tab" width="120"></el-table-column>

            <el-table-column prop="model" label="model" width="100"></el-table-column>

            <el-table-column label="状态" width="120">
                <template slot-scope="scope">
                    <el-switch @change="offChange(scope.row)" v-model="scope.row.off" active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-table-column>

            <el-table-column prop="addTime" label="添加时间" width="180"></el-table-column>

            <el-table-column prop="addUserName" label="添加人" width="120"></el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="edit(scope.row, scope.$index)" round>编辑</el-button>
                    <el-button size="mini" type="danger" @click="del(scope.row, scope.$index)" round>删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="pagination">
            <el-pagination ref="fenye" background @current-change="pageChange" layout="prev, pager, next"
                :hide-on-single-page="true" :page-count="pageNum"></el-pagination>
        </div>

        <el-dialog title="新增菜单" :visible.sync="addMenuDialog">
            <el-form :model="addForm" ref="addForm" label-width="100px">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="addForm.name" autocomplete="off" placeholder="菜单名称，如：运营管理"></el-input>
                </el-form-item>

                <el-form-item label="级别" prop="level">
                    <el-select v-model="addForm.level" placeholder="请选择性别">
                        <el-option label="一级" value="1"></el-option>
                        <el-option label="二级" value="2"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="父级" prop="level" v-if="addForm.level==='2'">
                    <el-select v-model="addForm.parentId" placeholder="请选择父级菜单">
                        <el-option v-for="(item, index) in menus" :key="index" :label="item.name" :value="item._id">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="路由名称" prop="routeName">
                    <el-input v-model="addForm.routeName" placeholder="路由名称，如：Operating，注：首字母大些，全英文" autocomplete="off">
                    </el-input>
                </el-form-item>

                <el-form-item label="默认路径" prop="path">
                    <el-input v-model="addForm.path" placeholder="菜单默认路径，如：/operating/order/list，规则：/路由名/一级子路由/二级子路由"
                        autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="一级路由" prop="tab">
                    <el-input v-model="addForm.tab" placeholder="一级子路由，如：order" autocomplete="off">
                    </el-input>
                </el-form-item>

                <el-form-item label="二级路由" prop="model">
                    <el-input v-model="addForm.model" placeholder="二级子路由，如：list" autocomplete="off">
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addMenuDialog = false">取 消</el-button>
                <el-button type="primary" @click="addMenu">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑菜单" :visible.sync="editMenuDialog">
            <el-form :model="editForm" ref="editForm" label-width="100px">
                <el-form-item label="名称" prop="name">
                    <el-input v-model="editForm.name" placeholder="菜单名称，如：运营管理" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="默认路径" prop="path">
                    <el-input v-model="editForm.path" placeholder="菜单默认路径，如：/operating/order/list，规则：/路由名/一级子路由/二级子路由"
                        autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="一级路由" prop="tab">
                    <el-input v-model="editForm.tab" placeholder="一级子路由，如：order" autocomplete="off"></el-input>
                </el-form-item>

                <el-form-item label="二级路由" prop="model">
                    <el-input v-model="editForm.model" placeholder="二级子路由，如：list" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editMenuDialog = false">取 消</el-button>
                <el-button type="primary" @click="editMenu">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>


<script>
import util from "../../../../util";

export default {
    inject: ['reload'],
    name: "MenuConfig",
    data () {
        return {
            menus: [],
            pageNum: 1,
            pageIndex: 1,
            pageSize: 10,
            addMenuDialog: false,
            editMenuDialog: false,
            ruleForm: {
                name: '',
                level: ''
            },
            addForm: {
                name: '',
                level: '1',
                parentId: '',
                routeName: '',
                path: '',
                tab: '',
                model: '',
            },
            editForm: {
                name: '',
                path: '',
                tab: '',
                model: '',
            }
        };
    },
    methods: {
        pageChange (num) {
            this.pageIndex = num;
            this.listMenu();
        },
        edit (row, index) {
            this.editMenuDialog = true
            this.editForm.name = row.name
            this.editForm.path = row.path
            this.editForm.tab = row.tab
            this.editForm.model = row.model
        },
        async del (row, index) {
            const res = await this.$api.post('/menu/del', { _id: row._id })
            this.$message.success('删除成功！')
            this.reload()
        },
        async listMenu (data) {
            const res = await this.$api.post(
                "/menu/listMax",
                Object.assign(
                    {},
                    this.ruleForm,
                    { pageIndex: this.pageIndex },
                    { pageSize: this.pageSize }
                )
            );
            this.menus = res.data.data.list || [];
            this.pageNum = Math.floor(
                (res.data.data.count || 0) / this.pageSize
            );
            if (res.data.data.count % this.pageSize !== 0) {
                this.pageNum += 1;
            }
        },
        async addMenu () {
            const res = await this.$api.post('/menu/add', this.addForm)
            this.$message.success('添加成功')
            this.reload()
        },
        async editMenu () {
            const res = await this.$api.post('/menu/edit', this.editForm)
            this.$message.success('添加成功')
            this.reload()
        },
        async offChange (row) {
            await this.$api.post('/menu/switch', { _id: row._id, off: !row.off })
            this.$message.success('修改状态成功')
        },
    },
    created () {
        this.listMenu();
    }
};
</script>


<style scoped>
</style>
