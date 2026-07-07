# Bosnian Pyramids — Tourism Website

A Django-based tourism guide for the Bosnian Pyramids in Visoko, Bosnia & Herzegovina.

## Local Development

```bash
# Create and activate virtual environment
py -m venv venv
venv\Scripts\activate   # Windows
# source venv/bin/activate  # macOS/Linux

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start dev server
python manage.py runserver
```

Visit http://localhost:8000

## Deploy to Railway via GitHub

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Create a new Railway project**
   - Go to [railway.app](https://railway.app) and log in
   - Click **New Project → Deploy from GitHub repo**
   - Select your repository

3. **Set environment variables** in Railway dashboard:
   | Variable | Value |
   |----------|-------|
   | `SECRET_KEY` | A long random string (generate one at https://djecrety.ir) |
   | `DEBUG` | `False` |
   | `ALLOWED_HOSTS` | `your-app-name.up.railway.app` |

4. Railway auto-detects Python/Django via Nixpacks and runs `gunicorn` via `railway.json`.

5. After deploy, run migrations via Railway shell:
   ```bash
   python manage.py migrate
   ```

## Pages

| URL | Page |
|-----|------|
| `/` | Home |
| `/pyramids/` | The Pyramids |
| `/getting-here/` | Getting Here |
| `/visit/` | Plan Your Visit |
