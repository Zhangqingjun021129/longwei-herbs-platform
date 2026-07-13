import { useState } from 'react';
import { ChevronLeft, ChevronRight, Search, Plus } from 'lucide-react';

interface BaseTableProps<T> {
  columns: { key: keyof T; label: string; format?: (value: unknown) => string }[];
  data: T[];
  actions?: (item: T) => React.ReactNode;
  onAdd?: () => void;
  searchable?: boolean;
  searchKey?: keyof T;
}

export const BaseTable = <T extends Record<string, unknown>>({
  columns,
  data,
  actions,
  onAdd,
  searchable = false,
  searchKey,
}: BaseTableProps<T>) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = searchable && searchKey
    ? data.filter((item) =>
        String(item[searchKey]).toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold text-dark">数据列表</h2>
          {onAdd && (
            <button onClick={onAdd} className="btn-primary flex items-center gap-2">
              <Plus className="w-4 h-4" />
              添加
            </button>
          )}
        </div>
        {searchable && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="搜索..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="input-field pl-10 w-64"
            />
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="table-base">
          <thead className="table-head">
            <tr>
              {columns.map((column) => (
                <th key={String(column.key)} className="px-6 py-3">
                  {column.label}
                </th>
              ))}
              {actions && <th className="px-6 py-3">操作</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item) => (
                <tr key={String(item.id)} className="table-row">
                  {columns.map((column) => (
                    <td key={String(column.key)} className="px-6 py-4">
                      {column.format
                        ? column.format(item[column.key])
                        : String(item[column.key])}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {actions(item)}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length + (actions ? 1 : 0)} className="px-6 py-12 text-center text-gray-500">
                  暂无数据
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-500">
            显示 {(currentPage - 1) * itemsPerPage + 1} 到 {Math.min(currentPage * itemsPerPage, filteredData.length)} 条，共 {filteredData.length} 条
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg transition-colors ${
                  page === currentPage
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-dark hover:bg-gray-200'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};