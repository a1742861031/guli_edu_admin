<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>

    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="提交审核" />
    </el-steps>

    <el-button type="text">添加章节</el-button>
    <!-- 章节 -->
    <ul class="chanpterList">
      <li v-for="chapter in chapterNestedList" :key="chapter.id">
        <p>
          {{ chapter.title }}

          <span class="acts">
            <el-button type="text">添加课时</el-button>
            <el-button style="" type="text">编辑</el-button>
            <el-button type="text">删除</el-button>
          </span>
        </p>

        <!-- 视频 -->
        <ul class="chanpterList videoList">
          <li v-for="video in chapter.children" :key="video.id">
            <p>{{ video.title }}
              <span class="acts">
                <el-button type="text">编辑</el-button>
                <el-button type="text">删除</el-button>
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>
    <div>
      <el-button @click="previous">上一步</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="next">下一步</el-button>
    </div>
  </div>
</template>

<script>
  import chapter from '@/api/edu/chapter'
  export default {
    data() {
      return {
        saveBtnDisabled: false, // 保存按钮是否禁用
        chapterNestedList: [], // 章节嵌套课时列表
        courseId: ''
      }
    },

    created() {
      this.getChapterVideo();
      if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id
      }
    },

    methods: {
      //获取章节和小结
      getChapterVideo() {
        chapter.getChapterAndVedioById('18').then(res => {
          this.chapterNestedList = res.data.allChapterVideo;
        })
      },
      previous() {
        this.$router.push({
          path: '/course/info/1'
        })
      },

      next() {
        this.$router.push({
          path: '/course/publish/1'
        })
      }
    }
  }

</script>
