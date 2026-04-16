import SearchIcon from "../../Icons/SearchIcon";
import "./searchInputStyle.css";

type SearchInputPropps = {
  state: [string, React.Dispatch<React.SetStateAction<string>>];
  placeholder?: string;
};

function SearchInput({ state, placeholder }: SearchInputPropps) {
  const [searchInput, setSearchInput] = state;
  return (
    <label className="search-input-container">
      <SearchIcon />
      <input
        type="text"
        name="search"
        className="search-input"
        placeholder={placeholder}
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
    </label>
  );
}

export default SearchInput;
