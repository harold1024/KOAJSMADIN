/**
 * 构造树型结构数据,构造路由结构 v0.0.1
 * @param {*} data 数据源
 * @param {*} id id字段 默认 'id'
 * @param {*} parentId 父节点字段 默认 'parentId'
 * @param {*} children 孩子节点字段 默认 'children'
 */
function handleTree(data, id, parentId, children) {
  let config = {
    id: id || 'id',
    parentId: parentId || 'parentId',
    childrenList: children || 'children'
  };

  var childrenListMap = {};
  var nodeIds = {};
  var tree = [];

  for (let d of data) {
    let parentId = d[config.parentId]; // paraentId的值，比如为aa
    if (childrenListMap[parentId] == null) { // childrenListMap = {aa:[]}
      childrenListMap[parentId] = [];
    }
    nodeIds[d[config.id]] = d; // d[config.id]则为当前id的值，比如bb 最后则是 nodeIds = {bb:{整个对象内容}}
    childrenListMap[parentId].push(d); // childrenListMap = {aa:[{bb:{整个对象内容}}]}  后续由于这个aa直接是索引则可直接push多个原生到子元素中
  }

  for (let d of data) {
    let parentId = d[config.parentId];
    if (nodeIds[parentId] == null) { // 没有父节点则表示自己就是父节点元素
      tree.push(d);
    }
  }

  for (let t of tree) {
    adaptToChildrenList(t);
  }

  function adaptToChildrenList(o) {
    if (childrenListMap[o[config.id]] !== null) {
      o[config.childrenList] = childrenListMap[o[config.id]];
    }
    if (o[config.childrenList]) {
      for (let c of o[config.childrenList]) {
        adaptToChildrenList(c);
      }
    }
  }
  return tree;
}

function firstToUpper1(str) {
  return str.trim().toLowerCase().replace(str[0], str[0].toUpperCase());
}
function getRouter(arr) { // 映射路由信息
  // console.log(arr)
  if (!arr) {
      return
  }
  return arr.map(item => {
      let componentName = item.component
      let link = null
      let routerPath = item.path
      if (item.menuType == 'M') {
          componentName = 'Layout'
          if (item.isFrame != '0'){
              routerPath = '/' + routerPath
          }
          
      } else if (item.menuType == 'F') { // 按钮就不需要了
          return null
      }
      if (item.isFrame == '0') { // 挂外链 跳转外链地址
          link = item.path
      }
      let result = {
          "name": firstToUpper1(item.path),
          "path": routerPath,
          "hidden": item.hidden||false,
          "component": item.component || 'Layout',
          "meta": {
              "title": item.menuName,
              "icon": item.icon,
              "noCache": item.isCache=='0'?false:true,
              "link": link
          }
      }
      if (item.menuType == 'M') {
        if (item.isFrame != '0') { // 没有挂外链
          result.redirect = 'noRedirect'
          result.alwaysShow = item.visible == '0'?true:false // 这个字段放进去页面就无法切换了，只有是目录结构才可用此属性
        }
      }
      if (item.children && item.children.length > 0) { // 如果有长度与子元素
          let children = getRouter(item.children)
          if(children.length > 0){ // 有数据才添加children属性
              result.children = children
          }
      }
      return result
  }).filter(Boolean) // 过滤掉多余的空数组
}
module.exports = {
  getRouter,
  handleTree
}