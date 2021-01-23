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
      body.classList.toggle('sidebar-open sidebar-collapse');
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
      const element = e.target; 
      const searchWindow = new App();
      const openWindow = new Modal(searchWindow.getModal(element));
      openWindow.open()
      e.preventDefault();
    });
    const logInBtn = document.querySelector("[form='login-form']");
    logInBtn.addEventListener('click', function(e){
      const element = e.target; 
      const searchWindow = new App();
      const openWindow = new Modal(searchWindow.getModal(element));
      openWindow.open()
      e.preventDefault();
    });
    const logOutBtn = document.querySelector('.menu-item_logout');
    logOutBtn.addEventListener('click', function(e) {
      const logOut = new User();
      const searchWindow = new App();
      logOut.logout(); 
      if(response.success == true) {
        searchWindow.setState( 'init' ); 
      }
      e.preventDefault();
    });

  }

}
