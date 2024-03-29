function stringify_object(object, depth=0, max_depth=2) {
	// change max_depth to see more levels, for a touch event, 2 is good
	if (depth > max_depth) {
		return 'Object';
	}
	if (object instanceof Node) {
		// specify which properties you want to see from the node
		return {id: object.id};
	} else if (object instanceof Window) {
			return 'Window';
	} else if (object instanceof Array) {
		const arr = [];
		for (let i = 0; i < object.length; i++) {
			arr[i] = stringify_object(object[i], depth+1, max_depth);
		}
		return arr;
	} else if (object instanceof String) {
		return object;
	} else if (object instanceof Object) {
		const obj = {};
		for (let key in object) {
			obj[key] = stringify_object(object[key], depth+1, max_depth);
		}
		return obj;
	} else {
		return object;
	}
}

const urlParams = new URLSearchParams(window.location.search);

if (urlParams.has('console')) {
	let console = (function (oldConsole) {
		return {
			log: function (...data) {
				oldConsole.log(...data);
				window.localStorage.setItem('cptkappa:console', window.localStorage.getItem('cptkappa:console') + '`<log>' + JSON.stringify(stringify_object(data, 0, 4).reduce((p,c) => p + ", " + c)));
			},
			info: function (...data) {
				oldConsole.info(...data);
				window.localStorage.setItem('cptkappa:console', window.localStorage.getItem('cptkappa:console') + '`<info>' + JSON.stringify(stringify_object(data, 0, 4).reduce((p,c) => p + ", " + c)));
			},
			warn: function (...data) {
				oldConsole.warn(...data);
				window.localStorage.setItem('cptkappa:console', window.localStorage.getItem('cptkappa:console') + '`<warn>' + JSON.stringify(stringify_object(data, 0, 4).reduce((p,c) => p + ", " + c)));
			},
			error: function (...data) {
				oldConsole.error(...data);
				window.localStorage.setItem('cptkappa:console', window.localStorage.getItem('cptkappa:console') + '`<error>' + JSON.stringify(stringify_object(data, 0, 4).reduce((p,c) => p + ", " + c)));
			}
		}
	})(window.console);

	window.console = console;

	window.onerror = console.error;
}