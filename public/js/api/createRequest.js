/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
	const xhr = new XMLHttpRequest(); 
	formData = new FormData;
	if(options.method == 'POST') {
		xhr.open( 'POST', '' );
		xhr.responseType = json; 
		xhr.withCredentials = true;
		formData.append( 'mail', `${options.data.mail}` );
		formData.append( 'password', `${options.data.password}`);
		xhr.send( formData );
	} else if(options.method == 'GET') {
		xhr.open( 'GET', `${options.url}?mail=${options.data.mail}&password=${options.data.password}`);
		xhr.send();
	}
	
	xhr.onload = function() {
		options.callback(null, xhr.response);
	}
	xhr.onerror = function() {
		options.callback(err, null);
	}
	
};
