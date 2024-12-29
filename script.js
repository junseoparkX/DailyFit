const navItems = document.querySelectorAll('.nav-item');
const content = document.getElementById('content');
const clothIcon = document.getElementById('clothIcon');

// Handle Bottom Nav Click
navItems.forEach(item => {
  item.addEventListener('click', () => {
    // Remove active from all items
    navItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');

    // Change content dynamically based on target
    const target = item.dataset.target;
    switch (target) {
        case 'home':
            content.innerHTML = `
              <div class="home-container">
                <img class="homepage-banner" src="Image/Page/homepage.svg" alt="Homepage" />
                <img class="mannequin" id="mannequin" src="Image/Page/mannequin.svg" alt="Mannequin" />
                <button id="nextButton" class="next-button">
                  <img src="Image/Page/next_button.svg" alt="Next Button" />
                </button>
              </div>
            `;
            
            clothIcon.style.display = 'block';
          
            // Grab references
            const mannequin = document.getElementById('mannequin');
            const nextButton = document.getElementById('nextButton');
          
            // Define rainbow-like filters: first is 'none' => black
            const rainbowFilters = [
              'none',  // black
              'invert(40%) sepia(100%) saturate(1000%) hue-rotate(0deg) brightness(90%)',   // red
              'invert(40%) sepia(100%) saturate(1000%) hue-rotate(30deg) brightness(90%)',  // orange
              'invert(40%) sepia(100%) saturate(1000%) hue-rotate(60deg) brightness(90%)',  // yellow
              'invert(40%) sepia(100%) saturate(1000%) hue-rotate(100deg) brightness(90%)', // green
              'invert(40%) sepia(100%) saturate(1000%) hue-rotate(190deg) brightness(90%)', // blue
              'invert(40%) sepia(100%) saturate(1000%) hue-rotate(260deg) brightness(90%)', // indigo/purple
              'invert(40%) sepia(100%) saturate(1000%) hue-rotate(290deg) brightness(90%)', // violet/pink
            ];
          
            let colorIndex = 0; // start with black
            
            // "Next" => increment colorIndex and wrap
            nextButton.addEventListener('click', () => {
              colorIndex++;
              if (colorIndex >= rainbowFilters.length) {
                colorIndex = 0;  // go back to black
              }
              mannequin.style.filter = rainbowFilters[colorIndex];
            });
          
            break;
          
          
          
      case 'search':
        content.innerHTML = '<h1>Search Page</h1>';
        clothIcon.style.display = 'block';
        break;
      case 'heart':
        content.innerHTML = '<h1>Heart Page</h1>';
        clothIcon.style.display = 'block';
        break;
      case 'user':
        content.innerHTML = '<h1>User Page</h1>';
        clothIcon.style.display = 'block';
        break;
    }
  });
});

// Handle Cloth Icon Click
clothIcon.addEventListener('click', () => {
    content.innerHTML = '<h1>Welcome to the Cloth Page</h1>';
    clothIcon.style.display = 'none';
  
    // Turn all bottom nav icons to black
    navItems.forEach(item => {
      item.classList.remove('active');
    });
  });
  
// Automatically simulate a "home" click on first load
document.addEventListener('DOMContentLoaded', () => {
    // Find the 'home' nav item
    const homeNav = document.querySelector('.nav-item[data-target="home"]');
    if (homeNav) {
      homeNav.click();
    }
  });
  
