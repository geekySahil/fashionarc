const paypal = require('paypal-rest-sdk')

paypal.configure({
    mode: 'sandbox', 
    client_id: 'AUe2rw_o46fZJY5hiX1tiEukFYS65oiwhrY59FRIpfhko6T-tFFyvomTe2BQQ5npC3ZXITDiRSgJjoSi',
    client_secret: 'EPQaVXWA7AiTvdFssns6E3ncpScI7CQYlTRJLcBicIZZj3O127Ur-0xe9QslXDJJtBBfaNvl2hd55Ju9'

})

module.exports = paypal