from fastapi import APIRouter

from src.users.controller import router as users_router
from src.auth.controller import router as auth_router
from src.reports.controller import router as reports_router
from src.shoutouts.controller import router as shoutouts_router  # ✅ NEW

router = APIRouter()

# =========================================================
# USERS APIs
# =========================================================
router.include_router(users_router, prefix="/users", tags=["Users"])

# =========================================================
# AUTH APIs
# =========================================================
router.include_router(auth_router, prefix="/auth", tags=["Auth"])

# =========================================================
# REPORTS APIs
# =========================================================
router.include_router(reports_router, prefix="/reports", tags=["Reports"])

# =========================================================
# 🔥 SHOUTOUTS APIs (NEW)
# =========================================================
router.include_router(shoutouts_router, prefix="/shoutouts", tags=["Shoutouts"])