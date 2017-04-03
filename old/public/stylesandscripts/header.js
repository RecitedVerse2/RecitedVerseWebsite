var menuBtn = $('.open_menu_btn');
var searchBar = $('.rv_searchbar');
var menu = $('.rv_menu');

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
        $('.profile_background_area').addClass('profile_background_area_expanded');
        $('.profile_background_area_expanded').removeClass('profile_background_area');
        $('.ep_content_container').addClass('ep_content_container_expanded');
        $('.ep_content_container_expanded').removeClass('ep_content_container');
        $('.upload_area').addClass('upload_area_expanded');
        $('.upload_area_expanded').removeClass('upload_area');
        $('.poem_area').addClass('poem_area_expanded');
        $('.poem_area_expanded').removeClass('poem_area');
        
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
        $('.profile_background_area_expanded').addClass('profile_background_area');
        $('.profile_background_area').removeClass('profile_background_area_expanded');
        $('.ep_content_container_expanded').addClass('ep_content_container');
        $('.ep_content_container').removeClass('ep_content_container_expanded');
        $('.upload_area_expanded').addClass('upload_area');
        $('.upload_area').removeClass('upload_area_expanded');
        $('.poem_area_expanded').addClass('poem_area');
        $('.poem_area').removeClass('poem_area_expanded');
        
    }
});

// Each menu button.
homeBtn.click(function() {
    document.location.href = "home";
});
albumsBtn.click(function() {
    document.location.href = "albums";
});
artistsBtn.click(function() {
    document.location.href = "artists";
});
genresBtn.click(function() {
    document.location.href = "genres";
});
myAccountBtn.click(function() {
    if(currentUser != null) {
        document.location.href = "profile";
    } else {
        document.location.href = "login";
    }
});
goToLoginBtn.click(function() {
    document.location.href = "login";
});
goToRegisterBtn.click(function() {
    document.location.href = "signup";
});