/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  constructor(URL) {
    this.URL = '';
  }
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list( data, callback = (err, response) => {
    const xhr = new XMLHttpRequest;
    xhr.open( 'GET', 'URL' );
    xhr.responseType = json; 
    xhr.send();
  });

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create( data, callback = (err, response) => {
    const xhr = new XMLHttpRequest;
    xhr.open( 'POST', 'URL' );
    xhr.responseType = json; 
    let modifiedData = Object.assign({ _method: 'PUT' }, data );
    xhr.send();
  });

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get( id = '', data, callback = (err, response) => {
    const xhr = new XMLHttpRequest;
    xhr.open( 'GET', 'URL' );
    xhr.responseType = json; 
    xhr.send();
  });

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove( id = '', data, callback = (err, response) => {
    const xhr = new XMLHttpRequest;
    xhr.open( 'POST', 'URL' );
    xhr.responseType = json; 
    let modifiedData = Object.assign({ _method: 'DELETE', id: '' }, data );
    xhr.send();
  }); 
}

