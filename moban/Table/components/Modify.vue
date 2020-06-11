<template>
  <el-dialog v-bind="$attrs" v-on="$listeners">
    <el-form
      ref="modifyFormRef"
      class="xhx-form"
      :model="modifyForm"
      :rules="modifyFormRules"
      label-width="80px"
    >
      <el-form-item label="表单项">
        <el-input v-model="modifyForm.item"></el-input>
      </el-form-item>
      <el-form-item label="表单项">
        <el-input v-model="modifyForm.item"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="ghost" @click="cancelHandler">取消</el-button>
        <el-button type="primary" @click="saveHandler">保存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script>
// 修改接口
import { modifyItem } from 'api/bigdata/indicator'

export default {
  name: 'Moban_Modify',
  props: ['row'],
  data() {
    return {
      modifyForm: {},
      modifyFormRules: {},
    }
  },
  watch: {
    row: {
      handler(v) {
        if (v) {
          let temp = {};
          for (let k in this.modifyForm) {
            temp[k] = v[k];
          }
          this.modifyForm = Object.assign({}, this.modifyForm, temp);
          return;
        }
        this.resetModifyForm();
      },
      immediate: true
    },
  },
  methods: {
    /** 取消 */
    cancelHandler() {
      this.$emit('on-cancel')
    },
    /** 保存 */
    async saveHandler() {
      let { item } = this.form
      try {
        let { msg, error } = await modifyItem({
          item,
        })
        if (error == 0) {
          this.$message.success(msg)
          this.$emit('on-success')
          return
        }
        throw new Error(msg)
      } catch (error) {
        this.$message.error(error.message)
      }
    },
    initData() {
      Object.assign(this.modifyForm, this.$options.data());
    },
    /** 重置表单 */
    resetModifyForm() {
      this.initData();
      this.$refs.modifyFormRef && this.$refs.modifyFormRef.resetFields();
    }
  },
}
</script>
