import { StatusCodes } from '../constants/statusCodes';
import { CustomAPIError } from './customApi';

class NotFoundError extends CustomAPIError {
    public statusCode: StatusCodes;
    constructor(message: string) {
        super(message);
        this.statusCode = StatusCodes.NOT_FOUND;
    }
}

export { NotFoundError };
