const { privateRoutes } = require('./constants');

const isPrivateRoute = (path, method) => {
    return privateRoutes.some(route => {
        const routeRegex = new RegExp(`${route.route.replace(/:[^/]+/g, '[^/]+')}`);
        return routeRegex.test(path) && path.match(routeRegex)[0] === path && route.method==method;
    });
};

module.exports = isPrivateRoute;