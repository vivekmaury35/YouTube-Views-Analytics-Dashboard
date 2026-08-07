import { formatViews, formatGainLoss } from '../../utils/formatters';

const HistoryTable = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="w-full mt-4 text-center p-8 bg-white rounded-lg border border-border text-secondary">
        No records available for the selected range.
      </div>
    );
  }

  return (
    <div className="w-full mt-4 bg-white rounded-lg border border-border shadow-sm overflow-hidden flex flex-col">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[500px]">
          <thead className="bg-header sticky top-0 z-10">
            <tr>
              <th className="px-5 py-3 text-white text-[16px] font-semibold whitespace-nowrap w-1/4">
                Time
              </th>
              <th className="px-5 py-3 text-white text-[16px] font-semibold text-center whitespace-nowrap">
                Views
              </th>
              <th className="px-5 py-3 text-white text-[16px] font-semibold text-right whitespace-nowrap w-1/4">
                Gain/Loss
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((row, idx) => {
              const isPositive = row.gain_loss > 0;
              const isNegative = row.gain_loss < 0;
              const gainLossColor = isPositive
                ? 'text-positive'
                : isNegative
                ? 'text-negative'
                : 'text-gray-500';

              return (
                <tr
                  key={idx}
                  className="hover:bg-gray-50 transition-colors text-[15px]"
                >
                  <td className="px-5 py-3.5 text-primary tabular-nums">
                    {row.timestamp}
                  </td>
                  <td className="px-5 py-3.5 text-primary text-center font-medium tabular-nums">
                    {formatViews(row.views)}
                  </td>
                  <td className={`px-5 py-3.5 text-right font-medium tabular-nums ${gainLossColor}`}>
                    {formatGainLoss(row.gain_loss)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryTable;
