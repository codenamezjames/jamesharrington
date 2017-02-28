define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.title = "James Harrington";
      config.options.pushState = true;
      config.map([{ route: ['', 'home'], name: 'home', moduleId: 'public/home/index' }, { route: 'projects', name: 'projects', moduleId: 'public/projects/index' }, { route: 'contact', name: 'contact', moduleId: 'public/projects/index' }]);
      config.mapUnknownRoutes('public/not-found/index');
    };

    return App;
  }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('config/projects',[], function () {
    'use strict';

    [{
        title: 'JamesHarrington.com',
        img: 'http://lorempixel.com/400/200/abstract/',
        blurb: 'Excepteur sunt do deserunt ut aute ipsum commodo magna ea eu cillum. Anim voluptate ipsum non reprehenderit dolore labore Lorem fugiat aliqua excepteur. Ad in deserunt cupidatat amet. Aliqua tempor non commodo cillum culpa. Incididunt ipsum veniam velit sit exercitation consectetur nisi. Nostrud consectetur elit et veniam. Cillum irure enim reprehenderit minim aliqua aliquip cillum aliquip.'
    }];
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('public/contact/index',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var index = exports.index = function index() {
        _classCallCheck(this, index);

        this.info = 'stuffff';
    };
});
define('public/home/index',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var index = exports.index = function index() {
        _classCallCheck(this, index);

        this.info = 'stuff';
    };
});
define('public/projects/index',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var index = exports.index = function index() {
        _classCallCheck(this, index);
    };
});
define('public/not-found/index',["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var index = exports.index = function index() {
        _classCallCheck(this, index);
    };
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./app.css\"></require>\n  <router-view></router-view>\n</template>"; });
define('text!app.css', ['module'], function(module) { module.exports = "@import \"../node_modules/foundation-sites/dist/css/foundation-flex.min.css\";\n"; });
define('text!public/contact/index.html', ['module'], function(module) { module.exports = "<template>\n  Contacts\n</template>"; });
define('text!public/home/index.html', ['module'], function(module) { module.exports = "<template>\n  Home ${info}\n</template>"; });
define('text!public/not-found/index.html', ['module'], function(module) { module.exports = "<template>\n 404 Sorry\n</template>"; });
define('text!public/projects/index.html', ['module'], function(module) { module.exports = "<template>\n  projects\n</template>"; });
//# sourceMappingURL=app-bundle.js.map