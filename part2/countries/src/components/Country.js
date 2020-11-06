import React from "react";
import Weather from "./Weather";

const Country = ({ searchCountries }) =>
  searchCountries.map(country => (
    <div key={country.numericCode}>
      <div>
        <h2>{country.name} </h2>
      </div>
      <div>
        <>capital {country.capital}</>
        <br />
        <>population {country.population}</>
      </div>
      <div>
        <h3>Spoken languages</h3>{" "}
        <ul>
          {country.languages.map(language => (
            <li key={language.nativeName}>{language.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <img
          src={country.flag}
          alt="flag"
          style={{ height: "120px", width: "120px" }}
        />
      </div>
      <div>
        <Weather
         
          capital={country.capital}
        
        />
      </div>
    </div>
  ));
export default Country;
