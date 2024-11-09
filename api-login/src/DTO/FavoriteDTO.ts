import { IsNotEmpty, IsString } from "class-validator";

export class FavoriteDTO {

    id?: number;

    @IsString()
    @IsNotEmpty()
    userId: number;

    @IsString()
    @IsNotEmpty()
    urlNew: string;

    @IsString()
    @IsNotEmpty()
    urlImage: string;

    @IsString()
    @IsNotEmpty()
    title: string;

    constructor(userId: number, urlNew: string, urlImage: string, title: string) {
        this.userId = userId;
        this.urlNew = urlNew;
        this.urlImage = urlImage;
        this.title = title;
    }
}

export default FavoriteDTO;