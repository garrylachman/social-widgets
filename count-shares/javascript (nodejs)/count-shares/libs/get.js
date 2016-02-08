var getBunch = require( 'get-bunch' ),
    NETWORKS = require( './networks' );


module.exports = function( url, callback, networks ) {
    if ( typeof callback !== 'function' ) {
        console.error( 'ERROR: count-shares: callback function is required' );
        return { 'error': true, 'message': 'missing callback' };
    }

    if ( !isValidURL(url) ) {
        invalidURL( url, callback );
        return;
    }

    networks = filterNetworks( networks, callback );
    if ( !networks ) return;


    var requests = getRequests( url, networks );

    getBunch.getMulti(requests, function( results ) {
        callback( null, parseResults(results) );
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


function getRequests( url, networks ) {
    var requests = [];

    networks.map(function( network ) {

        requests.push({
            name: network,
            url : NETWORKS[ network ].url + ( (network==='facebook')?"'"+url+"'":url ),
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
