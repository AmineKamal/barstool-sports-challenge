import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface IGridProps<T extends object> {
    columns?: string[];
    rows: T[];
}

function keyToColDef(key: string): GridColDef {
    return {
        field: String(key),
        headerName: String(key),
        width: 100,
        sortable: false,
        editable: false,
        filterable: false,
        hideable: false,
        disableColumnMenu: true,
    };
}

export function QuickGrid<T extends object>({ columns, rows }: IGridProps<T>) {
    const finalColumns = (columns ?? Object.keys(rows[0])).map(keyToColDef);
    const finalRows = rows.map((val, index) => ({ ...val, id: (val as Record<"id", string | undefined>).id ?? index }));

    return <DataGrid autoHeight rows={finalRows} columns={finalColumns} hideFooter />;
}
