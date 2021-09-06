<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="teacherQuery.name" placeholder="讲师名" />
      </el-form-item>
      <el-form-item>
        <el-select v-model="teacherQuery.level" clearable placeholder="讲师头衔">
          <el-option :value="1" label="高级讲师" />
          <el-option :value="2" label="首席讲师" />
        </el-select>
      </el-form-item>
      <el-form-item label="添加时间">
        <el-date-picker v-model="teacherQuery.begin" type="datetime" placeholder="选择开始时间"
          value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00" />
      </el-form-item>
      <el-form-item>
        <el-date-picker v-model="teacherQuery.end" type="datetime" placeholder="选择截止时间"
          value-format="yyyy-MM-dd HH:mm:ss" default-time="00:00:00" />
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="fetchData()">查
        询</el-button>
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <el-table v-loading="listLoading" :data="list" element-loading-text="数据加载中" border fit highlight-current-row>
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (current - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" width="80" />
      <el-table-column label="头衔" width="80">
        <template slot-scope="scope">
          {{ scope.row.level===1?'高级讲师':'首席讲师' }}
        </template>
      </el-table-column>
      <el-table-column prop="career" label="资历" />
      <el-table-column prop="gmtCreate" label="添加时间" width="160" />
      <el-table-column prop="sort" label="排序" width="60" />
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/teacher/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
          <el-button type="danger" size="mini" icon="el-icon-delete"
            @click="showDeleteDialog(scope.row.name,scope.row.id)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination :current-page="current" :page-size="limit" :total="total" :page-sizes="[5, 10, 20, 50]"
      style="padding: 30px 0; text-align: center;" layout="total, sizes,prev, pager, next, jumper"
      @current-change="handleCurrentChange" @size-change="handleSizeChange" />
  </div>
</template>

<script>
  import teacher from '@/api/edu/teacher'
  export default {
    data() {
      return {
        listLoading: "true",
        list: [], //查询到的结果
        current: 1, //当前页
        limit: 5, //默认的每页条数
        total: 0, //总记录数据
        teacherQuery: {} //查询条件
      };
    },

    created() {
      this.getList();
    },
    methods: {
      //获取讲师列表
      getList() {
        teacher.getTeacherList(this.current, this.limit, this.teacherQuery).then(res => {
          this.$message.success(res.message);
          this.list = res.data.items;
          this.total = res.data.total;
        }).catch(
          error => {
            this.$message.error(error);
          }
        ).finally(() => {
          this.listLoading = false;
        });
      },
      handleCurrentChange(val) {
        this.current = val;
        this.getList();
      },
      handleSizeChange(val) {
        this.limit = val;
        this.getList();

      },
      resetData() { //清空条件
        this.teacherQuery = {};
        this.fetchData();
      },
      fetchData() { //条件查询
        this.getList();
      },
      showDeleteDialog(name, id) {
        this.$confirm(`是否删除${name}讲师?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.removeDataById(id);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //删除讲师
      removeDataById(id) {
        teacher.deleteTeacher(id).then(res => {
          this.$message.success(res.message)
          this.getList();
        }).catch(error => {
          this.$message.error(error)
        })
      },
      //获取修改讲师的信息
     
    },
  }

</script>

<style lang="sass" scoped>

</style>>
