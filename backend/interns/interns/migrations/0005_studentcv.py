# Generated by Django 5.0.4 on 2024-04-22 05:48

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('interns', '0004_rename_password_company_comppassword'),
    ]

    operations = [
        migrations.CreateModel(
            name='StudentCv',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cv', models.CharField(default='none', max_length=250)),
                ('studentId', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='interns.student')),
            ],
        ),
    ]
