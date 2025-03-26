const base_url = 'https://api.weatherapi.com/v1'

const key = '56fa909c22c34441901180038252503'

const url = base_url + '/forecast.json?key=' + key + '&q=Torun&days=5'

console.log(url)

fetch(url)
.then(data => data.json())
.then(data => console.log(data))
