export type QuestionType = "multiple-choice" | "multi-select" | "open-ended";

export type Option = string;

export interface Question {
  type: QuestionType;
  question: string;
  options?: Option[];
  /**
   * Если выбран указанный текст ответа — перейти к вопросу с этим индексом
   * (пропустить промежуточные).
   */
  skipToIndexOnAnswer?: Record<string, number>;
}

export interface QuestionBankLanguage {
  student: {
    all: Question[];
    /** legacy Sanity / old local banks */
    grade_11?: Question[];
    bachelor?: Question[];
  };
  parent: {
    all: Question[];
  };
}

export interface QuestionBank {
  ua: QuestionBankLanguage;
  ru: QuestionBankLanguage;
  en: QuestionBankLanguage;
}

/** 7 ориентационных вопросов (multi-select A–D) */
const orientationRu: Question[] = [
  {
    type: "multi-select",
    question: "1. Какой тип задач тебе ближе?",
    options: [
      "A) Помогать людям в реальных ситуациях (здоровье, уход, поддержка)",
      "B) Создавать что-то новое (рисовать, придумывать, разрабатывать идеи)",
      "C) Разбираться в людях, разговаривать, анализировать поведение",
      "D) Работать с цифрами, данными, деньгами, планами",
    ],
  },
  {
    type: "multi-select",
    question: "2. Что тебе интереснее в работе?",
    options: [
      "A) Практическая помощь и действия",
      "B) Самовыражение и творчество",
      "C) Общение и понимание людей",
      "D) Результат, прибыль, стратегия",
    ],
  },
  {
    type: "multi-select",
    question: "3. Как ты реагируешь на стресс?",
    options: [
      "A) Собираюсь и действую быстро, помогаю другим",
      "B) Ухожу в творчество или личное пространство",
      "C) Анализирую ситуацию и обсуждаю с людьми",
      "D) Стараюсь всё просчитать и найти выгодное решение",
    ],
  },
  {
    type: "multi-select",
    question: "4. Что тебе ближе в школе?",
    options: [
      "A) Биология, химия, медицина",
      "B) Искусство, литература, музыка",
      "C) Языки, история, психология",
      "D) Математика, экономика, информатика",
    ],
  },
  {
    type: "multi-select",
    question: "5. Какой тип работы тебе комфортнее?",
    options: [
      "A) Чёткие правила + ответственность за людей",
      "B) Свобода и отсутствие строгих рамок",
      "C) Общение, обсуждения, работа с текстами",
      "D) Чёткие цели, KPI, структура",
    ],
  },
  {
    type: "multi-select",
    question: "6. Что важнее в будущей работе?",
    options: [
      "A) Польза людям и здоровье",
      "B) Самовыражение и интерес",
      "C) Общение и смысл",
      "D) Деньги и стабильность",
    ],
  },
  {
    type: "multi-select",
    question: "7. Как ты принимаешь решения?",
    options: [
      "A) Быстро, по ситуации",
      "B) Интуитивно, творчески",
      "C) После обсуждения с людьми",
      "D) После анализа и расчётов",
    ],
  },
];

const orientationUa: Question[] = [
  {
    type: "multi-select",
    question: "1. Який тип завдань тобі ближчий?",
    options: [
      "A) Допомагати людям у реальних ситуаціях (здоров'я, догляд, підтримка)",
      "B) Створювати щось нове (малювати, вигадувати, розробляти ідеї)",
      "C) Розбиратися в людях, розмовляти, аналізувати поведінку",
      "D) Працювати з цифрами, даними, грошима, планами",
    ],
  },
  {
    type: "multi-select",
    question: "2. Що тобі цікавіше в роботі?",
    options: [
      "A) Практична допомога та дії",
      "B) Самовираження і творчість",
      "C) Спілкування і розуміння людей",
      "D) Результат, прибуток, стратегія",
    ],
  },
  {
    type: "multi-select",
    question: "3. Як ти реагуєш на стрес?",
    options: [
      "A) Збираюся і дію швидко, допомагаю іншим",
      "B) Йду у творчість або особистий простір",
      "C) Аналізую ситуацію і обговорюю з людьми",
      "D) Намагаюся все прорахувати і знайти вигідне рішення",
    ],
  },
  {
    type: "multi-select",
    question: "4. Що тобі ближче в школі?",
    options: [
      "A) Біологія, хімія, медицина",
      "B) Мистецтво, література, музика",
      "C) Мови, історія, психологія",
      "D) Математика, економіка, інформатика",
    ],
  },
  {
    type: "multi-select",
    question: "5. Який тип роботи тобі комфортніший?",
    options: [
      "A) Чіткі правила + відповідальність за людей",
      "B) Свобода і відсутність жорстких рамок",
      "C) Спілкування, обговорення, робота з текстами",
      "D) Чіткі цілі, KPI, структура",
    ],
  },
  {
    type: "multi-select",
    question: "6. Що важливіше в майбутній роботі?",
    options: [
      "A) Користь людям і здоров'я",
      "B) Самовираження і інтерес",
      "C) Спілкування і сенс",
      "D) Гроші і стабільність",
    ],
  },
  {
    type: "multi-select",
    question: "7. Як ти приймаєш рішення?",
    options: [
      "A) Швидко, за ситуацією",
      "B) Інтуїтивно, творчо",
      "C) Після обговорення з людьми",
      "D) Після аналізу і розрахунків",
    ],
  },
];

const orientationEn: Question[] = [
  {
    type: "multi-select",
    question: "1. Which type of tasks suits you best?",
    options: [
      "A) Helping people in real situations (health, care, support)",
      "B) Creating something new (drawing, inventing, developing ideas)",
      "C) Understanding people, talking, analyzing behavior",
      "D) Working with numbers, data, money, plans",
    ],
  },
  {
    type: "multi-select",
    question: "2. What interests you more at work?",
    options: [
      "A) Practical help and action",
      "B) Self-expression and creativity",
      "C) Communication and understanding people",
      "D) Results, profit, strategy",
    ],
  },
  {
    type: "multi-select",
    question: "3. How do you react to stress?",
    options: [
      "A) I focus and act quickly, help others",
      "B) I go into creativity or personal space",
      "C) I analyze the situation and discuss with people",
      "D) I try to calculate everything and find a beneficial solution",
    ],
  },
  {
    type: "multi-select",
    question: "4. What subjects are closer to you at school?",
    options: [
      "A) Biology, chemistry, medicine",
      "B) Art, literature, music",
      "C) Languages, history, psychology",
      "D) Math, economics, computer science",
    ],
  },
  {
    type: "multi-select",
    question: "5. Which work style is more comfortable for you?",
    options: [
      "A) Clear rules + responsibility for people",
      "B) Freedom and no strict frameworks",
      "C) Communication, discussions, working with texts",
      "D) Clear goals, KPIs, structure",
    ],
  },
  {
    type: "multi-select",
    question: "6. What matters more in a future job?",
    options: [
      "A) Helping people and health",
      "B) Self-expression and interest",
      "C) Communication and meaning",
      "D) Money and stability",
    ],
  },
  {
    type: "multi-select",
    question: "7. How do you make decisions?",
    options: [
      "A) Quickly, based on the situation",
      "B) Intuitively, creatively",
      "C) After discussing with people",
      "D) After analysis and calculations",
    ],
  },
];

const PARENT_CHILD_SECTION_INDEX = 6;

const parentSkipAnswerRu =
  "Поступление пока не планируем, просто интересно пройти тест";
const parentSkipAnswerUa =
  "Вступ поки не плануємо, просто цікаво пройти тест";
const parentSkipAnswerEn =
  "We are not planning admission yet, just curious to take the test";

const parentRu: Question[] = [
  {
    type: "multiple-choice",
    question: "Отвечает родитель: Насколько сейчас актуален вопрос поступления?",
    options: [
      "Уже активно выбираем университет и готовимся к поступлению",
      "Определяемся со специальностью и рассматриваем страны",
      "Пока просто интересуемся возможностями",
      parentSkipAnswerRu,
    ],
    skipToIndexOnAnswer: {
      [parentSkipAnswerRu]: PARENT_CHILD_SECTION_INDEX,
    },
  },
  {
    type: "multiple-choice",
    question:
      "Отвечает родитель: Что для вас важнее всего при выборе страны для обучения?",
    options: [
      "Страна с развитой и стабильной экономикой",
      "Доступная стоимость обучения и проживания",
      "Безопасность и комфортная среда для ребенка",
      "Возможность остаться в стране и построить карьеру после окончания университета",
      "Перспективный рынок труда и высокий уровень заработных плат",
    ],
  },
  {
    type: "multiple-choice",
    question:
      "Отвечает родитель: Когда вы готовы начать подготовку ребенка к поступлению?",
    options: [
      "Уже сейчас",
      "В течение года",
      "Еще не понимаем деталей, только изучаем возможности",
      "Не готовы / не планируем начинать подготовку",
    ],
  },
  {
    type: "multiple-choice",
    question: "Отвечает родитель: Насколько определились со специальностью?",
    options: [
      "Специальность уже выбрана",
      "Есть несколько вариантов",
      "Знаем интересующие предметы, но специальность не выбрали",
      "Пока совершенно не понимаем, что подойдет",
    ],
  },
  {
    type: "multiple-choice",
    question: "Отвечает родитель: Рассматриваете ли вы обучение именно в Чехии?",
    options: [
      "Да, Чехия — основной вариант",
      "Рассматриваем несколько европейских стран",
      "Пока просто изучаем возможности",
      "Пока не рассматриваем обучение за границей",
    ],
  },
  {
    type: "multiple-choice",
    question:
      "Отвечает родитель: Мы готовы предоставить вам бесплатную консультацию для поступления в Чехии, что для вас будет максимально полезным?",
    options: [
      "Выбрать конкретную специальность и университет",
      "Разобраться, с чего начинать подготовку",
      "Понять, какова стоимость обучения, затраты на проживание и подготовку",
      "Получить пошаговый план поступления",
      "Понять, стоит ли вообще рассматривать обучение в Европе",
      "Не интересует консультация",
    ],
  },
  {
    type: "multiple-choice",
    question: "Отвечает ребенок: На каком этапе обучения ты сейчас находишься?",
    options: [
      "Ещё не закончил(а) 9 классов",
      "Учусь в 10–11 классе",
      "Учусь в колледже или высшем учебном заведении",
      "Закончил(а) колледж или высшее учебное заведение",
    ],
  },
  {
    type: "multiple-choice",
    question:
      "Отвечает ребенок: Насколько ты готов(а) готовиться к поступлению в Европе?",
    options: [
      "Я очень мотивирован(а) и готов(а) регулярно заниматься",
      "У меня мало свободного времени, но я готов(а) постараться и найти время на подготовку",
      "Пока не уверен(а), что смогу регулярно готовиться",
      "Пока не готов(а) начинать подготовку",
    ],
  },
  ...orientationRu.map((q) => ({
    ...q,
    question: `Отвечает ребенок: ${q.question}`,
  })),
];

const parentUa: Question[] = [
  {
    type: "multiple-choice",
    question: "Відповідає батько/мати: Наскільки зараз актуальне питання вступу?",
    options: [
      "Вже активно обираємо університет і готуємось до вступу",
      "Визначаємося зі спеціальністю і розглядаємо країни",
      "Поки просто цікавимося можливостями",
      parentSkipAnswerUa,
    ],
    skipToIndexOnAnswer: {
      [parentSkipAnswerUa]: PARENT_CHILD_SECTION_INDEX,
    },
  },
  {
    type: "multiple-choice",
    question:
      "Відповідає батько/мати: Що для вас найважливіше при виборі країни для навчання?",
    options: [
      "Країна з розвиненою і стабільною економікою",
      "Доступна вартість навчання і проживання",
      "Безпека і комфортне середовище для дитини",
      "Можливість залишитися в країні і побудувати кар'єру після університету",
      "Перспективний ринок праці і високий рівень зарплат",
    ],
  },
  {
    type: "multiple-choice",
    question:
      "Відповідає батько/мати: Коли ви готові почати підготовку дитини до вступу?",
    options: [
      "Вже зараз",
      "Протягом року",
      "Ще не розуміємо деталей, лише вивчаємо можливості",
      "Не готові / не плануємо починати підготовку",
    ],
  },
  {
    type: "multiple-choice",
    question: "Відповідає батько/мати: Наскільки визначилися зі спеціальністю?",
    options: [
      "Спеціальність уже обрана",
      "Є кілька варіантів",
      "Знаємо цікаві предмети, але спеціальність не обрали",
      "Поки зовсім не розуміємо, що підійде",
    ],
  },
  {
    type: "multiple-choice",
    question: "Відповідає батько/мати: Чи розглядаєте навчання саме в Чехії?",
    options: [
      "Так, Чехія — основний варіант",
      "Розглядаємо кілька європейських країн",
      "Поки просто вивчаємо можливості",
      "Поки не розглядаємо навчання за кордоном",
    ],
  },
  {
    type: "multiple-choice",
    question:
      "Відповідає батько/мати: Ми готові надати безкоштовну консультацію для вступу в Чехії. Що буде максимально корисним для вас?",
    options: [
      "Обрати конкретну спеціальність і університет",
      "Зрозуміти, з чого починати підготовку",
      "Зрозуміти вартість навчання, витрати на проживання і підготовку",
      "Отримати покроковий план вступу",
      "Зрозуміти, чи варто взагалі розглядати навчання в Європі",
      "Консультація не цікавить",
    ],
  },
  {
    type: "multiple-choice",
    question: "Відповідає дитина: На якому етапі навчання ти зараз?",
    options: [
      "Ще не закінчив(ла) 9 класів",
      "Навчаюся в 10–11 класі",
      "Навчаюся в коледжі або вищому навчальному закладі",
      "Закінчив(ла) коледж або вищий навчальний заклад",
    ],
  },
  {
    type: "multiple-choice",
    question:
      "Відповідає дитина: Наскільки ти готовий(а) готуватися до вступу в Європі?",
    options: [
      "Я дуже мотивований(а) і готовий(а) регулярно займатися",
      "У мене мало вільного часу, але я готовий(а) постаратися і знайти час на підготовку",
      "Поки не впевнений(а), що зможу регулярно готуватися",
      "Поки не готовий(а) починати підготовку",
    ],
  },
  ...orientationUa.map((q) => ({
    ...q,
    question: `Відповідає дитина: ${q.question}`,
  })),
];

const parentEn: Question[] = [
  {
    type: "multiple-choice",
    question: "Parent answers: How relevant is the admission question right now?",
    options: [
      "We are already actively choosing a university and preparing for admission",
      "We are deciding on a major and considering countries",
      "We are just exploring opportunities for now",
      parentSkipAnswerEn,
    ],
    skipToIndexOnAnswer: {
      [parentSkipAnswerEn]: PARENT_CHILD_SECTION_INDEX,
    },
  },
  {
    type: "multiple-choice",
    question:
      "Parent answers: What matters most when choosing a country for studies?",
    options: [
      "A country with a developed and stable economy",
      "Affordable tuition and living costs",
      "Safety and a comfortable environment for the child",
      "The opportunity to stay and build a career after graduation",
      "A strong job market and high salary levels",
    ],
  },
  {
    type: "multiple-choice",
    question:
      "Parent answers: When are you ready to start preparing your child for admission?",
    options: [
      "Already now",
      "Within a year",
      "We don't understand the details yet, only exploring options",
      "Not ready / not planning to start preparation",
    ],
  },
  {
    type: "multiple-choice",
    question: "Parent answers: How decided are you about the major?",
    options: [
      "The major is already chosen",
      "There are several options",
      "We know interesting subjects, but haven't chosen a major",
      "We still have no idea what would fit",
    ],
  },
  {
    type: "multiple-choice",
    question: "Parent answers: Are you considering studying specifically in Czechia?",
    options: [
      "Yes, Czechia is the main option",
      "We are considering several European countries",
      "We are just exploring opportunities for now",
      "We are not considering studying abroad yet",
    ],
  },
  {
    type: "multiple-choice",
    question:
      "Parent answers: We can offer a free consultation for admission to Czechia. What would be most useful for you?",
    options: [
      "Choose a specific major and university",
      "Understand where to start preparation",
      "Understand tuition, living and preparation costs",
      "Get a step-by-step admission plan",
      "Understand whether studying in Europe is worth considering at all",
      "Not interested in a consultation",
    ],
  },
  {
    type: "multiple-choice",
    question: "Child answers: What stage of education are you at now?",
    options: [
      "Have not finished 9th grade yet",
      "Studying in grades 10–11",
      "Studying at a college or university",
      "Graduated from college or university",
    ],
  },
  {
    type: "multiple-choice",
    question:
      "Child answers: How ready are you to prepare for admission in Europe?",
    options: [
      "I am highly motivated and ready to study regularly",
      "I have little free time, but I am ready to try and find time for preparation",
      "Not sure yet that I can prepare regularly",
      "Not ready to start preparation yet",
    ],
  },
  ...orientationEn.map((q) => ({
    ...q,
    question: `Child answers: ${q.question}`,
  })),
];

const studentRu: Question[] = [
  {
    type: "multiple-choice",
    question: "На каком этапе обучения ты сейчас находишься?",
    options: [
      "Ещё не закончил(а) 9 классов",
      "Учусь в 10–11 классе",
      "Учусь в колледже или высшем учебном заведении",
      "Закончил(а) колледж или высшее учебное заведение",
    ],
  },
  {
    type: "multiple-choice",
    question: "Насколько ты готов(а) готовиться к поступлению в Европе?",
    options: [
      "Я очень мотивирован(а) и готов(а) регулярно заниматься",
      "У меня мало свободного времени, но я готов(а) постараться и найти время на подготовку",
      "Пока не уверен(а), что смогу регулярно готовиться",
      "Пока не готов(а) начинать подготовку",
    ],
  },
  {
    type: "multiple-choice",
    question: "Как твои родители относятся к твоему желанию поступить за границу?",
    options: [
      "Всячески поддерживают меня и готовы помочь с поступлением",
      "Мы рассматриваем вариант обучения за границей, но пока не определились",
      "Родители пока не поддерживают идею поступления за границу",
      "Я не планирую поступать за границу, просто хочу пройти тест",
    ],
  },
  {
    type: "multiple-choice",
    question: "Что тебе сейчас больше всего нужно для поступления?",
    options: [
      "Понять, какая профессия и специальность мне подходит",
      "Выбрать университет и страну",
      "Понять свои шансы на поступление",
      "Понять, что нужно подтянуть и как подготовиться",
      "Вообще не знаю, с чего начать",
    ],
  },
  {
    type: "multiple-choice",
    question:
      "Мы готовы предоставить тебе бесплатную консультацию для поступления в Чехии, что для тебя будет максимально полезным?",
    options: [
      "Выбрать конкретную специальность и университет",
      "Разобраться, с чего начинать подготовку",
      "Понять, какова стоимость обучения, затраты на проживание и подготовку",
      "Получить пошаговый план поступления",
      "Понять, стоит ли вообще рассматривать обучение в Европе",
      "Не интересует консультация",
    ],
  },
  ...orientationRu,
];

const studentUa: Question[] = [
  {
    type: "multiple-choice",
    question: "На якому етапі навчання ти зараз?",
    options: [
      "Ще не закінчив(ла) 9 класів",
      "Навчаюся в 10–11 класі",
      "Навчаюся в коледжі або вищому навчальному закладі",
      "Закінчив(ла) коледж або вищий навчальний заклад",
    ],
  },
  {
    type: "multiple-choice",
    question: "Наскільки ти готовий(а) готуватися до вступу в Європі?",
    options: [
      "Я дуже мотивований(а) і готовий(а) регулярно займатися",
      "У мене мало вільного часу, але я готовий(а) постаратися і знайти час на підготовку",
      "Поки не впевнений(а), що зможу регулярно готуватися",
      "Поки не готовий(а) починати підготовку",
    ],
  },
  {
    type: "multiple-choice",
    question: "Як твої батьки ставляться до твого бажання вступити за кордон?",
    options: [
      "Усіляко підтримують мене і готові допомогти зі вступом",
      "Ми розглядаємо варіант навчання за кордоном, але поки не визначилися",
      "Батьки поки не підтримують ідею вступу за кордон",
      "Я не планую вступати за кордон, просто хочу пройти тест",
    ],
  },
  {
    type: "multiple-choice",
    question: "Що тобі зараз найбільше потрібно для вступу?",
    options: [
      "Зрозуміти, яка професія і спеціальність мені підходить",
      "Обрати університет і країну",
      "Зрозуміти свої шанси на вступ",
      "Зрозуміти, що потрібно підтягнути і як підготуватися",
      "Зовсім не знаю, з чого почати",
    ],
  },
  {
    type: "multiple-choice",
    question:
      "Ми готові надати тобі безкоштовну консультацію для вступу в Чехії. Що буде максимально корисним для тебе?",
    options: [
      "Обрати конкретну спеціальність і університет",
      "Зрозуміти, з чого починати підготовку",
      "Зрозуміти вартість навчання, витрати на проживання і підготовку",
      "Отримати покроковий план вступу",
      "Зрозуміти, чи варто взагалі розглядати навчання в Європі",
      "Консультація не цікавить",
    ],
  },
  ...orientationUa,
];

const studentEn: Question[] = [
  {
    type: "multiple-choice",
    question: "What stage of education are you at now?",
    options: [
      "Have not finished 9th grade yet",
      "Studying in grades 10–11",
      "Studying at a college or university",
      "Graduated from college or university",
    ],
  },
  {
    type: "multiple-choice",
    question: "How ready are you to prepare for admission in Europe?",
    options: [
      "I am highly motivated and ready to study regularly",
      "I have little free time, but I am ready to try and find time for preparation",
      "Not sure yet that I can prepare regularly",
      "Not ready to start preparation yet",
    ],
  },
  {
    type: "multiple-choice",
    question: "How do your parents feel about your wish to study abroad?",
    options: [
      "They fully support me and are ready to help with admission",
      "We are considering studying abroad, but have not decided yet",
      "My parents do not support the idea of studying abroad yet",
      "I am not planning to study abroad, I just want to take the test",
    ],
  },
  {
    type: "multiple-choice",
    question: "What do you need most for admission right now?",
    options: [
      "Understand which profession and major fit me",
      "Choose a university and country",
      "Understand my admission chances",
      "Understand what to improve and how to prepare",
      "I have no idea where to start",
    ],
  },
  {
    type: "multiple-choice",
    question:
      "We can offer you a free consultation for admission to Czechia. What would be most useful for you?",
    options: [
      "Choose a specific major and university",
      "Understand where to start preparation",
      "Understand tuition, living and preparation costs",
      "Get a step-by-step admission plan",
      "Understand whether studying in Europe is worth considering at all",
      "Not interested in a consultation",
    ],
  },
  ...orientationEn,
];

export const questions: QuestionBank = {
  ru: {
    student: { all: studentRu },
    parent: { all: parentRu },
  },
  ua: {
    student: { all: studentUa },
    parent: { all: parentUa },
  },
  en: {
    student: { all: studentEn },
    parent: { all: parentEn },
  },
};
