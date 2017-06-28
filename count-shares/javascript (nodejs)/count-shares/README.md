# count-shares

Returns JSON with a number of shares for a URL.

```
{
  "vk": 135,
  "pinterest": 65401,
  "tumblr": 18,
  "odnoklassniki": 4,
  "facebook": 2353461,
  "gplus": 830508,
  "stumbleupon": 71811,
  "linkedin": 10586,
  "hatena": 606,
  "mailru": 224,
  "pocket": 50990
}
```

## Example

```
var countShares = require( 'count-shares' );

countShares.get( {
    url: 'http://google.com'
}, function( err, result ) {  } );
```

## Methods

### get( conf, callback[, networks] )

`conf`: {Object} An object defining config needed to make requests to different APIs.

`conf.url`: {String} full URL. `www.domain.com` and `domain.com` are different websites for Twitter and Odnoklassniki.

Twitter's old endpoint `http://urls.api.twitter.com/1/urls/count.json?url=` stopped work on November 20th, 2015, and according to <a href="https://twittercommunity.com/t/how-to-get-proper-twitter-share-count-for-a-url/53876/2">this post</a> there are no plans to replace it with anything in the short term.

`callback( err, result )`: {Function} callback that will get the results and errors (if any)

`networks`: (optional) {Array} or {String} available networks: facebook, linkedin, odnoklassniki, pinterest, vk (vkontakte), pocket, mail.ru, hatena, stumbleupon, gplus (Google Plus) . Need more? <a href="https://github.com/clexit/social-widgets">Contribute!</a>


## Changelog

### 2.1.0

Contributed by <a href="https://github.com/garrylachman">Garry Lachman</a>
* Facebook API changed to public API + workaround.
* Networks added: Google Plus, Stumbleupon, Main.ru, Pocket, Hatena.

### 2.0.0

* Facebook API changed. `FACEBOOK_ACCESS_TOKEN` is now required (https://github.com/clexit/social-widgets/pull/10)

### 1.1.1

* Catch parse errors during result parsing process

### 1.1.0

* Twitter API is <a href="https://twittercommunity.com/t/how-to-get-proper-twitter-share-count-for-a-url/53876/2">deprecated</a>
* Odnoklassniki API URL changed
