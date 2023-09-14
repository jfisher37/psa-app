import homepage from "./pages/homepage.js"
import loggedInFrame from "./pages/loggedInFrame.js";
import splashPage from "./pages/splashPage.js";
import cookieLogin from "./utils/cookieLogin.js";


// TODO: replace this with an auth function:

const loggedIn = await cookieLogin();

// If logged in, load logged in frame and homepage. If not, open splash page.

if (loggedIn) {

// load logged in frame:
//Then chaining to make sure homepage loads after frame 
loggedInFrame().then(() => {;
 
//initial load is homepage
homepage();});
} else {

    splashPage();
};

