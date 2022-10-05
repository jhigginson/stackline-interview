import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from '../store/productsSlice';

const thClasses = "p-8 font-normal text-slate-500 border-b border-slate-200 cursor-pointer select-none";
const tdClasses = "p-8 border-b border-slate-200";

const SalesTable = (props) => {

  const products = useSelector(selectProducts);

  const [sortedSales, setSortedSales] = useState();
  const [salesSort, setSalesSort] = useState({ sortOrder: "asc", sortCol: "weekEnding" });

  const salesComparator = useCallback((a, b) => {
    const aVal = a[salesSort.sortCol];
    const bVal = b[salesSort.sortCol];

    if (salesSort.sortOrder === "asc") {
      if (isNaN(aVal)) {
        return aVal.localeCompare(bVal);
      }
      return a[salesSort.sortCol] - b[salesSort.sortCol];
    } else if (salesSort.sortOrder === "desc") {
      if (isNaN(aVal)) {
        return bVal.localeCompare(aVal);
      }
      return b[salesSort.sortCol] - a[salesSort.sortCol];
    } else {
      return 0;
    }
  }, [salesSort]);

  useEffect(() => {
    if (products.length === 0) return;
    setSortedSales([...products[0].sales].sort(salesComparator));
  }, [salesSort, setSortedSales, salesComparator, products]);

  const handleHeaderClick = (column) => {
    setSalesSort((prev) => ({ sortOrder: prev.sortOrder === 'asc' ? 'desc' : 'asc', sortCol: column }));
  };

  const displaySortIcon = (column) => {
    if (salesSort.sortCol === column) {
      if (salesSort.sortOrder === 'asc') {
        return <span className="material-symbols-outlined absolute right-[-20] top-0">
          expand_more
        </span>
      } else {
        return <span className="material-symbols-outlined absolute right-[-20] top-0">
          expand_less
        </span>
      }
    } else {
      return null;
    }
  };

  return (
    <> {!!sortedSales &&
      <table className="w-full uppercase font-light text-slate-400 text-right">
        <thead>
          <tr>
            <th onClick={() => handleHeaderClick('weekEnding')} className={`${thClasses} text-left`}>
                <p className="relative">Week Ending{displaySortIcon('weekEnding')}</p>
            </th>
            <th onClick={() => handleHeaderClick('retailSales')} className={thClasses}>
                <p className="relative">Retail Sales{displaySortIcon('retailSales')}</p>
            </th>
            <th onClick={() => handleHeaderClick('wholesaleSales')} className={thClasses}>
                <p className="relative">Wholesale Sales{displaySortIcon('wholesaleSales')}</p>
            </th>
            <th onClick={() => handleHeaderClick('unitsSold')} className={thClasses}>
                <p className="relative">Units Sold{displaySortIcon('unitsSold')}</p>
            </th>
            <th onClick={() => handleHeaderClick('retailerMargin')} className={thClasses}>
                <p className="relative">Retailer Margin{displaySortIcon('retailerMargin')}</p>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedSales?.map((week, index) => {
            const yMD = week.weekEnding.split('-')
            const dateStr = `${yMD[1]}-${yMD[2]}-${yMD[0].slice(-2)}`

            const formatting_options = {
              style: 'currency',
              currency: 'USD',
              minimumFractionDigits: 2,
            }
            const retail = '$' + week.retailSales.toLocaleString(formatting_options);
            const wholesale = '$' + week.wholesaleSales.toLocaleString(formatting_options);
            const margin = '$' + week.retailerMargin.toLocaleString(formatting_options);

            return (
              <tr key={index}>
                <td className={`${tdClasses} text-left`}>{dateStr}</td>
                <td className={tdClasses}>{retail}</td>
                <td className={tdClasses}>{wholesale}</td>
                <td className={tdClasses}>{week.unitsSold}</td>
                <td className={tdClasses}>{margin}</td>
              </tr>)
          })}
        </tbody>
      </table>}
    </>);
};


export default SalesTable;