module.exports = {
    facebook: {
        url  : 'http://graph.facebook.com/fql?q=SELECT%20url,%20normalized_url,%20share_count,%20like_count,%20comment_count,%20total_count,commentsbox_count,%20comments_fbid,%20click_count%20FROM%20link_stat%20WHERE%20url=',
        parse: function( res ) {
            return JSON.parse( res ).data[ 0 ][ 'total_count' ] / 1;
        }
    },

    linkedin: {
        url  : 'https://www.linkedin.com/countserv/count/share?format=json&url=',
        parse: function( res ) {
            return JSON.parse( res ).count / 1;
        }
    },

    odnoklassniki: {
        url  : 'http://www.odnoklassniki.ru/dk?st.cmd=extLike&uid=odklcnt0&ref=',
        parse: function( res ) {
            return res.match( /^ODKL\.updateCount\(\'odklcnt0\',\'(\d+)\'\);$/ )[ 1 ] / 1;
        }
    },

    pinterest: {
        url : 'http://api.pinterest.com/v1/urls/count.json?url=',
        parse: function( res ) {
            return JSON.parse(res.match(/receiveCount\((.*?)\)$/)[1]).count / 1;
        }
    },

    // https://twittercommunity.com/t/how-to-get-proper-twitter-share-count-for-a-url/53876/2
    //twitter: {
    //    url  : 'http://urls.api.twitter.com/1/urls/count.json?url=',
    //    parse: function( res ) {
    //        return JSON.parse( res ).count / 1;
    //    }
    //},

    vk: {
        url  : 'http://vk.com/share.php?act=count&url=',
        parse: function( res ) {
            return res.match( /^VK\.Share\.count\(\d, (\d+)\);$/ )[ 1 ] / 1;
        }
    }
}
