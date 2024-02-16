const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({message: 'There is some problem with the Server'});
}

module.exports = errorHandler;