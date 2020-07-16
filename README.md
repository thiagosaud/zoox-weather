<h1 align="center">
	<img alt="GoStack" src="temp/zoox-logo.png" width="1000px" />
</h1>

<h3 align="center">Zoox Weather</h3>

<p align="center">
  <img alt="GitHub stars" src="https://img.shields.io/github/stars/thiagobonisoficial/zoox-weather?style=social">
  <img alt="GitHub forks" src="https://img.shields.io/github/forks/thiagobonisoficial/zoox-weather?style=social">
</p>

<p align="center">
  <img alt="GitHub" src="https://img.shields.io/github/license/thiagobonisoficial/zoox-weather?color=%2362df5e&logoColor=%2362df5e">

  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/thiagobonisoficial/zoox-weather?color=%2362df5e&logoColor=%2362df5e">

  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/thiagobonisoficial/zoox-weather?color=%2362df5e&logoColor=%2362df5e">

  <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/thiagobonisoficial/zoox-weather?color=%2362df5e&logoColor=%2362df5e">
</p>

<p align="center">
  <a href="#rocket-about-the-challenge">About the Project</a>&nbsp;&nbsp;&nbsp;
  |&nbsp;&nbsp;&nbsp;<a href="#electric_plug-how-to-use">How to Use</a>
  &nbsp;
  |&nbsp;&nbsp;&nbsp;<a href="#memo-license">License</a>
</p>

## :rocket: About the Project

This project was created to _demonstrate all my knowledge with the Angular platform and its ecosystem_ such as state manipulation with the [NGRX library](https://ngrx.io/guide/store) and event-based development with the [RXJS library](https://rxjs-dev.firebaseapp.com/guide/overview) for the company _Zoox_.

The [Json-Server](https://github.com/typicode/json-server) was also used to create a _"mock"_, where I _simulate the backend_, [Prettier](https://prettier.io/) and [Husky](https://github.com/typicode/husky) to _control style-guide_, _code standardization and versioning_.

### Notes

If it is necessary to generate a key to be able to use the API, then to do this, do the following:

1. [Access the website ](https://rapidapi.com/community/api/open-weather-map?) and generate your _key from this api_.

2. Go to the `environment` files and _replace_ the words `"INSERT THE KEY"` with yours.

Remember, the free mode will be used, with this the system can generate an _"error" toast_, but in fact this means that the API is giving http `429 status`.

### Store

_There are two items in the store, which are:_

- `Authentication`
- `Weather`
- `World`

`Authentication`: refers to user authentication, where the token and the fake user are generated.

`Weather`: refers to the use of the mentioned API.

`World`: refers to the use of some data from countries and cities of the same "moved" in the "backend" which is the json-server..

### Backend

As I said before, the backend was created with `Json-Server`, don't worry that the whole procedure is described in the next section. However, for a brief understanding, when starting the server, we can access the two existing routes, which are:

1. http://localhost:4300/user
2. http://localhost:4300/world

## :electric_plug: How to use

So when this project is cloned on your machine, it is necessary to install its modules using the package manager `YARN`...
If you do not have `YARN` properly installed on your machine, [access this link](https://yarnpkg.com/) to download and install...
If you already have `YARN` installed, open `terminal` (linux) or `cmd` (windows) at the root of the project where the `package.json` file is located and run the following command:

```
yarn
```

After that, `YARN` will install all the project dependencies for you...
The second step is to start the "backend" (Json-Server) of the project, for this I have already prepared a command in the script of the file `package.json`, just just run the following command:

```
yarn start_backend
```

Finally, we can start the project with the following command:

```
ng serve
```

**Note:** The control of the requests are made by the `switchMap` of the `RXJS library` and which is inside the `SideEffects` of the determined item in the `Store`, however as the backend was "moved" with the `Json-Server` keep in mind that sometimes it may not be able to handle the requests and fall, so stay tuned at the command prompt! _Also remember, if this happens, roll back the server, returning the_ `database.json` _file to the original._

## :memo: License

This project is under the MIT License. See the [LICENSE](LICENSE) for more details..

---

Made with ♥ and with the intention of learning and passing on knowledge. 👋
