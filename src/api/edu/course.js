//课程管理api
import request from '@/utils/request'
export default {
  //1 添加课程信息
  addCourse(courseInfo) {
    return request({
      url: `/edu/course/addCourseInfo`,
      method: 'post',
      data:courseInfo
    })
  },


}