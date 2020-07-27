const fetch = require('node-fetch')
const cheerio = require('cheerio')
const { DownloaderHelper } = require("node-downloader-helper")
var FormData = require('form-data')
const fs = require("fs")
var HttpsProxyAgent = require('https-proxy-agent');

async function source(proxy) {
    return new Promise((resolve, reject) => {
        var params = {}
        if (proxy) params['agent'] = new HttpsProxyAgent(proxy)
        fetch("https://www.supremenewyork.com/mobile.html", params).then(async resp => {
            if (resp.status !== 200) {
                reject('status code: ' + resp.status)
                return
            }
            const html = await resp.text()

            //console.log('getting wasm bin src')

            const a = cheerio.load(html)("script")
            for (var i in a)
                if ("script" === a[i].type && a[i].children && a[i].children && 1 === a[i].children.length) {
                    const t = a[i].children[0].data;
                    if (t.includes("wasmbinsrc")) {
                        const o = t.split('"')
                        for (var n in o) {
                            if (o[n].includes("https")) {
                                //console.log(o[n])
                                resolve(o[n])
                                break
                            }
                        }
                    }
                }
        }).catch(e => {
            console.log(e)
            reject(e)
        })
    })
}

async function genticket(apiurl, apikey, proxy, ticket, useragent) {
    return new Promise((resolve, reject) => {
        source(proxy).then(resp => {
            let wasmbinsrc = resp;
            //download
            const dl = new DownloaderHelper(wasmbinsrc, './')
            dl.on('end', downloadInfo => {
                console.log("Download completed: ", downloadInfo)
                let filePath = downloadInfo.filePath
                //resolve(filePath)
                //Post to api here or below
                var formdata = new FormData();
                formdata.append('wasm', fs.createReadStream(filePath))
                formdata.append('useragent', useragent)

                var requestOptions = {
                    method: 'POST',
                    headers: {'Authorization': `Bearer ${apikey}`},
                    body: formdata,
                    redirect: 'follow'
                };
                fetch(apiurl, requestOptions)
                .then(response => response.text())
                .then(result => {
                    let resultinfo = JSON.parse(result)
                    if (resultinfo.status == false) {
                        reject(resultinfo.message)
                    } else if (resultinfo.status == true) {
                        resolve(resultinfo.ticket[0])
                    } else {
                        reject(resultinfo.message)
                    }
                })
                .catch(error => console.log('error', error));
            })
            dl.on('error', err => console.error('Download of wasm failed ', err))
            dl.start().catch(err => {console.log(err)})
        })
    })        
}

module.exports.genticket = genticket;