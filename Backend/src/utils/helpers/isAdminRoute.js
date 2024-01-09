const isAdminRoute = (path) => {
    const adminRouteRegex = /^\/admin/;
    return adminRouteRegex.test(path);
};

module.exports = isAdminRoute;