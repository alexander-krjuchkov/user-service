import {
    IsInt,
    IsNotEmpty,
    IsOptional,
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

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(userFullNameMaxLength)
    full_name?: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(userRoleMaxLength)
    role?: string;

    @IsOptional()
    @IsInt()
    @IsNotEmpty()
    @Min(userEfficiencyMinValue)
    @Max(userEfficiencyMaxValue)
    efficiency?: number;
}
