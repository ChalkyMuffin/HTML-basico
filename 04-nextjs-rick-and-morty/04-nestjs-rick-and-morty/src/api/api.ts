export async function fetchFromAPI() {
    try {
      const response = await fetch('https://rickandmortyapi.com/api/character/1');
      if (!response.ok) {
        throw new Error('Failed to fetch data from API');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }