import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import CharacterList from "./components/CharacterList";
import ErrorMessage from "./components/ErrorMessage";
import LocationFilter from "./components/LocationFilter";
import LocationInfo from "./components/LocationInfo";
import getRandomNumber from "./utils/getRandomNumber";

const RESIDENTS_PER_PAGE = 15

function App() {
  const [location, setLocation] = useState();
  const [locationName, setlocationName] = useState("");
  const [showError, setshowError] = useState();
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [residentsFilter, setResidentsFilter] = useState([])

  const getDimensionData = (idDimension) => {
    if (idDimension) {
      const URL = `https://rickandmortyapi.com/api/location/${idDimension}`;
      axios
        .get(URL)
        .then((res) => setLocation(res.data))
        .catch((err) => {
          setshowError(true);
          setTimeout(() => {
            setshowError(false);
          }, 1800);
          console.log(err);
        });
    } else {
      alert("type a dimension");
    }
  };

  useEffect (()=>{
    if(!location) return
    const quantityResidents = location.residents.length
    const quantityPages = Math.ceil (quantityResidents / RESIDENTS_PER_PAGE)
    setLastPage(quantityPages)
    setCurrentPage(1)
  },[location])

  useEffect(()=> {
    const lastResidentCut =currentPage * RESIDENTS_PER_PAGE
    const firstResidentCut = lastResidentCut - RESIDENTS_PER_PAGE 
    const newResidentsFilter = location?.residents.slice(firstResidentCut, lastResidentCut)
    setResidentsFilter(newResidentsFilter)
  },[location, currentPage])

  useEffect(() => {
    const randomDimension = getRandomNumber();
    getDimensionData(randomDimension);
  }, []);

  const getAllPages = () => {
    const arrayPages = []
    for(let i=1; i <= lastPage; i++){
      arrayPages.push(i)
    }
    return arrayPages
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const dimensionSearch = e.target.searchValue.value;
    getDimensionData(dimensionSearch);
  };

  const handleChangeInput = (e) => {
    setlocationName(event.target.value);
  };

  const getNewLocation = (URL, name) => {
    setlocationName(name);
    axios
      .get(URL)
      .then((res) => setLocation(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      <header className="header">
        <article className="form-info">
          <form onSubmit={handleSubmit}>
            <div className="form-div">
              <input
                className="form-inp"
                onChange={handleChangeInput}
                value={locationName}
                id="searchValue"
                type="text"
                placeholder="Search a new Dimension"
              />
              <LocationFilter
                locationName={locationName}
                getNewLocation={getNewLocation}
              />
            </div>
            <button className="form-btn" type="submit">
              Search
            </button>

            {showError ? <ErrorMessage /> : ""}
          </form>
        </article>
      </header>
      <LocationInfo location={location} />
      <CharacterList residentsFilter={residentsFilter} />
      <ul className="list-pages">
        {
          getAllPages().map(page => (
            <li 
            className={currentPage === page ? "active" : ""}
            onClick={() => setCurrentPage(page)} 
            key={page}>
              {page}
              </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App;
