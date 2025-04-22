const gameplane = document.querySelector('.gameplane')
const pierog = gameplane.querySelector('.pierog')
const lives = gameplane.querySelector('.lives')
const start_button = gameplane.querySelector('#start_button')
const restart_button = gameplane.querySelector('#restart_button')
const game_intro_modal = gameplane.querySelector('.game-intro-modal')
const game_over_modal = gameplane.querySelector('.game-over-modal')
const score = gameplane.querySelector('.score')
const score_small = gameplane.querySelector('.score-small')

let can_be_hit = true
class Meteor {

  constructor(){
    this.dom = null
    this.top = 0
    this.speed = 15
    this.createMeteor()
  }

  createMeteor(){
    this.dom = document.createElement('div')
    this.dom.className = 'meteor'
    gameplane.append(this.dom)
    // generowanie metorów w losowych miejsach od left
    this.dom.style.left = (Math.random() * (gameplane.offsetWidth - this.dom.offsetWidth)) + 'px'
    this.dom.style.transition = '.2s'
    this.top = -(this.speed + this.dom.offsetHeight)
  }

  moveDown(){
    this.top += this.speed
    this.dom.style.top = this.top + 'px'
  }

  detectCollision() {
    const rect_a = this.dom.getBoundingClientRect()
    const rect_b = pierog.getBoundingClientRect()
  
    const overlap_left = Math.max(rect_a.left, rect_b.left)
    const overlap_top = Math.max(rect_a.top, rect_b.top)
    const overlap_right = Math.min(rect_a.right, rect_b.right)
    const overlap_bottom = Math.min(rect_a.bottom, rect_b.bottom)
  
    if (
      overlap_right > overlap_left &&
      overlap_bottom > overlap_top
    ) {
      return {
        x: overlap_left,
        y: overlap_top
      }
    }
  
    return null
  }

  handleCollision(){
    if(can_be_hit){
      const collision_coords = this.detectCollision()
      if(collision_coords){
  
        lives.children[0].remove()

        if(! lives.children.length){
          return game.over()
        }
  
        can_be_hit = false
        pierog.classList.add('cant-hit')
  
        setTimeout(() => {
          can_be_hit = true
          pierog.classList.remove('cant-hit')
        }, 3000);
  
      }
    }
  }

}

class Meteors {

  list = [];
  iteration_to_new_meteor = 20; // jak szybko nowe meteory się tworzą - tą możesz ustawić 
  iteration_to_new_meteor_left = 0; // ta liczba zmienia się automatycznie

  addNewItem(){
    this.list.push(new Meteor())
  }

  createNewMeteor(){

    this.iteration_to_new_meteor_left--

    if(this.iteration_to_new_meteor_left < 1){
      this.iteration_to_new_meteor_left = this.iteration_to_new_meteor
      this.addNewItem()
    }

  }

  interval(){
    this.createNewMeteor()
    this.list = this.list.filter(meteor => {
      
      meteor.moveDown()
      meteor.handleCollision()
      
      if(meteor.top > gameplane.offsetHeight + meteor.dom.offsetHeight){
        meteor.dom.remove()
        return false
      }

      return true

    })

  }

  clear(){

    this.list.forEach(meteor => {
      meteor.dom.remove()
    })

    this.list = []

  }

}

const meteors = new Meteors()

class Mushroom extends Meteor{

  constructor(){
    super()
    this.dom.className = 'mushroom'
  }

  handleCollision(){

    const collision_coords = this.detectCollision()
    if(collision_coords){

      this.dom.remove()
      score.innerText = (score.innerText * 1) + 1

    }

  }

}

class Mushrooms extends Meteors{ 

  addNewItem(){
    this.list.push(new Mushroom())
  }
  
}

const mushrooms = new Mushrooms()

gameplane.addEventListener('mousemove', e => {
  if(game.progress){
    pierog.style.left = (e.clientX - (pierog.offsetWidth / 2) ) + 'px'
    pierog.style.top = (e.clientY - (pierog.offsetHeight / 2) ) + 'px'
  }
})

const game = {
  progress: false,
  interval: null,
  start(){

    this.progress = true
    gameplane.classList.add('in-game')
    this.interval = setInterval(() => {
      
      meteors.interval()
      mushrooms.interval()

    }, 100)

  },
  over(){

    clearInterval(this.interval)
    gameplane.classList.remove('in-game')
    this.progress = false

    game_over_modal.style.display = 'flex'
    score_small.innerText = score.innerText
    score.innerText = 0

  },
  restoreLives(){
    for(let i = 0; i < 3; i++){
      const live = document.createElement('div')
      live.className = 'live'
      lives.append(live)
    }
  },
}

start_button.addEventListener('click', () => {
  game_intro_modal.style.display = 'none'
  game.start()
})

restart_button.addEventListener('click', () => {

  meteors.clear()
  mushrooms.clear()

  game.restoreLives()
  game.start()

  game_over_modal.style.display = 'none'

})