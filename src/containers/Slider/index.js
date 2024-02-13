import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  
  const byDateDesc = data?.focus?.sort((evtA, evtB) =>
  // Modification du sens d'apparition des slides des plus anciennes au plus récentes //
    new Date(evtA.date) < new Date(evtB.date) ? 1 : -1
  );

  const nextCard = () => {
  setTimeout(() => {
    // Rajout d'une condition afin de vérifier que byDateDesc est défini et byDateDesc.length contient au moins un élément avant de l'utiliser pour notre modulo//
    if (byDateDesc && byDateDesc.length > 0) {
      setIndex((index + 1) % byDateDesc.length); // Utilisation de l'opérateur modulo afin que le slideshow boucle //
    }
  }, 5000);
};
  useEffect(() => {
    nextCard();
  });

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div key={event.title}>
          <div className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"}`}>
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((_, radioIdx) => (
                <input
                  key={`${event.id}`}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
