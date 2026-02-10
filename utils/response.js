
class ApiResponse {

    success = (req, res, statusCode, statusMessage, data) => {
        console.log(req.url, req.method, ">", statusCode, data)
        return res.status(statusCode).json({
            message: statusMessage,
            data: data
        })
    }

    error = (req, res, statusCode, statusMessage) => {
        console.error(req.url, req.method, ">", statusCode)
        return res.status(statusCode).json({
            message: statusMessage,
        })
    }
}

export default new ApiResponse()