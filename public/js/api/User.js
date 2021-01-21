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
      try {
        return JSON.parse(localStorage.getItem('user'));
      } catch (e) {
        return null;
      }
    
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch( data, callback = (err, response) =>  {
    const xhr = new XMLHttpRequest;
    xhr.open( 'GET', `${this.URL + '/current'}` );
    xhr.responseType = json; 
    xhr..send();
    if(response.success == true) {
      User.setCurrent();
    }
    else {
      User.unsetCurrent();
    }
  });

  

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login( data, callback = (err, response) => {
    const xhr = new XMLHttpRequest;
    xhr.open( 'POST', `${this.URL + '/login'}` );
    xhr.responseType = json; 
    xhr.send();
    if (response.success == true) {
      User.setCurrent();
    }
    else {
      console.log(response.error); 
    }
  });

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register( data, callback = (err, response) => {
    const xhr = new XMLHttpRequest;
    xhr.open( 'POST', `${this.URL + '/register'}` );
    xhr.responseType = json; 
    xhr.send();
    if (response.success == true) {
      User.setCurrent();
    }
    else {
      console.log(response.error); 
    }
  });


  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout( data, callback = (err, response) => {
    const xhr = new XMLHttpRequest;
    xhr.open( 'POST', `${this.URL + '/logout'}` );
    xhr.responseType = json; 
    xhr.send();
    if (response.success == true) {
      User.unsetCurrent();
    }
    else {
      console.log(response.error); 
    }
  });
}
