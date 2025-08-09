// src/components/forms/CategoryFilter.js
export default function CategoryFilter({ selected, onChange }) {
  const categories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Furniture' },
    { id: 3, name: 'Vehicles' },
    { id: 4, name: 'Real Estate' },
    { id: 5, name: 'Services' },
  ];

  return (
    <select 
      value={selected || ''}
      onChange={(e) => onChange(e.target.value)}
      className="category-filter"
    >
      <option value="">All Categories</option>
      {categories.map(category => (
        <option key={category.id} value={category.id}>
          {category.name}
        </option>
      ))}
    </select>
  );
}