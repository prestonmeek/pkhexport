export async function executeInjection() {
    const iframe = document.createElement('iframe')
    iframe.src = chrome.runtime.getURL('sandbox.html')
    document.body.appendChild(iframe)

    const dropzone = document.getElementsByClassName('wrapper')[0]

    const teams = document.getElementsByClassName('import-team-text')[0] 
    const importTeams = document.getElementById('import')

    dropzone.ondragover = (e) => e.preventDefault()
    dropzone.ondrop = async (e) => {
        e.preventDefault()

        if (e.dataTransfer && e.dataTransfer.files.length != 0) {
            const files = e.dataTransfer.files
            const sav = files[0]
            const bytes = new Uint8Array(await sav.arrayBuffer())

            iframe.contentWindow.postMessage({
                path: sav.name, 
                source: "pkhexport",
                bytes
            }, '*')
        }
    }

    window.onmessage = (e) => {
        if (e?.data?.source != "pkhexport")
            return

        teams.value = e.data.savData
        importTeams.click()
    }
}