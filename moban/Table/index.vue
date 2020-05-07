<template>
  <div class="moban">
    <SearchForm
      @on-search="searchHandler"  
    ></SearchForm>
    <Table ref="tableRef" class="moban-table" :searchForm="searchForm"></Table>
  </div>
</template>
<script>
import SearchForm from './components/SearchForm'
import Table from './components/Table'

export default {
  name: 'Moban_index',
  components: { SearchForm, Table },
  data() {
    return {
      searchForm: {}
    }
  },
  methods: {
    searchHandler(params) {
      Object.assign(
        this.searchForm,
        params
      )
      this.$refs.tableRef.loadData()
    }
  }
}
</script>
<style lang="scss" scoped></style>
