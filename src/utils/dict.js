import {findWhereGetDictDataList} from '../api/dictData'

/**
 * 获取字典数据
 */
export function useDict(...args) {
  const res = ref({});
  return (() => {
    args.forEach((d, index) => {
      res.value[d] = [];
      findWhereGetDictDataList({
        start: 0, // 分页起始位置
        limit: 100, // 分页显示条数
        dictType:d
      }).then(resp => {
        res.value[d] = resp.data.list.map(p => ({ label: p.dictLabel, value: p.dictValue, elTagType: p.listClass, elTagClass: p.cssClass }))
      })
    })
    return toRefs(res.value);
  })()
}