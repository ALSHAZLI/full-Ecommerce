function smash(nas){
var nas =  async page=>{
    var page =  "https://www.google.com/search?client=firefox-b-d&q=dd";
    var news = await page.$eval("center_col",);
    var events = news.map(e=> Event("document",e.title,e.href));
    return events;
};
// const func2 = element => {
//     var artical = element.querySelectorAll(".g");
//     return Array.from(artical).map(e => {
//         var a = e.querySelector("a");
//         console.log(e.a);
//         // return vas = {
//         //     title : e.a,
//         //     href : e.href
//         // };

//     });
 };
smash();