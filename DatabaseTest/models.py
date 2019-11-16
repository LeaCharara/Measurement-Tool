from django.db import models
from Database.models import Database
from Test.models import Test

# Create your models here.
class DatabaseTest(models.Model):
    Test_id = models.ForeignKey(Test, on_delete = models.CASCADE)
    DB_id = models.ForeignKey(Database, on_delete = models.CASCADE)
    query = models.TextField()
    def __str__(self):
        return self.query