import { Box, Button } from "@mui/material";
import { useState } from "react";
import { Stats } from "./Stats";

interface IMoreStatsProps {
    stats: Record<string, object[]>;
}

export function MoreStats({ stats }: IMoreStatsProps) {
    const [moreStats, setMoreStats] = useState(false);

    function toggleMoreStats() {
        setMoreStats(!moreStats);
    }

    return (
        <>
            <Box display="flex" justifyContent="center" alignItems="center" padding="25px">
                <Button onClick={toggleMoreStats}>{moreStats ? "Less Stats" : "More Stats"}</Button>
            </Box>

            {moreStats && <Stats stats={stats} />}
        </>
    );
}
