//讲师管理api
import request from '@/utils/request'
export default{
    // 获取讲师列表 （条件查询）
    getTeacherList(current,limit,teacherQuery){
        return request({
            url: `/edu/teacher/pageTeacher/${current}/${limit}`,
            method: 'post',
            data: teacherQuery //把对象转换成json数据传递
          })
    },
    // 删除讲师
    deleteTeacher(id){
        return request({
            url: `/edu/teacher/${id}`,
            method: 'delete',
          })
    },
    //添加讲师
    addTeacher(teacher){
        return request({
            url: `/edu/teacher/addTeacher`,
            method: 'post',
            data: teacher //把对象转换成json数据传递
          })
    },
    //根据Id获取讲师
    getTeacherById(id){
        return request({
            url: `/edu/teacher/${id}`,
            method: 'get',
          })
    },
    //修改讲师
    updateTeacher(teacher){
        return request({
            url: `/edu/teacher/updateTeacher`,
            method: 'post',
            data: teacher //把对象转换成json数据传递
          })
    },
    getAllTeacher(){
        return request({
            url: `/edu/teacher/list`,
            method: 'get',
          })
    }
}