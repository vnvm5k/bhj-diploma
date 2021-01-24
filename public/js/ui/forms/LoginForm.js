/**
 * Класс LoginForm управляет формой
 * входа в портал
 * Наследуется от AsyncForm
 * */
class LoginForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit( options ) {
	User.login();
  	callback:(err,response) => {
    	if(err === null && response.success) {
    		this.formData.reset();
    		App.setState( 'user-logged' );
    		Modal.close();
    	}
  	}
  }
}
