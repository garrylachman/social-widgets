var assert      = require( 'assert' ),
    countShares = require( '../index' ),
    NETWORKS    = require( '../libs/networks' );

// missing callback
assert.ok( countShares.get().error );


// invalid URL
countShares.get(undefined, function( err ) {
    assert.ok( typeof err === 'string' );
});


// invalid "network" argument
countShares.get('http://google.com', function( err ) {
    assert.ok( typeof err === 'string' );
}, {});


// should handle incorrect spelling
countShares.get('http://google.com', function( err ) {
    assert.ok( typeof err === 'string' );
}, 'pintarest');


// should be case insensitive
countShares.get('http://google.com', function( err, result ) {
    assert.ok( typeof result.pinterest !== 'undefined' );
}, 'PinteResT');


// should handle Arrays
countShares.get('http://google.com', function( err, result ) {
    assert.ok( typeof result.pinterest !== 'undefined' );
    assert.ok( typeof result.vk !== 'undefined' );
}, [ 'pinterest', 'vk' ]);


// should handle empty "networks" argument
countShares.get({
  url: 'http://www.yahoo.com'
}, function( err, result ) {
    for ( var key in NETWORKS ) {
        assert.ok( typeof result[ key ] !== undefined );
    }
});


// should return correct data type
countShares.get({
  url: 'https://www.google.com'
}, function( err, result ) {
    for ( var key in result ) {
        assert.ok( typeof result[ key ] === 'number' );
        assert.ok( result[ key ] > 0 );
    }
});


// should handle URL with no shares
countShares.get('http://gogbogle.cdsom', function( err, result ) {
    for ( var key in result ) {
        assert.ok( typeof result[ key ] === 'number' );
    }
});
