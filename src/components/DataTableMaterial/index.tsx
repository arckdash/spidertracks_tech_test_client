import { FC, ReactElement, ReactNode, useEffect, useMemo, useState } from 'react';
import { AlertProps, createTheme, SxProps, Theme, ThemeProvider } from '@mui/material';
import MaterialReactTable, { MRT_TableInstance } from 'material-react-table';
import { useStyles } from './styles';
import theme from '../../theme';
import { ColumnFiltersState, ColumnSort, PaginationState, SortingState } from '@tanstack/react-table';

type Props = {
    children?: ReactNode;
    columns: Array<any>;
    data: Array<any>;
    totalRowCount: number;
    isLoading: boolean;
    isError: boolean;
    isRefetching: boolean;
    enablePagination?: boolean;
    enableSelectAll?: boolean;
    enableRowSelection?: boolean;
    enableTopToolbar?: boolean;
    customTableContainerStyles?: SxProps<Theme>;
    topToolBar: (table: MRT_TableInstance<any>) => JSX.Element;
    handlePaginationFn: (paginationPageIndex: number, paginationPageSize: number, sorting: ColumnSort[]) => void;
};

const tableTheme = createTheme(theme);
// @NOTE: Needed to keep the table's body with a white background.
tableTheme.palette.background.default = '#fff';

const DataTableMaterial: FC<Props> = ({
    columns,
    data,
    totalRowCount,
    isLoading,
    isError,
    isRefetching,
    topToolBar,
    enablePagination = true,
    enableSelectAll = true,
    enableRowSelection = true,
    enableTopToolbar = true,
    customTableContainerStyles,
    handlePaginationFn,
}): ReactElement => {
    const { classes } = useStyles();
    const tableColumns = useMemo(() => columns, [columns]);
    const tableData = useMemo(() => data, [data]);

    //table state
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 10,
    });

    const errorObj: AlertProps = {
        color: 'error',
        children: 'Error loading data',
    };

    useEffect(() => {
        handlePaginationFn(pagination.pageIndex, pagination.pageSize, sorting);
    }, [pagination.pageIndex, pagination.pageSize, sorting]);

    const customStyles = customTableContainerStyles && {
        muiTableContainerProps: {
            sx: customTableContainerStyles,
        },
    };

    return (
        <ThemeProvider theme={tableTheme}>
            <MaterialReactTable
                columns={tableColumns}
                data={tableData}
                enableTopToolbar={enableTopToolbar}
                enableRowSelection={enableRowSelection}
                enableMultiSort
                enablePagination={enablePagination}
                enableColumnFilterModes={false}
                enableColumnDragging={false}
                enableSelectAll={enableSelectAll}
                // onRowSelectionChange={setRowSelection}
                enableToolbarInternalActions={false}
                manualFiltering
                manualPagination
                manualSorting
                {...customStyles}
                muiToolbarAlertBannerProps={isError ? errorObj : undefined}
                muiTopToolbarProps={{
                    sx: { borderRadius: '10px' },
                }}
                muiBottomToolbarProps={{
                    sx: {
                        borderRadius: '10px',
                    },
                }}
                muiTablePaperProps={{
                    sx: {
                        borderRadius: '10px',
                    },
                }}
                muiTableBodyCellProps={{
                    sx: {
                        textAlign: 'center',
                    },
                }}
                muiTableHeadRowProps={{
                    className: classes.tableHederColumnCell,
                }}
                enableColumnOrdering
                onColumnFiltersChange={setColumnFilters}
                onPaginationChange={setPagination}
                onSortingChange={setSorting}
                rowCount={totalRowCount}
                state={{
                    columnFilters,
                    isLoading,
                    pagination,
                    showAlertBanner: isError,
                    showProgressBars: isRefetching,
                    sorting,
                }}
                renderTopToolbarCustomActions={({ table }) => topToolBar(table)}
            />
        </ThemeProvider>
    );
};

export default DataTableMaterial;
