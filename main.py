from flask import Flask, render_template, request
import requests, json


app = Flask(__name__)


@app.route('/')
def home():
	return render_template('index.html')


'''
@app.route('/calc/')
def calc():
	return str(json.loads(requests.get('https://texno-proekt.ru/calc/calc.php?format=json').text))


@app.route('/submit', methods=['POST'])
def submit():
	text = requests.post(
		'https://texno-proekt.ru/templates/texno2015/new/submit/submit.php',
		{
			'data_quiz': request.form.get('data_quiz')
		}
	).text

	print(text)

	return text
'''


if __name__ == '__main__':
	app.run(debug=True)