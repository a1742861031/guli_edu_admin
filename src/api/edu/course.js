//课程管理api
import request from '@/utils/request'
export default {
  //1 添加课程信息
  addCourse(courseInfo) {
    return request({
      url: `/edu/course/addCourseInfo`,
      method: 'post',
      data: courseInfo
    })
  },
  //根据课程id查询课程基本信息
  getCourseInfo(courseId) {
    return request({
      url: `/edu/course/getCourseInfo/${courseId}`,
      method: 'get',
    })
  },
  //修改课程信息
  updateCourseInfo(courseInfo) {
    return request({
      url: `/edu/course/updateCourseInfo`,
      method: 'post',
      data: courseInfo
    })
  },

  getCoursePublishInfoById(id) {
    return request({
      url: `/edu/course/course-publish-info/${id}`,
      method: 'get'
    })
  },
  publishCourse(id) {
    return request({
      url: `/edu/course/publish-course/${id}`,
      method: 'put'
    })
  },
  //获取课程列表
  getCourseList(query) {
    return request({
      url: '/edu/course//queryCourse',
      method: 'post',
      data: query
    })
  },
  //下架课程
  downCourse(id) {
    return request({
      url: `/edu/course/downCourse/${id}`,
      method: 'get',
    })
  },

}