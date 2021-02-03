/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor( element ) {
    if (!element) throw new Error('Ошибка, передано пустое значение'); 
    this.element = element; 
    this.registerEvents()
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * */
  update() {
    this.render(this.lastOptions)
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    const raccBtn = document.querySelector('.remove-account');
    const rtransBtn = document.querySelectorAll('.transaction__remove');

    raccBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.removeAccount();
    });

    rtransBtn.forEach( function(element) {
      element.addEventListener('click', (e) => {
        this.removeTransaction(element.dataset.id);
      });
    });
  }
  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.update()
   * для обновления приложения
   * */
  removeAccount() {
    if (!this.lastOptions) return
    if(confirm('Вы действительно хотите удалить счёт?')){ 
      this.clear();
      let accId = document.querySelector('.active').dataset.id;
      Account.remove(accId, (err,response) => {
        if(err === null && response.success) {
          App.update();
        }
      });
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction( id ) {
    if (confirm('Вы действительно хотите удалить эту транзакцию?')) {
      Transaction.remove(id, {}, (err,response) => {
        if(err === null && response.success) {
          App.update();
        }
      });
    }
  }

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render( options ) {
    if (!options) return; 
    this.lastOptions = options;
    Account.get(options.account_id, {}, (err,response) => {
      this.renderTitle(response.data.name); 
    });
    
    Transaction.list(options, (error, response) => {
      this.renderTransactions(response.data);
    });
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]); 
    this.renderTitle("Название счета"); 
    this.lastOptions = ''; 
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle( name ) {
    const title = document.querySelector('.content-title');
    title.innerHTML = name; 
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate( date ) {
   const time = new Date(date);
   const year = time.getFullYear();
   const month = time.getMonth();
   const day = time.getDate();
   const hour = time.getHours();
   const minute = time.getMinutes(); 
   const monthName = ["января", "февраля", "марта","апреля", "мая","июня","июля","авгутса","сентября","октября","ноября","декабря"]
   return day + monthName[month] +  year + 'г.' + 'в' + hour + ':' + minute
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML( item ) {
    let trans = 
    `<div class="transaction transaction_${item.type} row">
        <div class="col-md-7 transaction__details">
          <div class="transaction__icon">
              <span class="fa fa-money fa-2x"></span>
          </div>
          <div class="transaction__info">
              <h4 class="transaction__title">${item.name}</h4>
              <div class="transaction__date">${this.formatDate()}</div>
          </div>
        </div>
        <div class="col-md-3">
          <div class="transaction__summ">
              ${item.sum} <span class="currency">₽</span>
          </div>
        </div>
        <div class="col-md-2 transaction__controls">
            <button class="btn btn-danger transaction__remove" data-id="${item.id}">
                <i class="fa fa-trash"></i>  
            </button>
        </div>
    </div>`

  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions( data ) {
    const content = document.querySelector('.content'); 
    data.forEach( (element) => {
       content.innerHTML += this.getTransactionHTML(element); 
    });
  }
}
