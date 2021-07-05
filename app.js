const mainSlider = document.querySelector('.slider-main')
const innerSliderOne = document.querySelector('.slider-inner-one')
const innerSliderTwo = document.querySelector('.slider-inner-two')
console.log(innerSliderTwo)
let images = [...document.querySelectorAll('svg')]
const imagesItems = [];

// Position params
let current = 0
let target = 0
let ease = 0.075

const lerp = (start, end, t) => {
    return start * (1 - t) + end * t
}

const init = () => {
    // console.log(window.innerWidth, mainSlider.getBoundingClientRect().width);
    document.body.style.height = `${mainSlider.getBoundingClientRect().width - (window.innerWidth - window.innerHeight)}px`
}

const transformElement = (el, transform) => {
    el.style.transform = transform
}

const animate = () => {
    target = window.scrollY
    current = lerp(current, target, ease).toFixed(2)
    transformElement(mainSlider, `translate3d(${-current}px, 0, 0)`)
    transformElement(innerSliderTwo, `translate3d(${-current*1.1}px, 0, 0)`)

    for(let i = 0; i < imagesItems.length; i++ ) {
        imagesItems[i].render()
    }

    webkitRequestAnimationFrame(animate)
}

window.addEventListener('resize', () => {
    init()
})

// Intersection observer options
const options = {
    rootMargin: '0px',
    threshold: .9
}

class ImageItem {
    constructor(el) {
        this.el = el
        this.isVisible = false
        this.observer = new IntersectionObserver(entries => {
            entries.forEach(entry => this.isVisible = entry.isIntersecting)
        })
        this.observer.observe(this.el)
        this.current = 150
        this.target = 150
        this.ease = 0.1
        this.setDisplacement();
    }

    setDisplacement() {
        this.el.querySelector('feDisplacementMap').scale.baseVal = this.current
    }

    render() {
        if(this.isVisible && this.target != 0) {
            this.target = 0
            this.el.classList.add('active')
        }
        this.current = lerp(this.current, this.target, this.ease).toFixed(2)
        this.el.querySelector('feDisplacementMap').scale.baseVal = this.current
    }
}

images.forEach(image => {
    imagesItems.push(new ImageItem(image))
})

init()
animate()