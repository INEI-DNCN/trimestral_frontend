export interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  meta: Meta;
}


export interface getPagination {
  id?:string,
  page?: number;
  limit?: number;
  search?: string;
}

export function getPaginationProgress(meta?: Meta) {
  const currentPage = meta?.currentPage ?? 1;
  const itemsPerPage = meta?.itemsPerPage ?? 0;
  const totalItems = meta?.totalItems ?? 0;

  const shownCount = Math.min(currentPage * itemsPerPage, totalItems);

  return { shownCount, totalItems };
}