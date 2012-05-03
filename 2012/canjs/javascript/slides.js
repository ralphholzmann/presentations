$(function() {
  var section = $('section').eq(0)
  ,   tiltRange = 1
  ,   themes = [];

  // Resize slides
  (function( window, style, wrap, padding, height, width ) {

    var classes = [ "part", "previous", "current", "next", "future" ]
    ,   timeout;

    window.resize(function() {
        clearTimeout(timeout);
        timeout = setTimeout(function(){
          var scaleY    = ( window.height() - padding ) / height
          ,   scaleX    = ( window.width() - padding ) / width
          ,   scale     = Math.max( ( scaleY > scaleX ? scaleX : scaleY ), .1 )
          ,   topScale  = ( ( 1 / scale ) * padding );

          wrap.css({
            '-webkit-transform' : 'scale(' + scale  + ')',
            '-moz-transform' : 'scale(' + scale  + ')'
          });

          style.html(function(){

            return $.map( classes, function( v, i ) {

              return 'section.' + v + ' { top: ' + (( height + topScale ) * ( i - 2 )) + 'px; }';

            }).join(' ');

          });
        }, 500);
    }).resize();

  })( $(window), $('#style'), $('#wrap'), parseInt( section.css('margin-bottom'), 10 ), section.outerHeight(), section.outerWidth() );

  // Keys
  (function( left, up, right, down, space ) {

    function toggleTheme() {
      
      themes.push( $('.theme.active').detach() );
      themes.shift().appendTo('head');
    }

    function back( current ) {
      
      var prev    = current.prev()
      ,   past    = prev.prev()
      ,   next    = current.next()
      ,   future  = next.next();

      future.attr('class', 'active future').nextAll().removeClass('active');
      next.attr('class', 'active next');

      setTimeout(function(){

        current.attr('class', 'active current');
        prev.attr('class', 'active previous');
        past.attr('class', 'active past').prevAll().removeClass('active');
        updateHash();                
                    
      }, 200);

    }

    function forward( current ) {
      
      var prev    = current.prev()
      ,   past    = prev.prev()
      ,   next    = current.next()
      ,   future  = next.next();

      past.attr('class', 'active past').prevAll().removeClass('active');
      prev.attr('class', 'active previous');

      setTimeout(function(){

        current.attr('class', 'active current');
        next.attr('class', 'active next');
        future.attr('class', 'active future').nextAll().removeClass('active');
        updateHash();                
                    
      }, 200);

    }


    function updateHash() {
      window.location.hash = $('section.current').index() + 1;
    }

    $(document).bind('keydown', function( e ) {
      var current = $('section.current');

      switch ( e.which ) {

        case left:
        case up:
          if ( current.prev().length ) {
            back( current.prev() );
          }
          break;

        case right:
        case down:
          if ( current.next().length ) {
            forward( current.next() );
          }
          break;
        case space:
          toggleTheme();
          break;
      }


    });         

    // Load slide from hash on page load
    // TODO: Fix this so it works.
    if ( window.location.hash ) {

      var current = $('section').eq( parseInt( window.location.hash.replace('#',''), 10 ) - 1 );

      forward( current );

    } else {
      forward( $('section').eq(0) );            
    }

  })( 37, 38, 39, 40, 32 );

  // Pull themes off the DOM
  $('.theme').not('.active').detach().each(function(){
    themes.push($(this));
  });

  // Highlight syntax snippets
  SyntaxHighlighter.autoloader(
    'js syntaxhighlighter/scripts/shBrushJScript.js',
    'html syntaxhighlighter/scripts/shBrushXml.js',
    'css syntaxhighlighter/scripts/shBrushCss.js'
  );
  SyntaxHighlighter.all();

});
