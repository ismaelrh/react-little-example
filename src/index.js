//ismaro3, Product Table react example
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';




class FilterableProductTable extends React.Component{


  constructor(){
    super();
    this.state = {
      productList: [{category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
                    {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
                    {category: "Sporting Add-ons", price: "$13.99", stocked: false, name: "Smartwatch"}],
      filterText: '',
      onlyStock: false,
    };

    this.handleFilterTextInput = this.handleFilterTextInput.bind(this);
    this.handleStockCheckbox = this.handleStockCheckbox.bind(this);
  }

  handleFilterTextInput(newValue){
    this.setState({filterText:newValue});
  }

  handleStockCheckbox(newValue){
    this.setState({onlyStock:newValue});
  }

  render(){

    return(
      <div>
        <SearchBar 
          onFilterTextInput={this.handleFilterTextInput}
          onStockCheckbox={this.handleStockCheckbox}
          filterText={this.state.filterText}
          onlyStock={this.state.onlyStock}
        />
        <ProductTable 
          productList={this.state.productList} 
          onlyStock={this.state.onlyStock} 
          filterText={this.state.filterText}/>
      </div>
    );

  }

}

//SearchBar is a controlled component
class SearchBar extends React.Component{


  constructor(){
    super();
    this.handleFilterTextInputChange =  this.handleFilterTextInputChange.bind(this);
    this.handleStockCheckboxChange =  this.handleStockCheckboxChange.bind(this);
  }

  //When input changes, notify to father (FilterProductTable)
  handleFilterTextInputChange(event){
    this.props.onFilterTextInput(event.target.value);
  }

  handleStockCheckboxChange(event){
    this.props.onStockCheckbox(event.target.checked);
  }

  render(){

    return(
      <form>
        <input 
          type="text" 
          placeholder="Filter..." 
          value={this.props.filterText}
          onChange={this.handleFilterTextInputChange} /> <br/>
        <p>
        <input
              type="checkbox"
              value={this.props.onlyStock}
              onChange={this.handleStockCheckboxChange}
            />
            {' '}
            Only show products in stock
        </p>
      </form>
    );
  }

}



class ProductTable extends React.Component{


  render(){

    
    const productList = this.props.productList.slice();


    let rows = [];
    let currentCategory = null;

    for(var i = 0; i < productList.length; i++){

      let product = productList[i];

      //Do not process those products that do not meet criteria.
      if( (this.props.onlyStock && !product.stocked) || 
          (this.props.filterText && product.name.indexOf(this.props.filterText) === -1)){
          continue;
      }

        
      if(product.category !== currentCategory){
        currentCategory = product.category;
        //New category, so we create a new header
        rows.push(<CategoryHeader name={product.category} key={product.category}/>);
      }

      //Create the object
      rows.push(<ProductRow product={product} key={product.name}/>);
    }


    return(
      <table>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr> 
          {rows}
        </tbody>
      </table>
    );
  }
}






//Functional component, only shows data
function CategoryHeader(props){

    return(
       <tr><td><u>{props.name}</u></td></tr>
    );
  
}


//Functional component, only shows data
function ProductRow(props){

    return(
      <tr><td>{props.product.name}</td><td>{props.product.price} € </td></tr>
    );

}





// ========================================

ReactDOM.render(
  <FilterableProductTable />,
  document.getElementById('root')
);
