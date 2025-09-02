import Select from "react-select";

const options = [
  { value: "all regions", label: "All regions" },
  { value: "africa", label: "Africa" },
  { value: "asia", label: "Asia" },
  { value: "europe", label: "Europe" },
  { value: "oceania", label: "Oceania" },
];

const RegionMenu = ({ countriesList = [], filterCountriesList }) => {
  const handleRegionChange = (e) => {
    const region = e.label;
    // console.log("countriesList in RegionMenu:", countriesList);

    const filteredCountries =
      region === "All regions"
        ? countriesList
        : countriesList.filter((country) => country.region === region);

    filterCountriesList(filteredCountries);
  };
  return (
    <Select
      defaultValue={options[0]}
      onChange={handleRegionChange}
      options={options}
      classNames={{
        control: () =>
          "flex h-12 items-center justify-between gap-12 rounded-md !border-none pl-4 pr-2 shadow !bg-white !text-gray-800 dark:!bg-gray-800 dark:!text-gray-100 md:h-14",
        singleValue: () => "dark:!text-gray-100",
        input: () => "dark:!text-gray-100",
        menu: () => "!bg-gray-100 dark:!bg-gray-800 dark:!text-gray-100",
        option: () => "hover:!text-gray-800 cursor-pointer",
        indicatorSeparator: () => "hidden",
      }}
    />
  );
};

export default RegionMenu;
