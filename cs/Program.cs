using System;
using System.Runtime.InteropServices.JavaScript;
using System.Threading.Tasks;
using System.Collections.Generic;  
using PKHeX.Core;

// dotnet run
// dotnet publish -r browser-wasm -c Debug /p:TargetArchitecture=wasm

// Create a "Main" method. This is required by the tooling.
return;

namespace TodoMVC
{
    public partial class MainJS
    {
        [JSExport]
        public static String SavToSets(byte[] data, string path) {
            var sav = SaveUtil.GetVariantSAV(data, path);

            var exports = new List<String>
            {
                // party
                ShowdownParsing.GetShowdownSets(sav.PartyData, Environment.NewLine + Environment.NewLine)
            };

            if (sav.HasBox) {
                // boxes 1, 2, and 3
                for (int i = 0; i < 3; i++)
                    exports.Add(ShowdownParsing.GetShowdownSets(sav.GetBoxData(i), Environment.NewLine + Environment.NewLine));
            }

            return string.Join(Environment.NewLine + Environment.NewLine, exports.ToArray());
        }
    }
}