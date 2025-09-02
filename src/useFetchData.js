// useFetchData.js
import { useEffect, useState } from "react";

export const useFetchData = (country) => {
  const [result, setResult] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (country) {
      fetchDataFromAPI(country);
    } else {
      fetchDataFromLocalStorage();
    }
  }, [country]);

  const fetchDataFromAPI = () => {
    let url =
      "https://restcountries.com/v3.1/all?fields=name,capital,flags,population,region,subregion,tld,currencies,languages";

    setIsLoading(true);
    if (country) {
      url = `https://restcountries.com/v3.1/name/${encodeURIComponent(country)}?fullText=true&fields=name,capital,flags,population,region,subregion,tld,currencies,languages`;
    }
    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("Network error");
        return response.json();
      })
      .then((data) => {
        if (country) {
          // country page
          setResult(data[0]);
        } else {
          // Home page
          setResult(data);
          setFilteredCountries(data);
          localStorage.setItem("countries", JSON.stringify(data));
        }
      })
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  };

  const fetchDataFromLocalStorage = () => {
    const data = JSON.parse(localStorage.getItem("countries"));
    if (data && data.length > 0) {
      // logic
      setResult(data);
      setFilteredCountries(data);
    } else {
      // fetch data
      fetchDataFromAPI(); // fallback
    }
  };

  return {
    result,
    filteredCountries,
    setFilteredCountries,
    isLoading,
    isError,
  };
};
