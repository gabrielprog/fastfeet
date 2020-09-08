import Avatar from '../model/avatarModel';

class AvatarController {
    async store(request, response) {
        const {filename: path_file, originalname: name_file} = request.file;

        const addPhoto = await Avatar.create({
            path_file,
            name_file
        });

        return response.status(201).json({status: true});
    }
}

export default new AvatarController();
