import { useEffect, useState } from 'react';

interface Options {
  method: string | undefined,
  headers: HeadersInit,
  body?: string | null
}

interface data{
  response?: any |null
}

function useDataFetcher(url:string, method: any = "GET" , body:object | null = null, dependencies: Array<any> = []): any | null {
  
  const [data, setData] = useState<data | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // Set headers for JSON data
      const headers = {
        'Content-Type': 'application/json',
      };
      // Set the request options
      const options:Options = {
          method: method, // Specify the request method (GET or POST)
          headers: headers,
      };
      // If the request method is POST, include the body data
      if (method === 'POST' && body) {
        options.body = JSON.stringify(body);
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json();
        setData(jsonData);
        console.log(jsonData)
      } catch (error:any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  if (loading || error) {
    // You can handle loading and error states here if needed
    // For example, return a loading spinner or throw an error
    return null;
  }

  return data;
}

export {useDataFetcher}