import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  
  const byDateDesc = data?.focus?.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
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
        // Rajout d'un id dans "focus" dans le fichier json afin d'éviter l'erreur Warning: Each child in a list should have a unique “key” prop. //
        <div key={event.id}> 
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
              {byDateDesc.map((radioEvent, radioIdx) => (
                <input
                  key={radioEvent.id}
                  type="radio"
                  name="radio-button"
                  checked={index === radioIdx}
                  // Rajout de l'attribut readOnly pour éviter l'erreur Warning: You provided a `checked` prop to a form field without an `onChange` or `readOnly`//
                  readOnly
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
