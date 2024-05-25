from django.apps import AppConfig
import tensorflow as tf


class AimodelConfig(AppConfig):
    name = "ai_model"
    model = None

    def ready(self):

        self.model = tf.keras.models.load_model(
            "C:/Users/Tino/Documents/0000/projects/UZ/backend/ai_model/project_model.keras"
        )
