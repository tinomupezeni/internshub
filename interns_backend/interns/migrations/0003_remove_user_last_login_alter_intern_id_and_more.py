# Generated by Django 5.0.3 on 2024-04-10 12:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('interns', '0002_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='last_login',
        ),
        migrations.AlterField(
            model_name='intern',
            name='id',
            field=models.AutoField(primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='user',
            name='password',
            field=models.CharField(max_length=100),
        ),
    ]