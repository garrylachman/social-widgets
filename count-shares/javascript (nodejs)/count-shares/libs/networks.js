module.exports = {
    facebook: {
        url: function( conf ) {
            // doc here : https://developers.facebook.com/docs/graph-api/reference/v2.7/url
            var url = 'https://graph.facebook.com/v2.7/?id='+conf.url;
            var accessToken = typeof conf.accessTokens === 'object' && typeof conf.accessTokens.fb === 'string' ? conf.accessTokens.fb : null;

            if ( accessToken ) {
                url += '&access_token='+accessToken;
            }

            return url;
        },
        parse: function( res ) {
            var obj = JSON.parse( res );
            return typeof obj.share === 'object' && typeof obj.share.share_count === 'number' ? obj.share.share_count / 1 : 0;
        }
    },

    linkedin: {
        url: function( conf ) {
            return 'https://www.linkedin.com/countserv/count/share?format=json&url='+conf.url;
        },
        parse: function( res ) {
            return JSON.parse( res ).count / 1;
        }
    },

    odnoklassniki: {
        url: function( conf ) {
            return 'https://connect.ok.ru/dk?st.cmd=extLike&uid=odklcnt0&ref='+conf.url;
        },
        parse: function( res ) {
            return res.match( /^ODKL\.updateCount\(\'odklcnt0\',\'(\d+)\'\);$/ )[ 1 ] / 1;
        }
    },

    pinterest: {
        url: function( conf ) {
            return 'http://api.pinterest.com/v1/urls/count.json?url='+conf.url;
        },
        parse: function( res ) {
            return JSON.parse(res.match(/receiveCount\((.*?)\)$/)[1]).count / 1;
        }
    },

    // https://twittercommunity.com/t/how-to-get-proper-twitter-share-count-for-a-url/53876/2
    // twitter: {
    //     url: function( conf ) {
    //         return 'http://urls.api.twitter.com/1/urls/count.json?url='+conf.url;
    //     },
    //     parse: function( res ) {
    //         return JSON.parse( res ).count / 1;
    //     }
    // },

    vk: {
        url: function( conf ) {
            return 'http://vk.com/share.php?act=count&url='+conf.url;
        },
        parse: function( res ) {
            return res.match( /^VK\.Share\.count\(\d, (\d+)\);$/ )[ 1 ] / 1;
        }
    }
}
