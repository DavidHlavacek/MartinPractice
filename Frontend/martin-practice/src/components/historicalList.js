const HistoricalList = ({ historicalData }) => {
  if (historicalData.length === 0) {
    return <p>None!</p>;
  }

  return (
    <ul>
      {historicalData.map((attraction, index) => (
        <li key={index}>{attraction}</li>
      ))}
    </ul>
  );
};

export default HistoricalList;
