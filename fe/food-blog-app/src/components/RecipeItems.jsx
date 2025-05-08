import React from "react";
import { useLoaderData } from "react-router-dom";
import foodImg from "../assets/foodRecipe.png";
import { BsStopwatchFill } from "react-icons/bs";

export default function RecipeItems() {
  const allRecipes = useLoaderData();
  console.log(allRecipes);
  return (
    <div className="card-container">
      {allRecipes?.map((item, index) => {
        return (
          <div className="card" key={index}>
            <img src={foodImg} alt="food image" width="120px" height="100px" />
            <div className="card-body">
              <div className="title">{item.title}</div>
              <div className="icons">
                <div className="timer">
                  <BsStopwatchFill />
                  30min
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
