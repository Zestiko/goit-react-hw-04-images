import React, { Component } from 'react';
import css from './Searchbar.module.css';
import { FcSearch } from 'react-icons/fc';
import PropTypes from 'prop-types';

export class SearchBar extends Component {
  state = {
    name: '',
  };

  handelChange = e => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handelSubmit = e => {
    e.preventDefault();
    // console.log(this.state.name);
    this.props.onSubmitHendler(this.state.name);
    this.setState({ name: '' });
  };
  render() {
    const { name } = this.state;
    return (
      <header className={css.searchbar}>
        <form className={css.searchform} onSubmit={this.handelSubmit}>
          <button type="submit" className={css.searchFormButton}>
            <span>
              <FcSearch />
            </span>
          </button>

          <input
            onChange={this.handelChange}
            className={css.searchFormInput}
            type="text"
            placeholder="Search images and photos"
            name="name"
            value={name}
          />
        </form>
      </header>
    );
  }
}

SearchBar.propTypes = {
  onSubmitHendler: PropTypes.func.isRequired,
};
