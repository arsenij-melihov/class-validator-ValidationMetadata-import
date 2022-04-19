import { plainToInstance } from 'class-transformer';
import {
  IsString,
  IsUUID,
  ValidationOptions,
  ValidationTypes,
  getMetadataStorage,
  validateSync,
} from 'class-validator';
import { ValidationMetadata } from 'class-validator/types/metadata/ValidationMetadata';
import { ValidationMetadataArgs } from 'class-validator/types/metadata/ValidationMetadataArgs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type GenericObject = any;

export function IsOptionalIf(
  condition: (object: GenericObject) => boolean,
  validationOptions?: ValidationOptions,
) {
  return function(object: GenericObject, propertyName: string): void {
    const args: ValidationMetadataArgs = {
      type: ValidationTypes.CONDITIONAL_VALIDATION,
      target: object.constructor,
      propertyName: propertyName,
      constraints: [
        (objectInner: GenericObject): boolean => {
          const isOptional = condition(objectInner);
          return !isOptional;
        },
      ],
      validationOptions: validationOptions,
    };
    getMetadataStorage().addValidationMetadata(new ValidationMetadata(args));
    // getMetadataStorage().addValidationMetadata(args as any); // unsafe workaround
  };
}

export class UserDto {
  @IsOptionalIf((o: UserDto) => !!o.user_name)
  @IsUUID(4)
  id!: string;

  @IsOptionalIf((o: UserDto) => !!o.id)
  @IsString()
  user_name!: string;
}

function main(): void {
  const dto = plainToInstance(UserDto, {
    id: '48dfbf1c-f964-4123-a2ae-650582936880',
  });

  const errors = validateSync(dto, { validationError: { target: false } });

  console.log({
    dto,
    errors: JSON.stringify(errors, null, 2),
  });
}

main();
