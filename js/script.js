"use strict";

$(function () {
  // Countries rendering
  const $countriesContainer = $("div.countries");
  const renderCountry = function (index, data) {
    $countriesContainer.append(`
     <div class="country" data-country="${data.name}">
          <img class="country__img" src="${data.flag}" />
          <div class="country__data">
            <h3 class="country__name">${data.name}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
            <p class="country__row"><span>💰</span>${
              data.currencies?.[0].name
            }</p>
          </div>
     </div>`);
  };
  $.get("https://restcountries.com/v2/all", function (data) {
    const dataSliced = data.slice(0, 10);

    $.each(dataSliced, function (index, data) {
      renderCountry(index, data);
    });
  });
  $countriesContainer.css("opacity", 1);

  //   Dialog popup rendering
  const $popupContainer = $(".popup_container");
  const renderPopup = function (data) {
    if ($popupContainer.innerText === "") {
      $popupContainer
        .append(
          `<div class="popup_text">
          <p class="country__row">Borders: ${data.borders}</p>
          <p class="country__row">Capital: ${data.capital}</p>
          <p class="country__row">Calling Codes: ${data.callingCodes}</p>
          <p class="country__row">Area: ${data.area}</p>
          <p class="country__row">Subregion: ${data.subregion}</p>
        </div>`
        )
        .dialog({
          close: function (event, ui) {
            $popupContainer.html("");
          },
        });
    }
  };

  $(document).on("click", ".country", function () {
    const $countryname = $(this).attr("data-country").toLowerCase();

    $.get(
      `https://restcountries.com/v2/name/${$countryname}`,
      function ([data]) {
        renderPopup(data);
      }
    );
  });
});