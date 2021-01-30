/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */
class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor( element ) {
    this.element = element; 
    if (!this.element) throw new Error('Ошибка, передано пустое значение');
    this.registerEvents();
    this.update(); 
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    const createBtn = document.querySelector('.create-account');
    const accountList = document.querySelector('.accounts-panel');
    

    createBtn.addEventListener('click', function(e) {
      e.preventDefault();
       Modal.open(App.getModal('createAccount')); 
    });

    accountList.addEventListener('click', function(e) {
      e.preventDefault();
      let event = e.target; 
      AccountsWidget.onSelectAccount(event); 
    });   
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    if (User.current()) {
       let accList = Account.list();
       this.clear();
       accList.forEach((element) => {
         this.renderItem(element); 
       });

    }
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    this.accountList.innerHTML = ''; 
  }

  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount( element ) {
    element.classList.toggle('active'); 
    App.showPage( 'transactions', { account_id: `${this.element.id}` });
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML( item ) {
    let acc =
   `<li class="active account" data-id="${item.id}">
        <a href="#">
            <span>${item.name}</span> /
            <span>${item.sum} ₽</span>
        </a>
    </li>`
    return acc; 
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem( item ) {
    this.accountList.innerHTML += this.getAccountHTML(item); 
  }
}
