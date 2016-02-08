# Social widgets

[![Build Status](https://travis-ci.org/clexit/social-widgets.png?branch=master)](https://travis-ci.org/clexit/social-widgets)

Likes, shares and things like that.



## Table Of Contents

* [share](#share)
* [history api](#historyapi)
* [count-shares](#count-shares) (JSON with number of shares)



<a name='share'></a>
## share

Example: https://facebook.com/sharer/sharer.php?u=http://google.com

<table>
  <tr>
    <th>Network</th>
    <th>URL</th>
    <th>Documentation</th>
  </tr>
  <tr>
    <td>Facebook</td>
    <td>https://facebook.com/sharer/sharer.php?u={{LINK}}</td>
    <td>
      <a href="https://developers.facebook.com/docs/plugins/share-button/">share</a>,
      <a href="https://developers.facebook.com/docs/plugins/like-button/">like</a>
    </td>
  </tr>
  <tr>
    <td>Twitter</td>
    <td>http://twitter.com/share?url={{LINK}}</td>
    <td><a href="https://about.twitter.com/resources/buttons">link</a></td>
  </tr>
  <tr>
    <td>Twitter</td>
    <td>https://twitter.com/intent/tweet?url={{LINK}}</td>
    <td><a href="https://about.twitter.com/resources/buttons">link</a></td>
  </tr>
  <tr>
    <td>Google Plus</td>
    <td>https://plus.google.com/share?url={{LINK}}</td>
    <td>
      <a href="https://developers.google.com/+/plugins/share/#sharelink">link</a>
    </td>
  </tr>
  <tr>
    <td>Linked In</td>
    <td>http://www.linkedin.com/shareArticle?url={{LINK}}</td>
    <td>
      <a href="https://developer.linkedin.com/documents/share-linkedin">link</a>
    </td>
  </tr>
  <tr>
    <td>VK</td>
    <td>http://vkontakte.ru/share.php?url={{LINK}}</td>
    <td>
      <a href="http://vk.com/developers.php?oid=-17680044&p=Share">link</a>
    </td>
  </tr>
  <tr>
    <td>Odnoklassniki</td>
    <td>https://connect.ok.ru/dk?st.cmd=extLike&uid=odklcnt0&ref={{LINK}}</td>
    <td></td>
  </tr>
  <tr>
    <td>Yandex</td>
    <td>http://share.yandex.ru/go.xml?service=yaru&url={{LINK}}&title={{TITLE}}&body={{TEXT}}</td>
    <td></td>
  </tr>
  <tr>
    <td>Livejournal</td>
    <td>http://www.livejournal.com/update.bml?subject={{TITLE}}&event={{TEXT}}&prop_taglist={{TAGS}}&href={{LINK}}</td>
    <td></td>
  </tr>
</table>



<a name='historyapi'></a>
## history api (reloading social widgets)

<table>
  <tr>
    <th>Network</th>
    <th>What to do</th>
  </tr>
  <tr>
    <td>Twitter</td>
    <td>
      <ul>
        <li>
          Replace the old button with HTML code from Twitter documentation (see the link in the table above).<br/>
          
          Example:
          <pre><code>&lt;a href="https://twitter.com/share"
   class="twitter-share-button"
   data-url="' + window.location.href + '">Tweet&lt;/a></li>
          </code></pre>
        </li>
        <li>Call <code>twttr.widgets.load();</code></li>
      </ul>
    </td>
  </tr>
</table>



<a name='count-shares'></a>
## count-shares

Returns JSON with a number of shares for a page.

```
{
    "facebook": 5461703,
    "twitter": 11876867,
    "vk": 2462,
    "odnoklassniki": 547,
    "pinterest": 60,
    "linkedin": 18113
}
```

### JavaScript (node.js)

`npm install count-shares`

<a href="https://github.com/clexit/social-widgets/tree/master/count-shares/javascript%20(nodejs)/count-shares">See README here.</a>

### PHP

#### API

Example: `./count-shares/php/main.php?url=http://www.google.com&networks=facebook,twitter`

##### url (required)

`www.domain.com` and `domain.com` are different websites for Twitter and Odnoklassniki. `domain.com#anchor`, `domain.com?key=value` and `domain.com` are different websites too for all social networks.

##### networks

Comma separated. `facebook`, `twitter`, `linkedin`, `pinterest`, `vk` or `odnoklassniki`.

Default: Facebook and Twitter.


[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/clexit/social-widgets/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

