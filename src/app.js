const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {

  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, techs } = request.body;
  const url = "https://github.com/rocketseat-education/bootcamp-gostack-desafios/";
  const id = uuid();

  const repository = {
    id,
    title,
    techs,
    url,
    likes: 0
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, techs, url } = request.body;

  const repositoryIndex = repositories.findIndex(repo => repo.id = id);

  if (repositoryIndex < 0) return response.status(400).json({ message: "No repository" });

  const repository = {
    id,
    title,
    techs,
    url,
    likes: repositories[repositoryIndex].likes
  };

  repositories[repositoryIndex] = repository;

  return response.status(201).json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repo => repo.id = id);

  if (repositoryIndex < 0) return response.status(400).json({ message: "No repository" });

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repo => repo.id = id);

  if (repositoryIndex < 0) return response.status(400).json({ message: "No repository" });

  const { likes } = repositories[repositoryIndex];

  repositories[repositoryIndex].likes = likes + 1;

  return response.status(204).send();
});

module.exports = app;
