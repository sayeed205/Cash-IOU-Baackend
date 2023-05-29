import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * Returns the user object from the request object.
 * If a property name is provided, it returns the value of that property from the user object.
 * @param property - The name of the property to return from the user object.
 * @param executionContext - The execution context object.
 * @returns The user object or the value of the specified property from the user object.
 */
export const GetUser = createParamDecorator(
    (property: string, executionContext: ExecutionContext) => {
        // Get the http adapter host object from the execution context
        const httpAdapterHost = executionContext.switchToHttp();
        // Get the request object from the http adapter host object
        const request = httpAdapterHost.getRequest();
        // If a property name is provided, return the value of that property from the user object
        if (property) {
            return request.user && request.user[property];
        }
        // Otherwise, return the user object
        return request.user;
    },
);
