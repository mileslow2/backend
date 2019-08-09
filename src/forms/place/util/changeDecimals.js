module.exports = (num, dec) =>
{
    num = num * -1;
    num = num.toFixed(dec);
    num = num * -1;
    return num;
}
//don't ask why this works, I don't know