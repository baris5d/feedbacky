FROM continuumio/miniconda:latest

WORKDIR /app

COPY . .

RUN ["chmod", "+x", "./entry.sh"]

RUN conda env create -f environment.yml

SHELL ["conda", "run", "-n", "backend", "/bin/bash", "-c"]

ENV PATH /opt/conda/envs/backend/bin:$PATH

EXPOSE 5001

RUN source activate backend

ENTRYPOINT ["python"]
CMD ["app.py"]
