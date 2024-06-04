export const formatDate = (date) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString();
}

export const formatMoney = (amount) => {
  if(!amount){
    return '$0.00';
  }

  // Formatear el monto en pesos colombianos
  const formattedAmount = amount.toLocaleString('es-CO', {style: 'currency', currency: 'COP'});

  // Eliminar los dos últimos caracteres
  const trimmedAmount = formattedAmount.slice(0, -3);
  
  return trimmedAmount;
}

export const convertCurrencyToNumber = (currencyString) => {
  const cleanedString = currencyString.replace(/[^\d,-]/g, '').replace('.', '');
  return parseFloat(cleanedString.replace(',', '.'));
};