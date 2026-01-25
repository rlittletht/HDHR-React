import React from 'react';
import '../App.css';
import { TheAppContext, IAppContext } from "../Controller/AppContext";
import { makeStyles } from '@fluentui/react-components';
import
{
    DataGrid,
    DataGridHeader,
    DataGridHeaderCell,
    DataGridCell,
    DataGridRow,
    DataGridBody,
    TableColumnDefinition,
    TableRowId
} from '@fluentui/react-components';
import { hdDataGridStyles } from "../hdStyles";


export interface EditItemDelegate<TItem, TEditArgs>
{
    (item: TItem, editArgs: TEditArgs): void;
}

export interface CanEditItemDelegate<TItem, TEditArgs>
{
    (item: TItem, editArgs: TEditArgs): boolean;
}

export interface OnSelectionChangeDelegate
{
    (selectedItems: Set<TableRowId>): void;
}

export interface GetRowIdDelegate<TItem>
{
    (item: TItem): string;
}

export interface ItemsListProps<TItem, TEditArgs>
{
    styles?: Record<string, string>;
    columns: TableColumnDefinition<TItem>[];
    items: TItem[];

    // currently, the actions for each row are defined in the column
    // property, so the host can reference their delegates directly.
    // BUT in the future we might do additional actions defined here, so
    // we want to get the hosts in the habit of providing these delegates.
    onEditItem?: EditItemDelegate<TItem, TEditArgs>;
    canEditItem?: CanEditItemDelegate<TItem, TEditArgs>;
    editArgs: TEditArgs;

    getRowId: GetRowIdDelegate<TItem>;
    fixedColumns?: boolean;

    onSelectionChange?: OnSelectionChangeDelegate;
    selectedItems?: Set<TableRowId>;
    notCheckable?: boolean;
}

export interface ItemsListState
{
    selectedItems: Set<TableRowId>
}

export const useStylesItemsList = makeStyles(
    {
        ...hdDataGridStyles.styles
    });

export class ItemsListWithoutStyles<TItem, TEditArgs> extends React.Component<ItemsListProps<TItem, TEditArgs>, ItemsListState>
{
    context!: IAppContext;
    static contextType = TheAppContext;

    constructor(props: ItemsListProps<TItem, TEditArgs>)
    {
        super(props);
        this.state = { selectedItems: new Set<TableRowId>() };
    }

    canEditThisItem(item: TItem): boolean
    {
        if (!this.props.canEditItem)
            return true;

        return this.props.canEditItem(item, this.props.editArgs);
    }

    onEditButtonClick(event: React.MouseEvent<HTMLButtonElement>, item: TItem)
    {
        if (!this.props.onEditItem)
            throw new Error("onEditItem delegate not provided");

        this.props.onEditItem(item, this.props.editArgs);
        event.stopPropagation();
    }

    selectionChanged(selectedItems: Set<TableRowId>)
    {
        this.setState({ selectedItems: selectedItems });
    }

    render()
    {
        const items = this.props.items;

        const selectionCell = this.props.notCheckable ? undefined : {checkboxIndicator: {"aria-label": "Select row"}};
        const selectionHeaderCell = this.props.notCheckable ? undefined : {checkboxIndicator: {"aria-label": "Select all rows"}};
        const selectionMode = this.props.notCheckable ? undefined : "multiselect";
        const subtleSelection = this.props.notCheckable ? undefined : true;

        const gridBody = (<DataGridBody<TItem>>
                              {({ item, rowId }) => (
                                  <DataGridRow<TItem> key={rowId} selectionCell={selectionCell}>
                                      {({ renderCell }) => (
                        <DataGridCell>{renderCell(item)}</DataGridCell>)}
                                  </DataGridRow>)}
                          </DataGridBody>
        );

        const selectedItems = this.props.onSelectionChange ? this.props.selectedItems : this.state.selectedItems;
        const onSelectionChanged = this.props.onSelectionChange ? this.props.onSelectionChange : this.selectionChanged.bind(this);

        return (
            <div>
                <DataGrid className={this.props.styles?.gridTable} items={items} columns={this.props.columns} sortable selectionMode={selectionMode} subtleSelection={subtleSelection}
                    getRowId={this.props.getRowId}
                    noNativeElements={this.props.fixedColumns ? true : false}
                    selectedItems={selectedItems}
                    onSelectionChange={(e, selectedItems) => onSelectionChanged(selectedItems.selectedItems)}
                    style={{ tableLayout: 'auto' }}>
                    <DataGridHeader className={this.props.styles?.headerRow}>
                        <DataGridRow selectionCell={selectionHeaderCell}>
                            {({ renderHeaderCell }) => (<DataGridHeaderCell className={this.props.styles?.headerCellProps}>{renderHeaderCell()}</DataGridHeaderCell>)}
                        </DataGridRow>
                    </DataGridHeader>
                    {gridBody}
                </DataGrid>
                {items.length == 0 && <div>There are no items to display</div>}
            </div>)
    }
}

export type ItemsListHOC = <T1, T2>(
    WrappedComponent: React.ComponentType<ItemsListProps<T1, T2>>
) => React.ComponentType<ItemsListProps<T1, T2>>;

export const ItemsListWithStyles: ItemsListHOC = (WrappedComponent) =>
{
    // Return a functional component that injects styles
    return function WithStylesWrapper(props)
    {
        const classes = useStylesItemsList();
        return <WrappedComponent {...props} styles={classes}/>;
    };
};