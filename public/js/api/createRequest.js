/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
	const xhr = new XMLHttpRequest(); 
	formData = new FormData;
	try {
		if(options.method == 'POST') {
			xhr.open( 'POST', 'http://localhost:8000' );
			xhr.responseType = json; 
			xhr.withCredentials = true;
			xhr.send( formData );
		} else if(options.method == 'GET') {
			xhr.open( 'GET', 'http://localhost:8000' );
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
