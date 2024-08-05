const Filter = ({ filter, onChange }) => {
  return (
    <form>
      filter shown with: <input value={filter} onChange={onChange} />
    </form>
  );
};
export default Filter;
