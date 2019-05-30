import React, { Component } from "react";
import BotaoEscolha from "./BotaoEscolha/botaoEscolha";

class Livros extends Component {
  render() {

    return (
      <div className="bookshelf">
        <div className="bookshelf-books">
          <ol className="books-grid">
            {this.props.books.length > 0 &&
              this.props.books.map(book => (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage:
                            book.imageLinks &&
                            `url(${book.imageLinks.thumbnail})`
                        }}
                      />

                      <BotaoEscolha
                        book={book}
                        updateBook={this.props.updateBook}
                      />
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors ? book.authors.join(', ') : ''}</div>
                  </div>
                </li>
              ))}
          </ol>
        </div>
      </div>
    );
  }
}

export default Livros;
/** <div className="book-authors">{book.authors}</div> */