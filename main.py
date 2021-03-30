from fastapi import FastAPI, HTTPException
from starlette.responses import RedirectResponse
from pydantic import BaseModel
from keys import CDB_PASS
from shortuuid import uuid
from sqlalchemy import create_engine, Column, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from cockroachdb.sqlalchemy import run_transaction

tags_metadata = [
  {
    "name": "Temp",
    "description": "might expand on this might not"
  }
]

app = FastAPI(
  title="FastAPI for EverythingBagel",
  description="An API for LHD Share - By Julien",
  version="0.1.0",
  openapi_tags=tags_metadata
)
Base = declarative_base()

class Data(Base):
  __tablename__ = 'EBData'
  id = Column(Integer, primary_key=True)
  uses = Column(Integer, nullable=False)

  def __repr__(self):
    return self.uses

engine = create_engine(
  f"cockroachdb://julien:{CDB_PASS}@free-tier.gcp-us-central1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full&sslrootcert=certs/cc-ca.crt&options=--cluster=good-bat-867",
  echo=False
)
Base.metadata.create_all(engine)
sessionmaker = sessionmaker(engine)

@app.get('/start', tags=['Temp'])
def start():
  def setup(session):
    found = session.query(Data).filter_by(id=1).first()
    if found:
      print("ITS CREATED")
      raise HTTPException(status_code=401, detail="exists")
    data = Data(id=1, uses=0)
    session.add(data)
    return {"message": "success"}
  return run_transaction(sessionmaker, setup)

@app.get('/', tags=['Temp'])
def root():
  return RedirectResponse('/docs', 301)

@app.get('/uses', tags=['Temp'])
def get_uses():
  def callback(session):
    found = session.query(Data).filter_by(id=1).first()
    return found.uses
  data = run_transaction(sessionmaker, callback)
  return {"data": data}

@app.post('/uses', tags=['Temp'])
def post_use():
  def callback(session):
    found = session.query(Data).filter_by(id=1).first()
    if not found:
      raise HTTPException(status_code=404, detail="Not found")
    new_uses = found.uses = found.uses + 1
    print(new_uses)
    session.query(Data).filter_by(id=1).update({"uses": new_uses})
    return {"message": "update success"}
  return run_transaction(sessionmaker, callback)