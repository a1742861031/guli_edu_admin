<template>
  <div class="app-container">
    <el-form label-width="120px">
      <el-form-item label="信息描述">
        <el-tag type="info">点击右侧获取课程模板</el-tag>
        <el-tag>
          <i class="el-icon-download" />
          <a
            :href="'https://guli-edu-bobo0125.oss-cn-chengdu.aliyuncs.com/excel/%E8%AF%BE%E7%A8%8B%E5%88%86%E7%B1%BB.xlsx'">点击下载模版</a>
        </el-tag>

      </el-form-item>

      <el-form-item label="选择Excel">
        <el-upload ref="upload" :auto-upload="false" :on-success="fileUploadSuccess" :on-error="fileUploadError"
          :disabled="importBtnDisabled" :limit="1" :action="BASE_API+'edu/subject/addSubject'" name="file"
          accept="application/vnd.ms-excel">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button :loading="loading" style="margin-left: 10px;" size="small" type="success" @click="submitUpload">
            {{ fileUploadBtnText }}</el-button>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        BASE_API: process.env.BASE_API, // 接口API地址,
        fileUploadBtnText:'点击上传',
        loading:false,
        importBtnDisabled:false,
      };
    },
    methods: {
      submitUpload() {
        this.fileUploadBtnText = '正在上传'
        this.importBtnDisabled = true
        this.loading = true
        this.$refs.upload.submit()
      },

      fileUploadSuccess(response) {
        if (response.success === true) {
          this.fileUploadBtnText = '上传成功'
          this.loading = false
          this.$message({
            type: 'success',
            message: response.message
          })
        }
      },

      fileUploadError(response) {
        this.fileUploadBtnText = '上传失败'
        this.loading = false
        this.$message({
          type: 'error',
          message: '导入失败'
        })
      }
    }
  }

</script>
