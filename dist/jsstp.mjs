var i,o=(t,s)=>{var e=t.indexOf(s);return[t[p](0,e),t[p](e+s[v])]},M=r=>(t,s)=>{var e;if(!r.t||!r.t(t,s))return(e=n(s)instanceof String?r.i&&r.i(t,s):r.h&&r.h(t,s))!==i?e:r.u?r.u(t,s):(e=t[s])instanceof Function?e.bind(t):e},t=!!globalThis.window,U=t=>"http://localhost:"+(t??9801),D=t?location.origin:U(process.env.PORT),J=/^\w+:\/\/localhost/.test(D)?T:x,n=Object,r=Proxy,h=n.assign,_="\r\n",s="Get_Supported_Events",e="Has_Event",R=(t=t=>t.toLowerCase())(s),u=t(e),a="get_simple_caller_of_event",l="trivial_clone",c="default_info",g="default_security_level",f="sstp_version_table",p="substring",v="length",d="available",w="split",m="entries",y="costom_text_send",S="forEach",X="get_caller_of_method",A="unknown_lines",H="get_caller_of_event",b="sendername",E="proxy",O="then",T="local",x="external",N="";class P{get keys(){return n.keys(this)}get values(){return n.values(this)}get[m](){return n[m](this)}get[v](){return this.keys[v]}[S](e){return this[m][S](([t,s])=>{this[t]=e(s,t)??s})}get[l](){return h(C(),this)}flat_map(e){let r=[];return this[m].map(([t,s])=>r.push(...s instanceof P?s.flat_map(e.bind(e,t)):[e(t,s)])),r}map(e){return this[m].map(([t,s])=>e(s,t))}push(t){return t[S](t=>t?this[t[0]]=t[1]:i),this}}var C=()=>new P;class j extends P{#t;#h;constructor(t,s,e={}){super(),this.#t=N+t,e[v]&&(this.#h=e),h(this,s)}get[A](){return this.#h||[]}get head(){return this.#t}toString(){return[this.#t,...this[A],...this[m].map(([t,s])=>t+": "+s),N,N].join(_)}to_string(){return N+this}toJSON(){return{head:this.#t,unknown_lines:this.#h,body:this[l]}}get status_code(){return+this.#t[w](" ").find(t=>(t=+t)==t)}}var k="X-SSTP-PassThru-";class q extends j{constructor(t,s,e={}){return super(t,s,e),new r(this,{get:M({i:(t,s)=>k+s in t?t.get_passthrough(s):i})})}static from_string(t){let s,[e,...r]=t[w](_),i={},n=[];r[v]-=2;for(var h of r){var[u,a]=o(h,": ");/^\w[^\s]*$/.test(u)?i[s=u]=a:s?i[s]+=_+h:n.push(h)}return new q(e,i,n)}get_passthrough(t){return this[k+t]}#u;get passthroughs(){return this.#u??=C().push(this.map((t,s)=>s.startsWith(k)?[s.slice(16),t]:i))}get raw(){return this}}class F extends j{constructor(t){var s,e,r,i,[t,...n]=t[w](_);super(t,{});for(s of n)s&&([r,e]=o(s,""),[r,i]=o(r,"."),(this[r]||=C())[i]=e)}get_uuid_by(s,e){return this.uuids.find(t=>this[t][s]==e)}get_list_of(s){return this.uuids.map(t=>this[t][s])}get uuids(){return this.keys}get[d](){return!!this[v]}toString(){return[this.head,N,...this.flat_map((t,s,e)=>t+"."+s+""+e),N,N].join(_)}toJSON(){return{head:this.head,fmo_infos:this[l]}}}class G{#o;#_;#l;#g;#p;constructor(t){this.#o=t,this[g]=t[g]}async check_event(t,s=this[g]){return this.#l?this.#g[s].includes(t):!!this.#_&&(this.#p[s][t]??=await this.#o[u](t))}get[d](){return this.#_}get fast_query_available(){return this.#l}reset(){return this.clear(),this.init()}async init(){var t=this.#o;return this.#_=await t[u](e),this.#l=this.#_&&await t[u](s),this.#l&&(this.#g=await t[R]()),this}clear(){this.#_=this.#l=!1,this.#p={[T]:{},[x]:{}}}}var V="SEND";class I{#v;constructor(t,s){return this.RequestHeader={Origin:D},this[c]={Charset:"UTF-8"},this.host=s,this[b]=t,this[f]={SEND:1.4,NOTIFY:1.1,COMMUNICATE:1.1,EXECUTE:1.2,GIVE:1.1},this[g]=J,this[E]=new r(this,{get:M({i:(t,s)=>s in t[f]?t[X](s):/^On/.test(s)?t[a]("_"==(t=s)[2]?t[p](3):t):i})})}set host(t){this.#v=t||U()+"/api/sstp/v1"}get host(){return this.#v}set[b](t){this[c].Sender=t||"jsstp-client"}get[b](){return this[c].Sender}row_send(t){return new Promise((s,e)=>fetch(this.#v,{method:"POST",headers:this.RequestHeader,body:N+t})[O](t=>200!=t.status?e(t.status):t.text()[O](s)).catch(e))}[y](t,s){return this.row_send(new q(t,{...this[c],...s}))}costom_send(t,s){return this[y](t,s)[O](t=>q.from_string(t))}[X](t){let s=t+" SSTP/"+this[f][t];return h(t=>this.costom_send(s,t),{get_raw:t=>this[y](s,t)})}[H](s,e=V){return t=>this[E][e](h({Event:s},t))}[a](r,i=V){return(...t)=>{let s=0,e={};return t[S](t=>e["Reference"+s++]=t),this[H](r,i)(e)}}get event(){return new r({},{get:(t,s)=>this[a](s)})}[u](t,s=this[g]){return this.event[e](t,s)[O](({Result:t})=>1==t)}[R](){return this.event[s]()[O](({[T]:t,[x]:s})=>({[T]:(t||N)[w](","),[x]:(s||N)[w](",")}))}get_fmo_infos(){return this[E].EXECUTE.get_raw({Command:"GetFMO"})[O](t=>new F(t))}[d](){return this.get_fmo_infos()[O](t=>t[d]).catch(()=>!1)}new_event_queryer(){return new G(this).init()}}h(I.prototype,{type:I,base_sstp_info_t:j,sstp_info_t:q,fmo_info_t:F,ghost_events_queryer_t:G}),t=new I;export{j as base_sstp_info_t,t as default,F as fmo_info_t,G as ghost_events_queryer_t,t as jsstp,I as jsstp_t,q as sstp_info_t}
