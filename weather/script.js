const setWeather = () => {

    const input = document.querySelector('#city')
    let city = input.value
    const base_url = 'https://api.weatherapi.com/v1'
    const key = '56fa909c22c34441901180038252503'
    const url = base_url + '/forecast.json?key=' + key + '&q=' + city + '&days=5'
    
    fetch(url)
    .then(data => data.json())
    .then(json => {
  
      const city_name = document.querySelector('.city_name')
      city_name.innerText = json.location.name
  
      const country_name = document.querySelector('.country_name')
      country_name.innerText = json.location.country
      
      const forecast_wrapper = document.querySelector('.forecast-wrapper')
      const items = Array.from(forecast_wrapper.children)
      items.forEach((item, index) => {
    
        const data = json.forecast.forecastday[index]
        
        const image = item.querySelector('img')
        image.src = data.day.condition.icon
    
        const date = item.querySelector('.date')
        date.innerText = data.date
    
        const temp = item.querySelector('.temp')
        temp.innerText = data.day.maxtemp_c + '°C'
    
      })
    
      const current = document.querySelector('main')
    
      const image = current.querySelector('img')
      image.src = json.current.condition.icon
    
      const date = current.querySelector('.date')
      date.innerText = json.current.last_updated
    
      const temp = current.querySelector('.temp')
      temp.innerText = json.current.temp_c + '°C'
    
    })
    .catch(error => modal("City " + city + " not found. Try again."))
  
  }
  
  setWeather()
  
  const form = document.querySelector('#form')
  form.addEventListener('submit', event => {
    event.preventDefault()
    setWeather()
  })
  
  const modal = (text) => {
  
    const modal_wrapper = document.createElement('div')
    modal_wrapper.className = 'modal-wrapper'
    modal_wrapper.style.cssText = `
      position: fixed;
      background: rgba(0,0,0,.95);
      inset:0;
      display:flex;
      justify-content: center;
      align-items: center;
    `
  
    const modal = document.createElement('div')
    modal.className = 'modal'
    modal.innerText = text
    modal.style.cssText = `
      background: #fff;
      padding:50px;
      display:flex;
      flex-direction: column;
      gap:15px;
    `
  
    const button = document.createElement('button')
    button.innerText = 'OK !'
  
    button.addEventListener('click', () => {
      document.body.removeChild(modal_wrapper)
    })
  
    modal.append(button)
    modal_wrapper.append(modal)
    document.body.append(modal_wrapper)
  
  }