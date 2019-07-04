<template>
  <div>
    <el-button @click="query">查询</el-button>
    <el-row style="margin-top: 20px">
      <el-col :span="12" :offset="6">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="date"
            label="日期"
            width="180">
          </el-table-column>
          <el-table-column
            prop="road_id"
            label="姓名"
            width="180">
          </el-table-column>
          <el-table-column
            prop="road_name"
            label="地址">
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>


    <div class="block" style="margin-top: 20px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20 ,30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import Page from '../common/Page.vue'
  // import axios from 'axios'

  export default {
    components: {Page},
    data() {
      return {
        tableData: [],
        currentPage: 1,
        total: 0
      }
    },
    methods: {
      query: function () {
        this.$axios.get('/vue/list', {
          params: {_page_num: this.currentPage}
        }).then(response => {
          console.log(response);
          this.tableData = response.data.data;
          this.total = response.data._page_total;
        }).catch(function (error) {
          console.log(error);
          // this.tableData = [];
        });
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        this.query();
      }
    }
  }
</script>
