import {
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    Max,
    MaxLength,
    Min,
} from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    full_name: string;

    @IsOptional()
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    role: string;

    @IsOptional()
    @IsInt()
    @IsNotEmpty()
    @Min(0)
    @Max(2147483647)
    efficiency: number;
}
