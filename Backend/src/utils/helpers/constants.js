const publicRoutes = [
    '/users/signup',
    '/users/login',
    '/users/:userId',
    '/teams',
    '/teams/:teamId',
    '/contact',
    '/countries',
    '/countries/:countryId/cities',
    '/countries/:countryId/cities/:cityId/grounds',
    '/countries/:countryId/cities/:cityId/grounds/:groundId',
    '/countries/:countryId/cities/:cityId/grounds/:groundId/reviews',
    '/countries/:countryId/cities/:cityId/grounds/:groundId/reviews/:reviewId',
    '/countries/:countryId/cities/:cityId/grounds/:groundId/days',
    '/countries/:countryId/cities/:cityId/grounds/:groundId/days/:dayId',
    '/countries/:countryId/cities/:cityId/grounds/:groundId/days/:dayId/slots',
    '/countries/:countryId/cities/:cityId/grounds/:groundId/days/:dayId/slots/:slotId',
]

module.exports = { publicRoutes }