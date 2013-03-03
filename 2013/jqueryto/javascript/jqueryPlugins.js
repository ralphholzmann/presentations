jQuery.fn.doOnce = function(func){ 
    this.length && func.apply(this); 
    return this; 
}

/*	

	jQuery pub/sub plugin by Peter Higgins (dante@dojotoolkit.org)

	Loosely based on Dojo publish/subscribe API, limited in scope. Rewritten blindly.

	Original is (c) Dojo Foundation 2004-2010. Released under either AFL or new BSD, see:
	http://dojofoundation.org/license for more information.

*/	

;(function(d){

	// the topic/subscription hash
	var cache = {};

	d.publish = function(/* String */topic, /* Array? */args){
		// summary: 
		//		Publish some data on a named topic.
		// topic: String
		//		The channel to publish on
		// args: Array?
		//		The data to publish. Each array item is converted into an ordered
		//		arguments on the subscribed functions. 
		//
		// example:
		//		Publish stuff on '/some/topic'. Anything subscribed will be called
		//		with a function signature like: function(a,b,c){ ... }
		//
		//	|		$.publish("/some/topic", ["a","b","c"]);
		cache[topic] && d.each(cache[topic], function(){
			this.apply(d, args || []);
		});
	};

	d.subscribe = function(/* String */topic, /* Function */callback){
		// summary:
		//		Register a callback on a named topic.
		// topic: String
		//		The channel to subscribe to
		// callback: Function
		//		The handler event. Anytime something is $.publish'ed on a 
		//		subscribed channel, the callback will be called with the
		//		published array as ordered arguments.
		//
		// returns: Array
		//		A handle which can be used to unsubscribe this particular subscription.
		//	
		// example:
		//	|	$.subscribe("/some/topic", function(a, b, c){ /* handle data */ });
		//
		if(!cache[topic]){
			cache[topic] = [];
		}
		cache[topic].push(callback);
		return [topic, callback]; // Array
	};

	d.unsubscribe = function(/* Array */handle){
		// summary:
		//		Disconnect a subscribed function for a topic.
		// handle: Array
		//		The return value from a $.subscribe call.
		// example:
		//	|	var handle = $.subscribe("/something", function(){});
		//	|	$.unsubscribe(handle);
		
		var t = handle[0];
		cache[t] && d.each(cache[t], function(idx){
			if(this == handle[1]){
				cache[t].splice(idx, 1);
			}
		});
	};

})(jQuery);


/**
 * Cookie plugin
 *
 * Copyright (c) 2006 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Create a cookie with the given name and value and other optional parameters.
 *
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Set the value of a cookie.
 * @example $.cookie('the_cookie', 'the_value', { expires: 7, path: '/', domain: 'jquery.com', secure: true });
 * @desc Create a cookie with all available options.
 * @example $.cookie('the_cookie', 'the_value');
 * @desc Create a session cookie.
 * @example $.cookie('the_cookie', null);
 * @desc Delete a cookie by passing null as value. Keep in mind that you have to use the same path and domain
 *       used when the cookie was set.
 *
 * @param String name The name of the cookie.
 * @param String value The value of the cookie.
 * @param Object options An object literal containing key/value pairs to provide optional cookie attributes.
 * @option Number|Date expires Either an integer specifying the expiration date from now on in days or a Date object.
 *                             If a negative value is specified (e.g. a date in the past), the cookie will be deleted.
 *                             If set to null or omitted, the cookie will be a session cookie and will not be retained
 *                             when the the browser exits.
 * @option String path The value of the path atribute of the cookie (default: path of page that created the cookie).
 * @option String domain The value of the domain attribute of the cookie (default: domain of page that created the cookie).
 * @option Boolean secure If true, the secure attribute of the cookie will be set and the cookie transmission will
 *                        require a secure protocol (like HTTPS).
 * @type undefined
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */

/**
 * Get the value of a cookie with the given name.
 *
 * @example $.cookie('the_cookie');
 * @desc Get the value of a cookie.
 *
 * @param String name The name of the cookie.
 * @return The value of the cookie.
 * @type String
 *
 * @name $.cookie
 * @cat Plugins/Cookie
 * @author Klaus Hartl/klaus.hartl@stilbuero.de
 */ 
jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};


/*
  License:
  Jookie 1.0 jQuery Plugin

  Copyright (c) 2008 Jon Combe (http://joncom.be)

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation
  files (the "Software"), to deal in the Software without
  restriction, including without limitation the rights to use,
  copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the
  Software is furnished to do so, subject to the following
  conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
  OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
  WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
  OTHER DEALINGS IN THE SOFTWARE.
!*/
(function(c){c.Jookie={Data:{},Debug:function(j){f(j)},Delete:function(j){h(j)},Get:function(k,j){return b(k,j)},Initialise:function(k,j){e(k,j)},Set:function(k,j,l){g(k,j,l)},Unset:function(k,j){d(k,j)}};function f(l){var j=/\+/g;var k=unescape(String(a(l)).replace(j," "));alert("Name: "+l+"\nLifespan: "+c.Jookie.Data[l].iLifespan+" minutes\nCookie Existed Prior to Init: "+c.Jookie.Data[l].bMadeEarlier+"\n\n"+k)}function h(j){delete c.Jookie.Data[j];document.cookie=(j+"=; expires="+(new Date(1990,6,3)).toGMTString()+"; path=/")}function a(n){var l=null;var m=document.cookie.split(";");n+="=";for(var j in m){var k=m[j];while(k.charAt(0)==" "){k=k.substring(1,k.length)}if(k.indexOf(n)==0){l=k.substring(n.length,k.length);break}}return l}function b(k,j){return c.Jookie.Data[k].oValues[j]}function e(l,j){if(typeof c.Jookie.Data[l]=="undefined"){var m={};var n=false;var k=a(l);if(k!==null){m=JSON.parse(unescape(String(k).replace(/\+/g," ")));n=true}c.Jookie.Data[l]={iLifespan:j,bMadeEarlier:n,oValues:m};i(l)}}function i(k){var l="";if(c.Jookie.Data[k].iLifespan>0){var j=new Date();j.setMinutes(j.getMinutes()+c.Jookie.Data[k].iLifespan);l=("; expires="+j.toGMTString())}document.cookie=(k+"="+escape(JSON.stringify(c.Jookie.Data[k].oValues))+l+"; path=/")}function g(l,j,k){c.Jookie.Data[l].oValues[j]=k;i(l)}function d(k,j){delete c.Jookie.Data[k].oValues[j];i(k)}})(jQuery);if(!this.JSON){JSON=function(){function f(n){return n<10?"0"+n:n}Date.prototype.toJSON=function(key){return this.getUTCFullYear()+"-"+f(this.getUTCMonth()+1)+"-"+f(this.getUTCDate())+"T"+f(this.getUTCHours())+":"+f(this.getUTCMinutes())+":"+f(this.getUTCSeconds())+"Z"};var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapeable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},rep;function quote(string){escapeable.lastIndex=0;return escapeable.test(string)?'"'+string.replace(escapeable,function(a){var c=meta[a];if(typeof c==="string"){return c}return"\\u"+("0000"+(+(a.charCodeAt(0))).toString(16)).slice(-4)})+'"':'"'+string+'"'}function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==="object"&&typeof value.toJSON==="function"){value=value.toJSON(key)}if(typeof rep==="function"){value=rep.call(holder,key,value)}switch(typeof value){case"string":return quote(value);case"number":return isFinite(value)?String(value):"null";case"boolean":case"null":return String(value);case"object":if(!value){return"null"}gap+=indent;partial=[];if(typeof value.length==="number"&&!(value.propertyIsEnumerable("length"))){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||"null"}v=partial.length===0?"[]":gap?"[\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"]":"["+partial.join(",")+"]";gap=mind;return v}if(rep&&typeof rep==="object"){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==="string"){v=str(k,value,rep);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value,rep);if(v){partial.push(quote(k)+(gap?": ":":")+v)}}}}v=partial.length===0?"{}":gap?"{\n"+gap+partial.join(",\n"+gap)+"\n"+mind+"}":"{"+partial.join(",")+"}";gap=mind;return v}}return{stringify:function(value,replacer,space){var i;gap="";indent="";if(typeof space==="number"){for(i=0;i<space;i+=1){indent+=" "}}else{if(typeof space==="string"){indent=space}}rep=replacer;if(replacer&&typeof replacer!=="function"&&(typeof replacer!=="object"||typeof replacer.length!=="number")){throw new Error("JSON.stringify")}return str("",{"":value})},parse:function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==="object"){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v}else{delete value[k]}}}}return reviver.call(holder,key,value)}cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return"\\u"+("0000"+(+(a.charCodeAt(0))).toString(16)).slice(-4)})}if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,""))){j=eval("("+text+")");return typeof reviver==="function"?walk({"":j},""):j}throw new SyntaxError("JSON.parse")}}}()};



    /*!
     * Copyright (c) 2009 Cameron Zemek
     *
     * Permission is hereby granted, free of charge, to any person
     * obtaining a copy of this software and associated documentation
     * files (the "Software"), to deal in the Software without
     * restriction, including without limitation the rights to use,
     * copy, modify, merge, publish, distribute, sublicense, and/or sell
     * copies of the Software, and to permit persons to whom the
     * Software is furnished to do so, subject to the following
     * conditions:
     *
     * The above copyright notice and this permission notice shall be
     * included in all copies or substantial portions of the Software.
     *
     * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
     * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
     * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
     * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
     * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
     * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
     * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
     * OTHER DEALINGS IN THE SOFTWARE.
     */
    ;(function($) {
        function Hovertip(elem, conf) {
            // Create tooltip
            var tooltip = $('<div></div>')
                .addClass(conf.className)
                .html(elem.attr('title'))
                //.insertAfter(elem);
                .insertAfter($("body *")[0])
            tooltip.hide();

            // Remove the browser tooltip
            elem.removeAttr('title');

            function setPosition(posX, posY) {
                tooltip.css({ left: posX, top: posY });
            }

            function updatePosition(event) {
                var tooltipWidth = tooltip.outerWidth();
                var tooltipHeight = tooltip.outerHeight();
                var $window = $(window);
                var windowWidth = $window.width() + $window.scrollLeft();
                var windowHeight = $window.height() + $window.scrollTop();
                var posX = event.pageX + conf.offset[0];
                var posY = event.pageY + conf.offset[1];
                if (posX + tooltipWidth > windowWidth) {
                    // Move left
                    posX = windowWidth - tooltipWidth;
                }
                if (posY + tooltipHeight > windowHeight) {
                    // Move tooltip to above cursor
                    posY = event.pageY - conf.offset[1] - tooltipHeight;
                }
                setPosition(posX, posY);
            }

            elem.hover(
                // Show
                function(event) {
                    updatePosition(event);
                    conf.show(tooltip);
                },
                // Hide
                function() {
                    conf.hide(tooltip);
                }
            );
        }

        $.fn.hovertip = function(conf) {
            var defaultConf = {
                offset: [10, 10],
                className: 'hovertip',
                show: function(tooltip) {
                    tooltip.fadeIn(150);
                },
                hide: function(tooltip) {
                    tooltip.fadeOut(150);
                }
            };
            $.extend(defaultConf, conf);

            this.each(function() {
                var el = new Hovertip($(this), defaultConf);
                $(this).data("hovertip", el);
            });
        }
    })(jQuery);
    
/*
 * jQuery JSON Plugin
 * version: 2.1 (2009-08-14)
 *
 * This document is licensed as free software under the terms of the
 * MIT License: http://www.opensource.org/licenses/mit-license.php
 *
 * Brantley Harris wrote this plugin. It is based somewhat on the JSON.org 
 * website's http://www.json.org/json2.js, which proclaims:
 * "NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.", a sentiment that
 * I uphold.
 *
 * It is also influenced heavily by MochiKit's serializeJSON, which is 
 * copyrighted 2005 by Bob Ippolito.
 */
 
(function($) {
    /** jQuery.toJSON( json-serializble )
        Converts the given argument into a JSON respresentation.

        If an object has a "toJSON" function, that will be used to get the representation.
        Non-integer/string keys are skipped in the object, as are keys that point to a function.

        json-serializble:
            The *thing* to be converted.
     **/
    $.toJSON = function(o)
    {
        if (typeof(JSON) == 'object' && JSON.stringify)
            return JSON.stringify(o);
        
        var type = typeof(o);
    
        if (o === null)
            return "null";
    
        if (type == "undefined")
            return undefined;
        
        if (type == "number" || type == "boolean")
            return o + "";
    
        if (type == "string")
            return $.quoteString(o);
    
        if (type == 'object')
        {
            if (typeof o.toJSON == "function") 
                return $.toJSON( o.toJSON() );
            
            if (o.constructor === Date)
            {
                var month = o.getUTCMonth() + 1;
                if (month < 10) month = '0' + month;

                var day = o.getUTCDate();
                if (day < 10) day = '0' + day;

                var year = o.getUTCFullYear();
                
                var hours = o.getUTCHours();
                if (hours < 10) hours = '0' + hours;
                
                var minutes = o.getUTCMinutes();
                if (minutes < 10) minutes = '0' + minutes;
                
                var seconds = o.getUTCSeconds();
                if (seconds < 10) seconds = '0' + seconds;
                
                var milli = o.getUTCMilliseconds();
                if (milli < 100) milli = '0' + milli;
                if (milli < 10) milli = '0' + milli;

                return '"' + year + '-' + month + '-' + day + 'T' +
                             hours + ':' + minutes + ':' + seconds + 
                             '.' + milli + 'Z"'; 
            }

            if (o.constructor === Array) 
            {
                var ret = [];
                for (var i = 0; i < o.length; i++)
                    ret.push( $.toJSON(o[i]) || "null" );

                return "[" + ret.join(",") + "]";
            }
        
            var pairs = [];
            for (var k in o) {
                var name;
                var type = typeof k;

                if (type == "number")
                    name = '"' + k + '"';
                else if (type == "string")
                    name = $.quoteString(k);
                else
                    continue;  //skip non-string or number keys
            
                if (typeof o[k] == "function") 
                    continue;  //skip pairs where the value is a function.
            
                var val = $.toJSON(o[k]);
            
                pairs.push(name + ":" + val);
            }

            return "{" + pairs.join(", ") + "}";
        }
    };

    /** jQuery.evalJSON(src)
        Evaluates a given piece of json source.
     **/
    $.evalJSON = function(src)
    {
        if (typeof(JSON) == 'object' && JSON.parse)
            return JSON.parse(src);
        return eval("(" + src + ")");
    };
    
    /** jQuery.secureEvalJSON(src)
        Evals JSON in a way that is *more* secure.
    **/
    $.secureEvalJSON = function(src)
    {
        if (typeof(JSON) == 'object' && JSON.parse)
            return JSON.parse(src);
        
        var filtered = src;
        filtered = filtered.replace(/\\["\\\/bfnrtu]/g, '@');
        filtered = filtered.replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']');
        filtered = filtered.replace(/(?:^|:|,)(?:\s*\[)+/g, '');
        
        if (/^[\],:{}\s]*$/.test(filtered))
            return eval("(" + src + ")");
        else
            throw new SyntaxError("Error parsing JSON, source is not valid.");
    };

    /** jQuery.quoteString(string)
        Returns a string-repr of a string, escaping quotes intelligently.  
        Mostly a support function for toJSON.
    
        Examples:
            >>> jQuery.quoteString("apple")
            "apple"
        
            >>> jQuery.quoteString('"Where are we going?", she asked.')
            "\"Where are we going?\", she asked."
     **/
    $.quoteString = function(string)
    {
        if (string.match(_escapeable))
        {
            return '"' + string.replace(_escapeable, function (a) 
            {
                var c = _meta[a];
                if (typeof c === 'string') return c;
                c = a.charCodeAt();
                return '\\u00' + Math.floor(c / 16).toString(16) + (c % 16).toString(16);
            }) + '"';
        }
        return '"' + string + '"';
    };
    
    var _escapeable = /["\\\x00-\x1f\x7f-\x9f]/g;
    
    var _meta = {
        '\b': '\\b',
        '\t': '\\t',
        '\n': '\\n',
        '\f': '\\f',
        '\r': '\\r',
        '"' : '\\"',
        '\\': '\\\\'
    };


    (function(){
        var guid = 1,
        calculateBox = function( elem ) {
                var options = elem.data('fileStyle').options,
                box = {
                    'file' : {
                        'height' : elem.outerHeight(),
                        'width' : elem.outerWidth()
                    },
                    'placeholder' : {
                        'offset' : options.placeholder.offset(),
                        'position' : options.placeholder.position(),
                        'height' : options.placeholder.outerHeight(),
                        'width' : options.placeholder.outerWidth(),
                        'parent' : {
                            'offset' : options.placeholder.parent().offset()
                        }
                    }
                };
            
            box['browserPad'] = ($.browser.webkit) ? 100 : box.file.width - 30,
            box['buttonXMin'] = box.placeholder.offset.left,
            box['buttonXMax'] = box.buttonXMin + box.placeholder.width,
            box['buttonYMin'] = box.placeholder.offset.top,
            box['buttonYMax'] = box.buttonYMin + box.placeholder.height         
            elem.data('fileStyle').box = box;
        }; // $.fn.fileStyle.calculateBox = function( elem ) {
    
        $.fn.fileStyle = function(options) {
    
            return this.each(function(){
                // Save reference to this
                var $this = $(this);
    
                // Save reference and set id        
                switch (options) {
                    
                
                    case 'calculateBox': 
                        calculateBox($this);
                        break;
            
                    case 'destroy': 
                        $this.data('fileStyle').options.parent.unbind('mousemove.fileStyle');
                        $this.removeData('fileStyle').unbind('click.fileStyle');
                        $(window).unbind('resize.fileStyle');
                        break;
            
                    default:
    
                        // Save options to element
                        options.parent = options.placeholder.parent();
                        $this.data('fileStyle', {
                            'options' : options
                        });
                        
                        // Hide original file input and calculate box
                        $this.css({
                            'position' : 'absolute',
                            'opacity' : 0.001,
                            'display' : 'none'
                        });
                        calculateBox($this);            
                        
                        // Bind parent of placeholder
                        $this.data('fileStyle').options.parent.css('position', 'relative').bind('mousemove.fileStyle', function(event) {
                            // Access some vars we'll be using a lot
                            var box = $this.data('fileStyle').box,
                                    options = $this.data('fileStyle').options;
    
                            // Show or hide the file input if its over the placeholder
                            if (    event.pageX >= box.buttonXMin && 
                                        event.pageX <= box.buttonXMax && 
                                        event.pageY >= box.buttonYMin && 
                                        event.pageY <= box.buttonYMax ) {
                                
                                var relativeX = event.pageX - box.placeholder.parent.offset.left,
                                        relativeY = event.pageY - box.placeholder.parent.offset.top,
                                        x = Math.min(Math.max(box.buttonXMin, (event.pageX)), box.buttonXMax),
                                        y = Math.min(Math.max(box.buttonYMin, (event.pageY)), box.buttonYMax);
                                
                                $this.show().css({
                                    "left": (relativeX - box.browserPad) + "px",
                                    "top": (relativeY - (box.file.height / 2)) + "px"
                                });
                                options.placeholder.addClass('hover');
                            } else {
                                $this.hide();
                                options.placeholder.removeClass('hover');
                            }                       
                        }); // $this.data('fileStyle').parent ...
                
                        // Make sure we update the box calculation on resize
                        var resizeTimer = null;
                        $(window).bind('resize.fileStyle', function() {
                            if (resizeTimer) clearTimeout(resizeTimer);
                            resizeTimer = setTimeout(function(){
                                calculateBox($this);
                            }, 100);
                        });     
                
                        // Pseudo change event
                        $this.bind('click.fileStyle', function(){
                            var val = $this.val();
                            setTimeout(function(){
                            	//console.log('heyo!');
                                $(document).one('mousemove.fileStyle', function(){
                                    if (val != $this.val()) {
                                        (options.callback || $.noop).call($this);
                                    }
                                });
                            }, 2000);
                        });
                }; // switch (options) {
    
            }); // return this.each(function(){
        }; // $.fn.fileStyle = function(options) {
    })();
})(jQuery);






/**
 * @author Alexander Farkas
 * v. 1.21
 */


(function($) {
    if(!document.defaultView || !document.defaultView.getComputedStyle){ // IE6-IE8
        var oldCurCSS = jQuery.curCSS;
        jQuery.curCSS = function(elem, name, force){
            if(name === 'background-position'){
                name = 'backgroundPosition';
            }
            if(name !== 'backgroundPosition' || !elem.currentStyle || elem.currentStyle[ name ]){
                return oldCurCSS.apply(this, arguments);
            }
            var style = elem.style;
            if ( !force && style && style[ name ] ){
                return style[ name ];
            }
            return oldCurCSS(elem, 'backgroundPositionX', force) +' '+ oldCurCSS(elem, 'backgroundPositionY', force);
        };
    }
    
    var oldAnim = $.fn.animate;
    $.fn.animate = function(prop){
        if('background-position' in prop){
            prop.backgroundPosition = prop['background-position'];
            delete prop['background-position'];
        }
        if('backgroundPosition' in prop){
            prop.backgroundPosition = '('+ prop.backgroundPosition;
        }
        return oldAnim.apply(this, arguments);
    };
    
    function toArray(strg){
        strg = strg.replace(/left|top/g,'0px');
        strg = strg.replace(/right|bottom/g,'100%');
        strg = strg.replace(/([0-9\.]+)(\s|\)|$)/g,"$1px$2");
        var res = strg.match(/(-?[0-9\.]+)(px|\%|em|pt)\s(-?[0-9\.]+)(px|\%|em|pt)/);
        return [parseFloat(res[1],10),res[2],parseFloat(res[3],10),res[4]];
    }
    
    $.fx.step. backgroundPosition = function(fx) {
        if (!fx.bgPosReady) {
            var start = $.curCSS(fx.elem,'backgroundPosition');
            
            if(!start){//FF2 no inline-style fallback
                start = '0px 0px';
            }
            
            start = toArray(start);
            
            fx.start = [start[0],start[2]];
            
            var end = toArray(fx.options.curAnim.backgroundPosition);
            fx.end = [end[0],end[2]];
            
            fx.unit = [end[1],end[3]];
            fx.bgPosReady = true;
        }
        //return;
        var nowPosX = [];
        nowPosX[0] = ((fx.end[0] - fx.start[0]) * fx.pos) + fx.start[0] + fx.unit[0];
        nowPosX[1] = ((fx.end[1] - fx.start[1]) * fx.pos) + fx.start[1] + fx.unit[1];           
        fx.elem.style.backgroundPosition = nowPosX[0]+' '+nowPosX[1];

    };
})(jQuery);

// Modal plugin by Ralph
(function($, window, undefined) {

    var pluginName = 'modal'
    ,   defaults = {
            'animate' : true
        ,   'shade' : true
        }
    ,   methods = {
            priv : {
                getCenterCss : function( settings ) {
                    var $this = $(this),
                    	css;
                    
                    $this.css({
                    	visibility : 'hidden',
                    	display: 'block'
                    });
                    
                    // Are we in a frame?
                    css = ( top.location != location ) ? {
                      'position' : 'absolute',
                      'top' : (settings.top && ( settings.top - ($this.outerHeight() / 2) ))  || (($('body').height() / 2) - ($this.outerHeight() / 2)) + 'px',
                      'left' : '50%',
                      'margin-left' : -($this.outerWidth() / 2),
                      'z-index': 100
                    } : {
                      'position' : 'fixed',
                      'top' : '50%',
                      'left' : '50%',
                      'margin-top' : -($this.outerHeight() / 2),
                      'margin-left' : -($this.outerWidth() / 2),
                      'z-index': 100
                    };

                    $this.css({
                    	visibility : 'visible'
                    });

                    return css;
                }
            ,   center : function() {
                    var $this = $(this)
                    ,   data = $this.data( pluginName );
                    
                    // Make sure it has plugin data
                    if ( data ) {
                        data.elements.modal.css( methods.priv.getCenterCss.call( this, data.settings ));
                    }

                    return $this;
                }
            }
        ,   pub : {
                
                init : function( options ) {
                    
                    var settings = defaults
                    ,   modal = $('#modal')
                    ,   elements = {};
                    
                    if ( options ) $.extend( settings, options );
                    
                    // If a modal doesn't exist, create it and add it to the dom
                    if ( ! modal.length ) {
                        modal = $('<div id="modal" style="position: fixed"><div class="close"></div><div class="wrap"><div class="pad"><div class="content"></div></div></div></div>')
                        $(document.body).append(modal);
                        elements.modal = modal;
                    }
                    
                    // Add content to modal
                    modal.find('.content').html(this).children(':not(style, script)').show();
                                        
                    // Create a shade?
                        var shade = $('<div class="shade"></div>');
                        $(document.body).append(shade);
                        elements.shade = shade;

                    // Save settings to it and return it for chainability
                    modal.data( pluginName, {
                        'settings' : settings
                    ,   'elements' : elements
                    });

                    // Center modal and open it
                    
                    methods.pub.open.call(modal);
                    
                    // Bind close button
                    modal.find('.close').bind('click', function(){
                        methods.pub.close.call(modal);
                    });
                    
                    return modal
                }
            ,   open : function() {
                    var $this = $(this)
                    ,   data = $this.data( pluginName );
                    
                    // Make sure it has plugin data
                    if ( data ) {
                        (data.settings.beforeShow || $.noop).call(this);
                        methods.priv.center.call(data.elements.modal);
                        if ( data.settings.animate ) {
                            
                            data.elements.modal.css({
                                'opacity' : 0
                            ,   'margin-top' : ( parseInt( $this.css( 'margin-top' )) - 50) + 'px'
                            }).animate({
                                'opacity' : 1
                            ,   'margin-top' : '+=50px'
                            }, function(){
                               (data.settings.onShow || $.noop).call(this);
                            });
                        
                          data.elements.shade.show();
                          
                          if ( data.settings.shade ) {
	                          data.elements.shade.animate({
	                              'opacity' : '.65'
	                          });
                          }
                        } else {
                            data.elements.shade.show();
							if ( data.settings.shade ) {
							  data.elements.shade.css('opacity', '.65');
							}
                            data.elements.modal.show();
                           (data.settings.onShow || $.noop).call(this);
                        }
                    }
                    return this;
                }
            ,   close : function() {
                    var $this = $(this)
                    ,   data = $this.data( pluginName );
                    
                    // Make sure it has plugin data
                    if ( data ) {

                        (data.settings.beforeClose || $.noop)();

                        if ( data.settings.animate ) {

                            data.elements.modal.animate({
                                'opacity' : 0,
                                'margin-top' : '-=50px'
                            }, function(){
                                $(this).remove();
                                (data.settings.onClose || $.noop)();
                            });
                            
                            data.elements.shade.fadeOut(function(){
                                $(this).remove();
                            });
                            
                        } else {
                            data.elements.modal.hide().remove();
                            data.elements.shade.hide().remove();
                            (data.settings.onClose || $.noop)();
                        }
                    }
                }
            ,   recenter : function() {
            
                    methods.priv.center.call(this);

                }
            }
    };

    $.fn[pluginName] = function( method ) {

        if ( methods.pub[method] ) {
            return methods.pub[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.pub.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.fn.' + pluginName );
        }

    };

})(jQuery, window);

(function( $ ){
	
	$.fn.count = function() {
		
		return this.each(function(){
		
			var $this = $(this)
			,	number = parseInt($this.attr('maxlength'), 10)
			,	count = $('#' + $this.attr('count'))
			,	s = count.siblings('.s');
				
			$this.bind('keyup.count', function(){
				var left = number - $this.val().length;
				count.text(left);
				left == 1 ? s.text('') : s.text('s');
				
				left <= 0 && $this.val( $this.val().substr(0, number));
				
			}).keyup();
		});
	
	}
	
})( jQuery );

(function( $ ) {
	$.fn.autoResize = function( method , options ) {
	
	    return this.each(function(){
	        var $this = $(this)
	          , lineHeight = parseFloat($this.css('line-height'))
	          , minHeight = lineHeight * 4
	          , div = $('<div />', {
	                'css' : {
	                    'width'  : $this.width() - 2,
	                    'line-height' : $this.css('line-height'),
	                    'position' : 'absolute',
	                    'top' : '-10000px',
	                    'left' : '-10000px',
	                    'opacity' : 0,
	                    'word-wrap' : 'break-word'
	                }
	            })
	          , timeout
	          , lastHeight = minHeight
	          , lock;
	
	        $(document.body).append(div);
	    
	        $this.bind('keyup.autoResize', function(){
	            clearTimeout(timeout);
	            timeout = setTimeout(function(){
	
	                // Append content to div
	                div.text($this.val());
	
	                var newHeight = Math.max(minHeight, ((Math.floor(div.height() / lineHeight) * lineHeight) + (lineHeight * 2)));
	
	                if ( newHeight != lastHeight && ! lock) {
	                    lock = true;
	                    lastHeight = newHeight;
	                    $this.animate({
	                        'height' : newHeight
	                    }, 0, function(){
	                        lock = false;
	                        $this.trigger('autoResize').setCursor($this.val().length);
	                    });                
	                }
	            
	            }, 300);
	        });
	    });
	}
})( jQuery );
