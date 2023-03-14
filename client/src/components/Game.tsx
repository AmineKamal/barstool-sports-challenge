import { Alert, Box, Button, CircularProgress, Typography } from "@mui/material";
import { useGame } from "../hooks/use-game";
import { MoreStats } from "./MoreStats";
import { ScorePanel } from "./ScorePanel";

interface IGameProps {
    league: "nba" | "mlb";
}

export function Game({ league }: IGameProps) {
    const { game, isLoading, refresh } = useGame(league);

    if (isLoading) {
        return <CircularProgress />;
    }

    if (!game) {
        return <Alert severity="error">Failed to fetch game!</Alert>;
    }

    return (
        <>
            <Box display="flex" justifyContent="space-between" alignItems="center" padding="15px">
                {/* Not really the latest game but just let's say it is */}
                <Typography variant="h5">Latest game results</Typography>
                <Button onClick={refresh}>Refresh</Button>
            </Box>
            <ScorePanel {...game.scoreOverview} />
            <MoreStats stats={game.stats} />
        </>
    );
}
