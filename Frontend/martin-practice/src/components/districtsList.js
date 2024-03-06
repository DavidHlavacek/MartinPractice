const DistrictsList = ({ districts }) => {
  if (districts.length === 0) {
    return <p>None!</p>;
  }

  return (
    <ul>
      {districts.map((district, index) => (
        <li key={index}>{district}</li>
      ))}
    </ul>
  );
};

export default DistrictsList;
