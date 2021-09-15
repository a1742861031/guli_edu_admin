//章节小节管理api
import request from '@/utils/request'
export default {
  // 根据课程id获取章节和小结数据列表
  getChapterAndVedioById(courseId) {
    return request({
      url: `/edu/chapter/getChapterVideo/${courseId}`,
      method: 'get',
    })
  },


}