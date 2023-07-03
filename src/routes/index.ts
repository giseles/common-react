export const routes = [
  { path: '/login', component: 'Login' },
  {
    path: '/',
    routes: [
      { path: '/', component: 'Home' },
      { path: '/home', component: 'Home' }, 
    ]
  },
  { path: '/*', component: '404' }
]
