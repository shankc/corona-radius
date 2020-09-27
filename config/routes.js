/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/
  'GET /api/get_corona_india':           { action: 'corona' },
  'POST /api/v1/fetch-nearest-covid':     { action: 'covid-radius'},
  'POST /api/v1/populate-hospital-data': { action: 'hospital-prefetch'},
  'POST /api/v1/get-nearby-hospitals' :   { action: 'hospital-radius'},
  'POST /api/v1/populate-test-center-data': { action: 'testcenter-prefetch'},
  'POST /api/v1/get-nearby-testcenters':   { action: 'testcenter-radius'}
};
