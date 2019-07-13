import status from '../constants/status-codes'

const errors = {
    internal_server : {
        status: status.internal_error,
        message: `Internal server error! Please try after some time`,
        context: {}
    }
}

export default errors