import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "./Loader";

const CharacterCard = ({ urlResident }) => {
  const [resident, setResident] = useState();

  useEffect(() => {
    axios
      .get(urlResident)
      .then((res) => setResident(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <article className="resident-card">
      <header className="resident-card-header">
        <img src={resident?.image} alt="character" />
        <div className="resident-card-status">
          <div className={`circle ${resident?.status}`}></div>
          <span>{resident?.status}</span>
        </div>
      </header>
      <section className="resident-card-body">
        <h2>{resident?.name}</h2>
        <ul>
          <li>
            <span>Specie: </span>
            {resident?.species}
          </li>
          <li>
            <span>Origin: </span>
            {resident?.origin.name}
          </li>
          <li>
            <span>Episode apperance: </span>
            {resident?.episode.length}
          </li>
        </ul>
      </section>
    </article>
  );
};

export default CharacterCard;
