/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

const createRequest = (options = {}) => {
	const xhr = new XMLHttpRequest(); 
	xhr.responseType = options.responseType; 
	xhr.withCredentials = true;
	formData = new FormData;
	if(options.method == 'POST') {
		formData.append( 'mail', `${options.data.mail}` );
		formData.append( 'password', `${options.data.password}`);
		try {
			xhr.open( 'POST', `${options.url}` );
			xhr.send( formData );
		}
		catch(e) {
			options.callback(e);
			console.log(e);
		}
	} else if(options.method == 'GET') {
		try {
			xhr.open( 'GET', `${options.url}?mail=${options.data.mail}&password=${options.data.password}`);
			xhr.send();
		} catch(e) {
			options.callback(e);
			console.log(e);
		}
	}
	
	xhr.onload = function() {
		options.callback(null, xhr.response);
	}
	xhr.onerror = function() {
		options.callback(err, null);
	}
	
};




