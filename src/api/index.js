const url = 'https://api.nasa.gov/planetary/apod?api_key='
const api = process.env.REACT_APP_NASA_API_KEY 


export const getNasaData = async (start_date,end_date) => {

    

    
    try {
        const response = await fetch(`${url}${api}&start_date=${start_date}&end_date=${end_date}`)
        
        const data = await response.json();
        
        
        return data;
    }
    catch(error) {
        console.log(error)
    }

}