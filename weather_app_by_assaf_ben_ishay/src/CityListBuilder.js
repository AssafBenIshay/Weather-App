export const cityList = async () => {
  const url = 'https://countriesnow.space/api/v0.1/countries';
  let hasAnAPIError = false

  try {
    const response = await fetch(url);

    // Check if the response is OK (status code 200–299)
    if (!response.ok) {
      console.error(`HTTP error! Status: ${response.status}`);
      hasAnAPIError = true
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
      
    if (!data || !data.data || !Array.isArray(data.data)) {
      console.error('Unexpected response format');
      hasAnAPIError = true

      throw new Error('Unexpected response format');
    }
    const citiesCountry = []
    if (!data || !data.data || !Array.isArray(data.data)) {
      console.error('Unexpected response format');
      hasAnAPIError = true
      throw new Error('Unexpected response format');
    }
    data.data.forEach((country) => {
      for (let i = 0; i < country.cities.length; i++){
        citiesCountry.push(`${country.cities[i]} :: ${country.country}`)
      }
    });
    return citiesCountry
    //return cities;
  } catch (error) {
          console.error('Failed to fetch cities list:', (error).message);
          hasAnAPIError = true
  }
  return hasAnAPIError
}

