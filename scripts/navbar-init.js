$(document).ready(function(){
    const navbar = `
        <div class="top_navbar">
        <div id="nav-icon">   
            <img src="images/web-logo-white.png" style="max-width:100%; max-height:100%;" />
        </div>
        
        <a href="index.html" class="active">Home</a>
        <div id="search-bar">
            <input type="text" placeholder="Find">
        </div>
        <div id="top-profile">
            <a href="pages/user-sign.html">Profile</a>
        </div>
        </div>
    `;

    $("#nav-bar").html(navbar);
});