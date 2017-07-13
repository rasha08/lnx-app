import React, { Component } from 'react';
import { database } from './firebase';
import map from 'lodash/map'

class Recipes extends Component {
  constructor() {
    super();

    this.state = {
      recipes:null,
      ingredients:[],
      ingredientSerachTerm: ''
    };
    this.ingredientsRef = database.ref('/ingredients');
    this.recepiesRef = database.ref('/recipes');
    this.storeIngredients = this.storeIngredients.bind(this)
  }

  componentDidMount(){
      this.ingredientsRef.on('value',snapshot=>{
          const ingredients = []
          map(snapshot.val(), ingredient=> ingredients.push(ingredient))
          this.setState({
              ingredients
          })
      })
  }
  storeIngredients() {
  }
  render() {
      if(this.state.ingredients){
          return (
            <div className="container">
            <div className="row">
                <div className="col s9"><h1>Recipes</h1></div>
                <div className="col s3 ingredients">
                    <div className="input-field">
                        <i className="material-icons prefix">search</i>
                        <input type="text" className="validate" value={this.state.ingredientSerachTerm} onChange={(event)=>{this.setState({
                            ingredientSerachTerm: event.target.value
                        })}} />
                    </div>
                    {this.state.ingredients.filter(ingredient=>ingredient.name.indexOf(this.state.ingredientSerachTerm) !== -1).map(ingredient=>(<p className='ingredient' key={ingredient.id}>{ingredient.id} -- {ingredient.name}</p>))}        
                </div>
            </div>
            </div>
            );
      }
    return (
      <div className="container">
        <div className="progress black">
            <div className="indeterminate red" />
          </div>
      </div>
    );
  }
}

export default Recipes;
