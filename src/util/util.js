import {createBrowserHistory} from "history";

export default createBrowserHistory();

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

export const parseComment = (data) => ({
  id: data.id,
  user: {
    id: data.user.id,
    isPro: data.user[`is_pro`],
    name: data.user.name,
    avatarUrl: data.user[`avatar_url`],
  },
  rating: Number(data.rating),
  comment: data.comment,
  date: data.date,
});

export const parseAuthorizationData = (data) => ({
  id: data.id,
  email: data.email,
  name: data.name,
  avatarUrl: data[`avatar_url`],
  isPro: data[`is_pro`],
});

export const parseOffer = (offer) => ({
  city: offer.city,
  previewImage: offer[`preview_image`],
  images: offer.images,
  title: offer.title,
  isFavorite: offer[`is_favorite`],
  isPremium: offer[`is_premium`],
  rating: offer.rating,
  type: offer.type,
  bedrooms: offer.bedrooms,
  maxAdults: offer[`max_adults`],
  price: offer.price,
  goods: offer.goods,
  host: offer.host && {
    id: offer.host.id,
    name: offer.host.name,
    isPro: offer.host[`is_pro`],
    avatarUrl: offer.host[`avatar_url`],
  },
  description: offer.description,
  location: offer.location,
  id: offer.id,
});

export const calcDistance = (lat1, lon1, lat2, lon2) => {
  let radlat1 = Math.PI * lat1 / 180;
  let radlat2 = Math.PI * lat2 / 180;
  let theta = lon1 - lon2;
  let radtheta = Math.PI * theta / 180;
  let dist = Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = dist * 180 / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344;
  return dist;
};

export const getTreeNearPlaces = (state, place, count) => {
  return state.listOffers.map((it) => {
    it.distance = calcDistance(place.location.latitude, place.location.longitude, it.location.latitude, it.location.longitude);
    return it;
  }).sort((place1, place2) => place1.distance - place2.distance).slice(1, count + 1);
};

export const getOrderedFavorites = (favorites) => {
  if (!favorites) {
    return null;
  }

  const orderedFavorites = [];

  for (const offer of favorites) {
    const cityName = offer.city.name;
    let city = orderedFavorites.find((it) => it.city.name === cityName);
    if (city) {
      city.offers.push(offer);
    } else {
      orderedFavorites.push({
        city: offer.city,
        offers: [offer],
      });
    }
  }

  return orderedFavorites;
};

export const getOfferById = (state, id) => {
  const idNumber = Number(id);
  return state.listOffers && state.listOffers.find((it) => it.id === idNumber);
};
