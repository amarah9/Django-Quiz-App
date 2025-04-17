document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const viewReportBtn = document.getElementById('view-report-btn');
    const retryQuizBtn = document.getElementById('retry-quiz-btn');
    const shareResultBtn = document.getElementById('share-result-btn');
    const shareModal = document.getElementById('share-modal');
    const closeModal = document.querySelector('.close-modal');
    const copyLinkBtn = document.getElementById('copy-link-btn');
    const shareUrl = document.getElementById('share-url');
    const progressCircle = document.querySelector('.progress-ring-progress');
    
    // Sample result data (in a real app, this would come from your backend)
    const resultData = {
      quizId: 123,
      quizTitle: "JavaScript Fundamentals",
      score: 85,
      correctAnswers: 8,
      totalQuestions: 10,
      timeTaken: "4:32",
      difficulty: "medium",
      answers: [
        {
          question: "1. Which keyword declares a variable?",
          userAnswer: "let",
          correctAnswer: "let",
          isCorrect: true
        },
        {
          question: "2. What does === operator do?",
          userAnswer: "Compares values",
          correctAnswer: "Compares value and type",
          isCorrect: false
        },
        // More answers would be here
      ],
      tips: [
        {
          title: "Variables and Scope",
          content: "You missed 2 questions about variable declarations. Remember:",
          points: [
            "var has function scope",
            "let and const have block scope",
            "const cannot be reassigned"
          ]
        }
      ]
    };
    
    // Initialize the page
    function initPage() {
      // Set score circle
      const circumference = 2 * Math.PI * 80;
      const offset = circumference - (resultData.score / 100) * circumference;
      progressCircle.style.strokeDashoffset = offset;
      
      // Set score percentage
      document.querySelector('.score-percentage').textContent = `${resultData.score}%`;
      
      // Set quiz details
      document.querySelector('.score-details h2').textContent = resultData.quizTitle;
      document.querySelector('.detail-value.correct').textContent = 
        `${resultData.correctAnswers}/${resultData.totalQuestions}`;
      document.querySelector('.detail-value:nth-of-type(2)').textContent = resultData.timeTaken;
      
      const difficultyElement = document.querySelector('.detail-value:nth-of-type(3)');
      difficultyElement.textContent = resultData.difficulty.charAt(0).toUpperCase() + 
        resultData.difficulty.slice(1);
      difficultyElement.className = `detail-value difficulty-${resultData.difficulty}`;
      
      // Populate answer breakdown (just 2 examples here)
      const breakdownGrid = document.querySelector('.breakdown-grid');
      resultData.answers.forEach(answer => {
        const item = document.createElement('div');
        item.className = `breakdown-item ${answer.isCorrect ? 'correct' : 'incorrect'}`;
        item.innerHTML = `
          <span data-label="Question">${answer.question}</span>
          <span data-label="Your Answer">${answer.userAnswer}</span>
          <span data-label="Correct Answer">${answer.correctAnswer}</span>
          <span data-label="Status">${answer.isCorrect ? '✓ Correct' : '✗ Incorrect'}</span>
        `;
        breakdownGrid.appendChild(item);
      });
      
      // Populate improvement tips
      const tipsContainer = document.querySelector('.improvement-tips');
      resultData.tips.forEach(tip => {
        const tipCard = document.createElement('div');
        tipCard.className = 'tip-card';
        tipCard.innerHTML = `
          <h3>${tip.title}</h3>
          <p>${tip.content}</p>
          <ul>
            ${tip.points.map(point => `<li><code>${point}</code></li>`).join('')}
          </ul>
        `;
        tipsContainer.appendChild(tipCard);
      });
    }
    
    // Event Listeners
    viewReportBtn.addEventListener('click', function() {
      alert('Detailed report would open here');
      // window.location.href = `detailed_report.html?quiz_id=${resultData.quizId}`;
    });
    
    retryQuizBtn.addEventListener('click', function() {
      if (confirm('Retry this quiz?')) {
        // window.location.href = `quiz.html?id=${resultData.quizId}`;
        alert(`Redirecting to quiz: ${resultData.quizTitle}`);
      }
    });
    
    shareResultBtn.addEventListener('click', function() {
      shareModal.style.display = 'flex';
    });
    
    closeModal.addEventListener('click', function() {
      shareModal.style.display = 'none';
    });
    
    copyLinkBtn.addEventListener('click', function() {
      shareUrl.select();
      document.execCommand('copy');
      alert('Link copied to clipboard!');
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
      if (event.target === shareModal) {
        shareModal.style.display = 'none';
      }
    });
    
    // Initialize the page
    initPage();
  });