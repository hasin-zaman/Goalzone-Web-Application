const { publicRoutes } = require('./constants');

const isPublicRoute = (path, method) => {
    return publicRoutes.some(route => {
        const regex = new RegExp(`${route.route.replace(/:[^/]+/g, '[^/]+')}`);
        return regex.test(path) && path.match(regex)[0] === path && route.method==method;
    });
};

module.exports = isPublicRoute;