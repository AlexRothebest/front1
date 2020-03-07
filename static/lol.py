import requests, shutil


with open('index.html', 'r') as file:
	text = file.read()


while 'https://texno-proekt.ru' in text:
	pos1 = text.find('https://texno-proekt.ru')
	pos2 = pos1 + text[pos1:].find('"')

	url = text[pos1 : pos2]
	name = url.split('/')[-1]

	if name.split('.')[-1] in ['png', 'jpg']:
		name = name.replace('\ '[0], ' ').replace('/', ' ').replace('?', ' ').replace(':', ' ').replace('|', ' ').replace('!', ' ')\
				   .replace('<', ' ').replace('>', ' ').replace('"', ' ').replace('*', ' ').strip()
		with open(name, 'wb') as image_file:
			shutil.copyfileobj(requests.get(url, stream = True).raw, image_file)
	else:
		with open(name, 'w') as file:
			file.write(requests.get(url).text)

	text = text[:pos1] + name + text[pos2:]


with open('index.html', 'w') as file:
	file.write(text)