## Gallery App
All backend business logic seamlessly integrates with the `backend/gallery` project, a sophisticated Django-React application powered by Django REST Framework.

API Document - `http://127.0.0.1:8000`

### Project Setup

#### Backend

- Go to - `cd backend`
- Setting up a virtualenv

    ```
    cd ~
    python3 -m venv env
    source ~/env/bin/activate
    source venv/bin/activate
    Install the Python dependencies for the project
    ```
- Install requirements - `pip install -r requirements/development.txt`
- Run the development server - `python manage.py runserver 0:8000`
- Visit `127.0.0.1:8000` on your browser and see that the project is running.

#### Frontend

- Go to - `cd frontend`
- Install requirements - `npm install`
- Run the development server - `npm run dev`
- Visit `localhost:5173` on your browser and see that the project is running.
