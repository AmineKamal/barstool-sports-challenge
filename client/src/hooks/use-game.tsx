import { MLBGame } from "@backend/mlb";
import { NBAGame } from "@backend/nba";
import { IScorePanelProps } from "../components/ScorePanel";
import { useAsync } from "./use-async";

interface IDigestedGame {
    scoreOverview: IScorePanelProps;
    stats: Record<string, object[]>;
}

function digestGame(game: NBAGame | MLBGame): IDigestedGame {
    const scoreOverview = {
        awayTeam: {
            abbreviation: game.away_team.abbreviation,
            score: game.away_period_scores,
            name: game.away_team.full_name,
        },
        homeTeam: {
            abbreviation: game.home_team.abbreviation,
            score: game.home_period_scores,
            name: game.home_team.full_name,
        },
    };

    const stats: Record<string, object[]> =
        game.league === "NBA"
            ? {
                  away_stats: game.away_stats,
                  home_stats: game.home_stats,
                  away_totals: [game.away_totals],
                  home_totals: [game.home_totals],
                  officials: game.officials,
              }
            : {
                  away_batters: game.away_batters,
                  home_batters: game.home_batters,
                  away_pitchers: game.away_pitchers,
                  home_pitchers: game.home_pitchers,
                  away_fielding: game.away_fielding,
                  home_fielding: game.home_fielding,
                  away_batters_totals: [game.away_batter_totals],
                  home_batters_totals: [game.home_batter_totals],
                  officials: game.officials,
              };

    return { scoreOverview, stats };
}

async function fetchGame(league: "mlb" | "nba") {
    const res = await fetch(`http://localhost:3000/games/${league}`);
    const game = (await res.json()) as MLBGame;

    return digestGame(game);
}

export function useGame(league: "mlb" | "nba") {
    const { data: game, isLoading, dispatch } = useAsync({ fn: fetchGame, autoDispatch: { args: [league] } });

    return { game, isLoading, refresh: () => dispatch(league) };
}
