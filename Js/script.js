window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 0) {
      navbar.classList.add('scrolled');
      navbar.classList.remove('transparent');
  } else {
      navbar.classList.add('transparent');
      navbar.classList.remove('scrolled');
  }
});

// Inicialmente, definir a classe como transparente
document.addEventListener('DOMContentLoaded', function() {
  const navbar = document.querySelector('.navbar');
  navbar.classList.add('transparent');
});