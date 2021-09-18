<template>

  <div class="app-container">

    <h2 style="text-align: center;">发布新课程</h2>
    <el-steps :active="2" process-status="wait" align-center style="margin-bottom: 40px;">
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="课程最终发布" />
    </el-steps>

    <el-button type="text" @click="addChapter">添加章节</el-button>
    <!-- 章节 -->
    <ul class="chanpterList">
      <li v-for="chapter in chapterNestedList" :key="chapter.id">
        <p>
          {{ chapter.title }}
          <span class="acts">
            <el-button type="text" @click="addVideo(chapter)">添加小结</el-button>
            <el-button type="text" @click="editChapter(chapter)">编辑</el-button>
            <el-button type="text" @click="deleteChapter(chapter.id)">删除</el-button>
          </span>
        </p>

        <!-- 视频 -->
        <ul class="chanpterList videoList">
          <li v-for="video in chapter.children" :key="video.id">
            <p>{{ video.title }}
              <span class="acts">
                <el-button type="text" @click="editVideo(video)">编辑</el-button>
                <el-button type="text" @click="deleteVideo(video.id)">删除</el-button>
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
    <!-- 对话框 -->
    <!-- 添加和修改章节表单 -->
    <el-dialog :visible.sync="dialogChapterFormVisible" :title="titleChpter">
      <el-form :model="chapter" label-width="120px">
        <el-form-item label="章节标题">
          <el-input v-model="chapter.title" />
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number v-model="chapter.sort" :min="0" controls-position="right" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdate">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加和修改小结表单 -->
    <el-dialog :visible.sync="dialogVideoFormVisible" :title="titleVideo">
      <el-form :model="chapter" label-width="120px">
        <el-form-item label="小结标题">
          <el-input v-model="video.title" />
        </el-form-item>
        <el-form-item label="小结排序">
          <el-input-number v-model="video.sort" :min="0" controls-position="right" />
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="video.isFree">
            <el-radio :label="1">免费</el-radio>
            <el-radio :label="0">默认</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传视频">
          <el-upload :on-success="handleVodUploadSuccess" :on-exceed="handleUploadExceed" :on-remove="handleVodRemove"
            :file-list="fileList" :action="BASE_API+'oss/video/uploadVideo'" :limit="1" class="upload-demo"
            v-if="!video.videoSourceId">
            <el-button size="small" type="primary">上传视频</el-button>
            <el-tooltip placement="right-end">
              <div slot="content">最大支持1G，<br>
                支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br>
                GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br>
                MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br>
                SWF、TS、VOB、WMV、WEBM 等视频格式上传</div>
              <i class="el-icon-question" />
            </el-tooltip>
          </el-upload>
          <div v-else>
            <img :src="videoInfo.imageCoverUrl" width="300px" />
          </div>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdateVideo">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import chapter from '@/api/edu/chapter'
  export default {
    data() {
      return {
        saveBtnDisabled: false, // 保存按钮是否禁用
        chapterNestedList: [], // 章节嵌套课时列表
        courseId: '',
        isUpdateChapter: false,
        isUpdateVedio: false,
        titleChpter: '',
        titleVideo: '',
        dialogChapterFormVisible: false,
        dialogVideoFormVisible: false,
        chapter: { // 章节对象
          title: '',
          sort: 0
        },

        video: {
          id: '',
          title: '',
          sort: 0,
          isFree: 0,
          videoSourceId: '',
          videoOriginalName: '', //视频名称

        },
        videoInfo: { //保存视频信息
        },
        fileList: [], //上传文件列表
        BASE_API: process.env.BASE_API // 接口API地址
      }
    },

    created() {
      if (this.$route.params && this.$route.params.id) {
        this.courseId = this.$route.params.id;
      }
      this.getChapterVideo();

    },
    methods: {
      //成功回调
      handleVodUploadSuccess(response, file, fileList) {
        //得到上传的视频id
        this.video.videoSourceId = response.data.videoid,
          this.video.videoOriginalName = file.name;
      },
      //视图上传多于一个视频
      handleUploadExceed(files, fileList) {
        this.$message.warning('想要重新上传视频，请先删除已上传的视频')
      },
      handleVodRemove() {
        //视频移除
        chapter.deleteVideo(this.video.videoSourceId).then(res => {
          this.$message.success(res.message);
          this.fileList = [];
          this.video.videoSourceId = '';
          this.video.videoOriginalName = '';
          this.videoInfo = {};
        })
      },
      addChapter() {
        this.chapter = {};
        this.dialogChapterFormVisible = true;
        this.titleChpter = "添加章节";
        this.isUpdateChapter = false;
      },
      editChapter(chapter) {
        this.titleChpter = "编辑章节";
        this.chapter = chapter
        this.dialogChapterFormVisible = true;
        this.isUpdateChapter = true;
      },
      //获取章节和小结
      getChapterVideo() {
        chapter.getChapterAndVedioById(this.courseId).then(res => {
          this.chapterNestedList = res.data.allChapterVideo;
        })
      },

      previous() {
        this.$router.push({
          path: `/course/info/${this.courseId}`
        })
      },
      //添加或者修改章节
      saveOrUpdate() {
        if (!this.isUpdateChapter) {
          chapter.addChapter(this.chapter, this.courseId).then(res => {
            this.$message.success(res.message);
            this.dialogChapterFormVisible = false;
            this.getChapterVideo();
          })
        } else {
          chapter.editChapter(this.chapter).then(res => {
            this.$message.success(res.message);
            this.dialogChapterFormVisible = false;
            this.getChapterVideo();
          })
        }
      },
      //删除chapter
      deleteChapter(id) {
        chapter.deleteChapter(id).then(res => {
          this.$message.success(res.message);
          this.getChapterVideo();

        })
      },
      //添加小结
      addVideo(chapter) {
        this.clearVideo()
        this.dialogVideoFormVisible = true;
        this.titleVideo = "添加小结"
        this.video.chapterId = chapter.id;
        this.video.courseId = this.courseId;
        this.isUpdateVedio = false;
      },
      editVideo(video) {
        this.titleVideo = "编辑小结";
        this.video.videoSourceId = '';
        chapter.getVideoById(video.id).then(res => {
          Object.keys(this.video).forEach(key => {
            if (res.data.video[key]) {
              this.video[key] = res.data.video[key];
            }
          })
          if (this.video.videoSourceId != '') {
            chapter.getVideoInfo(this.video.videoSourceId).then(res => {
              if (res.data.videoInfo) {
                this.videoInfo = res.data.videoInfo;
              }
            })
          }
        })
        this.dialogVideoFormVisible = true;
        this.isUpdateVedio = true;
      },
      deleteVideo(id) {
        chapter.deleteVedio(id).then(res => {
          this.$message.success(res.message);
          this.getChapterVideo();
        })
      },
      saveOrUpdateVideo() {
        if (!this.isUpdateVedio) {
          chapter.addVideo(this.video).then(res => {
            this.$message.success(res.message);
            this.getChapterVideo();
            this.dialogVideoFormVisible = false;
          })
        } else {
          chapter.editVideo(this.video).then(res => {
            this.$message.success(res.message);
            this.dialogVideoFormVisible = false;
            this.getChapterVideo();
            this.dialogVideoFormVisible = false;
          })
        }
      },

      next() {
        this.$router.push({
          path: `/course/publish/${this.courseId}`
        })
      },
      clearVideo(){
        this.video.title = '';
        this.video.sort = '';
        this.video.isFree = 0;
        this.video.videoSourceId = '';
        this.video.videoOriginalName = '';
      },
    }
  }

</script>
