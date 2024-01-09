const Methods = require("../enums/methods");
const Roles = require("../enums/roles");

const privateRoutes = [
    { route: '/users/:userId', method: Methods.PATCH },
    { route: '/users/:userId', method: Methods.DELETE },
    { route: '/teams/:userId', method: Methods.POST },
    { route: '/teams/:teamId/:userId', method: Methods.PATCH },
    { route: '/teams/:teamId/send/:userId', method: Methods.PATCH },
    { route: '/teams/:teamId/unsend/:userId', method: Methods.PATCH },
    { route: '/teams/:teamId/approve/:requestId/:userId', method: Methods.PATCH },
    { route: '/teams/:teamId/decline/:requestId/:userId', method: Methods.PATCH },
    { route: '/teams/:teamId/leaveTeam/:userId', method: Methods.PATCH },
    { route: '/teams/:teamId', method: Methods.DELETE },
    { route: '/countries/:countryId/cities/:cityId/grounds/:userId', method: Methods.POST },
    { route: '/countries/:countryId/cities/:cityId/grounds/:groundId', method: Methods.PATCH },
    { route: '/countries/:countryId/cities/:cityId/grounds/deactivate/:groundId', method: Methods.PATCH },
    { route: '/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/:reviewId', method: Methods.PATCH },
    { route: '/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/:reviewId', method: Methods.DELETE },
    { route: '/countries/:countryId/cities/:cityId/grounds/:groundId/days/:dayId/slots/:userId', method: Methods.POST },
    { route: '/countries/:countryId/cities/:cityId/grounds/:groundId/days/:dayId/slots/:slotId', method: Methods.PATCH },
    { route: '/countries/:countryId/cities/:cityId/grounds/:groundId/days/:dayId/slots/:slotId', method: Methods.DELETE },
];

const authorizationRoutes = [
    { route: '/teams/:userId', method: Methods.POST, roles: [Roles.CAPTAIN] },
    { route: '/teams/:teamId/:userId', method: Methods.PATCH, roles: [Roles.CAPTAIN] },
    { route: '/teams/:teamId/approve/:requestId/:userId', method: Methods.PATCH, roles: [Roles.CAPTAIN] },
    { route: '/teams/:teamId/decline/:requestId/:userId', method: Methods.PATCH, roles: [Roles.CAPTAIN] },
    { route: '/teams/:teamId', method: Methods.DELETE, roles: [Roles.CAPTAIN] },
    { route: '/countries/:countryId/cities/:cityId/grounds/:userId', method: Methods.POST, roles: [Roles.GROUNDINCHARGE] },
    { route: '/countries/:countryId/cities/:cityId/grounds/:groundId', method: Methods.PATCH, roles: [Roles.GROUNDINCHARGE] },
    { route: '/countries/:countryId/cities/:cityId/grounds/deactivate/:groundId', method: Methods.PATCH, roles: [Roles.GROUNDINCHARGE] },
    { route: '/countries/:countryId/cities/:cityId/grounds/:groundId/days/:dayId/slots/:userId', method: Methods.POST, roles: [Roles.GROUNDINCHARGE] },
    { route: '/countries/:countryId/cities/:cityId/grounds/:groundId/days/:dayId/slots/:slotId', method: Methods.PATCH, roles: [Roles.GROUNDINCHARGE] },
    { route: '/countries/:countryId/cities/:cityId/grounds/:groundId/days/:dayId/slots/:slotId', method: Methods.DELETE, roles: [Roles.GROUNDINCHARGE] },
]

const userSpecificRoutes = [
    { route: '/users/:userId', method: Methods.PATCH },
    { route: '/users/:userId', method: Methods.DELETE },
    { route: '/teams/:userId', method: Methods.POST },
    { route: '/teams/:teamId/:userId', method: Methods.PATCH },
    { route: '/teams/:teamId', method: Methods.DELETE },
    { route: '/countries/:countryId/cities/:cityId/grounds/:userId', method: Methods.POST },
    { route: '/countries/:countryId/cities/:cityId/grounds/:groundId', method: Methods.PATCH },
    { route: '/countries/:countryId/cities/:cityId/grounds/deactivate/:groundId', method: Methods.PATCH },
    { route: '/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/:reviewId', method: Methods.PATCH },
    { route: '/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/:reviewId', method: Methods.DELETE },
    { route: '/countries/:countryId/cities/:cityId/grounds/:groundId/days/:dayId/slots/:userId', method: Methods.POST },
    { route: '/countries/:countryId/cities/:cityId/grounds/:groundId/days/:dayId/slots/:slotId', method: Methods.PATCH },
    { route: '/countries/:countryId/cities/:cityId/grounds/:groundId/days/:dayId/slots/:slotId', method: Methods.DELETE },
]

module.exports = { privateRoutes, authorizationRoutes, userSpecificRoutes }