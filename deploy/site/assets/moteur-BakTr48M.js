import{G as jr,P as Jn,R as Sn}from"./HeaventCityPage-YclSeRYD.js";import"./index-CsyvbVMM.js";import"./react-CEfzfvak.js";import"./supabase-BLuESGw6.js";import"./ui-BjHG5pS_.js";import"./logo-heavent-or-B4tRtY98.js";import"./logo-nawar-CoKiAGys.js";/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ca="169",Oo=1,Fo=2,gn=3,Ln=0,It=1,Ls=2,Wn=100,Pa=204,La=205,Bo=0,bl=1,Tl=2,Pn=0,wl=1,Al=2,Rl=3,zo=4,Cl=5,Pl=6,Ll=7,Ho=300,xi=301,Mi=302,Da=303,Ua=304,zr=306,Wi=1e3,Xi=1001,Ia=1002,Xt=1003,Dl=1004,Qi=1005,ln=1006,qr=1007,mi=1008,_n=1009,Go=1010,Vo=1011,ji=1012,ds=1013,jn=1014,cn=1015,Ki=1016,ps=1017,fs=1018,Si=1020,ko=35902,Wo=1021,Xo=1022,nn=1023,jo=1024,qo=1025,qi=1026,yi=1027,ms=1028,gs=1029,Yo=1030,_s=1031,vs=1033,Er=33776,br=33777,Tr=33778,wr=33779,Na=35840,Oa=35841,Fa=35842,Ba=35843,za=36196,Ha=37492,Ga=37496,Va=37808,ka=37809,Wa=37810,Xa=37811,ja=37812,qa=37813,Ya=37814,Ka=37815,Za=37816,Ja=37817,$a=37818,Qa=37819,es=37820,ts=37821,Ar=36492,ns=36494,is=36495,Ko=36283,rs=36284,as=36285,ss=36286,pi="",Vt="srgb",Un="srgb-linear",xs="display-p3",Hr="display-p3-linear",Lr="linear",ot="srgb",Dr="rec709",Ur="p3",$n=7680,Zo=515,Ds=35044,Us="300 es",Ei=2e3,Ir=2001;class Ti{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const n=this._listeners[e];if(n!==void 0){const r=n.indexOf(t);r!==-1&&n.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const t=this._listeners[e.type];if(t!==void 0){e.target=this;const n=t.slice(0);for(let r=0,a=n.length;r<a;r++)n[r].call(this,e);e.target=null}}}const Tt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Yr=Math.PI/180,os=180/Math.PI;function Zi(){const i=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(Tt[255&i]+Tt[i>>8&255]+Tt[i>>16&255]+Tt[i>>24&255]+"-"+Tt[255&e]+Tt[e>>8&255]+"-"+Tt[e>>16&15|64]+Tt[e>>24&255]+"-"+Tt[63&t|128]+Tt[t>>8&255]+"-"+Tt[t>>16&255]+Tt[t>>24&255]+Tt[255&n]+Tt[n>>8&255]+Tt[n>>16&255]+Tt[n>>24&255]).toLowerCase()}function Ut(i,e,t){return Math.max(e,Math.min(t,i))}function Ul(i,e){return(i%e+e)%e}function Kr(i,e,t){return(1-t)*i+t*e}function Li(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Dt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(4294967295*i);case Uint16Array:return Math.round(65535*i);case Uint8Array:return Math.round(255*i);case Int32Array:return Math.round(2147483647*i);case Int16Array:return Math.round(32767*i);case Int8Array:return Math.round(127*i);default:throw new Error("Invalid component type.")}}class ke{constructor(e=0,t=0){ke.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ut(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),a=this.x-e.x,o=this.y-e.y;return this.x=a*n-o*r+e.x,this.y=a*r+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class qe{constructor(e,t,n,r,a,o,l,s,c){qe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,a,o,l,s,c)}set(e,t,n,r,a,o,l,s,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=l,u[3]=t,u[4]=a,u[5]=s,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,a=this.elements,o=n[0],l=n[3],s=n[6],c=n[1],u=n[4],d=n[7],h=n[2],p=n[5],m=n[8],v=r[0],g=r[3],f=r[6],x=r[1],_=r[4],y=r[7],C=r[2],A=r[5],L=r[8];return a[0]=o*v+l*x+s*C,a[3]=o*g+l*_+s*A,a[6]=o*f+l*y+s*L,a[1]=c*v+u*x+d*C,a[4]=c*g+u*_+d*A,a[7]=c*f+u*y+d*L,a[2]=h*v+p*x+m*C,a[5]=h*g+p*_+m*A,a[8]=h*f+p*y+m*L,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],a=e[3],o=e[4],l=e[5],s=e[6],c=e[7],u=e[8];return t*o*u-t*l*c-n*a*u+n*l*s+r*a*c-r*o*s}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],a=e[3],o=e[4],l=e[5],s=e[6],c=e[7],u=e[8],d=u*o-l*c,h=l*s-u*a,p=c*a-o*s,m=t*d+n*h+r*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/m;return e[0]=d*v,e[1]=(r*c-u*n)*v,e[2]=(l*n-r*o)*v,e[3]=h*v,e[4]=(u*t-r*s)*v,e[5]=(r*a-l*t)*v,e[6]=p*v,e[7]=(n*s-c*t)*v,e[8]=(o*t-n*a)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,a,o,l){const s=Math.cos(a),c=Math.sin(a);return this.set(n*s,n*c,-n*(s*o+c*l)+o+e,-r*c,r*s,-r*(-c*o+s*l)+l+t,0,0,1),this}scale(e,t){return this.premultiply(Zr.makeScale(e,t)),this}rotate(e){return this.premultiply(Zr.makeRotation(-e)),this}translate(e,t){return this.premultiply(Zr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Zr=new qe;function Jo(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Nr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Il(){const i=Nr("canvas");return i.style.display="block",i}const Is={};function Rr(i){i in Is||(Is[i]=!0,console.warn(i))}const Ns=new qe().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Os=new qe().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Di={[Un]:{transfer:Lr,primaries:Dr,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i,fromReference:i=>i},[Vt]:{transfer:ot,primaries:Dr,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Hr]:{transfer:Lr,primaries:Ur,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.applyMatrix3(Os),fromReference:i=>i.applyMatrix3(Ns)},[xs]:{transfer:ot,primaries:Ur,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.convertSRGBToLinear().applyMatrix3(Os),fromReference:i=>i.applyMatrix3(Ns).convertLinearToSRGB()}},Nl=new Set([Un,Hr]),nt={enabled:!0,_workingColorSpace:Un,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Nl.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=Di[e].toReference;return(0,Di[t].fromReference)(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return Di[i].primaries},getTransfer:function(i){return i===pi?Lr:Di[i].transfer},getLuminanceCoefficients:function(i,e=this._workingColorSpace){return i.fromArray(Di[e].luminanceCoefficients)}};function _i(i){return i<.04045?.0773993808*i:Math.pow(.9478672986*i+.0521327014,2.4)}function Jr(i){return i<.0031308?12.92*i:1.055*Math.pow(i,.41666)-.055}let Qn;class Ol{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Qn===void 0&&(Qn=Nr("canvas")),Qn.width=e.width,Qn.height=e.height;const n=Qn.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Qn}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Nr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),a=r.data;for(let o=0;o<a.length;o++)a[o]=255*_i(a[o]/255);return n.putImageData(r,0,0),t}if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(255*_i(t[n]/255)):t[n]=_i(t[n]);return{data:t,width:e.width,height:e.height}}return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Fl=0;class $o{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Fl++}),this.uuid=Zi(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let o=0,l=r.length;o<l;o++)r[o].isDataTexture?a.push($r(r[o].image)):a.push($r(r[o]))}else a=$r(r);n.url=a}return t||(e.images[this.uuid]=n),n}}function $r(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ol.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Bl=0;class At extends Ti{constructor(e=At.DEFAULT_IMAGE,t=At.DEFAULT_MAPPING,n=1001,r=1001,a=1006,o=1008,l=nn,s=_n,c=At.DEFAULT_ANISOTROPY,u=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Bl++}),this.uuid=Zi(),this.name="",this.source=new $o(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=a,this.minFilter=o,this.anisotropy=c,this.format=l,this.internalFormat=null,this.type=s,this.offset=new ke(0,0),this.repeat=new ke(1,1),this.center=new ke(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ho)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Wi:e.x=e.x-Math.floor(e.x);break;case Xi:e.x=e.x<0?0:1;break;case Ia:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case Wi:e.y=e.y-Math.floor(e.y);break;case Xi:e.y=e.y<0?0:1;break;case Ia:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}At.DEFAULT_IMAGE=null,At.DEFAULT_MAPPING=Ho,At.DEFAULT_ANISOTROPY=1;class it{constructor(e=0,t=0,n=0,r=1){it.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,a=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r+o[12]*a,this.y=o[1]*t+o[5]*n+o[9]*r+o[13]*a,this.z=o[2]*t+o[6]*n+o[10]*r+o[14]*a,this.w=o[3]*t+o[7]*n+o[11]*r+o[15]*a,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,a;const s=e.elements,c=s[0],u=s[4],d=s[8],h=s[1],p=s[5],m=s[9],v=s[2],g=s[6],f=s[10];if(Math.abs(u-h)<.01&&Math.abs(d-v)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+v)<.1&&Math.abs(m+g)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const _=(c+1)/2,y=(p+1)/2,C=(f+1)/2,A=(u+h)/4,L=(d+v)/4,Y=(m+g)/4;return _>y&&_>C?_<.01?(n=0,r=.707106781,a=.707106781):(n=Math.sqrt(_),r=A/n,a=L/n):y>C?y<.01?(n=.707106781,r=0,a=.707106781):(r=Math.sqrt(y),n=A/r,a=Y/r):C<.01?(n=.707106781,r=.707106781,a=0):(a=Math.sqrt(C),n=L/a,r=Y/a),this.set(n,r,a,t),this}let x=Math.sqrt((g-m)*(g-m)+(d-v)*(d-v)+(h-u)*(h-u));return Math.abs(x)<.001&&(x=1),this.x=(g-m)/x,this.y=(d-v)/x,this.z=(h-u)/x,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class zl extends Ti{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new it(0,0,e,t),this.scissorTest=!1,this.viewport=new it(0,0,e,t);const r={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:ln,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const a=new At(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);a.flipY=!1,a.generateMipmaps=n.generateMipmaps,a.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let l=0;l<o;l++)this.textures[l]=a.clone(),this.textures[l].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,r=e.textures.length;n<r;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new $o(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class qn extends zl{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Qo extends At{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Xt,this.minFilter=Xt,this.wrapR=Xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Hl extends At{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Xt,this.minFilter=Xt,this.wrapR=Xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class rn{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,a,o,l){let s=n[r+0],c=n[r+1],u=n[r+2],d=n[r+3];const h=a[o+0],p=a[o+1],m=a[o+2],v=a[o+3];if(l===0)return e[t+0]=s,e[t+1]=c,e[t+2]=u,void(e[t+3]=d);if(l===1)return e[t+0]=h,e[t+1]=p,e[t+2]=m,void(e[t+3]=v);if(d!==v||s!==h||c!==p||u!==m){let g=1-l;const f=s*h+c*p+u*m+d*v,x=f>=0?1:-1,_=1-f*f;if(_>Number.EPSILON){const C=Math.sqrt(_),A=Math.atan2(C,f*x);g=Math.sin(g*A)/C,l=Math.sin(l*A)/C}const y=l*x;if(s=s*g+h*y,c=c*g+p*y,u=u*g+m*y,d=d*g+v*y,g===1-l){const C=1/Math.sqrt(s*s+c*c+u*u+d*d);s*=C,c*=C,u*=C,d*=C}}e[t]=s,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,r,a,o){const l=n[r],s=n[r+1],c=n[r+2],u=n[r+3],d=a[o],h=a[o+1],p=a[o+2],m=a[o+3];return e[t]=l*m+u*d+s*p-c*h,e[t+1]=s*m+u*h+c*d-l*p,e[t+2]=c*m+u*p+l*h-s*d,e[t+3]=u*m-l*d-s*h-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,a=e._z,o=e._order,l=Math.cos,s=Math.sin,c=l(n/2),u=l(r/2),d=l(a/2),h=s(n/2),p=s(r/2),m=s(a/2);switch(o){case"XYZ":this._x=h*u*d+c*p*m,this._y=c*p*d-h*u*m,this._z=c*u*m+h*p*d,this._w=c*u*d-h*p*m;break;case"YXZ":this._x=h*u*d+c*p*m,this._y=c*p*d-h*u*m,this._z=c*u*m-h*p*d,this._w=c*u*d+h*p*m;break;case"ZXY":this._x=h*u*d-c*p*m,this._y=c*p*d+h*u*m,this._z=c*u*m+h*p*d,this._w=c*u*d-h*p*m;break;case"ZYX":this._x=h*u*d-c*p*m,this._y=c*p*d+h*u*m,this._z=c*u*m-h*p*d,this._w=c*u*d+h*p*m;break;case"YZX":this._x=h*u*d+c*p*m,this._y=c*p*d+h*u*m,this._z=c*u*m-h*p*d,this._w=c*u*d-h*p*m;break;case"XZY":this._x=h*u*d-c*p*m,this._y=c*p*d-h*u*m,this._z=c*u*m+h*p*d,this._w=c*u*d+h*p*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],a=t[8],o=t[1],l=t[5],s=t[9],c=t[2],u=t[6],d=t[10],h=n+l+d;if(h>0){const p=.5/Math.sqrt(h+1);this._w=.25/p,this._x=(u-s)*p,this._y=(a-c)*p,this._z=(o-r)*p}else if(n>l&&n>d){const p=2*Math.sqrt(1+n-l-d);this._w=(u-s)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(a+c)/p}else if(l>d){const p=2*Math.sqrt(1+l-n-d);this._w=(a-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(s+u)/p}else{const p=2*Math.sqrt(1+d-n-l);this._w=(o-r)/p,this._x=(a+c)/p,this._y=(s+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ut(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,a=e._z,o=e._w,l=t._x,s=t._y,c=t._z,u=t._w;return this._x=n*u+o*l+r*c-a*s,this._y=r*u+o*s+a*l-n*c,this._z=a*u+o*c+n*s-r*l,this._w=o*u-n*l-r*s-a*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,a=this._z,o=this._w;let l=o*e._w+n*e._x+r*e._y+a*e._z;if(l<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,l=-l):this.copy(e),l>=1)return this._w=o,this._x=n,this._y=r,this._z=a,this;const s=1-l*l;if(s<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*n+t*this._x,this._y=p*r+t*this._y,this._z=p*a+t*this._z,this.normalize(),this}const c=Math.sqrt(s),u=Math.atan2(c,l),d=Math.sin((1-t)*u)/c,h=Math.sin(t*u)/c;return this._w=o*d+this._w*h,this._x=n*d+this._x*h,this._y=r*d+this._y*h,this._z=a*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),a=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class T{constructor(e=0,t=0,n=0){T.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Fs.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Fs.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[3]*n+a[6]*r,this.y=a[1]*t+a[4]*n+a[7]*r,this.z=a[2]*t+a[5]*n+a[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,a=e.elements,o=1/(a[3]*t+a[7]*n+a[11]*r+a[15]);return this.x=(a[0]*t+a[4]*n+a[8]*r+a[12])*o,this.y=(a[1]*t+a[5]*n+a[9]*r+a[13])*o,this.z=(a[2]*t+a[6]*n+a[10]*r+a[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,a=e.x,o=e.y,l=e.z,s=e.w,c=2*(o*r-l*n),u=2*(l*t-a*r),d=2*(a*n-o*t);return this.x=t+s*c+o*d-l*u,this.y=n+s*u+l*c-a*d,this.z=r+s*d+a*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r,this.y=a[1]*t+a[5]*n+a[9]*r,this.z=a[2]*t+a[6]*n+a[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,a=e.z,o=t.x,l=t.y,s=t.z;return this.x=r*s-a*l,this.y=a*o-n*s,this.z=n*l-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Qr.copy(this).projectOnVector(e),this.sub(Qr)}reflect(e){return this.sub(Qr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ut(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=2*Math.random()-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Qr=new T,Fs=new rn;class vn{constructor(e=new T(1/0,1/0,1/0),t=new T(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Jt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Jt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Jt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const a=n.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let o=0,l=a.count;o<l;o++)e.isMesh===!0?e.getVertexPosition(o,Jt):Jt.fromBufferAttribute(a,o),Jt.applyMatrix4(e.matrixWorld),this.expandByPoint(Jt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),er.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),er.copy(n.boundingBox)),er.applyMatrix4(e.matrixWorld),this.union(er)}const r=e.children;for(let a=0,o=r.length;a<o;a++)this.expandByObject(r[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Jt),Jt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ui),tr.subVectors(this.max,Ui),ei.subVectors(e.a,Ui),ti.subVectors(e.b,Ui),ni.subVectors(e.c,Ui),yn.subVectors(ti,ei),En.subVectors(ni,ti),Fn.subVectors(ei,ni);let t=[0,-yn.z,yn.y,0,-En.z,En.y,0,-Fn.z,Fn.y,yn.z,0,-yn.x,En.z,0,-En.x,Fn.z,0,-Fn.x,-yn.y,yn.x,0,-En.y,En.x,0,-Fn.y,Fn.x,0];return!!ea(t,ei,ti,ni,tr)&&(t=[1,0,0,0,1,0,0,0,1],!!ea(t,ei,ti,ni,tr)&&(nr.crossVectors(yn,En),t=[nr.x,nr.y,nr.z],ea(t,ei,ti,ni,tr)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Jt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(Jt).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(un[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),un[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),un[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),un[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),un[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),un[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),un[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),un[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(un)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const un=[new T,new T,new T,new T,new T,new T,new T,new T],Jt=new T,er=new vn,ei=new T,ti=new T,ni=new T,yn=new T,En=new T,Fn=new T,Ui=new T,tr=new T,nr=new T,Bn=new T;function ea(i,e,t,n,r){for(let a=0,o=i.length-3;a<=o;a+=3){Bn.fromArray(i,a);const l=r.x*Math.abs(Bn.x)+r.y*Math.abs(Bn.y)+r.z*Math.abs(Bn.z),s=e.dot(Bn),c=t.dot(Bn),u=n.dot(Bn);if(Math.max(-Math.max(s,c,u),Math.min(s,c,u))>l)return!1}return!0}const Gl=new vn,Ii=new T,ta=new T;class xn{constructor(e=new T,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Gl.setFromPoints(e).getCenter(n);let r=0;for(let a=0,o=e.length;a<o;a++)r=Math.max(r,n.distanceToSquared(e[a]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ii.subVectors(e,this.center);const t=Ii.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=.5*(n-this.radius);this.center.addScaledVector(Ii,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ta.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ii.copy(e.center).add(ta)),this.expandByPoint(Ii.copy(e.center).sub(ta))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const hn=new T,na=new T,ir=new T,bn=new T,ia=new T,rr=new T,ra=new T;class Ji{constructor(e=new T,t=new T(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,hn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=hn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(hn.copy(this.origin).addScaledVector(this.direction,t),hn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){na.copy(e).add(t).multiplyScalar(.5),ir.copy(t).sub(e).normalize(),bn.copy(this.origin).sub(na);const a=.5*e.distanceTo(t),o=-this.direction.dot(ir),l=bn.dot(this.direction),s=-bn.dot(ir),c=bn.lengthSq(),u=Math.abs(1-o*o);let d,h,p,m;if(u>0)if(d=o*s-l,h=o*l-s,m=a*u,d>=0)if(h>=-m)if(h<=m){const v=1/u;d*=v,h*=v,p=d*(d+o*h+2*l)+h*(o*d+h+2*s)+c}else h=a,d=Math.max(0,-(o*h+l)),p=-d*d+h*(h+2*s)+c;else h=-a,d=Math.max(0,-(o*h+l)),p=-d*d+h*(h+2*s)+c;else h<=-m?(d=Math.max(0,-(-o*a+l)),h=d>0?-a:Math.min(Math.max(-a,-s),a),p=-d*d+h*(h+2*s)+c):h<=m?(d=0,h=Math.min(Math.max(-a,-s),a),p=h*(h+2*s)+c):(d=Math.max(0,-(o*a+l)),h=d>0?a:Math.min(Math.max(-a,-s),a),p=-d*d+h*(h+2*s)+c);else h=o>0?-a:a,d=Math.max(0,-(o*h+l)),p=-d*d+h*(h+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),r&&r.copy(na).addScaledVector(ir,h),p}intersectSphere(e,t){hn.subVectors(e.center,this.origin);const n=hn.dot(this.direction),r=hn.dot(hn)-n*n,a=e.radius*e.radius;if(r>a)return null;const o=Math.sqrt(a-r),l=n-o,s=n+o;return s<0?null:l<0?this.at(s,t):this.at(l,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,a,o,l,s;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(a=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(a=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),n>o||a>r?null:((a>n||isNaN(n))&&(n=a),(o<r||isNaN(r))&&(r=o),d>=0?(l=(e.min.z-h.z)*d,s=(e.max.z-h.z)*d):(l=(e.max.z-h.z)*d,s=(e.min.z-h.z)*d),n>s||l>r?null:((l>n||n!=n)&&(n=l),(s<r||r!=r)&&(r=s),r<0?null:this.at(n>=0?n:r,t)))}intersectsBox(e){return this.intersectBox(e,hn)!==null}intersectTriangle(e,t,n,r,a){ia.subVectors(t,e),rr.subVectors(n,e),ra.crossVectors(ia,rr);let o,l=this.direction.dot(ra);if(l>0){if(r)return null;o=1}else{if(!(l<0))return null;o=-1,l=-l}bn.subVectors(this.origin,e);const s=o*this.direction.dot(rr.crossVectors(bn,rr));if(s<0)return null;const c=o*this.direction.dot(ia.cross(bn));if(c<0||s+c>l)return null;const u=-o*bn.dot(ra);return u<0?null:this.at(u/l,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Pe{constructor(e,t,n,r,a,o,l,s,c,u,d,h,p,m,v,g){Pe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,a,o,l,s,c,u,d,h,p,m,v,g)}set(e,t,n,r,a,o,l,s,c,u,d,h,p,m,v,g){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=r,f[1]=a,f[5]=o,f[9]=l,f[13]=s,f[2]=c,f[6]=u,f[10]=d,f[14]=h,f[3]=p,f[7]=m,f[11]=v,f[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Pe().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/ii.setFromMatrixColumn(e,0).length(),a=1/ii.setFromMatrixColumn(e,1).length(),o=1/ii.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*a,t[5]=n[5]*a,t[6]=n[6]*a,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,a=e.z,o=Math.cos(n),l=Math.sin(n),s=Math.cos(r),c=Math.sin(r),u=Math.cos(a),d=Math.sin(a);if(e.order==="XYZ"){const h=o*u,p=o*d,m=l*u,v=l*d;t[0]=s*u,t[4]=-s*d,t[8]=c,t[1]=p+m*c,t[5]=h-v*c,t[9]=-l*s,t[2]=v-h*c,t[6]=m+p*c,t[10]=o*s}else if(e.order==="YXZ"){const h=s*u,p=s*d,m=c*u,v=c*d;t[0]=h+v*l,t[4]=m*l-p,t[8]=o*c,t[1]=o*d,t[5]=o*u,t[9]=-l,t[2]=p*l-m,t[6]=v+h*l,t[10]=o*s}else if(e.order==="ZXY"){const h=s*u,p=s*d,m=c*u,v=c*d;t[0]=h-v*l,t[4]=-o*d,t[8]=m+p*l,t[1]=p+m*l,t[5]=o*u,t[9]=v-h*l,t[2]=-o*c,t[6]=l,t[10]=o*s}else if(e.order==="ZYX"){const h=o*u,p=o*d,m=l*u,v=l*d;t[0]=s*u,t[4]=m*c-p,t[8]=h*c+v,t[1]=s*d,t[5]=v*c+h,t[9]=p*c-m,t[2]=-c,t[6]=l*s,t[10]=o*s}else if(e.order==="YZX"){const h=o*s,p=o*c,m=l*s,v=l*c;t[0]=s*u,t[4]=v-h*d,t[8]=m*d+p,t[1]=d,t[5]=o*u,t[9]=-l*u,t[2]=-c*u,t[6]=p*d+m,t[10]=h-v*d}else if(e.order==="XZY"){const h=o*s,p=o*c,m=l*s,v=l*c;t[0]=s*u,t[4]=-d,t[8]=c*u,t[1]=h*d+v,t[5]=o*u,t[9]=p*d-m,t[2]=m*d-p,t[6]=l*u,t[10]=v*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Vl,e,kl)}lookAt(e,t,n){const r=this.elements;return Ft.subVectors(e,t),Ft.lengthSq()===0&&(Ft.z=1),Ft.normalize(),Tn.crossVectors(n,Ft),Tn.lengthSq()===0&&(Math.abs(n.z)===1?Ft.x+=1e-4:Ft.z+=1e-4,Ft.normalize(),Tn.crossVectors(n,Ft)),Tn.normalize(),ar.crossVectors(Ft,Tn),r[0]=Tn.x,r[4]=ar.x,r[8]=Ft.x,r[1]=Tn.y,r[5]=ar.y,r[9]=Ft.y,r[2]=Tn.z,r[6]=ar.z,r[10]=Ft.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,a=this.elements,o=n[0],l=n[4],s=n[8],c=n[12],u=n[1],d=n[5],h=n[9],p=n[13],m=n[2],v=n[6],g=n[10],f=n[14],x=n[3],_=n[7],y=n[11],C=n[15],A=r[0],L=r[4],Y=r[8],F=r[12],X=r[1],V=r[5],G=r[9],Z=r[13],j=r[2],$=r[6],Q=r[10],le=r[14],de=r[3],ge=r[7],Le=r[11],re=r[15];return a[0]=o*A+l*X+s*j+c*de,a[4]=o*L+l*V+s*$+c*ge,a[8]=o*Y+l*G+s*Q+c*Le,a[12]=o*F+l*Z+s*le+c*re,a[1]=u*A+d*X+h*j+p*de,a[5]=u*L+d*V+h*$+p*ge,a[9]=u*Y+d*G+h*Q+p*Le,a[13]=u*F+d*Z+h*le+p*re,a[2]=m*A+v*X+g*j+f*de,a[6]=m*L+v*V+g*$+f*ge,a[10]=m*Y+v*G+g*Q+f*Le,a[14]=m*F+v*Z+g*le+f*re,a[3]=x*A+_*X+y*j+C*de,a[7]=x*L+_*V+y*$+C*ge,a[11]=x*Y+_*G+y*Q+C*Le,a[15]=x*F+_*Z+y*le+C*re,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],a=e[12],o=e[1],l=e[5],s=e[9],c=e[13],u=e[2],d=e[6],h=e[10],p=e[14];return e[3]*(+a*s*d-r*c*d-a*l*h+n*c*h+r*l*p-n*s*p)+e[7]*(+t*s*p-t*c*h+a*o*h-r*o*p+r*c*u-a*s*u)+e[11]*(+t*c*d-t*l*p-a*o*d+n*o*p+a*l*u-n*c*u)+e[15]*(-r*l*u-t*s*d+t*l*h+r*o*d-n*o*h+n*s*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],a=e[3],o=e[4],l=e[5],s=e[6],c=e[7],u=e[8],d=e[9],h=e[10],p=e[11],m=e[12],v=e[13],g=e[14],f=e[15],x=d*g*c-v*h*c+v*s*p-l*g*p-d*s*f+l*h*f,_=m*h*c-u*g*c-m*s*p+o*g*p+u*s*f-o*h*f,y=u*v*c-m*d*c+m*l*p-o*v*p-u*l*f+o*d*f,C=m*d*s-u*v*s-m*l*h+o*v*h+u*l*g-o*d*g,A=t*x+n*_+r*y+a*C;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const L=1/A;return e[0]=x*L,e[1]=(v*h*a-d*g*a-v*r*p+n*g*p+d*r*f-n*h*f)*L,e[2]=(l*g*a-v*s*a+v*r*c-n*g*c-l*r*f+n*s*f)*L,e[3]=(d*s*a-l*h*a-d*r*c+n*h*c+l*r*p-n*s*p)*L,e[4]=_*L,e[5]=(u*g*a-m*h*a+m*r*p-t*g*p-u*r*f+t*h*f)*L,e[6]=(m*s*a-o*g*a-m*r*c+t*g*c+o*r*f-t*s*f)*L,e[7]=(o*h*a-u*s*a+u*r*c-t*h*c-o*r*p+t*s*p)*L,e[8]=y*L,e[9]=(m*d*a-u*v*a-m*n*p+t*v*p+u*n*f-t*d*f)*L,e[10]=(o*v*a-m*l*a+m*n*c-t*v*c-o*n*f+t*l*f)*L,e[11]=(u*l*a-o*d*a-u*n*c+t*d*c+o*n*p-t*l*p)*L,e[12]=C*L,e[13]=(u*v*r-m*d*r+m*n*h-t*v*h-u*n*g+t*d*g)*L,e[14]=(m*l*r-o*v*r-m*n*s+t*v*s+o*n*g-t*l*g)*L,e[15]=(o*d*r-u*l*r+u*n*s-t*d*s-o*n*h+t*l*h)*L,this}scale(e){const t=this.elements,n=e.x,r=e.y,a=e.z;return t[0]*=n,t[4]*=r,t[8]*=a,t[1]*=n,t[5]*=r,t[9]*=a,t[2]*=n,t[6]*=r,t[10]*=a,t[3]*=n,t[7]*=r,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),a=1-n,o=e.x,l=e.y,s=e.z,c=a*o,u=a*l;return this.set(c*o+n,c*l-r*s,c*s+r*l,0,c*l+r*s,u*l+n,u*s-r*o,0,c*s-r*l,u*s+r*o,a*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,a,o){return this.set(1,n,a,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,a=t._x,o=t._y,l=t._z,s=t._w,c=a+a,u=o+o,d=l+l,h=a*c,p=a*u,m=a*d,v=o*u,g=o*d,f=l*d,x=s*c,_=s*u,y=s*d,C=n.x,A=n.y,L=n.z;return r[0]=(1-(v+f))*C,r[1]=(p+y)*C,r[2]=(m-_)*C,r[3]=0,r[4]=(p-y)*A,r[5]=(1-(h+f))*A,r[6]=(g+x)*A,r[7]=0,r[8]=(m+_)*L,r[9]=(g-x)*L,r[10]=(1-(h+v))*L,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let a=ii.set(r[0],r[1],r[2]).length();const o=ii.set(r[4],r[5],r[6]).length(),l=ii.set(r[8],r[9],r[10]).length();this.determinant()<0&&(a=-a),e.x=r[12],e.y=r[13],e.z=r[14],$t.copy(this);const s=1/a,c=1/o,u=1/l;return $t.elements[0]*=s,$t.elements[1]*=s,$t.elements[2]*=s,$t.elements[4]*=c,$t.elements[5]*=c,$t.elements[6]*=c,$t.elements[8]*=u,$t.elements[9]*=u,$t.elements[10]*=u,t.setFromRotationMatrix($t),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,r,a,o,l=2e3){const s=this.elements,c=2*a/(t-e),u=2*a/(n-r),d=(t+e)/(t-e),h=(n+r)/(n-r);let p,m;if(l===Ei)p=-(o+a)/(o-a),m=-2*o*a/(o-a);else{if(l!==Ir)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);p=-o/(o-a),m=-o*a/(o-a)}return s[0]=c,s[4]=0,s[8]=d,s[12]=0,s[1]=0,s[5]=u,s[9]=h,s[13]=0,s[2]=0,s[6]=0,s[10]=p,s[14]=m,s[3]=0,s[7]=0,s[11]=-1,s[15]=0,this}makeOrthographic(e,t,n,r,a,o,l=2e3){const s=this.elements,c=1/(t-e),u=1/(n-r),d=1/(o-a),h=(t+e)*c,p=(n+r)*u;let m,v;if(l===Ei)m=(o+a)*d,v=-2*d;else{if(l!==Ir)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);m=a*d,v=-1*d}return s[0]=2*c,s[4]=0,s[8]=0,s[12]=-h,s[1]=0,s[5]=2*u,s[9]=0,s[13]=-p,s[2]=0,s[6]=0,s[10]=v,s[14]=-m,s[3]=0,s[7]=0,s[11]=0,s[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ii=new T,$t=new Pe,Vl=new T(0,0,0),kl=new T(1,1,1),Tn=new T,ar=new T,Ft=new T,Bs=new Pe,zs=new rn;class Nt{constructor(e=0,t=0,n=0,r=Nt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,a=r[0],o=r[4],l=r[8],s=r[1],c=r[5],u=r[9],d=r[2],h=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(Ut(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-o,a)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ut(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(l,p),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-d,a),this._z=0);break;case"ZXY":this._x=Math.asin(Ut(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(s,a));break;case"ZYX":this._y=Math.asin(-Ut(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,p),this._z=Math.atan2(s,a)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ut(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,a)):(this._x=0,this._y=Math.atan2(l,p));break;case"XZY":this._z=Math.asin(-Ut(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(l,a)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Bs.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Bs,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return zs.setFromEuler(this),this.setFromQuaternion(zs,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Nt.DEFAULT_ORDER="XYZ";class Ms{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!=0}isEnabled(e){return(this.mask&(1<<e|0))!=0}}let Wl=0;const Hs=new T,ri=new rn,dn=new Pe,sr=new T,Ni=new T,Xl=new T,jl=new rn,Gs=new T(1,0,0),Vs=new T(0,1,0),ks=new T(0,0,1),Ws={type:"added"},ql={type:"removed"},ai={type:"childadded",child:null},aa={type:"childremoved",child:null};class yt extends Ti{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Wl++}),this.uuid=Zi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=yt.DEFAULT_UP.clone();const e=new T,t=new Nt,n=new rn,r=new T(1,1,1);t._onChange(function(){n.setFromEuler(t,!1)}),n._onChange(function(){t.setFromQuaternion(n,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Pe},normalMatrix:{value:new qe}}),this.matrix=new Pe,this.matrixWorld=new Pe,this.matrixAutoUpdate=yt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ms,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ri.setFromAxisAngle(e,t),this.quaternion.multiply(ri),this}rotateOnWorldAxis(e,t){return ri.setFromAxisAngle(e,t),this.quaternion.premultiply(ri),this}rotateX(e){return this.rotateOnAxis(Gs,e)}rotateY(e){return this.rotateOnAxis(Vs,e)}rotateZ(e){return this.rotateOnAxis(ks,e)}translateOnAxis(e,t){return Hs.copy(e).applyQuaternion(this.quaternion),this.position.add(Hs.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Gs,e)}translateY(e){return this.translateOnAxis(Vs,e)}translateZ(e){return this.translateOnAxis(ks,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(dn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?sr.copy(e):sr.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Ni.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?dn.lookAt(Ni,sr,this.up):dn.lookAt(sr,Ni,this.up),this.quaternion.setFromRotationMatrix(dn),r&&(dn.extractRotation(r.matrixWorld),ri.setFromRotationMatrix(dn),this.quaternion.premultiply(ri.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ws),ai.child=e,this.dispatchEvent(ai),ai.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ql),aa.child=e,this.dispatchEvent(aa),aa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),dn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),dn.multiply(e.parent.matrixWorld)),e.applyMatrix4(dn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ws),ai.child=e,this.dispatchEvent(ai),ai.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ni,e,Xl),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ni,jl,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};function a(l,s){return l[s.uuid]===void 0&&(l[s.uuid]=s.toJSON(e)),s.uuid}if(r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(l=>({boxInitialized:l.boxInitialized,boxMin:l.box.min.toArray(),boxMax:l.box.max.toArray(),sphereInitialized:l.sphereInitialized,sphereRadius:l.sphere.radius,sphereCenter:l.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()})),this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(e.geometries,this.geometry);const l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){const s=l.shapes;if(Array.isArray(s))for(let c=0,u=s.length;c<u;c++){const d=s[c];a(e.shapes,d)}else a(e.shapes,s)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const l=[];for(let s=0,c=this.material.length;s<c;s++)l.push(a(e.materials,this.material[s]));r.material=l}else r.material=a(e.materials,this.material);if(this.children.length>0){r.children=[];for(let l=0;l<this.children.length;l++)r.children.push(this.children[l].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let l=0;l<this.animations.length;l++){const s=this.animations[l];r.animations.push(a(e.animations,s))}}if(t){const l=o(e.geometries),s=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),h=o(e.skeletons),p=o(e.animations),m=o(e.nodes);l.length>0&&(n.geometries=l),s.length>0&&(n.materials=s),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),p.length>0&&(n.animations=p),m.length>0&&(n.nodes=m)}return n.object=r,n;function o(l){const s=[];for(const c in l){const u=l[c];delete u.metadata,s.push(u)}return s}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}yt.DEFAULT_UP=new T(0,1,0),yt.DEFAULT_MATRIX_AUTO_UPDATE=!0,yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Qt=new T,pn=new T,sa=new T,fn=new T,si=new T,oi=new T,Xs=new T,oa=new T,la=new T,ca=new T,ua=new it,ha=new it,da=new it;class Wt{constructor(e=new T,t=new T,n=new T){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Qt.subVectors(e,t),r.cross(Qt);const a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(e,t,n,r,a){Qt.subVectors(r,t),pn.subVectors(n,t),sa.subVectors(e,t);const o=Qt.dot(Qt),l=Qt.dot(pn),s=Qt.dot(sa),c=pn.dot(pn),u=pn.dot(sa),d=o*c-l*l;if(d===0)return a.set(0,0,0),null;const h=1/d,p=(c*s-l*u)*h,m=(o*u-l*s)*h;return a.set(1-p-m,m,p)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,fn)!==null&&fn.x>=0&&fn.y>=0&&fn.x+fn.y<=1}static getInterpolation(e,t,n,r,a,o,l,s){return this.getBarycoord(e,t,n,r,fn)===null?(s.x=0,s.y=0,"z"in s&&(s.z=0),"w"in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(a,fn.x),s.addScaledVector(o,fn.y),s.addScaledVector(l,fn.z),s)}static getInterpolatedAttribute(e,t,n,r,a,o){return ua.setScalar(0),ha.setScalar(0),da.setScalar(0),ua.fromBufferAttribute(e,t),ha.fromBufferAttribute(e,n),da.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(ua,a.x),o.addScaledVector(ha,a.y),o.addScaledVector(da,a.z),o}static isFrontFacing(e,t,n,r){return Qt.subVectors(n,t),pn.subVectors(e,t),Qt.cross(pn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Qt.subVectors(this.c,this.b),pn.subVectors(this.a,this.b),.5*Qt.cross(pn).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Wt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Wt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,a){return Wt.getInterpolation(e,this.a,this.b,this.c,t,n,r,a)}containsPoint(e){return Wt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Wt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,a=this.c;let o,l;si.subVectors(r,n),oi.subVectors(a,n),oa.subVectors(e,n);const s=si.dot(oa),c=oi.dot(oa);if(s<=0&&c<=0)return t.copy(n);la.subVectors(e,r);const u=si.dot(la),d=oi.dot(la);if(u>=0&&d<=u)return t.copy(r);const h=s*d-u*c;if(h<=0&&s>=0&&u<=0)return o=s/(s-u),t.copy(n).addScaledVector(si,o);ca.subVectors(e,a);const p=si.dot(ca),m=oi.dot(ca);if(m>=0&&p<=m)return t.copy(a);const v=p*c-s*m;if(v<=0&&c>=0&&m<=0)return l=c/(c-m),t.copy(n).addScaledVector(oi,l);const g=u*m-p*d;if(g<=0&&d-u>=0&&p-m>=0)return Xs.subVectors(a,r),l=(d-u)/(d-u+(p-m)),t.copy(r).addScaledVector(Xs,l);const f=1/(g+v+h);return o=v*f,l=h*f,t.copy(n).addScaledVector(si,o).addScaledVector(oi,l)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const el={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},wn={h:0,s:0,l:0},or={h:0,s:0,l:0};function pa(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+6*(e-i)*t:t<.5?e:t<2/3?i+6*(e-i)*(2/3-t):i}class ze{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Vt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,nt.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=nt.workingColorSpace){return this.r=e,this.g=t,this.b=n,nt.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=nt.workingColorSpace){if(e=Ul(e,1),t=Ut(t,0,1),n=Ut(n,0,1),t===0)this.r=this.g=this.b=n;else{const a=n<=.5?n*(1+t):n+t-n*t,o=2*n-a;this.r=pa(o,a,e+1/3),this.g=pa(o,a,e),this.b=pa(o,a,e-1/3)}return nt.toWorkingColorSpace(this,r),this}setStyle(e,t=Vt){function n(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const o=r[1],l=r[2];switch(o){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=r[1],o=a.length;if(o===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(a,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Vt){const n=el[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=_i(e.r),this.g=_i(e.g),this.b=_i(e.b),this}copyLinearToSRGB(e){return this.r=Jr(e.r),this.g=Jr(e.g),this.b=Jr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Vt){return nt.fromWorkingColorSpace(wt.copy(this),e),65536*Math.round(Ut(255*wt.r,0,255))+256*Math.round(Ut(255*wt.g,0,255))+Math.round(Ut(255*wt.b,0,255))}getHexString(e=Vt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=nt.workingColorSpace){nt.fromWorkingColorSpace(wt.copy(this),t);const n=wt.r,r=wt.g,a=wt.b,o=Math.max(n,r,a),l=Math.min(n,r,a);let s,c;const u=(l+o)/2;if(l===o)s=0,c=0;else{const d=o-l;switch(c=u<=.5?d/(o+l):d/(2-o-l),o){case n:s=(r-a)/d+(r<a?6:0);break;case r:s=(a-n)/d+2;break;case a:s=(n-r)/d+4}s/=6}return e.h=s,e.s=c,e.l=u,e}getRGB(e,t=nt.workingColorSpace){return nt.fromWorkingColorSpace(wt.copy(this),t),e.r=wt.r,e.g=wt.g,e.b=wt.b,e}getStyle(e=Vt){nt.fromWorkingColorSpace(wt.copy(this),e);const t=wt.r,n=wt.g,r=wt.b;return e!==Vt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*n)},${Math.round(255*r)})`}offsetHSL(e,t,n){return this.getHSL(wn),this.setHSL(wn.h+e,wn.s+t,wn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(wn),e.getHSL(or);const n=Kr(wn.h,or.h,t),r=Kr(wn.s,or.s,t),a=Kr(wn.l,or.l,t);return this.setHSL(n,r,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,a=e.elements;return this.r=a[0]*t+a[3]*n+a[6]*r,this.g=a[1]*t+a[4]*n+a[7]*r,this.b=a[2]*t+a[5]*n+a[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const wt=new ze;ze.NAMES=el;let Yl=0;class wi extends Ti{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Yl++}),this.uuid=Zi(),this.name="",this.type="Material",this.blending=1,this.side=Ln,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Pa,this.blendDst=La,this.blendEquation=Wn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ze(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=$n,this.stencilZFail=$n,this.stencilZPass=$n,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];r!==void 0?r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n:console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};function r(a){const o=[];for(const l in a){const s=a[l];delete s.metadata,o.push(s)}return o}if(n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==Ln&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Pa&&(n.blendSrc=this.blendSrc),this.blendDst!==La&&(n.blendDst=this.blendDst),this.blendEquation!==Wn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==$n&&(n.stencilFail=this.stencilFail),this.stencilZFail!==$n&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==$n&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData),t){const a=r(e.textures),o=r(e.images);a.length>0&&(n.textures=a),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let a=0;a!==r;++a)n[a]=t[a].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Xn extends wi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Nt,this.combine=Bo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}Kl();function Kl(){const i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),r=new Uint32Array(512);for(let s=0;s<256;++s){const c=s-127;c<-27?(n[s]=0,n[256|s]=32768,r[s]=24,r[256|s]=24):c<-14?(n[s]=1024>>-c-14,n[256|s]=1024>>-c-14|32768,r[s]=-c-1,r[256|s]=-c-1):c<=15?(n[s]=c+15<<10,n[256|s]=c+15<<10|32768,r[s]=13,r[256|s]=13):c<128?(n[s]=31744,n[256|s]=64512,r[s]=24,r[256|s]=24):(n[s]=31744,n[256|s]=64512,r[s]=13,r[256|s]=13)}const a=new Uint32Array(2048),o=new Uint32Array(64),l=new Uint32Array(64);for(let s=1;s<1024;++s){let c=s<<13,u=0;for(;!(8388608&c);)c<<=1,u-=8388608;c&=-8388609,u+=947912704,a[s]=c|u}for(let s=1024;s<2048;++s)a[s]=939524096+(s-1024<<13);for(let s=1;s<31;++s)o[s]=s<<23;o[31]=1199570944,o[32]=2147483648;for(let s=33;s<63;++s)o[s]=2147483648+(s-32<<23);o[63]=3347054592;for(let s=1;s<64;++s)s!==32&&(l[s]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:r,mantissaTable:a,exponentTable:o,offsetTable:l}}const mt=new T,lr=new ke;class zt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ds,this.updateRanges=[],this.gpuType=cn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)lr.fromBufferAttribute(this,t),lr.applyMatrix3(e),this.setXY(t,lr.x,lr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyMatrix3(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyMatrix4(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.applyNormalMatrix(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)mt.fromBufferAttribute(this,t),mt.transformDirection(e),this.setXYZ(t,mt.x,mt.y,mt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Li(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Dt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Li(t,this.array)),t}setX(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Li(t,this.array)),t}setY(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Li(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Li(t,this.array)),t}setW(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Dt(t,this.array),n=Dt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Dt(t,this.array),n=Dt(n,this.array),r=Dt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,a){return e*=this.itemSize,this.normalized&&(t=Dt(t,this.array),n=Dt(n,this.array),r=Dt(r,this.array),a=Dt(a,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ds&&(e.usage=this.usage),e}}class tl extends zt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class nl extends zt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class gt extends zt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Zl=0;const Gt=new Pe,fa=new yt,li=new T,Bt=new vn,Oi=new vn,St=new T;class Ot extends Ti{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Zl++}),this.uuid=Zi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Jo(e)?nl:tl)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const a=new qe().getNormalMatrix(e);n.applyNormalMatrix(a),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Gt.makeRotationFromQuaternion(e),this.applyMatrix4(Gt),this}rotateX(e){return Gt.makeRotationX(e),this.applyMatrix4(Gt),this}rotateY(e){return Gt.makeRotationY(e),this.applyMatrix4(Gt),this}rotateZ(e){return Gt.makeRotationZ(e),this.applyMatrix4(Gt),this}translate(e,t,n){return Gt.makeTranslation(e,t,n),this.applyMatrix4(Gt),this}scale(e,t,n){return Gt.makeScale(e,t,n),this.applyMatrix4(Gt),this}lookAt(e){return fa.lookAt(e),fa.updateMatrix(),this.applyMatrix4(fa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(li).negate(),this.translate(li.x,li.y,li.z),this}setFromPoints(e){const t=[];for(let n=0,r=e.length;n<r;n++){const a=e[n];t.push(a.x,a.y,a.z||0)}return this.setAttribute("position",new gt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new vn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new T(-1/0,-1/0,-1/0),new T(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const a=t[n];Bt.setFromBufferAttribute(a),this.morphTargetsRelative?(St.addVectors(this.boundingBox.min,Bt.min),this.boundingBox.expandByPoint(St),St.addVectors(this.boundingBox.max,Bt.max),this.boundingBox.expandByPoint(St)):(this.boundingBox.expandByPoint(Bt.min),this.boundingBox.expandByPoint(Bt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new xn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new T,1/0);if(e){const n=this.boundingSphere.center;if(Bt.setFromBufferAttribute(e),t)for(let a=0,o=t.length;a<o;a++){const l=t[a];Oi.setFromBufferAttribute(l),this.morphTargetsRelative?(St.addVectors(Bt.min,Oi.min),Bt.expandByPoint(St),St.addVectors(Bt.max,Oi.max),Bt.expandByPoint(St)):(Bt.expandByPoint(Oi.min),Bt.expandByPoint(Oi.max))}Bt.getCenter(n);let r=0;for(let a=0,o=e.count;a<o;a++)St.fromBufferAttribute(e,a),r=Math.max(r,n.distanceToSquared(St));if(t)for(let a=0,o=t.length;a<o;a++){const l=t[a],s=this.morphTargetsRelative;for(let c=0,u=l.count;c<u;c++)St.fromBufferAttribute(l,c),s&&(li.fromBufferAttribute(e,c),St.add(li)),r=Math.max(r,n.distanceToSquared(St))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");const n=t.position,r=t.normal,a=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new zt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),l=[],s=[];for(let Y=0;Y<n.count;Y++)l[Y]=new T,s[Y]=new T;const c=new T,u=new T,d=new T,h=new ke,p=new ke,m=new ke,v=new T,g=new T;function f(Y,F,X){c.fromBufferAttribute(n,Y),u.fromBufferAttribute(n,F),d.fromBufferAttribute(n,X),h.fromBufferAttribute(a,Y),p.fromBufferAttribute(a,F),m.fromBufferAttribute(a,X),u.sub(c),d.sub(c),p.sub(h),m.sub(h);const V=1/(p.x*m.y-m.x*p.y);isFinite(V)&&(v.copy(u).multiplyScalar(m.y).addScaledVector(d,-p.y).multiplyScalar(V),g.copy(d).multiplyScalar(p.x).addScaledVector(u,-m.x).multiplyScalar(V),l[Y].add(v),l[F].add(v),l[X].add(v),s[Y].add(g),s[F].add(g),s[X].add(g))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let Y=0,F=x.length;Y<F;++Y){const X=x[Y],V=X.start;for(let G=V,Z=V+X.count;G<Z;G+=3)f(e.getX(G+0),e.getX(G+1),e.getX(G+2))}const _=new T,y=new T,C=new T,A=new T;function L(Y){C.fromBufferAttribute(r,Y),A.copy(C);const F=l[Y];_.copy(F),_.sub(C.multiplyScalar(C.dot(F))).normalize(),y.crossVectors(A,F);const X=y.dot(s[Y])<0?-1:1;o.setXYZW(Y,_.x,_.y,_.z,X)}for(let Y=0,F=x.length;Y<F;++Y){const X=x[Y],V=X.start;for(let G=V,Z=V+X.count;G<Z;G+=3)L(e.getX(G+0)),L(e.getX(G+1)),L(e.getX(G+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new zt(new Float32Array(3*t.count),3),this.setAttribute("normal",n);else for(let h=0,p=n.count;h<p;h++)n.setXYZ(h,0,0,0);const r=new T,a=new T,o=new T,l=new T,s=new T,c=new T,u=new T,d=new T;if(e)for(let h=0,p=e.count;h<p;h+=3){const m=e.getX(h+0),v=e.getX(h+1),g=e.getX(h+2);r.fromBufferAttribute(t,m),a.fromBufferAttribute(t,v),o.fromBufferAttribute(t,g),u.subVectors(o,a),d.subVectors(r,a),u.cross(d),l.fromBufferAttribute(n,m),s.fromBufferAttribute(n,v),c.fromBufferAttribute(n,g),l.add(u),s.add(u),c.add(u),n.setXYZ(m,l.x,l.y,l.z),n.setXYZ(v,s.x,s.y,s.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let h=0,p=t.count;h<p;h+=3)r.fromBufferAttribute(t,h+0),a.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,a),d.subVectors(r,a),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)St.fromBufferAttribute(e,t),St.normalize(),e.setXYZ(t,St.x,St.y,St.z)}toNonIndexed(){function e(l,s){const c=l.array,u=l.itemSize,d=l.normalized,h=new c.constructor(s.length*u);let p=0,m=0;for(let v=0,g=s.length;v<g;v++){p=l.isInterleavedBufferAttribute?s[v]*l.data.stride+l.offset:s[v]*u;for(let f=0;f<u;f++)h[m++]=c[p++]}return new zt(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ot,n=this.index.array,r=this.attributes;for(const l in r){const s=e(r[l],n);t.setAttribute(l,s)}const a=this.morphAttributes;for(const l in a){const s=[],c=a[l];for(let u=0,d=c.length;u<d;u++){const h=e(c[u],n);s.push(h)}t.morphAttributes[l]=s}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let l=0,s=o.length;l<s;l++){const c=o[l];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const s=this.parameters;for(const c in s)s[c]!==void 0&&(e[c]=s[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const s in n){const c=n[s];e.data.attributes[s]=c.toJSON(e.data)}const r={};let a=!1;for(const s in this.morphAttributes){const c=this.morphAttributes[s],u=[];for(let d=0,h=c.length;d<h;d++){const p=c[d];u.push(p.toJSON(e.data))}u.length>0&&(r[s]=u,a=!0)}a&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const l=this.boundingSphere;return l!==null&&(e.data.boundingSphere={center:l.center.toArray(),radius:l.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const a=e.morphAttributes;for(const c in a){const u=[],d=a[c];for(let h=0,p=d.length;h<p;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const l=e.boundingBox;l!==null&&(this.boundingBox=l.clone());const s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const js=new Pe,zn=new Ji,cr=new xn,qs=new T,ur=new T,hr=new T,dr=new T,ma=new T,pr=new T,Ys=new T,fr=new T;class pt extends yt{constructor(e=new Ot,t=new Xn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){const n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,a=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const l=this.morphTargetInfluences;if(a&&l){pr.set(0,0,0);for(let s=0,c=a.length;s<c;s++){const u=l[s],d=a[s];u!==0&&(ma.fromBufferAttribute(d,e),o?pr.addScaledVector(ma,u):pr.addScaledVector(ma.sub(t),u))}t.add(pr)}return t}raycast(e,t){const n=this.geometry,r=this.material,a=this.matrixWorld;if(r!==void 0){if(n.boundingSphere===null&&n.computeBoundingSphere(),cr.copy(n.boundingSphere),cr.applyMatrix4(a),zn.copy(e.ray).recast(e.near),cr.containsPoint(zn.origin)===!1&&(zn.intersectSphere(cr,qs)===null||zn.origin.distanceToSquared(qs)>(e.far-e.near)**2))return;js.copy(a).invert(),zn.copy(e.ray).applyMatrix4(js),n.boundingBox!==null&&zn.intersectsBox(n.boundingBox)===!1||this._computeIntersections(e,t,zn)}}_computeIntersections(e,t,n){let r;const a=this.geometry,o=this.material,l=a.index,s=a.attributes.position,c=a.attributes.uv,u=a.attributes.uv1,d=a.attributes.normal,h=a.groups,p=a.drawRange;if(l!==null)if(Array.isArray(o))for(let m=0,v=h.length;m<v;m++){const g=h[m],f=o[g.materialIndex];for(let x=Math.max(g.start,p.start),_=Math.min(l.count,Math.min(g.start+g.count,p.start+p.count));x<_;x+=3)r=mr(this,f,e,n,c,u,d,l.getX(x),l.getX(x+1),l.getX(x+2)),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=g.materialIndex,t.push(r))}else for(let m=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);m<v;m+=3)r=mr(this,o,e,n,c,u,d,l.getX(m),l.getX(m+1),l.getX(m+2)),r&&(r.faceIndex=Math.floor(m/3),t.push(r));else if(s!==void 0)if(Array.isArray(o))for(let m=0,v=h.length;m<v;m++){const g=h[m],f=o[g.materialIndex];for(let x=Math.max(g.start,p.start),_=Math.min(s.count,Math.min(g.start+g.count,p.start+p.count));x<_;x+=3)r=mr(this,f,e,n,c,u,d,x,x+1,x+2),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=g.materialIndex,t.push(r))}else for(let m=Math.max(0,p.start),v=Math.min(s.count,p.start+p.count);m<v;m+=3)r=mr(this,o,e,n,c,u,d,m,m+1,m+2),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}function mr(i,e,t,n,r,a,o,l,s,c){i.getVertexPosition(l,ur),i.getVertexPosition(s,hr),i.getVertexPosition(c,dr);const u=function(d,h,p,m,v,g,f,x){let _;if(_=h.side===It?m.intersectTriangle(f,g,v,!0,x):m.intersectTriangle(v,g,f,h.side===Ln,x),_===null)return null;fr.copy(x),fr.applyMatrix4(d.matrixWorld);const y=p.ray.origin.distanceTo(fr);return y<p.near||y>p.far?null:{distance:y,point:fr.clone(),object:d}}(i,e,t,n,ur,hr,dr,Ys);if(u){const d=new T;Wt.getBarycoord(Ys,ur,hr,dr,d),r&&(u.uv=Wt.getInterpolatedAttribute(r,l,s,c,d,new ke)),a&&(u.uv1=Wt.getInterpolatedAttribute(a,l,s,c,d,new ke)),o&&(u.normal=Wt.getInterpolatedAttribute(o,l,s,c,d,new T),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a:l,b:s,c,normal:new T,materialIndex:0};Wt.getNormal(ur,hr,dr,h.normal),u.face=h,u.barycoord=d}return u}class Zn extends Ot{constructor(e=1,t=1,n=1,r=1,a=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:a,depthSegments:o};const l=this;r=Math.floor(r),a=Math.floor(a),o=Math.floor(o);const s=[],c=[],u=[],d=[];let h=0,p=0;function m(v,g,f,x,_,y,C,A,L,Y,F){const X=y/L,V=C/Y,G=y/2,Z=C/2,j=A/2,$=L+1,Q=Y+1;let le=0,de=0;const ge=new T;for(let Le=0;Le<Q;Le++){const re=Le*V-Z;for(let ce=0;ce<$;ce++){const ae=ce*X-G;ge[v]=ae*x,ge[g]=re*_,ge[f]=j,c.push(ge.x,ge.y,ge.z),ge[v]=0,ge[g]=0,ge[f]=A>0?1:-1,u.push(ge.x,ge.y,ge.z),d.push(ce/L),d.push(1-Le/Y),le+=1}}for(let Le=0;Le<Y;Le++)for(let re=0;re<L;re++){const ce=h+re+$*Le,ae=h+re+$*(Le+1),ve=h+(re+1)+$*(Le+1),w=h+(re+1)+$*Le;s.push(ce,ae,w),s.push(ae,ve,w),de+=6}l.addGroup(p,de,F),p+=de,h+=le}m("z","y","x",-1,-1,n,t,e,o,a,0),m("z","y","x",1,-1,n,t,-e,o,a,1),m("x","z","y",1,1,e,n,t,r,o,2),m("x","z","y",1,-1,e,n,-t,r,o,3),m("x","y","z",1,-1,e,t,n,r,a,4),m("x","y","z",-1,-1,e,t,-n,r,a,5),this.setIndex(s),this.setAttribute("position",new gt(c,3)),this.setAttribute("normal",new gt(u,3)),this.setAttribute("uv",new gt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function bi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Rt(i){const e={};for(let t=0;t<i.length;t++){const n=bi(i[t]);for(const r in n)e[r]=n[r]}return e}function il(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:nt.workingColorSpace}const Jl={clone:bi,merge:Rt};class Dn extends wi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,this.fragmentShader=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=bi(e.uniforms),this.uniformsGroups=function(t){const n=[];for(let r=0;r<t.length;r++)n.push(t[r].clone());return n}(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Ss extends yt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Pe,this.projectionMatrix=new Pe,this.projectionMatrixInverse=new Pe,this.coordinateSystem=Ei}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const An=new T,Ks=new ke,Zs=new ke;class kt extends Ss{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=2*os*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(.5*Yr*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*os*Math.atan(Math.tan(.5*Yr*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){An.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(An.x,An.y).multiplyScalar(-e/An.z),An.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(An.x,An.y).multiplyScalar(-e/An.z)}getViewSize(e,t){return this.getViewBounds(e,Ks,Zs),t.subVectors(Zs,Ks)}setViewOffset(e,t,n,r,a,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(.5*Yr*this.fov)/this.zoom,n=2*t,r=this.aspect*n,a=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const s=o.fullWidth,c=o.fullHeight;a+=o.offsetX*r/s,t-=o.offsetY*n/c,r*=o.width/s,n*=o.height/c}const l=this.filmOffset;l!==0&&(a+=e*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ci=-90;class $l extends yt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new kt(ci,1,e,t);r.layers=this.layers,this.add(r);const a=new kt(ci,1,e,t);a.layers=this.layers,this.add(a);const o=new kt(ci,1,e,t);o.layers=this.layers,this.add(o);const l=new kt(ci,1,e,t);l.layers=this.layers,this.add(l);const s=new kt(ci,1,e,t);s.layers=this.layers,this.add(s);const c=new kt(ci,1,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,a,o,l,s]=t;for(const c of t)this.remove(c);if(e===Ei)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),l.up.set(0,1,0),l.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else{if(e!==Ir)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),l.up.set(0,-1,0),l.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1)}for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,o,l,s,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,a),e.setRenderTarget(n,1,r),e.render(t,o),e.setRenderTarget(n,2,r),e.render(t,l),e.setRenderTarget(n,3,r),e.render(t,s),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,r),e.render(t,u),e.setRenderTarget(d,h,p),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class rl extends At{constructor(e,t,n,r,a,o,l,s,c,u){super(e=e!==void 0?e:[],t=t!==void 0?t:xi,n,r,a,o,l,s,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ql extends qn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new rl(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0&&t.generateMipmaps,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:ln}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new Zn(5,5,5),a=new Dn({name:"CubemapFromEquirect",uniforms:bi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:It,blending:0});a.uniforms.tEquirect.value=t;const o=new pt(r,a),l=t.minFilter;return t.minFilter===mi&&(t.minFilter=ln),new $l(1,10,this).update(e,o),t.minFilter=l,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,r){const a=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,r);e.setRenderTarget(a)}}const ga=new T,ec=new T,tc=new qe;class Cn{constructor(e=new T(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=ga.subVectors(n,t).cross(ec.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(ga),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return a<0||a>1?null:t.copy(e.start).addScaledVector(n,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||tc.getNormalMatrix(e),r=this.coplanarPoint(ga).applyMatrix4(e),a=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Hn=new xn,gr=new T;class Gr{constructor(e=new Cn,t=new Cn,n=new Cn,r=new Cn,a=new Cn,o=new Cn){this.planes=[e,t,n,r,a,o]}set(e,t,n,r,a,o){const l=this.planes;return l[0].copy(e),l[1].copy(t),l[2].copy(n),l[3].copy(r),l[4].copy(a),l[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3){const n=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],s=r[3],c=r[4],u=r[5],d=r[6],h=r[7],p=r[8],m=r[9],v=r[10],g=r[11],f=r[12],x=r[13],_=r[14],y=r[15];if(n[0].setComponents(s-a,h-c,g-p,y-f).normalize(),n[1].setComponents(s+a,h+c,g+p,y+f).normalize(),n[2].setComponents(s+o,h+u,g+m,y+x).normalize(),n[3].setComponents(s-o,h-u,g-m,y-x).normalize(),n[4].setComponents(s-l,h-d,g-v,y-_).normalize(),t===Ei)n[5].setComponents(s+l,h+d,g+v,y+_).normalize();else{if(t!==Ir)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);n[5].setComponents(l,d,v,_).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Hn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Hn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Hn)}intersectsSprite(e){return Hn.center.set(0,0,0),Hn.radius=.7071067811865476,Hn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Hn)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(gr.x=r.normal.x>0?e.max.x:e.min.x,gr.y=r.normal.y>0?e.max.y:e.min.y,gr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(gr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function al(){let i=null,e=!1,t=null,n=null;function r(a,o){t(a,o),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){i=a}}}function nc(i){const e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);const n=e.get(t);n&&(i.deleteBuffer(n.buffer),e.delete(t))},update:function(t,n){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){const a=e.get(t);return void((!a||a.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}const r=e.get(t);if(r===void 0)e.set(t,function(a,o){const l=a.array,s=a.usage,c=l.byteLength,u=i.createBuffer();let d;if(i.bindBuffer(o,u),i.bufferData(o,l,s),a.onUploadCallback(),l instanceof Float32Array)d=i.FLOAT;else if(l instanceof Uint16Array)d=a.isFloat16BufferAttribute?i.HALF_FLOAT:i.UNSIGNED_SHORT;else if(l instanceof Int16Array)d=i.SHORT;else if(l instanceof Uint32Array)d=i.UNSIGNED_INT;else if(l instanceof Int32Array)d=i.INT;else if(l instanceof Int8Array)d=i.BYTE;else if(l instanceof Uint8Array)d=i.UNSIGNED_BYTE;else{if(!(l instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);d=i.UNSIGNED_BYTE}return{buffer:u,type:d,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:c}}(t,n));else if(r.version<t.version){if(r.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(a,o,l){const s=o.array,c=o.updateRanges;if(i.bindBuffer(l,a),c.length===0)i.bufferSubData(l,0,s);else{c.sort((d,h)=>d.start-h.start);let u=0;for(let d=1;d<c.length;d++){const h=c[u],p=c[d];p.start<=h.start+h.count+1?h.count=Math.max(h.count,p.start+p.count-h.start):(++u,c[u]=p)}c.length=u+1;for(let d=0,h=c.length;d<h;d++){const p=c[d];i.bufferSubData(l,p.start*s.BYTES_PER_ELEMENT,s,p.start,p.count)}o.clearUpdateRanges()}o.onUploadCallback()})(r.buffer,t,n),r.version=t.version}}}}class Ai extends Ot{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const a=e/2,o=t/2,l=Math.floor(n),s=Math.floor(r),c=l+1,u=s+1,d=e/l,h=t/s,p=[],m=[],v=[],g=[];for(let f=0;f<u;f++){const x=f*h-o;for(let _=0;_<c;_++){const y=_*d-a;m.push(y,-x,0),v.push(0,0,1),g.push(_/l),g.push(1-f/s)}}for(let f=0;f<s;f++)for(let x=0;x<l;x++){const _=x+c*f,y=x+c*(f+1),C=x+1+c*(f+1),A=x+1+c*f;p.push(_,y,A),p.push(y,C,A)}this.setIndex(p),this.setAttribute("position",new gt(m,3)),this.setAttribute("normal",new gt(v,3)),this.setAttribute("uv",new gt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ai(e.width,e.height,e.widthSegments,e.heightSegments)}}const je={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,common:`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:"gl_FragColor = linearToOutputTexel( gl_FragColor );",colorspace_pars_fragment:`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,lights_physical_pars_fragment:`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,depth_frag:`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distanceRGBA_vert:`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,distanceRGBA_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,linedashed_frag:`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,meshbasic_vert:`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,meshbasic_frag:`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshlambert_vert:`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshmatcap_vert:`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,meshmatcap_frag:`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshnormal_vert:`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshphysical_vert:`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,meshphysical_frag:`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,meshtoon_vert:`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,points_vert:`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,points_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,shadow_vert:`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,sprite_vert:`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,sprite_frag:`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`},fe={common:{diffuse:{value:new ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qe}},envmap:{envMap:{value:null},envMapRotation:{value:new qe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qe},normalScale:{value:new ke(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0},uvTransform:{value:new qe}},sprite:{diffuse:{value:new ze(16777215)},opacity:{value:1},center:{value:new ke(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}}},on={basic:{uniforms:Rt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.fog]),vertexShader:je.meshbasic_vert,fragmentShader:je.meshbasic_frag},lambert:{uniforms:Rt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new ze(0)}}]),vertexShader:je.meshlambert_vert,fragmentShader:je.meshlambert_frag},phong:{uniforms:Rt([fe.common,fe.specularmap,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,fe.lights,{emissive:{value:new ze(0)},specular:{value:new ze(1118481)},shininess:{value:30}}]),vertexShader:je.meshphong_vert,fragmentShader:je.meshphong_frag},standard:{uniforms:Rt([fe.common,fe.envmap,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.roughnessmap,fe.metalnessmap,fe.fog,fe.lights,{emissive:{value:new ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag},toon:{uniforms:Rt([fe.common,fe.aomap,fe.lightmap,fe.emissivemap,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.gradientmap,fe.fog,fe.lights,{emissive:{value:new ze(0)}}]),vertexShader:je.meshtoon_vert,fragmentShader:je.meshtoon_frag},matcap:{uniforms:Rt([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,fe.fog,{matcap:{value:null}}]),vertexShader:je.meshmatcap_vert,fragmentShader:je.meshmatcap_frag},points:{uniforms:Rt([fe.points,fe.fog]),vertexShader:je.points_vert,fragmentShader:je.points_frag},dashed:{uniforms:Rt([fe.common,fe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:je.linedashed_vert,fragmentShader:je.linedashed_frag},depth:{uniforms:Rt([fe.common,fe.displacementmap]),vertexShader:je.depth_vert,fragmentShader:je.depth_frag},normal:{uniforms:Rt([fe.common,fe.bumpmap,fe.normalmap,fe.displacementmap,{opacity:{value:1}}]),vertexShader:je.meshnormal_vert,fragmentShader:je.meshnormal_frag},sprite:{uniforms:Rt([fe.sprite,fe.fog]),vertexShader:je.sprite_vert,fragmentShader:je.sprite_frag},background:{uniforms:{uvTransform:{value:new qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:je.background_vert,fragmentShader:je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new qe}},vertexShader:je.backgroundCube_vert,fragmentShader:je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:je.cube_vert,fragmentShader:je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:je.equirect_vert,fragmentShader:je.equirect_frag},distanceRGBA:{uniforms:Rt([fe.common,fe.displacementmap,{referencePosition:{value:new T},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:je.distanceRGBA_vert,fragmentShader:je.distanceRGBA_frag},shadow:{uniforms:Rt([fe.lights,fe.fog,{color:{value:new ze(0)},opacity:{value:1}}]),vertexShader:je.shadow_vert,fragmentShader:je.shadow_frag}};on.physical={uniforms:Rt([on.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qe},clearcoatNormalScale:{value:new ke(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qe},sheen:{value:0},sheenColor:{value:new ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qe},transmissionSamplerSize:{value:new ke},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qe},attenuationDistance:{value:0},attenuationColor:{value:new ze(0)},specularColor:{value:new ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qe},anisotropyVector:{value:new ke},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qe}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag};const _r={r:0,b:0,g:0},Gn=new Nt,ic=new Pe;function rc(i,e,t,n,r,a,o){const l=new ze(0);let s,c,u=a===!0?0:1,d=null,h=0,p=null;function m(g){let f=g.isScene===!0?g.background:null;return f&&f.isTexture&&(f=(g.backgroundBlurriness>0?t:e).get(f)),f}function v(g,f){g.getRGB(_r,il(i)),n.buffers.color.setClear(_r.r,_r.g,_r.b,f,o)}return{getClearColor:function(){return l},setClearColor:function(g,f=1){l.set(g),u=f,v(l,u)},getClearAlpha:function(){return u},setClearAlpha:function(g){u=g,v(l,u)},render:function(g){let f=!1;const x=m(g);x===null?v(l,u):x&&x.isColor&&(v(x,1),f=!0);const _=i.xr.getEnvironmentBlendMode();_==="additive"?n.buffers.color.setClear(0,0,0,1,o):_==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||f)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))},addToRenderList:function(g,f){const x=m(f);x&&(x.isCubeTexture||x.mapping===zr)?(c===void 0&&(c=new pt(new Zn(1,1,1),new Dn({name:"BackgroundCubeMaterial",uniforms:bi(on.backgroundCube.uniforms),vertexShader:on.backgroundCube.vertexShader,fragmentShader:on.backgroundCube.fragmentShader,side:It,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(_,y,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(c)),Gn.copy(f.backgroundRotation),Gn.x*=-1,Gn.y*=-1,Gn.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Gn.y*=-1,Gn.z*=-1),c.material.uniforms.envMap.value=x,c.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(ic.makeRotationFromEuler(Gn)),c.material.toneMapped=nt.getTransfer(x.colorSpace)!==ot,d===x&&h===x.version&&p===i.toneMapping||(c.material.needsUpdate=!0,d=x,h=x.version,p=i.toneMapping),c.layers.enableAll(),g.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(s===void 0&&(s=new pt(new Ai(2,2),new Dn({name:"BackgroundMaterial",uniforms:bi(on.background.uniforms),vertexShader:on.background.vertexShader,fragmentShader:on.background.fragmentShader,side:Ln,depthTest:!1,depthWrite:!1,fog:!1})),s.geometry.deleteAttribute("normal"),Object.defineProperty(s.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(s)),s.material.uniforms.t2D.value=x,s.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,s.material.toneMapped=nt.getTransfer(x.colorSpace)!==ot,x.matrixAutoUpdate===!0&&x.updateMatrix(),s.material.uniforms.uvTransform.value.copy(x.matrix),d===x&&h===x.version&&p===i.toneMapping||(s.material.needsUpdate=!0,d=x,h=x.version,p=i.toneMapping),s.layers.enableAll(),g.unshift(s,s.geometry,s.material,0,0,null))}}}function ac(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=c(null);let a=r,o=!1;function l(f){return i.bindVertexArray(f)}function s(f){return i.deleteVertexArray(f)}function c(f){const x=[],_=[],y=[];for(let C=0;C<t;C++)x[C]=0,_[C]=0,y[C]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:x,enabledAttributes:_,attributeDivisors:y,object:f,attributes:{},index:null}}function u(){const f=a.newAttributes;for(let x=0,_=f.length;x<_;x++)f[x]=0}function d(f){h(f,0)}function h(f,x){const _=a.newAttributes,y=a.enabledAttributes,C=a.attributeDivisors;_[f]=1,y[f]===0&&(i.enableVertexAttribArray(f),y[f]=1),C[f]!==x&&(i.vertexAttribDivisor(f,x),C[f]=x)}function p(){const f=a.newAttributes,x=a.enabledAttributes;for(let _=0,y=x.length;_<y;_++)x[_]!==f[_]&&(i.disableVertexAttribArray(_),x[_]=0)}function m(f,x,_,y,C,A,L){L===!0?i.vertexAttribIPointer(f,x,_,C,A):i.vertexAttribPointer(f,x,_,y,C,A)}function v(){g(),o=!0,a!==r&&(a=r,l(a.object))}function g(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:function(f,x,_,y,C){let A=!1;const L=function(Y,F,X){const V=X.wireframe===!0;let G=n[Y.id];G===void 0&&(G={},n[Y.id]=G);let Z=G[F.id];Z===void 0&&(Z={},G[F.id]=Z);let j=Z[V];return j===void 0&&(j=c(i.createVertexArray()),Z[V]=j),j}(y,_,x);a!==L&&(a=L,l(a.object)),A=function(Y,F,X,V){const G=a.attributes,Z=F.attributes;let j=0;const $=X.getAttributes();for(const Q in $)if($[Q].location>=0){const le=G[Q];let de=Z[Q];if(de===void 0&&(Q==="instanceMatrix"&&Y.instanceMatrix&&(de=Y.instanceMatrix),Q==="instanceColor"&&Y.instanceColor&&(de=Y.instanceColor)),le===void 0||le.attribute!==de||de&&le.data!==de.data)return!0;j++}return a.attributesNum!==j||a.index!==V}(f,y,_,C),A&&function(Y,F,X,V){const G={},Z=F.attributes;let j=0;const $=X.getAttributes();for(const Q in $)if($[Q].location>=0){let le=Z[Q];le===void 0&&(Q==="instanceMatrix"&&Y.instanceMatrix&&(le=Y.instanceMatrix),Q==="instanceColor"&&Y.instanceColor&&(le=Y.instanceColor));const de={};de.attribute=le,le&&le.data&&(de.data=le.data),G[Q]=de,j++}a.attributes=G,a.attributesNum=j,a.index=V}(f,y,_,C),C!==null&&e.update(C,i.ELEMENT_ARRAY_BUFFER),(A||o)&&(o=!1,function(Y,F,X,V){u();const G=V.attributes,Z=X.getAttributes(),j=F.defaultAttributeValues;for(const $ in Z){const Q=Z[$];if(Q.location>=0){let le=G[$];if(le===void 0&&($==="instanceMatrix"&&Y.instanceMatrix&&(le=Y.instanceMatrix),$==="instanceColor"&&Y.instanceColor&&(le=Y.instanceColor)),le!==void 0){const de=le.normalized,ge=le.itemSize,Le=e.get(le);if(Le===void 0)continue;const re=Le.buffer,ce=Le.type,ae=Le.bytesPerElement,ve=ce===i.INT||ce===i.UNSIGNED_INT||le.gpuType===ds;if(le.isInterleavedBufferAttribute){const w=le.data,S=w.stride,I=le.offset;if(w.isInstancedInterleavedBuffer){for(let K=0;K<Q.locationSize;K++)h(Q.location+K,w.meshPerAttribute);Y.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=w.meshPerAttribute*w.count)}else for(let K=0;K<Q.locationSize;K++)d(Q.location+K);i.bindBuffer(i.ARRAY_BUFFER,re);for(let K=0;K<Q.locationSize;K++)m(Q.location+K,ge/Q.locationSize,ce,de,S*ae,(I+ge/Q.locationSize*K)*ae,ve)}else{if(le.isInstancedBufferAttribute){for(let w=0;w<Q.locationSize;w++)h(Q.location+w,le.meshPerAttribute);Y.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let w=0;w<Q.locationSize;w++)d(Q.location+w);i.bindBuffer(i.ARRAY_BUFFER,re);for(let w=0;w<Q.locationSize;w++)m(Q.location+w,ge/Q.locationSize,ce,de,ge*ae,ge/Q.locationSize*w*ae,ve)}}else if(j!==void 0){const de=j[$];if(de!==void 0)switch(de.length){case 2:i.vertexAttrib2fv(Q.location,de);break;case 3:i.vertexAttrib3fv(Q.location,de);break;case 4:i.vertexAttrib4fv(Q.location,de);break;default:i.vertexAttrib1fv(Q.location,de)}}}}p()}(f,x,_,y),C!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(C).buffer))},reset:v,resetDefaultState:g,dispose:function(){v();for(const f in n){const x=n[f];for(const _ in x){const y=x[_];for(const C in y)s(y[C].object),delete y[C];delete x[_]}delete n[f]}},releaseStatesOfGeometry:function(f){if(n[f.id]===void 0)return;const x=n[f.id];for(const _ in x){const y=x[_];for(const C in y)s(y[C].object),delete y[C];delete x[_]}delete n[f.id]},releaseStatesOfProgram:function(f){for(const x in n){const _=n[x];if(_[f.id]===void 0)continue;const y=_[f.id];for(const C in y)s(y[C].object),delete y[C];delete _[f.id]}},initAttributes:u,enableAttribute:d,disableUnusedAttributes:p}}function sc(i,e,t){let n;function r(a,o,l){l!==0&&(i.drawArraysInstanced(n,a,o,l),t.update(o,n,l))}this.setMode=function(a){n=a},this.render=function(a,o){i.drawArrays(n,a,o),t.update(o,n,1)},this.renderInstances=r,this.renderMultiDraw=function(a,o,l){if(l===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,a,0,o,0,l);let s=0;for(let c=0;c<l;c++)s+=o[c];t.update(s,n,1)},this.renderMultiDrawInstances=function(a,o,l,s){if(l===0)return;const c=e.get("WEBGL_multi_draw");if(c===null)for(let u=0;u<a.length;u++)r(a[u],o[u],s[u]);else{c.multiDrawArraysInstancedWEBGL(n,a,0,o,0,s,0,l);let u=0;for(let d=0;d<l;d++)u+=o[d];for(let d=0;d<s.length;d++)t.update(u,n,s[d])}}}function oc(i,e,t,n){let r;function a(h){if(h==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";h="mediump"}return h==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let o=t.precision!==void 0?t.precision:"highp";const l=a(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const s=t.logarithmicDepthBuffer===!0,c=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control");if(c===!0){const h=e.get("EXT_clip_control");h.clipControlEXT(h.LOWER_LEFT_EXT,h.ZERO_TO_ONE_EXT)}const u=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),d=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS);return{isWebGL2:!0,getMaxAnisotropy:function(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const h=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(h.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r},getMaxPrecision:a,textureFormatReadable:function(h){return h===nn||n.convert(h)===i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(h){const p=h===Ki&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(h!==_n&&n.convert(h)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&h!==cn&&!p)},precision:o,logarithmicDepthBuffer:s,reverseDepthBuffer:c,maxTextures:u,maxVertexTextures:d,maxTextureSize:i.getParameter(i.MAX_TEXTURE_SIZE),maxCubemapSize:i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:i.getParameter(i.MAX_VERTEX_ATTRIBS),maxVertexUniforms:i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:i.getParameter(i.MAX_VARYING_VECTORS),maxFragmentUniforms:i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),vertexTextures:d>0,maxSamples:i.getParameter(i.MAX_SAMPLES)}}function lc(i){const e=this;let t=null,n=0,r=!1,a=!1;const o=new Cn,l=new qe,s={value:null,needsUpdate:!1};function c(u,d,h,p){const m=u!==null?u.length:0;let v=null;if(m!==0){if(v=s.value,p!==!0||v===null){const g=h+4*m,f=d.matrixWorldInverse;l.getNormalMatrix(f),(v===null||v.length<g)&&(v=new Float32Array(g));for(let x=0,_=h;x!==m;++x,_+=4)o.copy(u[x]).applyMatrix4(f,l),o.normal.toArray(v,_),v[_+3]=o.constant}s.value=v,s.needsUpdate=!0}return e.numPlanes=m,e.numIntersection=0,v}this.uniform=s,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const h=u.length!==0||d||n!==0||r;return r=d,n=u.length,h},this.beginShadows=function(){a=!0,c(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(u,d){t=c(u,d,0)},this.setState=function(u,d,h){const p=u.clippingPlanes,m=u.clipIntersection,v=u.clipShadows,g=i.get(u);if(!r||p===null||p.length===0||a&&!v)a?c(null):function(){s.value!==t&&(s.value=t,s.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}();else{const f=a?0:n,x=4*f;let _=g.clippingState||null;s.value=_,_=c(p,d,x,h);for(let y=0;y!==x;++y)_[y]=t[y];g.clippingState=_,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=f}}}function cc(i){let e=new WeakMap;function t(r,a){return a===Da?r.mapping=xi:a===Ua&&(r.mapping=Mi),r}function n(r){const a=r.target;a.removeEventListener("dispose",n);const o=e.get(a);o!==void 0&&(e.delete(a),o.dispose())}return{get:function(r){if(r&&r.isTexture){const a=r.mapping;if(a===Da||a===Ua){if(e.has(r))return t(e.get(r).texture,r.mapping);{const o=r.image;if(o&&o.height>0){const l=new Ql(o.height);return l.fromEquirectangularTexture(i,r),e.set(r,l),r.addEventListener("dispose",n),t(l.texture,r.mapping)}return null}}}return r},dispose:function(){e=new WeakMap}}}class ys extends Ss{constructor(e=-1,t=1,n=1,r=-1,a=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=a,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,a,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let a=n-e,o=n+e,l=r+t,s=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,o=a+c*this.view.width,l-=u*this.view.offsetY,s=l-u*this.view.height}this.projectionMatrix.makeOrthographic(a,o,l,s,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Js=[.125,.215,.35,.446,.526,.582],Fi=20,_a=new ys,$s=new ze;let va=null,xa=0,Ma=0,Sa=!1;const kn=(1+Math.sqrt(5))/2,ui=1/kn,Qs=[new T(-kn,ui,0),new T(kn,ui,0),new T(-ui,0,kn),new T(ui,0,kn),new T(0,kn,-ui),new T(0,kn,ui),new T(-1,1,-1),new T(1,1,-1),new T(-1,1,1),new T(1,1,1)];class eo{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){va=this._renderer.getRenderTarget(),xa=this._renderer.getActiveCubeFace(),Ma=this._renderer.getActiveMipmapLevel(),Sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(e,n,r,a),t>0&&this._blur(a,0,0,t),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=io(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=no(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(va,xa,Ma),this._renderer.xr.enabled=Sa,e.scissorTest=!1,vr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===xi||e.mapping===Mi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),va=this._renderer.getRenderTarget(),xa=this._renderer.getActiveCubeFace(),Ma=this._renderer.getActiveMipmapLevel(),Sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:ln,minFilter:ln,generateMipmaps:!1,type:Ki,format:nn,colorSpace:Un,depthBuffer:!1},r=to(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=to(e,t,n);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=function(o){const l=[],s=[],c=[];let u=o;const d=o-4+1+Js.length;for(let h=0;h<d;h++){const p=Math.pow(2,u);s.push(p);let m=1/p;h>o-4?m=Js[h-o+4-1]:h===0&&(m=0),c.push(m);const v=1/(p-2),g=-v,f=1+v,x=[g,g,f,g,f,f,g,g,f,f,g,f],_=6,y=6,C=3,A=2,L=1,Y=new Float32Array(C*y*_),F=new Float32Array(A*y*_),X=new Float32Array(L*y*_);for(let G=0;G<_;G++){const Z=G%3*2/3-1,j=G>2?0:-1,$=[Z,j,0,Z+2/3,j,0,Z+2/3,j+1,0,Z,j,0,Z+2/3,j+1,0,Z,j+1,0];Y.set($,C*y*G),F.set(x,A*y*G);const Q=[G,G,G,G,G,G];X.set(Q,L*y*G)}const V=new Ot;V.setAttribute("position",new zt(Y,C)),V.setAttribute("uv",new zt(F,A)),V.setAttribute("faceIndex",new zt(X,L)),l.push(V),u>4&&u--}return{lodPlanes:l,sizeLods:s,sigmas:c}}(a)),this._blurMaterial=function(o,l,s){const c=new Float32Array(Fi),u=new T(0,1,0);return new Dn({name:"SphericalGaussianBlur",defines:{n:Fi,CUBEUV_TEXEL_WIDTH:1/l,CUBEUV_TEXEL_HEIGHT:1/s,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:c},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:u}},vertexShader:Es(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}(a,e,t)}return r}_compileMaterial(e){const t=new pt(this._lodPlanes[0],e);this._renderer.compile(t,_a)}_sceneToCubeUV(e,t,n,r){const a=new kt(90,1,t,n),o=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],s=this._renderer,c=s.autoClear,u=s.toneMapping;s.getClearColor($s),s.toneMapping=Pn,s.autoClear=!1;const d=new Xn({name:"PMREM.Background",side:It,depthWrite:!1,depthTest:!1}),h=new pt(new Zn,d);let p=!1;const m=e.background;m?m.isColor&&(d.color.copy(m),e.background=null,p=!0):(d.color.copy($s),p=!0);for(let v=0;v<6;v++){const g=v%3;g===0?(a.up.set(0,o[v],0),a.lookAt(l[v],0,0)):g===1?(a.up.set(0,0,o[v]),a.lookAt(0,l[v],0)):(a.up.set(0,o[v],0),a.lookAt(0,0,l[v]));const f=this._cubeSize;vr(r,g*f,v>2?f:0,f,f),s.setRenderTarget(r),p&&s.render(h,a),s.render(e,a)}h.geometry.dispose(),h.material.dispose(),s.toneMapping=u,s.autoClear=c,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===xi||e.mapping===Mi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=io()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=no());const a=r?this._cubemapMaterial:this._equirectMaterial,o=new pt(this._lodPlanes[0],a);a.uniforms.envMap.value=e;const l=this._cubeSize;vr(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,_a)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let a=1;a<r;a++){const o=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),l=Qs[(r-a-1)%Qs.length];this._blur(e,a-1,a,o,l)}t.autoClear=n}_blur(e,t,n,r,a){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,r,"latitudinal",a),this._halfBlur(o,e,n,n,r,"longitudinal",a)}_halfBlur(e,t,n,r,a,o,l){const s=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=new pt(this._lodPlanes[r],c),d=c.uniforms,h=this._sizeLods[n]-1,p=isFinite(a)?Math.PI/(2*h):2*Math.PI/39,m=a/p,v=isFinite(a)?1+Math.floor(3*m):Fi;v>Fi&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${v} samples when the maximum is set to 20`);const g=[];let f=0;for(let y=0;y<Fi;++y){const C=y/m,A=Math.exp(-C*C/2);g.push(A),y===0?f+=A:y<v&&(f+=2*A)}for(let y=0;y<g.length;y++)g[y]=g[y]/f;d.envMap.value=e.texture,d.samples.value=v,d.weights.value=g,d.latitudinal.value=o==="latitudinal",l&&(d.poleAxis.value=l);const{_lodMax:x}=this;d.dTheta.value=p,d.mipInt.value=x-n;const _=this._sizeLods[r];vr(t,3*_*(r>x-4?r-x+4:0),4*(this._cubeSize-_),3*_,2*_),s.setRenderTarget(t),s.render(u,_a)}}function to(i,e,t){const n=new qn(i,e,t);return n.texture.mapping=zr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function vr(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function no(){return new Dn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Es(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function io(){return new Dn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Es(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function Es(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function uc(i){let e=new WeakMap,t=null;function n(r){const a=r.target;a.removeEventListener("dispose",n);const o=e.get(a);o!==void 0&&(e.delete(a),o.dispose())}return{get:function(r){if(r&&r.isTexture){const a=r.mapping,o=a===Da||a===Ua,l=a===xi||a===Mi;if(o||l){let s=e.get(r);const c=s!==void 0?s.texture.pmremVersion:0;if(r.isRenderTargetTexture&&r.pmremVersion!==c)return t===null&&(t=new eo(i)),s=o?t.fromEquirectangular(r,s):t.fromCubemap(r,s),s.texture.pmremVersion=r.pmremVersion,e.set(r,s),s.texture;if(s!==void 0)return s.texture;{const u=r.image;return o&&u&&u.height>0||l&&u&&function(d){let h=0;const p=6;for(let m=0;m<p;m++)d[m]!==void 0&&h++;return h===p}(u)?(t===null&&(t=new eo(i)),s=o?t.fromEquirectangular(r):t.fromCubemap(r),s.texture.pmremVersion=r.pmremVersion,e.set(r,s),r.addEventListener("dispose",n),s.texture):null}}}return r},dispose:function(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}}}function hc(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&Rr("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function dc(i,e,t,n){const r={},a=new WeakMap;function o(s){const c=s.target;c.index!==null&&e.remove(c.index);for(const d in c.attributes)e.remove(c.attributes[d]);for(const d in c.morphAttributes){const h=c.morphAttributes[d];for(let p=0,m=h.length;p<m;p++)e.remove(h[p])}c.removeEventListener("dispose",o),delete r[c.id];const u=a.get(c);u&&(e.remove(u),a.delete(c)),n.releaseStatesOfGeometry(c),c.isInstancedBufferGeometry===!0&&delete c._maxInstanceCount,t.memory.geometries--}function l(s){const c=[],u=s.index,d=s.attributes.position;let h=0;if(u!==null){const v=u.array;h=u.version;for(let g=0,f=v.length;g<f;g+=3){const x=v[g+0],_=v[g+1],y=v[g+2];c.push(x,_,_,y,y,x)}}else{if(d===void 0)return;{const v=d.array;h=d.version;for(let g=0,f=v.length/3-1;g<f;g+=3){const x=g+0,_=g+1,y=g+2;c.push(x,_,_,y,y,x)}}}const p=new(Jo(c)?nl:tl)(c,1);p.version=h;const m=a.get(s);m&&e.remove(m),a.set(s,p)}return{get:function(s,c){return r[c.id]===!0||(c.addEventListener("dispose",o),r[c.id]=!0,t.memory.geometries++),c},update:function(s){const c=s.attributes;for(const d in c)e.update(c[d],i.ARRAY_BUFFER);const u=s.morphAttributes;for(const d in u){const h=u[d];for(let p=0,m=h.length;p<m;p++)e.update(h[p],i.ARRAY_BUFFER)}},getWireframeAttribute:function(s){const c=a.get(s);if(c){const u=s.index;u!==null&&c.version<u.version&&l(s)}else l(s);return a.get(s)}}}function pc(i,e,t){let n,r,a;function o(l,s,c){c!==0&&(i.drawElementsInstanced(n,s,r,l*a,c),t.update(s,n,c))}this.setMode=function(l){n=l},this.setIndex=function(l){r=l.type,a=l.bytesPerElement},this.render=function(l,s){i.drawElements(n,s,r,l*a),t.update(s,n,1)},this.renderInstances=o,this.renderMultiDraw=function(l,s,c){if(c===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,s,0,r,l,0,c);let u=0;for(let d=0;d<c;d++)u+=s[d];t.update(u,n,1)},this.renderMultiDrawInstances=function(l,s,c,u){if(c===0)return;const d=e.get("WEBGL_multi_draw");if(d===null)for(let h=0;h<l.length;h++)o(l[h]/a,s[h],u[h]);else{d.multiDrawElementsInstancedWEBGL(n,s,0,r,l,0,u,0,c);let h=0;for(let p=0;p<c;p++)h+=s[p];for(let p=0;p<u.length;p++)t.update(h,n,u[p])}}}function fc(i){const e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,n,r){switch(e.calls++,n){case i.TRIANGLES:e.triangles+=r*(t/3);break;case i.LINES:e.lines+=r*(t/2);break;case i.LINE_STRIP:e.lines+=r*(t-1);break;case i.LINE_LOOP:e.lines+=r*t;break;case i.POINTS:e.points+=r*t;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",n)}}}}function mc(i,e,t){const n=new WeakMap,r=new it;return{update:function(a,o,l){const s=a.morphTargetInfluences,c=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=c!==void 0?c.length:0;let d=n.get(o);if(d===void 0||d.count!==u){let Y=function(){A.dispose(),n.delete(o),o.removeEventListener("dispose",Y)};d!==void 0&&d.texture.dispose();const h=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,v=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],f=o.morphAttributes.color||[];let x=0;h===!0&&(x=1),p===!0&&(x=2),m===!0&&(x=3);let _=o.attributes.position.count*x,y=1;_>e.maxTextureSize&&(y=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);const C=new Float32Array(_*y*4*u),A=new Qo(C,_,y,u);A.type=cn,A.needsUpdate=!0;const L=4*x;for(let F=0;F<u;F++){const X=v[F],V=g[F],G=f[F],Z=_*y*4*F;for(let j=0;j<X.count;j++){const $=j*L;h===!0&&(r.fromBufferAttribute(X,j),C[Z+$+0]=r.x,C[Z+$+1]=r.y,C[Z+$+2]=r.z,C[Z+$+3]=0),p===!0&&(r.fromBufferAttribute(V,j),C[Z+$+4]=r.x,C[Z+$+5]=r.y,C[Z+$+6]=r.z,C[Z+$+7]=0),m===!0&&(r.fromBufferAttribute(G,j),C[Z+$+8]=r.x,C[Z+$+9]=r.y,C[Z+$+10]=r.z,C[Z+$+11]=G.itemSize===4?r.w:1)}}d={count:u,texture:A,size:new ke(_,y)},n.set(o,d),o.addEventListener("dispose",Y)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let h=0;for(let m=0;m<s.length;m++)h+=s[m];const p=o.morphTargetsRelative?1:1-h;l.getUniforms().setValue(i,"morphTargetBaseInfluence",p),l.getUniforms().setValue(i,"morphTargetInfluences",s)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}}}function gc(i,e,t,n){let r=new WeakMap;function a(o){const l=o.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:function(o){const l=n.render.frame,s=o.geometry,c=e.get(o,s);if(r.get(c)!==l&&(e.update(c),r.set(c,l)),o.isInstancedMesh&&(o.hasEventListener("dispose",a)===!1&&o.addEventListener("dispose",a),r.get(o)!==l&&(t.update(o.instanceMatrix,i.ARRAY_BUFFER),o.instanceColor!==null&&t.update(o.instanceColor,i.ARRAY_BUFFER),r.set(o,l))),o.isSkinnedMesh){const u=o.skeleton;r.get(u)!==l&&(u.update(),r.set(u,l))}return c},dispose:function(){r=new WeakMap}}}class sl extends At{constructor(e,t,n,r,a,o,l,s,c,u=1026){if(u!==qi&&u!==yi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===qi&&(n=jn),n===void 0&&u===yi&&(n=Si),super(null,r,a,o,l,s,u,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=l!==void 0?l:Xt,this.minFilter=s!==void 0?s:Xt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const ol=new At,ro=new sl(1,1),ll=new Qo,cl=new Hl,ul=new rl,ao=[],so=[],oo=new Float32Array(16),lo=new Float32Array(9),co=new Float32Array(4);function Ri(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let a=ao[r];if(a===void 0&&(a=new Float32Array(r),ao[r]=a),e!==0){n.toArray(a,0);for(let o=1,l=0;o!==e;++o)l+=t,i[o].toArray(a,l)}return a}function vt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function xt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Vr(i,e){let t=so[e];t===void 0&&(t=new Int32Array(e),so[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function _c(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function vc(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(vt(t,e))return;i.uniform2fv(this.addr,e),xt(t,e)}}function xc(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(vt(t,e))return;i.uniform3fv(this.addr,e),xt(t,e)}}function Mc(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(vt(t,e))return;i.uniform4fv(this.addr,e),xt(t,e)}}function Sc(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(vt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),xt(t,e)}else{if(vt(t,n))return;co.set(n),i.uniformMatrix2fv(this.addr,!1,co),xt(t,n)}}function yc(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(vt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),xt(t,e)}else{if(vt(t,n))return;lo.set(n),i.uniformMatrix3fv(this.addr,!1,lo),xt(t,n)}}function Ec(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(vt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),xt(t,e)}else{if(vt(t,n))return;oo.set(n),i.uniformMatrix4fv(this.addr,!1,oo),xt(t,n)}}function bc(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Tc(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(vt(t,e))return;i.uniform2iv(this.addr,e),xt(t,e)}}function wc(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(vt(t,e))return;i.uniform3iv(this.addr,e),xt(t,e)}}function Ac(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(vt(t,e))return;i.uniform4iv(this.addr,e),xt(t,e)}}function Rc(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Cc(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(vt(t,e))return;i.uniform2uiv(this.addr,e),xt(t,e)}}function Pc(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(vt(t,e))return;i.uniform3uiv(this.addr,e),xt(t,e)}}function Lc(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(vt(t,e))return;i.uniform4uiv(this.addr,e),xt(t,e)}}function Dc(i,e,t){const n=this.cache,r=t.allocateTextureUnit();let a;n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),this.type===i.SAMPLER_2D_SHADOW?(ro.compareFunction=Zo,a=ro):a=ol,t.setTexture2D(e||a,r)}function Uc(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||cl,r)}function Ic(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||ul,r)}function Nc(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||ll,r)}function Oc(i,e){i.uniform1fv(this.addr,e)}function Fc(i,e){const t=Ri(e,this.size,2);i.uniform2fv(this.addr,t)}function Bc(i,e){const t=Ri(e,this.size,3);i.uniform3fv(this.addr,t)}function zc(i,e){const t=Ri(e,this.size,4);i.uniform4fv(this.addr,t)}function Hc(i,e){const t=Ri(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Gc(i,e){const t=Ri(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Vc(i,e){const t=Ri(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function kc(i,e){i.uniform1iv(this.addr,e)}function Wc(i,e){i.uniform2iv(this.addr,e)}function Xc(i,e){i.uniform3iv(this.addr,e)}function jc(i,e){i.uniform4iv(this.addr,e)}function qc(i,e){i.uniform1uiv(this.addr,e)}function Yc(i,e){i.uniform2uiv(this.addr,e)}function Kc(i,e){i.uniform3uiv(this.addr,e)}function Zc(i,e){i.uniform4uiv(this.addr,e)}function Jc(i,e,t){const n=this.cache,r=e.length,a=Vr(t,r);vt(n,a)||(i.uniform1iv(this.addr,a),xt(n,a));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||ol,a[o])}function $c(i,e,t){const n=this.cache,r=e.length,a=Vr(t,r);vt(n,a)||(i.uniform1iv(this.addr,a),xt(n,a));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||cl,a[o])}function Qc(i,e,t){const n=this.cache,r=e.length,a=Vr(t,r);vt(n,a)||(i.uniform1iv(this.addr,a),xt(n,a));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||ul,a[o])}function eu(i,e,t){const n=this.cache,r=e.length,a=Vr(t,r);vt(n,a)||(i.uniform1iv(this.addr,a),xt(n,a));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||ll,a[o])}class tu{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=function(r){switch(r){case 5126:return _c;case 35664:return vc;case 35665:return xc;case 35666:return Mc;case 35674:return Sc;case 35675:return yc;case 35676:return Ec;case 5124:case 35670:return bc;case 35667:case 35671:return Tc;case 35668:case 35672:return wc;case 35669:case 35673:return Ac;case 5125:return Rc;case 36294:return Cc;case 36295:return Pc;case 36296:return Lc;case 35678:case 36198:case 36298:case 36306:case 35682:return Dc;case 35679:case 36299:case 36307:return Uc;case 35680:case 36300:case 36308:case 36293:return Ic;case 36289:case 36303:case 36311:case 36292:return Nc}}(t.type)}}class nu{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=function(r){switch(r){case 5126:return Oc;case 35664:return Fc;case 35665:return Bc;case 35666:return zc;case 35674:return Hc;case 35675:return Gc;case 35676:return Vc;case 5124:case 35670:return kc;case 35667:case 35671:return Wc;case 35668:case 35672:return Xc;case 35669:case 35673:return jc;case 5125:return qc;case 36294:return Yc;case 36295:return Kc;case 36296:return Zc;case 35678:case 36198:case 36298:case 36306:case 35682:return Jc;case 35679:case 36299:case 36307:return $c;case 35680:case 36300:case 36308:case 36293:return Qc;case 36289:case 36303:case 36311:case 36292:return eu}}(t.type)}}class iu{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let a=0,o=r.length;a!==o;++a){const l=r[a];l.setValue(e,t[l.id],n)}}}const ya=/(\w+)(\])?(\[|\.)?/g;function uo(i,e){i.seq.push(e),i.map[e.id]=e}function ru(i,e,t){const n=i.name,r=n.length;for(ya.lastIndex=0;;){const a=ya.exec(n),o=ya.lastIndex;let l=a[1];const s=a[2]==="]",c=a[3];if(s&&(l|=0),c===void 0||c==="["&&o+2===r){uo(t,c===void 0?new tu(l,i,e):new nu(l,i,e));break}{let u=t.map[l];u===void 0&&(u=new iu(l),uo(t,u)),t=u}}}class Cr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const a=e.getActiveUniform(t,r);ru(a,e.getUniformLocation(t,a.name),this)}}setValue(e,t,n,r){const a=this.map[t];a!==void 0&&a.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let a=0,o=t.length;a!==o;++a){const l=t[a],s=n[l.id];s.needsUpdate!==!1&&l.setValue(e,s.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,a=e.length;r!==a;++r){const o=e[r];o.id in t&&n.push(o)}return n}}function ho(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const au=37297;let su=0;function po(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+function(l,s){const c=l.split(`
`),u=[],d=Math.max(s-6,0),h=Math.min(s+6,c.length);for(let p=d;p<h;p++){const m=p+1;u.push(`${m===s?">":" "} ${m}: ${c[p]}`)}return u.join(`
`)}(i.getShaderSource(e),o)}return r}function ou(i,e){const t=function(n){const r=nt.getPrimaries(nt.workingColorSpace),a=nt.getPrimaries(n);let o;switch(r===a?o="":r===Ur&&a===Dr?o="LinearDisplayP3ToLinearSRGB":r===Dr&&a===Ur&&(o="LinearSRGBToLinearDisplayP3"),n){case Un:case Hr:return[o,"LinearTransferOETF"];case Vt:case xs:return[o,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[o,"LinearTransferOETF"]}}(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function lu(i,e){let t;switch(e){case wl:t="Linear";break;case Al:t="Reinhard";break;case Rl:t="Cineon";break;case zo:t="ACESFilmic";break;case Pl:t="AgX";break;case Ll:t="Neutral";break;case Cl:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const xr=new T;function cu(){return nt.getLuminanceCoefficients(xr),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${xr.x.toFixed(4)}, ${xr.y.toFixed(4)}, ${xr.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Bi(i){return i!==""}function fo(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function mo(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const uu=/^[ \t]*#include +<([\w\d./]+)>/gm;function ls(i){return i.replace(uu,du)}const hu=new Map;function du(i,e){let t=je[e];if(t===void 0){const n=hu.get(e);if(n===void 0)throw new Error("Can not resolve #include <"+e+">");t=je[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n)}return ls(t)}const pu=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function go(i){return i.replace(pu,fu)}function fu(i,e,t,n){let r="";for(let a=parseInt(e);a<parseInt(t);a++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function _o(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function mu(i,e,t,n){const r=i.getContext(),a=t.defines;let o=t.vertexShader,l=t.fragmentShader;const s=function(V){let G="SHADOWMAP_TYPE_BASIC";return V.shadowMapType===Oo?G="SHADOWMAP_TYPE_PCF":V.shadowMapType===Fo?G="SHADOWMAP_TYPE_PCF_SOFT":V.shadowMapType===gn&&(G="SHADOWMAP_TYPE_VSM"),G}(t),c=function(V){let G="ENVMAP_TYPE_CUBE";if(V.envMap)switch(V.envMapMode){case xi:case Mi:G="ENVMAP_TYPE_CUBE";break;case zr:G="ENVMAP_TYPE_CUBE_UV"}return G}(t),u=function(V){let G="ENVMAP_MODE_REFLECTION";return V.envMap&&V.envMapMode===Mi&&(G="ENVMAP_MODE_REFRACTION"),G}(t),d=function(V){let G="ENVMAP_BLENDING_NONE";if(V.envMap)switch(V.combine){case Bo:G="ENVMAP_BLENDING_MULTIPLY";break;case bl:G="ENVMAP_BLENDING_MIX";break;case Tl:G="ENVMAP_BLENDING_ADD"}return G}(t),h=function(V){const G=V.envMapCubeUVHeight;if(G===null)return null;const Z=Math.log2(G)-2,j=1/G;return{texelWidth:1/(3*Math.max(Math.pow(2,Z),112)),texelHeight:j,maxMip:Z}}(t),p=function(V){return[V.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",V.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Bi).join(`
`)}(t),m=function(V){const G=[];for(const Z in V){const j=V[Z];j!==!1&&G.push("#define "+Z+" "+j)}return G.join(`
`)}(a),v=r.createProgram();let g,f,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Bi).join(`
`),g.length>0&&(g+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Bi).join(`
`),f.length>0&&(f+=`
`)):(g=[_o(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+s:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Bi).join(`
`),f=[_o(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+s:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Pn?"#define TONE_MAPPING":"",t.toneMapping!==Pn?je.tonemapping_pars_fragment:"",t.toneMapping!==Pn?lu("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",je.colorspace_pars_fragment,ou("linearToOutputTexel",t.outputColorSpace),cu(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Bi).join(`
`)),o=ls(o),o=fo(o,t),o=mo(o,t),l=ls(l),l=fo(l,t),l=mo(l,t),o=go(o),l=go(l),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,f=["#define varying in",t.glslVersion===Us?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Us?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const _=x+g+o,y=x+f+l,C=ho(r,r.VERTEX_SHADER,_),A=ho(r,r.FRAGMENT_SHADER,y);function L(V){if(i.debug.checkShaderErrors){const G=r.getProgramInfoLog(v).trim(),Z=r.getShaderInfoLog(C).trim(),j=r.getShaderInfoLog(A).trim();let $=!0,Q=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if($=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,v,C,A);else{const le=po(r,C,"vertex"),de=po(r,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+V.name+`
Material Type: `+V.type+`

Program Info Log: `+G+`
`+le+`
`+de)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):Z!==""&&j!==""||(Q=!1);Q&&(V.diagnostics={runnable:$,programLog:G,vertexShader:{log:Z,prefix:g},fragmentShader:{log:j,prefix:f}})}r.deleteShader(C),r.deleteShader(A),Y=new Cr(r,v),F=function(G,Z){const j={},$=G.getProgramParameter(Z,G.ACTIVE_ATTRIBUTES);for(let Q=0;Q<$;Q++){const le=G.getActiveAttrib(Z,Q),de=le.name;let ge=1;le.type===G.FLOAT_MAT2&&(ge=2),le.type===G.FLOAT_MAT3&&(ge=3),le.type===G.FLOAT_MAT4&&(ge=4),j[de]={type:le.type,location:G.getAttribLocation(Z,de),locationSize:ge}}return j}(r,v)}let Y,F;r.attachShader(v,C),r.attachShader(v,A),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v),this.getUniforms=function(){return Y===void 0&&L(this),Y},this.getAttributes=function(){return F===void 0&&L(this),F};let X=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return X===!1&&(X=r.getProgramParameter(v,au)),X},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=su++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=C,this.fragmentShader=A,this}let gu=0;class _u{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),a=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(a)===!1&&(o.add(a),a.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new vu(e),t.set(e,n)),n}}class vu{constructor(e){this.id=gu++,this.code=e,this.usedTimes=0}}function xu(i,e,t,n,r,a,o){const l=new Ms,s=new _u,c=new Set,u=[],d=r.logarithmicDepthBuffer,h=r.reverseDepthBuffer,p=r.vertexTextures;let m=r.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(f){return c.add(f),f===0?"uv":`uv${f}`}return{getParameters:function(f,x,_,y,C){const A=y.fog,L=C.geometry,Y=f.isMeshStandardMaterial?y.environment:null,F=(f.isMeshStandardMaterial?t:e).get(f.envMap||Y),X=F&&F.mapping===zr?F.image.height:null,V=v[f.type];f.precision!==null&&(m=r.getMaxPrecision(f.precision),m!==f.precision&&console.warn("THREE.WebGLProgram.getParameters:",f.precision,"not supported, using",m,"instead."));const G=L.morphAttributes.position||L.morphAttributes.normal||L.morphAttributes.color,Z=G!==void 0?G.length:0;let j,$,Q,le,de=0;if(L.morphAttributes.position!==void 0&&(de=1),L.morphAttributes.normal!==void 0&&(de=2),L.morphAttributes.color!==void 0&&(de=3),V){const In=on[V];j=In.vertexShader,$=In.fragmentShader}else j=f.vertexShader,$=f.fragmentShader,s.update(f),Q=s.getVertexShaderID(f),le=s.getFragmentShaderID(f);const ge=i.getRenderTarget(),Le=C.isInstancedMesh===!0,re=C.isBatchedMesh===!0,ce=!!f.map,ae=!!f.matcap,ve=!!F,w=!!f.aoMap,S=!!f.lightMap,I=!!f.bumpMap,K=!!f.normalMap,N=!!f.displacementMap,z=!!f.emissiveMap,b=!!f.metalnessMap,H=!!f.roughnessMap,W=f.anisotropy>0,ue=f.clearcoat>0,k=f.dispersion>0,oe=f.iridescence>0,he=f.sheen>0,ie=f.transmission>0,Me=W&&!!f.anisotropyMap,xe=ue&&!!f.clearcoatMap,we=ue&&!!f.clearcoatNormalMap,De=ue&&!!f.clearcoatRoughnessMap,We=oe&&!!f.iridescenceMap,He=oe&&!!f.iridescenceThicknessMap,Ae=he&&!!f.sheenColorMap,$e=he&&!!f.sheenRoughnessMap,Oe=!!f.specularMap,rt=!!f.specularColorMap,Se=!!f.specularIntensityMap,Ve=ie&&!!f.transmissionMap,tt=ie&&!!f.thicknessMap,Pt=!!f.gradientMap,qt=!!f.alphaMap,bt=f.alphaTest>0,_t=!!f.alphaHash,Lt=!!f.extensions;let D=Pn;f.toneMapped&&(ge!==null&&ge.isXRRenderTarget!==!0||(D=i.toneMapping));const an={shaderID:V,shaderType:f.type,shaderName:f.name,vertexShader:j,fragmentShader:$,defines:f.defines,customVertexShaderID:Q,customFragmentShaderID:le,isRawShaderMaterial:f.isRawShaderMaterial===!0,glslVersion:f.glslVersion,precision:m,batching:re,batchingColor:re&&C._colorsTexture!==null,instancing:Le,instancingColor:Le&&C.instanceColor!==null,instancingMorph:Le&&C.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:ge===null?i.outputColorSpace:ge.isXRRenderTarget===!0?ge.texture.colorSpace:Un,alphaToCoverage:!!f.alphaToCoverage,map:ce,matcap:ae,envMap:ve,envMapMode:ve&&F.mapping,envMapCubeUVHeight:X,aoMap:w,lightMap:S,bumpMap:I,normalMap:K,displacementMap:p&&N,emissiveMap:z,normalMapObjectSpace:K&&f.normalMapType===1,normalMapTangentSpace:K&&f.normalMapType===0,metalnessMap:b,roughnessMap:H,anisotropy:W,anisotropyMap:Me,clearcoat:ue,clearcoatMap:xe,clearcoatNormalMap:we,clearcoatRoughnessMap:De,dispersion:k,iridescence:oe,iridescenceMap:We,iridescenceThicknessMap:He,sheen:he,sheenColorMap:Ae,sheenRoughnessMap:$e,specularMap:Oe,specularColorMap:rt,specularIntensityMap:Se,transmission:ie,transmissionMap:Ve,thicknessMap:tt,gradientMap:Pt,opaque:f.transparent===!1&&f.blending===1&&f.alphaToCoverage===!1,alphaMap:qt,alphaTest:bt,alphaHash:_t,combine:f.combine,mapUv:ce&&g(f.map.channel),aoMapUv:w&&g(f.aoMap.channel),lightMapUv:S&&g(f.lightMap.channel),bumpMapUv:I&&g(f.bumpMap.channel),normalMapUv:K&&g(f.normalMap.channel),displacementMapUv:N&&g(f.displacementMap.channel),emissiveMapUv:z&&g(f.emissiveMap.channel),metalnessMapUv:b&&g(f.metalnessMap.channel),roughnessMapUv:H&&g(f.roughnessMap.channel),anisotropyMapUv:Me&&g(f.anisotropyMap.channel),clearcoatMapUv:xe&&g(f.clearcoatMap.channel),clearcoatNormalMapUv:we&&g(f.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:De&&g(f.clearcoatRoughnessMap.channel),iridescenceMapUv:We&&g(f.iridescenceMap.channel),iridescenceThicknessMapUv:He&&g(f.iridescenceThicknessMap.channel),sheenColorMapUv:Ae&&g(f.sheenColorMap.channel),sheenRoughnessMapUv:$e&&g(f.sheenRoughnessMap.channel),specularMapUv:Oe&&g(f.specularMap.channel),specularColorMapUv:rt&&g(f.specularColorMap.channel),specularIntensityMapUv:Se&&g(f.specularIntensityMap.channel),transmissionMapUv:Ve&&g(f.transmissionMap.channel),thicknessMapUv:tt&&g(f.thicknessMap.channel),alphaMapUv:qt&&g(f.alphaMap.channel),vertexTangents:!!L.attributes.tangent&&(K||W),vertexColors:f.vertexColors,vertexAlphas:f.vertexColors===!0&&!!L.attributes.color&&L.attributes.color.itemSize===4,pointsUvs:C.isPoints===!0&&!!L.attributes.uv&&(ce||qt),fog:!!A,useFog:f.fog===!0,fogExp2:!!A&&A.isFogExp2,flatShading:f.flatShading===!0,sizeAttenuation:f.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:h,skinning:C.isSkinnedMesh===!0,morphTargets:L.morphAttributes.position!==void 0,morphNormals:L.morphAttributes.normal!==void 0,morphColors:L.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:de,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:f.dithering,shadowMapEnabled:i.shadowMap.enabled&&_.length>0,shadowMapType:i.shadowMap.type,toneMapping:D,decodeVideoTexture:ce&&f.map.isVideoTexture===!0&&nt.getTransfer(f.map.colorSpace)===ot,premultipliedAlpha:f.premultipliedAlpha,doubleSided:f.side===2,flipSided:f.side===It,useDepthPacking:f.depthPacking>=0,depthPacking:f.depthPacking||0,index0AttributeName:f.index0AttributeName,extensionClipCullDistance:Lt&&f.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Lt&&f.extensions.multiDraw===!0||re)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:f.customProgramCacheKey()};return an.vertexUv1s=c.has(1),an.vertexUv2s=c.has(2),an.vertexUv3s=c.has(3),c.clear(),an},getProgramCacheKey:function(f){const x=[];if(f.shaderID?x.push(f.shaderID):(x.push(f.customVertexShaderID),x.push(f.customFragmentShaderID)),f.defines!==void 0)for(const _ in f.defines)x.push(_),x.push(f.defines[_]);return f.isRawShaderMaterial===!1&&(function(_,y){_.push(y.precision),_.push(y.outputColorSpace),_.push(y.envMapMode),_.push(y.envMapCubeUVHeight),_.push(y.mapUv),_.push(y.alphaMapUv),_.push(y.lightMapUv),_.push(y.aoMapUv),_.push(y.bumpMapUv),_.push(y.normalMapUv),_.push(y.displacementMapUv),_.push(y.emissiveMapUv),_.push(y.metalnessMapUv),_.push(y.roughnessMapUv),_.push(y.anisotropyMapUv),_.push(y.clearcoatMapUv),_.push(y.clearcoatNormalMapUv),_.push(y.clearcoatRoughnessMapUv),_.push(y.iridescenceMapUv),_.push(y.iridescenceThicknessMapUv),_.push(y.sheenColorMapUv),_.push(y.sheenRoughnessMapUv),_.push(y.specularMapUv),_.push(y.specularColorMapUv),_.push(y.specularIntensityMapUv),_.push(y.transmissionMapUv),_.push(y.thicknessMapUv),_.push(y.combine),_.push(y.fogExp2),_.push(y.sizeAttenuation),_.push(y.morphTargetsCount),_.push(y.morphAttributeCount),_.push(y.numDirLights),_.push(y.numPointLights),_.push(y.numSpotLights),_.push(y.numSpotLightMaps),_.push(y.numHemiLights),_.push(y.numRectAreaLights),_.push(y.numDirLightShadows),_.push(y.numPointLightShadows),_.push(y.numSpotLightShadows),_.push(y.numSpotLightShadowsWithMaps),_.push(y.numLightProbes),_.push(y.shadowMapType),_.push(y.toneMapping),_.push(y.numClippingPlanes),_.push(y.numClipIntersection),_.push(y.depthPacking)}(x,f),function(_,y){l.disableAll(),y.supportsVertexTextures&&l.enable(0),y.instancing&&l.enable(1),y.instancingColor&&l.enable(2),y.instancingMorph&&l.enable(3),y.matcap&&l.enable(4),y.envMap&&l.enable(5),y.normalMapObjectSpace&&l.enable(6),y.normalMapTangentSpace&&l.enable(7),y.clearcoat&&l.enable(8),y.iridescence&&l.enable(9),y.alphaTest&&l.enable(10),y.vertexColors&&l.enable(11),y.vertexAlphas&&l.enable(12),y.vertexUv1s&&l.enable(13),y.vertexUv2s&&l.enable(14),y.vertexUv3s&&l.enable(15),y.vertexTangents&&l.enable(16),y.anisotropy&&l.enable(17),y.alphaHash&&l.enable(18),y.batching&&l.enable(19),y.dispersion&&l.enable(20),y.batchingColor&&l.enable(21),_.push(l.mask),l.disableAll(),y.fog&&l.enable(0),y.useFog&&l.enable(1),y.flatShading&&l.enable(2),y.logarithmicDepthBuffer&&l.enable(3),y.reverseDepthBuffer&&l.enable(4),y.skinning&&l.enable(5),y.morphTargets&&l.enable(6),y.morphNormals&&l.enable(7),y.morphColors&&l.enable(8),y.premultipliedAlpha&&l.enable(9),y.shadowMapEnabled&&l.enable(10),y.doubleSided&&l.enable(11),y.flipSided&&l.enable(12),y.useDepthPacking&&l.enable(13),y.dithering&&l.enable(14),y.transmission&&l.enable(15),y.sheen&&l.enable(16),y.opaque&&l.enable(17),y.pointsUvs&&l.enable(18),y.decodeVideoTexture&&l.enable(19),y.alphaToCoverage&&l.enable(20),_.push(l.mask)}(x,f),x.push(i.outputColorSpace)),x.push(f.customProgramCacheKey),x.join()},getUniforms:function(f){const x=v[f.type];let _;if(x){const y=on[x];_=Jl.clone(y.uniforms)}else _=f.uniforms;return _},acquireProgram:function(f,x){let _;for(let y=0,C=u.length;y<C;y++){const A=u[y];if(A.cacheKey===x){_=A,++_.usedTimes;break}}return _===void 0&&(_=new mu(i,x,f,a),u.push(_)),_},releaseProgram:function(f){if(--f.usedTimes==0){const x=u.indexOf(f);u[x]=u[u.length-1],u.pop(),f.destroy()}},releaseShaderCache:function(f){s.remove(f)},programs:u,dispose:function(){s.dispose()}}}function Mu(){let i=new WeakMap;return{has:function(e){return i.has(e)},get:function(e){let t=i.get(e);return t===void 0&&(t={},i.set(e,t)),t},remove:function(e){i.delete(e)},update:function(e,t,n){i.get(e)[t]=n},dispose:function(){i=new WeakMap}}}function Su(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function vo(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function xo(){const i=[];let e=0;const t=[],n=[],r=[];function a(o,l,s,c,u,d){let h=i[e];return h===void 0?(h={id:o.id,object:o,geometry:l,material:s,groupOrder:c,renderOrder:o.renderOrder,z:u,group:d},i[e]=h):(h.id=o.id,h.object=o,h.geometry=l,h.material=s,h.groupOrder=c,h.renderOrder=o.renderOrder,h.z=u,h.group=d),e++,h}return{opaque:t,transmissive:n,transparent:r,init:function(){e=0,t.length=0,n.length=0,r.length=0},push:function(o,l,s,c,u,d){const h=a(o,l,s,c,u,d);s.transmission>0?n.push(h):s.transparent===!0?r.push(h):t.push(h)},unshift:function(o,l,s,c,u,d){const h=a(o,l,s,c,u,d);s.transmission>0?n.unshift(h):s.transparent===!0?r.unshift(h):t.unshift(h)},finish:function(){for(let o=e,l=i.length;o<l;o++){const s=i[o];if(s.id===null)break;s.id=null,s.object=null,s.geometry=null,s.material=null,s.group=null}},sort:function(o,l){t.length>1&&t.sort(o||Su),n.length>1&&n.sort(l||vo),r.length>1&&r.sort(l||vo)}}}function yu(){let i=new WeakMap;return{get:function(e,t){const n=i.get(e);let r;return n===void 0?(r=new xo,i.set(e,[r])):t>=n.length?(r=new xo,n.push(r)):r=n[t],r},dispose:function(){i=new WeakMap}}}function Eu(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new T,color:new ze};break;case"SpotLight":t={position:new T,direction:new T,color:new ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new T,color:new ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new T,skyColor:new ze,groundColor:new ze};break;case"RectAreaLight":t={color:new ze,position:new T,halfWidth:new T,halfHeight:new T}}return i[e.id]=t,t}}}let bu=0;function Tu(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function wu(i){const e=new Eu,t=function(){const l={};return{get:function(s){if(l[s.id]!==void 0)return l[s.id];let c;switch(s.type){case"DirectionalLight":case"SpotLight":c={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ke};break;case"PointLight":c={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ke,shadowCameraNear:1,shadowCameraFar:1e3}}return l[s.id]=c,c}}}(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new T);const r=new T,a=new Pe,o=new Pe;return{setup:function(l){let s=0,c=0,u=0;for(let L=0;L<9;L++)n.probe[L].set(0,0,0);let d=0,h=0,p=0,m=0,v=0,g=0,f=0,x=0,_=0,y=0,C=0;l.sort(Tu);for(let L=0,Y=l.length;L<Y;L++){const F=l[L],X=F.color,V=F.intensity,G=F.distance,Z=F.shadow&&F.shadow.map?F.shadow.map.texture:null;if(F.isAmbientLight)s+=X.r*V,c+=X.g*V,u+=X.b*V;else if(F.isLightProbe){for(let j=0;j<9;j++)n.probe[j].addScaledVector(F.sh.coefficients[j],V);C++}else if(F.isDirectionalLight){const j=e.get(F);if(j.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){const $=F.shadow,Q=t.get(F);Q.shadowIntensity=$.intensity,Q.shadowBias=$.bias,Q.shadowNormalBias=$.normalBias,Q.shadowRadius=$.radius,Q.shadowMapSize=$.mapSize,n.directionalShadow[d]=Q,n.directionalShadowMap[d]=Z,n.directionalShadowMatrix[d]=F.shadow.matrix,g++}n.directional[d]=j,d++}else if(F.isSpotLight){const j=e.get(F);j.position.setFromMatrixPosition(F.matrixWorld),j.color.copy(X).multiplyScalar(V),j.distance=G,j.coneCos=Math.cos(F.angle),j.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),j.decay=F.decay,n.spot[p]=j;const $=F.shadow;if(F.map&&(n.spotLightMap[_]=F.map,_++,$.updateMatrices(F),F.castShadow&&y++),n.spotLightMatrix[p]=$.matrix,F.castShadow){const Q=t.get(F);Q.shadowIntensity=$.intensity,Q.shadowBias=$.bias,Q.shadowNormalBias=$.normalBias,Q.shadowRadius=$.radius,Q.shadowMapSize=$.mapSize,n.spotShadow[p]=Q,n.spotShadowMap[p]=Z,x++}p++}else if(F.isRectAreaLight){const j=e.get(F);j.color.copy(X).multiplyScalar(V),j.halfWidth.set(.5*F.width,0,0),j.halfHeight.set(0,.5*F.height,0),n.rectArea[m]=j,m++}else if(F.isPointLight){const j=e.get(F);if(j.color.copy(F.color).multiplyScalar(F.intensity),j.distance=F.distance,j.decay=F.decay,F.castShadow){const $=F.shadow,Q=t.get(F);Q.shadowIntensity=$.intensity,Q.shadowBias=$.bias,Q.shadowNormalBias=$.normalBias,Q.shadowRadius=$.radius,Q.shadowMapSize=$.mapSize,Q.shadowCameraNear=$.camera.near,Q.shadowCameraFar=$.camera.far,n.pointShadow[h]=Q,n.pointShadowMap[h]=Z,n.pointShadowMatrix[h]=F.shadow.matrix,f++}n.point[h]=j,h++}else if(F.isHemisphereLight){const j=e.get(F);j.skyColor.copy(F.color).multiplyScalar(V),j.groundColor.copy(F.groundColor).multiplyScalar(V),n.hemi[v]=j,v++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=fe.LTC_FLOAT_1,n.rectAreaLTC2=fe.LTC_FLOAT_2):(n.rectAreaLTC1=fe.LTC_HALF_1,n.rectAreaLTC2=fe.LTC_HALF_2)),n.ambient[0]=s,n.ambient[1]=c,n.ambient[2]=u;const A=n.hash;A.directionalLength===d&&A.pointLength===h&&A.spotLength===p&&A.rectAreaLength===m&&A.hemiLength===v&&A.numDirectionalShadows===g&&A.numPointShadows===f&&A.numSpotShadows===x&&A.numSpotMaps===_&&A.numLightProbes===C||(n.directional.length=d,n.spot.length=p,n.rectArea.length=m,n.point.length=h,n.hemi.length=v,n.directionalShadow.length=g,n.directionalShadowMap.length=g,n.pointShadow.length=f,n.pointShadowMap.length=f,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=g,n.pointShadowMatrix.length=f,n.spotLightMatrix.length=x+_-y,n.spotLightMap.length=_,n.numSpotLightShadowsWithMaps=y,n.numLightProbes=C,A.directionalLength=d,A.pointLength=h,A.spotLength=p,A.rectAreaLength=m,A.hemiLength=v,A.numDirectionalShadows=g,A.numPointShadows=f,A.numSpotShadows=x,A.numSpotMaps=_,A.numLightProbes=C,n.version=bu++)},setupView:function(l,s){let c=0,u=0,d=0,h=0,p=0;const m=s.matrixWorldInverse;for(let v=0,g=l.length;v<g;v++){const f=l[v];if(f.isDirectionalLight){const x=n.directional[c];x.direction.setFromMatrixPosition(f.matrixWorld),r.setFromMatrixPosition(f.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),c++}else if(f.isSpotLight){const x=n.spot[d];x.position.setFromMatrixPosition(f.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(f.matrixWorld),r.setFromMatrixPosition(f.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),d++}else if(f.isRectAreaLight){const x=n.rectArea[h];x.position.setFromMatrixPosition(f.matrixWorld),x.position.applyMatrix4(m),o.identity(),a.copy(f.matrixWorld),a.premultiply(m),o.extractRotation(a),x.halfWidth.set(.5*f.width,0,0),x.halfHeight.set(0,.5*f.height,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),h++}else if(f.isPointLight){const x=n.point[u];x.position.setFromMatrixPosition(f.matrixWorld),x.position.applyMatrix4(m),u++}else if(f.isHemisphereLight){const x=n.hemi[p];x.direction.setFromMatrixPosition(f.matrixWorld),x.direction.transformDirection(m),p++}}},state:n}}function Mo(i){const e=new wu(i),t=[],n=[],r={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:function(a){r.camera=a,t.length=0,n.length=0},state:r,setupLights:function(){e.setup(t)},setupLightsView:function(a){e.setupView(t,a)},pushLight:function(a){t.push(a)},pushShadow:function(a){n.push(a)}}}function Au(i){let e=new WeakMap;return{get:function(t,n=0){const r=e.get(t);let a;return r===void 0?(a=new Mo(i),e.set(t,[a])):n>=r.length?(a=new Mo(i),r.push(a)):a=r[n],a},dispose:function(){e=new WeakMap}}}class Ru extends wi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Cu extends wi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function Pu(i,e,t){let n=new Gr;const r=new ke,a=new ke,o=new it,l=new Ru({depthPacking:3201}),s=new Cu,c={},u=t.maxTextureSize,d={[Ln]:It,[It]:Ln,2:2},h=new Dn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ke},radius:{value:4}},vertexShader:`void main() {
	gl_Position = vec4( position, 1.0 );
}`,fragmentShader:`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`}),p=h.clone();p.defines.HORIZONTAL_PASS=1;const m=new Ot;m.setAttribute("position",new zt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new pt(m,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Oo;let f=this.type;function x(A,L){const Y=e.update(v);h.defines.VSM_SAMPLES!==A.blurSamples&&(h.defines.VSM_SAMPLES=A.blurSamples,p.defines.VSM_SAMPLES=A.blurSamples,h.needsUpdate=!0,p.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new qn(r.x,r.y)),h.uniforms.shadow_pass.value=A.map.texture,h.uniforms.resolution.value=A.mapSize,h.uniforms.radius.value=A.radius,i.setRenderTarget(A.mapPass),i.clear(),i.renderBufferDirect(L,null,Y,h,v,null),p.uniforms.shadow_pass.value=A.mapPass.texture,p.uniforms.resolution.value=A.mapSize,p.uniforms.radius.value=A.radius,i.setRenderTarget(A.map),i.clear(),i.renderBufferDirect(L,null,Y,p,v,null)}function _(A,L,Y,F){let X=null;const V=Y.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(V!==void 0)X=V;else if(X=Y.isPointLight===!0?s:l,i.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0){const G=X.uuid,Z=L.uuid;let j=c[G];j===void 0&&(j={},c[G]=j);let $=j[Z];$===void 0&&($=X.clone(),j[Z]=$,L.addEventListener("dispose",C)),X=$}return X.visible=L.visible,X.wireframe=L.wireframe,X.side=F===gn?L.shadowSide!==null?L.shadowSide:L.side:L.shadowSide!==null?L.shadowSide:d[L.side],X.alphaMap=L.alphaMap,X.alphaTest=L.alphaTest,X.map=L.map,X.clipShadows=L.clipShadows,X.clippingPlanes=L.clippingPlanes,X.clipIntersection=L.clipIntersection,X.displacementMap=L.displacementMap,X.displacementScale=L.displacementScale,X.displacementBias=L.displacementBias,X.wireframeLinewidth=L.wireframeLinewidth,X.linewidth=L.linewidth,Y.isPointLight===!0&&X.isMeshDistanceMaterial===!0&&(i.properties.get(X).light=Y),X}function y(A,L,Y,F,X){if(A.visible===!1)return;if(A.layers.test(L.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&X===gn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,A.matrixWorld);const G=e.update(A),Z=A.material;if(Array.isArray(Z)){const j=G.groups;for(let $=0,Q=j.length;$<Q;$++){const le=j[$],de=Z[le.materialIndex];if(de&&de.visible){const ge=_(A,de,F,X);A.onBeforeShadow(i,A,L,Y,G,ge,le),i.renderBufferDirect(Y,null,G,ge,A,le),A.onAfterShadow(i,A,L,Y,G,ge,le)}}}else if(Z.visible){const j=_(A,Z,F,X);A.onBeforeShadow(i,A,L,Y,G,j,null),i.renderBufferDirect(Y,null,G,j,A,null),A.onAfterShadow(i,A,L,Y,G,j,null)}}const V=A.children;for(let G=0,Z=V.length;G<Z;G++)y(V[G],L,Y,F,X)}function C(A){A.target.removeEventListener("dispose",C);for(const L in c){const Y=c[L],F=A.target.uuid;F in Y&&(Y[F].dispose(),delete Y[F])}}this.render=function(A,L,Y){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||A.length===0)return;const F=i.getRenderTarget(),X=i.getActiveCubeFace(),V=i.getActiveMipmapLevel(),G=i.state;G.setBlending(0),G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);const Z=f!==gn&&this.type===gn,j=f===gn&&this.type!==gn;for(let $=0,Q=A.length;$<Q;$++){const le=A[$],de=le.shadow;if(de===void 0){console.warn("THREE.WebGLShadowMap:",le,"has no shadow.");continue}if(de.autoUpdate===!1&&de.needsUpdate===!1)continue;r.copy(de.mapSize);const ge=de.getFrameExtents();if(r.multiply(ge),a.copy(de.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(a.x=Math.floor(u/ge.x),r.x=a.x*ge.x,de.mapSize.x=a.x),r.y>u&&(a.y=Math.floor(u/ge.y),r.y=a.y*ge.y,de.mapSize.y=a.y)),de.map===null||Z===!0||j===!0){const re=this.type!==gn?{minFilter:Xt,magFilter:Xt}:{};de.map!==null&&de.map.dispose(),de.map=new qn(r.x,r.y,re),de.map.texture.name=le.name+".shadowMap",de.camera.updateProjectionMatrix()}i.setRenderTarget(de.map),i.clear();const Le=de.getViewportCount();for(let re=0;re<Le;re++){const ce=de.getViewport(re);o.set(a.x*ce.x,a.y*ce.y,a.x*ce.z,a.y*ce.w),G.viewport(o),de.updateMatrices(le,re),n=de.getFrustum(),y(L,Y,de.camera,le,this.type)}de.isPointLightShadow!==!0&&this.type===gn&&x(de,Y),de.needsUpdate=!1}f=this.type,g.needsUpdate=!1,i.setRenderTarget(F,X,V)}}const Lu={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3};function Du(i){const e=new function(){let b=!1;const H=new it;let W=null;const ue=new it(0,0,0,0);return{setMask:function(k){W===k||b||(i.colorMask(k,k,k,k),W=k)},setLocked:function(k){b=k},setClear:function(k,oe,he,ie,Me){Me===!0&&(k*=ie,oe*=ie,he*=ie),H.set(k,oe,he,ie),ue.equals(H)===!1&&(i.clearColor(k,oe,he,ie),ue.copy(H))},reset:function(){b=!1,W=null,ue.set(-1,0,0,0)}}},t=new function(){let b=!1,H=!1,W=null,ue=null,k=null;return{setReversed:function(oe){H=oe},setTest:function(oe){oe?ae(i.DEPTH_TEST):ve(i.DEPTH_TEST)},setMask:function(oe){W===oe||b||(i.depthMask(oe),W=oe)},setFunc:function(oe){if(H&&(oe=Lu[oe]),ue!==oe){switch(oe){case 0:i.depthFunc(i.NEVER);break;case 1:i.depthFunc(i.ALWAYS);break;case 2:i.depthFunc(i.LESS);break;case 3:default:i.depthFunc(i.LEQUAL);break;case 4:i.depthFunc(i.EQUAL);break;case 5:i.depthFunc(i.GEQUAL);break;case 6:i.depthFunc(i.GREATER);break;case 7:i.depthFunc(i.NOTEQUAL)}ue=oe}},setLocked:function(oe){b=oe},setClear:function(oe){k!==oe&&(i.clearDepth(oe),k=oe)},reset:function(){b=!1,W=null,ue=null,k=null}}},n=new function(){let b=!1,H=null,W=null,ue=null,k=null,oe=null,he=null,ie=null,Me=null;return{setTest:function(xe){b||(xe?ae(i.STENCIL_TEST):ve(i.STENCIL_TEST))},setMask:function(xe){H===xe||b||(i.stencilMask(xe),H=xe)},setFunc:function(xe,we,De){W===xe&&ue===we&&k===De||(i.stencilFunc(xe,we,De),W=xe,ue=we,k=De)},setOp:function(xe,we,De){oe===xe&&he===we&&ie===De||(i.stencilOp(xe,we,De),oe=xe,he=we,ie=De)},setLocked:function(xe){b=xe},setClear:function(xe){Me!==xe&&(i.clearStencil(xe),Me=xe)},reset:function(){b=!1,H=null,W=null,ue=null,k=null,oe=null,he=null,ie=null,Me=null}}},r=new WeakMap,a=new WeakMap;let o={},l={},s=new WeakMap,c=[],u=null,d=!1,h=null,p=null,m=null,v=null,g=null,f=null,x=null,_=new ze(0,0,0),y=0,C=!1,A=null,L=null,Y=null,F=null,X=null;const V=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,Z=0;const j=i.getParameter(i.VERSION);j.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(j)[1]),G=Z>=1):j.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),G=Z>=2);let $=null,Q={};const le=i.getParameter(i.SCISSOR_BOX),de=i.getParameter(i.VIEWPORT),ge=new it().fromArray(le),Le=new it().fromArray(de);function re(b,H,W,ue){const k=new Uint8Array(4),oe=i.createTexture();i.bindTexture(b,oe),i.texParameteri(b,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(b,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let he=0;he<W;he++)b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY?i.texImage3D(H,0,i.RGBA,1,1,ue,0,i.RGBA,i.UNSIGNED_BYTE,k):i.texImage2D(H+he,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,k);return oe}const ce={};function ae(b){o[b]!==!0&&(i.enable(b),o[b]=!0)}function ve(b){o[b]!==!1&&(i.disable(b),o[b]=!1)}ce[i.TEXTURE_2D]=re(i.TEXTURE_2D,i.TEXTURE_2D,1),ce[i.TEXTURE_CUBE_MAP]=re(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),ce[i.TEXTURE_2D_ARRAY]=re(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),ce[i.TEXTURE_3D]=re(i.TEXTURE_3D,i.TEXTURE_3D,1,1),e.setClear(0,0,0,1),t.setClear(1),n.setClear(0),ae(i.DEPTH_TEST),t.setFunc(3),K(!1),N(1),ae(i.CULL_FACE),I(0);const w={[Wn]:i.FUNC_ADD,101:i.FUNC_SUBTRACT,102:i.FUNC_REVERSE_SUBTRACT};w[103]=i.MIN,w[104]=i.MAX;const S={200:i.ZERO,201:i.ONE,202:i.SRC_COLOR,[Pa]:i.SRC_ALPHA,210:i.SRC_ALPHA_SATURATE,208:i.DST_COLOR,206:i.DST_ALPHA,203:i.ONE_MINUS_SRC_COLOR,[La]:i.ONE_MINUS_SRC_ALPHA,209:i.ONE_MINUS_DST_COLOR,207:i.ONE_MINUS_DST_ALPHA,211:i.CONSTANT_COLOR,212:i.ONE_MINUS_CONSTANT_COLOR,213:i.CONSTANT_ALPHA,214:i.ONE_MINUS_CONSTANT_ALPHA};function I(b,H,W,ue,k,oe,he,ie,Me,xe){if(b!==0){if(d===!1&&(ae(i.BLEND),d=!0),b===5)k=k||H,oe=oe||W,he=he||ue,H===p&&k===g||(i.blendEquationSeparate(w[H],w[k]),p=H,g=k),W===m&&ue===v&&oe===f&&he===x||(i.blendFuncSeparate(S[W],S[ue],S[oe],S[he]),m=W,v=ue,f=oe,x=he),ie.equals(_)!==!1&&Me===y||(i.blendColor(ie.r,ie.g,ie.b,Me),_.copy(ie),y=Me),h=b,C=!1;else if(b!==h||xe!==C){if(p===Wn&&g===Wn||(i.blendEquation(i.FUNC_ADD),p=Wn,g=Wn),xe)switch(b){case 1:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case 2:i.blendFunc(i.ONE,i.ONE);break;case 3:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case 4:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",b)}else switch(b){case 1:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case 2:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case 3:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case 4:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",b)}m=null,v=null,f=null,x=null,_.set(0,0,0),y=0,h=b,C=xe}}else d===!0&&(ve(i.BLEND),d=!1)}function K(b){A!==b&&(b?i.frontFace(i.CW):i.frontFace(i.CCW),A=b)}function N(b){b!==0?(ae(i.CULL_FACE),b!==L&&(b===1?i.cullFace(i.BACK):b===2?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):ve(i.CULL_FACE),L=b}function z(b,H,W){b?(ae(i.POLYGON_OFFSET_FILL),F===H&&X===W||(i.polygonOffset(H,W),F=H,X=W)):ve(i.POLYGON_OFFSET_FILL)}return{buffers:{color:e,depth:t,stencil:n},enable:ae,disable:ve,bindFramebuffer:function(b,H){return l[b]!==H&&(i.bindFramebuffer(b,H),l[b]=H,b===i.DRAW_FRAMEBUFFER&&(l[i.FRAMEBUFFER]=H),b===i.FRAMEBUFFER&&(l[i.DRAW_FRAMEBUFFER]=H),!0)},drawBuffers:function(b,H){let W=c,ue=!1;if(b){W=s.get(H),W===void 0&&(W=[],s.set(H,W));const k=b.textures;if(W.length!==k.length||W[0]!==i.COLOR_ATTACHMENT0){for(let oe=0,he=k.length;oe<he;oe++)W[oe]=i.COLOR_ATTACHMENT0+oe;W.length=k.length,ue=!0}}else W[0]!==i.BACK&&(W[0]=i.BACK,ue=!0);ue&&i.drawBuffers(W)},useProgram:function(b){return u!==b&&(i.useProgram(b),u=b,!0)},setBlending:I,setMaterial:function(b,H){b.side===2?ve(i.CULL_FACE):ae(i.CULL_FACE);let W=b.side===It;H&&(W=!W),K(W),b.blending===1&&b.transparent===!1?I(0):I(b.blending,b.blendEquation,b.blendSrc,b.blendDst,b.blendEquationAlpha,b.blendSrcAlpha,b.blendDstAlpha,b.blendColor,b.blendAlpha,b.premultipliedAlpha),t.setFunc(b.depthFunc),t.setTest(b.depthTest),t.setMask(b.depthWrite),e.setMask(b.colorWrite);const ue=b.stencilWrite;n.setTest(ue),ue&&(n.setMask(b.stencilWriteMask),n.setFunc(b.stencilFunc,b.stencilRef,b.stencilFuncMask),n.setOp(b.stencilFail,b.stencilZFail,b.stencilZPass)),z(b.polygonOffset,b.polygonOffsetFactor,b.polygonOffsetUnits),b.alphaToCoverage===!0?ae(i.SAMPLE_ALPHA_TO_COVERAGE):ve(i.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:K,setCullFace:N,setLineWidth:function(b){b!==Y&&(G&&i.lineWidth(b),Y=b)},setPolygonOffset:z,setScissorTest:function(b){b?ae(i.SCISSOR_TEST):ve(i.SCISSOR_TEST)},activeTexture:function(b){b===void 0&&(b=i.TEXTURE0+V-1),$!==b&&(i.activeTexture(b),$=b)},bindTexture:function(b,H,W){W===void 0&&(W=$===null?i.TEXTURE0+V-1:$);let ue=Q[W];ue===void 0&&(ue={type:void 0,texture:void 0},Q[W]=ue),ue.type===b&&ue.texture===H||($!==W&&(i.activeTexture(W),$=W),i.bindTexture(b,H||ce[b]),ue.type=b,ue.texture=H)},unbindTexture:function(){const b=Q[$];b!==void 0&&b.type!==void 0&&(i.bindTexture(b.type,null),b.type=void 0,b.texture=void 0)},compressedTexImage2D:function(){try{i.compressedTexImage2D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},compressedTexImage3D:function(){try{i.compressedTexImage3D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},texImage2D:function(){try{i.texImage2D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},texImage3D:function(){try{i.texImage3D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},updateUBOMapping:function(b,H){let W=a.get(H);W===void 0&&(W=new WeakMap,a.set(H,W));let ue=W.get(b);ue===void 0&&(ue=i.getUniformBlockIndex(H,b.name),W.set(b,ue))},uniformBlockBinding:function(b,H){const W=a.get(H).get(b);r.get(H)!==W&&(i.uniformBlockBinding(H,W,b.__bindingPointIndex),r.set(H,W))},texStorage2D:function(){try{i.texStorage2D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},texStorage3D:function(){try{i.texStorage3D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},texSubImage2D:function(){try{i.texSubImage2D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},texSubImage3D:function(){try{i.texSubImage3D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},compressedTexSubImage2D:function(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},compressedTexSubImage3D:function(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},scissor:function(b){ge.equals(b)===!1&&(i.scissor(b.x,b.y,b.z,b.w),ge.copy(b))},viewport:function(b){Le.equals(b)===!1&&(i.viewport(b.x,b.y,b.z,b.w),Le.copy(b))},reset:function(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),o={},$=null,Q={},l={},s=new WeakMap,c=[],u=null,d=!1,h=null,p=null,m=null,v=null,g=null,f=null,x=null,_=new ze(0,0,0),y=0,C=!1,A=null,L=null,Y=null,F=null,X=null,ge.set(0,0,i.canvas.width,i.canvas.height),Le.set(0,0,i.canvas.width,i.canvas.height),e.reset(),t.reset(),n.reset()}}}function So(i,e,t,n){const r=function(a){switch(a){case _n:case Go:return{byteLength:1,components:1};case ji:case Vo:case Ki:return{byteLength:2,components:1};case ps:case fs:return{byteLength:2,components:4};case jn:case ds:case cn:return{byteLength:4,components:1};case ko:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${a}.`)}(n);switch(t){case Wo:case jo:return i*e;case qo:return i*e*2;case ms:case gs:return i*e/r.components*r.byteLength;case Yo:case _s:return i*e*2/r.components*r.byteLength;case Xo:return i*e*3/r.components*r.byteLength;case nn:case vs:return i*e*4/r.components*r.byteLength;case Er:case br:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Tr:case wr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Oa:case Ba:return Math.max(i,16)*Math.max(e,8)/4;case Na:case Fa:return Math.max(i,8)*Math.max(e,8)/2;case za:case Ha:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ga:case Va:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ka:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Wa:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Xa:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case ja:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case qa:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Ya:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Ka:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Za:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Ja:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case $a:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Qa:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case es:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case ts:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ar:case ns:case is:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Ko:case rs:return Math.ceil(i/4)*Math.ceil(e/4)*8;case as:case ss:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Uu(i,e,t,n,r,a,o){const l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,s=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),c=new ke,u=new WeakMap;let d;const h=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(w,S){return p?new OffscreenCanvas(w,S):Nr("canvas")}function v(w,S,I){let K=1;const N=ve(w);if((N.width>I||N.height>I)&&(K=I/Math.max(N.width,N.height)),K<1){if(typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&w instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&w instanceof ImageBitmap||typeof VideoFrame<"u"&&w instanceof VideoFrame){const z=Math.floor(K*N.width),b=Math.floor(K*N.height);d===void 0&&(d=m(z,b));const H=S?m(z,b):d;return H.width=z,H.height=b,H.getContext("2d").drawImage(w,0,0,z,b),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+N.width+"x"+N.height+") to ("+z+"x"+b+")."),H}return"data"in w&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+N.width+"x"+N.height+")."),w}return w}function g(w){return w.generateMipmaps&&w.minFilter!==Xt&&w.minFilter!==ln}function f(w){i.generateMipmap(w)}function x(w,S,I,K,N=!1){if(w!==null){if(i[w]!==void 0)return i[w];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+w+"'")}let z=S;if(S===i.RED&&(I===i.FLOAT&&(z=i.R32F),I===i.HALF_FLOAT&&(z=i.R16F),I===i.UNSIGNED_BYTE&&(z=i.R8)),S===i.RED_INTEGER&&(I===i.UNSIGNED_BYTE&&(z=i.R8UI),I===i.UNSIGNED_SHORT&&(z=i.R16UI),I===i.UNSIGNED_INT&&(z=i.R32UI),I===i.BYTE&&(z=i.R8I),I===i.SHORT&&(z=i.R16I),I===i.INT&&(z=i.R32I)),S===i.RG&&(I===i.FLOAT&&(z=i.RG32F),I===i.HALF_FLOAT&&(z=i.RG16F),I===i.UNSIGNED_BYTE&&(z=i.RG8)),S===i.RG_INTEGER&&(I===i.UNSIGNED_BYTE&&(z=i.RG8UI),I===i.UNSIGNED_SHORT&&(z=i.RG16UI),I===i.UNSIGNED_INT&&(z=i.RG32UI),I===i.BYTE&&(z=i.RG8I),I===i.SHORT&&(z=i.RG16I),I===i.INT&&(z=i.RG32I)),S===i.RGB_INTEGER&&(I===i.UNSIGNED_BYTE&&(z=i.RGB8UI),I===i.UNSIGNED_SHORT&&(z=i.RGB16UI),I===i.UNSIGNED_INT&&(z=i.RGB32UI),I===i.BYTE&&(z=i.RGB8I),I===i.SHORT&&(z=i.RGB16I),I===i.INT&&(z=i.RGB32I)),S===i.RGBA_INTEGER&&(I===i.UNSIGNED_BYTE&&(z=i.RGBA8UI),I===i.UNSIGNED_SHORT&&(z=i.RGBA16UI),I===i.UNSIGNED_INT&&(z=i.RGBA32UI),I===i.BYTE&&(z=i.RGBA8I),I===i.SHORT&&(z=i.RGBA16I),I===i.INT&&(z=i.RGBA32I)),S===i.RGB&&I===i.UNSIGNED_INT_5_9_9_9_REV&&(z=i.RGB9_E5),S===i.RGBA){const b=N?Lr:nt.getTransfer(K);I===i.FLOAT&&(z=i.RGBA32F),I===i.HALF_FLOAT&&(z=i.RGBA16F),I===i.UNSIGNED_BYTE&&(z=b===ot?i.SRGB8_ALPHA8:i.RGBA8),I===i.UNSIGNED_SHORT_4_4_4_4&&(z=i.RGBA4),I===i.UNSIGNED_SHORT_5_5_5_1&&(z=i.RGB5_A1)}return z!==i.R16F&&z!==i.R32F&&z!==i.RG16F&&z!==i.RG32F&&z!==i.RGBA16F&&z!==i.RGBA32F||e.get("EXT_color_buffer_float"),z}function _(w,S){let I;return w?S===null||S===jn||S===Si?I=i.DEPTH24_STENCIL8:S===cn?I=i.DEPTH32F_STENCIL8:S===ji&&(I=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===jn||S===Si?I=i.DEPTH_COMPONENT24:S===cn?I=i.DEPTH_COMPONENT32F:S===ji&&(I=i.DEPTH_COMPONENT16),I}function y(w,S){return g(w)===!0||w.isFramebufferTexture&&w.minFilter!==Xt&&w.minFilter!==ln?Math.log2(Math.max(S.width,S.height))+1:w.mipmaps!==void 0&&w.mipmaps.length>0?w.mipmaps.length:w.isCompressedTexture&&Array.isArray(w.image)?S.mipmaps.length:1}function C(w){const S=w.target;S.removeEventListener("dispose",C),function(I){const K=n.get(I);if(K.__webglInit===void 0)return;const N=I.source,z=h.get(N);if(z){const b=z[K.__cacheKey];b.usedTimes--,b.usedTimes===0&&L(I),Object.keys(z).length===0&&h.delete(N)}n.remove(I)}(S),S.isVideoTexture&&u.delete(S)}function A(w){const S=w.target;S.removeEventListener("dispose",A),function(I){const K=n.get(I);if(I.depthTexture&&I.depthTexture.dispose(),I.isWebGLCubeRenderTarget)for(let z=0;z<6;z++){if(Array.isArray(K.__webglFramebuffer[z]))for(let b=0;b<K.__webglFramebuffer[z].length;b++)i.deleteFramebuffer(K.__webglFramebuffer[z][b]);else i.deleteFramebuffer(K.__webglFramebuffer[z]);K.__webglDepthbuffer&&i.deleteRenderbuffer(K.__webglDepthbuffer[z])}else{if(Array.isArray(K.__webglFramebuffer))for(let z=0;z<K.__webglFramebuffer.length;z++)i.deleteFramebuffer(K.__webglFramebuffer[z]);else i.deleteFramebuffer(K.__webglFramebuffer);if(K.__webglDepthbuffer&&i.deleteRenderbuffer(K.__webglDepthbuffer),K.__webglMultisampledFramebuffer&&i.deleteFramebuffer(K.__webglMultisampledFramebuffer),K.__webglColorRenderbuffer)for(let z=0;z<K.__webglColorRenderbuffer.length;z++)K.__webglColorRenderbuffer[z]&&i.deleteRenderbuffer(K.__webglColorRenderbuffer[z]);K.__webglDepthRenderbuffer&&i.deleteRenderbuffer(K.__webglDepthRenderbuffer)}const N=I.textures;for(let z=0,b=N.length;z<b;z++){const H=n.get(N[z]);H.__webglTexture&&(i.deleteTexture(H.__webglTexture),o.memory.textures--),n.remove(N[z])}n.remove(I)}(S)}function L(w){const S=n.get(w);i.deleteTexture(S.__webglTexture);const I=w.source;delete h.get(I)[S.__cacheKey],o.memory.textures--}let Y=0;function F(w,S){const I=n.get(w);if(w.isVideoTexture&&function(K){const N=o.render.frame;u.get(K)!==N&&(u.set(K,N),K.update())}(w),w.isRenderTargetTexture===!1&&w.version>0&&I.__version!==w.version){const K=w.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else{if(K.complete!==!1)return void $(I,w,S);console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")}}t.bindTexture(i.TEXTURE_2D,I.__webglTexture,i.TEXTURE0+S)}const X={[Wi]:i.REPEAT,[Xi]:i.CLAMP_TO_EDGE,[Ia]:i.MIRRORED_REPEAT},V={[Xt]:i.NEAREST,[Dl]:i.NEAREST_MIPMAP_NEAREST,[Qi]:i.NEAREST_MIPMAP_LINEAR,[ln]:i.LINEAR,[qr]:i.LINEAR_MIPMAP_NEAREST,[mi]:i.LINEAR_MIPMAP_LINEAR},G={512:i.NEVER,519:i.ALWAYS,513:i.LESS,[Zo]:i.LEQUAL,514:i.EQUAL,518:i.GEQUAL,516:i.GREATER,517:i.NOTEQUAL};function Z(w,S){if(S.type!==cn||e.has("OES_texture_float_linear")!==!1||S.magFilter!==ln&&S.magFilter!==qr&&S.magFilter!==Qi&&S.magFilter!==mi&&S.minFilter!==ln&&S.minFilter!==qr&&S.minFilter!==Qi&&S.minFilter!==mi||console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(w,i.TEXTURE_WRAP_S,X[S.wrapS]),i.texParameteri(w,i.TEXTURE_WRAP_T,X[S.wrapT]),w!==i.TEXTURE_3D&&w!==i.TEXTURE_2D_ARRAY||i.texParameteri(w,i.TEXTURE_WRAP_R,X[S.wrapR]),i.texParameteri(w,i.TEXTURE_MAG_FILTER,V[S.magFilter]),i.texParameteri(w,i.TEXTURE_MIN_FILTER,V[S.minFilter]),S.compareFunction&&(i.texParameteri(w,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(w,i.TEXTURE_COMPARE_FUNC,G[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===Xt||S.minFilter!==Qi&&S.minFilter!==mi||S.type===cn&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const I=e.get("EXT_texture_filter_anisotropic");i.texParameterf(w,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function j(w,S){let I=!1;w.__webglInit===void 0&&(w.__webglInit=!0,S.addEventListener("dispose",C));const K=S.source;let N=h.get(K);N===void 0&&(N={},h.set(K,N));const z=function(b){const H=[];return H.push(b.wrapS),H.push(b.wrapT),H.push(b.wrapR||0),H.push(b.magFilter),H.push(b.minFilter),H.push(b.anisotropy),H.push(b.internalFormat),H.push(b.format),H.push(b.type),H.push(b.generateMipmaps),H.push(b.premultiplyAlpha),H.push(b.flipY),H.push(b.unpackAlignment),H.push(b.colorSpace),H.join()}(S);if(z!==w.__cacheKey){N[z]===void 0&&(N[z]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,I=!0),N[z].usedTimes++;const b=N[w.__cacheKey];b!==void 0&&(N[w.__cacheKey].usedTimes--,b.usedTimes===0&&L(S)),w.__cacheKey=z,w.__webglTexture=N[z].texture}return I}function $(w,S,I){let K=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(K=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(K=i.TEXTURE_3D);const N=j(w,S),z=S.source;t.bindTexture(K,w.__webglTexture,i.TEXTURE0+I);const b=n.get(z);if(z.version!==b.__version||N===!0){t.activeTexture(i.TEXTURE0+I);const H=nt.getPrimaries(nt.workingColorSpace),W=S.colorSpace===pi?null:nt.getPrimaries(S.colorSpace),ue=S.colorSpace===pi||H===W?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue);let k=v(S.image,!1,r.maxTextureSize);k=ae(S,k);const oe=a.convert(S.format,S.colorSpace),he=a.convert(S.type);let ie,Me=x(S.internalFormat,oe,he,S.colorSpace,S.isVideoTexture);Z(K,S);const xe=S.mipmaps,we=S.isVideoTexture!==!0,De=b.__version===void 0||N===!0,We=z.dataReady,He=y(S,k);if(S.isDepthTexture)Me=_(S.format===yi,S.type),De&&(we?t.texStorage2D(i.TEXTURE_2D,1,Me,k.width,k.height):t.texImage2D(i.TEXTURE_2D,0,Me,k.width,k.height,0,oe,he,null));else if(S.isDataTexture)if(xe.length>0){we&&De&&t.texStorage2D(i.TEXTURE_2D,He,Me,xe[0].width,xe[0].height);for(let Ae=0,$e=xe.length;Ae<$e;Ae++)ie=xe[Ae],we?We&&t.texSubImage2D(i.TEXTURE_2D,Ae,0,0,ie.width,ie.height,oe,he,ie.data):t.texImage2D(i.TEXTURE_2D,Ae,Me,ie.width,ie.height,0,oe,he,ie.data);S.generateMipmaps=!1}else we?(De&&t.texStorage2D(i.TEXTURE_2D,He,Me,k.width,k.height),We&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,k.width,k.height,oe,he,k.data)):t.texImage2D(i.TEXTURE_2D,0,Me,k.width,k.height,0,oe,he,k.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){we&&De&&t.texStorage3D(i.TEXTURE_2D_ARRAY,He,Me,xe[0].width,xe[0].height,k.depth);for(let Ae=0,$e=xe.length;Ae<$e;Ae++)if(ie=xe[Ae],S.format!==nn)if(oe!==null)if(we){if(We)if(S.layerUpdates.size>0){const Oe=So(ie.width,ie.height,S.format,S.type);for(const rt of S.layerUpdates){const Se=ie.data.subarray(rt*Oe/ie.data.BYTES_PER_ELEMENT,(rt+1)*Oe/ie.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Ae,0,0,rt,ie.width,ie.height,1,oe,Se,0,0)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Ae,0,0,0,ie.width,ie.height,k.depth,oe,ie.data,0,0)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Ae,Me,ie.width,ie.height,k.depth,0,ie.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else we?We&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,Ae,0,0,0,ie.width,ie.height,k.depth,oe,he,ie.data):t.texImage3D(i.TEXTURE_2D_ARRAY,Ae,Me,ie.width,ie.height,k.depth,0,oe,he,ie.data)}else{we&&De&&t.texStorage2D(i.TEXTURE_2D,He,Me,xe[0].width,xe[0].height);for(let Ae=0,$e=xe.length;Ae<$e;Ae++)ie=xe[Ae],S.format!==nn?oe!==null?we?We&&t.compressedTexSubImage2D(i.TEXTURE_2D,Ae,0,0,ie.width,ie.height,oe,ie.data):t.compressedTexImage2D(i.TEXTURE_2D,Ae,Me,ie.width,ie.height,0,ie.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):we?We&&t.texSubImage2D(i.TEXTURE_2D,Ae,0,0,ie.width,ie.height,oe,he,ie.data):t.texImage2D(i.TEXTURE_2D,Ae,Me,ie.width,ie.height,0,oe,he,ie.data)}else if(S.isDataArrayTexture)if(we){if(De&&t.texStorage3D(i.TEXTURE_2D_ARRAY,He,Me,k.width,k.height,k.depth),We)if(S.layerUpdates.size>0){const Ae=So(k.width,k.height,S.format,S.type);for(const $e of S.layerUpdates){const Oe=k.data.subarray($e*Ae/k.data.BYTES_PER_ELEMENT,($e+1)*Ae/k.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,$e,k.width,k.height,1,oe,he,Oe)}S.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,k.width,k.height,k.depth,oe,he,k.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Me,k.width,k.height,k.depth,0,oe,he,k.data);else if(S.isData3DTexture)we?(De&&t.texStorage3D(i.TEXTURE_3D,He,Me,k.width,k.height,k.depth),We&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,k.width,k.height,k.depth,oe,he,k.data)):t.texImage3D(i.TEXTURE_3D,0,Me,k.width,k.height,k.depth,0,oe,he,k.data);else if(S.isFramebufferTexture){if(De)if(we)t.texStorage2D(i.TEXTURE_2D,He,Me,k.width,k.height);else{let Ae=k.width,$e=k.height;for(let Oe=0;Oe<He;Oe++)t.texImage2D(i.TEXTURE_2D,Oe,Me,Ae,$e,0,oe,he,null),Ae>>=1,$e>>=1}}else if(xe.length>0){if(we&&De){const Ae=ve(xe[0]);t.texStorage2D(i.TEXTURE_2D,He,Me,Ae.width,Ae.height)}for(let Ae=0,$e=xe.length;Ae<$e;Ae++)ie=xe[Ae],we?We&&t.texSubImage2D(i.TEXTURE_2D,Ae,0,0,oe,he,ie):t.texImage2D(i.TEXTURE_2D,Ae,Me,oe,he,ie);S.generateMipmaps=!1}else if(we){if(De){const Ae=ve(k);t.texStorage2D(i.TEXTURE_2D,He,Me,Ae.width,Ae.height)}We&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,oe,he,k)}else t.texImage2D(i.TEXTURE_2D,0,Me,oe,he,k);g(S)&&f(K),b.__version=z.version,S.onUpdate&&S.onUpdate(S)}w.__version=S.version}function Q(w,S,I,K,N,z){const b=a.convert(I.format,I.colorSpace),H=a.convert(I.type),W=x(I.internalFormat,b,H,I.colorSpace);if(!n.get(S).__hasExternalTextures){const ue=Math.max(1,S.width>>z),k=Math.max(1,S.height>>z);N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?t.texImage3D(N,z,W,ue,k,S.depth,0,b,H,null):t.texImage2D(N,z,W,ue,k,0,b,H,null)}t.bindFramebuffer(i.FRAMEBUFFER,w),ce(S)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,N,n.get(I).__webglTexture,0,re(S)):(N===i.TEXTURE_2D||N>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&N<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,K,N,n.get(I).__webglTexture,z),t.bindFramebuffer(i.FRAMEBUFFER,null)}function le(w,S,I){if(i.bindRenderbuffer(i.RENDERBUFFER,w),S.depthBuffer){const K=S.depthTexture,N=K&&K.isDepthTexture?K.type:null,z=_(S.stencilBuffer,N),b=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,H=re(S);ce(S)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,H,z,S.width,S.height):I?i.renderbufferStorageMultisample(i.RENDERBUFFER,H,z,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,z,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,b,i.RENDERBUFFER,w)}else{const K=S.textures;for(let N=0;N<K.length;N++){const z=K[N],b=a.convert(z.format,z.colorSpace),H=a.convert(z.type),W=x(z.internalFormat,b,H,z.colorSpace),ue=re(S);I&&ce(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,ue,W,S.width,S.height):ce(S)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,ue,W,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,W,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function de(w){const S=n.get(w),I=w.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==w.depthTexture){const K=w.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),K){const N=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,K.removeEventListener("dispose",N)};K.addEventListener("dispose",N),S.__depthDisposeCallback=N}S.__boundDepthTexture=K}if(w.depthTexture&&!S.__autoAllocateDepthBuffer){if(I)throw new Error("target.depthTexture not supported in Cube render targets");(function(K,N){if(N&&N.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,K),!N.depthTexture||!N.depthTexture.isDepthTexture)throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");n.get(N.depthTexture).__webglTexture&&N.depthTexture.image.width===N.width&&N.depthTexture.image.height===N.height||(N.depthTexture.image.width=N.width,N.depthTexture.image.height=N.height,N.depthTexture.needsUpdate=!0),F(N.depthTexture,0);const z=n.get(N.depthTexture).__webglTexture,b=re(N);if(N.depthTexture.format===qi)ce(N)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,z,0,b):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,z,0);else{if(N.depthTexture.format!==yi)throw new Error("Unknown depthTexture format");ce(N)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,z,0,b):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,z,0)}})(S.__webglFramebuffer,w)}else if(I){S.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[K]),S.__webglDepthbuffer[K]===void 0)S.__webglDepthbuffer[K]=i.createRenderbuffer(),le(S.__webglDepthbuffer[K],w,!1);else{const N=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,z=S.__webglDepthbuffer[K];i.bindRenderbuffer(i.RENDERBUFFER,z),i.framebufferRenderbuffer(i.FRAMEBUFFER,N,i.RENDERBUFFER,z)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),le(S.__webglDepthbuffer,w,!1);else{const K=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,N=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,N),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,N)}t.bindFramebuffer(i.FRAMEBUFFER,null)}const ge=[],Le=[];function re(w){return Math.min(r.maxSamples,w.samples)}function ce(w){const S=n.get(w);return w.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function ae(w,S){const I=w.colorSpace,K=w.format,N=w.type;return w.isCompressedTexture===!0||w.isVideoTexture===!0||I!==Un&&I!==pi&&(nt.getTransfer(I)===ot?K===nn&&N===_n||console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",I)),S}function ve(w){return typeof HTMLImageElement<"u"&&w instanceof HTMLImageElement?(c.width=w.naturalWidth||w.width,c.height=w.naturalHeight||w.height):typeof VideoFrame<"u"&&w instanceof VideoFrame?(c.width=w.displayWidth,c.height=w.displayHeight):(c.width=w.width,c.height=w.height),c}this.allocateTextureUnit=function(){const w=Y;return w>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+w+" texture units while this GPU supports only "+r.maxTextures),Y+=1,w},this.resetTextureUnits=function(){Y=0},this.setTexture2D=F,this.setTexture2DArray=function(w,S){const I=n.get(w);w.version>0&&I.__version!==w.version?$(I,w,S):t.bindTexture(i.TEXTURE_2D_ARRAY,I.__webglTexture,i.TEXTURE0+S)},this.setTexture3D=function(w,S){const I=n.get(w);w.version>0&&I.__version!==w.version?$(I,w,S):t.bindTexture(i.TEXTURE_3D,I.__webglTexture,i.TEXTURE0+S)},this.setTextureCube=function(w,S){const I=n.get(w);w.version>0&&I.__version!==w.version?function(K,N,z){if(N.image.length!==6)return;const b=j(K,N),H=N.source;t.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture,i.TEXTURE0+z);const W=n.get(H);if(H.version!==W.__version||b===!0){t.activeTexture(i.TEXTURE0+z);const ue=nt.getPrimaries(nt.workingColorSpace),k=N.colorSpace===pi?null:nt.getPrimaries(N.colorSpace),oe=N.colorSpace===pi||ue===k?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,N.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,N.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,oe);const he=N.isCompressedTexture||N.image[0].isCompressedTexture,ie=N.image[0]&&N.image[0].isDataTexture,Me=[];for(let Se=0;Se<6;Se++)Me[Se]=he||ie?ie?N.image[Se].image:N.image[Se]:v(N.image[Se],!0,r.maxCubemapSize),Me[Se]=ae(N,Me[Se]);const xe=Me[0],we=a.convert(N.format,N.colorSpace),De=a.convert(N.type),We=x(N.internalFormat,we,De,N.colorSpace),He=N.isVideoTexture!==!0,Ae=W.__version===void 0||b===!0,$e=H.dataReady;let Oe,rt=y(N,xe);if(Z(i.TEXTURE_CUBE_MAP,N),he){He&&Ae&&t.texStorage2D(i.TEXTURE_CUBE_MAP,rt,We,xe.width,xe.height);for(let Se=0;Se<6;Se++){Oe=Me[Se].mipmaps;for(let Ve=0;Ve<Oe.length;Ve++){const tt=Oe[Ve];N.format!==nn?we!==null?He?$e&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,Ve,0,0,tt.width,tt.height,we,tt.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,Ve,We,tt.width,tt.height,0,tt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):He?$e&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,Ve,0,0,tt.width,tt.height,we,De,tt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,Ve,We,tt.width,tt.height,0,we,De,tt.data)}}}else{if(Oe=N.mipmaps,He&&Ae){Oe.length>0&&rt++;const Se=ve(Me[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,rt,We,Se.width,Se.height)}for(let Se=0;Se<6;Se++)if(ie){He?$e&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,0,0,Me[Se].width,Me[Se].height,we,De,Me[Se].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,We,Me[Se].width,Me[Se].height,0,we,De,Me[Se].data);for(let Ve=0;Ve<Oe.length;Ve++){const tt=Oe[Ve].image[Se].image;He?$e&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,Ve+1,0,0,tt.width,tt.height,we,De,tt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,Ve+1,We,tt.width,tt.height,0,we,De,tt.data)}}else{He?$e&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,0,0,we,De,Me[Se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,0,We,we,De,Me[Se]);for(let Ve=0;Ve<Oe.length;Ve++){const tt=Oe[Ve];He?$e&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,Ve+1,0,0,we,De,tt.image[Se]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Se,Ve+1,We,we,De,tt.image[Se])}}}g(N)&&f(i.TEXTURE_CUBE_MAP),W.__version=H.version,N.onUpdate&&N.onUpdate(N)}K.__version=N.version}(I,w,S):t.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+S)},this.rebindTextures=function(w,S,I){const K=n.get(w);S!==void 0&&Q(K.__webglFramebuffer,w,w.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),I!==void 0&&de(w)},this.setupRenderTarget=function(w){const S=w.texture,I=n.get(w),K=n.get(S);w.addEventListener("dispose",A);const N=w.textures,z=w.isWebGLCubeRenderTarget===!0,b=N.length>1;if(b||(K.__webglTexture===void 0&&(K.__webglTexture=i.createTexture()),K.__version=S.version,o.memory.textures++),z){I.__webglFramebuffer=[];for(let H=0;H<6;H++)if(S.mipmaps&&S.mipmaps.length>0){I.__webglFramebuffer[H]=[];for(let W=0;W<S.mipmaps.length;W++)I.__webglFramebuffer[H][W]=i.createFramebuffer()}else I.__webglFramebuffer[H]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){I.__webglFramebuffer=[];for(let H=0;H<S.mipmaps.length;H++)I.__webglFramebuffer[H]=i.createFramebuffer()}else I.__webglFramebuffer=i.createFramebuffer();if(b)for(let H=0,W=N.length;H<W;H++){const ue=n.get(N[H]);ue.__webglTexture===void 0&&(ue.__webglTexture=i.createTexture(),o.memory.textures++)}if(w.samples>0&&ce(w)===!1){I.__webglMultisampledFramebuffer=i.createFramebuffer(),I.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let H=0;H<N.length;H++){const W=N[H];I.__webglColorRenderbuffer[H]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,I.__webglColorRenderbuffer[H]);const ue=a.convert(W.format,W.colorSpace),k=a.convert(W.type),oe=x(W.internalFormat,ue,k,W.colorSpace,w.isXRRenderTarget===!0),he=re(w);i.renderbufferStorageMultisample(i.RENDERBUFFER,he,oe,w.width,w.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+H,i.RENDERBUFFER,I.__webglColorRenderbuffer[H])}i.bindRenderbuffer(i.RENDERBUFFER,null),w.depthBuffer&&(I.__webglDepthRenderbuffer=i.createRenderbuffer(),le(I.__webglDepthRenderbuffer,w,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(z){t.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),Z(i.TEXTURE_CUBE_MAP,S);for(let H=0;H<6;H++)if(S.mipmaps&&S.mipmaps.length>0)for(let W=0;W<S.mipmaps.length;W++)Q(I.__webglFramebuffer[H][W],w,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+H,W);else Q(I.__webglFramebuffer[H],w,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+H,0);g(S)&&f(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(b){for(let H=0,W=N.length;H<W;H++){const ue=N[H],k=n.get(ue);t.bindTexture(i.TEXTURE_2D,k.__webglTexture),Z(i.TEXTURE_2D,ue),Q(I.__webglFramebuffer,w,ue,i.COLOR_ATTACHMENT0+H,i.TEXTURE_2D,0),g(ue)&&f(i.TEXTURE_2D)}t.unbindTexture()}else{let H=i.TEXTURE_2D;if((w.isWebGL3DRenderTarget||w.isWebGLArrayRenderTarget)&&(H=w.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(H,K.__webglTexture),Z(H,S),S.mipmaps&&S.mipmaps.length>0)for(let W=0;W<S.mipmaps.length;W++)Q(I.__webglFramebuffer[W],w,S,i.COLOR_ATTACHMENT0,H,W);else Q(I.__webglFramebuffer,w,S,i.COLOR_ATTACHMENT0,H,0);g(S)&&f(H),t.unbindTexture()}w.depthBuffer&&de(w)},this.updateRenderTargetMipmap=function(w){const S=w.textures;for(let I=0,K=S.length;I<K;I++){const N=S[I];if(g(N)){const z=w.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,b=n.get(N).__webglTexture;t.bindTexture(z,b),f(z),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(w){if(w.samples>0){if(ce(w)===!1){const S=w.textures,I=w.width,K=w.height;let N=i.COLOR_BUFFER_BIT;const z=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,b=n.get(w),H=S.length>1;if(H)for(let W=0;W<S.length;W++)t.bindFramebuffer(i.FRAMEBUFFER,b.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+W,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+W,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,b.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,b.__webglFramebuffer);for(let W=0;W<S.length;W++){if(w.resolveDepthBuffer&&(w.depthBuffer&&(N|=i.DEPTH_BUFFER_BIT),w.stencilBuffer&&w.resolveStencilBuffer&&(N|=i.STENCIL_BUFFER_BIT)),H){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,b.__webglColorRenderbuffer[W]);const ue=n.get(S[W]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,ue,0)}i.blitFramebuffer(0,0,I,K,0,0,I,K,N,i.NEAREST),s===!0&&(ge.length=0,Le.length=0,ge.push(i.COLOR_ATTACHMENT0+W),w.depthBuffer&&w.resolveDepthBuffer===!1&&(ge.push(z),Le.push(z),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Le)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ge))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),H)for(let W=0;W<S.length;W++){t.bindFramebuffer(i.FRAMEBUFFER,b.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+W,i.RENDERBUFFER,b.__webglColorRenderbuffer[W]);const ue=n.get(S[W]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+W,i.TEXTURE_2D,ue,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,b.__webglMultisampledFramebuffer)}else if(w.depthBuffer&&w.resolveDepthBuffer===!1&&s){const S=w.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}},this.setupDepthRenderbuffer=de,this.setupFrameBufferTexture=Q,this.useMultisampledRTT=ce}function Iu(i,e){return{convert:function(t,n=""){let r;const a=nt.getTransfer(n);if(t===_n)return i.UNSIGNED_BYTE;if(t===ps)return i.UNSIGNED_SHORT_4_4_4_4;if(t===fs)return i.UNSIGNED_SHORT_5_5_5_1;if(t===ko)return i.UNSIGNED_INT_5_9_9_9_REV;if(t===Go)return i.BYTE;if(t===Vo)return i.SHORT;if(t===ji)return i.UNSIGNED_SHORT;if(t===ds)return i.INT;if(t===jn)return i.UNSIGNED_INT;if(t===cn)return i.FLOAT;if(t===Ki)return i.HALF_FLOAT;if(t===Wo)return i.ALPHA;if(t===Xo)return i.RGB;if(t===nn)return i.RGBA;if(t===jo)return i.LUMINANCE;if(t===qo)return i.LUMINANCE_ALPHA;if(t===qi)return i.DEPTH_COMPONENT;if(t===yi)return i.DEPTH_STENCIL;if(t===ms)return i.RED;if(t===gs)return i.RED_INTEGER;if(t===Yo)return i.RG;if(t===_s)return i.RG_INTEGER;if(t===vs)return i.RGBA_INTEGER;if(t===Er||t===br||t===Tr||t===wr)if(a===ot){if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r===null)return null;if(t===Er)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===br)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===Tr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(r=e.get("WEBGL_compressed_texture_s3tc"),r===null)return null;if(t===Er)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===br)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===Tr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===wr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===Na||t===Oa||t===Fa||t===Ba){if(r=e.get("WEBGL_compressed_texture_pvrtc"),r===null)return null;if(t===Na)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===Oa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===Fa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===Ba)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===za||t===Ha||t===Ga){if(r=e.get("WEBGL_compressed_texture_etc"),r===null)return null;if(t===za||t===Ha)return a===ot?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(t===Ga)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}if(t===Va||t===ka||t===Wa||t===Xa||t===ja||t===qa||t===Ya||t===Ka||t===Za||t===Ja||t===$a||t===Qa||t===es||t===ts){if(r=e.get("WEBGL_compressed_texture_astc"),r===null)return null;if(t===Va)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===ka)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===Wa)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===Xa)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===ja)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===qa)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===Ya)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===Ka)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===Za)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===Ja)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===$a)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===Qa)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===es)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===ts)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===Ar||t===ns||t===is){if(r=e.get("EXT_texture_compression_bptc"),r===null)return null;if(t===Ar)return a===ot?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===ns)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===is)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===Ko||t===rs||t===as||t===ss){if(r=e.get("EXT_texture_compression_rgtc"),r===null)return null;if(t===Ar)return r.COMPRESSED_RED_RGTC1_EXT;if(t===rs)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===as)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===ss)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===Si?i.UNSIGNED_INT_24_8:i[t]!==void 0?i[t]:null}}}class Nu extends kt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class jt extends yt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ou={type:"move"};class Ea{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new jt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new jt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new T,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new T),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new jt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new T,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new T),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,a=null,o=null;const l=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const v of e.hand.values()){const g=t.getJointPose(v,n),f=this._getHandJoint(c,v);g!==null&&(f.matrix.fromArray(g.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=g.radius),f.visible=g!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),p=.02,m=.005;c.inputState.pinching&&h>p+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=p-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,n),a!==null&&(s.matrix.fromArray(a.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,a.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(a.linearVelocity)):s.hasLinearVelocity=!1,a.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(a.angularVelocity)):s.hasAngularVelocity=!1));l!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&a!==null&&(r=a),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,this.dispatchEvent(Ou)))}return l!==null&&(l.visible=r!==null),s!==null&&(s.visible=a!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new jt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Fu{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const r=new At;e.properties.get(r).__webglTexture=t.texture,t.depthNear==n.depthNear&&t.depthFar==n.depthFar||(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Dn({vertexShader:`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,fragmentShader:`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new pt(new Ai(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Bu extends Ti{constructor(e,t){super();const n=this;let r=null,a=1,o=null,l="local-floor",s=1,c=null,u=null,d=null,h=null,p=null,m=null;const v=new Fu,g=t.getContextAttributes();let f=null,x=null;const _=[],y=[],C=new ke;let A=null;const L=new kt;L.layers.enable(1),L.viewport=new it;const Y=new kt;Y.layers.enable(2),Y.viewport=new it;const F=[L,Y],X=new Nu;X.layers.enable(1),X.layers.enable(2);let V=null,G=null;function Z(re){const ce=y.indexOf(re.inputSource);if(ce===-1)return;const ae=_[ce];ae!==void 0&&(ae.update(re.inputSource,re.frame,c||o),ae.dispatchEvent({type:re.type,data:re.inputSource}))}function j(){r.removeEventListener("select",Z),r.removeEventListener("selectstart",Z),r.removeEventListener("selectend",Z),r.removeEventListener("squeeze",Z),r.removeEventListener("squeezestart",Z),r.removeEventListener("squeezeend",Z),r.removeEventListener("end",j),r.removeEventListener("inputsourceschange",$);for(let re=0;re<_.length;re++){const ce=y[re];ce!==null&&(y[re]=null,_[re].disconnect(ce))}V=null,G=null,v.reset(),e.setRenderTarget(f),p=null,h=null,d=null,r=null,x=null,Le.stop(),n.isPresenting=!1,e.setPixelRatio(A),e.setSize(C.width,C.height,!1),n.dispatchEvent({type:"sessionend"})}function $(re){for(let ce=0;ce<re.removed.length;ce++){const ae=re.removed[ce],ve=y.indexOf(ae);ve>=0&&(y[ve]=null,_[ve].disconnect(ae))}for(let ce=0;ce<re.added.length;ce++){const ae=re.added[ce];let ve=y.indexOf(ae);if(ve===-1){for(let S=0;S<_.length;S++){if(S>=y.length){y.push(ae),ve=S;break}if(y[S]===null){y[S]=ae,ve=S;break}}if(ve===-1)break}const w=_[ve];w&&w.connect(ae)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(re){let ce=_[re];return ce===void 0&&(ce=new Ea,_[re]=ce),ce.getTargetRaySpace()},this.getControllerGrip=function(re){let ce=_[re];return ce===void 0&&(ce=new Ea,_[re]=ce),ce.getGripSpace()},this.getHand=function(re){let ce=_[re];return ce===void 0&&(ce=new Ea,_[re]=ce),ce.getHandSpace()},this.setFramebufferScaleFactor=function(re){a=re,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(re){l=re,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(re){c=re},this.getBaseLayer=function(){return h!==null?h:p},this.getBinding=function(){return d},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(re){if(r=re,r!==null){if(f=e.getRenderTarget(),r.addEventListener("select",Z),r.addEventListener("selectstart",Z),r.addEventListener("selectend",Z),r.addEventListener("squeeze",Z),r.addEventListener("squeezestart",Z),r.addEventListener("squeezeend",Z),r.addEventListener("end",j),r.addEventListener("inputsourceschange",$),g.xrCompatible!==!0&&await t.makeXRCompatible(),A=e.getPixelRatio(),e.getSize(C),r.renderState.layers===void 0){const ce={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:a};p=new XRWebGLLayer(r,t,ce),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),x=new qn(p.framebufferWidth,p.framebufferHeight,{format:nn,type:_n,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let ce=null,ae=null,ve=null;g.depth&&(ve=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ce=g.stencil?yi:qi,ae=g.stencil?Si:jn);const w={colorFormat:t.RGBA8,depthFormat:ve,scaleFactor:a};d=new XRWebGLBinding(r,t),h=d.createProjectionLayer(w),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),x=new qn(h.textureWidth,h.textureHeight,{format:nn,type:_n,depthTexture:new sl(h.textureWidth,h.textureHeight,ae,void 0,void 0,void 0,void 0,void 0,void 0,ce),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(s),c=null,o=await r.requestReferenceSpace(l),Le.setContext(r),Le.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};const Q=new T,le=new T;function de(re,ce){ce===null?re.matrixWorld.copy(re.matrix):re.matrixWorld.multiplyMatrices(ce.matrixWorld,re.matrix),re.matrixWorldInverse.copy(re.matrixWorld).invert()}this.updateCamera=function(re){if(r===null)return;let ce=re.near,ae=re.far;v.texture!==null&&(v.depthNear>0&&(ce=v.depthNear),v.depthFar>0&&(ae=v.depthFar)),X.near=Y.near=L.near=ce,X.far=Y.far=L.far=ae,V===X.near&&G===X.far||(r.updateRenderState({depthNear:X.near,depthFar:X.far}),V=X.near,G=X.far);const ve=re.parent,w=X.cameras;de(X,ve);for(let S=0;S<w.length;S++)de(w[S],ve);w.length===2?function(S,I,K){Q.setFromMatrixPosition(I.matrixWorld),le.setFromMatrixPosition(K.matrixWorld);const N=Q.distanceTo(le),z=I.projectionMatrix.elements,b=K.projectionMatrix.elements,H=z[14]/(z[10]-1),W=z[14]/(z[10]+1),ue=(z[9]+1)/z[5],k=(z[9]-1)/z[5],oe=(z[8]-1)/z[0],he=(b[8]+1)/b[0],ie=H*oe,Me=H*he,xe=N/(-oe+he),we=xe*-oe;if(I.matrixWorld.decompose(S.position,S.quaternion,S.scale),S.translateX(we),S.translateZ(xe),S.matrixWorld.compose(S.position,S.quaternion,S.scale),S.matrixWorldInverse.copy(S.matrixWorld).invert(),z[10]===-1)S.projectionMatrix.copy(I.projectionMatrix),S.projectionMatrixInverse.copy(I.projectionMatrixInverse);else{const De=H+xe,We=W+xe,He=ie-we,Ae=Me+(N-we),$e=ue*W/We*De,Oe=k*W/We*De;S.projectionMatrix.makePerspective(He,Ae,$e,Oe,De,We),S.projectionMatrixInverse.copy(S.projectionMatrix).invert()}}(X,L,Y):X.projectionMatrix.copy(L.projectionMatrix),function(S,I,K){K===null?S.matrix.copy(I.matrixWorld):(S.matrix.copy(K.matrixWorld),S.matrix.invert(),S.matrix.multiply(I.matrixWorld)),S.matrix.decompose(S.position,S.quaternion,S.scale),S.updateMatrixWorld(!0),S.projectionMatrix.copy(I.projectionMatrix),S.projectionMatrixInverse.copy(I.projectionMatrixInverse),S.isPerspectiveCamera&&(S.fov=2*os*Math.atan(1/S.projectionMatrix.elements[5]),S.zoom=1)}(re,X,ve)},this.getCamera=function(){return X},this.getFoveation=function(){if(h!==null||p!==null)return s},this.setFoveation=function(re){s=re,h!==null&&(h.fixedFoveation=re),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=re)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(X)};let ge=null;const Le=new al;Le.setAnimationLoop(function(re,ce){if(u=ce.getViewerPose(c||o),m=ce,u!==null){const ae=u.views;p!==null&&(e.setRenderTargetFramebuffer(x,p.framebuffer),e.setRenderTarget(x));let ve=!1;ae.length!==X.cameras.length&&(X.cameras.length=0,ve=!0);for(let S=0;S<ae.length;S++){const I=ae[S];let K=null;if(p!==null)K=p.getViewport(I);else{const z=d.getViewSubImage(h,I);K=z.viewport,S===0&&(e.setRenderTargetTextures(x,z.colorTexture,h.ignoreDepthValues?void 0:z.depthStencilTexture),e.setRenderTarget(x))}let N=F[S];N===void 0&&(N=new kt,N.layers.enable(S),N.viewport=new it,F[S]=N),N.matrix.fromArray(I.transform.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale),N.projectionMatrix.fromArray(I.projectionMatrix),N.projectionMatrixInverse.copy(N.projectionMatrix).invert(),N.viewport.set(K.x,K.y,K.width,K.height),S===0&&(X.matrix.copy(N.matrix),X.matrix.decompose(X.position,X.quaternion,X.scale)),ve===!0&&X.cameras.push(N)}const w=r.enabledFeatures;if(w&&w.includes("depth-sensing")){const S=d.getDepthInformation(ae[0]);S&&S.isValid&&S.texture&&v.init(e,S,r.renderState)}}for(let ae=0;ae<_.length;ae++){const ve=y[ae],w=_[ae];ve!==null&&w!==void 0&&w.update(ve,ce,c||o)}ge&&ge(re,ce),ce.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ce}),m=null}),this.setAnimationLoop=function(re){ge=re},this.dispose=function(){}}}const Vn=new Nt,zu=new Pe;function Hu(i,e){function t(r,a){r.matrixAutoUpdate===!0&&r.updateMatrix(),a.value.copy(r.matrix)}function n(r,a){r.opacity.value=a.opacity,a.color&&r.diffuse.value.copy(a.color),a.emissive&&r.emissive.value.copy(a.emissive).multiplyScalar(a.emissiveIntensity),a.map&&(r.map.value=a.map,t(a.map,r.mapTransform)),a.alphaMap&&(r.alphaMap.value=a.alphaMap,t(a.alphaMap,r.alphaMapTransform)),a.bumpMap&&(r.bumpMap.value=a.bumpMap,t(a.bumpMap,r.bumpMapTransform),r.bumpScale.value=a.bumpScale,a.side===It&&(r.bumpScale.value*=-1)),a.normalMap&&(r.normalMap.value=a.normalMap,t(a.normalMap,r.normalMapTransform),r.normalScale.value.copy(a.normalScale),a.side===It&&r.normalScale.value.negate()),a.displacementMap&&(r.displacementMap.value=a.displacementMap,t(a.displacementMap,r.displacementMapTransform),r.displacementScale.value=a.displacementScale,r.displacementBias.value=a.displacementBias),a.emissiveMap&&(r.emissiveMap.value=a.emissiveMap,t(a.emissiveMap,r.emissiveMapTransform)),a.specularMap&&(r.specularMap.value=a.specularMap,t(a.specularMap,r.specularMapTransform)),a.alphaTest>0&&(r.alphaTest.value=a.alphaTest);const o=e.get(a),l=o.envMap,s=o.envMapRotation;l&&(r.envMap.value=l,Vn.copy(s),Vn.x*=-1,Vn.y*=-1,Vn.z*=-1,l.isCubeTexture&&l.isRenderTargetTexture===!1&&(Vn.y*=-1,Vn.z*=-1),r.envMapRotation.value.setFromMatrix4(zu.makeRotationFromEuler(Vn)),r.flipEnvMap.value=l.isCubeTexture&&l.isRenderTargetTexture===!1?-1:1,r.reflectivity.value=a.reflectivity,r.ior.value=a.ior,r.refractionRatio.value=a.refractionRatio),a.lightMap&&(r.lightMap.value=a.lightMap,r.lightMapIntensity.value=a.lightMapIntensity,t(a.lightMap,r.lightMapTransform)),a.aoMap&&(r.aoMap.value=a.aoMap,r.aoMapIntensity.value=a.aoMapIntensity,t(a.aoMap,r.aoMapTransform))}return{refreshFogUniforms:function(r,a){a.color.getRGB(r.fogColor.value,il(i)),a.isFog?(r.fogNear.value=a.near,r.fogFar.value=a.far):a.isFogExp2&&(r.fogDensity.value=a.density)},refreshMaterialUniforms:function(r,a,o,l,s){a.isMeshBasicMaterial||a.isMeshLambertMaterial?n(r,a):a.isMeshToonMaterial?(n(r,a),function(c,u){u.gradientMap&&(c.gradientMap.value=u.gradientMap)}(r,a)):a.isMeshPhongMaterial?(n(r,a),function(c,u){c.specular.value.copy(u.specular),c.shininess.value=Math.max(u.shininess,1e-4)}(r,a)):a.isMeshStandardMaterial?(n(r,a),function(c,u){c.metalness.value=u.metalness,u.metalnessMap&&(c.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,c.metalnessMapTransform)),c.roughness.value=u.roughness,u.roughnessMap&&(c.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,c.roughnessMapTransform)),u.envMap&&(c.envMapIntensity.value=u.envMapIntensity)}(r,a),a.isMeshPhysicalMaterial&&function(c,u,d){c.ior.value=u.ior,u.sheen>0&&(c.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),c.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(c.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,c.sheenColorMapTransform)),u.sheenRoughnessMap&&(c.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,c.sheenRoughnessMapTransform))),u.clearcoat>0&&(c.clearcoat.value=u.clearcoat,c.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(c.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,c.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(c.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,c.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(c.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,c.clearcoatNormalMapTransform),c.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===It&&c.clearcoatNormalScale.value.negate())),u.dispersion>0&&(c.dispersion.value=u.dispersion),u.iridescence>0&&(c.iridescence.value=u.iridescence,c.iridescenceIOR.value=u.iridescenceIOR,c.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],c.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(c.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,c.iridescenceMapTransform)),u.iridescenceThicknessMap&&(c.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,c.iridescenceThicknessMapTransform))),u.transmission>0&&(c.transmission.value=u.transmission,c.transmissionSamplerMap.value=d.texture,c.transmissionSamplerSize.value.set(d.width,d.height),u.transmissionMap&&(c.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,c.transmissionMapTransform)),c.thickness.value=u.thickness,u.thicknessMap&&(c.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,c.thicknessMapTransform)),c.attenuationDistance.value=u.attenuationDistance,c.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(c.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(c.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,c.anisotropyMapTransform))),c.specularIntensity.value=u.specularIntensity,c.specularColor.value.copy(u.specularColor),u.specularColorMap&&(c.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,c.specularColorMapTransform)),u.specularIntensityMap&&(c.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,c.specularIntensityMapTransform))}(r,a,s)):a.isMeshMatcapMaterial?(n(r,a),function(c,u){u.matcap&&(c.matcap.value=u.matcap)}(r,a)):a.isMeshDepthMaterial?n(r,a):a.isMeshDistanceMaterial?(n(r,a),function(c,u){const d=e.get(u).light;c.referencePosition.value.setFromMatrixPosition(d.matrixWorld),c.nearDistance.value=d.shadow.camera.near,c.farDistance.value=d.shadow.camera.far}(r,a)):a.isMeshNormalMaterial?n(r,a):a.isLineBasicMaterial?(function(c,u){c.diffuse.value.copy(u.color),c.opacity.value=u.opacity,u.map&&(c.map.value=u.map,t(u.map,c.mapTransform))}(r,a),a.isLineDashedMaterial&&function(c,u){c.dashSize.value=u.dashSize,c.totalSize.value=u.dashSize+u.gapSize,c.scale.value=u.scale}(r,a)):a.isPointsMaterial?function(c,u,d,h){c.diffuse.value.copy(u.color),c.opacity.value=u.opacity,c.size.value=u.size*d,c.scale.value=.5*h,u.map&&(c.map.value=u.map,t(u.map,c.uvTransform)),u.alphaMap&&(c.alphaMap.value=u.alphaMap,t(u.alphaMap,c.alphaMapTransform)),u.alphaTest>0&&(c.alphaTest.value=u.alphaTest)}(r,a,o,l):a.isSpriteMaterial?function(c,u){c.diffuse.value.copy(u.color),c.opacity.value=u.opacity,c.rotation.value=u.rotation,u.map&&(c.map.value=u.map,t(u.map,c.mapTransform)),u.alphaMap&&(c.alphaMap.value=u.alphaMap,t(u.alphaMap,c.alphaMapTransform)),u.alphaTest>0&&(c.alphaTest.value=u.alphaTest)}(r,a):a.isShadowMaterial?(r.color.value.copy(a.color),r.opacity.value=a.opacity):a.isShaderMaterial&&(a.uniformsNeedUpdate=!1)}}}function Gu(i,e,t,n){let r={},a={},o=[];const l=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function s(d,h,p,m){const v=d.value,g=h+"_"+p;if(m[g]===void 0)return m[g]=typeof v=="number"||typeof v=="boolean"?v:v.clone(),!0;{const f=m[g];if(typeof v=="number"||typeof v=="boolean"){if(f!==v)return m[g]=v,!0}else if(f.equals(v)===!1)return f.copy(v),!0}return!1}function c(d){const h={boundary:0,storage:0};return typeof d=="number"||typeof d=="boolean"?(h.boundary=4,h.storage=4):d.isVector2?(h.boundary=8,h.storage=8):d.isVector3||d.isColor?(h.boundary=16,h.storage=12):d.isVector4?(h.boundary=16,h.storage=16):d.isMatrix3?(h.boundary=48,h.storage=48):d.isMatrix4?(h.boundary=64,h.storage=64):d.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",d),h}function u(d){const h=d.target;h.removeEventListener("dispose",u);const p=o.indexOf(h.__bindingPointIndex);o.splice(p,1),i.deleteBuffer(r[h.id]),delete r[h.id],delete a[h.id]}return{bind:function(d,h){const p=h.program;n.uniformBlockBinding(d,p)},update:function(d,h){let p=r[d.id];p===void 0&&(function(g){const f=g.uniforms;let x=0;const _=16;for(let C=0,A=f.length;C<A;C++){const L=Array.isArray(f[C])?f[C]:[f[C]];for(let Y=0,F=L.length;Y<F;Y++){const X=L[Y],V=Array.isArray(X.value)?X.value:[X.value];for(let G=0,Z=V.length;G<Z;G++){const j=c(V[G]),$=x%_,Q=$%j.boundary,le=$+Q;x+=Q,le!==0&&_-le<j.storage&&(x+=_-le),X.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),X.__offset=x,x+=j.storage}}}const y=x%_;y>0&&(x+=_-y),g.__size=x,g.__cache={}}(d),p=function(g){const f=function(){for(let C=0;C<l;C++)if(o.indexOf(C)===-1)return o.push(C),C;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}();g.__bindingPointIndex=f;const x=i.createBuffer(),_=g.__size,y=g.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,_,y),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,f,x),x}(d),r[d.id]=p,d.addEventListener("dispose",u));const m=h.program;n.updateUBOMapping(d,m);const v=e.render.frame;a[d.id]!==v&&(function(g){const f=r[g.id],x=g.uniforms,_=g.__cache;i.bindBuffer(i.UNIFORM_BUFFER,f);for(let y=0,C=x.length;y<C;y++){const A=Array.isArray(x[y])?x[y]:[x[y]];for(let L=0,Y=A.length;L<Y;L++){const F=A[L];if(s(F,y,L,_)===!0){const X=F.__offset,V=Array.isArray(F.value)?F.value:[F.value];let G=0;for(let Z=0;Z<V.length;Z++){const j=V[Z],$=c(j);typeof j=="number"||typeof j=="boolean"?(F.__data[0]=j,i.bufferSubData(i.UNIFORM_BUFFER,X+G,F.__data)):j.isMatrix3?(F.__data[0]=j.elements[0],F.__data[1]=j.elements[1],F.__data[2]=j.elements[2],F.__data[3]=0,F.__data[4]=j.elements[3],F.__data[5]=j.elements[4],F.__data[6]=j.elements[5],F.__data[7]=0,F.__data[8]=j.elements[6],F.__data[9]=j.elements[7],F.__data[10]=j.elements[8],F.__data[11]=0):(j.toArray(F.__data,G),G+=$.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,X,F.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}(d),a[d.id]=v)},dispose:function(){for(const d in r)i.deleteBuffer(r[d]);o=[],r={},a={}}}}class Vu{constructor(e={}){const{canvas:t=Il(),context:n=null,depth:r=!0,stencil:a=!1,alpha:o=!1,antialias:l=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1}=e;let h;if(this.isWebGLRenderer=!0,n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=n.getContextAttributes().alpha}else h=o;const p=new Uint32Array(4),m=new Int32Array(4);let v=null,g=null;const f=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Vt,this.toneMapping=Pn,this.toneMappingExposure=1;const _=this;let y=!1,C=0,A=0,L=null,Y=-1,F=null;const X=new it,V=new it;let G=null;const Z=new ze(0);let j=0,$=t.width,Q=t.height,le=1,de=null,ge=null;const Le=new it(0,0,$,Q),re=new it(0,0,$,Q);let ce=!1;const ae=new Gr;let ve=!1,w=!1;const S=new Pe,I=new Pe,K=new T,N=new it,z={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let b=!1;function H(){return L===null?le:1}let W,ue,k,oe,he,ie,Me,xe,we,De,We,He,Ae,$e,Oe,rt,Se,Ve,tt,Pt,qt,bt,_t,Lt,D=n;function an(M,E){return t.getContext(M,E)}try{const M={alpha:!0,depth:r,stencil:a,antialias:l,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ca}`),t.addEventListener("webglcontextlost",Ci,!1),t.addEventListener("webglcontextrestored",P,!1),t.addEventListener("webglcontextcreationerror",R,!1),D===null){const E="webgl2";if(D=an(E,M),D===null)throw an(E)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(M){throw console.error("THREE.WebGLRenderer: "+M.message),M}function In(){W=new hc(D),W.init(),bt=new Iu(D,W),ue=new oc(D,W,e,bt),k=new Du(D),ue.reverseDepthBuffer&&k.buffers.depth.setReversed(!0),oe=new fc(D),he=new Mu,ie=new Uu(D,W,k,he,ue,bt,oe),Me=new cc(_),xe=new uc(_),we=new nc(D),_t=new ac(D,we),De=new dc(D,we,oe,_t),We=new gc(D,De,we,oe),tt=new mc(D,ue,ie),rt=new lc(he),He=new xu(_,Me,xe,W,ue,_t,rt),Ae=new Hu(_,he),$e=new yu,Oe=new Au(W),Ve=new rc(_,Me,xe,k,We,h,s),Se=new Pu(_,We,ue),Lt=new Gu(D,oe,ue,k),Pt=new sc(D,W,oe),qt=new pc(D,W,oe),oe.programs=He.programs,_.capabilities=ue,_.extensions=W,_.properties=he,_.renderLists=$e,_.shadowMap=Se,_.state=k,_.info=oe}In();const ft=new Bu(_,D);function Ci(M){M.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function P(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;const M=oe.autoReset,E=Se.enabled,U=Se.autoUpdate,q=Se.needsUpdate,O=Se.type;In(),oe.autoReset=M,Se.enabled=E,Se.autoUpdate=U,Se.needsUpdate=q,Se.type=O}function R(M){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function J(M){const E=M.target;E.removeEventListener("dispose",J),function(U){(function(q){const O=he.get(q).programs;O!==void 0&&(O.forEach(function(te){He.releaseProgram(te)}),q.isShaderMaterial&&He.releaseShaderCache(q))})(U),he.remove(U)}(E)}function se(M,E,U){M.transparent===!0&&M.side===2&&M.forceSinglePass===!1?(M.side=It,M.needsUpdate=!0,pe(M,E,U),M.side=Ln,M.needsUpdate=!0,pe(M,E,U),M.side=2):pe(M,E,U)}this.xr=ft,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const M=W.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){const M=W.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return le},this.setPixelRatio=function(M){M!==void 0&&(le=M,this.setSize($,Q,!1))},this.getSize=function(M){return M.set($,Q)},this.setSize=function(M,E,U=!0){ft.isPresenting?console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting."):($=M,Q=E,t.width=Math.floor(M*le),t.height=Math.floor(E*le),U===!0&&(t.style.width=M+"px",t.style.height=E+"px"),this.setViewport(0,0,M,E))},this.getDrawingBufferSize=function(M){return M.set($*le,Q*le).floor()},this.setDrawingBufferSize=function(M,E,U){$=M,Q=E,le=U,t.width=Math.floor(M*U),t.height=Math.floor(E*U),this.setViewport(0,0,M,E)},this.getCurrentViewport=function(M){return M.copy(X)},this.getViewport=function(M){return M.copy(Le)},this.setViewport=function(M,E,U,q){M.isVector4?Le.set(M.x,M.y,M.z,M.w):Le.set(M,E,U,q),k.viewport(X.copy(Le).multiplyScalar(le).round())},this.getScissor=function(M){return M.copy(re)},this.setScissor=function(M,E,U,q){M.isVector4?re.set(M.x,M.y,M.z,M.w):re.set(M,E,U,q),k.scissor(V.copy(re).multiplyScalar(le).round())},this.getScissorTest=function(){return ce},this.setScissorTest=function(M){k.setScissorTest(ce=M)},this.setOpaqueSort=function(M){de=M},this.setTransparentSort=function(M){ge=M},this.getClearColor=function(M){return M.copy(Ve.getClearColor())},this.setClearColor=function(){Ve.setClearColor.apply(Ve,arguments)},this.getClearAlpha=function(){return Ve.getClearAlpha()},this.setClearAlpha=function(){Ve.setClearAlpha.apply(Ve,arguments)},this.clear=function(M=!0,E=!0,U=!0){let q=0;if(M){let O=!1;if(L!==null){const te=L.texture.format;O=te===vs||te===_s||te===gs}if(O){const te=L.texture.type,me=te===_n||te===jn||te===ji||te===Si||te===ps||te===fs,_e=Ve.getClearColor(),Te=Ve.getClearAlpha(),Ue=_e.r,Ie=_e.g,Ne=_e.b;me?(p[0]=Ue,p[1]=Ie,p[2]=Ne,p[3]=Te,D.clearBufferuiv(D.COLOR,0,p)):(m[0]=Ue,m[1]=Ie,m[2]=Ne,m[3]=Te,D.clearBufferiv(D.COLOR,0,m))}else q|=D.COLOR_BUFFER_BIT}E&&(q|=D.DEPTH_BUFFER_BIT,D.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),U&&(q|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Ci,!1),t.removeEventListener("webglcontextrestored",P,!1),t.removeEventListener("webglcontextcreationerror",R,!1),$e.dispose(),Oe.dispose(),he.dispose(),Me.dispose(),xe.dispose(),We.dispose(),_t.dispose(),Lt.dispose(),He.dispose(),ft.dispose(),ft.removeEventListener("sessionstart",Ee),ft.removeEventListener("sessionend",be),Re.stop()},this.renderBufferDirect=function(M,E,U,q,O,te){E===null&&(E=z);const me=O.isMesh&&O.matrixWorld.determinant()<0,_e=function(et,ut,Et,Ye,Be){ut.isScene!==!0&&(ut=z),ie.resetTextureUnits();const Yt=ut.fog,ml=Ye.isMeshStandardMaterial?ut.environment:null,gl=L===null?_.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:Un,$i=(Ye.isMeshStandardMaterial?xe:Me).get(Ye.envMap||ml),_l=Ye.vertexColors===!0&&!!Et.attributes.color&&Et.attributes.color.itemSize===4,vl=!!Et.attributes.tangent&&(!!Ye.normalMap||Ye.anisotropy>0),xl=!!Et.morphAttributes.position,Ml=!!Et.morphAttributes.normal,Sl=!!Et.morphAttributes.color;let As=Pn;Ye.toneMapped&&(L!==null&&L.isXRRenderTarget!==!0||(As=_.toneMapping));const Rs=Et.morphAttributes.position||Et.morphAttributes.normal||Et.morphAttributes.color,yl=Rs!==void 0?Rs.length:0,Je=he.get(Ye),El=g.state.lights;if(ve===!0&&(w===!0||et!==F)){const Ht=et===F&&Ye.id===Y;rt.setState(Ye,et,Ht)}let Kt=!1;Ye.version===Je.__version?Je.needsLights&&Je.lightsStateVersion!==El.state.version||Je.outputColorSpace!==gl||Be.isBatchedMesh&&Je.batching===!1?Kt=!0:Be.isBatchedMesh||Je.batching!==!0?Be.isBatchedMesh&&Je.batchingColor===!0&&Be.colorTexture===null||Be.isBatchedMesh&&Je.batchingColor===!1&&Be.colorTexture!==null||Be.isInstancedMesh&&Je.instancing===!1?Kt=!0:Be.isInstancedMesh||Je.instancing!==!0?Be.isSkinnedMesh&&Je.skinning===!1?Kt=!0:Be.isSkinnedMesh||Je.skinning!==!0?Be.isInstancedMesh&&Je.instancingColor===!0&&Be.instanceColor===null||Be.isInstancedMesh&&Je.instancingColor===!1&&Be.instanceColor!==null||Be.isInstancedMesh&&Je.instancingMorph===!0&&Be.morphTexture===null||Be.isInstancedMesh&&Je.instancingMorph===!1&&Be.morphTexture!==null||Je.envMap!==$i||Ye.fog===!0&&Je.fog!==Yt?Kt=!0:Je.numClippingPlanes===void 0||Je.numClippingPlanes===rt.numPlanes&&Je.numIntersection===rt.numIntersection?(Je.vertexAlphas!==_l||Je.vertexTangents!==vl||Je.morphTargets!==xl||Je.morphNormals!==Ml||Je.morphColors!==Sl||Je.toneMapping!==As||Je.morphTargetsCount!==yl)&&(Kt=!0):Kt=!0:Kt=!0:Kt=!0:Kt=!0:(Kt=!0,Je.__version=Ye.version);let Nn=Je.currentProgram;Kt===!0&&(Nn=pe(Ye,ut,Be));let Cs=!1,Pi=!1,Wr=!1;const dt=Nn.getUniforms(),Mn=Je.uniforms;if(k.useProgram(Nn.program)&&(Cs=!0,Pi=!0,Wr=!0),Ye.id!==Y&&(Y=Ye.id,Pi=!0),Cs||F!==et){ue.reverseDepthBuffer?(S.copy(et.projectionMatrix),function(On){const lt=On.elements;lt[2]=.5*lt[2]+.5*lt[3],lt[6]=.5*lt[6]+.5*lt[7],lt[10]=.5*lt[10]+.5*lt[11],lt[14]=.5*lt[14]+.5*lt[15]}(S),function(On){const lt=On.elements;lt[11]===-1?(lt[10]=-lt[10]-1,lt[14]=-lt[14]):(lt[10]=-lt[10],lt[14]=1-lt[14])}(S),dt.setValue(D,"projectionMatrix",S)):dt.setValue(D,"projectionMatrix",et.projectionMatrix),dt.setValue(D,"viewMatrix",et.matrixWorldInverse);const Ht=dt.map.cameraPosition;Ht!==void 0&&Ht.setValue(D,K.setFromMatrixPosition(et.matrixWorld)),ue.logarithmicDepthBuffer&&dt.setValue(D,"logDepthBufFC",2/(Math.log(et.far+1)/Math.LN2)),(Ye.isMeshPhongMaterial||Ye.isMeshToonMaterial||Ye.isMeshLambertMaterial||Ye.isMeshBasicMaterial||Ye.isMeshStandardMaterial||Ye.isShaderMaterial)&&dt.setValue(D,"isOrthographic",et.isOrthographicCamera===!0),F!==et&&(F=et,Pi=!0,Wr=!0)}if(Be.isSkinnedMesh){dt.setOptional(D,Be,"bindMatrix"),dt.setOptional(D,Be,"bindMatrixInverse");const Ht=Be.skeleton;Ht&&(Ht.boneTexture===null&&Ht.computeBoneTexture(),dt.setValue(D,"boneTexture",Ht.boneTexture,ie))}Be.isBatchedMesh&&(dt.setOptional(D,Be,"batchingTexture"),dt.setValue(D,"batchingTexture",Be._matricesTexture,ie),dt.setOptional(D,Be,"batchingIdTexture"),dt.setValue(D,"batchingIdTexture",Be._indirectTexture,ie),dt.setOptional(D,Be,"batchingColorTexture"),Be._colorsTexture!==null&&dt.setValue(D,"batchingColorTexture",Be._colorsTexture,ie));const Xr=Et.morphAttributes;Xr.position===void 0&&Xr.normal===void 0&&Xr.color===void 0||tt.update(Be,Et,Nn),(Pi||Je.receiveShadow!==Be.receiveShadow)&&(Je.receiveShadow=Be.receiveShadow,dt.setValue(D,"receiveShadow",Be.receiveShadow)),Ye.isMeshGouraudMaterial&&Ye.envMap!==null&&(Mn.envMap.value=$i,Mn.flipEnvMap.value=$i.isCubeTexture&&$i.isRenderTargetTexture===!1?-1:1),Ye.isMeshStandardMaterial&&Ye.envMap===null&&ut.environment!==null&&(Mn.envMapIntensity.value=ut.environmentIntensity),Pi&&(dt.setValue(D,"toneMappingExposure",_.toneMappingExposure),Je.needsLights&&(Zt=Wr,(sn=Mn).ambientLightColor.needsUpdate=Zt,sn.lightProbe.needsUpdate=Zt,sn.directionalLights.needsUpdate=Zt,sn.directionalLightShadows.needsUpdate=Zt,sn.pointLights.needsUpdate=Zt,sn.pointLightShadows.needsUpdate=Zt,sn.spotLights.needsUpdate=Zt,sn.spotLightShadows.needsUpdate=Zt,sn.rectAreaLights.needsUpdate=Zt,sn.hemisphereLights.needsUpdate=Zt),Yt&&Ye.fog===!0&&Ae.refreshFogUniforms(Mn,Yt),Ae.refreshMaterialUniforms(Mn,Ye,le,Q,g.state.transmissionRenderTarget[et.id]),Cr.upload(D,Ce(Je),Mn,ie));var sn,Zt;if(Ye.isShaderMaterial&&Ye.uniformsNeedUpdate===!0&&(Cr.upload(D,Ce(Je),Mn,ie),Ye.uniformsNeedUpdate=!1),Ye.isSpriteMaterial&&dt.setValue(D,"center",Be.center),dt.setValue(D,"modelViewMatrix",Be.modelViewMatrix),dt.setValue(D,"normalMatrix",Be.normalMatrix),dt.setValue(D,"modelMatrix",Be.matrixWorld),Ye.isShaderMaterial||Ye.isRawShaderMaterial){const Ht=Ye.uniformsGroups;for(let On=0,lt=Ht.length;On<lt;On++){const Ps=Ht[On];Lt.update(Ps,Nn),Lt.bind(Ps,Nn)}}return Nn}(M,E,U,q,O);k.setMaterial(q,me);let Te=U.index,Ue=1;if(q.wireframe===!0){if(Te=De.getWireframeAttribute(U),Te===void 0)return;Ue=2}const Ie=U.drawRange,Ne=U.attributes.position;let Qe=Ie.start*Ue,ht=(Ie.start+Ie.count)*Ue;te!==null&&(Qe=Math.max(Qe,te.start*Ue),ht=Math.min(ht,(te.start+te.count)*Ue)),Te!==null?(Qe=Math.max(Qe,0),ht=Math.min(ht,Te.count)):Ne!=null&&(Qe=Math.max(Qe,0),ht=Math.min(ht,Ne.count));const ct=ht-Qe;if(ct<0||ct===1/0)return;let Mt;_t.setup(O,q,_e,U,Te);let st=Pt;if(Te!==null&&(Mt=we.get(Te),st=qt,st.setIndex(Mt)),O.isMesh)q.wireframe===!0?(k.setLineWidth(q.wireframeLinewidth*H()),st.setMode(D.LINES)):st.setMode(D.TRIANGLES);else if(O.isLine){let et=q.linewidth;et===void 0&&(et=1),k.setLineWidth(et*H()),O.isLineSegments?st.setMode(D.LINES):O.isLineLoop?st.setMode(D.LINE_LOOP):st.setMode(D.LINE_STRIP)}else O.isPoints?st.setMode(D.POINTS):O.isSprite&&st.setMode(D.TRIANGLES);if(O.isBatchedMesh)if(O._multiDrawInstances!==null)st.renderMultiDrawInstances(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount,O._multiDrawInstances);else if(W.get("WEBGL_multi_draw"))st.renderMultiDraw(O._multiDrawStarts,O._multiDrawCounts,O._multiDrawCount);else{const et=O._multiDrawStarts,ut=O._multiDrawCounts,Et=O._multiDrawCount,Ye=Te?we.get(Te).bytesPerElement:1,Be=he.get(q).currentProgram.getUniforms();for(let Yt=0;Yt<Et;Yt++)Be.setValue(D,"_gl_DrawID",Yt),st.render(et[Yt]/Ye,ut[Yt])}else if(O.isInstancedMesh)st.renderInstances(Qe,ct,O.count);else if(U.isInstancedBufferGeometry){const et=U._maxInstanceCount!==void 0?U._maxInstanceCount:1/0,ut=Math.min(U.instanceCount,et);st.renderInstances(Qe,ct,ut)}else st.render(Qe,ct)},this.compile=function(M,E,U=null){U===null&&(U=M),g=Oe.get(U),g.init(E),x.push(g),U.traverseVisible(function(O){O.isLight&&O.layers.test(E.layers)&&(g.pushLight(O),O.castShadow&&g.pushShadow(O))}),M!==U&&M.traverseVisible(function(O){O.isLight&&O.layers.test(E.layers)&&(g.pushLight(O),O.castShadow&&g.pushShadow(O))}),g.setupLights();const q=new Set;return M.traverse(function(O){if(!(O.isMesh||O.isPoints||O.isLine||O.isSprite))return;const te=O.material;if(te)if(Array.isArray(te))for(let me=0;me<te.length;me++){const _e=te[me];se(_e,U,O),q.add(_e)}else se(te,U,O),q.add(te)}),x.pop(),g=null,q},this.compileAsync=function(M,E,U=null){const q=this.compile(M,E,U);return new Promise(O=>{function te(){q.forEach(function(me){he.get(me).currentProgram.isReady()&&q.delete(me)}),q.size!==0?setTimeout(te,10):O(M)}W.get("KHR_parallel_shader_compile")!==null?te():setTimeout(te,10)})};let ee=null;function Ee(){Re.stop()}function be(){Re.start()}const Re=new al;function Ze(M,E,U,q){if(M.visible===!1)return;if(M.layers.test(E.layers)){if(M.isGroup)U=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(E);else if(M.isLight)g.pushLight(M),M.castShadow&&g.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||ae.intersectsSprite(M)){q&&N.setFromMatrixPosition(M.matrixWorld).applyMatrix4(I);const te=We.update(M),me=M.material;me.visible&&v.push(M,te,me,U,N.z,null)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||ae.intersectsObject(M))){const te=We.update(M),me=M.material;if(q&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),N.copy(M.boundingSphere.center)):(te.boundingSphere===null&&te.computeBoundingSphere(),N.copy(te.boundingSphere.center)),N.applyMatrix4(M.matrixWorld).applyMatrix4(I)),Array.isArray(me)){const _e=te.groups;for(let Te=0,Ue=_e.length;Te<Ue;Te++){const Ie=_e[Te],Ne=me[Ie.materialIndex];Ne&&Ne.visible&&v.push(M,te,Ne,U,N.z,Ie)}}else me.visible&&v.push(M,te,me,U,N.z,null)}}const O=M.children;for(let te=0,me=O.length;te<me;te++)Ze(O[te],E,U,q)}function Xe(M,E,U,q){const O=M.opaque,te=M.transmissive,me=M.transparent;g.setupLightsView(U),ve===!0&&rt.setGlobalState(_.clippingPlanes,U),q&&k.viewport(X.copy(q)),O.length>0&&at(O,E,U),te.length>0&&at(te,E,U),me.length>0&&at(me,E,U),k.buffers.depth.setTest(!0),k.buffers.depth.setMask(!0),k.buffers.color.setMask(!0),k.setPolygonOffset(!1)}function Ge(M,E,U,q){if((U.isScene===!0?U.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[q.id]===void 0&&(g.state.transmissionRenderTarget[q.id]=new qn(1,1,{generateMipmaps:!0,type:W.has("EXT_color_buffer_half_float")||W.has("EXT_color_buffer_float")?Ki:_n,minFilter:mi,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:nt.workingColorSpace}));const O=g.state.transmissionRenderTarget[q.id],te=q.viewport||X;O.setSize(te.z,te.w);const me=_.getRenderTarget();_.setRenderTarget(O),_.getClearColor(Z),j=_.getClearAlpha(),j<1&&_.setClearColor(16777215,.5),_.clear(),b&&Ve.render(U);const _e=_.toneMapping;_.toneMapping=Pn;const Te=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),g.setupLightsView(q),ve===!0&&rt.setGlobalState(_.clippingPlanes,q),at(M,U,q),ie.updateMultisampleRenderTarget(O),ie.updateRenderTargetMipmap(O),W.has("WEBGL_multisampled_render_to_texture")===!1){let Ue=!1;for(let Ie=0,Ne=E.length;Ie<Ne;Ie++){const Qe=E[Ie],ht=Qe.object,ct=Qe.geometry,Mt=Qe.material,st=Qe.group;if(Mt.side===2&&ht.layers.test(q.layers)){const et=Mt.side;Mt.side=It,Mt.needsUpdate=!0,ye(ht,U,q,ct,Mt,st),Mt.side=et,Mt.needsUpdate=!0,Ue=!0}}Ue===!0&&(ie.updateMultisampleRenderTarget(O),ie.updateRenderTargetMipmap(O))}_.setRenderTarget(me),_.setClearColor(Z,j),Te!==void 0&&(q.viewport=Te),_.toneMapping=_e}function at(M,E,U){const q=E.isScene===!0?E.overrideMaterial:null;for(let O=0,te=M.length;O<te;O++){const me=M[O],_e=me.object,Te=me.geometry,Ue=q===null?me.material:q,Ie=me.group;_e.layers.test(U.layers)&&ye(_e,E,U,Te,Ue,Ie)}}function ye(M,E,U,q,O,te){M.onBeforeRender(_,E,U,q,O,te),M.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),O.onBeforeRender(_,E,U,q,M,te),O.transparent===!0&&O.side===2&&O.forceSinglePass===!1?(O.side=It,O.needsUpdate=!0,_.renderBufferDirect(U,E,q,O,M,te),O.side=Ln,O.needsUpdate=!0,_.renderBufferDirect(U,E,q,O,M,te),O.side=2):_.renderBufferDirect(U,E,q,O,M,te),M.onAfterRender(_,E,U,q,O,te)}function pe(M,E,U){E.isScene!==!0&&(E=z);const q=he.get(M),O=g.state.lights,te=g.state.shadowsArray,me=O.state.version,_e=He.getParameters(M,O.state,te,E,U),Te=He.getProgramCacheKey(_e);let Ue=q.programs;q.environment=M.isMeshStandardMaterial?E.environment:null,q.fog=E.fog,q.envMap=(M.isMeshStandardMaterial?xe:Me).get(M.envMap||q.environment),q.envMapRotation=q.environment!==null&&M.envMap===null?E.environmentRotation:M.envMapRotation,Ue===void 0&&(M.addEventListener("dispose",J),Ue=new Map,q.programs=Ue);let Ie=Ue.get(Te);if(Ie!==void 0){if(q.currentProgram===Ie&&q.lightsStateVersion===me)return Fe(M,_e),Ie}else _e.uniforms=He.getUniforms(M),M.onBeforeCompile(_e,_),Ie=He.acquireProgram(_e,Te),Ue.set(Te,Ie),q.uniforms=_e.uniforms;const Ne=q.uniforms;return(M.isShaderMaterial||M.isRawShaderMaterial)&&M.clipping!==!0||(Ne.clippingPlanes=rt.uniform),Fe(M,_e),q.needsLights=function(Qe){return Qe.isMeshLambertMaterial||Qe.isMeshToonMaterial||Qe.isMeshPhongMaterial||Qe.isMeshStandardMaterial||Qe.isShadowMaterial||Qe.isShaderMaterial&&Qe.lights===!0}(M),q.lightsStateVersion=me,q.needsLights&&(Ne.ambientLightColor.value=O.state.ambient,Ne.lightProbe.value=O.state.probe,Ne.directionalLights.value=O.state.directional,Ne.directionalLightShadows.value=O.state.directionalShadow,Ne.spotLights.value=O.state.spot,Ne.spotLightShadows.value=O.state.spotShadow,Ne.rectAreaLights.value=O.state.rectArea,Ne.ltc_1.value=O.state.rectAreaLTC1,Ne.ltc_2.value=O.state.rectAreaLTC2,Ne.pointLights.value=O.state.point,Ne.pointLightShadows.value=O.state.pointShadow,Ne.hemisphereLights.value=O.state.hemi,Ne.directionalShadowMap.value=O.state.directionalShadowMap,Ne.directionalShadowMatrix.value=O.state.directionalShadowMatrix,Ne.spotShadowMap.value=O.state.spotShadowMap,Ne.spotLightMatrix.value=O.state.spotLightMatrix,Ne.spotLightMap.value=O.state.spotLightMap,Ne.pointShadowMap.value=O.state.pointShadowMap,Ne.pointShadowMatrix.value=O.state.pointShadowMatrix),q.currentProgram=Ie,q.uniformsList=null,Ie}function Ce(M){if(M.uniformsList===null){const E=M.currentProgram.getUniforms();M.uniformsList=Cr.seqWithValue(E.seq,M.uniforms)}return M.uniformsList}function Fe(M,E){const U=he.get(M);U.outputColorSpace=E.outputColorSpace,U.batching=E.batching,U.batchingColor=E.batchingColor,U.instancing=E.instancing,U.instancingColor=E.instancingColor,U.instancingMorph=E.instancingMorph,U.skinning=E.skinning,U.morphTargets=E.morphTargets,U.morphNormals=E.morphNormals,U.morphColors=E.morphColors,U.morphTargetsCount=E.morphTargetsCount,U.numClippingPlanes=E.numClippingPlanes,U.numIntersection=E.numClipIntersection,U.vertexAlphas=E.vertexAlphas,U.vertexTangents=E.vertexTangents,U.toneMapping=E.toneMapping}Re.setAnimationLoop(function(M){ee&&ee(M)}),typeof self<"u"&&Re.setContext(self),this.setAnimationLoop=function(M){ee=M,ft.setAnimationLoop(M),M===null?Re.stop():Re.start()},ft.addEventListener("sessionstart",Ee),ft.addEventListener("sessionend",be),this.render=function(M,E){if(E!==void 0&&E.isCamera!==!0)return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(y===!0)return;if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),E.parent===null&&E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),ft.enabled===!0&&ft.isPresenting===!0&&(ft.cameraAutoUpdate===!0&&ft.updateCamera(E),E=ft.getCamera()),M.isScene===!0&&M.onBeforeRender(_,M,E,L),g=Oe.get(M,x.length),g.init(E),x.push(g),I.multiplyMatrices(E.projectionMatrix,E.matrixWorldInverse),ae.setFromProjectionMatrix(I),w=this.localClippingEnabled,ve=rt.init(this.clippingPlanes,w),v=$e.get(M,f.length),v.init(),f.push(v),ft.enabled===!0&&ft.isPresenting===!0){const te=_.xr.getDepthSensingMesh();te!==null&&Ze(te,E,-1/0,_.sortObjects)}Ze(M,E,0,_.sortObjects),v.finish(),_.sortObjects===!0&&v.sort(de,ge),b=ft.enabled===!1||ft.isPresenting===!1||ft.hasDepthSensing()===!1,b&&Ve.addToRenderList(v,M),this.info.render.frame++,ve===!0&&rt.beginShadows();const U=g.state.shadowsArray;Se.render(U,M,E),ve===!0&&rt.endShadows(),this.info.autoReset===!0&&this.info.reset();const q=v.opaque,O=v.transmissive;if(g.setupLights(),E.isArrayCamera){const te=E.cameras;if(O.length>0)for(let me=0,_e=te.length;me<_e;me++)Ge(q,O,M,te[me]);b&&Ve.render(M);for(let me=0,_e=te.length;me<_e;me++){const Te=te[me];Xe(v,M,Te,Te.viewport)}}else O.length>0&&Ge(q,O,M,E),b&&Ve.render(M),Xe(v,M,E);L!==null&&(ie.updateMultisampleRenderTarget(L),ie.updateRenderTargetMipmap(L)),M.isScene===!0&&M.onAfterRender(_,M,E),_t.resetDefaultState(),Y=-1,F=null,x.pop(),x.length>0?(g=x[x.length-1],ve===!0&&rt.setGlobalState(_.clippingPlanes,g.state.camera)):g=null,f.pop(),v=f.length>0?f[f.length-1]:null},this.getActiveCubeFace=function(){return C},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(M,E,U){he.get(M.texture).__webglTexture=E,he.get(M.depthTexture).__webglTexture=U;const q=he.get(M);q.__hasExternalTextures=!0,q.__autoAllocateDepthBuffer=U===void 0,q.__autoAllocateDepthBuffer||W.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),q.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(M,E){const U=he.get(M);U.__webglFramebuffer=E,U.__useDefaultFramebuffer=E===void 0},this.setRenderTarget=function(M,E=0,U=0){L=M,C=E,A=U;let q=!0,O=null,te=!1,me=!1;if(M){const _e=he.get(M);if(_e.__useDefaultFramebuffer!==void 0)k.bindFramebuffer(D.FRAMEBUFFER,null),q=!1;else if(_e.__webglFramebuffer===void 0)ie.setupRenderTarget(M);else if(_e.__hasExternalTextures)ie.rebindTextures(M,he.get(M.texture).__webglTexture,he.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){const Ie=M.depthTexture;if(_e.__boundDepthTexture!==Ie){if(Ie!==null&&he.has(Ie)&&(M.width!==Ie.image.width||M.height!==Ie.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ie.setupDepthRenderbuffer(M)}}const Te=M.texture;(Te.isData3DTexture||Te.isDataArrayTexture||Te.isCompressedArrayTexture)&&(me=!0);const Ue=he.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(O=Array.isArray(Ue[E])?Ue[E][U]:Ue[E],te=!0):O=M.samples>0&&ie.useMultisampledRTT(M)===!1?he.get(M).__webglMultisampledFramebuffer:Array.isArray(Ue)?Ue[U]:Ue,X.copy(M.viewport),V.copy(M.scissor),G=M.scissorTest}else X.copy(Le).multiplyScalar(le).floor(),V.copy(re).multiplyScalar(le).floor(),G=ce;if(k.bindFramebuffer(D.FRAMEBUFFER,O)&&q&&k.drawBuffers(M,O),k.viewport(X),k.scissor(V),k.setScissorTest(G),te){const _e=he.get(M.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+E,_e.__webglTexture,U)}else if(me){const _e=he.get(M.texture),Te=E||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,_e.__webglTexture,U||0,Te)}Y=-1},this.readRenderTargetPixels=function(M,E,U,q,O,te,me){if(!M||!M.isWebGLRenderTarget)return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _e=he.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&me!==void 0&&(_e=_e[me]),_e){k.bindFramebuffer(D.FRAMEBUFFER,_e);try{const Te=M.texture,Ue=Te.format,Ie=Te.type;if(!ue.textureFormatReadable(Ue))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(!ue.textureTypeReadable(Ie))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");E>=0&&E<=M.width-q&&U>=0&&U<=M.height-O&&D.readPixels(E,U,q,O,bt.convert(Ue),bt.convert(Ie),te)}finally{const Te=L!==null?he.get(L).__webglFramebuffer:null;k.bindFramebuffer(D.FRAMEBUFFER,Te)}}},this.readRenderTargetPixelsAsync=async function(M,E,U,q,O,te,me){if(!M||!M.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _e=he.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&me!==void 0&&(_e=_e[me]),_e){const Te=M.texture,Ue=Te.format,Ie=Te.type;if(!ue.textureFormatReadable(Ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!ue.textureTypeReadable(Ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(E>=0&&E<=M.width-q&&U>=0&&U<=M.height-O){k.bindFramebuffer(D.FRAMEBUFFER,_e);const Ne=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Ne),D.bufferData(D.PIXEL_PACK_BUFFER,te.byteLength,D.STREAM_READ),D.readPixels(E,U,q,O,bt.convert(Ue),bt.convert(Ie),0);const Qe=L!==null?he.get(L).__webglFramebuffer:null;k.bindFramebuffer(D.FRAMEBUFFER,Qe);const ht=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await function(ct,Mt,st){return new Promise(function(et,ut){setTimeout(function Et(){switch(ct.clientWaitSync(Mt,ct.SYNC_FLUSH_COMMANDS_BIT,0)){case ct.WAIT_FAILED:ut();break;case ct.TIMEOUT_EXPIRED:setTimeout(Et,st);break;default:et()}},st)})}(D,ht,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Ne),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,te),D.deleteBuffer(Ne),D.deleteSync(ht),te}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(M,E=null,U=0){M.isTexture!==!0&&(Rr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),E=arguments[0]||null,M=arguments[1]);const q=Math.pow(2,-U),O=Math.floor(M.image.width*q),te=Math.floor(M.image.height*q),me=E!==null?E.x:0,_e=E!==null?E.y:0;ie.setTexture2D(M,0),D.copyTexSubImage2D(D.TEXTURE_2D,U,0,0,me,_e,O,te),k.unbindTexture()},this.copyTextureToTexture=function(M,E,U=null,q=null,O=0){let te,me,_e,Te,Ue,Ie;M.isTexture!==!0&&(Rr("WebGLRenderer: copyTextureToTexture function signature has changed."),q=arguments[0]||null,M=arguments[1],E=arguments[2],O=arguments[3]||0,U=null),U!==null?(te=U.max.x-U.min.x,me=U.max.y-U.min.y,_e=U.min.x,Te=U.min.y):(te=M.image.width,me=M.image.height,_e=0,Te=0),q!==null?(Ue=q.x,Ie=q.y):(Ue=0,Ie=0);const Ne=bt.convert(E.format),Qe=bt.convert(E.type);ie.setTexture2D(E,0),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,E.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,E.unpackAlignment);const ht=D.getParameter(D.UNPACK_ROW_LENGTH),ct=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Mt=D.getParameter(D.UNPACK_SKIP_PIXELS),st=D.getParameter(D.UNPACK_SKIP_ROWS),et=D.getParameter(D.UNPACK_SKIP_IMAGES),ut=M.isCompressedTexture?M.mipmaps[O]:M.image;D.pixelStorei(D.UNPACK_ROW_LENGTH,ut.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ut.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,_e),D.pixelStorei(D.UNPACK_SKIP_ROWS,Te),M.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,O,Ue,Ie,te,me,Ne,Qe,ut.data):M.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,O,Ue,Ie,ut.width,ut.height,Ne,ut.data):D.texSubImage2D(D.TEXTURE_2D,O,Ue,Ie,te,me,Ne,Qe,ut),D.pixelStorei(D.UNPACK_ROW_LENGTH,ht),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ct),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Mt),D.pixelStorei(D.UNPACK_SKIP_ROWS,st),D.pixelStorei(D.UNPACK_SKIP_IMAGES,et),O===0&&E.generateMipmaps&&D.generateMipmap(D.TEXTURE_2D),k.unbindTexture()},this.copyTextureToTexture3D=function(M,E,U=null,q=null,O=0){let te,me,_e,Te,Ue,Ie,Ne,Qe,ht;M.isTexture!==!0&&(Rr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),U=arguments[0]||null,q=arguments[1]||null,M=arguments[2],E=arguments[3],O=arguments[4]||0);const ct=M.isCompressedTexture?M.mipmaps[O]:M.image;U!==null?(te=U.max.x-U.min.x,me=U.max.y-U.min.y,_e=U.max.z-U.min.z,Te=U.min.x,Ue=U.min.y,Ie=U.min.z):(te=ct.width,me=ct.height,_e=ct.depth,Te=0,Ue=0,Ie=0),q!==null?(Ne=q.x,Qe=q.y,ht=q.z):(Ne=0,Qe=0,ht=0);const Mt=bt.convert(E.format),st=bt.convert(E.type);let et;if(E.isData3DTexture)ie.setTexture3D(E,0),et=D.TEXTURE_3D;else{if(!E.isDataArrayTexture&&!E.isCompressedArrayTexture)return void console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");ie.setTexture2DArray(E,0),et=D.TEXTURE_2D_ARRAY}D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,E.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,E.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,E.unpackAlignment);const ut=D.getParameter(D.UNPACK_ROW_LENGTH),Et=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Ye=D.getParameter(D.UNPACK_SKIP_PIXELS),Be=D.getParameter(D.UNPACK_SKIP_ROWS),Yt=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,ct.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ct.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Te),D.pixelStorei(D.UNPACK_SKIP_ROWS,Ue),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Ie),M.isDataTexture||M.isData3DTexture?D.texSubImage3D(et,O,Ne,Qe,ht,te,me,_e,Mt,st,ct.data):E.isCompressedArrayTexture?D.compressedTexSubImage3D(et,O,Ne,Qe,ht,te,me,_e,Mt,ct.data):D.texSubImage3D(et,O,Ne,Qe,ht,te,me,_e,Mt,st,ct),D.pixelStorei(D.UNPACK_ROW_LENGTH,ut),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Et),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Ye),D.pixelStorei(D.UNPACK_SKIP_ROWS,Be),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Yt),O===0&&E.generateMipmaps&&D.generateMipmap(et),k.unbindTexture()},this.initRenderTarget=function(M){he.get(M).__webglFramebuffer===void 0&&ie.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?ie.setTextureCube(M,0):M.isData3DTexture?ie.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?ie.setTexture2DArray(M,0):ie.setTexture2D(M,0),k.unbindTexture()},this.resetState=function(){C=0,A=0,L=null,k.reset(),_t.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ei}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===xs?"display-p3":"srgb",t.unpackColorSpace=nt.workingColorSpace===Hr?"display-p3":"srgb"}}class ku extends yt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Nt,this.environmentIntensity=1,this.environmentRotation=new Nt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}new T;new T;new T;new T;new ke;new ke;new Pe;new T;new T;new T;new ke;new ke;new ke;new T;new T;new T;new it;new it;new T;new Pe;new T;new xn;new Pe;new Ji;class Wu extends At{constructor(e=null,t=1,n=1,r,a,o,l,s,c=1003,u=1003,d,h){super(null,o,l,s,c,u,r,a,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}new Pe;new Pe;class yo extends zt{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const hi=new Pe,Eo=new Pe,Mr=[],bo=new vn,Xu=new Pe,zi=new pt,Hi=new xn;class fi extends pt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new yo(new Float32Array(16*n),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,Xu)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new vn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,hi),bo.copy(e.boundingBox).applyMatrix4(hi),this.boundingBox.union(bo)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new xn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,hi),Hi.copy(e.boundingSphere).applyMatrix4(hi),this.boundingSphere.union(Hi)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,3*e)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,16*e)}getMorphAt(e,t){const n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,a=e*(n.length+1)+1;for(let o=0;o<n.length;o++)n[o]=r[a+o]}raycast(e,t){const n=this.matrixWorld,r=this.count;if(zi.geometry=this.geometry,zi.material=this.material,zi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Hi.copy(this.boundingSphere),Hi.applyMatrix4(n),e.ray.intersectsSphere(Hi)!==!1))for(let a=0;a<r;a++){this.getMatrixAt(a,hi),Eo.multiplyMatrices(n,hi),zi.matrixWorld=Eo,zi.raycast(e,Mr);for(let o=0,l=Mr.length;o<l;o++){const s=Mr[o];s.instanceId=a,s.object=this,t.push(s)}Mr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new yo(new Float32Array(3*this.instanceMatrix.count).fill(1),3)),t.toArray(this.instanceColor.array,3*e)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,16*e)}setMorphAt(e,t){const n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Wu(new Float32Array(r*this.count),r,this.count,ms,cn));const a=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const l=this.geometry.morphTargetsRelative?1:1-o,s=r*e;a[s]=l,a.set(n,s+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}new Pe;new Pe;new Pe;new ze(1,1,1);new Pe;new Gr;new vn;new xn;new T;new T;new T;new pt;class hl extends wi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ze(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Or=new T,Fr=new T,To=new Pe,Gi=new Ji,Sr=new xn,ba=new T,wo=new T;class ju extends yt{constructor(e=new Ot,t=new hl){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,a=t.count;r<a;r++)Or.fromBufferAttribute(t,r-1),Fr.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Or.distanceTo(Fr);e.setAttribute("lineDistance",new gt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,a=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Sr.copy(n.boundingSphere),Sr.applyMatrix4(r),Sr.radius+=a,e.ray.intersectsSphere(Sr)===!1)return;To.copy(r).invert(),Gi.copy(e.ray).applyMatrix4(To);const l=a/((this.scale.x+this.scale.y+this.scale.z)/3),s=l*l,c=this.isLineSegments?2:1,u=n.index,d=n.attributes.position;if(u!==null){const h=Math.max(0,o.start),p=Math.min(u.count,o.start+o.count);for(let m=h,v=p-1;m<v;m+=c){const g=u.getX(m),f=u.getX(m+1),x=yr(this,e,Gi,s,g,f);x&&t.push(x)}if(this.isLineLoop){const m=u.getX(p-1),v=u.getX(h),g=yr(this,e,Gi,s,m,v);g&&t.push(g)}}else{const h=Math.max(0,o.start),p=Math.min(d.count,o.start+o.count);for(let m=h,v=p-1;m<v;m+=c){const g=yr(this,e,Gi,s,m,m+1);g&&t.push(g)}if(this.isLineLoop){const m=yr(this,e,Gi,s,p-1,h);m&&t.push(m)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){const n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function yr(i,e,t,n,r,a){const o=i.geometry.attributes.position;if(Or.fromBufferAttribute(o,r),Fr.fromBufferAttribute(o,a),t.distanceSqToSegment(Or,Fr,ba,wo)>n)return;ba.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(ba);return l<e.near||l>e.far?void 0:{distance:l,point:wo.clone().applyMatrix4(i.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:i}}new T;new T;new Pe;new Ji;new xn;new T;class dl extends At{constructor(e,t,n,r,a,o,l,s,c){super(e,t,n,r,a,o,l,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}new T;class Yn extends Ot{constructor(e=1,t=1,n=1,r=32,a=1,o=!1,l=0,s=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:a,openEnded:o,thetaStart:l,thetaLength:s};const c=this;r=Math.floor(r),a=Math.floor(a);const u=[],d=[],h=[],p=[];let m=0;const v=[],g=n/2;let f=0;function x(_){const y=m,C=new ke,A=new T;let L=0;const Y=_===!0?e:t,F=_===!0?1:-1;for(let V=1;V<=r;V++)d.push(0,g*F,0),h.push(0,F,0),p.push(.5,.5),m++;const X=m;for(let V=0;V<=r;V++){const G=V/r*s+l,Z=Math.cos(G),j=Math.sin(G);A.x=Y*j,A.y=g*F,A.z=Y*Z,d.push(A.x,A.y,A.z),h.push(0,F,0),C.x=.5*Z+.5,C.y=.5*j*F+.5,p.push(C.x,C.y),m++}for(let V=0;V<r;V++){const G=y+V,Z=X+V;_===!0?u.push(Z,Z+1,G):u.push(Z+1,Z,G),L+=3}c.addGroup(f,L,_===!0?1:2),f+=L}(function(){const _=new T,y=new T;let C=0;const A=(t-e)/n;for(let L=0;L<=a;L++){const Y=[],F=L/a,X=F*(t-e)+e;for(let V=0;V<=r;V++){const G=V/r,Z=G*s+l,j=Math.sin(Z),$=Math.cos(Z);y.x=X*j,y.y=-F*n+g,y.z=X*$,d.push(y.x,y.y,y.z),_.set(j,A,$).normalize(),h.push(_.x,_.y,_.z),p.push(G,1-F),Y.push(m++)}v.push(Y)}for(let L=0;L<r;L++)for(let Y=0;Y<a;Y++){const F=v[Y][L],X=v[Y+1][L],V=v[Y+1][L+1],G=v[Y][L+1];e>0&&(u.push(F,X,G),C+=3),t>0&&(u.push(X,V,G),C+=3)}c.addGroup(f,C,0),f+=C})(),o===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(u),this.setAttribute("position",new gt(d,3)),this.setAttribute("normal",new gt(h,3)),this.setAttribute("uv",new gt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Br extends Yn{constructor(e=1,t=1,n=32,r=1,a=!1,o=0,l=2*Math.PI){super(0,e,t,n,r,a,o,l),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l}}static fromJSON(e){return new Br(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class bs extends Ot{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};const a=[],o=[];function l(h,p,m,v){const g=v+1,f=[];for(let x=0;x<=g;x++){f[x]=[];const _=h.clone().lerp(m,x/g),y=p.clone().lerp(m,x/g),C=g-x;for(let A=0;A<=C;A++)f[x][A]=A===0&&x===g?_:_.clone().lerp(y,A/C)}for(let x=0;x<g;x++)for(let _=0;_<2*(g-x)-1;_++){const y=Math.floor(_/2);_%2==0?(s(f[x][y+1]),s(f[x+1][y]),s(f[x][y])):(s(f[x][y+1]),s(f[x+1][y+1]),s(f[x+1][y]))}}function s(h){a.push(h.x,h.y,h.z)}function c(h,p){const m=3*h;p.x=e[m+0],p.y=e[m+1],p.z=e[m+2]}function u(h,p,m,v){v<0&&h.x===1&&(o[p]=h.x-1),m.x===0&&m.z===0&&(o[p]=v/2/Math.PI+.5)}function d(h){return Math.atan2(h.z,-h.x)}(function(h){const p=new T,m=new T,v=new T;for(let g=0;g<t.length;g+=3)c(t[g+0],p),c(t[g+1],m),c(t[g+2],v),l(p,m,v,h)})(r),function(h){const p=new T;for(let m=0;m<a.length;m+=3)p.x=a[m+0],p.y=a[m+1],p.z=a[m+2],p.normalize().multiplyScalar(h),a[m+0]=p.x,a[m+1]=p.y,a[m+2]=p.z}(n),function(){const h=new T;for(let m=0;m<a.length;m+=3){h.x=a[m+0],h.y=a[m+1],h.z=a[m+2];const v=d(h)/2/Math.PI+.5,g=(p=h,Math.atan2(-p.y,Math.sqrt(p.x*p.x+p.z*p.z))/Math.PI+.5);o.push(v,1-g)}var p;(function(){const m=new T,v=new T,g=new T,f=new T,x=new ke,_=new ke,y=new ke;for(let C=0,A=0;C<a.length;C+=9,A+=6){m.set(a[C+0],a[C+1],a[C+2]),v.set(a[C+3],a[C+4],a[C+5]),g.set(a[C+6],a[C+7],a[C+8]),x.set(o[A+0],o[A+1]),_.set(o[A+2],o[A+3]),y.set(o[A+4],o[A+5]),f.copy(m).add(v).add(g).divideScalar(3);const L=d(f);u(x,A+0,m,L),u(_,A+2,v,L),u(y,A+4,g,L)}})(),function(){for(let m=0;m<o.length;m+=6){const v=o[m+0],g=o[m+2],f=o[m+4],x=Math.max(v,g,f),_=Math.min(v,g,f);x>.9&&_<.1&&(v<.2&&(o[m+0]+=1),g<.2&&(o[m+2]+=1),f<.2&&(o[m+4]+=1))}}()}(),this.setAttribute("position",new gt(a,3)),this.setAttribute("normal",new gt(a.slice(),3)),this.setAttribute("uv",new gt(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bs(e.vertices,e.indices,e.radius,e.details)}}new T;new T;new T;new Wt;class Ts extends bs{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2;super([-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Ts(e.radius,e.detail)}}class kr extends Ot{constructor(e=1,t=32,n=16,r=0,a=2*Math.PI,o=0,l=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:a,thetaStart:o,thetaLength:l},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const s=Math.min(o+l,Math.PI);let c=0;const u=[],d=new T,h=new T,p=[],m=[],v=[],g=[];for(let f=0;f<=n;f++){const x=[],_=f/n;let y=0;f===0&&o===0?y=.5/t:f===n&&s===Math.PI&&(y=-.5/t);for(let C=0;C<=t;C++){const A=C/t;d.x=-e*Math.cos(r+A*a)*Math.sin(o+_*l),d.y=e*Math.cos(o+_*l),d.z=e*Math.sin(r+A*a)*Math.sin(o+_*l),m.push(d.x,d.y,d.z),h.copy(d).normalize(),v.push(h.x,h.y,h.z),g.push(A+y,1-_),x.push(c++)}u.push(x)}for(let f=0;f<n;f++)for(let x=0;x<t;x++){const _=u[f][x+1],y=u[f][x],C=u[f+1][x],A=u[f+1][x+1];(f!==0||o>0)&&p.push(_,y,A),(f!==n-1||s<Math.PI)&&p.push(y,C,A)}this.setIndex(p),this.setAttribute("position",new gt(m,3)),this.setAttribute("normal",new gt(v,3)),this.setAttribute("uv",new gt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new kr(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Yi extends Ot{constructor(e=1,t=.4,n=12,r=48,a=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:a},n=Math.floor(n),r=Math.floor(r);const o=[],l=[],s=[],c=[],u=new T,d=new T,h=new T;for(let p=0;p<=n;p++)for(let m=0;m<=r;m++){const v=m/r*a,g=p/n*Math.PI*2;d.x=(e+t*Math.cos(g))*Math.cos(v),d.y=(e+t*Math.cos(g))*Math.sin(v),d.z=t*Math.sin(g),l.push(d.x,d.y,d.z),u.x=e*Math.cos(v),u.y=e*Math.sin(v),h.subVectors(d,u).normalize(),s.push(h.x,h.y,h.z),c.push(m/r),c.push(p/n)}for(let p=1;p<=n;p++)for(let m=1;m<=r;m++){const v=(r+1)*p+m-1,g=(r+1)*(p-1)+m-1,f=(r+1)*(p-1)+m,x=(r+1)*p+m;o.push(v,g,x),o.push(g,f,x)}this.setIndex(o),this.setAttribute("position",new gt(l,3)),this.setAttribute("normal",new gt(s,3)),this.setAttribute("uv",new gt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yi(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Ct extends wi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ze(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new ke(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Nt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ws extends yt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ze(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class qu extends ws{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ze(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Ta=new Pe,Ao=new T,Ro=new T;class pl{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ke(512,512),this.map=null,this.mapPass=null,this.matrix=new Pe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Gr,this._frameExtents=new ke(1,1),this._viewportCount=1,this._viewports=[new it(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Ao.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ao),Ro.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ro),t.updateMatrixWorld(),Ta.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ta),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ta)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),this.mapSize.x===512&&this.mapSize.y===512||(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Co=new Pe,Vi=new T,wa=new T;class Yu extends pl{constructor(){super(new kt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ke(4,2),this._viewportCount=6,this._viewports=[new it(2,1,1,1),new it(0,1,1,1),new it(3,1,1,1),new it(1,1,1,1),new it(3,0,1,1),new it(1,0,1,1)],this._cubeDirections=[new T(1,0,0),new T(-1,0,0),new T(0,0,1),new T(0,0,-1),new T(0,1,0),new T(0,-1,0)],this._cubeUps=[new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,0,1),new T(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,r=this.matrix,a=e.distance||n.far;a!==n.far&&(n.far=a,n.updateProjectionMatrix()),Vi.setFromMatrixPosition(e.matrixWorld),n.position.copy(Vi),wa.copy(n.position),wa.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(wa),n.updateMatrixWorld(),r.makeTranslation(-Vi.x,-Vi.y,-Vi.z),Co.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Co)}}class Ku extends ws{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new Yu}get power(){return 4*this.intensity*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Zu extends pl{constructor(){super(new ys(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ju extends ws{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.target=new yt,this.shadow=new Zu}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}new Pe;new Pe;new Pe;new T;new T;new T;new T;new T;new T;const fl="\\[\\]\\.:\\/",Aa="[^"+fl+"]",$u="[^"+fl.replace("\\.","")+"]";new RegExp("^"+/((?:WC+[\/:])*)/.source.replace("WC",Aa)+/(WCOD+)?/.source.replace("WCOD",$u)+/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Aa)+/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Aa)+"$");const Po=new Pe;class Qu{constructor(e,t,n=0,r=1/0){this.ray=new Ji(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new Ms,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Po.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Po),this}intersectObject(e,t=!0,n=[]){return cs(e,this,n,t),n.sort(Lo),n}intersectObjects(e,t=!0,n=[]){for(let r=0,a=e.length;r<a;r++)cs(e[r],this,n,t);return n.sort(Lo),n}}function Lo(i,e){return i.distance-e.distance}function cs(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){const a=i.children;for(let o=0,l=a.length;o<l;o++)cs(a[o],e,t,!0)}}new ke;new T;new T;new T;new T;new Pe;new Pe;new T;new ze;new ze;new T;new T;new T;new T;new Ss;new vn;new T;typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ca}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ca);const B={cyl:new Yn(1,1,1,24),cyl8:new Yn(1,1,1,8),cone:new Br(1,1,16),pyr:new Br(1,1,4),box:new Zn(1,1,1),sph:new kr(1,12,9),tore:new Yi(1,.08,6,24),plan:new Ai(1,1)},Kn=new Map,eh=i=>{for(const e of Kn.values())if(e===i)return!0;return!1};function th(){var i;for(const e of Kn.values())(i=e.map)==null||i.dispose(),e.dispose();Kn.clear()}const ne=(i,e=.7,t=0,n=0)=>{const r=`${i}|${e}|${t}|${n}`;let a=Kn.get(r);return a||(a=new Ct({color:i,roughness:e,metalness:t}),n&&(a.emissive=new ze(i),a.emissiveIntensity=n),Kn.set(r,a)),a},Ke=()=>ne("#C9A74E",.32,.75),us=()=>ne("#E3C9A0",.7),Rn=()=>ne("#5A3A26",.65),hs=()=>ne("#FAF5EA",.9),tn=()=>ne("#1C1A20",.5,.2),Pr=["#E8C3A0","#C99A72","#9A6B4A","#F0CFB0"];function gi(i){return(e,t,n,r,a,o,l=o,s=o)=>{const c=new pt(e,t);return c.position.set(n,r,a),c.scale.set(o,l,s),c.castShadow=!0,c.receiveShadow=!0,i.add(c),c}}function vi(i,e,t,n,r,a=0,o=1){i(B.cone,ne(r,.85),e,t+.36*o,n,.2*o,.72*o,.2*o),i(B.sph,ne(Pr[a%4],.8),e,t+.82*o,n,.11*o),i(B.sph,ne(a%3===0?"#2b1d16":"#3a2a20",.9),e,t+.87*o,n-.02*o,.115*o,.09*o,.115*o)}const Ra=()=>ne("#FFD98A",.4,0,1.4);function nh(i,e,t){const n=gi(i),r=e.hw>=e.hd,a=(r?e.hw:e.hd)*2,o=(r?e.hd:e.hw)*2,l=new jt;r||(l.rotation.y=Math.PI/2),i.add(l);const s=gi(l),c=e.id,u=ne(t.accent,.6);ne(t.deco,.35,.6);const d=ne(t.nappe,.95),h=ne(t.fleurs,.8);if(c==="estrade")s(B.box,ne("#6B4A33",.7),0,.15,0,a,.3,o),s(B.box,Ke(),0,.31,o/2-.02,a,.03,.04),s(B.box,u,0,.305,0,a*.9,.012,o*.8),s(B.box,ne("#6B4A33",.7),0,.07,o/2+.2,Math.min(1.4,a*.4),.15,.4),s(B.box,Rn(),-a*.28,.75,-o*.15,.4,.9,.3),s(B.box,Ke(),-a*.28,1.21,-o*.15,.44,.03,.34);else if(c==="dj"){s(B.box,tn(),0,.45,0,a*.6,.9,o*.55),s(B.box,u,0,.92,o*.28,a*.6,.02,.02);for(const p of[-1,1])s(B.cyl,tn(),p*a*.12,.94,0,.17,.03,.17),s(B.cyl,Ke(),p*a*.12,.96,0,.04,.02,.04);s(B.box,ne("#2a2a33",.4),0,.95,0,.18,.04,.3),s(B.box,ne("#cfd6e0",.3,.5),0,1.08,-o*.15,.4,.02,.28).rotation.x=-.9;for(const p of[-1,1])s(B.box,tn(),p*a*.46,.55,0,.3,1.1,.3),s(B.cyl,ne("#3a3a44",.6),p*a*.46,.75,o*.16,.09,.02,.09).rotation.x=Math.PI/2,s(B.cyl,ne("#3a3a44",.6),p*a*.46,.4,o*.16,.12,.02,.12).rotation.x=Math.PI/2;vi(s,0,0,-o*.5,"#1c1a20",2)}else if(c==="regie"){s(B.box,Rn(),0,.37,0,a,.06,o*.9);for(const p of[-1,1])s(B.box,Rn(),p*(a/2-.05),.18,0,.06,.36,o*.9);for(const p of[-.5,0,.5])s(B.box,tn(),p*a*.4,.62,-.1,.4,.26,.03),s(B.box,ne("#E8C27A",.3,0,.8),p*a*.4,.62,-.085,.36,.22,.01);s(B.box,ne("#cfd6e0",.3,.5),0,.4,.15,a*.5,.02,.16)}else if(c==="orch"){s(B.box,ne("#6B4A33",.7),0,.15,0,a,.3,o),s(B.box,Ke(),0,.31,o/2-.02,a,.03,.04);const p=Math.max(3,Math.min(5,Math.round(a/.9)));for(let m=0;m<p;m++){const v=((m+.5)/p-.5)*a*.85,g=s;g(B.cone,ne(m%2?"#1c1a20":"#F6EFDD",.85),v,.3+.36,0,.2,.72,.2),g(B.sph,ne(Pr[m%4],.8),v,.3+.82,0,.11),g(B.sph,ne("#2b1d16",.9),v,.3+.87,-.02,.115,.09,.115),m%2===0?(g(B.sph,ne("#8a4a24",.45),v,.3+.5,.2,.17,.1,.12),g(B.box,Rn(),v+.18,.3+.62,.22,.28,.03,.03)):g(B.cyl,ne("#d8c9a8",.6),v,.3+.35,.25,.13,.3,.13)}}else if(c==="troupe"){const p=["#C9A74E","#9C4A2C","#1F5A4C","#F1E6CE","#9C4A2C"];for(let m=0;m<5;m++){const v=(m-2)*.32,g=m%2*.22-.1;s(B.cone,ne(p[m],.85),v,.4,g,.2,.8,.2),s(B.sph,ne(Pr[m%4],.8),v,.9,g,.11),s(B.cyl,ne(m%2?"#9C4A2C":"#C9A74E",.5),v,.98,g,.14,.1,.14)}s(B.cyl,ne("#8a5a30",.7),-.65,.35,.3,.15,.2,.15),s(B.cyl,ne("#8a5a30",.7),.65,.35,.3,.15,.2,.15)}else if(c==="photobooth"){s(B.box,tn(),0,2/2,-o/2+.05,a,2,.08);for(const m of[-1,1])s(B.box,tn(),m*(a/2-.05),2/2,0,.08,2,o);s(B.box,Rn(),0,2+.04,0,a+.1,.08,o+.1),s(B.box,Ke(),0,2-.1,o/2,a,.05,.03),s(B.box,u,-a/2+.2,2*.55,o/2-.05,.4,2*.8,.04),s(B.box,ne("#FFF4D0",.3,0,1.2),0,2-.25,-o/2+.12,a*.6,.1,.04),s(B.tore,Ke(),0,1.2,-o/2+.14,.18,.18,.4),s(B.box,ne("#FFF4D0",.8),0,.1,0,a-.2,.2,o-.2)}else if(c==="candy"){s(B.box,d,0,.33,0,a,.66,o*.7),s(B.box,Ke(),0,.67,o*.35,a,.025,.03);const p=["#E8A6B0","#F4D774","#9DD3C8","#C9A0DC"];for(let m=0;m<6;m++){const v=((m+.5)/6-.5)*a*.9,g=p[m%4];s(B.cyl,ne("#E8F2F4",.1,0,0),v,.9,0,.1,.4,.1).material=ne("#DCEBF0",.1),s(B.cyl,ne(g,.5),v,.84,0,.085,.26,.085),s(B.cyl,Ke(),v,1.12,0,.07,.04,.07)}s(B.box,ne("#F6EFDD",.8),0,1.3,-o*.33,a,.04,.3),s(B.box,us(),0,.65,-o*.33,a,1.3,.04)}else if(c==="the"){s(B.box,us(),0,.4,0,a,.8,o*.7),s(B.cyl,Ke(),-a*.2,.84,0,.3,.03,.3);for(let p=0;p<3;p++){const m=-a*.2+(p-1)*.2;s(B.cyl,Ke(),m,.97,0,.09,.2,.09),s(B.sph,Ke(),m,1.1,0,.07),s(B.box,Ke(),m+.1,1,0,.1,.02,.02).rotation.z=.5}for(let p=0;p<6;p++)s(B.cyl,ne("#E8D9B0",.2,0,0),a*.15+p%3*.12,.88,(Math.floor(p/3)-.5)*.15,.035,.07,.035);s(B.cyl8,Ke(),a*.4,1.2,-o*.2,.01,.8,.01),s(B.cyl,ne("#FFD98A",.3,0,1.2),a*.4,1,-o*.2,.08,.14,.08)}else if(c==="salon"){s(B.box,ne(t.accent,.95),0,.01,.1,a,.02,o);const p=(m,v,g,f,x)=>{const _=new jt;_.position.set(m,0,v),_.rotation.y=x,l.add(_);const y=gi(_);y(B.box,ne("#9C4A2C",.9),0,.2,0,g,.4,f),y(B.box,ne("#9C4A2C",.9),0,.5,-f*.42,g,.4,f*.18);for(let C=0;C<Math.max(2,Math.floor(g/.55));C++)y(B.box,ne(C%2?"#C9A74E":"#1F5A4C",.9),((C+.5)/Math.max(2,Math.floor(g/.55))-.5)*g*.9,.5,f*.1,.3,.25,.1)};p(0,-o*.4,a*.95,.5,0),p(-a*.45,0,o*.6,.5,Math.PI/2),p(a*.45,0,o*.6,.5,-Math.PI/2),s(B.cyl,Ke(),0,.25,.1,.32,.05,.32),s(B.cyl8,Ke(),0,.12,.1,.06,.24,.06)}else if(c==="fontaine"){const p=e.hw;s(B.cyl8,ne("#1F5A4C",.4),0,.17,0,p,.34,p),s(B.cyl8,ne("#F1E6CE",.5),0,.35,0,p*.92,.04,p*.92),s(B.cyl,ne("#7fd0e0",.05,.1),0,.33,0,p*.82,.04,p*.82),s(B.cyl8,ne("#F1E6CE",.5),0,.6,0,.12,.5,.12),s(B.cyl,ne("#1F5A4C",.4),0,.88,0,.32,.1,.32),s(B.cyl,ne("#9fe0ee",.05,.1,.2),0,.94,0,.27,.03,.27),s(B.sph,ne("#bfeaf5",.1,0,.4),0,1.1,0,.07,.14,.07)}else if(c==="gateau")[[.5,.3],[.38,.28],[.27,.26]].forEach(([p,m],v)=>{const g=.3+[0,.3,.58][v];s(B.cyl,v%2?ne("#F6EFDD",.6):hs(),0,g+m/2,0,p*.85,m,p*.85),s(B.tore,Ke(),0,g+.02,0,p*.86,p*.86,.5).rotation.x=Math.PI/2}),s(B.cyl,d,0,.15,0,.46,.3,.46),s(B.sph,h,0,.95,0,.1);else if(c==="amariya"){const p=a*.6,m=o*.7,v=1.9;s(B.box,ne("#6B4A33",.7),0,.18,0,p,.18,m),s(B.box,u,0,.32,0,p*.8,.1,m*.8);for(const g of[-1,1])for(const f of[-1,1])s(B.cyl8,Ke(),g*(p/2-.08),v/2,f*(m/2-.08),.04,v,.04);s(B.pyr,Ke(),0,v+.2,0,p*.78,.5,m*.78).rotation.y=Math.PI/4,s(B.box,u,0,v-.02,0,p+.1,.06,m+.1);for(const g of[-1,1])s(B.box,ne("#9C4A2C",.9),0,v*.55,g*(m/2-.1),p*.85,v*.6,.02);for(const g of[-1,1])s(B.cyl8,Rn(),0,.12,g*(m/2+.25),p*.5+.2,.025,.025).rotation.z=Math.PI/2;s(B.box,ne("#F6EFDD",.8),0,.5,0,.5,.3,.35)}else if(c==="neggafa")s(B.cone,ne("#C9A74E",.5,.3),0,.5,0,.42,1,.42),s(B.cone,ne("#9C4A2C",.85),0,.55,.02,.32,.9,.3),s(B.sph,ne(Pr[1],.8),0,1.12,0,.12),s(B.cyl,Ke(),0,1.25,0,.14,.1,.14),s(B.tore,Ke(),0,.72,.28,.16,.16,.5).rotation.x=Math.PI/2;else if(c==="fauteuils"){s(B.box,ne("#6B4A33",.7),0,.1,0,a,.2,o),s(B.box,u,0,.21,.05,a*.9,.02,o*.85);for(const p of[-1,1]){const m=p*a*.22;s(B.box,ne("#F6EFDD",.8),m,.45,.02,.55,.3,.5),s(B.box,ne("#F6EFDD",.8),m,.9,-.2,.55,.8,.1),s(B.tore,Ke(),m,1.05,-.14,.26,.26,.4);for(const v of[-1,1])s(B.box,ne("#F6EFDD",.8),m+v*.3,.55,.02,.08,.3,.45)}s(B.cyl,ne("#9C4A2C",.9),0,.3,.3,.12,.2,.12),s(B.sph,h,0,.5,.3,.14,.1,.14)}else if(c==="henne"){s(B.box,ne(t.accent,.95),0,.01,0,a,.02,o);for(const[p,m,v,g]of[[0,-o*.38,a*.95,0],[-a*.4,0,o*.7,Math.PI/2]]){const f=new jt;f.position.set(p,0,m),f.rotation.y=g,l.add(f);const x=gi(f);x(B.box,ne("#9C4A2C",.9),0,.2,0,v,.4,.5),x(B.box,ne("#9C4A2C",.9),0,.5,-.2,v,.4,.1);for(let _=0;_<4;_++)x(B.box,ne(_%2?"#C9A74E":"#F1E6CE",.9),((_+.5)/4-.5)*v*.85,.5,0,.3,.25,.1)}s(B.cyl,Ke(),.1,.2,.1,.34,.04,.34),s(B.cyl8,Ke(),.1,.1,.1,.06,.2,.06);for(let p=0;p<4;p++)s(B.cone,ne("#7a4a22",.7),.1+(p-1.5)*.1,.27,.1,.025,.1,.025).rotation.z=1.2}else if(c==="livre")s(B.cyl,Ke(),0,.5,0,.18,1,.18),s(B.box,ne("#F6EFDD",.7),-.1,1.04,0,.2,.03,.28).rotation.z=.12,s(B.box,ne("#F6EFDD",.7),.1,1.04,0,.2,.03,.28).rotation.z=-.12,s(B.box,ne("#9C4A2C",.8),0,1.01,0,.44,.02,.32),s(B.cyl8,Ke(),.3,1.1,.05,.01,.2,.01).rotation.z=1.1;else if(c.startsWith("mic"))s(B.cyl,tn(),0,.02,0,.14,.04,.14),s(B.cyl8,ne("#cfd6e0",.3,.6),0,.6,0,.012,1.2,.012),s(B.sph,ne("#2a2a33",.4),0,1.25,0,.05);else if(c==="enceintes")s(B.box,tn(),0,.55,0,.5,1.1,.4),s(B.cyl,ne("#3a3a44",.6),0,.8,.205,.14,.02,.14).rotation.x=Math.PI/2,s(B.cyl,ne("#3a3a44",.6),0,.4,.205,.18,.02,.18).rotation.x=Math.PI/2;else if(c==="acoustique")s(B.cyl,Rn(),0,.3,0,.14,.6,.14),vi(n,0,0,0,"#3d352e",1,1),s(B.sph,ne("#a55a28",.4),.14,.55,.16,.15,.1,.07),s(B.box,Rn(),.35,.8,.16,.34,.03,.03).rotation.z=.5;else if(c==="photographe")vi(n,0,0,0,"#1f1d22",0,1.05),s(B.box,tn(),.1,.8,.16,.16,.1,.1),s(B.cyl,tn(),.1,.8,.26,.04,.06,.04).rotation.x=Math.PI/2;else if(c==="interv"){s(B.box,d,0,.36,0,a,.72,o*.6),s(B.box,Ke(),0,.73,o*.3,a,.025,.03);for(let p=0;p<3;p++){const m=((p+.5)/3-.5)*a*.8;s(B.box,ne("#F6EFDD",.7),m,.3,-o*.55,.3,.05,.3),s(B.box,ne("#F6EFDD",.7),m,.6,-o*.7,.3,.45,.04),s(B.cyl,ne("#E8F2F4",.1),m+.12,.82,.05,.035,.18,.035)}}else if(c==="enfants"){s(B.box,ne("#9DD3C8",.95),0,.015,0,a,.03,o);const p=["#E8A6B0","#F4D774","#C9A0DC","#9DD3C8"];for(let m=0;m<5;m++)s(B.box,ne(p[m%4],.8),(m-2)*.45,.13,(m%2-.5)*.7,.26,.26,.26).rotation.y=m;s(B.pyr,ne("#F6EFDD",.9),-a*.3,.55,-o*.25,.7,1.1,.7).rotation.y=Math.PI/4,s(B.sph,ne("#E8A6B0",.4),a*.3,.2,o*.2,.2)}else return!1;return!0}function ih(i,e,t){const n=new jt,r=i.salle.pos,a=i.salle.n,o=gi(n),l=(s,c)=>{const u=new jt;return u.position.set(s,0,c),n.add(u),gi(u)};if((i.accueils.includes("hotesses")||i.accueils.includes("maitre_hotel"))&&r.HOTESSES.forEach(([s,c],u)=>{vi(l(s,c),0,0,0,e.nappe,u,1.1)}),i.accueils.includes("maitre_hotel")){const[s,c]=r.MAITRE_HOTEL,[u,d]=r.HOTESSE_3;vi(l(s,c),0,0,0,"#1f1d22",3,1.15),vi(l(u,d),0,0,0,e.nappe,0,1.1)}if(i.accueils.includes("the")||i.accueils.includes("discret")){const s=l(r.COMPTOIR[0],r.COMPTOIR[1]);s(B.box,us(),0,.4,0,1.2,.8,.5),s(B.box,Ke(),0,.82,.24,1.2,.03,.03),i.accueils.includes("the")?(s(B.cyl,Ke(),-.2,.96,0,.09,.2,.09),s(B.sph,Ke(),-.2,1.08,0,.07),s(B.cyl,Ke(),.25,.84,0,.2,.03,.2)):s(B.box,ne("#F6EFDD",.8),0,.85,0,.5,.04,.3)}if(i.options.has("fleurs")&&r.BOUQUETS.forEach(([s,c])=>{const u=l(s,c);u(B.cyl,Ke(),0,.3,0,.14,.6,.14);for(let d=0;d<7;d++)u(B.sph,ne(d%2?e.fleurs:"#FBF6EA",.8),Math.cos(d*.9)*.18,.78+d%3*.08,Math.sin(d*.9)*.18,.13);u(B.sph,ne("#4F7A4A",.9),0,.7,0,.2,.1,.2)}),i.lumiere==="bougies"&&r.CANDELABRES.forEach(([s,c])=>{const u=l(s,c);u(B.cyl,Ke(),0,.03,0,.14,.06,.14),u(B.cyl8,Ke(),0,.5,0,.025,1,.025);for(const d of[-.16,0,.16])u(B.cyl8,Ke(),d,.98,0,.012,.06,.012),u(B.cyl8,hs(),d,1.1,0,.018,.16,.018),u(B.sph,Ra(),d,1.22,0,.03,.05,.03);u(B.box,Ke(),0,.98,0,.36,.015,.015)}),i.lumiere==="chaleureuse"&&r.POSTES_LANTERNES.forEach(([s,c])=>{const u=l(s,c);u(B.cyl8,Ke(),0,.9,0,.03,1.8,.03),u(B.cyl,Ke(),0,.03,0,.12,.06,.12),u(B.cyl8,Ke(),0,1.92,0,.1,.18,.1),u(B.cyl8,ne("#FFD98A",.3,0,1.3),0,1.78,0,.075,.2,.075),u(B.cone,Ke(),0,2.08,0,.14,.14,.14)}),i.options.has("feux_froids")&&r.FEUX.forEach(([s,c])=>{const u=l(s,c);u(B.cyl,tn(),0,.1,0,.09,.2,.09);for(let d=0;d<6;d++)u(B.sph,ne("#BFE3FF",.3,0,1.4),(d-2.5)*.02,.4+d*.22,0,.035+d*.006)}),i.lumiere==="etoilee"){const s=i.salle.ax,c=3,u=[[[.3,a-.5],[.3,.3]],[[.3,.3],[a-.4,.3]],[[.3,a/2+.1],[a-.4,a/2+.1]],[[s-.9,a-.2],[a-.4,a/2+.1]]],d=[];for(const[[m,v],[g,f]]of u){const x=[];for(let y=0;y<=24;y++){const C=y/24;x.push(new T(m+(g-m)*C,c-Math.sin(C*Math.PI)*.35,v+(f-v)*C))}n.add(new ju(new Ot().setFromPoints(x),new hl({color:3813672})));const _=Math.round(Math.hypot(g-m,f-v)*1.3);for(let y=0;y<_;y++){const C=(y+.5)/_;d.push([m+(g-m)*C,c-Math.sin(C*Math.PI)*.35-.06,v+(f-v)*C])}}const h=new fi(B.sph,Ra(),d.length),p=new Pe;d.forEach(([m,v,g],f)=>{p.compose(new T(m,v,g),new rn,new T(.05,.05,.05)),h.setMatrixAt(f,p)}),n.add(h);for(const[m,v]of[[.3,a-.5],[.3,.3],[a-.4,.3],[.3,a/2+.1],[a-.4,a/2+.1]])o(B.cyl8,ne("#3a3128",.8),m,c/2,v,.03,c,.03)}if(i.lieu==="villa"){const s=t>.5,c=`eau|${s}|${i.options.has("piscine_lumiere")}`;let u=Kn.get(c);if(!u){const d=document.createElement("canvas");d.width=d.height=128;const h=d.getContext("2d");for(let m=0;m<2;m++)for(let v=0;v<2;v++)h.fillStyle=(m+v)%2?"#3FA79C":"#2F8F86",h.fillRect(m*64,v*64,64,64);h.strokeStyle="rgba(240,236,221,0.55)",h.lineWidth=2;for(const[m,v]of[[32,32],[96,96]]){h.beginPath();for(let g=0;g<16;g++){const f=g/16*Math.PI*2-Math.PI/2,x=g%2?8:22;h.lineTo(m+Math.cos(f)*x,v+Math.sin(f)*x)}h.closePath(),h.stroke()}const p=new dl(d);p.colorSpace=Vt,p.wrapS=p.wrapT=Wi,p.repeat.set(10,3),u=new Ct({map:p,color:s?"#2c5f5c":"#ffffff",roughness:.05,metalness:.3}),i.options.has("piscine_lumiere")&&(u.emissive=new ze("#3FD0C0"),u.emissiveIntensity=.55),Kn.set(c,u)}o(B.box,ne("#EFEADF",.6),a/2,-.12,-2.45,a+.4,.3,4.3),o(B.box,u,a/2,0,-2.45,a-.2,.06,3.9);for(let d=0;d<12;d++)o(B.cyl,ne(d%2?e.fleurs:"#FBF6EA",.8),.8+d*1.37%(a-1.6),.05,-.9-d*.73%3,i.options.has("piscine_fleurs")?.12:1e-4,.02,i.options.has("piscine_fleurs")?.12:1e-4);if(i.options.has("piscine_bougies"))for(let d=0;d<8;d++)o(B.cyl,hs(),1.2+d*((a-2.4)/8),.1,-1.4-d%3*.9,.05,.1,.05),o(B.sph,Ra(),1.2+d*((a-2.4)/8),.18,-1.4-d%3*.9,.025,.04,.025);for(const d of[a*.12,a*.37,a*.65]){o(B.cyl8,ne("#5c4630",.9),d,.8,-3.4,.07,1.6,.07);for(let h=0;h<6;h++){const p=h/6*Math.PI*2;o(B.cone,ne("#4F7A4A",.85),d+Math.cos(p)*.5,1.6,-3.4+Math.sin(p)*.5,.12,1,.12).rotation.set(Math.sin(p)*1.2,0,-Math.cos(p)*1.2)}}}return n}function rh(i){const e=i.salle.pos,t=i.options,n=i.salle.n,r=[],a=(s,c,u,d,h=d,p="generique",m=.6)=>r.push({id:s,a:[c,u],hw:d,hd:h,genre:p,h:m}),o=(s,c,u="generique",d=.6)=>a(s,c.gx+c.w/2,c.gy+c.d/2,c.w/2,c.d/2,u,d),l=jr[i.tables];if(i.tables!=="conference"&&i.salle.tables.forEach(([s,c],u)=>a(`t${u}`,s,c,l.dx,l.dy,i.tables==="rondes"?"ronde":i.tables==="rectangulaires"?"rect":"haute")),i.salle.hautes.forEach(([s,c],u)=>a(`th${u}`,s,c,jr.hautes.dx,jr.hautes.dy,"haute")),i.type!=="pro"&&i.type!=="conference"&&i.tables!=="hautes"&&o("honneur",e.HONNEUR,"honneur"),t.has("arche")&&a("arche",e.ARCHE.gx+e.ARCHE.largeur/2,e.ARCHE.gy+.4,e.ARCHE.largeur/2,.4,"arche"),t.has("amariya")&&a("amariya",e.AMARIYA[0]+1.15,e.AMARIYA[1]+.7,1.15,.7,"generique",1.1),t.has("fauteuils")&&a("fauteuils",e.FAUTEUILS[0]+1,e.FAUTEUILS[1]+.6,1,.6,"generique",.8),t.has("neggafa")&&a("neggafa",e.NEGGAFA[0],e.NEGGAFA[1],.45,.45,"generique",.9),t.has("gateau")&&a("gateau",e.GATEAU[0],e.GATEAU[1],.5,.5,"generique",.9),t.has("enfants")&&a("enfants",e.ENFANTS[0]+1.2,e.ENFANTS[1]+1,1.2,1,"generique",.4),t.has("henne")&&a("henne",e.HENNE[0]+1.1,e.HENNE[1]+1.1,1.1,1.1,"generique",.5),t.has("podium")&&o("estrade",e.ESTRADE,"generique",.3),t.has("table_intervenants")&&o("interv",e.INTERVENANTS,"generique",.5),t.has("micros")&&e.MICROS.forEach(([s,c],u)=>a(`mic${u}`,s,c,.3,.3,"generique",1.2)),t.has("regie")&&a("regie",e.REGIE[0]+.9,e.REGIE[1]+.4,.9,.4,"generique",.6),t.has("buffet_sandwichs")){const s=e.SANDWICHS,c=s[0]<=n-2,u=c?2.6:.9,d=c?.9:2.6;a("sandw",s[0]+u/2,s[1]+d/2,u/2,d/2,"buffet")}return i.musiques.includes("dj")&&o("dj",e.DJ,"generique",.7),i.musiques.includes("orchestre")&&o("orch",e.SCENE_ORCHESTRE,"generique",.3),i.musiques.includes("troupe")&&a("troupe",e.TROUPE[0]+.5,e.TROUPE[1]+.5,.6,.5,"generique",1),i.musiques.includes("playlist")&&a("enceintes",(e.ENCEINTES[0][0]+e.ENCEINTES[1][0])/2,.75,.25,.25,"generique",1.1),i.musiques.includes("acoustique")&&a("acoustique",e.ACOUSTIQUE[0]+.5,e.ACOUSTIQUE[1]+.5,.5,.5,"generique",.9),t.has("photobooth")&&o("photobooth",e.PHOTOBOOTH,"generique",1.6),t.has("nawar")&&o("nawar",e.NAWAR,"nawar"),t.has("buffet")&&o("buffet",e.BUFFET,"buffet"),t.has("candy_bar")&&o("candy",e.CANDY,"generique",.7),t.has("the_bar")&&o("the",e.THE_BAR,"generique",.7),t.has("livre_dor")&&a("livre",e.LIVRE_DOR[0],e.LIVRE_DOR[1],.5,.5,"generique",.7),t.has("salon")&&o("salon",e.SALON,"generique",.5),t.has("fontaine")&&a("fontaine",e.FONTAINE[0],e.FONTAINE[1],.9,.9,"generique",.7),t.has("photographe")&&a("photographe",e.PHOTOGRAPHE[0],e.PHOTOGRAPHE[1],.5,.5,"generique",1),t.has("piste")&&o("piste",e.PISTE,"piste"),r}const Do=(i,e)=>[i,e].includes("piste")&&[i,e].some(t=>t==="troupe"||t.startsWith("feu"));function ah(i,e,t,n,r){const a=n.find(u=>u.id===i);if(!a)return!1;const o=.04,l={x0:a.a[0]-a.hw+e,y0:a.a[1]-a.hd+t,x1:a.a[0]+a.hw+e,y1:a.a[1]+a.hd+t},s=u=>l.x0<u.x1-o&&u.x0<l.x1-o&&l.y0<u.y1-o&&u.y0<l.y1-o;for(const u of n){if(u.id===i||Do(i,u.id))continue;const[d,h]=r.deplacements[u.id]??[0,0];if(s({x0:u.a[0]-u.hw+d,y0:u.a[1]-u.hd+h,x1:u.a[0]+u.hw+d,y1:u.a[1]+u.hd+h}))return!0}const c=new Set(n.map(u=>u.id));for(const u of r.salle.pos.obstacles)if(!(/^(pl|cd|enc|feu)\d/.test(u.id)||c.has(u.id)||Do(i,u.id))&&s(u))return!0;return!1}const en=(i,e,t)=>i+(e-i)*t,di=(i,e,t)=>new ze(i).lerp(new ze(e),t),Uo=(()=>{const r=.6000000000000001,a=3*(.2-.2)-r,o=1-r-a,l=3*.7,s=3*(1-.7)-l,c=1-l-s;return u=>{let d=u;for(let h=0;h<8;h++){const p=((o*d+a)*d+r)*d-u,m=(3*o*d+2*a)*d+r;if(Math.abs(p)<1e-5||!m)break;d-=p/m}return d=Math.max(0,Math.min(1,d)),((c*d+s)*d+l)*d}})();function Io(i){let e=i>>>0||1;return()=>(e=e*1664525+1013904223>>>0,e/4294967296)}function ki(i,e,t,n=!0){const r=document.createElement("canvas");r.width=i,r.height=e,t(r.getContext("2d"),i,e);const a=new dl(r);return a.colorSpace=Vt,n&&(a.wrapS=a.wrapT=Wi),a.anisotropy=4,a}function No(i){const e=i.map(([l,s])=>{const c=l.index?l.toNonIndexed():l.clone();return c.applyMatrix4(s),c});let t=0;e.forEach(l=>t+=l.attributes.position.count);const n=new Float32Array(t*3),r=new Float32Array(t*3);let a=0;e.forEach(l=>{n.set(l.attributes.position.array,a*3),r.set(l.attributes.normal.array,a*3),a+=l.attributes.position.count});const o=new Ot;return o.setAttribute("position",new zt(n,3)),o.setAttribute("normal",new zt(r,3)),o.computeBoundingSphere(),o}const mn=(i=0,e=0,t=0,n=0,r=1,a=r,o=r,l=0)=>new Pe().compose(new T(i,e,t),new rn().setFromEuler(new Nt(l,n,0)),new T(r,a,o)),sh={riad:{a:"#EBDDBF",b:"#D9C398",bord:"#1F5A4C",mur:"#E6D1AB",bande:"#1F5A4C",terre:"#C6A474"},villa:{a:"#B98E65",b:"#AA7F58",bord:"#8A6A47",mur:"#F1EDE4",bande:"#D8D1C2",terre:"#C8C2B2"},rooftop:{a:"#E8E1D6",b:"#DDD4C6",bord:"#9A7650",mur:"#EEE7DA",bande:"#CDC4B2",terre:"#3B3A57"},jardin:{a:"#BBCB8B",b:"#B0C382",bord:"#8FA86A",mur:"#6F8F55",bande:"#587A44",terre:"#9DB873"},salle:{a:"#E6D8BC",b:"#D8C6A2",bord:"#C9A74E",mur:"#F0E6D2",bande:"#C9A74E",terre:"#CDB79A"}};function fh(i,e,t){const n=new Vu({canvas:i,antialias:!0,alpha:!0,powerPreference:"high-performance"});n.setPixelRatio(Math.min(window.devicePixelRatio||1,matchMedia("(pointer: coarse)").matches?1.5:2)),n.setClearColor(0,0),n.toneMapping=zo,n.toneMappingExposure=1.05,n.shadowMap.enabled=!0,n.shadowMap.type=Fo,n.shadowMap.autoUpdate=!1;const r=matchMedia("(pointer: coarse)").matches;let a=["#1f1a22","#0f0d12"];const o=new ku,l=new ys(-1,1,1,-1,.1,300),s=new qu(16770760,9075302,1);o.add(s);const c=new Ju(16761994,2.2);c.castShadow=!0,c.shadow.mapSize.set(r?1024:2048,r?1024:2048),c.shadow.radius=6,c.shadow.bias=-6e-4,c.shadow.normalBias=.03,o.add(c,c.target);const u=[0,1,2,3].map(()=>{const P=new Ku(16758886,0,8,1.6);return o.add(P),P}),d={laiton:new Ct({color:13215566,metalness:.75,roughness:.32}),boisClair:new Ct({color:14928288,roughness:.7}),boisSombre:new Ct({color:5913126,roughness:.65}),blanc:new Ct({color:16446954,roughness:.9}),verre:new Ct({color:15254138,roughness:.12,metalness:.1,transparent:!0,opacity:.72}),bougie:new Xn({color:16767370}),refusAnim:new Xn({color:14831182,transparent:!0,opacity:.45,depthWrite:!1}),refus:new Xn({color:14831182,transparent:!0,opacity:.45,depthWrite:!1}),halo:new Xn({color:16045940,transparent:!0,opacity:.22,depthWrite:!1}),libre:new Xn({color:16045940,transparent:!0,opacity:.35,depthWrite:!1})},h={cyl:new Yn(1,1,1,28),cyl8:new Yn(1,1,1,10),box:new Zn(1,1,1),sph:new kr(1,10,8),ico:new Ts(1,0),tore:new Yi(1,.1,6,28),plan:new Ai(1,1)},p=No([[h.box,mn(0,.3,0,0,.26,.05,.26)],[h.box,mn(-.11,.15,-.11,0,.03,.3,.03)],[h.box,mn(.11,.15,-.11,0,.03,.3,.03)],[h.box,mn(-.11,.15,.11,0,.03,.3,.03)],[h.box,mn(.11,.15,.11,0,.03,.3,.03)],[h.tore,mn(0,.58,-.12,0,.17,.2,.17)],[h.cyl,mn(0,.58,-.12,0,.15,.018,.17,Math.PI/2)],[h.box,mn(0,.4,-.12,0,.03,.2,.03)]]),m=No(Array.from({length:70},(P,R)=>{const J=Io(R+3);return[h.ico,mn((J()-.5)*3,-J()*.45,(J()-.5)*.5,J()*3,.05+J()*.05)]}));function v(P){P.traverse(R=>{var se;if(R.isInstancedMesh&&R.dispose(),R.isLine){R.geometry.dispose(),R.material.dispose();return}const J=Array.isArray(R.material)?R.material:R.material?[R.material]:[];for(const ee of J)!eh(ee)&&!Object.values(d).includes(ee)&&((se=ee.map)==null||se.dispose(),ee.dispose())})}let g=null,f=[],x=new Map,_=null,y="";const C=(P,R=!0,J=!0)=>(P.castShadow=R,P.receiveShadow=J,P),A=(P,R,J,se,ee,Ee,be=Ee,Re=Ee,Ze=!0)=>{const Xe=C(new pt(P,R),Ze);return Xe.position.set(J,se,ee),Xe.scale.set(Ee,be,Re),Xe};function L(P,R,J){const se=new jt,ee=sh[P],Ee=P==="riad"||P==="salle",be=(E,U,q,O,te)=>{E.beginPath();for(let me=0;me<16;me++){const _e=me/16*Math.PI*2-Math.PI/2,Te=me%2?te:O;E.lineTo(U+Math.cos(_e)*Te,q+Math.sin(_e)*Te)}E.closePath()},Re=Ee?ki(384,384,(E,U,q)=>{for(let O=0;O<3;O++)for(let te=0;te<3;te++)E.fillStyle=(O+te)%2?ee.b:ee.a,E.fillRect(O*128,te*128,128,128);E.globalAlpha=.28,be(E,192,192,62,30),E.fillStyle="#1F5A4C",E.fill(),E.strokeStyle="#A8933F",E.lineWidth=3,E.stroke(),E.globalAlpha=.07,E.strokeStyle="#000",E.lineWidth=2;for(let O=0;O<3;O++)E.strokeRect(O*128,0,128,q),E.strokeRect(0,O*128,U,128)}):ki(256,256,(E,U,q)=>{E.fillStyle=ee.a,E.fillRect(0,0,U,q),E.fillStyle=ee.b,E.fillRect(0,0,U/2,q/2),E.fillRect(U/2,q/2,U/2,q/2),E.globalAlpha=.08,E.strokeStyle="#000",E.lineWidth=2,E.strokeRect(0,0,U,q)});Re.repeat.set(Ee?R/3:R/2,Ee?R/3:R/2);const Ze=C(new pt(h.box,new Ct({map:Re,roughness:.75})),!1,!0);Ze.scale.set(R,.3,R),Ze.position.set(R/2,-.15,R/2),se.add(Ze);const Xe=C(new pt(h.box,new Ct({color:ee.bord,roughness:.6})),!1,!0);Xe.scale.set(R+.4,.28,R+.4),Xe.position.set(R/2,-.17,R/2),se.add(Xe);const Ge=C(new pt(h.plan,new Ct({color:ee.terre,roughness:1})),!1,!0);Ge.rotation.x=-Math.PI/2,Ge.scale.set(R*5,R*5,1),Ge.position.set(R/2,-.32,R/2),se.add(Ge);const at=3.4,ye=ki(512,256,(E,U,q)=>{E.fillStyle=ee.mur,E.fillRect(0,0,U,q);for(let O=0;O<16;O++)E.fillStyle=O%2?Ee?"#1F5A4C":ee.bande:"#F3ECDD",E.fillRect(O*32,0,32,40),E.fillStyle="#A8933F",E.fillRect(O*32+14,18,4,4);E.fillStyle="#C9A74E",E.fillRect(0,40,U,5),E.fillStyle="#E9DEC5",E.fillRect(0,206,U,42),E.fillStyle="#C9A74E",E.fillRect(0,204,U,3),E.fillRect(0,q-8,U,8);for(let O=0;O<3;O++){const te=40+O*150,me=(Te,Ue,Ie)=>{E.beginPath(),E.moveTo(te+Te,Ie),E.lineTo(te+Te,120+Ue),E.quadraticCurveTo(te+50,50+Ue*1.6,te+100-Te,120+Ue),E.lineTo(te+100-Te,Ie),E.closePath()},_e=E.createLinearGradient(0,70,0,204);_e.addColorStop(0,"#EDE2C8"),_e.addColorStop(1,"#D8C7A2"),me(0,0,204),E.fillStyle=_e,E.fill(),E.strokeStyle="#C9A74E",E.lineWidth=4,E.stroke(),me(8,8,204),E.strokeStyle="rgba(120,90,50,0.28)",E.lineWidth=3,E.stroke()}});ye.repeat.set(Math.max(1,Math.round(R/8)),1);const pe=new Ct({map:ye,roughness:.85}),Ce=C(new pt(h.plan,pe),!1,!0),Fe=P==="villa"?.9:at;Ce.scale.set(R,Fe,1),Ce.position.set(R/2,Fe/2,0),P==="villa"&&(Ce.material=new Ct({color:"#EFEADF",roughness:.7,side:Ls})),se.add(Ce);const M=C(new pt(h.plan,pe),!1,!0);M.scale.set(R,at,1),M.rotation.y=Math.PI/2,M.position.set(0,at/2,R/2),se.add(M);for(const[E,U]of[[.35,.35],[R-.4,.35],[.35,R-.4]])se.add(A(h.cyl8,d.laiton,E,.45,U,.05,.9),A(h.cyl,d.laiton,E,1,U,.1,.22),A(h.sph,d.bougie,E,1,U,.07,.07,.07,!1));return se}function Y(P,R){let J=0;for(const se of P)J=J*31+se.charCodeAt(0)>>>0;return di(J%2?R.accent:R.deco,"#3a2a22",.15+J%5*.07)}function F(P,R,J,se){const ee=new jt,Ee=[],be=(ye,pe,Ce)=>Ee.push({x:ye,z:pe,dos:[-Math.sin(Ce),-Math.cos(Ce)]}),Re=ne(J.nappe,.95),Ze=ne(J.fleurs,.8),Xe=(ye,pe,Ce,Fe)=>{const M=C(new fi(p,Fe,ye)),E=new Pe;for(let U=0;U<ye;U++){const q=U/ye*Math.PI*2;E.compose(new T(Math.cos(q)*pe,Ce,Math.sin(q)*pe),new rn().setFromEuler(new Nt(0,-q-Math.PI/2,0)),new T(1,1,1)),M.setMatrixAt(U,E)}return M},Ge=ne("#E3C9A0",.55);if(P.genre==="ronde")ee.add(A(h.cyl,Re,0,.21,0,Sn,.42,Sn)),ee.add(A(h.cyl,Re,0,.43,0,Sn+.03,.03,Sn+.03)),ee.add(A(h.tore,d.laiton,0,.45,0,Sn-.12,.6,Sn-.12).rotateX(Math.PI/2)),ee.add(A(h.box,ne("#9C4A2C",.9),0,.447,0,Sn*1.9,.006,.17,!1),A(h.box,ne("#1F5A4C",.7),0,.449,0,.17,.006,.17,!1)),ee.add(A(h.sph,Ze,0,.58,0,.13,.11,.13)),se&&ee.add(A(h.cyl8,d.bougie,.2,.5,.1,.012,.1,.012,!1)),ee.add(Xe(10,Sn+.22,0,Ge));else if(P.genre==="rect"){ee.add(A(h.box,Re,0,.21,0,1.7,.42,.78)),ee.add(A(h.sph,Ze,0,.55,0,.12,.1,.12));const ye=C(new fi(p,Ge,6)),pe=new Pe;for(let Ce=0;Ce<6;Ce++){const Fe=Ce<3?-1:1,M=(Ce%3-1)*.567;pe.compose(new T(M,0,Fe*.64),new rn().setFromEuler(new Nt(0,Fe>0?Math.PI:0,0)),new T(1,1,1)),ye.setMatrixAt(Ce,pe),be(M,Fe*.64,Fe>0?Math.PI:0)}ee.add(ye)}else if(P.genre==="haute")ee.add(A(h.cyl8,d.laiton,0,.3,0,.04,.6),A(h.cyl,d.laiton,0,.02,0,.2,.04,.2),A(h.cyl,Re,0,.62,0,.3,.04,.3)),se&&ee.add(A(h.cyl8,d.bougie,0,.7,0,.012,.1,.012,!1));else if(P.genre==="honneur"){const ye=P.hw*2,pe=P.hd*2;ee.add(A(h.box,Re,0,.36,0,ye,.72,pe),A(h.box,ne("#1F5A4C",.7),0,.5,pe/2+.004,ye*.98,.12,.012,!1));for(const Fe of[.565,.435])ee.add(A(h.box,d.laiton,0,Fe,pe/2+.008,ye*.98,.012,.012,!1));ee.add(A(h.box,d.laiton,0,.73,pe/2,ye+.04,.03,.03,!1),A(h.box,d.laiton,0,.73,-pe/2,ye+.04,.03,.03,!1));for(const Fe of[-1,1])ee.add(A(h.box,d.laiton,Fe*ye/2,.73,0,.03,.03,pe,!1));if(ee.add(A(h.box,ne("#1F5A4C",.7),0,.726,0,ye*.94,.008,pe*.22,!1)),R.type==="mariage"){const Fe=C(new fi(p,Ge,2)),M=new Pe;[-.9,.9].forEach((E,U)=>{M.compose(new T(E,0,-(pe/2+.3)),new rn().setFromEuler(new Nt(0,0,0)),new T(1.25,1.25,1.25)),Fe.setMatrixAt(U,M),be(E,-(pe/2+.3),0)}),ee.add(Fe)}ee.add(A(h.box,d.laiton,0,2.3,-pe*.1,ye*1.05,.03,.03,!1));const Ce=new pt(m,d.blanc);Ce.scale.set(ye/3,1,1.2),Ce.position.set(0,2.25,-pe*.1),Ce.castShadow=!0,ee.add(Ce);for(const Fe of[-.5,.5])ee.add(A(h.cyl8,d.laiton,Fe*ye*.98,1.15,-pe*.1,.02,2.3,.02,!1))}else if(P.genre==="arche"){const ye=P.hw*2,pe=2,Ce=ki(128,128,(U,q,O)=>{U.clearRect(0,0,q,O),U.strokeStyle="#fff",U.lineWidth=6;for(let te=-1;te<5;te++)U.beginPath(),U.moveTo(te*32,0),U.lineTo(te*32+128,128),U.moveTo(te*32+128,0),U.lineTo(te*32,128),U.stroke()});Ce.repeat.set(ye*2,3);const Fe=new Ct({map:Ce,color:new ze(J.deco),transparent:!0,alphaTest:.4,side:Ls,roughness:.5,metalness:.4});for(const U of[-1,1])ee.add(A(h.box,d.laiton,U*(ye/2-.06),pe/2,0,.12,pe,.14));const M=A(h.tore,d.laiton,0,pe,0,ye/2-.06,ye/2-.06,1.4);M.scale.set(ye/2-.06,(ye/2-.06)*1,1.2),M.geometry=new Yi(1,.06,6,24,Math.PI),ee.add(M);const E=A(h.plan,Fe,0,pe*.45,0,ye-.2,pe*.9,1,!0);ee.add(E),ee.add(A(h.sph,Ze,0,pe+ye/2*.98,0,.16,.14,.16))}else if(P.genre==="piste"){const ye=ki(128,128,(pe,Ce,Fe)=>{for(let M=0;M<2;M++)for(let E=0;E<2;E++)pe.fillStyle=(M+E)%2?"#EADFC6":"#1F5A4C",pe.fillRect(M*64,E*64,64,64);pe.strokeStyle="#C9A74E",pe.lineWidth=2;for(const[M,E]of[[32,32],[96,32],[32,96],[96,96]]){pe.beginPath();for(let U=0;U<16;U++){const q=U/16*Math.PI*2-Math.PI/2,O=U%2?9:22;pe.lineTo(M+Math.cos(q)*O,E+Math.sin(q)*O)}pe.closePath(),pe.stroke()}});ye.repeat.set(P.hw*2,P.hd*2),ee.add(C(A(h.box,new Ct({map:ye,roughness:.25,metalness:.2}),0,.03,0,P.hw*2,.06,P.hd*2,!1),!1,!0))}else if(P.genre==="buffet"){const ye=P.hw*2,pe=P.hd*2,Ce=ye>=pe;ee.add(A(h.box,Re,0,.3,0,ye,.6,pe));const Fe=Math.max(2,Math.floor((Ce?ye:pe)/.6));for(let M=0;M<Fe;M++){const E=((M+.5)/Fe-.5)*(Ce?ye:pe)*.9;ee.add(A(h.cyl,d.laiton,Ce?E:0,.64,Ce?0:E,.17,.05,.17),A(h.sph,M%2?Ze:d.boisSombre,Ce?E:0,.7,Ce?0:E,.1,.08,.1))}}else if(P.genre==="nawar"){const ye=P.hw*2,pe=P.hd*2;ee.add(A(h.box,d.boisClair,0,.42,0,ye,.84,pe),A(h.box,d.boisSombre,0,.86,0,ye+.04,.04,pe+.04));const Ce=Math.max(3,Math.floor(pe/.32));for(let Fe=0;Fe<Ce;Fe++){const M=((Fe+.5)/Ce-.5)*pe*.92;ee.add(A(h.cyl,d.verre,0,1.02,M,.09,.26,.09),A(h.cyl,d.laiton,0,1.18,M,.04,.06,.04,!1))}ee.add(A(h.box,d.boisClair,-ye*.42,1,0,.05,1.3,pe*.96));for(const Fe of[1.15,1.45]){ee.add(A(h.box,d.laiton,-ye*.3,Fe,0,ye*.28,.025,pe*.94));for(let M=0;M<Math.max(3,Math.floor(pe/.4));M++)ee.add(A(h.cyl,d.verre,-ye*.3,Fe+.1,((M+.5)/Math.max(3,Math.floor(pe/.4))-.5)*pe*.85,.045,.16,.045,!1))}}else if(!nh(ee,P,J)){ee.userData.generique=!0;const ye=P.h??.6,pe=Y(P.id,J);ee.add(A(h.box,new Ct({color:pe,roughness:.7}),0,ye/2,0,P.hw*2*.95,ye,P.hd*2*.95)),ee.add(A(h.box,d.laiton,0,ye+.015,0,P.hw*2*.97,.03,P.hd*2*.97,!1))}const at=new pt(h.box,d.libre);return at.scale.set(P.hw*2+.1,.02,P.hd*2+.1),at.position.y=.012,at.visible=!1,at.userData.zone=!0,ee.add(at),ee.userData={...ee.userData,id:P.id,zone:at,chaises:Ee,w:P.hw*2,d:P.hd*2},ee}function X(){for(const P of x.values()){const R=P.userData.zone;Pt&&Pt.grp===P||(R.material=d.halo,R.visible=!!(_!=null&&_.deplacable))}}let V=null;function G(P){if(V&&(o.remove(V.corps,V.tete),V.corps.dispose(),V.tete.dispose(),V=null),!P.final||P.r.tables==="conference")return;const{r:R}=P,J=R.salle.n,se=R.salle.pos,ee=R.salle.tables,Ee=Io(31),be=ee.length?ee:[[R.salle.ax,J/2]],Re=Math.min(40,14+Math.round(ee.length/2)),Ze=Jn.find(M=>M.id===R.palette)??Jn[0],Xe=new fi(h.cyl8,ne("#ffffff",.85),Re),Ge=new fi(h.sph,ne("#ffffff",.8),Re);Xe.castShadow=Ge.castShadow=!0;const at=[Ze.accent,"#3d352e",Ze.deco,"#F6EFDD"],ye=["#E8C3A0","#C99A72","#9A6B4A","#F0CFB0"],pe=[],Ce=[],Fe=[];for(let M=0;M<Re;M++){const[E,U]=be[M%be.length],q=Ee()*Math.PI*2;pe.push([Math.min(J-.6,Math.max(.8,E+Math.cos(q)*1.5)),Math.min(J-.5,Math.max(1.2,U+Math.sin(q)*1.3+.2))]),Ce.push(M%11*.22),Fe.push(2.3+M%5*.3),Xe.setColorAt(M,new ze(at[M%4])),Ge.setColorAt(M,new ze(ye[M%4]))}V={corps:Xe,tete:Ge,dep:[se.DEPART_INVITES[0],se.DEPART_INVITES[1]],cibles:pe,delai:Ce,duree:Fe,etat:P.final,t0:performance.now(),fini:!1},o.add(Xe,Ge),$(performance.now())}const Z=new Pe,j=new rn;function $(P){const R=V;if(!R)return!1;let J=!1;const se=(P-R.t0)/1e3;for(let ee=0;ee<R.cibles.length;ee++){let Ee=R.etat==="assis"||_!=null&&_.reduit?R.etat==="avant"?0:1:R.etat==="arrive"?Math.max(0,Math.min(1,(se-R.delai[ee])/R.duree[ee])):0;Ee>0&&Ee<1&&(J=!0);const be=1-Math.pow(1-Ee,2),Re=en(R.dep[0],R.cibles[ee][0],be),Ze=en(R.dep[1],R.cibles[ee][1],be),Xe=Ee>0&&Ee<1?Math.abs(Math.sin(se*9+ee))*.035:0,Ge=Ee===0?0:1;Z.compose(new T(Re,.3+Xe,Ze),j,new T(.15*Ge,.3*Ge,.15*Ge)),R.corps.setMatrixAt(ee,Z),Z.compose(new T(Re,.72+Xe,Ze),j,new T(.1*Ge,.1*Ge,.1*Ge)),R.tete.setMatrixAt(ee,Z)}return R.corps.instanceMatrix.needsUpdate=R.tete.instanceMatrix.needsUpdate=!0,R.corps.instanceColor&&(R.corps.instanceColor.needsUpdate=R.tete.instanceColor.needsUpdate=!0),n.shadowMap.needsUpdate=!0,J}function Q(P,R){if(!P.final){V&&G({...P,final:null});return}if(V||G(P),V&&(V.etat=P.final,V.t0=performance.now()),!R&&P.final==="avant"){const J=P.r.salle.pos.DEPART_INVITES;ae.cible.set(J[0],.6,Math.min(J[1],P.r.salle.n)),ae.zoom=1.5,ve=null,S=1,H()}else P.final==="arrive"&&k();Oe()}let le=new jt;o.add(le);let de=!1,ge=null;function Le(P){ge&&(o.remove(ge),v(ge));const R=Jn.find(J=>J.id===P.r.palette)??Jn[0];ge=ih(P.r,R,P.nuit),o.add(ge)}function re(P){const{r:R}=P,J=Jn.find(be=>be.id===R.palette)??Jn[0],se=R.salle.n,ee=`${R.lieu}|${se}|${R.palette}`;ee!==y&&(g&&(o.remove(g),v(g)),g=L(R.lieu,se),o.add(g),y=ee,c.shadow.camera.left=-se*.85,c.shadow.camera.right=se*.85,c.shadow.camera.top=se*.85,c.shadow.camera.bottom=-se*.85,c.shadow.camera.far=se*6,c.shadow.camera.updateProjectionMatrix(),c.position.set(se/2-se*.5,se*1.6,se/2+se*.8),c.target.position.set(se/2,0,se/2),c.target.updateMatrixWorld(),k(!0));for(const be of[...le.children])le.remove(be),v(be);x.clear(),f=rh(R);for(const be of f){const Re=F(be,R,J,R.lumiere==="bougies"),[Ze,Xe]=R.deplacements[be.id]??[0,0];Re.position.set(be.a[0]+Ze,0,be.a[1]+Xe),x.set(be.id,Re),le.add(Re)}for(const be of we.keys()){const Re=x.get(be);Re&&(Re.position.y=.18)}X();const Ee=["honneur","nawar","piste","t0"].map(be=>x.get(be)).filter(Boolean).slice(0,4);u.forEach((be,Re)=>{const Ze=Ee[Re];Ze?(be.position.set(Ze.position.x,1.5,Ze.position.z),be.userData.actif=!0,be.userData.nawar=Ze.userData.id==="nawar"):be.userData.actif=!1})}function ce(P){const R=P;c.color.copy(di("#FFE2B8","#9AA3C0",R)),c.intensity=en(1.9,.5,R),s.color.copy(di("#FFE6C8","#9AA3C0",R)),s.groundColor.copy(di("#8A7A66","#2A2E48",R)),s.intensity=en(1,.65,R),a=[di("#F3ECDD","#141414",R).getStyle(),di("#E9DCC2","#1B1A22",R).getStyle()],e.style.background=`linear-gradient(180deg, ${a[0]}, ${a[1]})`,u.forEach(J=>{J.intensity=J.userData.actif?J.userData.nawar?en(1.8,7,R):en(.2,7,R):0}),n.toneMappingExposure=en(1.08,1.1,R),n.shadowMap.needsUpdate=!0}const ae={cible:new T(6,.8,6),zoom:1,N:12};let ve=null,w=1,S=0,I=0,K=new T,N=1;const z=()=>{I=performance.now(),K.copy(ae.cible),N=ae.zoom},b=new T(1,Math.tan(Math.PI/6)*Math.SQRT2,1).normalize();function H(){var Ge;const P=e.clientWidth||1,R=e.clientHeight||1,J=P/R,se=ae.N;let ee=se*.76,Ee=ee/J;const be=se*.36+2.6;Ee<be&&(Ee=be,ee=Ee*J);const Re=J<1.5?.15:0;l.left=-ee/ae.zoom,l.right=ee/ae.zoom,l.top=Ee*(1-2*Re)/ae.zoom,l.bottom=-Ee*(1+2*Re)/ae.zoom,l.position.copy(ae.cible).addScaledVector(b,80),l.lookAt(ae.cible),l.updateProjectionMatrix();const Ze=ue(),Xe=Math.abs(ae.zoom-Ze)>.06||Math.hypot(ae.cible.x-ae.N/2,ae.cible.z-(ae.N/2+(Ze>1?.4:0)))>.6;Xe!==W&&(W=Xe,(Ge=t.onDecalee)==null||Ge.call(t,Xe))}let W=!1;const ue=()=>{const P=(e.clientWidth||1)/(e.clientHeight||1);return P<1.5?Math.min(1.25,1+(1.5-P)*.4):1};function k(P=!1){const R=ae.N=(_==null?void 0:_.r.salle.n)??12;ve=new T(R/2,.8,R/2+(ue()>1?.4:0)),w=ue(),S=P||_!=null&&_.reduit?1:0,z(),(P||_!=null&&_.reduit)&&(ae.cible.copy(ve),ae.zoom=w,H()),Oe()}function oe(P){const R=P.focus?P.r.salle.pos.ANCRES[P.focus.cle]:null;R&&(ve=new T(R[0],.5,R[1]),w=ue()>1?Math.max(ue(),1.3):1.6,S=P.reduit?1:0,z(),P.reduit&&(ae.cible.copy(ve),ae.zoom=w,H()),Oe())}function he(){const P=e.clientWidth,R=e.clientHeight;!P||!R||(n.setSize(P,R,!1),H(),Oe())}const ie=new ResizeObserver(he);ie.observe(e);const Me=P=>{var R;P.preventDefault(),(R=t.onPerdu)==null||R.call(t)};i.addEventListener("webglcontextlost",Me),i.addEventListener("webglcontextrestored",Oe);let xe=!1;const we=new Map;let De=null,We=0,He=null,Ae=0,$e=0;function Oe(){xe||(xe=!0,requestAnimationFrame(rt))}function rt(P){let R=!1;if(ve&&S<1){const J=Math.min(1,(performance.now()-I)/600),se=1-Math.pow(1-J,3);ae.cible.lerpVectors(K,ve,se),ae.zoom=en(N,w,se),J>=1&&(S=1),H(),R=S<1}if(He){const J=Math.min(1,(performance.now()-He.t0)/800),se=J*J*(3-2*J);We=en(He.de,He.vers,se),ce(We),J>=1?He=null:R=!0}for(const[J,se]of we){const ee=Math.min(1,(performance.now()-se.t0)/350),Ee=x.get(J);Ee&&(Ee.position.y=.18*(1-Uo(ee))),n.shadowMap.needsUpdate=!0,ee>=1?(we.delete(J),Ee&&(Ee.position.y=0)):R=!0}if(De){const J=De,se=x.get(J.id),ee=performance.now()-J.t0,Ee=se==null?void 0:se.userData.zone;if(se&&Ee){if(Ee.visible=!0,Ee.material=d.refusAnim,ee<400)d.refusAnim.opacity=.2+.5*(.5-.5*Math.cos(ee/400*Math.PI*4)),se.position.set(J.de[0],.18,J.de[1]);else if(ee<760){const be=(ee-400)/360,Re=Uo(be);se.position.set(en(J.de[0],J.vers[0],Re),.18*(1-Re),en(J.de[1],J.vers[1],Re)),d.refusAnim.opacity=.45}else ee<880?(se.position.set(J.vers[0],0,J.vers[1]),d.refusAnim.opacity=.45*(1-(ee-760)/120)):(se.position.set(J.vers[0],0,J.vers[1]),De=null,X());n.shadowMap.needsUpdate=!0}else De=null;De&&(R=!0)}V&&$(performance.now())&&(R=!0),Pt&&(R=!0),n.render(o,l),Ae=n.info.render.calls,$e=n.info.render.triangles,R?requestAnimationFrame(rt):xe=!1}const Se=new Qu,Ve=new ke,tt=new Cn(new T(0,1,0),0);let Pt=null;const qt=(P,R)=>{const J=i.getBoundingClientRect();Ve.set((P-J.left)/J.width*2-1,-((R-J.top)/J.height)*2+1),Se.setFromCamera(Ve,l);const se=new T;return Se.ray.intersectPlane(tt,se)?se:null};function bt(P,R){var Re,Ze;const J=i.getBoundingClientRect();Ve.set((P-J.left)/J.width*2-1,-((R-J.top)/J.height)*2+1),Se.setFromCamera(Ve,l);const se=Se.intersectObjects(le.children,!0);for(const Xe of se){let Ge=Xe.object;for(;Ge&&!((Re=Ge.userData)!=null&&Re.id);)Ge=Ge.parent;if((Ze=Ge==null?void 0:Ge.userData)!=null&&Ze.id)return Ge.userData.id}const ee=qt(P,R);if(!ee||!_)return null;let Ee=null,be=1e9;for(const Xe of f){const[Ge,at]=_.r.deplacements[Xe.id]??[0,0],ye=Xe.a[0]+Ge,pe=Xe.a[1]+at,Ce=.25;if(Math.abs(ee.x-ye)<=Xe.hw+Ce&&Math.abs(ee.z-pe)<=Xe.hd+Ce){const Fe=Math.hypot(ee.x-ye,ee.z-pe);Fe<be&&(be=Fe,Ee=Xe.id)}}return Ee}const _t=new Map;let Lt=null,D=null;const an=()=>{const[P,R]=[..._t.values()];return Math.hypot(P.x-R.x,P.y-R.y)||1};function In(){const P=Pt;if(Pt=null,!P)return;const R=f.find(J=>J.id===P.id);P.grp.position.set(R.a[0]+P.depart[0],0,R.a[1]+P.depart[1]),X(),n.shadowMap.needsUpdate=!0}const ft=()=>{const P=ae.N;ae.cible.x=Math.max(0,Math.min(P,ae.cible.x)),ae.cible.z=Math.max(0,Math.min(P,ae.cible.z))};i.addEventListener("pointerdown",P=>{if(!_)return;_t.set(P.pointerId,{x:P.clientX,y:P.clientY});try{i.setPointerCapture(P.pointerId)}catch{}if(ve=null,S=1,_t.size===2){In(),D=null,Lt={d0:an(),z0:ae.zoom};return}if(_t.size>2)return;const R=_.deplacable?bt(P.clientX,P.clientY):null,J=R?x.get(R):null,se=qt(P.clientX,P.clientY);if(!se)return;if(P.preventDefault(),!R||!J){D={p:se};return}const ee=f.find(be=>be.id===R),Ee=_.r.deplacements[R]??[0,0];Pt={id:R,grp:J,depart:Ee,decal:new T(se.x-(ee.a[0]+Ee[0]),0,se.z-(ee.a[1]+Ee[1])),dernier:Ee,bloque:!1,pointeur:P.pointerId},J.position.y=.18,J.userData.zone.visible=!0,J.userData.zone.material=d.libre,n.shadowMap.needsUpdate=!0,Oe()}),i.addEventListener("pointermove",P=>{if(_t.has(P.pointerId)&&_t.set(P.pointerId,{x:P.clientX,y:P.clientY}),Lt&&_t.size>=2){ae.zoom=Math.max(.9,Math.min(3.2,Lt.z0*an()/Lt.d0)),H(),Oe();return}if(D){const pe=qt(P.clientX,P.clientY);if(!pe)return;ae.cible.x+=D.p.x-pe.x,ae.cible.z+=D.p.z-pe.z,ft(),H(),Oe();return}const R=Pt;if(!R||!_)return;const J=qt(P.clientX,P.clientY),se=f.find(pe=>pe.id===R.id),ee=_.r.salle.n;if(!J)return;let Ee=J.x-R.decal.x-se.a[0],be=J.z-R.decal.z-se.a[1];Ee=Math.round(Ee*4)/4,be=Math.round(be*4)/4;const Re=Math.min(0,.1+se.hw-se.a[0]),Ze=Math.max(0,ee-.1-se.hw-se.a[0]),Xe=Math.min(0,.1+se.hd-se.a[1]),Ge=Math.max(0,ee-.1-se.hd-se.a[1]),at=Ee,ye=be;Ee=Math.max(Re,Math.min(Ze,Ee)),be=Math.max(Xe,Math.min(Ge,be)),R.bord=Math.abs(Ee-at)>.3||Math.abs(be-ye)>.3,(Ee!==R.dernier[0]||be!==R.dernier[1])&&(R.dernier=[Ee,be],R.grp.position.x=se.a[0]+Ee,R.grp.position.z=se.a[1]+be,R.bloque=ah(R.id,Ee,be,f,_.r),R.grp.userData.zone.material=R.bloque?d.refus:d.libre,n.shadowMap.needsUpdate=!0),Oe()});function Ci(P){_t.delete(P.pointerId);try{i.releasePointerCapture(P.pointerId)}catch{}if(Lt){_t.size<2&&(Lt=null);return}D=null;const R=Pt;if(Pt=null,!R||!_)return;const J=f.find(ee=>ee.id===R.id),se=[J.a[0]+R.depart[0],J.a[1]+R.depart[1]];R.bloque?(t.onRefus("occupe"),_.reduit?(R.grp.position.set(se[0],0,se[1]),X()):De={id:R.id,t0:performance.now(),de:[J.a[0]+R.dernier[0],J.a[1]+R.dernier[1]],vers:se}):(R.grp.userData.zone.material=d.halo,R.grp.userData.zone.visible=_.deplacable,(R.dernier[0]!==R.depart[0]||R.dernier[1]!==R.depart[1])&&t.onDeplacer(R.id,R.dernier[0],R.dernier[1]),R.bord&&t.onRefus("bord"),_.reduit?R.grp.position.y=0:we.set(R.id,{t0:performance.now()})),n.shadowMap.needsUpdate=!0,Oe()}return i.addEventListener("pointerup",Ci),i.addEventListener("pointercancel",Ci),i.addEventListener("wheel",P=>{P.preventDefault(),w=Math.max(.9,Math.min(3.2,ae.zoom*(P.deltaY<0?1.12:.9))),ae.zoom=w,ve=null,S=1,H(),Oe()},{passive:!1}),i.addEventListener("dblclick",()=>k()),{maj(P){var J;const R=_;_=P,(!R||R.r!==P.r)&&(re(P),G(P)),(!R||R.final!==P.final)&&Q(P,R),R&&R.nuit!==P.nuit&&(P.reduit?(We=P.nuit,He=null):He={t0:performance.now(),de:We,vers:P.nuit}),R||(We=P.nuit),(!R||R.nuit!==P.nuit||R.r!==P.r)&&(ce(We),(!R||R.r!==P.r||R.nuit>.5!=P.nuit>.5)&&Le(P)),i.style.touchAction="none",R&&R.deplacable!==P.deplacable&&X(),P.focus&&R&&((J=R.focus)==null?void 0:J.n)!==P.focus.n&&oe(P),i.style.cursor=P.deplacable?"grab":"default",de||(de=!0,he()),Oe()},vueEnsemble:()=>k(),capturer:()=>{try{if(!i.isConnected)return Promise.resolve(null);const P=(_==null?void 0:_.r.salle.n)??12,R=1440,J=1140,se=l.left,ee=l.right,Ee=l.top,be=l.bottom,Re=l.position.clone(),Ze=n.getPixelRatio(),Xe=()=>{n.setPixelRatio(Ze),l.left=se,l.right=ee,l.top=Ee,l.bottom=be,l.position.copy(Re),l.lookAt(ae.cible),l.updateProjectionMatrix(),he()};n.setPixelRatio(1),n.setSize(R,J,!1);const Ge=new T(P/2,.8,P/2),at=P*.78,ye=at*J/R;l.left=-at,l.right=at,l.top=ye,l.bottom=-ye,l.position.copy(Ge).addScaledVector(b,80),l.lookAt(Ge),l.updateProjectionMatrix(),n.render(o,l);const pe=document.createElement("canvas");pe.width=R,pe.height=J;const Ce=pe.getContext("2d");if(!Ce)return Xe(),Promise.resolve(null);const Fe=Ce.createLinearGradient(0,0,0,J);return Fe.addColorStop(0,a[0]),Fe.addColorStop(1,a[1]),Ce.fillStyle=Fe,Ce.fillRect(0,0,R,J),Ce.drawImage(i,0,0),Xe(),Oe(),new Promise(M=>pe.toBlob(E=>M(E),"image/png"))}catch{return Promise.resolve(null)}},position:P=>{const R=x.get(P);return R?[R.position.x,R.position.z]:null},ecran:(P,R)=>{const J=new T(P,0,R).project(l),se=i.getBoundingClientRect();return[se.left+(J.x+1)/2*se.width,se.top+(1-J.y)/2*se.height]},ecranObjet:P=>{const R=x.get(P);if(!R)return null;const J=new T(R.position.x,.3,R.position.z).project(l),se=i.getBoundingClientRect();return[se.left+(J.x+1)/2*se.width,se.top+(1-J.y)/2*se.height]},generiques:()=>[...x.values()].filter(P=>P.userData.generique).map(P=>P.userData.id),chaises:P=>{var R;return((R=x.get(P))==null?void 0:R.userData.chaises)??[]},dims:P=>{var J;const R=(J=x.get(P))==null?void 0:J.userData;return R?{w:R.w,d:R.d}:null},vers(P,R){const J=x.get(P);J&&(ve=null,S=1,ae.cible.set(J.position.x,.4,J.position.z),ae.zoom=R,H(),Oe())},sous:(P,R)=>bt(P,R),stats:()=>({appels:Ae,triangles:$e,objets:f.length,zoom:+ae.zoom.toFixed(3),cible:[+ae.cible.x.toFixed(2),+ae.cible.z.toFixed(2)],invites:(V==null?void 0:V.cibles.length)??0}),detruire(){ie.disconnect(),i.removeEventListener("webglcontextlost",Me),i.removeEventListener("webglcontextrestored",Oe);for(const P of[g,ge,le])P&&v(P);V&&(V.corps.dispose(),V.tete.dispose()),th();for(const P of Object.values(d))P.dispose();for(const P of Object.values(h))P.dispose();p.dispose(),m.dispose(),n.dispose(),n.forceContextLoss()}}}export{fh as creerMoteur};
