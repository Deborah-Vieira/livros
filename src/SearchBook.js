import React, { Component } from "react";
import { search as buscaLivros } from "./BooksAPI";
import { Link } from "react-router-dom";
import Livros from "./Livros";
import { DebounceInput } from "react-debounce-input";



class SearchBook extends Component {
  state = {
    query: "",
    resultadoBuscaLivros: []
  };

  //metodo de atualização do campo input
  //passando um paramentro query
  updateQuery = query => {
    const texto = query.trim();
    this.setState({ query: texto });
    buscaLivros(texto).then(res => this.setState({ resultadoBuscaLivros: res })
    );

    // console.log(texto); //esse texto pega o que digitei no campo de busca apenas.
  };


  render() {

    let listaLivros = this.state.resultadoBuscaLivros;
    const LivrosFiltrados = listaLivros.filter(Livro => Livro.id === Livro.id)
    listaLivros.shelf = LivrosFiltrados ? LivrosFiltrados : 'none'
    console.log(listaLivros);




    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <DebounceInput
            minLength={3}
            debounceTimeout={300}
            onChange={event => this.updateQuery(event.target.value)}
            value={this.state.query}
            placeholder="Search for book or author..."
          />
        </div>
        <div className="search-books-results">
          {listaLivros != null ? (
            <Livros books={listaLivros} updateBook={this.props.updateBook} />
          ) : null}
        </div>
      </div>
    );
  }
}
export default SearchBook;



