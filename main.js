const resdiv = document.querySelector('#results');
const resbtn = document.querySelector('#getdata');


function get(url){
    let request = new XMLHttpRequest()
    request.open('GET', url, false)
    request.send()
    return request.responseText
}



function main(){
    //users = get(https://api.adviceslip.com/advice)
    data = get("https://api.adviceslip.com/advice")
    advice = JSON.parse(getdata).slip;
    getdata.innerHTML = `<p>${advice.advice}</p>`;
    //console.log(advice.advice)
    //console.log(advice.innerHTML = `<p>${advice.advice}</p>`)
    
    //test = advice.slip
    //console.log(test)
}
main()




//getdata button
//results div
//return result.innerHTML