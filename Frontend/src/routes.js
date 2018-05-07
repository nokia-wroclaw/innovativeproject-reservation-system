//frontend routes
const ROUTES = [{
  title: 'reservation',
  to: '/reservation'
}, {
  title: 'devices',
  to: '/devices'
}];

const REGISTER_ROUTES = [{
  title: 'Sign in',
  to: '/login'
}]

const DASHBOARD_ROUTES = [{
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
const RESERVATION_BASE_URL = '/api/reservations';
const DEVICE_BASE_URL = '/api/devices'
const USER_BASE_URL = '/api/users'
