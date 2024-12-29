// ========== GRAB REFERENCES ========== //
const navItems = document.querySelectorAll('.nav-item');
const content = document.getElementById('content');
const clothIcon = document.getElementById('clothIcon');

// ========== BOTTOM NAV CLICK HANDLER ========== //
navItems.forEach(item => {
  item.addEventListener('click', () => {
    // Remove "active" from all items
    navItems.forEach(i => i.classList.remove('active'));
    item.classList.add('active');

    // Identify which page to load
    const target = item.dataset.target;
    switch (target) {
      case 'home':
        showHomePage();
        clothIcon.style.display = 'block';
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

// ========== HOME PAGE ========== //
function showHomePage() {
  content.innerHTML = `
    <div class="home-container">
      <img class="homepage-banner" src="Image/Page/homepage.svg" alt="Homepage" />
      <img class="mannequin" id="mannequin" src="Image/Page/mannequin.svg" alt="Mannequin" />
      <button id="nextButton" class="next-button">
        <img src="Image/Page/next_button.svg" alt="Next Button" />
      </button>
    </div>
  `;

  const mannequin = document.getElementById('mannequin');
  const nextButton = document.getElementById('nextButton');

  const rainbowFilters = [
    'none',  
    'invert(40%) sepia(100%) saturate(1000%) hue-rotate(0deg) brightness(90%)',   
    'invert(40%) sepia(100%) saturate(1000%) hue-rotate(30deg) brightness(90%)',  
    'invert(40%) sepia(100%) saturate(1000%) hue-rotate(60deg) brightness(90%)',  
    'invert(40%) sepia(100%) saturate(1000%) hue-rotate(100deg) brightness(90%)', 
    'invert(40%) sepia(100%) saturate(1000%) hue-rotate(190deg) brightness(90%)', 
    'invert(40%) sepia(100%) saturate(1000%) hue-rotate(260deg) brightness(90%)', 
    'invert(40%) sepia(100%) saturate(1000%) hue-rotate(290deg) brightness(90%)', 
  ];

  let colorIndex = 0;

  nextButton.addEventListener('click', () => {
    colorIndex = (colorIndex + 1) % rainbowFilters.length;
    mannequin.style.filter = rainbowFilters[colorIndex];
  });
}

// ========== CLOTH PAGE ========== //
function showClothPage() {
  content.innerHTML = `
    <div class="cloth-page">
      <button id="createOutfitBtn" class="top-button">Create Outfit Set</button>
      <button id="addItemBtn" class="top-button">Add Item</button>
    </div>
  `;

  const createOutfitBtn = document.getElementById('createOutfitBtn');
  createOutfitBtn.addEventListener('click', () => {
    alert('Create Outfit Set clicked (not implemented yet).');
  });

  const addItemBtn = document.getElementById('addItemBtn');
  addItemBtn.addEventListener('click', () => {
    showAddItemForm();
  });
}

// ========== ADD ITEM FORM ========== //
function showAddItemForm() {
  content.innerHTML = `
    <div class="add-item-page">
      <h2>Add a New Item</h2>
      <label for="itemType">Type:</label>
      <select id="itemType">
        <option value="Shoes">Shoes</option>
        <option value="Tops">Tops</option>
        <option value="Pants">Pants</option>
        <option value="Hats">Hats</option>
      </select>

      <label for="itemColor">Color:</label>
      <select id="itemColor">
        <option value="Red">Red</option>
        <option value="Orange">Orange</option>
        <option value="Yellow">Yellow</option>
        <option value="Green">Green</option>
        <option value="Blue">Blue</option>
        <option value="Navy">Navy</option>
        <option value="Purple">Purple</option>
        <option value="Rainbow">Rainbow</option>
      </select>

      <label for="itemTag">Tag:</label>
      <input type="text" id="itemTag" placeholder="Enter a tag..." />

      <button id="submitItemBtn">Submit</button>
    </div>
  `;

  const submitItemBtn = document.getElementById('submitItemBtn');
  submitItemBtn.addEventListener('click', () => {
    const itemType = document.getElementById('itemType').value;
    const itemColor = document.getElementById('itemColor').value;
    const itemTag = document.getElementById('itemTag').value.trim();

    const newItem = {
      type: itemType,
      color: itemColor,
      tag: itemTag,
    };

    fetch('http://localhost:3000/api/add-item', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newItem)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('Item saved:', data);
      alert('Item added successfully!');
      showClothPage();
    })
    .catch(err => {
      console.error('Error adding item:', err);
      alert('Failed to add item.');
    });
  });
}

// ========== TOP-RIGHT CLOTH ICON CLICK ========== //
clothIcon.addEventListener('click', () => {
  showClothPage();
  clothIcon.style.display = 'none';
  navItems.forEach(item => item.classList.remove('active'));
});

// ========== LOAD HOME PAGE BY DEFAULT ========== //
document.addEventListener('DOMContentLoaded', () => {
  const homeNav = document.querySelector('.nav-item[data-target="home"]');
  if (homeNav) {
    homeNav.click();
  }
});
