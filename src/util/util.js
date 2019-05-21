export const selectCities = (offers, city) => {
  const filtered = [];
  offers.forEach((offer) => {
    if (offer.city.name === city) {
      filtered.push(offer);
    }
  });
  return {
    result: filtered,
    coords: filtered[0].city.coords
  };
};
