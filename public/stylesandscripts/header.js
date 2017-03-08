var menuBtn = $('.open_menu_btn');
var searchBar = $('.rv_searchbar');
var menu = $('.menu');


// When the user taps the enter key on the search bar.
searchBar.keyup(function(event) {
    event.preventDefault();
    
    if(event.which == 13) {
        // Go to the next page.
        console.log('Searched!');
    }
    
});

// Clicking on the menu button.
menuBtn.click(function() {
    
    if(menu.hasClass('menu')) {
        menu.removeClass('menu');
        menu.addClass('menu_expanded');
        
        menuBtn.removeClass('open_menu_btn');
        menuBtn.addClass('open_menu_btn_expanded');
        
        searchBar.removeClass('rv_searchbar');
        searchBar.addClass('rv_searchbar_expanded');
    } else {
        menu.addClass('menu');
        menu.removeClass('menu_expanded');
        
        menuBtn.addClass('open_menu_btn');
        menuBtn.removeClass('open_menu_btn_expanded');
        
        searchBar.addClass('rv_searchbar');
        searchBar.removeClass('rv_searchbar_expanded');
    }
});