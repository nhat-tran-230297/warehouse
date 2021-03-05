# Reaktor assignment for junior developers - Warehouse

More information about the [Assignment](https://www.reaktor.com/junior-dev-assignment/).

Have a look at the [Online Demo](https://reaktor-warehouse-api.herokuapp.com/).

<br>

# Table of contents
* [Introduction](#introduction)
* [Installation](#installation)

# Introduction

The assignment is about building a single and simple UI web app for the client, which is a clothing brand . 

> *To do their work efficiently, the warehouse workers need a fast and simple listing page per product category, where they can check simple product and availability information from a single UI.*

> *There are three product categories they are interested in for now: gloves, facemasks, and beanies. Therefore, you should implement three web pages corresponding to those categories that list all the products in a given category. One requirement is to be easily able to switch between product categories quickly.*

<br>

## API documentation is as follows

* GET /v2/products/:category – Return a listing of products in a given category. 

* GET /v2/availability/:manufacturer – Return a list of availability info.

The APIs are running at https://bad-api-assignment.reaktor.com/.

<br>

I am currently adding more testing function and building a backend server to utilize efficient cashing, they will be pushed to gitHub soon.

<br>

# Installation

This implementation was decorated with [React](https://reactjs.org/). You can either visualize via the [Online Demo](https://warehouse-bad-api-assignments.herokuapp.com/) or run locally by following these steps.

1. Download and Install [NodeJS](https://nodejs.org/en/) (skip this step if you already have NodeJS)

2. Get the code
```
git clone https://github.com/nhat-tran-230297/warehouse
cd warehouse
```

3. Run the application 

```
npm start
```

More information about [React documentation](https://reactjs.org/docs/getting-started.html).

<br>

## Use docker

<br>

Another easy and fancy way is to use docker. Make sure you install [docker](https://docs.docker.com/get-docker/) on your laptop.

In the terminal, pull the image from the docker registry into your computer via the command 

```
docker image pull /nhattran2302/warehouse:latest
```

After pulling successfully, run a container with port 5000 or any ports of your selection

```
docker run -d -p 5000:{your-port} --name {name-your-container} /nhattran2302/warehouse:latest
```



