var getBunch = require( 'get-bunch' ),
    NETWORKS = require( './networks' ),
    request = require('requestretry');


module.exports = function( conf, callback, networks ) {
    // NOTE: the first parameter of this function was a URL string until >1.1.1
    // so we do this for backward compatibility reasons :
    if (typeof conf === 'string') {
        conf = { url: conf }
    }

    if ( typeof conf !== 'object' ) {
        console.error( 'ERROR: count-shares: conf is required' );
        return { 'error': true, 'message': 'missing conf' };
    }

    if ( typeof conf.url !== 'string' ) {
        console.error( 'ERROR: count-shares: url is required' );
        return { 'error': true, 'message': 'missing url' };
    }

    if ( typeof callback !== 'function' ) {
        console.error( 'ERROR: count-shares: callback function is required' );
        return { 'error': true, 'message': 'missing callback' };
    }

    if ( !isValidURL(conf.url) ) {
        invalidURL( conf.url, callback );
        return;
    }

    networks = filterNetworks( networks, callback );
    if ( !networks ) return;


    var requests = getRequests( conf, networks );

    Promise.all(requests).then(results => {
      results = results.reduce((obj, item) => {
        obj[Object.keys(item)[0]] = Object.values(item)[0];
        return obj;
      }, {});
      callback( null, parseResults( results ) );
    });
}


function isValidURL( url ) {
    return url !== undefined;
}

function invalidURL( url, callback ) {
    console.error( 'ERROR: count-shares: valid URL is required' );
    callback( url + ' is invalid URL' );
}


function filterNetworks( networks, callback ) {
    var validNetworks = [];

    if ( typeof networks === 'string' ) {
        var networks = networks.toLowerCase();

        if ( typeof NETWORKS[networks] === 'undefined' ) {
            callback( '"' + networks + '" network module doesn\'t exist' );
            return;
        } else {
            return [ networks ];
        }
    }

    else if ( Array.isArray( networks ) ) {
        networks.map(function( network ) {
            var network = network.toLowerCase();

            if ( typeof NETWORKS[network] === 'undefined' ) {
                console.warn( 'WARN: count-shares: module for "' + network + '" doesn\'t exist' );
            } else {
                validNetworks.push( network );
            }
        });

        return validNetworks;
    }

    else if ( networks === undefined ) {

        for ( var key in NETWORKS ) {
            validNetworks.push( key );
        }

        return validNetworks;
    }

    else {
        callback( '"networks" argument should be {String} or {Array}' );
        return;
    }
}


function getRequests( conf, networks ) {
    var requests = Array.from(networks);
    var requestDefaults = {
      'timeout': 5*1000,
      'maxAttempts': 3,
      'retryDelay': 3000
    };

    var r = request.defaults(requestDefaults);

    return networks.map(( network ) => {
      return new Promise((resolve, reject) => {
        r.get({
          'url': NETWORKS[ network ].url(conf),
          'headers': {
            'cookie': 'c_user=123423400'
          }
        }, (err, res, body) => {
          body = body ? body : "";
          resolve({
            [network]: body
          });
        })
      });
    });
}


function parseResults( results ) {
    var parsedResults = {};

    for ( var key in results ) {
        parsedResults[ key ] = NETWORKS[ key ].parse( results[key] );
    }

    return parsedResults;
}
