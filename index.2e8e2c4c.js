document.querySelector("#search-box").addEventListener("input",(function(t){(t.target.value,void fetch("https://restcountries.com/v3.1/all?fields=name.official,capital,population,flags.svg,languages").then((function(t){if(!t.ok)throw new Error(t.statusText);return t.json})).catch((function(t){return console.log(t)}))).then((function(t){console.log(t)}))}));
//# sourceMappingURL=index.2e8e2c4c.js.map
