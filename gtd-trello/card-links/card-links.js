/************************************************************************
	GTD Trello (Card Links)
*************************************************************************

      This is a bit hacky! But it's the only method I've found that works...


      THE PROBLEM
      ---------------
      When you write anything in a "Card Title" in Trello, it wraps
      the entire text inside of an <a href> element and auto-links to
      the "back" of a card. So, even if you were to dynamically insert
      a link to http://google.com, you're going to the card back, baby.

      THE SOLUTION
      ---------------
      1.) Create the links dynamically like you normally would (regEX).
      2.) Give the link a "display: inline-block" and get the x/y position of the link.
      3.) Clone the link and append it to the body element.
      4.) Apply the x/y position of the "new link" to the "old link" on hover.


      Voila! Now we've got links "inside" our Trello cards (sorta).

*/


function GTD_CardLinks(){

      // Look in the card titles
      $(".list-card-title").each(function() {

         var GTDtext = $(this).html();
         var GTDlinkEX = /(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)/ig;
         var GTDlink = GTDtext.replace(GTDlinkEX, "<a class='gtd-link' href='$1' target='_blank'>$1</a>");

         $( ".gtd-link:empty" ).remove();

         // Re-write html w/ hyperlinks
         $(this).html(GTDlink);
      });


      // Create card links...
      $(".gtd-link").on( "mouseover", function() {
          var rect   =   this.getBoundingClientRect (),
              top    =   rect.top,
              left   =   rect.left;

           $(this)
             .clone().appendTo('body')
             .removeClass('gtd-link')
             .addClass('gtd-active-link')
             .css({
                  'position' : 'fixed',
                  'top' : top+ 'px',
                  'left' : left+ 'px',
                  'display' : 'inline-block',
                  'z-index' : '99999'
             });
      });


      // Removing Card Links...
      $( ".list-cards" ).scroll(function() {
        $( ".gtd-active-link" ).remove();
      });

      $( "#board, .list-wrapper, .list, .list-cards, .list-card" ).mousedown(function() {
         $( ".gtd-active-link" ).remove();
      });

      $( "#board, .list-wrapper, .list" ).mouseenter(function() {
        $( ".gtd-active-link" ).remove();
      });

}
