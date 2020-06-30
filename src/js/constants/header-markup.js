const HEADER_LOGGED_OUT = `
<nav id="header-logged-out">
  <ul class="header__nav">
    <li><a class="link link_active" href="./">Главная</a></li>
    <li>
      <button type="button" class="header__button" id="auth-button">Авторизоваться</button>
    </li>
  </ul>
</nav>
`;

const HEADER_LOGGED_IN = `
<nav id="header-logged-in">
  <ul class="header__nav">
    <li><a class="link link_active" href="./">Главная</a></li>
    <li><a class="link link_inactive" href="./news">Сохранённые статьи</a></li>
    <li>
      <button type="button" class="header__button" id="logout-button">
        <span class="header__username"></span>
        <img src="images/main-logout.png" alt="Кнопка логина">
      </button>
    </li>
  </ul>
</nav>
`;

const HEADER_DARK = `
<nav id="header-logged-in">
  <ul class="header__nav">
    <li><a class="link link_inactive" href="../">Главная</a></li>
    <li><a class="link link_active" href="#">Сохранённые статьи</a></li>
    <li>
      <button type="button" class="header__button" id="logout-button">
        <span class="header__username"></span>
        <span class="header__button-icon"></span>
      </button>
    </li>
  </ul>
</nav>
`;

export { HEADER_LOGGED_OUT, HEADER_LOGGED_IN, HEADER_DARK };
