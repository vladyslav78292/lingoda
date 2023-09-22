'use strict';

const slider = document.querySelector(".slider")
const trail = document.querySelector(".trail").querySelectorAll("div")

let value = 0
let trailValue = 0
let interval = 4002220

const slide = (condition) => {
    clearInterval(start)
    condition === "increase" ? initiateINC() : initiateDEC()
    move(value, trailValue)
    animate()
    start = setInterval(() => slide("increase"), interval);
}

const initiateINC = () => {
    trail.forEach(cur => cur.classList.remove("active"))
    value === 80 ? value = 0 : value += 20
    trailUpdate()
}

const initiateDEC = () => {
    trail.forEach(cur => cur.classList.remove("active"))
    value === 0 ? value = 80 : value -= 20
    trailUpdate()
}

const move = (S, T) => {
    slider.style.transform = `translateX(-${S}%)`
    trail[T].classList.add("active")
}

const tl = gsap.timeline({defaults: {duration: 0.6, ease: "power2.inOut"}})
tl.from(".bg", {x: "-100%", opacity: 0})
  .from(".details", {opacity: 0}, "-=0.3")
  .from("button", {opacity: 0, y: "-40px"}, "-=0.8")

const animate = () => tl.restart()

const trailUpdate = () => {
    if (value === 0) {
        trailValue = 0
    } else if (value === 20) {
        trailValue = 1
    } else if (value === 40) {
        trailValue = 2
    } else if (value === 60) {
        trailValue = 3
    } else {
        trailValue = 4
    }
}   

let start = setInterval(() => slide("increase"), interval)

document.querySelectorAll("svg").forEach(cur => {
    cur.addEventListener("click", () => cur.classList.contains("next") ? slide("increase") : slide("decrease"))
})

const clickCheck = (e) => {
    clearInterval(start)
    trail.forEach(cur => cur.classList.remove("active"))
    const check = e.target
    check.classList.add("active")

    if(check.classList.contains("box1")) {
        value = 0
    } else if (check.classList.contains("box2")) {
        value = 20
    } else if (check.classList.contains("box3")) {
        value = 40
    } else if (check.classList.contains("box4")) {
        value = 60
    } else {
        value = 80
    }
    trailUpdate()
    move(value, trailValue)
    animate()
    start = setInterval(() => slide("increase"), interval)
}

trail.forEach(cur => cur.addEventListener("click", (ev) => clickCheck(ev)))

const touchSlide = (() => {
    let start, move, change, sliderWidth

    slider.addEventListener("touchstart", (e) => {
        start = e.touches[0].clientX
        sliderWidth = slider.clientWidth/trail.length
    })
    
    slider.addEventListener("touchmove", (e) => {
        e.preventDefault()
        move = e.touches[0].clientX
        change = start - move
    })

    const mobile = (e) => {
        change > (sliderWidth/4)  ? slide("increase") : null;
        (change * -1) > (sliderWidth/4) ? slide("decrease") : null;
        [start, move, change, sliderWidth] = [0,0,0,0]
    }
    slider.addEventListener("touchend", mobile)
})()

const feedback = document.querySelector('.feedback__slider');
const feedback_offset = 300;

function feedbackUpdateHeight(height) {
  if (!height) return false;
  feedback.style.height = `${height + feedback_offset}px`;
}

if (feedback) {
  feedbackUpdateHeight(feedback.querySelector('.feedback__item').offsetHeight);

  const feedback_slider = new Swiper(feedback, {
    direction: 'vertical',
    slidesPerView: 'auto',
    autoHeight: true,
    centeredSlides: true,
    spaceBetween: 30,
    grabCursor: true,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  feedback_slider.on('slideChange', () => {
    setTimeout(() => {
      feedbackUpdateHeight(feedback_slider.slides[feedback_slider.activeIndex].offsetHeight);
    }, 300);
  });
}

let scrollpos = window.scrollY
const header = document.querySelector("header")
const header_height = header.offsetHeight


const add_class_on_scroll = () => header.classList.add("header__background");
const remove_class_on_scroll = () => header.classList.remove("header__background");


window.addEventListener('scroll', function() { 
  scrollpos = window.scrollY

  if (scrollpos >= header_height) { add_class_on_scroll() }
  else { remove_class_on_scroll() }

})

const cookie_button = document.querySelectorAll('.cookie-popup__button');
const cookie_popup = document.getElementById('cookie-popup');

cookie_button.forEach((element) => {
  element.addEventListener('click', () => {
    cookie_popup.style = "bottom: -220px";
  })
})

setTimeout(() => {
  document.querySelector('#cookie-popup').style = 'bottom: 30px; opacity: 1;';
}, 1000);
