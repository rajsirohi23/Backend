function capitalize(str){
    return str.toUpperCase()
}
function rev(str){
    return str.reverse().join(" ")
}
function count_vowels(str){
    const matches = str.match(/[aeiou]/gi);
    return matches ? matches.length:0;
}

module.exports = {
    capitalize,
    rev,
    count_vowels
};