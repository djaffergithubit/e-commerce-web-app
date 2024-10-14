export const convertDateFormatWithoutTime = (isoDateString) => {
    // Create a new Date object from the ISO 8601 formatted string
    const date = new Date(isoDateString);
    
    // Define the options for formatting the date
    const options = { 
      weekday: 'short', 
      month: 'short', 
      day: '2-digit', 
      year: 'numeric', 
    };
    
    // Convert the date to the desired format
    const formattedDate = date.toLocaleString('en-US', options);
    
    return formattedDate;
}
