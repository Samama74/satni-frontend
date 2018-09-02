import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  selectLemma,
  fetchArticlesIfNeeded,
  fetchItemsIfNeeded
} from '../actions';
import Articles from '../components/Articles';
import Searcher from '../components/Searcher';

class NameForm extends React.Component {
  constructor (props) {
    super(props);
    this.state = {value: ''};

    console.log(props.search);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange (event) {
    console.log(this.props.search);
    this.setState({value: event.target.value});
    this.props.onSelect(event.target.value);
  }

  handleSubmit (event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }

  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type='text' value={this.state.value} onChange={this.handleChange} />
        </label>
        <input type='submit' value='Submit' />
        <hr />
        inputvalue: {this.state.value}<br />
        size of search: {this.props.search.searchItems.size}<br />
        search: {JSON.stringify(this.props.search)}
      </form>
    );
  }
}

class AsyncApp extends Component {
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount () {
    const { dispatch, selectedLemma } = this.props;
    dispatch(fetchArticlesIfNeeded(selectedLemma));
  }

  componentDidUpdate (prevProps) {
    if (this.props.selectedLemma !== prevProps.selectedLemma) {
      const { dispatch, selectedLemma } = this.props;
      dispatch(fetchArticlesIfNeeded(selectedLemma));
    }
  }

  handleSearch (key) {
    console.log('handleSearch');
    this.props.dispatch(fetchItemsIfNeeded(key));
  }

  handleChange (nextLemma) {
    console.log(nextLemma);
    this.props.dispatch(selectLemma(nextLemma));
    this.props.dispatch(fetchArticlesIfNeeded(nextLemma));
  }

  render () {
    const { selectedLemma, articles, isFetching, search } = this.props;
    return (
      <div>
        <Searcher
          onSelect={this.handleChange}
          onInputChange={this.handleSearch}
          search={search}
          />
        {isFetching && articles.length === 0 && <h2>Loading...</h2>}
        {selectedLemma && !isFetching && articles.length === 0 && <h2>Empty.</h2>}
        {articles.length > 0 &&
          <div style={{ opacity: isFetching ? 0.5 : 1 }}>
            <Articles articles={articles} />
          </div>}
      </div>
    );
  }
}

AsyncApp.propTypes = {
  selectedLemma: PropTypes.string.isRequired,
  articles: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  search: PropTypes.object.isRequired
};

function mapStateToProps (state) {
  const { selectedLemma, articlesByLemma, search } = state;
  const {
    isFetching,
    items: articles
  } = articlesByLemma[selectedLemma] || {
    isFetching: false,
    items: []
  };

  return {
    selectedLemma,
    articles,
    isFetching,
    search
  };
}

export default connect(mapStateToProps)(AsyncApp);
