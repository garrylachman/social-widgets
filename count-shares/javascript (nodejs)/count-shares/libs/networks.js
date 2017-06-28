module.exports = {
  facebook: {
    url: function( conf ) {
      return `https://graph.facebook.com/${conf.url}`;
    },
    parse: function( res ) {
      var obj = JSON.parse(res);
      if (obj.share) {
        return obj.share.share_count;
      }
      return 0;
    }
  },

  linkedin: {
    url: function( conf ) {
      return `https://www.linkedin.com/countserv/count/share?format=json&url=${conf.url}`;
    },
    parse: function( res ) {
      return JSON.parse( res ).count / 1;
    }
  },

  odnoklassniki: {
    url: function( conf ) {
      return `https://connect.ok.ru/dk?st.cmd=extLike&uid=odklcnt0&ref=${conf.url}`;
    },
    parse: function( res ) {
      return res.match( /^ODKL\.updateCount\(\'odklcnt0\',\'(\d+)\'\);$/ )[ 1 ] / 1;
    }
  },

  pinterest: {
    url: function( conf ) {
      return `http://api.pinterest.com/v1/urls/count.json?url=${conf.url}`;
    },
    parse: function( res ) {
      return JSON.parse(res.match(/receiveCount\((.*?)\)$/)[1]).count / 1;
    }
  },

  vk: {
    url: function( conf ) {
      return `http://vk.com/share.php?act=count&url=${conf.url}`;
    },
    parse: function( res ) {
      return res.match( /^VK\.Share\.count\(\d, (\d+)\);$/ )[ 1 ] / 1;
    }
  },

  tumblr: {
    url: function( conf ) {
      return `http://api.tumblr.com/v2/share/stats?url=${conf.url}`;
    },
    parse: function( res ) {
      var obj = JSON.parse(res);
      if (obj.response && obj.response.note_count) {
        return obj.response.note_count;
      }
      return 0;
    }
  },

  mailru: {
    url: function( conf ) {
      return `https://connect.mail.ru/share_count?url_list=${conf.url}`;
    },
    parse: function( res ) {
      var obj = JSON.parse(res);
      var objVals = Object.values(obj);

      if (objVals[0] && objVals[0].shares) {
        return objVals[0].shares;
      }
      return 0;
    }
  },

  hatena: {
    url: function( conf ) {
      return `http://api.b.st-hatena.com/entry.count?url=${conf.url}`;
    },
    parse: function( res ) {
      var cnt = Number(res);
      if ( ! Number.isNaN(cnt)) return cnt;
      return 0;
    }
  },

  stumbleupon: {
    url: function( conf ) {
      return `http://www.stumbleupon.com/services/1.01/badge.getinfo?url=${conf.url}`;
    },
    parse: function( res ) {
      var obj = JSON.parse(res);
      if (obj.result && obj.result.views) {
        return obj.result.views;
      }
      return 0;
    }
  },

  gplus: {
    url: function( conf ) {
      return `https://plusone.google.com/u/0/_/+1/fastbutton?count=true&url=${conf.url}`;
    },
    parse: function( res ) {
      var resMatch = res.match( /window\.__SSR\s=\s{c:\s(\d+)/ );
      if (resMatch && resMatch.length > 1)  return resMatch[1] / 1;
      return 0;
    }
  },

  pocket: {
    url: function( conf ) {
      return `https://widgets.getpocket.com/v1/button?label=pocket&count=vertical&v=1&url=${conf.url}&src=${conf.url}`;
    },
    parse: function( res ) {
      var resMatch = res.match( /<em\sid="cnt">([\d,]+)<\/em>/ );
      if (resMatch && resMatch.length > 1)  return resMatch[1].replace(/,/g, "") / 1;
      return 0;
    }
  },
}
