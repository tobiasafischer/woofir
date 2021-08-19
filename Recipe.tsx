/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-restricted-syntax */
/* eslint-disable arrow-body-style */
import React, { useState } from 'react';
import {
  Card,
  Image,
  // Collapse,
} from 'react-bootstrap';
import axios from 'axios';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import DeleteIcon from '@material-ui/icons/Delete';

import AddButton from '../misc/AddButton/AddButton';

import './recipe.scss';

const Recipe = (props) => {
  const [{ title }] = useState(props);
  const [{ calories }] = useState(props);
  const [{ healthValues }] = useState(props);
  const [{ image }] = useState(props);
  const [{ ingredients }] = useState(props);
  const [{ source }] = useState(props);
  const [{ sourceURL }] = useState(props);
  const [{ quantity }] = useState(props);
  const [{ username }] = useState(props);
  const [{ showCart }] = useState(props);
  const [{ showRecipe }] = useState(props);
  const [{ showDelete }] = useState(props);
  const [show, setShow] = useState(true);

  const dataObj = {
    json: {
      title,
      calories,
      healthValues,
      image,
      ingredients,
      source,
      sourceURL,
      quantity,
    },
    username,
  };

  const deleteItem = () => {
    axios
      .post(`${process.env.REACT_APP_URL}/delete-card`, { sourceURL, username })
      .then(() => {
        setShow(false);
      })
      .catch((err) => {
        if (err) throw err;
      });
  };

  const populateCartButton = () => {
    if (showCart) {
      return (
        <AddButton
          cartText="Add to Cart"
          onClick={() => axios.post(`${process.env.REACT_APP_URL}/cart`, dataObj)}
        />
      );
    }
    return <></>;
  };

  const populateRecipeButton = () => {
    if (showRecipe) {
      return (
        <AddButton
          cartText="Save Recipe"
          onClick={() => axios.post(`${process.env.REACT_APP_URL}/recipe`, dataObj)}
        />
      );
    }
    return <></>;
  };

  const populateButtons = () => {
    if (showCart || showRecipe) {
      return (
        <div id="button-container">
          {populateCartButton()}
          {populateRecipeButton()}
        </div>
      );
    }
    return <></>;
  };

  const populateShowDelete = () => {
    if (showDelete) {
      return (
        <ListItemIcon id="list-icon" onClick={() => deleteItem()}>
          <DeleteIcon />
        </ListItemIcon>
      );
    }
    return <></>;
  };

  const populate = () => {
    if (show) {
      return (
        <div id="recipe-container">
          <Card id="recipe-card" border="0">
            {populateShowDelete()}
            <Card.Title>
              <div id="title-container">
                <div id="title">{title}</div>
                <div id="servings">
                  {`Yields: ${quantity} servings\t`}
                  {`${Math.round(calories)} calories`}
                </div>
              </div>
            </Card.Title>
            <Card.Body>
              <div id="card-body-container">
                <Image
                  id="recipe-image"
                  src={image}
                  onError={(e) => {
                    e.currentTarget.src = 'https://bitsofco.de/content/images/2018/12/broken-1.png';
                  }}
                  alt="food_img"
                  rounded
                />
                <a id="fancy-button" href={sourceURL} style={{ width: '30vh', marginTop: '2vh' }}>
                  {source}
                </a>
                {populateButtons()}
              </div>
            </Card.Body>
          </Card>
          <hr style={{ border: '1px solid black' }} />
        </div>
      );
    }
    return <></>;
  };

  return <>{populate()}</>;
};

export default Recipe;
