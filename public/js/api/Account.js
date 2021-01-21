/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account {
	class Account extends Entity {
	constructor(URL) {
	   super(URL);
	   this.URL = '/account';
	}
}
