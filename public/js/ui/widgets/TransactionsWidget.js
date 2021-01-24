/**
 * Класс TransactionsWidget отвечает за
 * открытие всплывающих окон для
 * создания нового дохода или расхода
 * */
class TransactionsWidget {
  /**
   * Устанавливает полученный элемент
   * в свойство element.
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    this.element = element; 
    registerEvents();
  }
  /**
   * Регистрирует обработчики нажатия на
   * кнопки «Новый доход» и «Новый расход».
   * При нажатии вызывает Modal.open() для
   * экземпляра окна
   * */
  registerEvents() {
    const incomeBtn = document.querySelector('.create-income-button');
    const expenseBtn = document.querySelector('.create-expense-button');
    

    incomeBtn.addEventListener('click', function(e) {
      e.preventDefault();
       App.getModal('createIncome');
       Modal.open(); 
    });

    expenseBtn.addEventListener('click', function(e) {
      e.preventDefault();
       App.getModal('createExpense');
       Modal.open(); 
    });
  }
}
