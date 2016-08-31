var getBunch = require( 'get-bunch' ),
    NETWORKS = require( './networks' );


module.exports = function( conf, callback, networks ) {
    // NOTE: the first parameter of this function was a URL string until >1.1.1
    // so we do this for backward compatibility reasons :
    if (typeof conf === 'string') {
        conf = { url: conf }
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

    getBunch.getMulti(requests, function( results ) {
        try {
          callback( null, parseResults( results ) );
        } catch(err){
          callback( err, null );
        }
        return;
    })
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
    var requests = [];

    networks.map(function( network ) {

        requests.push({
            name: network,
            url : NETWORKS[ network ].url(conf),
            type: 'plain'
        });
    });

    return requests;
}


function parseResults( results ) {
    var parsedResults = {};

    for ( var key in results ) {
        parsedResults[ key ] = NETWORKS[ key ].parse( results[key] );
    }

    return parsedResults;
}
