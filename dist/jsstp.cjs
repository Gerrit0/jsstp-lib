var t="local",e="external",s=t=>t.toLowerCase(),r=(t,e)=>{var s=t.indexOf(e);return[t[E](0,s),t[E](s+e[O])]},i=t=>(e,s)=>{var r;if(!t.t||!t.t(e,s))return(r=l(s)instanceof String?t.i&&t.i(e,s):t.h&&t.h(e,s))!==h?r:t.u?t.u(e,s):(r=e[s])instanceof Function?r.bind(e):r};class n extends Function{constructor(t){return l.setPrototypeOf(t,new.target.prototype)}}var h,u=!!globalThis.window,a=t=>"http://localhost:"+(t??9801),o=u?location.origin:a(process.env.PORT),_=/^\w+:\/\/localhost/.test(o)?t:e,l=Object,c=Proxy,g=l.assign,f="\r\n",d="Get_Supported_Events",p="Has_Event",v=s(d),w=s(p),m="get_simple_caller_of_event",y="trivial_clone",S="default_info",b="default_security_level",x="sstp_version_table",E="substring",O="length",T="available",k="split",P="entries",C="costom_text_send",F="forEach",N="get_caller_of_method",$="unknown_lines",j="get_caller_of_event",q="sendername",G="proxy",I="then",M="SEND",U="get_fmo_infos",J="get_passthrough",R="",A="X-SSTP-PassThru-";class D{get keys(){return l.keys(this)}get values(){return l.values(this)}get[P](){return l[P](this)}get[O](){return this.keys[O]}[F](t){this[P][F](([e,s])=>{this[e]=t(s,e)??s})}get[y](){return g(H(),this)}flat_map(t){let e=[];return this[P].map(([s,r])=>e.push(...r instanceof D?r.flat_map(t.bind(t,s)):[t(s,r)])),e}map(t){return this[P].map(([e,s])=>t(s,e))}push(t){return t[F](t=>t?this[t[0]]=t[1]:h),this}}var H=()=>new D;class V extends D{#t;#e;constructor(t,e,s={}){super(),this.#t=R+t,s[O]&&(this.#e=s),g(this,e)}get[$](){return this.#e||[]}get head(){return this.#t}toString(){return[this.#t,...this[$],...this[P].map(([t,e])=>t+": "+e),R,R].join(f)}to_string(){return R+this}toJSON(){return{head:this.#t,[$]:this.#e,body:this[y]}}get status_code(){return+this.#t[k](" ").find(t=>{return(t=+t)==t})}}class Y extends V{constructor(t,e,s={}){return super(t,e,s),new c(this,{get:i({i:(t,e)=>A+e in t?t[J](e):h})})}static from_string(t){let e,[s,...i]=t[k](f),n={},h=[];i[O]-=2;for(let t of i){let[s,i]=r(t,": ");/^\w[^\s]*$/.test(s)?n[e=s]=i:e?n[e]+=f+t:h.push(t)}return new Y(s,n,h)}[J](t){return this[A+t]}#s;get passthroughs(){return this.#s??=H().push(this.map((t,e)=>e.startsWith(A)?[e.slice(16),t]:h))}get raw(){return this}}class z extends V{constructor(t){var[t,...s]=t[k](f);super(t,{});for(let t of s)if(t){let[e,s]=r(t,""),[i,n]=r(e,".");(this[i]||=H())[n]=s}}get_uuid_by(t,e){return this.uuids.find(s=>this[s][t]==e)}get_list_of(t){return this.uuids.map(e=>this[e][t])}get uuids(){return this.keys}get[T](){return!!this[O]}toString(){return[this.head,R,...this.flat_map((t,e,s)=>t+"."+e+""+s),R,R].join(f)}toJSON(){return{head:this.head,fmo_infos:this[y]}}}class B extends n{#r;#i;#n;#h;#u;constructor(t){super((t,e=this[b])=>this.check_event(t,e)),this.#r=t,this[b]=t[b]}async check_event(t,e=this[b]){return this.#n?this.#h[e].includes(t):!!this.#i&&(this.#u[e][t]??=await this.#r[w](t))}get[T](){return this.#i}get fast_query_available(){return this.#n}reset(){return this.clear(),this.init()}async init(){var t=this.#r;return this.#i=await t[w](p),this.#n=this.#i&&await t[w](d),this.#n&&(this.#h=await t[v]()),this}clear(){this.#i=this.#n=!1,this.#u={local:{},external:{}}}}class K{#o;constructor(t,e){return this.RequestHeader={Origin:o},this[S]={Charset:"UTF-8"},this.host=e,this[q]=t,this[x]={[M]:1.4,NOTIFY:1.1,COMMUNICATE:1.1,EXECUTE:1.2,GIVE:1.1},this[b]=_,this[G]=new c(this,{get:i({i:(t,e)=>e in t[x]?t[N](e):/^On/.test(e)?t[m]((t=>"_"==t[2]?t[E](3):t)(e)):h})})}set host(t){this.#o=t||a()+"/api/sstp/v1"}get host(){return this.#o}set[q](t){this[S].Sender=t||"jsstp-client"}get[q](){return this[S].Sender}row_send(t){return new Promise((e,s)=>{return fetch(this.#o,{method:"POST",headers:this.RequestHeader,body:R+t})[I](t=>200!=t.status?s(t.status):t.text()[I](e),s)})}[C](t,e){return this.row_send(new Y(t,{...this[S],...e}))}costom_send(t,e){return this[C](t,e)[I](t=>Y.from_string(t))}[N](t){let e=t+" SSTP/"+this[x][t];return g(t=>this.costom_send(e,t),{get_raw:t=>this[C](e,t)})}#a(t,e,s,r){return new c(s,{get:(s,i)=>i in s?s[i]:this[r](t+"."+i,e)})}[j](t,e=M){return this.#a(t,e,s=>this[G][e](g({Event:t},s)),j)}[m](t,e=M){return this.#a(t,e,(...s)=>{let r=0,i={};return s[F](t=>i["Reference"+r++]=t),this[j](t,e)(i)},m)}get event(){return new c({},{get:(t,e)=>this[m](e)})}[w](t,e=this[b]){return this.event[p](t,e)[I](({Result:t})=>1==t)}[v](){return this.event[d]()[I](({local:s,external:r})=>({local:(s||R)[k](","),external:(r||R)[k](",")}))}[U](){return this[G].EXECUTE.get_raw({Command:"GetFMO"})[I](t=>new z(t))}[T](){return this[U]()[I](t=>t[T],()=>!1)}[I](t,e){return this[T]()[I](s=>s?t(this):e(),e)}new_event_queryer(){return new B(this).init()}}g(K.prototype,{type:K,base_sstp_info_t:V,sstp_info_t:Y,fmo_info_t:z,ghost_events_queryer_t:B});module.exports=new K
