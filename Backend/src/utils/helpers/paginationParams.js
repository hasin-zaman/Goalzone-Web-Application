const paginationParams = (query) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 5;
    const skip = (page - 1) * limit;

    return { page, limit, skip }
};

module.exports = paginationParams;