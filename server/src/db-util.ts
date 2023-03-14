import * as mongoose from "mongoose";
import { MLBGame } from "./types/mlb-game";
import { NBAGame } from "./types/nba-game";

// Would usually create a proper schema for the model but for the sake of time will skip it now
const gameSchema = new mongoose.Schema({}, { strict: false });
const GameModel = mongoose.model("Game", gameSchema);

export function getGame<T extends NBAGame | MLBGame>(id: string): Promise<T> {
    return GameModel.findOne({ id }) as Promise<T>;
}

export async function updateGame(id: string, game: NBAGame | MLBGame): Promise<void> {
    await GameModel.updateOne({ id }, game, { upsert: true });
}
