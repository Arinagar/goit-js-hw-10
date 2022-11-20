document.querySelector("#search-box").addEventListener("input",(function(e){(e.target.value,void fetch("https://restcountries.com/v3.1/all?fields=name.official,capital,population,flags.svg,languages").then((e=>{if(!e.ok)throw new Error(e.statusText);return e.json})).catch((e=>console.log(e)))).then((e=>{console.log(e)}))}));
//# sourceMappingURL=index.6e6bf4c5.js.map
