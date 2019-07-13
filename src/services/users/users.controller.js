import status from '../../constants/status-codes'
import commonError from '../../constants/common-errors'
import usersModel from '../../models/users.model'
import userRolesModel from '../../models/user_role.model'

class usersCtrl {
    constructor() { }

    register(body) {
        return new Promise((resolve, reject) => {
            usersModel.findOne({ 'phone': body.phone }, (err, users) => {        // check the uses phone exist or not
                if (err) {
                    reject(commonError.internal_server)
                } else {
                    if (users) {
                        reject({
                            status: status.conflict,
                            message: `User already exist!`,
                            context: {
                                key: 'phone'
                            }
                        })
                    } else {
                       
                        let user = new usersModel()
                        user.name = body.name,
                        user.phone = body.phone,
                        user.email = body.email,
                        user.gender = body.gender,
                        user.address = body.address,
                        user.save(err => {                                              // save the users data into table
                            if (err) {
                                console.log(err)
                                reject(commonError.internal_server)
                            } else {
                                usersModel.find({}, (err, users) => {                   // get all users from user table
                                    if(err) {
                                        reject(commonError.internal_server)
                                    } else {
                                        if(users.length === 1) {                         // check if users records length is equall to 1 or not
                                            this.insertUserRoleAsAdmin(user._id)
                                        } else {
                                            this.inserUserRoleAsDifferent(user._id,body.user_role) 
                                        }
                                    }
                                })
                                resolve({
                                    status: status.success,
                                    message: `User added succesfully`,
                                    body: {
                                        user: user
                                    }
                                })
                            }
                        })

                    }
                }
            })
        })
    }

    insertUserRoleAsAdmin(user_id) {                                    // if user table is empty role is defined as admin for that user
        return new Promise((resolve, reject) => {
            usersModel.findOne({ 'user_id': user_id }, (err, users) => {        // check the uses id exist or not
                if (err) {
                    reject(commonError.internal_server)
                } else {
                    if (users) {
                        reject({
                            status: status.conflict,
                            message: `User already exist!`,
                            context: {
                                key: 'phone'
                            }
                        })
                    } else {
                        let userRole = new userRolesModel()
                        userRole.user_id = user_id,
                        userRole.role_name = 'admin',
                        userRole.save(err => {                                              // save the users data into table
                            if (err) {
                                console.log(err)
                                reject(commonError.internal_server)
                            } else {
                                console.log('User role added as admin')
                            }
                        })

                    }
                }
            })
        })
    }

    inserUserRoleAsDifferent(user_id,user_role) {            // if user table is not empty role is defined as what we send as input role
        return new Promise((resolve, reject) => {
            usersModel.findOne({ 'user_id': user_id }, (err, users) => {        // check the uses id exist or not
                if (err) {
                    reject(commonError.internal_server)
                } else {
                    if (users) {
                        reject({
                            status: status.conflict,
                            message: `User already exist!`,
                            context: {
                                key: 'phone'
                            }
                        })
                    } else {
                        let userRole = new userRolesModel()
                        userRole.user_id = user_id,
                        userRole.role_name = user_role,
                        userRole.save(err => {                                              // save the users role data into table
                            if (err) {
                                console.log(err)
                                reject(commonError.internal_server)
                            } else {
                                console.log('User role added as vendor')
                            }
                        })

                    }
                }
            })
        })
    }

    list(body) {
        return new Promise((resolve, reject) => {
            usersModel.find({}, (err, results) => {
                if (err) {
                    console.log(err)
                    reject(commonError.internal_server)
                } else {
                    if (results) {
                        resolve({
                            status: status.success,
                            message: `Users list`,
                            body: {
                                users: results
                            }
                        })

                    } else {
                        reject({
                            status: status.not_found,
                            message: `You have not added users`,
                            context: {
                                key: 'not_found'
                            }
                        })
                    }
                }
            })
        })
    }

}

export default new usersCtrl()