import express, { Application, json } from "express";
import cors from "cors";
import * as mongoose from "mongoose";
import * as Api from "./api-util";
import * as DB from "./db-util";
import { Cache } from "./cache-util";
import { NBAGame } from "./types/nba-game";
import { MLBGame } from "./types/mlb-game";

const app: Application = express();

app.use(json(), cors());

const nbaCache = new Cache({
    label: "nba-route",
    ttl: 15000,
    requestOrigin: () => Api.getGame<NBAGame>("6c974274-4bfc-4af8-a9c4-8b926637ba74"),
    requestCache: () => DB.getGame<NBAGame>("6c974274-4bfc-4af8-a9c4-8b926637ba74"),
    saveCache: (game) => DB.updateGame("6c974274-4bfc-4af8-a9c4-8b926637ba74", game),
});

app.get("/games/nba", async (_, res) => {
    res.json(await nbaCache.get());
});

const mlbCache = new Cache({
    label: "mlb-route",
    ttl: 15000,
    requestOrigin: () => Api.getGame<MLBGame>("eed38457-db28-4658-ae4f-4d4d38e9e212"),
    requestCache: () => DB.getGame<MLBGame>("eed38457-db28-4658-ae4f-4d4d38e9e212"),
    saveCache: (game) => DB.updateGame("eed38457-db28-4658-ae4f-4d4d38e9e212", game),
});

app.get("/games/mlb", async (_, res) => {
    res.json(await mlbCache.get());
});

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, function () {
    console.log(`Awesome app is listening on port: ${PORT}`);
});

const DB_URI = process.env.DB_URI;

if (!DB_URI) {
    console.error("Could not find DB_URI env variable");
    process.exit(-1);
}

mongoose
    .connect(DB_URI)
    .then(() => {
        console.log(`Awesome db is connected on: ${DB_URI}`);
    })
    .catch(() => {
        console.log(`Awesome db failed to connect on: ${DB_URI}`);
    });
