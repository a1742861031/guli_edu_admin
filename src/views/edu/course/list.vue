<template>
  <div class="app-container">
    <el-row>
      <el-col :span="4" v-for="course in courseList" :key="course.id" class="item">
        <el-card :body-style="{ padding: '0px' }" class="card">
          <img :src="course.cover" class="image">
          <div style="padding: 14px;">
            <a @click="jumpToEdit(course.id)" class="title">{{course.title}}</a>
            <br>
            <div class="teacher">{{course.teacherName}}</div>
            <span class="price" v-if="course.price==0">免费</span>
            <span class="price" v-else style="color: red;">{{course.price}}元</span>
            <span class="status" v-if="course.status=='Normal'" style="color: skyblue;">上架中</span>
            <span class="status" v-else>已下架</span>
          </div>

          <div class="bottom clearfix">
            <el-button type="text" class="button" @click="downCourse(course)">下架课程</el-button>

            <el-button type="text" class="button" @click="jumpToEdit(course.id)">修改课程</el-button>
          </div>
        </el-card>

      </el-col>

    </el-row>
  </div>
</template>

<script>
  import course from '@/api/edu/course'
  import teacher from '@/api/edu/teacher'
  export default {


    data() {
      return {
        currentDate: new Date(),
        courseList: [],
        query: {},
      };
    },

    created() {
      this.getCourseList();
    },

    methods: {
      getCourseList() {
        course.getCourseList(this.query).then(res => {
          this.$message.success(res.message);
          this.courseList = res.data.list;
        })
      },
      jumpToEdit(id) {
        this.$router.push({
          path: `/course/info/${id}`
        })
      },
      downCourse(mycourse) {
        console.log(course);
        if (mycourse.status === "Normal") {
          course.downCourse(mycourse.id).then(res => {
            this.$message.success(res.message);
            this.getCourseList();
          })
        } else {
          this.$message.warning("当前课程已经下架")
        }
      },
    },

  };

</script>

<style lang="scss" scoped>
  .item {
    margin-left: 100px;
    margin-bottom: 100px;
    width: 300px;
    height: 300px;
  }

  .bottom {
    line-height: 12px;
    margin-bottom: 0px;

  }

  .price {
    font-size: 20px;
    height: 20px;
    line-height: 20px;
    font-weight: 600;
    display: inline-block;
    margin-top: 15px;
    color: forestgreen;
  }

  .card {
    width: 100%;
    height: 100%;
  }

  .title {
    font-size: 20px;
    font-weight: bold;
    line-height: 18px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

  }

  .status {
    margin-left: 10px;
    color: rgb(141, 73, 10);
    font-weight: 600;
  }

  .button {
    padding: 0;
    float: right;
    margin-left: 10px;
    margin-right: 10px;
  }

  .image {
    width: 100%;
    height: 10em;
    object-fit: cover;
    display: block;
  }

  .teacher {
    font-size: 15px;
    height: 12px;
    line-height: 12px;
    color: #999;
    margin-top: 20px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

</style>
