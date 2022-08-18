export function validateEmail(email) {
    const domainExt = ["com", "edu", "net", "org"]
    let error = false

    if (!(email.includes('@'))) {
        // Error: No '@'
        error = true
    } else if (email.split('@')[1].split('.') === '') {
        // Error: @.com
        error = true
    } else if (!(domainExt.includes(email.split('@')[1].split('.')[1]))) {
        // Error: .something
        error = true
    }

    return error
}

export function replaceSpaces(string) {
    let stringWith = false
    let replacedStringWith;
    if (string.includes('w/')) {
        stringWith = true
        replacedStringWith = string.replace('w/', 'with')
    }

    if (!stringWith) {
        return string.replace(/\s+/g, '-');
    } else {
        const newString = replacedStringWith.replace(/\s+/g, '-');
        return newString
    }
}

export function toTitleCase(str) {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}