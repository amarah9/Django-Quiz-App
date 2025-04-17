// Sample Quiz Data
const quizzes = [
    {
      id: 1,
      title: "General Knowledge",
      description: "Test your knowledge on a variety of topics.",
      difficulty: "easy",
      image: "https://via.placeholder.com/300x150?text=General+Knowledge"
    },
    {
      id: 2,
      title: "Science Trivia",
      description: "Challenge yourself with science questions.",
      difficulty: "medium",
      image: "https://via.placeholder.com/300x150?text=Science+Trivia"
    },
    {
      id: 3,
      title: "History Master",
      description: "Prove your expertise in world history.",
      difficulty: "hard",
      image: "https://via.placeholder.com/300x150?text=History+Master"
    },
    {
      id: 4,
      title: "Math Puzzles",
      description: "Solve fun and tricky math problems.",
      difficulty: "medium",
      image: "https://via.placeholder.com/300x150?text=Math+Puzzles"
    }
  ];
  
  // DOM Elements
  const quizContainer = document.getElementById('quiz-container');
  const searchInput = document.getElementById('search');
  const filterDropdown = document.getElementById('filter');
  
  // Render Quiz Cards
  function renderQuizzes(quizzesToRender) {
    quizContainer.innerHTML = '';
    
    quizzesToRender.forEach(quiz => {
      const quizCard = document.createElement('div');
      quizCard.className = 'quiz-card';
      
      quizCard.innerHTML = `
        <img src="${quiz.image}" alt="${quiz.title}" class="quiz-image">
        <div class="quiz-content">
          <h3 class="quiz-title">${quiz.title}</h3>
          <p class="quiz-description">${quiz.description}</p>
          <span class="quiz-difficulty difficulty-${quiz.difficulty}">
            ${quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
          </span>
          <button class="start-button" data-id="${quiz.id}">Start Quiz</button>
        </div>
      `;
      
      quizContainer.appendChild(quizCard);
    });
    
    // Add event listeners to buttons
    document.querySelectorAll('.start-button').forEach(button => {
      button.addEventListener('click', (e) => {
        const quizId = e.target.getAttribute('data-id');
        startQuiz(quizId);
      });
    });
  }
  
  // Filter and Search Functionality
  function filterQuizzes() {
    const searchTerm = searchInput.value.toLowerCase();
    const difficultyFilter = filterDropdown.value;
    
    const filteredQuizzes = quizzes.filter(quiz => {
      const matchesSearch = quiz.title.toLowerCase().includes(searchTerm) || 
                           quiz.description.toLowerCase().includes(searchTerm);
      const matchesDifficulty = difficultyFilter === 'all' || quiz.difficulty === difficultyFilter;
      
      return matchesSearch && matchesDifficulty;
    });
    
    renderQuizzes(filteredQuizzes);
  }
  
  // Start Quiz Function (Replace with your actual navigation logic)
  function startQuiz(quizId) {
    alert(`Starting quiz with ID: ${quizId}`);
    // window.location.href = `/quiz.html?id=${quizId}`; // Uncomment for real navigation
  }
  
  // Event Listeners
  searchInput.addEventListener('input', filterQuizzes);
  filterDropdown.addEventListener('change', filterQuizzes);
  
  // Initial Render
  renderQuizzes(quizzes);