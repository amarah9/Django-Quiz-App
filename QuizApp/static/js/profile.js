document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const editProfileBtn = document.getElementById('edit-profile-btn');
    const editProfileModal = document.getElementById('edit-profile-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const cancelEditBtn = document.getElementById('cancel-edit-btn');
    const editProfileForm = document.getElementById('edit-profile-form');
    const performanceChartCtx = document.getElementById('performance-chart').getContext('2d');
    const historyList = document.getElementById('history-list');
    const recommendationsGrid = document.querySelector('.recommendations-grid');
    const loadMoreBtn = document.getElementById('load-more-btn');
    const chartToggles = document.querySelectorAll('.chart-toggle');
    const categoryFilter = document.getElementById('filter-category');
    const timeFilter = document.getElementById('filter-time');
  
    // Sample user data (in a real app, this would come from your backend)
    const userData = {
      username: "JaneDoe42",
      email: "jane.doe@example.com",
      avatar: "https://via.placeholder.com/150",
      joinDate: "January 2023",
      quizCount: 24,
      avgScore: 78,
      performance: {
        monthly: {
          labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
          data: [65, 72, 80, 78, 85, 82]
        },
        category: {
          labels: ["JavaScript", "Python", "History", "Science", "Math"],
          data: [82, 75, 68, 79, 85]
        }
      },
      history: [
        {
          id: 101,
          quizName: "Advanced JavaScript",
          category: "javascript",
          score: 85,
          date: "2023-06-15",
          difficulty: "hard"
        },
        {
          id: 102,
          quizName: "Python Basics",
          category: "python",
          score: 92,
          date: "2023-06-10",
          difficulty: "easy"
        },
        // More history items...
      ],
      recommendations: [
        {
          id: 201,
          name: "JavaScript Design Patterns",
          category: "javascript",
          difficulty: "medium",
          reason: "Based on your interest in advanced concepts"
        },
        {
          id: 202,
          name: "Modern Python Features",
          category: "python",
          difficulty: "medium",
          reason: "To build on your strong Python basics"
        },
        // More recommendations...
      ]
    };
  
    // Chart instance
    let performanceChart;
  
    // Initialize the page
    function initPage() {
      // Set user info
      document.getElementById('username').textContent = userData.username;
      document.getElementById('join-date').textContent = userData.joinDate;
      document.getElementById('quiz-count').textContent = userData.quizCount;
      document.getElementById('avg-score').textContent = `${userData.avgScore}%`;
      document.querySelector('.user-avatar').src = userData.avatar;
  
      // Initialize chart with monthly data
      initChart('monthly');
  
      // Populate quiz history
      renderHistory(userData.history);
  
      // Populate recommendations
      renderRecommendations(userData.recommendations);
  
      // Set up form with current values
      document.getElementById('edit-username').value = userData.username;
      document.getElementById('edit-email').value = userData.email;
      document.getElementById('edit-avatar').value = userData.avatar;
    }
  
    // Initialize performance chart
    function initChart(type) {
      if (performanceChart) {
        performanceChart.destroy();
      }
  
      const data = userData.performance[type];
      
      performanceChart = new Chart(performanceChartCtx, {
        type: 'line',
        data: {
          labels: data.labels,
          datasets: [{
            label: 'Average Score',
            data: data.data,
            backgroundColor: 'rgba(98, 0, 234, 0.2)',
            borderColor: 'rgba(98, 0, 234, 1)',
            borderWidth: 2,
            tension: 0.4,
            fill: true
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: false,
              min: 50,
              max: 100,
              ticks: {
                callback: function(value) {
                  return value + '%';
                }
              }
            }
          },
          plugins: {
            tooltip: {
              callbacks: {
                label: function(context) {
                  return context.parsed.y + '%';
                }
              }
            }
          }
        }
      });
    }
  
    // Render quiz history
    function renderHistory(history) {
      historyList.innerHTML = '';
      
      history.forEach(item => {
        const historyItem = document.createElement('div');
        historyItem.className = 'history-item';
        
        // Determine score class
        let scoreClass = 'score-medium';
        if (item.score >= 85) scoreClass = 'score-high';
        if (item.score < 70) scoreClass = 'score-low';
        
        historyItem.innerHTML = `
          <div>
            <span class="history-quiz-name">${item.quizName}</span>
            <span class="history-date">${formatDate(item.date)}</span>
          </div>
          <div>
            <span class="history-score ${scoreClass}">${item.score}%</span>
          </div>
        `;
        
        historyItem.addEventListener('click', () => {
          viewQuizResult(item.id);
        });
        
        historyList.appendChild(historyItem);
      });
    }
  
    // Render recommendations
    function renderRecommendations(recommendations) {
      recommendationsGrid.innerHTML = '';
      
      recommendations.forEach(quiz => {
        const card = document.createElement('div');
        card.className = 'recommendation-card';
        
        card.innerHTML = `
          <h3>${quiz.name}</h3>
          <span class="recommendation-difficulty difficulty-${quiz.difficulty}">
            ${quiz.difficulty.charAt(0).toUpperCase() + quiz.difficulty.slice(1)}
          </span>
          <p>${quiz.reason}</p>
          <button class="start-recommendation-btn" data-id="${quiz.id}">Start Quiz</button>
        `;
        
        card.querySelector('.start-recommendation-btn').addEventListener('click', (e) => {
          e.stopPropagation();
          startQuiz(quiz.id);
        });
        
        recommendationsGrid.appendChild(card);
      });
    }
  
    // Format date for display
    function formatDate(dateString) {
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
  
    // View quiz result
    function viewQuizResult(quizId) {
      console.log(`Viewing result for quiz ${quizId}`);
      // window.location.href = `result.html?quiz_id=${quizId}`;
      alert(`Would navigate to result for quiz ${quizId}`);
    }
  
    // Start quiz
    function startQuiz(quizId) {
      console.log(`Starting quiz ${quizId}`);
      // window.location.href = `quiz.html?id=${quizId}`;
      alert(`Would start quiz ${quizId}`);
    }
  
    // Filter history
    function filterHistory() {
      const category = categoryFilter.value;
      const time = timeFilter.value;
      
      let filtered = userData.history;
      
      if (category !== 'all') {
        filtered = filtered.filter(item => item.category === category);
      }
      
      if (time !== 'all') {
        const now = new Date();
        let cutoffDate = new Date();
        
        if (time === 'month') {
          cutoffDate.setMonth(now.getMonth() - 1);
        } else if (time === 'week') {
          cutoffDate.setDate(now.getDate() - 7);
        }
        
        filtered = filtered.filter(item => new Date(item.date) >= cutoffDate);
      }
      
      renderHistory(filtered);
    }
  
    // Event Listeners
    editProfileBtn.addEventListener('click', function() {
      editProfileModal.style.display = 'flex';
    });
  
    closeModalBtn.addEventListener('click', function() {
      editProfileModal.style.display = 'none';
    });
  
    cancelEditBtn.addEventListener('click', function() {
      editProfileModal.style.display = 'none';
    });
  
    editProfileForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Update user data
      userData.username = document.getElementById('edit-username').value;
      userData.email = document.getElementById('edit-email').value;
      userData.avatar = document.getElementById('edit-avatar').value || "https://via.placeholder.com/150";
      
      // Update UI
      document.getElementById('username').textContent = userData.username;
      document.querySelector('.user-avatar').src = userData.avatar;
      
      // In a real app, you would send this to your backend
      console.log('Profile updated:', userData);
      
      editProfileModal.style.display = 'none';
      alert('Profile updated successfully!');
    });
  
    chartToggles.forEach(button => {
      button.addEventListener('click', function() {
        chartToggles.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        initChart(this.dataset.chart);
      });
    });
  
    categoryFilter.addEventListener('change', filterHistory);
    timeFilter.addEventListener('change', filterHistory);
  
    loadMoreBtn.addEventListener('click', function() {
      // In a real app, this would load more history from your backend
      alert('Loading more quiz history...');
    });
  
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
      if (event.target === editProfileModal) {
        editProfileModal.style.display = 'none';
      }
    });
  
    // Initialize the page
    initPage();
  });