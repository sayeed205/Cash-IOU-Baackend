import { ValidationOptions, registerDecorator } from 'class-validator';
import { Types } from 'mongoose';
import { MongoIdException } from 'src/exceptions';

/**
 * Validates that a given value is a valid MongoDB ObjectId.
 * @param validationOptions Options to pass to the validation decorator.
 */
export function IsValidMongoId(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsValidMongoId',
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: {
                /**
                 * Validates that a given value is a valid MongoDB ObjectId.
                 * @param value The value to validate.
                 * @returns True if the value is a valid MongoDB ObjectId, false otherwise.
                 */
                validate(value: string) {
                    console.log(value);
                    if (!Types.ObjectId.isValid(value)) {
                        console.log(value);
                        throw new MongoIdException(value);
                    }
                    return true;
                },
            },
        });
    };
}
