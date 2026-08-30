# Basic Form Gathering App

This is a simple project designed to help you learn how to deploy a frontend to **Vercel** and a backend to **Render**.

## Project Structure
- `frontend/`: Contains simple HTML, CSS, and JS.
- `backend/`: Contains a Node.js/Express API.

---

## 1. Local Testing

### Backend
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```
   The backend will run on `http://localhost:3000`.

### Frontend
1. Open `frontend/index.html` directly in your web browser.
2. Try submitting the form. It will send a request to your local backend.

---

## 2. Pushing to GitHub (Preparation for Deployment)

Both Vercel and Render deploy directly from your GitHub repository.

1. Go to [GitHub](https://github.com/) and create a new repository (e.g., `basic-form-app`).
2. Open your terminal at the root of your project (`D:\basic-form-project`).
3. Run the following commands:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/basic-form-app.git
   git push -u origin main
   ```

---

## 3. Deploying the Backend to Render

1. Go to [Render](https://render.com/) and create an account.
2. Click **New +** and select **Web Service**.
3. Connect your GitHub account and select your `basic-form-app` repository.
4. Fill in the following settings:
   - **Name**: `form-backend` (or whatever you prefer)
   - **Root Directory**: `backend` *(Important!)*
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Click **Create Web Service**.
6. Wait for the deployment to finish. Render will give you a URL like `https://form-backend.onrender.com`.

---

## 4. Deploying the Frontend to Vercel

1. **Update Frontend Code**: Open `frontend/script.js` and change `BACKEND_URL` from `http://localhost:3000/api/submit` to your new Render URL:
   ```javascript
   const BACKEND_URL = 'https://form-backend.onrender.com/api/submit';
   ```
2. Commit and push this change to GitHub:
   ```bash
   git add .
   git commit -m "Update backend URL"
   git push
   ```
3. Go to [Vercel](https://vercel.com/) and sign up.
4. Click **Add New...** -> **Project**.
5. Import your `basic-form-app` repository from GitHub.
6. In the configuration settings:
   - **Project Name**: `basic-form-frontend`
   - **Root Directory**: Click "Edit" and select `frontend` *(Important!)*
   - You don't need to change build commands because it's a static HTML site.
7. Click **Deploy**.

Congratulations! You now have a live frontend on Vercel talking to a live backend on Render.
