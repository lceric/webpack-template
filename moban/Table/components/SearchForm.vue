<template>
  <el-form :model="searchForm" :rules="searchFormRules" inline size="mini">
    <el-form-item>
      <el-input v-model="searchForm.keywords" palceholder="关键词搜索" >
      </el-input>
    </el-form-item>
    <el-form-item>
      <el-select v-model="searchForm.type" palceholder="全部指标">
        <el-option  v-for="item in typeList"  :key="item.key"  :label="item.value"  :value="item.value"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="$emit('on-search', searchForm)">查询</el-button>
      <el-button type="primary" @click="$emit('on-add', searchForm)">添加指标类型</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  name: 'Moban_Search_Form',
  data() {
    return {
      searchForm: {
        keywords: undefined,
        type: undefined
      },
      searchFormRules: {},
      typeList: []
    }
  }
}
</script>