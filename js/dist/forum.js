module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./forum.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./forum.js":
/*!******************!*\
  !*** ./forum.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_forum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/forum */ "./src/forum/index.js");
/* empty/unused harmony star reexport */

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _inheritsLoose; });
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

/***/ }),

/***/ "./src/forum/addRequestDropdown.js":
/*!*****************************************!*\
  !*** ./src/forum/addRequestDropdown.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_HeaderSecondary__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/HeaderSecondary */ "flarum/components/HeaderSecondary");
/* harmony import */ var flarum_components_HeaderSecondary__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_HeaderSecondary__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_RequestsDropdown__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/RequestsDropdown */ "./src/forum/components/RequestsDropdown.js");
/*
 *
 *  This file is part of fof/username-request.
 *
 *  Copyright (c) 2019 FriendsOfFlarum..
 *
 *  For the full copyright and license information, please view the license.md
 *  file that was distributed with this source code.
 *
 */




/* harmony default export */ __webpack_exports__["default"] = (function () {
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_HeaderSecondary__WEBPACK_IMPORTED_MODULE_2___default.a.prototype, 'items', function (items) {
    if (flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.data.relationships.username_requests && flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.data.relationships.username_requests.data.length && !flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.cache.username_requests || flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.cache.username_requests && flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.cache.username_requests.length !== 0) {
      items.add('UsernameRequests', m(_components_RequestsDropdown__WEBPACK_IMPORTED_MODULE_3__["default"], null), 20);
    }
  });
});

/***/ }),

/***/ "./src/forum/addRequestSetting.js":
/*!****************************************!*\
  !*** ./src/forum/addRequestSetting.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_SettingsPage__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/SettingsPage */ "flarum/components/SettingsPage");
/* harmony import */ var flarum_components_SettingsPage__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_SettingsPage__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_RequestModal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/RequestModal */ "./src/forum/components/RequestModal.js");
/*
 *
 *  This file is part of fof/username-request.
 *
 *  Copyright (c) 2019 FriendsOfFlarum..
 *
 *  For the full copyright and license information, please view the license.md
 *  file that was distributed with this source code.
 *
 */




/* harmony default export */ __webpack_exports__["default"] = (function () {
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_SettingsPage__WEBPACK_IMPORTED_MODULE_2___default.a.prototype, 'accountItems', function (items) {
    items.add('username-request', flarum_components_Button__WEBPACK_IMPORTED_MODULE_1___default.a.component({
      className: 'Button',
      onclick: function onclick() {
        app.modal.show(new _components_RequestModal__WEBPACK_IMPORTED_MODULE_3__["default"]());
      }
    }, [app.translator.trans('fof-username-request.forum.account_label')]), 10);
  });
});

/***/ }),

/***/ "./src/forum/checkForApproval.js":
/*!***************************************!*\
  !*** ./src/forum/checkForApproval.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_ResultsModal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/ResultsModal */ "./src/forum/components/ResultsModal.js");
/*
 *
 *  This file is part of fof/username-request.
 *
 *  Copyright (c) 2019 FriendsOfFlarum..
 *
 *  For the full copyright and license information, please view the license.md
 *  file that was distributed with this source code.
 *
 */


/* harmony default export */ __webpack_exports__["default"] = (function () {
  return new Promise(function () {
    setTimeout(function () {
      if (flarum_app__WEBPACK_IMPORTED_MODULE_0___default.a.session.user && flarum_app__WEBPACK_IMPORTED_MODULE_0___default.a.session.user.username_requests() && flarum_app__WEBPACK_IMPORTED_MODULE_0___default.a.session.user.username_requests().status() !== 'Sent') {
        flarum_app__WEBPACK_IMPORTED_MODULE_0___default.a.modal.show(new _components_ResultsModal__WEBPACK_IMPORTED_MODULE_1__["default"]());
      }
    }, 1000);
  });
});

/***/ }),

/***/ "./src/forum/components/ActionModal.js":
/*!*********************************************!*\
  !*** ./src/forum/components/ActionModal.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ActionModal; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Alert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Alert */ "flarum/components/Alert");
/* harmony import */ var flarum_components_Alert__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Alert__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/Modal */ "flarum/components/Modal");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_3__);


/*
 *
 *  This file is part of fof/username-request.
 *
 *  Copyright (c) 2019 FriendsOfFlarum..
 *
 *  For the full copyright and license information, please view the license.md
 *  file that was distributed with this source code.
 *
 */




var ActionModal =
/*#__PURE__*/
function (_Modal) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(ActionModal, _Modal);

  function ActionModal() {
    return _Modal.apply(this, arguments) || this;
  }

  var _proto = ActionModal.prototype;

  _proto.init = function init() {
    _Modal.prototype.init.call(this);

    this.request = this.props.request;
    this.approved = m.prop('Denied');
    this.reason = m.prop('');
  };

  _proto.title = function title() {
    return app.translator.trans('fof-username-request.forum.action.title');
  };

  _proto.className = function className() {
    return 'RequestActionModal Modal--medium';
  };

  _proto.content = function content() {
    return m("div", {
      className: "Modal-body"
    }, m("div", {
      className: "Form"
    }, m("p", {
      className: "help"
    }, app.translator.trans('fof-username-request.forum.action.help_text')), m("legend", null, app.translator.trans('fof-username-request.forum.action.decision_title')), m("div", {
      className: "Form-group"
    }, m("label", {
      className: "checkbox"
    }, m("input", {
      type: "radio",
      name: "approved",
      value: "Approved",
      checked: this.approved() === "Approved",
      onclick: m.withAttr('value', this.approved)
    }), app.translator.trans('fof-username-request.forum.action.approval_label')), m("label", {
      className: "checkbox"
    }, m("input", {
      type: "radio",
      name: "denied",
      value: "Denied",
      checked: this.approved() === "Denied",
      onclick: m.withAttr('value', this.approved)
    }), app.translator.trans('fof-username-request.forum.action.denial_label'))), this.approved() === "Denied" ? (m("legend", null, app.translator.trans('fof-username-request.forum.action.reason_title')), m("div", {
      className: "BasicsPage-reason-input"
    }, ",", m("textarea", {
      className: "FormControl",
      value: this.reason(),
      disabled: this.loading,
      oninput: m.withAttr('value', this.reason)
    }))) : '', m("div", {
      className: "Form-group"
    }, flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default.a.component({
      className: 'Button Button--primary Button--block',
      type: 'submit',
      loading: this.loading,
      children: app.translator.trans('fof-username-request.forum.action.submit_button')
    }))));
  };

  _proto.onsubmit = function onsubmit(e) {
    var _this = this;

    e.preventDefault();

    if (!this.reason() && this.approved() !== "Approved") {
      this.alert = new flarum_components_Alert__WEBPACK_IMPORTED_MODULE_1___default.a({
        type: 'error',
        children: app.translator.trans('fof-username-request.forum.action.complete_reason')
      });
      return;
    }

    this.loading = true;
    this.request.save({
      reason: this.reason(),
      action: this.approved()
    }).then(function () {
      app.alerts.show(_this.successAlert = new flarum_components_Alert__WEBPACK_IMPORTED_MODULE_1___default.a({
        type: 'success',
        children: app.translator.trans('fof-username-request.forum.action.success')
      }));
    });
    app.cache.username_requests.some(function (request, i) {
      console.log(request.id());
      console.log(_this.request.id());

      if (request.id() == _this.request.id()) {
        app.cache.username_requests.splice(i, 1);
      }
    });
    m.redraw();
    this.hide();
  };

  return ActionModal;
}(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_3___default.a);



/***/ }),

/***/ "./src/forum/components/RequestModal.js":
/*!**********************************************!*\
  !*** ./src/forum/components/RequestModal.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FlagPostModal; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Alert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Alert */ "flarum/components/Alert");
/* harmony import */ var flarum_components_Alert__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Alert__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Modal */ "flarum/components/Modal");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_3__);


/*
 *
 *  This file is part of fof/username-request.
 *
 *  Copyright (c) 2019 FriendsOfFlarum..
 *
 *  For the full copyright and license information, please view the license.md
 *  file that was distributed with this source code.
 *
 */




var FlagPostModal =
/*#__PURE__*/
function (_Modal) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(FlagPostModal, _Modal);

  function FlagPostModal() {
    return _Modal.apply(this, arguments) || this;
  }

  var _proto = FlagPostModal.prototype;

  _proto.init = function init() {
    _Modal.prototype.init.call(this);

    this.username = m.prop(app.session.user.username());
    if (app.session.user.username_requests()) this.username(app.session.user.username_requests().requestedUsername());
    this.success = false;
    this.password = m.prop('');
  };

  _proto.className = function className() {
    return 'RequestUsernameModal Modal--small';
  };

  _proto.title = function title() {
    return app.translator.trans('fof-username-request.forum.request.title');
  };

  _proto.content = function content() {
    if (this.success) {
      return m("div", {
        className: "Modal-body"
      }, m("div", {
        className: "Form Form--centered"
      }, m("p", {
        className: "helpText"
      }, app.translator.trans('fof-username-request.forum.request.confirmation_message')), m("div", {
        className: "Form-group"
      }, m(flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default.a, {
        className: "Button Button--primary Button--block",
        onclick: this.hide.bind(this)
      }, app.translator.trans('fof-username-request.forum.request.dismiss_button')))));
    }

    return m("div", {
      className: "Modal-body"
    }, m("div", {
      className: "Form Form--centered"
    }, app.session.user.username_requests() ? m("p", {
      className: "helpText"
    }, app.translator.trans('fof-username-request.forum.request.current_request', {
      username: app.session.user.username_requests().requestedUsername()
    })) : '', m("div", {
      className: "Form-group"
    }, m("input", {
      type: "text",
      name: "text",
      className: "FormControl",
      placeholder: app.session.user.username(),
      bidi: this.username,
      disabled: this.loading
    })), m("div", {
      className: "Form-group"
    }, m("input", {
      type: "password",
      name: "password",
      className: "FormControl",
      placeholder: app.translator.trans('core.forum.change_email.confirm_password_placeholder'),
      bidi: this.password,
      disabled: this.loading
    })), m("div", {
      className: "Form-group"
    }, flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default.a.component({
      className: 'Button Button--primary Button--block',
      type: 'submit',
      loading: this.loading,
      children: app.translator.trans('fof-username-request.forum.request.submit_button')
    })), app.session.user.username_requests() ? m("div", {
      className: "Form-group"
    }, flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default.a.component({
      className: 'Button Button--primary Button--block',
      onclick: this.deleteRequest.bind(this),
      loading: this.loading,
      children: app.translator.trans('fof-username-request.forum.request.delete_button')
    })) : ''));
  };

  _proto.deleteRequest = function deleteRequest(e) {
    e.preventDefault();
    this.loading = true;
    app.session.user.username_requests().delete();
    app.alerts.show(this.successAlert = new flarum_components_Alert__WEBPACK_IMPORTED_MODULE_1___default.a({
      type: 'success',
      children: app.translator.trans('fof-username-request.forum.request.deleted')
    }));
    app.session.user.username_requests = m.prop();
    this.hide();
  };

  _proto.onsubmit = function onsubmit(e) {
    var _this = this;

    e.preventDefault();
    this.alert = null;

    if (this.username() === app.session.user.username()) {
      this.hide();
      return;
    }

    this.loading = true;
    app.store.createRecord('username_requests').save({
      username: this.username()
    }, {
      meta: {
        password: this.password()
      },
      errorHandler: this.onerror.bind(this)
    }).then(function (request) {
      app.session.user.username_requests = m.prop(request);
      _this.success = true;
    }).catch(function () {}).then(this.loaded.bind(this));
  };

  _proto.onerror = function onerror(error) {
    if (error.status === 401) {
      error.alert.props.children = app.translator.trans('core.forum.change_email.incorrect_password_message');
    }

    _Modal.prototype.onerror.call(this, error);
  };

  return FlagPostModal;
}(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_2___default.a);



/***/ }),

/***/ "./src/forum/components/RequestsDropdown.js":
/*!**************************************************!*\
  !*** ./src/forum/components/RequestsDropdown.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RequestsDropdown; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_NotificationsDropdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/NotificationsDropdown */ "flarum/components/NotificationsDropdown");
/* harmony import */ var flarum_components_NotificationsDropdown__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_NotificationsDropdown__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _RequestsList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RequestsList */ "./src/forum/components/RequestsList.js");


/*
 *
 *  This file is part of fof/username-request.
 *
 *  Copyright (c) 2019 FriendsOfFlarum..
 *
 *  For the full copyright and license information, please view the license.md
 *  file that was distributed with this source code.
 *
 */



var RequestsDropdown =
/*#__PURE__*/
function (_NotificationsDropdow) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(RequestsDropdown, _NotificationsDropdow);

  function RequestsDropdown() {
    return _NotificationsDropdow.apply(this, arguments) || this;
  }

  RequestsDropdown.initProps = function initProps(props) {
    props.label = props.label || app.translator.trans('fof-username-request.forum.dropdown.tooltip');
    props.icon = props.icon || 'fas fa-user-edit';

    _NotificationsDropdow.initProps.call(this, props);
  };

  var _proto = RequestsDropdown.prototype;

  _proto.init = function init() {
    _NotificationsDropdow.prototype.init.call(this);

    this.list = new _RequestsList__WEBPACK_IMPORTED_MODULE_2__["default"]();
  };

  _proto.goToRoute = function goToRoute() {
    m.route(app.route('username_requests'));
  };

  _proto.getUnreadCount = function getUnreadCount() {
    if (app.cache.username_requests) {
      return app.cache.username_requests.length;
    }

    return app.forum.data.relationships.username_requests.data.length;
  };

  _proto.getNewCount = function getNewCount() {
    if (app.cache.username_requests) {
      return app.cache.username_requests.length;
    }

    return app.forum.data.relationships.username_requests.data.length;
  };

  return RequestsDropdown;
}(flarum_components_NotificationsDropdown__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/forum/components/RequestsList.js":
/*!**********************************************!*\
  !*** ./src/forum/components/RequestsList.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FlagList; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/LoadingIndicator */ "flarum/components/LoadingIndicator");
/* harmony import */ var flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_helpers_avatar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/helpers/avatar */ "flarum/helpers/avatar");
/* harmony import */ var flarum_helpers_avatar__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_avatar__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_helpers_username__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/helpers/username */ "flarum/helpers/username");
/* harmony import */ var flarum_helpers_username__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_username__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/helpers/icon */ "flarum/helpers/icon");
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var flarum_helpers_humanTime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! flarum/helpers/humanTime */ "flarum/helpers/humanTime");
/* harmony import */ var flarum_helpers_humanTime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_humanTime__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ActionModal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./ActionModal */ "./src/forum/components/ActionModal.js");


/*
 *
 *  This file is part of fof/username-request.
 *
 *  Copyright (c) 2019 FriendsOfFlarum..
 *
 *  For the full copyright and license information, please view the license.md
 *  file that was distributed with this source code.
 *
 */








var FlagList =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(FlagList, _Component);

  function FlagList() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = FlagList.prototype;

  _proto.init = function init() {
    this.loading = false;
  };

  _proto.view = function view() {
    var _this = this;

    var requests = app.cache.username_requests || [];
    return m("div", {
      className: "NotificationList RequestsList"
    }, m("div", {
      className: "NotificationList-header"
    }, m("h4", {
      className: "App-titleControl App-titleControl--text"
    }, app.translator.trans('fof-username-request.forum.dropdown.title'))), m("div", {
      className: "NotificationList-content"
    }, m("ul", {
      className: "NotificationGroup-content"
    }, requests.length ? requests.map(function (request) {
      return m("li", null, m("a", {
        onclick: _this.showModal.bind(_this, request),
        className: "Notification Request"
      }, flarum_helpers_avatar__WEBPACK_IMPORTED_MODULE_3___default()(request.user()), flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_5___default()('fas fa-user-edit', {
        className: 'Notification-icon'
      }), m("span", {
        className: "Notification-content"
      }, app.translator.trans('fof-username-request.forum.dropdown.item_text', {
        username: flarum_helpers_username__WEBPACK_IMPORTED_MODULE_4___default()(request.user())
      })), flarum_helpers_humanTime__WEBPACK_IMPORTED_MODULE_6___default()(request.createdAt()), m("div", {
        className: "Notification-excerpt"
      }, app.translator.trans('fof-username-request.forum.dropdown.exerpt', {
        requestedUsername: request.requestedUsername()
      }))));
    }) : !this.loading ? m("div", {
      className: "NotificationList-empty"
    }, app.translator.trans('fof-username-request.forum.dropdown.empty_text')) : flarum_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_2___default.a.component({
      className: 'LoadingIndicator--block'
    }))));
  };

  _proto.showModal = function showModal(request) {
    app.modal.show(new _ActionModal__WEBPACK_IMPORTED_MODULE_7__["default"]({
      request: request
    }));
  };

  _proto.load = function load() {
    var _this2 = this;

    if (app.cache.username_requests) {
      return;
    }

    this.loading = true;
    m.redraw();
    app.store.find('username_requests').then(function (requests) {
      delete requests.payload;
      console.log(requests);
      app.cache.username_requests = requests.sort(function (a, b) {
        return a.createdAt() - b.createdAt();
      });
    }).catch(function () {}).then(function () {
      _this2.loading = false;
      m.redraw();
    });
  };

  return FlagList;
}(flarum_Component__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/forum/components/RequestsPage.js":
/*!**********************************************!*\
  !*** ./src/forum/components/RequestsPage.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RequestsPage; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Page */ "flarum/components/Page");
/* harmony import */ var flarum_components_Page__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Page__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _RequestsList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RequestsList */ "./src/forum/components/RequestsList.js");


/*
 *
 *  This file is part of fof/username-request.
 *
 *  Copyright (c) 2019 FriendsOfFlarum..
 *
 *  For the full copyright and license information, please view the license.md
 *  file that was distributed with this source code.
 *
 */



var RequestsPage =
/*#__PURE__*/
function (_Page) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(RequestsPage, _Page);

  function RequestsPage() {
    return _Page.apply(this, arguments) || this;
  }

  var _proto = RequestsPage.prototype;

  _proto.init = function init() {
    _Page.prototype.init.call(this);

    app.history.push('requests');
    this.list = new _RequestsList__WEBPACK_IMPORTED_MODULE_2__["default"]();
    this.list.load();
    this.bodyClass = 'App--requests';
  };

  _proto.view = function view() {
    return m("div", {
      className: "RequestsPage"
    }, this.list.render());
  };

  return RequestsPage;
}(flarum_components_Page__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/forum/components/ResultsModal.js":
/*!**********************************************!*\
  !*** ./src/forum/components/ResultsModal.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return FlagPostModal; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Alert__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Alert */ "flarum/components/Alert");
/* harmony import */ var flarum_components_Alert__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Alert__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Modal */ "flarum/components/Modal");
/* harmony import */ var flarum_components_Modal__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_3__);


/*
 *
 *  This file is part of fof/username-request.
 *
 *  Copyright (c) 2019 FriendsOfFlarum..
 *
 *  For the full copyright and license information, please view the license.md
 *  file that was distributed with this source code.
 *
 */




var FlagPostModal =
/*#__PURE__*/
function (_Modal) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(FlagPostModal, _Modal);

  function FlagPostModal() {
    return _Modal.apply(this, arguments) || this;
  }

  var _proto = FlagPostModal.prototype;

  _proto.init = function init() {
    _Modal.prototype.init.call(this);

    this.request = app.session.user.username_requests();
  };

  _proto.className = function className() {
    return 'ResultsModal Modal--small';
  };

  _proto.title = function title() {
    return app.translator.trans('fof-username-request.forum.results.title');
  };

  _proto.content = function content() {
    if (this.request.status() === "Approved") {
      return m("div", {
        className: "Modal-body"
      }, m("div", {
        className: "Form Form--centered"
      }, m("h2", null, app.translator.trans('fof-username-request.forum.results.approved')), m("h3", null, app.translator.trans('fof-username-request.forum.results.new_username', {
        username: app.session.user.username()
      })), m("div", {
        className: "Form-group"
      }, m(flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default.a, {
        className: "Button Button--primary Button--block",
        onclick: this.hide.bind(this)
      }, app.translator.trans('fof-username-request.forum.request.dismiss_button')))));
    } else {
      return m("div", {
        className: "Modal-body"
      }, m("div", {
        className: "Form Form--centered"
      }, m("h2", null, app.translator.trans('fof-username-request.forum.results.denied')), m("h3", null, app.translator.trans('fof-username-request.forum.results.reason', {
        reason: this.request.reason(),
        i: m("i", null)
      })), m("p", {
        className: "helpText"
      }, app.translator.trans('fof-username-request.forum.results.resubmit')), m("div", {
        className: "Form-group"
      }, m(flarum_components_Button__WEBPACK_IMPORTED_MODULE_3___default.a, {
        className: "Button Button--primary Button--block",
        onclick: this.hide.bind(this)
      }, app.translator.trans('fof-username-request.forum.request.dismiss_button')))));
    }
  };

  _proto.onhide = function onhide() {
    app.session.user.username_requests = m.prop();
    this.request.save({
      delete: true
    });
  };

  return FlagPostModal;
}(flarum_components_Modal__WEBPACK_IMPORTED_MODULE_2___default.a);



/***/ }),

/***/ "./src/forum/index.js":
/*!****************************!*\
  !*** ./src/forum/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_models_User__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/models/User */ "flarum/models/User");
/* harmony import */ var flarum_models_User__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_models_User__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/Model */ "flarum/Model");
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_Model__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _models_UsernameRequest__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./models/UsernameRequest */ "./src/forum/models/UsernameRequest.js");
/* harmony import */ var _addRequestSetting__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./addRequestSetting */ "./src/forum/addRequestSetting.js");
/* harmony import */ var _components_RequestsPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/RequestsPage */ "./src/forum/components/RequestsPage.js");
/* harmony import */ var _addRequestDropdown__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./addRequestDropdown */ "./src/forum/addRequestDropdown.js");
/* harmony import */ var _checkForApproval__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./checkForApproval */ "./src/forum/checkForApproval.js");
/*
 *
 *  This file is part of fof/username-request.
 *
 *  Copyright (c) 2019 FriendsOfFlarum..
 *
 *  For the full copyright and license information, please view the license.md
 *  file that was distributed with this source code.
 *
 */








app.initializers.add('fof-username-request', function () {
  app.store.models.username_requests = _models_UsernameRequest__WEBPACK_IMPORTED_MODULE_3__["default"];
  flarum_models_User__WEBPACK_IMPORTED_MODULE_1___default.a.prototype.username_requests = flarum_Model__WEBPACK_IMPORTED_MODULE_2___default.a.hasOne('username_requests');
  app.routes.username_requests = {
    path: '/username_requests',
    component: m(_components_RequestsPage__WEBPACK_IMPORTED_MODULE_5__["default"], null)
  };
  Object(_addRequestSetting__WEBPACK_IMPORTED_MODULE_4__["default"])();
  Object(_addRequestDropdown__WEBPACK_IMPORTED_MODULE_6__["default"])();
  Object(_checkForApproval__WEBPACK_IMPORTED_MODULE_7__["default"])();
});

/***/ }),

/***/ "./src/forum/models/UsernameRequest.js":
/*!*********************************************!*\
  !*** ./src/forum/models/UsernameRequest.js ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UsernameRequest; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/Model */ "flarum/Model");
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_Model__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_utils_mixin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/utils/mixin */ "flarum/utils/mixin");
/* harmony import */ var flarum_utils_mixin__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_mixin__WEBPACK_IMPORTED_MODULE_2__);


/*
 *
 *  This file is part of fof/username-request.
 *
 *  Copyright (c) 2019 FriendsOfFlarum..
 *
 *  For the full copyright and license information, please view the license.md
 *  file that was distributed with this source code.
 *
 */



var UsernameRequest =
/*#__PURE__*/
function (_mixin) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(UsernameRequest, _mixin);

  function UsernameRequest() {
    return _mixin.apply(this, arguments) || this;
  }

  return UsernameRequest;
}(flarum_utils_mixin__WEBPACK_IMPORTED_MODULE_2___default()(flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a, {
  user: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.hasOne('user'),
  requestedUsername: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('requestedUsername'),
  status: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('status'),
  reason: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('reason'),
  createdAt: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('createdAt', flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.transformDate)
}));



/***/ }),

/***/ "flarum/Component":
/*!**************************************************!*\
  !*** external "flarum.core.compat['Component']" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['Component'];

/***/ }),

/***/ "flarum/Model":
/*!**********************************************!*\
  !*** external "flarum.core.compat['Model']" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['Model'];

/***/ }),

/***/ "flarum/app":
/*!********************************************!*\
  !*** external "flarum.core.compat['app']" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['app'];

/***/ }),

/***/ "flarum/components/Alert":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['components/Alert']" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Alert'];

/***/ }),

/***/ "flarum/components/Button":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Button']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Button'];

/***/ }),

/***/ "flarum/components/HeaderSecondary":
/*!*******************************************************************!*\
  !*** external "flarum.core.compat['components/HeaderSecondary']" ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/HeaderSecondary'];

/***/ }),

/***/ "flarum/components/LoadingIndicator":
/*!********************************************************************!*\
  !*** external "flarum.core.compat['components/LoadingIndicator']" ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/LoadingIndicator'];

/***/ }),

/***/ "flarum/components/Modal":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['components/Modal']" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Modal'];

/***/ }),

/***/ "flarum/components/NotificationsDropdown":
/*!*************************************************************************!*\
  !*** external "flarum.core.compat['components/NotificationsDropdown']" ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/NotificationsDropdown'];

/***/ }),

/***/ "flarum/components/Page":
/*!********************************************************!*\
  !*** external "flarum.core.compat['components/Page']" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Page'];

/***/ }),

/***/ "flarum/components/SettingsPage":
/*!****************************************************************!*\
  !*** external "flarum.core.compat['components/SettingsPage']" ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/SettingsPage'];

/***/ }),

/***/ "flarum/extend":
/*!***********************************************!*\
  !*** external "flarum.core.compat['extend']" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['extend'];

/***/ }),

/***/ "flarum/helpers/avatar":
/*!*******************************************************!*\
  !*** external "flarum.core.compat['helpers/avatar']" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['helpers/avatar'];

/***/ }),

/***/ "flarum/helpers/humanTime":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['helpers/humanTime']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['helpers/humanTime'];

/***/ }),

/***/ "flarum/helpers/icon":
/*!*****************************************************!*\
  !*** external "flarum.core.compat['helpers/icon']" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['helpers/icon'];

/***/ }),

/***/ "flarum/helpers/username":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['helpers/username']" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['helpers/username'];

/***/ }),

/***/ "flarum/models/User":
/*!****************************************************!*\
  !*** external "flarum.core.compat['models/User']" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['models/User'];

/***/ }),

/***/ "flarum/utils/mixin":
/*!****************************************************!*\
  !*** external "flarum.core.compat['utils/mixin']" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/mixin'];

/***/ })

/******/ });
//# sourceMappingURL=forum.js.map