# 🍳 Smart Recipe Generator

The **Smart Recipe Generator** is an intelligent web application that suggests recipes based on the ingredients you have. Simply input the ingredients you’d like to use, and the app will generate delicious recipes that match your selection — saving time, reducing food waste, and inspiring creativity in the kitchen!

---

## 🚀 Features

- 🧠 **AI-Based Recipe Generation:** Generates recipes based on your ingredients using the Grok API.  
- 🧾 **Ingredient Input:** Enter multiple ingredients and get instant results.  
- 🌍 **Cuisine & Meal Filters:** (Optional) Filter recipes by cuisine or meal type.  
- ⚡ **Fast & Intuitive UI:** Built with a clean and responsive design.  
- ☁️ **Scalable Backend:** Node.js + Express architecture ready for deployment.

---

## 🏗️ Project Architecture

This project follows a **Client–Server** structure:

```
Smart-Recipe-Generator/
├── Client/
│   └── recipe-gen/        # React frontend
│       ├── src/
│       ├── public/
│       └── package.json
├── Server/                # Node.js + Express backend
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   ├── server.js
│   └── package.json
└── README.md
```

- **Client:** Handles the user interface and interaction.  
- **Server:** Processes input, handles API logic, and fetches or generates recipes via the Grok API.

---

## 🧰 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React.js, JavaScript, HTML5, CSS3 |
| **Backend** | Node.js, Express.js |
| **AI Integration** | Grok API (xAI) |
| **Environment Management** | dotenv |
| **Version Control** | Git & GitHub |
| **Hosting (Optional)** | AWS / Render / Vercel |

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Prabhav0403/Smart-Recipe-Generator.git
cd Smart-Recipe-Generator
```

### 2️⃣ Install Dependencies

**For Server:**
```bash
cd Server
npm install
```

**For Client:**
```bash
cd ../Client/recipe-gen
npm install
```

### 3️⃣ Environment Variables (Grok API)

Create a `.env` file inside the **Server** folder and add:

```
PORT=3001
GROK_API_KEY=your_grok_api_key_here
```

*(You can get your Grok API key from your [xAI account dashboard](https://x.ai/)).*

---

## ▶️ Running the Application

### Start the Server:
```bash
cd Server
npm start
```

### Start the Client:
```bash
cd ../Client/recipe-gen
npm start
```

Your app will run at:
```
Frontend → http://localhost:3000
Backend  → http://localhost:3001
```

---

## 🧑‍🍳 Usage

1. Open the application in your browser.  
2. Enter a list of ingredients (e.g., `Apple, Banana, Milk`).  
3. (Optional) Choose cuisine type or meal category.  
4. Click on **Generate Recipe**.  
5. The app will display a smartly generated recipe including name, ingredients, and cooking steps powered by Grok AI.

**Example:**
```
Input: Apple, Banana
Output: French Apple Banana Smoothie 🍌🍎
```

---

## 🧱 Folder Breakdown

| Folder | Description |
|---------|--------------|
| `Client/recipe-gen/src/` | Frontend source code (React components, pages, etc.) |
| `Server/routes/` | API endpoints |
| `Server/controllers/` | Logic for processing requests |
| `Server/models/` | Data models (if applicable) |
| `.env` | Environment configuration |
| `package.json` | Dependency management |

---

## 💡 Future Enhancements

- ✅ Add **User Authentication**
- ✅ Implement **Saved Recipes / Favorites**
- ✅ Support **Image Upload for Ingredients**
- ✅ Add **Voice Input for Ingredients**
- ✅ Integrate **Nutrition Facts API**
- ✅ Use **Real-time Grok Streaming Responses**

---

## 🤝 Contributing

Contributions are welcome!  
To contribute:

1. Fork this repository  
2. Create a new branch (`git checkout -b feature/new-feature`)  
3. Commit your changes (`git commit -m 'Add new feature'`)  
4. Push to your branch (`git push origin feature/new-feature`)  
5. Open a Pull Request  

---

## 🧾 License

This project is licensed under the **MIT License**.  
Feel free to modify and distribute the code with attribution.

---

## 📬 Contact

**👨‍💻 Author:** [Prabhav Srivastava](https://github.com/Prabhav0403)  
**📧 Email:** prabhavsrivastava0403@gmail.com  
**🌐 GitHub:** [https://github.com/Prabhav0403](https://github.com/Prabhav0403)

---

⭐ If you like this project, give it a **star** on GitHub!  
Your support keeps the project growing. 🌱
