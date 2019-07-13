import mongoose from 'mongoose'

let userRolesSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    role_name: {
        type: String,
        required: true,
        index: true
    },
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})

let userRolesModel = mongoose.model('user_roles', userRolesSchema, 'user_roles')

export default userRolesModel