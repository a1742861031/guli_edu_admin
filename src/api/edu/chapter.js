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
  //添加章节
  addChapter(chapter, courseId) {
    return request({
      url: `/edu/chapter/chapter/${courseId}`,
      method: 'post',
      data: chapter
    })
  },
  //修改章节
  editChapter(chapter) {
    return request({
      url: `/edu/chapter/updateChapter`,
      method: 'post',
      data: chapter
    })
  },
  //通过id删除章节
  deleteChapter(id) {
    return request({
      url: `/edu/chapter/Chapter/${id}`,
      method: 'delete',
    })
  },
  //添加小结
  addVideo(video) {
    return request({
      url: `/edu/video/add/`,
      method: 'post',
      data: video
    })
  },
  //删除小结
  deleteVedio(id) {
    return request({
      url: `/edu/video/deleteVideoById//${id}`,
      method: 'delete',
    })
  },
  //更新小结
  editVideo(video) {
    return request({
      url: `/edu/video/updateVideo`,
      method: 'post',
      data: video
    })
  },
  //根据id获取小结
  getVideoById(id) {
    return request({
      url: `/edu/video/Byid/${id}`,
      method: 'get',
    })
  },
  //删除视频
  deleteVideo(id) {
    return request({
      url: `/oss/video/deleteVideo/${id}`,
      method: 'delete'
    })
  },
  //获取视频封面
  getVideoInfo(id) {
    return request({
      url: `/oss/video/info/${id}`,
      method: 'get'
    })
  }
}