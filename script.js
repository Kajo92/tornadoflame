
/*--------------------------------------------------------------mnenu przestaje być transparentne w momencie scrolowania----------------------------------------------------------------------------*/

window.onscroll = function() {myFunction()};

var navbar = document.getElementById("navbar");
var sticky = navbar.offsetTop;

function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.remove("transparent");
  } else {
    navbar.classList.add("transparent");
  }
}

/*-------------------------------------------------------------------------------------------------płynne przewijanie do sekcji----------------------------------------------------------------------*/
  

  document.querySelectorAll('nav a[href^="#"], a.button-pricing[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});


/*---------------------------------------------------------------------------------------coś z formularzem-------------------------------------------------------------------------------------------*/
const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let parent = this.parentNode;
  parent.classList.add("focus");
}

function blurFunc() {
  let parent = this.parentNode;
  if (this.value == "") {
    parent.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});

/* _----------------------------------------------------------------------------BURGER-------------------------------------------------------------------------------------------------*/

document.addEventListener('DOMContentLoaded', function () {
  const burger = document.querySelector('.burger');
  const navLinks = document.querySelector('.nav-links');

  burger.addEventListener('click', function() {
    navLinks.classList.toggle('active');
  });
});




/*------------------------------------------------------------------------------przyciski ze slajdera--------------------------------------------------------------------------------------*/

document.addEventListener("DOMContentLoaded", function() {

  // Funkcja do zmiany obrazu w slajderze
  function changeSlide(container, slideId) {
      var slides = container.querySelectorAll('.wrapper-holder > div, .wrapper-holder2 > div'); // Zmodyfikowany selektor
      slides.forEach(function(slide) {
          slide.style.display = 'none'; // ukrywa wszystkie slajdy
      });

      var activeSlide = container.querySelector('#' + slideId);
      if (activeSlide) {
          activeSlide.style.display = 'block'; // pokazuje wybrany slajd
      }
  }

  // Dodanie obsługi kliknięć dla pierwszego slajdera
  var container1 = document.querySelector('.container1');
  var buttons1 = container1.querySelectorAll('.button-holder .button');
  buttons1.forEach(function(button) {
      button.addEventListener('click', function() {
          var slideId = button.getAttribute('data-target');
          changeSlide(container1, slideId);
      });
  });

  // Dodanie obsługi kliknięć dla drugiego slajdera
  var container2 = document.querySelector('.container2');
  var buttons2 = container2.querySelectorAll('.button-holder2 .button'); // Ujednolicony selektor
  buttons2.forEach(function(button) {
      button.addEventListener('click', function() {
          var slideId = button.getAttribute('data-target');
          changeSlide(container2, slideId);
      });
  });

  // Ustawienie początkowego slajdu dla obu slajderów
  changeSlide(container1, 'slider-img-1');
  changeSlide(container2, 'slider2-img-1');

});


/*---------------------------------------------------------- POP UP PO KLIKNIĘCIU WYŚLIJ -----------------------------------------------------------------------------------------------------------*/

/*'Mail trafił do naszej bazy danych (zapewniamy pełną poufność i bezpieczeństwo). Odezwiemy się jak tylko produkt pojawi się w naszym magazynie.' + Green*/

document.getElementById('email-form').addEventListener('submit', function(event) {
  event.preventDefault();
  var email = document.getElementById('email-input').value;
  console.log('E-mail zapisany:', email);

  var existingMessageDiv = document.getElementById('error-message'); // Sprawdź, czy komunikat już istnieje
  if (!existingMessageDiv) {
      // Jeśli nie istnieje, utwórz nowy
      var messageDiv = document.createElement('div');
      messageDiv.id = 'error-message'; // Nadaj identyfikator
      messageDiv.textContent = 'Nieznany błąd. Prosimy przesłać wiadomość bezpośrednio na adres mailowy: biuro@tornadoflame.pl';
      messageDiv.style.color = 'black';
      document.getElementById('popup-email').appendChild(messageDiv);
  } else {
      // Jeśli istnieje, po prostu zaktualizuj tekst
      existingMessageDiv.textContent = 'Nieznany błąd. Prosimy przesłać wiadomość bezpośrednio na adres mailowy: biuro@tornadoflame.pl';
  }
});
/*----------------------------------------------------------pop up brak towaru-----------------------------------------------------------------------------------------------------------*/

function createPopup(id){
  let popupNode = document.querySelector(id);
  let overlay = popupNode.querySelector(".overlay");
  let closeBtn= popupNode.querySelector(".close-btn");
  function openPopup(){
    popupNode.classList.add("active");
  }
  function closePopup(){
    popupNode.classList.remove("active");
  }
  overlay.addEventListener("click", closePopup);
  closeBtn.addEventListener("click", closePopup);
  return openPopup;
}

let popup = createPopup("#popup");
document.querySelector("#open-popup").addEventListener("click", popup);



/*----------------------------------------------------------SLIDER------------------------------------------------------------------------------------------------*/

function initializeSlider(sliderContainer) {
  let slider = sliderContainer.querySelector('.list');
  let items = sliderContainer.querySelectorAll('.item');
  let next = sliderContainer.querySelector('.buttons button:nth-of-type(2)');
  let prev = sliderContainer.querySelector('.buttons button:nth-of-type(1)');
  let dots = sliderContainer.querySelectorAll('.dots li');
  let active = 0;

  next.addEventListener('click', function() {
      active = active + 1 < items.length ? active + 1 : 0;
      reloadSlider();
  });

  prev.addEventListener('click', function() {
      active = active - 1 >= 0 ? active - 1 : items.length - 1;
      reloadSlider();
  });

  function reloadSlider() {
      slider.style.left = -items[active].offsetLeft + 'px';
      let lastActiveDot = sliderContainer.querySelector('.dots li.active');
      if (lastActiveDot) {
          lastActiveDot.classList.remove('active');
      }
      dots[active].classList.add('active');
  }

  dots.forEach((dot, key) => {
      dot.addEventListener('click', () => {
          active = key;
          reloadSlider();
      });
  });

  window.addEventListener('resize', reloadSlider);
}

// Inicjalizacja każdego slidera
document.querySelectorAll('.slider').forEach(initializeSlider);
