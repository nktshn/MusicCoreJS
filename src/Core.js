export const GLOBAL_TITLE = "MusicCoreJS";

//get key by value func:
export const getKeyByValue = function (value, obj) {
    for (let prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            if (obj[prop] === value)
                return prop;
        }
    }
};




