// Глобальные переменные
let currentUser = {
    tasks: [],
    goals: [],
    spheres: {},
    // ФИНАНСЫ - ОБЪЕДИНЯЕМ ВСЕ ДАННЫЕ В ОДНОМ МЕСТЕ
    financialData: {
        income: [],
        expenses: [],
        investments: [],
        capital: 100000,  // начальный капитал
        wallet: 0,
        savings: 0,      // копилка
        initialCapital: 10000,
        budget: []
    },
    financialData: {
        income: [],
        expenses: [],
        investments: [],
        capital: 0,
        wallet: 0
    },
    healthData: {
        activities: [],
        sleep: [],
        nutrition: [],
        metrics: {}
    },
    relationshipsData: {
        people: [],
        events: [],
        gifts: []
    },
    studyData: {
        courses: [],
        books: [],
        skills: []
    },
    careerData: {
        projects: [],
        meetings: [],
        goals: []
    },
    creativityData: {
        projects: [],
        ideas: [],
        materials: []
    },
    travelData: {
        plans: [],
        budget: [],
        routes: []
    },
    restData: {
        hobbies: [],
        relaxation: [],
        entertainment: []
    },
    
    // НОВЫЕ РАЗДЕЛЫ
    // ОБУЧЕНИЕ
    learning: {
        completedTasks: [false, false, false],
        showedTutorial: false
    },
    
    // ДЕРЕВО РАЗВИТИЯ
    tree: {
        level: 1,
        experience: 0,
        branches: {
            finance: { unlocked: 1, total: 10, quests: [] },
            health: { unlocked: 1, total: 10, quests: [] },
            study: { unlocked: 1, total: 10, quests: [] },
            career: { unlocked: 1, total: 10, quests: [] },
            relationships: { unlocked: 1, total: 10, quests: [] },
            creativity: { unlocked: 1, total: 10, quests: [] },
            travel: { unlocked: 1, total: 10, quests: [] },
            rest: { unlocked: 1, total: 10, quests: [] }
        },
        habits: [],
        quests: []
    },
    
    // ПОДПИСКА
    subscription: {
        tasksCreated: 0,
        showedModal: false,
        subscribed: false
    },
    
    // РЕЙТИНГ
    appRating: 0,
    
    // ДУХОВНОСТЬ
    spiritualityData: {
        gratitude: [],
        meditations: [],
        affirmations: []
    },
    
    // РАСШИРЕННЫЕ ФИНАНСЫ
    financeExtended: {
        initialCapital: 10000,
        savings: 0,
        budget: [],
        categories: {
            income: ['работа', 'фриланс', 'инвестиции', 'подарок', 'другое'],
            expenses: ['еда', 'транспорт', 'жилье', 'развлечения', 'здоровье', 'другое']
        }
    },
    
    // ДОПОЛНИТЕЛЬНЫЕ ДАННЫЕ ДЛЯ СФЕР
    healthExtended: {
        metrics: [], // вес, давление, шаги
        habits: [], // вода, сон, упражнения
        medications: [] // лекарства
    },
    
    studyExtended: {
        coursesProgress: [], // прогресс по курсам 0-100%
        notes: [], // конспекты
        deadlines: [] // сроки сдачи
    },
    
    relationshipsExtended: {
        contacts: [], // контакты с частотой
        birthdays: [], // дни рождения
        notes: [] // заметки о людях
    },
    
    careerExtended: {
        projects: [], // проекты с этапами
        skills: [], // навыки с уровнем
        meetings: [] // встречи с итогами
    },
    
    creativityExtended: {
        projects: [], // творческие проекты
        ideas: [], // идеи
        portfolio: [] // портфолио
    },
    
    leisureExtended: {
        wishlist: [], // список желаний
        plans: [], // планы на выходные
        quality: [] // качество отдыха 1-10
    }
};

let calendar;
let activityChart = null;
let expensesChart = null;
let selectedSphere = null;
let currentTaskId = null;
let draggedTask = null;
let selectedDateForTask = null;
let selectedDateForShift = null;

// Сферы жизни
const spheres = [
    { 
        id: 'finance', 
        name: 'Финансы', 
        icon: '💰', 
        color: '#10b981',
        subsections: ['Доходы', 'Расходы', 'Инвестиции', 'Капитал', 'Копилка', 'Бюджет']
    },
    { 
        id: 'health', 
        name: 'Здоровье', 
        icon: '🏃', 
        color: '#f59e0b',
        subsections: ['Активность', 'Сон', 'Питание', 'Метрики', 'Привычки', 'Лекарства']
    },
    { 
        id: 'study', 
        name: 'Учеба', 
        icon: '📚', 
        color: '#3b82f6',
        subsections: ['Курсы', 'Книги', 'Навыки', 'Конспекты', 'Дедлайны', 'Прогресс']
    },
    { 
        id: 'career', 
        name: 'Карьера', 
        icon: '💼', 
        color: '#ef4444',
        subsections: ['Проекты', 'Встречи', 'Цели', 'Навыки', 'Контакты', 'Портфолио']
    },
    { 
        id: 'relationships', 
        name: 'Отношения', 
        icon: '❤️', 
        color: '#ec4899',
        subsections: ['Люди', 'События', 'Подарки', 'Встречи', 'Дни рождения', 'Заметки']
    },
    { 
        id: 'creativity', 
        name: 'Творчество', 
        icon: '🎨', 
        color: '#8b5cf6',
        subsections: ['Проекты', 'Идеи', 'Материалы', 'Портфолио', 'Выставки', 'Вдохновение']
    },
    { 
        id: 'travel', 
        name: 'Путешествия', 
        icon: '✈️', 
        color: '#06b6d4',
        subsections: ['Планы', 'Бюджет', 'Маршруты', 'Бронирования', 'Чек-лист', 'Воспоминания']
    },
    { 
        id: 'rest', 
        name: 'Отдых', 
        icon: '🎮', 
        color: '#0ea5e9',
        subsections: ['Хобби', 'Релакс', 'Развлечения', 'Сон', 'Список желаний', 'Планы']
    },
    { 
        id: 'spirituality', 
        name: 'Духовность', 
        icon: '🙏', 
        color: '#8b5cf6',
        subsections: ['Благодарность', 'Медитации', 'Аффирмации', 'Рефлексия', 'Ценности', 'Практики']
    }
];

// Инициализация приложения
document.addEventListener('DOMContentLoaded', function() {
    initApp();
});

function initApp() {
    loadUserData();
    initUI();
    initNavigation();
    initCalendar();
    setupEventHandlers();
    setupDragAndDrop();
    loadTodayTasks();
    updateDayProgress();
    updateStats();
    updateTodayDate();
    checkSubscriptionLimit();
    checkLearningTasks();
    loadTree();
    
    // Расчет оплаты при изменении
    document.getElementById('shift-rate')?.addEventListener('input', calculateShiftPayment);
    document.getElementById('shift-hours')?.addEventListener('input', calculateShiftPayment);
}

function loadUserData() {
    const saved = localStorage.getItem('lifeContourData');
    if (saved) {
        try {
            const parsed = JSON.parse(saved);
            
            // Объединяем старые данные с новой структурой
            currentUser = {
                ...currentUser,
                ...parsed,
                // Объединяем финансовые данные
                financialData: {
                    ...currentUser.financialData,
                    ...(parsed.financialData || {}),
                    // Если в старых данных был financeExtended, переносим оттуда
                    initialCapital: parsed.financeExtended?.initialCapital || currentUser.financialData.initialCapital,
                    savings: parsed.financeExtended?.savings || currentUser.financialData.savings
                },
                // Удаляем старый financeExtended
                financeExtended: undefined
            };
            
            // Удаляем старые поля если они существуют
            delete currentUser.financeExtended;
            
        } catch (e) {
            console.error('Ошибка загрузки данных:', e);
            createInitialData();
        }
    } else {
        createInitialData();
    }
    
    // Инициализируем сферы
    spheres.forEach(sphere => {
        if (!currentUser.spheres[sphere.id]) {
            currentUser.spheres[sphere.id] = {
                goals: [],
                progress: 0
            };
        }
    });
    
    // Обновляем счетчик задач для подписки
    currentUser.subscription.tasksCreated = currentUser.tasks.length;
}
function createInitialData() {
    const today = new Date().toISOString().split('T')[0];
    
    // Обучающие задачи
    currentUser.tasks = [
        {
            id: '1',
            title: 'Пройти обучение',
            sphere: 'study',
            date: today,
            time: '10:00',
            duration: 0.5,
            priority: 'high',
            completed: false,
            order: 0,
            isLearningTask: true
        },
        {
            id: '2',
            title: 'Добавить первую задачу',
            sphere: 'all',
            date: today,
            time: '11:00',
            duration: 0.5,
            priority: 'high',
            completed: false,
            order: 1,
            isLearningTask: true
        },
        {
            id: '3',
            title: 'Добавить первый доход',
            sphere: 'finance',
            date: today,
            time: '12:00',
            duration: 0.5,
            priority: 'high',
            completed: false,
            order: 2,
            isLearningTask: true
        }
    ];
    
    // ТЕПЕРЬ ВСЕ ФИНАНСОВЫЕ ДАННЫЕ В ОДНОМ МЕСТЕ
    currentUser.financialData.income = [
        { 
            id: '1', 
            amount: 50000, 
            description: 'Зарплата', 
            date: today, 
            category: 'работа' 
        },
        { 
            id: '2', 
            amount: 10000, 
            description: 'Фриланс', 
            date: today, 
            category: 'фриланс' 
        }
    ];
    
    currentUser.financialData.expenses = [
        { 
            id: '1', 
            amount: 15000, 
            description: 'Аренда квартиры', 
            date: today, 
            category: 'жилье' 
        },
        { 
            id: '2', 
            amount: 5000, 
            description: 'Продукты', 
            date: today, 
            category: 'еда' 
        }
    ];
    
    currentUser.financialData.wallet = 40000;
    currentUser.financialData.capital = 100000;
    currentUser.financialData.savings = 5000;
    currentUser.financialData.initialCapital = 10000;
    
    // УБИРАЕМ financeExtended - всё в financialData
    
    // Данные для здоровья
    currentUser.healthExtended.metrics = [
        { id: '1', type: 'вес', value: 70, unit: 'кг', date: today },
        { id: '2', type: 'шаги', value: 8000, unit: 'шагов', date: today }
    ];
    
    currentUser.healthExtended.habits = [
        { id: '1', name: 'Пить воду', target: 8, current: 5, unit: 'стаканов', date: today },
        { id: '2', name: 'Зарядка', target: 1, current: 1, unit: 'раз', date: today }
    ];
    
    // Данные для учебы
    currentUser.studyExtended.coursesProgress = [
        { id: '1', name: 'JavaScript продвинутый', progress: 65, deadline: '2024-03-01' },
        { id: '2', name: 'Английский B2', progress: 30, deadline: '2024-06-01' }
    ];
    
    // Данные для отношений
    currentUser.relationshipsExtended.birthdays = [
        { id: '1', name: 'Мама', date: '2024-05-15', notes: 'Поздравить с днем рождения' }
    ];
    
    // Инициализация дерева
    createInitialQuests();
    createInitialHabits();
    
    saveUserData();
}
function saveUserData() {
    localStorage.setItem('lifeContourData', JSON.stringify(currentUser));
}

function initUI() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('task-date').value = today;
    
    // Инициализация рейтинга
    updateRatingDisplay();
}

function initNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            switchSection(section);
            
            document.querySelectorAll('.nav-item').forEach(nav => {
                nav.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
    
    document.getElementById('add-button').addEventListener('click', function() {
        openTaskModal();
    });
    
    document.getElementById('export-btn').addEventListener('click', exportData);
    document.getElementById('import-btn').addEventListener('click', importData);
}

function switchSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    
    document.getElementById(sectionId + '-section').classList.add('active');
    
    switch(sectionId) {
        case 'today':
            loadTodayTasks();
            updateDayProgress();
            break;
        case 'calendar':
            if (calendar) {
                calendar.render();
            }
            break;
        case 'spheres':
            loadSpheres();
            break;
        case 'tree':
            loadTree();
            break;
        case 'stats':
            updateStats();
            break;
    }
}

function updateTodayDate() {
    const today = new Date();
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const dateStr = today.toLocaleDateString('ru-RU', options);
    document.getElementById('today-date').textContent = dateStr.charAt(0).toUpperCase() + dateStr.slice(1);
}

// КАЛЕНДАРЬ С НОВЫМИ ФУНКЦИЯМИ
function initCalendar() {
    const calendarEl = document.getElementById('calendar');
    
    calendar = new FullCalendar.Calendar(calendarEl, {
        locale: 'ru',
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'title',
            center: '',
            right: 'today prev,next'
        },
        height: '100%',
        editable: true,
        droppable: true,
        events: generateCalendarEvents(),
        dateClick: function(info) {
            // Открываем меню дня только для текущего месяца
            const today = new Date();
            const clickedDate = new Date(info.dateStr);
            
            if (clickedDate.getMonth() === today.getMonth() && 
                clickedDate.getFullYear() === today.getFullYear()) {
                openDayMenu(info.dateStr);
            }
        },
        eventClick: function(info) {
            const taskId = info.event.id;
            const task = currentUser.tasks.find(t => t.id === taskId);
            if (task) {
                openTaskViewModal(task);
            }
        },
        eventDrop: function(info) {
            const taskId = info.event.id;
            const task = currentUser.tasks.find(t => t.id === taskId);
            if (task) {
                task.date = info.event.startStr.split('T')[0];
                if (info.event.startStr.includes('T')) {
                    task.time = info.event.startStr.split('T')[1].substring(0, 5);
                }
                saveUserData();
                showNotification('Задача перемещена', 'success');
            }
        }
    });
    
    calendar.render();
    
    // Управление видами календаря
    document.querySelectorAll('.calendar-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const view = this.getAttribute('data-view');
            
            document.querySelectorAll('.calendar-btn').forEach(b => {
                b.classList.remove('active');
            });
            this.classList.add('active');
            
            switch(view) {
                case 'day':
                    calendar.changeView('timeGridDay');
                    break;
                case 'week':
                    // Переключаем на кастомный недельный вид
                    showWeekView();
                    break;
                case 'month':
                    calendar.changeView('dayGridMonth');
                    break;
            }
        });
    });
    
    document.getElementById('prev-btn').addEventListener('click', function() {
        calendar.prev();
    });
    
    document.getElementById('next-btn').addEventListener('click', function() {
        calendar.next();
    });
    
    document.getElementById('today-btn').addEventListener('click', function() {
        calendar.today();
    });
}

function generateCalendarEvents() {
    return currentUser.tasks.map(task => {
        const sphere = spheres.find(s => s.id === task.sphere);
        const start = new Date(task.date + 'T' + task.time);
        const end = new Date(start.getTime() + task.duration * 60 * 60 * 1000);
        
        return {
            id: task.id,
            title: task.title,
            start: start,
            end: end,
            backgroundColor: sphere ? sphere.color : '#4361ee',
            borderColor: sphere ? sphere.color : '#4361ee',
            extendedProps: {
                sphere: task.sphere,
                completed: task.completed
            }
        };
    });
}

function openDayMenu(dateStr) {
    selectedDateForTask = dateStr;
    selectedDateForShift = dateStr;
    
    const modal = document.getElementById('day-menu-modal');
    const dateElement = document.getElementById('day-menu-date');
    
    const date = new Date(dateStr);
    const options = { weekday: 'long', day: 'numeric', month: 'long' };
    const formattedDate = date.toLocaleDateString('ru-RU', options);
    
    dateElement.textContent = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    modal.classList.add('active');
}

function openShiftModal() {
    closeModal('day-menu-modal');
    
    const modal = document.getElementById('shift-modal');
    modal.classList.add('active');
    
    // Рассчитываем оплату сразу
    calculateShiftPayment();
}

function calculateShiftPayment() {
    const rate = parseFloat(document.getElementById('shift-rate').value) || 250;
    const hours = parseFloat(document.getElementById('shift-hours').value) || 8;
    
    const perHour = rate;
    const perDay = rate * hours;
    const perWeek = perDay * 5;
    const perMonth = perDay * 20;
    
    document.getElementById('calc-hour').textContent = perHour.toLocaleString() + ' ₽';
    document.getElementById('calc-day').textContent = perDay.toLocaleString() + ' ₽';
    document.getElementById('calc-week').textContent = perWeek.toLocaleString() + ' ₽';
    document.getElementById('calc-month').textContent = perMonth.toLocaleString() + ' ₽';
}

function saveShift() {
    const title = document.getElementById('shift-title').value.trim();
    const rate = parseFloat(document.getElementById('shift-rate').value);
    const hours = parseFloat(document.getElementById('shift-hours').value);
    
    if (!title || !rate || !hours) {
        showNotification('Заполните все поля', 'error');
        return;
    }
    
    // Создаем задачу для смены
    const task = {
        id: Date.now().toString(),
        title: title,
        sphere: 'finance',
        date: selectedDateForShift || new Date().toISOString().split('T')[0],
        time: '09:00',
        duration: hours,
        priority: 'medium',
        completed: false,
        order: 0,
        isShift: true,
        shiftData: {
            rate: rate,
            total: rate * hours
        }
    };
    
    currentUser.tasks.push(task);
    
    // Добавляем доход
    const incomeRecord = {
        id: Date.now().toString() + '_income',
        amount: rate * hours,
        description: title,
        date: selectedDateForShift || new Date().toISOString().split('T')[0],
        category: 'работа',
        type: 'shift'
    };
    
    currentUser.financialData.income.push(incomeRecord);
    
    // Обновляем капитал
    updateCapital();
    
    saveUserData();
    
    // Обновляем интерфейс
    closeModal('shift-modal');
    loadTodayTasks();
    updateStats();
    
    if (calendar) {
        calendar.removeAllEvents();
        calendar.addEventSource(generateCalendarEvents());
        calendar.render();
    }
    
    showNotification('Смена добавлена', 'success');
}

function openTaskModalForDate() {
    closeModal('day-menu-modal');
    
    const modal = document.getElementById('task-modal');
    const today = selectedDateForTask || new Date().toISOString().split('T')[0];
    
    document.getElementById('task-id').value = '';
    document.getElementById('task-title').value = '';
    document.getElementById('task-sphere').value = 'finance';
    document.getElementById('task-date').value = today;
    document.getElementById('task-time').value = '09:00';
    document.getElementById('task-duration').value = 1;
    document.getElementById('task-priority').value = 'medium';
    document.getElementById('task-modal-title').textContent = 'Новая задача';
    document.getElementById('delete-task-btn').style.display = 'none';
    
    modal.classList.add('active');
}

// НЕДЕЛЬНЫЙ ВИД КАЛЕНДАРЯ
function showWeekView() {
    const container = document.querySelector('.calendar-container');
    
    // Получаем текущую неделю
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1); // Понедельник
    
    let html = '<div class="week-view">';
    
    // Заголовок недели
    html += `<div class="week-header">Неделя ${startOfWeek.getDate()}-${startOfWeek.getDate() + 6}.${startOfWeek.getMonth() + 1}</div>`;
    
    // Дни недели
    for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        const dayStr = day.toISOString().split('T')[0];
        
        const dayName = day.toLocaleDateString('ru-RU', { weekday: 'short' });
        const dayNumber = day.getDate();
        
        const tasksForDay = currentUser.tasks.filter(task => task.date === dayStr);
        
        html += `
            <div class="week-day">
                <div class="week-day-header">
                    <div class="week-day-name">${dayName.charAt(0).toUpperCase() + dayName.slice(1)}</div>
                    <div class="week-day-number">${dayNumber}</div>
                </div>
                <div class="week-day-tasks">
                    ${tasksForDay.map(task => `
                        <div class="week-task" onclick="openTaskViewModal(${JSON.stringify(task).replace(/"/g, '&quot;')})">
                            <span class="week-task-time">${task.time}</span>
                            <span class="week-task-title">${task.title}</span>
                        </div>
                    `).join('')}
                    ${tasksForDay.length === 0 ? '<div class="week-no-tasks">Нет задач</div>' : ''}
                </div>
            </div>
        `;
    }
    
    html += '</div>';
    
    container.innerHTML = html;
    
    // Добавляем стили для недельного вида
    const style = document.createElement('style');
    style.textContent = `
        .week-view {
            display: flex;
            flex-direction: column;
            gap: 10px;
            height: 100%;
            overflow-y: auto;
        }
        .week-header {
            font-weight: 600;
            font-size: 16px;
            padding: 10px;
            background: var(--primary-light);
            color: white;
            border-radius: 12px;
            text-align: center;
        }
        .week-day {
            background: var(--card-bg);
            border-radius: 12px;
            padding: 15px;
            border: 1px solid var(--border-color);
        }
        .week-day-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid var(--border-color);
        }
        .week-day-name {
            font-weight: 600;
        }
        .week-day-number {
            width: 30px;
            height: 30px;
            background: var(--primary);
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
        }
        .week-day-tasks {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        .week-task {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 8px;
            background: var(--gray-lighter);
            border-radius: 8px;
            cursor: pointer;
        }
        .week-task-time {
            font-size: 12px;
            color: var(--text-secondary);
            min-width: 50px;
        }
        .week-task-title {
            font-size: 14px;
            flex: 1;
        }
        .week-no-tasks {
            text-align: center;
            color: var(--text-muted);
            font-size: 14px;
            padding: 10px;
        }
    `;
    
    // Удаляем старые стили
    const oldStyle = document.querySelector('#week-view-styles');
    if (oldStyle) oldStyle.remove();
    
    style.id = 'week-view-styles';
    document.head.appendChild(style);
}

// ДРАГ-ЭНД-ДРОП
function setupDragAndDrop() {
    interact('.sortable-list').dropzone({
        accept: '.today-task',
        overlap: 0.5,
        ondropactivate: function(event) {
            event.target.classList.add('drop-active');
        },
        ondragenter: function(event) {
            const draggableElement = event.relatedTarget;
            const dropzoneElement = event.target;
            
            dropzoneElement.classList.add('drop-target');
            draggableElement.classList.add('can-drop');
        },
        ondragleave: function(event) {
            event.target.classList.remove('drop-target');
            event.relatedTarget.classList.remove('can-drop');
        },
        ondrop: function(event) {
            const taskId = event.relatedTarget.getAttribute('data-task-id');
            const task = currentUser.tasks.find(t => t.id === taskId);
            
            if (task) {
                const today = new Date().toISOString().split('T')[0];
                task.date = today;
                saveUserData();
                loadTodayTasks();
                updateDayProgress();
                if (calendar) {
                    calendar.removeAllEvents();
                    calendar.addEventSource(generateCalendarEvents());
                    calendar.render();
                }
                showNotification('Задача перемещена на сегодня', 'success');
            }
        },
        ondropdeactivate: function(event) {
            event.target.classList.remove('drop-active');
            event.target.classList.remove('drop-target');
        }
    });

    interact('.today-task').draggable({
        inertia: true,
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: 'parent',
                endOnly: true
            })
        ],
        autoScroll: true,
        listeners: {
            start: function(event) {
                event.target.classList.add('dragging');
                draggedTask = event.target;
            },
            move: function(event) {
                const items = document.querySelectorAll('.today-task:not(.dragging)');
                const afterElement = getDragAfterElement(items, event.clientY);
                const container = document.querySelector('.sortable-list');
                
                if (afterElement == null) {
                    container.appendChild(draggedTask);
                } else {
                    container.insertBefore(draggedTask, afterElement);
                }
            },
            end: function(event) {
                event.target.classList.remove('dragging');
                
                const taskId = draggedTask.getAttribute('data-task-id');
                const taskIndex = currentUser.tasks.findIndex(t => t.id === taskId);
                
                if (taskIndex !== -1) {
                    const tasks = Array.from(document.querySelectorAll('.today-task'));
                    const newOrder = tasks.findIndex(task => task.getAttribute('data-task-id') === taskId);
                    
                    if (newOrder !== -1) {
                        currentUser.tasks[taskIndex].order = newOrder;
                        saveUserData();
                    }
                }
                
                draggedTask = null;
            }
        }
    });
}

function getDragAfterElement(items, y) {
    return Array.from(items).reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// ЗАДАЧИ НА СЕГОДНЯ
function loadTodayTasks() {
    const today = new Date().toISOString().split('T')[0];
    const todayTasks = currentUser.tasks
        .filter(task => task.date === today)
        .sort((a, b) => (a.order || 0) - (b.order || 0));
    
    const container = document.getElementById('today-tasks');
    
    if (todayTasks.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 30px 20px; color: var(--text-secondary);">
                <i class="fas fa-tasks" style="font-size: 40px; margin-bottom: 15px; opacity: 0.5;"></i>
                <p>Нет задач на сегодня</p>
                <button class="btn" onclick="openTaskModal()" style="margin-top: 15px; width: 100%;">
                    <i class="fas fa-plus"></i> Добавить задачу
                </button>
            </div>
        `;
        return;
    }
    
    let html = '';
    todayTasks.forEach(task => {
        const sphere = spheres.find(s => s.id === task.sphere);
        html += `
            <div class="today-task ${task.completed ? 'completed' : ''}" 
                 data-task-id="${task.id}" 
                 onclick="handleTaskClick(event, '${task.id}')">
                <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} 
                       onclick="event.stopPropagation(); toggleTaskCompletion('${task.id}')">
                <div class="task-info">
                    <div class="task-title ${task.completed ? 'completed' : ''}">${task.title}</div>
                    <div class="task-sphere">
                        <div class="task-sphere-dot" style="background: ${sphere.color}"></div>
                        ${sphere.name}
                        <span style="margin-left: auto; font-size: 11px; color: var(--text-muted);">
                            ${task.time} (${task.duration}ч)
                        </span>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function handleTaskClick(event, taskId) {
    if (event.target.classList.contains('task-checkbox')) return;
    
    const task = currentUser.tasks.find(t => t.id === taskId);
    if (task) {
        openTaskViewModal(task);
    }
}

function openTaskViewModal(task) {
    const sphere = spheres.find(s => s.id === task.sphere);
    const modal = document.getElementById('record-modal');
    const content = document.getElementById('record-modal-content');
    
    content.innerHTML = `
        <div style="margin-bottom: 20px;">
            <div style="font-size: 18px; font-weight: 600; margin-bottom: 10px;">${task.title}</div>
            <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 15px;">
                <div style="width: 12px; height: 12px; border-radius: 50%; background: ${sphere.color};"></div>
                <span>${sphere.name}</span>
            </div>
            <div style="color: var(--text-secondary); margin-bottom: 5px;">
                <i class="far fa-calendar"></i> ${task.date} в ${task.time}
            </div>
            <div style="color: var(--text-secondary); margin-bottom: 15px;">
                <i class="far fa-clock"></i> ${task.duration} часа
            </div>
            ${task.isShift ? `
                <div style="padding: 10px; background: var(--finance-light); border-radius: 8px; margin-bottom: 15px;">
                    <div style="font-weight: 600; color: var(--finance);">Смена</div>
                    <div style="color: var(--text-secondary);">Ставка: ${task.shiftData.rate} ₽/час</div>
                    <div style="color: var(--text-secondary);">Итого: ${task.shiftData.total} ₽</div>
                </div>
            ` : ''}
            <div style="padding: 10px; background: ${task.completed ? 'var(--success-light)' : 'var(--warning-light)'}; 
                 border-radius: 8px; color: ${task.completed ? 'var(--success)' : 'var(--warning)'};">
                ${task.completed ? '✓ Выполнено' : '⌛ В процессе'}
            </div>
        </div>
        
        <div style="display: flex; gap: 10px;">
            <button class="btn btn-primary" style="flex: 1;" onclick="toggleTaskCompletion('${task.id}'); closeModal('record-modal')">
                ${task.completed ? 'Отметить как не выполненную' : 'Отметить как выполненную'}
            </button>
            <button class="btn" style="flex: 1; background: var(--primary-light); color: white;" 
                    onclick="openTaskModal('${task.id}'); closeModal('record-modal')">
                <i class="fas fa-edit"></i> Редактировать
            </button>
            <button class="btn" style="flex: 1; background: var(--danger); color: white;" 
                    onclick="deleteTask('${task.id}'); closeModal('record-modal')">
                <i class="fas fa-trash"></i> Удалить
            </button>
        </div>
    `;
    
    document.getElementById('record-modal-title').textContent = 'Просмотр задачи';
    modal.classList.add('active');
}

function openTaskModal(taskId = null) {
    const modal = document.getElementById('task-modal');
    const title = document.getElementById('task-modal-title');
    const deleteBtn = document.getElementById('delete-task-btn');
    const today = new Date().toISOString().split('T')[0];
    
    if (taskId) {
        const task = currentUser.tasks.find(t => t.id === taskId);
        if (task) {
            document.getElementById('task-id').value = task.id;
            document.getElementById('task-title').value = task.title;
            document.getElementById('task-sphere').value = task.sphere;
            document.getElementById('task-date').value = task.date;
            document.getElementById('task-time').value = task.time;
            document.getElementById('task-duration').value = task.duration;
            document.getElementById('task-priority').value = task.priority;
            title.textContent = 'Редактировать задачу';
            deleteBtn.style.display = 'block';
        }
    } else {
        document.getElementById('task-id').value = '';
        document.getElementById('task-title').value = '';
        document.getElementById('task-sphere').value = 'finance';
        document.getElementById('task-date').value = today;
        document.getElementById('task-time').value = '09:00';
        document.getElementById('task-duration').value = 1;
        document.getElementById('task-priority').value = 'medium';
        title.textContent = 'Новая задача';
        deleteBtn.style.display = 'none';
    }
    
    modal.classList.add('active');
}

function saveTask() {
    const taskId = document.getElementById('task-id').value;
    const title = document.getElementById('task-title').value.trim();
    const sphere = document.getElementById('task-sphere').value;
    const date = document.getElementById('task-date').value;
    const time = document.getElementById('task-time').value;
    const duration = parseFloat(document.getElementById('task-duration').value);
    const priority = document.getElementById('task-priority').value;
    
    if (!title) {
        showNotification('Введите название задачи', 'error');
        return;
    }
    
    if (taskId) {
        const taskIndex = currentUser.tasks.findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
            currentUser.tasks[taskIndex] = {
                ...currentUser.tasks[taskIndex],
                title,
                sphere,
                date,
                time,
                duration,
                priority
            };
            showNotification('Задача обновлена', 'success');
        }
    } else {
        const task = {
            id: Date.now().toString(),
            title: title,
            sphere: sphere,
            date: date,
            time: time,
            duration: duration,
            priority: priority,
            completed: false,
            order: currentUser.tasks.filter(t => t.date === date).length
        };
        
        currentUser.tasks.push(task);
        showNotification('Задача добавлена', 'success');
        
        // Увеличиваем счетчик задач для подписки
        currentUser.subscription.tasksCreated++;
        
        // Проверяем обучение
        if (title === "Добавить первую задачу" && sphere === "all") {
            completeLearningTask(1);
        }
        
        // Проверяем подписку
        checkSubscriptionLimit();
    }
    
    saveUserData();
    closeModal('task-modal');
    
    loadTodayTasks();
    updateDayProgress();
    updateStats();
    
    if (calendar) {
        calendar.removeAllEvents();
        calendar.addEventSource(generateCalendarEvents());
        calendar.render();
    }
    
    // Обновляем дерево
    updateTreeAfterAction('task_created', { sphere });
}

function deleteCurrentTask() {
    const taskId = document.getElementById('task-id').value;
    if (taskId) {
        deleteTask(taskId);
        closeModal('task-modal');
    }
}

function deleteTask(taskId) {
    if (confirm('Удалить задачу?')) {
        const taskIndex = currentUser.tasks.findIndex(t => t.id === taskId);
        if (taskIndex !== -1) {
            currentUser.tasks.splice(taskIndex, 1);
            saveUserData();
            
            loadTodayTasks();
            updateDayProgress();
            updateStats();
            
            if (calendar) {
                calendar.removeAllEvents();
                calendar.addEventSource(generateCalendarEvents());
                calendar.render();
            }
            
            showNotification('Задача удалена', 'success');
        }
    }
}

function toggleTaskCompletion(taskId) {
    const task = currentUser.tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        
        // Проверяем обучение
        if (task.title === "Пройти обучение" && task.completed) {
            completeLearningTask(0);
        }
        
        saveUserData();
        
        loadTodayTasks();
        updateDayProgress();
        updateStats();
        
        if (calendar) {
            calendar.removeAllEvents();
            calendar.addEventSource(generateCalendarEvents());
            calendar.render();
        }
        
        // Обновляем дерево
        updateTreeAfterAction('task_completed', { sphere: task.sphere });
        
        showNotification(task.completed ? 'Задача выполнена!' : 'Задача не выполнена', 'success');
    }
}

function updateDayProgress() {
    const today = new Date().toISOString().split('T')[0];
    const todayTasks = currentUser.tasks.filter(task => task.date === today);
    const completedTasks = todayTasks.filter(task => task.completed).length;
    const progress = todayTasks.length > 0 ? Math.round((completedTasks / todayTasks.length) * 100) : 0;
    
    const container = document.getElementById('day-progress-details');
    
    container.innerHTML = `
        <div style="text-align: center; padding: 10px;">
            <div style="font-size: 32px; font-weight: 700; color: var(--primary); margin-bottom: 10px;">
                ${progress}%
            </div>
            <div style="width: 100%; height: 8px; background: var(--gray-light); border-radius: 4px; overflow: hidden; margin-bottom: 15px;">
                <div style="width: ${progress}%; height: 100%; background: linear-gradient(90deg, var(--primary), var(--primary-dark));"></div>
            </div>
            <div style="display: flex; justify-content: space-around;">
                <div>
                    <div style="font-size: 18px; font-weight: 600; color: var(--success);">${completedTasks}</div>
                    <div style="font-size: 12px; color: var(--text-secondary);">Выполнено</div>
                </div>
                <div>
                    <div style="font-size: 18px; font-weight: 600; color: var(--warning);">${todayTasks.length - completedTasks}</div>
                    <div style="font-size: 12px; color: var(--text-secondary);">Осталось</div>
                </div>
                <div>
                    <div style="font-size: 18px; font-weight: 600; color: var(--text-primary);">${todayTasks.length}</div>
                    <div style="font-size: 12px; color: var(--text-secondary);">Всего</div>
                </div>
            </div>
        </div>
    `;
}

// СФЕРЫ ЖИЗНИ
function loadSpheres() {
    const container = document.getElementById('spheres-container');
    const subsection = document.getElementById('sphere-subsection');
    
    subsection.style.display = 'none';
    container.style.display = 'grid';
    
    let html = '';
    spheres.forEach(sphere => {
        const sphereData = currentUser.spheres[sphere.id] || { goals: [], progress: 0 };
        const tasksCount = currentUser.tasks.filter(task => task.sphere === sphere.id).length;
        const completedCount = currentUser.tasks.filter(task => task.sphere === sphere.id && task.completed).length;
        const progress = tasksCount > 0 ? Math.round((completedCount / tasksCount) * 100) : 0;
        
        html += `
            <div class="sphere-card ${sphere.id}" onclick="showSphereSubsection('${sphere.id}')">
                <div class="sphere-icon">${sphere.icon}</div>
                <div class="sphere-name">${sphere.name}</div>
                <div class="sphere-count">${tasksCount}</div>
                <div class="sphere-progress">
                    <div class="sphere-progress-text">Прогресс: ${progress}%</div>
                    <div class="sphere-progress-bar">
                        <div class="sphere-progress-fill" style="width: ${progress}%; background: ${sphere.color};"></div>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function showSphereSubsection(sphereId) {
    const sphere = spheres.find(s => s.id === sphereId);
    selectedSphere = sphereId;
    
    const container = document.getElementById('spheres-container');
    const subsection = document.getElementById('sphere-subsection');
    
    container.style.display = 'none';
    subsection.style.display = 'block';
    
    subsection.innerHTML = `
        <div style="margin-bottom: 20px;">
            <button class="btn" onclick="backToSpheresGrid()" style="margin-bottom: 20px; width: 100%;">
                <i class="fas fa-arrow-left"></i> Назад к сферам
            </button>
            
            <div class="subsection-header">
                <div style="width: 20px; height: 20px; border-radius: 50%; background: ${sphere.color};"></div>
                <div class="subsection-title">${sphere.name}</div>
            </div>
            
            <div class="subsection-tabs">
                ${sphere.subsections.map((sub, index) => `
                    <button class="subsection-tab ${index === 0 ? 'active' : ''}" 
                            onclick="showSphereTab('${sphereId}', '${sub}')">
                        ${sub}
                    </button>
                `).join('')}
            </div>
            
            <div class="subsection-content" id="sphere-content-${sphereId}">
                ${getSphereContent(sphereId, sphere.subsections[0])}
            </div>
        </div>
    `;
}

function backToSpheresGrid() {
    selectedSphere = null;
    const container = document.getElementById('spheres-container');
    const subsection = document.getElementById('sphere-subsection');
    
    container.style.display = 'grid';
    subsection.style.display = 'none';
    loadSpheres();
}

function showSphereTab(sphereId, tabName) {
    const tabs = document.querySelectorAll(`#sphere-subsection .subsection-tab`);
    tabs.forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');
    
    const content = document.getElementById(`sphere-content-${sphereId}`);
    content.innerHTML = getSphereContent(sphereId, tabName);
}

function getSphereContent(sphereId, tabName) {
    switch(sphereId) {
        case 'finance':
            return getFinanceContent(tabName);
        case 'health':
            return getHealthContent(tabName);
        case 'study':
            return getStudyContent(tabName);
        case 'spirituality':
            return getSpiritualityContent(tabName);
        default:
            return getDefaultContent(sphereId, tabName);
    }
}

// ФИНАНСЫ
function getFinanceContent(tabName) {
    let html = '';
    
    switch(tabName) {
        case 'Доходы':
            html = `
                <div style="margin-bottom: 20px;">
                    <button class="btn btn-primary" onclick="openFinanceModal('income')" style="width: 100%;">
                        <i class="fas fa-plus-circle"></i> Добавить доход
                    </button>
                </div>
                
                <div class="record-list">
                    ${currentUser.financialData.income.map(income => `
                        <div class="record-item">
                            <div class="record-info">
                                <div class="record-amount record-income">+${income.amount.toLocaleString()} ₽</div>
                                <div class="record-description">${income.description}</div>
                                <div class="record-date">${income.date} • ${income.category}</div>
                            </div>
                            <div class="record-actions">
                                <button class="btn" onclick="editFinanceRecord('income', '${income.id}')" style="padding: 5px 10px;">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </div>
                        </div>
                    `).join('')}
                    
                    ${currentUser.financialData.income.length === 0 ? `
                        <div style="text-align: center; padding: 40px 20px; color: var(--text-secondary);">
                            <i class="fas fa-money-bill-wave" style="font-size: 40px; margin-bottom: 15px; opacity: 0.5;"></i>
                            <p>Нет записей о доходах</p>
                        </div>
                    ` : ''}
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background: var(--success-light); border-radius: 12px; text-align: center;">
                    <div style="font-size: 12px; color: var(--text-secondary);">Общая сумма доходов</div>
                    <div style="font-size: 24px; font-weight: 700; color: var(--success);">
                        ${currentUser.financialData.income.reduce((sum, item) => sum + item.amount, 0).toLocaleString()} ₽
                    </div>
                </div>
            `;
            break;
            
        case 'Расходы':
            html = `
                <div style="margin-bottom: 20px;">
                    <button class="btn btn-primary" onclick="openFinanceModal('expense')" style="width: 100%;">
                        <i class="fas fa-minus-circle"></i> Добавить расход
                    </button>
                </div>
                
                <div class="record-list">
                    ${currentUser.financialData.expenses.map(expense => `
                        <div class="record-item">
                            <div class="record-info">
                                <div class="record-amount record-expense">-${expense.amount.toLocaleString()} ₽</div>
                                <div class="record-description">${expense.description}</div>
                                <div class="record-date">${expense.date} • ${expense.category}</div>
                            </div>
                            <div class="record-actions">
                                <button class="btn" onclick="editFinanceRecord('expense', '${expense.id}')" style="padding: 5px 10px;">
                                    <i class="fas fa-edit"></i>
                                </button>
                            </div>
                        </div>
                    `).join('')}
                    
                    ${currentUser.financialData.expenses.length === 0 ? `
                        <div style="text-align: center; padding: 40px 20px; color: var(--text-secondary);">
                            <i class="fas fa-shopping-cart" style="font-size: 40px; margin-bottom: 15px; opacity: 0.5;"></i>
                            <p>Нет записей о расходах</p>
                        </div>
                    ` : ''}
                </div>
                
                <div style="margin-top: 20px; padding: 15px; background: var(--danger-light); border-radius: 12px; text-align: center;">
                    <div style="font-size: 12px; color: var(--text-secondary);">Общая сумма расходов</div>
                    <div style="font-size: 24px; font-weight: 700; color: var(--danger);">
                        ${currentUser.financialData.expenses.reduce((sum, item) => sum + item.amount, 0).toLocaleString()} ₽
                    </div>
                </div>
            `;
            break;
            
        case 'Капитал':
            const totalIncome = currentUser.financialData.income.reduce((sum, item) => sum + item.amount, 0);
            const totalExpenses = currentUser.financialData.expenses.reduce((sum, item) => sum + item.amount, 0);
            const currentCapital = currentUser.financialData.capital;
            const initialCapital = currentUser.financialData.initialCapital || 0;
            const calculatedCapital = initialCapital + totalIncome - totalExpenses;
            
            html = `
                <div style="margin-bottom: 20px;">
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 20px;">
                        <div style="padding: 15px; background: var(--success-light); border-radius: 12px; text-align: center;">
                            <div style="font-size: 12px; color: var(--text-secondary);">Начальный капитал</div>
                            <div style="font-size: 20px; font-weight: 700; color: var(--success);">
                                ${initialCapital.toLocaleString()} ₽
                            </div>
                        </div>
                        <div style="padding: 15px; background: var(--gray-lighter); border-radius: 12px; text-align: center;">
                            <div style="font-size: 12px; color: var(--text-secondary);">Текущий капитал</div>
                            <div style="font-size: 20px; font-weight: 700; color: var(--primary);">
                                ${calculatedCapital.toLocaleString()} ₽
                            </div>
                        </div>
                    </div>
                    
                    <div style="margin-bottom: 20px;">
                        <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 10px;">Источник капитала</div>
                        <div style="display: flex; gap: 10px;">
                            <button class="btn" style="flex: 1; background: var(--success-light); color: var(--success);" 
                                    onclick="addToCapital('income')">
                                <i class="fas fa-plus"></i> Добавить
                            </button>
                            <button class="btn" style="flex: 1; background: var(--danger-light); color: var(--danger);" 
                                    onclick="addToCapital('expense')">
                                <i class="fas fa-minus"></i> Снять
                            </button>
                        </div>
                    </div>
                    
                    <div style="background: var(--gray-lighter); padding: 15px; border-radius: 12px;">
                        <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 10px;">Как рассчитывается?</div>
                        <div style="font-size: 12px; color: var(--text-muted);">
                            Капитал = Начальный капитал + Все доходы - Все расходы
                        </div>
                    </div>
                </div>
            `;
            break;
            
        case 'Копилка':
            html = `
                <div style="text-align: center; padding: 20px 0;">
                    <div style="font-size: 48px; margin-bottom: 20px;">💰</div>
                    <div style="font-size: 32px; font-weight: 700; color: var(--primary); margin-bottom: 20px;">
                        ${currentUser.financialData.savings?.toLocaleString() || 0} ₽
                    </div>
                    <div style="color: var(--text-secondary); margin-bottom: 30px;">
                        Накопления на цели
                    </div>
                    
                    <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                        <button class="btn" style="flex: 1; background: var(--success-light); color: var(--success);" 
                                onclick="updateSavings('add')">
                            <i class="fas fa-plus"></i> Пополнить
                        </button>
                        <button class="btn" style="flex: 1; background: var(--danger-light); color: var(--danger);" 
                                onclick="updateSavings('withdraw')">
                            <i class="fas fa-minus"></i> Снять
                        </button>
                    </div>
                    
                    <div style="background: var(--gray-lighter); padding: 15px; border-radius: 12px; text-align: left;">
                        <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 10px;">Цели копилки</div>
                        <div style="font-size: 12px; color: var(--text-muted);">
                            - Новый телефон (50 000 ₽)<br>
                            - Отпуск (100 000 ₽)<br>
                            - Инвестиции (200 000 ₽)
                        </div>
                    </div>
                </div>
            `;
            break;
            
        case 'Инвестиции':
            html = `
                <div style="text-align: center; padding: 20px 0;">
                    <div style="font-size: 48px; margin-bottom: 20px;">📈</div>
                    <div style="font-size: 32px; font-weight: 700; color: var(--primary); margin-bottom: 20px;">
                        ${currentUser.financialData.investments.reduce((sum, item) => sum + item.amount, 0).toLocaleString()} ₽
                    </div>
                    <div style="color: var(--text-secondary); margin-bottom: 30px;">
                        Общая сумма инвестиций
                    </div>
                    
                    <button class="btn btn-primary" onclick="openInvestmentModal()" style="width: 100%; margin-bottom: 20px;">
                        <i class="fas fa-plus-circle"></i> Добавить инвестицию
                    </button>
                    
                    <div class="record-list">
                        ${currentUser.financialData.investments.map(investment => `
                            <div class="record-item">
                                <div class="record-info">
                                    <div class="record-amount record-income">+${investment.amount.toLocaleString()} ₽</div>
                                    <div class="record-description">${investment.description}</div>
                                    <div class="record-date">${investment.date} • ${investment.type}</div>
                                </div>
                            </div>
                        `).join('')}
                        
                        ${currentUser.financialData.investments.length === 0 ? `
                            <div style="text-align: center; padding: 20px; color: var(--text-secondary);">
                                <i class="fas fa-chart-line" style="font-size: 30px; margin-bottom: 10px; opacity: 0.5;"></i>
                                <p>Нет записей об инвестициях</p>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
            break;
    }
    
    return html;
}

function openFinanceModal(type) {
    const modal = document.getElementById('finance-modal');
    const title = document.getElementById('finance-modal-title');
    const content = document.getElementById('finance-modal-content');
    
    let html = '';
    
    switch(type) {
        case 'income':
            title.textContent = 'Добавить доход';
            html = `
                <div class="form-group">
                    <label class="form-label">Сумма (₽)</label>
                    <input type="number" id="finance-amount" class="form-control" placeholder="1000" min="0" step="100">
                </div>
                <div class="form-group">
                    <label class="form-label">Описание</label>
                    <input type="text" id="finance-description" class="form-control" placeholder="Например: Зарплата">
                </div>
                <div class="form-group">
                    <label class="form-label">Категория</label>
                    <select id="finance-category" class="form-control form-select">
                        <option value="работа">Работа</option>
                        <option value="фриланс">Фриланс</option>
                        <option value="инвестиции">Инвестиции</option>
                        <option value="подарок">Подарок</option>
                        <option value="другое">Другое</option>
                    </select>
                </div>
                <div style="display: flex; gap: 10px; margin-top: 20px;">
                    <button class="btn btn-primary" style="flex: 1;" onclick="saveFinanceRecord('income')">
                        <i class="fas fa-save"></i> Сохранить
                    </button>
                    <button class="btn" style="flex: 1; background: var(--gray-light);" onclick="closeModal('finance-modal')">
                        Отмена
                    </button>
                </div>
            `;
            break;
            
        case 'expense':
            title.textContent = 'Добавить расход';
            html = `
                <div class="form-group">
                    <label class="form-label">Сумма (₽)</label>
                    <input type="number" id="finance-amount" class="form-control" placeholder="1000" min="0" step="100">
                </div>
                <div class="form-group">
                    <label class="form-label">Описание</label>
                    <input type="text" id="finance-description" class="form-control" placeholder="Например: Продукты">
                </div>
                <div class="form-group">
                    <label class="form-label">Категория</label>
                    <select id="finance-category" class="form-control form-select">
                        <option value="еда">Еда</option>
                        <option value="транспорт">Транспорт</option>
                        <option value="жилье">Жилье</option>
                        <option value="развлечения">Развлечения</option>
                        <option value="здоровье">Здоровье</option>
                        <option value="другое">Другое</option>
                    </select>
                </div>
                <div style="display: flex; gap: 10px; margin-top: 20px;">
                    <button class="btn btn-primary" style="flex: 1;" onclick="saveFinanceRecord('expense')">
                        <i class="fas fa-save"></i> Сохранить
                    </button>
                    <button class="btn" style="flex: 1; background: var(--gray-light);" onclick="closeModal('finance-modal')">
                        Отмена
                    </button>
                </div>
            `;
            break;
    }
    
    content.innerHTML = html;
    modal.classList.add('active');
}

function saveFinanceRecord(type) {
    const amount = parseFloat(document.getElementById('finance-amount').value);
    const description = document.getElementById('finance-description').value.trim();
    const category = document.getElementById('finance-category').value;
    const today = new Date().toISOString().split('T')[0];
    
    if (!amount || amount <= 0 || !description) {
        showNotification('Заполните все поля правильно', 'error');
        return;
    }
    
    const record = {
        id: Date.now().toString(),
        amount: amount,
        description: description,
        date: today,
        category: category
    };
    
    if (type === 'income') {
        currentUser.financialData.income.push(record);
        currentUser.financialData.wallet += amount;
        
        // Проверяем обучение
        if (description === "Добавить первый доход") {
            completeLearningTask(2);
        }
    } else {
        currentUser.financialData.expenses.push(record);
        currentUser.financialData.wallet -= amount;
    }
    
    // Обновляем капитал
    updateCapital();
    
    saveUserData();
    closeModal('finance-modal');
    
    if (selectedSphere === 'finance') {
        showSphereSubsection('finance');
    }
    
    updateStats();
    showNotification(type === 'income' ? 'Доход добавлен' : 'Расход добавлен', 'success');
}
function openInvestmentModal() {
    const modal = document.getElementById('finance-modal');
    const title = document.getElementById('finance-modal-title');
    const content = document.getElementById('finance-modal-content');
    
    title.textContent = 'Добавить инвестицию';
    html = `
        <div class="form-group">
            <label class="form-label">Сумма (₽)</label>
            <input type="number" id="investment-amount" class="form-control" placeholder="10000" min="0" step="1000">
        </div>
        <div class="form-group">
            <label class="form-label">Описание</label>
            <input type="text" id="investment-description" class="form-control" placeholder="Например: Акции Сбербанка">
        </div>
        <div class="form-group">
            <label class="form-label">Тип инвестиции</label>
            <select id="investment-type" class="form-control form-select">
                <option value="акции">Акции</option>
                <option value="облигации">Облигации</option>
                <option value="фонды">Фонды</option>
                <option value="криптовалюта">Криптовалюта</option>
                <option value="недвижимость">Недвижимость</option>
                <option value="другое">Другое</option>
            </select>
        </div>
        <div style="display: flex; gap: 10px; margin-top: 20px;">
            <button class="btn btn-primary" style="flex: 1;" onclick="saveInvestment()">
                <i class="fas fa-save"></i> Сохранить
            </button>
            <button class="btn" style="flex: 1; background: var(--gray-light);" onclick="closeModal('finance-modal')">
                Отмена
            </button>
        </div>
    `;
    
    content.innerHTML = html;
    modal.classList.add('active');
}

function saveInvestment() {
    const amount = parseFloat(document.getElementById('investment-amount').value);
    const description = document.getElementById('investment-description').value.trim();
    const type = document.getElementById('investment-type').value;
    const today = new Date().toISOString().split('T')[0];
    
    if (!amount || amount <= 0 || !description) {
        showNotification('Заполните все поля правильно', 'error');
        return;
    }
    
    const investment = {
        id: Date.now().toString(),
        amount: amount,
        description: description,
        date: today,
        type: type
    };
    
    currentUser.financialData.investments.push(investment);
    
    saveUserData();
    closeModal('finance-modal');
    
    if (selectedSphere === 'finance') {
        showSphereSubsection('finance');
    }
    
    updateStats();
    showNotification('Инвестиция добавлена', 'success');
}

function updateCapital() {
    const totalIncome = currentUser.financialData.income.reduce((sum, item) => sum + item.amount, 0);
    const totalExpenses = currentUser.financialData.expenses.reduce((sum, item) => sum + item.amount, 0);
    const initialCapital = currentUser.financeExtended.initialCapital || 0;
    
    currentUser.financialData.capital = initialCapital + totalIncome - totalExpenses;
    saveUserData();
}

function addToCapital(type) {
    const amount = parseFloat(prompt(`Введите сумму для ${type === 'income' ? 'пополнения' : 'снятия'} капитала:`));
    if (!amount || isNaN(amount) || amount <= 0) {
        showNotification('Неверная сумма', 'error');
        return;
    }
    
    if (type === 'income') {
        currentUser.financialData.initialCapital += amount;
    } else {
        if (currentUser.financialData.initialCapital < amount) {
            showNotification('Недостаточно средств', 'error');
            return;
        }
        currentUser.financialData.initialCapital -= amount;
    }
    
    // Пересчитываем общий капитал
    updateCapital();
    saveUserData();
    
    if (selectedSphere === 'finance') {
        showSphereSubsection('finance');
    }
    
    updateStats();
    showNotification(`Капитал ${type === 'income' ? 'пополнен' : 'уменьшен'} на ${amount.toLocaleString()} ₽`, 'success');
}

function updateCapital() {
    const totalIncome = currentUser.financialData.income.reduce((sum, item) => sum + item.amount, 0);
    const totalExpenses = currentUser.financialData.expenses.reduce((sum, item) => sum + item.amount, 0);
    const initialCapital = currentUser.financialData.initialCapital || 0;
    
    currentUser.financialData.capital = initialCapital + totalIncome - totalExpenses;
    saveUserData();
}

function updateSavings(action) {
    const amount = parseFloat(prompt(`Введите сумму для ${action === 'add' ? 'пополнения' : 'снятия'} копилки:`));
    if (!amount || isNaN(amount) || amount <= 0) {
        showNotification('Неверная сумма', 'error');
        return;
    }
    
    if (action === 'add') {
        currentUser.financialData.savings += amount;
    } else {
        if (currentUser.financialData.savings < amount) {
            showNotification('Недостаточно средств в копилке', 'error');
            return;
        }
        currentUser.financialData.savings -= amount;
    }
    
    saveUserData();
    
    if (selectedSphere === 'finance') {
        showSphereSubsection('finance');
    }
    
    showNotification(`Копилка ${action === 'add' ? 'пополнена' : 'уменьшена'} на ${amount.toLocaleString()} ₽`, 'success');
}

function updateSavings(action) {
    const amount = prompt(`Введите сумму для ${action === 'add' ? 'пополнения' : 'снятия'} копилки:`);
    if (!amount || isNaN(amount) || amount <= 0) return;
    
    if (action === 'add') {
        currentUser.financeExtended.savings += parseFloat(amount);
    } else {
        if (currentUser.financeExtended.savings < amount) {
            showNotification('Недостаточно средств в копилке', 'error');
            return;
        }
        currentUser.financeExtended.savings -= parseFloat(amount);
    }
    
    saveUserData();
    
    if (selectedSphere === 'finance') {
        showSphereSubsection('finance');
    }
    
    showNotification(`Копилка ${action === 'add' ? 'пополнена' : 'уменьшена'} на ${amount} ₽`, 'success');
}

// ЗДОРОВЬЕ
function getHealthContent(tabName) {
    let html = '';
    
    switch(tabName) {
        case 'Метрики':
            html = `
                <div style="margin-bottom: 20px;">
                    <button class="btn btn-primary" onclick="openHealthModal('metric')" style="width: 100%;">
                        <i class="fas fa-plus-circle"></i> Добавить показатель
                    </button>
                </div>
                
                <div class="record-list">
                    ${currentUser.healthExtended.metrics?.map(metric => `
                        <div class="record-item">
                            <div class="record-info">
                                <div class="record-amount" style="color: var(--health);">${metric.value} ${metric.unit}</div>
                                <div class="record-description">${metric.type}</div>
                                <div class="record-date">${metric.date}</div>
                            </div>
                        </div>
                    `).join('') || ''}
                    
                    ${(!currentUser.healthExtended.metrics || currentUser.healthExtended.metrics.length === 0) ? `
                        <div style="text-align: center; padding: 40px 20px; color: var(--text-secondary);">
                            <i class="fas fa-heartbeat" style="font-size: 40px; margin-bottom: 15px; opacity: 0.5;"></i>
                            <p>Нет записей о показателях здоровья</p>
                        </div>
                    ` : ''}
                </div>
                
                <div style="margin-top: 20px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
                    <div style="padding: 15px; background: var(--health-light); border-radius: 12px; text-align: center;">
                        <div style="font-size: 12px; color: var(--text-secondary);">Вес</div>
                        <div style="font-size: 20px; font-weight: 700; color: var(--health);">
                            ${getLatestMetric('вес') || '—'}
                        </div>
                    </div>
                    <div style="padding: 15px; background: var(--health-light); border-radius: 12px; text-align: center;">
                        <div style="font-size: 12px; color: var(--text-secondary);">Шаги</div>
                        <div style="font-size: 20px; font-weight: 700; color: var(--health);">
                            ${getLatestMetric('шаги') || '—'}
                        </div>
                    </div>
                </div>
            `;
            break;
            
        case 'Привычки':
            html = `
                <div style="margin-bottom: 20px;">
                    <button class="btn btn-primary" onclick="openHealthModal('habit')" style="width: 100%;">
                        <i class="fas fa-plus-circle"></i> Добавить привычку
                    </button>
                </div>
                
                <div class="record-list">
                    ${currentUser.healthExtended.habits?.map(habit => `
                        <div class="record-item">
                            <div class="record-info">
                                <div class="record-description">${habit.name}</div>
                                <div class="record-date">${habit.current}/${habit.target} ${habit.unit}</div>
                            </div>
                            <div class="record-actions">
                                <button class="btn" onclick="updateHabit('${habit.id}', 'plus')" style="padding: 5px 10px;">
                                    <i class="fas fa-plus"></i>
                                </button>
                                <button class="btn" onclick="updateHabit('${habit.id}', 'minus')" style="padding: 5px 10px;">
                                    <i class="fas fa-minus"></i>
                                </button>
                            </div>
                        </div>
                    `).join('') || ''}
                </div>
            `;
            break;
    }
    
    return html;
}

function getLatestMetric(type) {
    if (!currentUser.healthExtended.metrics) return null;
    const metric = currentUser.healthExtended.metrics
        .filter(m => m.type === type)
        .sort((a, b) => new Date(b.date) - new Date(a.date))[0];
    
    return metric ? `${metric.value} ${metric.unit}` : null;
}

// УЧЕБА
function getStudyContent(tabName) {
    let html = '';
    
    switch(tabName) {
        case 'Курсы':
            html = `
                <div style="margin-bottom: 20px;">
                    <button class="btn btn-primary" onclick="openStudyModal('course')" style="width: 100%;">
                        <i class="fas fa-plus-circle"></i> Добавить курс
                    </button>
                </div>
                
                <div class="record-list">
                    ${currentUser.studyExtended.coursesProgress?.map(course => `
                        <div class="record-item">
                            <div class="record-info">
                                <div class="record-description">${course.name}</div>
                                <div class="record-date">
                                    <div style="display: flex; align-items: center; gap: 10px;">
                                        <div style="flex: 1; height: 6px; background: var(--gray-light); border-radius: 3px; overflow: hidden;">
                                            <div style="width: ${course.progress}%; height: 100%; background: var(--study);"></div>
                                        </div>
                                        <span>${course.progress}%</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('') || ''}
                </div>
            `;
            break;
    }
    
    return html;
}

// ДУХОВНОСТЬ
function getSpiritualityContent(tabName) {
    let html = '';
    
    switch(tabName) {
        case 'Благодарность':
            html = `
                <div style="margin-bottom: 20px;">
                    <button class="btn btn-primary" onclick="addGratitude()" style="width: 100%;">
                        <i class="fas fa-plus-circle"></i> Добавить благодарность
                    </button>
                </div>
                
                <div class="record-list">
                    ${currentUser.spiritualityData.gratitude?.map((item, index) => `
                        <div class="record-item">
                            <div class="record-info">
                                <div class="record-description">${item.text}</div>
                                <div class="record-date">${item.date}</div>
                            </div>
                        </div>
                    `).join('') || ''}
                </div>
            `;
            break;
    }
    
    return html;
}

function getDefaultContent(sphereId, tabName) {
    return `
        <div style="text-align: center; padding: 40px 20px; color: var(--text-secondary);">
            <i class="fas fa-cogs" style="font-size: 40px; margin-bottom: 15px; opacity: 0.5;"></i>
            <p>Раздел "${tabName}" в разработке</p>
            <p style="font-size: 14px; margin-top: 10px;">
                Эта функция будет добавлена в следующем обновлении
            </p>
        </div>
    `;
}

// СТАТИСТИКА
function updateStats() {
    const totalTasks = currentUser.tasks.length;
    const completedTasks = currentUser.tasks.filter(task => task.completed).length;
    
    const totalIncome = currentUser.financialData.income.reduce((sum, item) => sum + item.amount, 0);
    const totalExpenses = currentUser.financialData.expenses.reduce((sum, item) => sum + item.amount, 0);
    const balance = totalIncome - totalExpenses;
    
    document.getElementById('total-tasks').textContent = totalTasks;
    document.getElementById('completed-tasks').textContent = completedTasks;
    document.getElementById('total-income').textContent = totalIncome.toLocaleString() + ' ₽';
    document.getElementById('total-expenses').textContent = totalExpenses.toLocaleString() + ' ₽';
    document.getElementById('current-capital').textContent = currentUser.financialData.capital.toLocaleString() + ' ₽';
    document.getElementById('balance').textContent = balance.toLocaleString() + ' ₽';
    
    updateCharts();
}

function updateCharts() {
    // Активность
    const ctx = document.getElementById('activity-chart');
    if (!ctx) return;
    
    if (activityChart) {
        activityChart.destroy();
    }
    
    const labels = [];
    const data = [];
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];
        
        const dayName = date.toLocaleDateString('ru-RU', { weekday: 'short' });
        labels.push(dayName.charAt(0).toUpperCase() + dayName.slice(1));
        
        const tasksForDay = currentUser.tasks.filter(task => task.date === dateStr && task.completed);
        data.push(tasksForDay.length);
    }
    
    activityChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Выполненные задачи',
                data: data,
                backgroundColor: '#4361ee',
                borderColor: '#3a0ca3',
                borderWidth: 1,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                }
            }
        }
    });
    
    // Расходы
    const expensesCtx = document.getElementById('expenses-chart');
    if (!expensesCtx) return;
    
    if (expensesChart) {
        expensesChart.destroy();
    }
    
    // Группируем расходы по категориям
    const expensesByCategory = {};
    currentUser.financialData.expenses.forEach(expense => {
        if (!expensesByCategory[expense.category]) {
            expensesByCategory[expense.category] = 0;
        }
        expensesByCategory[expense.category] += expense.amount;
    });
    
    const expenseCategories = Object.keys(expensesByCategory);
    const expenseData = Object.values(expensesByCategory);
    const expenseColors = ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];
    
    expensesChart = new Chart(expensesCtx, {
        type: 'doughnut',
        data: {
            labels: expenseCategories,
            datasets: [{
                data: expenseData,
                backgroundColor: expenseColors,
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

// ДЕРЕВО РАЗВИТИЯ
function loadTree() {
    updateTreeVisualization();
    loadTreeQuests();
    loadHabitsTracker();
    updateTreeProgress();
}

function updateTreeVisualization() {
    const container = document.getElementById('tree-visualization');
    
    let html = '<div class="tree-center">Вы</div>';
    
    // Создаем 8 веток (по количеству сфер)
    spheres.forEach((sphere, index) => {
        const branchData = currentUser.tree.branches[sphere.id] || { unlocked: 1, total: 5 };
        const maxNodes = 5; // Показываем только 5 уровней
        
        html += `
            <div class="tree-branch branch-${index}">
                <div class="branch-line" style="background: ${sphere.color}; opacity: 0.3;"></div>
                <div class="branch-nodes">
        `;
        
        // Создаем узлы (уровни) для ветки
        for (let i = 0; i < maxNodes; i++) {
            const level = i + 1;
            const isUnlocked = level <= branchData.unlocked;
            const isCurrent = level === branchData.unlocked;
            
            html += `
                <div class="tree-node ${isUnlocked ? 'unlocked' : 'locked'} ${isCurrent ? 'current' : ''}"
                     title="${sphere.name} - Уровень ${level}"
                     style="${isUnlocked ? `background: ${sphere.color};` : ''}">
                    ${level}
                </div>
            `;
        }
        
        html += `
                    <div class="branch-label">${sphere.name}</div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    
    // Обновляем уровень
    document.getElementById('tree-level').textContent = currentUser.tree.level;
}

function updateTreeProgress() {
    const expForNextLevel = currentUser.tree.level * 100;
    const progress = Math.min((currentUser.tree.experience / expForNextLevel) * 100, 100);
    
    document.getElementById('tree-progress-fill').style.width = progress + '%';
    document.getElementById('tree-progress-text').textContent = 
        `${currentUser.tree.experience}/${expForNextLevel} опыта`;
}

function loadTreeQuests() {
    const container = document.getElementById('tree-quests-list');
    
    if (!currentUser.tree.quests || currentUser.tree.quests.length === 0) {
        createInitialQuests();
    }
    
    let html = '';
    currentUser.tree.quests.forEach((quest, index) => {
        html += `
            <div class="quest-item">
                <input type="checkbox" class="quest-checkbox" ${quest.completed ? 'checked' : ''} 
                       onclick="toggleQuestCompletion(${index})">
                <div class="quest-info">
                    <div class="quest-title">${quest.title}</div>
                    <div class="quest-description">${quest.description}</div>
                </div>
                <div class="quest-reward">+${quest.reward} XP</div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function createInitialQuests() {
    currentUser.tree.quests = [
        {
            id: 1,
            title: "Создать первую задачу",
            description: "Добавьте задачу в любую сферу",
            sphere: "all",
            type: "create_task",
            target: 1,
            progress: 0,
            completed: false,
            reward: 50
        },
        {
            id: 2,
            title: "Добавить доход",
            description: "Зафиксируйте свой первый доход",
            sphere: "finance",
            type: "add_income",
            target: 1,
            progress: 0,
            completed: false,
            reward: 50
        },
        {
            id: 3,
            title: "Выполнить 3 задачи",
            description: "Отметьте 3 задачи как выполненные",
            sphere: "all",
            type: "complete_task",
            target: 3,
            progress: 0,
            completed: false,
            reward: 100
        },
        {
            id: 4,
            title: "Добавить показатель здоровья",
            description: "Запишите свой вес или количество шагов",
            sphere: "health",
            type: "add_metric",
            target: 1,
            progress: 0,
            completed: false,
            reward: 75
        }
    ];
    saveUserData();
}

function toggleQuestCompletion(index) {
    const quest = currentUser.tree.quests[index];
    if (quest && !quest.completed) {
        quest.completed = true;
        currentUser.tree.experience += quest.reward;
        
        // Проверяем уровень
        checkLevelUp();
        
        saveUserData();
        loadTree();
        showNotification(`Задание выполнено! +${quest.reward} XP`, 'success');
    }
}

function checkLevelUp() {
    const expNeeded = currentUser.tree.level * 100;
    if (currentUser.tree.experience >= expNeeded) {
        currentUser.tree.level++;
        currentUser.tree.experience = currentUser.tree.experience - expNeeded;
        
        // Разблокируем новые уровни во всех ветках
        spheres.forEach(sphere => {
            if (currentUser.tree.branches[sphere.id]) {
                if (currentUser.tree.branches[sphere.id].unlocked < currentUser.tree.level) {
                    currentUser.tree.branches[sphere.id].unlocked = currentUser.tree.level;
                }
            }
        });
        
        saveUserData();
        loadTree();
        showNotification(`Поздравляем! Вы достигли уровня ${currentUser.tree.level}!`, 'success');
    }
}

function loadHabitsTracker() {
    const container = document.getElementById('habits-list');
    
    if (!currentUser.tree.habits || currentUser.tree.habits.length === 0) {
        createInitialHabits();
    }
    
    let html = '';
    currentUser.tree.habits.forEach((habit, index) => {
        html += `
            <div class="habit-item">
                <div class="habit-icon">${habit.icon}</div>
                <div class="habit-name">${habit.name}</div>
                <div class="habit-streak">${habit.streak} дней</div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function createInitialHabits() {
    currentUser.tree.habits = [
        {
            id: 1,
            name: "Пить воду",
            icon: "💧",
            target: 8,
            unit: "стаканов",
            streak: 0,
            maxStreak: 0,
            history: []
        },
        {
            id: 2,
            name: "Зарядка",
            icon: "💪",
            target: 1,
            unit: "раз",
            streak: 0,
            maxStreak: 0,
            history: []
        },
        {
            id: 3,
            name: "Чтение",
            icon: "📚",
            target: 30,
            unit: "минут",
            streak: 0,
            maxStreak: 0,
            history: []
        },
        {
            id: 4,
            name: "Медитация",
            icon: "🧘",
            target: 10,
            unit: "минут",
            streak: 0,
            maxStreak: 0,
            history: []
        }
    ];
    saveUserData();
}

function updateTreeAfterAction(action, data) {
    // Обновляем прогресс в заданиях
    currentUser.tree.quests.forEach(quest => {
        if (!quest.completed && quest.sphere === data.sphere) {
            switch(quest.type) {
                case 'create_task':
                    quest.progress++;
                    if (quest.progress >= quest.target) {
                        quest.completed = true;
                        currentUser.tree.experience += quest.reward;
                    }
                    break;
                case 'complete_task':
                    if (action === 'task_completed') {
                        quest.progress++;
                        if (quest.progress >= quest.target) {
                            quest.completed = true;
                            currentUser.tree.experience += quest.reward;
                        }
                    }
                    break;
                case 'add_income':
                    if (action === 'income_added') {
                        quest.progress++;
                        if (quest.progress >= quest.target) {
                            quest.completed = true;
                            currentUser.tree.experience += quest.reward;
                        }
                    }
                    break;
            }
        }
    });
    
    // Проверяем повышение уровня
    checkLevelUp();
    
    saveUserData();
    
    // Обновляем отображение дерева
    if (document.getElementById('tree-section').classList.contains('active')) {
        loadTree();
    }
}

// ОБУЧЕНИЕ
function checkLearningTasks() {
    // Проверяем, все ли обучающие задачи выполнены
    const allCompleted = currentUser.learning.completedTasks.every(task => task);
    
    if (allCompleted && currentUser.tree.level === 1) {
        // Повышаем до 2 уровня
        currentUser.tree.level = 2;
        currentUser.tree.experience = 100;
        
        // Разблокируем 2 уровень во всех ветках
        spheres.forEach(sphere => {
            if (currentUser.tree.branches[sphere.id]) {
                currentUser.tree.branches[sphere.id].unlocked = 2;
            }
        });
        
        saveUserData();
        loadTree();
        
        showNotification('🎉 Поздравляем! Вы достигли 2 уровня! Открыты новые возможности!', 'success');
    }
}

function completeLearningTask(index) {
    if (index >= 0 && index < 3) {
        currentUser.learning.completedTasks[index] = true;
        saveUserData();
        checkLearningTasks();
    }
}

// РЕЙТИНГ И ПОДПИСКА
function showRatingModal() {
    const modal = document.getElementById('rating-modal');
    const stars = modal.querySelectorAll('.rating-star');
    
    // Подсвечиваем звезды в зависимости от текущей оценки
    stars.forEach(star => {
        const value = parseInt(star.getAttribute('data-value'));
        if (value <= currentUser.appRating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
    
    document.getElementById('current-rating').textContent = currentUser.appRating || 0;
    modal.classList.add('active');
}

function rateApp(rating) {
    currentUser.appRating = rating;
    saveUserData();
    
    // Обновляем отображение звезд
    const stars = document.querySelectorAll('.rating-star');
    stars.forEach(star => {
        const value = parseInt(star.getAttribute('data-value'));
        if (value <= rating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
    
    document.getElementById('user-rating').textContent = rating;
    document.getElementById('current-rating').textContent = rating;
    showNotification('Спасибо за оценку!', 'success');
}

function updateRatingDisplay() {
    const stars = document.querySelectorAll('#stats-section .rating-star');
    stars.forEach(star => {
        const value = parseInt(star.getAttribute('data-value'));
        if (value <= currentUser.appRating) {
            star.classList.add('active');
        } else {
            star.classList.remove('active');
        }
    });
    
    document.getElementById('user-rating').textContent = currentUser.appRating || 0;
}

function checkSubscriptionLimit() {
    if (currentUser.subscription.tasksCreated >= 20 && 
        !currentUser.subscription.showedModal &&
        !currentUser.subscription.subscribed) {
        
        setTimeout(() => {
            showSubscriptionModal();
        }, 1000);
    }
}

function showSubscriptionModal() {
    const modal = document.getElementById('subscription-modal');
    modal.classList.add('active');
}

function closeSubscriptionModal() {
    const modal = document.getElementById('subscription-modal');
    modal.classList.remove('active');
    
    currentUser.subscription.showedModal = true;
    saveUserData();
}

// ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
function setupEventHandlers() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
    });
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function showNotification(message, type = 'success') {
    const container = document.getElementById('notification-container');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function exportData() {
    const dataStr = JSON.stringify(currentUser, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    const exportFileDefaultName = 'life-contour-data.json';
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
    showNotification('Данные экспортированы', 'success');
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();
        
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                currentUser = data;
                saveUserData();
                showNotification('Данные импортированы', 'success');
                
                initApp();
            } catch (error) {
                showNotification('Ошибка при импорте данных', 'error');
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}
// ФУНКЦИИ РЕДАКТИРОВАНИЯ ФИНАНСОВЫХ ЗАПИСЕЙ

function editFinanceRecord(type, id) {
    let record;
    let array;
    
    if (type === 'income') {
        array = currentUser.financialData.income;
        record = array.find(item => item.id === id);
    } else if (type === 'expense') {
        array = currentUser.financialData.expenses;
        record = array.find(item => item.id === id);
    } else if (type === 'investment') {
        array = currentUser.financialData.investments;
        record = array.find(item => item.id === id);
    }
    
    if (!record) {
        showNotification('Запись не найдена', 'error');
        return;
    }
    
    const modal = document.getElementById('finance-modal');
    const title = document.getElementById('finance-modal-title');
    const content = document.getElementById('finance-modal-content');
    
    let html = '';
    
    if (type === 'income') {
        title.textContent = 'Редактировать доход';
        html = `
            <div class="form-group">
                <label class="form-label">Сумма (₽)</label>
                <input type="number" id="finance-amount" class="form-control" value="${record.amount}" min="0" step="100">
            </div>
            <div class="form-group">
                <label class="form-label">Описание</label>
                <input type="text" id="finance-description" class="form-control" value="${record.description}">
            </div>
            <div class="form-group">
                <label class="form-label">Категория</label>
                <select id="finance-category" class="form-control form-select">
                    <option value="работа" ${record.category === 'работа' ? 'selected' : ''}>Работа</option>
                    <option value="фриланс" ${record.category === 'фриланс' ? 'selected' : ''}>Фриланс</option>
                    <option value="инвестиции" ${record.category === 'инвестиции' ? 'selected' : ''}>Инвестиции</option>
                    <option value="подарок" ${record.category === 'подарок' ? 'selected' : ''}>Подарок</option>
                    <option value="другое" ${record.category === 'другое' ? 'selected' : ''}>Другое</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Дата</label>
                <input type="date" id="finance-date" class="form-control" value="${record.date}">
            </div>
        `;
    } else if (type === 'expense') {
        title.textContent = 'Редактировать расход';
        html = `
            <div class="form-group">
                <label class="form-label">Сумма (₽)</label>
                <input type="number" id="finance-amount" class="form-control" value="${record.amount}" min="0" step="100">
            </div>
            <div class="form-group">
                <label class="form-label">Описание</label>
                <input type="text" id="finance-description" class="form-control" value="${record.description}">
            </div>
            <div class="form-group">
                <label class="form-label">Категория</label>
                <select id="finance-category" class="form-control form-select">
                    <option value="еда" ${record.category === 'еда' ? 'selected' : ''}>Еда</option>
                    <option value="транспорт" ${record.category === 'транспорт' ? 'selected' : ''}>Транспорт</option>
                    <option value="жилье" ${record.category === 'жилье' ? 'selected' : ''}>Жилье</option>
                    <option value="развлечения" ${record.category === 'развлечения' ? 'selected' : ''}>Развлечения</option>
                    <option value="здоровье" ${record.category === 'здоровье' ? 'selected' : ''}>Здоровье</option>
                    <option value="другое" ${record.category === 'другое' ? 'selected' : ''}>Другое</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Дата</label>
                <input type="date" id="finance-date" class="form-control" value="${record.date}">
            </div>
        `;
    } else if (type === 'investment') {
        title.textContent = 'Редактировать инвестицию';
        html = `
            <div class="form-group">
                <label class="form-label">Сумма (₽)</label>
                <input type="number" id="finance-amount" class="form-control" value="${record.amount}" min="0" step="1000">
            </div>
            <div class="form-group">
                <label class="form-label">Описание</label>
                <input type="text" id="finance-description" class="form-control" value="${record.description}">
            </div>
            <div class="form-group">
                <label class="form-label">Тип инвестиции</label>
                <select id="finance-category" class="form-control form-select">
                    <option value="акции" ${record.type === 'акции' ? 'selected' : ''}>Акции</option>
                    <option value="облигации" ${record.type === 'облигации' ? 'selected' : ''}>Облигации</option>
                    <option value="фонды" ${record.type === 'фонды' ? 'selected' : ''}>Фонды</option>
                    <option value="криптовалюта" ${record.type === 'криптовалюта' ? 'selected' : ''}>Криптовалюта</option>
                    <option value="недвижимость" ${record.type === 'недвижимость' ? 'selected' : ''}>Недвижимость</option>
                    <option value="другое" ${record.type === 'другое' ? 'selected' : ''}>Другое</option>
                </select>
            </div>
            <div class="form-group">
                <label class="form-label">Дата</label>
                <input type="date" id="finance-date" class="form-control" value="${record.date}">
            </div>
        `;
    }
    
    html += `
        <input type="hidden" id="finance-record-type" value="${type}">
        <input type="hidden" id="finance-record-id" value="${id}">
        
        <div style="display: flex; gap: 10px; margin-top: 20px;">
            <button class="btn btn-primary" style="flex: 1;" onclick="saveEditedFinanceRecord()">
                <i class="fas fa-save"></i> Сохранить изменения
            </button>
            <button class="btn" style="flex: 1; background: var(--danger); color: white;" onclick="deleteFinanceRecord('${type}', '${id}')">
                <i class="fas fa-trash"></i> Удалить
            </button>
            <button class="btn" style="flex: 1; background: var(--gray-light);" onclick="closeModal('finance-modal')">
                Отмена
            </button>
        </div>
    `;
    
    content.innerHTML = html;
    modal.classList.add('active');
}

function saveEditedFinanceRecord() {
    const type = document.getElementById('finance-record-type').value;
    const id = document.getElementById('finance-record-id').value;
    const amount = parseFloat(document.getElementById('finance-amount').value);
    const description = document.getElementById('finance-description').value.trim();
    const category = document.getElementById('finance-category').value;
    const date = document.getElementById('finance-date').value;
    
    if (!amount || amount <= 0 || !description || !date) {
        showNotification('Заполните все поля правильно', 'error');
        return;
    }
    
    let array;
    let oldAmount = 0;
    
    if (type === 'income') {
        array = currentUser.financialData.income;
    } else if (type === 'expense') {
        array = currentUser.financialData.expenses;
    } else if (type === 'investment') {
        array = currentUser.financialData.investments;
    }
    
    const index = array.findIndex(item => item.id === id);
    
    if (index === -1) {
        showNotification('Запись не найдена', 'error');
        return;
    }
    
    // Сохраняем старую сумму для пересчета
    oldAmount = array[index].amount;
    
    // Обновляем запись
    if (type === 'income' || type === 'expense') {
        array[index] = {
            ...array[index],
            amount: amount,
            description: description,
            category: category,
            date: date
        };
    } else if (type === 'investment') {
        array[index] = {
            ...array[index],
            amount: amount,
            description: description,
            type: category,
            date: date
        };
    }
    
    // Обновляем wallet и капитал
    if (type === 'income') {
        currentUser.financialData.wallet = currentUser.financialData.wallet - oldAmount + amount;
    } else if (type === 'expense') {
        currentUser.financialData.wallet = currentUser.financialData.wallet + oldAmount - amount;
    }
    
    // Пересчитываем капитал
    updateCapital();
    
    saveUserData();
    closeModal('finance-modal');
    
    if (selectedSphere === 'finance') {
        showSphereSubsection('finance');
    }
    
    updateStats();
    showNotification('Запись обновлена', 'success');
}

function deleteFinanceRecord(type, id) {
    if (!confirm('Удалить эту запись?')) {
        return;
    }
    
    let array;
    let amount = 0;
    
    if (type === 'income') {
        array = currentUser.financialData.income;
        const record = array.find(item => item.id === id);
        if (record) {
            amount = record.amount;
        }
    } else if (type === 'expense') {
        array = currentUser.financialData.expenses;
        const record = array.find(item => item.id === id);
        if (record) {
            amount = record.amount;
        }
    } else if (type === 'investment') {
        array = currentUser.financialData.investments;
    }
    
    if (!array) return;
    
    const index = array.findIndex(item => item.id === id);
    
    if (index !== -1) {
        // Удаляем запись
        array.splice(index, 1);
        
        // Обновляем wallet
        if (type === 'income') {
            currentUser.financialData.wallet -= amount;
        } else if (type === 'expense') {
            currentUser.financialData.wallet += amount;
        }
        
        // Пересчитываем капитал
        updateCapital();
        
        saveUserData();
        closeModal('finance-modal');
        
        if (selectedSphere === 'finance') {
            showSphereSubsection('finance');
        }
        
        updateStats();
        showNotification('Запись удалена', 'success');
    }
}