import { DataGrid, GridColumns } from "@mui/x-data-grid";

interface DataGridProps {
    rows: any[],
    columns: GridColumns,
    pageSize: number
}

export default function DataGridUi({ rows, columns, pageSize } : DataGridProps) {
    return <>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={pageSize}
          rowsPerPageOptions={[pageSize]}
        />
    </>
}