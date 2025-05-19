import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { UserNotFoundError } from './errors/user-not-found.error';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

    catch(exception: unknown, host: ArgumentsHost) {
        // In certain situations `httpAdapter` might not be available in the
        // constructor method, thus we should resolve it here.
        const { httpAdapter } = this.httpAdapterHost;

        const ctx = host.switchToHttp();

        const { httpStatus, errorMessage } =
            this.getErrorMessageAndStatus(exception);

        const responseBody = {
            success: false,
            result: {
                error: errorMessage,
            },
        };

        httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
    }

    private getErrorMessageAndStatus(exception: unknown): {
        httpStatus: number;
        errorMessage: string;
    } {
        switch (true) {
            case exception instanceof UserNotFoundError:
                return {
                    httpStatus: HttpStatus.NOT_FOUND,
                    errorMessage: 'User not found',
                };
            case exception instanceof HttpException:
                return {
                    httpStatus: exception.getStatus(),
                    errorMessage:
                        ((): string | void => {
                            const response = exception.getResponse();

                            if (typeof response === 'string') {
                                return response;
                            }
                            if (!('message' in response)) {
                                return;
                            }
                            if (Array.isArray(response.message)) {
                                return response.message.join('; ');
                            }
                            if (typeof response.message === 'string') {
                                return response.message;
                            }
                        })() ?? 'Something went wrong',
                };
            default:
                return {
                    httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
                    errorMessage: 'Internal server error',
                };
        }
    }
}
