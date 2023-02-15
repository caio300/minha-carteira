const formatCurrency = (current: number): string => {
  return current.toLocaleString(
    'pr-br',
    {
      style: 'currency',
      currency: 'BRL'
    }
  )
};

export default formatCurrency;
