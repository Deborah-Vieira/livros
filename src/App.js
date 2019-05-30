import React from "react";
import * as BooksAPI from "./BooksAPI";
import ConteudoLivro from "./Lendoatualmente/ConteudoLivro";
import WantToRead from "./QueroLer/WantToRead";
import Read from "./Ler/Read";
import SearchBook from "./SearchBook";
import { Link, Route } from "react-router-dom";
import App from "./App.css";
import escapeRegExp from "escape-string-regexp";
import sortBy from "sort-by";

class BooksApp extends React.Component {
  constructor() {
    super();
    this.state = {
      books: [], //os livros estão aqui no estado da minha aplicação
      query: ""
    };
    //this.searchBook = this.searchBook.bind(this);

    this.updateBook = this.updateBook.bind(this); //identificação de escopo, faz o this trabalhar no retorno de chamada, uso isso caso nao use na minha função o ES6 de seta a arrow function (=>) a seta.
  }

  //aqui puxo todos os dados da lista de livros da api, antes que a pagina carregue
  async componentDidMount() {
    const books = await BooksAPI.getAll();
    this.setState({ books });
  }

  //método atualiza os livros nas prateleiras guardando o resultado no array shelfs
  updateBook(book, shelf) {
    BooksAPI.update(book, shelf).then(resp => {
      book.shelf = shelf;
      const livrosFiltrados = this.state.books.filter(
        item => item.id !== book
          .id
      );
      this.setState({
        books: [...livrosFiltrados, book]
      });
    });
  }


  //3 variaveis que passam a lista de livro para os componente respectivos
  render() {
    //console.log(this.state.books); //acessando o estado do componente
    const { books } = this.state;
    const reading = books.filter(b => b.shelf === "currentlyReading");
    const read = books.filter(b => b.shelf === "read");
    const wantToRead = books.filter(b => b.shelf === "wantToRead");

    return (
      //esse route renderiza a pagina de busca
      <div className="app">
        <Route
          path="/search"
          render={() =>
            <SearchBook updateBook={this.updateBook} />}
        />

        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>Meus livros</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <ConteudoLivro books={reading} updateBook={this.updateBook} />

                  <WantToRead books={wantToRead} updateBook={this.updateBook} />
                  <Read books={read} updateBook={this.updateBook} />
                  {/* botão que vai para a página de busca */}
                  <Link to="/search">
                    <div className="open-search">Add a book</div>
                  </Link>
                </div>
              </div>
              )}
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
