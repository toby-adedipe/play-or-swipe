(this.webpackJsonpplayorswipe=this.webpackJsonpplayorswipe||[]).push([[0],{47:function(e,t,n){},66:function(e,t,n){},67:function(e,t,n){},71:function(e,t,n){},73:function(e,t,n){},76:function(e,t,n){},77:function(e,t,n){},78:function(e,t,n){},79:function(e,t,n){},80:function(e,t,n){},85:function(e,t,n){},86:function(e,t,n){},87:function(e,t,n){},88:function(e,t,n){"use strict";n.r(t);var a=n(3),c=n.n(a),s=n(41),r=n.n(s),i=(n(47),n(16)),o=n.n(i),l=n(19),j=n(9),u=n(17),d=n(8),b=n(22),p=n.n(b),h=(n(66),n(67),n(23)),O=n.n(h),m=(n(71),n(2)),x=function(e){var t=e.id,n=e.setShowModal,c=e.show,s=e.title,r=e.rating,i=e.year,u=e.genre,d=e.img,b=e.synopsis,h=e.ratingFrequency,x=c?" modal display-block":"modal display-none",g=Object(a.useState)(0),v=Object(j.a)(g,2),f=v[0],y=v[1],N="http://localhost:5000/api/v1/movies/".concat(t),w=function(){var e=Object(l.a)(o.a.mark((function e(){var t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=((h*r+f)/(h+1)).toFixed(2),e.next=3,p.a.put(N,{rating:t,ratingFrequency:h+1});case 3:n(!1);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(m.jsx)("div",{className:x,children:Object(m.jsxs)("div",{className:"modal-main",children:[Object(m.jsxs)("div",{className:"header-container",children:[Object(m.jsx)("ion-icon",{name:"close-outline",id:"close-btn",onClick:function(){return n(!1)}}),Object(m.jsx)("p",{className:"h3",children:"Rate this film"})]}),Object(m.jsxs)("div",{className:"movie-info",children:[Object(m.jsx)("img",{src:d,alt:s,className:"movieArt"}),Object(m.jsxs)("div",{className:"info-container",children:[Object(m.jsxs)("div",{className:"title-container",children:[Object(m.jsx)("p",{className:"movie-title",children:s}),Object(m.jsxs)("p",{className:"movie-genre",children:[u," | ",Object(m.jsx)("span",{children:i})]}),Object(m.jsx)("hr",{})]}),Object(m.jsxs)("div",{className:"synopsis-container",children:[Object(m.jsx)("p",{className:"synopsis-header",children:"Synopsis"}),Object(m.jsx)("p",{className:"synopsis-content",children:b})]})]})]}),Object(m.jsx)("hr",{className:"big-hr"}),Object(m.jsxs)("div",{className:"rating-container",children:[Object(m.jsx)(O.a,{name:"rate",starCount:5,value:f,renderStarIcon:function(){return Object(m.jsx)("ion-icon",{name:"star",id:"star-icon"})},starColor:"#EC1F41",onStarClick:function(e,t,n){y(e)}}),Object(m.jsx)("button",{onClick:w,className:"rate-btn",children:"Rate"})]})]})})},g=function(e){var t=e.id,n=e.img,c=e.title,s=e.rating,r=e.genre,i=e.year,o=e.synopsis,l=e.ratingFrequency,u=Object(a.useState)(!1),d=Object(j.a)(u,2),b=d[0],p=d[1];return Object(m.jsxs)("div",{className:"movieContainer",children:[Object(m.jsx)(x,{show:b,setShowModal:p,id:t,img:n,title:c,genre:r,year:i,synopsis:o,rating:s,ratingFrequency:l}),Object(m.jsxs)("div",{onClick:function(){return p(!0)},children:[Object(m.jsx)("img",{src:n,alt:c,className:"movieArt"}),Object(m.jsx)("p",{className:"title",children:c}),Object(m.jsxs)("div",{className:"ratingContainer",children:[Object(m.jsx)(O.a,{name:"rate",editing:!1,starCount:5,value:s,starColor:"#EC1F41"}),Object(m.jsx)("p",{className:"rating",children:s})]})]})]})},v=(n(73),function(e){var t=e.category,n=e.link,a=e.data;return Object(m.jsxs)("div",{children:[Object(m.jsxs)("div",{className:"categoryHeader",children:[Object(m.jsx)("p",{className:"categoryName",children:t}),Object(m.jsx)(u.b,{to:n,children:Object(m.jsx)("ion-icon",{name:"chevron-forward-outline",id:"arrow"})})]}),Object(m.jsx)("div",{className:"movies",children:a.slice(0,5).map((function(e){var t=e._id,n=e.title,a=e.rating,c=e.img,s=e.year,r=e.genre,i=e.synopsis,o=e.ratingFrequency;return Object(m.jsx)(g,{id:t,title:n,rating:a,img:c,year:s,genre:r,synopsis:i,ratingFrequency:o},t)}))})]})}),f=Object(a.createContext)(),y=(n(76),function(){Object(d.f)();var e=Object(a.useContext)(f),t=e.search,n=e.searchVal,c=e.setSearchVal,s=function(e){c(e),t(e)};return Object(m.jsx)("div",{className:"searchContainer",children:Object(m.jsx)("div",{children:Object(m.jsxs)("form",{id:"search",children:[Object(m.jsx)("input",{placeholder:"Search for a movie",value:n,onChange:function(e){return s(e.target.value)}}),Object(m.jsx)("ion-icon",{name:"search-outline",id:"searchIcon",onClick:s})]})})})}),N=(n(77),function(e){var t=e.data;return Object(m.jsxs)("div",{className:"search-results-page",children:[Object(m.jsx)("hr",{}),Object(m.jsxs)("div",{className:"search-container",children:[Object(m.jsx)("div",{className:"art-container",children:Object(m.jsx)("img",{src:t.img,alt:t.title,className:"search-results-image"})}),Object(m.jsxs)("div",{className:"search-movie-info",children:[Object(m.jsxs)("p",{className:"movie-title search-title",children:[t.title," (",t.year,")"]}),Object(m.jsx)("p",{className:"search-synopsis",children:t.synopsis}),Object(m.jsxs)("div",{className:"search-rating-container",children:[Object(m.jsx)(O.a,{name:"rate",editing:!1,starCount:5,value:t.rating,starColor:"#EC1F41"}),Object(m.jsx)("p",{className:"rating",children:t.rating})]})]})]})]})}),w=function(e){var t=e.results;return Object(m.jsx)("div",{children:t.length>0?t.map((function(e){return Object(m.jsx)(N,{data:e},e._id)})):null})};w.defaultProps={results:[]};var C=w,S=(n(78),function(){var e=Object(a.useContext)(f),t=e.searchVal,n=e.results;return console.log(n),Object(m.jsxs)("div",{className:"search-results",children:[Object(m.jsxs)("p",{children:['Showing search results for "',t,'" ']}),Object(m.jsx)(C,{results:n}),Object(m.jsx)("hr",{}),Object(m.jsx)(u.b,{to:"/add",children:Object(m.jsxs)("div",{className:"add-movie",children:[Object(m.jsx)("div",{className:"add-container",children:Object(m.jsx)("div",{children:Object(m.jsx)("ion-icon",{name:"add",id:"add"})})}),Object(m.jsx)("p",{children:"Can't find your movie? Be the first to rate it"})]})})]})}),F=function(){var e=Object(a.useContext)(f),t=e.popular,n=e.top,c=e.searchVal;return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(y,{}),null===t||null===n?Object(m.jsx)("p",{children:"Fetching Data..."}):c.length>0?Object(m.jsx)(S,{}):Object(m.jsxs)("div",{className:"home-page",children:[Object(m.jsx)(v,{category:"Top Rated Movies",link:"/top-rated",data:n}),Object(m.jsx)(v,{category:"Popular Movies",link:"/popular",data:t})]})]})},k=(n(79),function(){var e=Object(a.useContext)(f),t=e.top,n=e.searchVal;return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(y,{}),n.length>0?Object(m.jsx)(S,{}):Object(m.jsxs)("div",{className:"top-rated-page",children:[Object(m.jsx)("p",{className:"top-rated-h1",children:"Top Rated Movies"}),t?Object(m.jsx)("div",{className:"top-rated-movies",children:t.map((function(e){var t=e._id,n=e.genre,a=e.rating,c=e.synopsis,s=e.title,r=e.year,i=e.img,o=e.ratingFrequency;return Object(m.jsx)(g,{id:t,genre:n,title:s,rating:a,synopsis:c,year:r,img:i,ratingFrequency:o},t)}))}):Object(m.jsx)("p",{children:"Fetching movies..."})]})]})}),q=(n(80),function(){var e=Object(a.useContext)(f),t=e.popular,n=e.searchVal;return Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(y,{}),n.length>0?Object(m.jsx)(S,{}):Object(m.jsxs)("div",{className:"popular-page",children:[Object(m.jsx)("p",{className:"popular-h1",children:"Popular Movies"}),t?Object(m.jsx)("div",{className:"popular-movies",children:t.map((function(e){var t=e._id,n=e.genre,a=e.rating,c=e.synopsis,s=e.title,r=e.year,i=e.img,o=e.ratingFrequency;return Object(m.jsx)(g,{id:t,genre:n,title:s,rating:a,synopsis:c,year:r,img:i,ratingFrequency:o},t)}))}):Object(m.jsx)("p",{children:"Fetching movies..."})]})]})}),M=function(){return Object(m.jsx)("div",{children:Object(m.jsx)("p",{children:"Page not found"})})},I=n(25);n(84);I.a.initializeApp({apiKey:"AIzaSyAfiZOPSteqeN6TUN05Y7ls77ftgWB7sBw",authDomain:"play-or-swipe.firebaseapp.com",databaseURL:"https://play-or-swipe-default-rtdb.firebaseio.com",projectId:"play-or-swipe",storageBucket:"play-or-swipe.appspot.com",messagingSenderId:"783080469952",appId:"1:783080469952:web:9d7e31620827e1c17fc425"});var P=I.a.storage(),A=(n(85),function(){var e=Object(a.useState)(null),t=Object(j.a)(e,2),n=t[0],c=t[1],s=Object(a.useState)(""),r=Object(j.a)(s,2),i=r[0],u=r[1],d=Object(a.useState)(""),b=Object(j.a)(d,2),h=b[0],O=b[1],x=Object(a.useState)(""),g=Object(j.a)(x,2),v=g[0],f=g[1],y=Object(a.useState)(""),N=Object(j.a)(y,2),w=N[0],C=N[1],S=Object(a.useState)(null),F=Object(j.a)(S,2),k=F[0],q=F[1],M=Object(a.useState)(null),I=Object(j.a)(M,2),A=I[0],R=I[1],V=Object(a.useState)(!1),B=Object(j.a)(V,2),L=B[0],D=B[1];return Object(m.jsx)("div",{className:"add-page",children:A?Object(m.jsx)("p",{children:"Uploading Information..."}):Object(m.jsxs)("div",{className:"add-form",children:[k?Object(m.jsx)("p",{className:"error",children:k}):null,L?Object(m.jsx)("p",{className:"success",children:L}):null,Object(m.jsx)("h3",{children:"Add a movie"}),Object(m.jsxs)("div",{className:"title-group",children:[Object(m.jsxs)("div",{className:"form-group title-container",children:[Object(m.jsx)("label",{children:"Name of Movie"}),Object(m.jsx)("input",{type:"text",onChange:function(e){return t=e.target.value,u(t),q(null),void D(null);var t},value:i,className:"title-input"})]}),Object(m.jsxs)("div",{className:"form-group year-container",children:[Object(m.jsx)("label",{children:"Release Date"}),Object(m.jsx)("input",{type:"text",onChange:function(e){return O(e.target.value)},value:h,className:"year-input"})]})]}),Object(m.jsxs)("div",{className:"form-group genre-container",children:[Object(m.jsx)("label",{children:"Genre"}),Object(m.jsx)("input",{type:"text",onChange:function(e){return f(e.target.value)},value:v,className:"genre-input"})]}),Object(m.jsxs)("div",{className:"form-group",children:[Object(m.jsx)("label",{children:"Synopsis"}),Object(m.jsx)("textarea",{onChange:function(e){return C(e.target.value)},value:w,rows:"4",column:"50"})]}),Object(m.jsxs)("div",{className:"image-file",children:[Object(m.jsx)("label",{children:"Upload Image"}),Object(m.jsx)("input",{type:"file",onChange:function(e){e.target.files[0]&&c(e.target.files[0])}})]}),Object(m.jsx)("button",{onClick:function(){if(R(!0),i<1)q("Add a movie title"),R(!1);else if(n){P.ref("images/".concat(n.name)).put(n).on("state_changed",(function(e){}),(function(e){console.log(e)}),(function(){P.ref("images").child(n.name).getDownloadURL().then(function(){var e=Object(l.a)(o.a.mark((function e(t){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(function(){var e=Object(l.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a.post("https://play-or-swipe.herokuapp.com/api/v1/movies",{title:i,year:h,genre:v,synopsis:w,img:t,rating:5,ratingFrequency:0});case 2:200===e.sent.status&&(c(null),u(""),O(""),f(""),C(""),q(null),D("Movie was successfully uploaded!!!"),R(!1));case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()();case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())}))}else q("Forgot to add an image?"),R(!1)},className:"submit-btn",children:"submit"})]})})}),R=(n(86),function(){return Object(m.jsxs)("header",{style:{backgroundImage:"url(/HeaderBG.png)",width:"100%",backgroundRepeat:"no-repeat",backgroundSize:"cover"},className:"header",children:[Object(m.jsx)(u.b,{to:"/",children:Object(m.jsx)("p",{id:"logo",children:"Play or swipe"})}),Object(m.jsx)("p",{id:"desc",children:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"})]})}),V=(n(87),function(){return Object(m.jsx)("div",{id:"footer",children:Object(m.jsx)("p",{children:"2021 \xa9 PlayorSwipe. All rights reserved."})})});var B=function(){var e=Object(a.useState)(!1),t=Object(j.a)(e,2),n=t[0],c=t[1],s=Object(a.useState)([]),r=Object(j.a)(s,2),i=r[0],b=r[1],h=Object(a.useState)(null),O=Object(j.a)(h,2),x=O[0],g=O[1],v=Object(a.useState)(null),y=Object(j.a)(v,2),N=y[0],w=y[1],C=Object(a.useState)([]),I=Object(j.a)(C,2),P=I[0],B=I[1],L=Object(a.useState)(""),D=Object(j.a)(L,2),E=D[0],T=D[1],U=function(){var e=Object(l.a)(o.a.mark((function e(){var t,n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.a.get("".concat("https://play-or-swipe.herokuapp.com/api/v1","/movies"));case 2:t=e.sent,n=_(t.data.data),b(t.data.data),g(n),w(n);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),_=function(e){return e.filter((function(e){return e.rating>4}))},z=function(e){var t;t=e.length>0?i.filter((function(t){return t.title.toLowerCase().includes(e.toLowerCase())})):[],B(t)};Object(a.useEffect)((function(){U()}),[]);var G=Object(a.useMemo)((function(){return{showModal:n,setShowModal:c,popular:x,top:N,searchVal:E,setSearchVal:T,search:z,results:P}}));return Object(m.jsx)(f.Provider,{value:G,children:Object(m.jsxs)(u.a,{children:[Object(m.jsx)(R,{}),Object(m.jsxs)(d.c,{children:[Object(m.jsx)(d.a,{exact:!0,path:"/",component:F}),Object(m.jsx)(d.a,{exact:!0,path:"/top-rated",component:k}),Object(m.jsx)(d.a,{exact:!0,path:"/popular",component:q}),Object(m.jsx)(d.a,{exact:!0,path:"/add",component:A}),Object(m.jsx)(d.a,{exact:!0,path:"/search",component:S}),Object(m.jsx)(d.a,{component:M})]}),Object(m.jsx)(V,{})]})})},L=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,89)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,s=t.getLCP,r=t.getTTFB;n(e),a(e),c(e),s(e),r(e)}))};r.a.render(Object(m.jsx)(c.a.StrictMode,{children:Object(m.jsx)(B,{})}),document.getElementById("root")),L()}},[[88,1,2]]]);
//# sourceMappingURL=main.f621d7b8.chunk.js.map