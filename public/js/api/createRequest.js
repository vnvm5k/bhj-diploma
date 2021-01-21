/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
	const xhr = new XMLHttpRequest; 
	formData = new FormData;
	try {
		if(options.method == 'POST') {
			xhr.open( 'POST', '' );
			xhr.responseType = json; 
			xhr.withCredentials = true;
			xhr.send( formData );
		} else if(options.method == 'GET') {
			xhr.open( 'GET', '' );
			xhr.send();
		}
	}
	catch (e) {
		callback(e); 
	}
	 callback: ( err, response ) => {
      console.log( err ); 
      console.log( response )
    }
};
