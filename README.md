# 🚀 **DailyFit Application**

DailyFit is a mobile-friendly web application designed to manage and customize virtual outfits. It offers dynamic navigation, interactive UI elements, and seamless backend integration.

---

## 📂 **Project Structure**

```
DailyFit/
├── cloth-app-server/   # Backend server
│   ├── data.json       # Stores persisted user data
│   ├── package.json    # Backend dependencies
│   ├── server.js       # Backend server logic
│   ├── node_modules/   # Backend libraries
│
├── index.html          # Main frontend structure
├── styles.css          # Styling for the application
├── script.js           # Frontend dynamic behavior
└── Image/              # Image assets for UI components
```

---

## 🛠️ **How to Run the Server**

1. Open the terminal and navigate to the server folder:
```bash
cd cloth-app-server
```
2. Install dependencies:
```bash
npm install
```

3. Start the backend server:
```bash
node server.js
```

4. Open the application in your browser:
```
http://localhost:3000
```

---

## 📱 **Application Overview**

### **1. Home Page**
- Displays a **mannequin image** with customizable colors.
- A **"Next" button** cycles through various mannequin colors.
- The **Cloth Icon (Top-Right)** provides quick navigation to the clothing section.

### **2. Bottom Navigation Bar**
- **Home:** Navigate to the homepage.
- **Search:** Search functionality (placeholder view).
- **Heart:** View favorite items (placeholder view).
- **User:** User profile section (placeholder view).

### **3. Clothing Section**
- **Create Outfit Set:** Placeholder functionality for creating outfits.
- **Add Item:** Navigate to the Add Item page.

### **4. Add Item Page**
- Allows users to add clothing items with the following details:
  - **Type:** Select clothing type (e.g., Shoes, Tops, Pants).
  - **Color:** Select item color (e.g., Red, Blue, Green).
  - **Tag:** Add a custom tag for the item.
- A **Submit button** saves the item data via backend API.

### **5. Dynamic UI**
- Active navigation items are highlighted.
- Icons dynamically change color based on the selected page.

---

## 🌐 **API Endpoints**

### ➡️ **1. Add Item**
- **URL:** `POST /api/add-item`  
- **Description:** Add a new clothing item to the backend.

**Request Body Example:**
```json
{
  "type": "Shoes",
  "color": "Red",
  "tag": "Favorite"
}
```

**Response Example:**
```json
{
  "message": "Item added successfully",
  "item": {
    "type": "Shoes",
    "color": "Red",
    "tag": "Favorite"
  }
}
```

### ➡️ **2. Get All Items**
- **URL:** `GET /api/items`  
- **Description:** Retrieve all saved clothing items.

**Response Example:**
```json
[
  {
    "type": "Shoes",
    "color": "Red",
    "tag": "Favorite"
  }
]
```

---

## 🔑 **Key Features**

- **Interactive Mannequin Customization:** Change mannequin colors dynamically.
- **Add Clothing Items:** Add items with type, color, and tags.
- **Persistent Data Storage:** All items are saved in `data.json`.
- **Dynamic Navigation Bar:** Switch between Home, Search, Favorites, and User views seamlessly.

---

## 💻 **How to Interact with the Application**

1. **Navigate Pages:** Use the bottom navigation bar to switch between views.
2. **Customize Mannequin:** Click the "Next" button to change mannequin colors.
3. **Add Item:**
   - Navigate to the **"Add Item"** page.
   - Fill in **Type**, **Color**, and **Tag** fields.
   - Click **Submit** to save the item.
4. **Verify Backend Storage:**
   - Added items are saved to `data.json`.
   - Retrieve all items via `http://localhost:3000/api/items`.

---

## 🚀 **How to Stop the Server**
In the terminal, press:
```
Ctrl + C
```

---

## 📚 **Technologies Used**
- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js, Express.js  
- **Data Storage:** JSON File  

---

## 🤝 **Contributing**
1. Fork the repository.  
2. Create a new branch: `git checkout -b feature-branch`  
3. Commit changes: `git commit -m "Add new feature"`  
4. Push to branch: `git push origin feature-branch`  
5. Open a Pull Request.

---

## 📝 **License**
This project is licensed under the MIT License.

