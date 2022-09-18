import React from "react";
import style from './recipe.module.css';
  
const Recipe = ({title,cooktime,image,ingredients,link}) =>{
    return(
        <div className={style.recipe}>
            <h1>{title}</h1>
            <ol>
                {ingredients.map(ingredient=>(
                    <li>{ingredient}</li>
                ))}
            </ol>
              
<p>Cook time : {cooktime}</p>
  
            <img className={style.image} src={image} alt=""/>

            <a href = {link} class = "bigLink">Link to recipe</a>
  
        </div>
    );
  
}
export default Recipe;