from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel, Session

from database import engine
from models import User, Workspace
from schemas import UserCreate, UserLogin, WorkspaceCreate
from security import hash_password, verify_password
from jwt_handler import create_access_token
from auth import get_current_user

app = FastAPI()

app.add_middleware(
    CORSMiddleware,

    allow_origins=[
        "http://localhost:3000"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

@app.on_event("startup")
def create_tables():
    SQLModel.metadata.create_all(engine)


@app.get("/")
def home():
    return {"message": "Notion Clone Backend is running!"}


@app.get("/test-db")
def test_db():
    with engine.connect() as connection:
        return {"message": "Database connection successful!"}

@app.post("/register")
def register_user(user_data: UserCreate):

    with Session(engine) as session:
        existing_user = session.query(User).where(
            User.email == user_data.email
        ).first()

        if existing_user:
            raise HTTPException(
                status_code=400,
                detail="Email already registered"
            )
    
    hashed_password = hash_password(user_data.password)

    new_user = User(
        name = user_data.name,
        email=user_data.email,
        password_hash = hashed_password
    )

    with Session(engine) as session:
        session.add(new_user)
        session.commit()
        session.refresh(new_user)

    return{
        "message" : "User registered successfully",
        "user_id" : new_user.id
    }  

@app.post("/login")
def login_user(user_data: UserLogin):

    with Session(engine) as session:
        user = session.query(User).where(
            User.email == user_data.email
        ).first()

        if not user:
            raise HTTPException(
                status_code = 401,
                detail="Invalid email or password"
            )

        if not verify_password(user_data.password, user.password_hash):
            raise HTTPException(
                status_code = 401,
                detail = "Invalid email or password"
            )

        access_token = create_access_token(user.id)
        return{
            "message" : "Login successful",
            "access_token" : access_token,
            "user_id" : user.id
        }

@app.get("/me")
def get_me(user_id: int = Depends(get_current_user)):
    return {
        "user_id": user_id
    }

@app.post("/workspaces")
def create_workspace(
    workspace_data: WorkspaceCreate,
    user_id: int = Depends(get_current_user)
):
    new_workspace = Workspace(
        name=workspace_data.name,
        owner_id=user_id
    )

    with Session(engine) as session:
        session.add(new_workspace)
        session.commit()
        session.refresh(new_workspace)

    return{
        "message" : "Workspace created successfully !",
        "workspace_id" : new_workspace.id,
        "name" : new_workspace.name
    }

