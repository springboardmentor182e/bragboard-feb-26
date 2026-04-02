from fastapi import APIRouter
from models.player import Player
from services.leaderboard_service import add_player, get_leaderboard

router = APIRouter()

@router.post("/player")
def create_player(player: Player):
    return add_player(player)

@router.get("/leaderboard")
def leaderboard():
    return get_leaderboard()