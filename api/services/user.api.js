const UserService = require('../../services/user.service');

const UserAPI = {
    usersList: (req,res) => {
        let getUserList = UserService.getUserList()
        let getTotalUsers = UserService.getTotalUsers()

        Promise.all([getUserList, getTotalUsers])
        .then(([userListInDb, totalUserInDb]) => {
            return res.status(200).json({
                meta: {
                    status: 200
                },
                count: totalUserInDb,
                users: userListInDb
            });
        })
        .catch(error => {
            return res.status(400).json({
                status: 400,
                message: error.message
            })
        });
    },
    getUser:(req,res) => {
        const userId = req.params.id;
        UserService.getUserByPk(userId)
        .then(user => {
            const id = users.id
            const name = users.name
            const user = users.user
            const email = users.email
            const adress = users.adress
            const thumbnail = users.thumbnail

            return res.status(200).json({
                meta: {
                    status: 200
                },
                user : {
                    id,
                    name,
                    user,
                    email,
                    adress,
                    thumbnail
                }
            });
        })
        .catch(error => {
            return res.status(400).json({
                status: 400,
                message: error.message
            })
        });
    }
}

module.exports = UserAPI;