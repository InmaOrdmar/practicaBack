# <p align ="center">✨Nodepop✨</p>

Nodepop is a really simple online shop web application. Nodepop users can buy or sell items-- either by browsing through a list of ads that can be filtered by tags, price and other features; or by creating new ads.

## 👾 Visit Nodepop -- now online!

Check out the online version of our Nodepop app at nodepop.inmaordmar.com.
You can also reach my personal page at www.inmaordmar.com.

## 👾 Run Nodepop locally

### 👾 Download MongoDB

[Download](https://www.mongodb.com/download-center#community)

### 👾 Install Nodepop dependencies

Enter this command from folder nodepop

```shell
npm install
```

### 👾 Initialize server

1. Rename .env.EXAMPLE file to .env and check if connection configuration is locally correct

1. Run this command from the appropiate folder in your MongoDB program files

    ```shell
    ./bin/mongod --dbpath ./data/db --directoryperdb
    ```

1. Initialize the database using

    ```shell
    npm run install-db
    ```

    and answer ``yes`` when prompted.

### 👾 Run Nodepop

To run the application in production mode, use

```shell
npm start
```

### 👾 Run Nodepop (development)

1. To run the application in development mode, use

    ```shell
    npm run dev
    ```

1. To interact with the database from command line, use

    ```shell
    ./bin/mongo
    ```

    from the appropiate folder in your MongoDB program files.

## ⭐️ Disclaimer

This is an assignment for my [web development studies](https://www.youtube.com/watch?v=dgDLE4RfzEk), not a web app for real life purposes.

<p align ="center">&copy; Inma Ordóñez 2019</p>
