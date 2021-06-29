import React, { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";
import CardForm from "../Form";

function CardCreate() {
  const history = useHistory();
  const { deckId } = useParams(); //destructuing deckId from useParams
  const [deck, setDeck] = useState({ cards: [] });

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);

  function submitHandler(card) {
    //function created to handle submits, run createCard with deckId as a param
    createCard(deckId, card);
  }

  function doneHandler() {
    history.push(`/decks/${deckId}`);
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">
              <span className="oi oi-home" /> Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Add Card
          </li>
        </ol>
      </nav>
      <CardForm
        deckName={deck.name}
        initialState={deck}
        onSubmit={submitHandler}
        onDone={doneHandler}
      />
    </div>
  );
}

export default CardCreate;
