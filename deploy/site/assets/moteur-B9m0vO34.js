import{G as jr,P as Kn,R as _n}from"./HeaventCityPage-BeTZtNGh.js";import"./index-BHhYqqlU.js";import"./react-CEfzfvak.js";import"./supabase-BLuESGw6.js";import"./ui-CZxA4AZu.js";import"./logo-heavent-or-B4tRtY98.js";import"./logo-nawar-CoKiAGys.js";/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ca="169",Oo=1,Fo=2,dn=3,An=0,Et=1,Ls=2,Hn=100,Pa=204,La=205,Bo=0,bl=1,Tl=2,wn=0,wl=1,Al=2,Rl=3,zo=4,Cl=5,Pl=6,Ll=7,Ho=300,_i=301,vi=302,Da=303,Ua=304,zr=306,ki=1e3,Wi=1001,Ia=1002,Ft=1003,Dl=1004,Qi=1005,Qt=1006,qr=1007,pi=1008,pn=1009,Go=1010,Vo=1011,Xi=1012,ds=1013,Vn=1014,en=1015,Yi=1016,ps=1017,fs=1018,xi=1020,ko=35902,Wo=1021,Xo=1022,qt=1023,jo=1024,qo=1025,ji=1026,Mi=1027,ms=1028,gs=1029,Yo=1030,_s=1031,vs=1033,Er=33776,br=33777,Tr=33778,wr=33779,Na=35840,Oa=35841,Fa=35842,Ba=35843,za=36196,Ha=37492,Ga=37496,Va=37808,ka=37809,Wa=37810,Xa=37811,ja=37812,qa=37813,Ya=37814,Ka=37815,Za=37816,Ja=37817,$a=37818,Qa=37819,es=37820,ts=37821,Ar=36492,ns=36494,is=36495,Ko=36283,rs=36284,as=36285,ss=36286,hi="",It="srgb",Cn="srgb-linear",xs="display-p3",Hr="display-p3-linear",Lr="linear",rt="srgb",Dr="rec709",Ur="p3",Zn=7680,Zo=515,Ds=35044,Us="300 es",Si=2e3,Ir=2001;class Ei{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const n=this._listeners[e];if(n!==void 0){const r=n.indexOf(t);r!==-1&&n.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const t=this._listeners[e.type];if(t!==void 0){e.target=this;const n=t.slice(0);for(let r=0,a=n.length;r<a;r++)n[r].call(this,e);e.target=null}}}const mt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Yr=Math.PI/180,os=180/Math.PI;function Ki(){const i=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(mt[255&i]+mt[i>>8&255]+mt[i>>16&255]+mt[i>>24&255]+"-"+mt[255&e]+mt[e>>8&255]+"-"+mt[e>>16&15|64]+mt[e>>24&255]+"-"+mt[63&t|128]+mt[t>>8&255]+"-"+mt[t>>16&255]+mt[t>>24&255]+mt[255&n]+mt[n>>8&255]+mt[n>>16&255]+mt[n>>24&255]).toLowerCase()}function yt(i,e,t){return Math.max(e,Math.min(t,i))}function Ul(i,e){return(i%e+e)%e}function Kr(i,e,t){return(1-t)*i+t*e}function Pi(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function St(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(4294967295*i);case Uint16Array:return Math.round(65535*i);case Uint8Array:return Math.round(255*i);case Int32Array:return Math.round(2147483647*i);case Int16Array:return Math.round(32767*i);case Int8Array:return Math.round(127*i);default:throw new Error("Invalid component type.")}}class ze{constructor(e=0,t=0){ze.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(yt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),a=this.x-e.x,o=this.y-e.y;return this.x=a*n-o*r+e.x,this.y=a*r+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ve{constructor(e,t,n,r,a,o,l,s,c){Ve.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,a,o,l,s,c)}set(e,t,n,r,a,o,l,s,c){const u=this.elements;return u[0]=e,u[1]=r,u[2]=l,u[3]=t,u[4]=a,u[5]=s,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,a=this.elements,o=n[0],l=n[3],s=n[6],c=n[1],u=n[4],p=n[7],h=n[2],d=n[5],m=n[8],_=r[0],g=r[3],f=r[6],M=r[1],v=r[4],x=r[7],P=r[2],C=r[5],w=r[8];return a[0]=o*_+l*M+s*P,a[3]=o*g+l*v+s*C,a[6]=o*f+l*x+s*w,a[1]=c*_+u*M+p*P,a[4]=c*g+u*v+p*C,a[7]=c*f+u*x+p*w,a[2]=h*_+d*M+m*P,a[5]=h*g+d*v+m*C,a[8]=h*f+d*x+m*w,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],a=e[3],o=e[4],l=e[5],s=e[6],c=e[7],u=e[8];return t*o*u-t*l*c-n*a*u+n*l*s+r*a*c-r*o*s}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],a=e[3],o=e[4],l=e[5],s=e[6],c=e[7],u=e[8],p=u*o-l*c,h=l*s-u*a,d=c*a-o*s,m=t*p+n*h+r*d;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/m;return e[0]=p*_,e[1]=(r*c-u*n)*_,e[2]=(l*n-r*o)*_,e[3]=h*_,e[4]=(u*t-r*s)*_,e[5]=(r*a-l*t)*_,e[6]=d*_,e[7]=(n*s-c*t)*_,e[8]=(o*t-n*a)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,a,o,l){const s=Math.cos(a),c=Math.sin(a);return this.set(n*s,n*c,-n*(s*o+c*l)+o+e,-r*c,r*s,-r*(-c*o+s*l)+l+t,0,0,1),this}scale(e,t){return this.premultiply(Zr.makeScale(e,t)),this}rotate(e){return this.premultiply(Zr.makeRotation(-e)),this}translate(e,t){return this.premultiply(Zr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Zr=new Ve;function Jo(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Nr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Il(){const i=Nr("canvas");return i.style.display="block",i}const Is={};function Rr(i){i in Is||(Is[i]=!0,console.warn(i))}const Ns=new Ve().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Os=new Ve().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Li={[Cn]:{transfer:Lr,primaries:Dr,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i,fromReference:i=>i},[It]:{transfer:rt,primaries:Dr,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Hr]:{transfer:Lr,primaries:Ur,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.applyMatrix3(Os),fromReference:i=>i.applyMatrix3(Ns)},[xs]:{transfer:rt,primaries:Ur,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.convertSRGBToLinear().applyMatrix3(Os),fromReference:i=>i.applyMatrix3(Ns).convertLinearToSRGB()}},Nl=new Set([Cn,Hr]),Je={enabled:!0,_workingColorSpace:Cn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Nl.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=Li[e].toReference;return(0,Li[t].fromReference)(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return Li[i].primaries},getTransfer:function(i){return i===hi?Lr:Li[i].transfer},getLuminanceCoefficients:function(i,e=this._workingColorSpace){return i.fromArray(Li[e].luminanceCoefficients)}};function mi(i){return i<.04045?.0773993808*i:Math.pow(.9478672986*i+.0521327014,2.4)}function Jr(i){return i<.0031308?12.92*i:1.055*Math.pow(i,.41666)-.055}let Jn;class Ol{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Jn===void 0&&(Jn=Nr("canvas")),Jn.width=e.width,Jn.height=e.height;const n=Jn.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Jn}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Nr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),a=r.data;for(let o=0;o<a.length;o++)a[o]=255*mi(a[o]/255);return n.putImageData(r,0,0),t}if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(255*mi(t[n]/255)):t[n]=mi(t[n]);return{data:t,width:e.width,height:e.height}}return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Fl=0;class $o{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Fl++}),this.uuid=Ki(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let o=0,l=r.length;o<l;o++)r[o].isDataTexture?a.push($r(r[o].image)):a.push($r(r[o]))}else a=$r(r);n.url=a}return t||(e.images[this.uuid]=n),n}}function $r(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ol.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Bl=0;class _t extends Ei{constructor(e=_t.DEFAULT_IMAGE,t=_t.DEFAULT_MAPPING,n=1001,r=1001,a=1006,o=1008,l=qt,s=pn,c=_t.DEFAULT_ANISOTROPY,u=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Bl++}),this.uuid=Ki(),this.name="",this.source=new $o(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=a,this.minFilter=o,this.anisotropy=c,this.format=l,this.internalFormat=null,this.type=s,this.offset=new ze(0,0),this.repeat=new ze(1,1),this.center=new ze(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ve,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ho)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ki:e.x=e.x-Math.floor(e.x);break;case Wi:e.x=e.x<0?0:1;break;case Ia:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case ki:e.y=e.y-Math.floor(e.y);break;case Wi:e.y=e.y<0?0:1;break;case Ia:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}_t.DEFAULT_IMAGE=null,_t.DEFAULT_MAPPING=Ho,_t.DEFAULT_ANISOTROPY=1;class $e{constructor(e=0,t=0,n=0,r=1){$e.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,a=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r+o[12]*a,this.y=o[1]*t+o[5]*n+o[9]*r+o[13]*a,this.z=o[2]*t+o[6]*n+o[10]*r+o[14]*a,this.w=o[3]*t+o[7]*n+o[11]*r+o[15]*a,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,a;const s=e.elements,c=s[0],u=s[4],p=s[8],h=s[1],d=s[5],m=s[9],_=s[2],g=s[6],f=s[10];if(Math.abs(u-h)<.01&&Math.abs(p-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(p+_)<.1&&Math.abs(m+g)<.1&&Math.abs(c+d+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const v=(c+1)/2,x=(d+1)/2,P=(f+1)/2,C=(u+h)/4,w=(p+_)/4,K=(m+g)/4;return v>x&&v>P?v<.01?(n=0,r=.707106781,a=.707106781):(n=Math.sqrt(v),r=C/n,a=w/n):x>P?x<.01?(n=.707106781,r=0,a=.707106781):(r=Math.sqrt(x),n=C/r,a=K/r):P<.01?(n=.707106781,r=.707106781,a=0):(a=Math.sqrt(P),n=w/a,r=K/a),this.set(n,r,a,t),this}let M=Math.sqrt((g-m)*(g-m)+(p-_)*(p-_)+(h-u)*(h-u));return Math.abs(M)<.001&&(M=1),this.x=(g-m)/M,this.y=(p-_)/M,this.z=(h-u)/M,this.w=Math.acos((c+d+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class zl extends Ei{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new $e(0,0,e,t),this.scissorTest=!1,this.viewport=new $e(0,0,e,t);const r={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Qt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const a=new _t(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);a.flipY=!1,a.generateMipmaps=n.generateMipmaps,a.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let l=0;l<o;l++)this.textures[l]=a.clone(),this.textures[l].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,r=e.textures.length;n<r;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new $o(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class kn extends zl{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Qo extends _t{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Ft,this.minFilter=Ft,this.wrapR=Wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Hl extends _t{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Ft,this.minFilter=Ft,this.wrapR=Wi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Yt{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,a,o,l){let s=n[r+0],c=n[r+1],u=n[r+2],p=n[r+3];const h=a[o+0],d=a[o+1],m=a[o+2],_=a[o+3];if(l===0)return e[t+0]=s,e[t+1]=c,e[t+2]=u,void(e[t+3]=p);if(l===1)return e[t+0]=h,e[t+1]=d,e[t+2]=m,void(e[t+3]=_);if(p!==_||s!==h||c!==d||u!==m){let g=1-l;const f=s*h+c*d+u*m+p*_,M=f>=0?1:-1,v=1-f*f;if(v>Number.EPSILON){const P=Math.sqrt(v),C=Math.atan2(P,f*M);g=Math.sin(g*C)/P,l=Math.sin(l*C)/P}const x=l*M;if(s=s*g+h*x,c=c*g+d*x,u=u*g+m*x,p=p*g+_*x,g===1-l){const P=1/Math.sqrt(s*s+c*c+u*u+p*p);s*=P,c*=P,u*=P,p*=P}}e[t]=s,e[t+1]=c,e[t+2]=u,e[t+3]=p}static multiplyQuaternionsFlat(e,t,n,r,a,o){const l=n[r],s=n[r+1],c=n[r+2],u=n[r+3],p=a[o],h=a[o+1],d=a[o+2],m=a[o+3];return e[t]=l*m+u*p+s*d-c*h,e[t+1]=s*m+u*h+c*p-l*d,e[t+2]=c*m+u*d+l*h-s*p,e[t+3]=u*m-l*p-s*h-c*d,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,a=e._z,o=e._order,l=Math.cos,s=Math.sin,c=l(n/2),u=l(r/2),p=l(a/2),h=s(n/2),d=s(r/2),m=s(a/2);switch(o){case"XYZ":this._x=h*u*p+c*d*m,this._y=c*d*p-h*u*m,this._z=c*u*m+h*d*p,this._w=c*u*p-h*d*m;break;case"YXZ":this._x=h*u*p+c*d*m,this._y=c*d*p-h*u*m,this._z=c*u*m-h*d*p,this._w=c*u*p+h*d*m;break;case"ZXY":this._x=h*u*p-c*d*m,this._y=c*d*p+h*u*m,this._z=c*u*m+h*d*p,this._w=c*u*p-h*d*m;break;case"ZYX":this._x=h*u*p-c*d*m,this._y=c*d*p+h*u*m,this._z=c*u*m-h*d*p,this._w=c*u*p+h*d*m;break;case"YZX":this._x=h*u*p+c*d*m,this._y=c*d*p+h*u*m,this._z=c*u*m-h*d*p,this._w=c*u*p-h*d*m;break;case"XZY":this._x=h*u*p-c*d*m,this._y=c*d*p-h*u*m,this._z=c*u*m+h*d*p,this._w=c*u*p+h*d*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],a=t[8],o=t[1],l=t[5],s=t[9],c=t[2],u=t[6],p=t[10],h=n+l+p;if(h>0){const d=.5/Math.sqrt(h+1);this._w=.25/d,this._x=(u-s)*d,this._y=(a-c)*d,this._z=(o-r)*d}else if(n>l&&n>p){const d=2*Math.sqrt(1+n-l-p);this._w=(u-s)/d,this._x=.25*d,this._y=(r+o)/d,this._z=(a+c)/d}else if(l>p){const d=2*Math.sqrt(1+l-n-p);this._w=(a-c)/d,this._x=(r+o)/d,this._y=.25*d,this._z=(s+u)/d}else{const d=2*Math.sqrt(1+p-n-l);this._w=(o-r)/d,this._x=(a+c)/d,this._y=(s+u)/d,this._z=.25*d}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(yt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,a=e._z,o=e._w,l=t._x,s=t._y,c=t._z,u=t._w;return this._x=n*u+o*l+r*c-a*s,this._y=r*u+o*s+a*l-n*c,this._z=a*u+o*c+n*s-r*l,this._w=o*u-n*l-r*s-a*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,a=this._z,o=this._w;let l=o*e._w+n*e._x+r*e._y+a*e._z;if(l<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,l=-l):this.copy(e),l>=1)return this._w=o,this._x=n,this._y=r,this._z=a,this;const s=1-l*l;if(s<=Number.EPSILON){const d=1-t;return this._w=d*o+t*this._w,this._x=d*n+t*this._x,this._y=d*r+t*this._y,this._z=d*a+t*this._z,this.normalize(),this}const c=Math.sqrt(s),u=Math.atan2(c,l),p=Math.sin((1-t)*u)/c,h=Math.sin(t*u)/c;return this._w=o*p+this._w*h,this._x=n*p+this._x*h,this._y=r*p+this._y*h,this._z=a*p+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),a=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class T{constructor(e=0,t=0,n=0){T.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Fs.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Fs.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[3]*n+a[6]*r,this.y=a[1]*t+a[4]*n+a[7]*r,this.z=a[2]*t+a[5]*n+a[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,a=e.elements,o=1/(a[3]*t+a[7]*n+a[11]*r+a[15]);return this.x=(a[0]*t+a[4]*n+a[8]*r+a[12])*o,this.y=(a[1]*t+a[5]*n+a[9]*r+a[13])*o,this.z=(a[2]*t+a[6]*n+a[10]*r+a[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,a=e.x,o=e.y,l=e.z,s=e.w,c=2*(o*r-l*n),u=2*(l*t-a*r),p=2*(a*n-o*t);return this.x=t+s*c+o*p-l*u,this.y=n+s*u+l*c-a*p,this.z=r+s*p+a*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r,this.y=a[1]*t+a[5]*n+a[9]*r,this.z=a[2]*t+a[6]*n+a[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,a=e.z,o=t.x,l=t.y,s=t.z;return this.x=r*s-a*l,this.y=a*o-n*s,this.z=n*l-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Qr.copy(this).projectOnVector(e),this.sub(Qr)}reflect(e){return this.sub(Qr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(yt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=2*Math.random()-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Qr=new T,Fs=new Yt;class fn{constructor(e=new T(1/0,1/0,1/0),t=new T(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Vt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Vt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Vt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const a=n.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let o=0,l=a.count;o<l;o++)e.isMesh===!0?e.getVertexPosition(o,Vt):Vt.fromBufferAttribute(a,o),Vt.applyMatrix4(e.matrixWorld),this.expandByPoint(Vt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),er.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),er.copy(n.boundingBox)),er.applyMatrix4(e.matrixWorld),this.union(er)}const r=e.children;for(let a=0,o=r.length;a<o;a++)this.expandByObject(r[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Vt),Vt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Di),tr.subVectors(this.max,Di),$n.subVectors(e.a,Di),Qn.subVectors(e.b,Di),ei.subVectors(e.c,Di),vn.subVectors(Qn,$n),xn.subVectors(ei,Qn),Un.subVectors($n,ei);let t=[0,-vn.z,vn.y,0,-xn.z,xn.y,0,-Un.z,Un.y,vn.z,0,-vn.x,xn.z,0,-xn.x,Un.z,0,-Un.x,-vn.y,vn.x,0,-xn.y,xn.x,0,-Un.y,Un.x,0];return!!ea(t,$n,Qn,ei,tr)&&(t=[1,0,0,0,1,0,0,0,1],!!ea(t,$n,Qn,ei,tr)&&(nr.crossVectors(vn,xn),t=[nr.x,nr.y,nr.z],ea(t,$n,Qn,ei,tr)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Vt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(Vt).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(sn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),sn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),sn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),sn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),sn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),sn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),sn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),sn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(sn)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const sn=[new T,new T,new T,new T,new T,new T,new T,new T],Vt=new T,er=new fn,$n=new T,Qn=new T,ei=new T,vn=new T,xn=new T,Un=new T,Di=new T,tr=new T,nr=new T,In=new T;function ea(i,e,t,n,r){for(let a=0,o=i.length-3;a<=o;a+=3){In.fromArray(i,a);const l=r.x*Math.abs(In.x)+r.y*Math.abs(In.y)+r.z*Math.abs(In.z),s=e.dot(In),c=t.dot(In),u=n.dot(In);if(Math.max(-Math.max(s,c,u),Math.min(s,c,u))>l)return!1}return!0}const Gl=new fn,Ui=new T,ta=new T;class mn{constructor(e=new T,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Gl.setFromPoints(e).getCenter(n);let r=0;for(let a=0,o=e.length;a<o;a++)r=Math.max(r,n.distanceToSquared(e[a]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ui.subVectors(e,this.center);const t=Ui.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=.5*(n-this.radius);this.center.addScaledVector(Ui,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ta.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ui.copy(e.center).add(ta)),this.expandByPoint(Ui.copy(e.center).sub(ta))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const on=new T,na=new T,ir=new T,Mn=new T,ia=new T,rr=new T,ra=new T;class Zi{constructor(e=new T,t=new T(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,on)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=on.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(on.copy(this.origin).addScaledVector(this.direction,t),on.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){na.copy(e).add(t).multiplyScalar(.5),ir.copy(t).sub(e).normalize(),Mn.copy(this.origin).sub(na);const a=.5*e.distanceTo(t),o=-this.direction.dot(ir),l=Mn.dot(this.direction),s=-Mn.dot(ir),c=Mn.lengthSq(),u=Math.abs(1-o*o);let p,h,d,m;if(u>0)if(p=o*s-l,h=o*l-s,m=a*u,p>=0)if(h>=-m)if(h<=m){const _=1/u;p*=_,h*=_,d=p*(p+o*h+2*l)+h*(o*p+h+2*s)+c}else h=a,p=Math.max(0,-(o*h+l)),d=-p*p+h*(h+2*s)+c;else h=-a,p=Math.max(0,-(o*h+l)),d=-p*p+h*(h+2*s)+c;else h<=-m?(p=Math.max(0,-(-o*a+l)),h=p>0?-a:Math.min(Math.max(-a,-s),a),d=-p*p+h*(h+2*s)+c):h<=m?(p=0,h=Math.min(Math.max(-a,-s),a),d=h*(h+2*s)+c):(p=Math.max(0,-(o*a+l)),h=p>0?a:Math.min(Math.max(-a,-s),a),d=-p*p+h*(h+2*s)+c);else h=o>0?-a:a,p=Math.max(0,-(o*h+l)),d=-p*p+h*(h+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,p),r&&r.copy(na).addScaledVector(ir,h),d}intersectSphere(e,t){on.subVectors(e.center,this.origin);const n=on.dot(this.direction),r=on.dot(on)-n*n,a=e.radius*e.radius;if(r>a)return null;const o=Math.sqrt(a-r),l=n-o,s=n+o;return s<0?null:l<0?this.at(s,t):this.at(l,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,a,o,l,s;const c=1/this.direction.x,u=1/this.direction.y,p=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,r=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,r=(e.min.x-h.x)*c),u>=0?(a=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(a=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),n>o||a>r?null:((a>n||isNaN(n))&&(n=a),(o<r||isNaN(r))&&(r=o),p>=0?(l=(e.min.z-h.z)*p,s=(e.max.z-h.z)*p):(l=(e.max.z-h.z)*p,s=(e.min.z-h.z)*p),n>s||l>r?null:((l>n||n!=n)&&(n=l),(s<r||r!=r)&&(r=s),r<0?null:this.at(n>=0?n:r,t)))}intersectsBox(e){return this.intersectBox(e,on)!==null}intersectTriangle(e,t,n,r,a){ia.subVectors(t,e),rr.subVectors(n,e),ra.crossVectors(ia,rr);let o,l=this.direction.dot(ra);if(l>0){if(r)return null;o=1}else{if(!(l<0))return null;o=-1,l=-l}Mn.subVectors(this.origin,e);const s=o*this.direction.dot(rr.crossVectors(Mn,rr));if(s<0)return null;const c=o*this.direction.dot(ia.cross(Mn));if(c<0||s+c>l)return null;const u=-o*Mn.dot(ra);return u<0?null:this.at(u/l,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Le{constructor(e,t,n,r,a,o,l,s,c,u,p,h,d,m,_,g){Le.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,a,o,l,s,c,u,p,h,d,m,_,g)}set(e,t,n,r,a,o,l,s,c,u,p,h,d,m,_,g){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=r,f[1]=a,f[5]=o,f[9]=l,f[13]=s,f[2]=c,f[6]=u,f[10]=p,f[14]=h,f[3]=d,f[7]=m,f[11]=_,f[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Le().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/ti.setFromMatrixColumn(e,0).length(),a=1/ti.setFromMatrixColumn(e,1).length(),o=1/ti.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*a,t[5]=n[5]*a,t[6]=n[6]*a,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,a=e.z,o=Math.cos(n),l=Math.sin(n),s=Math.cos(r),c=Math.sin(r),u=Math.cos(a),p=Math.sin(a);if(e.order==="XYZ"){const h=o*u,d=o*p,m=l*u,_=l*p;t[0]=s*u,t[4]=-s*p,t[8]=c,t[1]=d+m*c,t[5]=h-_*c,t[9]=-l*s,t[2]=_-h*c,t[6]=m+d*c,t[10]=o*s}else if(e.order==="YXZ"){const h=s*u,d=s*p,m=c*u,_=c*p;t[0]=h+_*l,t[4]=m*l-d,t[8]=o*c,t[1]=o*p,t[5]=o*u,t[9]=-l,t[2]=d*l-m,t[6]=_+h*l,t[10]=o*s}else if(e.order==="ZXY"){const h=s*u,d=s*p,m=c*u,_=c*p;t[0]=h-_*l,t[4]=-o*p,t[8]=m+d*l,t[1]=d+m*l,t[5]=o*u,t[9]=_-h*l,t[2]=-o*c,t[6]=l,t[10]=o*s}else if(e.order==="ZYX"){const h=o*u,d=o*p,m=l*u,_=l*p;t[0]=s*u,t[4]=m*c-d,t[8]=h*c+_,t[1]=s*p,t[5]=_*c+h,t[9]=d*c-m,t[2]=-c,t[6]=l*s,t[10]=o*s}else if(e.order==="YZX"){const h=o*s,d=o*c,m=l*s,_=l*c;t[0]=s*u,t[4]=_-h*p,t[8]=m*p+d,t[1]=p,t[5]=o*u,t[9]=-l*u,t[2]=-c*u,t[6]=d*p+m,t[10]=h-_*p}else if(e.order==="XZY"){const h=o*s,d=o*c,m=l*s,_=l*c;t[0]=s*u,t[4]=-p,t[8]=c*u,t[1]=h*p+_,t[5]=o*u,t[9]=d*p-m,t[2]=m*p-d,t[6]=l*u,t[10]=_*p+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Vl,e,kl)}lookAt(e,t,n){const r=this.elements;return Rt.subVectors(e,t),Rt.lengthSq()===0&&(Rt.z=1),Rt.normalize(),Sn.crossVectors(n,Rt),Sn.lengthSq()===0&&(Math.abs(n.z)===1?Rt.x+=1e-4:Rt.z+=1e-4,Rt.normalize(),Sn.crossVectors(n,Rt)),Sn.normalize(),ar.crossVectors(Rt,Sn),r[0]=Sn.x,r[4]=ar.x,r[8]=Rt.x,r[1]=Sn.y,r[5]=ar.y,r[9]=Rt.y,r[2]=Sn.z,r[6]=ar.z,r[10]=Rt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,a=this.elements,o=n[0],l=n[4],s=n[8],c=n[12],u=n[1],p=n[5],h=n[9],d=n[13],m=n[2],_=n[6],g=n[10],f=n[14],M=n[3],v=n[7],x=n[11],P=n[15],C=r[0],w=r[4],K=r[8],F=r[12],Y=r[1],$=r[5],O=r[9],ee=r[13],j=r[2],te=r[6],ne=r[10],me=r[14],ge=r[3],ye=r[7],Pe=r[11],oe=r[15];return a[0]=o*C+l*Y+s*j+c*ge,a[4]=o*w+l*$+s*te+c*ye,a[8]=o*K+l*O+s*ne+c*Pe,a[12]=o*F+l*ee+s*me+c*oe,a[1]=u*C+p*Y+h*j+d*ge,a[5]=u*w+p*$+h*te+d*ye,a[9]=u*K+p*O+h*ne+d*Pe,a[13]=u*F+p*ee+h*me+d*oe,a[2]=m*C+_*Y+g*j+f*ge,a[6]=m*w+_*$+g*te+f*ye,a[10]=m*K+_*O+g*ne+f*Pe,a[14]=m*F+_*ee+g*me+f*oe,a[3]=M*C+v*Y+x*j+P*ge,a[7]=M*w+v*$+x*te+P*ye,a[11]=M*K+v*O+x*ne+P*Pe,a[15]=M*F+v*ee+x*me+P*oe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],a=e[12],o=e[1],l=e[5],s=e[9],c=e[13],u=e[2],p=e[6],h=e[10],d=e[14];return e[3]*(+a*s*p-r*c*p-a*l*h+n*c*h+r*l*d-n*s*d)+e[7]*(+t*s*d-t*c*h+a*o*h-r*o*d+r*c*u-a*s*u)+e[11]*(+t*c*p-t*l*d-a*o*p+n*o*d+a*l*u-n*c*u)+e[15]*(-r*l*u-t*s*p+t*l*h+r*o*p-n*o*h+n*s*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],a=e[3],o=e[4],l=e[5],s=e[6],c=e[7],u=e[8],p=e[9],h=e[10],d=e[11],m=e[12],_=e[13],g=e[14],f=e[15],M=p*g*c-_*h*c+_*s*d-l*g*d-p*s*f+l*h*f,v=m*h*c-u*g*c-m*s*d+o*g*d+u*s*f-o*h*f,x=u*_*c-m*p*c+m*l*d-o*_*d-u*l*f+o*p*f,P=m*p*s-u*_*s-m*l*h+o*_*h+u*l*g-o*p*g,C=t*M+n*v+r*x+a*P;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const w=1/C;return e[0]=M*w,e[1]=(_*h*a-p*g*a-_*r*d+n*g*d+p*r*f-n*h*f)*w,e[2]=(l*g*a-_*s*a+_*r*c-n*g*c-l*r*f+n*s*f)*w,e[3]=(p*s*a-l*h*a-p*r*c+n*h*c+l*r*d-n*s*d)*w,e[4]=v*w,e[5]=(u*g*a-m*h*a+m*r*d-t*g*d-u*r*f+t*h*f)*w,e[6]=(m*s*a-o*g*a-m*r*c+t*g*c+o*r*f-t*s*f)*w,e[7]=(o*h*a-u*s*a+u*r*c-t*h*c-o*r*d+t*s*d)*w,e[8]=x*w,e[9]=(m*p*a-u*_*a-m*n*d+t*_*d+u*n*f-t*p*f)*w,e[10]=(o*_*a-m*l*a+m*n*c-t*_*c-o*n*f+t*l*f)*w,e[11]=(u*l*a-o*p*a-u*n*c+t*p*c+o*n*d-t*l*d)*w,e[12]=P*w,e[13]=(u*_*r-m*p*r+m*n*h-t*_*h-u*n*g+t*p*g)*w,e[14]=(m*l*r-o*_*r-m*n*s+t*_*s+o*n*g-t*l*g)*w,e[15]=(o*p*r-u*l*r+u*n*s-t*p*s-o*n*h+t*l*h)*w,this}scale(e){const t=this.elements,n=e.x,r=e.y,a=e.z;return t[0]*=n,t[4]*=r,t[8]*=a,t[1]*=n,t[5]*=r,t[9]*=a,t[2]*=n,t[6]*=r,t[10]*=a,t[3]*=n,t[7]*=r,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),a=1-n,o=e.x,l=e.y,s=e.z,c=a*o,u=a*l;return this.set(c*o+n,c*l-r*s,c*s+r*l,0,c*l+r*s,u*l+n,u*s-r*o,0,c*s-r*l,u*s+r*o,a*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,a,o){return this.set(1,n,a,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,a=t._x,o=t._y,l=t._z,s=t._w,c=a+a,u=o+o,p=l+l,h=a*c,d=a*u,m=a*p,_=o*u,g=o*p,f=l*p,M=s*c,v=s*u,x=s*p,P=n.x,C=n.y,w=n.z;return r[0]=(1-(_+f))*P,r[1]=(d+x)*P,r[2]=(m-v)*P,r[3]=0,r[4]=(d-x)*C,r[5]=(1-(h+f))*C,r[6]=(g+M)*C,r[7]=0,r[8]=(m+v)*w,r[9]=(g-M)*w,r[10]=(1-(h+_))*w,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let a=ti.set(r[0],r[1],r[2]).length();const o=ti.set(r[4],r[5],r[6]).length(),l=ti.set(r[8],r[9],r[10]).length();this.determinant()<0&&(a=-a),e.x=r[12],e.y=r[13],e.z=r[14],kt.copy(this);const s=1/a,c=1/o,u=1/l;return kt.elements[0]*=s,kt.elements[1]*=s,kt.elements[2]*=s,kt.elements[4]*=c,kt.elements[5]*=c,kt.elements[6]*=c,kt.elements[8]*=u,kt.elements[9]*=u,kt.elements[10]*=u,t.setFromRotationMatrix(kt),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,r,a,o,l=2e3){const s=this.elements,c=2*a/(t-e),u=2*a/(n-r),p=(t+e)/(t-e),h=(n+r)/(n-r);let d,m;if(l===Si)d=-(o+a)/(o-a),m=-2*o*a/(o-a);else{if(l!==Ir)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+l);d=-o/(o-a),m=-o*a/(o-a)}return s[0]=c,s[4]=0,s[8]=p,s[12]=0,s[1]=0,s[5]=u,s[9]=h,s[13]=0,s[2]=0,s[6]=0,s[10]=d,s[14]=m,s[3]=0,s[7]=0,s[11]=-1,s[15]=0,this}makeOrthographic(e,t,n,r,a,o,l=2e3){const s=this.elements,c=1/(t-e),u=1/(n-r),p=1/(o-a),h=(t+e)*c,d=(n+r)*u;let m,_;if(l===Si)m=(o+a)*p,_=-2*p;else{if(l!==Ir)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+l);m=a*p,_=-1*p}return s[0]=2*c,s[4]=0,s[8]=0,s[12]=-h,s[1]=0,s[5]=2*u,s[9]=0,s[13]=-d,s[2]=0,s[6]=0,s[10]=_,s[14]=-m,s[3]=0,s[7]=0,s[11]=0,s[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ti=new T,kt=new Le,Vl=new T(0,0,0),kl=new T(1,1,1),Sn=new T,ar=new T,Rt=new T,Bs=new Le,zs=new Yt;class bt{constructor(e=0,t=0,n=0,r=bt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,a=r[0],o=r[4],l=r[8],s=r[1],c=r[5],u=r[9],p=r[2],h=r[6],d=r[10];switch(t){case"XYZ":this._y=Math.asin(yt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,d),this._z=Math.atan2(-o,a)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-yt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(l,d),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-p,a),this._z=0);break;case"ZXY":this._x=Math.asin(yt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-p,d),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(s,a));break;case"ZYX":this._y=Math.asin(-yt(p,-1,1)),Math.abs(p)<.9999999?(this._x=Math.atan2(h,d),this._z=Math.atan2(s,a)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(yt(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-p,a)):(this._x=0,this._y=Math.atan2(l,d));break;case"XZY":this._z=Math.asin(-yt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(l,a)):(this._x=Math.atan2(-u,d),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Bs.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Bs,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return zs.setFromEuler(this),this.setFromQuaternion(zs,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}bt.DEFAULT_ORDER="XYZ";class Ms{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!=0}isEnabled(e){return(this.mask&(1<<e|0))!=0}}let Wl=0;const Hs=new T,ni=new Yt,ln=new Le,sr=new T,Ii=new T,Xl=new T,jl=new Yt,Gs=new T(1,0,0),Vs=new T(0,1,0),ks=new T(0,0,1),Ws={type:"added"},ql={type:"removed"},ii={type:"childadded",child:null},aa={type:"childremoved",child:null};class ft extends Ei{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Wl++}),this.uuid=Ki(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ft.DEFAULT_UP.clone();const e=new T,t=new bt,n=new Yt,r=new T(1,1,1);t._onChange(function(){n.setFromEuler(t,!1)}),n._onChange(function(){t.setFromQuaternion(n,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Le},normalMatrix:{value:new Ve}}),this.matrix=new Le,this.matrixWorld=new Le,this.matrixAutoUpdate=ft.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ms,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ni.setFromAxisAngle(e,t),this.quaternion.multiply(ni),this}rotateOnWorldAxis(e,t){return ni.setFromAxisAngle(e,t),this.quaternion.premultiply(ni),this}rotateX(e){return this.rotateOnAxis(Gs,e)}rotateY(e){return this.rotateOnAxis(Vs,e)}rotateZ(e){return this.rotateOnAxis(ks,e)}translateOnAxis(e,t){return Hs.copy(e).applyQuaternion(this.quaternion),this.position.add(Hs.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Gs,e)}translateY(e){return this.translateOnAxis(Vs,e)}translateZ(e){return this.translateOnAxis(ks,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ln.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?sr.copy(e):sr.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Ii.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ln.lookAt(Ii,sr,this.up):ln.lookAt(sr,Ii,this.up),this.quaternion.setFromRotationMatrix(ln),r&&(ln.extractRotation(r.matrixWorld),ni.setFromRotationMatrix(ln),this.quaternion.premultiply(ni.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ws),ii.child=e,this.dispatchEvent(ii),ii.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ql),aa.child=e,this.dispatchEvent(aa),aa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ln.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ln.multiply(e.parent.matrixWorld)),e.applyMatrix4(ln),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ws),ii.child=e,this.dispatchEvent(ii),ii.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ii,e,Xl),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ii,jl,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};function a(l,s){return l[s.uuid]===void 0&&(l[s.uuid]=s.toJSON(e)),s.uuid}if(r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(l=>({boxInitialized:l.boxInitialized,boxMin:l.box.min.toArray(),boxMax:l.box.max.toArray(),sphereInitialized:l.sphereInitialized,sphereRadius:l.sphere.radius,sphereCenter:l.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()})),this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(e.geometries,this.geometry);const l=this.geometry.parameters;if(l!==void 0&&l.shapes!==void 0){const s=l.shapes;if(Array.isArray(s))for(let c=0,u=s.length;c<u;c++){const p=s[c];a(e.shapes,p)}else a(e.shapes,s)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const l=[];for(let s=0,c=this.material.length;s<c;s++)l.push(a(e.materials,this.material[s]));r.material=l}else r.material=a(e.materials,this.material);if(this.children.length>0){r.children=[];for(let l=0;l<this.children.length;l++)r.children.push(this.children[l].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let l=0;l<this.animations.length;l++){const s=this.animations[l];r.animations.push(a(e.animations,s))}}if(t){const l=o(e.geometries),s=o(e.materials),c=o(e.textures),u=o(e.images),p=o(e.shapes),h=o(e.skeletons),d=o(e.animations),m=o(e.nodes);l.length>0&&(n.geometries=l),s.length>0&&(n.materials=s),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),p.length>0&&(n.shapes=p),h.length>0&&(n.skeletons=h),d.length>0&&(n.animations=d),m.length>0&&(n.nodes=m)}return n.object=r,n;function o(l){const s=[];for(const c in l){const u=l[c];delete u.metadata,s.push(u)}return s}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}ft.DEFAULT_UP=new T(0,1,0),ft.DEFAULT_MATRIX_AUTO_UPDATE=!0,ft.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Wt=new T,cn=new T,sa=new T,un=new T,ri=new T,ai=new T,Xs=new T,oa=new T,la=new T,ca=new T,ua=new $e,ha=new $e,da=new $e;class Ot{constructor(e=new T,t=new T,n=new T){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Wt.subVectors(e,t),r.cross(Wt);const a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(e,t,n,r,a){Wt.subVectors(r,t),cn.subVectors(n,t),sa.subVectors(e,t);const o=Wt.dot(Wt),l=Wt.dot(cn),s=Wt.dot(sa),c=cn.dot(cn),u=cn.dot(sa),p=o*c-l*l;if(p===0)return a.set(0,0,0),null;const h=1/p,d=(c*s-l*u)*h,m=(o*u-l*s)*h;return a.set(1-d-m,m,d)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,un)!==null&&un.x>=0&&un.y>=0&&un.x+un.y<=1}static getInterpolation(e,t,n,r,a,o,l,s){return this.getBarycoord(e,t,n,r,un)===null?(s.x=0,s.y=0,"z"in s&&(s.z=0),"w"in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(a,un.x),s.addScaledVector(o,un.y),s.addScaledVector(l,un.z),s)}static getInterpolatedAttribute(e,t,n,r,a,o){return ua.setScalar(0),ha.setScalar(0),da.setScalar(0),ua.fromBufferAttribute(e,t),ha.fromBufferAttribute(e,n),da.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(ua,a.x),o.addScaledVector(ha,a.y),o.addScaledVector(da,a.z),o}static isFrontFacing(e,t,n,r){return Wt.subVectors(n,t),cn.subVectors(e,t),Wt.cross(cn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Wt.subVectors(this.c,this.b),cn.subVectors(this.a,this.b),.5*Wt.cross(cn).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Ot.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Ot.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,a){return Ot.getInterpolation(e,this.a,this.b,this.c,t,n,r,a)}containsPoint(e){return Ot.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Ot.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,a=this.c;let o,l;ri.subVectors(r,n),ai.subVectors(a,n),oa.subVectors(e,n);const s=ri.dot(oa),c=ai.dot(oa);if(s<=0&&c<=0)return t.copy(n);la.subVectors(e,r);const u=ri.dot(la),p=ai.dot(la);if(u>=0&&p<=u)return t.copy(r);const h=s*p-u*c;if(h<=0&&s>=0&&u<=0)return o=s/(s-u),t.copy(n).addScaledVector(ri,o);ca.subVectors(e,a);const d=ri.dot(ca),m=ai.dot(ca);if(m>=0&&d<=m)return t.copy(a);const _=d*c-s*m;if(_<=0&&c>=0&&m<=0)return l=c/(c-m),t.copy(n).addScaledVector(ai,l);const g=u*m-d*p;if(g<=0&&p-u>=0&&d-m>=0)return Xs.subVectors(a,r),l=(p-u)/(p-u+(d-m)),t.copy(r).addScaledVector(Xs,l);const f=1/(g+_+h);return o=_*f,l=h*f,t.copy(n).addScaledVector(ri,o).addScaledVector(ai,l)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const el={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},yn={h:0,s:0,l:0},or={h:0,s:0,l:0};function pa(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+6*(e-i)*t:t<.5?e:t<2/3?i+6*(e-i)*(2/3-t):i}class Oe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=It){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,Je.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=Je.workingColorSpace){return this.r=e,this.g=t,this.b=n,Je.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=Je.workingColorSpace){if(e=Ul(e,1),t=yt(t,0,1),n=yt(n,0,1),t===0)this.r=this.g=this.b=n;else{const a=n<=.5?n*(1+t):n+t-n*t,o=2*n-a;this.r=pa(o,a,e+1/3),this.g=pa(o,a,e),this.b=pa(o,a,e-1/3)}return Je.toWorkingColorSpace(this,r),this}setStyle(e,t=It){function n(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const o=r[1],l=r[2];switch(o){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(l))return n(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=r[1],o=a.length;if(o===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(a,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=It){const n=el[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=mi(e.r),this.g=mi(e.g),this.b=mi(e.b),this}copyLinearToSRGB(e){return this.r=Jr(e.r),this.g=Jr(e.g),this.b=Jr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=It){return Je.fromWorkingColorSpace(gt.copy(this),e),65536*Math.round(yt(255*gt.r,0,255))+256*Math.round(yt(255*gt.g,0,255))+Math.round(yt(255*gt.b,0,255))}getHexString(e=It){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Je.workingColorSpace){Je.fromWorkingColorSpace(gt.copy(this),t);const n=gt.r,r=gt.g,a=gt.b,o=Math.max(n,r,a),l=Math.min(n,r,a);let s,c;const u=(l+o)/2;if(l===o)s=0,c=0;else{const p=o-l;switch(c=u<=.5?p/(o+l):p/(2-o-l),o){case n:s=(r-a)/p+(r<a?6:0);break;case r:s=(a-n)/p+2;break;case a:s=(n-r)/p+4}s/=6}return e.h=s,e.s=c,e.l=u,e}getRGB(e,t=Je.workingColorSpace){return Je.fromWorkingColorSpace(gt.copy(this),t),e.r=gt.r,e.g=gt.g,e.b=gt.b,e}getStyle(e=It){Je.fromWorkingColorSpace(gt.copy(this),e);const t=gt.r,n=gt.g,r=gt.b;return e!==It?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*n)},${Math.round(255*r)})`}offsetHSL(e,t,n){return this.getHSL(yn),this.setHSL(yn.h+e,yn.s+t,yn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(yn),e.getHSL(or);const n=Kr(yn.h,or.h,t),r=Kr(yn.s,or.s,t),a=Kr(yn.l,or.l,t);return this.setHSL(n,r,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,a=e.elements;return this.r=a[0]*t+a[3]*n+a[6]*r,this.g=a[1]*t+a[4]*n+a[7]*r,this.b=a[2]*t+a[5]*n+a[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const gt=new Oe;Oe.NAMES=el;let Yl=0;class bi extends Ei{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Yl++}),this.uuid=Ki(),this.name="",this.type="Material",this.blending=1,this.side=An,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Pa,this.blendDst=La,this.blendEquation=Hn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Oe(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Zn,this.stencilZFail=Zn,this.stencilZPass=Zn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];r!==void 0?r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n:console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};function r(a){const o=[];for(const l in a){const s=a[l];delete s.metadata,o.push(s)}return o}if(n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==An&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Pa&&(n.blendSrc=this.blendSrc),this.blendDst!==La&&(n.blendDst=this.blendDst),this.blendEquation!==Hn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Zn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Zn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Zn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData),t){const a=r(e.textures),o=r(e.images);a.length>0&&(n.textures=a),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let a=0;a!==r;++a)n[a]=t[a].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Gn extends bi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bt,this.combine=Bo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}Kl();function Kl(){const i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),r=new Uint32Array(512);for(let s=0;s<256;++s){const c=s-127;c<-27?(n[s]=0,n[256|s]=32768,r[s]=24,r[256|s]=24):c<-14?(n[s]=1024>>-c-14,n[256|s]=1024>>-c-14|32768,r[s]=-c-1,r[256|s]=-c-1):c<=15?(n[s]=c+15<<10,n[256|s]=c+15<<10|32768,r[s]=13,r[256|s]=13):c<128?(n[s]=31744,n[256|s]=64512,r[s]=24,r[256|s]=24):(n[s]=31744,n[256|s]=64512,r[s]=13,r[256|s]=13)}const a=new Uint32Array(2048),o=new Uint32Array(64),l=new Uint32Array(64);for(let s=1;s<1024;++s){let c=s<<13,u=0;for(;!(8388608&c);)c<<=1,u-=8388608;c&=-8388609,u+=947912704,a[s]=c|u}for(let s=1024;s<2048;++s)a[s]=939524096+(s-1024<<13);for(let s=1;s<31;++s)o[s]=s<<23;o[31]=1199570944,o[32]=2147483648;for(let s=33;s<63;++s)o[s]=2147483648+(s-32<<23);o[63]=3347054592;for(let s=1;s<64;++s)s!==32&&(l[s]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:r,mantissaTable:a,exponentTable:o,offsetTable:l}}const ct=new T,lr=new ze;class Pt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ds,this.updateRanges=[],this.gpuType=en,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)lr.fromBufferAttribute(this,t),lr.applyMatrix3(e),this.setXY(t,lr.x,lr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)ct.fromBufferAttribute(this,t),ct.applyMatrix3(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)ct.fromBufferAttribute(this,t),ct.applyMatrix4(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)ct.fromBufferAttribute(this,t),ct.applyNormalMatrix(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)ct.fromBufferAttribute(this,t),ct.transformDirection(e),this.setXYZ(t,ct.x,ct.y,ct.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Pi(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=St(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Pi(t,this.array)),t}setX(e,t){return this.normalized&&(t=St(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Pi(t,this.array)),t}setY(e,t){return this.normalized&&(t=St(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Pi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=St(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Pi(t,this.array)),t}setW(e,t){return this.normalized&&(t=St(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=St(t,this.array),n=St(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=St(t,this.array),n=St(n,this.array),r=St(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,a){return e*=this.itemSize,this.normalized&&(t=St(t,this.array),n=St(n,this.array),r=St(r,this.array),a=St(a,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ds&&(e.usage=this.usage),e}}class tl extends Pt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class nl extends Pt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class ut extends Pt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Zl=0;const Ut=new Le,fa=new ft,si=new T,Ct=new fn,Ni=new fn,pt=new T;class Tt extends Ei{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Zl++}),this.uuid=Ki(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Jo(e)?nl:tl)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const a=new Ve().getNormalMatrix(e);n.applyNormalMatrix(a),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Ut.makeRotationFromQuaternion(e),this.applyMatrix4(Ut),this}rotateX(e){return Ut.makeRotationX(e),this.applyMatrix4(Ut),this}rotateY(e){return Ut.makeRotationY(e),this.applyMatrix4(Ut),this}rotateZ(e){return Ut.makeRotationZ(e),this.applyMatrix4(Ut),this}translate(e,t,n){return Ut.makeTranslation(e,t,n),this.applyMatrix4(Ut),this}scale(e,t,n){return Ut.makeScale(e,t,n),this.applyMatrix4(Ut),this}lookAt(e){return fa.lookAt(e),fa.updateMatrix(),this.applyMatrix4(fa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(si).negate(),this.translate(si.x,si.y,si.z),this}setFromPoints(e){const t=[];for(let n=0,r=e.length;n<r;n++){const a=e[n];t.push(a.x,a.y,a.z||0)}return this.setAttribute("position",new ut(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new fn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new T(-1/0,-1/0,-1/0),new T(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const a=t[n];Ct.setFromBufferAttribute(a),this.morphTargetsRelative?(pt.addVectors(this.boundingBox.min,Ct.min),this.boundingBox.expandByPoint(pt),pt.addVectors(this.boundingBox.max,Ct.max),this.boundingBox.expandByPoint(pt)):(this.boundingBox.expandByPoint(Ct.min),this.boundingBox.expandByPoint(Ct.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new mn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new T,1/0);if(e){const n=this.boundingSphere.center;if(Ct.setFromBufferAttribute(e),t)for(let a=0,o=t.length;a<o;a++){const l=t[a];Ni.setFromBufferAttribute(l),this.morphTargetsRelative?(pt.addVectors(Ct.min,Ni.min),Ct.expandByPoint(pt),pt.addVectors(Ct.max,Ni.max),Ct.expandByPoint(pt)):(Ct.expandByPoint(Ni.min),Ct.expandByPoint(Ni.max))}Ct.getCenter(n);let r=0;for(let a=0,o=e.count;a<o;a++)pt.fromBufferAttribute(e,a),r=Math.max(r,n.distanceToSquared(pt));if(t)for(let a=0,o=t.length;a<o;a++){const l=t[a],s=this.morphTargetsRelative;for(let c=0,u=l.count;c<u;c++)pt.fromBufferAttribute(l,c),s&&(si.fromBufferAttribute(e,c),pt.add(si)),r=Math.max(r,n.distanceToSquared(pt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");const n=t.position,r=t.normal,a=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Pt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),l=[],s=[];for(let K=0;K<n.count;K++)l[K]=new T,s[K]=new T;const c=new T,u=new T,p=new T,h=new ze,d=new ze,m=new ze,_=new T,g=new T;function f(K,F,Y){c.fromBufferAttribute(n,K),u.fromBufferAttribute(n,F),p.fromBufferAttribute(n,Y),h.fromBufferAttribute(a,K),d.fromBufferAttribute(a,F),m.fromBufferAttribute(a,Y),u.sub(c),p.sub(c),d.sub(h),m.sub(h);const $=1/(d.x*m.y-m.x*d.y);isFinite($)&&(_.copy(u).multiplyScalar(m.y).addScaledVector(p,-d.y).multiplyScalar($),g.copy(p).multiplyScalar(d.x).addScaledVector(u,-m.x).multiplyScalar($),l[K].add(_),l[F].add(_),l[Y].add(_),s[K].add(g),s[F].add(g),s[Y].add(g))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let K=0,F=M.length;K<F;++K){const Y=M[K],$=Y.start;for(let O=$,ee=$+Y.count;O<ee;O+=3)f(e.getX(O+0),e.getX(O+1),e.getX(O+2))}const v=new T,x=new T,P=new T,C=new T;function w(K){P.fromBufferAttribute(r,K),C.copy(P);const F=l[K];v.copy(F),v.sub(P.multiplyScalar(P.dot(F))).normalize(),x.crossVectors(C,F);const Y=x.dot(s[K])<0?-1:1;o.setXYZW(K,v.x,v.y,v.z,Y)}for(let K=0,F=M.length;K<F;++K){const Y=M[K],$=Y.start;for(let O=$,ee=$+Y.count;O<ee;O+=3)w(e.getX(O+0)),w(e.getX(O+1)),w(e.getX(O+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Pt(new Float32Array(3*t.count),3),this.setAttribute("normal",n);else for(let h=0,d=n.count;h<d;h++)n.setXYZ(h,0,0,0);const r=new T,a=new T,o=new T,l=new T,s=new T,c=new T,u=new T,p=new T;if(e)for(let h=0,d=e.count;h<d;h+=3){const m=e.getX(h+0),_=e.getX(h+1),g=e.getX(h+2);r.fromBufferAttribute(t,m),a.fromBufferAttribute(t,_),o.fromBufferAttribute(t,g),u.subVectors(o,a),p.subVectors(r,a),u.cross(p),l.fromBufferAttribute(n,m),s.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),l.add(u),s.add(u),c.add(u),n.setXYZ(m,l.x,l.y,l.z),n.setXYZ(_,s.x,s.y,s.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let h=0,d=t.count;h<d;h+=3)r.fromBufferAttribute(t,h+0),a.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,a),p.subVectors(r,a),u.cross(p),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)pt.fromBufferAttribute(e,t),pt.normalize(),e.setXYZ(t,pt.x,pt.y,pt.z)}toNonIndexed(){function e(l,s){const c=l.array,u=l.itemSize,p=l.normalized,h=new c.constructor(s.length*u);let d=0,m=0;for(let _=0,g=s.length;_<g;_++){d=l.isInterleavedBufferAttribute?s[_]*l.data.stride+l.offset:s[_]*u;for(let f=0;f<u;f++)h[m++]=c[d++]}return new Pt(h,u,p)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Tt,n=this.index.array,r=this.attributes;for(const l in r){const s=e(r[l],n);t.setAttribute(l,s)}const a=this.morphAttributes;for(const l in a){const s=[],c=a[l];for(let u=0,p=c.length;u<p;u++){const h=e(c[u],n);s.push(h)}t.morphAttributes[l]=s}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let l=0,s=o.length;l<s;l++){const c=o[l];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const s=this.parameters;for(const c in s)s[c]!==void 0&&(e[c]=s[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const s in n){const c=n[s];e.data.attributes[s]=c.toJSON(e.data)}const r={};let a=!1;for(const s in this.morphAttributes){const c=this.morphAttributes[s],u=[];for(let p=0,h=c.length;p<h;p++){const d=c[p];u.push(d.toJSON(e.data))}u.length>0&&(r[s]=u,a=!0)}a&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const l=this.boundingSphere;return l!==null&&(e.data.boundingSphere={center:l.center.toArray(),radius:l.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const r=e.attributes;for(const c in r){const u=r[c];this.setAttribute(c,u.clone(t))}const a=e.morphAttributes;for(const c in a){const u=[],p=a[c];for(let h=0,d=p.length;h<d;h++)u.push(p[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const p=o[c];this.addGroup(p.start,p.count,p.materialIndex)}const l=e.boundingBox;l!==null&&(this.boundingBox=l.clone());const s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const js=new Le,Nn=new Zi,cr=new mn,qs=new T,ur=new T,hr=new T,dr=new T,ma=new T,pr=new T,Ys=new T,fr=new T;class ot extends ft{constructor(e=new Tt,t=new Gn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){const n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,a=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const l=this.morphTargetInfluences;if(a&&l){pr.set(0,0,0);for(let s=0,c=a.length;s<c;s++){const u=l[s],p=a[s];u!==0&&(ma.fromBufferAttribute(p,e),o?pr.addScaledVector(ma,u):pr.addScaledVector(ma.sub(t),u))}t.add(pr)}return t}raycast(e,t){const n=this.geometry,r=this.material,a=this.matrixWorld;if(r!==void 0){if(n.boundingSphere===null&&n.computeBoundingSphere(),cr.copy(n.boundingSphere),cr.applyMatrix4(a),Nn.copy(e.ray).recast(e.near),cr.containsPoint(Nn.origin)===!1&&(Nn.intersectSphere(cr,qs)===null||Nn.origin.distanceToSquared(qs)>(e.far-e.near)**2))return;js.copy(a).invert(),Nn.copy(e.ray).applyMatrix4(js),n.boundingBox!==null&&Nn.intersectsBox(n.boundingBox)===!1||this._computeIntersections(e,t,Nn)}}_computeIntersections(e,t,n){let r;const a=this.geometry,o=this.material,l=a.index,s=a.attributes.position,c=a.attributes.uv,u=a.attributes.uv1,p=a.attributes.normal,h=a.groups,d=a.drawRange;if(l!==null)if(Array.isArray(o))for(let m=0,_=h.length;m<_;m++){const g=h[m],f=o[g.materialIndex];for(let M=Math.max(g.start,d.start),v=Math.min(l.count,Math.min(g.start+g.count,d.start+d.count));M<v;M+=3)r=mr(this,f,e,n,c,u,p,l.getX(M),l.getX(M+1),l.getX(M+2)),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=g.materialIndex,t.push(r))}else for(let m=Math.max(0,d.start),_=Math.min(l.count,d.start+d.count);m<_;m+=3)r=mr(this,o,e,n,c,u,p,l.getX(m),l.getX(m+1),l.getX(m+2)),r&&(r.faceIndex=Math.floor(m/3),t.push(r));else if(s!==void 0)if(Array.isArray(o))for(let m=0,_=h.length;m<_;m++){const g=h[m],f=o[g.materialIndex];for(let M=Math.max(g.start,d.start),v=Math.min(s.count,Math.min(g.start+g.count,d.start+d.count));M<v;M+=3)r=mr(this,f,e,n,c,u,p,M,M+1,M+2),r&&(r.faceIndex=Math.floor(M/3),r.face.materialIndex=g.materialIndex,t.push(r))}else for(let m=Math.max(0,d.start),_=Math.min(s.count,d.start+d.count);m<_;m+=3)r=mr(this,o,e,n,c,u,p,m,m+1,m+2),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}function mr(i,e,t,n,r,a,o,l,s,c){i.getVertexPosition(l,ur),i.getVertexPosition(s,hr),i.getVertexPosition(c,dr);const u=function(p,h,d,m,_,g,f,M){let v;if(v=h.side===Et?m.intersectTriangle(f,g,_,!0,M):m.intersectTriangle(_,g,f,h.side===An,M),v===null)return null;fr.copy(M),fr.applyMatrix4(p.matrixWorld);const x=d.ray.origin.distanceTo(fr);return x<d.near||x>d.far?null:{distance:x,point:fr.clone(),object:p}}(i,e,t,n,ur,hr,dr,Ys);if(u){const p=new T;Ot.getBarycoord(Ys,ur,hr,dr,p),r&&(u.uv=Ot.getInterpolatedAttribute(r,l,s,c,p,new ze)),a&&(u.uv1=Ot.getInterpolatedAttribute(a,l,s,c,p,new ze)),o&&(u.normal=Ot.getInterpolatedAttribute(o,l,s,c,p,new T),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a:l,b:s,c,normal:new T,materialIndex:0};Ot.getNormal(ur,hr,dr,h.normal),u.face=h,u.barycoord=p}return u}class jn extends Tt{constructor(e=1,t=1,n=1,r=1,a=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:a,depthSegments:o};const l=this;r=Math.floor(r),a=Math.floor(a),o=Math.floor(o);const s=[],c=[],u=[],p=[];let h=0,d=0;function m(_,g,f,M,v,x,P,C,w,K,F){const Y=x/w,$=P/K,O=x/2,ee=P/2,j=C/2,te=w+1,ne=K+1;let me=0,ge=0;const ye=new T;for(let Pe=0;Pe<ne;Pe++){const oe=Pe*$-ee;for(let pe=0;pe<te;pe++){const we=pe*Y-O;ye[_]=we*M,ye[g]=oe*v,ye[f]=j,c.push(ye.x,ye.y,ye.z),ye[_]=0,ye[g]=0,ye[f]=C>0?1:-1,u.push(ye.x,ye.y,ye.z),p.push(pe/w),p.push(1-Pe/K),me+=1}}for(let Pe=0;Pe<K;Pe++)for(let oe=0;oe<w;oe++){const pe=h+oe+te*Pe,we=h+oe+te*(Pe+1),le=h+(oe+1)+te*(Pe+1),E=h+(oe+1)+te*Pe;s.push(pe,we,E),s.push(we,le,E),ge+=6}l.addGroup(d,ge,F),d+=ge,h+=me}m("z","y","x",-1,-1,n,t,e,o,a,0),m("z","y","x",1,-1,n,t,-e,o,a,1),m("x","z","y",1,1,e,n,t,r,o,2),m("x","z","y",1,-1,e,n,-t,r,o,3),m("x","y","z",1,-1,e,t,n,r,a,4),m("x","y","z",-1,-1,e,t,-n,r,a,5),this.setIndex(s),this.setAttribute("position",new ut(c,3)),this.setAttribute("normal",new ut(u,3)),this.setAttribute("uv",new ut(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new jn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function yi(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function xt(i){const e={};for(let t=0;t<i.length;t++){const n=yi(i[t]);for(const r in n)e[r]=n[r]}return e}function il(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Je.workingColorSpace}const Jl={clone:yi,merge:xt};class Rn extends bi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,this.fragmentShader=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=yi(e.uniforms),this.uniformsGroups=function(t){const n=[];for(let r=0;r<t.length;r++)n.push(t[r].clone());return n}(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Ss extends ft{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Le,this.projectionMatrix=new Le,this.projectionMatrixInverse=new Le,this.coordinateSystem=Si}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const En=new T,Ks=new ze,Zs=new ze;class Nt extends Ss{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=2*os*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(.5*Yr*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*os*Math.atan(Math.tan(.5*Yr*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){En.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(En.x,En.y).multiplyScalar(-e/En.z),En.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(En.x,En.y).multiplyScalar(-e/En.z)}getViewSize(e,t){return this.getViewBounds(e,Ks,Zs),t.subVectors(Zs,Ks)}setViewOffset(e,t,n,r,a,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(.5*Yr*this.fov)/this.zoom,n=2*t,r=this.aspect*n,a=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const s=o.fullWidth,c=o.fullHeight;a+=o.offsetX*r/s,t-=o.offsetY*n/c,r*=o.width/s,n*=o.height/c}const l=this.filmOffset;l!==0&&(a+=e*l/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const oi=-90;class $l extends ft{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Nt(oi,1,e,t);r.layers=this.layers,this.add(r);const a=new Nt(oi,1,e,t);a.layers=this.layers,this.add(a);const o=new Nt(oi,1,e,t);o.layers=this.layers,this.add(o);const l=new Nt(oi,1,e,t);l.layers=this.layers,this.add(l);const s=new Nt(oi,1,e,t);s.layers=this.layers,this.add(s);const c=new Nt(oi,1,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,a,o,l,s]=t;for(const c of t)this.remove(c);if(e===Si)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),l.up.set(0,1,0),l.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else{if(e!==Ir)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),l.up.set(0,-1,0),l.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1)}for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,o,l,s,c,u]=this.children,p=e.getRenderTarget(),h=e.getActiveCubeFace(),d=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,a),e.setRenderTarget(n,1,r),e.render(t,o),e.setRenderTarget(n,2,r),e.render(t,l),e.setRenderTarget(n,3,r),e.render(t,s),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,r),e.render(t,u),e.setRenderTarget(p,h,d),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class rl extends _t{constructor(e,t,n,r,a,o,l,s,c,u){super(e=e!==void 0?e:[],t=t!==void 0?t:_i,n,r,a,o,l,s,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ql extends kn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new rl(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0&&t.generateMipmaps,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:Qt}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new jn(5,5,5),a=new Rn({name:"CubemapFromEquirect",uniforms:yi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Et,blending:0});a.uniforms.tEquirect.value=t;const o=new ot(r,a),l=t.minFilter;return t.minFilter===pi&&(t.minFilter=Qt),new $l(1,10,this).update(e,o),t.minFilter=l,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,r){const a=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,r);e.setRenderTarget(a)}}const ga=new T,ec=new T,tc=new Ve;class Tn{constructor(e=new T(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=ga.subVectors(n,t).cross(ec.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(ga),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return a<0||a>1?null:t.copy(e.start).addScaledVector(n,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||tc.getNormalMatrix(e),r=this.coplanarPoint(ga).applyMatrix4(e),a=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const On=new mn,gr=new T;class Gr{constructor(e=new Tn,t=new Tn,n=new Tn,r=new Tn,a=new Tn,o=new Tn){this.planes=[e,t,n,r,a,o]}set(e,t,n,r,a,o){const l=this.planes;return l[0].copy(e),l[1].copy(t),l[2].copy(n),l[3].copy(r),l[4].copy(a),l[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3){const n=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],s=r[3],c=r[4],u=r[5],p=r[6],h=r[7],d=r[8],m=r[9],_=r[10],g=r[11],f=r[12],M=r[13],v=r[14],x=r[15];if(n[0].setComponents(s-a,h-c,g-d,x-f).normalize(),n[1].setComponents(s+a,h+c,g+d,x+f).normalize(),n[2].setComponents(s+o,h+u,g+m,x+M).normalize(),n[3].setComponents(s-o,h-u,g-m,x-M).normalize(),n[4].setComponents(s-l,h-p,g-_,x-v).normalize(),t===Si)n[5].setComponents(s+l,h+p,g+_,x+v).normalize();else{if(t!==Ir)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);n[5].setComponents(l,p,_,v).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),On.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),On.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(On)}intersectsSprite(e){return On.center.set(0,0,0),On.radius=.7071067811865476,On.applyMatrix4(e.matrixWorld),this.intersectsSphere(On)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(gr.x=r.normal.x>0?e.max.x:e.min.x,gr.y=r.normal.y>0?e.max.y:e.min.y,gr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(gr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function al(){let i=null,e=!1,t=null,n=null;function r(a,o){t(a,o),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){i=a}}}function nc(i){const e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);const n=e.get(t);n&&(i.deleteBuffer(n.buffer),e.delete(t))},update:function(t,n){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){const a=e.get(t);return void((!a||a.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}const r=e.get(t);if(r===void 0)e.set(t,function(a,o){const l=a.array,s=a.usage,c=l.byteLength,u=i.createBuffer();let p;if(i.bindBuffer(o,u),i.bufferData(o,l,s),a.onUploadCallback(),l instanceof Float32Array)p=i.FLOAT;else if(l instanceof Uint16Array)p=a.isFloat16BufferAttribute?i.HALF_FLOAT:i.UNSIGNED_SHORT;else if(l instanceof Int16Array)p=i.SHORT;else if(l instanceof Uint32Array)p=i.UNSIGNED_INT;else if(l instanceof Int32Array)p=i.INT;else if(l instanceof Int8Array)p=i.BYTE;else if(l instanceof Uint8Array)p=i.UNSIGNED_BYTE;else{if(!(l instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);p=i.UNSIGNED_BYTE}return{buffer:u,type:p,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:c}}(t,n));else if(r.version<t.version){if(r.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(a,o,l){const s=o.array,c=o.updateRanges;if(i.bindBuffer(l,a),c.length===0)i.bufferSubData(l,0,s);else{c.sort((p,h)=>p.start-h.start);let u=0;for(let p=1;p<c.length;p++){const h=c[u],d=c[p];d.start<=h.start+h.count+1?h.count=Math.max(h.count,d.start+d.count-h.start):(++u,c[u]=d)}c.length=u+1;for(let p=0,h=c.length;p<h;p++){const d=c[p];i.bufferSubData(l,d.start*s.BYTES_PER_ELEMENT,s,d.start,d.count)}o.clearUpdateRanges()}o.onUploadCallback()})(r.buffer,t,n),r.version=t.version}}}}class Ti extends Tt{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const a=e/2,o=t/2,l=Math.floor(n),s=Math.floor(r),c=l+1,u=s+1,p=e/l,h=t/s,d=[],m=[],_=[],g=[];for(let f=0;f<u;f++){const M=f*h-o;for(let v=0;v<c;v++){const x=v*p-a;m.push(x,-M,0),_.push(0,0,1),g.push(v/l),g.push(1-f/s)}}for(let f=0;f<s;f++)for(let M=0;M<l;M++){const v=M+c*f,x=M+c*(f+1),P=M+1+c*(f+1),C=M+1+c*f;d.push(v,x,C),d.push(x,P,C)}this.setIndex(d),this.setAttribute("position",new ut(m,3)),this.setAttribute("normal",new ut(_,3)),this.setAttribute("uv",new ut(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ti(e.width,e.height,e.widthSegments,e.heightSegments)}}const Ge={alphahash_fragment:`#ifdef USE_ALPHAHASH
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
}`},xe={common:{diffuse:{value:new Oe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ve}},envmap:{envMap:{value:null},envMapRotation:{value:new Ve},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ve}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ve}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ve},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ve},normalScale:{value:new ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ve},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ve}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ve}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ve}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Oe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Oe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0},uvTransform:{value:new Ve}},sprite:{diffuse:{value:new Oe(16777215)},opacity:{value:1},center:{value:new ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ve},alphaMap:{value:null},alphaMapTransform:{value:new Ve},alphaTest:{value:0}}},$t={basic:{uniforms:xt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:xt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new Oe(0)}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:xt([xe.common,xe.specularmap,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,xe.lights,{emissive:{value:new Oe(0)},specular:{value:new Oe(1118481)},shininess:{value:30}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:xt([xe.common,xe.envmap,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.roughnessmap,xe.metalnessmap,xe.fog,xe.lights,{emissive:{value:new Oe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:xt([xe.common,xe.aomap,xe.lightmap,xe.emissivemap,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.gradientmap,xe.fog,xe.lights,{emissive:{value:new Oe(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:xt([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,xe.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:xt([xe.points,xe.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:xt([xe.common,xe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:xt([xe.common,xe.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:xt([xe.common,xe.bumpmap,xe.normalmap,xe.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:xt([xe.sprite,xe.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new Ve},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ve}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distanceRGBA:{uniforms:xt([xe.common,xe.displacementmap,{referencePosition:{value:new T},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distanceRGBA_vert,fragmentShader:Ge.distanceRGBA_frag},shadow:{uniforms:xt([xe.lights,xe.fog,{color:{value:new Oe(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};$t.physical={uniforms:xt([$t.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ve},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ve},clearcoatNormalScale:{value:new ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ve},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ve},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ve},sheen:{value:0},sheenColor:{value:new Oe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ve},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ve},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ve},transmissionSamplerSize:{value:new ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ve},attenuationDistance:{value:0},attenuationColor:{value:new Oe(0)},specularColor:{value:new Oe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ve},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ve},anisotropyVector:{value:new ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ve}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};const _r={r:0,b:0,g:0},Fn=new bt,ic=new Le;function rc(i,e,t,n,r,a,o){const l=new Oe(0);let s,c,u=a===!0?0:1,p=null,h=0,d=null;function m(g){let f=g.isScene===!0?g.background:null;return f&&f.isTexture&&(f=(g.backgroundBlurriness>0?t:e).get(f)),f}function _(g,f){g.getRGB(_r,il(i)),n.buffers.color.setClear(_r.r,_r.g,_r.b,f,o)}return{getClearColor:function(){return l},setClearColor:function(g,f=1){l.set(g),u=f,_(l,u)},getClearAlpha:function(){return u},setClearAlpha:function(g){u=g,_(l,u)},render:function(g){let f=!1;const M=m(g);M===null?_(l,u):M&&M.isColor&&(_(M,1),f=!0);const v=i.xr.getEnvironmentBlendMode();v==="additive"?n.buffers.color.setClear(0,0,0,1,o):v==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||f)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))},addToRenderList:function(g,f){const M=m(f);M&&(M.isCubeTexture||M.mapping===zr)?(c===void 0&&(c=new ot(new jn(1,1,1),new Rn({name:"BackgroundCubeMaterial",uniforms:yi($t.backgroundCube.uniforms),vertexShader:$t.backgroundCube.vertexShader,fragmentShader:$t.backgroundCube.fragmentShader,side:Et,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(v,x,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(c)),Fn.copy(f.backgroundRotation),Fn.x*=-1,Fn.y*=-1,Fn.z*=-1,M.isCubeTexture&&M.isRenderTargetTexture===!1&&(Fn.y*=-1,Fn.z*=-1),c.material.uniforms.envMap.value=M,c.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(ic.makeRotationFromEuler(Fn)),c.material.toneMapped=Je.getTransfer(M.colorSpace)!==rt,p===M&&h===M.version&&d===i.toneMapping||(c.material.needsUpdate=!0,p=M,h=M.version,d=i.toneMapping),c.layers.enableAll(),g.unshift(c,c.geometry,c.material,0,0,null)):M&&M.isTexture&&(s===void 0&&(s=new ot(new Ti(2,2),new Rn({name:"BackgroundMaterial",uniforms:yi($t.background.uniforms),vertexShader:$t.background.vertexShader,fragmentShader:$t.background.fragmentShader,side:An,depthTest:!1,depthWrite:!1,fog:!1})),s.geometry.deleteAttribute("normal"),Object.defineProperty(s.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(s)),s.material.uniforms.t2D.value=M,s.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,s.material.toneMapped=Je.getTransfer(M.colorSpace)!==rt,M.matrixAutoUpdate===!0&&M.updateMatrix(),s.material.uniforms.uvTransform.value.copy(M.matrix),p===M&&h===M.version&&d===i.toneMapping||(s.material.needsUpdate=!0,p=M,h=M.version,d=i.toneMapping),s.layers.enableAll(),g.unshift(s,s.geometry,s.material,0,0,null))}}}function ac(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=c(null);let a=r,o=!1;function l(f){return i.bindVertexArray(f)}function s(f){return i.deleteVertexArray(f)}function c(f){const M=[],v=[],x=[];for(let P=0;P<t;P++)M[P]=0,v[P]=0,x[P]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:M,enabledAttributes:v,attributeDivisors:x,object:f,attributes:{},index:null}}function u(){const f=a.newAttributes;for(let M=0,v=f.length;M<v;M++)f[M]=0}function p(f){h(f,0)}function h(f,M){const v=a.newAttributes,x=a.enabledAttributes,P=a.attributeDivisors;v[f]=1,x[f]===0&&(i.enableVertexAttribArray(f),x[f]=1),P[f]!==M&&(i.vertexAttribDivisor(f,M),P[f]=M)}function d(){const f=a.newAttributes,M=a.enabledAttributes;for(let v=0,x=M.length;v<x;v++)M[v]!==f[v]&&(i.disableVertexAttribArray(v),M[v]=0)}function m(f,M,v,x,P,C,w){w===!0?i.vertexAttribIPointer(f,M,v,P,C):i.vertexAttribPointer(f,M,v,x,P,C)}function _(){g(),o=!0,a!==r&&(a=r,l(a.object))}function g(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:function(f,M,v,x,P){let C=!1;const w=function(K,F,Y){const $=Y.wireframe===!0;let O=n[K.id];O===void 0&&(O={},n[K.id]=O);let ee=O[F.id];ee===void 0&&(ee={},O[F.id]=ee);let j=ee[$];return j===void 0&&(j=c(i.createVertexArray()),ee[$]=j),j}(x,v,M);a!==w&&(a=w,l(a.object)),C=function(K,F,Y,$){const O=a.attributes,ee=F.attributes;let j=0;const te=Y.getAttributes();for(const ne in te)if(te[ne].location>=0){const me=O[ne];let ge=ee[ne];if(ge===void 0&&(ne==="instanceMatrix"&&K.instanceMatrix&&(ge=K.instanceMatrix),ne==="instanceColor"&&K.instanceColor&&(ge=K.instanceColor)),me===void 0||me.attribute!==ge||ge&&me.data!==ge.data)return!0;j++}return a.attributesNum!==j||a.index!==$}(f,x,v,P),C&&function(K,F,Y,$){const O={},ee=F.attributes;let j=0;const te=Y.getAttributes();for(const ne in te)if(te[ne].location>=0){let me=ee[ne];me===void 0&&(ne==="instanceMatrix"&&K.instanceMatrix&&(me=K.instanceMatrix),ne==="instanceColor"&&K.instanceColor&&(me=K.instanceColor));const ge={};ge.attribute=me,me&&me.data&&(ge.data=me.data),O[ne]=ge,j++}a.attributes=O,a.attributesNum=j,a.index=$}(f,x,v,P),P!==null&&e.update(P,i.ELEMENT_ARRAY_BUFFER),(C||o)&&(o=!1,function(K,F,Y,$){u();const O=$.attributes,ee=Y.getAttributes(),j=F.defaultAttributeValues;for(const te in ee){const ne=ee[te];if(ne.location>=0){let me=O[te];if(me===void 0&&(te==="instanceMatrix"&&K.instanceMatrix&&(me=K.instanceMatrix),te==="instanceColor"&&K.instanceColor&&(me=K.instanceColor)),me!==void 0){const ge=me.normalized,ye=me.itemSize,Pe=e.get(me);if(Pe===void 0)continue;const oe=Pe.buffer,pe=Pe.type,we=Pe.bytesPerElement,le=pe===i.INT||pe===i.UNSIGNED_INT||me.gpuType===ds;if(me.isInterleavedBufferAttribute){const E=me.data,y=E.stride,I=me.offset;if(E.isInstancedInterleavedBuffer){for(let Z=0;Z<ne.locationSize;Z++)h(ne.location+Z,E.meshPerAttribute);K.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=E.meshPerAttribute*E.count)}else for(let Z=0;Z<ne.locationSize;Z++)p(ne.location+Z);i.bindBuffer(i.ARRAY_BUFFER,oe);for(let Z=0;Z<ne.locationSize;Z++)m(ne.location+Z,ye/ne.locationSize,pe,ge,y*we,(I+ye/ne.locationSize*Z)*we,le)}else{if(me.isInstancedBufferAttribute){for(let E=0;E<ne.locationSize;E++)h(ne.location+E,me.meshPerAttribute);K.isInstancedMesh!==!0&&$._maxInstanceCount===void 0&&($._maxInstanceCount=me.meshPerAttribute*me.count)}else for(let E=0;E<ne.locationSize;E++)p(ne.location+E);i.bindBuffer(i.ARRAY_BUFFER,oe);for(let E=0;E<ne.locationSize;E++)m(ne.location+E,ye/ne.locationSize,pe,ge,ye*we,ye/ne.locationSize*E*we,le)}}else if(j!==void 0){const ge=j[te];if(ge!==void 0)switch(ge.length){case 2:i.vertexAttrib2fv(ne.location,ge);break;case 3:i.vertexAttrib3fv(ne.location,ge);break;case 4:i.vertexAttrib4fv(ne.location,ge);break;default:i.vertexAttrib1fv(ne.location,ge)}}}}d()}(f,M,v,x),P!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(P).buffer))},reset:_,resetDefaultState:g,dispose:function(){_();for(const f in n){const M=n[f];for(const v in M){const x=M[v];for(const P in x)s(x[P].object),delete x[P];delete M[v]}delete n[f]}},releaseStatesOfGeometry:function(f){if(n[f.id]===void 0)return;const M=n[f.id];for(const v in M){const x=M[v];for(const P in x)s(x[P].object),delete x[P];delete M[v]}delete n[f.id]},releaseStatesOfProgram:function(f){for(const M in n){const v=n[M];if(v[f.id]===void 0)continue;const x=v[f.id];for(const P in x)s(x[P].object),delete x[P];delete v[f.id]}},initAttributes:u,enableAttribute:p,disableUnusedAttributes:d}}function sc(i,e,t){let n;function r(a,o,l){l!==0&&(i.drawArraysInstanced(n,a,o,l),t.update(o,n,l))}this.setMode=function(a){n=a},this.render=function(a,o){i.drawArrays(n,a,o),t.update(o,n,1)},this.renderInstances=r,this.renderMultiDraw=function(a,o,l){if(l===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,a,0,o,0,l);let s=0;for(let c=0;c<l;c++)s+=o[c];t.update(s,n,1)},this.renderMultiDrawInstances=function(a,o,l,s){if(l===0)return;const c=e.get("WEBGL_multi_draw");if(c===null)for(let u=0;u<a.length;u++)r(a[u],o[u],s[u]);else{c.multiDrawArraysInstancedWEBGL(n,a,0,o,0,s,0,l);let u=0;for(let p=0;p<l;p++)u+=o[p];for(let p=0;p<s.length;p++)t.update(u,n,s[p])}}}function oc(i,e,t,n){let r;function a(h){if(h==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";h="mediump"}return h==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let o=t.precision!==void 0?t.precision:"highp";const l=a(o);l!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",l,"instead."),o=l);const s=t.logarithmicDepthBuffer===!0,c=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control");if(c===!0){const h=e.get("EXT_clip_control");h.clipControlEXT(h.LOWER_LEFT_EXT,h.ZERO_TO_ONE_EXT)}const u=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),p=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS);return{isWebGL2:!0,getMaxAnisotropy:function(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const h=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(h.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r},getMaxPrecision:a,textureFormatReadable:function(h){return h===qt||n.convert(h)===i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(h){const d=h===Yi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(h!==pn&&n.convert(h)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&h!==en&&!d)},precision:o,logarithmicDepthBuffer:s,reverseDepthBuffer:c,maxTextures:u,maxVertexTextures:p,maxTextureSize:i.getParameter(i.MAX_TEXTURE_SIZE),maxCubemapSize:i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:i.getParameter(i.MAX_VERTEX_ATTRIBS),maxVertexUniforms:i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:i.getParameter(i.MAX_VARYING_VECTORS),maxFragmentUniforms:i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),vertexTextures:p>0,maxSamples:i.getParameter(i.MAX_SAMPLES)}}function lc(i){const e=this;let t=null,n=0,r=!1,a=!1;const o=new Tn,l=new Ve,s={value:null,needsUpdate:!1};function c(u,p,h,d){const m=u!==null?u.length:0;let _=null;if(m!==0){if(_=s.value,d!==!0||_===null){const g=h+4*m,f=p.matrixWorldInverse;l.getNormalMatrix(f),(_===null||_.length<g)&&(_=new Float32Array(g));for(let M=0,v=h;M!==m;++M,v+=4)o.copy(u[M]).applyMatrix4(f,l),o.normal.toArray(_,v),_[v+3]=o.constant}s.value=_,s.needsUpdate=!0}return e.numPlanes=m,e.numIntersection=0,_}this.uniform=s,this.numPlanes=0,this.numIntersection=0,this.init=function(u,p){const h=u.length!==0||p||n!==0||r;return r=p,n=u.length,h},this.beginShadows=function(){a=!0,c(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(u,p){t=c(u,p,0)},this.setState=function(u,p,h){const d=u.clippingPlanes,m=u.clipIntersection,_=u.clipShadows,g=i.get(u);if(!r||d===null||d.length===0||a&&!_)a?c(null):function(){s.value!==t&&(s.value=t,s.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}();else{const f=a?0:n,M=4*f;let v=g.clippingState||null;s.value=v,v=c(d,p,M,h);for(let x=0;x!==M;++x)v[x]=t[x];g.clippingState=v,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=f}}}function cc(i){let e=new WeakMap;function t(r,a){return a===Da?r.mapping=_i:a===Ua&&(r.mapping=vi),r}function n(r){const a=r.target;a.removeEventListener("dispose",n);const o=e.get(a);o!==void 0&&(e.delete(a),o.dispose())}return{get:function(r){if(r&&r.isTexture){const a=r.mapping;if(a===Da||a===Ua){if(e.has(r))return t(e.get(r).texture,r.mapping);{const o=r.image;if(o&&o.height>0){const l=new Ql(o.height);return l.fromEquirectangularTexture(i,r),e.set(r,l),r.addEventListener("dispose",n),t(l.texture,r.mapping)}return null}}}return r},dispose:function(){e=new WeakMap}}}class ys extends Ss{constructor(e=-1,t=1,n=1,r=-1,a=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=a,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,a,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let a=n-e,o=n+e,l=r+t,s=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,o=a+c*this.view.width,l-=u*this.view.offsetY,s=l-u*this.view.height}this.projectionMatrix.makeOrthographic(a,o,l,s,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Js=[.125,.215,.35,.446,.526,.582],Oi=20,_a=new ys,$s=new Oe;let va=null,xa=0,Ma=0,Sa=!1;const zn=(1+Math.sqrt(5))/2,li=1/zn,Qs=[new T(-zn,li,0),new T(zn,li,0),new T(-li,0,zn),new T(li,0,zn),new T(0,zn,-li),new T(0,zn,li),new T(-1,1,-1),new T(1,1,-1),new T(-1,1,1),new T(1,1,1)];class eo{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){va=this._renderer.getRenderTarget(),xa=this._renderer.getActiveCubeFace(),Ma=this._renderer.getActiveMipmapLevel(),Sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(e,n,r,a),t>0&&this._blur(a,0,0,t),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=io(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=no(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(va,xa,Ma),this._renderer.xr.enabled=Sa,e.scissorTest=!1,vr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===_i||e.mapping===vi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),va=this._renderer.getRenderTarget(),xa=this._renderer.getActiveCubeFace(),Ma=this._renderer.getActiveMipmapLevel(),Sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Qt,minFilter:Qt,generateMipmaps:!1,type:Yi,format:qt,colorSpace:Cn,depthBuffer:!1},r=to(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=to(e,t,n);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=function(o){const l=[],s=[],c=[];let u=o;const p=o-4+1+Js.length;for(let h=0;h<p;h++){const d=Math.pow(2,u);s.push(d);let m=1/d;h>o-4?m=Js[h-o+4-1]:h===0&&(m=0),c.push(m);const _=1/(d-2),g=-_,f=1+_,M=[g,g,f,g,f,f,g,g,f,f,g,f],v=6,x=6,P=3,C=2,w=1,K=new Float32Array(P*x*v),F=new Float32Array(C*x*v),Y=new Float32Array(w*x*v);for(let O=0;O<v;O++){const ee=O%3*2/3-1,j=O>2?0:-1,te=[ee,j,0,ee+2/3,j,0,ee+2/3,j+1,0,ee,j,0,ee+2/3,j+1,0,ee,j+1,0];K.set(te,P*x*O),F.set(M,C*x*O);const ne=[O,O,O,O,O,O];Y.set(ne,w*x*O)}const $=new Tt;$.setAttribute("position",new Pt(K,P)),$.setAttribute("uv",new Pt(F,C)),$.setAttribute("faceIndex",new Pt(Y,w)),l.push($),u>4&&u--}return{lodPlanes:l,sizeLods:s,sigmas:c}}(a)),this._blurMaterial=function(o,l,s){const c=new Float32Array(Oi),u=new T(0,1,0);return new Rn({name:"SphericalGaussianBlur",defines:{n:Oi,CUBEUV_TEXEL_WIDTH:1/l,CUBEUV_TEXEL_HEIGHT:1/s,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:c},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:u}},vertexShader:Es(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}(a,e,t)}return r}_compileMaterial(e){const t=new ot(this._lodPlanes[0],e);this._renderer.compile(t,_a)}_sceneToCubeUV(e,t,n,r){const a=new Nt(90,1,t,n),o=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],s=this._renderer,c=s.autoClear,u=s.toneMapping;s.getClearColor($s),s.toneMapping=wn,s.autoClear=!1;const p=new Gn({name:"PMREM.Background",side:Et,depthWrite:!1,depthTest:!1}),h=new ot(new jn,p);let d=!1;const m=e.background;m?m.isColor&&(p.color.copy(m),e.background=null,d=!0):(p.color.copy($s),d=!0);for(let _=0;_<6;_++){const g=_%3;g===0?(a.up.set(0,o[_],0),a.lookAt(l[_],0,0)):g===1?(a.up.set(0,0,o[_]),a.lookAt(0,l[_],0)):(a.up.set(0,o[_],0),a.lookAt(0,0,l[_]));const f=this._cubeSize;vr(r,g*f,_>2?f:0,f,f),s.setRenderTarget(r),d&&s.render(h,a),s.render(e,a)}h.geometry.dispose(),h.material.dispose(),s.toneMapping=u,s.autoClear=c,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===_i||e.mapping===vi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=io()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=no());const a=r?this._cubemapMaterial:this._equirectMaterial,o=new ot(this._lodPlanes[0],a);a.uniforms.envMap.value=e;const l=this._cubeSize;vr(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,_a)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let a=1;a<r;a++){const o=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),l=Qs[(r-a-1)%Qs.length];this._blur(e,a-1,a,o,l)}t.autoClear=n}_blur(e,t,n,r,a){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,r,"latitudinal",a),this._halfBlur(o,e,n,n,r,"longitudinal",a)}_halfBlur(e,t,n,r,a,o,l){const s=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=new ot(this._lodPlanes[r],c),p=c.uniforms,h=this._sizeLods[n]-1,d=isFinite(a)?Math.PI/(2*h):2*Math.PI/39,m=a/d,_=isFinite(a)?1+Math.floor(3*m):Oi;_>Oi&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${_} samples when the maximum is set to 20`);const g=[];let f=0;for(let x=0;x<Oi;++x){const P=x/m,C=Math.exp(-P*P/2);g.push(C),x===0?f+=C:x<_&&(f+=2*C)}for(let x=0;x<g.length;x++)g[x]=g[x]/f;p.envMap.value=e.texture,p.samples.value=_,p.weights.value=g,p.latitudinal.value=o==="latitudinal",l&&(p.poleAxis.value=l);const{_lodMax:M}=this;p.dTheta.value=d,p.mipInt.value=M-n;const v=this._sizeLods[r];vr(t,3*v*(r>M-4?r-M+4:0),4*(this._cubeSize-v),3*v,2*v),s.setRenderTarget(t),s.render(u,_a)}}function to(i,e,t){const n=new kn(i,e,t);return n.texture.mapping=zr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function vr(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function no(){return new Rn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Es(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function io(){return new Rn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Es(),fragmentShader:`

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
	`}function uc(i){let e=new WeakMap,t=null;function n(r){const a=r.target;a.removeEventListener("dispose",n);const o=e.get(a);o!==void 0&&(e.delete(a),o.dispose())}return{get:function(r){if(r&&r.isTexture){const a=r.mapping,o=a===Da||a===Ua,l=a===_i||a===vi;if(o||l){let s=e.get(r);const c=s!==void 0?s.texture.pmremVersion:0;if(r.isRenderTargetTexture&&r.pmremVersion!==c)return t===null&&(t=new eo(i)),s=o?t.fromEquirectangular(r,s):t.fromCubemap(r,s),s.texture.pmremVersion=r.pmremVersion,e.set(r,s),s.texture;if(s!==void 0)return s.texture;{const u=r.image;return o&&u&&u.height>0||l&&u&&function(p){let h=0;const d=6;for(let m=0;m<d;m++)p[m]!==void 0&&h++;return h===d}(u)?(t===null&&(t=new eo(i)),s=o?t.fromEquirectangular(r):t.fromCubemap(r),s.texture.pmremVersion=r.pmremVersion,e.set(r,s),r.addEventListener("dispose",n),s.texture):null}}}return r},dispose:function(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}}}function hc(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&Rr("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function dc(i,e,t,n){const r={},a=new WeakMap;function o(s){const c=s.target;c.index!==null&&e.remove(c.index);for(const p in c.attributes)e.remove(c.attributes[p]);for(const p in c.morphAttributes){const h=c.morphAttributes[p];for(let d=0,m=h.length;d<m;d++)e.remove(h[d])}c.removeEventListener("dispose",o),delete r[c.id];const u=a.get(c);u&&(e.remove(u),a.delete(c)),n.releaseStatesOfGeometry(c),c.isInstancedBufferGeometry===!0&&delete c._maxInstanceCount,t.memory.geometries--}function l(s){const c=[],u=s.index,p=s.attributes.position;let h=0;if(u!==null){const _=u.array;h=u.version;for(let g=0,f=_.length;g<f;g+=3){const M=_[g+0],v=_[g+1],x=_[g+2];c.push(M,v,v,x,x,M)}}else{if(p===void 0)return;{const _=p.array;h=p.version;for(let g=0,f=_.length/3-1;g<f;g+=3){const M=g+0,v=g+1,x=g+2;c.push(M,v,v,x,x,M)}}}const d=new(Jo(c)?nl:tl)(c,1);d.version=h;const m=a.get(s);m&&e.remove(m),a.set(s,d)}return{get:function(s,c){return r[c.id]===!0||(c.addEventListener("dispose",o),r[c.id]=!0,t.memory.geometries++),c},update:function(s){const c=s.attributes;for(const p in c)e.update(c[p],i.ARRAY_BUFFER);const u=s.morphAttributes;for(const p in u){const h=u[p];for(let d=0,m=h.length;d<m;d++)e.update(h[d],i.ARRAY_BUFFER)}},getWireframeAttribute:function(s){const c=a.get(s);if(c){const u=s.index;u!==null&&c.version<u.version&&l(s)}else l(s);return a.get(s)}}}function pc(i,e,t){let n,r,a;function o(l,s,c){c!==0&&(i.drawElementsInstanced(n,s,r,l*a,c),t.update(s,n,c))}this.setMode=function(l){n=l},this.setIndex=function(l){r=l.type,a=l.bytesPerElement},this.render=function(l,s){i.drawElements(n,s,r,l*a),t.update(s,n,1)},this.renderInstances=o,this.renderMultiDraw=function(l,s,c){if(c===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,s,0,r,l,0,c);let u=0;for(let p=0;p<c;p++)u+=s[p];t.update(u,n,1)},this.renderMultiDrawInstances=function(l,s,c,u){if(c===0)return;const p=e.get("WEBGL_multi_draw");if(p===null)for(let h=0;h<l.length;h++)o(l[h]/a,s[h],u[h]);else{p.multiDrawElementsInstancedWEBGL(n,s,0,r,l,0,u,0,c);let h=0;for(let d=0;d<c;d++)h+=s[d];for(let d=0;d<u.length;d++)t.update(h,n,u[d])}}}function fc(i){const e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,n,r){switch(e.calls++,n){case i.TRIANGLES:e.triangles+=r*(t/3);break;case i.LINES:e.lines+=r*(t/2);break;case i.LINE_STRIP:e.lines+=r*(t-1);break;case i.LINE_LOOP:e.lines+=r*t;break;case i.POINTS:e.points+=r*t;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",n)}}}}function mc(i,e,t){const n=new WeakMap,r=new $e;return{update:function(a,o,l){const s=a.morphTargetInfluences,c=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=c!==void 0?c.length:0;let p=n.get(o);if(p===void 0||p.count!==u){let K=function(){C.dispose(),n.delete(o),o.removeEventListener("dispose",K)};p!==void 0&&p.texture.dispose();const h=o.morphAttributes.position!==void 0,d=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,_=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],f=o.morphAttributes.color||[];let M=0;h===!0&&(M=1),d===!0&&(M=2),m===!0&&(M=3);let v=o.attributes.position.count*M,x=1;v>e.maxTextureSize&&(x=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);const P=new Float32Array(v*x*4*u),C=new Qo(P,v,x,u);C.type=en,C.needsUpdate=!0;const w=4*M;for(let F=0;F<u;F++){const Y=_[F],$=g[F],O=f[F],ee=v*x*4*F;for(let j=0;j<Y.count;j++){const te=j*w;h===!0&&(r.fromBufferAttribute(Y,j),P[ee+te+0]=r.x,P[ee+te+1]=r.y,P[ee+te+2]=r.z,P[ee+te+3]=0),d===!0&&(r.fromBufferAttribute($,j),P[ee+te+4]=r.x,P[ee+te+5]=r.y,P[ee+te+6]=r.z,P[ee+te+7]=0),m===!0&&(r.fromBufferAttribute(O,j),P[ee+te+8]=r.x,P[ee+te+9]=r.y,P[ee+te+10]=r.z,P[ee+te+11]=O.itemSize===4?r.w:1)}}p={count:u,texture:C,size:new ze(v,x)},n.set(o,p),o.addEventListener("dispose",K)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let h=0;for(let m=0;m<s.length;m++)h+=s[m];const d=o.morphTargetsRelative?1:1-h;l.getUniforms().setValue(i,"morphTargetBaseInfluence",d),l.getUniforms().setValue(i,"morphTargetInfluences",s)}l.getUniforms().setValue(i,"morphTargetsTexture",p.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",p.size)}}}function gc(i,e,t,n){let r=new WeakMap;function a(o){const l=o.target;l.removeEventListener("dispose",a),t.remove(l.instanceMatrix),l.instanceColor!==null&&t.remove(l.instanceColor)}return{update:function(o){const l=n.render.frame,s=o.geometry,c=e.get(o,s);if(r.get(c)!==l&&(e.update(c),r.set(c,l)),o.isInstancedMesh&&(o.hasEventListener("dispose",a)===!1&&o.addEventListener("dispose",a),r.get(o)!==l&&(t.update(o.instanceMatrix,i.ARRAY_BUFFER),o.instanceColor!==null&&t.update(o.instanceColor,i.ARRAY_BUFFER),r.set(o,l))),o.isSkinnedMesh){const u=o.skeleton;r.get(u)!==l&&(u.update(),r.set(u,l))}return c},dispose:function(){r=new WeakMap}}}class sl extends _t{constructor(e,t,n,r,a,o,l,s,c,u=1026){if(u!==ji&&u!==Mi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===ji&&(n=Vn),n===void 0&&u===Mi&&(n=xi),super(null,r,a,o,l,s,u,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=l!==void 0?l:Ft,this.minFilter=s!==void 0?s:Ft,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const ol=new _t,ro=new sl(1,1),ll=new Qo,cl=new Hl,ul=new rl,ao=[],so=[],oo=new Float32Array(16),lo=new Float32Array(9),co=new Float32Array(4);function wi(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let a=ao[r];if(a===void 0&&(a=new Float32Array(r),ao[r]=a),e!==0){n.toArray(a,0);for(let o=1,l=0;o!==e;++o)l+=t,i[o].toArray(a,l)}return a}function ht(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function dt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Vr(i,e){let t=so[e];t===void 0&&(t=new Int32Array(e),so[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function _c(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function vc(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ht(t,e))return;i.uniform2fv(this.addr,e),dt(t,e)}}function xc(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(ht(t,e))return;i.uniform3fv(this.addr,e),dt(t,e)}}function Mc(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ht(t,e))return;i.uniform4fv(this.addr,e),dt(t,e)}}function Sc(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(ht(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),dt(t,e)}else{if(ht(t,n))return;co.set(n),i.uniformMatrix2fv(this.addr,!1,co),dt(t,n)}}function yc(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(ht(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),dt(t,e)}else{if(ht(t,n))return;lo.set(n),i.uniformMatrix3fv(this.addr,!1,lo),dt(t,n)}}function Ec(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(ht(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),dt(t,e)}else{if(ht(t,n))return;oo.set(n),i.uniformMatrix4fv(this.addr,!1,oo),dt(t,n)}}function bc(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Tc(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ht(t,e))return;i.uniform2iv(this.addr,e),dt(t,e)}}function wc(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ht(t,e))return;i.uniform3iv(this.addr,e),dt(t,e)}}function Ac(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ht(t,e))return;i.uniform4iv(this.addr,e),dt(t,e)}}function Rc(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Cc(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(ht(t,e))return;i.uniform2uiv(this.addr,e),dt(t,e)}}function Pc(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(ht(t,e))return;i.uniform3uiv(this.addr,e),dt(t,e)}}function Lc(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(ht(t,e))return;i.uniform4uiv(this.addr,e),dt(t,e)}}function Dc(i,e,t){const n=this.cache,r=t.allocateTextureUnit();let a;n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),this.type===i.SAMPLER_2D_SHADOW?(ro.compareFunction=Zo,a=ro):a=ol,t.setTexture2D(e||a,r)}function Uc(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||cl,r)}function Ic(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||ul,r)}function Nc(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||ll,r)}function Oc(i,e){i.uniform1fv(this.addr,e)}function Fc(i,e){const t=wi(e,this.size,2);i.uniform2fv(this.addr,t)}function Bc(i,e){const t=wi(e,this.size,3);i.uniform3fv(this.addr,t)}function zc(i,e){const t=wi(e,this.size,4);i.uniform4fv(this.addr,t)}function Hc(i,e){const t=wi(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Gc(i,e){const t=wi(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Vc(i,e){const t=wi(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function kc(i,e){i.uniform1iv(this.addr,e)}function Wc(i,e){i.uniform2iv(this.addr,e)}function Xc(i,e){i.uniform3iv(this.addr,e)}function jc(i,e){i.uniform4iv(this.addr,e)}function qc(i,e){i.uniform1uiv(this.addr,e)}function Yc(i,e){i.uniform2uiv(this.addr,e)}function Kc(i,e){i.uniform3uiv(this.addr,e)}function Zc(i,e){i.uniform4uiv(this.addr,e)}function Jc(i,e,t){const n=this.cache,r=e.length,a=Vr(t,r);ht(n,a)||(i.uniform1iv(this.addr,a),dt(n,a));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||ol,a[o])}function $c(i,e,t){const n=this.cache,r=e.length,a=Vr(t,r);ht(n,a)||(i.uniform1iv(this.addr,a),dt(n,a));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||cl,a[o])}function Qc(i,e,t){const n=this.cache,r=e.length,a=Vr(t,r);ht(n,a)||(i.uniform1iv(this.addr,a),dt(n,a));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||ul,a[o])}function eu(i,e,t){const n=this.cache,r=e.length,a=Vr(t,r);ht(n,a)||(i.uniform1iv(this.addr,a),dt(n,a));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||ll,a[o])}class tu{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=function(r){switch(r){case 5126:return _c;case 35664:return vc;case 35665:return xc;case 35666:return Mc;case 35674:return Sc;case 35675:return yc;case 35676:return Ec;case 5124:case 35670:return bc;case 35667:case 35671:return Tc;case 35668:case 35672:return wc;case 35669:case 35673:return Ac;case 5125:return Rc;case 36294:return Cc;case 36295:return Pc;case 36296:return Lc;case 35678:case 36198:case 36298:case 36306:case 35682:return Dc;case 35679:case 36299:case 36307:return Uc;case 35680:case 36300:case 36308:case 36293:return Ic;case 36289:case 36303:case 36311:case 36292:return Nc}}(t.type)}}class nu{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=function(r){switch(r){case 5126:return Oc;case 35664:return Fc;case 35665:return Bc;case 35666:return zc;case 35674:return Hc;case 35675:return Gc;case 35676:return Vc;case 5124:case 35670:return kc;case 35667:case 35671:return Wc;case 35668:case 35672:return Xc;case 35669:case 35673:return jc;case 5125:return qc;case 36294:return Yc;case 36295:return Kc;case 36296:return Zc;case 35678:case 36198:case 36298:case 36306:case 35682:return Jc;case 35679:case 36299:case 36307:return $c;case 35680:case 36300:case 36308:case 36293:return Qc;case 36289:case 36303:case 36311:case 36292:return eu}}(t.type)}}class iu{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let a=0,o=r.length;a!==o;++a){const l=r[a];l.setValue(e,t[l.id],n)}}}const ya=/(\w+)(\])?(\[|\.)?/g;function uo(i,e){i.seq.push(e),i.map[e.id]=e}function ru(i,e,t){const n=i.name,r=n.length;for(ya.lastIndex=0;;){const a=ya.exec(n),o=ya.lastIndex;let l=a[1];const s=a[2]==="]",c=a[3];if(s&&(l|=0),c===void 0||c==="["&&o+2===r){uo(t,c===void 0?new tu(l,i,e):new nu(l,i,e));break}{let u=t.map[l];u===void 0&&(u=new iu(l),uo(t,u)),t=u}}}class Cr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const a=e.getActiveUniform(t,r);ru(a,e.getUniformLocation(t,a.name),this)}}setValue(e,t,n,r){const a=this.map[t];a!==void 0&&a.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let a=0,o=t.length;a!==o;++a){const l=t[a],s=n[l.id];s.needsUpdate!==!1&&l.setValue(e,s.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,a=e.length;r!==a;++r){const o=e[r];o.id in t&&n.push(o)}return n}}function ho(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const au=37297;let su=0;function po(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+function(l,s){const c=l.split(`
`),u=[],p=Math.max(s-6,0),h=Math.min(s+6,c.length);for(let d=p;d<h;d++){const m=d+1;u.push(`${m===s?">":" "} ${m}: ${c[d]}`)}return u.join(`
`)}(i.getShaderSource(e),o)}return r}function ou(i,e){const t=function(n){const r=Je.getPrimaries(Je.workingColorSpace),a=Je.getPrimaries(n);let o;switch(r===a?o="":r===Ur&&a===Dr?o="LinearDisplayP3ToLinearSRGB":r===Dr&&a===Ur&&(o="LinearSRGBToLinearDisplayP3"),n){case Cn:case Hr:return[o,"LinearTransferOETF"];case It:case xs:return[o,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[o,"LinearTransferOETF"]}}(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function lu(i,e){let t;switch(e){case wl:t="Linear";break;case Al:t="Reinhard";break;case Rl:t="Cineon";break;case zo:t="ACESFilmic";break;case Pl:t="AgX";break;case Ll:t="Neutral";break;case Cl:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const xr=new T;function cu(){return Je.getLuminanceCoefficients(xr),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${xr.x.toFixed(4)}, ${xr.y.toFixed(4)}, ${xr.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Fi(i){return i!==""}function fo(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function mo(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const uu=/^[ \t]*#include +<([\w\d./]+)>/gm;function ls(i){return i.replace(uu,du)}const hu=new Map;function du(i,e){let t=Ge[e];if(t===void 0){const n=hu.get(e);if(n===void 0)throw new Error("Can not resolve #include <"+e+">");t=Ge[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n)}return ls(t)}const pu=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function go(i){return i.replace(pu,fu)}function fu(i,e,t,n){let r="";for(let a=parseInt(e);a<parseInt(t);a++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function _o(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function mu(i,e,t,n){const r=i.getContext(),a=t.defines;let o=t.vertexShader,l=t.fragmentShader;const s=function($){let O="SHADOWMAP_TYPE_BASIC";return $.shadowMapType===Oo?O="SHADOWMAP_TYPE_PCF":$.shadowMapType===Fo?O="SHADOWMAP_TYPE_PCF_SOFT":$.shadowMapType===dn&&(O="SHADOWMAP_TYPE_VSM"),O}(t),c=function($){let O="ENVMAP_TYPE_CUBE";if($.envMap)switch($.envMapMode){case _i:case vi:O="ENVMAP_TYPE_CUBE";break;case zr:O="ENVMAP_TYPE_CUBE_UV"}return O}(t),u=function($){let O="ENVMAP_MODE_REFLECTION";return $.envMap&&$.envMapMode===vi&&(O="ENVMAP_MODE_REFRACTION"),O}(t),p=function($){let O="ENVMAP_BLENDING_NONE";if($.envMap)switch($.combine){case Bo:O="ENVMAP_BLENDING_MULTIPLY";break;case bl:O="ENVMAP_BLENDING_MIX";break;case Tl:O="ENVMAP_BLENDING_ADD"}return O}(t),h=function($){const O=$.envMapCubeUVHeight;if(O===null)return null;const ee=Math.log2(O)-2,j=1/O;return{texelWidth:1/(3*Math.max(Math.pow(2,ee),112)),texelHeight:j,maxMip:ee}}(t),d=function($){return[$.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",$.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Fi).join(`
`)}(t),m=function($){const O=[];for(const ee in $){const j=$[ee];j!==!1&&O.push("#define "+ee+" "+j)}return O.join(`
`)}(a),_=r.createProgram();let g,f,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Fi).join(`
`),g.length>0&&(g+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Fi).join(`
`),f.length>0&&(f+=`
`)):(g=[_o(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+s:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Fi).join(`
`),f=[_o(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+p:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+s:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==wn?"#define TONE_MAPPING":"",t.toneMapping!==wn?Ge.tonemapping_pars_fragment:"",t.toneMapping!==wn?lu("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,ou("linearToOutputTexel",t.outputColorSpace),cu(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Fi).join(`
`)),o=ls(o),o=fo(o,t),o=mo(o,t),l=ls(l),l=fo(l,t),l=mo(l,t),o=go(o),l=go(l),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,g=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,f=["#define varying in",t.glslVersion===Us?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Us?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const v=M+g+o,x=M+f+l,P=ho(r,r.VERTEX_SHADER,v),C=ho(r,r.FRAGMENT_SHADER,x);function w($){if(i.debug.checkShaderErrors){const O=r.getProgramInfoLog(_).trim(),ee=r.getShaderInfoLog(P).trim(),j=r.getShaderInfoLog(C).trim();let te=!0,ne=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(te=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,_,P,C);else{const me=po(r,P,"vertex"),ge=po(r,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+$.name+`
Material Type: `+$.type+`

Program Info Log: `+O+`
`+me+`
`+ge)}else O!==""?console.warn("THREE.WebGLProgram: Program Info Log:",O):ee!==""&&j!==""||(ne=!1);ne&&($.diagnostics={runnable:te,programLog:O,vertexShader:{log:ee,prefix:g},fragmentShader:{log:j,prefix:f}})}r.deleteShader(P),r.deleteShader(C),K=new Cr(r,_),F=function(O,ee){const j={},te=O.getProgramParameter(ee,O.ACTIVE_ATTRIBUTES);for(let ne=0;ne<te;ne++){const me=O.getActiveAttrib(ee,ne),ge=me.name;let ye=1;me.type===O.FLOAT_MAT2&&(ye=2),me.type===O.FLOAT_MAT3&&(ye=3),me.type===O.FLOAT_MAT4&&(ye=4),j[ge]={type:me.type,location:O.getAttribLocation(ee,ge),locationSize:ye}}return j}(r,_)}let K,F;r.attachShader(_,P),r.attachShader(_,C),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_),this.getUniforms=function(){return K===void 0&&w(this),K},this.getAttributes=function(){return F===void 0&&w(this),F};let Y=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return Y===!1&&(Y=r.getProgramParameter(_,au)),Y},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=su++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=P,this.fragmentShader=C,this}let gu=0;class _u{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),a=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(a)===!1&&(o.add(a),a.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new vu(e),t.set(e,n)),n}}class vu{constructor(e){this.id=gu++,this.code=e,this.usedTimes=0}}function xu(i,e,t,n,r,a,o){const l=new Ms,s=new _u,c=new Set,u=[],p=r.logarithmicDepthBuffer,h=r.reverseDepthBuffer,d=r.vertexTextures;let m=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(f){return c.add(f),f===0?"uv":`uv${f}`}return{getParameters:function(f,M,v,x,P){const C=x.fog,w=P.geometry,K=f.isMeshStandardMaterial?x.environment:null,F=(f.isMeshStandardMaterial?t:e).get(f.envMap||K),Y=F&&F.mapping===zr?F.image.height:null,$=_[f.type];f.precision!==null&&(m=r.getMaxPrecision(f.precision),m!==f.precision&&console.warn("THREE.WebGLProgram.getParameters:",f.precision,"not supported, using",m,"instead."));const O=w.morphAttributes.position||w.morphAttributes.normal||w.morphAttributes.color,ee=O!==void 0?O.length:0;let j,te,ne,me,ge=0;if(w.morphAttributes.position!==void 0&&(ge=1),w.morphAttributes.normal!==void 0&&(ge=2),w.morphAttributes.color!==void 0&&(ge=3),$){const Pn=$t[$];j=Pn.vertexShader,te=Pn.fragmentShader}else j=f.vertexShader,te=f.fragmentShader,s.update(f),ne=s.getVertexShaderID(f),me=s.getFragmentShaderID(f);const ye=i.getRenderTarget(),Pe=P.isInstancedMesh===!0,oe=P.isBatchedMesh===!0,pe=!!f.map,we=!!f.matcap,le=!!F,E=!!f.aoMap,y=!!f.lightMap,I=!!f.bumpMap,Z=!!f.normalMap,N=!!f.displacementMap,H=!!f.emissiveMap,b=!!f.metalnessMap,W=!!f.roughnessMap,V=f.anisotropy>0,_e=f.clearcoat>0,X=f.dispersion>0,ce=f.iridescence>0,ve=f.sheen>0,ae=f.transmission>0,Ee=V&&!!f.anisotropyMap,be=_e&&!!f.clearcoatMap,Ce=_e&&!!f.clearcoatNormalMap,Ue=_e&&!!f.clearcoatRoughnessMap,je=ce&&!!f.iridescenceMap,Be=ce&&!!f.iridescenceThicknessMap,Ae=ve&&!!f.sheenColorMap,ke=ve&&!!f.sheenRoughnessMap,Ze=!!f.specularMap,tt=!!f.specularColorMap,Te=!!f.specularIntensityMap,He=ae&&!!f.transmissionMap,Ye=ae&&!!f.thicknessMap,tn=!!f.gradientMap,nn=!!f.alphaMap,vt=f.alphaTest>0,it=!!f.alphaHash,Kt=!!f.extensions;let D=wn;f.toneMapped&&(ye!==null&&ye.isXRRenderTarget!==!0||(D=i.toneMapping));const Lt={shaderID:$,shaderType:f.type,shaderName:f.name,vertexShader:j,fragmentShader:te,defines:f.defines,customVertexShaderID:ne,customFragmentShaderID:me,isRawShaderMaterial:f.isRawShaderMaterial===!0,glslVersion:f.glslVersion,precision:m,batching:oe,batchingColor:oe&&P._colorsTexture!==null,instancing:Pe,instancingColor:Pe&&P.instanceColor!==null,instancingMorph:Pe&&P.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ye===null?i.outputColorSpace:ye.isXRRenderTarget===!0?ye.texture.colorSpace:Cn,alphaToCoverage:!!f.alphaToCoverage,map:pe,matcap:we,envMap:le,envMapMode:le&&F.mapping,envMapCubeUVHeight:Y,aoMap:E,lightMap:y,bumpMap:I,normalMap:Z,displacementMap:d&&N,emissiveMap:H,normalMapObjectSpace:Z&&f.normalMapType===1,normalMapTangentSpace:Z&&f.normalMapType===0,metalnessMap:b,roughnessMap:W,anisotropy:V,anisotropyMap:Ee,clearcoat:_e,clearcoatMap:be,clearcoatNormalMap:Ce,clearcoatRoughnessMap:Ue,dispersion:X,iridescence:ce,iridescenceMap:je,iridescenceThicknessMap:Be,sheen:ve,sheenColorMap:Ae,sheenRoughnessMap:ke,specularMap:Ze,specularColorMap:tt,specularIntensityMap:Te,transmission:ae,transmissionMap:He,thicknessMap:Ye,gradientMap:tn,opaque:f.transparent===!1&&f.blending===1&&f.alphaToCoverage===!1,alphaMap:nn,alphaTest:vt,alphaHash:it,combine:f.combine,mapUv:pe&&g(f.map.channel),aoMapUv:E&&g(f.aoMap.channel),lightMapUv:y&&g(f.lightMap.channel),bumpMapUv:I&&g(f.bumpMap.channel),normalMapUv:Z&&g(f.normalMap.channel),displacementMapUv:N&&g(f.displacementMap.channel),emissiveMapUv:H&&g(f.emissiveMap.channel),metalnessMapUv:b&&g(f.metalnessMap.channel),roughnessMapUv:W&&g(f.roughnessMap.channel),anisotropyMapUv:Ee&&g(f.anisotropyMap.channel),clearcoatMapUv:be&&g(f.clearcoatMap.channel),clearcoatNormalMapUv:Ce&&g(f.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ue&&g(f.clearcoatRoughnessMap.channel),iridescenceMapUv:je&&g(f.iridescenceMap.channel),iridescenceThicknessMapUv:Be&&g(f.iridescenceThicknessMap.channel),sheenColorMapUv:Ae&&g(f.sheenColorMap.channel),sheenRoughnessMapUv:ke&&g(f.sheenRoughnessMap.channel),specularMapUv:Ze&&g(f.specularMap.channel),specularColorMapUv:tt&&g(f.specularColorMap.channel),specularIntensityMapUv:Te&&g(f.specularIntensityMap.channel),transmissionMapUv:He&&g(f.transmissionMap.channel),thicknessMapUv:Ye&&g(f.thicknessMap.channel),alphaMapUv:nn&&g(f.alphaMap.channel),vertexTangents:!!w.attributes.tangent&&(Z||V),vertexColors:f.vertexColors,vertexAlphas:f.vertexColors===!0&&!!w.attributes.color&&w.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!w.attributes.uv&&(pe||nn),fog:!!C,useFog:f.fog===!0,fogExp2:!!C&&C.isFogExp2,flatShading:f.flatShading===!0,sizeAttenuation:f.sizeAttenuation===!0,logarithmicDepthBuffer:p,reverseDepthBuffer:h,skinning:P.isSkinnedMesh===!0,morphTargets:w.morphAttributes.position!==void 0,morphNormals:w.morphAttributes.normal!==void 0,morphColors:w.morphAttributes.color!==void 0,morphTargetsCount:ee,morphTextureStride:ge,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:f.dithering,shadowMapEnabled:i.shadowMap.enabled&&v.length>0,shadowMapType:i.shadowMap.type,toneMapping:D,decodeVideoTexture:pe&&f.map.isVideoTexture===!0&&Je.getTransfer(f.map.colorSpace)===rt,premultipliedAlpha:f.premultipliedAlpha,doubleSided:f.side===2,flipSided:f.side===Et,useDepthPacking:f.depthPacking>=0,depthPacking:f.depthPacking||0,index0AttributeName:f.index0AttributeName,extensionClipCullDistance:Kt&&f.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Kt&&f.extensions.multiDraw===!0||oe)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:f.customProgramCacheKey()};return Lt.vertexUv1s=c.has(1),Lt.vertexUv2s=c.has(2),Lt.vertexUv3s=c.has(3),c.clear(),Lt},getProgramCacheKey:function(f){const M=[];if(f.shaderID?M.push(f.shaderID):(M.push(f.customVertexShaderID),M.push(f.customFragmentShaderID)),f.defines!==void 0)for(const v in f.defines)M.push(v),M.push(f.defines[v]);return f.isRawShaderMaterial===!1&&(function(v,x){v.push(x.precision),v.push(x.outputColorSpace),v.push(x.envMapMode),v.push(x.envMapCubeUVHeight),v.push(x.mapUv),v.push(x.alphaMapUv),v.push(x.lightMapUv),v.push(x.aoMapUv),v.push(x.bumpMapUv),v.push(x.normalMapUv),v.push(x.displacementMapUv),v.push(x.emissiveMapUv),v.push(x.metalnessMapUv),v.push(x.roughnessMapUv),v.push(x.anisotropyMapUv),v.push(x.clearcoatMapUv),v.push(x.clearcoatNormalMapUv),v.push(x.clearcoatRoughnessMapUv),v.push(x.iridescenceMapUv),v.push(x.iridescenceThicknessMapUv),v.push(x.sheenColorMapUv),v.push(x.sheenRoughnessMapUv),v.push(x.specularMapUv),v.push(x.specularColorMapUv),v.push(x.specularIntensityMapUv),v.push(x.transmissionMapUv),v.push(x.thicknessMapUv),v.push(x.combine),v.push(x.fogExp2),v.push(x.sizeAttenuation),v.push(x.morphTargetsCount),v.push(x.morphAttributeCount),v.push(x.numDirLights),v.push(x.numPointLights),v.push(x.numSpotLights),v.push(x.numSpotLightMaps),v.push(x.numHemiLights),v.push(x.numRectAreaLights),v.push(x.numDirLightShadows),v.push(x.numPointLightShadows),v.push(x.numSpotLightShadows),v.push(x.numSpotLightShadowsWithMaps),v.push(x.numLightProbes),v.push(x.shadowMapType),v.push(x.toneMapping),v.push(x.numClippingPlanes),v.push(x.numClipIntersection),v.push(x.depthPacking)}(M,f),function(v,x){l.disableAll(),x.supportsVertexTextures&&l.enable(0),x.instancing&&l.enable(1),x.instancingColor&&l.enable(2),x.instancingMorph&&l.enable(3),x.matcap&&l.enable(4),x.envMap&&l.enable(5),x.normalMapObjectSpace&&l.enable(6),x.normalMapTangentSpace&&l.enable(7),x.clearcoat&&l.enable(8),x.iridescence&&l.enable(9),x.alphaTest&&l.enable(10),x.vertexColors&&l.enable(11),x.vertexAlphas&&l.enable(12),x.vertexUv1s&&l.enable(13),x.vertexUv2s&&l.enable(14),x.vertexUv3s&&l.enable(15),x.vertexTangents&&l.enable(16),x.anisotropy&&l.enable(17),x.alphaHash&&l.enable(18),x.batching&&l.enable(19),x.dispersion&&l.enable(20),x.batchingColor&&l.enable(21),v.push(l.mask),l.disableAll(),x.fog&&l.enable(0),x.useFog&&l.enable(1),x.flatShading&&l.enable(2),x.logarithmicDepthBuffer&&l.enable(3),x.reverseDepthBuffer&&l.enable(4),x.skinning&&l.enable(5),x.morphTargets&&l.enable(6),x.morphNormals&&l.enable(7),x.morphColors&&l.enable(8),x.premultipliedAlpha&&l.enable(9),x.shadowMapEnabled&&l.enable(10),x.doubleSided&&l.enable(11),x.flipSided&&l.enable(12),x.useDepthPacking&&l.enable(13),x.dithering&&l.enable(14),x.transmission&&l.enable(15),x.sheen&&l.enable(16),x.opaque&&l.enable(17),x.pointsUvs&&l.enable(18),x.decodeVideoTexture&&l.enable(19),x.alphaToCoverage&&l.enable(20),v.push(l.mask)}(M,f),M.push(i.outputColorSpace)),M.push(f.customProgramCacheKey),M.join()},getUniforms:function(f){const M=_[f.type];let v;if(M){const x=$t[M];v=Jl.clone(x.uniforms)}else v=f.uniforms;return v},acquireProgram:function(f,M){let v;for(let x=0,P=u.length;x<P;x++){const C=u[x];if(C.cacheKey===M){v=C,++v.usedTimes;break}}return v===void 0&&(v=new mu(i,M,f,a),u.push(v)),v},releaseProgram:function(f){if(--f.usedTimes==0){const M=u.indexOf(f);u[M]=u[u.length-1],u.pop(),f.destroy()}},releaseShaderCache:function(f){s.remove(f)},programs:u,dispose:function(){s.dispose()}}}function Mu(){let i=new WeakMap;return{has:function(e){return i.has(e)},get:function(e){let t=i.get(e);return t===void 0&&(t={},i.set(e,t)),t},remove:function(e){i.delete(e)},update:function(e,t,n){i.get(e)[t]=n},dispose:function(){i=new WeakMap}}}function Su(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function vo(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function xo(){const i=[];let e=0;const t=[],n=[],r=[];function a(o,l,s,c,u,p){let h=i[e];return h===void 0?(h={id:o.id,object:o,geometry:l,material:s,groupOrder:c,renderOrder:o.renderOrder,z:u,group:p},i[e]=h):(h.id=o.id,h.object=o,h.geometry=l,h.material=s,h.groupOrder=c,h.renderOrder=o.renderOrder,h.z=u,h.group=p),e++,h}return{opaque:t,transmissive:n,transparent:r,init:function(){e=0,t.length=0,n.length=0,r.length=0},push:function(o,l,s,c,u,p){const h=a(o,l,s,c,u,p);s.transmission>0?n.push(h):s.transparent===!0?r.push(h):t.push(h)},unshift:function(o,l,s,c,u,p){const h=a(o,l,s,c,u,p);s.transmission>0?n.unshift(h):s.transparent===!0?r.unshift(h):t.unshift(h)},finish:function(){for(let o=e,l=i.length;o<l;o++){const s=i[o];if(s.id===null)break;s.id=null,s.object=null,s.geometry=null,s.material=null,s.group=null}},sort:function(o,l){t.length>1&&t.sort(o||Su),n.length>1&&n.sort(l||vo),r.length>1&&r.sort(l||vo)}}}function yu(){let i=new WeakMap;return{get:function(e,t){const n=i.get(e);let r;return n===void 0?(r=new xo,i.set(e,[r])):t>=n.length?(r=new xo,n.push(r)):r=n[t],r},dispose:function(){i=new WeakMap}}}function Eu(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new T,color:new Oe};break;case"SpotLight":t={position:new T,direction:new T,color:new Oe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new T,color:new Oe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new T,skyColor:new Oe,groundColor:new Oe};break;case"RectAreaLight":t={color:new Oe,position:new T,halfWidth:new T,halfHeight:new T}}return i[e.id]=t,t}}}let bu=0;function Tu(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function wu(i){const e=new Eu,t=function(){const l={};return{get:function(s){if(l[s.id]!==void 0)return l[s.id];let c;switch(s.type){case"DirectionalLight":case"SpotLight":c={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"PointLight":c={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze,shadowCameraNear:1,shadowCameraFar:1e3}}return l[s.id]=c,c}}}(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new T);const r=new T,a=new Le,o=new Le;return{setup:function(l){let s=0,c=0,u=0;for(let w=0;w<9;w++)n.probe[w].set(0,0,0);let p=0,h=0,d=0,m=0,_=0,g=0,f=0,M=0,v=0,x=0,P=0;l.sort(Tu);for(let w=0,K=l.length;w<K;w++){const F=l[w],Y=F.color,$=F.intensity,O=F.distance,ee=F.shadow&&F.shadow.map?F.shadow.map.texture:null;if(F.isAmbientLight)s+=Y.r*$,c+=Y.g*$,u+=Y.b*$;else if(F.isLightProbe){for(let j=0;j<9;j++)n.probe[j].addScaledVector(F.sh.coefficients[j],$);P++}else if(F.isDirectionalLight){const j=e.get(F);if(j.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){const te=F.shadow,ne=t.get(F);ne.shadowIntensity=te.intensity,ne.shadowBias=te.bias,ne.shadowNormalBias=te.normalBias,ne.shadowRadius=te.radius,ne.shadowMapSize=te.mapSize,n.directionalShadow[p]=ne,n.directionalShadowMap[p]=ee,n.directionalShadowMatrix[p]=F.shadow.matrix,g++}n.directional[p]=j,p++}else if(F.isSpotLight){const j=e.get(F);j.position.setFromMatrixPosition(F.matrixWorld),j.color.copy(Y).multiplyScalar($),j.distance=O,j.coneCos=Math.cos(F.angle),j.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),j.decay=F.decay,n.spot[d]=j;const te=F.shadow;if(F.map&&(n.spotLightMap[v]=F.map,v++,te.updateMatrices(F),F.castShadow&&x++),n.spotLightMatrix[d]=te.matrix,F.castShadow){const ne=t.get(F);ne.shadowIntensity=te.intensity,ne.shadowBias=te.bias,ne.shadowNormalBias=te.normalBias,ne.shadowRadius=te.radius,ne.shadowMapSize=te.mapSize,n.spotShadow[d]=ne,n.spotShadowMap[d]=ee,M++}d++}else if(F.isRectAreaLight){const j=e.get(F);j.color.copy(Y).multiplyScalar($),j.halfWidth.set(.5*F.width,0,0),j.halfHeight.set(0,.5*F.height,0),n.rectArea[m]=j,m++}else if(F.isPointLight){const j=e.get(F);if(j.color.copy(F.color).multiplyScalar(F.intensity),j.distance=F.distance,j.decay=F.decay,F.castShadow){const te=F.shadow,ne=t.get(F);ne.shadowIntensity=te.intensity,ne.shadowBias=te.bias,ne.shadowNormalBias=te.normalBias,ne.shadowRadius=te.radius,ne.shadowMapSize=te.mapSize,ne.shadowCameraNear=te.camera.near,ne.shadowCameraFar=te.camera.far,n.pointShadow[h]=ne,n.pointShadowMap[h]=ee,n.pointShadowMatrix[h]=F.shadow.matrix,f++}n.point[h]=j,h++}else if(F.isHemisphereLight){const j=e.get(F);j.skyColor.copy(F.color).multiplyScalar($),j.groundColor.copy(F.groundColor).multiplyScalar($),n.hemi[_]=j,_++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=xe.LTC_FLOAT_1,n.rectAreaLTC2=xe.LTC_FLOAT_2):(n.rectAreaLTC1=xe.LTC_HALF_1,n.rectAreaLTC2=xe.LTC_HALF_2)),n.ambient[0]=s,n.ambient[1]=c,n.ambient[2]=u;const C=n.hash;C.directionalLength===p&&C.pointLength===h&&C.spotLength===d&&C.rectAreaLength===m&&C.hemiLength===_&&C.numDirectionalShadows===g&&C.numPointShadows===f&&C.numSpotShadows===M&&C.numSpotMaps===v&&C.numLightProbes===P||(n.directional.length=p,n.spot.length=d,n.rectArea.length=m,n.point.length=h,n.hemi.length=_,n.directionalShadow.length=g,n.directionalShadowMap.length=g,n.pointShadow.length=f,n.pointShadowMap.length=f,n.spotShadow.length=M,n.spotShadowMap.length=M,n.directionalShadowMatrix.length=g,n.pointShadowMatrix.length=f,n.spotLightMatrix.length=M+v-x,n.spotLightMap.length=v,n.numSpotLightShadowsWithMaps=x,n.numLightProbes=P,C.directionalLength=p,C.pointLength=h,C.spotLength=d,C.rectAreaLength=m,C.hemiLength=_,C.numDirectionalShadows=g,C.numPointShadows=f,C.numSpotShadows=M,C.numSpotMaps=v,C.numLightProbes=P,n.version=bu++)},setupView:function(l,s){let c=0,u=0,p=0,h=0,d=0;const m=s.matrixWorldInverse;for(let _=0,g=l.length;_<g;_++){const f=l[_];if(f.isDirectionalLight){const M=n.directional[c];M.direction.setFromMatrixPosition(f.matrixWorld),r.setFromMatrixPosition(f.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(m),c++}else if(f.isSpotLight){const M=n.spot[p];M.position.setFromMatrixPosition(f.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(f.matrixWorld),r.setFromMatrixPosition(f.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(m),p++}else if(f.isRectAreaLight){const M=n.rectArea[h];M.position.setFromMatrixPosition(f.matrixWorld),M.position.applyMatrix4(m),o.identity(),a.copy(f.matrixWorld),a.premultiply(m),o.extractRotation(a),M.halfWidth.set(.5*f.width,0,0),M.halfHeight.set(0,.5*f.height,0),M.halfWidth.applyMatrix4(o),M.halfHeight.applyMatrix4(o),h++}else if(f.isPointLight){const M=n.point[u];M.position.setFromMatrixPosition(f.matrixWorld),M.position.applyMatrix4(m),u++}else if(f.isHemisphereLight){const M=n.hemi[d];M.direction.setFromMatrixPosition(f.matrixWorld),M.direction.transformDirection(m),d++}}},state:n}}function Mo(i){const e=new wu(i),t=[],n=[],r={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:function(a){r.camera=a,t.length=0,n.length=0},state:r,setupLights:function(){e.setup(t)},setupLightsView:function(a){e.setupView(t,a)},pushLight:function(a){t.push(a)},pushShadow:function(a){n.push(a)}}}function Au(i){let e=new WeakMap;return{get:function(t,n=0){const r=e.get(t);let a;return r===void 0?(a=new Mo(i),e.set(t,[a])):n>=r.length?(a=new Mo(i),r.push(a)):a=r[n],a},dispose:function(){e=new WeakMap}}}class Ru extends bi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Cu extends bi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function Pu(i,e,t){let n=new Gr;const r=new ze,a=new ze,o=new $e,l=new Ru({depthPacking:3201}),s=new Cu,c={},u=t.maxTextureSize,p={[An]:Et,[Et]:An,2:2},h=new Rn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ze},radius:{value:4}},vertexShader:`void main() {
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
}`}),d=h.clone();d.defines.HORIZONTAL_PASS=1;const m=new Tt;m.setAttribute("position",new Pt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new ot(m,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Oo;let f=this.type;function M(C,w){const K=e.update(_);h.defines.VSM_SAMPLES!==C.blurSamples&&(h.defines.VSM_SAMPLES=C.blurSamples,d.defines.VSM_SAMPLES=C.blurSamples,h.needsUpdate=!0,d.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new kn(r.x,r.y)),h.uniforms.shadow_pass.value=C.map.texture,h.uniforms.resolution.value=C.mapSize,h.uniforms.radius.value=C.radius,i.setRenderTarget(C.mapPass),i.clear(),i.renderBufferDirect(w,null,K,h,_,null),d.uniforms.shadow_pass.value=C.mapPass.texture,d.uniforms.resolution.value=C.mapSize,d.uniforms.radius.value=C.radius,i.setRenderTarget(C.map),i.clear(),i.renderBufferDirect(w,null,K,d,_,null)}function v(C,w,K,F){let Y=null;const $=K.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if($!==void 0)Y=$;else if(Y=K.isPointLight===!0?s:l,i.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0){const O=Y.uuid,ee=w.uuid;let j=c[O];j===void 0&&(j={},c[O]=j);let te=j[ee];te===void 0&&(te=Y.clone(),j[ee]=te,w.addEventListener("dispose",P)),Y=te}return Y.visible=w.visible,Y.wireframe=w.wireframe,Y.side=F===dn?w.shadowSide!==null?w.shadowSide:w.side:w.shadowSide!==null?w.shadowSide:p[w.side],Y.alphaMap=w.alphaMap,Y.alphaTest=w.alphaTest,Y.map=w.map,Y.clipShadows=w.clipShadows,Y.clippingPlanes=w.clippingPlanes,Y.clipIntersection=w.clipIntersection,Y.displacementMap=w.displacementMap,Y.displacementScale=w.displacementScale,Y.displacementBias=w.displacementBias,Y.wireframeLinewidth=w.wireframeLinewidth,Y.linewidth=w.linewidth,K.isPointLight===!0&&Y.isMeshDistanceMaterial===!0&&(i.properties.get(Y).light=K),Y}function x(C,w,K,F,Y){if(C.visible===!1)return;if(C.layers.test(w.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&Y===dn)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,C.matrixWorld);const O=e.update(C),ee=C.material;if(Array.isArray(ee)){const j=O.groups;for(let te=0,ne=j.length;te<ne;te++){const me=j[te],ge=ee[me.materialIndex];if(ge&&ge.visible){const ye=v(C,ge,F,Y);C.onBeforeShadow(i,C,w,K,O,ye,me),i.renderBufferDirect(K,null,O,ye,C,me),C.onAfterShadow(i,C,w,K,O,ye,me)}}}else if(ee.visible){const j=v(C,ee,F,Y);C.onBeforeShadow(i,C,w,K,O,j,null),i.renderBufferDirect(K,null,O,j,C,null),C.onAfterShadow(i,C,w,K,O,j,null)}}const $=C.children;for(let O=0,ee=$.length;O<ee;O++)x($[O],w,K,F,Y)}function P(C){C.target.removeEventListener("dispose",P);for(const w in c){const K=c[w],F=C.target.uuid;F in K&&(K[F].dispose(),delete K[F])}}this.render=function(C,w,K){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||C.length===0)return;const F=i.getRenderTarget(),Y=i.getActiveCubeFace(),$=i.getActiveMipmapLevel(),O=i.state;O.setBlending(0),O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const ee=f!==dn&&this.type===dn,j=f===dn&&this.type!==dn;for(let te=0,ne=C.length;te<ne;te++){const me=C[te],ge=me.shadow;if(ge===void 0){console.warn("THREE.WebGLShadowMap:",me,"has no shadow.");continue}if(ge.autoUpdate===!1&&ge.needsUpdate===!1)continue;r.copy(ge.mapSize);const ye=ge.getFrameExtents();if(r.multiply(ye),a.copy(ge.mapSize),(r.x>u||r.y>u)&&(r.x>u&&(a.x=Math.floor(u/ye.x),r.x=a.x*ye.x,ge.mapSize.x=a.x),r.y>u&&(a.y=Math.floor(u/ye.y),r.y=a.y*ye.y,ge.mapSize.y=a.y)),ge.map===null||ee===!0||j===!0){const oe=this.type!==dn?{minFilter:Ft,magFilter:Ft}:{};ge.map!==null&&ge.map.dispose(),ge.map=new kn(r.x,r.y,oe),ge.map.texture.name=me.name+".shadowMap",ge.camera.updateProjectionMatrix()}i.setRenderTarget(ge.map),i.clear();const Pe=ge.getViewportCount();for(let oe=0;oe<Pe;oe++){const pe=ge.getViewport(oe);o.set(a.x*pe.x,a.y*pe.y,a.x*pe.z,a.y*pe.w),O.viewport(o),ge.updateMatrices(me,oe),n=ge.getFrustum(),x(w,K,ge.camera,me,this.type)}ge.isPointLightShadow!==!0&&this.type===dn&&M(ge,K),ge.needsUpdate=!1}f=this.type,g.needsUpdate=!1,i.setRenderTarget(F,Y,$)}}const Lu={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3};function Du(i){const e=new function(){let b=!1;const W=new $e;let V=null;const _e=new $e(0,0,0,0);return{setMask:function(X){V===X||b||(i.colorMask(X,X,X,X),V=X)},setLocked:function(X){b=X},setClear:function(X,ce,ve,ae,Ee){Ee===!0&&(X*=ae,ce*=ae,ve*=ae),W.set(X,ce,ve,ae),_e.equals(W)===!1&&(i.clearColor(X,ce,ve,ae),_e.copy(W))},reset:function(){b=!1,V=null,_e.set(-1,0,0,0)}}},t=new function(){let b=!1,W=!1,V=null,_e=null,X=null;return{setReversed:function(ce){W=ce},setTest:function(ce){ce?we(i.DEPTH_TEST):le(i.DEPTH_TEST)},setMask:function(ce){V===ce||b||(i.depthMask(ce),V=ce)},setFunc:function(ce){if(W&&(ce=Lu[ce]),_e!==ce){switch(ce){case 0:i.depthFunc(i.NEVER);break;case 1:i.depthFunc(i.ALWAYS);break;case 2:i.depthFunc(i.LESS);break;case 3:default:i.depthFunc(i.LEQUAL);break;case 4:i.depthFunc(i.EQUAL);break;case 5:i.depthFunc(i.GEQUAL);break;case 6:i.depthFunc(i.GREATER);break;case 7:i.depthFunc(i.NOTEQUAL)}_e=ce}},setLocked:function(ce){b=ce},setClear:function(ce){X!==ce&&(i.clearDepth(ce),X=ce)},reset:function(){b=!1,V=null,_e=null,X=null}}},n=new function(){let b=!1,W=null,V=null,_e=null,X=null,ce=null,ve=null,ae=null,Ee=null;return{setTest:function(be){b||(be?we(i.STENCIL_TEST):le(i.STENCIL_TEST))},setMask:function(be){W===be||b||(i.stencilMask(be),W=be)},setFunc:function(be,Ce,Ue){V===be&&_e===Ce&&X===Ue||(i.stencilFunc(be,Ce,Ue),V=be,_e=Ce,X=Ue)},setOp:function(be,Ce,Ue){ce===be&&ve===Ce&&ae===Ue||(i.stencilOp(be,Ce,Ue),ce=be,ve=Ce,ae=Ue)},setLocked:function(be){b=be},setClear:function(be){Ee!==be&&(i.clearStencil(be),Ee=be)},reset:function(){b=!1,W=null,V=null,_e=null,X=null,ce=null,ve=null,ae=null,Ee=null}}},r=new WeakMap,a=new WeakMap;let o={},l={},s=new WeakMap,c=[],u=null,p=!1,h=null,d=null,m=null,_=null,g=null,f=null,M=null,v=new Oe(0,0,0),x=0,P=!1,C=null,w=null,K=null,F=null,Y=null;const $=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let O=!1,ee=0;const j=i.getParameter(i.VERSION);j.indexOf("WebGL")!==-1?(ee=parseFloat(/^WebGL (\d)/.exec(j)[1]),O=ee>=1):j.indexOf("OpenGL ES")!==-1&&(ee=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),O=ee>=2);let te=null,ne={};const me=i.getParameter(i.SCISSOR_BOX),ge=i.getParameter(i.VIEWPORT),ye=new $e().fromArray(me),Pe=new $e().fromArray(ge);function oe(b,W,V,_e){const X=new Uint8Array(4),ce=i.createTexture();i.bindTexture(b,ce),i.texParameteri(b,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(b,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let ve=0;ve<V;ve++)b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY?i.texImage3D(W,0,i.RGBA,1,1,_e,0,i.RGBA,i.UNSIGNED_BYTE,X):i.texImage2D(W+ve,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,X);return ce}const pe={};function we(b){o[b]!==!0&&(i.enable(b),o[b]=!0)}function le(b){o[b]!==!1&&(i.disable(b),o[b]=!1)}pe[i.TEXTURE_2D]=oe(i.TEXTURE_2D,i.TEXTURE_2D,1),pe[i.TEXTURE_CUBE_MAP]=oe(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),pe[i.TEXTURE_2D_ARRAY]=oe(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),pe[i.TEXTURE_3D]=oe(i.TEXTURE_3D,i.TEXTURE_3D,1,1),e.setClear(0,0,0,1),t.setClear(1),n.setClear(0),we(i.DEPTH_TEST),t.setFunc(3),Z(!1),N(1),we(i.CULL_FACE),I(0);const E={[Hn]:i.FUNC_ADD,101:i.FUNC_SUBTRACT,102:i.FUNC_REVERSE_SUBTRACT};E[103]=i.MIN,E[104]=i.MAX;const y={200:i.ZERO,201:i.ONE,202:i.SRC_COLOR,[Pa]:i.SRC_ALPHA,210:i.SRC_ALPHA_SATURATE,208:i.DST_COLOR,206:i.DST_ALPHA,203:i.ONE_MINUS_SRC_COLOR,[La]:i.ONE_MINUS_SRC_ALPHA,209:i.ONE_MINUS_DST_COLOR,207:i.ONE_MINUS_DST_ALPHA,211:i.CONSTANT_COLOR,212:i.ONE_MINUS_CONSTANT_COLOR,213:i.CONSTANT_ALPHA,214:i.ONE_MINUS_CONSTANT_ALPHA};function I(b,W,V,_e,X,ce,ve,ae,Ee,be){if(b!==0){if(p===!1&&(we(i.BLEND),p=!0),b===5)X=X||W,ce=ce||V,ve=ve||_e,W===d&&X===g||(i.blendEquationSeparate(E[W],E[X]),d=W,g=X),V===m&&_e===_&&ce===f&&ve===M||(i.blendFuncSeparate(y[V],y[_e],y[ce],y[ve]),m=V,_=_e,f=ce,M=ve),ae.equals(v)!==!1&&Ee===x||(i.blendColor(ae.r,ae.g,ae.b,Ee),v.copy(ae),x=Ee),h=b,P=!1;else if(b!==h||be!==P){if(d===Hn&&g===Hn||(i.blendEquation(i.FUNC_ADD),d=Hn,g=Hn),be)switch(b){case 1:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case 2:i.blendFunc(i.ONE,i.ONE);break;case 3:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case 4:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",b)}else switch(b){case 1:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case 2:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case 3:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case 4:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",b)}m=null,_=null,f=null,M=null,v.set(0,0,0),x=0,h=b,P=be}}else p===!0&&(le(i.BLEND),p=!1)}function Z(b){C!==b&&(b?i.frontFace(i.CW):i.frontFace(i.CCW),C=b)}function N(b){b!==0?(we(i.CULL_FACE),b!==w&&(b===1?i.cullFace(i.BACK):b===2?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):le(i.CULL_FACE),w=b}function H(b,W,V){b?(we(i.POLYGON_OFFSET_FILL),F===W&&Y===V||(i.polygonOffset(W,V),F=W,Y=V)):le(i.POLYGON_OFFSET_FILL)}return{buffers:{color:e,depth:t,stencil:n},enable:we,disable:le,bindFramebuffer:function(b,W){return l[b]!==W&&(i.bindFramebuffer(b,W),l[b]=W,b===i.DRAW_FRAMEBUFFER&&(l[i.FRAMEBUFFER]=W),b===i.FRAMEBUFFER&&(l[i.DRAW_FRAMEBUFFER]=W),!0)},drawBuffers:function(b,W){let V=c,_e=!1;if(b){V=s.get(W),V===void 0&&(V=[],s.set(W,V));const X=b.textures;if(V.length!==X.length||V[0]!==i.COLOR_ATTACHMENT0){for(let ce=0,ve=X.length;ce<ve;ce++)V[ce]=i.COLOR_ATTACHMENT0+ce;V.length=X.length,_e=!0}}else V[0]!==i.BACK&&(V[0]=i.BACK,_e=!0);_e&&i.drawBuffers(V)},useProgram:function(b){return u!==b&&(i.useProgram(b),u=b,!0)},setBlending:I,setMaterial:function(b,W){b.side===2?le(i.CULL_FACE):we(i.CULL_FACE);let V=b.side===Et;W&&(V=!V),Z(V),b.blending===1&&b.transparent===!1?I(0):I(b.blending,b.blendEquation,b.blendSrc,b.blendDst,b.blendEquationAlpha,b.blendSrcAlpha,b.blendDstAlpha,b.blendColor,b.blendAlpha,b.premultipliedAlpha),t.setFunc(b.depthFunc),t.setTest(b.depthTest),t.setMask(b.depthWrite),e.setMask(b.colorWrite);const _e=b.stencilWrite;n.setTest(_e),_e&&(n.setMask(b.stencilWriteMask),n.setFunc(b.stencilFunc,b.stencilRef,b.stencilFuncMask),n.setOp(b.stencilFail,b.stencilZFail,b.stencilZPass)),H(b.polygonOffset,b.polygonOffsetFactor,b.polygonOffsetUnits),b.alphaToCoverage===!0?we(i.SAMPLE_ALPHA_TO_COVERAGE):le(i.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:Z,setCullFace:N,setLineWidth:function(b){b!==K&&(O&&i.lineWidth(b),K=b)},setPolygonOffset:H,setScissorTest:function(b){b?we(i.SCISSOR_TEST):le(i.SCISSOR_TEST)},activeTexture:function(b){b===void 0&&(b=i.TEXTURE0+$-1),te!==b&&(i.activeTexture(b),te=b)},bindTexture:function(b,W,V){V===void 0&&(V=te===null?i.TEXTURE0+$-1:te);let _e=ne[V];_e===void 0&&(_e={type:void 0,texture:void 0},ne[V]=_e),_e.type===b&&_e.texture===W||(te!==V&&(i.activeTexture(V),te=V),i.bindTexture(b,W||pe[b]),_e.type=b,_e.texture=W)},unbindTexture:function(){const b=ne[te];b!==void 0&&b.type!==void 0&&(i.bindTexture(b.type,null),b.type=void 0,b.texture=void 0)},compressedTexImage2D:function(){try{i.compressedTexImage2D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},compressedTexImage3D:function(){try{i.compressedTexImage3D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},texImage2D:function(){try{i.texImage2D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},texImage3D:function(){try{i.texImage3D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},updateUBOMapping:function(b,W){let V=a.get(W);V===void 0&&(V=new WeakMap,a.set(W,V));let _e=V.get(b);_e===void 0&&(_e=i.getUniformBlockIndex(W,b.name),V.set(b,_e))},uniformBlockBinding:function(b,W){const V=a.get(W).get(b);r.get(W)!==V&&(i.uniformBlockBinding(W,V,b.__bindingPointIndex),r.set(W,V))},texStorage2D:function(){try{i.texStorage2D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},texStorage3D:function(){try{i.texStorage3D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},texSubImage2D:function(){try{i.texSubImage2D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},texSubImage3D:function(){try{i.texSubImage3D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},compressedTexSubImage2D:function(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},compressedTexSubImage3D:function(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},scissor:function(b){ye.equals(b)===!1&&(i.scissor(b.x,b.y,b.z,b.w),ye.copy(b))},viewport:function(b){Pe.equals(b)===!1&&(i.viewport(b.x,b.y,b.z,b.w),Pe.copy(b))},reset:function(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),o={},te=null,ne={},l={},s=new WeakMap,c=[],u=null,p=!1,h=null,d=null,m=null,_=null,g=null,f=null,M=null,v=new Oe(0,0,0),x=0,P=!1,C=null,w=null,K=null,F=null,Y=null,ye.set(0,0,i.canvas.width,i.canvas.height),Pe.set(0,0,i.canvas.width,i.canvas.height),e.reset(),t.reset(),n.reset()}}}function So(i,e,t,n){const r=function(a){switch(a){case pn:case Go:return{byteLength:1,components:1};case Xi:case Vo:case Yi:return{byteLength:2,components:1};case ps:case fs:return{byteLength:2,components:4};case Vn:case ds:case en:return{byteLength:4,components:1};case ko:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${a}.`)}(n);switch(t){case Wo:case jo:return i*e;case qo:return i*e*2;case ms:case gs:return i*e/r.components*r.byteLength;case Yo:case _s:return i*e*2/r.components*r.byteLength;case Xo:return i*e*3/r.components*r.byteLength;case qt:case vs:return i*e*4/r.components*r.byteLength;case Er:case br:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Tr:case wr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Oa:case Ba:return Math.max(i,16)*Math.max(e,8)/4;case Na:case Fa:return Math.max(i,8)*Math.max(e,8)/2;case za:case Ha:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ga:case Va:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ka:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Wa:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Xa:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case ja:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case qa:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Ya:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Ka:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Za:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Ja:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case $a:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Qa:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case es:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case ts:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ar:case ns:case is:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Ko:case rs:return Math.ceil(i/4)*Math.ceil(e/4)*8;case as:case ss:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Uu(i,e,t,n,r,a,o){const l=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,s=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),c=new ze,u=new WeakMap;let p;const h=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(E,y){return d?new OffscreenCanvas(E,y):Nr("canvas")}function _(E,y,I){let Z=1;const N=le(E);if((N.width>I||N.height>I)&&(Z=I/Math.max(N.width,N.height)),Z<1){if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const H=Math.floor(Z*N.width),b=Math.floor(Z*N.height);p===void 0&&(p=m(H,b));const W=y?m(H,b):p;return W.width=H,W.height=b,W.getContext("2d").drawImage(E,0,0,H,b),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+N.width+"x"+N.height+") to ("+H+"x"+b+")."),W}return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+N.width+"x"+N.height+")."),E}return E}function g(E){return E.generateMipmaps&&E.minFilter!==Ft&&E.minFilter!==Qt}function f(E){i.generateMipmap(E)}function M(E,y,I,Z,N=!1){if(E!==null){if(i[E]!==void 0)return i[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let H=y;if(y===i.RED&&(I===i.FLOAT&&(H=i.R32F),I===i.HALF_FLOAT&&(H=i.R16F),I===i.UNSIGNED_BYTE&&(H=i.R8)),y===i.RED_INTEGER&&(I===i.UNSIGNED_BYTE&&(H=i.R8UI),I===i.UNSIGNED_SHORT&&(H=i.R16UI),I===i.UNSIGNED_INT&&(H=i.R32UI),I===i.BYTE&&(H=i.R8I),I===i.SHORT&&(H=i.R16I),I===i.INT&&(H=i.R32I)),y===i.RG&&(I===i.FLOAT&&(H=i.RG32F),I===i.HALF_FLOAT&&(H=i.RG16F),I===i.UNSIGNED_BYTE&&(H=i.RG8)),y===i.RG_INTEGER&&(I===i.UNSIGNED_BYTE&&(H=i.RG8UI),I===i.UNSIGNED_SHORT&&(H=i.RG16UI),I===i.UNSIGNED_INT&&(H=i.RG32UI),I===i.BYTE&&(H=i.RG8I),I===i.SHORT&&(H=i.RG16I),I===i.INT&&(H=i.RG32I)),y===i.RGB_INTEGER&&(I===i.UNSIGNED_BYTE&&(H=i.RGB8UI),I===i.UNSIGNED_SHORT&&(H=i.RGB16UI),I===i.UNSIGNED_INT&&(H=i.RGB32UI),I===i.BYTE&&(H=i.RGB8I),I===i.SHORT&&(H=i.RGB16I),I===i.INT&&(H=i.RGB32I)),y===i.RGBA_INTEGER&&(I===i.UNSIGNED_BYTE&&(H=i.RGBA8UI),I===i.UNSIGNED_SHORT&&(H=i.RGBA16UI),I===i.UNSIGNED_INT&&(H=i.RGBA32UI),I===i.BYTE&&(H=i.RGBA8I),I===i.SHORT&&(H=i.RGBA16I),I===i.INT&&(H=i.RGBA32I)),y===i.RGB&&I===i.UNSIGNED_INT_5_9_9_9_REV&&(H=i.RGB9_E5),y===i.RGBA){const b=N?Lr:Je.getTransfer(Z);I===i.FLOAT&&(H=i.RGBA32F),I===i.HALF_FLOAT&&(H=i.RGBA16F),I===i.UNSIGNED_BYTE&&(H=b===rt?i.SRGB8_ALPHA8:i.RGBA8),I===i.UNSIGNED_SHORT_4_4_4_4&&(H=i.RGBA4),I===i.UNSIGNED_SHORT_5_5_5_1&&(H=i.RGB5_A1)}return H!==i.R16F&&H!==i.R32F&&H!==i.RG16F&&H!==i.RG32F&&H!==i.RGBA16F&&H!==i.RGBA32F||e.get("EXT_color_buffer_float"),H}function v(E,y){let I;return E?y===null||y===Vn||y===xi?I=i.DEPTH24_STENCIL8:y===en?I=i.DEPTH32F_STENCIL8:y===Xi&&(I=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===Vn||y===xi?I=i.DEPTH_COMPONENT24:y===en?I=i.DEPTH_COMPONENT32F:y===Xi&&(I=i.DEPTH_COMPONENT16),I}function x(E,y){return g(E)===!0||E.isFramebufferTexture&&E.minFilter!==Ft&&E.minFilter!==Qt?Math.log2(Math.max(y.width,y.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?y.mipmaps.length:1}function P(E){const y=E.target;y.removeEventListener("dispose",P),function(I){const Z=n.get(I);if(Z.__webglInit===void 0)return;const N=I.source,H=h.get(N);if(H){const b=H[Z.__cacheKey];b.usedTimes--,b.usedTimes===0&&w(I),Object.keys(H).length===0&&h.delete(N)}n.remove(I)}(y),y.isVideoTexture&&u.delete(y)}function C(E){const y=E.target;y.removeEventListener("dispose",C),function(I){const Z=n.get(I);if(I.depthTexture&&I.depthTexture.dispose(),I.isWebGLCubeRenderTarget)for(let H=0;H<6;H++){if(Array.isArray(Z.__webglFramebuffer[H]))for(let b=0;b<Z.__webglFramebuffer[H].length;b++)i.deleteFramebuffer(Z.__webglFramebuffer[H][b]);else i.deleteFramebuffer(Z.__webglFramebuffer[H]);Z.__webglDepthbuffer&&i.deleteRenderbuffer(Z.__webglDepthbuffer[H])}else{if(Array.isArray(Z.__webglFramebuffer))for(let H=0;H<Z.__webglFramebuffer.length;H++)i.deleteFramebuffer(Z.__webglFramebuffer[H]);else i.deleteFramebuffer(Z.__webglFramebuffer);if(Z.__webglDepthbuffer&&i.deleteRenderbuffer(Z.__webglDepthbuffer),Z.__webglMultisampledFramebuffer&&i.deleteFramebuffer(Z.__webglMultisampledFramebuffer),Z.__webglColorRenderbuffer)for(let H=0;H<Z.__webglColorRenderbuffer.length;H++)Z.__webglColorRenderbuffer[H]&&i.deleteRenderbuffer(Z.__webglColorRenderbuffer[H]);Z.__webglDepthRenderbuffer&&i.deleteRenderbuffer(Z.__webglDepthRenderbuffer)}const N=I.textures;for(let H=0,b=N.length;H<b;H++){const W=n.get(N[H]);W.__webglTexture&&(i.deleteTexture(W.__webglTexture),o.memory.textures--),n.remove(N[H])}n.remove(I)}(y)}function w(E){const y=n.get(E);i.deleteTexture(y.__webglTexture);const I=E.source;delete h.get(I)[y.__cacheKey],o.memory.textures--}let K=0;function F(E,y){const I=n.get(E);if(E.isVideoTexture&&function(Z){const N=o.render.frame;u.get(Z)!==N&&(u.set(Z,N),Z.update())}(E),E.isRenderTargetTexture===!1&&E.version>0&&I.__version!==E.version){const Z=E.image;if(Z===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else{if(Z.complete!==!1)return void te(I,E,y);console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")}}t.bindTexture(i.TEXTURE_2D,I.__webglTexture,i.TEXTURE0+y)}const Y={[ki]:i.REPEAT,[Wi]:i.CLAMP_TO_EDGE,[Ia]:i.MIRRORED_REPEAT},$={[Ft]:i.NEAREST,[Dl]:i.NEAREST_MIPMAP_NEAREST,[Qi]:i.NEAREST_MIPMAP_LINEAR,[Qt]:i.LINEAR,[qr]:i.LINEAR_MIPMAP_NEAREST,[pi]:i.LINEAR_MIPMAP_LINEAR},O={512:i.NEVER,519:i.ALWAYS,513:i.LESS,[Zo]:i.LEQUAL,514:i.EQUAL,518:i.GEQUAL,516:i.GREATER,517:i.NOTEQUAL};function ee(E,y){if(y.type!==en||e.has("OES_texture_float_linear")!==!1||y.magFilter!==Qt&&y.magFilter!==qr&&y.magFilter!==Qi&&y.magFilter!==pi&&y.minFilter!==Qt&&y.minFilter!==qr&&y.minFilter!==Qi&&y.minFilter!==pi||console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(E,i.TEXTURE_WRAP_S,Y[y.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,Y[y.wrapT]),E!==i.TEXTURE_3D&&E!==i.TEXTURE_2D_ARRAY||i.texParameteri(E,i.TEXTURE_WRAP_R,Y[y.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,$[y.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,$[y.minFilter]),y.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,O[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Ft||y.minFilter!==Qi&&y.minFilter!==pi||y.type===en&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const I=e.get("EXT_texture_filter_anisotropic");i.texParameterf(E,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,r.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function j(E,y){let I=!1;E.__webglInit===void 0&&(E.__webglInit=!0,y.addEventListener("dispose",P));const Z=y.source;let N=h.get(Z);N===void 0&&(N={},h.set(Z,N));const H=function(b){const W=[];return W.push(b.wrapS),W.push(b.wrapT),W.push(b.wrapR||0),W.push(b.magFilter),W.push(b.minFilter),W.push(b.anisotropy),W.push(b.internalFormat),W.push(b.format),W.push(b.type),W.push(b.generateMipmaps),W.push(b.premultiplyAlpha),W.push(b.flipY),W.push(b.unpackAlignment),W.push(b.colorSpace),W.join()}(y);if(H!==E.__cacheKey){N[H]===void 0&&(N[H]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,I=!0),N[H].usedTimes++;const b=N[E.__cacheKey];b!==void 0&&(N[E.__cacheKey].usedTimes--,b.usedTimes===0&&w(y)),E.__cacheKey=H,E.__webglTexture=N[H].texture}return I}function te(E,y,I){let Z=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(Z=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(Z=i.TEXTURE_3D);const N=j(E,y),H=y.source;t.bindTexture(Z,E.__webglTexture,i.TEXTURE0+I);const b=n.get(H);if(H.version!==b.__version||N===!0){t.activeTexture(i.TEXTURE0+I);const W=Je.getPrimaries(Je.workingColorSpace),V=y.colorSpace===hi?null:Je.getPrimaries(y.colorSpace),_e=y.colorSpace===hi||W===V?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,_e);let X=_(y.image,!1,r.maxTextureSize);X=we(y,X);const ce=a.convert(y.format,y.colorSpace),ve=a.convert(y.type);let ae,Ee=M(y.internalFormat,ce,ve,y.colorSpace,y.isVideoTexture);ee(Z,y);const be=y.mipmaps,Ce=y.isVideoTexture!==!0,Ue=b.__version===void 0||N===!0,je=H.dataReady,Be=x(y,X);if(y.isDepthTexture)Ee=v(y.format===Mi,y.type),Ue&&(Ce?t.texStorage2D(i.TEXTURE_2D,1,Ee,X.width,X.height):t.texImage2D(i.TEXTURE_2D,0,Ee,X.width,X.height,0,ce,ve,null));else if(y.isDataTexture)if(be.length>0){Ce&&Ue&&t.texStorage2D(i.TEXTURE_2D,Be,Ee,be[0].width,be[0].height);for(let Ae=0,ke=be.length;Ae<ke;Ae++)ae=be[Ae],Ce?je&&t.texSubImage2D(i.TEXTURE_2D,Ae,0,0,ae.width,ae.height,ce,ve,ae.data):t.texImage2D(i.TEXTURE_2D,Ae,Ee,ae.width,ae.height,0,ce,ve,ae.data);y.generateMipmaps=!1}else Ce?(Ue&&t.texStorage2D(i.TEXTURE_2D,Be,Ee,X.width,X.height),je&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,X.width,X.height,ce,ve,X.data)):t.texImage2D(i.TEXTURE_2D,0,Ee,X.width,X.height,0,ce,ve,X.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Ce&&Ue&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Be,Ee,be[0].width,be[0].height,X.depth);for(let Ae=0,ke=be.length;Ae<ke;Ae++)if(ae=be[Ae],y.format!==qt)if(ce!==null)if(Ce){if(je)if(y.layerUpdates.size>0){const Ze=So(ae.width,ae.height,y.format,y.type);for(const tt of y.layerUpdates){const Te=ae.data.subarray(tt*Ze/ae.data.BYTES_PER_ELEMENT,(tt+1)*Ze/ae.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Ae,0,0,tt,ae.width,ae.height,1,ce,Te,0,0)}y.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Ae,0,0,0,ae.width,ae.height,X.depth,ce,ae.data,0,0)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Ae,Ee,ae.width,ae.height,X.depth,0,ae.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ce?je&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,Ae,0,0,0,ae.width,ae.height,X.depth,ce,ve,ae.data):t.texImage3D(i.TEXTURE_2D_ARRAY,Ae,Ee,ae.width,ae.height,X.depth,0,ce,ve,ae.data)}else{Ce&&Ue&&t.texStorage2D(i.TEXTURE_2D,Be,Ee,be[0].width,be[0].height);for(let Ae=0,ke=be.length;Ae<ke;Ae++)ae=be[Ae],y.format!==qt?ce!==null?Ce?je&&t.compressedTexSubImage2D(i.TEXTURE_2D,Ae,0,0,ae.width,ae.height,ce,ae.data):t.compressedTexImage2D(i.TEXTURE_2D,Ae,Ee,ae.width,ae.height,0,ae.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ce?je&&t.texSubImage2D(i.TEXTURE_2D,Ae,0,0,ae.width,ae.height,ce,ve,ae.data):t.texImage2D(i.TEXTURE_2D,Ae,Ee,ae.width,ae.height,0,ce,ve,ae.data)}else if(y.isDataArrayTexture)if(Ce){if(Ue&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Be,Ee,X.width,X.height,X.depth),je)if(y.layerUpdates.size>0){const Ae=So(X.width,X.height,y.format,y.type);for(const ke of y.layerUpdates){const Ze=X.data.subarray(ke*Ae/X.data.BYTES_PER_ELEMENT,(ke+1)*Ae/X.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,ke,X.width,X.height,1,ce,ve,Ze)}y.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,X.width,X.height,X.depth,ce,ve,X.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,Ee,X.width,X.height,X.depth,0,ce,ve,X.data);else if(y.isData3DTexture)Ce?(Ue&&t.texStorage3D(i.TEXTURE_3D,Be,Ee,X.width,X.height,X.depth),je&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,X.width,X.height,X.depth,ce,ve,X.data)):t.texImage3D(i.TEXTURE_3D,0,Ee,X.width,X.height,X.depth,0,ce,ve,X.data);else if(y.isFramebufferTexture){if(Ue)if(Ce)t.texStorage2D(i.TEXTURE_2D,Be,Ee,X.width,X.height);else{let Ae=X.width,ke=X.height;for(let Ze=0;Ze<Be;Ze++)t.texImage2D(i.TEXTURE_2D,Ze,Ee,Ae,ke,0,ce,ve,null),Ae>>=1,ke>>=1}}else if(be.length>0){if(Ce&&Ue){const Ae=le(be[0]);t.texStorage2D(i.TEXTURE_2D,Be,Ee,Ae.width,Ae.height)}for(let Ae=0,ke=be.length;Ae<ke;Ae++)ae=be[Ae],Ce?je&&t.texSubImage2D(i.TEXTURE_2D,Ae,0,0,ce,ve,ae):t.texImage2D(i.TEXTURE_2D,Ae,Ee,ce,ve,ae);y.generateMipmaps=!1}else if(Ce){if(Ue){const Ae=le(X);t.texStorage2D(i.TEXTURE_2D,Be,Ee,Ae.width,Ae.height)}je&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ce,ve,X)}else t.texImage2D(i.TEXTURE_2D,0,Ee,ce,ve,X);g(y)&&f(Z),b.__version=H.version,y.onUpdate&&y.onUpdate(y)}E.__version=y.version}function ne(E,y,I,Z,N,H){const b=a.convert(I.format,I.colorSpace),W=a.convert(I.type),V=M(I.internalFormat,b,W,I.colorSpace);if(!n.get(y).__hasExternalTextures){const _e=Math.max(1,y.width>>H),X=Math.max(1,y.height>>H);N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?t.texImage3D(N,H,V,_e,X,y.depth,0,b,W,null):t.texImage2D(N,H,V,_e,X,0,b,W,null)}t.bindFramebuffer(i.FRAMEBUFFER,E),pe(y)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Z,N,n.get(I).__webglTexture,0,oe(y)):(N===i.TEXTURE_2D||N>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&N<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Z,N,n.get(I).__webglTexture,H),t.bindFramebuffer(i.FRAMEBUFFER,null)}function me(E,y,I){if(i.bindRenderbuffer(i.RENDERBUFFER,E),y.depthBuffer){const Z=y.depthTexture,N=Z&&Z.isDepthTexture?Z.type:null,H=v(y.stencilBuffer,N),b=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,W=oe(y);pe(y)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,W,H,y.width,y.height):I?i.renderbufferStorageMultisample(i.RENDERBUFFER,W,H,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,H,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,b,i.RENDERBUFFER,E)}else{const Z=y.textures;for(let N=0;N<Z.length;N++){const H=Z[N],b=a.convert(H.format,H.colorSpace),W=a.convert(H.type),V=M(H.internalFormat,b,W,H.colorSpace),_e=oe(y);I&&pe(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,_e,V,y.width,y.height):pe(y)?l.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,_e,V,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,V,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ge(E){const y=n.get(E),I=E.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==E.depthTexture){const Z=E.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),Z){const N=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,Z.removeEventListener("dispose",N)};Z.addEventListener("dispose",N),y.__depthDisposeCallback=N}y.__boundDepthTexture=Z}if(E.depthTexture&&!y.__autoAllocateDepthBuffer){if(I)throw new Error("target.depthTexture not supported in Cube render targets");(function(Z,N){if(N&&N.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,Z),!N.depthTexture||!N.depthTexture.isDepthTexture)throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");n.get(N.depthTexture).__webglTexture&&N.depthTexture.image.width===N.width&&N.depthTexture.image.height===N.height||(N.depthTexture.image.width=N.width,N.depthTexture.image.height=N.height,N.depthTexture.needsUpdate=!0),F(N.depthTexture,0);const H=n.get(N.depthTexture).__webglTexture,b=oe(N);if(N.depthTexture.format===ji)pe(N)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,H,0,b):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,H,0);else{if(N.depthTexture.format!==Mi)throw new Error("Unknown depthTexture format");pe(N)?l.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,H,0,b):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,H,0)}})(y.__webglFramebuffer,E)}else if(I){y.__webglDepthbuffer=[];for(let Z=0;Z<6;Z++)if(t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[Z]),y.__webglDepthbuffer[Z]===void 0)y.__webglDepthbuffer[Z]=i.createRenderbuffer(),me(y.__webglDepthbuffer[Z],E,!1);else{const N=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,H=y.__webglDepthbuffer[Z];i.bindRenderbuffer(i.RENDERBUFFER,H),i.framebufferRenderbuffer(i.FRAMEBUFFER,N,i.RENDERBUFFER,H)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),me(y.__webglDepthbuffer,E,!1);else{const Z=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,N=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,N),i.framebufferRenderbuffer(i.FRAMEBUFFER,Z,i.RENDERBUFFER,N)}t.bindFramebuffer(i.FRAMEBUFFER,null)}const ye=[],Pe=[];function oe(E){return Math.min(r.maxSamples,E.samples)}function pe(E){const y=n.get(E);return E.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function we(E,y){const I=E.colorSpace,Z=E.format,N=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||I!==Cn&&I!==hi&&(Je.getTransfer(I)===rt?Z===qt&&N===pn||console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",I)),y}function le(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=function(){const E=K;return E>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+r.maxTextures),K+=1,E},this.resetTextureUnits=function(){K=0},this.setTexture2D=F,this.setTexture2DArray=function(E,y){const I=n.get(E);E.version>0&&I.__version!==E.version?te(I,E,y):t.bindTexture(i.TEXTURE_2D_ARRAY,I.__webglTexture,i.TEXTURE0+y)},this.setTexture3D=function(E,y){const I=n.get(E);E.version>0&&I.__version!==E.version?te(I,E,y):t.bindTexture(i.TEXTURE_3D,I.__webglTexture,i.TEXTURE0+y)},this.setTextureCube=function(E,y){const I=n.get(E);E.version>0&&I.__version!==E.version?function(Z,N,H){if(N.image.length!==6)return;const b=j(Z,N),W=N.source;t.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture,i.TEXTURE0+H);const V=n.get(W);if(W.version!==V.__version||b===!0){t.activeTexture(i.TEXTURE0+H);const _e=Je.getPrimaries(Je.workingColorSpace),X=N.colorSpace===hi?null:Je.getPrimaries(N.colorSpace),ce=N.colorSpace===hi||_e===X?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,N.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,N.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ce);const ve=N.isCompressedTexture||N.image[0].isCompressedTexture,ae=N.image[0]&&N.image[0].isDataTexture,Ee=[];for(let Te=0;Te<6;Te++)Ee[Te]=ve||ae?ae?N.image[Te].image:N.image[Te]:_(N.image[Te],!0,r.maxCubemapSize),Ee[Te]=we(N,Ee[Te]);const be=Ee[0],Ce=a.convert(N.format,N.colorSpace),Ue=a.convert(N.type),je=M(N.internalFormat,Ce,Ue,N.colorSpace),Be=N.isVideoTexture!==!0,Ae=V.__version===void 0||b===!0,ke=W.dataReady;let Ze,tt=x(N,be);if(ee(i.TEXTURE_CUBE_MAP,N),ve){Be&&Ae&&t.texStorage2D(i.TEXTURE_CUBE_MAP,tt,je,be.width,be.height);for(let Te=0;Te<6;Te++){Ze=Ee[Te].mipmaps;for(let He=0;He<Ze.length;He++){const Ye=Ze[He];N.format!==qt?Ce!==null?Be?ke&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Te,He,0,0,Ye.width,Ye.height,Ce,Ye.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Te,He,je,Ye.width,Ye.height,0,Ye.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Be?ke&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Te,He,0,0,Ye.width,Ye.height,Ce,Ue,Ye.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Te,He,je,Ye.width,Ye.height,0,Ce,Ue,Ye.data)}}}else{if(Ze=N.mipmaps,Be&&Ae){Ze.length>0&&tt++;const Te=le(Ee[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,tt,je,Te.width,Te.height)}for(let Te=0;Te<6;Te++)if(ae){Be?ke&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,0,0,Ee[Te].width,Ee[Te].height,Ce,Ue,Ee[Te].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,je,Ee[Te].width,Ee[Te].height,0,Ce,Ue,Ee[Te].data);for(let He=0;He<Ze.length;He++){const Ye=Ze[He].image[Te].image;Be?ke&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Te,He+1,0,0,Ye.width,Ye.height,Ce,Ue,Ye.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Te,He+1,je,Ye.width,Ye.height,0,Ce,Ue,Ye.data)}}else{Be?ke&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,0,0,Ce,Ue,Ee[Te]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Te,0,je,Ce,Ue,Ee[Te]);for(let He=0;He<Ze.length;He++){const Ye=Ze[He];Be?ke&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Te,He+1,0,0,Ce,Ue,Ye.image[Te]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Te,He+1,je,Ce,Ue,Ye.image[Te])}}}g(N)&&f(i.TEXTURE_CUBE_MAP),V.__version=W.version,N.onUpdate&&N.onUpdate(N)}Z.__version=N.version}(I,E,y):t.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+y)},this.rebindTextures=function(E,y,I){const Z=n.get(E);y!==void 0&&ne(Z.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),I!==void 0&&ge(E)},this.setupRenderTarget=function(E){const y=E.texture,I=n.get(E),Z=n.get(y);E.addEventListener("dispose",C);const N=E.textures,H=E.isWebGLCubeRenderTarget===!0,b=N.length>1;if(b||(Z.__webglTexture===void 0&&(Z.__webglTexture=i.createTexture()),Z.__version=y.version,o.memory.textures++),H){I.__webglFramebuffer=[];for(let W=0;W<6;W++)if(y.mipmaps&&y.mipmaps.length>0){I.__webglFramebuffer[W]=[];for(let V=0;V<y.mipmaps.length;V++)I.__webglFramebuffer[W][V]=i.createFramebuffer()}else I.__webglFramebuffer[W]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){I.__webglFramebuffer=[];for(let W=0;W<y.mipmaps.length;W++)I.__webglFramebuffer[W]=i.createFramebuffer()}else I.__webglFramebuffer=i.createFramebuffer();if(b)for(let W=0,V=N.length;W<V;W++){const _e=n.get(N[W]);_e.__webglTexture===void 0&&(_e.__webglTexture=i.createTexture(),o.memory.textures++)}if(E.samples>0&&pe(E)===!1){I.__webglMultisampledFramebuffer=i.createFramebuffer(),I.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let W=0;W<N.length;W++){const V=N[W];I.__webglColorRenderbuffer[W]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,I.__webglColorRenderbuffer[W]);const _e=a.convert(V.format,V.colorSpace),X=a.convert(V.type),ce=M(V.internalFormat,_e,X,V.colorSpace,E.isXRRenderTarget===!0),ve=oe(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,ve,ce,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+W,i.RENDERBUFFER,I.__webglColorRenderbuffer[W])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(I.__webglDepthRenderbuffer=i.createRenderbuffer(),me(I.__webglDepthRenderbuffer,E,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(H){t.bindTexture(i.TEXTURE_CUBE_MAP,Z.__webglTexture),ee(i.TEXTURE_CUBE_MAP,y);for(let W=0;W<6;W++)if(y.mipmaps&&y.mipmaps.length>0)for(let V=0;V<y.mipmaps.length;V++)ne(I.__webglFramebuffer[W][V],E,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+W,V);else ne(I.__webglFramebuffer[W],E,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+W,0);g(y)&&f(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(b){for(let W=0,V=N.length;W<V;W++){const _e=N[W],X=n.get(_e);t.bindTexture(i.TEXTURE_2D,X.__webglTexture),ee(i.TEXTURE_2D,_e),ne(I.__webglFramebuffer,E,_e,i.COLOR_ATTACHMENT0+W,i.TEXTURE_2D,0),g(_e)&&f(i.TEXTURE_2D)}t.unbindTexture()}else{let W=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(W=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(W,Z.__webglTexture),ee(W,y),y.mipmaps&&y.mipmaps.length>0)for(let V=0;V<y.mipmaps.length;V++)ne(I.__webglFramebuffer[V],E,y,i.COLOR_ATTACHMENT0,W,V);else ne(I.__webglFramebuffer,E,y,i.COLOR_ATTACHMENT0,W,0);g(y)&&f(W),t.unbindTexture()}E.depthBuffer&&ge(E)},this.updateRenderTargetMipmap=function(E){const y=E.textures;for(let I=0,Z=y.length;I<Z;I++){const N=y[I];if(g(N)){const H=E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,b=n.get(N).__webglTexture;t.bindTexture(H,b),f(H),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(E){if(E.samples>0){if(pe(E)===!1){const y=E.textures,I=E.width,Z=E.height;let N=i.COLOR_BUFFER_BIT;const H=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,b=n.get(E),W=y.length>1;if(W)for(let V=0;V<y.length;V++)t.bindFramebuffer(i.FRAMEBUFFER,b.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+V,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+V,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,b.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,b.__webglFramebuffer);for(let V=0;V<y.length;V++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(N|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(N|=i.STENCIL_BUFFER_BIT)),W){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,b.__webglColorRenderbuffer[V]);const _e=n.get(y[V]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,_e,0)}i.blitFramebuffer(0,0,I,Z,0,0,I,Z,N,i.NEAREST),s===!0&&(ye.length=0,Pe.length=0,ye.push(i.COLOR_ATTACHMENT0+V),E.depthBuffer&&E.resolveDepthBuffer===!1&&(ye.push(H),Pe.push(H),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Pe)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,ye))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),W)for(let V=0;V<y.length;V++){t.bindFramebuffer(i.FRAMEBUFFER,b.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+V,i.RENDERBUFFER,b.__webglColorRenderbuffer[V]);const _e=n.get(y[V]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+V,i.TEXTURE_2D,_e,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,b.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&s){const y=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}},this.setupDepthRenderbuffer=ge,this.setupFrameBufferTexture=ne,this.useMultisampledRTT=pe}function Iu(i,e){return{convert:function(t,n=""){let r;const a=Je.getTransfer(n);if(t===pn)return i.UNSIGNED_BYTE;if(t===ps)return i.UNSIGNED_SHORT_4_4_4_4;if(t===fs)return i.UNSIGNED_SHORT_5_5_5_1;if(t===ko)return i.UNSIGNED_INT_5_9_9_9_REV;if(t===Go)return i.BYTE;if(t===Vo)return i.SHORT;if(t===Xi)return i.UNSIGNED_SHORT;if(t===ds)return i.INT;if(t===Vn)return i.UNSIGNED_INT;if(t===en)return i.FLOAT;if(t===Yi)return i.HALF_FLOAT;if(t===Wo)return i.ALPHA;if(t===Xo)return i.RGB;if(t===qt)return i.RGBA;if(t===jo)return i.LUMINANCE;if(t===qo)return i.LUMINANCE_ALPHA;if(t===ji)return i.DEPTH_COMPONENT;if(t===Mi)return i.DEPTH_STENCIL;if(t===ms)return i.RED;if(t===gs)return i.RED_INTEGER;if(t===Yo)return i.RG;if(t===_s)return i.RG_INTEGER;if(t===vs)return i.RGBA_INTEGER;if(t===Er||t===br||t===Tr||t===wr)if(a===rt){if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r===null)return null;if(t===Er)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===br)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===Tr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(r=e.get("WEBGL_compressed_texture_s3tc"),r===null)return null;if(t===Er)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===br)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===Tr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===wr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===Na||t===Oa||t===Fa||t===Ba){if(r=e.get("WEBGL_compressed_texture_pvrtc"),r===null)return null;if(t===Na)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===Oa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===Fa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===Ba)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===za||t===Ha||t===Ga){if(r=e.get("WEBGL_compressed_texture_etc"),r===null)return null;if(t===za||t===Ha)return a===rt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(t===Ga)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}if(t===Va||t===ka||t===Wa||t===Xa||t===ja||t===qa||t===Ya||t===Ka||t===Za||t===Ja||t===$a||t===Qa||t===es||t===ts){if(r=e.get("WEBGL_compressed_texture_astc"),r===null)return null;if(t===Va)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===ka)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===Wa)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===Xa)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===ja)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===qa)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===Ya)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===Ka)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===Za)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===Ja)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===$a)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===Qa)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===es)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===ts)return a===rt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===Ar||t===ns||t===is){if(r=e.get("EXT_texture_compression_bptc"),r===null)return null;if(t===Ar)return a===rt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===ns)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===is)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===Ko||t===rs||t===as||t===ss){if(r=e.get("EXT_texture_compression_rgtc"),r===null)return null;if(t===Ar)return r.COMPRESSED_RED_RGTC1_EXT;if(t===rs)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===as)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===ss)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===xi?i.UNSIGNED_INT_24_8:i[t]!==void 0?i[t]:null}}}class Nu extends Nt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class Bt extends ft{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ou={type:"move"};class Ea{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Bt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Bt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new T,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new T),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Bt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new T,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new T),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,a=null,o=null;const l=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const g=t.getJointPose(_,n),f=this._getHandJoint(c,_);g!==null&&(f.matrix.fromArray(g.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=g.radius),f.visible=g!==null}const u=c.joints["index-finger-tip"],p=c.joints["thumb-tip"],h=u.position.distanceTo(p.position),d=.02,m=.005;c.inputState.pinching&&h>d+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=d-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,n),a!==null&&(s.matrix.fromArray(a.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,a.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(a.linearVelocity)):s.hasLinearVelocity=!1,a.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(a.angularVelocity)):s.hasAngularVelocity=!1));l!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&a!==null&&(r=a),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,this.dispatchEvent(Ou)))}return l!==null&&(l.visible=r!==null),s!==null&&(s.visible=a!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Bt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Fu{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const r=new _t;e.properties.get(r).__webglTexture=t.texture,t.depthNear==n.depthNear&&t.depthFar==n.depthFar||(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Rn({vertexShader:`
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

}`,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ot(new Ti(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Bu extends Ei{constructor(e,t){super();const n=this;let r=null,a=1,o=null,l="local-floor",s=1,c=null,u=null,p=null,h=null,d=null,m=null;const _=new Fu,g=t.getContextAttributes();let f=null,M=null;const v=[],x=[],P=new ze;let C=null;const w=new Nt;w.layers.enable(1),w.viewport=new $e;const K=new Nt;K.layers.enable(2),K.viewport=new $e;const F=[w,K],Y=new Nu;Y.layers.enable(1),Y.layers.enable(2);let $=null,O=null;function ee(oe){const pe=x.indexOf(oe.inputSource);if(pe===-1)return;const we=v[pe];we!==void 0&&(we.update(oe.inputSource,oe.frame,c||o),we.dispatchEvent({type:oe.type,data:oe.inputSource}))}function j(){r.removeEventListener("select",ee),r.removeEventListener("selectstart",ee),r.removeEventListener("selectend",ee),r.removeEventListener("squeeze",ee),r.removeEventListener("squeezestart",ee),r.removeEventListener("squeezeend",ee),r.removeEventListener("end",j),r.removeEventListener("inputsourceschange",te);for(let oe=0;oe<v.length;oe++){const pe=x[oe];pe!==null&&(x[oe]=null,v[oe].disconnect(pe))}$=null,O=null,_.reset(),e.setRenderTarget(f),d=null,h=null,p=null,r=null,M=null,Pe.stop(),n.isPresenting=!1,e.setPixelRatio(C),e.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}function te(oe){for(let pe=0;pe<oe.removed.length;pe++){const we=oe.removed[pe],le=x.indexOf(we);le>=0&&(x[le]=null,v[le].disconnect(we))}for(let pe=0;pe<oe.added.length;pe++){const we=oe.added[pe];let le=x.indexOf(we);if(le===-1){for(let y=0;y<v.length;y++){if(y>=x.length){x.push(we),le=y;break}if(x[y]===null){x[y]=we,le=y;break}}if(le===-1)break}const E=v[le];E&&E.connect(we)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(oe){let pe=v[oe];return pe===void 0&&(pe=new Ea,v[oe]=pe),pe.getTargetRaySpace()},this.getControllerGrip=function(oe){let pe=v[oe];return pe===void 0&&(pe=new Ea,v[oe]=pe),pe.getGripSpace()},this.getHand=function(oe){let pe=v[oe];return pe===void 0&&(pe=new Ea,v[oe]=pe),pe.getHandSpace()},this.setFramebufferScaleFactor=function(oe){a=oe,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(oe){l=oe,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(oe){c=oe},this.getBaseLayer=function(){return h!==null?h:d},this.getBinding=function(){return p},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(oe){if(r=oe,r!==null){if(f=e.getRenderTarget(),r.addEventListener("select",ee),r.addEventListener("selectstart",ee),r.addEventListener("selectend",ee),r.addEventListener("squeeze",ee),r.addEventListener("squeezestart",ee),r.addEventListener("squeezeend",ee),r.addEventListener("end",j),r.addEventListener("inputsourceschange",te),g.xrCompatible!==!0&&await t.makeXRCompatible(),C=e.getPixelRatio(),e.getSize(P),r.renderState.layers===void 0){const pe={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:a};d=new XRWebGLLayer(r,t,pe),r.updateRenderState({baseLayer:d}),e.setPixelRatio(1),e.setSize(d.framebufferWidth,d.framebufferHeight,!1),M=new kn(d.framebufferWidth,d.framebufferHeight,{format:qt,type:pn,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let pe=null,we=null,le=null;g.depth&&(le=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,pe=g.stencil?Mi:ji,we=g.stencil?xi:Vn);const E={colorFormat:t.RGBA8,depthFormat:le,scaleFactor:a};p=new XRWebGLBinding(r,t),h=p.createProjectionLayer(E),r.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),M=new kn(h.textureWidth,h.textureHeight,{format:qt,type:pn,depthTexture:new sl(h.textureWidth,h.textureHeight,we,void 0,void 0,void 0,void 0,void 0,void 0,pe),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1})}M.isXRRenderTarget=!0,this.setFoveation(s),c=null,o=await r.requestReferenceSpace(l),Pe.setContext(r),Pe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};const ne=new T,me=new T;function ge(oe,pe){pe===null?oe.matrixWorld.copy(oe.matrix):oe.matrixWorld.multiplyMatrices(pe.matrixWorld,oe.matrix),oe.matrixWorldInverse.copy(oe.matrixWorld).invert()}this.updateCamera=function(oe){if(r===null)return;let pe=oe.near,we=oe.far;_.texture!==null&&(_.depthNear>0&&(pe=_.depthNear),_.depthFar>0&&(we=_.depthFar)),Y.near=K.near=w.near=pe,Y.far=K.far=w.far=we,$===Y.near&&O===Y.far||(r.updateRenderState({depthNear:Y.near,depthFar:Y.far}),$=Y.near,O=Y.far);const le=oe.parent,E=Y.cameras;ge(Y,le);for(let y=0;y<E.length;y++)ge(E[y],le);E.length===2?function(y,I,Z){ne.setFromMatrixPosition(I.matrixWorld),me.setFromMatrixPosition(Z.matrixWorld);const N=ne.distanceTo(me),H=I.projectionMatrix.elements,b=Z.projectionMatrix.elements,W=H[14]/(H[10]-1),V=H[14]/(H[10]+1),_e=(H[9]+1)/H[5],X=(H[9]-1)/H[5],ce=(H[8]-1)/H[0],ve=(b[8]+1)/b[0],ae=W*ce,Ee=W*ve,be=N/(-ce+ve),Ce=be*-ce;if(I.matrixWorld.decompose(y.position,y.quaternion,y.scale),y.translateX(Ce),y.translateZ(be),y.matrixWorld.compose(y.position,y.quaternion,y.scale),y.matrixWorldInverse.copy(y.matrixWorld).invert(),H[10]===-1)y.projectionMatrix.copy(I.projectionMatrix),y.projectionMatrixInverse.copy(I.projectionMatrixInverse);else{const Ue=W+be,je=V+be,Be=ae-Ce,Ae=Ee+(N-Ce),ke=_e*V/je*Ue,Ze=X*V/je*Ue;y.projectionMatrix.makePerspective(Be,Ae,ke,Ze,Ue,je),y.projectionMatrixInverse.copy(y.projectionMatrix).invert()}}(Y,w,K):Y.projectionMatrix.copy(w.projectionMatrix),function(y,I,Z){Z===null?y.matrix.copy(I.matrixWorld):(y.matrix.copy(Z.matrixWorld),y.matrix.invert(),y.matrix.multiply(I.matrixWorld)),y.matrix.decompose(y.position,y.quaternion,y.scale),y.updateMatrixWorld(!0),y.projectionMatrix.copy(I.projectionMatrix),y.projectionMatrixInverse.copy(I.projectionMatrixInverse),y.isPerspectiveCamera&&(y.fov=2*os*Math.atan(1/y.projectionMatrix.elements[5]),y.zoom=1)}(oe,Y,le)},this.getCamera=function(){return Y},this.getFoveation=function(){if(h!==null||d!==null)return s},this.setFoveation=function(oe){s=oe,h!==null&&(h.fixedFoveation=oe),d!==null&&d.fixedFoveation!==void 0&&(d.fixedFoveation=oe)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(Y)};let ye=null;const Pe=new al;Pe.setAnimationLoop(function(oe,pe){if(u=pe.getViewerPose(c||o),m=pe,u!==null){const we=u.views;d!==null&&(e.setRenderTargetFramebuffer(M,d.framebuffer),e.setRenderTarget(M));let le=!1;we.length!==Y.cameras.length&&(Y.cameras.length=0,le=!0);for(let y=0;y<we.length;y++){const I=we[y];let Z=null;if(d!==null)Z=d.getViewport(I);else{const H=p.getViewSubImage(h,I);Z=H.viewport,y===0&&(e.setRenderTargetTextures(M,H.colorTexture,h.ignoreDepthValues?void 0:H.depthStencilTexture),e.setRenderTarget(M))}let N=F[y];N===void 0&&(N=new Nt,N.layers.enable(y),N.viewport=new $e,F[y]=N),N.matrix.fromArray(I.transform.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale),N.projectionMatrix.fromArray(I.projectionMatrix),N.projectionMatrixInverse.copy(N.projectionMatrix).invert(),N.viewport.set(Z.x,Z.y,Z.width,Z.height),y===0&&(Y.matrix.copy(N.matrix),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale)),le===!0&&Y.cameras.push(N)}const E=r.enabledFeatures;if(E&&E.includes("depth-sensing")){const y=p.getDepthInformation(we[0]);y&&y.isValid&&y.texture&&_.init(e,y,r.renderState)}}for(let we=0;we<v.length;we++){const le=x[we],E=v[we];le!==null&&E!==void 0&&E.update(le,pe,c||o)}ye&&ye(oe,pe),pe.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:pe}),m=null}),this.setAnimationLoop=function(oe){ye=oe},this.dispose=function(){}}}const Bn=new bt,zu=new Le;function Hu(i,e){function t(r,a){r.matrixAutoUpdate===!0&&r.updateMatrix(),a.value.copy(r.matrix)}function n(r,a){r.opacity.value=a.opacity,a.color&&r.diffuse.value.copy(a.color),a.emissive&&r.emissive.value.copy(a.emissive).multiplyScalar(a.emissiveIntensity),a.map&&(r.map.value=a.map,t(a.map,r.mapTransform)),a.alphaMap&&(r.alphaMap.value=a.alphaMap,t(a.alphaMap,r.alphaMapTransform)),a.bumpMap&&(r.bumpMap.value=a.bumpMap,t(a.bumpMap,r.bumpMapTransform),r.bumpScale.value=a.bumpScale,a.side===Et&&(r.bumpScale.value*=-1)),a.normalMap&&(r.normalMap.value=a.normalMap,t(a.normalMap,r.normalMapTransform),r.normalScale.value.copy(a.normalScale),a.side===Et&&r.normalScale.value.negate()),a.displacementMap&&(r.displacementMap.value=a.displacementMap,t(a.displacementMap,r.displacementMapTransform),r.displacementScale.value=a.displacementScale,r.displacementBias.value=a.displacementBias),a.emissiveMap&&(r.emissiveMap.value=a.emissiveMap,t(a.emissiveMap,r.emissiveMapTransform)),a.specularMap&&(r.specularMap.value=a.specularMap,t(a.specularMap,r.specularMapTransform)),a.alphaTest>0&&(r.alphaTest.value=a.alphaTest);const o=e.get(a),l=o.envMap,s=o.envMapRotation;l&&(r.envMap.value=l,Bn.copy(s),Bn.x*=-1,Bn.y*=-1,Bn.z*=-1,l.isCubeTexture&&l.isRenderTargetTexture===!1&&(Bn.y*=-1,Bn.z*=-1),r.envMapRotation.value.setFromMatrix4(zu.makeRotationFromEuler(Bn)),r.flipEnvMap.value=l.isCubeTexture&&l.isRenderTargetTexture===!1?-1:1,r.reflectivity.value=a.reflectivity,r.ior.value=a.ior,r.refractionRatio.value=a.refractionRatio),a.lightMap&&(r.lightMap.value=a.lightMap,r.lightMapIntensity.value=a.lightMapIntensity,t(a.lightMap,r.lightMapTransform)),a.aoMap&&(r.aoMap.value=a.aoMap,r.aoMapIntensity.value=a.aoMapIntensity,t(a.aoMap,r.aoMapTransform))}return{refreshFogUniforms:function(r,a){a.color.getRGB(r.fogColor.value,il(i)),a.isFog?(r.fogNear.value=a.near,r.fogFar.value=a.far):a.isFogExp2&&(r.fogDensity.value=a.density)},refreshMaterialUniforms:function(r,a,o,l,s){a.isMeshBasicMaterial||a.isMeshLambertMaterial?n(r,a):a.isMeshToonMaterial?(n(r,a),function(c,u){u.gradientMap&&(c.gradientMap.value=u.gradientMap)}(r,a)):a.isMeshPhongMaterial?(n(r,a),function(c,u){c.specular.value.copy(u.specular),c.shininess.value=Math.max(u.shininess,1e-4)}(r,a)):a.isMeshStandardMaterial?(n(r,a),function(c,u){c.metalness.value=u.metalness,u.metalnessMap&&(c.metalnessMap.value=u.metalnessMap,t(u.metalnessMap,c.metalnessMapTransform)),c.roughness.value=u.roughness,u.roughnessMap&&(c.roughnessMap.value=u.roughnessMap,t(u.roughnessMap,c.roughnessMapTransform)),u.envMap&&(c.envMapIntensity.value=u.envMapIntensity)}(r,a),a.isMeshPhysicalMaterial&&function(c,u,p){c.ior.value=u.ior,u.sheen>0&&(c.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen),c.sheenRoughness.value=u.sheenRoughness,u.sheenColorMap&&(c.sheenColorMap.value=u.sheenColorMap,t(u.sheenColorMap,c.sheenColorMapTransform)),u.sheenRoughnessMap&&(c.sheenRoughnessMap.value=u.sheenRoughnessMap,t(u.sheenRoughnessMap,c.sheenRoughnessMapTransform))),u.clearcoat>0&&(c.clearcoat.value=u.clearcoat,c.clearcoatRoughness.value=u.clearcoatRoughness,u.clearcoatMap&&(c.clearcoatMap.value=u.clearcoatMap,t(u.clearcoatMap,c.clearcoatMapTransform)),u.clearcoatRoughnessMap&&(c.clearcoatRoughnessMap.value=u.clearcoatRoughnessMap,t(u.clearcoatRoughnessMap,c.clearcoatRoughnessMapTransform)),u.clearcoatNormalMap&&(c.clearcoatNormalMap.value=u.clearcoatNormalMap,t(u.clearcoatNormalMap,c.clearcoatNormalMapTransform),c.clearcoatNormalScale.value.copy(u.clearcoatNormalScale),u.side===Et&&c.clearcoatNormalScale.value.negate())),u.dispersion>0&&(c.dispersion.value=u.dispersion),u.iridescence>0&&(c.iridescence.value=u.iridescence,c.iridescenceIOR.value=u.iridescenceIOR,c.iridescenceThicknessMinimum.value=u.iridescenceThicknessRange[0],c.iridescenceThicknessMaximum.value=u.iridescenceThicknessRange[1],u.iridescenceMap&&(c.iridescenceMap.value=u.iridescenceMap,t(u.iridescenceMap,c.iridescenceMapTransform)),u.iridescenceThicknessMap&&(c.iridescenceThicknessMap.value=u.iridescenceThicknessMap,t(u.iridescenceThicknessMap,c.iridescenceThicknessMapTransform))),u.transmission>0&&(c.transmission.value=u.transmission,c.transmissionSamplerMap.value=p.texture,c.transmissionSamplerSize.value.set(p.width,p.height),u.transmissionMap&&(c.transmissionMap.value=u.transmissionMap,t(u.transmissionMap,c.transmissionMapTransform)),c.thickness.value=u.thickness,u.thicknessMap&&(c.thicknessMap.value=u.thicknessMap,t(u.thicknessMap,c.thicknessMapTransform)),c.attenuationDistance.value=u.attenuationDistance,c.attenuationColor.value.copy(u.attenuationColor)),u.anisotropy>0&&(c.anisotropyVector.value.set(u.anisotropy*Math.cos(u.anisotropyRotation),u.anisotropy*Math.sin(u.anisotropyRotation)),u.anisotropyMap&&(c.anisotropyMap.value=u.anisotropyMap,t(u.anisotropyMap,c.anisotropyMapTransform))),c.specularIntensity.value=u.specularIntensity,c.specularColor.value.copy(u.specularColor),u.specularColorMap&&(c.specularColorMap.value=u.specularColorMap,t(u.specularColorMap,c.specularColorMapTransform)),u.specularIntensityMap&&(c.specularIntensityMap.value=u.specularIntensityMap,t(u.specularIntensityMap,c.specularIntensityMapTransform))}(r,a,s)):a.isMeshMatcapMaterial?(n(r,a),function(c,u){u.matcap&&(c.matcap.value=u.matcap)}(r,a)):a.isMeshDepthMaterial?n(r,a):a.isMeshDistanceMaterial?(n(r,a),function(c,u){const p=e.get(u).light;c.referencePosition.value.setFromMatrixPosition(p.matrixWorld),c.nearDistance.value=p.shadow.camera.near,c.farDistance.value=p.shadow.camera.far}(r,a)):a.isMeshNormalMaterial?n(r,a):a.isLineBasicMaterial?(function(c,u){c.diffuse.value.copy(u.color),c.opacity.value=u.opacity,u.map&&(c.map.value=u.map,t(u.map,c.mapTransform))}(r,a),a.isLineDashedMaterial&&function(c,u){c.dashSize.value=u.dashSize,c.totalSize.value=u.dashSize+u.gapSize,c.scale.value=u.scale}(r,a)):a.isPointsMaterial?function(c,u,p,h){c.diffuse.value.copy(u.color),c.opacity.value=u.opacity,c.size.value=u.size*p,c.scale.value=.5*h,u.map&&(c.map.value=u.map,t(u.map,c.uvTransform)),u.alphaMap&&(c.alphaMap.value=u.alphaMap,t(u.alphaMap,c.alphaMapTransform)),u.alphaTest>0&&(c.alphaTest.value=u.alphaTest)}(r,a,o,l):a.isSpriteMaterial?function(c,u){c.diffuse.value.copy(u.color),c.opacity.value=u.opacity,c.rotation.value=u.rotation,u.map&&(c.map.value=u.map,t(u.map,c.mapTransform)),u.alphaMap&&(c.alphaMap.value=u.alphaMap,t(u.alphaMap,c.alphaMapTransform)),u.alphaTest>0&&(c.alphaTest.value=u.alphaTest)}(r,a):a.isShadowMaterial?(r.color.value.copy(a.color),r.opacity.value=a.opacity):a.isShaderMaterial&&(a.uniformsNeedUpdate=!1)}}}function Gu(i,e,t,n){let r={},a={},o=[];const l=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function s(p,h,d,m){const _=p.value,g=h+"_"+d;if(m[g]===void 0)return m[g]=typeof _=="number"||typeof _=="boolean"?_:_.clone(),!0;{const f=m[g];if(typeof _=="number"||typeof _=="boolean"){if(f!==_)return m[g]=_,!0}else if(f.equals(_)===!1)return f.copy(_),!0}return!1}function c(p){const h={boundary:0,storage:0};return typeof p=="number"||typeof p=="boolean"?(h.boundary=4,h.storage=4):p.isVector2?(h.boundary=8,h.storage=8):p.isVector3||p.isColor?(h.boundary=16,h.storage=12):p.isVector4?(h.boundary=16,h.storage=16):p.isMatrix3?(h.boundary=48,h.storage=48):p.isMatrix4?(h.boundary=64,h.storage=64):p.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",p),h}function u(p){const h=p.target;h.removeEventListener("dispose",u);const d=o.indexOf(h.__bindingPointIndex);o.splice(d,1),i.deleteBuffer(r[h.id]),delete r[h.id],delete a[h.id]}return{bind:function(p,h){const d=h.program;n.uniformBlockBinding(p,d)},update:function(p,h){let d=r[p.id];d===void 0&&(function(g){const f=g.uniforms;let M=0;const v=16;for(let P=0,C=f.length;P<C;P++){const w=Array.isArray(f[P])?f[P]:[f[P]];for(let K=0,F=w.length;K<F;K++){const Y=w[K],$=Array.isArray(Y.value)?Y.value:[Y.value];for(let O=0,ee=$.length;O<ee;O++){const j=c($[O]),te=M%v,ne=te%j.boundary,me=te+ne;M+=ne,me!==0&&v-me<j.storage&&(M+=v-me),Y.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),Y.__offset=M,M+=j.storage}}}const x=M%v;x>0&&(M+=v-x),g.__size=M,g.__cache={}}(p),d=function(g){const f=function(){for(let P=0;P<l;P++)if(o.indexOf(P)===-1)return o.push(P),P;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}();g.__bindingPointIndex=f;const M=i.createBuffer(),v=g.__size,x=g.usage;return i.bindBuffer(i.UNIFORM_BUFFER,M),i.bufferData(i.UNIFORM_BUFFER,v,x),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,f,M),M}(p),r[p.id]=d,p.addEventListener("dispose",u));const m=h.program;n.updateUBOMapping(p,m);const _=e.render.frame;a[p.id]!==_&&(function(g){const f=r[g.id],M=g.uniforms,v=g.__cache;i.bindBuffer(i.UNIFORM_BUFFER,f);for(let x=0,P=M.length;x<P;x++){const C=Array.isArray(M[x])?M[x]:[M[x]];for(let w=0,K=C.length;w<K;w++){const F=C[w];if(s(F,x,w,v)===!0){const Y=F.__offset,$=Array.isArray(F.value)?F.value:[F.value];let O=0;for(let ee=0;ee<$.length;ee++){const j=$[ee],te=c(j);typeof j=="number"||typeof j=="boolean"?(F.__data[0]=j,i.bufferSubData(i.UNIFORM_BUFFER,Y+O,F.__data)):j.isMatrix3?(F.__data[0]=j.elements[0],F.__data[1]=j.elements[1],F.__data[2]=j.elements[2],F.__data[3]=0,F.__data[4]=j.elements[3],F.__data[5]=j.elements[4],F.__data[6]=j.elements[5],F.__data[7]=0,F.__data[8]=j.elements[6],F.__data[9]=j.elements[7],F.__data[10]=j.elements[8],F.__data[11]=0):(j.toArray(F.__data,O),O+=te.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,Y,F.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}(p),a[p.id]=_)},dispose:function(){for(const p in r)i.deleteBuffer(r[p]);o=[],r={},a={}}}}class Vu{constructor(e={}){const{canvas:t=Il(),context:n=null,depth:r=!0,stencil:a=!1,alpha:o=!1,antialias:l=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:p=!1}=e;let h;if(this.isWebGLRenderer=!0,n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");h=n.getContextAttributes().alpha}else h=o;const d=new Uint32Array(4),m=new Int32Array(4);let _=null,g=null;const f=[],M=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=It,this.toneMapping=wn,this.toneMappingExposure=1;const v=this;let x=!1,P=0,C=0,w=null,K=-1,F=null;const Y=new $e,$=new $e;let O=null;const ee=new Oe(0);let j=0,te=t.width,ne=t.height,me=1,ge=null,ye=null;const Pe=new $e(0,0,te,ne),oe=new $e(0,0,te,ne);let pe=!1;const we=new Gr;let le=!1,E=!1;const y=new Le,I=new Le,Z=new T,N=new $e,H={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let b=!1;function W(){return w===null?me:1}let V,_e,X,ce,ve,ae,Ee,be,Ce,Ue,je,Be,Ae,ke,Ze,tt,Te,He,Ye,tn,nn,vt,it,Kt,D=n;function Lt(S,L){return t.getContext(S,L)}try{const S={alpha:!0,depth:r,stencil:a,antialias:l,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:p};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ca}`),t.addEventListener("webglcontextlost",rn,!1),t.addEventListener("webglcontextrestored",Ai,!1),t.addEventListener("webglcontextcreationerror",wt,!1),D===null){const L="webgl2";if(D=Lt(L,S),D===null)throw Lt(L)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(S){throw console.error("THREE.WebGLRenderer: "+S.message),S}function Pn(){V=new hc(D),V.init(),vt=new Iu(D,V),_e=new oc(D,V,e,vt),X=new Du(D),_e.reverseDepthBuffer&&X.buffers.depth.setReversed(!0),ce=new fc(D),ve=new Mu,ae=new Uu(D,V,X,ve,_e,vt,ce),Ee=new cc(v),be=new uc(v),Ce=new nc(D),it=new ac(D,Ce),Ue=new dc(D,Ce,ce,it),je=new gc(D,Ue,Ce,ce),Ye=new mc(D,_e,ae),tt=new lc(ve),Be=new xu(v,Ee,be,V,_e,it,tt),Ae=new Hu(v,ve),ke=new yu,Ze=new Au(V),He=new rc(v,Ee,be,X,je,h,s),Te=new Pu(v,je,_e),Kt=new Gu(D,ce,_e,X),tn=new sc(D,V,ce),nn=new pc(D,V,ce),ce.programs=Be.programs,v.capabilities=_e,v.extensions=V,v.properties=ve,v.renderLists=ke,v.shadowMap=Te,v.state=X,v.info=ce}Pn();const Qe=new Bu(v,D);function rn(S){S.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),x=!0}function Ai(){console.log("THREE.WebGLRenderer: Context Restored."),x=!1;const S=ce.autoReset,L=Te.enabled,U=Te.autoUpdate,G=Te.needsUpdate,B=Te.type;Pn(),ce.autoReset=S,Te.enabled=L,Te.autoUpdate=U,Te.needsUpdate=G,Te.type=B}function wt(S){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function At(S){const L=S.target;L.removeEventListener("dispose",At),function(U){(function(G){const B=ve.get(G).programs;B!==void 0&&(B.forEach(function(k){Be.releaseProgram(k)}),G.isShaderMaterial&&Be.releaseShaderCache(G))})(U),ve.remove(U)}(L)}function an(S,L,U){S.transparent===!0&&S.side===2&&S.forceSinglePass===!1?(S.side=Et,S.needsUpdate=!0,Q(S,L,U),S.side=An,S.needsUpdate=!0,Q(S,L,U),S.side=2):Q(S,L,U)}this.xr=Qe,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const S=V.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=V.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return me},this.setPixelRatio=function(S){S!==void 0&&(me=S,this.setSize(te,ne,!1))},this.getSize=function(S){return S.set(te,ne)},this.setSize=function(S,L,U=!0){Qe.isPresenting?console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting."):(te=S,ne=L,t.width=Math.floor(S*me),t.height=Math.floor(L*me),U===!0&&(t.style.width=S+"px",t.style.height=L+"px"),this.setViewport(0,0,S,L))},this.getDrawingBufferSize=function(S){return S.set(te*me,ne*me).floor()},this.setDrawingBufferSize=function(S,L,U){te=S,ne=L,me=U,t.width=Math.floor(S*U),t.height=Math.floor(L*U),this.setViewport(0,0,S,L)},this.getCurrentViewport=function(S){return S.copy(Y)},this.getViewport=function(S){return S.copy(Pe)},this.setViewport=function(S,L,U,G){S.isVector4?Pe.set(S.x,S.y,S.z,S.w):Pe.set(S,L,U,G),X.viewport(Y.copy(Pe).multiplyScalar(me).round())},this.getScissor=function(S){return S.copy(oe)},this.setScissor=function(S,L,U,G){S.isVector4?oe.set(S.x,S.y,S.z,S.w):oe.set(S,L,U,G),X.scissor($.copy(oe).multiplyScalar(me).round())},this.getScissorTest=function(){return pe},this.setScissorTest=function(S){X.setScissorTest(pe=S)},this.setOpaqueSort=function(S){ge=S},this.setTransparentSort=function(S){ye=S},this.getClearColor=function(S){return S.copy(He.getClearColor())},this.setClearColor=function(){He.setClearColor.apply(He,arguments)},this.getClearAlpha=function(){return He.getClearAlpha()},this.setClearAlpha=function(){He.setClearAlpha.apply(He,arguments)},this.clear=function(S=!0,L=!0,U=!0){let G=0;if(S){let B=!1;if(w!==null){const k=w.texture.format;B=k===vs||k===_s||k===gs}if(B){const k=w.texture.type,q=k===pn||k===Vn||k===Xi||k===xi||k===ps||k===fs,re=He.getClearColor(),he=He.getClearAlpha(),ue=re.r,J=re.g,de=re.b;q?(d[0]=ue,d[1]=J,d[2]=de,d[3]=he,D.clearBufferuiv(D.COLOR,0,d)):(m[0]=ue,m[1]=J,m[2]=de,m[3]=he,D.clearBufferiv(D.COLOR,0,m))}else G|=D.COLOR_BUFFER_BIT}L&&(G|=D.DEPTH_BUFFER_BIT,D.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),U&&(G|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",rn,!1),t.removeEventListener("webglcontextrestored",Ai,!1),t.removeEventListener("webglcontextcreationerror",wt,!1),ke.dispose(),Ze.dispose(),ve.dispose(),Ee.dispose(),be.dispose(),je.dispose(),it.dispose(),Kt.dispose(),Be.dispose(),Qe.dispose(),Qe.removeEventListener("sessionstart",Ri),Qe.removeEventListener("sessionend",Ji),Zt.stop()},this.renderBufferDirect=function(S,L,U,G,B,k){L===null&&(L=H);const q=B.isMesh&&B.matrixWorld.determinant()<0,re=function(Fe,et,lt,We,Ne){et.isScene!==!0&&(et=H),ae.resetTextureUnits();const zt=et.fog,ml=We.isMeshStandardMaterial?et.environment:null,gl=w===null?v.outputColorSpace:w.isXRRenderTarget===!0?w.texture.colorSpace:Cn,$i=(We.isMeshStandardMaterial?be:Ee).get(We.envMap||ml),_l=We.vertexColors===!0&&!!lt.attributes.color&&lt.attributes.color.itemSize===4,vl=!!lt.attributes.tangent&&(!!We.normalMap||We.anisotropy>0),xl=!!lt.morphAttributes.position,Ml=!!lt.morphAttributes.normal,Sl=!!lt.morphAttributes.color;let As=wn;We.toneMapped&&(w!==null&&w.isXRRenderTarget!==!0||(As=v.toneMapping));const Rs=lt.morphAttributes.position||lt.morphAttributes.normal||lt.morphAttributes.color,yl=Rs!==void 0?Rs.length:0,qe=ve.get(We),El=g.state.lights;if(le===!0&&(E===!0||Fe!==F)){const Dt=Fe===F&&We.id===K;tt.setState(We,Fe,Dt)}let Ht=!1;We.version===qe.__version?qe.needsLights&&qe.lightsStateVersion!==El.state.version||qe.outputColorSpace!==gl||Ne.isBatchedMesh&&qe.batching===!1?Ht=!0:Ne.isBatchedMesh||qe.batching!==!0?Ne.isBatchedMesh&&qe.batchingColor===!0&&Ne.colorTexture===null||Ne.isBatchedMesh&&qe.batchingColor===!1&&Ne.colorTexture!==null||Ne.isInstancedMesh&&qe.instancing===!1?Ht=!0:Ne.isInstancedMesh||qe.instancing!==!0?Ne.isSkinnedMesh&&qe.skinning===!1?Ht=!0:Ne.isSkinnedMesh||qe.skinning!==!0?Ne.isInstancedMesh&&qe.instancingColor===!0&&Ne.instanceColor===null||Ne.isInstancedMesh&&qe.instancingColor===!1&&Ne.instanceColor!==null||Ne.isInstancedMesh&&qe.instancingMorph===!0&&Ne.morphTexture===null||Ne.isInstancedMesh&&qe.instancingMorph===!1&&Ne.morphTexture!==null||qe.envMap!==$i||We.fog===!0&&qe.fog!==zt?Ht=!0:qe.numClippingPlanes===void 0||qe.numClippingPlanes===tt.numPlanes&&qe.numIntersection===tt.numIntersection?(qe.vertexAlphas!==_l||qe.vertexTangents!==vl||qe.morphTargets!==xl||qe.morphNormals!==Ml||qe.morphColors!==Sl||qe.toneMapping!==As||qe.morphTargetsCount!==yl)&&(Ht=!0):Ht=!0:Ht=!0:Ht=!0:Ht=!0:(Ht=!0,qe.__version=We.version);let Ln=qe.currentProgram;Ht===!0&&(Ln=Q(We,et,Ne));let Cs=!1,Ci=!1,Wr=!1;const st=Ln.getUniforms(),gn=qe.uniforms;if(X.useProgram(Ln.program)&&(Cs=!0,Ci=!0,Wr=!0),We.id!==K&&(K=We.id,Ci=!0),Cs||F!==Fe){_e.reverseDepthBuffer?(y.copy(Fe.projectionMatrix),function(Dn){const at=Dn.elements;at[2]=.5*at[2]+.5*at[3],at[6]=.5*at[6]+.5*at[7],at[10]=.5*at[10]+.5*at[11],at[14]=.5*at[14]+.5*at[15]}(y),function(Dn){const at=Dn.elements;at[11]===-1?(at[10]=-at[10]-1,at[14]=-at[14]):(at[10]=-at[10],at[14]=1-at[14])}(y),st.setValue(D,"projectionMatrix",y)):st.setValue(D,"projectionMatrix",Fe.projectionMatrix),st.setValue(D,"viewMatrix",Fe.matrixWorldInverse);const Dt=st.map.cameraPosition;Dt!==void 0&&Dt.setValue(D,Z.setFromMatrixPosition(Fe.matrixWorld)),_e.logarithmicDepthBuffer&&st.setValue(D,"logDepthBufFC",2/(Math.log(Fe.far+1)/Math.LN2)),(We.isMeshPhongMaterial||We.isMeshToonMaterial||We.isMeshLambertMaterial||We.isMeshBasicMaterial||We.isMeshStandardMaterial||We.isShaderMaterial)&&st.setValue(D,"isOrthographic",Fe.isOrthographicCamera===!0),F!==Fe&&(F=Fe,Ci=!0,Wr=!0)}if(Ne.isSkinnedMesh){st.setOptional(D,Ne,"bindMatrix"),st.setOptional(D,Ne,"bindMatrixInverse");const Dt=Ne.skeleton;Dt&&(Dt.boneTexture===null&&Dt.computeBoneTexture(),st.setValue(D,"boneTexture",Dt.boneTexture,ae))}Ne.isBatchedMesh&&(st.setOptional(D,Ne,"batchingTexture"),st.setValue(D,"batchingTexture",Ne._matricesTexture,ae),st.setOptional(D,Ne,"batchingIdTexture"),st.setValue(D,"batchingIdTexture",Ne._indirectTexture,ae),st.setOptional(D,Ne,"batchingColorTexture"),Ne._colorsTexture!==null&&st.setValue(D,"batchingColorTexture",Ne._colorsTexture,ae));const Xr=lt.morphAttributes;Xr.position===void 0&&Xr.normal===void 0&&Xr.color===void 0||Ye.update(Ne,lt,Ln),(Ci||qe.receiveShadow!==Ne.receiveShadow)&&(qe.receiveShadow=Ne.receiveShadow,st.setValue(D,"receiveShadow",Ne.receiveShadow)),We.isMeshGouraudMaterial&&We.envMap!==null&&(gn.envMap.value=$i,gn.flipEnvMap.value=$i.isCubeTexture&&$i.isRenderTargetTexture===!1?-1:1),We.isMeshStandardMaterial&&We.envMap===null&&et.environment!==null&&(gn.envMapIntensity.value=et.environmentIntensity),Ci&&(st.setValue(D,"toneMappingExposure",v.toneMappingExposure),qe.needsLights&&(Gt=Wr,(Jt=gn).ambientLightColor.needsUpdate=Gt,Jt.lightProbe.needsUpdate=Gt,Jt.directionalLights.needsUpdate=Gt,Jt.directionalLightShadows.needsUpdate=Gt,Jt.pointLights.needsUpdate=Gt,Jt.pointLightShadows.needsUpdate=Gt,Jt.spotLights.needsUpdate=Gt,Jt.spotLightShadows.needsUpdate=Gt,Jt.rectAreaLights.needsUpdate=Gt,Jt.hemisphereLights.needsUpdate=Gt),zt&&We.fog===!0&&Ae.refreshFogUniforms(gn,zt),Ae.refreshMaterialUniforms(gn,We,me,ne,g.state.transmissionRenderTarget[Fe.id]),Cr.upload(D,Me(qe),gn,ae));var Jt,Gt;if(We.isShaderMaterial&&We.uniformsNeedUpdate===!0&&(Cr.upload(D,Me(qe),gn,ae),We.uniformsNeedUpdate=!1),We.isSpriteMaterial&&st.setValue(D,"center",Ne.center),st.setValue(D,"modelViewMatrix",Ne.modelViewMatrix),st.setValue(D,"normalMatrix",Ne.normalMatrix),st.setValue(D,"modelMatrix",Ne.matrixWorld),We.isShaderMaterial||We.isRawShaderMaterial){const Dt=We.uniformsGroups;for(let Dn=0,at=Dt.length;Dn<at;Dn++){const Ps=Dt[Dn];Kt.update(Ps,Ln),Kt.bind(Ps,Ln)}}return Ln}(S,L,U,G,B);X.setMaterial(G,q);let he=U.index,ue=1;if(G.wireframe===!0){if(he=Ue.getWireframeAttribute(U),he===void 0)return;ue=2}const J=U.drawRange,de=U.attributes.position;let Re=J.start*ue,De=(J.start+J.count)*ue;k!==null&&(Re=Math.max(Re,k.start*ue),De=Math.min(De,(k.start+k.count)*ue)),he!==null?(Re=Math.max(Re,0),De=Math.min(De,he.count)):de!=null&&(Re=Math.max(Re,0),De=Math.min(De,de.count));const Ie=De-Re;if(Ie<0||Ie===1/0)return;let nt;it.setup(B,G,re,U,he);let Ke=tn;if(he!==null&&(nt=Ce.get(he),Ke=nn,Ke.setIndex(nt)),B.isMesh)G.wireframe===!0?(X.setLineWidth(G.wireframeLinewidth*W()),Ke.setMode(D.LINES)):Ke.setMode(D.TRIANGLES);else if(B.isLine){let Fe=G.linewidth;Fe===void 0&&(Fe=1),X.setLineWidth(Fe*W()),B.isLineSegments?Ke.setMode(D.LINES):B.isLineLoop?Ke.setMode(D.LINE_LOOP):Ke.setMode(D.LINE_STRIP)}else B.isPoints?Ke.setMode(D.POINTS):B.isSprite&&Ke.setMode(D.TRIANGLES);if(B.isBatchedMesh)if(B._multiDrawInstances!==null)Ke.renderMultiDrawInstances(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount,B._multiDrawInstances);else if(V.get("WEBGL_multi_draw"))Ke.renderMultiDraw(B._multiDrawStarts,B._multiDrawCounts,B._multiDrawCount);else{const Fe=B._multiDrawStarts,et=B._multiDrawCounts,lt=B._multiDrawCount,We=he?Ce.get(he).bytesPerElement:1,Ne=ve.get(G).currentProgram.getUniforms();for(let zt=0;zt<lt;zt++)Ne.setValue(D,"_gl_DrawID",zt),Ke.render(Fe[zt]/We,et[zt])}else if(B.isInstancedMesh)Ke.renderInstances(Re,Ie,B.count);else if(U.isInstancedBufferGeometry){const Fe=U._maxInstanceCount!==void 0?U._maxInstanceCount:1/0,et=Math.min(U.instanceCount,Fe);Ke.renderInstances(Re,Ie,et)}else Ke.render(Re,Ie)},this.compile=function(S,L,U=null){U===null&&(U=S),g=Ze.get(U),g.init(L),M.push(g),U.traverseVisible(function(B){B.isLight&&B.layers.test(L.layers)&&(g.pushLight(B),B.castShadow&&g.pushShadow(B))}),S!==U&&S.traverseVisible(function(B){B.isLight&&B.layers.test(L.layers)&&(g.pushLight(B),B.castShadow&&g.pushShadow(B))}),g.setupLights();const G=new Set;return S.traverse(function(B){if(!(B.isMesh||B.isPoints||B.isLine||B.isSprite))return;const k=B.material;if(k)if(Array.isArray(k))for(let q=0;q<k.length;q++){const re=k[q];an(re,U,B),G.add(re)}else an(k,U,B),G.add(k)}),M.pop(),g=null,G},this.compileAsync=function(S,L,U=null){const G=this.compile(S,L,U);return new Promise(B=>{function k(){G.forEach(function(q){ve.get(q).currentProgram.isReady()&&G.delete(q)}),G.size!==0?setTimeout(k,10):B(S)}V.get("KHR_parallel_shader_compile")!==null?k():setTimeout(k,10)})};let qn=null;function Ri(){Zt.stop()}function Ji(){Zt.start()}const Zt=new al;function Yn(S,L,U,G){if(S.visible===!1)return;if(S.layers.test(L.layers)){if(S.isGroup)U=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(L);else if(S.isLight)g.pushLight(S),S.castShadow&&g.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||we.intersectsSprite(S)){G&&N.setFromMatrixPosition(S.matrixWorld).applyMatrix4(I);const k=je.update(S),q=S.material;q.visible&&_.push(S,k,q,U,N.z,null)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||we.intersectsObject(S))){const k=je.update(S),q=S.material;if(G&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),N.copy(S.boundingSphere.center)):(k.boundingSphere===null&&k.computeBoundingSphere(),N.copy(k.boundingSphere.center)),N.applyMatrix4(S.matrixWorld).applyMatrix4(I)),Array.isArray(q)){const re=k.groups;for(let he=0,ue=re.length;he<ue;he++){const J=re[he],de=q[J.materialIndex];de&&de.visible&&_.push(S,k,de,U,N.z,J)}}else q.visible&&_.push(S,k,q,U,N.z,null)}}const B=S.children;for(let k=0,q=B.length;k<q;k++)Yn(B[k],L,U,G)}function R(S,L,U,G){const B=S.opaque,k=S.transmissive,q=S.transparent;g.setupLightsView(U),le===!0&&tt.setGlobalState(v.clippingPlanes,U),G&&X.viewport(Y.copy(G)),B.length>0&&ie(B,L,U),k.length>0&&ie(k,L,U),q.length>0&&ie(q,L,U),X.buffers.depth.setTest(!0),X.buffers.depth.setMask(!0),X.buffers.color.setMask(!0),X.setPolygonOffset(!1)}function A(S,L,U,G){if((U.isScene===!0?U.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[G.id]===void 0&&(g.state.transmissionRenderTarget[G.id]=new kn(1,1,{generateMipmaps:!0,type:V.has("EXT_color_buffer_half_float")||V.has("EXT_color_buffer_float")?Yi:pn,minFilter:pi,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Je.workingColorSpace}));const B=g.state.transmissionRenderTarget[G.id],k=G.viewport||Y;B.setSize(k.z,k.w);const q=v.getRenderTarget();v.setRenderTarget(B),v.getClearColor(ee),j=v.getClearAlpha(),j<1&&v.setClearColor(16777215,.5),v.clear(),b&&He.render(U);const re=v.toneMapping;v.toneMapping=wn;const he=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),g.setupLightsView(G),le===!0&&tt.setGlobalState(v.clippingPlanes,G),ie(S,U,G),ae.updateMultisampleRenderTarget(B),ae.updateRenderTargetMipmap(B),V.has("WEBGL_multisampled_render_to_texture")===!1){let ue=!1;for(let J=0,de=L.length;J<de;J++){const Re=L[J],De=Re.object,Ie=Re.geometry,nt=Re.material,Ke=Re.group;if(nt.side===2&&De.layers.test(G.layers)){const Fe=nt.side;nt.side=Et,nt.needsUpdate=!0,fe(De,U,G,Ie,nt,Ke),nt.side=Fe,nt.needsUpdate=!0,ue=!0}}ue===!0&&(ae.updateMultisampleRenderTarget(B),ae.updateRenderTargetMipmap(B))}v.setRenderTarget(q),v.setClearColor(ee,j),he!==void 0&&(G.viewport=he),v.toneMapping=re}function ie(S,L,U){const G=L.isScene===!0?L.overrideMaterial:null;for(let B=0,k=S.length;B<k;B++){const q=S[B],re=q.object,he=q.geometry,ue=G===null?q.material:G,J=q.group;re.layers.test(U.layers)&&fe(re,L,U,he,ue,J)}}function fe(S,L,U,G,B,k){S.onBeforeRender(v,L,U,G,B,k),S.modelViewMatrix.multiplyMatrices(U.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),B.onBeforeRender(v,L,U,G,S,k),B.transparent===!0&&B.side===2&&B.forceSinglePass===!1?(B.side=Et,B.needsUpdate=!0,v.renderBufferDirect(U,L,G,B,S,k),B.side=An,B.needsUpdate=!0,v.renderBufferDirect(U,L,G,B,S,k),B.side=2):v.renderBufferDirect(U,L,G,B,S,k),S.onAfterRender(v,L,U,G,B,k)}function Q(S,L,U){L.isScene!==!0&&(L=H);const G=ve.get(S),B=g.state.lights,k=g.state.shadowsArray,q=B.state.version,re=Be.getParameters(S,B.state,k,L,U),he=Be.getProgramCacheKey(re);let ue=G.programs;G.environment=S.isMeshStandardMaterial?L.environment:null,G.fog=L.fog,G.envMap=(S.isMeshStandardMaterial?be:Ee).get(S.envMap||G.environment),G.envMapRotation=G.environment!==null&&S.envMap===null?L.environmentRotation:S.envMapRotation,ue===void 0&&(S.addEventListener("dispose",At),ue=new Map,G.programs=ue);let J=ue.get(he);if(J!==void 0){if(G.currentProgram===J&&G.lightsStateVersion===q)return Se(S,re),J}else re.uniforms=Be.getUniforms(S),S.onBeforeCompile(re,v),J=Be.acquireProgram(re,he),ue.set(he,J),G.uniforms=re.uniforms;const de=G.uniforms;return(S.isShaderMaterial||S.isRawShaderMaterial)&&S.clipping!==!0||(de.clippingPlanes=tt.uniform),Se(S,re),G.needsLights=function(Re){return Re.isMeshLambertMaterial||Re.isMeshToonMaterial||Re.isMeshPhongMaterial||Re.isMeshStandardMaterial||Re.isShadowMaterial||Re.isShaderMaterial&&Re.lights===!0}(S),G.lightsStateVersion=q,G.needsLights&&(de.ambientLightColor.value=B.state.ambient,de.lightProbe.value=B.state.probe,de.directionalLights.value=B.state.directional,de.directionalLightShadows.value=B.state.directionalShadow,de.spotLights.value=B.state.spot,de.spotLightShadows.value=B.state.spotShadow,de.rectAreaLights.value=B.state.rectArea,de.ltc_1.value=B.state.rectAreaLTC1,de.ltc_2.value=B.state.rectAreaLTC2,de.pointLights.value=B.state.point,de.pointLightShadows.value=B.state.pointShadow,de.hemisphereLights.value=B.state.hemi,de.directionalShadowMap.value=B.state.directionalShadowMap,de.directionalShadowMatrix.value=B.state.directionalShadowMatrix,de.spotShadowMap.value=B.state.spotShadowMap,de.spotLightMatrix.value=B.state.spotLightMatrix,de.spotLightMap.value=B.state.spotLightMap,de.pointShadowMap.value=B.state.pointShadowMap,de.pointShadowMatrix.value=B.state.pointShadowMatrix),G.currentProgram=J,G.uniformsList=null,J}function Me(S){if(S.uniformsList===null){const L=S.currentProgram.getUniforms();S.uniformsList=Cr.seqWithValue(L.seq,S.uniforms)}return S.uniformsList}function Se(S,L){const U=ve.get(S);U.outputColorSpace=L.outputColorSpace,U.batching=L.batching,U.batchingColor=L.batchingColor,U.instancing=L.instancing,U.instancingColor=L.instancingColor,U.instancingMorph=L.instancingMorph,U.skinning=L.skinning,U.morphTargets=L.morphTargets,U.morphNormals=L.morphNormals,U.morphColors=L.morphColors,U.morphTargetsCount=L.morphTargetsCount,U.numClippingPlanes=L.numClippingPlanes,U.numIntersection=L.numClipIntersection,U.vertexAlphas=L.vertexAlphas,U.vertexTangents=L.vertexTangents,U.toneMapping=L.toneMapping}Zt.setAnimationLoop(function(S){qn&&qn(S)}),typeof self<"u"&&Zt.setContext(self),this.setAnimationLoop=function(S){qn=S,Qe.setAnimationLoop(S),S===null?Zt.stop():Zt.start()},Qe.addEventListener("sessionstart",Ri),Qe.addEventListener("sessionend",Ji),this.render=function(S,L){if(L!==void 0&&L.isCamera!==!0)return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(x===!0)return;if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),Qe.enabled===!0&&Qe.isPresenting===!0&&(Qe.cameraAutoUpdate===!0&&Qe.updateCamera(L),L=Qe.getCamera()),S.isScene===!0&&S.onBeforeRender(v,S,L,w),g=Ze.get(S,M.length),g.init(L),M.push(g),I.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),we.setFromProjectionMatrix(I),E=this.localClippingEnabled,le=tt.init(this.clippingPlanes,E),_=ke.get(S,f.length),_.init(),f.push(_),Qe.enabled===!0&&Qe.isPresenting===!0){const k=v.xr.getDepthSensingMesh();k!==null&&Yn(k,L,-1/0,v.sortObjects)}Yn(S,L,0,v.sortObjects),_.finish(),v.sortObjects===!0&&_.sort(ge,ye),b=Qe.enabled===!1||Qe.isPresenting===!1||Qe.hasDepthSensing()===!1,b&&He.addToRenderList(_,S),this.info.render.frame++,le===!0&&tt.beginShadows();const U=g.state.shadowsArray;Te.render(U,S,L),le===!0&&tt.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=_.opaque,B=_.transmissive;if(g.setupLights(),L.isArrayCamera){const k=L.cameras;if(B.length>0)for(let q=0,re=k.length;q<re;q++)A(G,B,S,k[q]);b&&He.render(S);for(let q=0,re=k.length;q<re;q++){const he=k[q];R(_,S,he,he.viewport)}}else B.length>0&&A(G,B,S,L),b&&He.render(S),R(_,S,L);w!==null&&(ae.updateMultisampleRenderTarget(w),ae.updateRenderTargetMipmap(w)),S.isScene===!0&&S.onAfterRender(v,S,L),it.resetDefaultState(),K=-1,F=null,M.pop(),M.length>0?(g=M[M.length-1],le===!0&&tt.setGlobalState(v.clippingPlanes,g.state.camera)):g=null,f.pop(),_=f.length>0?f[f.length-1]:null},this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return w},this.setRenderTargetTextures=function(S,L,U){ve.get(S.texture).__webglTexture=L,ve.get(S.depthTexture).__webglTexture=U;const G=ve.get(S);G.__hasExternalTextures=!0,G.__autoAllocateDepthBuffer=U===void 0,G.__autoAllocateDepthBuffer||V.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(S,L){const U=ve.get(S);U.__webglFramebuffer=L,U.__useDefaultFramebuffer=L===void 0},this.setRenderTarget=function(S,L=0,U=0){w=S,P=L,C=U;let G=!0,B=null,k=!1,q=!1;if(S){const re=ve.get(S);if(re.__useDefaultFramebuffer!==void 0)X.bindFramebuffer(D.FRAMEBUFFER,null),G=!1;else if(re.__webglFramebuffer===void 0)ae.setupRenderTarget(S);else if(re.__hasExternalTextures)ae.rebindTextures(S,ve.get(S.texture).__webglTexture,ve.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const J=S.depthTexture;if(re.__boundDepthTexture!==J){if(J!==null&&ve.has(J)&&(S.width!==J.image.width||S.height!==J.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ae.setupDepthRenderbuffer(S)}}const he=S.texture;(he.isData3DTexture||he.isDataArrayTexture||he.isCompressedArrayTexture)&&(q=!0);const ue=ve.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(B=Array.isArray(ue[L])?ue[L][U]:ue[L],k=!0):B=S.samples>0&&ae.useMultisampledRTT(S)===!1?ve.get(S).__webglMultisampledFramebuffer:Array.isArray(ue)?ue[U]:ue,Y.copy(S.viewport),$.copy(S.scissor),O=S.scissorTest}else Y.copy(Pe).multiplyScalar(me).floor(),$.copy(oe).multiplyScalar(me).floor(),O=pe;if(X.bindFramebuffer(D.FRAMEBUFFER,B)&&G&&X.drawBuffers(S,B),X.viewport(Y),X.scissor($),X.setScissorTest(O),k){const re=ve.get(S.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+L,re.__webglTexture,U)}else if(q){const re=ve.get(S.texture),he=L||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,re.__webglTexture,U||0,he)}K=-1},this.readRenderTargetPixels=function(S,L,U,G,B,k,q){if(!S||!S.isWebGLRenderTarget)return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let re=ve.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&q!==void 0&&(re=re[q]),re){X.bindFramebuffer(D.FRAMEBUFFER,re);try{const he=S.texture,ue=he.format,J=he.type;if(!_e.textureFormatReadable(ue))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(!_e.textureTypeReadable(J))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");L>=0&&L<=S.width-G&&U>=0&&U<=S.height-B&&D.readPixels(L,U,G,B,vt.convert(ue),vt.convert(J),k)}finally{const he=w!==null?ve.get(w).__webglFramebuffer:null;X.bindFramebuffer(D.FRAMEBUFFER,he)}}},this.readRenderTargetPixelsAsync=async function(S,L,U,G,B,k,q){if(!S||!S.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let re=ve.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&q!==void 0&&(re=re[q]),re){const he=S.texture,ue=he.format,J=he.type;if(!_e.textureFormatReadable(ue))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!_e.textureTypeReadable(J))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(L>=0&&L<=S.width-G&&U>=0&&U<=S.height-B){X.bindFramebuffer(D.FRAMEBUFFER,re);const de=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,de),D.bufferData(D.PIXEL_PACK_BUFFER,k.byteLength,D.STREAM_READ),D.readPixels(L,U,G,B,vt.convert(ue),vt.convert(J),0);const Re=w!==null?ve.get(w).__webglFramebuffer:null;X.bindFramebuffer(D.FRAMEBUFFER,Re);const De=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await function(Ie,nt,Ke){return new Promise(function(Fe,et){setTimeout(function lt(){switch(Ie.clientWaitSync(nt,Ie.SYNC_FLUSH_COMMANDS_BIT,0)){case Ie.WAIT_FAILED:et();break;case Ie.TIMEOUT_EXPIRED:setTimeout(lt,Ke);break;default:Fe()}},Ke)})}(D,De,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,de),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,k),D.deleteBuffer(de),D.deleteSync(De),k}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(S,L=null,U=0){S.isTexture!==!0&&(Rr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),L=arguments[0]||null,S=arguments[1]);const G=Math.pow(2,-U),B=Math.floor(S.image.width*G),k=Math.floor(S.image.height*G),q=L!==null?L.x:0,re=L!==null?L.y:0;ae.setTexture2D(S,0),D.copyTexSubImage2D(D.TEXTURE_2D,U,0,0,q,re,B,k),X.unbindTexture()},this.copyTextureToTexture=function(S,L,U=null,G=null,B=0){let k,q,re,he,ue,J;S.isTexture!==!0&&(Rr("WebGLRenderer: copyTextureToTexture function signature has changed."),G=arguments[0]||null,S=arguments[1],L=arguments[2],B=arguments[3]||0,U=null),U!==null?(k=U.max.x-U.min.x,q=U.max.y-U.min.y,re=U.min.x,he=U.min.y):(k=S.image.width,q=S.image.height,re=0,he=0),G!==null?(ue=G.x,J=G.y):(ue=0,J=0);const de=vt.convert(L.format),Re=vt.convert(L.type);ae.setTexture2D(L,0),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,L.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,L.unpackAlignment);const De=D.getParameter(D.UNPACK_ROW_LENGTH),Ie=D.getParameter(D.UNPACK_IMAGE_HEIGHT),nt=D.getParameter(D.UNPACK_SKIP_PIXELS),Ke=D.getParameter(D.UNPACK_SKIP_ROWS),Fe=D.getParameter(D.UNPACK_SKIP_IMAGES),et=S.isCompressedTexture?S.mipmaps[B]:S.image;D.pixelStorei(D.UNPACK_ROW_LENGTH,et.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,et.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,re),D.pixelStorei(D.UNPACK_SKIP_ROWS,he),S.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,B,ue,J,k,q,de,Re,et.data):S.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,B,ue,J,et.width,et.height,de,et.data):D.texSubImage2D(D.TEXTURE_2D,B,ue,J,k,q,de,Re,et),D.pixelStorei(D.UNPACK_ROW_LENGTH,De),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Ie),D.pixelStorei(D.UNPACK_SKIP_PIXELS,nt),D.pixelStorei(D.UNPACK_SKIP_ROWS,Ke),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Fe),B===0&&L.generateMipmaps&&D.generateMipmap(D.TEXTURE_2D),X.unbindTexture()},this.copyTextureToTexture3D=function(S,L,U=null,G=null,B=0){let k,q,re,he,ue,J,de,Re,De;S.isTexture!==!0&&(Rr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),U=arguments[0]||null,G=arguments[1]||null,S=arguments[2],L=arguments[3],B=arguments[4]||0);const Ie=S.isCompressedTexture?S.mipmaps[B]:S.image;U!==null?(k=U.max.x-U.min.x,q=U.max.y-U.min.y,re=U.max.z-U.min.z,he=U.min.x,ue=U.min.y,J=U.min.z):(k=Ie.width,q=Ie.height,re=Ie.depth,he=0,ue=0,J=0),G!==null?(de=G.x,Re=G.y,De=G.z):(de=0,Re=0,De=0);const nt=vt.convert(L.format),Ke=vt.convert(L.type);let Fe;if(L.isData3DTexture)ae.setTexture3D(L,0),Fe=D.TEXTURE_3D;else{if(!L.isDataArrayTexture&&!L.isCompressedArrayTexture)return void console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");ae.setTexture2DArray(L,0),Fe=D.TEXTURE_2D_ARRAY}D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,L.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,L.unpackAlignment);const et=D.getParameter(D.UNPACK_ROW_LENGTH),lt=D.getParameter(D.UNPACK_IMAGE_HEIGHT),We=D.getParameter(D.UNPACK_SKIP_PIXELS),Ne=D.getParameter(D.UNPACK_SKIP_ROWS),zt=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,Ie.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,Ie.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,he),D.pixelStorei(D.UNPACK_SKIP_ROWS,ue),D.pixelStorei(D.UNPACK_SKIP_IMAGES,J),S.isDataTexture||S.isData3DTexture?D.texSubImage3D(Fe,B,de,Re,De,k,q,re,nt,Ke,Ie.data):L.isCompressedArrayTexture?D.compressedTexSubImage3D(Fe,B,de,Re,De,k,q,re,nt,Ie.data):D.texSubImage3D(Fe,B,de,Re,De,k,q,re,nt,Ke,Ie),D.pixelStorei(D.UNPACK_ROW_LENGTH,et),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,lt),D.pixelStorei(D.UNPACK_SKIP_PIXELS,We),D.pixelStorei(D.UNPACK_SKIP_ROWS,Ne),D.pixelStorei(D.UNPACK_SKIP_IMAGES,zt),B===0&&L.generateMipmaps&&D.generateMipmap(Fe),X.unbindTexture()},this.initRenderTarget=function(S){ve.get(S).__webglFramebuffer===void 0&&ae.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?ae.setTextureCube(S,0):S.isData3DTexture?ae.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?ae.setTexture2DArray(S,0):ae.setTexture2D(S,0),X.unbindTexture()},this.resetState=function(){P=0,C=0,w=null,X.reset(),it.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Si}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===xs?"display-p3":"srgb",t.unpackColorSpace=Je.workingColorSpace===Hr?"display-p3":"srgb"}}class ku extends ft{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new bt,this.environmentIntensity=1,this.environmentRotation=new bt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}new T;new T;new T;new T;new ze;new ze;new Le;new T;new T;new T;new ze;new ze;new ze;new T;new T;new T;new $e;new $e;new T;new Le;new T;new mn;new Le;new Zi;class Wu extends _t{constructor(e=null,t=1,n=1,r,a,o,l,s,c=1003,u=1003,p,h){super(null,o,l,s,c,u,r,a,p,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}new Le;new Le;class yo extends Pt{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const ci=new Le,Eo=new Le,Mr=[],bo=new fn,Xu=new Le,Bi=new ot,zi=new mn;class di extends ot{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new yo(new Float32Array(16*n),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,Xu)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new fn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ci),bo.copy(e.boundingBox).applyMatrix4(ci),this.boundingBox.union(bo)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new mn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,ci),zi.copy(e.boundingSphere).applyMatrix4(ci),this.boundingSphere.union(zi)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,3*e)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,16*e)}getMorphAt(e,t){const n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,a=e*(n.length+1)+1;for(let o=0;o<n.length;o++)n[o]=r[a+o]}raycast(e,t){const n=this.matrixWorld,r=this.count;if(Bi.geometry=this.geometry,Bi.material=this.material,Bi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),zi.copy(this.boundingSphere),zi.applyMatrix4(n),e.ray.intersectsSphere(zi)!==!1))for(let a=0;a<r;a++){this.getMatrixAt(a,ci),Eo.multiplyMatrices(n,ci),Bi.matrixWorld=Eo,Bi.raycast(e,Mr);for(let o=0,l=Mr.length;o<l;o++){const s=Mr[o];s.instanceId=a,s.object=this,t.push(s)}Mr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new yo(new Float32Array(3*this.instanceMatrix.count).fill(1),3)),t.toArray(this.instanceColor.array,3*e)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,16*e)}setMorphAt(e,t){const n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Wu(new Float32Array(r*this.count),r,this.count,ms,en));const a=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const l=this.geometry.morphTargetsRelative?1:1-o,s=r*e;a[s]=l,a.set(n,s+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}new Le;new Le;new Le;new Oe(1,1,1);new Le;new Gr;new fn;new mn;new T;new T;new T;new ot;class hl extends bi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Oe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Or=new T,Fr=new T,To=new Le,Hi=new Zi,Sr=new mn,ba=new T,wo=new T;class ju extends ft{constructor(e=new Tt,t=new hl){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,a=t.count;r<a;r++)Or.fromBufferAttribute(t,r-1),Fr.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Or.distanceTo(Fr);e.setAttribute("lineDistance",new ut(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,a=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Sr.copy(n.boundingSphere),Sr.applyMatrix4(r),Sr.radius+=a,e.ray.intersectsSphere(Sr)===!1)return;To.copy(r).invert(),Hi.copy(e.ray).applyMatrix4(To);const l=a/((this.scale.x+this.scale.y+this.scale.z)/3),s=l*l,c=this.isLineSegments?2:1,u=n.index,p=n.attributes.position;if(u!==null){const h=Math.max(0,o.start),d=Math.min(u.count,o.start+o.count);for(let m=h,_=d-1;m<_;m+=c){const g=u.getX(m),f=u.getX(m+1),M=yr(this,e,Hi,s,g,f);M&&t.push(M)}if(this.isLineLoop){const m=u.getX(d-1),_=u.getX(h),g=yr(this,e,Hi,s,m,_);g&&t.push(g)}}else{const h=Math.max(0,o.start),d=Math.min(p.count,o.start+o.count);for(let m=h,_=d-1;m<_;m+=c){const g=yr(this,e,Hi,s,m,m+1);g&&t.push(g)}if(this.isLineLoop){const m=yr(this,e,Hi,s,d-1,h);m&&t.push(m)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){const n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function yr(i,e,t,n,r,a){const o=i.geometry.attributes.position;if(Or.fromBufferAttribute(o,r),Fr.fromBufferAttribute(o,a),t.distanceSqToSegment(Or,Fr,ba,wo)>n)return;ba.applyMatrix4(i.matrixWorld);const l=e.ray.origin.distanceTo(ba);return l<e.near||l>e.far?void 0:{distance:l,point:wo.clone().applyMatrix4(i.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:i}}new T;new T;new Le;new Zi;new mn;new T;class dl extends _t{constructor(e,t,n,r,a,o,l,s,c){super(e,t,n,r,a,o,l,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}new T;class Wn extends Tt{constructor(e=1,t=1,n=1,r=32,a=1,o=!1,l=0,s=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:a,openEnded:o,thetaStart:l,thetaLength:s};const c=this;r=Math.floor(r),a=Math.floor(a);const u=[],p=[],h=[],d=[];let m=0;const _=[],g=n/2;let f=0;function M(v){const x=m,P=new ze,C=new T;let w=0;const K=v===!0?e:t,F=v===!0?1:-1;for(let $=1;$<=r;$++)p.push(0,g*F,0),h.push(0,F,0),d.push(.5,.5),m++;const Y=m;for(let $=0;$<=r;$++){const O=$/r*s+l,ee=Math.cos(O),j=Math.sin(O);C.x=K*j,C.y=g*F,C.z=K*ee,p.push(C.x,C.y,C.z),h.push(0,F,0),P.x=.5*ee+.5,P.y=.5*j*F+.5,d.push(P.x,P.y),m++}for(let $=0;$<r;$++){const O=x+$,ee=Y+$;v===!0?u.push(ee,ee+1,O):u.push(ee+1,ee,O),w+=3}c.addGroup(f,w,v===!0?1:2),f+=w}(function(){const v=new T,x=new T;let P=0;const C=(t-e)/n;for(let w=0;w<=a;w++){const K=[],F=w/a,Y=F*(t-e)+e;for(let $=0;$<=r;$++){const O=$/r,ee=O*s+l,j=Math.sin(ee),te=Math.cos(ee);x.x=Y*j,x.y=-F*n+g,x.z=Y*te,p.push(x.x,x.y,x.z),v.set(j,C,te).normalize(),h.push(v.x,v.y,v.z),d.push(O,1-F),K.push(m++)}_.push(K)}for(let w=0;w<r;w++)for(let K=0;K<a;K++){const F=_[K][w],Y=_[K+1][w],$=_[K+1][w+1],O=_[K][w+1];e>0&&(u.push(F,Y,O),P+=3),t>0&&(u.push(Y,$,O),P+=3)}c.addGroup(f,P,0),f+=P})(),o===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(u),this.setAttribute("position",new ut(p,3)),this.setAttribute("normal",new ut(h,3)),this.setAttribute("uv",new ut(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Wn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Br extends Wn{constructor(e=1,t=1,n=32,r=1,a=!1,o=0,l=2*Math.PI){super(0,e,t,n,r,a,o,l),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l}}static fromJSON(e){return new Br(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class bs extends Tt{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};const a=[],o=[];function l(h,d,m,_){const g=_+1,f=[];for(let M=0;M<=g;M++){f[M]=[];const v=h.clone().lerp(m,M/g),x=d.clone().lerp(m,M/g),P=g-M;for(let C=0;C<=P;C++)f[M][C]=C===0&&M===g?v:v.clone().lerp(x,C/P)}for(let M=0;M<g;M++)for(let v=0;v<2*(g-M)-1;v++){const x=Math.floor(v/2);v%2==0?(s(f[M][x+1]),s(f[M+1][x]),s(f[M][x])):(s(f[M][x+1]),s(f[M+1][x+1]),s(f[M+1][x]))}}function s(h){a.push(h.x,h.y,h.z)}function c(h,d){const m=3*h;d.x=e[m+0],d.y=e[m+1],d.z=e[m+2]}function u(h,d,m,_){_<0&&h.x===1&&(o[d]=h.x-1),m.x===0&&m.z===0&&(o[d]=_/2/Math.PI+.5)}function p(h){return Math.atan2(h.z,-h.x)}(function(h){const d=new T,m=new T,_=new T;for(let g=0;g<t.length;g+=3)c(t[g+0],d),c(t[g+1],m),c(t[g+2],_),l(d,m,_,h)})(r),function(h){const d=new T;for(let m=0;m<a.length;m+=3)d.x=a[m+0],d.y=a[m+1],d.z=a[m+2],d.normalize().multiplyScalar(h),a[m+0]=d.x,a[m+1]=d.y,a[m+2]=d.z}(n),function(){const h=new T;for(let m=0;m<a.length;m+=3){h.x=a[m+0],h.y=a[m+1],h.z=a[m+2];const _=p(h)/2/Math.PI+.5,g=(d=h,Math.atan2(-d.y,Math.sqrt(d.x*d.x+d.z*d.z))/Math.PI+.5);o.push(_,1-g)}var d;(function(){const m=new T,_=new T,g=new T,f=new T,M=new ze,v=new ze,x=new ze;for(let P=0,C=0;P<a.length;P+=9,C+=6){m.set(a[P+0],a[P+1],a[P+2]),_.set(a[P+3],a[P+4],a[P+5]),g.set(a[P+6],a[P+7],a[P+8]),M.set(o[C+0],o[C+1]),v.set(o[C+2],o[C+3]),x.set(o[C+4],o[C+5]),f.copy(m).add(_).add(g).divideScalar(3);const w=p(f);u(M,C+0,m,w),u(v,C+2,_,w),u(x,C+4,g,w)}})(),function(){for(let m=0;m<o.length;m+=6){const _=o[m+0],g=o[m+2],f=o[m+4],M=Math.max(_,g,f),v=Math.min(_,g,f);M>.9&&v<.1&&(_<.2&&(o[m+0]+=1),g<.2&&(o[m+2]+=1),f<.2&&(o[m+4]+=1))}}()}(),this.setAttribute("position",new ut(a,3)),this.setAttribute("normal",new ut(a.slice(),3)),this.setAttribute("uv",new ut(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bs(e.vertices,e.indices,e.radius,e.details)}}new T;new T;new T;new Ot;class Ts extends bs{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2;super([-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Ts(e.radius,e.detail)}}class kr extends Tt{constructor(e=1,t=32,n=16,r=0,a=2*Math.PI,o=0,l=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:a,thetaStart:o,thetaLength:l},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const s=Math.min(o+l,Math.PI);let c=0;const u=[],p=new T,h=new T,d=[],m=[],_=[],g=[];for(let f=0;f<=n;f++){const M=[],v=f/n;let x=0;f===0&&o===0?x=.5/t:f===n&&s===Math.PI&&(x=-.5/t);for(let P=0;P<=t;P++){const C=P/t;p.x=-e*Math.cos(r+C*a)*Math.sin(o+v*l),p.y=e*Math.cos(o+v*l),p.z=e*Math.sin(r+C*a)*Math.sin(o+v*l),m.push(p.x,p.y,p.z),h.copy(p).normalize(),_.push(h.x,h.y,h.z),g.push(C+x,1-v),M.push(c++)}u.push(M)}for(let f=0;f<n;f++)for(let M=0;M<t;M++){const v=u[f][M+1],x=u[f][M],P=u[f+1][M],C=u[f+1][M+1];(f!==0||o>0)&&d.push(v,x,C),(f!==n-1||s<Math.PI)&&d.push(x,P,C)}this.setIndex(d),this.setAttribute("position",new ut(m,3)),this.setAttribute("normal",new ut(_,3)),this.setAttribute("uv",new ut(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new kr(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class qi extends Tt{constructor(e=1,t=.4,n=12,r=48,a=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:a},n=Math.floor(n),r=Math.floor(r);const o=[],l=[],s=[],c=[],u=new T,p=new T,h=new T;for(let d=0;d<=n;d++)for(let m=0;m<=r;m++){const _=m/r*a,g=d/n*Math.PI*2;p.x=(e+t*Math.cos(g))*Math.cos(_),p.y=(e+t*Math.cos(g))*Math.sin(_),p.z=t*Math.sin(g),l.push(p.x,p.y,p.z),u.x=e*Math.cos(_),u.y=e*Math.sin(_),h.subVectors(p,u).normalize(),s.push(h.x,h.y,h.z),c.push(m/r),c.push(d/n)}for(let d=1;d<=n;d++)for(let m=1;m<=r;m++){const _=(r+1)*d+m-1,g=(r+1)*(d-1)+m-1,f=(r+1)*(d-1)+m,M=(r+1)*d+m;o.push(_,g,M),o.push(g,f,M)}this.setIndex(o),this.setAttribute("position",new ut(l,3)),this.setAttribute("normal",new ut(s,3)),this.setAttribute("uv",new ut(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new qi(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Mt extends bi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Oe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new ze(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new bt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ws extends ft{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Oe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class qu extends ws{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Oe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Ta=new Le,Ao=new T,Ro=new T;class pl{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ze(512,512),this.map=null,this.mapPass=null,this.matrix=new Le,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Gr,this._frameExtents=new ze(1,1),this._viewportCount=1,this._viewports=[new $e(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Ao.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ao),Ro.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ro),t.updateMatrixWorld(),Ta.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ta),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ta)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),this.mapSize.x===512&&this.mapSize.y===512||(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Co=new Le,Gi=new T,wa=new T;class Yu extends pl{constructor(){super(new Nt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ze(4,2),this._viewportCount=6,this._viewports=[new $e(2,1,1,1),new $e(0,1,1,1),new $e(3,1,1,1),new $e(1,1,1,1),new $e(3,0,1,1),new $e(1,0,1,1)],this._cubeDirections=[new T(1,0,0),new T(-1,0,0),new T(0,0,1),new T(0,0,-1),new T(0,1,0),new T(0,-1,0)],this._cubeUps=[new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,0,1),new T(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,r=this.matrix,a=e.distance||n.far;a!==n.far&&(n.far=a,n.updateProjectionMatrix()),Gi.setFromMatrixPosition(e.matrixWorld),n.position.copy(Gi),wa.copy(n.position),wa.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(wa),n.updateMatrixWorld(),r.makeTranslation(-Gi.x,-Gi.y,-Gi.z),Co.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Co)}}class Ku extends ws{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new Yu}get power(){return 4*this.intensity*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Zu extends pl{constructor(){super(new ys(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ju extends ws{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ft.DEFAULT_UP),this.updateMatrix(),this.target=new ft,this.shadow=new Zu}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}new Le;new Le;new Le;new T;new T;new T;new T;new T;new T;const fl="\\[\\]\\.:\\/",Aa="[^"+fl+"]",$u="[^"+fl.replace("\\.","")+"]";new RegExp("^"+/((?:WC+[\/:])*)/.source.replace("WC",Aa)+/(WCOD+)?/.source.replace("WCOD",$u)+/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Aa)+/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Aa)+"$");const Po=new Le;class Qu{constructor(e,t,n=0,r=1/0){this.ray=new Zi(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new Ms,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Po.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Po),this}intersectObject(e,t=!0,n=[]){return cs(e,this,n,t),n.sort(Lo),n}intersectObjects(e,t=!0,n=[]){for(let r=0,a=e.length;r<a;r++)cs(e[r],this,n,t);return n.sort(Lo),n}}function Lo(i,e){return i.distance-e.distance}function cs(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){const a=i.children;for(let o=0,l=a.length;o<l;o++)cs(a[o],e,t,!0)}}new ze;new T;new T;new T;new T;new Le;new Le;new T;new Oe;new Oe;new T;new T;new T;new T;new Ss;new fn;new T;typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ca}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ca);const z={cyl:new Wn(1,1,1,24),cyl8:new Wn(1,1,1,8),cone:new Br(1,1,16),pyr:new Br(1,1,4),box:new jn(1,1,1),sph:new kr(1,12,9),tore:new qi(1,.08,6,24),plan:new Ti(1,1)},Xn=new Map,eh=i=>{for(const e of Xn.values())if(e===i)return!0;return!1};function th(){var i;for(const e of Xn.values())(i=e.map)==null||i.dispose(),e.dispose();Xn.clear()}const se=(i,e=.7,t=0,n=0)=>{const r=`${i}|${e}|${t}|${n}`;let a=Xn.get(r);return a||(a=new Mt({color:i,roughness:e,metalness:t}),n&&(a.emissive=new Oe(i),a.emissiveIntensity=n),Xn.set(r,a)),a},Xe=()=>se("#C9A74E",.32,.75),us=()=>se("#E3C9A0",.7),bn=()=>se("#5A3A26",.65),hs=()=>se("#FAF5EA",.9),jt=()=>se("#1C1A20",.5,.2),Pr=["#E8C3A0","#C99A72","#9A6B4A","#F0CFB0"];function fi(i){return(e,t,n,r,a,o,l=o,s=o)=>{const c=new ot(e,t);return c.position.set(n,r,a),c.scale.set(o,l,s),c.castShadow=!0,c.receiveShadow=!0,i.add(c),c}}function gi(i,e,t,n,r,a=0,o=1){i(z.cone,se(r,.85),e,t+.36*o,n,.2*o,.72*o,.2*o),i(z.sph,se(Pr[a%4],.8),e,t+.82*o,n,.11*o),i(z.sph,se(a%3===0?"#2b1d16":"#3a2a20",.9),e,t+.87*o,n-.02*o,.115*o,.09*o,.115*o)}const Ra=()=>se("#FFD98A",.4,0,1.4);function nh(i,e,t){const n=fi(i),r=e.hw>=e.hd,a=(r?e.hw:e.hd)*2,o=(r?e.hd:e.hw)*2,l=new Bt;r||(l.rotation.y=Math.PI/2),i.add(l);const s=fi(l),c=e.id,u=se(t.accent,.6);se(t.deco,.35,.6);const p=se(t.nappe,.95),h=se(t.fleurs,.8);if(c==="estrade")s(z.box,se("#6B4A33",.7),0,.15,0,a,.3,o),s(z.box,Xe(),0,.31,o/2-.02,a,.03,.04),s(z.box,u,0,.305,0,a*.9,.012,o*.8),s(z.box,se("#6B4A33",.7),0,.07,o/2+.2,Math.min(1.4,a*.4),.15,.4),s(z.box,bn(),-a*.28,.75,-o*.15,.4,.9,.3),s(z.box,Xe(),-a*.28,1.21,-o*.15,.44,.03,.34);else if(c==="dj"){s(z.box,jt(),0,.45,0,a*.6,.9,o*.55),s(z.box,u,0,.92,o*.28,a*.6,.02,.02);for(const d of[-1,1])s(z.cyl,jt(),d*a*.12,.94,0,.17,.03,.17),s(z.cyl,Xe(),d*a*.12,.96,0,.04,.02,.04);s(z.box,se("#2a2a33",.4),0,.95,0,.18,.04,.3),s(z.box,se("#cfd6e0",.3,.5),0,1.08,-o*.15,.4,.02,.28).rotation.x=-.9;for(const d of[-1,1])s(z.box,jt(),d*a*.46,.55,0,.3,1.1,.3),s(z.cyl,se("#3a3a44",.6),d*a*.46,.75,o*.16,.09,.02,.09).rotation.x=Math.PI/2,s(z.cyl,se("#3a3a44",.6),d*a*.46,.4,o*.16,.12,.02,.12).rotation.x=Math.PI/2;gi(s,0,0,-o*.5,"#1c1a20",2)}else if(c==="regie"){s(z.box,bn(),0,.37,0,a,.06,o*.9);for(const d of[-1,1])s(z.box,bn(),d*(a/2-.05),.18,0,.06,.36,o*.9);for(const d of[-.5,0,.5])s(z.box,jt(),d*a*.4,.62,-.1,.4,.26,.03),s(z.box,se("#E8C27A",.3,0,.8),d*a*.4,.62,-.085,.36,.22,.01);s(z.box,se("#cfd6e0",.3,.5),0,.4,.15,a*.5,.02,.16)}else if(c==="orch"){s(z.box,se("#6B4A33",.7),0,.15,0,a,.3,o),s(z.box,Xe(),0,.31,o/2-.02,a,.03,.04);const d=Math.max(3,Math.min(5,Math.round(a/.9)));for(let m=0;m<d;m++){const _=((m+.5)/d-.5)*a*.85,g=s;g(z.cone,se(m%2?"#1c1a20":"#F6EFDD",.85),_,.3+.36,0,.2,.72,.2),g(z.sph,se(Pr[m%4],.8),_,.3+.82,0,.11),g(z.sph,se("#2b1d16",.9),_,.3+.87,-.02,.115,.09,.115),m%2===0?(g(z.sph,se("#8a4a24",.45),_,.3+.5,.2,.17,.1,.12),g(z.box,bn(),_+.18,.3+.62,.22,.28,.03,.03)):g(z.cyl,se("#d8c9a8",.6),_,.3+.35,.25,.13,.3,.13)}}else if(c==="troupe"){const d=["#C9A74E","#9C4A2C","#1F5A4C","#F1E6CE","#9C4A2C"];for(let m=0;m<5;m++){const _=(m-2)*.32,g=m%2*.22-.1;s(z.cone,se(d[m],.85),_,.4,g,.2,.8,.2),s(z.sph,se(Pr[m%4],.8),_,.9,g,.11),s(z.cyl,se(m%2?"#9C4A2C":"#C9A74E",.5),_,.98,g,.14,.1,.14)}s(z.cyl,se("#8a5a30",.7),-.65,.35,.3,.15,.2,.15),s(z.cyl,se("#8a5a30",.7),.65,.35,.3,.15,.2,.15)}else if(c==="photobooth"){s(z.box,jt(),0,2/2,-o/2+.05,a,2,.08);for(const m of[-1,1])s(z.box,jt(),m*(a/2-.05),2/2,0,.08,2,o);s(z.box,bn(),0,2+.04,0,a+.1,.08,o+.1),s(z.box,Xe(),0,2-.1,o/2,a,.05,.03),s(z.box,u,-a/2+.2,2*.55,o/2-.05,.4,2*.8,.04),s(z.box,se("#FFF4D0",.3,0,1.2),0,2-.25,-o/2+.12,a*.6,.1,.04),s(z.tore,Xe(),0,1.2,-o/2+.14,.18,.18,.4),s(z.box,se("#FFF4D0",.8),0,.1,0,a-.2,.2,o-.2)}else if(c==="candy"){s(z.box,p,0,.33,0,a,.66,o*.7),s(z.box,Xe(),0,.67,o*.35,a,.025,.03);const d=["#E8A6B0","#F4D774","#9DD3C8","#C9A0DC"];for(let m=0;m<6;m++){const _=((m+.5)/6-.5)*a*.9,g=d[m%4];s(z.cyl,se("#E8F2F4",.1,0,0),_,.9,0,.1,.4,.1).material=se("#DCEBF0",.1),s(z.cyl,se(g,.5),_,.84,0,.085,.26,.085),s(z.cyl,Xe(),_,1.12,0,.07,.04,.07)}s(z.box,se("#F6EFDD",.8),0,1.3,-o*.33,a,.04,.3),s(z.box,us(),0,.65,-o*.33,a,1.3,.04)}else if(c==="the"){s(z.box,us(),0,.4,0,a,.8,o*.7),s(z.cyl,Xe(),-a*.2,.84,0,.3,.03,.3);for(let d=0;d<3;d++){const m=-a*.2+(d-1)*.2;s(z.cyl,Xe(),m,.97,0,.09,.2,.09),s(z.sph,Xe(),m,1.1,0,.07),s(z.box,Xe(),m+.1,1,0,.1,.02,.02).rotation.z=.5}for(let d=0;d<6;d++)s(z.cyl,se("#E8D9B0",.2,0,0),a*.15+d%3*.12,.88,(Math.floor(d/3)-.5)*.15,.035,.07,.035);s(z.cyl8,Xe(),a*.4,1.2,-o*.2,.01,.8,.01),s(z.cyl,se("#FFD98A",.3,0,1.2),a*.4,1,-o*.2,.08,.14,.08)}else if(c==="salon"){s(z.box,se(t.accent,.95),0,.01,.1,a,.02,o);const d=(m,_,g,f,M)=>{const v=new Bt;v.position.set(m,0,_),v.rotation.y=M,l.add(v);const x=fi(v);x(z.box,se("#9C4A2C",.9),0,.2,0,g,.4,f),x(z.box,se("#9C4A2C",.9),0,.5,-f*.42,g,.4,f*.18);for(let P=0;P<Math.max(2,Math.floor(g/.55));P++)x(z.box,se(P%2?"#C9A74E":"#1F5A4C",.9),((P+.5)/Math.max(2,Math.floor(g/.55))-.5)*g*.9,.5,f*.1,.3,.25,.1)};d(0,-o*.4,a*.95,.5,0),d(-a*.45,0,o*.6,.5,Math.PI/2),d(a*.45,0,o*.6,.5,-Math.PI/2),s(z.cyl,Xe(),0,.25,.1,.32,.05,.32),s(z.cyl8,Xe(),0,.12,.1,.06,.24,.06)}else if(c==="fontaine"){const d=e.hw;s(z.cyl8,se("#1F5A4C",.4),0,.17,0,d,.34,d),s(z.cyl8,se("#F1E6CE",.5),0,.35,0,d*.92,.04,d*.92),s(z.cyl,se("#7fd0e0",.05,.1),0,.33,0,d*.82,.04,d*.82),s(z.cyl8,se("#F1E6CE",.5),0,.6,0,.12,.5,.12),s(z.cyl,se("#1F5A4C",.4),0,.88,0,.32,.1,.32),s(z.cyl,se("#9fe0ee",.05,.1,.2),0,.94,0,.27,.03,.27),s(z.sph,se("#bfeaf5",.1,0,.4),0,1.1,0,.07,.14,.07)}else if(c==="gateau")[[.5,.3],[.38,.28],[.27,.26]].forEach(([d,m],_)=>{const g=.3+[0,.3,.58][_];s(z.cyl,_%2?se("#F6EFDD",.6):hs(),0,g+m/2,0,d*.85,m,d*.85),s(z.tore,Xe(),0,g+.02,0,d*.86,d*.86,.5).rotation.x=Math.PI/2}),s(z.cyl,p,0,.15,0,.46,.3,.46),s(z.sph,h,0,.95,0,.1);else if(c==="amariya"){const d=a*.6,m=o*.7,_=1.9;s(z.box,se("#6B4A33",.7),0,.18,0,d,.18,m),s(z.box,u,0,.32,0,d*.8,.1,m*.8);for(const g of[-1,1])for(const f of[-1,1])s(z.cyl8,Xe(),g*(d/2-.08),_/2,f*(m/2-.08),.04,_,.04);s(z.pyr,Xe(),0,_+.2,0,d*.78,.5,m*.78).rotation.y=Math.PI/4,s(z.box,u,0,_-.02,0,d+.1,.06,m+.1);for(const g of[-1,1])s(z.box,se("#9C4A2C",.9),0,_*.55,g*(m/2-.1),d*.85,_*.6,.02);for(const g of[-1,1])s(z.cyl8,bn(),0,.12,g*(m/2+.25),d*.5+.2,.025,.025).rotation.z=Math.PI/2;s(z.box,se("#F6EFDD",.8),0,.5,0,.5,.3,.35)}else if(c==="neggafa")s(z.cone,se("#C9A74E",.5,.3),0,.5,0,.42,1,.42),s(z.cone,se("#9C4A2C",.85),0,.55,.02,.32,.9,.3),s(z.sph,se(Pr[1],.8),0,1.12,0,.12),s(z.cyl,Xe(),0,1.25,0,.14,.1,.14),s(z.tore,Xe(),0,.72,.28,.16,.16,.5).rotation.x=Math.PI/2;else if(c==="fauteuils"){s(z.box,se("#6B4A33",.7),0,.1,0,a,.2,o),s(z.box,u,0,.21,.05,a*.9,.02,o*.85);for(const d of[-1,1]){const m=d*a*.22;s(z.box,se("#F6EFDD",.8),m,.45,.02,.55,.3,.5),s(z.box,se("#F6EFDD",.8),m,.9,-.2,.55,.8,.1),s(z.tore,Xe(),m,1.05,-.14,.26,.26,.4);for(const _ of[-1,1])s(z.box,se("#F6EFDD",.8),m+_*.3,.55,.02,.08,.3,.45)}s(z.cyl,se("#9C4A2C",.9),0,.3,.3,.12,.2,.12),s(z.sph,h,0,.5,.3,.14,.1,.14)}else if(c==="henne"){s(z.box,se(t.accent,.95),0,.01,0,a,.02,o);for(const[d,m,_,g]of[[0,-o*.38,a*.95,0],[-a*.4,0,o*.7,Math.PI/2]]){const f=new Bt;f.position.set(d,0,m),f.rotation.y=g,l.add(f);const M=fi(f);M(z.box,se("#9C4A2C",.9),0,.2,0,_,.4,.5),M(z.box,se("#9C4A2C",.9),0,.5,-.2,_,.4,.1);for(let v=0;v<4;v++)M(z.box,se(v%2?"#C9A74E":"#F1E6CE",.9),((v+.5)/4-.5)*_*.85,.5,0,.3,.25,.1)}s(z.cyl,Xe(),.1,.2,.1,.34,.04,.34),s(z.cyl8,Xe(),.1,.1,.1,.06,.2,.06);for(let d=0;d<4;d++)s(z.cone,se("#7a4a22",.7),.1+(d-1.5)*.1,.27,.1,.025,.1,.025).rotation.z=1.2}else if(c==="livre")s(z.cyl,Xe(),0,.5,0,.18,1,.18),s(z.box,se("#F6EFDD",.7),-.1,1.04,0,.2,.03,.28).rotation.z=.12,s(z.box,se("#F6EFDD",.7),.1,1.04,0,.2,.03,.28).rotation.z=-.12,s(z.box,se("#9C4A2C",.8),0,1.01,0,.44,.02,.32),s(z.cyl8,Xe(),.3,1.1,.05,.01,.2,.01).rotation.z=1.1;else if(c.startsWith("mic"))s(z.cyl,jt(),0,.02,0,.14,.04,.14),s(z.cyl8,se("#cfd6e0",.3,.6),0,.6,0,.012,1.2,.012),s(z.sph,se("#2a2a33",.4),0,1.25,0,.05);else if(c==="enceintes")s(z.box,jt(),0,.55,0,.5,1.1,.4),s(z.cyl,se("#3a3a44",.6),0,.8,.205,.14,.02,.14).rotation.x=Math.PI/2,s(z.cyl,se("#3a3a44",.6),0,.4,.205,.18,.02,.18).rotation.x=Math.PI/2;else if(c==="acoustique")s(z.cyl,bn(),0,.3,0,.14,.6,.14),gi(n,0,0,0,"#3d352e",1,1),s(z.sph,se("#a55a28",.4),.14,.55,.16,.15,.1,.07),s(z.box,bn(),.35,.8,.16,.34,.03,.03).rotation.z=.5;else if(c==="photographe")gi(n,0,0,0,"#1f1d22",0,1.05),s(z.box,jt(),.1,.8,.16,.16,.1,.1),s(z.cyl,jt(),.1,.8,.26,.04,.06,.04).rotation.x=Math.PI/2;else if(c==="interv"){s(z.box,p,0,.36,0,a,.72,o*.6),s(z.box,Xe(),0,.73,o*.3,a,.025,.03);for(let d=0;d<3;d++){const m=((d+.5)/3-.5)*a*.8;s(z.box,se("#F6EFDD",.7),m,.3,-o*.55,.3,.05,.3),s(z.box,se("#F6EFDD",.7),m,.6,-o*.7,.3,.45,.04),s(z.cyl,se("#E8F2F4",.1),m+.12,.82,.05,.035,.18,.035)}}else if(c==="enfants"){s(z.box,se("#9DD3C8",.95),0,.015,0,a,.03,o);const d=["#E8A6B0","#F4D774","#C9A0DC","#9DD3C8"];for(let m=0;m<5;m++)s(z.box,se(d[m%4],.8),(m-2)*.45,.13,(m%2-.5)*.7,.26,.26,.26).rotation.y=m;s(z.pyr,se("#F6EFDD",.9),-a*.3,.55,-o*.25,.7,1.1,.7).rotation.y=Math.PI/4,s(z.sph,se("#E8A6B0",.4),a*.3,.2,o*.2,.2)}else return!1;return!0}function ih(i,e,t){const n=new Bt,r=i.salle.pos,a=i.salle.n,o=fi(n),l=(s,c)=>{const u=new Bt;return u.position.set(s,0,c),n.add(u),fi(u)};if((i.accueils.includes("hotesses")||i.accueils.includes("maitre_hotel"))&&r.HOTESSES.forEach(([s,c],u)=>{gi(l(s,c),0,0,0,e.nappe,u,1.1)}),i.accueils.includes("maitre_hotel")){const[s,c]=r.MAITRE_HOTEL,[u,p]=r.HOTESSE_3;gi(l(s,c),0,0,0,"#1f1d22",3,1.15),gi(l(u,p),0,0,0,e.nappe,0,1.1)}if(i.accueils.includes("the")||i.accueils.includes("discret")){const s=l(r.COMPTOIR[0],r.COMPTOIR[1]);s(z.box,us(),0,.4,0,1.2,.8,.5),s(z.box,Xe(),0,.82,.24,1.2,.03,.03),i.accueils.includes("the")?(s(z.cyl,Xe(),-.2,.96,0,.09,.2,.09),s(z.sph,Xe(),-.2,1.08,0,.07),s(z.cyl,Xe(),.25,.84,0,.2,.03,.2)):s(z.box,se("#F6EFDD",.8),0,.85,0,.5,.04,.3)}if(i.options.has("fleurs")&&r.BOUQUETS.forEach(([s,c])=>{const u=l(s,c);u(z.cyl,Xe(),0,.3,0,.14,.6,.14);for(let p=0;p<7;p++)u(z.sph,se(p%2?e.fleurs:"#FBF6EA",.8),Math.cos(p*.9)*.18,.78+p%3*.08,Math.sin(p*.9)*.18,.13);u(z.sph,se("#4F7A4A",.9),0,.7,0,.2,.1,.2)}),i.lumiere==="bougies"&&r.CANDELABRES.forEach(([s,c])=>{const u=l(s,c);u(z.cyl,Xe(),0,.03,0,.14,.06,.14),u(z.cyl8,Xe(),0,.5,0,.025,1,.025);for(const p of[-.16,0,.16])u(z.cyl8,Xe(),p,.98,0,.012,.06,.012),u(z.cyl8,hs(),p,1.1,0,.018,.16,.018),u(z.sph,Ra(),p,1.22,0,.03,.05,.03);u(z.box,Xe(),0,.98,0,.36,.015,.015)}),i.lumiere==="chaleureuse"&&r.POSTES_LANTERNES.forEach(([s,c])=>{const u=l(s,c);u(z.cyl8,Xe(),0,.9,0,.03,1.8,.03),u(z.cyl,Xe(),0,.03,0,.12,.06,.12),u(z.cyl8,Xe(),0,1.92,0,.1,.18,.1),u(z.cyl8,se("#FFD98A",.3,0,1.3),0,1.78,0,.075,.2,.075),u(z.cone,Xe(),0,2.08,0,.14,.14,.14)}),i.options.has("feux_froids")&&r.FEUX.forEach(([s,c])=>{const u=l(s,c);u(z.cyl,jt(),0,.1,0,.09,.2,.09);for(let p=0;p<6;p++)u(z.sph,se("#BFE3FF",.3,0,1.4),(p-2.5)*.02,.4+p*.22,0,.035+p*.006)}),i.lumiere==="etoilee"){const s=i.salle.ax,c=3,u=[[[.3,a-.5],[.3,.3]],[[.3,.3],[a-.4,.3]],[[.3,a/2+.1],[a-.4,a/2+.1]],[[s-.9,a-.2],[a-.4,a/2+.1]]],p=[];for(const[[m,_],[g,f]]of u){const M=[];for(let x=0;x<=24;x++){const P=x/24;M.push(new T(m+(g-m)*P,c-Math.sin(P*Math.PI)*.35,_+(f-_)*P))}n.add(new ju(new Tt().setFromPoints(M),new hl({color:3813672})));const v=Math.round(Math.hypot(g-m,f-_)*1.3);for(let x=0;x<v;x++){const P=(x+.5)/v;p.push([m+(g-m)*P,c-Math.sin(P*Math.PI)*.35-.06,_+(f-_)*P])}}const h=new di(z.sph,Ra(),p.length),d=new Le;p.forEach(([m,_,g],f)=>{d.compose(new T(m,_,g),new Yt,new T(.05,.05,.05)),h.setMatrixAt(f,d)}),n.add(h);for(const[m,_]of[[.3,a-.5],[.3,.3],[a-.4,.3],[.3,a/2+.1],[a-.4,a/2+.1]])o(z.cyl8,se("#3a3128",.8),m,c/2,_,.03,c,.03)}if(i.lieu==="villa"){const s=t>.5,c=`eau|${s}|${i.options.has("piscine_lumiere")}`;let u=Xn.get(c);if(!u){const p=document.createElement("canvas");p.width=p.height=128;const h=p.getContext("2d");for(let m=0;m<2;m++)for(let _=0;_<2;_++)h.fillStyle=(m+_)%2?"#3FA79C":"#2F8F86",h.fillRect(m*64,_*64,64,64);h.strokeStyle="rgba(240,236,221,0.55)",h.lineWidth=2;for(const[m,_]of[[32,32],[96,96]]){h.beginPath();for(let g=0;g<16;g++){const f=g/16*Math.PI*2-Math.PI/2,M=g%2?8:22;h.lineTo(m+Math.cos(f)*M,_+Math.sin(f)*M)}h.closePath(),h.stroke()}const d=new dl(p);d.colorSpace=It,d.wrapS=d.wrapT=ki,d.repeat.set(10,3),u=new Mt({map:d,color:s?"#2c5f5c":"#ffffff",roughness:.05,metalness:.3}),i.options.has("piscine_lumiere")&&(u.emissive=new Oe("#3FD0C0"),u.emissiveIntensity=.55),Xn.set(c,u)}o(z.box,se("#EFEADF",.6),a/2,-.12,-2.45,a+.4,.3,4.3),o(z.box,u,a/2,0,-2.45,a-.2,.06,3.9);for(let p=0;p<12;p++)o(z.cyl,se(p%2?e.fleurs:"#FBF6EA",.8),.8+p*1.37%(a-1.6),.05,-.9-p*.73%3,i.options.has("piscine_fleurs")?.12:1e-4,.02,i.options.has("piscine_fleurs")?.12:1e-4);if(i.options.has("piscine_bougies"))for(let p=0;p<8;p++)o(z.cyl,hs(),1.2+p*((a-2.4)/8),.1,-1.4-p%3*.9,.05,.1,.05),o(z.sph,Ra(),1.2+p*((a-2.4)/8),.18,-1.4-p%3*.9,.025,.04,.025);for(const p of[a*.12,a*.37,a*.65]){o(z.cyl8,se("#5c4630",.9),p,.8,-3.4,.07,1.6,.07);for(let h=0;h<6;h++){const d=h/6*Math.PI*2;o(z.cone,se("#4F7A4A",.85),p+Math.cos(d)*.5,1.6,-3.4+Math.sin(d)*.5,.12,1,.12).rotation.set(Math.sin(d)*1.2,0,-Math.cos(d)*1.2)}}}return n}function rh(i){const e=i.salle.pos,t=i.options,n=i.salle.n,r=[],a=(s,c,u,p,h=p,d="generique",m=.6)=>r.push({id:s,a:[c,u],hw:p,hd:h,genre:d,h:m}),o=(s,c,u="generique",p=.6)=>a(s,c.gx+c.w/2,c.gy+c.d/2,c.w/2,c.d/2,u,p),l=jr[i.tables];if(i.tables!=="conference"&&i.salle.tables.forEach(([s,c],u)=>a(`t${u}`,s,c,l.dx,l.dy,i.tables==="rondes"?"ronde":i.tables==="rectangulaires"?"rect":"haute")),i.salle.hautes.forEach(([s,c],u)=>a(`th${u}`,s,c,jr.hautes.dx,jr.hautes.dy,"haute")),i.type!=="pro"&&i.type!=="conference"&&i.tables!=="hautes"&&o("honneur",e.HONNEUR,"honneur"),t.has("arche")&&a("arche",e.ARCHE.gx+e.ARCHE.largeur/2,e.ARCHE.gy+.4,e.ARCHE.largeur/2,.4,"arche"),t.has("amariya")&&a("amariya",e.AMARIYA[0]+1.15,e.AMARIYA[1]+.7,1.15,.7,"generique",1.1),t.has("fauteuils")&&a("fauteuils",e.FAUTEUILS[0]+1,e.FAUTEUILS[1]+.6,1,.6,"generique",.8),t.has("neggafa")&&a("neggafa",e.NEGGAFA[0],e.NEGGAFA[1],.45,.45,"generique",.9),t.has("gateau")&&a("gateau",e.GATEAU[0],e.GATEAU[1],.5,.5,"generique",.9),t.has("enfants")&&a("enfants",e.ENFANTS[0]+1.2,e.ENFANTS[1]+1,1.2,1,"generique",.4),t.has("henne")&&a("henne",e.HENNE[0]+1.1,e.HENNE[1]+1.1,1.1,1.1,"generique",.5),t.has("podium")&&o("estrade",e.ESTRADE,"generique",.3),t.has("table_intervenants")&&o("interv",e.INTERVENANTS,"generique",.5),t.has("micros")&&e.MICROS.forEach(([s,c],u)=>a(`mic${u}`,s,c,.3,.3,"generique",1.2)),t.has("regie")&&a("regie",e.REGIE[0]+.9,e.REGIE[1]+.4,.9,.4,"generique",.6),t.has("buffet_sandwichs")){const s=e.SANDWICHS,c=s[0]<=n-2,u=c?2.6:.9,p=c?.9:2.6;a("sandw",s[0]+u/2,s[1]+p/2,u/2,p/2,"buffet")}return i.musiques.includes("dj")&&o("dj",e.DJ,"generique",.7),i.musiques.includes("orchestre")&&o("orch",e.SCENE_ORCHESTRE,"generique",.3),i.musiques.includes("troupe")&&a("troupe",e.TROUPE[0]+.5,e.TROUPE[1]+.5,.6,.5,"generique",1),i.musiques.includes("playlist")&&a("enceintes",(e.ENCEINTES[0][0]+e.ENCEINTES[1][0])/2,.75,.25,.25,"generique",1.1),i.musiques.includes("acoustique")&&a("acoustique",e.ACOUSTIQUE[0]+.5,e.ACOUSTIQUE[1]+.5,.5,.5,"generique",.9),t.has("photobooth")&&o("photobooth",e.PHOTOBOOTH,"generique",1.6),t.has("nawar")&&o("nawar",e.NAWAR,"nawar"),t.has("buffet")&&o("buffet",e.BUFFET,"buffet"),t.has("candy_bar")&&o("candy",e.CANDY,"generique",.7),t.has("the_bar")&&o("the",e.THE_BAR,"generique",.7),t.has("livre_dor")&&a("livre",e.LIVRE_DOR[0],e.LIVRE_DOR[1],.5,.5,"generique",.7),t.has("salon")&&o("salon",e.SALON,"generique",.5),t.has("fontaine")&&a("fontaine",e.FONTAINE[0],e.FONTAINE[1],.9,.9,"generique",.7),t.has("photographe")&&a("photographe",e.PHOTOGRAPHE[0],e.PHOTOGRAPHE[1],.5,.5,"generique",1),t.has("piste")&&o("piste",e.PISTE,"piste"),r}const Do=(i,e)=>[i,e].includes("piste")&&[i,e].some(t=>t==="troupe"||t.startsWith("feu"));function ah(i,e,t,n,r){const a=n.find(u=>u.id===i);if(!a)return!1;const o=.04,l={x0:a.a[0]-a.hw+e,y0:a.a[1]-a.hd+t,x1:a.a[0]+a.hw+e,y1:a.a[1]+a.hd+t},s=u=>l.x0<u.x1-o&&u.x0<l.x1-o&&l.y0<u.y1-o&&u.y0<l.y1-o;for(const u of n){if(u.id===i||Do(i,u.id))continue;const[p,h]=r.deplacements[u.id]??[0,0];if(s({x0:u.a[0]-u.hw+p,y0:u.a[1]-u.hd+h,x1:u.a[0]+u.hw+p,y1:u.a[1]+u.hd+h}))return!0}const c=new Set(n.map(u=>u.id));for(const u of r.salle.pos.obstacles)if(!(/^(pl|cd|enc|feu)\d/.test(u.id)||c.has(u.id)||Do(i,u.id))&&s(u))return!0;return!1}const Xt=(i,e,t)=>i+(e-i)*t,ui=(i,e,t)=>new Oe(i).lerp(new Oe(e),t),Uo=(()=>{const r=.6000000000000001,a=3*(.2-.2)-r,o=1-r-a,l=3*.7,s=3*(1-.7)-l,c=1-l-s;return u=>{let p=u;for(let h=0;h<8;h++){const d=((o*p+a)*p+r)*p-u,m=(3*o*p+2*a)*p+r;if(Math.abs(d)<1e-5||!m)break;p-=d/m}return p=Math.max(0,Math.min(1,p)),((c*p+s)*p+l)*p}})();function Io(i){let e=i>>>0||1;return()=>(e=e*1664525+1013904223>>>0,e/4294967296)}function Vi(i,e,t,n=!0){const r=document.createElement("canvas");r.width=i,r.height=e,t(r.getContext("2d"),i,e);const a=new dl(r);return a.colorSpace=It,n&&(a.wrapS=a.wrapT=ki),a.anisotropy=4,a}function No(i){const e=i.map(([l,s])=>{const c=l.index?l.toNonIndexed():l.clone();return c.applyMatrix4(s),c});let t=0;e.forEach(l=>t+=l.attributes.position.count);const n=new Float32Array(t*3),r=new Float32Array(t*3);let a=0;e.forEach(l=>{n.set(l.attributes.position.array,a*3),r.set(l.attributes.normal.array,a*3),a+=l.attributes.position.count});const o=new Tt;return o.setAttribute("position",new Pt(n,3)),o.setAttribute("normal",new Pt(r,3)),o.computeBoundingSphere(),o}const hn=(i=0,e=0,t=0,n=0,r=1,a=r,o=r,l=0)=>new Le().compose(new T(i,e,t),new Yt().setFromEuler(new bt(l,n,0)),new T(r,a,o)),sh={riad:{a:"#EBDDBF",b:"#D9C398",bord:"#1F5A4C",mur:"#E6D1AB",bande:"#1F5A4C",terre:"#C6A474"},villa:{a:"#B98E65",b:"#AA7F58",bord:"#8A6A47",mur:"#F1EDE4",bande:"#D8D1C2",terre:"#C8C2B2"},rooftop:{a:"#E8E1D6",b:"#DDD4C6",bord:"#9A7650",mur:"#EEE7DA",bande:"#CDC4B2",terre:"#3B3A57"},jardin:{a:"#BBCB8B",b:"#B0C382",bord:"#8FA86A",mur:"#6F8F55",bande:"#587A44",terre:"#9DB873"},salle:{a:"#E6D8BC",b:"#D8C6A2",bord:"#C9A74E",mur:"#F0E6D2",bande:"#C9A74E",terre:"#CDB79A"}};function fh(i,e,t){const n=new Vu({canvas:i,antialias:!0,alpha:!0,powerPreference:"high-performance"});n.setPixelRatio(Math.min(window.devicePixelRatio||1,matchMedia("(pointer: coarse)").matches?1.5:2)),n.setClearColor(0,0),n.toneMapping=zo,n.toneMappingExposure=1.05,n.shadowMap.enabled=!0,n.shadowMap.type=Fo,n.shadowMap.autoUpdate=!1;const r=matchMedia("(pointer: coarse)").matches;let a=["#1f1a22","#0f0d12"];const o=new ku,l=new ys(-1,1,1,-1,.1,300),s=new qu(16770760,9075302,1);o.add(s);const c=new Ju(16761994,2.2);c.castShadow=!0,c.shadow.mapSize.set(r?1024:2048,r?1024:2048),c.shadow.radius=6,c.shadow.bias=-6e-4,c.shadow.normalBias=.03,o.add(c,c.target);let u=4;const p=[0,1,2,3].map(()=>{const R=new Ku(16758886,0,8,1.6);return o.add(R),R}),h={laiton:new Mt({color:13215566,metalness:.75,roughness:.32}),boisClair:new Mt({color:14928288,roughness:.7}),boisSombre:new Mt({color:5913126,roughness:.65}),blanc:new Mt({color:16446954,roughness:.9}),verre:new Mt({color:15254138,roughness:.12,metalness:.1,transparent:!0,opacity:.72}),bougie:new Gn({color:16767370}),refusAnim:new Gn({color:14831182,transparent:!0,opacity:.45,depthWrite:!1}),refus:new Gn({color:14831182,transparent:!0,opacity:.45,depthWrite:!1}),halo:new Gn({color:16045940,transparent:!0,opacity:.22,depthWrite:!1}),libre:new Gn({color:16045940,transparent:!0,opacity:.35,depthWrite:!1})},d={cyl:new Wn(1,1,1,28),cyl8:new Wn(1,1,1,10),box:new jn(1,1,1),sph:new kr(1,10,8),ico:new Ts(1,0),tore:new qi(1,.1,6,28),plan:new Ti(1,1)},m=No([[d.box,hn(0,.3,0,0,.26,.05,.26)],[d.box,hn(-.11,.15,-.11,0,.03,.3,.03)],[d.box,hn(.11,.15,-.11,0,.03,.3,.03)],[d.box,hn(-.11,.15,.11,0,.03,.3,.03)],[d.box,hn(.11,.15,.11,0,.03,.3,.03)],[d.tore,hn(0,.58,-.12,0,.17,.2,.17)],[d.cyl,hn(0,.58,-.12,0,.15,.018,.17,Math.PI/2)],[d.box,hn(0,.4,-.12,0,.03,.2,.03)]]),_=No(Array.from({length:70},(R,A)=>{const ie=Io(A+3);return[d.ico,hn((ie()-.5)*3,-ie()*.45,(ie()-.5)*.5,ie()*3,.05+ie()*.05)]}));function g(R){R.traverse(A=>{var fe;if(A.isInstancedMesh&&A.dispose(),A.isLine){A.geometry.dispose(),A.material.dispose();return}const ie=Array.isArray(A.material)?A.material:A.material?[A.material]:[];for(const Q of ie)!eh(Q)&&!Object.values(h).includes(Q)&&((fe=Q.map)==null||fe.dispose(),Q.dispose())})}let f=null,M=[],v=new Map,x=null,P="";const C=(R,A=!0,ie=!0)=>(R.castShadow=A,R.receiveShadow=ie,R),w=(R,A,ie,fe,Q,Me,Se=Me,S=Me,L=!0)=>{const U=C(new ot(R,A),L);return U.position.set(ie,fe,Q),U.scale.set(Me,Se,S),U};function K(R,A,ie){const fe=new Bt,Q=sh[R],Me=R==="riad"||R==="salle",Se=(J,de,Re,De,Ie)=>{J.beginPath();for(let nt=0;nt<16;nt++){const Ke=nt/16*Math.PI*2-Math.PI/2,Fe=nt%2?Ie:De;J.lineTo(de+Math.cos(Ke)*Fe,Re+Math.sin(Ke)*Fe)}J.closePath()},S=Me?Vi(384,384,(J,de,Re)=>{for(let De=0;De<3;De++)for(let Ie=0;Ie<3;Ie++)J.fillStyle=(De+Ie)%2?Q.b:Q.a,J.fillRect(De*128,Ie*128,128,128);J.globalAlpha=.28,Se(J,192,192,62,30),J.fillStyle="#1F5A4C",J.fill(),J.strokeStyle="#A8933F",J.lineWidth=3,J.stroke(),J.globalAlpha=.07,J.strokeStyle="#000",J.lineWidth=2;for(let De=0;De<3;De++)J.strokeRect(De*128,0,128,Re),J.strokeRect(0,De*128,de,128)}):Vi(256,256,(J,de,Re)=>{J.fillStyle=Q.a,J.fillRect(0,0,de,Re),J.fillStyle=Q.b,J.fillRect(0,0,de/2,Re/2),J.fillRect(de/2,Re/2,de/2,Re/2),J.globalAlpha=.08,J.strokeStyle="#000",J.lineWidth=2,J.strokeRect(0,0,de,Re)});S.repeat.set(Me?A/3:A/2,Me?A/3:A/2);const L=C(new ot(d.box,new Mt({map:S,roughness:.75})),!1,!0);L.scale.set(A,.3,A),L.position.set(A/2,-.15,A/2),fe.add(L);const U=C(new ot(d.box,new Mt({color:Q.bord,roughness:.6})),!1,!0);U.scale.set(A+.4,.28,A+.4),U.position.set(A/2,-.17,A/2),fe.add(U);const G=C(new ot(d.plan,new Mt({color:Q.terre,roughness:1})),!1,!0);G.rotation.x=-Math.PI/2,G.scale.set(A*5,A*5,1),G.position.set(A/2,-.32,A/2),fe.add(G);const B=3.4,k=Vi(512,256,(J,de,Re)=>{J.fillStyle=Q.mur,J.fillRect(0,0,de,Re);for(let De=0;De<16;De++)J.fillStyle=De%2?Me?"#1F5A4C":Q.bande:"#F3ECDD",J.fillRect(De*32,0,32,40),J.fillStyle="#A8933F",J.fillRect(De*32+14,18,4,4);J.fillStyle="#C9A74E",J.fillRect(0,40,de,5),J.fillStyle="#E9DEC5",J.fillRect(0,206,de,42),J.fillStyle="#C9A74E",J.fillRect(0,204,de,3),J.fillRect(0,Re-8,de,8);for(let De=0;De<3;De++){const Ie=40+De*150,nt=(Fe,et,lt)=>{J.beginPath(),J.moveTo(Ie+Fe,lt),J.lineTo(Ie+Fe,120+et),J.quadraticCurveTo(Ie+50,50+et*1.6,Ie+100-Fe,120+et),J.lineTo(Ie+100-Fe,lt),J.closePath()},Ke=J.createLinearGradient(0,70,0,204);Ke.addColorStop(0,"#EDE2C8"),Ke.addColorStop(1,"#D8C7A2"),nt(0,0,204),J.fillStyle=Ke,J.fill(),J.strokeStyle="#C9A74E",J.lineWidth=4,J.stroke(),nt(8,8,204),J.strokeStyle="rgba(120,90,50,0.28)",J.lineWidth=3,J.stroke()}});k.repeat.set(Math.max(1,Math.round(A/8)),1);const q=new Mt({map:k,roughness:.85}),re=C(new ot(d.plan,q),!1,!0),he=R==="villa"?.9:B;re.scale.set(A,he,1),re.position.set(A/2,he/2,0),R==="villa"&&(re.material=new Mt({color:"#EFEADF",roughness:.7,side:Ls})),fe.add(re);const ue=C(new ot(d.plan,q),!1,!0);ue.scale.set(A,B,1),ue.rotation.y=Math.PI/2,ue.position.set(0,B/2,A/2),fe.add(ue);for(const[J,de]of[[.35,.35],[A-.4,.35],[.35,A-.4]])fe.add(w(d.cyl8,h.laiton,J,.45,de,.05,.9),w(d.cyl,h.laiton,J,1,de,.1,.22),w(d.sph,h.bougie,J,1,de,.07,.07,.07,!1));return fe}function F(R,A){let ie=0;for(const fe of R)ie=ie*31+fe.charCodeAt(0)>>>0;return ui(ie%2?A.accent:A.deco,"#3a2a22",.15+ie%5*.07)}function Y(R,A,ie,fe){const Q=new Bt,Me=[],Se=(k,q,re)=>Me.push({x:k,z:q,dos:[-Math.sin(re),-Math.cos(re)]}),S=se(ie.nappe,.95),L=se(ie.fleurs,.8),U=(k,q,re,he)=>{const ue=C(new di(m,he,k)),J=new Le;for(let de=0;de<k;de++){const Re=de/k*Math.PI*2;J.compose(new T(Math.cos(Re)*q,re,Math.sin(Re)*q),new Yt().setFromEuler(new bt(0,-Re-Math.PI/2,0)),new T(1,1,1)),ue.setMatrixAt(de,J)}return ue},G=se("#E3C9A0",.55);if(R.genre==="ronde")Q.add(w(d.cyl,S,0,.21,0,_n,.42,_n)),Q.add(w(d.cyl,S,0,.43,0,_n+.03,.03,_n+.03)),Q.add(w(d.tore,h.laiton,0,.45,0,_n-.12,.6,_n-.12).rotateX(Math.PI/2)),Q.add(w(d.box,se("#9C4A2C",.9),0,.447,0,_n*1.9,.006,.17,!1),w(d.box,se("#1F5A4C",.7),0,.449,0,.17,.006,.17,!1)),Q.add(w(d.sph,L,0,.58,0,.13,.11,.13)),fe&&Q.add(w(d.cyl8,h.bougie,.2,.5,.1,.012,.1,.012,!1)),Q.add(U(10,_n+.22,0,G));else if(R.genre==="rect"){Q.add(w(d.box,S,0,.21,0,1.7,.42,.78)),Q.add(w(d.sph,L,0,.55,0,.12,.1,.12));const k=C(new di(m,G,6)),q=new Le;for(let re=0;re<6;re++){const he=re<3?-1:1,ue=(re%3-1)*.567;q.compose(new T(ue,0,he*.64),new Yt().setFromEuler(new bt(0,he>0?Math.PI:0,0)),new T(1,1,1)),k.setMatrixAt(re,q),Se(ue,he*.64,he>0?Math.PI:0)}Q.add(k)}else if(R.genre==="haute")Q.add(w(d.cyl8,h.laiton,0,.3,0,.04,.6),w(d.cyl,h.laiton,0,.02,0,.2,.04,.2),w(d.cyl,S,0,.62,0,.3,.04,.3)),fe&&Q.add(w(d.cyl8,h.bougie,0,.7,0,.012,.1,.012,!1));else if(R.genre==="honneur"){const k=R.hw*2,q=R.hd*2;Q.add(w(d.box,S,0,.36,0,k,.72,q),w(d.box,se("#1F5A4C",.7),0,.5,q/2+.004,k*.98,.12,.012,!1));for(const he of[.565,.435])Q.add(w(d.box,h.laiton,0,he,q/2+.008,k*.98,.012,.012,!1));Q.add(w(d.box,h.laiton,0,.73,q/2,k+.04,.03,.03,!1),w(d.box,h.laiton,0,.73,-q/2,k+.04,.03,.03,!1));for(const he of[-1,1])Q.add(w(d.box,h.laiton,he*k/2,.73,0,.03,.03,q,!1));if(Q.add(w(d.box,se("#1F5A4C",.7),0,.726,0,k*.94,.008,q*.22,!1)),A.type==="mariage"){const he=C(new di(m,G,2)),ue=new Le;[-.9,.9].forEach((J,de)=>{ue.compose(new T(J,0,-(q/2+.3)),new Yt().setFromEuler(new bt(0,0,0)),new T(1.25,1.25,1.25)),he.setMatrixAt(de,ue),Se(J,-(q/2+.3),0)}),Q.add(he)}Q.add(w(d.box,h.laiton,0,2.3,-q*.1,k*1.05,.03,.03,!1));const re=new ot(_,h.blanc);re.scale.set(k/3,1,1.2),re.position.set(0,2.25,-q*.1),re.castShadow=!0,Q.add(re);for(const he of[-.5,.5])Q.add(w(d.cyl8,h.laiton,he*k*.98,1.15,-q*.1,.02,2.3,.02,!1))}else if(R.genre==="arche"){const k=R.hw*2,q=2,re=Vi(128,128,(de,Re,De)=>{de.clearRect(0,0,Re,De),de.strokeStyle="#fff",de.lineWidth=6;for(let Ie=-1;Ie<5;Ie++)de.beginPath(),de.moveTo(Ie*32,0),de.lineTo(Ie*32+128,128),de.moveTo(Ie*32+128,0),de.lineTo(Ie*32,128),de.stroke()});re.repeat.set(k*2,3);const he=new Mt({map:re,color:new Oe(ie.deco),transparent:!0,alphaTest:.4,side:Ls,roughness:.5,metalness:.4});for(const de of[-1,1])Q.add(w(d.box,h.laiton,de*(k/2-.06),q/2,0,.12,q,.14));const ue=w(d.tore,h.laiton,0,q,0,k/2-.06,k/2-.06,1.4);ue.scale.set(k/2-.06,(k/2-.06)*1,1.2),ue.geometry=new qi(1,.06,6,24,Math.PI),Q.add(ue);const J=w(d.plan,he,0,q*.45,0,k-.2,q*.9,1,!0);Q.add(J),Q.add(w(d.sph,L,0,q+k/2*.98,0,.16,.14,.16))}else if(R.genre==="piste"){const k=Vi(128,128,(q,re,he)=>{for(let ue=0;ue<2;ue++)for(let J=0;J<2;J++)q.fillStyle=(ue+J)%2?"#EADFC6":"#1F5A4C",q.fillRect(ue*64,J*64,64,64);q.strokeStyle="#C9A74E",q.lineWidth=2;for(const[ue,J]of[[32,32],[96,32],[32,96],[96,96]]){q.beginPath();for(let de=0;de<16;de++){const Re=de/16*Math.PI*2-Math.PI/2,De=de%2?9:22;q.lineTo(ue+Math.cos(Re)*De,J+Math.sin(Re)*De)}q.closePath(),q.stroke()}});k.repeat.set(R.hw*2,R.hd*2),Q.add(C(w(d.box,new Mt({map:k,roughness:.25,metalness:.2}),0,.03,0,R.hw*2,.06,R.hd*2,!1),!1,!0))}else if(R.genre==="buffet"){const k=R.hw*2,q=R.hd*2,re=k>=q;Q.add(w(d.box,S,0,.3,0,k,.6,q));const he=Math.max(2,Math.floor((re?k:q)/.6));for(let ue=0;ue<he;ue++){const J=((ue+.5)/he-.5)*(re?k:q)*.9;Q.add(w(d.cyl,h.laiton,re?J:0,.64,re?0:J,.17,.05,.17),w(d.sph,ue%2?L:h.boisSombre,re?J:0,.7,re?0:J,.1,.08,.1))}}else if(R.genre==="nawar"){const k=R.hw*2,q=R.hd*2;Q.add(w(d.box,h.boisClair,0,.42,0,k,.84,q),w(d.box,h.boisSombre,0,.86,0,k+.04,.04,q+.04));const re=Math.max(3,Math.floor(q/.32));for(let he=0;he<re;he++){const ue=((he+.5)/re-.5)*q*.92;Q.add(w(d.cyl,h.verre,0,1.02,ue,.09,.26,.09),w(d.cyl,h.laiton,0,1.18,ue,.04,.06,.04,!1))}Q.add(w(d.box,h.boisClair,-k*.42,1,0,.05,1.3,q*.96));for(const he of[1.15,1.45]){Q.add(w(d.box,h.laiton,-k*.3,he,0,k*.28,.025,q*.94));for(let ue=0;ue<Math.max(3,Math.floor(q/.4));ue++)Q.add(w(d.cyl,h.verre,-k*.3,he+.1,((ue+.5)/Math.max(3,Math.floor(q/.4))-.5)*q*.85,.045,.16,.045,!1))}}else if(!nh(Q,R,ie)){Q.userData.generique=!0;const k=R.h??.6,q=F(R.id,ie);Q.add(w(d.box,new Mt({color:q,roughness:.7}),0,k/2,0,R.hw*2*.95,k,R.hd*2*.95)),Q.add(w(d.box,h.laiton,0,k+.015,0,R.hw*2*.97,.03,R.hd*2*.97,!1))}const B=new ot(d.box,h.libre);return B.scale.set(R.hw*2+.1,.02,R.hd*2+.1),B.position.y=.012,B.visible=!1,B.userData.zone=!0,Q.add(B),Q.userData={...Q.userData,id:R.id,zone:B,chaises:Me,w:R.hw*2,d:R.hd*2},Q}function $(){for(const R of v.values()){const A=R.userData.zone;Qe&&Qe.grp===R||(A.material=h.halo,A.visible=!!(x!=null&&x.deplacable))}}let O=null;function ee(R){if(O&&(o.remove(O.corps,O.tete),O.corps.dispose(),O.tete.dispose(),O=null),!R.final||R.r.tables==="conference")return;const{r:A}=R,ie=A.salle.n,fe=A.salle.pos,Q=A.salle.tables,Me=Io(31),Se=Q.length?Q:[[A.salle.ax,ie/2]],S=Math.min(40,14+Math.round(Q.length/2)),L=Kn.find(ue=>ue.id===A.palette)??Kn[0],U=new di(d.cyl8,se("#ffffff",.85),S),G=new di(d.sph,se("#ffffff",.8),S);U.castShadow=G.castShadow=!0;const B=[L.accent,"#3d352e",L.deco,"#F6EFDD"],k=["#E8C3A0","#C99A72","#9A6B4A","#F0CFB0"],q=[],re=[],he=[];for(let ue=0;ue<S;ue++){const[J,de]=Se[ue%Se.length],Re=Me()*Math.PI*2;q.push([Math.min(ie-.6,Math.max(.8,J+Math.cos(Re)*1.5)),Math.min(ie-.5,Math.max(1.2,de+Math.sin(Re)*1.3+.2))]),re.push(ue%11*.22),he.push(2.3+ue%5*.3),U.setColorAt(ue,new Oe(B[ue%4])),G.setColorAt(ue,new Oe(k[ue%4]))}O={corps:U,tete:G,dep:[fe.DEPART_INVITES[0],fe.DEPART_INVITES[1]],cibles:q,delai:re,duree:he,etat:R.final,t0:performance.now(),fini:!1},o.add(U,G),ne(performance.now())}const j=new Le,te=new Yt;function ne(R){const A=O;if(!A)return!1;let ie=!1;const fe=(R-A.t0)/1e3;for(let Q=0;Q<A.cibles.length;Q++){let Me=A.etat==="assis"||x!=null&&x.reduit?A.etat==="avant"?0:1:A.etat==="arrive"?Math.max(0,Math.min(1,(fe-A.delai[Q])/A.duree[Q])):0;Me>0&&Me<1&&(ie=!0);const Se=1-Math.pow(1-Me,2),S=Xt(A.dep[0],A.cibles[Q][0],Se),L=Xt(A.dep[1],A.cibles[Q][1],Se),U=Me>0&&Me<1?Math.abs(Math.sin(fe*9+Q))*.035:0,G=Me===0?0:1;j.compose(new T(S,.3+U,L),te,new T(.15*G,.3*G,.15*G)),A.corps.setMatrixAt(Q,j),j.compose(new T(S,.72+U,L),te,new T(.1*G,.1*G,.1*G)),A.tete.setMatrixAt(Q,j)}return A.corps.instanceMatrix.needsUpdate=A.tete.instanceMatrix.needsUpdate=!0,A.corps.instanceColor&&(A.corps.instanceColor.needsUpdate=A.tete.instanceColor.needsUpdate=!0),n.shadowMap.needsUpdate=!0,ie}function me(R,A){if(!R.final){O&&ee({...R,final:null});return}if(O||ee(R),O&&(O.etat=R.final,O.t0=performance.now()),!A&&R.final==="avant"){const ie=R.r.salle.pos.DEPART_INVITES;le.cible.set(ie[0],.6,Math.min(ie[1],R.r.salle.n)),le.zoom=1.5,E=null,I=1,V()}else R.final==="arrive"&&ce();it()}let ge=new Bt;o.add(ge);let ye=!1,Pe=null;function oe(R){Pe&&(o.remove(Pe),g(Pe));const A=Kn.find(ie=>ie.id===R.r.palette)??Kn[0];Pe=ih(R.r,A,R.nuit),o.add(Pe)}function pe(R){const{r:A}=R,ie=Kn.find(Se=>Se.id===A.palette)??Kn[0],fe=A.salle.n,Q=`${A.lieu}|${fe}|${A.palette}`;Q!==P&&(f&&(o.remove(f),g(f)),f=K(A.lieu,fe),o.add(f),P=Q,c.shadow.camera.left=-fe*.85,c.shadow.camera.right=fe*.85,c.shadow.camera.top=fe*.85,c.shadow.camera.bottom=-fe*.85,c.shadow.camera.far=fe*6,c.shadow.camera.updateProjectionMatrix(),c.position.set(fe/2-fe*.5,fe*1.6,fe/2+fe*.8),c.target.position.set(fe/2,0,fe/2),c.target.updateMatrixWorld(),ce(!0));for(const Se of[...ge.children])ge.remove(Se),g(Se);v.clear(),M=rh(A);for(const Se of M){const S=Y(Se,A,ie,A.lumiere==="bougies"),[L,U]=A.deplacements[Se.id]??[0,0];S.position.set(Se.a[0]+L,0,Se.a[1]+U),v.set(Se.id,S),ge.add(S)}for(const Se of je.keys()){const S=v.get(Se);S&&(S.position.y=.18)}$();const Me=["honneur","nawar","piste","t0"].map(Se=>v.get(Se)).filter(Boolean).slice(0,4);p.forEach((Se,S)=>{const L=Me[S];L?(Se.position.set(L.position.x,1.5,L.position.z),Se.userData.actif=!0,Se.userData.nawar=L.userData.id==="nawar"):Se.userData.actif=!1})}function we(R){const A=R;c.color.copy(ui("#FFE2B8","#9AA3C0",A)),c.intensity=Xt(1.9,.5,A),s.color.copy(ui("#FFE6C8","#9AA3C0",A)),s.groundColor.copy(ui("#8A7A66","#2A2E48",A)),s.intensity=Xt(1,.65,A),a=[ui("#F3ECDD","#141414",A).getStyle(),ui("#E9DCC2","#1B1A22",A).getStyle()],e.style.background=`linear-gradient(180deg, ${a[0]}, ${a[1]})`,p.forEach((ie,fe)=>{ie.intensity=ie.userData.actif&&fe<u?ie.userData.nawar?Xt(1.8,7,A):Xt(.2,7,A):0}),n.toneMappingExposure=Xt(1.08,1.1,A),n.shadowMap.needsUpdate=!0}const le={cible:new T(6,.8,6),zoom:1,N:12};let E=null,y=1,I=0,Z=0,N=new T,H=1;const b=()=>{Z=performance.now(),N.copy(le.cible),H=le.zoom},W=new T(1,Math.tan(Math.PI/6)*Math.SQRT2,1).normalize();function V(){var G;const R=e.clientWidth||1,A=e.clientHeight||1,ie=R/A,fe=le.N;let Q=fe*.76,Me=Q/ie;const Se=fe*.36+2.6;Me<Se&&(Me=Se,Q=Me*ie);const S=ie<1.5?.15:0;l.left=-Q/le.zoom,l.right=Q/le.zoom,l.top=Me*(1-2*S)/le.zoom,l.bottom=-Me*(1+2*S)/le.zoom,l.position.copy(le.cible).addScaledVector(W,80),l.lookAt(le.cible),l.updateProjectionMatrix();const L=X(),U=Math.abs(le.zoom-L)>.06||Math.hypot(le.cible.x-le.N/2,le.cible.z-(le.N/2+0))>.6;U!==_e&&(_e=U,(G=t.onDecalee)==null||G.call(t,U))}let _e=!1;const X=()=>((e.clientWidth||1)/(e.clientHeight||1),1);function ce(R=!1){const A=le.N=(x==null?void 0:x.r.salle.n)??12;E=new T(A/2,.8,A/2+(X()>1?.4:0)),y=X(),I=R||x!=null&&x.reduit?1:0,b(),(R||x!=null&&x.reduit)&&(le.cible.copy(E),le.zoom=y,V()),it()}function ve(R){const A=R.focus?R.r.salle.pos.ANCRES[R.focus.cle]:null;A&&(E=new T(A[0],.5,A[1]),y=X()>1?Math.max(X(),1.3):1.6,I=R.reduit?1:0,b(),R.reduit&&(le.cible.copy(E),le.zoom=y,V()),it())}function ae(){const R=e.clientWidth,A=e.clientHeight;!R||!A||(n.setSize(R,A,!1),V(),it())}const Ee=new ResizeObserver(ae);Ee.observe(e);const be=R=>{var A;R.preventDefault(),(A=t.onPerdu)==null||A.call(t)};i.addEventListener("webglcontextlost",be),i.addEventListener("webglcontextrestored",it);let Ce=!1,Ue=0;const je=new Map;let Be=null,Ae=0,ke=null,Ze=0,tt=0,Te=0,He=0,Ye=0,tn=0,nn=0;function vt(R,A){if(nn++,He++,nn<=4||Te>=2||(tn++,(A>26||R>34&&R<250)&&Ye++,tn<24))return;const ie=Ye>=tn*.6;tn=0,Ye=0,ie&&(Te++,Te===1?(n.setPixelRatio(1),ae()):(u=1,p.forEach((fe,Q)=>{Q>=u&&(fe.intensity=0)})),n.shadowMap.needsUpdate=!0)}function it(){Ce||(Ce=!0,He=0,requestAnimationFrame(Kt))}function Kt(R){const A=R-Ue;Ue=R;let ie=!1;if(E&&I<1){const Q=Math.min(1,(performance.now()-Z)/600),Me=1-Math.pow(1-Q,3);le.cible.lerpVectors(N,E,Me),le.zoom=Xt(H,y,Me),Q>=1&&(I=1),V(),ie=I<1}if(ke){const Q=Math.min(1,(performance.now()-ke.t0)/800),Me=Q*Q*(3-2*Q);Ae=Xt(ke.de,ke.vers,Me),we(Ae),Q>=1?ke=null:ie=!0}for(const[Q,Me]of je){const Se=Math.min(1,(performance.now()-Me.t0)/350),S=v.get(Q);S&&(S.position.y=.18*(1-Uo(Se))),n.shadowMap.needsUpdate=!0,Se>=1?(je.delete(Q),S&&(S.position.y=0)):ie=!0}if(Be){const Q=Be,Me=v.get(Q.id),Se=performance.now()-Q.t0,S=Me==null?void 0:Me.userData.zone;if(Me&&S){if(S.visible=!0,S.material=h.refusAnim,Se<400)h.refusAnim.opacity=.2+.5*(.5-.5*Math.cos(Se/400*Math.PI*4)),Me.position.set(Q.de[0],.18,Q.de[1]);else if(Se<760){const L=(Se-400)/360,U=Uo(L);Me.position.set(Xt(Q.de[0],Q.vers[0],U),.18*(1-U),Xt(Q.de[1],Q.vers[1],U)),h.refusAnim.opacity=.45}else Se<880?(Me.position.set(Q.vers[0],0,Q.vers[1]),h.refusAnim.opacity=.45*(1-(Se-760)/120)):(Me.position.set(Q.vers[0],0,Q.vers[1]),Be=null,$());n.shadowMap.needsUpdate=!0}else Be=null;Be&&(ie=!0)}O&&ne(performance.now())&&(ie=!0),Qe&&(ie=!0);const fe=performance.now();n.render(o,l),vt(He>0?A:0,performance.now()-fe),Ze=n.info.render.calls,tt=n.info.render.triangles,ie?requestAnimationFrame(Kt):Ce=!1}const D=new Qu,Lt=new ze,Pn=new Tn(new T(0,1,0),0);let Qe=null;const rn=(R,A)=>{const ie=i.getBoundingClientRect();Lt.set((R-ie.left)/ie.width*2-1,-((A-ie.top)/ie.height)*2+1),D.setFromCamera(Lt,l);const fe=new T;return D.ray.intersectPlane(Pn,fe)?fe:null};function Ai(R,A){var S,L;const ie=i.getBoundingClientRect();Lt.set((R-ie.left)/ie.width*2-1,-((A-ie.top)/ie.height)*2+1),D.setFromCamera(Lt,l);const fe=D.intersectObjects(ge.children,!0);for(const U of fe){let G=U.object;for(;G&&!((S=G.userData)!=null&&S.id);)G=G.parent;if((L=G==null?void 0:G.userData)!=null&&L.id)return G.userData.id}const Q=rn(R,A);if(!Q||!x)return null;let Me=null,Se=1e9;for(const U of M){const[G,B]=x.r.deplacements[U.id]??[0,0],k=U.a[0]+G,q=U.a[1]+B,re=.25;if(Math.abs(Q.x-k)<=U.hw+re&&Math.abs(Q.z-q)<=U.hd+re){const he=Math.hypot(Q.x-k,Q.z-q);he<Se&&(Se=he,Me=U.id)}}return Me}const wt=new Map;let At=null,an=null;const qn=()=>{const[R,A]=[...wt.values()];return[(R.x+A.x)/2,(R.y+A.y)/2]},Ri=()=>{const[R,A]=[...wt.values()];return Math.hypot(R.x-A.x,R.y-A.y)||1};function Ji(){const R=Qe;if(Qe=null,!R)return;const A=M.find(ie=>ie.id===R.id);R.grp.position.set(A.a[0]+R.depart[0],0,A.a[1]+R.depart[1]),$(),n.shadowMap.needsUpdate=!0}const Zt=()=>{const R=le.N;le.cible.x=Math.max(0,Math.min(R,le.cible.x)),le.cible.z=Math.max(0,Math.min(R,le.cible.z))};i.addEventListener("pointerdown",R=>{if(!x)return;wt.set(R.pointerId,{x:R.clientX,y:R.clientY});try{i.setPointerCapture(R.pointerId)}catch{}if(E=null,I=1,wt.size===2){Ji(),an=null,At={d0:Ri(),z0:le.zoom,g0:rn(...qn())};return}if(wt.size>2)return;const A=x.deplacable?Ai(R.clientX,R.clientY):null,ie=A?v.get(A):null,fe=rn(R.clientX,R.clientY);if(!fe)return;if(R.preventDefault(),!A||!ie){an={p:fe};return}const Q=M.find(Se=>Se.id===A),Me=x.r.deplacements[A]??[0,0];Qe={id:A,grp:ie,depart:Me,decal:new T(fe.x-(Q.a[0]+Me[0]),0,fe.z-(Q.a[1]+Me[1])),dernier:Me,bloque:!1,pointeur:R.pointerId},ie.position.y=.18,ie.userData.zone.visible=!0,ie.userData.zone.material=h.libre,n.shadowMap.needsUpdate=!0,it()}),i.addEventListener("pointermove",R=>{if(wt.has(R.pointerId)&&wt.set(R.pointerId,{x:R.clientX,y:R.clientY}),At&&wt.size>=2){le.zoom=Math.max(.9,Math.min(3.2,At.z0*Ri()/At.d0)),V();const q=At.g0?rn(...qn()):null;At.g0&&q&&(le.cible.x+=At.g0.x-q.x,le.cible.z+=At.g0.z-q.z,Zt(),V()),it();return}if(an){const q=rn(R.clientX,R.clientY);if(!q)return;le.cible.x+=an.p.x-q.x,le.cible.z+=an.p.z-q.z,Zt(),V(),it();return}const A=Qe;if(!A||!x)return;const ie=rn(R.clientX,R.clientY),fe=M.find(q=>q.id===A.id),Q=x.r.salle.n;if(!ie)return;let Me=ie.x-A.decal.x-fe.a[0],Se=ie.z-A.decal.z-fe.a[1];Me=Math.round(Me*4)/4,Se=Math.round(Se*4)/4;const S=Math.min(0,.1+fe.hw-fe.a[0]),L=Math.max(0,Q-.1-fe.hw-fe.a[0]),U=Math.min(0,.1+fe.hd-fe.a[1]),G=Math.max(0,Q-.1-fe.hd-fe.a[1]),B=Me,k=Se;Me=Math.max(S,Math.min(L,Me)),Se=Math.max(U,Math.min(G,Se)),A.bord=Math.abs(Me-B)>.3||Math.abs(Se-k)>.3,(Me!==A.dernier[0]||Se!==A.dernier[1])&&(A.dernier=[Me,Se],A.grp.position.x=fe.a[0]+Me,A.grp.position.z=fe.a[1]+Se,A.bloque=ah(A.id,Me,Se,M,x.r),A.grp.userData.zone.material=A.bloque?h.refus:h.libre,n.shadowMap.needsUpdate=!0),it()});function Yn(R){wt.delete(R.pointerId);try{i.releasePointerCapture(R.pointerId)}catch{}if(At){wt.size<2&&(At=null);return}an=null;const A=Qe;if(Qe=null,!A||!x)return;const ie=M.find(Q=>Q.id===A.id),fe=[ie.a[0]+A.depart[0],ie.a[1]+A.depart[1]];A.bloque?(t.onRefus("occupe"),x.reduit?(A.grp.position.set(fe[0],0,fe[1]),$()):Be={id:A.id,t0:performance.now(),de:[ie.a[0]+A.dernier[0],ie.a[1]+A.dernier[1]],vers:fe}):(A.grp.userData.zone.material=h.halo,A.grp.userData.zone.visible=x.deplacable,(A.dernier[0]!==A.depart[0]||A.dernier[1]!==A.depart[1])&&t.onDeplacer(A.id,A.dernier[0],A.dernier[1]),A.bord&&t.onRefus("bord"),x.reduit?A.grp.position.y=0:je.set(A.id,{t0:performance.now()})),n.shadowMap.needsUpdate=!0,it()}return i.addEventListener("pointerup",Yn),i.addEventListener("pointercancel",Yn),i.addEventListener("wheel",R=>{R.preventDefault(),y=Math.max(.9,Math.min(3.2,le.zoom*(R.deltaY<0?1.12:.9))),le.zoom=y,E=null,I=1,V(),it()},{passive:!1}),i.addEventListener("dblclick",()=>ce()),{maj(R){var ie;const A=x;x=R,(!A||A.r!==R.r)&&(pe(R),ee(R)),(!A||A.final!==R.final)&&me(R,A),A&&A.nuit!==R.nuit&&(R.reduit?(Ae=R.nuit,ke=null):ke={t0:performance.now(),de:Ae,vers:R.nuit}),A||(Ae=R.nuit),(!A||A.nuit!==R.nuit||A.r!==R.r)&&(we(Ae),(!A||A.r!==R.r||A.nuit>.5!=R.nuit>.5)&&oe(R)),i.style.touchAction="none",A&&A.deplacable!==R.deplacable&&$(),R.focus&&A&&((ie=A.focus)==null?void 0:ie.n)!==R.focus.n&&ve(R),i.style.cursor=R.deplacable?"grab":"default",ye||(ye=!0,ae()),it()},vueEnsemble:()=>ce(),capturer:()=>{try{if(!i.isConnected)return Promise.resolve(null);const R=(x==null?void 0:x.r.salle.n)??12,A=1440,ie=1140,fe=l.left,Q=l.right,Me=l.top,Se=l.bottom,S=l.position.clone(),L=n.getPixelRatio(),U=()=>{n.setPixelRatio(L),l.left=fe,l.right=Q,l.top=Me,l.bottom=Se,l.position.copy(S),l.lookAt(le.cible),l.updateProjectionMatrix(),ae()};n.setPixelRatio(1),n.setSize(A,ie,!1);const G=new T(R/2,.8,R/2),B=R*.78,k=B*ie/A;l.left=-B,l.right=B,l.top=k,l.bottom=-k,l.position.copy(G).addScaledVector(W,80),l.lookAt(G),l.updateProjectionMatrix(),n.render(o,l);const q=document.createElement("canvas");q.width=A,q.height=ie;const re=q.getContext("2d");if(!re)return U(),Promise.resolve(null);const he=re.createLinearGradient(0,0,0,ie);return he.addColorStop(0,a[0]),he.addColorStop(1,a[1]),re.fillStyle=he,re.fillRect(0,0,A,ie),re.drawImage(i,0,0),U(),it(),new Promise(ue=>q.toBlob(J=>ue(J),"image/png"))}catch{return Promise.resolve(null)}},position:R=>{const A=v.get(R);return A?[A.position.x,A.position.z]:null},ecran:(R,A)=>{const ie=new T(R,0,A).project(l),fe=i.getBoundingClientRect();return[fe.left+(ie.x+1)/2*fe.width,fe.top+(1-ie.y)/2*fe.height]},ecranObjet:R=>{const A=v.get(R);if(!A)return null;const ie=new T(A.position.x,.3,A.position.z).project(l),fe=i.getBoundingClientRect();return[fe.left+(ie.x+1)/2*fe.width,fe.top+(1-ie.y)/2*fe.height]},generiques:()=>[...v.values()].filter(R=>R.userData.generique).map(R=>R.userData.id),chaises:R=>{var A;return((A=v.get(R))==null?void 0:A.userData.chaises)??[]},dims:R=>{var ie;const A=(ie=v.get(R))==null?void 0:ie.userData;return A?{w:A.w,d:A.d}:null},vers(R,A){const ie=v.get(R);ie&&(E=null,I=1,le.cible.set(ie.position.x,.4,ie.position.z),le.zoom=A,V(),it())},sous:(R,A)=>Ai(R,A),stats:()=>({appels:Ze,triangles:tt,objets:M.length,zoom:+le.zoom.toFixed(3),cible:[+le.cible.x.toFixed(2),+le.cible.z.toFixed(2)],invites:(O==null?void 0:O.cibles.length)??0,qualite:Te}),detruire(){Ee.disconnect(),i.removeEventListener("webglcontextlost",be),i.removeEventListener("webglcontextrestored",it);for(const R of[f,Pe,ge])R&&g(R);O&&(O.corps.dispose(),O.tete.dispose()),th();for(const R of Object.values(h))R.dispose();for(const R of Object.values(d))R.dispose();m.dispose(),_.dispose(),n.dispose(),n.forceContextLoss()}}}export{fh as creerMoteur};
