const { userSpecificRoutes } = require('./constants');

const isUserSpecificRoute = (path, method) => {
    return userSpecificRoutes.some(route => {
        const routeRegex = new RegExp(`${route.route.replace(/:[^/]+/g, '[^/]+')}`);
        return routeRegex.test(path) && path.match(routeRegex)[0] === path && route.method==method;
    });
};

module.exports = isUserSpecificRoute;