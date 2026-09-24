from pydantic import BaseModel, Field, field_validator

class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class WorkspaceCreate(BaseModel):
    name: str = Field(min_length=1)

    @field_validator("name")
    @classmethod
    def validate_name(cls, value):
        value = value.strip()

        if not value:
            raise ValueError("Workspace name cannot be empty.")

        return value

class PageCreate(BaseModel):
    title: str = Field(min_length=1)
    workspace_id : int
    parent_id: int | None = None

    @field_validator("title")
    @classmethod
    def validate_title(cls, value):
        value = value.strip()

        if not value:
            raise ValueError("Page title cannot be empty")

        return value