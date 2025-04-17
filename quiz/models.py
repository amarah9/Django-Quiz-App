from django.db import models



class Quiz(models.Model):
    quiz_id = models.CharField(max_length=100, unique=True)
    title = models.CharField(max_length=200)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    image = models.ImageField(blank=True)

    def add_question(self, question):
        pass

    def remove_question(self, question):
        pass

    def calculate_result(self):
        pass

class Question(models.Model):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions')
    text = models.TextField()

    def add_choice(self, choice):
        pass

    def remove_choice(self, choice):
        pass

class Choice(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='choices')
    text = models.CharField(max_length=200)
    is_correct = models.BooleanField(default=False)