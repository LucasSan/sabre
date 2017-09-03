(() => {
  angular
    .module('sabre')
    .factory('Config', () => ({
      ENVIRONMENT: 'https://api.test.sabre.com',
      FLIGHTS_API: {
        CLIENT_ID: 'V1:ak5l08oz5nzs5jb4:DEVCENTER:EXT',
        CLIENT_SECRET: 'BppkTO44',
        TOKEN: 'T1RLAQI1rJJgDIJzcXag2wiYb9iJPidtYRA/KQrJbnJhgqJMnQ4RqoKZAADAHHYfx4y7j1GiVWWL/vNSJ+wZhFAkjA5l369iN7qnTulGlpRSNee3NQvl43sXqOJBp6U1NDPFe4d7Yuh/gGW8bQ8m+OVicAR8RgTFogLHE4PEvpoQtMQQorQrFpDvP90wqeF5g8fTUWYd5WASomKpRbHi/MpO5HBpK4vMhL+JF/O3I1ZNIKXRfLvEqwpNxZl/HddVC0ssXrTYw0K4nPIoZ+o2TQME3c/gEngg4Wy1tAsk1k5amTF8iyO3TxSraaVM'
      }
    }));
})();
