<template>
  <div :class="className" :id="id"  :style="{height:height,width:width}"></div>
</template>

<script>
/**
* wangeditor富文本编辑器封装
* v0.0.4 修复bug富文本内容为空时不更新的问题
* 修复bug 编辑器打开同一文件两次时，数据自动去掉了。
* 添加了v-model双向绑定功能
**/
  // import * as E from 'wangeditor'
  import E from 'wangeditor'
  export default {
    name: 'wangeditor',
    props: {
	  modelValue: {
		  type: String,
		  default: 0,
	  },
      className: {
        type: String,
        default: 'wangeditor'
      },
	  uploadUrl:{ // 图片上传地址配置
		type: String,
        default: 'http://www.guiplan.com'
	  },
	  showUrl:{ // 图片显示地址
		  type:String,
		  default:'http://www.guiplan.com'
	  },
	 uploadImgHeaders:'',
	 uploadFileName:{
		type: String,
        default: 'file'
	 },
      id:{
        type: String,
        default: 'wangeditor'
      },
      width: {
        type: String,
        default: '100%'
      },
      height: {
        type: String,
        default: '600px'
      }
    },
    mounted() {
      this.init()
    },
    data() {
      return {
        editor: null,
		content:''
      }
    },
    watch: {
		modelValue(val) {
		  if (val) {
			if (val !== this.content) {
			  this.setHtml(val);
			}
		  } else {
			this.content = '' // 注意：这里清空掉内容之后再清空掉content否则  val值变化的值与content值相等则结果就为空了
			this.setHtml('');
		  }
		}
    },
    methods: {
      init() { // 初始化
        this.editor = new E('#' + this.id)
		this.editor.config.uploadImgServer = this.uploadUrl // 图片上传地址
		if(this.uploadImgHeaders){ // 图片上传头部设置
			this.editor.config.uploadImgHeaders = this.uploadImgHeaders
		}
		this.editor.config.uploadFileName = this.uploadFileName
		var _this = this
		this.content = ''
		// this.setHtml(this.modelValue);
		this.editor.config.onchange = (newHtml)=> {// 需要改变this指向域
			// console.log("数据变化中~~~~~~")
			
			this.content = newHtml
			//console.log("函数发送出去")
			// this.$emit('input', newHtml);;
			this.$emit('update:modelValue', newHtml);
		}
		this.editor.config.uploadImgHooks = {
			before: function (xhr, editor, files) {
				// 图片上传之前触发
				// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
				
				// 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
				// return {
				//     prevent: true,
				//     msg: '放弃上传'
				// }
			},
			success: function (xhr, editor, result) {
				// 图片上传并返回结果，图片插入成功之后触发
				// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
			},
			fail: function (xhr, editor, result) {
				// 图片上传并返回结果，但图片插入错误时触发
				// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
			},
			error: function (xhr, editor) {
				// 图片上传出错时触发
				// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
			},
			timeout: function (xhr, editor) {
				// 图片上传超时时触发
				// xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
			},

			// 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
			// （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
			customInsert: function (insertImg, result, editor) {
				// 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
				// insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果

				// 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
			  if(result.data){
				  
				var url = _this.showUrl + result.data.file
				insertImg(url)
			  }
			  
				// result 必须是一个 JSON 格式字符串！！！否则报错
			}
		}
		this.editor.create()
      },
      getHtml(){ // 获取文本框内容
        return this.editor.txt.html()
      },
	  append(data){
		  this.editor.txt.append(data)
	  },
	  clear(){
		  this.editor.txt.clear()
	  },
	  getContent(){
		  return this.editor.txt.text()
	  },
	  setHtml(data){
		  this.editor.txt.html(data)
	  }
    }
  }
</script>

<style scoped>
 
</style>
