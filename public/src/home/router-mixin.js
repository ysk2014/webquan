define([
	'react',
	'jquery',
	],function(React, $) {


	var PropValidation = {
	    path: React.PropTypes.string,
	    root: React.PropTypes.string,
	    useHistory: React.PropTypes.bool
	};

	var RouterMixin = {
	    getDefaultProps: function() {
	        return {
	            routes: {}
	        };
	    },
	    getInitialState: function() {
	        return {
	            path: getInitialPath(this),
	            root: this.props.root || '',
	            useHistory: window.history && 'pushState' in window.history
	        };
	    },
	   	componentWillMount: function() {
	        this.setState({ _routes: processRoutes(this.state.root, this.routes, this) });
	    },
	    componentDidMount: function() {
	    	if(window.addEventListener) {
	    		this.getDOMNode().addEventListener('click',this.handleClick,false);
	    	} else {
	    		this.getDOMNode().attachEvent('onClick',this.handleClick);
	    	}

	    	if(this.state.useHistory) {
	    		window.onpopstate = this.onPopState;
	    	} else {
	    		window.onhaschenge = this.onPopState;
	    	}
	    },
	    componentWillUnmount: function() {

	    },
	    onPopState: function() {
	        var url = urllite(window.location.href),
	            hash = url.hash || '',
	            path = this.state.useHistory ? url.path : hash.slice(2);

	        if (path.length === 0) path = '/';

	        this.setState({ path: path + url.query });
	    },
	    renderCurrentRoute: function() {
	    	var path = this.state.path,
            url = urllite(path);

	        var parsedPath = url.path;

	        if (!parsedPath || parsedPath.length === 0) parsedPath = '/';

	        var matchedRoute = this.matchRoute(parsedPath);

	        if (matchedRoute) {
	        	if(matchedRoute.params) {
	        		return matchedRoute.handler.apply(this, matchedRoute.params);
	        	} else {
	        		return matchedRoute.handler();
	        	}
	        } else if (this.notFound) {
	            return this.notFound(parsedPath);
	        } else {
	            throw new Error('No route matched path: ' + parsedPath);
	        }
	    },
	    handleClick: function(evt) {
	    	var self = this,
	    		url = getHref(evt);

	    	if (url && self.matchRoute(url.path)) {
	    		if(evt.preventDefault) {
	                evt.preventDefault();
	            } else {
	                evt.returnValue = false;
	            }

	            setTimeout(function() {
	            	var pathWithSearch = url.path + (url.search || '');
	                if (pathWithSearch.length === 0) pathWithSearch = '/';

	                if (self.state.useHistory) {
	                    window.history.pushState({}, '', pathWithSearch);
	                } else {
	                    window.location.hash = '!' + pathWithSearch;
	                }

	                self.setState({ path: pathWithSearch});
	            },0)
	    	}
	    },
	    matchRoute: function(path) {

	    	if(!path) return false;

	    	var matchedRoute = {};

			this.state._routes.some(function(route) {

				var matches = route.pattern.exec(path);

	            if (matches) {
	                matchedRoute.handler = route.handler;
	                matchedRoute.params = matches.slice(1, route.params.length + 1);

	                return true;
	            }
	            
	            return false;
	        });
        	return matchedRoute.handler ? matchedRoute : false;
	    },
	};

	/**
	 * Normalize the given path string,
	 * returning a regular expression.
	 *
	 * An empty array should be passed,
	 * which will contain the placeholder
	 * key names. For example "/user/:id" will
	 * then contain ["id"].
	 *
	 * @param  {String} path
	 * @param  {Array} keys
	 * @return {RegExp}
	 */
	var pathToRegExp = function (path, keys) {
		path = path
			.concat('/?')
			.replace(/\/\(/g, '(?:/')
			.replace(/(\/)?(\.)?:(\w+)(?:(\(.*?\)))?(\?)?|\*/g, function(_, slash, format, key, capture, optional){
				if (_ === "*"){
					keys.push(undefined);
					return _;
				}

				keys.push(key);
				slash = slash || '';
				return ''
					+ (optional ? '' : slash)
					+ '(?:'
					+ (optional ? slash : '')
					+ (format || '') + (capture || '([^/]+?)') + ')'
					+ (optional || '');
			})
			.replace(/([\/.])/g, '\\$1')
			.replace(/\*/g, '(.*)');
		return new RegExp('^' + path + '$', 'i');
	}


	function getInitialPath(component) {
	    
	    url = urllite(window.location.href);

	    var path = url.path;

	    return path || '/';
	}

	function getHref(evt) {

		evt = evt || window.event || e;

		if (evt.defaultPrevented) return;

		if(evt.preventDefault) {
			evt.preventDefault();
		} else {
			evt.returnValue = false;
		}
	    
	    //如果有meta键、ctrl键、shift键按下，返回
	    if (evt.metaKey || evt.ctrlKey || evt.shiftKey) return;
	        
	    // 不是点击鼠标左键，返回
	    if (evt.button !== 0) return;

	    var elt = evt.target || evt.srcElement;

	    while (elt && elt.nodeName !== 'A') {
	        elt = elt.parentNode;
	    }

	    if (!elt) return;

	    if (elt.target && elt.target !== '_self') return;

	    if (!!elt.attributes.download) return;
	        
	    var linkURL = urllite(elt.href);
    	var windowURL = urllite(window.location.href);

    	if (linkURL.protocol !== windowURL.protocol || linkURL.host !== windowURL.host) return;
	    
    	return linkURL;
	}

	function processRoutes(root, routes, component) {
	    var patterns = [],
	        path, pattern, handler, handlerFn;

	    for (path in routes) {
	        if (routes.hasOwnProperty(path)) {
	            keys = [];

	            pattern = pathToRegExp(root + path, keys);
	            handler = routes[path];
	            handlerFn = component[handler];

	            patterns.push({ pattern: pattern, params: keys, handler: handlerFn });
	        }
	    }
	    return patterns;
	}

	function urllite(url) {
		var a =  document.createElement('a');  
		a.href = url; 
		return {  
			 source: url,  
			 protocol: a.protocol.replace(':',''),  
			 host: a.hostname,  
			 port: a.port,  
			 query: a.search,
			 params: (function(){  
			     var ret = {},  
			         seg = a.search.replace(/^\?/,'').split('&'),  
			         len = seg.length, i = 0, s;  
			     for (;i<len;i++) {  
			         if (!seg[i]) { continue; }  
			         s = seg[i].split('=');  
			         ret[s[0]] = s[1];  
			     }  
			     return ret;  
			 })(),  
			 file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],  
			 hash: a.hash.replace('#',''),  
			 path: a.pathname.replace(/^([^\/])/,'/$1'),  
			 relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],  
			 segments: a.pathname.replace(/^\//,'').split('/') 
		}
	}


	return RouterMixin;

});