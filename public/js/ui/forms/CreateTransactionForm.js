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
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    const accSelect = document.querySelectorAll('.accounts-select');
    
    Account.list(User.current(), (err, response) => {
      if(err === null && response.success) {
        let accList = response.data;
        accList.forEach((element) => {
        accSelect[0].innerHTML += `<option value=${element.id}>${element.name}</option>`; 
        accSelect[1].innerHTML += `<option value=${element.id}>${element.name}</option>`;
        });
      }
    });
    
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit( options ) {
    Transaction.create(options.data, (err,response) => {
      if(err === null && response.success) {
        this.formData.reset();
        App.getModal('createIncome').close(); 
        App.getModal('createExpense').close();
        App.update();
      }
    });
  }
}
