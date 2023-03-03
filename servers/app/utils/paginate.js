function paginate(data=[],start=1,total=0,limit=10){
    return {
        data,
        start,
        total,
        totalPage:Math.ceil(total/limit),
        limit
    }
}

module.exports = paginate