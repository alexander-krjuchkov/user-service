import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { userIdMaxValue, userIdMinValue } from './constants';

@Injectable()
export class ParseUserIdPipe implements PipeTransform<string, number> {
    transform(value: string): number {
        const id = Number(value);
        if (
            isNaN(id) ||
            !Number.isInteger(id) ||
            id < userIdMinValue ||
            id > userIdMaxValue
        ) {
            throw new BadRequestException(
                `Invalid id: must be an integer between ${userIdMinValue} and ${userIdMaxValue}`,
            );
        }
        return id;
    }
}
