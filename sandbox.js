import { dotnet } from './pkhex/dotnet.js'

(async() => {
    const { getAssemblyExports, getConfig } = await dotnet
        .withDiagnosticTracing(false)
        .withApplicationArgumentsFromQuery()
        .create()

    const exports = await getAssemblyExports(getConfig().mainAssemblyName)

    self.onmessage = (e) => {
        const savData = exports.TodoMVC.MainJS.SavToSets(e.data)
        
        self.parent.postMessage(savData, "*")
    }
})()
