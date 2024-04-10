
export function storeCookies(cookieName: String, cookieItem : String){
    let cookie = cookieName+"="+ cookieItem+";expires=604800"
    document.cookie = cookie;
}

export function getCookie(cookieName: String){ // from chatGPT test
    var nameEQ = cookieName + "=";
    var cookies = document.cookie.split(';');
    for(var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}

export function clearCookies(cookieName: String){
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}