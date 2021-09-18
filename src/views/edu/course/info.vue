<template>

  <div class="app-container">

    <h2 v-if="isUpdate" style="text-align: center;">修改课程</h2>
    <h2 v-else-if="!isUpdate" style="text-align: center;">添加新课程</h2>

    <el-steps :active="1" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step v-if="isUpdate" title="修改课程基本信息" />
      <el-step v-else-if="!isUpdate" title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="课程最终发布" />

    </el-steps>

    <el-form label-width="120px">

      <!-- 所属分类：级联下拉列表 -->
      <!-- 一级分类 -->
      <el-form-item label="课程类别">
        <el-select v-model="courseInfo.subjectParentId" placeholder="一级分类" @change="getSubSubjectList">
          <el-option v-for="subject in subjectNestedList" :key="subject.id" :label="subject.title"
            :value="subject.id" />
        </el-select>
        <!-- 二级分类 -->
        <el-select v-model="courseInfo.subjectId" placeholder="二级分类">
          <el-option v-for="subject in subSubjectList" :key="subject.value" :label="subject.title"
            :value="subject.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="课程标题">
        <el-input v-model="courseInfo.title" placeholder=" 示例：机器学习项目课：从基础到搭建项目视频课程。专业名称注意大小写" />
      </el-form-item>


      <!-- 课程讲师 -->
      <el-form-item label="课程讲师">
        <el-select v-model="courseInfo.teacherId" placeholder="请选择">
          <el-option v-for="teacher in teacherList" :key="teacher.id" :label="teacher.name" :value="teacher.id" />
        </el-select>
      </el-form-item>
      <el-form-item label="总课时">
        <el-input-number :min="0" v-model="courseInfo.lessonNum" controls-position="right" placeholder="请填写课程的总课时数" />
      </el-form-item>

      <!-- 课程简介-->
      <el-form-item label="课程简介">
        <tinymce :height="300" v-model="courseInfo.description" />
      </el-form-item>

      <!-- 课程封面-->
      <el-form-item label="课程封面">

        <el-upload :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload"
          :action="BASE_API+'oss/fileoss/avatar'" class="avatar-uploader">
          <img :src="courseInfo.cover">
        </el-upload>

      </el-form-item>
      <el-form-item label="课程价格">
        <el-input-number :min="0" v-model="courseInfo.price" controls-position="right" placeholder="免费课程请设置为0元" /> 元
      </el-form-item>

      <el-form-item>
        <el-button :disabled="saveBtnDisabled" type="primary" @click="next">保存并下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import course from '@/api/edu/course'
  import teacher from '@/api/edu/teacher'
  import subject from '@/api/edu/subject'
  import Tinymce from '@/components/Tinymce'
  export default {
    components: {
      Tinymce
    },
    data() {
      return {
        saveBtnDisabled: false, // 保存按钮是否禁用
        teacherList: [],
        courseInfo: {
          title: '',
          subjectParentId: '',
          subjectId: '',
          teacherId: '',
          lessonNum: 0,
          description: '',
          cover: process.env.OSS_PATH + '/cover/default.jpg',
          price: 0
        },
        subjectNestedList: [], //一级分类列表
        subSubjectList: [], //二级分类列表
        BASE_API: process.env.BASE_API, // 接口API地址
        courseId: '',
        isUpdate: false
      }
    },
    mounted() {

    },

    created() {
      if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id
        this.getAllTeacher();
        console.log(this.teacherList);
        this.getCourseInfo();
        this.isUpdate = true;
      } else {
        this.getAllTeacher();
        this.getOneSubject();
      }
    },

    methods: {
      //获取所有的讲师列表
      getAllTeacher() {
        teacher.getAllTeacher().then(res => {
          this.teacherList = res.data.items;
        })
      },
      //查询所有的一级分类
      getOneSubject() {
        subject.getTree().then(res => {
          this.subjectNestedList = res.data.tree;
        })
      },
      //根据id查询课程信息
      getCourseInfo() {
        course.getCourseInfo(this.courseId).then(res => {
          this.courseInfo = res.data.courseInfoVo;
          subject.getTree().then(res => {
            this.subjectNestedList = res.data.tree;
            this.subjectNestedList.find((item) => {
              if (item.id == this.courseInfo.subjectParentId) {
                this.subSubjectList = item.children;
              }
            })
          })
        })
      },
      getSubSubjectList(value) {
        this.courseInfo.subjectId = ''
        this.subjectNestedList.find((item) => {
          if (item.id == value) {
            this.subSubjectList = item.children;
          }
        })
      },
      next() {
        if (!this.isUpdate) {
          course.addCourse(this.courseInfo).then(res => {
            this.$message.success("提交课程信息成功");
            this.$router.push({
              path: `/course/chapter/${res.data.courseId}`
            })
          })
        } else {
          course.updateCourseInfo(this.courseInfo).then(res => {
            this.$router.push({
              path: `/course/chapter/${this.courseId}`
            })
          });
        }
      },
      //上传成功回调函数
      handleAvatarSuccess(res, file) {
        this.courseInfo.cover = res.data.avatarUrl;
      },
      //上传之前验证
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg'
        const isLt2M = file.size / 1024 / 1024 < 2

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!')
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!')
        }
        return isJPG && isLt2M
      }
    }
  }

</script>
<style scoped>
  .tinymce-container {
    line-height: 29px;
  }

</style>
