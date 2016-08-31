# count-shares

Returns JSON with a number of shares for a URL.

```
{
    "facebook": 5461703,
    "vk": 2462,
    "odnoklassniki": 547,
    "pinterest": 60,
    "linkedin": 18113
}
```

## Example

```
var countShares = require( 'count-shares' );

countShares.get( {
    url: 'http://google.com',
    accessTokens: {
        fb: 'foobar'
    }
}, function( err, result ) {  } );
```

## Methods

### get( conf, callback[, networks] )

`conf`: {Object} An object defining config needed to make requests to different APIs.

`conf.url`: {String} full URL. `www.domain.com` and `domain.com` are different websites for Twitter and Odnoklassniki.

`conf.accessTokens.fb`: {String} a valid facebook access token

Twitter's old endpoint `http://urls.api.twitter.com/1/urls/count.json?url=` stopped work on November 20th, 2015, and according to <a href="https://twittercommunity.com/t/how-to-get-proper-twitter-share-count-for-a-url/53876/2">this post</a> there are no plans to replace it with anything in the short term.

`callback( err, result )`: {Function} callback that will get the results and errors (if any)

`networks`: (optional) {Array} or {String} available networks: facebook, linkedin, odnoklassniki, pinterest, vk (vkontakte). Need more? <a href="https://github.com/clexit/social-widgets">Contribute!</a>
