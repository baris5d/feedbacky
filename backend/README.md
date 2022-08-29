# Feedbacky Backend
## 🔨Docker
First, docker engine docker compose must be installed. You may find the directions in following documentations.
[Docker installation guide](https://docs.docker.com/engine/install/ "") 📑
[Docker compose installation guide](https://docs.docker.com/compose/install/ "") 📑

In the project root,  the following command can be used for standing up the application.
`docker-compose build` && `docker-compose up`

All requirements will be installed into docker container and it will expose via 5001 port.
## 💻 Installation
For the dependency and environment management, you may install [Conda](https://docs.conda.io/projects/conda/en/latest/index.html "") environment into your system.
Then, you can create backend environment with the dependencies in environment.yml file via the following command.
conda env create -f environment.yml
After creating environment, you may run the following commands and server will be up on 5001 port.

```
> conda activate backend
> python app.py
```

## 📪 REST API
You can find the available endpoints in [Postman Documentation.](https://documenter.getpostman.com/view/2680853/VUxKTUYG "")