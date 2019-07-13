import status from '../../constants/status-codes'
import commonError from '../../constants/common-errors'
import productModel from '../../models/products.model'
import categoryModel from '../../models/categories.model'

class productsCtrl {
    constructor() { }

    add(body) {
        return new Promise((resolve, reject) => {
            productModel.findOne({ 'name': body.product_name }, (err, products) => {        // check the product name exist or not
                if (err) {
                    reject(commonError.internal_server)
                } else {
                    if (products) {
                        // console.log(products)
                        reject({
                            status: status.conflict,
                            message: `product name already exist!`,
                            context: {
                                key: 'name'
                            }
                        })
                    } else {
                        console.log(body.category_id)
                        let product = new productModel()
                        product.category_id = body.category_id,
                        product.name = body.product_name,
                        product.description = body.product_description,
                        product.save(err => {                                              // save the products data into table
                            if (err) {
                                console.log(err)
                                reject(commonError.internal_server)
                            } else {
                                resolve({
                                    status: status.success,
                                    message: `Product details added succesfully`,
                                    body: {
                                        product: product
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
            productModel.find({}, (err, results) => {
                if (err) {
                    console.log(err)
                    reject(commonError.internal_server)
                } else {
                    if (results) {
                        resolve({
                            status: status.success,
                            message: `Product list`,
                            body: {
                                products: results
                            }
                        })

                    } else {
                        reject({
                            status: status.not_found,
                            message: `You have not added product list`,
                            context: {
                                key: 'not_found'
                            }
                        })
                    }
                }
            })
        })
    }

    productListCategoryWise(body) {
        return new Promise((resolve, reject) => {
            let aggregate = categoryModel.aggregate()

            aggregate.lookup({                                 // aggregate the products table based on category id
                from: 'products',
                localField: '_id',
                foreignField: 'category_id',
                as: 'products'
            })
            aggregate.unwind('products')                        
            aggregate.group({
                _id: '$_id',                                   // join the two tables based on category id
                category_name: { $first: '$name' },
                products: {
                    $push: {
                        product_id: '$products._id',
                        product_name: '$products.name',
                        product_description: '$products.description'

                    }
                },
            })
            aggregate.project({                                // final response output  
                '_id': 1,
                'products': 1,
                'category_name': 1
            })
            aggregate.exec((err, results) => {                 // execute the above written queries
                if (err) {
                    console.log(err)
                    reject(commonError.internal_server)        // if any server connetion error
                } else {
                    resolve({
                        status: status.success,
                        message: `Product list`,
                        body: {
                            products: results
                        }
                    })
                }
            })
        })
    }

    remove(body) {
        return new Promise((resolve, reject) => {
            // console.log(body.business_id)
            productModel.findByIdAndRemove(body.product_id, (err, result) => {
                if (err) {
                    reject(commonError.internal_server)
                } else {
                    if (result) {
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

export default new productsCtrl()