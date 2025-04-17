// Sample Quiz Data (In a real app, this would come from your backend API)
const quizData = {
    id: 1,
    title: "JavaScript Fundamentals",
    questions: [
      {
        id: 1,
        text: "Which keyword is used to declare a variable in JavaScript?",
        options: [
          { id: 1, text: "var", isCorrect: false },
          { id: 2, text: "let", isCorrect: false },
          { id: 3, text: "const", isCorrect: false },
          { id: 4, text: "All of the above", isCorrect: true }
        ]
      },
      {
        id: 2,
        text: "What does the '===' operator do in JavaScript?",
        options: [
          { id: 1, text: "Compares values without type checking", isCorrect: false },
          { id: 2, text: "Compares both value and type", isCorrect: true },
          { id: 3, text: "Assigns a value to a variable", isCorrect: false },
          { id: 4, text: "Checks if a variable is defined", isCorrect: false }
        ]
      },
      {
        id: 3,
        text: "Which method adds an element to the end of an array?",
        options: [
          { id: 1, text: "push()", isCorrect: true },
          { id: 2, text: "pop()", isCorrect: false },
          { id: 3, text: "shift()", isCorrect: false },
          { id: 4, text: "unshift()", isCorrect: false }
        ]
      }
    ]
  };
  
  // DOM Elements
  const quizTitle = document.getElementById('quiz-title');
  const questionText = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options-container');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');
  const submitBtn = document.getElementById('submit-btn');
  const progressBar = document.getElementById('progress-bar');
  const questionCount = document.getElementById('question-count');
  const timerElement = document.getElementById('timer');
  
  // Quiz State
  let currentQuestionIndex = 0;
  let userAnswers = {};
  let timerInterval;
  const TIME_PER_QUESTION = 30; // seconds
  
  // Initialize Quiz
  function initQuiz() {
    quizTitle.textContent = quizData.title;
    loadQuestion(currentQuestionIndex);
    startTimer();
    updateProgressBar();
    updateQuestionCounter();
  }
  
  // Load Question
  function loadQuestion(index) {
    const question = quizData.questions[index];
    questionText.textContent = question.text;
    
    optionsContainer.innerHTML = '';
    question.options.forEach(option => {
      const optionElement = document.createElement('label');
      optionElement.className = 'option';
      if (userAnswers[index] === option.id) {
        optionElement.classList.add('selected');
      }
      
      optionElement.innerHTML = `
        <input type="radio" name="option" value="${option.id}" 
          ${userAnswers[index] === option.id ? 'checked' : ''}>
        ${option.text}
      `;
      
      optionElement.addEventListener('click', () => {
        document.querySelectorAll('.option').forEach(opt => {
          opt.classList.remove('selected');
        });
        optionElement.classList.add('selected');
        userAnswers[index] = option.id;
        
        // Enable next button when an option is selected
        if (index < quizData.questions.length - 1) {
          nextBtn.disabled = false;
        } else {
          submitBtn.hidden = false;
          nextBtn.hidden = true;
        }
      });
      
      optionsContainer.appendChild(optionElement);
    });
    
    // Update button states
    prevBtn.disabled = index === 0;
    if (index === quizData.questions.length - 1) {
      nextBtn.hidden = true;
      submitBtn.hidden = !userAnswers[index];
    } else {
      nextBtn.hidden = false;
      submitBtn.hidden = true;
      nextBtn.disabled = !userAnswers[index];
    }
  }
  
  // Navigation Functions
  function goToNextQuestion() {
    if (currentQuestionIndex < quizData.questions.length - 1) {
      currentQuestionIndex++;
      resetTimer();
      loadQuestion(currentQuestionIndex);
      updateProgressBar();
      updateQuestionCounter();
    }
  }
  
  function goToPrevQuestion() {
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      resetTimer();
      loadQuestion(currentQuestionIndex);
      updateProgressBar();
      updateQuestionCounter();
    }
  }
  
  // Timer Functions
  function startTimer() {
    let timeLeft = TIME_PER_QUESTION;
    updateTimerDisplay(timeLeft);
    
    timerInterval = setInterval(() => {
      timeLeft--;
      updateTimerDisplay(timeLeft);
      
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        handleTimeOut();
      }
    }, 1000);
  }
  
  function resetTimer() {
    clearInterval(timerInterval);
    startTimer();
  }
  
  function updateTimerDisplay(seconds) {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    timerElement.textContent = `${mins}:${secs}`;
    
    // Change color when time is running low
    if (seconds <= 10) {
      timerElement.style.color = '#ff5252';
      timerElement.style.animation = 'pulse 0.5s infinite alternate';
    } else {
      timerElement.style.color = '';
      timerElement.style.animation = '';
    }
  }
  
  function handleTimeOut() {
    // Auto-select an option if none was selected
    if (!userAnswers[currentQuestionIndex]) {
      const firstOption = quizData.questions[currentQuestionIndex].options[0].id;
      userAnswers[currentQuestionIndex] = firstOption;
    }
    
    // Auto-advance or submit
    if (currentQuestionIndex < quizData.questions.length - 1) {
      goToNextQuestion();
    } else {
      submitQuiz();
    }
  }
  
  // Progress Functions
  function updateProgressBar() {
    const progress = ((currentQuestionIndex + 1) / quizData.questions.length) * 100;
    progressBar.style.width = `${progress}%`;
  }
  
  function updateQuestionCounter() {
    questionCount.textContent = `${currentQuestionIndex + 1}/${quizData.questions.length}`;
  }
  
  // Submit Quiz
  function submitQuiz() {
    clearInterval(timerInterval);
    
    // Calculate score
    let score = 0;
    quizData.questions.forEach((question, index) => {
      const selectedOptionId = userAnswers[index];
      if (selectedOptionId) {
        const selectedOption = question.options.find(opt => opt.id === selectedOptionId);
        if (selectedOption && selectedOption.isCorrect) {
          score++;
        }
      }
    });
    
    const percentage = Math.round((score / quizData.questions.length) * 100);
    
    // In a real app, you would send this to your backend
    console.log('Quiz submitted!', {
      quizId: quizData.id,
      score: percentage,
      answers: userAnswers
    });
    
    // Redirect to results page
    alert(`Quiz submitted! Your score: ${percentage}%`);
    // window.location.href = `/results.html?quiz_id=${quizData.id}&score=${percentage}`;
  }
  
  // Event Listeners
  prevBtn.addEventListener('click', goToPrevQuestion);
  nextBtn.addEventListener('click', goToNextQuestion);
  submitBtn.addEventListener('click', submitQuiz);
  
  // Initialize the quiz when the page loads
  document.addEventListener('DOMContentLoaded', initQuiz);