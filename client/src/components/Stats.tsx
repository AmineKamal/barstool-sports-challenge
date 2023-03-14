import { useState } from "react";
import { QuickGrid } from "./QuickGrid";
import { Tabs } from "./Tabs";

interface IStatProps {
    stats: Record<string, object[]>;
}

export function Stats({ stats }: IStatProps) {
    const tabs = Object.keys(stats);
    const [currentTab, setTab] = useState(tabs[0]);

    return (
        <>
            <Tabs currentTab={currentTab} onChange={setTab} tabs={tabs} />
            {tabs.map((tab) => (
                <div hidden={tab !== currentTab}>
                    <QuickGrid rows={stats[tab]} />
                </div>
            ))}
        </>
    );
}
