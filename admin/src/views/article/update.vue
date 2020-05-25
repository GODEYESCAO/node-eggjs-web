<template>
  <section>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
      <FormItem label="文章标题" prop="title">
        <Input v-model="formValidate.title" placeholder="文章标题"></Input>
      </FormItem>
      <FormItem label="文章作者" prop="author">
        <Input v-model="formValidate.author" placeholder="文章作者"></Input>
      </FormItem>
      <FormItem label="文章分类" v-if="categoryList.length > 0">
        <Select v-model="formValidate.category_id">
          <Option v-for="(item, index) in categoryList" :value="item.id" :key="index">{{item.name}}</Option>
        </Select>
      </FormItem>
      <FormItem label="文章封面" prop="cover">
        <div class="cover">
          <div class="upload">
            <Upload
              multiple
              type="drag"
              action="http://localhost:7001/api/v1/file"
              :show-upload-list="false"
              :on-success="uploadSuccess"
              :on-error="uploadError">
              <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>点击或者拖拽上传</p>
              </div>
            </Upload>
          </div>
          <div class="article-cover">
            <img :src="'http://localhost:7001'+formValidate.cover" alt="cover">
          </div>
        </div>
      </FormItem>
      <FormItem label="文章内容" prop="content">
        <mavon-editor
          v-model="formValidate.content"
          :ishljs="true"
          @imgAdd="imgAdd" @imgDel="imgDel"
          ref=md>
        </mavon-editor>

      </FormItem>
      <FormItem>
        <Button @click="handleReset('formValidate')">重置</Button>
        <Button type="primary" @click="handleSubmit('formValidate')" style="margin-left: 8px">提交</Button>
      </FormItem>
    </Form>
  </section>
</template>
<script>
  import {mapActions} from 'vuex';
  import getUploadToken from '../../libs/upload-token'
  import axios from 'axios'

  export default {
    data() {
      return {
        token: '',
        id: this.$route.query.id,
        detail: null,
        categoryList: [],
        formValidate: {
          title: '',
          author: '',
          category_id: '',
          cover: '',
          content: ''
        },
        ruleValidate: {
          title: [
            {required: true, message: '文章标题不能为空', trigger: 'blur'}
          ],
          author: [
            {required: true, message: '文章作者不能为空', trigger: 'blur'}
          ],
          cover: [
            {required: true, message: '文章封面不能为空', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '文章内容不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    created() {
      this._getArticle();
      this._getCategoryList();
      // this._getUploadToken();
    },
    methods: {
      ...mapActions({
        getArticle: 'article/getArticle',
        updateArticle: 'article/updateArticle',
        getCategoryList: 'category/getCategoryList'
      }),
      // 上传图片成功
      uploadSuccess(response) {
        const url = `${response.key}`;
        this.formValidate.cover = url;
        this.$Message.success('上传成功!');
      },
      // 上传图片失败
      uploadError(response) {
        this.$Message.success('上传失败!');
        console.log(response)
      },
      // 获取上传token
      async _getUploadToken() {
        try {
          const res = await getUploadToken();
          this.token = res.token;

        } catch (e) {
          console.log(e)
        }
      },
      // 获取文章列表
      async _getArticle() {
          const res = await this.getArticle({
            id: this.id
          });
          console.log(124,res)
          const article = res.data.data;

          this.formValidate.title = article.title;
          this.formValidate.author = article.author;
          this.formValidate.category_id = parseInt(article.category_id);
          this.formValidate.cover = article.cover;
          this.formValidate.content = article.content;
      },
      // 获取分类列表
      async _getCategoryList() {
        const res = await this.getCategoryList();
        this.categoryList = res.data.data;
      },
      // 更新
      async _updateArticle() {
        this.formValidate.id = this.id;

        try {
          await this.updateArticle(this.formValidate);
          this.$Message.success('更新成功!');
          this.$router.push('/article');

        } catch (e) {

        }
      },
      // 提交
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this._updateArticle();

          } else {
            this.$Message.error('请完成表单!');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      // 绑定@imgAdd event
      imgAdd(pos, $file){
          // 第一步.将图片上传到服务器.
          var formdata = new FormData();
          formdata.append('image', $file);
          axios({
              url: 'http://localhost:7001/api/v1/file',
              method: 'post',
              data: formdata,
              headers: { 'Content-Type': 'multipart/form-data' },
          }).then((url) => {
              // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
              /**
             * $vm 指为mavonEditor实例，可以通过如下两种方式获取
             * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
             * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
             */
            console.log(url)
              this.$refs.md.$img2Url(pos, 'http://localhost:7001'+url.data.data);
          })
      },
      imgDel(){}
    }
  }
</script>
<style scoped>
  .article-cover {
    width: 120px;
  }

  .article-cover img {
    width: 100%;
  }

  .cover {
    display: flex;
  }

  .cover .upload {
    width: 280px;
    margin-right: 32px;
  }
</style>
