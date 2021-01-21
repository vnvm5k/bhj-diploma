/**
 * Класс Transaction наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/transaction'
 * */
class Transaction {
	class Transaction extends Entity {
	constructor(URL) {
	   super(URL);
	   this.URL = '/transaction';
	}
}
