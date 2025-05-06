// Константы для элементов формы
const DOM = {
    regForm: document.getElementById('regForm'),
    loginForm: document.getElementById('loginForm'),
    nameInput: document.getElementById('name'),
    emailInput: document.getElementById('email'),
    passwordInput: document.getElementById('password'),
    loginEmailInput: document.getElementById('loginEmail'),
    loginPasswordInput: document.getElementById('loginPassword'),
  };
  
  // Основные функции
  const Auth = {
    // Сохраняем пользователя
    saveUser(userData) {
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('lastActivity', Date.now());
    },
  
    // Получаем текущего пользователя
    getCurrentUser() {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    },
  
    // Проверяем авторизацию
    isAuthenticated() {
      const user = this.getCurrentUser();
      if (!user) return false;
      
      // Проверяем время бездействия (30 минут)
      const lastActivity = localStorage.getItem('lastActivity');
      const inactiveTime = Date.now() - lastActivity;
      const thirtyMinutes = 30 * 60 * 1000;
      
      if (inactiveTime > thirtyMinutes) {
        this.logout();
        return false;
      }
      
      // Обновляем время последней активности
      localStorage.setItem('lastActivity', Date.now());
      return true;
    },
  
    // Выход из системы
    logout() {
      localStorage.removeItem('user');
      localStorage.removeItem('lastActivity');
      window.location.href = 'index.html';
    }
  };
  
  // Обработчики форм
  const Handlers = {
    // Регистрация
// В обработчике регистрации (замените текущий handleRegister)
async handleRegister(e) {
    e.preventDefault();
    
    const formData = {
        name: DOM.nameInput.value,
        email: DOM.emailInput.value,
        password: DOM.passwordInput.value,
        gender: document.querySelector('input[name="gender"]:checked')?.value,
        interests: Array.from(document.querySelectorAll('input[name="interests"]:checked'))
                     .map(el => el.value).join(','),
        country: document.getElementById('country').value,
        about: document.getElementById('about').value
    };
    
    try {
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Создаем объект пользователя с ВСЕМИ данными из формы
            const userData = {
                id: data.userId,
                name: formData.name,
                email: formData.email,
                gender: formData.gender,
                interests: formData.interests,
                country: formData.country,
                about: formData.about,
                created_at: new Date().toISOString()
            };
            
            // Сохраняем полные данные в localStorage
            Auth.saveUser(userData);
            window.location.href = 'profile.html';
        } else {
            alert(data.message || 'Ошибка регистрации');
        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке данных');
    }
},
  
    // Авторизация
    async handleLogin(e) {
      e.preventDefault();
      
      const formData = {
        email: DOM.loginEmailInput.value,
        password: DOM.loginPasswordInput.value
      };
      
      try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (data.success) {
          Auth.saveUser(data.user);
          window.location.href = 'profile.html';
        } else {
          alert(data.message || 'Ошибка авторизации');
        }
      } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при авторизации');
      }
    },
  
    // Загрузка профиля
    loadProfile() {
      if (!Auth.isAuthenticated()) {
        window.location.href = 'index.html';
        return;
      }
  
      const user = Auth.getCurrentUser();
      this.displayUserData(user);
    },
  
    // Отображение данных пользователя
    displayUserData(user) {
      if (!user) return;
      
      document.getElementById('userName').textContent = user.name;
      document.getElementById('userEmail').textContent = user.email;
      document.getElementById('userGender').textContent = 
        user.gender === 'male' ? 'Мужской' : 'Женский';
      document.getElementById('userCountry').textContent = 
        this.getCountryName(user.country);
      document.getElementById('userAbout').textContent = user.about || 'Не указано';
      
      const interestsContainer = document.getElementById('userInterests');
      interestsContainer.innerHTML = '';
      
      if (user.interests) {
        user.interests.split(',').forEach(interest => {
          const span = document.createElement('span');
          span.className = 'interest-tag';
          span.textContent = this.getInterestName(interest);
          interestsContainer.appendChild(span);
        });
      }
    },
  
    // Вспомогательные функции
    getCountryName(code) {
      const countries = { 'ru': 'Россия', 'by': 'Беларусь', 'kz': 'Казахстан' };
      return countries[code] || 'Не указана';
    },
  
    getInterestName(interest) {
      const interests = { 'sport': 'Спорт', 'music': 'Музыка', 'books': 'Книги' };
      return interests[interest] || interest;
    }
  };
  
  // Инициализация
  const App = {
    init() {
      // Проверяем авторизацию при загрузке страницы
      this.checkAuth();
      
      // Назначаем обработчики
      if (DOM.regForm) {
        DOM.regForm.addEventListener('submit', (e) => Handlers.handleRegister(e));
      }
      
      if (DOM.loginForm) {
        DOM.loginForm.addEventListener('submit', (e) => Handlers.handleLogin(e));
      }
      
      // Для страницы профиля
      if (window.location.pathname.endsWith('profile.html')) {
        document.addEventListener('DOMContentLoaded', () => Handlers.loadProfile());
      }
    },
    
    checkAuth() {
      // Для главной страницы - редирект если авторизован
    //   if (window.location.pathname.endsWith('index.html') && Auth.isAuthenticated()) {
    //     window.location.href = 'profile.html';
    //   }
      
      // Для защищенных страниц - редирект если не авторизован
      const protectedPages = ['profile.html'];
      if (protectedPages.some(page => window.location.pathname.endsWith(page)) && !Auth.isAuthenticated()) {
        window.location.href = 'index.html';
      }
    }
  };
  
  // Запуск приложения
  App.init();