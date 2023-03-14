import { useState } from "react";
import { Game } from "./components/Game";
import { Tabs } from "./components/Tabs";
import "./App.css";
import { AppBar, Toolbar, Typography } from "@mui/material";

const TABS = ["MLB", "NBA"] as const;
type Tab = typeof TABS[number];

function App() {
    const [tab, setTab] = useState<Tab>("MLB");

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" color="inherit" component="div">
                        Barstool Sports Challenge
                    </Typography>
                </Toolbar>
            </AppBar>
            <Tabs currentTab={tab} onChange={setTab} tabs={TABS} />
            <div hidden={tab !== "NBA"}>
                <Game league="nba" />
            </div>
            <div hidden={tab !== "MLB"}>
                <Game league="mlb" />
            </div>
        </>
    );
}

export default App;
