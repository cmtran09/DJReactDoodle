# Generated by Django 3.0.2 on 2020-01-14 23:21

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('doodle', '0005_auto_20200114_2303'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='correct_answer',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='doodle', to='doodle.CorrectAnswer'),
        ),
    ]