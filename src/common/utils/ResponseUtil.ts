import ServiceError from '../errors/ServiceError';
const ResponseUtil = (function () {
  return {
    sendSuccessResponse: function (res: any, responseBody: any) {
      res.send({
        status: {
          success: true,
        },
        data: responseBody,
      });
    },

    sendErrorResponse: function (res: any, error: ServiceError) {
      let obj = {
        success: false,
        errorName: error.getName(),
        errorMsg: error.getMessage(),
      };
      console.log(obj);
      res.send({
        status: obj,
      });
    },
  };
})();

export default ResponseUtil;
