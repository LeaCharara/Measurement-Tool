# Generated by Django 2.2.6 on 2019-12-01 17:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Test', '0003_test_abletorun'),
    ]

    operations = [
        migrations.RenameField(
            model_name='test',
            old_name='Nb_of_done',
            new_name='Progress',
        ),
    ]