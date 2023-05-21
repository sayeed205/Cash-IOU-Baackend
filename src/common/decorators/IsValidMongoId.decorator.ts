import { ValidationOptions, registerDecorator } from 'class-validator';
import { isValidObjectId } from 'mongoose';

export function IsValidMongoId(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsValidMongoId',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                validate(value: any) {
                    return isValidObjectId(value);
                },
            },
        });
    };
}
