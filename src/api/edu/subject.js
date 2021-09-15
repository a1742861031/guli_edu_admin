//课程分类管理api
import request from '@/utils/request'
export default{
    // 获取讲师列表
    getTree(){
      return request({
          url: `edu/subject/tree`,
          method: 'get',
        })
  },
}