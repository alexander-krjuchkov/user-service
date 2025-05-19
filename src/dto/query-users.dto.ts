import { IsOptional, IsString, MaxLength } from 'class-validator';
import { userRoleMaxLength } from '../constants';

export class QueryUsersDto {
    @IsOptional()
    @IsString()
    @MaxLength(userRoleMaxLength)
    role?: string;
}
