import React, { Component } from "react";
import BotaoEscolha from "../BotaoEscolha/botaoEscolha";

//LENDO ATUALMENTE

class ConteudoLivro extends Component {
  render() {
    //console.log(this.props.books);
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Currently Reading</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map((
              book //acessando o array do app.js e filtrando
            ) => (
              <li key={book.id}>
                {""}
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${book.imageLinks.thumbnail})`
                      }}
                    />
                    <BotaoEscolha
                      book={book}
                      updateBook={this.props.updateBook} //chamando o metodo de app.js
                    />
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{book.authors}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default ConteudoLivro;
