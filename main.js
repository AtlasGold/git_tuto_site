function get(url){
    let request = new XMLHttpRequest()
    request.open('GET', url, false)
    request.send()
    return request.responseText

}

//onclick="main(document.getElementById('advice').value)

function main(){
    data = get("https://api.adviceslip.com/advice")
    advice = JSON.parse(data).slip;
    alert(advice.advice)
    
}
main()




