const Roles = require("../enums/roles");

const publicRoutes = [
    { route: '/users/signup', method: 'POST' },
    { route: '/users/login', method: 'POST' },
    { route: '/users/:userId', method: 'GET' },
    { route: '/teams', method: 'GET' },
    { route: '/teams/:teamId', method: 'GET' },
    { route: '/contact', method: 'POST' },
    { route: '/countries', method: 'GET' },
    { route: '/countries/:countryId/cities', method: 'GET' },
    { route: '/countries/:countryId/cities/:cityId/grounds', method: 'GET' },
    { route: '/countries/:countryId/cities/:cityId/grounds/:groundId', method: 'GET' },
    { route: '/countries/:countryId/cities/:cityId/grounds/:groundId/reviews', method: 'GET' },
    { route: '/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/:reviewId', method: 'GET' },
    { route: '/countries/:countryId/cities/:cityId/grounds/:groundId/days', method: 'GET' },
    { route: '/countries/:countryId/cities/:cityId/grounds/:groundId/days/:dayId', method: 'GET' },
    { route: '/countries/:countryId/cities/:cityId/grounds/:groundId/days/:dayId/slots', method: 'GET' },
    { route: '/countries/:countryId/cities/:cityId/grounds/:groundId/days/:dayId/slots/:slotId', method: 'GET' },
];

  

const authorizationRoutes = [
    { route: '/teams/:userId', method: 'POST', roles: [Roles.CAPTAIN] },
    { route: '/teams/:teamId/:userId', method: 'PATCH', roles: [Roles.CAPTAIN] },
    { route: '/teams/:teamId/approve/:requestId/:userId', method: 'PATCH', roles: [Roles.CAPTAIN] },
    { route: '/teams/:teamId/decline/:requestId/:userId', method: 'PATCH', roles: [Roles.CAPTAIN] },
    { route: '/teams/:teamId', method: 'DELETE', roles: [Roles.CAPTAIN] },
    { route: '/countries/:countryId/cities/:cityId/grounds/:userId', method: 'POST', roles: [Roles.GROUNDINCHARGE] },
    { route: '/countries/:countryId/cities/:cityId/grounds/:groundId', method: 'PATCH', roles: [Roles.GROUNDINCHARGE] },
    { route: '/countries/:countryId/cities/:cityId/grounds/deactivate/:groundId', method: 'PATCH', roles: [Roles.GROUNDINCHARGE] },
    { route: '/countries/:countryId/cities/:cityId/grounds/:groundId/days/:dayId/slots/:userId', method: 'POST', roles: [Roles.GROUNDINCHARGE] },
    { route: '/countries/:countryId/cities/:cityId/grounds/:groundId/days/:dayId/slots/:slotId', method: 'PATCH', roles: [Roles.GROUNDINCHARGE] },
    { route: '/countries/:countryId/cities/:cityId/grounds/:groundId/days/:dayId/slots/:slotId', method: 'DELETE', roles: [Roles.GROUNDINCHARGE] },
]

module.exports = { publicRoutes, authorizationRoutes }