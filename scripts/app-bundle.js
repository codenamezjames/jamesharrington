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
      config.map([{ route: ['', 'home'], name: 'home', moduleId: 'public/home/index' }, { route: 'projects', name: 'projects', moduleId: 'public/projects/index' }, { route: 'about', name: 'about', moduleId: 'public/about/index' }]);
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
define('config/projects',['exports'], function (exports) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.default = [{
        title: 'JamesHarrington.com',
        img: {
            src: 'http://lorempixel.com/400/400/abstract/',
            alt: 'lorem pixle'
        },
        blurb: 'Cillum reprehenderit id exercitation fugiat id et.',
        discription: 'https://github.com/jamesharrington/dumbpaste'
    }, {
        title: 'JamesHarrington.com',
        img: {
            src: 'http://lorempixel.com/400/400/abstract/',
            alt: 'lorem pixle'
        },
        blurb: 'Cillum reprehenderit id exercitation fugiat id et.',
        discription: ''
    }, {
        title: 'JamesHarrington.com',
        img: {
            src: 'http://lorempixel.com/400/400/abstract/',
            alt: 'lorem pixle'
        },
        blurb: 'Cillum reprehenderit id exercitation fugiat id et.',
        discription: ''
    }, {
        title: 'JamesHarrington.com',
        img: {
            src: 'http://lorempixel.com/400/400/abstract/',
            alt: 'lorem pixle'
        },
        blurb: 'Cillum reprehenderit id exercitation fugiat id et.',
        discription: 'Laboris nulla aliqua velit aute nostrud dolor pariatur sunt do deserunt qui. Eu sunt eiusmod in eu laboris duis cillum. Est elit labore pariatur excepteur nulla in tempor cillum. Sunt mollit deserunt quis nisi consectetur laborum elit id enim. Anim eu amet consequat voluptate consectetur nostrud. Enim ut cupidatat mollit dolore aliquip ex sunt ipsum officia.'
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
define('public/about/index',["exports"], function (exports) {
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
define('public/home/index',['exports', 'aurelia-fetch-client', '../../config/projects'], function (exports, _aureliaFetchClient, _projects) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.index = undefined;

    var _projects2 = _interopRequireDefault(_projects);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var client = new _aureliaFetchClient.HttpClient();

    var index = exports.index = function () {
        function index() {
            _classCallCheck(this, index);

            this.projects = _projects2.default;
        }

        index.prototype.submitContact = function submitContact() {
            var url = 'https://maker.ifttt.com/trigger/contact/with/key/bR8ZKb3setep__kjb2YU9YGgWgsmDiq1dI7xFqYMMV6';

            console.log(this.contact);
            client.fetch(url, {
                method: 'post',
                body: { "value1": JSON.stringify(this.contact, null, 2) }
            }).then(function (data) {
                console.log(data);
            });
        };

        return index;
    }();
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
define('public/projects/index',['exports', '../../config/projects'], function (exports, _projects) {
    'use strict';

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    exports.index = undefined;

    var _projects2 = _interopRequireDefault(_projects);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError("Cannot call a class as a function");
        }
    }

    var index = exports.index = function index() {
        _classCallCheck(this, index);

        this.projects = _projects2.default;
    };
});
define('resources/elements/fancy-input',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.FancyInput = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _desc, _value, _class, _descriptor;

  var FancyInput = exports.FancyInput = (_class = function () {
    function FancyInput() {
      _classCallCheck(this, FancyInput);

      _initDefineProp(this, 'label', _descriptor, this);
    }

    FancyInput.prototype.valueChanged = function valueChanged(newValue, oldValue) {};

    return FancyInput;
  }(), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'label', [_aureliaFramework.bindable], {
    enumerable: true,
    initializer: null
  })), _class);
});
define('resources/elements/image-card',['exports', 'aurelia-framework'], function (exports, _aureliaFramework) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ImageCard = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _desc, _value, _class, _descriptor;

  var ImageCard = exports.ImageCard = (_dec = (0, _aureliaFramework.bindable)({ defaultBindingMode: _aureliaFramework.bindingMode.oneTime }), (_class = function ImageCard() {
    _classCallCheck(this, ImageCard);

    _initDefineProp(this, 'project', _descriptor, this);
  }, (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'project', [_dec], {
    enumerable: true,
    initializer: null
  })), _class));
});
define('text!app.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./index.css\"></require>\n  \n  <div class=\"row expanded\">\n    <div class=\"medium-4 small-12 column backdrop fullHeight text-center area\">\n\n      <img src=\"/src/images/james300.jpg\" alt=\"Photo of James Harrington\" class=\"me round-image\">\n      <h2 class=\"image-text headers\">\n        Hello, my name is <br>James Harrington\n      </h2>\n      <p class=\"image-text paragraph\">\n        Programmer by day. <br>Super dad by night!\n      </p>\n\n    </div>\n\n    <div class=\"medium-8 small-12 column area scroll-large\">\n      <router-view containerless></router-view>\t\t\n    </div>\n  \n    <footer class=\"medium-4 small-12 column\">\n\n      <div class=\"social\">\n        <ul class=\"icons menu align-right\">\n          <li>\n            <a href=\"https://twitter.com/jdhprogrammer\" class=\"fa fa-twitter\"></a>\n          </li>\n          <li>\n            <a href=\"https://github.com/jamesharrington\" class=\"fa fa-github\"></a>\n          </li>\n          <li>\n            <a href=\"mailto://Hello@jamesdonaldharrington.com\" class=\"fa fa-envelope-o\"></a>\n          </li>\n        </ul>\n      </div>\n      \n    </footer>\n\n  </div>\n</template>"; });
define('text!index.css', ['module'], function(module) { module.exports = "@import \"../node_modules/foundation-sites/dist/css/foundation-flex.min.css\";\n@import url(\"https://fonts.googleapis.com/css?family=Open+Sans:300,400,700\");\n.area {\n  padding: 3.5rem;\n}\n.image-text {\n  color: #fff;\n  font-family: 'Open Sans', sans-serif;\n}\n.image-text.headers {\n  text-shadow: -2px 1px 1px rgba(0,0,0,0.5);\n}\n.mega {\n  color: #226764;\n}\n.megah1 {\n  font-size: 3em;\n}\n.megah2 {\n  font-size: 2em;\n}\n.megah3 {\n  font-size: 1em;\n}\n.super {\n  color: #a8383b;\n}\n.plain {\n  color: #94a09f;\n}\nsection {\n  margin-bottom: 4rem;\n  margin-top: 4rem;\n}\nul.simple {\n  list-style: none;\n}\n@media screen and (min-width: 640px) {\n  .fullHeight {\n    min-height: 100vh;\n  }\n}\n.round-image {\n  border-radius: 50%;\n}\n.button {\n  padding-left: 30px;\n  padding-right: 30px;\n}\n.button.accent {\n  background: #a8383b;\n}\n.button.accent:hover {\n  background: #973235;\n}\nfooter {\n  text-align: center;\n  display: block;\n  background-image: url(\"/src/images/background.jpg\");\n  background-size: cover;\n  background-position-y: bottom;\n  background-position-x: center;\n  padding: 40px 0;\n}\n@media screen and (min-width: 640px) {\n  footer {\n    background-image: none;\n    position: absolute;\n    right: 0px;\n    left: 0;\n    bottom: 0;\n    transform: translateX(0%);\n  }\n}\nfooter .social {\n  display: inline-block;\n}\nfooter .social a {\n  padding: 0 10px;\n}\nfooter .icons a {\n  font-size: 1.7em;\n  color: rgba(255,255,255,0.6);\n}\n.backdrop {\n  position: relative;\n  background-image: url(\"/src/images/background.jpg\");\n  background-size: cover;\n  background-position: center;\n}\n.me {\n  width: 50%;\n  display: block;\n  margin: 0 auto;\n}\n@media screen and (min-width: 640px) {\n  .scroll-large {\n    overflow: scroll;\n    max-height: 100vh;\n  }\n}\n.personalInfo {\n  margin-top: 14px;\n}\n.personalInfo li {\n  line-height: 1.5em;\n  margin: 1.5em 0 0 0;\n  padding-left: 2.25em;\n  position: relative;\n  color: #b2b2b2;\n}\n.personalInfo li a {\n  color: inherit;\n}\n.personalInfo li h3 {\n  font-size: 1.5em;\n  color: #b2b2b2;\n  top: 0;\n  left: 0;\n  position: absolute;\n  text-align: center;\n  width: 1em;\n}\n"; });
define('text!public/about/index.html', ['module'], function(module) { module.exports = "<template>\n About\n</template>"; });
define('text!styles/texts.css', ['module'], function(module) { module.exports = ".mega {\n  color: #008000;\n}\n.mega h1 {\n  font-size: 3em;\n}\n.mega h2 {\n  font-size: 2em;\n}\n.mega h3 {\n  font-size: 1em;\n}\n"; });
define('text!public/home/index.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./index.css\"></require>\n  <require from=\"../../resources/elements/image-card\"></require>\n  <require from=\"../../resources/elements/fancy-input\"></require>\n\n  \n\n  <article>\n\n    <section>\n      <h2 class=\"mega\">Just a little bit about me</h2>\n      <p class=\"plain\">\n        I'm a self taught fast learning web developer, I started developing in 2010 when I decided to open my own photography business. After making a few version of my own site I found that i really loved web development. I very quickly realized that the web industry was for me.\n      </p>\n      <a href=\"/about\" class=\"button accent\">\n        Learn More\n      </a>\n    </section>\n\n    <hr>\n\n    <section>\n      <h2 class=\"mega\">\n        Recent Projects\n      </h2>\n      <ul class=\"row small-up-1 medium-up-2 simple\">\n        <li repeat.for=\"project of projects\" class=\"column column-block\">\n          <image-card project.bind=\"project\"></image-card>\n        </li>\n      </ul>\n      <a href=\"/projects\" class=\"button accent\">\n        View All Projects\n      </a>\n    </section>\n\n    <hr>\n\n    <section>\n      <form submit.delegate=\"submitContact()\">\n        <h2 class=\"mega\">\n          Talk to me\n        </h2>\n        <div class=\"row\">\n          <div class=\"small-12 large-8 columns\">\n\n            <div class=\"row\">\n              <div class=\"medium-6 columns\">\n                <fancy-input label=\"Name\">\n                  <input type=\"text\" required=\"\" value.bind=\"contact.name\">\n                </fancy-input>\n              </div>\n              <div class=\"medium-6 columns\">\n                <fancy-input label=\"Email\">\n                  <input type=\"text\" required=\"\" value.bind=\"contact.email\">\n                </fancy-input>\n              </div>\n              <div class=\"medium-12 column\">\n                <fancy-input label=\"Message\">\n                  <textarea name=\"message\" rows=\"6\" required=\"\" value.bind=\"contact.message\"></textarea>\n                </fancy-input>\n              </div>\n            </div>\n\n          </div>\n          <div class=\"small-12 large-4 columns\">\n\n            <ul class=\"simple personalInfo\">\n              <li>\n                <h3 class=\"fa fa-home\"></h3>\n                320 W Sunset Ave<br> Pensacoal, FL 32507<br> United States\n              </li>\n\n              <li>\n                <h3 class=\"fa fa-mobile\"></h3>\n                (850) 529-9296\n              </li>\n\n              <li>\n                <h3 class=\"fa fa-envelope-o\"></h3>\n                <a href=\"mailto://Hello@jamesdonaldharrington.com\">Hello@jamesdonaldharrington.com</a>\n              </li </ul>\n\n          </div>\n        </div>\n        <input type=\"submit\" class=\"button accent\" value=\"send\">\n        \n      </form>\n    </section>\n  </article>\n\n\n</template>\n"; });
define('text!public/home/index.css', ['module'], function(module) { module.exports = ""; });
define('text!public/not-found/index.html', ['module'], function(module) { module.exports = "<template>\n 404 Sorry\n</template>"; });
define('text!public/projects/index.css', ['module'], function(module) { module.exports = ""; });
define('text!public/projects/index.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"../../resources/elements/image-card\"></require>\n  <require from=\"./index.css\"></require>\n  \n  <ul class=\"row small-up-1 medium-up-2 simple\">\n    <li repeat.for=\"project of projects\" class=\"column column-block\">\n      <image-card project.bind=\"project\"></image-card>\n    </li>\n  </ul>\n</template>"; });
define('text!resources/elements/fancy-input.css', ['module'], function(module) { module.exports = ".fancyInput {\n  margin-top: 20px;\n  position: relative;\n}\n.fancyInput input[type=text],\n.fancyInput textarea {\n  resize: none;\n  transition: border-bottom-color 200ms;\n  border: none;\n  border-bottom: solid 2px #95a1a0;\n  box-shadow: none;\n}\n.fancyInput input:valid + span,\n.fancyInput textarea:valid + span,\n.fancyInput input:focus + span,\n.fancyInput textarea:focus + span {\n  top: -27px;\n}\n.fancyInput input:focus,\n.fancyInput textarea:focus {\n  border-bottom-color: #226764;\n}\n.fancyInput span {\n  transition: top 150ms;\n  position: absolute;\n  top: 7px;\n  left: 10px;\n}\n"; });
define('text!resources/elements/fancy-input.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./fancy-input.css\"></require>\n  <label class=\"fancyInput\">\n    <slot></slot>\n    <span>${label}</span>\n  </label>\n</template>"; });
define('text!resources/elements/image-card.css', ['module'], function(module) { module.exports = ".card {\n  border: none;\n}\n.card .image-wrap {\n  position: relative;\n}\n.card .image-wrap:hover .overlay {\n  opacity: 1;\n}\n.card .image-wrap .overlay {\n  transition: opacity 0.35s;\n  opacity: 0;\n  background: rgba(0,0,0,0.5);\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  width: 100%;\n}\n"; });
define('text!resources/elements/image-card.html', ['module'], function(module) { module.exports = "<template>\n  <require from=\"./image-card.css\"></require>\n  <a class=\"card\">\n    <div class=\"image-wrap\">\n      <img src.one-time=\"project.img.src\" alt.one-time=\"project.img.alt\" style=\"width:100%;\">\n      <div class=\"overlay\"></div>\n    </div>\n\n    <div class=\"card-section\">\n      <h4 class=\"mega\" style=\"margin-bottom:0;\">${project.title}</h4>\n      <p class=\"plain\">${project.blurb}</p>\n    </div>\n  </a>\n</template>"; });
//# sourceMappingURL=app-bundle.js.map