from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer
from jwt_handler import verify_access_token

security = HTTPBearer()

def get_current_user(credentials = Depends(security)):

    token = credentials.credentials

    payload = verify_access_token(token)

    if not payload:
        raise HTTPException(
            status_code=401,
            detail="Invalid or expired token"
        )

    return payload["user_id"]