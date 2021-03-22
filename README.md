### nestjs

### Installation

`yarn install`

### Running the project

#### Local

To start database server run the following command

```bash
docker-compose -f docker-compose.local.yml up
```

It will run mongodb, mongo-express, will create a folder `mongodb` with mongodb data files.  
Access [http://localhost:8081/](http://localhost:8081/) for mongo express

To start API server run the following command

```bash
yarn start:dev:local
```

#### Production

To start database server run the following command

```bash
docker-compose -f docker-compose.production.yml up
```
