/**
 * Основная функция для совершения запросов
 * на сервер.
 * */

const createRequest = (options = {}) => {
	const xhr = new XMLHttpRequest(); 
	xhr.responseType = options.responseType; 
	xhr.withCredentials = true;
	let formData = new FormData();
	let url = options.url;

  	if (options.data) {
  		url += "?";
  		for (let key in options.data) {
  			url += key + "=" + options.data[key] + "&";
  			formData.append(key, options.data[key]);
  		}
    	url = url.slice(0, -1);

	}else {
		options.data = {};
	    url = "";
	}

	try {
	  if (options.method == "GET") {
	    xhr.open(options.method, url);
	    xhr.send();

	  } else {
	    xhr.open(options.method, options.url);
	    xhr.send(formData);
	  }

	} catch (e) {
		options.callback(e);
	}

	
	
	xhr.onload = function() {
		options.callback(null, xhr.response);
	}
	xhr.onerror = function() {
		options.callback(err, null);
	}
	
};




