/**
 * Класс Sidebar отвечает за работу боковой колонки:
 * кнопки скрытия/показа колонки в мобильной версии сайта
 * и за кнопки меню
 * */
class Sidebar { 
  /**
   * Запускает initAuthLinks и initToggleButton
   * */

  static init() {
    this.initAuthLinks();
    this.initToggleButton();
  }

  /**
   * Отвечает за скрытие/показа боковой колонки:
   * переключает два класса для body: sidebar-open и sidebar-collapse
   * при нажатии на кнопку .sidebar-toggle
   * */
  static initToggleButton() {
    const btn = document.querySelector('.sidebar-toggle');
    const body = document.querySelector('.sidebar-mini');
    btn.addEventListener('click', function() {
      body.classList.toggle('sidebar-open');
      body.classList.toggle('sidebar-collapse');
    })
  }

  /**
   * При нажатии на кнопку входа, показывает окно входа
   * (через найденное в App.getModal)
   * При нажатии на кнопку регастрации показывает окно регистрации
   * При нажатии на кнопку выхода вызывает User.logout и по успешному
   * выходу устанавливает App.setState( 'init' )
   * */
  static initAuthLinks() {
    const regBtn = document.querySelector('.menu-item_register');
    regBtn.addEventListener('click', function(e){
      App.getModal('register').open();
      e.preventDefault();
    });
    const logInBtn = document.querySelector('.menu-item_login');
    logInBtn.addEventListener('click', function(e){
      App.getModal('login').open();
      e.preventDefault();
    });
    const logOutBtn = document.querySelector('.menu-item_logout');
    logOutBtn.addEventListener('click', function(e) {
      User.logout(User.current(), (err, response) => {
        if(response.success) {
        App.setState( 'init' ); 
       }
      }); 
      e.preventDefault(); 
    });

  }

} 
