export const formatViews = (views) => {
  if (views === null || views === undefined) return '0';
  return views.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const formatGainLoss = (value) => {
  if (!value) return '0';
  const prefix = value > 0 ? '+' : '';
  return `${prefix}${formatViews(value)}`;
};
