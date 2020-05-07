<template>
  <div>
    <Table
      :tableData="tableData"
      :params="tableColumn"
      :needIndex="false"
      :tableLoading="tableLoading"
    >
      <template v-slot:action="scope">
        <el-button-group>
          <el-button type="primary" @click="editHandler(scope.data)"
            >修改</el-button
          >
          <el-button type="danger" @click="deleteHandler(scope.data)"
            >删除</el-button
          >
        </el-button-group>
      </template>
    </Table>
    <Pagination
      :currentPage.sync="currentPage"
      :pagesize.sync="pagesize"
      :totalpage="totalpage"
      :total="total"
      @loadData="loadData"
    ></Pagination>
    <el-dialog
      class="xhx-dialog"
      :visible.sync="modifyVisible"
      title="修改指标"
      width="600px"
      append-to-body
    >
      <Modify
        :row="currentRow"
        @on-cancel="modifyVisible = false"
        @on-success="editSuccessHandler"
      ></Modify>
    </el-dialog>
  </div>
</template>
<script>
import Table from 'components/Table';
import Pagination from 'components/Pagination';
import { getList, deleteItem } from 'api/bigdata/indicator';
import Modify from './Modify';

export default {
  name: 'Moban_Table',
  components: { Table, Pagination, Modify },
  props: {
    searchForm: Object
  },
  data() {
    return {
      currentPage: 1,
      pagesize: 10,
      totalpage: 0,
      total: 0,
      tableLoading: false,
      modifyVisible: false,
      currentRow: {},
      tableColumn: [
        {
          prop: 'property',
          label: '业务域'
        },
        {
          name: '操作',
          width: '180px',
          slotName: 'action'
        }
      ],
      tableData: []
    };
  },
  methods: {
    /** 加载数据 */
    async loadData() {
      let searchForm = this.searchForm;
      let params = {
        page: this.currentPage,
        pagesize: this.pagesize,
        ...searchForm
      };
      this.tableLoading = true;
      try {
        const { data, error, msg } = await getList(params);
        if (error) {
          this.$message.error(msg);
          return;
        }
        this.$emit('on-loaded-data', data);
        this.tableData = data?.data;
        this.total = data?.total;
        this.totalpage = data?.last_page;
      } catch (e) {
        this.$message.error(e && e.msg);
      } finally {
        this.tableLoading = false;
      }
    },
    /** 修改 */
    editHandler(row) {
      this.modifyVisible = true;
      this.currentRow = row;
    },
    editSuccessHandler() {
      this.modifyVisible = false
      this.loadData()
    },
    /** 删除 */
    async deleteHandler(row) {
      let params = {
        id: row.id
      };
      let opts = {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        closeOnPressEscape: false,
        closeOnClickModal: false,
        type: 'warning'
      };
      this.$confirm('确认删除该指标？', '删除指标', opts).then(async () => {
        try {
          let { msg, error } = await deleteItem(params);
          if (error == 0) {
            this.$message.success(msg);
            this.loadData()
            this.$emit('on-delet-success')
          } else {
            throw new Error(msg);
          }
        } catch(error) {
          this.$message.error(error.message);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.el-alert {
  margin-top: 10px;
}
</style>