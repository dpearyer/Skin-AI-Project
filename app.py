from keras.preprocessing.image import ImageDataGenerator
from keras.models import Sequential
from keras.layers import Conv2D, MaxPooling2D
from keras.layers import Activation, Dropout, Flatten, Dense
from keras import backend as K
from flask import Flask, jsonify, request
from flask_cors import CORS
import scipy
from pyngrok import ngrok




img_width, img_height = 300, 300

dataset = '../backend/dataset_mole/'

nb_train_samples =800
nb_validation_samples = 200
epochs = 8
batch_size = 16

if K.image_data_format() == 'channels_first':
    input_shape = (3, img_width, img_height)
else:
    input_shape = (img_width, img_height, 3)

model = Sequential()
model.add(Conv2D(32, (2, 2), input_shape=input_shape))
model.add(Activation('relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))

model.add(Conv2D(32, (2, 2)))
model.add(Activation('relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))

model.add(Conv2D(64, (2, 2)))
model.add(Activation('relu'))
model.add(MaxPooling2D(pool_size=(2, 2)))

model.add(Flatten())
model.add(Dense(64))
model.add(Activation('relu'))
model.add(Dropout(0.5))
model.add(Dense(1))
model.add(Activation('sigmoid'))


model.compile(loss='binary_crossentropy',
              optimizer='rmsprop',
              metrics=['accuracy'])


train_datagen = ImageDataGenerator(
	rescale=1. / 255,
	shear_range=0.2,
	zoom_range=0.2,
	horizontal_flip=True)

test_datagen = ImageDataGenerator(rescale=1. / 255)

train_generator = train_datagen.flow_from_directory(
	dataset,
	target_size=(img_width, img_height),
	batch_size=batch_size,
	class_mode='binary')
validation_generator = test_datagen.flow_from_directory(
	dataset,
	target_size=(img_width, img_height),
	batch_size=batch_size,
	class_mode='binary')

model.fit(
	train_generator,
	steps_per_epoch=nb_train_samples // batch_size,
	epochs=epochs,
	validation_data=validation_generator,
	validation_steps=nb_validation_samples // batch_size)


model.save('model_weights.h5')

from keras.models import load_model
from keras.preprocessing.image import load_img
from keras.preprocessing.image import img_to_array
from keras.applications.vgg16 import preprocess_input
from keras.applications.vgg16 import decode_predictions
from keras.applications.vgg16 import VGG16
from keras.applications.vgg19 import decode_predictions

import numpy as np



from keras.models import load_model




model = load_model('model_weights.h5')



app = Flask(__name__)


@app.route('/api/predict_label', methods=['POST', 'GET'])

def predict_label():

    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400


    image = request.files['image/jpeg, image/png']

    img = np.array(image)
    img = img / 255.0
    img = img.reshape(1,300,300,3)
    label = model.predict(img)
    print(label[0][0])

    decoded_predictions = decode_predictions(label, top=3)[0]
    for i, (imagenet_id, label, score) in enumerate(decoded_predictions):
        label_result=f"{i + 1}: {label} ({score:.2f})"
    return label_result
    


if __name__ == '__main__':
    app.run(port=5000)
