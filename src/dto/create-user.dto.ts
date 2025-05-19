import {
    IsInt,
    IsNotEmpty,
    IsString,
    Max,
    MaxLength,
    Min,
} from 'class-validator';
import {
    userEfficiencyMaxValue,
    userEfficiencyMinValue,
    userFullNameMaxLength,
    userRoleMaxLength,
} from '../constants';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(userFullNameMaxLength)
    full_name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(userRoleMaxLength)
    role: string;

    @IsInt()
    @IsNotEmpty()
    @Min(userEfficiencyMinValue)
    @Max(userEfficiencyMaxValue)
    efficiency: number;
}
