const validateInitialFinal = (initialDate, finalDate) => {
  const enteredDate = new Date(initialDate);
  const finalDateInput = new Date(finalDate);

  if(enteredDate > finalDateInput) {
    return false
  } 
  return true
}

const validateInitialDate = (initialDate, finalDate) => {
      
  const enteredDate = new Date(initialDate);

  const finalDateInput = new Date(finalDate);

  const timeDifference = finalDateInput.getTime() - enteredDate.getTime();
  const daysDifference = timeDifference / (1000 * 60 * 60 * 24);

  if(daysDifference  > 30) {
    return false
  } else {
    return true
  } 
}

const validateFinalDate = (finalDate) => {

  const enteredDate = new Date(finalDate);

  const currentDate = new Date();

  if(enteredDate > currentDate) {
    return false
  } 
    
  return true
}

export {
  validateInitialFinal,
  validateInitialDate,
  validateFinalDate
}