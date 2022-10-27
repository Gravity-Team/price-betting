import { ParamsDictionary, Query } from 'express-serve-static-core';
import { RequestHandler } from 'express';

const asyncHandler = <P = ParamsDictionary, ResBody = any, ReqBody = any, ReqQuery = Query>(
    fn: (...args: Parameters<RequestHandler<P, ResBody, ReqBody, ReqQuery>>) => void | Promise<void>
): RequestHandler<P, ResBody, ReqBody, ReqQuery> =>
    function asyncUtilWrap(...args: Parameters<RequestHandler<P, ResBody, ReqBody, ReqQuery>>) {
        const fnReturn = fn(...args);
        const next: any = args[args.length - 1];
        return Promise.resolve(fnReturn).catch(next);
    };

export { asyncHandler };
