import React from "react";

const Loading = () => {
  return <main className="page__main page__main--index">
    <div className="cities__places-wrapper">
      <div className="cities__places-container container">
        <section className="cities__places places">
          <div className="cities__status-wrapper tabs__content">
            <b className="cities__status">Loading...</b>
            <p className="cities__status-description">Data is loading from server.</p>
          </div>
        </section>
        <div className="cities__right-section">
          <section className="cities__map map"></section>
        </div>
      </div>
    </div>
  </main>;
};

export default Loading;
