const { publicRoutes } = require('./constants');

const isPublicRoute = (path) => {
    return publicRoutes.some(route => {
        const regex = new RegExp(`${route.replace(/:[^/]+/g, '[^/]+')}`);
        return regex.test(path) && path.match(regex)[0] === path;
    });
};

module.exports = isPublicRoute;