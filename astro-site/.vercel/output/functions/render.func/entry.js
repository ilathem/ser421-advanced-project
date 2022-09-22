import * as adapter from '@astrojs/vercel/serverless/entrypoint';
import { __awaiter } from 'tslib';
import 'zone.js/dist/zone.js';
import * as i0 from '@angular/core';
import { InjectionToken, reflectComponentType, ApplicationRef, Component, Input } from '@angular/core';
import { renderApplication, BEFORE_APP_SERIALIZED } from '@angular/platform-server';
import { defineComponent, h, createSSRApp, useSSRContext } from 'vue';
import { renderToString as renderToString$1, ssrInterpolate } from 'vue/server-renderer';
import React, { createElement, useState } from 'react';
import ReactDOM from 'react-dom/server';
import { escape } from 'html-escaper';
/* empty css                        */import 'react-dom';
import { jsx, jsxs, Fragment as Fragment$1 } from 'react/jsx-runtime';
import { NgIf } from '@angular/common';
/* empty css                                    */import 'mime';
import 'kleur/colors';
import 'string-width';
import 'path-browserify';
import { compile } from 'path-to-regexp';

const ANALOG_ASTRO_STATIC_PROPS = new InjectionToken('@analogjs/astro-angular: Static Props w/ Mirror Provider', {
    factory() {
        return { props: {}, mirror: {} };
    },
});
function check$4(Component, _props, _children) {
    return !!reflectComponentType(Component);
}
// Run beforeAppInitialized hook to set Input on the ComponentRef
// before the platform renders to string
const STATIC_PROPS_HOOK_PROVIDER = {
    provide: BEFORE_APP_SERIALIZED,
    useFactory: (appRef, { props, mirror, }) => {
        return () => {
            const compRef = appRef.components[0];
            if (compRef && props && mirror) {
                for (const [key, value] of Object.entries(props)) {
                    if (
                    // we double-check inputs on ComponentMirror
                    // because Astro might add additional props
                    // that aren't actually Input defined on the Component
                    mirror.inputs.some(({ templateName, propName }) => templateName === key || propName === key)) {
                        compRef.setInput(key, value);
                    }
                }
                compRef.changeDetectorRef.detectChanges();
            }
        };
    },
    deps: [ApplicationRef, ANALOG_ASTRO_STATIC_PROPS],
    multi: true,
};
function renderToStaticMarkup$4(Component, props, _children) {
    return __awaiter(this, void 0, void 0, function* () {
        const mirror = reflectComponentType(Component);
        const appId = (mirror === null || mirror === void 0 ? void 0 : mirror.selector) || Component.name.toString().toLowerCase();
        const document = `<${appId}></${appId}>`;
        const html = yield renderApplication(Component, {
            appId,
            document,
            providers: [
                {
                    provide: ANALOG_ASTRO_STATIC_PROPS,
                    useValue: { props, mirror },
                },
                STATIC_PROPS_HOOK_PROVIDER,
            ],
        });
        return { html };
    });
}
const _renderer4 = {
    check: check$4,
    renderToStaticMarkup: renderToStaticMarkup$4,
};

function check$3(Component) {
	return Component['render'] && Component['$$render'];
}

async function renderToStaticMarkup$3(Component, props, slotted) {
	const slots = {};
	for (const [key, value] of Object.entries(slotted)) {
		slots[key] = () =>
			`<astro-slot${key === 'default' ? '' : ` name="${key}"`}>${value}</astro-slot>`;
	}
	const { html } = Component.render(props, { $$slots: slots });
	return { html };
}

const _renderer3 = {
	check: check$3,
	renderToStaticMarkup: renderToStaticMarkup$3,
};

/**
 * Astro passes `children` as a string of HTML, so we need
 * a wrapper `div` to render that content as VNodes.
 *
 * This is the Vue + JSX equivalent of using `<div v-html="value" />`
 */
const StaticHtml$1 = defineComponent({
	props: {
		value: String,
		name: String,
	},
	setup({ name, value }) {
		if (!value) return () => null;
		return () => h('astro-slot', { name, innerHTML: value });
	},
});

function check$2(Component) {
	return !!Component['ssrRender'] || !!Component['__ssrInlineRender'];
}

async function renderToStaticMarkup$2(Component, props, slotted) {
	const slots = {};
	for (const [key, value] of Object.entries(slotted)) {
		slots[key] = () => h(StaticHtml$1, { value, name: key === 'default' ? undefined : key });
	}
	const app = createSSRApp({ render: () => h(Component, props, slots) });
	const html = await renderToString$1(app);
	return { html };
}

const _renderer2 = {
	check: check$2,
	renderToStaticMarkup: renderToStaticMarkup$2,
};

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function _asyncIterator(iterable) {
  var method,
      async,
      sync,
      retry = 2;

  for ("undefined" != typeof Symbol && (async = Symbol.asyncIterator, sync = Symbol.iterator); retry--;) {
    if (async && null != (method = iterable[async])) return method.call(iterable);
    if (sync && null != (method = iterable[sync])) return new AsyncFromSyncIterator(method.call(iterable));
    async = "@@asyncIterator", sync = "@@iterator";
  }

  throw new TypeError("Object is not async iterable");
}

function AsyncFromSyncIterator(s) {
  function AsyncFromSyncIteratorContinuation(r) {
    if (Object(r) !== r) return Promise.reject(new TypeError(r + " is not an object."));
    var done = r.done;
    return Promise.resolve(r.value).then(function (value) {
      return {
        value: value,
        done: done
      };
    });
  }

  return AsyncFromSyncIterator = function AsyncFromSyncIterator(s) {
    this.s = s, this.n = s.next;
  }, AsyncFromSyncIterator.prototype = {
    s: null,
    n: null,
    next: function next() {
      return AsyncFromSyncIteratorContinuation(this.n.apply(this.s, arguments));
    },
    "return": function _return(value) {
      var ret = this.s["return"];
      return void 0 === ret ? Promise.resolve({
        value: value,
        done: !0
      }) : AsyncFromSyncIteratorContinuation(ret.apply(this.s, arguments));
    },
    "throw": function _throw(value) {
      var thr = this.s["return"];
      return void 0 === thr ? Promise.reject(value) : AsyncFromSyncIteratorContinuation(thr.apply(this.s, arguments));
    }
  }, new AsyncFromSyncIterator(s);
}

/**
 * Astro passes `children` as a string of HTML, so we need
 * a wrapper `div` to render that content as VNodes.
 *
 * As a bonus, we can signal to React that this subtree is
 * entirely static and will never change via `shouldComponentUpdate`.
 */
const StaticHtml = ({ value, name }) => {
	if (!value) return null;
	return createElement('astro-slot', {
		name,
		suppressHydrationWarning: true,
		dangerouslySetInnerHTML: { __html: value },
	});
};

/**
 * This tells React to opt-out of re-rendering this subtree,
 * In addition to being a performance optimization,
 * this also allows other frameworks to attach to `children`.
 *
 * See https://preactjs.com/guide/v8/external-dom-mutations
 */
StaticHtml.shouldComponentUpdate = () => false;

const slotName$1 = str => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());

const reactTypeof = Symbol.for('react.element');

function errorIsComingFromPreactComponent(err) {
  return err.message && (err.message.startsWith("Cannot read property '__H'") || err.message.includes("(reading '__H')"));
}

function check$1(_x, _x2, _x3) {
  return _check.apply(this, arguments);
}

function _check() {
  _check = _asyncToGenerator(function* (Component, props, children) {
    // Note: there are packages that do some unholy things to create "components".
    // Checking the $$typeof property catches most of these patterns.
    if (typeof Component === 'object') {
      const $$typeof = Component['$$typeof'];
      return $$typeof && $$typeof.toString().slice('Symbol('.length).startsWith('react');
    }

    if (typeof Component !== 'function') return false;

    if (Component.prototype != null && typeof Component.prototype.render === 'function') {
      return React.Component.isPrototypeOf(Component) || React.PureComponent.isPrototypeOf(Component);
    }

    let error = null;
    let isReactComponent = false;

    function Tester(...args) {
      try {
        const vnode = Component(...args);

        if (vnode && vnode['$$typeof'] === reactTypeof) {
          isReactComponent = true;
        }
      } catch (err) {
        if (!errorIsComingFromPreactComponent(err)) {
          error = err;
        }
      }

      return React.createElement('div');
    }

    yield renderToStaticMarkup$1(Tester, props, children, {});

    if (error) {
      throw error;
    }

    return isReactComponent;
  });
  return _check.apply(this, arguments);
}

function getNodeWritable() {
  return _getNodeWritable.apply(this, arguments);
}

function _getNodeWritable() {
  _getNodeWritable = _asyncToGenerator(function* () {
    let nodeStreamBuiltinModuleName = 'stream';
    let {
      Writable
    } = yield import(nodeStreamBuiltinModuleName);
    return Writable;
  });
  return _getNodeWritable.apply(this, arguments);
}

function renderToStaticMarkup$1(_x4, _x5, _x6, _x7) {
  return _renderToStaticMarkup.apply(this, arguments);
}

function _renderToStaticMarkup() {
  _renderToStaticMarkup = _asyncToGenerator(function* (Component, props, {
    default: children,
    ...slotted
  }, metadata) {
    delete props['class'];
    const slots = {};

    for (const [key, value] of Object.entries(slotted)) {
      const name = slotName$1(key);
      slots[name] = React.createElement(StaticHtml, {
        value,
        name
      });
    } // Note: create newProps to avoid mutating `props` before they are serialized


    const newProps = { ...props,
      ...slots,
      children: children != null ? React.createElement(StaticHtml, {
        value: children
      }) : undefined
    };
    const vnode = React.createElement(Component, newProps);
    let html;

    if (metadata && metadata.hydrate) {
      html = ReactDOM.renderToString(vnode);

      if ('renderToReadableStream' in ReactDOM) {
        html = yield renderToReadableStreamAsync(vnode);
      } else {
        html = yield renderToPipeableStreamAsync(vnode);
      }
    } else {
      if ('renderToReadableStream' in ReactDOM) {
        html = yield renderToReadableStreamAsync(vnode);
      } else {
        html = yield renderToStaticNodeStreamAsync(vnode);
      }
    }

    return {
      html
    };
  });
  return _renderToStaticMarkup.apply(this, arguments);
}

function renderToPipeableStreamAsync(_x8) {
  return _renderToPipeableStreamAsync.apply(this, arguments);
}

function _renderToPipeableStreamAsync() {
  _renderToPipeableStreamAsync = _asyncToGenerator(function* (vnode) {
    const Writable = yield getNodeWritable();
    let html = '';
    return new Promise((resolve, reject) => {
      let error = undefined;
      let stream = ReactDOM.renderToPipeableStream(vnode, {
        onError(err) {
          error = err;
          reject(error);
        },

        onAllReady() {
          stream.pipe(new Writable({
            write(chunk, _encoding, callback) {
              html += chunk.toString('utf-8');
              callback();
            },

            destroy() {
              resolve(html);
            }

          }));
        }

      });
    });
  });
  return _renderToPipeableStreamAsync.apply(this, arguments);
}

function renderToStaticNodeStreamAsync(_x9) {
  return _renderToStaticNodeStreamAsync.apply(this, arguments);
}

function _renderToStaticNodeStreamAsync() {
  _renderToStaticNodeStreamAsync = _asyncToGenerator(function* (vnode) {
    const Writable = yield getNodeWritable();
    let html = '';
    return new Promise(resolve => {
      let stream = ReactDOM.renderToStaticNodeStream(vnode);
      stream.pipe(new Writable({
        write(chunk, _encoding, callback) {
          html += chunk.toString('utf-8');
          callback();
        },

        destroy() {
          resolve(html);
        }

      }));
    });
  });
  return _renderToStaticNodeStreamAsync.apply(this, arguments);
}

function renderToReadableStreamAsync(_x10) {
  return _renderToReadableStreamAsync.apply(this, arguments);
}

function _renderToReadableStreamAsync() {
  _renderToReadableStreamAsync = _asyncToGenerator(function* (vnode) {
    const decoder = new TextDecoder();
    const stream = yield ReactDOM.renderToReadableStream(vnode);
    let html = '';
    var _iteratorAbruptCompletion = false;
    var _didIteratorError = false;

    var _iteratorError;

    try {
      for (var _iterator = _asyncIterator(stream), _step; _iteratorAbruptCompletion = !(_step = yield _iterator.next()).done; _iteratorAbruptCompletion = false) {
        const chunk = _step.value;
        html += decoder.decode(chunk);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (_iteratorAbruptCompletion && _iterator.return != null) {
          yield _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    return html;
  });
  return _renderToReadableStreamAsync.apply(this, arguments);
}

const _renderer1 = {
  check: check$1,
  renderToStaticMarkup: renderToStaticMarkup$1
};

const ASTRO_VERSION = "1.0.8";
function createDeprecatedFetchContentFn() {
  return () => {
    throw new Error("Deprecated: Astro.fetchContent() has been replaced with Astro.glob().");
  };
}
function createAstroGlobFn() {
  const globHandler = (importMetaGlobResult, globValue) => {
    let allEntries = [...Object.values(importMetaGlobResult)];
    if (allEntries.length === 0) {
      throw new Error(`Astro.glob(${JSON.stringify(globValue())}) - no matches found.`);
    }
    return Promise.all(allEntries.map((fn) => fn()));
  };
  return globHandler;
}
function createAstro(filePathname, _site, projectRootStr) {
  const site = _site ? new URL(_site) : void 0;
  const referenceURL = new URL(filePathname, `http://localhost`);
  const projectRoot = new URL(projectRootStr);
  return {
    site,
    generator: `Astro v${ASTRO_VERSION}`,
    fetchContent: createDeprecatedFetchContentFn(),
    glob: createAstroGlobFn(),
    resolve(...segments) {
      let resolved = segments.reduce((u, segment) => new URL(segment, u), referenceURL).pathname;
      if (resolved.startsWith(projectRoot.pathname)) {
        resolved = "/" + resolved.slice(projectRoot.pathname.length);
      }
      return resolved;
    }
  };
}

const escapeHTML = escape;
class HTMLString extends String {
}
const markHTMLString = (value) => {
  if (value instanceof HTMLString) {
    return value;
  }
  if (typeof value === "string") {
    return new HTMLString(value);
  }
  return value;
};

class Metadata {
  constructor(filePathname, opts) {
    this.modules = opts.modules;
    this.hoisted = opts.hoisted;
    this.hydratedComponents = opts.hydratedComponents;
    this.clientOnlyComponents = opts.clientOnlyComponents;
    this.hydrationDirectives = opts.hydrationDirectives;
    this.mockURL = new URL(filePathname, "http://example.com");
    this.metadataCache = /* @__PURE__ */ new Map();
  }
  resolvePath(specifier) {
    if (specifier.startsWith(".")) {
      const resolved = new URL(specifier, this.mockURL).pathname;
      if (resolved.startsWith("/@fs") && resolved.endsWith(".jsx")) {
        return resolved.slice(0, resolved.length - 4);
      }
      return resolved;
    }
    return specifier;
  }
  getPath(Component) {
    const metadata = this.getComponentMetadata(Component);
    return (metadata == null ? void 0 : metadata.componentUrl) || null;
  }
  getExport(Component) {
    const metadata = this.getComponentMetadata(Component);
    return (metadata == null ? void 0 : metadata.componentExport) || null;
  }
  getComponentMetadata(Component) {
    if (this.metadataCache.has(Component)) {
      return this.metadataCache.get(Component);
    }
    const metadata = this.findComponentMetadata(Component);
    this.metadataCache.set(Component, metadata);
    return metadata;
  }
  findComponentMetadata(Component) {
    const isCustomElement = typeof Component === "string";
    for (const { module, specifier } of this.modules) {
      const id = this.resolvePath(specifier);
      for (const [key, value] of Object.entries(module)) {
        if (isCustomElement) {
          if (key === "tagName" && Component === value) {
            return {
              componentExport: key,
              componentUrl: id
            };
          }
        } else if (Component === value) {
          return {
            componentExport: key,
            componentUrl: id
          };
        }
      }
    }
    return null;
  }
}
function createMetadata(filePathname, options) {
  return new Metadata(filePathname, options);
}

function _AwaitValue(value) {
  this.wrapped = value;
}

function AsyncGenerator(gen) {
  var front, back;

  function send(key, arg) {
    return new Promise(function (resolve, reject) {
      var request = {
        key: key,
        arg: arg,
        resolve: resolve,
        reject: reject,
        next: null
      };

      if (back) {
        back = back.next = request;
      } else {
        front = back = request;
        resume(key, arg);
      }
    });
  }

  function resume(key, arg) {
    try {
      var result = gen[key](arg);
      var value = result.value;
      var wrappedAwait = value instanceof _AwaitValue;
      Promise.resolve(wrappedAwait ? value.wrapped : value).then(function (arg) {
        if (wrappedAwait) {
          resume(key === "return" ? "return" : "next", arg);
          return;
        }

        settle(result.done ? "return" : "normal", arg);
      }, function (err) {
        resume("throw", err);
      });
    } catch (err) {
      settle("throw", err);
    }
  }

  function settle(type, value) {
    switch (type) {
      case "return":
        front.resolve({
          value: value,
          done: true
        });
        break;

      case "throw":
        front.reject(value);
        break;

      default:
        front.resolve({
          value: value,
          done: false
        });
        break;
    }

    front = front.next;

    if (front) {
      resume(front.key, front.arg);
    } else {
      back = null;
    }
  }

  this._invoke = send;

  if (typeof gen["return"] !== "function") {
    this["return"] = undefined;
  }
}

AsyncGenerator.prototype[typeof Symbol === "function" && Symbol.asyncIterator || "@@asyncIterator"] = function () {
  return this;
};

AsyncGenerator.prototype.next = function (arg) {
  return this._invoke("next", arg);
};

AsyncGenerator.prototype["throw"] = function (arg) {
  return this._invoke("throw", arg);
};

AsyncGenerator.prototype["return"] = function (arg) {
  return this._invoke("return", arg);
};

function _wrapAsyncGenerator(fn) {
  return function () {
    return new AsyncGenerator(fn.apply(this, arguments));
  };
}

function _awaitAsyncGenerator(value) {
  return new _AwaitValue(value);
}

function _asyncGeneratorDelegate(inner, awaitWrap) {
  var iter = {},
      waiting = false;

  function pump(key, value) {
    waiting = true;
    value = new Promise(function (resolve) {
      resolve(inner[key](value));
    });
    return {
      done: false,
      value: awaitWrap(value)
    };
  }

  iter[typeof Symbol !== "undefined" && Symbol.iterator || "@@iterator"] = function () {
    return this;
  };

  iter.next = function (value) {
    if (waiting) {
      waiting = false;
      return value;
    }

    return pump("next", value);
  };

  if (typeof inner["throw"] === "function") {
    iter["throw"] = function (value) {
      if (waiting) {
        waiting = false;
        throw value;
      }

      return pump("throw", value);
    };
  }

  if (typeof inner["return"] === "function") {
    iter["return"] = function (value) {
      if (waiting) {
        waiting = false;
        return value;
      }

      return pump("return", value);
    };
  }

  return iter;
}

const PROP_TYPE = {
  Value: 0,
  JSON: 1,
  RegExp: 2,
  Date: 3,
  Map: 4,
  Set: 5,
  BigInt: 6,
  URL: 7
};
function serializeArray(value) {
  return value.map((v) => convertToSerializedForm(v));
}
function serializeObject(value) {
  return Object.fromEntries(
    Object.entries(value).map(([k, v]) => {
      return [k, convertToSerializedForm(v)];
    })
  );
}
function convertToSerializedForm(value) {
  const tag = Object.prototype.toString.call(value);
  switch (tag) {
    case "[object Date]": {
      return [PROP_TYPE.Date, value.toISOString()];
    }
    case "[object RegExp]": {
      return [PROP_TYPE.RegExp, value.source];
    }
    case "[object Map]": {
      return [PROP_TYPE.Map, JSON.stringify(serializeArray(Array.from(value)))];
    }
    case "[object Set]": {
      return [PROP_TYPE.Set, JSON.stringify(serializeArray(Array.from(value)))];
    }
    case "[object BigInt]": {
      return [PROP_TYPE.BigInt, value.toString()];
    }
    case "[object URL]": {
      return [PROP_TYPE.URL, value.toString()];
    }
    case "[object Array]": {
      return [PROP_TYPE.JSON, JSON.stringify(serializeArray(value))];
    }
    default: {
      if (value !== null && typeof value === "object") {
        return [PROP_TYPE.Value, serializeObject(value)];
      } else {
        return [PROP_TYPE.Value, value];
      }
    }
  }
}
function serializeProps(props) {
  return JSON.stringify(serializeObject(props));
}

function serializeListValue(value) {
  const hash = {};
  push(value);
  return Object.keys(hash).join(" ");
  function push(item) {
    if (item && typeof item.forEach === "function")
      item.forEach(push);
    else if (item === Object(item))
      Object.keys(item).forEach((name) => {
        if (item[name])
          push(name);
      });
    else {
      item = item === false || item == null ? "" : String(item).trim();
      if (item) {
        item.split(/\s+/).forEach((name) => {
          hash[name] = true;
        });
      }
    }
  }
}

const HydrationDirectivesRaw = ["load", "idle", "media", "visible", "only"];
const HydrationDirectives = new Set(HydrationDirectivesRaw);
const HydrationDirectiveProps = new Set(HydrationDirectivesRaw.map((n) => `client:${n}`));
function extractDirectives(inputProps) {
  let extracted = {
    isPage: false,
    hydration: null,
    props: {}
  };
  for (const [key, value] of Object.entries(inputProps)) {
    if (key.startsWith("server:")) {
      if (key === "server:root") {
        extracted.isPage = true;
      }
    }
    if (key.startsWith("client:")) {
      if (!extracted.hydration) {
        extracted.hydration = {
          directive: "",
          value: "",
          componentUrl: "",
          componentExport: { value: "" }
        };
      }
      switch (key) {
        case "client:component-path": {
          extracted.hydration.componentUrl = value;
          break;
        }
        case "client:component-export": {
          extracted.hydration.componentExport.value = value;
          break;
        }
        case "client:component-hydration": {
          break;
        }
        case "client:display-name": {
          break;
        }
        default: {
          extracted.hydration.directive = key.split(":")[1];
          extracted.hydration.value = value;
          if (!HydrationDirectives.has(extracted.hydration.directive)) {
            throw new Error(
              `Error: invalid hydration directive "${key}". Supported hydration methods: ${Array.from(
                HydrationDirectiveProps
              ).join(", ")}`
            );
          }
          if (extracted.hydration.directive === "media" && typeof extracted.hydration.value !== "string") {
            throw new Error(
              'Error: Media query must be provided for "client:media", similar to client:media="(max-width: 600px)"'
            );
          }
          break;
        }
      }
    } else if (key === "class:list") {
      extracted.props[key.slice(0, -5)] = serializeListValue(value);
    } else {
      extracted.props[key] = value;
    }
  }
  return extracted;
}
async function generateHydrateScript(scriptOptions, metadata) {
  const { renderer, result, astroId, props, attrs } = scriptOptions;
  const { hydrate, componentUrl, componentExport } = metadata;
  if (!componentExport.value) {
    throw new Error(
      `Unable to resolve a valid export for "${metadata.displayName}"! Please open an issue at https://astro.build/issues!`
    );
  }
  const island = {
    children: "",
    props: {
      uid: astroId
    }
  };
  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      island.props[key] = value;
    }
  }
  island.props["component-url"] = await result.resolve(componentUrl);
  if (renderer.clientEntrypoint) {
    island.props["component-export"] = componentExport.value;
    island.props["renderer-url"] = await result.resolve(renderer.clientEntrypoint);
    island.props["props"] = escapeHTML(serializeProps(props));
  }
  island.props["ssr"] = "";
  island.props["client"] = hydrate;
  island.props["before-hydration-url"] = await result.resolve("astro:scripts/before-hydration.js");
  island.props["opts"] = escapeHTML(
    JSON.stringify({
      name: metadata.displayName,
      value: metadata.hydrateArgs || ""
    })
  );
  return island;
}

var idle_prebuilt_default = `(self.Astro=self.Astro||{}).idle=t=>{const e=async()=>{await(await t())()};"requestIdleCallback"in window?window.requestIdleCallback(e):setTimeout(e,200)},window.dispatchEvent(new Event("astro:idle"));`;

var load_prebuilt_default = `(self.Astro=self.Astro||{}).load=a=>{(async()=>await(await a())())()},window.dispatchEvent(new Event("astro:load"));`;

var media_prebuilt_default = `(self.Astro=self.Astro||{}).media=(s,a)=>{const t=async()=>{await(await s())()};if(a.value){const e=matchMedia(a.value);e.matches?t():e.addEventListener("change",t,{once:!0})}},window.dispatchEvent(new Event("astro:media"));`;

var only_prebuilt_default = `(self.Astro=self.Astro||{}).only=t=>{(async()=>await(await t())())()},window.dispatchEvent(new Event("astro:only"));`;

var visible_prebuilt_default = `(self.Astro=self.Astro||{}).visible=(s,c,n)=>{const r=async()=>{await(await s())()};let i=new IntersectionObserver(e=>{for(const t of e)if(!!t.isIntersecting){i.disconnect(),r();break}});for(let e=0;e<n.children.length;e++){const t=n.children[e];i.observe(t)}},window.dispatchEvent(new Event("astro:visible"));`;

var astro_island_prebuilt_default = `var d;{const l={0:t=>t,1:t=>JSON.parse(t,n),2:t=>new RegExp(t),3:t=>new Date(t),4:t=>new Map(JSON.parse(t,n)),5:t=>new Set(JSON.parse(t,n)),6:t=>BigInt(t),7:t=>new URL(t)},n=(t,r)=>{if(t===""||!Array.isArray(r))return r;const[e,i]=r;return e in l?l[e](i):void 0};customElements.get("astro-island")||customElements.define("astro-island",(d=class extends HTMLElement{constructor(){super(...arguments);this.hydrate=()=>{if(!this.hydrator||this.parentElement?.closest("astro-island[ssr]"))return;const r=this.querySelectorAll("astro-slot"),e={},i=this.querySelectorAll("template[data-astro-template]");for(const s of i)!s.closest(this.tagName)?.isSameNode(this)||(e[s.getAttribute("data-astro-template")||"default"]=s.innerHTML,s.remove());for(const s of r)!s.closest(this.tagName)?.isSameNode(this)||(e[s.getAttribute("name")||"default"]=s.innerHTML);const o=this.hasAttribute("props")?JSON.parse(this.getAttribute("props"),n):{};this.hydrator(this)(this.Component,o,e,{client:this.getAttribute("client")}),this.removeAttribute("ssr"),window.removeEventListener("astro:hydrate",this.hydrate),window.dispatchEvent(new CustomEvent("astro:hydrate"))}}connectedCallback(){!this.hasAttribute("await-children")||this.firstChild?this.childrenConnectedCallback():new MutationObserver((r,e)=>{e.disconnect(),this.childrenConnectedCallback()}).observe(this,{childList:!0})}async childrenConnectedCallback(){window.addEventListener("astro:hydrate",this.hydrate),await import(this.getAttribute("before-hydration-url")),this.start()}start(){const r=JSON.parse(this.getAttribute("opts")),e=this.getAttribute("client");if(Astro[e]===void 0){window.addEventListener(\`astro:\${e}\`,()=>this.start(),{once:!0});return}Astro[e](async()=>{const i=this.getAttribute("renderer-url"),[o,{default:s}]=await Promise.all([import(this.getAttribute("component-url")),i?import(i):()=>()=>{}]),a=this.getAttribute("component-export")||"default";if(!a.includes("."))this.Component=o[a];else{this.Component=o;for(const c of a.split("."))this.Component=this.Component[c]}return this.hydrator=s,this.hydrate},r,this)}attributeChangedCallback(){this.hydrator&&this.hydrate()}},d.observedAttributes=["props"],d))}`;

function determineIfNeedsHydrationScript(result) {
  if (result._metadata.hasHydrationScript) {
    return false;
  }
  return result._metadata.hasHydrationScript = true;
}
const hydrationScripts = {
  idle: idle_prebuilt_default,
  load: load_prebuilt_default,
  only: only_prebuilt_default,
  media: media_prebuilt_default,
  visible: visible_prebuilt_default
};
function determinesIfNeedsDirectiveScript(result, directive) {
  if (result._metadata.hasDirectives.has(directive)) {
    return false;
  }
  result._metadata.hasDirectives.add(directive);
  return true;
}
function getDirectiveScriptText(directive) {
  if (!(directive in hydrationScripts)) {
    throw new Error(`Unknown directive: ${directive}`);
  }
  const directiveScriptText = hydrationScripts[directive];
  return directiveScriptText;
}
function getPrescripts(type, directive) {
  switch (type) {
    case "both":
      return `<style>astro-island,astro-slot{display:contents}</style><script>${getDirectiveScriptText(directive) + astro_island_prebuilt_default}<\/script>`;
    case "directive":
      return `<script>${getDirectiveScriptText(directive)}<\/script>`;
  }
  return "";
}

const Fragment = Symbol.for("astro:fragment");
const Renderer = Symbol.for("astro:renderer");
function stringifyChunk(result, chunk) {
  switch (chunk.type) {
    case "directive": {
      const { hydration } = chunk;
      let needsHydrationScript = hydration && determineIfNeedsHydrationScript(result);
      let needsDirectiveScript = hydration && determinesIfNeedsDirectiveScript(result, hydration.directive);
      let prescriptType = needsHydrationScript ? "both" : needsDirectiveScript ? "directive" : null;
      if (prescriptType) {
        let prescripts = getPrescripts(prescriptType, hydration.directive);
        return markHTMLString(prescripts);
      } else {
        return "";
      }
    }
    default: {
      return chunk.toString();
    }
  }
}

function validateComponentProps(props, displayName) {
  var _a;

  if (((_a = Object.assign({"BASE_URL":"/","MODE":"production","DEV":false,"PROD":true}, {
    _: process.env._
  })) == null ? void 0 : _a.DEV) && props != null) {
    for (const prop of Object.keys(props)) {
      if (HydrationDirectiveProps.has(prop)) {
        console.warn(`You are attempting to render <${displayName} ${prop} />, but ${displayName} is an Astro component. Astro components do not render in the client and should not have a hydration directive. Please use a framework component for client rendering.`);
      }
    }
  }
}

class AstroComponent {
  constructor(htmlParts, expressions) {
    this.htmlParts = htmlParts;
    this.expressions = expressions;
  }

  get [Symbol.toStringTag]() {
    return "AstroComponent";
  }

  [Symbol.asyncIterator]() {
    var _this = this;

    return _wrapAsyncGenerator(function* () {
      const {
        htmlParts,
        expressions
      } = _this;

      for (let i = 0; i < htmlParts.length; i++) {
        const html = htmlParts[i];
        const expression = expressions[i];
        yield markHTMLString(html);
        yield* _asyncGeneratorDelegate(_asyncIterator(renderChild(expression)), _awaitAsyncGenerator);
      }
    })();
  }

}

function isAstroComponent(obj) {
  return typeof obj === "object" && Object.prototype.toString.call(obj) === "[object AstroComponent]";
}

function isAstroComponentFactory(obj) {
  return obj == null ? false : !!obj.isAstroComponentFactory;
}

function renderAstroComponent(_x) {
  return _renderAstroComponent.apply(this, arguments);
}

function _renderAstroComponent() {
  _renderAstroComponent = _wrapAsyncGenerator(function* (component) {
    var _iteratorAbruptCompletion = false;
    var _didIteratorError = false;

    var _iteratorError;

    try {
      for (var _iterator = _asyncIterator(component), _step; _iteratorAbruptCompletion = !(_step = yield _awaitAsyncGenerator(_iterator.next())).done; _iteratorAbruptCompletion = false) {
        const value = _step.value;

        if (value || value === 0) {
          var _iteratorAbruptCompletion2 = false;
          var _didIteratorError2 = false;

          var _iteratorError2;

          try {
            for (var _iterator2 = _asyncIterator(renderChild(value)), _step2; _iteratorAbruptCompletion2 = !(_step2 = yield _awaitAsyncGenerator(_iterator2.next())).done; _iteratorAbruptCompletion2 = false) {
              const chunk = _step2.value;

              switch (chunk.type) {
                case "directive":
                  {
                    yield chunk;
                    break;
                  }

                default:
                  {
                    yield markHTMLString(chunk);
                    break;
                  }
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (_iteratorAbruptCompletion2 && _iterator2.return != null) {
                yield _awaitAsyncGenerator(_iterator2.return());
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (_iteratorAbruptCompletion && _iterator.return != null) {
          yield _awaitAsyncGenerator(_iterator.return());
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  });
  return _renderAstroComponent.apply(this, arguments);
}

function renderToString(_x2, _x3, _x4, _x5) {
  return _renderToString.apply(this, arguments);
}

function _renderToString() {
  _renderToString = _asyncToGenerator(function* (result, componentFactory, props, children) {
    const Component = yield componentFactory(result, props, children);

    if (!isAstroComponent(Component)) {
      const response = Component;
      throw response;
    }

    let html = "";
    var _iteratorAbruptCompletion3 = false;
    var _didIteratorError3 = false;

    var _iteratorError3;

    try {
      for (var _iterator3 = _asyncIterator(renderAstroComponent(Component)), _step3; _iteratorAbruptCompletion3 = !(_step3 = yield _iterator3.next()).done; _iteratorAbruptCompletion3 = false) {
        const chunk = _step3.value;
        html += stringifyChunk(result, chunk);
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (_iteratorAbruptCompletion3 && _iterator3.return != null) {
          yield _iterator3.return();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }

    return html;
  });
  return _renderToString.apply(this, arguments);
}

function renderToIterable(_x6, _x7, _x8, _x9, _x10) {
  return _renderToIterable.apply(this, arguments);
}

function _renderToIterable() {
  _renderToIterable = _asyncToGenerator(function* (result, componentFactory, displayName, props, children) {
    validateComponentProps(props, displayName);
    const Component = yield componentFactory(result, props, children);

    if (!isAstroComponent(Component)) {
      console.warn(`Returning a Response is only supported inside of page components. Consider refactoring this logic into something like a function that can be used in the page.`);
      const response = Component;
      throw response;
    }

    return renderAstroComponent(Component);
  });
  return _renderToIterable.apply(this, arguments);
}

function renderTemplate(_x11) {
  return _renderTemplate.apply(this, arguments);
}

function _renderTemplate() {
  _renderTemplate = _asyncToGenerator(function* (htmlParts, ...expressions) {
    return new AstroComponent(htmlParts, expressions);
  });
  return _renderTemplate.apply(this, arguments);
}

function renderChild(_x) {
  return _renderChild.apply(this, arguments);
}

function _renderChild() {
  _renderChild = _wrapAsyncGenerator(function* (child) {
    child = yield _awaitAsyncGenerator(child);

    if (child instanceof HTMLString) {
      yield child;
    } else if (Array.isArray(child)) {
      for (const value of child) {
        yield markHTMLString(yield _awaitAsyncGenerator(renderChild(value)));
      }
    } else if (typeof child === "function") {
      yield* _asyncGeneratorDelegate(_asyncIterator(renderChild(child())), _awaitAsyncGenerator);
    } else if (typeof child === "string") {
      yield markHTMLString(escapeHTML(child));
    } else if (!child && child !== 0) ; else if (child instanceof AstroComponent || Object.prototype.toString.call(child) === "[object AstroComponent]") {
      yield* _asyncGeneratorDelegate(_asyncIterator(renderAstroComponent(child)), _awaitAsyncGenerator);
    } else if (typeof child === "object" && Symbol.asyncIterator in child) {
      yield* _asyncGeneratorDelegate(_asyncIterator(child), _awaitAsyncGenerator);
    } else {
      yield child;
    }
  });
  return _renderChild.apply(this, arguments);
}

function renderSlot(_x2, _x3, _x4) {
  return _renderSlot.apply(this, arguments);
}

function _renderSlot() {
  _renderSlot = _asyncToGenerator(function* (result, slotted, fallback) {
    if (slotted) {
      let iterator = renderChild(slotted);
      let content = "";
      var _iteratorAbruptCompletion = false;
      var _didIteratorError = false;

      var _iteratorError;

      try {
        for (var _iterator = _asyncIterator(iterator), _step; _iteratorAbruptCompletion = !(_step = yield _iterator.next()).done; _iteratorAbruptCompletion = false) {
          const chunk = _step.value;

          if (chunk.type === "directive") {
            content += stringifyChunk(result, chunk);
          } else {
            content += chunk;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (_iteratorAbruptCompletion && _iterator.return != null) {
            yield _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return markHTMLString(content);
    }

    return fallback;
  });
  return _renderSlot.apply(this, arguments);
}

/**
 * shortdash - https://github.com/bibig/node-shorthash
 *
 * @license
 *
 * (The MIT License)
 *
 * Copyright (c) 2013 Bibig <bibig@me.com>
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
const dictionary = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY";
const binary = dictionary.length;
function bitwise(str) {
  let hash = 0;
  if (str.length === 0)
    return hash;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    hash = (hash << 5) - hash + ch;
    hash = hash & hash;
  }
  return hash;
}
function shorthash(text) {
  let num;
  let result = "";
  let integer = bitwise(text);
  const sign = integer < 0 ? "Z" : "";
  integer = Math.abs(integer);
  while (integer >= binary) {
    num = integer % binary;
    integer = Math.floor(integer / binary);
    result = dictionary[num] + result;
  }
  if (integer > 0) {
    result = dictionary[integer] + result;
  }
  return sign + result;
}

const voidElementNames = /^(area|base|br|col|command|embed|hr|img|input|keygen|link|meta|param|source|track|wbr)$/i;
const htmlBooleanAttributes = /^(allowfullscreen|async|autofocus|autoplay|controls|default|defer|disabled|disablepictureinpicture|disableremoteplayback|formnovalidate|hidden|loop|nomodule|novalidate|open|playsinline|readonly|required|reversed|scoped|seamless|itemscope)$/i;
const htmlEnumAttributes = /^(contenteditable|draggable|spellcheck|value)$/i;
const svgEnumAttributes = /^(autoReverse|externalResourcesRequired|focusable|preserveAlpha)$/i;
const STATIC_DIRECTIVES = /* @__PURE__ */ new Set(["set:html", "set:text"]);
const toIdent = (k) => k.trim().replace(/(?:(?<!^)\b\w|\s+|[^\w]+)/g, (match, index) => {
  if (/[^\w]|\s/.test(match))
    return "";
  return index === 0 ? match : match.toUpperCase();
});
const toAttributeString = (value, shouldEscape = true) => shouldEscape ? String(value).replace(/&/g, "&#38;").replace(/"/g, "&#34;") : value;
const kebab = (k) => k.toLowerCase() === k ? k : k.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
const toStyleString = (obj) => Object.entries(obj).map(([k, v]) => `${kebab(k)}:${v}`).join(";");
function defineScriptVars(vars) {
  let output = "";
  for (const [key, value] of Object.entries(vars)) {
    output += `let ${toIdent(key)} = ${JSON.stringify(value)};
`;
  }
  return markHTMLString(output);
}
function formatList(values) {
  if (values.length === 1) {
    return values[0];
  }
  return `${values.slice(0, -1).join(", ")} or ${values[values.length - 1]}`;
}
function addAttribute(value, key, shouldEscape = true) {
  if (value == null) {
    return "";
  }
  if (value === false) {
    if (htmlEnumAttributes.test(key) || svgEnumAttributes.test(key)) {
      return markHTMLString(` ${key}="false"`);
    }
    return "";
  }
  if (STATIC_DIRECTIVES.has(key)) {
    console.warn(`[astro] The "${key}" directive cannot be applied dynamically at runtime. It will not be rendered as an attribute.

Make sure to use the static attribute syntax (\`${key}={value}\`) instead of the dynamic spread syntax (\`{...{ "${key}": value }}\`).`);
    return "";
  }
  if (key === "class:list") {
    const listValue = toAttributeString(serializeListValue(value));
    if (listValue === "") {
      return "";
    }
    return markHTMLString(` ${key.slice(0, -5)}="${listValue}"`);
  }
  if (key === "style" && !(value instanceof HTMLString) && typeof value === "object") {
    return markHTMLString(` ${key}="${toStyleString(value)}"`);
  }
  if (key === "className") {
    return markHTMLString(` class="${toAttributeString(value, shouldEscape)}"`);
  }
  if (value === true && (key.startsWith("data-") || htmlBooleanAttributes.test(key))) {
    return markHTMLString(` ${key}`);
  } else {
    return markHTMLString(` ${key}="${toAttributeString(value, shouldEscape)}"`);
  }
}
function internalSpreadAttributes(values, shouldEscape = true) {
  let output = "";
  for (const [key, value] of Object.entries(values)) {
    output += addAttribute(value, key, shouldEscape);
  }
  return markHTMLString(output);
}
function renderElement$1(name, { props: _props, children = "" }, shouldEscape = true) {
  const { lang: _, "data-astro-id": astroId, "define:vars": defineVars, ...props } = _props;
  if (defineVars) {
    if (name === "style") {
      delete props["is:global"];
      delete props["is:scoped"];
    }
    if (name === "script") {
      delete props.hoist;
      children = defineScriptVars(defineVars) + "\n" + children;
    }
  }
  if ((children == null || children == "") && voidElementNames.test(name)) {
    return `<${name}${internalSpreadAttributes(props, shouldEscape)} />`;
  }
  return `<${name}${internalSpreadAttributes(props, shouldEscape)}>${children}</${name}>`;
}

function componentIsHTMLElement(Component) {
  return typeof HTMLElement !== "undefined" && HTMLElement.isPrototypeOf(Component);
}
async function renderHTMLElement(result, constructor, props, slots) {
  const name = getHTMLElementName(constructor);
  let attrHTML = "";
  for (const attr in props) {
    attrHTML += ` ${attr}="${toAttributeString(await props[attr])}"`;
  }
  return markHTMLString(
    `<${name}${attrHTML}>${await renderSlot(result, slots == null ? void 0 : slots.default)}</${name}>`
  );
}
function getHTMLElementName(constructor) {
  const definedName = customElements.getName(constructor);
  if (definedName)
    return definedName;
  const assignedName = constructor.name.replace(/^HTML|Element$/g, "").replace(/[A-Z]/g, "-$&").toLowerCase().replace(/^-/, "html-");
  return assignedName;
}

const rendererAliases = /* @__PURE__ */new Map([["solid", "solid-js"]]);

function guessRenderers(componentUrl) {
  const extname = componentUrl == null ? void 0 : componentUrl.split(".").pop();

  switch (extname) {
    case "svelte":
      return ["@astrojs/svelte"];

    case "vue":
      return ["@astrojs/vue"];

    case "jsx":
    case "tsx":
      return ["@astrojs/react", "@astrojs/preact"];

    default:
      return ["@astrojs/react", "@astrojs/preact", "@astrojs/vue", "@astrojs/svelte"];
  }
}

function getComponentType(Component) {
  if (Component === Fragment) {
    return "fragment";
  }

  if (Component && typeof Component === "object" && Component["astro:html"]) {
    return "html";
  }

  if (isAstroComponentFactory(Component)) {
    return "astro-factory";
  }

  return "unknown";
}

function renderComponent(_x, _x2, _x3, _x4) {
  return _renderComponent.apply(this, arguments);
}

function _renderComponent() {
  _renderComponent = _asyncToGenerator(function* (result, displayName, Component, _props, slots = {}) {
    var _a;

    Component = yield Component;

    switch (getComponentType(Component)) {
      case "fragment":
        {
          const children2 = yield renderSlot(result, slots == null ? void 0 : slots.default);

          if (children2 == null) {
            return children2;
          }

          return markHTMLString(children2);
        }

      case "html":
        {
          const children2 = {};

          if (slots) {
            yield Promise.all(Object.entries(slots).map(([key, value]) => renderSlot(result, value).then(output => {
              children2[key] = output;
            })));
          }

          const html2 = Component.render({
            slots: children2
          });
          return markHTMLString(html2);
        }

      case "astro-factory":
        {
          function renderAstroComponentInline() {
            return _renderAstroComponentInline.apply(this, arguments);
          }

          function _renderAstroComponentInline() {
            _renderAstroComponentInline = _wrapAsyncGenerator(function* () {
              let iterable = yield _awaitAsyncGenerator(renderToIterable(result, Component, displayName, _props, slots));
              yield* _asyncGeneratorDelegate(_asyncIterator(iterable), _awaitAsyncGenerator);
            });
            return _renderAstroComponentInline.apply(this, arguments);
          }

          return renderAstroComponentInline();
        }
    }

    if (!Component && !_props["client:only"]) {
      throw new Error(`Unable to render ${displayName} because it is ${Component}!
Did you forget to import the component or is it possible there is a typo?`);
    }

    const {
      renderers
    } = result._metadata;
    const metadata = {
      displayName
    };
    const {
      hydration,
      isPage,
      props
    } = extractDirectives(_props);
    let html = "";
    let attrs = void 0;

    if (hydration) {
      metadata.hydrate = hydration.directive;
      metadata.hydrateArgs = hydration.value;
      metadata.componentExport = hydration.componentExport;
      metadata.componentUrl = hydration.componentUrl;
    }

    const probableRendererNames = guessRenderers(metadata.componentUrl);

    if (Array.isArray(renderers) && renderers.length === 0 && typeof Component !== "string" && !componentIsHTMLElement(Component)) {
      const message = `Unable to render ${metadata.displayName}!

There are no \`integrations\` set in your \`astro.config.mjs\` file.
Did you mean to add ${formatList(probableRendererNames.map(r => "`" + r + "`"))}?`;
      throw new Error(message);
    }

    const children = {};

    if (slots) {
      yield Promise.all(Object.entries(slots).map(([key, value]) => renderSlot(result, value).then(output => {
        children[key] = output;
      })));
    }

    let renderer;

    if (metadata.hydrate !== "only") {
      if (Component && Component[Renderer]) {
        const rendererName = Component[Renderer];
        renderer = renderers.find(({
          name
        }) => name === rendererName);
      }

      if (!renderer) {
        let error;

        for (const r of renderers) {
          try {
            if (yield r.ssr.check.call({
              result
            }, Component, props, children)) {
              renderer = r;
              break;
            }
          } catch (e) {
            error ?? (error = e);
          }
        }

        if (!renderer && error) {
          throw error;
        }
      }

      if (!renderer && typeof HTMLElement === "function" && componentIsHTMLElement(Component)) {
        const output = renderHTMLElement(result, Component, _props, slots);
        return output;
      }
    } else {
      if (metadata.hydrateArgs) {
        const passedName = metadata.hydrateArgs;
        const rendererName = rendererAliases.has(passedName) ? rendererAliases.get(passedName) : passedName;
        renderer = renderers.find(({
          name
        }) => name === `@astrojs/${rendererName}` || name === rendererName);
      }

      if (!renderer && renderers.length === 1) {
        renderer = renderers[0];
      }

      if (!renderer) {
        const extname = (_a = metadata.componentUrl) == null ? void 0 : _a.split(".").pop();
        renderer = renderers.filter(({
          name
        }) => name === `@astrojs/${extname}` || name === extname)[0];
      }
    }

    if (!renderer) {
      if (metadata.hydrate === "only") {
        throw new Error(`Unable to render ${metadata.displayName}!

Using the \`client:only\` hydration strategy, Astro needs a hint to use the correct renderer.
Did you mean to pass <${metadata.displayName} client:only="${probableRendererNames.map(r => r.replace("@astrojs/", "")).join("|")}" />
`);
      } else if (typeof Component !== "string") {
        const matchingRenderers = renderers.filter(r => probableRendererNames.includes(r.name));
        const plural = renderers.length > 1;

        if (matchingRenderers.length === 0) {
          throw new Error(`Unable to render ${metadata.displayName}!

There ${plural ? "are" : "is"} ${renderers.length} renderer${plural ? "s" : ""} configured in your \`astro.config.mjs\` file,
but ${plural ? "none were" : "it was not"} able to server-side render ${metadata.displayName}.

Did you mean to enable ${formatList(probableRendererNames.map(r => "`" + r + "`"))}?`);
        } else if (matchingRenderers.length === 1) {
          renderer = matchingRenderers[0];
          ({
            html,
            attrs
          } = yield renderer.ssr.renderToStaticMarkup.call({
            result
          }, Component, props, children, metadata));
        } else {
          throw new Error(`Unable to render ${metadata.displayName}!

This component likely uses ${formatList(probableRendererNames)},
but Astro encountered an error during server-side rendering.

Please ensure that ${metadata.displayName}:
1. Does not unconditionally access browser-specific globals like \`window\` or \`document\`.
   If this is unavoidable, use the \`client:only\` hydration directive.
2. Does not conditionally return \`null\` or \`undefined\` when rendered on the server.

If you're still stuck, please open an issue on GitHub or join us at https://astro.build/chat.`);
        }
      }
    } else {
      if (metadata.hydrate === "only") {
        html = yield renderSlot(result, slots == null ? void 0 : slots.fallback);
      } else {
        ({
          html,
          attrs
        } = yield renderer.ssr.renderToStaticMarkup.call({
          result
        }, Component, props, children, metadata));
      }
    }

    if (renderer && !renderer.clientEntrypoint && renderer.name !== "@astrojs/lit" && metadata.hydrate) {
      throw new Error(`${metadata.displayName} component has a \`client:${metadata.hydrate}\` directive, but no client entrypoint was provided by ${renderer.name}!`);
    }

    if (!html && typeof Component === "string") {
      const childSlots = Object.values(children).join("");
      const iterable = renderAstroComponent(yield renderTemplate`<${Component}${internalSpreadAttributes(props)}${markHTMLString(childSlots === "" && voidElementNames.test(Component) ? `/>` : `>${childSlots}</${Component}>`)}`);
      html = "";
      var _iteratorAbruptCompletion = false;
      var _didIteratorError = false;

      var _iteratorError;

      try {
        for (var _iterator = _asyncIterator(iterable), _step; _iteratorAbruptCompletion = !(_step = yield _iterator.next()).done; _iteratorAbruptCompletion = false) {
          const chunk = _step.value;
          html += chunk;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (_iteratorAbruptCompletion && _iterator.return != null) {
            yield _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }

    if (!hydration) {
      if (isPage || (renderer == null ? void 0 : renderer.name) === "astro:jsx") {
        return html;
      }

      return markHTMLString(html.replace(/\<\/?astro-slot\>/g, ""));
    }

    const astroId = shorthash(`<!--${metadata.componentExport.value}:${metadata.componentUrl}-->
${html}
${serializeProps(props)}`);
    const island = yield generateHydrateScript({
      renderer,
      result,
      astroId,
      props,
      attrs
    }, metadata);
    let unrenderedSlots = [];

    if (html) {
      if (Object.keys(children).length > 0) {
        for (const key of Object.keys(children)) {
          if (!html.includes(key === "default" ? `<astro-slot>` : `<astro-slot name="${key}">`)) {
            unrenderedSlots.push(key);
          }
        }
      }
    } else {
      unrenderedSlots = Object.keys(children);
    }

    const template = unrenderedSlots.length > 0 ? unrenderedSlots.map(key => `<template data-astro-template${key !== "default" ? `="${key}"` : ""}>${children[key]}</template>`).join("") : "";
    island.children = `${html ?? ""}${template}`;

    if (island.children) {
      island.props["await-children"] = "";
    }

    function renderAll() {
      return _renderAll.apply(this, arguments);
    }

    function _renderAll() {
      _renderAll = _wrapAsyncGenerator(function* () {
        yield {
          type: "directive",
          hydration,
          result
        };
        yield markHTMLString(renderElement$1("astro-island", island, false));
      });
      return _renderAll.apply(this, arguments);
    }

    return renderAll();
  });
  return _renderComponent.apply(this, arguments);
}

const uniqueElements = (item, index, all) => {
  const props = JSON.stringify(item.props);
  const children = item.children;
  return index === all.findIndex(i => JSON.stringify(i.props) === props && i.children == children);
};

const alreadyHeadRenderedResults = /* @__PURE__ */new WeakSet();

function renderHead(result) {
  alreadyHeadRenderedResults.add(result);
  const styles = Array.from(result.styles).filter(uniqueElements).map(style => renderElement$1("style", style));
  result.styles.clear();
  const scripts = Array.from(result.scripts).filter(uniqueElements).map((script, i) => {
    return renderElement$1("script", script, false);
  });
  const links = Array.from(result.links).filter(uniqueElements).map(link => renderElement$1("link", link, false));
  return markHTMLString(links.join("\n") + styles.join("\n") + scripts.join("\n"));
}

function maybeRenderHead(_x) {
  return _maybeRenderHead.apply(this, arguments);
}

function _maybeRenderHead() {
  _maybeRenderHead = _wrapAsyncGenerator(function* (result) {
    if (alreadyHeadRenderedResults.has(result)) {
      return;
    }

    yield renderHead(result);
  });
  return _maybeRenderHead.apply(this, arguments);
}

typeof process === "object" && Object.prototype.toString.call(process) === "[object process]";

new TextEncoder();

function createComponent(cb) {
  cb.isAstroComponentFactory = true;
  return cb;
}
function __astro_tag_component__(Component, rendererName) {
  if (!Component)
    return;
  if (typeof Component !== "function")
    return;
  Object.defineProperty(Component, Renderer, {
    value: rendererName,
    enumerable: false,
    writable: false
  });
}
function spreadAttributes(values, _name, { class: scopedClassName } = {}) {
  let output = "";
  if (scopedClassName) {
    if (typeof values.class !== "undefined") {
      values.class += ` ${scopedClassName}`;
    } else if (typeof values["class:list"] !== "undefined") {
      values["class:list"] = [values["class:list"], scopedClassName];
    } else {
      values.class = scopedClassName;
    }
  }
  for (const [key, value] of Object.entries(values)) {
    output += addAttribute(value, key, true);
  }
  return markHTMLString(output);
}

const AstroJSX = "astro:jsx";
const Empty = Symbol("empty");
const toSlotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
function isVNode(vnode) {
  return vnode && typeof vnode === "object" && vnode[AstroJSX];
}
function transformSlots(vnode) {
  if (typeof vnode.type === "string")
    return vnode;
  const slots = {};
  if (isVNode(vnode.props.children)) {
    const child = vnode.props.children;
    if (!isVNode(child))
      return;
    if (!("slot" in child.props))
      return;
    const name = toSlotName(child.props.slot);
    slots[name] = [child];
    slots[name]["$$slot"] = true;
    delete child.props.slot;
    delete vnode.props.children;
  }
  if (Array.isArray(vnode.props.children)) {
    vnode.props.children = vnode.props.children.map((child) => {
      if (!isVNode(child))
        return child;
      if (!("slot" in child.props))
        return child;
      const name = toSlotName(child.props.slot);
      if (Array.isArray(slots[name])) {
        slots[name].push(child);
      } else {
        slots[name] = [child];
        slots[name]["$$slot"] = true;
      }
      delete child.props.slot;
      return Empty;
    }).filter((v) => v !== Empty);
  }
  Object.assign(vnode.props, slots);
}
function markRawChildren(child) {
  if (typeof child === "string")
    return markHTMLString(child);
  if (Array.isArray(child))
    return child.map((c) => markRawChildren(c));
  return child;
}
function transformSetDirectives(vnode) {
  if (!("set:html" in vnode.props || "set:text" in vnode.props))
    return;
  if ("set:html" in vnode.props) {
    const children = markRawChildren(vnode.props["set:html"]);
    delete vnode.props["set:html"];
    Object.assign(vnode.props, { children });
    return;
  }
  if ("set:text" in vnode.props) {
    const children = vnode.props["set:text"];
    delete vnode.props["set:text"];
    Object.assign(vnode.props, { children });
    return;
  }
}
function createVNode(type, props) {
  const vnode = {
    [AstroJSX]: true,
    type,
    props: props ?? {}
  };
  transformSetDirectives(vnode);
  transformSlots(vnode);
  return vnode;
}

const ClientOnlyPlaceholder = "astro-client-only";
const skipAstroJSXCheck = /* @__PURE__ */new WeakSet();
let originalConsoleError;
let consoleFilterRefs = 0;

function renderJSX(_x, _x2) {
  return _renderJSX.apply(this, arguments);
}

function _renderJSX() {
  _renderJSX = _asyncToGenerator(function* (result, vnode) {
    switch (true) {
      case vnode instanceof HTMLString:
        if (vnode.toString().trim() === "") {
          return "";
        }

        return vnode;

      case typeof vnode === "string":
        return markHTMLString(escapeHTML(vnode));

      case !vnode && vnode !== 0:
        return "";

      case Array.isArray(vnode):
        return markHTMLString((yield Promise.all(vnode.map(v => renderJSX(result, v)))).join(""));
    }

    if (isVNode(vnode)) {
      switch (true) {
        case vnode.type === Symbol.for("astro:fragment"):
          return renderJSX(result, vnode.props.children);

        case vnode.type.isAstroComponentFactory:
          {
            let props = {};
            let slots = {};

            for (const [key, value] of Object.entries(vnode.props ?? {})) {
              if (key === "children" || value && typeof value === "object" && value["$$slot"]) {
                slots[key === "children" ? "default" : key] = () => renderJSX(result, value);
              } else {
                props[key] = value;
              }
            }

            return markHTMLString(yield renderToString(result, vnode.type, props, slots));
          }

        case !vnode.type && vnode.type !== 0:
          return "";

        case typeof vnode.type === "string" && vnode.type !== ClientOnlyPlaceholder:
          return markHTMLString(yield renderElement(result, vnode.type, vnode.props ?? {}));
      }

      if (vnode.type) {
        let extractSlots2 = function (child) {
          if (Array.isArray(child)) {
            return child.map(c => extractSlots2(c));
          }

          if (!isVNode(child)) {
            _slots.default.push(child);

            return;
          }

          if ("slot" in child.props) {
            _slots[child.props.slot] = [...(_slots[child.props.slot] ?? []), child];
            delete child.props.slot;
            return;
          }

          _slots.default.push(child);
        };

        if (typeof vnode.type === "function" && vnode.type["astro:renderer"]) {
          skipAstroJSXCheck.add(vnode.type);
        }

        if (typeof vnode.type === "function" && vnode.props["server:root"]) {
          const output2 = yield vnode.type(vnode.props ?? {});
          return yield renderJSX(result, output2);
        }

        if (typeof vnode.type === "function" && !skipAstroJSXCheck.has(vnode.type)) {
          useConsoleFilter();

          try {
            const output2 = yield vnode.type(vnode.props ?? {});

            if (output2 && output2[AstroJSX]) {
              return yield renderJSX(result, output2);
            } else if (!output2) {
              return yield renderJSX(result, output2);
            }
          } catch (e) {
            skipAstroJSXCheck.add(vnode.type);
          } finally {
            finishUsingConsoleFilter();
          }
        }

        const {
          children = null,
          ...props
        } = vnode.props ?? {};
        const _slots = {
          default: []
        };
        extractSlots2(children);

        for (const [key, value] of Object.entries(props)) {
          if (value["$$slot"]) {
            _slots[key] = value;
            delete props[key];
          }
        }

        const slotPromises = [];
        const slots = {};

        for (const [key, value] of Object.entries(_slots)) {
          slotPromises.push(renderJSX(result, value).then(output2 => {
            if (output2.toString().trim().length === 0) return;

            slots[key] = () => output2;
          }));
        }

        yield Promise.all(slotPromises);
        let output;

        if (vnode.type === ClientOnlyPlaceholder && vnode.props["client:only"]) {
          output = yield renderComponent(result, vnode.props["client:display-name"] ?? "", null, props, slots);
        } else {
          output = yield renderComponent(result, typeof vnode.type === "function" ? vnode.type.name : vnode.type, vnode.type, props, slots);
        }

        if (typeof output !== "string" && Symbol.asyncIterator in output) {
          let body = "";
          var _iteratorAbruptCompletion = false;
          var _didIteratorError = false;

          var _iteratorError;

          try {
            for (var _iterator = _asyncIterator(output), _step; _iteratorAbruptCompletion = !(_step = yield _iterator.next()).done; _iteratorAbruptCompletion = false) {
              const chunk = _step.value;
              let html = stringifyChunk(result, chunk);
              body += html;
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (_iteratorAbruptCompletion && _iterator.return != null) {
                yield _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          return markHTMLString(body);
        } else {
          return markHTMLString(output);
        }
      }
    }

    return markHTMLString(`${vnode}`);
  });
  return _renderJSX.apply(this, arguments);
}

function renderElement(_x3, _x4, _x5) {
  return _renderElement.apply(this, arguments);
}

function _renderElement() {
  _renderElement = _asyncToGenerator(function* (result, tag, {
    children,
    ...props
  }) {
    return markHTMLString(`<${tag}${spreadAttributes(props)}${markHTMLString((children == null || children == "") && voidElementNames.test(tag) ? `/>` : `>${children == null ? "" : yield renderJSX(result, children)}</${tag}>`)}`);
  });
  return _renderElement.apply(this, arguments);
}

function useConsoleFilter() {
  consoleFilterRefs++;

  if (!originalConsoleError) {
    originalConsoleError = console.error;

    try {
      console.error = filteredConsoleError;
    } catch (error) {}
  }
}

function finishUsingConsoleFilter() {
  consoleFilterRefs--;
}

function filteredConsoleError(msg, ...rest) {
  if (consoleFilterRefs > 0 && typeof msg === "string") {
    const isKnownReactHookError = msg.includes("Warning: Invalid hook call.") && msg.includes("https://reactjs.org/link/invalid-hook-call");
    if (isKnownReactHookError) return;
  }
}

const slotName = (str) => str.trim().replace(/[-_]([a-z])/g, (_, w) => w.toUpperCase());
async function check(Component, props, { default: children = null, ...slotted } = {}) {
  if (typeof Component !== "function")
    return false;
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  try {
    const result = await Component({ ...props, ...slots, children });
    return result[AstroJSX];
  } catch (e) {
  }
  return false;
}
async function renderToStaticMarkup(Component, props = {}, { default: children = null, ...slotted } = {}) {
  const slots = {};
  for (const [key, value] of Object.entries(slotted)) {
    const name = slotName(key);
    slots[name] = value;
  }
  const { result } = this;
  const html = await renderJSX(result, createVNode(Component, { ...props, ...slots, children }));
  return { html };
}
var server_default = {
  check,
  renderToStaticMarkup
};

const $$metadata$6 = createMetadata("/@fs/mnt/c/users/chadn/Documents/ASU/SER421/ser421-advanced-project/astro-site/src/layouts/BaseLayout.astro", { modules: [], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$6 = createAstro("/@fs/mnt/c/users/chadn/Documents/ASU/SER421/ser421-advanced-project/astro-site/src/layouts/BaseLayout.astro", "", "file:///mnt/c/users/chadn/Documents/ASU/SER421/ser421-advanced-project/astro-site/");
const $$BaseLayout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title } = Astro2.props;
  return renderTemplate`<html>
  <head>
    <title>${title}</title>
  ${renderHead($$result)}</head>
  <body class="font-[&quot;Comfortaa&quot;] text-md text-center bg-slate-800 text-slate-200 flex items-center flex-col">
    ${renderSlot($$result, $$slots["default"])}
  </body></html>`;
});

const $$file$6 = "/mnt/c/users/chadn/Documents/ASU/SER421/ser421-advanced-project/astro-site/src/layouts/BaseLayout.astro";
const $$url$6 = undefined;

const $$module1$3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    $$metadata: $$metadata$6,
    default: $$BaseLayout,
    file: $$file$6,
    url: $$url$6
}, Symbol.toStringTag, { value: 'Module' }));

const YoutubeEmbed = ({
  embedId
}) => /* @__PURE__ */ jsx("div", {
  className: "video-responsive",
  style: {
    overflow: "hidden",
    paddingBottom: "56.25%",
    position: "relative",
    height: 0
  },
  children: /* @__PURE__ */ jsx("iframe", {
    style: {
      left: 0,
      top: 0,
      height: "100%",
      width: "100%",
      position: "absolute"
    },
    width: "853",
    height: "480",
    src: `https://www.youtube.com/embed/${embedId}`,
    frameBorder: "0",
    allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
    allowFullScreen: true,
    title: "Embedded youtube"
  })
});
__astro_tag_component__(YoutubeEmbed, "@astrojs/react");

const $$module2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: YoutubeEmbed
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$5 = createMetadata("/@fs/mnt/c/users/chadn/Documents/ASU/SER421/ser421-advanced-project/astro-site/src/pages/index.astro", { modules: [{ module: $$module1$3, specifier: "../layouts/BaseLayout.astro", assert: {} }, { module: $$module2, specifier: "../components/YoutubeEmbed", assert: {} }], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$5 = createAstro("/@fs/mnt/c/users/chadn/Documents/ASU/SER421/ser421-advanced-project/astro-site/src/pages/index.astro", "", "file:///mnt/c/users/chadn/Documents/ASU/SER421/ser421-advanced-project/astro-site/");
const $$Index$5 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Index$5;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Writeup" }, { "default": () => renderTemplate`${maybeRenderHead($$result)}<h1 class="text-6xl m-10">Writeup</h1><section class="m-5 bg-slate-900/50 lg:w-9/12 w-full rounded-xl shadow-2xl shadow-slate-900 p-3">
    <h3 class="text-3xl text-slate-400 mb-4">Team Members</h3>
    <ul class="text-xl flex flex-row justify-evenly">
      <li>
        Isaiah Lathem
      </li>
      <li>
        Chad Oliver
      </li>
      <li>
        Eric Hunley
      </li>
      <li>
        John Kalafus
      </li>
    </ul>
    <h3 class="text-3xl text-slate-400 m-4">Topic</h3>
    <p class="text-xl">Comparison of Client-Side Frameworks</p>
  </section><section class="m-5 bg-slate-900/50 lg:w-1/3 w-full rounded-xl shadow-2xl shadow-slate-900 p-3">
    <h2 class="text-3xl text-slate-400 mb-3">Table of Contents</h2>
    <ul>
      <li class="text-slate-300 hover:text-slate-50 p-1"><a href="#learning_outcomes">Learning Outcomes</a></li>
      <li class="text-slate-300 hover:text-slate-50 p-1"><a href="#tutorial">Tutorial</a></li>
      <li class="text-slate-300 hover:text-slate-50 p-1"><a href="#history">History</a></li>
      <li class="text-slate-300 hover:text-slate-50 p-1"><a href="#analysis">Analysis</a></li>
      <li class="text-slate-300 hover:text-slate-50 p-1"><a href="#references">References</a></li>
    </ul>
  </section><section class="m-5 bg-slate-900/50 lg:w-11/12 w-full rounded-xl shadow-2xl shadow-slate-900 p-3">
    <h2 class="text-3xl text-slate-400" id="learning_outcomes">Learning Outcomes</h2>
    <h3 class="text-slate-400 text-xl hover:text-slate-50"><a href="https://github.com/ilathem/ser421-advanced-project" target="_blank">Repository</a></h3>
    <h3 class="text-slate-400 text-xl hover:text-slate-50"><a href="/demo">Demo</a></h3>
    <h3 class="text-slate-400 text-xl">Video Walkthrough of Demo</h3>
    <!-- <YoutubeEmbed client:load embedId='dQw4w9WgXcQ'/> -->
  </section><section class="m-5 bg-slate-900/50 lg:w-3/4 w-full rounded-xl shadow-2xl shadow-slate-900 p-2 flex flex-col items-center">
    <h2 class="text-3xl text-slate-400 m-4" id="tutorial">Tutorial</h2>
    <!-- <Tutorial /> -->
    <h3 class="text-lg text-slate-400">Preamble</h3>
    <p>For this tutorial, we will make multiple versions of the same app through Astro, utilizing various UI frameworks to draw comparisons.</p>
    <br>
    <h3 class="text-lg text-slate-400">1. Astro Installation and Setup</h3>
    <p class="m-1">Open a terminal in an empty directory and install astro with</p>
    <p class="bg-blue-900 px-2 py-1 m-1 rounded-lg max-w-fit ">npm create astro@latest</p>
    <p class="m-1">This will launch a wizard that will walk you through the project creation process:</p>
    <p class="m-1">For this tutorial, you can follow these steps in the wizard:</p>
    <ol class="list-inside list-decimal">
      <li class="m-1 text-left">Press <span class="text-orange-500">y</span> and enter to install the <span class="text-orange-500">create-astro@latest</span> package</li>
      <li class="m-1 text-left">Create the project in a new directory called <span class="text-orange-500">./astro-site</span></li>
      <li class="m-1 text-left">Select <span class="text-orange-500">yes</span> on installing npm dependencies</li>
      <li class="m-1 text-left">Select <span class="text-orange-500">Relaxed</span> for TypeScript</li>
    </ol>
    <p class="m-1">On success, you'll see a message: <span class="text-orange-500">Good luck out there, astronaut</span></p>
    <iframe width="480" height="270" src="https://www.youtube.com/embed/5oUPzqPQHIg" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> 
  </section><section class="m-5 bg-slate-900/50 lg:w-3/4 w-full rounded-xl shadow-2xl shadow-slate-900 p-2">
    <h2 class="text-3xl text-slate-400" id="history">History of Client-Side Frameworks</h2>
    
  </section><section class="m-5 bg-slate-900/50 lg:w-3/4 w-full rounded-xl shadow-2xl shadow-slate-900 p-2">
    <h2 class="text-3xl text-slate-400" id="analysis">Analysis</h2>
  </section><section class="m-5 bg-slate-900/50 lg:w-3/4 w-full rounded-xl shadow-2xl shadow-slate-900 flex flex-col items-center p-2">
    <h2 class="text-3xl text-slate-400" id="references">References</h2>
    <ol class="list-decimal list-outside text-center m-5 2xl:w-1/3 md:w-1/2 sm:w-2/3 w-3/4">
      <li class="m-2 hover:text-white"><a class="hover:underline" href="https://blog.logrocket.com/history-of-frontend-frameworks/" target="_blank">History of Frontend Frameworks</a></li>
      <li class="m-2 hover:text-white"><a class="hover:underline" href="https://www.youtube.com/watch?v=Kzeog8yTFaE" target="_blank">A Brief History of Frontend Frameworks</a></li>
      <li class="m-2 hover:text-white"><a class="hover:underline" href="https://www.pzuraq.com/blog/four-eras-of-javascript-framework" target="_blank">Four Eras of Javascript Frameworks</a></li>
    </ol>
  </section>` })}`;
});

const $$file$5 = "/mnt/c/users/chadn/Documents/ASU/SER421/ser421-advanced-project/astro-site/src/pages/index.astro";
const $$url$5 = "";

const _page0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    $$metadata: $$metadata$5,
    default: $$Index$5,
    file: $$file$5,
    url: $$url$5
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$4 = createMetadata("/@fs/mnt/c/users/chadn/Documents/ASU/SER421/ser421-advanced-project/astro-site/src/pages/demo/index.astro", { modules: [], hydratedComponents: [], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set([]), hoisted: [] });
const $$Astro$4 = createAstro("/@fs/mnt/c/users/chadn/Documents/ASU/SER421/ser421-advanced-project/astro-site/src/pages/demo/index.astro", "", "file:///mnt/c/users/chadn/Documents/ASU/SER421/ser421-advanced-project/astro-site/");
const $$Index$4 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Index$4;
  return renderTemplate`${maybeRenderHead($$result)}<a href="/">Back to home</a>
<h1>Index of demo!</h1>
<a href="/demo/react">React Demo</a> | 
<a href="/demo/svelte">Svelte Demo</a> | 
<a href="/demo/vue">Vue Demo</a> |
<a href="/demo/angular">Angular Demo</a>`;
});

const $$file$4 = "/mnt/c/users/chadn/Documents/ASU/SER421/ser421-advanced-project/astro-site/src/pages/demo/index.astro";
const $$url$4 = "/demo";

const _page1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    $$metadata: $$metadata$4,
    default: $$Index$4,
    file: $$file$4,
    url: $$url$4
}, Symbol.toStringTag, { value: 'Module' }));

function TodoComponent_p_2_Template(rf, ctx) { if (rf & 1) {
    i0.ɵɵelementStart(0, "p");
    i0.ɵɵtext(1);
    i0.ɵɵelementEnd();
} if (rf & 2) {
    const ctx_r0 = i0.ɵɵnextContext();
    i0.ɵɵadvance(1);
    i0.ɵɵtextInterpolate(ctx_r0.todoText);
} }
class TodoComponent {
    constructor() {
        this.todoText = 'Just do it';
        this.show = false;
    }
    toggle() {
        this.show = !this.show;
    }
}
TodoComponent.ɵfac = function TodoComponent_Factory(t) { return new (t || TodoComponent)(); };
TodoComponent.ɵcmp = /*@__PURE__*/ i0.ɵɵdefineComponent({ type: TodoComponent, selectors: [["app-todo"]], inputs: { todoText: "todoText" }, standalone: true, features: [i0.ɵɵStandaloneFeature], decls: 5, vars: 1, consts: [[4, "ngIf"], [3, "click"]], template: function TodoComponent_Template(rf, ctx) { if (rf & 1) {
        i0.ɵɵelementStart(0, "p");
        i0.ɵɵtext(1, "This is my list of things");
        i0.ɵɵelementEnd();
        i0.ɵɵtemplate(2, TodoComponent_p_2_Template, 2, 1, "p", 0);
        i0.ɵɵelementStart(3, "button", 1);
        i0.ɵɵlistener("click", function TodoComponent_Template_button_click_3_listener() { return ctx.toggle(); });
        i0.ɵɵtext(4, "Toggle");
        i0.ɵɵelementEnd();
    } if (rf & 2) {
        i0.ɵɵadvance(2);
        i0.ɵɵproperty("ngIf", ctx.show);
    } }, dependencies: [NgIf], encapsulation: 2 });
(function () { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(TodoComponent, [{
        type: Component,
        args: [{
                selector: 'app-todo',
                standalone: true,
                imports: [NgIf],
                template: `
    <p>This is my list of things</p>

    <p *ngIf="show">{{todoText}}</p>

    <button (click)="toggle()">Toggle</button>
  `,
            }]
    }], null, { todoText: [{
            type: Input
        }] }); })();

const _page3 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    TodoComponent
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$3 = createMetadata("/@fs/mnt/c/users/chadn/Documents/ASU/SER421/ser421-advanced-project/astro-site/src/pages/demo/angular/index.astro", { modules: [{ module: _page3, specifier: "./angular-demo", assert: {} }], hydratedComponents: [TodoComponent, TodoComponent, TodoComponent], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["visible"]), hoisted: [] });
const $$Astro$3 = createAstro("/@fs/mnt/c/users/chadn/Documents/ASU/SER421/ser421-advanced-project/astro-site/src/pages/demo/angular/index.astro", "", "file:///mnt/c/users/chadn/Documents/ASU/SER421/ser421-advanced-project/astro-site/");
const $$Index$3 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Index$3;
  const todoText = "I need to do something";
  return renderTemplate`${renderComponent($$result, "TodoComponent", TodoComponent, { "client:visible": true, "client:component-hydration": "visible", "client:component-path": "/@fs/mnt/c/users/chadn/Documents/ASU/SER421/ser421-advanced-project/astro-site/src/pages/demo/angular/angular-demo", "client:component-export": "TodoComponent" })}
${renderComponent($$result, "TodoComponent", TodoComponent, { "client:visible": true, "todoText": "I don't want to do anything", "client:component-hydration": "visible", "client:component-path": "/@fs/mnt/c/users/chadn/Documents/ASU/SER421/ser421-advanced-project/astro-site/src/pages/demo/angular/angular-demo", "client:component-export": "TodoComponent" })}
${renderComponent($$result, "TodoComponent", TodoComponent, { "client:visible": true, "todoText": todoText, "client:component-hydration": "visible", "client:component-path": "/@fs/mnt/c/users/chadn/Documents/ASU/SER421/ser421-advanced-project/astro-site/src/pages/demo/angular/angular-demo", "client:component-export": "TodoComponent" })}`;
});

const $$file$3 = "/mnt/c/users/chadn/Documents/ASU/SER421/ser421-advanced-project/astro-site/src/pages/demo/angular/index.astro";
const $$url$3 = "/demo/angular";

const _page2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    $$metadata: $$metadata$3,
    default: $$Index$3,
    file: $$file$3,
    url: $$url$3
}, Symbol.toStringTag, { value: 'Module' }));

function run(fn) {
    return fn();
}
function blank_object() {
    return Object.create(null);
}
function run_all(fns) {
    fns.forEach(run);
}

let current_component;
function set_current_component(component) {
    current_component = component;
}
Promise.resolve();
let on_destroy;
function create_ssr_component(fn) {
    function $$render(result, props, bindings, slots, context) {
        const parent_component = current_component;
        const $$ = {
            on_destroy,
            context: new Map(context || (parent_component ? parent_component.$$.context : [])),
            // these will be immediately discarded
            on_mount: [],
            before_update: [],
            after_update: [],
            callbacks: blank_object()
        };
        set_current_component({ $$ });
        const html = fn(result, props, bindings, slots);
        set_current_component(parent_component);
        return html;
    }
    return {
        render: (props = {}, { $$slots = {}, context = new Map() } = {}) => {
            on_destroy = [];
            const result = { title: '', head: '', css: new Set() };
            const html = $$render(result, props, {}, $$slots, context);
            run_all(on_destroy);
            return {
                html,
                css: {
                    code: Array.from(result.css).map(css => css.code).join('\n'),
                    map: null // TODO
                },
                head: result.title + result.head
            };
        },
        $$render
    };
}

/* src/pages/demo/svelte/svelte-demo.svelte generated by Svelte v3.50.1 */

const css = {
	code: "body.svelte-12bsmte{background-color:#F0FFFF}table.svelte-12bsmte,td.svelte-12bsmte{border:1px solid black;text-align:center}.toprow.svelte-12bsmte{background-color:#5F9EA0}.itemrow.svelte-12bsmte{background-color:#00FFFF}.newtask.svelte-12bsmte{background-color:#A9A9A9;border-radius:8px;border-style:none;box-sizing:border-box;color:#FFFFFF;cursor:pointer;display:inline-block;font-family:\"Haas Grot Text R Web\", \"Helvetica Neue\", Helvetica, Arial, sans-serif;font-size:14px;font-weight:500;height:40px;line-height:20px;list-style:none;outline:none;padding:10px 16px;position:relative;text-align:center;text-decoration:none;transition:color 100ms;vertical-align:baseline;-moz-user-select:none;user-select:none;-webkit-user-select:none;touch-action:manipulation;margin:0;position:absolute;left:50%;transform:translateX(-50%)}.newtask.svelte-12bsmte:hover,.newtask.svelte-12bsmte:focus{background-color:#F082AC}",
	map: null
};

const Svelte_demo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
	$$result.css.add(css);

	return `




  

<section><body class="${"svelte-12bsmte"}"><h1 style="${"text-align:center;"}">To-Do! Application</h1>
        <div style="${"text-align:center;"}">A demonstration of four Javascript client-side frameworks. This is Svelte.</div>
        <br>
        <button id="${"newtask"}" class="${"newtask svelte-12bsmte"}" value="${"2"}">New Task</button>
        <br><br><br>

        <table style="${"width:100%"}" class="${"svelte-12bsmte"}"><tr id="${"r1"}" class="${"toprow svelte-12bsmte"}"><td id="${"r1c1"}" height="${"50px"}" width="${"33.33%"}" class="${"svelte-12bsmte"}"><b>Task</b></td>
                <td id="${"r1c2"}" height="${"50px"}" width="${"33.33%"}" class="${"svelte-12bsmte"}"><b>Due Date</b></td>
                <td id="${"r1c3"}" height="${"50px"}" width="${"33.33%"}" class="${"svelte-12bsmte"}"><b>Progress</b></td></tr>
            <tr id="${"r2"}" class="${"itemrow svelte-12bsmte"}"><td id="${"r2c1"}" height="${"50px"}" width="${"33.33%"}" class="${"svelte-12bsmte"}"></td>
                <td id="${"r2c2"}" height="${"50px"}" width="${"33.33%"}" class="${"svelte-12bsmte"}"></td>
                <td id="${"r2c3"}" height="${"50px"}" width="${"33.33%"}" class="${"svelte-12bsmte"}"></td></tr>
            <tr id="${"r3"}" class="${"itemrow svelte-12bsmte"}"><td id="${"r3c1"}" height="${"50px"}" width="${"33.33%"}" class="${"svelte-12bsmte"}"></td>
                <td id="${"r3c2"}" height="${"50px"}" width="${"33.33%"}" class="${"svelte-12bsmte"}"></td>
                <td id="${"r3c3"}" height="${"50px"}" width="${"33.33%"}" class="${"svelte-12bsmte"}"></td></tr>
            <tr id="${"r4"}" class="${"itemrow svelte-12bsmte"}"><td id="${"r4c1"}" height="${"50px"}" width="${"33.33%"}" class="${"svelte-12bsmte"}"></td>
                <td id="${"r4c2"}" height="${"50px"}" width="${"33.33%"}" class="${"svelte-12bsmte"}"></td>
                <td id="${"r4c3"}" height="${"50px"}" width="${"33.33%"}" class="${"svelte-12bsmte"}"></td></tr>
            <tr id="${"r5"}" class="${"itemrow svelte-12bsmte"}"><td id="${"r5c1"}" height="${"50px"}" width="${"33.33%"}" class="${"svelte-12bsmte"}"></td>
                <td id="${"r5c2"}" height="${"50px"}" width="${"33.33%"}" class="${"svelte-12bsmte"}"></td>
                <td id="${"r5c3"}" height="${"50px"}" width="${"33.33%"}" class="${"svelte-12bsmte"}"></td></tr>
            <tr id="${"r6"}" class="${"itemrow svelte-12bsmte"}"><td id="${"r6c1"}" height="${"50px"}" width="${"33.33%"}" class="${"svelte-12bsmte"}"></td>
                <td id="${"r6c2"}" height="${"50px"}" width="${"33.33%"}" class="${"svelte-12bsmte"}"></td>
                <td id="${"r6c3"}" height="${"50px"}" width="${"33.33%"}" class="${"svelte-12bsmte"}"></td></tr>
            <tr id="${"r7"}" class="${"itemrow svelte-12bsmte"}"><td id="${"r7c1"}" height="${"50px"}" width="${"33.33%"}" class="${"svelte-12bsmte"}"></td>
                <td id="${"r7c2"}" height="${"50px"}" width="${"33.33%"}" class="${"svelte-12bsmte"}"></td>
                <td id="${"r7c3"}" height="${"50px"}" width="${"33.33%"}" class="${"svelte-12bsmte"}"></td></tr>
            <tr id="${"r8"}" class="${"itemrow svelte-12bsmte"}"><td id="${"r8c1"}" height="${"50px"}" width="${"33.33%"}" class="${"svelte-12bsmte"}"></td>
                <td id="${"r8c2"}" height="${"50px"}" width="${"33.33%"}" class="${"svelte-12bsmte"}"></td>
                <td id="${"r8c3"}" height="${"50px"}" width="${"33.33%"}" class="${"svelte-12bsmte"}"></td></tr></table></body></section>

`;
});

const $$module1$2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: Svelte_demo
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$2 = createMetadata("/@fs/mnt/c/users/chadn/Documents/ASU/SER421/ser421-advanced-project/astro-site/src/pages/demo/svelte/index.astro", { modules: [{ module: $$module1$2, specifier: "./svelte-demo.svelte", assert: {} }], hydratedComponents: [Svelte_demo], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["load"]), hoisted: [] });
const $$Astro$2 = createAstro("/@fs/mnt/c/users/chadn/Documents/ASU/SER421/ser421-advanced-project/astro-site/src/pages/demo/svelte/index.astro", "", "file:///mnt/c/users/chadn/Documents/ASU/SER421/ser421-advanced-project/astro-site/");
const $$Index$2 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Index$2;
  return renderTemplate`${maybeRenderHead($$result)}<a href="/demo">Back to /demo</a>
${renderComponent($$result, "SvelteDemo", Svelte_demo, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/@fs/mnt/c/users/chadn/Documents/ASU/SER421/ser421-advanced-project/astro-site/src/pages/demo/svelte/svelte-demo.svelte", "client:component-export": "default" })}`;
});

const $$file$2 = "/mnt/c/users/chadn/Documents/ASU/SER421/ser421-advanced-project/astro-site/src/pages/demo/svelte/index.astro";
const $$url$2 = "/demo/svelte";

const _page4 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    $$metadata: $$metadata$2,
    default: $$Index$2,
    file: $$file$2,
    url: $$url$2
}, Symbol.toStringTag, { value: 'Module' }));

function ReactDemo() {
  const [counter, setCounter] = useState(0);
  return /* @__PURE__ */ jsxs(Fragment$1, {
    children: [/* @__PURE__ */ jsx("h1", {
      children: "Hello from react"
    }), /* @__PURE__ */ jsx("p", {
      children: counter
    }), /* @__PURE__ */ jsx("button", {
      onClick: () => setCounter(counter + 1),
      children: "Increment"
    })]
  });
}
__astro_tag_component__(ReactDemo, "@astrojs/react");

const $$module1$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: ReactDemo
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata$1 = createMetadata("/@fs/mnt/c/users/chadn/Documents/ASU/SER421/ser421-advanced-project/astro-site/src/pages/demo/react/index.astro", { modules: [{ module: $$module1$1, specifier: "./react-demo", assert: {} }], hydratedComponents: [ReactDemo], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["load"]), hoisted: [] });
const $$Astro$1 = createAstro("/@fs/mnt/c/users/chadn/Documents/ASU/SER421/ser421-advanced-project/astro-site/src/pages/demo/react/index.astro", "", "file:///mnt/c/users/chadn/Documents/ASU/SER421/ser421-advanced-project/astro-site/");
const $$Index$1 = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Index$1;
  return renderTemplate`${maybeRenderHead($$result)}<a href="/demo">Back to /demo</a>
${renderComponent($$result, "ReactDemo", ReactDemo, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/@fs/mnt/c/users/chadn/Documents/ASU/SER421/ser421-advanced-project/astro-site/src/pages/demo/react/react-demo", "client:component-export": "default" })}`;
});

const $$file$1 = "/mnt/c/users/chadn/Documents/ASU/SER421/ser421-advanced-project/astro-site/src/pages/demo/react/index.astro";
const $$url$1 = "/demo/react";

const _page5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    $$metadata: $$metadata$1,
    default: $$Index$1,
    file: $$file$1,
    url: $$url$1
}, Symbol.toStringTag, { value: 'Module' }));

const _sfc_main = {
    data() {
      return {
        counter: 0
      }
    }
  };

const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};

function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<!--[--><h1>Hello from vue</h1><p>${ssrInterpolate(_ctx.counter)}</p><button>Increment</button><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext()
  ;(ssrContext.modules || (ssrContext.modules = new Set())).add("src/pages/demo/vue/vue-demo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined
};
const Vue = /*#__PURE__*/_export_sfc(_sfc_main, [['ssrRender',_sfc_ssrRender]]);

const $$module1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: Vue
}, Symbol.toStringTag, { value: 'Module' }));

const $$metadata = createMetadata("/@fs/mnt/c/users/chadn/Documents/ASU/SER421/ser421-advanced-project/astro-site/src/pages/demo/vue/index.astro", { modules: [{ module: $$module1, specifier: "./vue-demo.vue", assert: {} }], hydratedComponents: [Vue], clientOnlyComponents: [], hydrationDirectives: /* @__PURE__ */ new Set(["load"]), hoisted: [] });
const $$Astro = createAstro("/@fs/mnt/c/users/chadn/Documents/ASU/SER421/ser421-advanced-project/astro-site/src/pages/demo/vue/index.astro", "", "file:///mnt/c/users/chadn/Documents/ASU/SER421/ser421-advanced-project/astro-site/");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${maybeRenderHead($$result)}<a href="/demo">Back to /demo</a>
${renderComponent($$result, "Vue", Vue, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/@fs/mnt/c/users/chadn/Documents/ASU/SER421/ser421-advanced-project/astro-site/src/pages/demo/vue/vue-demo.vue", "client:component-export": "default" })}`;
});

const $$file = "/mnt/c/users/chadn/Documents/ASU/SER421/ser421-advanced-project/astro-site/src/pages/demo/vue/index.astro";
const $$url = "/demo/vue";

const _page6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    $$metadata,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const pageMap = new Map([['src/pages/index.astro', _page0],['src/pages/demo/index.astro', _page1],['src/pages/demo/angular/index.astro', _page2],['src/pages/demo/angular/angular-demo.ts', _page3],['src/pages/demo/svelte/index.astro', _page4],['src/pages/demo/react/index.astro', _page5],['src/pages/demo/vue/index.astro', _page6],]);
const renderers = [Object.assign({"name":"astro:jsx","serverEntrypoint":"astro/jsx/server.js","jsxImportSource":"astro"}, { ssr: server_default }),Object.assign({"name":"@astrojs/react","clientEntrypoint":"@astrojs/react/client.js","serverEntrypoint":"@astrojs/react/server.js","jsxImportSource":"react"}, { ssr: _renderer1 }),Object.assign({"name":"@astrojs/vue","clientEntrypoint":"@astrojs/vue/client.js","serverEntrypoint":"@astrojs/vue/server.js"}, { ssr: _renderer2 }),Object.assign({"name":"@astrojs/svelte","clientEntrypoint":"@astrojs/svelte/client.js","serverEntrypoint":"@astrojs/svelte/server.js"}, { ssr: _renderer3 }),Object.assign({"name":"@analogjs/astro-angular","clientEntrypoint":"@analogjs/astro-angular/client.js","serverEntrypoint":"@analogjs/astro-angular/server.js"}, { ssr: _renderer4 }),];

if (typeof process !== "undefined") {
  if (process.argv.includes("--verbose")) ; else if (process.argv.includes("--silent")) ; else ;
}

const SCRIPT_EXTENSIONS = /* @__PURE__ */ new Set([".js", ".ts"]);
new RegExp(
  `\\.(${Array.from(SCRIPT_EXTENSIONS).map((s) => s.slice(1)).join("|")})($|\\?)`
);

const STYLE_EXTENSIONS = /* @__PURE__ */ new Set([
  ".css",
  ".pcss",
  ".postcss",
  ".scss",
  ".sass",
  ".styl",
  ".stylus",
  ".less"
]);
new RegExp(
  `\\.(${Array.from(STYLE_EXTENSIONS).map((s) => s.slice(1)).join("|")})($|\\?)`
);

function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return segment[0].spread ? `/:${segment[0].content.slice(3)}(.*)?` : "/" + segment.map((part) => {
      if (part)
        return part.dynamic ? `:${part.content}` : part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return toPath;
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  return {
    ...serializedManifest,
    assets,
    routes
  };
}

const _manifest = Object.assign(deserializeManifest({"adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":["assets/index.75000f23.css"],"scripts":[],"routeData":{"route":"/","type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"routeData":{"route":"/demo","type":"page","pattern":"^\\/demo\\/?$","segments":[[{"content":"demo","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/demo/index.astro","pathname":"/demo","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"routeData":{"route":"/demo/angular","type":"page","pattern":"^\\/demo\\/angular\\/?$","segments":[[{"content":"demo","dynamic":false,"spread":false}],[{"content":"angular","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/demo/angular/index.astro","pathname":"/demo/angular","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"routeData":{"route":"/demo/angular/angular-demo","type":"endpoint","pattern":"^\\/demo\\/angular\\/angular-demo$","segments":[[{"content":"demo","dynamic":false,"spread":false}],[{"content":"angular","dynamic":false,"spread":false}],[{"content":"angular-demo","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/demo/angular/angular-demo.ts","pathname":"/demo/angular/angular-demo","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":["assets/demo-svelte-index.dfbb252b.css"],"scripts":[],"routeData":{"route":"/demo/svelte","type":"page","pattern":"^\\/demo\\/svelte\\/?$","segments":[[{"content":"demo","dynamic":false,"spread":false}],[{"content":"svelte","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/demo/svelte/index.astro","pathname":"/demo/svelte","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"routeData":{"route":"/demo/react","type":"page","pattern":"^\\/demo\\/react\\/?$","segments":[[{"content":"demo","dynamic":false,"spread":false}],[{"content":"react","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/demo/react/index.astro","pathname":"/demo/react","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"routeData":{"route":"/demo/vue","type":"page","pattern":"^\\/demo\\/vue\\/?$","segments":[[{"content":"demo","dynamic":false,"spread":false}],[{"content":"vue","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/demo/vue/index.astro","pathname":"/demo/vue","_meta":{"trailingSlash":"ignore"}}}],"base":"/","markdown":{"drafts":false,"syntaxHighlight":"shiki","shikiConfig":{"langs":[],"theme":"github-dark","wrap":false},"remarkPlugins":[],"rehypePlugins":[],"isAstroFlavoredMd":false},"pageMap":null,"renderers":[],"entryModules":{"\u0000@astrojs-ssr-virtual-entry":"entry.js","/@fs/mnt/c/users/chadn/Documents/ASU/SER421/ser421-advanced-project/astro-site/src/pages/demo/angular/angular-demo":"angular-demo.ff33eeb6.js","/@fs/mnt/c/users/chadn/Documents/ASU/SER421/ser421-advanced-project/astro-site/src/pages/demo/svelte/svelte-demo.svelte":"svelte-demo.8483b607.js","/@fs/mnt/c/users/chadn/Documents/ASU/SER421/ser421-advanced-project/astro-site/src/pages/demo/react/react-demo":"react-demo.b05ba6f5.js","/@fs/mnt/c/users/chadn/Documents/ASU/SER421/ser421-advanced-project/astro-site/src/pages/demo/vue/vue-demo.vue":"vue-demo.7a52d817.js","@astrojs/react/client.js":"client.36d348ec.js","@astrojs/vue/client.js":"client.73420fda.js","@astrojs/svelte/client.js":"client.b27523fa.js","@analogjs/astro-angular/client.js":"client.64f09c8b.js","astro:scripts/before-hydration.js":"data:text/javascript;charset=utf-8,//[no before-hydration script]"},"assets":["/assets/demo-svelte-index.dfbb252b.css","/assets/index.75000f23.css","/angular-demo.ff33eeb6.js","/client.36d348ec.js","/client.64f09c8b.js","/client.73420fda.js","/client.b27523fa.js","/favicon.svg","/react-demo.b05ba6f5.js","/svelte-demo.8483b607.js","/vue-demo.7a52d817.js","/assets/svelte-demo.b541c27e.css","/chunks/common.63b7a1ed.js","/chunks/index.b980b800.js","/chunks/runtime-core.esm-bundler.7d7316c5.js"]}), {
	pageMap: pageMap,
	renderers: renderers
});
const _args = undefined;

const _exports = adapter.createExports(_manifest, _args);
const _default = _exports['default'];

const _start = 'start';
if(_start in adapter) {
	adapter[_start](_manifest, _args);
}

export { _default as default };
