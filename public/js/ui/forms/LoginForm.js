/**
 * Класс LoginForm управляет формой
 * входа в портал
 * Наследуется от AsyncForm
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit( options ) {
  	User.login(options, (err,response) => {
    	if(response && response.success) {
    		this.element.reset();
    		App.setState('user-logged');
        App.getModal('login').close(); 	
    	}
  	});
  }
}
