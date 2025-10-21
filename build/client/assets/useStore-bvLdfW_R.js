import{R as r}from"./chunk-OIYGIGL5-HvHHtxvN.js";const u=t=>{let e;const s=new Set,a=(o,m)=>{const n=typeof o=="function"?o(e):o;if(!Object.is(n,e)){const h=e;e=m??(typeof n!="object"||n===null)?n:Object.assign({},e,n),s.forEach(y=>y(e,h))}},i=()=>e,g={setState:a,getState:i,getInitialState:()=>b,subscribe:o=>(s.add(o),()=>s.delete(o))},b=e=t(a,i,g);return g},E=(t=>t?u(t):u),I=t=>t;function f(t,e=I){const s=r.useSyncExternalStore(t.subscribe,r.useCallback(()=>e(t.getState()),[t,e]),r.useCallback(()=>e(t.getInitialState()),[t,e]));return r.useDebugValue(s),s}const S=t=>{const e=E(t),s=a=>f(e,a);return Object.assign(s,e),s},v=(t=>t?S(t):S),c="vibe-composer-api-key",l="vibe-composer-messages",d="vibe-composer-strudel-code",p=`// "coastline" @by eddyflux
// @version 1.0
samples('github:eddyflux/crate')
setcps(.75)
let chords = chord("<Bbm9 Fm9>/4").dict('ireal')
stack(
  stack( // DRUMS
    s("bd").struct("<[x*<1 2> [~@3 x]] x>"),
    s("~ [rim, sd:<2 3>]").room("<0 .2>"),
    n("[0 <1 3>]*<2!3 4>").s("hh"),
    s("rd:<1!3 2>*2").mask("<0 0 1 1>/16").gain(.5)
  ).bank('crate')
  .mask("<[0 1] 1 1 1>/16".early(.5))
  , // CHORDS
  chords.offset(-1).voicing().s("gm_epiano1:1")
  .phaser(4).room(.5)
  , // MELODY
  n("<0!3 1*2>").set(chords).mode("root:g2")
  .voicing().s("gm_acoustic_bass"),
  chords.n("[0 <4 3 <2 5>>*2](<3 5>,8)")
  .anchor("D5").voicing()
  .segment(4).clip(rand.range(.4,.8))
  .room(.75).shape(.3).delay(.25)
  .fm(sine.range(3,8).slow(8))
  .lpf(sine.range(500,1000).slow(8)).lpq(5)
  .rarely(ply("2")).chunk(4, fast(2))
  .gain(perlin.range(.6, .9))
  .mask("<0 1 1 0>/16")
)
.late("[0 .01]*4").late("[0 .01]*2").size(4)`,_=v(t=>({apiKey:null,messages:[],currentStrudelCode:p,activeTab:"repl",chatInput:"",isStreaming:!1,streamingContent:"",showingExamples:!1,setApiKey:e=>{localStorage.setItem(c,e),t({apiKey:e})},clearApiKey:()=>{localStorage.removeItem(c),t({apiKey:null})},addMessage:e=>{t(s=>{const a=[...s.messages,e];return localStorage.setItem(l,JSON.stringify(a)),{messages:a}})},clearMessages:()=>{localStorage.removeItem(l),t({messages:[]})},updateStrudelCode:e=>{localStorage.setItem(d,e),t({currentStrudelCode:e})},setActiveTab:e=>{t({activeTab:e})},setChatInput:e=>{t({chatInput:e})},setIsStreaming:e=>{t({isStreaming:e})},setStreamingContent:e=>{t({streamingContent:e})},setShowingExamples:e=>{t({showingExamples:e})},loadFromLocalStorage:()=>{const e=localStorage.getItem(c),s=localStorage.getItem(l),a=localStorage.getItem(d);t({apiKey:e||null,messages:s?JSON.parse(s):[],currentStrudelCode:a||p})}}));export{_ as u};
