let active_item = 0

const right_arrow = document.querySelector('.right')
const left_arrow = document.querySelector('.left')
const carousel = document.querySelector('.carousel')
const carousel_items = carousel.children

function setItem(){

  for(const carousel_item of carousel_items){
    carousel_item.style.opacity = 0
  }

  carousel_items[active_item].style.opacity = 1

}

right_arrow.addEventListener('click', function(){
  
  active_item++

  if(carousel_items.length == active_item){
    active_item = 0
  }

  setItem()

})

left_arrow.addEventListener('click', function(){

  active_item--

  if(active_item == -1){
    active_item = carousel_items.length -1
  }

  setItem()

})

setItem()