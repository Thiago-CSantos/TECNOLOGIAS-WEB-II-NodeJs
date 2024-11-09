import FavoriteDb from '../../database/Model/Favorite'
import UsersDb from '../../database/Model/Users'
import FavoriteDTO from '../DTO/FavoriteDTO';
import ErrorResponseStatus from '../Err/ErrorResponseStatus';

class Favorite {
    id: number;
    userId: string;
    urlNew: string;
    urlImage: string;
    title: string;

    constructor(id: number = 0, userId: string = '', urlNew: string = '', urlImage: string = '', title: string = '') {
        this.id = id;
        this.userId = userId;
        this.urlNew = urlNew;
        this.urlImage = urlImage;
        this.title = title;
    }

    public async createFavorite(dto: FavoriteDTO): Promise<Favorite | ErrorResponseStatus> {
        const user = await UsersDb.findByPk(dto.userId);
        if (!user) {
            return {
                status: 404,
                message: "Usuário não encontrado",
                error: "Usuário não encontrado"
            } as ErrorResponseStatus;
        }

        const favorite = await FavoriteDb.create({
            id_user: dto.userId,
            urlNew: dto.urlNew,
            urlImage: dto.urlImage,
            title: dto.title
        });
        return new Favorite(favorite.dataValues.id, favorite.dataValues.id_user, favorite.dataValues.urlNew, favorite.dataValues.urlImage, favorite.dataValues.title);
    }

}
export default Favorite;