import { Box, Tab as MuiTab, Tabs as MuiTabs } from "@mui/material";

interface ITabsProps<T extends string> {
    tabs: readonly T[];
    currentTab: T;
    onChange: (tab: T) => void;
}

export function Tabs<T extends string>({ currentTab, onChange, tabs }: ITabsProps<T>) {
    const handleChange = (_: React.SyntheticEvent, newValue: T) => {
        onChange(newValue);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <MuiTabs value={currentTab} onChange={handleChange} variant="scrollable" scrollButtons="auto">
                {tabs.map((val) => (
                    <MuiTab key={val} value={val} label={val} />
                ))}
            </MuiTabs>
        </Box>
    );
}
