# Generated by Django 2.2.6 on 2019-12-03 18:36

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('DatabaseTest', '0004_auto_20191202_0743'),
    ]

    operations = [
        migrations.AlterField(
            model_name='databasetest',
            name='Test_Duration',
            field=models.FloatField(),
        ),
    ]
