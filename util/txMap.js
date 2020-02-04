export function TMap (qq) {
    return new Promise(function (resolve, reject) {
        window.init = function () {
            resolve(qq)
        }
        var script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = 'http://map.qq.com/api/js?v=2.exp&callback=init&key=LUVBZ-4AW34-6YIUD-XKC7G-QSZKK-SBFCQ'
        script.onerror = reject
        document.head.appendChild(script)
    })
}
