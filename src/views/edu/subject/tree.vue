<template>
  <div class="app-container">
    <el-tree :data="tree" :props="defaultProps" default-expand-all></el-tree>
  </div>
</template>

<script>
  import subject from '@/api/edu/subject'

  export default {

    data() {
      return {
        tree: [],
        defaultProps: {
          children: 'children',
          label: 'title'
        }
      };
    },
    created() {
        this.getTree();
    },
    methods: {
      getTree() {
        subject.getTree().then(res => {
          this.tree = res.data.tree;
        }).catch(err => {
          console.log(err);
        })
      }
    }
  };

</script>

<style lang="scss" scoped>

</style>
