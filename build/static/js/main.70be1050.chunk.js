(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{12:function(e,t,n){e.exports=n(37)},37:function(e,t,n){"use strict";n.r(t);var a=n(3),i=n(11),u=n.n(i),o=n(0),r=n.n(o),l=function(e){return r.a.createElement("div",null,r.a.createElement("form",{onSubmit:e.klikkauskasittelija},r.a.createElement("div",null,"nimi: ",r.a.createElement("input",{value:e.nimiarvo,onChange:e.nimikasittelija})),r.a.createElement("div",null,"numero: ",r.a.createElement("input",{value:e.numeroarvo,onChange:e.numerokasittelija})),r.a.createElement("div",null,r.a.createElement("button",{type:"submit"},"lis\xe4\xe4"))))},c=function(e){return r.a.createElement("div",null,"Rajaa n\xe4ytett\xe4vi\xe4: ",r.a.createElement("input",{value:e.arvo,onChange:e.kasittelija}))},s=function(e){return e.persons.filter(function(t){return t.name.includes(e.suodatin)}).map(function(t){return r.a.createElement("p",{key:t.name},t.name," ",t.number," ",r.a.createElement("button",{onClick:function(){return e.kasittelija(t.id)}},"poista"))})},m=n(2),f=n.n(m),d=function(){return f.a.get("http://localhost:3001/api/persons").then(function(e){return e.data})},h=function(e){return f.a.post("http://localhost:3001/api/persons",e).then(function(e){return e.data})},p=function(e){var t="http://localhost:3001/api/persons/".concat(e);return f.a.delete(t).then(function(e){return e.data})},v=function(e,t,n){var a="http://localhost:3001/api/persons/".concat(e);return console.log("nyt ollaan Axios-funktiossa"),console.log("id: ",e," nimi: ",t," uusi numero: ",n),f.a.put(a,{name:t,number:n,id:e}).then(function(e){return e.data})},k=function(){var e=Object(o.useState)([]),t=Object(a.a)(e,2),n=t[0],i=t[1],u=Object(o.useState)(""),m=Object(a.a)(u,2),f=m[0],k=m[1],E=Object(o.useState)(""),j=Object(a.a)(E,2),b=j[0],g=j[1],O=Object(o.useState)(""),w=Object(a.a)(O,2),y=w[0],S=w[1],C=Object(o.useState)(null),P=Object(a.a)(C,2),T=P[0],x=P[1];Object(o.useEffect)(function(){d().then(function(e){return i(e)})},[]);return r.a.createElement("div",null,r.a.createElement(function(e){var t=e.viesti;return null===t?null:r.a.createElement("div",{style:{color:"green",borderStyle:"solid",background:"lightgrey",borderRadius:5,marginBottom:10,padding:10}},t)},{viesti:T}),r.a.createElement("h2",null,"Puhelinluettelo"),r.a.createElement(c,{arvo:y,kasittelija:function(e){S(e.target.value)}}),r.a.createElement("h2",null,"Lis\xe4\xe4 uusi"),r.a.createElement(l,{klikkauskasittelija:function(e){if(e.preventDefault(),n.map(function(e){return e.name}).includes(f)){if(window.confirm("Nimi on jo luettelossa, korvataanko numero?")){var t=n.find(function(e){return e.name===f}).id;v(t,f,b).then(function(e){return i(n.map(function(t){return t.id===e.id?e:t}))}).then(x("K\xe4ytt\xe4j\xe4n ".concat(f," numero muutettu"))).then(k("")).then(g("")).catch(function(e){x("Ei onnistu, nime\xe4 ei en\xe4\xe4 ole luettelossa")}),setTimeout(function(){x(null)},3e3)}}else h({name:f,number:b}).then(function(e){return i(n.concat(e))}).then(x("".concat(f," lis\xe4tty"))).then(k("")).then(g("")).catch(function(e){x("Virhe: nimen pit\xe4\xe4 olla v\xe4hint\xe4\xe4n 3 merkki\xe4, numeron 8.")}),setTimeout(function(){x(null)},3e3)},nimiarvo:f,nimikasittelija:function(e){k(e.target.value)},numeroarvo:b,numerokasittelija:function(e){g(e.target.value)}}),r.a.createElement("h2",null,"Numerot"),r.a.createElement(s,{persons:n,suodatin:y,kasittelija:function(e){window.confirm("Poistetaanko henkil\xf6 luettelosta?")&&p(e).then(function(t){return i(n.filter(function(t){return t.id!==e}))}).then(x("Poistettu")),setTimeout(function(){x(null)},3e3)}}))};t.default=k;u.a.render(r.a.createElement(k,null),document.getElementById("root"))}},[[12,1,2]]]);
//# sourceMappingURL=main.70be1050.chunk.js.map