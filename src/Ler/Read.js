import React, { Component } from "react";
import BotaoEscolha from "../BotaoEscolha/botaoEscolha";

class Read extends Component {
  render() {
    //console.log(this.props.books);
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Read</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.map(book => (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 192,
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

export default Read;
