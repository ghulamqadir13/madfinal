import { useEffect, useState } from 'react'
import axios from 'axios'

const GetAPIScreen = (url) => {
    const [data, setData] = useState(null);
    useEffect(() => {
        axios.get(url).then((response) => {
            console.log('API request successful');
            console.log(response.data.movies);
            setData(response.data.movies); // Set the response data to state
          })
          .catch((error) => {
            console.error('Error fetching data:', error);
          });
      }, []);
  return {data}
}

export default GetAPIScreen

