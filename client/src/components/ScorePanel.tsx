import { Grid, Stack, Typography } from "@mui/material";
import { pick, sum } from "../utils";
import { QuickGrid } from "./QuickGrid";

export interface IScorePanelProps {
    awayTeam: { abbreviation: string; score: number[]; name: string };
    homeTeam: { abbreviation: string; score: number[]; name: string };
}

function ScoreDisplayBox({ name, points, backgroundColor }: { name: string; points: number; backgroundColor: string }) {
    return (
        <Stack sx={{ backgroundColor }} padding="10px" alignItems="center" justifyContent="center">
            <Typography color="white" variant="h4" gutterBottom>
                {name}
            </Typography>
            <Typography color="white" variant="h5" gutterBottom>
                {points}
            </Typography>
        </Stack>
    );
}

const AWAY_COLORS = ["#9A2617", "#C2571A", "#1496BB"] as const;
const HOME_COLORS = ["#3C6478", "#093145", "#C02F1D"] as const;

function ScoreDisplay({ awayTeam, homeTeam }: IScorePanelProps) {
    return (
        <Grid sx={{ backgroundColor: "#F1F3F4" }} container alignItems="center" justifyContent="center">
            <Grid item xs={5.5}>
                <ScoreDisplayBox
                    name={awayTeam.name}
                    points={sum(awayTeam.score)}
                    backgroundColor={pick(AWAY_COLORS)}
                />
            </Grid>
            <Grid item xs={1}>
                <Typography variant="h5" gutterBottom textAlign="center">
                    {awayTeam.score.length}th
                </Typography>
            </Grid>
            <Grid item xs={5.5}>
                <ScoreDisplayBox
                    name={homeTeam.name}
                    points={sum(homeTeam.score)}
                    backgroundColor={pick(HOME_COLORS)}
                />
            </Grid>
        </Grid>
    );
}

function reduceScoreArray(score: number[]): Record<number, number> {
    return score.reduce((prev, current, index) => ({ ...prev, [index + 1]: current }), {});
}

export function ScorePanel({ awayTeam, homeTeam }: IScorePanelProps) {
    const columns = ["team", ...awayTeam.score.map((_, i) => String(i + 1))];
    const rows = [
        { team: awayTeam.abbreviation, ...reduceScoreArray(awayTeam.score) },
        { team: homeTeam.abbreviation, ...reduceScoreArray(homeTeam.score) },
    ];

    return (
        <>
            <QuickGrid columns={columns} rows={rows} />
            <ScoreDisplay awayTeam={awayTeam} homeTeam={homeTeam} />
        </>
    );
}
