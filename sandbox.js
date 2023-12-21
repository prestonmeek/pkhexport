import { dotnet } from './cs/bin/Debug/net7.0/browser-wasm/AppBundle/dotnet.js'

(async() => {
    const { getAssemblyExports, getConfig } = await dotnet
        .withDiagnosticTracing(false)
        .withApplicationArgumentsFromQuery()
        .create()

    const exports = await getAssemblyExports(getConfig().mainAssemblyName)

    self.onmessage = (e) => {
        if (e?.data?.source != "pkhexport")
            return

        const savData = exports.TodoMVC.MainJS.SavToSets(e.data.bytes, e.data.path)
        
        self.parent.postMessage({
            source: "pkhexport",
            savData
        }, "*")
    }
})()
