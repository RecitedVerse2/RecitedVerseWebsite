var menuBtn = $('.open_menu_btn');
var searchBar = $('.rv_searchbar');
var menu = $('.menu');

var homeBtn = $('#home_btn');
var albumsBtn = $('#albums_btn');
var artistsBtn = $('#artists_btn');
var genresBtn = $('#genres_btn');
var myAccountBtn = $('#myaccount_btn');
var goToLoginBtn = $('#goTo_login_btn');
var goToRegisterBtn = $('#goTo_register_btn');


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

    if(menu.hasClass('rv_menu')) {
        menu.removeClass('rv_menu');
        menu.addClass('rv_menu_expanded');
        
        menuBtn.removeClass('open_menu_btn');
        menuBtn.addClass('open_menu_btn_expanded');
        
        searchBar.removeClass('rv_searchbar');
        searchBar.addClass('rv_searchbar_expanded');
        
        $('.trending_area').addClass('trending_area_expanded');
        $('.trending_area_expanded').removeClass('trending_area');
        $('.recentlyAdded_area').addClass('recentlyAdded_area_expanded');
        $('.recentlyAdded_area_expanded').removeClass('recentlyAdded_area');
        $('.profile_info_area').addClass('profile_info_area_expanded');
        $('.profile_info_area_expanded').removeClass('profile_info_area');
        $('.profile_recitations_area').addClass('profile_recitations_area_expanded');
        $('.profile_recitations_area_expanded').removeClass('profile_recitations_area');
        
    } else {
        menu.addClass('rv_menu');
        menu.removeClass('rv_menu_expanded');
        
        menuBtn.addClass('open_menu_btn');
        menuBtn.removeClass('open_menu_btn_expanded');
        
        searchBar.addClass('rv_searchbar');
        searchBar.removeClass('rv_searchbar_expanded');
        
        $('.trending_area_expanded').addClass('trending_area');
        $('.trending_area').removeClass('trending_area_expanded');
        $('.recentlyAdded_area_expanded').addClass('recentlyAdded_area');
        $('.recentlyAdded_area').removeClass('recentlyAdded_area_expanded');
        $('.profile_info_area_expanded').addClass('profile_info_area');
        $('.profile_info_area').removeClass('profile_info_area_expanded');
        $('.profile_recitations_area_expanded').addClass('profile_recitations_area');
        $('.profile_recitations_area').removeClass('profile_recitations_area_expanded');
        
    }
});

// Each menu button.
homeBtn.click(function() {
    document.location = "https://recitedverse.herokuapp.com/home";
});
albumsBtn.click(function() {
    document.location = "https://recitedverse.herokuapp.com/albums";
});
artistsBtn.click(function() {
    document.location = "https://recitedverse.herokuapp.com/artists";
});
genresBtn.click(function() {
    document.location = "https://recitedverse.herokuapp.com/genres";
});
myAccountBtn.click(function() {
    if(currentUser != null) {
        document.location = "https://recitedverse.herokuapp.com/profile";
    } else {
        document.location = "https://recitedverse.herokuapp.com/login";    
    }
});
goToLoginBtn.click(function() {
    document.location = "https://recitedverse.herokuapp.com/login";
});
goToRegisterBtn.click(function() {
    document.location = "https://recitedverse.herokuapp.com/signup";
});