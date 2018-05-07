//frontend routes
export const LOGGED_IN_ROUTES = [{
  title: 'reservation',
  to: '/reservation'
}, {
  title: 'devices',
  to: '/devices'
},{
  title: 'profile',
  to: '/profile'
}];

export const NOT_LOGGED_IN_ROUTES = [{
  title: 'about',
  to: '/about'
}]


export const REGISTER_ROUTES = [{
  title: 'Sign in',
  to: '/login'
}, {
  title: 'Sign up',
  to: 'register'
}]

export const LOGOUT_ROUTE = [{
  title: 'logout',
  to: '/logout'
}]

export const DASHBOARD_ROUTES = [{
  title: 'My reservations',
  to: '/myreservations'
},{
  title: 'My profile',
  to: '/profile'
}, {
  title: 'Edit profile',
  to: '/profile/edit'
}]

//backend ROUTES
export const RESERVATION_BASE_URL = '/api/reservations';
export const DEVICE_BASE_URL = '/api/devices'
export const USER_BASE_URL = '/api/users'
