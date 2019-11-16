# Generated by Django 2.2.6 on 2019-10-05 17:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Type', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Database',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.TextField()),
                ('host', models.TextField()),
                ('port', models.IntegerField()),
                ('username', models.TextField()),
                ('password', models.TextField()),
                ('dbtype', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='Type.Type')),
            ],
        ),
    ]