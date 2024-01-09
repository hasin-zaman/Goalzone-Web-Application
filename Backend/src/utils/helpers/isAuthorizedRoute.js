const { authorizationRoutes } = require('./constants');

const isAuthorizedRoute = (path, method) => {
    return authorizationRoutes.some(route => {
        const routeRegex = new RegExp(`${route.route.replace(/:[^/]+/g, '[^/]+')}`);
        return {isAuthorized: routeRegex.test(path) && path.match(routeRegex)[0] === path && route.method==method, roles: route.roles}
    });
};

module.exports = isAuthorizedRoute;