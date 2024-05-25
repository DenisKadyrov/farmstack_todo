from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from model import Todo

from database import (
    fetch_one,
    fetch_all,
    create_todo,
    update_todo,
    delete_todo
)

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"status": 200}

@app.get("/api/todo")
async def get_todo():
    response = await fetch_all()
    return response


@app.get("/api/todo{id}", response_model=Todo)
async def get_todo_by_id(id: str):
    responce = await fetch_one(id)
    if responce:
        return responce
    raise HTTPException(404, "Not found todo with this title")

@app.post("/api/todo", response_model=Todo)
async def post_todo(todo: Todo):
    responce = await create_todo(todo.dict())
    print(responce)
    if responce:
        return responce
    raise HTTPException(400, "Something went wrong or Bad request")

@app.put("/api/todo{id}", response_model=Todo)
async def update_todo_item(id: str, data: str):
    responce = await update_todo(id, data)
    if responce:
        return responce
    raise HTTPException(400, "Failed to update todo item")

@app.delete("/api/todo{id}")
async def remove_todo(id: str):
    responce = await delete_todo(id)
    if responce:
        return {"Deleted": True}
    raise HTTPException(400, "Failed to delete todo item")