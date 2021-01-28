/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor( element ) {
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const accSelect = document.querySelectorAll('.accounts-select');
    const accList = Account.list();
    accList.forEach( function(element) {
      accSelect[0].innerHTML += "<option value=`${element.id}`>`${element.name}`</option>"; 
      accSelect[1].innerHTML += "<option value=`${element.id}`>`${element.name}`</option>";
    });

  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit( options ) {
    Transaction.create(); 
    if(response.success) {
      this.formData.reset();
      App.getModal('createIncome');
      Modal.close; 
      App.getModal('createExpense');
      Modal.close; 
      App.update();
    }
  }
}
