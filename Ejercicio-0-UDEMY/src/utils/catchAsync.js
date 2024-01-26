function catchFunc(fn){
    return (req, res, next) => fn(req, res, next).catch(next);
}

export default catchFunc;