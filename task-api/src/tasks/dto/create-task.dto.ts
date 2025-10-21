import { 
    IsString, min, MinLength
} from 'class-validator';

export class CreateTaskDto {
    
    @IsString()
    @MinLength(1)
    title: string

    @IsString()
    @MinLength(1)
    description: string
}

//esta es otra forma de hacerlo
// export interface CreateTaskDto {
//     title: string,
//     description: string
// } 