(() => {
  angular.module('sabre')
    .controller('AirportListCtrl', List);

  function List(GatewayService) {
    GatewayService
      .get('/v1/shop/flights/cheapest/fares/CNF?pointofsalecountry=BR')
      .then((item) => {
        console.log(item);
      });
  }
})();
