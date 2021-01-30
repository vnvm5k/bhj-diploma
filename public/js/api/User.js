/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  constructor(URL) {
    this.URL = '/user';
  }
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
      localStorage.user = JSON.stringify(user);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem('user');
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
          return JSON.parse(localStorage.getItem('user'));
        }
        else {
          return undefined; 
        }  
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch( data, callback = f => f ) {
    return createRequest({
      url: this.URL + '/current',
      method: 'POST',
      responseType: 'json', 
      data: data,
      
      callback:(err,response) => {
        if(err === null && response.success) {
          this.setCurrent(response.user);
        }
        else {
          this.unsetCurrent(response.user);
        }
        callback(err, response);
      }
    });
}

  

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback = f => f ) {
    return createRequest({
      url: this.URL + '/login',
      method: 'POST',
      responseType: 'json', 
      data: data,
      callback:(err, response) => {
        if (err === null && response.success) {
          this.setCurrent(response.user);
        }
        callback(err,response); 
      }
    });
}
  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = f => f) {
    return createRequest({ 
      url: this.URL + '/register',
      method: 'POST',
      responseType: 'json', 
      data: data, 

      callback:(err, response) => {
        if (err === null && response.success) {
          this.setCurrent(response.user);
        }
        callback(err,response); 
      }
    });
  }



  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  
  static logout( data, callback = f => f) {
    return createRequest({ 
      url: this.URL + '/logout',
      method: 'POST',
      responseType: 'json', 
      data: data, 

      callback:(err, response) => {
        if (err === null && response.success) {
          this.unsetCurrent(response.user);
        }
        callback(err,response); 
      }
    });
  }
}
