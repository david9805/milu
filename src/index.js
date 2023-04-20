import app from './app.js'


app.listen(app.get('port'));
console.log('Hola mundito',app.get('port'));