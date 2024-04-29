function errorHandler(error, req, res, next) {
    console.log(error.stack);
    return res.json({
        statusCode: error.statusCode || 500,
        message: error.message || "CODER API ERROR"
    })
  }
  
  export default errorHandler;
  