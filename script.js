// ========== GRAB REFERENCES ========== //
const navItems = document.querySelectorAll('.nav-item');
const content = document.getElementById('content');

// Stores all submitted outfits (persisted in localStorage)
let savedOutfits = JSON.parse(localStorage.getItem('savedOutfits') || '[]');
let lastOutfitIndex = -1;

function persistOutfits() {
  localStorage.setItem('savedOutfits', JSON.stringify(savedOutfits));
}

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
        break;
      case 'search':
        content.innerHTML = '<h1>Search Page</h1>';
        break;
      case 'heart':
        showClothPage();
        break;
      case 'user':
        content.innerHTML = '<h1>User Page</h1>';
        break;
    }
  });
});

// ========== HOME PAGE ========== //
function showHomePage() {
  content.innerHTML = `
    <div class="home-container">
      <img class="homepage-banner" src="Image/Page/homepage.svg" alt="Homepage"/>
      <img class="mannequin" id="mannequin" src="Image/Page/mannequin.svg" alt="Mannequin"/>
      <div class="recommendation-area">
        <h3>Today's Recommendation</h3>
        <button id="nextOutfitBtn" class="next-outfit">Next</button>
      </div>
    </div>
  `;
  const mannequin = document.getElementById("mannequin");
  const nextOutfitBtn = document.getElementById("nextOutfitBtn");

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

  nextOutfitBtn.addEventListener('click', () => {
    colorIndex = (colorIndex + 1) % rainbowFilters.length;
    mannequin.style.filter = rainbowFilters[colorIndex];
    displayRandomOutfit(true);
  });

  displayRandomOutfit();
}

function displayRandomOutfit(noRepeat = false) {
  document.querySelectorAll(".saved-item").forEach(el => el.remove());
  if (savedOutfits.length === 0) return;

  let index = Math.floor(Math.random() * savedOutfits.length);
  if (noRepeat && savedOutfits.length > 1) {
    while (index === lastOutfitIndex) {
      index = Math.floor(Math.random() * savedOutfits.length);
    }
  }
  lastOutfitIndex = index;
  const outfit = savedOutfits[index];
  const homeContainer = document.querySelector(".home-container");
  Object.entries(outfit).forEach(([slot, item]) => {
    const div = document.createElement("div");
    div.classList.add("saved-item");
    div.dataset.slot = slot;
    div.textContent = item.tag;
    homeContainer.appendChild(div);
  });
}

// ========== CLOTH PAGE ========== //
function showClothPage() {
    content.innerHTML = `
    <div class="cloth-page">
      <button id="createOutfitBtn" class="top-button">Create Outfit Set</button>
      <button id="addItemBtn" class="top-button">Add Item</button>
      <button id="deleteOutfitBtn" class="top-button">Delete Outfit</button>
      <button id="deleteItemBtn" class="top-button">Delete Item</button>
    </div>
  `;

  const createOutfitBtn = document.getElementById('createOutfitBtn');
  createOutfitBtn.addEventListener('click', () => {
    // Instead of just an alert, actually show the Outfit Set page:
    showOutfitSetPage();
  });

  const addItemBtn = document.getElementById('addItemBtn');
  addItemBtn.addEventListener('click', () => {
    showAddItemForm();
  });

  const deleteOutfitBtn = document.getElementById('deleteOutfitBtn');
  deleteOutfitBtn.addEventListener('click', () => {
    showDeleteOutfitPage();
  });

  const deleteItemBtn = document.getElementById('deleteItemBtn');
  deleteItemBtn.addEventListener('click', () => {
    showDeleteItemPage();
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
  submitItemBtn.addEventListener('click', (e) => {
    e.preventDefault();
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
      showAddItemForm();
    })
    .catch(err => {
      console.error('Error adding item:', err);
      alert('Failed to add item.');
    });
  });
}

function showOutfitSetPage() {
    content.innerHTML = `
      <div class="outfit-set-page">
        <h2>Create Your Outfit</h2>
        <div class="mannequin-area">
          <img src="Image/Page/mannequin.svg" alt="Mannequin" class="mannequin" />

          <!-- Drop zones for hat/top/pants/shoes -->
          <div class="drop-zone" data-slot="hat">Hat Slot</div>
          <div class="drop-zone" data-slot="top">Top Slot</div>
          <div class="drop-zone" data-slot="pants">Pants Slot</div>
          <div class="drop-zone" data-slot="shoes">Shoes Slot</div>
        </div>

        <button id="submitOutfitBtn" class="submit-button">Submit Outfit</button>

        <!-- Scrollable list of items to drag/click -->
        <div class="scroll-container" id="scrollContainer">
          <!-- Items will be injected here from /api/items -->
        </div>
      </div>
    `;
    // Keep track of which item is placed in each slot
    const assignedItems = {};

    // 1) Fetch existing items from the server
    fetch('http://localhost:3000/api/items')
      .then(response => response.json())
      .then(items => {
        const scrollContainer = document.getElementById('scrollContainer');

        const typeToSlot = {
          Hats: 'hat',
          Tops: 'top',
          Pants: 'pants',
          Shoes: 'shoes'
        };

        // 2) For each item, create a small square DIV that is draggable
        items.forEach(item => {
          const div = document.createElement('div');
          div.classList.add('draggable-item');
          div.setAttribute('draggable', 'true');
          
          // Store some data to identify the item (e.g. tag, type, color, id)
          div.dataset.id = item.id;
          div.dataset.type = item.type;
          div.dataset.color = item.color;
          div.dataset.tag = item.tag;
  
          // Display just the tag or a combo
          div.textContent = item.tag; // e.g. "hat1", "shoesRed", etc.
  
          // Handle dragstart
          div.addEventListener('dragstart', e => {
            // We’ll pass item info in dataTransfer
            e.dataTransfer.setData('text/plain', JSON.stringify({
              id: item.id,
              tag: item.tag,
              type: item.type,
            color: item.color
          }));
        });

          // Allow click-to-assign
          div.addEventListener('click', () => {
            const slotName = typeToSlot[item.type];
            if (!slotName) return;
            const zone = document.querySelector(`.drop-zone[data-slot="${slotName}"]`);
            if (zone) {
              zone.textContent = item.tag;
              assignedItems[slotName] = item;
            }
          });

          scrollContainer.appendChild(div);
        });
      })
      .catch(err => console.error('Error fetching items:', err));
  
    // 3) Drag/Drop events on the drop zones
    const outfitSetPage = document.querySelector('.outfit-set-page');
    
    // Use event delegation or individually add:
    outfitSetPage.addEventListener('dragover', e => {
      // By default, dropping is disabled. We must preventDefault.
      e.preventDefault();
    });
    
    outfitSetPage.addEventListener('drop', e => {
      e.preventDefault();
      // Check if the drop target is one of the .drop-zone divs
      const dropZone = e.target.closest('.drop-zone');
      if (!dropZone) return; // not dropping on a valid zone
  
      // Retrieve dragged item’s data
      const data = e.dataTransfer.getData('text/plain');
      if (!data) return;
  
      const draggedItem = JSON.parse(data);
      // For demonstration, we’ll just show a label in the zone
      dropZone.textContent = `${draggedItem.tag}`;

      // Store the assignment
      assignedItems[dropZone.dataset.slot] = draggedItem;
    });

    // Submit button stores the outfit and returns to cloth page
  const submitBtn = document.getElementById('submitOutfitBtn');
  submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    savedOutfits.push({ ...assignedItems });
    persistOutfits();
    showOutfitSetPage();
  });
}

function showDeleteItemPage() {
  content.innerHTML = `
    <div class="delete-page">
      <h2>Delete Item</h2>
      <div id="itemDeleteList" class="delete-container"></div>
    </div>
  `;

  const list = document.getElementById('itemDeleteList');
  fetch('http://localhost:3000/api/items')
    .then(res => res.json())
    .then(items => {
      items.forEach(item => {
        const row = document.createElement('div');
        row.classList.add('delete-row');
        const label = document.createElement('span');
        label.textContent = `${item.type} ${item.color} ${item.tag} - Delete?`;
        const yes = document.createElement('button');
        yes.textContent = 'Yes';
        yes.classList.add('delete-btn');
        yes.addEventListener('click', () => {
          fetch(`http://localhost:3000/api/item/${item.id}`, { method: 'DELETE' })
            .then(res => {
              if (res.ok) row.remove();
            });
        });
        row.appendChild(label);
        row.appendChild(yes);
        list.appendChild(row);
      });
    });
}

function showDeleteOutfitPage() {
  content.innerHTML = `
    <div class="delete-page">
      <h2>Delete Outfit</h2>
      <div id="outfitDeleteList" class="delete-container"></div>
    </div>
  `;

  const list = document.getElementById('outfitDeleteList');
  if (savedOutfits.length === 0) {
    list.textContent = 'No outfits saved.';
    return;
  }
  savedOutfits.forEach((outfit, idx) => {
    const row = document.createElement('div');
    row.classList.add('delete-row');
    const label = document.createElement('span');
    label.textContent = `Outfit ${idx + 1} - Delete?`;
    const yes = document.createElement('button');
    yes.textContent = 'Yes';
    yes.classList.add('delete-btn');
    yes.addEventListener('click', () => {
      savedOutfits.splice(idx, 1);
      persistOutfits();
      row.remove();
    });
    row.appendChild(label);
    row.appendChild(yes);
    list.appendChild(row);
  });
}


// ========== LOAD HOME PAGE BY DEFAULT ========== //
document.addEventListener('DOMContentLoaded', () => {
  const homeNav = document.querySelector('.nav-item[data-target="home"]');
  if (homeNav) {
    homeNav.click();
  }
});
