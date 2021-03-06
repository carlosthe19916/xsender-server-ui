import { SortByDirection } from "@patternfly/react-table";
import { PageQuery, SortByQuery } from "api/models";

// Hook

interface HookArgs<T> {
  items?: T[];

  sortBy?: SortByQuery;
  compareToByColumn: (a: T, b: T, columnIndex?: number) => number;

  pagination: PageQuery;
  filterItem: (value: T) => boolean;
}

interface HookState<T> {
  pageItems: T[];
  filteredItems: T[];
}

export const useTableFilter = <T>({
  items,
  sortBy,
  pagination,
  filterItem,
  compareToByColumn,
}: HookArgs<T>): HookState<T> => {
  const allItems = [...(items || [])];

  // Filter
  const filteredItems = allItems.filter(filterItem);

  //  Sort
  let orderChanged = false;

  let sortedItems: T[];
  sortedItems = [...filteredItems].sort((a, b) => {
    const comparisonResult = compareToByColumn(a, b, sortBy?.index);
    if (comparisonResult !== 0) {
      orderChanged = true;
    }
    return comparisonResult;
  });

  if (orderChanged && sortBy?.direction === SortByDirection.desc) {
    sortedItems = sortedItems.reverse();
  }

  // Paginate
  const pageItems = sortedItems.slice(
    (pagination.page - 1) * pagination.perPage,
    pagination.page * pagination.perPage
  );

  return {
    pageItems,
    filteredItems,
  };
};
