import { Component } from 'react';

interface SearchProps {
  callback: (str: string) => void;
  searchText: string;
}
interface SearchState {
  search: string;
}
export default class SearchForm extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      search: this.props.searchText,
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const searchText = localStorage.getItem('search');
    if (searchText) this.setState({ search: searchText });
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.callback(event.target.value);
    this.setState({ search: event.target.value });
  }

  render() {
    return (
      <>
        <input
          type="text"
          name="find"
          id="find"
          value={this.state.search}
          onChange={(e) => this.handleChange(e)}
        />
      </>
    );
  }
}
