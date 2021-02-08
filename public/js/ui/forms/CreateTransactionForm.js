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
    if (!User.current()) {
      return;
    }

    const accSelect = this.element.querySelector('.accounts-select');
    
    Account.list(User.current(), (err, response) => {
      if(response && response.data) {
        let accList = response.data;
        accSelect.innerHTML = "";
        accList.forEach((element) => {
          accSelect.innerHTML += `<option value=${element.id}>${element.name}</option>`; 
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
    Transaction.create(options, (err,response) => {
      if(response && response.success) {
        const transaction = document.querySelectorAll(".modal");
        transaction.forEach(element => {
          if (element.getAttribute("id") == "modal-new-income") {
            App.getModal("newIncome").close();
          } else if (element.getAttribute("id") == "modal-new-expense") {
            App.getModal("newExpense").close();
          }
        });

        App.update();
        this.element.reset();
      }
    });
  }
}
