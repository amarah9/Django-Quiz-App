from django.db import models

# models.py in result app
from django.db import models
from user.models import User

class Result(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.IntegerField()

    def generate_report(self):
        # Logic to generate a report
        return f"Report for {self.user.name}: Score {self.score}"