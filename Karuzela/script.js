const right_arrow = document.querySelector('.right');
let active_item = 0;
const carousel = document.querySelector('.carusel');
const carousel_items = carousel.children

function setItem(){
    console.log(carousel_items);

    for(const carousel_item of carousel_items){
        console.log('carousel_item', carousel_item);
    carousel_item.style.opacity = 0;
    }


carousel_items[active_item].style.opacity = 1;
}

right_arrow.addEventListener('click', function() {
})

setItem();
