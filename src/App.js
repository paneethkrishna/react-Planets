import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [planets, setPlanets] = useState([]);
  useEffect(() => {
    fetch('https://assignment-machstatz.herokuapp.com/planet')
      .then(res => {
        return res.json();
      })
      .then((data) => {
        data.map(item => item.isFavourite = false);
        setPlanets(data)
      });
  }, [])

  // Adds to fav on click
  const handleClick = (planet) => {
    const planetsCopy = [...planets];
    const item = planetsCopy.find((item) => item.id === planet.id);
    item.isFavourite = true;
    setPlanets(planetsCopy);
  }

  // Deletes from fav
  const handleDelete = (planet) => {
    const planetsCopy = [...planets];
    const item = planetsCopy.find((item) => item.id === planet.id);
    item.isFavourite = false;
    setPlanets(planetsCopy);
  }

  const getPlanets = () => {
    return planets.filter((planet) => !planet.isFavourite);
  }

  const getFavorites = () => {
    return planets.filter((planet) => planet.isFavourite);
  }

  return (
    <div className="App">
      <div className="outer">
        <div className="container">
          <div className="card shadow-lg p-5 mb-5 mt-5 bg-white rounded">
            <div className="row">
              <div className="col">
                <h2 className="text-center">
                  Planets
                </h2>
                <span className="text-grey">*click + to add to Favourite</span>
                {planets && getPlanets().map((result) => (
                  <div className="blog-preview" key={result.id}>
                    <p>{result.name} <span className="float-right point" onClick={() => handleClick(result)}>+</span></p>
                  </div>
                ))}
              </div>
              <div className="col text-center">
                <h2>Favourite</h2>
                {planets && getFavorites().map((fav) => (
                  <div className="blog-preview" key={fav.id}>
                    <p>{fav.name} <span className="float-right point" onClick={() => handleDelete(fav)}>-</span></p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;