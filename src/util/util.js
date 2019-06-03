export const selectCities = (offers, city) => {
  const filtered = [];
  if (offers.length !== 0) {
    offers.forEach((offer) => {
      if (offer.city.name === city) {
        filtered.push(offer);
      }
    });
  }
  return filtered;
};
