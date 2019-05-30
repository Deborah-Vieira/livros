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
  updateQuery = (query, livrosAtuais) => {
    const texto = query.trim();
    this.setState({ query: texto });
    buscaLivros(texto).then(resultado => {
      //o resultado do texto digitado que é o livro
      /**Aqui onde armazeno o array de resultado de livros, filtro com o map e faço uma comparação
       * para saber se existe livros, se exister livro com prateleira, caso contrario o sete como none
       */
      const livrosFiltrados = resultado.map(livro => {
        const livroNaPrateleira = livrosAtuais.find(
          livroAtual => livro.id === livroAtual.id
        );
        livroNaPrateleira
          ? (livro.shelf = livroNaPrateleira.shelf)
          : (livro.shelf = "none");
        return livro;
      });
      this.setState({ resultadoBuscaLivros: livrosFiltrados });
    });
  };

  render() {
    let livrosFiltrados = this.state.resultadoBuscaLivros;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <DebounceInput
            minLength={3}
            debounceTimeout={300}
            onChange={event =>
              this.updateQuery(event.target.value, this.props.books)
            }
            value={this.state.query}
            placeholder="Search for book or author..."
          />
        </div>
        <div className="search-books-results">
          {livrosFiltrados != null ? (
            <Livros
              books={livrosFiltrados}
              updateBook={this.props.updateBook}
            />
          ) : null}
        </div>
      </div>
    );
  }
}
export default SearchBook;
