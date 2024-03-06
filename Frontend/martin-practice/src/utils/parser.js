export default function parseAttractions(responseString) {
  // Split the response by numbers followed by a dot to find the start of each attraction.
  // This is a simple approach and might need adjustment depending on the actual response format.
  const attractionEntries = responseString.split(/\d\./).slice(1); // Remove the first split as it's before the first attraction
  return attractionEntries.map(
    (entry) =>
      entry
        .trim() // Clean up whitespace
        .replace(/^The /, "") // Optional: Remove 'The ' from the start of each attraction for consistency
  );
}
