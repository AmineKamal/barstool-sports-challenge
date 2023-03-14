import axios from "axios";
import { MLBGame } from "./types/mlb-game";
import { NBAGame } from "./types/nba-game";

export async function getGame<T extends NBAGame | MLBGame>(id: string): Promise<T> {
    const res = await axios.get<T>(`https://chumley.barstoolsports.com/dev/data/games/${id}.json`);

    return res.data;
}
