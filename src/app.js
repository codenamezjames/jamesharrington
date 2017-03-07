export class App {
  configureRouter (config, router){
    this.router = router
    config.title = "James Harrington"
    config.options.pushState = true
    config.map([
      {route:['', 'home'], name:'home', moduleId:'public/home/index'},
      {route:'projects', name:'projects', moduleId:'public/projects/index'},
      {route:'about', name:'about', moduleId:'public/about/index'}
    ])
    config.mapUnknownRoutes('public/not-found/index')
  }
}
