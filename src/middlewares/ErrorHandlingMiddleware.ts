import ResponseUtil from '../common/utils/ResponseUtil';
import ServiceError from '../common/errors/ServiceError';

async function ErrorHandlingMiddleware(
  err: any,
  req: any,
  res: any,
  next: any
) {
  console.log(`[ErrorHandlingMiddleware] Error: ${JSON.stringify(err)}`);
  console.log(err);

  if (err instanceof ServiceError) {
    ResponseUtil.sendErrorResponse(res, err);
  } else {
    ResponseUtil.sendErrorResponse(res, ServiceError.getInternalServerError());
  }
}

export default ErrorHandlingMiddleware;
