export const handleError = (error, res) => {
    res.status(500).json({
        message: 'Ocurrio un error',
        error
    })
}