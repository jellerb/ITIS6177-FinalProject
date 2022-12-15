const axios = require('axios').default;
const { v4: uuidv4 } = require('uuid');


let langs = [
    {name: "French", code: "fr"},
    {name: "Afrikaans", code: "af"},
    {name: "Arabic", code: "ar"},
    {name: "Czech", code: "cs"},
    {name: "German", code: "de"},
    {name: "Greek", code: "el"},
    {name: "Persian", code: "fa"},
    {name: "Finnish", code: "fi"},
    {name: "Irish", code: "ga"},
    {name: "Italian", code: "it"},
    {name: "Korean", code: "ko"},
    {name: "Russian", code: "ru"},
];


let endpoint = "https://api.cognitive.microsofttranslator.com";
let location = "eastus";

exports.index = (req, res, next) => {
    res.render("index");
};

exports.textIndex = (req, res, next) => {
    let resText = "";
    res.render("textIndex", {data: { languages: langs}});
};

exports.translate = (req, res, next) => {
    let key = process.env.KEY;
    let resText = req.body.inputText;
    let to = [req.body.language];

    console.log(resText);
    console.log(to);
    
    axios({
        baseURL: endpoint,
        url: '/translate',
        method: 'post',
        headers: {
            'Ocp-Apim-Subscription-Key': key,
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        params: {
            'api-version': '3.0',
            'from': 'en',
            'to': to
        },
        data: [{
            'text': resText
        }],
        responseType: 'json'
        }).then(function(response){
            console.log(JSON.stringify(response.data, null, 4));
            res.send(JSON.stringify(response.data, null, 4))
        })
        .catch((err) => {
            console.log(err);
        })
};

exports.lagnuages = (req, res, next) => {

    axios({
        baseURL: 'https://api.cognitive.microsofttranslator.com',
        url: '/languages',
        method: 'get',
        headers: {
            'Ocp-Apim-Subscription-Key': key,
            'Ocp-Apim-Subscription-Region': location,
            'Content-type': 'application/json',
            'X-ClientTraceId': uuidv4().toString()
        },
        params: {
            'api-version': '3.0',
            'scope': 'translation'
        },
        responseType: 'json'
        }).then(function(response){
            res.send(JSON.stringify(response.data, null, 4));
        })
        .catch((err) => {
            console.log(err);
        })

}