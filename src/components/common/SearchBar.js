// src/components/common/SearchBar.js
export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search ads..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}