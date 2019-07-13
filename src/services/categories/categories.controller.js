import status from '../../constants/status-codes'
import commonError from '../../constants/common-errors'
import categoriesModel from '../../models/categories.model'
import productModel from '../../models/products.model'

class categoriesCtrl {
    constructor() {}

    add(body) {
        return new Promise((resolve, reject) => {
            categoriesModel.findOne({'name': body.category_name}, (err, categories) => {
                if(err) {
                    reject(commonError.internal_server)
                } else {
                    if(categories) {
                        console.log(categories)
                        reject({
                            status: status.conflict,
                            message: `category name already exist!`,
                            context: {
                                key: 'name'
                            }
                        })
                    } else {
                        let category = new categoriesModel()
                        category.name = body.category_name,
                        category.description = body.category_description,
                        category.save(err => {
                            if(err) {
                                console.log(err)
                                reject(commonError.internal_server)
                            } else {
                                resolve({
                                    status: status.success,
                                    message: `Category details added succesfully`,
                                    body: {
                                        category: category
                                    }
                                })
                            }
                        })

                    }
                }
            })
        })
    }

    list(body) {
        return new Promise((resolve, reject) => {
            categoriesModel.find({}, (err, results) => {
                if(err) {
                    console.log(err)
                    reject(commonError.internal_server)
                } else {
                    if(results) {
                        resolve({
                            status: status.success,
                            message: `Categories list`,
                            body: {
                                categories: results
                            }
                        })

                    } else {
                        reject({
                            status: status.not_found,
                            message: `You have not added category liat`,
                            context: {
                                key: 'not_found'
                            }
                        })
                    }
                }
            })
        })
    }

    remove(body) {
        return new Promise((resolve, reject) => {
            this.isCategoryExists(body.category_id).then(category => {
                categoriesModel.findByIdAndRemove(category._id, (err, categories) => {
                    if (err) {
                        reject(commonError.internal_server)
                    } else {
                        this.removeProductAssociation(categories._id)
                        resolve({
                            status: status.success,
                            message: `Category removed successfully.`,
                            body: {}
                        })
                    }
                })
            }).catch(err => {
                reject(err)
            })
        })
    }

    isCategoryExists(category_id) {
        return new Promise((resolve, reject) => {
            categoriesModel.findOne({
                _id: category_id
            }, (err, res) => {
                if (err) {
                    reject(commonError.internal_server)
                } else {
                    if (res) {
                        resolve(res)
                    } else {
                        reject({
                            status: status.not_found,
                            message: `Category is not exists!`,
                            context: {
                                key: 'not_found'
                            }
                        })
                    }
                }
            })
        })
    }

    removeProductAssociation(category_id) {
        productModel.find({'category_id': category_id}, (err, products) => {
            if(err) {
                reject(commonError.internal_server)
            } else {
                if(products) {
                    products.forEach(product => {
                        this.removeProductAssignedFromCategoryId(product._id)
                    })
                } else {
                    reject({
                        status: status.not_found,
                        message: `Category does not exist!`,
                        context: {
                            key: `not_found`
                        }
                    })
                }
            }
        })
    }

    removeProductAssignedFromCategoryId(product_id) {
        return new Promise((resolve, reject) => {
            productModel.findByIdAndRemove(product_id, (err, result) => {
                if(err) {
                    reject(commonError.internal_server)
                } else {
                    if(result) {
                        resolve({
                            status: status.success,
                            message: `Product deleted succesfully`,
                            body: {}
                        })
                    } else {
                        reject({
                            status: status.not_found,
                            message: `Product does not exist!`,
                            context: {
                                key: `not_found`
                            }
                        })
                    }
                }
            })
        })
    }


}

export default new categoriesCtrl()