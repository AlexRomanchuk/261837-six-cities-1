import {combineReducers} from "redux";
import {reducer as offers} from "./offers/offers.js";
import {reducer as user} from "./user/user.js";
import {reducer as favorites} from "./favorites/favorites.js";
import {reducer as commnets} from "./comments/comments.js";

export default combineReducers({
  "OFFERS": offers,
  "USER": user,
  "FAVORITES": favorites,
  "COMMENTS": commnets,
});
