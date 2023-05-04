"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0) { ; } } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
$(function () {
  // Countries rendering
  var $countriesContainer = $("div.countries");
  $.get("https://restcountries.com/v2/all", function (data) {
    var dataSliced = data.slice(0, 10);
    $.each(dataSliced, function (index, data) {
      renderCountry(index, data);
    });

    // Slider
    sliderInit();
  });

  //   Dialog popup rendering
  var $popupContainer = $(".popup_container");
  $(document).on("click", ".country", function () {
    var $countryname = $(this).attr("data-country").toLowerCase();
    $.get("https://restcountries.com/v2/name/".concat($countryname), function (data) {
      renderPopup(data);
    });
  });

  //   Functions
  function renderCountry(index, data) {
    var _data$currencies;
    $countriesContainer.append("\n     <div class=\"country\" data-country=\"".concat(data.name, "\">\n          <img class=\"country__img\" src=\"").concat(data.flag, "\" />\n          <div class=\"country__data\">\n            <h3 class=\"country__name\">").concat(data.name, "</h3>\n            <h4 class=\"country__region\">").concat(data.region, "</h4>\n            <p class=\"country__row\"><span>\uD83D\uDC6B</span>").concat((+data.population / 1000000).toFixed(1), "</p>\n            <p class=\"country__row\"><span>\uD83D\uDDE3\uFE0F</span>").concat(data.languages[0].name, "</p>\n            <p class=\"country__row\"><span>\uD83D\uDCB0</span>").concat((_data$currencies = data.currencies) === null || _data$currencies === void 0 ? void 0 : _data$currencies[0].name, "</p>\n          </div>\n     </div>"));
  }
  function renderPopup(_ref) {
    var _ref2 = _slicedToArray(_ref, 1),
      data = _ref2[0];
    $popupContainer.append("<div class=\"popup_text\">\n          <p class=\"country__row\">Borders: ".concat(data.borders, "</p>\n          <p class=\"country__row\">Capital: ").concat(data.capital, "</p>\n          <p class=\"country__row\">Calling Codes: ").concat(data.callingCodes, "</p>\n          <p class=\"country__row\">Area: ").concat(data.area, "</p>\n          <p class=\"country__row\">Subregion: ").concat(data.subregion, "</p>\n        </div>")).dialog({
      close: function close(event, ui) {
        $popupContainer.html("");
      }
    });
  }
  function sliderInit() {
    $countriesContainer.slick({
      arrows: true,
      dots: true,
      slidesToShow: 1
    });
  }
});
//# sourceMappingURL=script.js.map
