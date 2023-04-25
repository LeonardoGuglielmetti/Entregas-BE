export default class UserDTO {

    static getTokenDTO = (user) => {
        return {
            name: `${user.first_name} ${user.last_name}`,
            role: user.role,
            id: user._id,
            avatar: user.avatar,
        };
    };

    static getRegisterDTO = () => {
        return {
            first_name,
            last_name,
            // age,
            email,
            // phone,
            // address,
            password: hashedPassword,
            avatar: `${req.protocol}://${req.hostname}:${process.env.PORT}/img/${file.filename}`
        }
    }
};