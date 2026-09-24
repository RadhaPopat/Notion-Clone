from sqlmodel import SQLModel, Field
from typing import Optional

class User(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key = True)
    name: str
    email: str = Field(unique=True, index=True)
    password_hash: str

class Workspace(SQLModel, table=True):
    __tablename__ = "workspace"

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    owner_id: int = Field(foreign_key="user.id")


class Page(SQLModel, table=True):
    __tablename__ = "page"

    id: Optional[int] = Field(default=None, primary_key=True)
    title: str
    workspace_id: int = Field(foreign_key="workspace.id")
    parent_id: Optional[int] = Field(
        default=None,
        foreign_key="page.id"
    )