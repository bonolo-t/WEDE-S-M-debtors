// main.js - Part 3

// When page loads - DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  
  // Accordion - when header clicked - show/hide content
  const accordionHeaders = document.querySelectorAll('.accordion-header'); // get all accordion headers
  accordionHeaders.forEach(function(header) { // loop each header
    header.addEventListener('click', function() { // when clicked
      const accordion = header.parentElement; // get parent accordion
      accordion.classList.toggle('active'); // toggle active class - show/hide
    });
  });

  // Tabs - when tab button clicked - show panel
  const tabButtons = document.querySelectorAll('.tab-btn'); // get all tab buttons
  tabButtons.forEach(function(btn) { // loop buttons
    btn.addEventListener('click', function() {
      const tabId = btn.dataset.tab; // get data-tab value - which panel to show
      // Remove active from all buttons
      document.querySelectorAll('.tab-btn').forEach(function(b) { b.classList.remove('active'); });
      // Remove active from all panels
      document.querySelectorAll('.tab-panel').forEach(function(p) { p.classList.remove('active'); });
      // Add active to clicked button
      btn.classList.add('active');
      // Add active to correct panel
      document.getElementById(tabId).classList.add('active');
    });
  });

  // Modal - popup - when button with data-modal clicked
  const modalButtons = document.querySelectorAll('[data-modal]'); // get buttons with data-modal attribute
  modalButtons.forEach(function(btn) {
    btn.addEventListener('click', function() {
      const modalId = btn.dataset.modal; // get modal id
      document.getElementById(modalId).classList.add('active'); // show modal
    });
  });
  // Close modal when X clicked
  const closeButtons = document.querySelectorAll('.close-modal');
  closeButtons.forEach(function(close) {
    close.addEventListener('click', function() {
      close.closest('.modal').classList.remove('active'); // hide modal
    });
  });

  // Lightbox - gallery - when image clicked - show big
  const galleryImages = document.querySelectorAll('.gallery img'); // all gallery images
  const lightbox = document.getElementById('lightbox'); // lightbox div
  const lightboxImg = document.getElementById('lightbox-img'); // image inside lightbox
  galleryImages.forEach(function(img) {
    img.addEventListener('click', function() {
      lightboxImg.src = img.src; // set lightbox image src to clicked image src
      lightbox.classList.add('active'); // show lightbox
    });
  });
  // Close lightbox when clicked
  if(lightbox) {
    lightbox.addEventListener('click', function() {
      lightbox.classList.remove('active'); // hide
    });
  }

  // Map - Leaflet - location based feature - Part 3 requirement
  const mapDiv = document.getElementById('map'); // get map div
  if(mapDiv) { // if map div exists on page
    const map = L.map('map').setView([-25.7479, 31.0258], 13); // create map - Pretoria coordinates
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { // openstreetmap tiles
      attribution: '© OpenStreetMap' // attribution
    }).addTo(map); // add tiles to map
    L.marker([-25.7479, 31.0258]).addTo(map).bindPopup('S&M Debtors - Gauteng Office').openPopup(); // marker with popup
  }

  // Dynamic content
  const products = [ // array of services 
    {name:"DEBT REVIEW REMOVAL", cat:"services", price:"R1500 - R3000", desc:"Remove debt review in 7 days"},
    {name:"JUDGEMENT REMOVAL", cat:"services", price:"R1200 - R2500", desc:"Remove judgements"},
    {name:"DEFAULTS REMOVAL", cat:"services", price:"R800 per account", desc:"Clear defaults"},
    {name:"PRESCRIPTION OF ACCOUNTS", cat:"services", price:"R1000", desc:"Prescribe old accounts"},
    {name:"ITC CLEARANCE", cat:"products", price:"R2000", desc:"ITC clearance and payment arrangement"},
    {name:"FULL CREDIT REPAIR", cat:"products", price:"R4500", desc:"All services package"}
  ];
  const container = document.getElementById('product-listings'); // container for dynamic listings
  function render(list) { // function to render listings
    if(!container) return; // if no container - stop
    container.innerHTML = ''; // clear container
    list.forEach(function(p) { // loop each product
      const div = document.createElement('div'); // create div element - DOM manipulation
      div.className = 'card'; // add card class
      div.innerHTML = '<h3>' + p.name + '</h3><p>' + p.cat + ' | ' + p.price + '</p><p>' + p.desc + '</p><button class="btn" data-modal="enquiryModal">Enquire</button>'; // inner HTML
      container.appendChild(div); // add to container
    });
  }
  if(container) { render(products); } // render if container exists

  // Search, Filter, Sort 
  const searchInput = document.getElementById('searchInput');
  const categoryFilter = document.getElementById('categoryFilter');
  const sortSelect = document.getElementById('sortSelect');
  function filterAndSort() { // filter function
    let filtered = [...products]; // copy array
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : ''; // search term lower case
    const cat = categoryFilter ? categoryFilter.value : 'all'; // category
    const sort = sortSelect ? sortSelect.value : 'default'; // sort type
    if(cat !== 'all') { filtered = filtered.filter(function(p){ return p.cat === cat; }); } // filter by cat
    if(searchTerm) { filtered = filtered.filter(function(p){ return p.name.toLowerCase().includes(searchTerm); }); } // filter by search
    if(sort === 'name-asc') { filtered.sort(function(a,b){ return a.name.localeCompare(b.name); }); } // sort A-Z
    if(sort === 'name-desc') { filtered.sort(function(a,b){ return b.name.localeCompare(a.name); }); } // sort Z-A
    render(filtered); // render filtered
  }
  if(searchInput) searchInput.addEventListener('input', filterAndSort); // when typing - filter
  if(categoryFilter) categoryFilter.addEventListener('change', filterAndSort); // when select changes
  if(sortSelect) sortSelect.addEventListener('change', filterAndSort);

  // DOM manipulation - dynamic year in footer 
  const yearSpan = document.getElementById('current-year'); // get year span
  if(yearSpan) { yearSpan.textContent = new Date().getFullYear(); } // set current year - 2026

});