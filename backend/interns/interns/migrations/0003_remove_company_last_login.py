# Generated by Django 5.0.4 on 2024-04-19 13:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('interns', '0002_remove_company_comppassword_company_last_login_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='company',
            name='last_login',
        ),
    ]
