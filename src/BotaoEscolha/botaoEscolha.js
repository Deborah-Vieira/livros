import React, { Component } from "react";
import * as BooksAPI from "../BooksAPI";

class BotaoEscolha extends Component {


  render() {
    this.props.book != null ? console.log(this.props.book.title, this.props.book.shelf) : console.log("null");
    let prateleira = this.props.shelf;
    const { book, updateBook } = this.props; //desconstrução
    return (
      <div className="book-shelf-changer">
        <select value={book.shelf != null ? book.shelf : "none"} onChange={e => updateBook(book, e.target.value)}>
          <option value="Move to" disabled>Move to</option>
          <option value="currentlyReading">Currently Reading</option>
          <option value="wantToRead">Want to Read</option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    );
  }
}
export default BotaoEscolha;

/**
 *  <select value={book.shelf != null ? book.shelf : "none"} onChange={e => updateBook(book, e.target.value)}>
 */