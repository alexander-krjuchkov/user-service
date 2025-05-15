import {
    IsInt,
    IsNotEmpty,
    IsString,
    Max,
    MaxLength,
    Min,
} from 'class-validator';

export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    full_name: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(255)
    role: string;

    @IsInt()
    @IsNotEmpty()
    @Min(0)
    @Max(2147483647)
    efficiency: number;
}
