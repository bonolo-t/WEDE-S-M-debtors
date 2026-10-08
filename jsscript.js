// This is JavaScript for hamburger menu - Part 2
// When page loads
document.addEventListener('DOMContentLoaded', function() {
  // Get hamburger button
  const hamburger = document.querySelector('.hamburger');
  // Get menu ul
  const menu = document.querySelector('nav ul');
  
  // When hamburger is clicked
  hamburger.addEventListener('click', function() {
    // Toggle show class - show/hide menu
    menu.classList.toggle('show');
  });
});