import md5 from 'js-md5';
/**
 * @param {string} str
 * @returns {Boolean}
 */
 export function setPassword(str) { // 密码加密
    if(str){
        return md5(md5(str) + 'guiplan')
    }else{
        return ''
    }
  }