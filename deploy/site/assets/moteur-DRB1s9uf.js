import{G as jr,P as $n,R as yn}from"./HeaventCityPage-5ps2tjV1.js";import"./index-D2RwwAyJ.js";import"./react-CEfzfvak.js";import"./supabase-BLuESGw6.js";import"./ui-CrpJfjBr.js";import"./logo-heavent-or-B4tRtY98.js";import"./logo-nawar-CoKiAGys.js";/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ca="169",Oo=1,Fo=2,_n=3,Dn=0,It=1,Ls=2,Xn=100,Pa=204,La=205,Bo=0,bl=1,Tl=2,Ln=0,wl=1,Al=2,Rl=3,zo=4,Cl=5,Pl=6,Ll=7,Ho=300,Mi=301,Si=302,Da=303,Ua=304,zr=306,Wi=1e3,Xi=1001,Ia=1002,Xt=1003,Dl=1004,Qi=1005,sn=1006,qr=1007,gi=1008,vn=1009,Go=1010,Vo=1011,ji=1012,ds=1013,qn=1014,on=1015,Ki=1016,ps=1017,fs=1018,yi=1020,ko=35902,Wo=1021,Xo=1022,tn=1023,jo=1024,qo=1025,qi=1026,Ei=1027,ms=1028,gs=1029,Yo=1030,_s=1031,vs=1033,Er=33776,br=33777,Tr=33778,wr=33779,Na=35840,Oa=35841,Fa=35842,Ba=35843,za=36196,Ha=37492,Ga=37496,Va=37808,ka=37809,Wa=37810,Xa=37811,ja=37812,qa=37813,Ya=37814,Ka=37815,Za=37816,Ja=37817,$a=37818,Qa=37819,es=37820,ts=37821,Ar=36492,ns=36494,is=36495,Ko=36283,rs=36284,as=36285,ss=36286,fi="",Vt="srgb",In="srgb-linear",xs="display-p3",Hr="display-p3-linear",Lr="linear",ot="srgb",Dr="rec709",Ur="p3",Qn=7680,Zo=515,Ds=35044,Us="300 es",bi=2e3,Ir=2001;class wi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const n=this._listeners[e];if(n!==void 0){const r=n.indexOf(t);r!==-1&&n.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const t=this._listeners[e.type];if(t!==void 0){e.target=this;const n=t.slice(0);for(let r=0,a=n.length;r<a;r++)n[r].call(this,e);e.target=null}}}const wt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Yr=Math.PI/180,os=180/Math.PI;function Zi(){const i=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(wt[255&i]+wt[i>>8&255]+wt[i>>16&255]+wt[i>>24&255]+"-"+wt[255&e]+wt[e>>8&255]+"-"+wt[e>>16&15|64]+wt[e>>24&255]+"-"+wt[63&t|128]+wt[t>>8&255]+"-"+wt[t>>16&255]+wt[t>>24&255]+wt[255&n]+wt[n>>8&255]+wt[n>>16&255]+wt[n>>24&255]).toLowerCase()}function Ut(i,e,t){return Math.max(e,Math.min(t,i))}function Ul(i,e){return(i%e+e)%e}function Kr(i,e,t){return(1-t)*i+t*e}function Li(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Dt(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(4294967295*i);case Uint16Array:return Math.round(65535*i);case Uint8Array:return Math.round(255*i);case Int32Array:return Math.round(2147483647*i);case Int16Array:return Math.round(32767*i);case Int8Array:return Math.round(127*i);default:throw new Error("Invalid component type.")}}class Ge{constructor(e=0,t=0){Ge.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ut(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),a=this.x-e.x,o=this.y-e.y;return this.x=a*n-o*r+e.x,this.y=a*r+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class We{constructor(e,t,n,r,a,o,u,s,c){We.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,a,o,u,s,c)}set(e,t,n,r,a,o,u,s,c){const l=this.elements;return l[0]=e,l[1]=r,l[2]=u,l[3]=t,l[4]=a,l[5]=s,l[6]=n,l[7]=o,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,a=this.elements,o=n[0],u=n[3],s=n[6],c=n[1],l=n[4],h=n[7],d=n[2],p=n[5],m=n[8],v=r[0],g=r[3],f=r[6],x=r[1],M=r[4],S=r[7],w=r[2],P=r[5],L=r[8];return a[0]=o*v+u*x+s*w,a[3]=o*g+u*M+s*P,a[6]=o*f+u*S+s*L,a[1]=c*v+l*x+h*w,a[4]=c*g+l*M+h*P,a[7]=c*f+l*S+h*L,a[2]=d*v+p*x+m*w,a[5]=d*g+p*M+m*P,a[8]=d*f+p*S+m*L,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],a=e[3],o=e[4],u=e[5],s=e[6],c=e[7],l=e[8];return t*o*l-t*u*c-n*a*l+n*u*s+r*a*c-r*o*s}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],a=e[3],o=e[4],u=e[5],s=e[6],c=e[7],l=e[8],h=l*o-u*c,d=u*s-l*a,p=c*a-o*s,m=t*h+n*d+r*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/m;return e[0]=h*v,e[1]=(r*c-l*n)*v,e[2]=(u*n-r*o)*v,e[3]=d*v,e[4]=(l*t-r*s)*v,e[5]=(r*a-u*t)*v,e[6]=p*v,e[7]=(n*s-c*t)*v,e[8]=(o*t-n*a)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,a,o,u){const s=Math.cos(a),c=Math.sin(a);return this.set(n*s,n*c,-n*(s*o+c*u)+o+e,-r*c,r*s,-r*(-c*o+s*u)+u+t,0,0,1),this}scale(e,t){return this.premultiply(Zr.makeScale(e,t)),this}rotate(e){return this.premultiply(Zr.makeRotation(-e)),this}translate(e,t){return this.premultiply(Zr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Zr=new We;function Jo(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Nr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Il(){const i=Nr("canvas");return i.style.display="block",i}const Is={};function Rr(i){i in Is||(Is[i]=!0,console.warn(i))}const Ns=new We().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Os=new We().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Di={[In]:{transfer:Lr,primaries:Dr,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i,fromReference:i=>i},[Vt]:{transfer:ot,primaries:Dr,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Hr]:{transfer:Lr,primaries:Ur,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.applyMatrix3(Os),fromReference:i=>i.applyMatrix3(Ns)},[xs]:{transfer:ot,primaries:Ur,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.convertSRGBToLinear().applyMatrix3(Os),fromReference:i=>i.applyMatrix3(Ns).convertLinearToSRGB()}},Nl=new Set([In,Hr]),it={enabled:!0,_workingColorSpace:In,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Nl.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=Di[e].toReference;return(0,Di[t].fromReference)(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return Di[i].primaries},getTransfer:function(i){return i===fi?Lr:Di[i].transfer},getLuminanceCoefficients:function(i,e=this._workingColorSpace){return i.fromArray(Di[e].luminanceCoefficients)}};function vi(i){return i<.04045?.0773993808*i:Math.pow(.9478672986*i+.0521327014,2.4)}function Jr(i){return i<.0031308?12.92*i:1.055*Math.pow(i,.41666)-.055}let ei;class Ol{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{ei===void 0&&(ei=Nr("canvas")),ei.width=e.width,ei.height=e.height;const n=ei.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=ei}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Nr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),a=r.data;for(let o=0;o<a.length;o++)a[o]=255*vi(a[o]/255);return n.putImageData(r,0,0),t}if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(255*vi(t[n]/255)):t[n]=vi(t[n]);return{data:t,width:e.width,height:e.height}}return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Fl=0;class $o{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Fl++}),this.uuid=Zi(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let o=0,u=r.length;o<u;o++)r[o].isDataTexture?a.push($r(r[o].image)):a.push($r(r[o]))}else a=$r(r);n.url=a}return t||(e.images[this.uuid]=n),n}}function $r(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Ol.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Bl=0;class Rt extends wi{constructor(e=Rt.DEFAULT_IMAGE,t=Rt.DEFAULT_MAPPING,n=1001,r=1001,a=1006,o=1008,u=tn,s=vn,c=Rt.DEFAULT_ANISOTROPY,l=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Bl++}),this.uuid=Zi(),this.name="",this.source=new $o(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=a,this.minFilter=o,this.anisotropy=c,this.format=u,this.internalFormat=null,this.type=s,this.offset=new Ge(0,0),this.repeat=new Ge(1,1),this.center=new Ge(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new We,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=l,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Ho)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Wi:e.x=e.x-Math.floor(e.x);break;case Xi:e.x=e.x<0?0:1;break;case Ia:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case Wi:e.y=e.y-Math.floor(e.y);break;case Xi:e.y=e.y<0?0:1;break;case Ia:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Rt.DEFAULT_IMAGE=null,Rt.DEFAULT_MAPPING=Ho,Rt.DEFAULT_ANISOTROPY=1;class rt{constructor(e=0,t=0,n=0,r=1){rt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,a=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r+o[12]*a,this.y=o[1]*t+o[5]*n+o[9]*r+o[13]*a,this.z=o[2]*t+o[6]*n+o[10]*r+o[14]*a,this.w=o[3]*t+o[7]*n+o[11]*r+o[15]*a,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,a;const s=e.elements,c=s[0],l=s[4],h=s[8],d=s[1],p=s[5],m=s[9],v=s[2],g=s[6],f=s[10];if(Math.abs(l-d)<.01&&Math.abs(h-v)<.01&&Math.abs(m-g)<.01){if(Math.abs(l+d)<.1&&Math.abs(h+v)<.1&&Math.abs(m+g)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(c+1)/2,S=(p+1)/2,w=(f+1)/2,P=(l+d)/4,L=(h+v)/4,q=(m+g)/4;return M>S&&M>w?M<.01?(n=0,r=.707106781,a=.707106781):(n=Math.sqrt(M),r=P/n,a=L/n):S>w?S<.01?(n=.707106781,r=0,a=.707106781):(r=Math.sqrt(S),n=P/r,a=q/r):w<.01?(n=.707106781,r=.707106781,a=0):(a=Math.sqrt(w),n=L/a,r=q/a),this.set(n,r,a,t),this}let x=Math.sqrt((g-m)*(g-m)+(h-v)*(h-v)+(d-l)*(d-l));return Math.abs(x)<.001&&(x=1),this.x=(g-m)/x,this.y=(h-v)/x,this.z=(d-l)/x,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class zl extends wi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new rt(0,0,e,t),this.scissorTest=!1,this.viewport=new rt(0,0,e,t);const r={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:sn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const a=new Rt(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);a.flipY=!1,a.generateMipmaps=n.generateMipmaps,a.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let u=0;u<o;u++)this.textures[u]=a.clone(),this.textures[u].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,r=e.textures.length;n<r;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new $o(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Yn extends zl{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Qo extends Rt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Xt,this.minFilter=Xt,this.wrapR=Xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Hl extends Rt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=Xt,this.minFilter=Xt,this.wrapR=Xi,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class nn{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,a,o,u){let s=n[r+0],c=n[r+1],l=n[r+2],h=n[r+3];const d=a[o+0],p=a[o+1],m=a[o+2],v=a[o+3];if(u===0)return e[t+0]=s,e[t+1]=c,e[t+2]=l,void(e[t+3]=h);if(u===1)return e[t+0]=d,e[t+1]=p,e[t+2]=m,void(e[t+3]=v);if(h!==v||s!==d||c!==p||l!==m){let g=1-u;const f=s*d+c*p+l*m+h*v,x=f>=0?1:-1,M=1-f*f;if(M>Number.EPSILON){const w=Math.sqrt(M),P=Math.atan2(w,f*x);g=Math.sin(g*P)/w,u=Math.sin(u*P)/w}const S=u*x;if(s=s*g+d*S,c=c*g+p*S,l=l*g+m*S,h=h*g+v*S,g===1-u){const w=1/Math.sqrt(s*s+c*c+l*l+h*h);s*=w,c*=w,l*=w,h*=w}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,r,a,o){const u=n[r],s=n[r+1],c=n[r+2],l=n[r+3],h=a[o],d=a[o+1],p=a[o+2],m=a[o+3];return e[t]=u*m+l*h+s*p-c*d,e[t+1]=s*m+l*d+c*h-u*p,e[t+2]=c*m+l*p+u*d-s*h,e[t+3]=l*m-u*h-s*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,a=e._z,o=e._order,u=Math.cos,s=Math.sin,c=u(n/2),l=u(r/2),h=u(a/2),d=s(n/2),p=s(r/2),m=s(a/2);switch(o){case"XYZ":this._x=d*l*h+c*p*m,this._y=c*p*h-d*l*m,this._z=c*l*m+d*p*h,this._w=c*l*h-d*p*m;break;case"YXZ":this._x=d*l*h+c*p*m,this._y=c*p*h-d*l*m,this._z=c*l*m-d*p*h,this._w=c*l*h+d*p*m;break;case"ZXY":this._x=d*l*h-c*p*m,this._y=c*p*h+d*l*m,this._z=c*l*m+d*p*h,this._w=c*l*h-d*p*m;break;case"ZYX":this._x=d*l*h-c*p*m,this._y=c*p*h+d*l*m,this._z=c*l*m-d*p*h,this._w=c*l*h+d*p*m;break;case"YZX":this._x=d*l*h+c*p*m,this._y=c*p*h+d*l*m,this._z=c*l*m-d*p*h,this._w=c*l*h-d*p*m;break;case"XZY":this._x=d*l*h-c*p*m,this._y=c*p*h-d*l*m,this._z=c*l*m+d*p*h,this._w=c*l*h+d*p*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],a=t[8],o=t[1],u=t[5],s=t[9],c=t[2],l=t[6],h=t[10],d=n+u+h;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(l-s)*p,this._y=(a-c)*p,this._z=(o-r)*p}else if(n>u&&n>h){const p=2*Math.sqrt(1+n-u-h);this._w=(l-s)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(a+c)/p}else if(u>h){const p=2*Math.sqrt(1+u-n-h);this._w=(a-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(s+l)/p}else{const p=2*Math.sqrt(1+h-n-u);this._w=(o-r)/p,this._x=(a+c)/p,this._y=(s+l)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ut(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,a=e._z,o=e._w,u=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+o*u+r*c-a*s,this._y=r*l+o*s+a*u-n*c,this._z=a*l+o*c+n*s-r*u,this._w=o*l-n*u-r*s-a*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,a=this._z,o=this._w;let u=o*e._w+n*e._x+r*e._y+a*e._z;if(u<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,u=-u):this.copy(e),u>=1)return this._w=o,this._x=n,this._y=r,this._z=a,this;const s=1-u*u;if(s<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*n+t*this._x,this._y=p*r+t*this._y,this._z=p*a+t*this._z,this.normalize(),this}const c=Math.sqrt(s),l=Math.atan2(c,u),h=Math.sin((1-t)*l)/c,d=Math.sin(t*l)/c;return this._w=o*h+this._w*d,this._x=n*h+this._x*d,this._y=r*h+this._y*d,this._z=a*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),a=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class T{constructor(e=0,t=0,n=0){T.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Fs.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Fs.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[3]*n+a[6]*r,this.y=a[1]*t+a[4]*n+a[7]*r,this.z=a[2]*t+a[5]*n+a[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,a=e.elements,o=1/(a[3]*t+a[7]*n+a[11]*r+a[15]);return this.x=(a[0]*t+a[4]*n+a[8]*r+a[12])*o,this.y=(a[1]*t+a[5]*n+a[9]*r+a[13])*o,this.z=(a[2]*t+a[6]*n+a[10]*r+a[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,a=e.x,o=e.y,u=e.z,s=e.w,c=2*(o*r-u*n),l=2*(u*t-a*r),h=2*(a*n-o*t);return this.x=t+s*c+o*h-u*l,this.y=n+s*l+u*c-a*h,this.z=r+s*h+a*l-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r,this.y=a[1]*t+a[5]*n+a[9]*r,this.z=a[2]*t+a[6]*n+a[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,a=e.z,o=t.x,u=t.y,s=t.z;return this.x=r*s-a*u,this.y=a*o-n*s,this.z=n*u-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Qr.copy(this).projectOnVector(e),this.sub(Qr)}reflect(e){return this.sub(Qr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ut(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=2*Math.random()-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Qr=new T,Fs=new nn;class xn{constructor(e=new T(1/0,1/0,1/0),t=new T(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Zt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Zt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Zt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const a=n.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let o=0,u=a.count;o<u;o++)e.isMesh===!0?e.getVertexPosition(o,Zt):Zt.fromBufferAttribute(a,o),Zt.applyMatrix4(e.matrixWorld),this.expandByPoint(Zt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),er.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),er.copy(n.boundingBox)),er.applyMatrix4(e.matrixWorld),this.union(er)}const r=e.children;for(let a=0,o=r.length;a<o;a++)this.expandByObject(r[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Zt),Zt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Ui),tr.subVectors(this.max,Ui),ti.subVectors(e.a,Ui),ni.subVectors(e.b,Ui),ii.subVectors(e.c,Ui),En.subVectors(ni,ti),bn.subVectors(ii,ni),Bn.subVectors(ti,ii);let t=[0,-En.z,En.y,0,-bn.z,bn.y,0,-Bn.z,Bn.y,En.z,0,-En.x,bn.z,0,-bn.x,Bn.z,0,-Bn.x,-En.y,En.x,0,-bn.y,bn.x,0,-Bn.y,Bn.x,0];return!!ea(t,ti,ni,ii,tr)&&(t=[1,0,0,0,1,0,0,0,1],!!ea(t,ti,ni,ii,tr)&&(nr.crossVectors(En,bn),t=[nr.x,nr.y,nr.z],ea(t,ti,ni,ii,tr)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Zt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(Zt).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(hn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),hn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),hn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),hn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),hn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),hn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),hn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),hn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(hn)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const hn=[new T,new T,new T,new T,new T,new T,new T,new T],Zt=new T,er=new xn,ti=new T,ni=new T,ii=new T,En=new T,bn=new T,Bn=new T,Ui=new T,tr=new T,nr=new T,zn=new T;function ea(i,e,t,n,r){for(let a=0,o=i.length-3;a<=o;a+=3){zn.fromArray(i,a);const u=r.x*Math.abs(zn.x)+r.y*Math.abs(zn.y)+r.z*Math.abs(zn.z),s=e.dot(zn),c=t.dot(zn),l=n.dot(zn);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>u)return!1}return!0}const Gl=new xn,Ii=new T,ta=new T;class Mn{constructor(e=new T,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Gl.setFromPoints(e).getCenter(n);let r=0;for(let a=0,o=e.length;a<o;a++)r=Math.max(r,n.distanceToSquared(e[a]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ii.subVectors(e,this.center);const t=Ii.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=.5*(n-this.radius);this.center.addScaledVector(Ii,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ta.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ii.copy(e.center).add(ta)),this.expandByPoint(Ii.copy(e.center).sub(ta))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const dn=new T,na=new T,ir=new T,Tn=new T,ia=new T,rr=new T,ra=new T;class Ji{constructor(e=new T,t=new T(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,dn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=dn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(dn.copy(this.origin).addScaledVector(this.direction,t),dn.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){na.copy(e).add(t).multiplyScalar(.5),ir.copy(t).sub(e).normalize(),Tn.copy(this.origin).sub(na);const a=.5*e.distanceTo(t),o=-this.direction.dot(ir),u=Tn.dot(this.direction),s=-Tn.dot(ir),c=Tn.lengthSq(),l=Math.abs(1-o*o);let h,d,p,m;if(l>0)if(h=o*s-u,d=o*u-s,m=a*l,h>=0)if(d>=-m)if(d<=m){const v=1/l;h*=v,d*=v,p=h*(h+o*d+2*u)+d*(o*h+d+2*s)+c}else d=a,h=Math.max(0,-(o*d+u)),p=-h*h+d*(d+2*s)+c;else d=-a,h=Math.max(0,-(o*d+u)),p=-h*h+d*(d+2*s)+c;else d<=-m?(h=Math.max(0,-(-o*a+u)),d=h>0?-a:Math.min(Math.max(-a,-s),a),p=-h*h+d*(d+2*s)+c):d<=m?(h=0,d=Math.min(Math.max(-a,-s),a),p=d*(d+2*s)+c):(h=Math.max(0,-(o*a+u)),d=h>0?a:Math.min(Math.max(-a,-s),a),p=-h*h+d*(d+2*s)+c);else d=o>0?-a:a,h=Math.max(0,-(o*d+u)),p=-h*h+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(na).addScaledVector(ir,d),p}intersectSphere(e,t){dn.subVectors(e.center,this.origin);const n=dn.dot(this.direction),r=dn.dot(dn)-n*n,a=e.radius*e.radius;if(r>a)return null;const o=Math.sqrt(a-r),u=n-o,s=n+o;return s<0?null:u<0?this.at(s,t):this.at(u,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,a,o,u,s;const c=1/this.direction.x,l=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(a=(e.min.y-d.y)*l,o=(e.max.y-d.y)*l):(a=(e.max.y-d.y)*l,o=(e.min.y-d.y)*l),n>o||a>r?null:((a>n||isNaN(n))&&(n=a),(o<r||isNaN(r))&&(r=o),h>=0?(u=(e.min.z-d.z)*h,s=(e.max.z-d.z)*h):(u=(e.max.z-d.z)*h,s=(e.min.z-d.z)*h),n>s||u>r?null:((u>n||n!=n)&&(n=u),(s<r||r!=r)&&(r=s),r<0?null:this.at(n>=0?n:r,t)))}intersectsBox(e){return this.intersectBox(e,dn)!==null}intersectTriangle(e,t,n,r,a){ia.subVectors(t,e),rr.subVectors(n,e),ra.crossVectors(ia,rr);let o,u=this.direction.dot(ra);if(u>0){if(r)return null;o=1}else{if(!(u<0))return null;o=-1,u=-u}Tn.subVectors(this.origin,e);const s=o*this.direction.dot(rr.crossVectors(Tn,rr));if(s<0)return null;const c=o*this.direction.dot(ia.cross(Tn));if(c<0||s+c>u)return null;const l=-o*Tn.dot(ra);return l<0?null:this.at(l/u,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ce{constructor(e,t,n,r,a,o,u,s,c,l,h,d,p,m,v,g){Ce.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,a,o,u,s,c,l,h,d,p,m,v,g)}set(e,t,n,r,a,o,u,s,c,l,h,d,p,m,v,g){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=r,f[1]=a,f[5]=o,f[9]=u,f[13]=s,f[2]=c,f[6]=l,f[10]=h,f[14]=d,f[3]=p,f[7]=m,f[11]=v,f[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ce().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/ri.setFromMatrixColumn(e,0).length(),a=1/ri.setFromMatrixColumn(e,1).length(),o=1/ri.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*a,t[5]=n[5]*a,t[6]=n[6]*a,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,a=e.z,o=Math.cos(n),u=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(a),h=Math.sin(a);if(e.order==="XYZ"){const d=o*l,p=o*h,m=u*l,v=u*h;t[0]=s*l,t[4]=-s*h,t[8]=c,t[1]=p+m*c,t[5]=d-v*c,t[9]=-u*s,t[2]=v-d*c,t[6]=m+p*c,t[10]=o*s}else if(e.order==="YXZ"){const d=s*l,p=s*h,m=c*l,v=c*h;t[0]=d+v*u,t[4]=m*u-p,t[8]=o*c,t[1]=o*h,t[5]=o*l,t[9]=-u,t[2]=p*u-m,t[6]=v+d*u,t[10]=o*s}else if(e.order==="ZXY"){const d=s*l,p=s*h,m=c*l,v=c*h;t[0]=d-v*u,t[4]=-o*h,t[8]=m+p*u,t[1]=p+m*u,t[5]=o*l,t[9]=v-d*u,t[2]=-o*c,t[6]=u,t[10]=o*s}else if(e.order==="ZYX"){const d=o*l,p=o*h,m=u*l,v=u*h;t[0]=s*l,t[4]=m*c-p,t[8]=d*c+v,t[1]=s*h,t[5]=v*c+d,t[9]=p*c-m,t[2]=-c,t[6]=u*s,t[10]=o*s}else if(e.order==="YZX"){const d=o*s,p=o*c,m=u*s,v=u*c;t[0]=s*l,t[4]=v-d*h,t[8]=m*h+p,t[1]=h,t[5]=o*l,t[9]=-u*l,t[2]=-c*l,t[6]=p*h+m,t[10]=d-v*h}else if(e.order==="XZY"){const d=o*s,p=o*c,m=u*s,v=u*c;t[0]=s*l,t[4]=-h,t[8]=c*l,t[1]=d*h+v,t[5]=o*l,t[9]=p*h-m,t[2]=m*h-p,t[6]=u*l,t[10]=v*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Vl,e,kl)}lookAt(e,t,n){const r=this.elements;return Ft.subVectors(e,t),Ft.lengthSq()===0&&(Ft.z=1),Ft.normalize(),wn.crossVectors(n,Ft),wn.lengthSq()===0&&(Math.abs(n.z)===1?Ft.x+=1e-4:Ft.z+=1e-4,Ft.normalize(),wn.crossVectors(n,Ft)),wn.normalize(),ar.crossVectors(Ft,wn),r[0]=wn.x,r[4]=ar.x,r[8]=Ft.x,r[1]=wn.y,r[5]=ar.y,r[9]=Ft.y,r[2]=wn.z,r[6]=ar.z,r[10]=Ft.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,a=this.elements,o=n[0],u=n[4],s=n[8],c=n[12],l=n[1],h=n[5],d=n[9],p=n[13],m=n[2],v=n[6],g=n[10],f=n[14],x=n[3],M=n[7],S=n[11],w=n[15],P=r[0],L=r[4],q=r[8],U=r[12],z=r[1],Z=r[5],G=r[9],J=r[13],W=r[2],$=r[6],ee=r[10],ce=r[14],ue=r[3],Me=r[7],Pe=r[11],ie=r[15];return a[0]=o*P+u*z+s*W+c*ue,a[4]=o*L+u*Z+s*$+c*Me,a[8]=o*q+u*G+s*ee+c*Pe,a[12]=o*U+u*J+s*ce+c*ie,a[1]=l*P+h*z+d*W+p*ue,a[5]=l*L+h*Z+d*$+p*Me,a[9]=l*q+h*G+d*ee+p*Pe,a[13]=l*U+h*J+d*ce+p*ie,a[2]=m*P+v*z+g*W+f*ue,a[6]=m*L+v*Z+g*$+f*Me,a[10]=m*q+v*G+g*ee+f*Pe,a[14]=m*U+v*J+g*ce+f*ie,a[3]=x*P+M*z+S*W+w*ue,a[7]=x*L+M*Z+S*$+w*Me,a[11]=x*q+M*G+S*ee+w*Pe,a[15]=x*U+M*J+S*ce+w*ie,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],a=e[12],o=e[1],u=e[5],s=e[9],c=e[13],l=e[2],h=e[6],d=e[10],p=e[14];return e[3]*(+a*s*h-r*c*h-a*u*d+n*c*d+r*u*p-n*s*p)+e[7]*(+t*s*p-t*c*d+a*o*d-r*o*p+r*c*l-a*s*l)+e[11]*(+t*c*h-t*u*p-a*o*h+n*o*p+a*u*l-n*c*l)+e[15]*(-r*u*l-t*s*h+t*u*d+r*o*h-n*o*d+n*s*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],a=e[3],o=e[4],u=e[5],s=e[6],c=e[7],l=e[8],h=e[9],d=e[10],p=e[11],m=e[12],v=e[13],g=e[14],f=e[15],x=h*g*c-v*d*c+v*s*p-u*g*p-h*s*f+u*d*f,M=m*d*c-l*g*c-m*s*p+o*g*p+l*s*f-o*d*f,S=l*v*c-m*h*c+m*u*p-o*v*p-l*u*f+o*h*f,w=m*h*s-l*v*s-m*u*d+o*v*d+l*u*g-o*h*g,P=t*x+n*M+r*S+a*w;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const L=1/P;return e[0]=x*L,e[1]=(v*d*a-h*g*a-v*r*p+n*g*p+h*r*f-n*d*f)*L,e[2]=(u*g*a-v*s*a+v*r*c-n*g*c-u*r*f+n*s*f)*L,e[3]=(h*s*a-u*d*a-h*r*c+n*d*c+u*r*p-n*s*p)*L,e[4]=M*L,e[5]=(l*g*a-m*d*a+m*r*p-t*g*p-l*r*f+t*d*f)*L,e[6]=(m*s*a-o*g*a-m*r*c+t*g*c+o*r*f-t*s*f)*L,e[7]=(o*d*a-l*s*a+l*r*c-t*d*c-o*r*p+t*s*p)*L,e[8]=S*L,e[9]=(m*h*a-l*v*a-m*n*p+t*v*p+l*n*f-t*h*f)*L,e[10]=(o*v*a-m*u*a+m*n*c-t*v*c-o*n*f+t*u*f)*L,e[11]=(l*u*a-o*h*a-l*n*c+t*h*c+o*n*p-t*u*p)*L,e[12]=w*L,e[13]=(l*v*r-m*h*r+m*n*d-t*v*d-l*n*g+t*h*g)*L,e[14]=(m*u*r-o*v*r-m*n*s+t*v*s+o*n*g-t*u*g)*L,e[15]=(o*h*r-l*u*r+l*n*s-t*h*s-o*n*d+t*u*d)*L,this}scale(e){const t=this.elements,n=e.x,r=e.y,a=e.z;return t[0]*=n,t[4]*=r,t[8]*=a,t[1]*=n,t[5]*=r,t[9]*=a,t[2]*=n,t[6]*=r,t[10]*=a,t[3]*=n,t[7]*=r,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),a=1-n,o=e.x,u=e.y,s=e.z,c=a*o,l=a*u;return this.set(c*o+n,c*u-r*s,c*s+r*u,0,c*u+r*s,l*u+n,l*s-r*o,0,c*s-r*u,l*s+r*o,a*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,a,o){return this.set(1,n,a,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,a=t._x,o=t._y,u=t._z,s=t._w,c=a+a,l=o+o,h=u+u,d=a*c,p=a*l,m=a*h,v=o*l,g=o*h,f=u*h,x=s*c,M=s*l,S=s*h,w=n.x,P=n.y,L=n.z;return r[0]=(1-(v+f))*w,r[1]=(p+S)*w,r[2]=(m-M)*w,r[3]=0,r[4]=(p-S)*P,r[5]=(1-(d+f))*P,r[6]=(g+x)*P,r[7]=0,r[8]=(m+M)*L,r[9]=(g-x)*L,r[10]=(1-(d+v))*L,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let a=ri.set(r[0],r[1],r[2]).length();const o=ri.set(r[4],r[5],r[6]).length(),u=ri.set(r[8],r[9],r[10]).length();this.determinant()<0&&(a=-a),e.x=r[12],e.y=r[13],e.z=r[14],Jt.copy(this);const s=1/a,c=1/o,l=1/u;return Jt.elements[0]*=s,Jt.elements[1]*=s,Jt.elements[2]*=s,Jt.elements[4]*=c,Jt.elements[5]*=c,Jt.elements[6]*=c,Jt.elements[8]*=l,Jt.elements[9]*=l,Jt.elements[10]*=l,t.setFromRotationMatrix(Jt),n.x=a,n.y=o,n.z=u,this}makePerspective(e,t,n,r,a,o,u=2e3){const s=this.elements,c=2*a/(t-e),l=2*a/(n-r),h=(t+e)/(t-e),d=(n+r)/(n-r);let p,m;if(u===bi)p=-(o+a)/(o-a),m=-2*o*a/(o-a);else{if(u!==Ir)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+u);p=-o/(o-a),m=-o*a/(o-a)}return s[0]=c,s[4]=0,s[8]=h,s[12]=0,s[1]=0,s[5]=l,s[9]=d,s[13]=0,s[2]=0,s[6]=0,s[10]=p,s[14]=m,s[3]=0,s[7]=0,s[11]=-1,s[15]=0,this}makeOrthographic(e,t,n,r,a,o,u=2e3){const s=this.elements,c=1/(t-e),l=1/(n-r),h=1/(o-a),d=(t+e)*c,p=(n+r)*l;let m,v;if(u===bi)m=(o+a)*h,v=-2*h;else{if(u!==Ir)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+u);m=a*h,v=-1*h}return s[0]=2*c,s[4]=0,s[8]=0,s[12]=-d,s[1]=0,s[5]=2*l,s[9]=0,s[13]=-p,s[2]=0,s[6]=0,s[10]=v,s[14]=-m,s[3]=0,s[7]=0,s[11]=0,s[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ri=new T,Jt=new Ce,Vl=new T(0,0,0),kl=new T(1,1,1),wn=new T,ar=new T,Ft=new T,Bs=new Ce,zs=new nn;class Nt{constructor(e=0,t=0,n=0,r=Nt.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,a=r[0],o=r[4],u=r[8],s=r[1],c=r[5],l=r[9],h=r[2],d=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(Ut(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(-l,p),this._z=Math.atan2(-o,a)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ut(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(u,p),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-h,a),this._z=0);break;case"ZXY":this._x=Math.asin(Ut(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(s,a));break;case"ZYX":this._y=Math.asin(-Ut(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(s,a)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ut(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-h,a)):(this._x=0,this._y=Math.atan2(u,p));break;case"XZY":this._z=Math.asin(-Ut(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(u,a)):(this._x=Math.atan2(-l,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Bs.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Bs,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return zs.setFromEuler(this),this.setFromQuaternion(zs,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Nt.DEFAULT_ORDER="XYZ";class Ms{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!=0}isEnabled(e){return(this.mask&(1<<e|0))!=0}}let Wl=0;const Hs=new T,ai=new nn,pn=new Ce,sr=new T,Ni=new T,Xl=new T,jl=new nn,Gs=new T(1,0,0),Vs=new T(0,1,0),ks=new T(0,0,1),Ws={type:"added"},ql={type:"removed"},si={type:"childadded",child:null},aa={type:"childremoved",child:null};class yt extends wi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Wl++}),this.uuid=Zi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=yt.DEFAULT_UP.clone();const e=new T,t=new Nt,n=new nn,r=new T(1,1,1);t._onChange(function(){n.setFromEuler(t,!1)}),n._onChange(function(){t.setFromQuaternion(n,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Ce},normalMatrix:{value:new We}}),this.matrix=new Ce,this.matrixWorld=new Ce,this.matrixAutoUpdate=yt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ms,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ai.setFromAxisAngle(e,t),this.quaternion.multiply(ai),this}rotateOnWorldAxis(e,t){return ai.setFromAxisAngle(e,t),this.quaternion.premultiply(ai),this}rotateX(e){return this.rotateOnAxis(Gs,e)}rotateY(e){return this.rotateOnAxis(Vs,e)}rotateZ(e){return this.rotateOnAxis(ks,e)}translateOnAxis(e,t){return Hs.copy(e).applyQuaternion(this.quaternion),this.position.add(Hs.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Gs,e)}translateY(e){return this.translateOnAxis(Vs,e)}translateZ(e){return this.translateOnAxis(ks,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(pn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?sr.copy(e):sr.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Ni.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pn.lookAt(Ni,sr,this.up):pn.lookAt(sr,Ni,this.up),this.quaternion.setFromRotationMatrix(pn),r&&(pn.extractRotation(r.matrixWorld),ai.setFromRotationMatrix(pn),this.quaternion.premultiply(ai.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ws),si.child=e,this.dispatchEvent(si),si.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(ql),aa.child=e,this.dispatchEvent(aa),aa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),pn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),pn.multiply(e.parent.matrixWorld)),e.applyMatrix4(pn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ws),si.child=e,this.dispatchEvent(si),si.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ni,e,Xl),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ni,jl,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};function a(u,s){return u[s.uuid]===void 0&&(u[s.uuid]=s.toJSON(e)),s.uuid}if(r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(u=>({boxInitialized:u.boxInitialized,boxMin:u.box.min.toArray(),boxMax:u.box.max.toArray(),sphereInitialized:u.sphereInitialized,sphereRadius:u.sphere.radius,sphereCenter:u.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()})),this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(e.geometries,this.geometry);const u=this.geometry.parameters;if(u!==void 0&&u.shapes!==void 0){const s=u.shapes;if(Array.isArray(s))for(let c=0,l=s.length;c<l;c++){const h=s[c];a(e.shapes,h)}else a(e.shapes,s)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const u=[];for(let s=0,c=this.material.length;s<c;s++)u.push(a(e.materials,this.material[s]));r.material=u}else r.material=a(e.materials,this.material);if(this.children.length>0){r.children=[];for(let u=0;u<this.children.length;u++)r.children.push(this.children[u].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let u=0;u<this.animations.length;u++){const s=this.animations[u];r.animations.push(a(e.animations,s))}}if(t){const u=o(e.geometries),s=o(e.materials),c=o(e.textures),l=o(e.images),h=o(e.shapes),d=o(e.skeletons),p=o(e.animations),m=o(e.nodes);u.length>0&&(n.geometries=u),s.length>0&&(n.materials=s),c.length>0&&(n.textures=c),l.length>0&&(n.images=l),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),m.length>0&&(n.nodes=m)}return n.object=r,n;function o(u){const s=[];for(const c in u){const l=u[c];delete l.metadata,s.push(l)}return s}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}yt.DEFAULT_UP=new T(0,1,0),yt.DEFAULT_MATRIX_AUTO_UPDATE=!0,yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const $t=new T,fn=new T,sa=new T,mn=new T,oi=new T,li=new T,Xs=new T,oa=new T,la=new T,ca=new T,ua=new rt,ha=new rt,da=new rt;class Wt{constructor(e=new T,t=new T,n=new T){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),$t.subVectors(e,t),r.cross($t);const a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(e,t,n,r,a){$t.subVectors(r,t),fn.subVectors(n,t),sa.subVectors(e,t);const o=$t.dot($t),u=$t.dot(fn),s=$t.dot(sa),c=fn.dot(fn),l=fn.dot(sa),h=o*c-u*u;if(h===0)return a.set(0,0,0),null;const d=1/h,p=(c*s-u*l)*d,m=(o*l-u*s)*d;return a.set(1-p-m,m,p)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,mn)!==null&&mn.x>=0&&mn.y>=0&&mn.x+mn.y<=1}static getInterpolation(e,t,n,r,a,o,u,s){return this.getBarycoord(e,t,n,r,mn)===null?(s.x=0,s.y=0,"z"in s&&(s.z=0),"w"in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(a,mn.x),s.addScaledVector(o,mn.y),s.addScaledVector(u,mn.z),s)}static getInterpolatedAttribute(e,t,n,r,a,o){return ua.setScalar(0),ha.setScalar(0),da.setScalar(0),ua.fromBufferAttribute(e,t),ha.fromBufferAttribute(e,n),da.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(ua,a.x),o.addScaledVector(ha,a.y),o.addScaledVector(da,a.z),o}static isFrontFacing(e,t,n,r){return $t.subVectors(n,t),fn.subVectors(e,t),$t.cross(fn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return $t.subVectors(this.c,this.b),fn.subVectors(this.a,this.b),.5*$t.cross(fn).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Wt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Wt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,a){return Wt.getInterpolation(e,this.a,this.b,this.c,t,n,r,a)}containsPoint(e){return Wt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Wt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,a=this.c;let o,u;oi.subVectors(r,n),li.subVectors(a,n),oa.subVectors(e,n);const s=oi.dot(oa),c=li.dot(oa);if(s<=0&&c<=0)return t.copy(n);la.subVectors(e,r);const l=oi.dot(la),h=li.dot(la);if(l>=0&&h<=l)return t.copy(r);const d=s*h-l*c;if(d<=0&&s>=0&&l<=0)return o=s/(s-l),t.copy(n).addScaledVector(oi,o);ca.subVectors(e,a);const p=oi.dot(ca),m=li.dot(ca);if(m>=0&&p<=m)return t.copy(a);const v=p*c-s*m;if(v<=0&&c>=0&&m<=0)return u=c/(c-m),t.copy(n).addScaledVector(li,u);const g=l*m-p*h;if(g<=0&&h-l>=0&&p-m>=0)return Xs.subVectors(a,r),u=(h-l)/(h-l+(p-m)),t.copy(r).addScaledVector(Xs,u);const f=1/(g+v+d);return o=v*f,u=d*f,t.copy(n).addScaledVector(oi,o).addScaledVector(li,u)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const el={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},An={h:0,s:0,l:0},or={h:0,s:0,l:0};function pa(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+6*(e-i)*t:t<.5?e:t<2/3?i+6*(e-i)*(2/3-t):i}class ze{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Vt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,it.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=it.workingColorSpace){return this.r=e,this.g=t,this.b=n,it.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=it.workingColorSpace){if(e=Ul(e,1),t=Ut(t,0,1),n=Ut(n,0,1),t===0)this.r=this.g=this.b=n;else{const a=n<=.5?n*(1+t):n+t-n*t,o=2*n-a;this.r=pa(o,a,e+1/3),this.g=pa(o,a,e),this.b=pa(o,a,e-1/3)}return it.toWorkingColorSpace(this,r),this}setStyle(e,t=Vt){function n(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const o=r[1],u=r[2];switch(o){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return n(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return n(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return n(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=r[1],o=a.length;if(o===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(a,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Vt){const n=el[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=vi(e.r),this.g=vi(e.g),this.b=vi(e.b),this}copyLinearToSRGB(e){return this.r=Jr(e.r),this.g=Jr(e.g),this.b=Jr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Vt){return it.fromWorkingColorSpace(At.copy(this),e),65536*Math.round(Ut(255*At.r,0,255))+256*Math.round(Ut(255*At.g,0,255))+Math.round(Ut(255*At.b,0,255))}getHexString(e=Vt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=it.workingColorSpace){it.fromWorkingColorSpace(At.copy(this),t);const n=At.r,r=At.g,a=At.b,o=Math.max(n,r,a),u=Math.min(n,r,a);let s,c;const l=(u+o)/2;if(u===o)s=0,c=0;else{const h=o-u;switch(c=l<=.5?h/(o+u):h/(2-o-u),o){case n:s=(r-a)/h+(r<a?6:0);break;case r:s=(a-n)/h+2;break;case a:s=(n-r)/h+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=it.workingColorSpace){return it.fromWorkingColorSpace(At.copy(this),t),e.r=At.r,e.g=At.g,e.b=At.b,e}getStyle(e=Vt){it.fromWorkingColorSpace(At.copy(this),e);const t=At.r,n=At.g,r=At.b;return e!==Vt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*n)},${Math.round(255*r)})`}offsetHSL(e,t,n){return this.getHSL(An),this.setHSL(An.h+e,An.s+t,An.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(An),e.getHSL(or);const n=Kr(An.h,or.h,t),r=Kr(An.s,or.s,t),a=Kr(An.l,or.l,t);return this.setHSL(n,r,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,a=e.elements;return this.r=a[0]*t+a[3]*n+a[6]*r,this.g=a[1]*t+a[4]*n+a[7]*r,this.b=a[2]*t+a[5]*n+a[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const At=new ze;ze.NAMES=el;let Yl=0;class Ai extends wi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Yl++}),this.uuid=Zi(),this.name="",this.type="Material",this.blending=1,this.side=Dn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Pa,this.blendDst=La,this.blendEquation=Xn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ze(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Qn,this.stencilZFail=Qn,this.stencilZPass=Qn,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];r!==void 0?r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n:console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};function r(a){const o=[];for(const u in a){const s=a[u];delete s.metadata,o.push(s)}return o}if(n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==Dn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Pa&&(n.blendSrc=this.blendSrc),this.blendDst!==La&&(n.blendDst=this.blendDst),this.blendEquation!==Xn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Qn&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Qn&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Qn&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData),t){const a=r(e.textures),o=r(e.images);a.length>0&&(n.textures=a),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let a=0;a!==r;++a)n[a]=t[a].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class jn extends Ai{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Nt,this.combine=Bo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}Kl();function Kl(){const i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),r=new Uint32Array(512);for(let s=0;s<256;++s){const c=s-127;c<-27?(n[s]=0,n[256|s]=32768,r[s]=24,r[256|s]=24):c<-14?(n[s]=1024>>-c-14,n[256|s]=1024>>-c-14|32768,r[s]=-c-1,r[256|s]=-c-1):c<=15?(n[s]=c+15<<10,n[256|s]=c+15<<10|32768,r[s]=13,r[256|s]=13):c<128?(n[s]=31744,n[256|s]=64512,r[s]=24,r[256|s]=24):(n[s]=31744,n[256|s]=64512,r[s]=13,r[256|s]=13)}const a=new Uint32Array(2048),o=new Uint32Array(64),u=new Uint32Array(64);for(let s=1;s<1024;++s){let c=s<<13,l=0;for(;!(8388608&c);)c<<=1,l-=8388608;c&=-8388609,l+=947912704,a[s]=c|l}for(let s=1024;s<2048;++s)a[s]=939524096+(s-1024<<13);for(let s=1;s<31;++s)o[s]=s<<23;o[31]=1199570944,o[32]=2147483648;for(let s=33;s<63;++s)o[s]=2147483648+(s-32<<23);o[63]=3347054592;for(let s=1;s<64;++s)s!==32&&(u[s]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:r,mantissaTable:a,exponentTable:o,offsetTable:u}}const gt=new T,lr=new Ge;class zt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ds,this.updateRanges=[],this.gpuType=on,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)lr.fromBufferAttribute(this,t),lr.applyMatrix3(e),this.setXY(t,lr.x,lr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.applyMatrix3(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.applyMatrix4(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.applyNormalMatrix(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)gt.fromBufferAttribute(this,t),gt.transformDirection(e),this.setXYZ(t,gt.x,gt.y,gt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Li(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Dt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Li(t,this.array)),t}setX(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Li(t,this.array)),t}setY(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Li(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Li(t,this.array)),t}setW(e,t){return this.normalized&&(t=Dt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Dt(t,this.array),n=Dt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Dt(t,this.array),n=Dt(n,this.array),r=Dt(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,a){return e*=this.itemSize,this.normalized&&(t=Dt(t,this.array),n=Dt(n,this.array),r=Dt(r,this.array),a=Dt(a,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ds&&(e.usage=this.usage),e}}class tl extends zt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class nl extends zt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class _t extends zt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Zl=0;const Gt=new Ce,fa=new yt,ci=new T,Bt=new xn,Oi=new xn,St=new T;class Ot extends wi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Zl++}),this.uuid=Zi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Jo(e)?nl:tl)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const a=new We().getNormalMatrix(e);n.applyNormalMatrix(a),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Gt.makeRotationFromQuaternion(e),this.applyMatrix4(Gt),this}rotateX(e){return Gt.makeRotationX(e),this.applyMatrix4(Gt),this}rotateY(e){return Gt.makeRotationY(e),this.applyMatrix4(Gt),this}rotateZ(e){return Gt.makeRotationZ(e),this.applyMatrix4(Gt),this}translate(e,t,n){return Gt.makeTranslation(e,t,n),this.applyMatrix4(Gt),this}scale(e,t,n){return Gt.makeScale(e,t,n),this.applyMatrix4(Gt),this}lookAt(e){return fa.lookAt(e),fa.updateMatrix(),this.applyMatrix4(fa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(ci).negate(),this.translate(ci.x,ci.y,ci.z),this}setFromPoints(e){const t=[];for(let n=0,r=e.length;n<r;n++){const a=e[n];t.push(a.x,a.y,a.z||0)}return this.setAttribute("position",new _t(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new xn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new T(-1/0,-1/0,-1/0),new T(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const a=t[n];Bt.setFromBufferAttribute(a),this.morphTargetsRelative?(St.addVectors(this.boundingBox.min,Bt.min),this.boundingBox.expandByPoint(St),St.addVectors(this.boundingBox.max,Bt.max),this.boundingBox.expandByPoint(St)):(this.boundingBox.expandByPoint(Bt.min),this.boundingBox.expandByPoint(Bt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Mn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new T,1/0);if(e){const n=this.boundingSphere.center;if(Bt.setFromBufferAttribute(e),t)for(let a=0,o=t.length;a<o;a++){const u=t[a];Oi.setFromBufferAttribute(u),this.morphTargetsRelative?(St.addVectors(Bt.min,Oi.min),Bt.expandByPoint(St),St.addVectors(Bt.max,Oi.max),Bt.expandByPoint(St)):(Bt.expandByPoint(Oi.min),Bt.expandByPoint(Oi.max))}Bt.getCenter(n);let r=0;for(let a=0,o=e.count;a<o;a++)St.fromBufferAttribute(e,a),r=Math.max(r,n.distanceToSquared(St));if(t)for(let a=0,o=t.length;a<o;a++){const u=t[a],s=this.morphTargetsRelative;for(let c=0,l=u.count;c<l;c++)St.fromBufferAttribute(u,c),s&&(ci.fromBufferAttribute(e,c),St.add(ci)),r=Math.max(r,n.distanceToSquared(St))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");const n=t.position,r=t.normal,a=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new zt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),u=[],s=[];for(let q=0;q<n.count;q++)u[q]=new T,s[q]=new T;const c=new T,l=new T,h=new T,d=new Ge,p=new Ge,m=new Ge,v=new T,g=new T;function f(q,U,z){c.fromBufferAttribute(n,q),l.fromBufferAttribute(n,U),h.fromBufferAttribute(n,z),d.fromBufferAttribute(a,q),p.fromBufferAttribute(a,U),m.fromBufferAttribute(a,z),l.sub(c),h.sub(c),p.sub(d),m.sub(d);const Z=1/(p.x*m.y-m.x*p.y);isFinite(Z)&&(v.copy(l).multiplyScalar(m.y).addScaledVector(h,-p.y).multiplyScalar(Z),g.copy(h).multiplyScalar(p.x).addScaledVector(l,-m.x).multiplyScalar(Z),u[q].add(v),u[U].add(v),u[z].add(v),s[q].add(g),s[U].add(g),s[z].add(g))}let x=this.groups;x.length===0&&(x=[{start:0,count:e.count}]);for(let q=0,U=x.length;q<U;++q){const z=x[q],Z=z.start;for(let G=Z,J=Z+z.count;G<J;G+=3)f(e.getX(G+0),e.getX(G+1),e.getX(G+2))}const M=new T,S=new T,w=new T,P=new T;function L(q){w.fromBufferAttribute(r,q),P.copy(w);const U=u[q];M.copy(U),M.sub(w.multiplyScalar(w.dot(U))).normalize(),S.crossVectors(P,U);const z=S.dot(s[q])<0?-1:1;o.setXYZW(q,M.x,M.y,M.z,z)}for(let q=0,U=x.length;q<U;++q){const z=x[q],Z=z.start;for(let G=Z,J=Z+z.count;G<J;G+=3)L(e.getX(G+0)),L(e.getX(G+1)),L(e.getX(G+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new zt(new Float32Array(3*t.count),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);const r=new T,a=new T,o=new T,u=new T,s=new T,c=new T,l=new T,h=new T;if(e)for(let d=0,p=e.count;d<p;d+=3){const m=e.getX(d+0),v=e.getX(d+1),g=e.getX(d+2);r.fromBufferAttribute(t,m),a.fromBufferAttribute(t,v),o.fromBufferAttribute(t,g),l.subVectors(o,a),h.subVectors(r,a),l.cross(h),u.fromBufferAttribute(n,m),s.fromBufferAttribute(n,v),c.fromBufferAttribute(n,g),u.add(l),s.add(l),c.add(l),n.setXYZ(m,u.x,u.y,u.z),n.setXYZ(v,s.x,s.y,s.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,p=t.count;d<p;d+=3)r.fromBufferAttribute(t,d+0),a.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),l.subVectors(o,a),h.subVectors(r,a),l.cross(h),n.setXYZ(d+0,l.x,l.y,l.z),n.setXYZ(d+1,l.x,l.y,l.z),n.setXYZ(d+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)St.fromBufferAttribute(e,t),St.normalize(),e.setXYZ(t,St.x,St.y,St.z)}toNonIndexed(){function e(u,s){const c=u.array,l=u.itemSize,h=u.normalized,d=new c.constructor(s.length*l);let p=0,m=0;for(let v=0,g=s.length;v<g;v++){p=u.isInterleavedBufferAttribute?s[v]*u.data.stride+u.offset:s[v]*l;for(let f=0;f<l;f++)d[m++]=c[p++]}return new zt(d,l,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ot,n=this.index.array,r=this.attributes;for(const u in r){const s=e(r[u],n);t.setAttribute(u,s)}const a=this.morphAttributes;for(const u in a){const s=[],c=a[u];for(let l=0,h=c.length;l<h;l++){const d=e(c[l],n);s.push(d)}t.morphAttributes[u]=s}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let u=0,s=o.length;u<s;u++){const c=o[u];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const s=this.parameters;for(const c in s)s[c]!==void 0&&(e[c]=s[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const s in n){const c=n[s];e.data.attributes[s]=c.toJSON(e.data)}const r={};let a=!1;for(const s in this.morphAttributes){const c=this.morphAttributes[s],l=[];for(let h=0,d=c.length;h<d;h++){const p=c[h];l.push(p.toJSON(e.data))}l.length>0&&(r[s]=l,a=!0)}a&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const u=this.boundingSphere;return u!==null&&(e.data.boundingSphere={center:u.center.toArray(),radius:u.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const r=e.attributes;for(const c in r){const l=r[c];this.setAttribute(c,l.clone(t))}const a=e.morphAttributes;for(const c in a){const l=[],h=a[c];for(let d=0,p=h.length;d<p;d++)l.push(h[d].clone(t));this.morphAttributes[c]=l}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,l=o.length;c<l;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const u=e.boundingBox;u!==null&&(this.boundingBox=u.clone());const s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const js=new Ce,Hn=new Ji,cr=new Mn,qs=new T,ur=new T,hr=new T,dr=new T,ma=new T,pr=new T,Ys=new T,fr=new T;class mt extends yt{constructor(e=new Ot,t=new jn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){const n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,a=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const u=this.morphTargetInfluences;if(a&&u){pr.set(0,0,0);for(let s=0,c=a.length;s<c;s++){const l=u[s],h=a[s];l!==0&&(ma.fromBufferAttribute(h,e),o?pr.addScaledVector(ma,l):pr.addScaledVector(ma.sub(t),l))}t.add(pr)}return t}raycast(e,t){const n=this.geometry,r=this.material,a=this.matrixWorld;if(r!==void 0){if(n.boundingSphere===null&&n.computeBoundingSphere(),cr.copy(n.boundingSphere),cr.applyMatrix4(a),Hn.copy(e.ray).recast(e.near),cr.containsPoint(Hn.origin)===!1&&(Hn.intersectSphere(cr,qs)===null||Hn.origin.distanceToSquared(qs)>(e.far-e.near)**2))return;js.copy(a).invert(),Hn.copy(e.ray).applyMatrix4(js),n.boundingBox!==null&&Hn.intersectsBox(n.boundingBox)===!1||this._computeIntersections(e,t,Hn)}}_computeIntersections(e,t,n){let r;const a=this.geometry,o=this.material,u=a.index,s=a.attributes.position,c=a.attributes.uv,l=a.attributes.uv1,h=a.attributes.normal,d=a.groups,p=a.drawRange;if(u!==null)if(Array.isArray(o))for(let m=0,v=d.length;m<v;m++){const g=d[m],f=o[g.materialIndex];for(let x=Math.max(g.start,p.start),M=Math.min(u.count,Math.min(g.start+g.count,p.start+p.count));x<M;x+=3)r=mr(this,f,e,n,c,l,h,u.getX(x),u.getX(x+1),u.getX(x+2)),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=g.materialIndex,t.push(r))}else for(let m=Math.max(0,p.start),v=Math.min(u.count,p.start+p.count);m<v;m+=3)r=mr(this,o,e,n,c,l,h,u.getX(m),u.getX(m+1),u.getX(m+2)),r&&(r.faceIndex=Math.floor(m/3),t.push(r));else if(s!==void 0)if(Array.isArray(o))for(let m=0,v=d.length;m<v;m++){const g=d[m],f=o[g.materialIndex];for(let x=Math.max(g.start,p.start),M=Math.min(s.count,Math.min(g.start+g.count,p.start+p.count));x<M;x+=3)r=mr(this,f,e,n,c,l,h,x,x+1,x+2),r&&(r.faceIndex=Math.floor(x/3),r.face.materialIndex=g.materialIndex,t.push(r))}else for(let m=Math.max(0,p.start),v=Math.min(s.count,p.start+p.count);m<v;m+=3)r=mr(this,o,e,n,c,l,h,m,m+1,m+2),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}function mr(i,e,t,n,r,a,o,u,s,c){i.getVertexPosition(u,ur),i.getVertexPosition(s,hr),i.getVertexPosition(c,dr);const l=function(h,d,p,m,v,g,f,x){let M;if(M=d.side===It?m.intersectTriangle(f,g,v,!0,x):m.intersectTriangle(v,g,f,d.side===Dn,x),M===null)return null;fr.copy(x),fr.applyMatrix4(h.matrixWorld);const S=p.ray.origin.distanceTo(fr);return S<p.near||S>p.far?null:{distance:S,point:fr.clone(),object:h}}(i,e,t,n,ur,hr,dr,Ys);if(l){const h=new T;Wt.getBarycoord(Ys,ur,hr,dr,h),r&&(l.uv=Wt.getInterpolatedAttribute(r,u,s,c,h,new Ge)),a&&(l.uv1=Wt.getInterpolatedAttribute(a,u,s,c,h,new Ge)),o&&(l.normal=Wt.getInterpolatedAttribute(o,u,s,c,h,new T),l.normal.dot(n.direction)>0&&l.normal.multiplyScalar(-1));const d={a:u,b:s,c,normal:new T,materialIndex:0};Wt.getNormal(ur,hr,dr,d.normal),l.face=d,l.barycoord=h}return l}class Jn extends Ot{constructor(e=1,t=1,n=1,r=1,a=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:a,depthSegments:o};const u=this;r=Math.floor(r),a=Math.floor(a),o=Math.floor(o);const s=[],c=[],l=[],h=[];let d=0,p=0;function m(v,g,f,x,M,S,w,P,L,q,U){const z=S/L,Z=w/q,G=S/2,J=w/2,W=P/2,$=L+1,ee=q+1;let ce=0,ue=0;const Me=new T;for(let Pe=0;Pe<ee;Pe++){const ie=Pe*Z-J;for(let K=0;K<$;K++){const fe=K*z-G;Me[v]=fe*x,Me[g]=ie*M,Me[f]=W,c.push(Me.x,Me.y,Me.z),Me[v]=0,Me[g]=0,Me[f]=P>0?1:-1,l.push(Me.x,Me.y,Me.z),h.push(K/L),h.push(1-Pe/q),ce+=1}}for(let Pe=0;Pe<q;Pe++)for(let ie=0;ie<L;ie++){const K=d+ie+$*Pe,fe=d+ie+$*(Pe+1),Se=d+(ie+1)+$*(Pe+1),b=d+(ie+1)+$*Pe;s.push(K,fe,b),s.push(fe,Se,b),ue+=6}u.addGroup(p,ue,U),p+=ue,d+=ce}m("z","y","x",-1,-1,n,t,e,o,a,0),m("z","y","x",1,-1,n,t,-e,o,a,1),m("x","z","y",1,1,e,n,t,r,o,2),m("x","z","y",1,-1,e,n,-t,r,o,3),m("x","y","z",1,-1,e,t,n,r,a,4),m("x","y","z",-1,-1,e,t,-n,r,a,5),this.setIndex(s),this.setAttribute("position",new _t(c,3)),this.setAttribute("normal",new _t(l,3)),this.setAttribute("uv",new _t(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Jn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ti(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Ct(i){const e={};for(let t=0;t<i.length;t++){const n=Ti(i[t]);for(const r in n)e[r]=n[r]}return e}function il(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:it.workingColorSpace}const Jl={clone:Ti,merge:Ct};class Un extends Ai{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,this.fragmentShader=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ti(e.uniforms),this.uniformsGroups=function(t){const n=[];for(let r=0;r<t.length;r++)n.push(t[r].clone());return n}(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Ss extends yt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ce,this.projectionMatrix=new Ce,this.projectionMatrixInverse=new Ce,this.coordinateSystem=bi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Rn=new T,Ks=new Ge,Zs=new Ge;class kt extends Ss{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=2*os*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(.5*Yr*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*os*Math.atan(Math.tan(.5*Yr*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Rn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Rn.x,Rn.y).multiplyScalar(-e/Rn.z),Rn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Rn.x,Rn.y).multiplyScalar(-e/Rn.z)}getViewSize(e,t){return this.getViewBounds(e,Ks,Zs),t.subVectors(Zs,Ks)}setViewOffset(e,t,n,r,a,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(.5*Yr*this.fov)/this.zoom,n=2*t,r=this.aspect*n,a=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const s=o.fullWidth,c=o.fullHeight;a+=o.offsetX*r/s,t-=o.offsetY*n/c,r*=o.width/s,n*=o.height/c}const u=this.filmOffset;u!==0&&(a+=e*u/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ui=-90;class $l extends yt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new kt(ui,1,e,t);r.layers=this.layers,this.add(r);const a=new kt(ui,1,e,t);a.layers=this.layers,this.add(a);const o=new kt(ui,1,e,t);o.layers=this.layers,this.add(o);const u=new kt(ui,1,e,t);u.layers=this.layers,this.add(u);const s=new kt(ui,1,e,t);s.layers=this.layers,this.add(s);const c=new kt(ui,1,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,a,o,u,s]=t;for(const c of t)this.remove(c);if(e===bi)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),u.up.set(0,1,0),u.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else{if(e!==Ir)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),u.up.set(0,-1,0),u.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1)}for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,o,u,s,c,l]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,a),e.setRenderTarget(n,1,r),e.render(t,o),e.setRenderTarget(n,2,r),e.render(t,u),e.setRenderTarget(n,3,r),e.render(t,s),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,r),e.render(t,l),e.setRenderTarget(h,d,p),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class rl extends Rt{constructor(e,t,n,r,a,o,u,s,c,l){super(e=e!==void 0?e:[],t=t!==void 0?t:Mi,n,r,a,o,u,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Ql extends Yn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new rl(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0&&t.generateMipmaps,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:sn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Jn(5,5,5),a=new Un({name:"CubemapFromEquirect",uniforms:Ti(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:It,blending:0});a.uniforms.tEquirect.value=t;const o=new mt(r,a),u=t.minFilter;return t.minFilter===gi&&(t.minFilter=sn),new $l(1,10,this).update(e,o),t.minFilter=u,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,r){const a=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,r);e.setRenderTarget(a)}}const ga=new T,ec=new T,tc=new We;class Pn{constructor(e=new T(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=ga.subVectors(n,t).cross(ec.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(ga),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return a<0||a>1?null:t.copy(e.start).addScaledVector(n,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||tc.getNormalMatrix(e),r=this.coplanarPoint(ga).applyMatrix4(e),a=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Gn=new Mn,gr=new T;class Gr{constructor(e=new Pn,t=new Pn,n=new Pn,r=new Pn,a=new Pn,o=new Pn){this.planes=[e,t,n,r,a,o]}set(e,t,n,r,a,o){const u=this.planes;return u[0].copy(e),u[1].copy(t),u[2].copy(n),u[3].copy(r),u[4].copy(a),u[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3){const n=this.planes,r=e.elements,a=r[0],o=r[1],u=r[2],s=r[3],c=r[4],l=r[5],h=r[6],d=r[7],p=r[8],m=r[9],v=r[10],g=r[11],f=r[12],x=r[13],M=r[14],S=r[15];if(n[0].setComponents(s-a,d-c,g-p,S-f).normalize(),n[1].setComponents(s+a,d+c,g+p,S+f).normalize(),n[2].setComponents(s+o,d+l,g+m,S+x).normalize(),n[3].setComponents(s-o,d-l,g-m,S-x).normalize(),n[4].setComponents(s-u,d-h,g-v,S-M).normalize(),t===bi)n[5].setComponents(s+u,d+h,g+v,S+M).normalize();else{if(t!==Ir)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);n[5].setComponents(u,h,v,M).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Gn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Gn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Gn)}intersectsSprite(e){return Gn.center.set(0,0,0),Gn.radius=.7071067811865476,Gn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Gn)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(gr.x=r.normal.x>0?e.max.x:e.min.x,gr.y=r.normal.y>0?e.max.y:e.min.y,gr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(gr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function al(){let i=null,e=!1,t=null,n=null;function r(a,o){t(a,o),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){i=a}}}function nc(i){const e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);const n=e.get(t);n&&(i.deleteBuffer(n.buffer),e.delete(t))},update:function(t,n){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){const a=e.get(t);return void((!a||a.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}const r=e.get(t);if(r===void 0)e.set(t,function(a,o){const u=a.array,s=a.usage,c=u.byteLength,l=i.createBuffer();let h;if(i.bindBuffer(o,l),i.bufferData(o,u,s),a.onUploadCallback(),u instanceof Float32Array)h=i.FLOAT;else if(u instanceof Uint16Array)h=a.isFloat16BufferAttribute?i.HALF_FLOAT:i.UNSIGNED_SHORT;else if(u instanceof Int16Array)h=i.SHORT;else if(u instanceof Uint32Array)h=i.UNSIGNED_INT;else if(u instanceof Int32Array)h=i.INT;else if(u instanceof Int8Array)h=i.BYTE;else if(u instanceof Uint8Array)h=i.UNSIGNED_BYTE;else{if(!(u instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);h=i.UNSIGNED_BYTE}return{buffer:l,type:h,bytesPerElement:u.BYTES_PER_ELEMENT,version:a.version,size:c}}(t,n));else if(r.version<t.version){if(r.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(a,o,u){const s=o.array,c=o.updateRanges;if(i.bindBuffer(u,a),c.length===0)i.bufferSubData(u,0,s);else{c.sort((h,d)=>h.start-d.start);let l=0;for(let h=1;h<c.length;h++){const d=c[l],p=c[h];p.start<=d.start+d.count+1?d.count=Math.max(d.count,p.start+p.count-d.start):(++l,c[l]=p)}c.length=l+1;for(let h=0,d=c.length;h<d;h++){const p=c[h];i.bufferSubData(u,p.start*s.BYTES_PER_ELEMENT,s,p.start,p.count)}o.clearUpdateRanges()}o.onUploadCallback()})(r.buffer,t,n),r.version=t.version}}}}class Ri extends Ot{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const a=e/2,o=t/2,u=Math.floor(n),s=Math.floor(r),c=u+1,l=s+1,h=e/u,d=t/s,p=[],m=[],v=[],g=[];for(let f=0;f<l;f++){const x=f*d-o;for(let M=0;M<c;M++){const S=M*h-a;m.push(S,-x,0),v.push(0,0,1),g.push(M/u),g.push(1-f/s)}}for(let f=0;f<s;f++)for(let x=0;x<u;x++){const M=x+c*f,S=x+c*(f+1),w=x+1+c*(f+1),P=x+1+c*f;p.push(M,S,P),p.push(S,w,P)}this.setIndex(p),this.setAttribute("position",new _t(m,3)),this.setAttribute("normal",new _t(v,3)),this.setAttribute("uv",new _t(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ri(e.width,e.height,e.widthSegments,e.heightSegments)}}const ke={alphahash_fragment:`#ifdef USE_ALPHAHASH
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
}`},de={common:{diffuse:{value:new ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new We}},envmap:{envMap:{value:null},envMapRotation:{value:new We},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new We}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new We}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new We},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new We},normalScale:{value:new Ge(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new We},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new We}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new We}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new We}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0},uvTransform:{value:new We}},sprite:{diffuse:{value:new ze(16777215)},opacity:{value:1},center:{value:new Ge(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new We},alphaMap:{value:null},alphaMapTransform:{value:new We},alphaTest:{value:0}}},an={basic:{uniforms:Ct([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:ke.meshbasic_vert,fragmentShader:ke.meshbasic_frag},lambert:{uniforms:Ct([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new ze(0)}}]),vertexShader:ke.meshlambert_vert,fragmentShader:ke.meshlambert_frag},phong:{uniforms:Ct([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new ze(0)},specular:{value:new ze(1118481)},shininess:{value:30}}]),vertexShader:ke.meshphong_vert,fragmentShader:ke.meshphong_frag},standard:{uniforms:Ct([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag},toon:{uniforms:Ct([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new ze(0)}}]),vertexShader:ke.meshtoon_vert,fragmentShader:ke.meshtoon_frag},matcap:{uniforms:Ct([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:ke.meshmatcap_vert,fragmentShader:ke.meshmatcap_frag},points:{uniforms:Ct([de.points,de.fog]),vertexShader:ke.points_vert,fragmentShader:ke.points_frag},dashed:{uniforms:Ct([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ke.linedashed_vert,fragmentShader:ke.linedashed_frag},depth:{uniforms:Ct([de.common,de.displacementmap]),vertexShader:ke.depth_vert,fragmentShader:ke.depth_frag},normal:{uniforms:Ct([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:ke.meshnormal_vert,fragmentShader:ke.meshnormal_frag},sprite:{uniforms:Ct([de.sprite,de.fog]),vertexShader:ke.sprite_vert,fragmentShader:ke.sprite_frag},background:{uniforms:{uvTransform:{value:new We},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ke.background_vert,fragmentShader:ke.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new We}},vertexShader:ke.backgroundCube_vert,fragmentShader:ke.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ke.cube_vert,fragmentShader:ke.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ke.equirect_vert,fragmentShader:ke.equirect_frag},distanceRGBA:{uniforms:Ct([de.common,de.displacementmap,{referencePosition:{value:new T},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ke.distanceRGBA_vert,fragmentShader:ke.distanceRGBA_frag},shadow:{uniforms:Ct([de.lights,de.fog,{color:{value:new ze(0)},opacity:{value:1}}]),vertexShader:ke.shadow_vert,fragmentShader:ke.shadow_frag}};an.physical={uniforms:Ct([an.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new We},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new We},clearcoatNormalScale:{value:new Ge(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new We},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new We},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new We},sheen:{value:0},sheenColor:{value:new ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new We},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new We},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new We},transmissionSamplerSize:{value:new Ge},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new We},attenuationDistance:{value:0},attenuationColor:{value:new ze(0)},specularColor:{value:new ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new We},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new We},anisotropyVector:{value:new Ge},anisotropyMap:{value:null},anisotropyMapTransform:{value:new We}}]),vertexShader:ke.meshphysical_vert,fragmentShader:ke.meshphysical_frag};const _r={r:0,b:0,g:0},Vn=new Nt,ic=new Ce;function rc(i,e,t,n,r,a,o){const u=new ze(0);let s,c,l=a===!0?0:1,h=null,d=0,p=null;function m(g){let f=g.isScene===!0?g.background:null;return f&&f.isTexture&&(f=(g.backgroundBlurriness>0?t:e).get(f)),f}function v(g,f){g.getRGB(_r,il(i)),n.buffers.color.setClear(_r.r,_r.g,_r.b,f,o)}return{getClearColor:function(){return u},setClearColor:function(g,f=1){u.set(g),l=f,v(u,l)},getClearAlpha:function(){return l},setClearAlpha:function(g){l=g,v(u,l)},render:function(g){let f=!1;const x=m(g);x===null?v(u,l):x&&x.isColor&&(v(x,1),f=!0);const M=i.xr.getEnvironmentBlendMode();M==="additive"?n.buffers.color.setClear(0,0,0,1,o):M==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||f)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))},addToRenderList:function(g,f){const x=m(f);x&&(x.isCubeTexture||x.mapping===zr)?(c===void 0&&(c=new mt(new Jn(1,1,1),new Un({name:"BackgroundCubeMaterial",uniforms:Ti(an.backgroundCube.uniforms),vertexShader:an.backgroundCube.vertexShader,fragmentShader:an.backgroundCube.fragmentShader,side:It,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(M,S,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(c)),Vn.copy(f.backgroundRotation),Vn.x*=-1,Vn.y*=-1,Vn.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Vn.y*=-1,Vn.z*=-1),c.material.uniforms.envMap.value=x,c.material.uniforms.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(ic.makeRotationFromEuler(Vn)),c.material.toneMapped=it.getTransfer(x.colorSpace)!==ot,h===x&&d===x.version&&p===i.toneMapping||(c.material.needsUpdate=!0,h=x,d=x.version,p=i.toneMapping),c.layers.enableAll(),g.unshift(c,c.geometry,c.material,0,0,null)):x&&x.isTexture&&(s===void 0&&(s=new mt(new Ri(2,2),new Un({name:"BackgroundMaterial",uniforms:Ti(an.background.uniforms),vertexShader:an.background.vertexShader,fragmentShader:an.background.fragmentShader,side:Dn,depthTest:!1,depthWrite:!1,fog:!1})),s.geometry.deleteAttribute("normal"),Object.defineProperty(s.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(s)),s.material.uniforms.t2D.value=x,s.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,s.material.toneMapped=it.getTransfer(x.colorSpace)!==ot,x.matrixAutoUpdate===!0&&x.updateMatrix(),s.material.uniforms.uvTransform.value.copy(x.matrix),h===x&&d===x.version&&p===i.toneMapping||(s.material.needsUpdate=!0,h=x,d=x.version,p=i.toneMapping),s.layers.enableAll(),g.unshift(s,s.geometry,s.material,0,0,null))}}}function ac(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=c(null);let a=r,o=!1;function u(f){return i.bindVertexArray(f)}function s(f){return i.deleteVertexArray(f)}function c(f){const x=[],M=[],S=[];for(let w=0;w<t;w++)x[w]=0,M[w]=0,S[w]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:x,enabledAttributes:M,attributeDivisors:S,object:f,attributes:{},index:null}}function l(){const f=a.newAttributes;for(let x=0,M=f.length;x<M;x++)f[x]=0}function h(f){d(f,0)}function d(f,x){const M=a.newAttributes,S=a.enabledAttributes,w=a.attributeDivisors;M[f]=1,S[f]===0&&(i.enableVertexAttribArray(f),S[f]=1),w[f]!==x&&(i.vertexAttribDivisor(f,x),w[f]=x)}function p(){const f=a.newAttributes,x=a.enabledAttributes;for(let M=0,S=x.length;M<S;M++)x[M]!==f[M]&&(i.disableVertexAttribArray(M),x[M]=0)}function m(f,x,M,S,w,P,L){L===!0?i.vertexAttribIPointer(f,x,M,w,P):i.vertexAttribPointer(f,x,M,S,w,P)}function v(){g(),o=!0,a!==r&&(a=r,u(a.object))}function g(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:function(f,x,M,S,w){let P=!1;const L=function(q,U,z){const Z=z.wireframe===!0;let G=n[q.id];G===void 0&&(G={},n[q.id]=G);let J=G[U.id];J===void 0&&(J={},G[U.id]=J);let W=J[Z];return W===void 0&&(W=c(i.createVertexArray()),J[Z]=W),W}(S,M,x);a!==L&&(a=L,u(a.object)),P=function(q,U,z,Z){const G=a.attributes,J=U.attributes;let W=0;const $=z.getAttributes();for(const ee in $)if($[ee].location>=0){const ce=G[ee];let ue=J[ee];if(ue===void 0&&(ee==="instanceMatrix"&&q.instanceMatrix&&(ue=q.instanceMatrix),ee==="instanceColor"&&q.instanceColor&&(ue=q.instanceColor)),ce===void 0||ce.attribute!==ue||ue&&ce.data!==ue.data)return!0;W++}return a.attributesNum!==W||a.index!==Z}(f,S,M,w),P&&function(q,U,z,Z){const G={},J=U.attributes;let W=0;const $=z.getAttributes();for(const ee in $)if($[ee].location>=0){let ce=J[ee];ce===void 0&&(ee==="instanceMatrix"&&q.instanceMatrix&&(ce=q.instanceMatrix),ee==="instanceColor"&&q.instanceColor&&(ce=q.instanceColor));const ue={};ue.attribute=ce,ce&&ce.data&&(ue.data=ce.data),G[ee]=ue,W++}a.attributes=G,a.attributesNum=W,a.index=Z}(f,S,M,w),w!==null&&e.update(w,i.ELEMENT_ARRAY_BUFFER),(P||o)&&(o=!1,function(q,U,z,Z){l();const G=Z.attributes,J=z.getAttributes(),W=U.defaultAttributeValues;for(const $ in J){const ee=J[$];if(ee.location>=0){let ce=G[$];if(ce===void 0&&($==="instanceMatrix"&&q.instanceMatrix&&(ce=q.instanceMatrix),$==="instanceColor"&&q.instanceColor&&(ce=q.instanceColor)),ce!==void 0){const ue=ce.normalized,Me=ce.itemSize,Pe=e.get(ce);if(Pe===void 0)continue;const ie=Pe.buffer,K=Pe.type,fe=Pe.bytesPerElement,Se=K===i.INT||K===i.UNSIGNED_INT||ce.gpuType===ds;if(ce.isInterleavedBufferAttribute){const b=ce.data,y=b.stride,I=ce.offset;if(b.isInstancedInterleavedBuffer){for(let Y=0;Y<ee.locationSize;Y++)d(ee.location+Y,b.meshPerAttribute);q.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=b.meshPerAttribute*b.count)}else for(let Y=0;Y<ee.locationSize;Y++)h(ee.location+Y);i.bindBuffer(i.ARRAY_BUFFER,ie);for(let Y=0;Y<ee.locationSize;Y++)m(ee.location+Y,Me/ee.locationSize,K,ue,y*fe,(I+Me/ee.locationSize*Y)*fe,Se)}else{if(ce.isInstancedBufferAttribute){for(let b=0;b<ee.locationSize;b++)d(ee.location+b,ce.meshPerAttribute);q.isInstancedMesh!==!0&&Z._maxInstanceCount===void 0&&(Z._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let b=0;b<ee.locationSize;b++)h(ee.location+b);i.bindBuffer(i.ARRAY_BUFFER,ie);for(let b=0;b<ee.locationSize;b++)m(ee.location+b,Me/ee.locationSize,K,ue,Me*fe,Me/ee.locationSize*b*fe,Se)}}else if(W!==void 0){const ue=W[$];if(ue!==void 0)switch(ue.length){case 2:i.vertexAttrib2fv(ee.location,ue);break;case 3:i.vertexAttrib3fv(ee.location,ue);break;case 4:i.vertexAttrib4fv(ee.location,ue);break;default:i.vertexAttrib1fv(ee.location,ue)}}}}p()}(f,x,M,S),w!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(w).buffer))},reset:v,resetDefaultState:g,dispose:function(){v();for(const f in n){const x=n[f];for(const M in x){const S=x[M];for(const w in S)s(S[w].object),delete S[w];delete x[M]}delete n[f]}},releaseStatesOfGeometry:function(f){if(n[f.id]===void 0)return;const x=n[f.id];for(const M in x){const S=x[M];for(const w in S)s(S[w].object),delete S[w];delete x[M]}delete n[f.id]},releaseStatesOfProgram:function(f){for(const x in n){const M=n[x];if(M[f.id]===void 0)continue;const S=M[f.id];for(const w in S)s(S[w].object),delete S[w];delete M[f.id]}},initAttributes:l,enableAttribute:h,disableUnusedAttributes:p}}function sc(i,e,t){let n;function r(a,o,u){u!==0&&(i.drawArraysInstanced(n,a,o,u),t.update(o,n,u))}this.setMode=function(a){n=a},this.render=function(a,o){i.drawArrays(n,a,o),t.update(o,n,1)},this.renderInstances=r,this.renderMultiDraw=function(a,o,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,a,0,o,0,u);let s=0;for(let c=0;c<u;c++)s+=o[c];t.update(s,n,1)},this.renderMultiDrawInstances=function(a,o,u,s){if(u===0)return;const c=e.get("WEBGL_multi_draw");if(c===null)for(let l=0;l<a.length;l++)r(a[l],o[l],s[l]);else{c.multiDrawArraysInstancedWEBGL(n,a,0,o,0,s,0,u);let l=0;for(let h=0;h<u;h++)l+=o[h];for(let h=0;h<s.length;h++)t.update(l,n,s[h])}}}function oc(i,e,t,n){let r;function a(d){if(d==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";d="mediump"}return d==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let o=t.precision!==void 0?t.precision:"highp";const u=a(o);u!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",u,"instead."),o=u);const s=t.logarithmicDepthBuffer===!0,c=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control");if(c===!0){const d=e.get("EXT_clip_control");d.clipControlEXT(d.LOWER_LEFT_EXT,d.ZERO_TO_ONE_EXT)}const l=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),h=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS);return{isWebGL2:!0,getMaxAnisotropy:function(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const d=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(d.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r},getMaxPrecision:a,textureFormatReadable:function(d){return d===tn||n.convert(d)===i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(d){const p=d===Ki&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(d!==vn&&n.convert(d)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&d!==on&&!p)},precision:o,logarithmicDepthBuffer:s,reverseDepthBuffer:c,maxTextures:l,maxVertexTextures:h,maxTextureSize:i.getParameter(i.MAX_TEXTURE_SIZE),maxCubemapSize:i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:i.getParameter(i.MAX_VERTEX_ATTRIBS),maxVertexUniforms:i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:i.getParameter(i.MAX_VARYING_VECTORS),maxFragmentUniforms:i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),vertexTextures:h>0,maxSamples:i.getParameter(i.MAX_SAMPLES)}}function lc(i){const e=this;let t=null,n=0,r=!1,a=!1;const o=new Pn,u=new We,s={value:null,needsUpdate:!1};function c(l,h,d,p){const m=l!==null?l.length:0;let v=null;if(m!==0){if(v=s.value,p!==!0||v===null){const g=d+4*m,f=h.matrixWorldInverse;u.getNormalMatrix(f),(v===null||v.length<g)&&(v=new Float32Array(g));for(let x=0,M=d;x!==m;++x,M+=4)o.copy(l[x]).applyMatrix4(f,u),o.normal.toArray(v,M),v[M+3]=o.constant}s.value=v,s.needsUpdate=!0}return e.numPlanes=m,e.numIntersection=0,v}this.uniform=s,this.numPlanes=0,this.numIntersection=0,this.init=function(l,h){const d=l.length!==0||h||n!==0||r;return r=h,n=l.length,d},this.beginShadows=function(){a=!0,c(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(l,h){t=c(l,h,0)},this.setState=function(l,h,d){const p=l.clippingPlanes,m=l.clipIntersection,v=l.clipShadows,g=i.get(l);if(!r||p===null||p.length===0||a&&!v)a?c(null):function(){s.value!==t&&(s.value=t,s.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}();else{const f=a?0:n,x=4*f;let M=g.clippingState||null;s.value=M,M=c(p,h,x,d);for(let S=0;S!==x;++S)M[S]=t[S];g.clippingState=M,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=f}}}function cc(i){let e=new WeakMap;function t(r,a){return a===Da?r.mapping=Mi:a===Ua&&(r.mapping=Si),r}function n(r){const a=r.target;a.removeEventListener("dispose",n);const o=e.get(a);o!==void 0&&(e.delete(a),o.dispose())}return{get:function(r){if(r&&r.isTexture){const a=r.mapping;if(a===Da||a===Ua){if(e.has(r))return t(e.get(r).texture,r.mapping);{const o=r.image;if(o&&o.height>0){const u=new Ql(o.height);return u.fromEquirectangularTexture(i,r),e.set(r,u),r.addEventListener("dispose",n),t(u.texture,r.mapping)}return null}}}return r},dispose:function(){e=new WeakMap}}}class ys extends Ss{constructor(e=-1,t=1,n=1,r=-1,a=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=a,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,a,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let a=n-e,o=n+e,u=r+t,s=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,l=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,o=a+c*this.view.width,u-=l*this.view.offsetY,s=u-l*this.view.height}this.projectionMatrix.makeOrthographic(a,o,u,s,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Js=[.125,.215,.35,.446,.526,.582],Fi=20,_a=new ys,$s=new ze;let va=null,xa=0,Ma=0,Sa=!1;const Wn=(1+Math.sqrt(5))/2,hi=1/Wn,Qs=[new T(-Wn,hi,0),new T(Wn,hi,0),new T(-hi,0,Wn),new T(hi,0,Wn),new T(0,Wn,-hi),new T(0,Wn,hi),new T(-1,1,-1),new T(1,1,-1),new T(-1,1,1),new T(1,1,1)];class eo{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){va=this._renderer.getRenderTarget(),xa=this._renderer.getActiveCubeFace(),Ma=this._renderer.getActiveMipmapLevel(),Sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(e,n,r,a),t>0&&this._blur(a,0,0,t),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=io(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=no(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(va,xa,Ma),this._renderer.xr.enabled=Sa,e.scissorTest=!1,vr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Mi||e.mapping===Si?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),va=this._renderer.getRenderTarget(),xa=this._renderer.getActiveCubeFace(),Ma=this._renderer.getActiveMipmapLevel(),Sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:sn,minFilter:sn,generateMipmaps:!1,type:Ki,format:tn,colorSpace:In,depthBuffer:!1},r=to(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=to(e,t,n);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=function(o){const u=[],s=[],c=[];let l=o;const h=o-4+1+Js.length;for(let d=0;d<h;d++){const p=Math.pow(2,l);s.push(p);let m=1/p;d>o-4?m=Js[d-o+4-1]:d===0&&(m=0),c.push(m);const v=1/(p-2),g=-v,f=1+v,x=[g,g,f,g,f,f,g,g,f,f,g,f],M=6,S=6,w=3,P=2,L=1,q=new Float32Array(w*S*M),U=new Float32Array(P*S*M),z=new Float32Array(L*S*M);for(let G=0;G<M;G++){const J=G%3*2/3-1,W=G>2?0:-1,$=[J,W,0,J+2/3,W,0,J+2/3,W+1,0,J,W,0,J+2/3,W+1,0,J,W+1,0];q.set($,w*S*G),U.set(x,P*S*G);const ee=[G,G,G,G,G,G];z.set(ee,L*S*G)}const Z=new Ot;Z.setAttribute("position",new zt(q,w)),Z.setAttribute("uv",new zt(U,P)),Z.setAttribute("faceIndex",new zt(z,L)),u.push(Z),l>4&&l--}return{lodPlanes:u,sizeLods:s,sigmas:c}}(a)),this._blurMaterial=function(o,u,s){const c=new Float32Array(Fi),l=new T(0,1,0);return new Un({name:"SphericalGaussianBlur",defines:{n:Fi,CUBEUV_TEXEL_WIDTH:1/u,CUBEUV_TEXEL_HEIGHT:1/s,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:c},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:Es(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}(a,e,t)}return r}_compileMaterial(e){const t=new mt(this._lodPlanes[0],e);this._renderer.compile(t,_a)}_sceneToCubeUV(e,t,n,r){const a=new kt(90,1,t,n),o=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],s=this._renderer,c=s.autoClear,l=s.toneMapping;s.getClearColor($s),s.toneMapping=Ln,s.autoClear=!1;const h=new jn({name:"PMREM.Background",side:It,depthWrite:!1,depthTest:!1}),d=new mt(new Jn,h);let p=!1;const m=e.background;m?m.isColor&&(h.color.copy(m),e.background=null,p=!0):(h.color.copy($s),p=!0);for(let v=0;v<6;v++){const g=v%3;g===0?(a.up.set(0,o[v],0),a.lookAt(u[v],0,0)):g===1?(a.up.set(0,0,o[v]),a.lookAt(0,u[v],0)):(a.up.set(0,o[v],0),a.lookAt(0,0,u[v]));const f=this._cubeSize;vr(r,g*f,v>2?f:0,f,f),s.setRenderTarget(r),p&&s.render(d,a),s.render(e,a)}d.geometry.dispose(),d.material.dispose(),s.toneMapping=l,s.autoClear=c,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===Mi||e.mapping===Si;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=io()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=no());const a=r?this._cubemapMaterial:this._equirectMaterial,o=new mt(this._lodPlanes[0],a);a.uniforms.envMap.value=e;const u=this._cubeSize;vr(t,0,0,3*u,2*u),n.setRenderTarget(t),n.render(o,_a)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let a=1;a<r;a++){const o=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),u=Qs[(r-a-1)%Qs.length];this._blur(e,a-1,a,o,u)}t.autoClear=n}_blur(e,t,n,r,a){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,r,"latitudinal",a),this._halfBlur(o,e,n,n,r,"longitudinal",a)}_halfBlur(e,t,n,r,a,o,u){const s=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const l=new mt(this._lodPlanes[r],c),h=c.uniforms,d=this._sizeLods[n]-1,p=isFinite(a)?Math.PI/(2*d):2*Math.PI/39,m=a/p,v=isFinite(a)?1+Math.floor(3*m):Fi;v>Fi&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${v} samples when the maximum is set to 20`);const g=[];let f=0;for(let S=0;S<Fi;++S){const w=S/m,P=Math.exp(-w*w/2);g.push(P),S===0?f+=P:S<v&&(f+=2*P)}for(let S=0;S<g.length;S++)g[S]=g[S]/f;h.envMap.value=e.texture,h.samples.value=v,h.weights.value=g,h.latitudinal.value=o==="latitudinal",u&&(h.poleAxis.value=u);const{_lodMax:x}=this;h.dTheta.value=p,h.mipInt.value=x-n;const M=this._sizeLods[r];vr(t,3*M*(r>x-4?r-x+4:0),4*(this._cubeSize-M),3*M,2*M),s.setRenderTarget(t),s.render(l,_a)}}function to(i,e,t){const n=new Yn(i,e,t);return n.texture.mapping=zr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function vr(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function no(){return new Un({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Es(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function io(){return new Un({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Es(),fragmentShader:`

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
	`}function uc(i){let e=new WeakMap,t=null;function n(r){const a=r.target;a.removeEventListener("dispose",n);const o=e.get(a);o!==void 0&&(e.delete(a),o.dispose())}return{get:function(r){if(r&&r.isTexture){const a=r.mapping,o=a===Da||a===Ua,u=a===Mi||a===Si;if(o||u){let s=e.get(r);const c=s!==void 0?s.texture.pmremVersion:0;if(r.isRenderTargetTexture&&r.pmremVersion!==c)return t===null&&(t=new eo(i)),s=o?t.fromEquirectangular(r,s):t.fromCubemap(r,s),s.texture.pmremVersion=r.pmremVersion,e.set(r,s),s.texture;if(s!==void 0)return s.texture;{const l=r.image;return o&&l&&l.height>0||u&&l&&function(h){let d=0;const p=6;for(let m=0;m<p;m++)h[m]!==void 0&&d++;return d===p}(l)?(t===null&&(t=new eo(i)),s=o?t.fromEquirectangular(r):t.fromCubemap(r),s.texture.pmremVersion=r.pmremVersion,e.set(r,s),r.addEventListener("dispose",n),s.texture):null}}}return r},dispose:function(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}}}function hc(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&Rr("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function dc(i,e,t,n){const r={},a=new WeakMap;function o(s){const c=s.target;c.index!==null&&e.remove(c.index);for(const h in c.attributes)e.remove(c.attributes[h]);for(const h in c.morphAttributes){const d=c.morphAttributes[h];for(let p=0,m=d.length;p<m;p++)e.remove(d[p])}c.removeEventListener("dispose",o),delete r[c.id];const l=a.get(c);l&&(e.remove(l),a.delete(c)),n.releaseStatesOfGeometry(c),c.isInstancedBufferGeometry===!0&&delete c._maxInstanceCount,t.memory.geometries--}function u(s){const c=[],l=s.index,h=s.attributes.position;let d=0;if(l!==null){const v=l.array;d=l.version;for(let g=0,f=v.length;g<f;g+=3){const x=v[g+0],M=v[g+1],S=v[g+2];c.push(x,M,M,S,S,x)}}else{if(h===void 0)return;{const v=h.array;d=h.version;for(let g=0,f=v.length/3-1;g<f;g+=3){const x=g+0,M=g+1,S=g+2;c.push(x,M,M,S,S,x)}}}const p=new(Jo(c)?nl:tl)(c,1);p.version=d;const m=a.get(s);m&&e.remove(m),a.set(s,p)}return{get:function(s,c){return r[c.id]===!0||(c.addEventListener("dispose",o),r[c.id]=!0,t.memory.geometries++),c},update:function(s){const c=s.attributes;for(const h in c)e.update(c[h],i.ARRAY_BUFFER);const l=s.morphAttributes;for(const h in l){const d=l[h];for(let p=0,m=d.length;p<m;p++)e.update(d[p],i.ARRAY_BUFFER)}},getWireframeAttribute:function(s){const c=a.get(s);if(c){const l=s.index;l!==null&&c.version<l.version&&u(s)}else u(s);return a.get(s)}}}function pc(i,e,t){let n,r,a;function o(u,s,c){c!==0&&(i.drawElementsInstanced(n,s,r,u*a,c),t.update(s,n,c))}this.setMode=function(u){n=u},this.setIndex=function(u){r=u.type,a=u.bytesPerElement},this.render=function(u,s){i.drawElements(n,s,r,u*a),t.update(s,n,1)},this.renderInstances=o,this.renderMultiDraw=function(u,s,c){if(c===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,s,0,r,u,0,c);let l=0;for(let h=0;h<c;h++)l+=s[h];t.update(l,n,1)},this.renderMultiDrawInstances=function(u,s,c,l){if(c===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let d=0;d<u.length;d++)o(u[d]/a,s[d],l[d]);else{h.multiDrawElementsInstancedWEBGL(n,s,0,r,u,0,l,0,c);let d=0;for(let p=0;p<c;p++)d+=s[p];for(let p=0;p<l.length;p++)t.update(d,n,l[p])}}}function fc(i){const e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,n,r){switch(e.calls++,n){case i.TRIANGLES:e.triangles+=r*(t/3);break;case i.LINES:e.lines+=r*(t/2);break;case i.LINE_STRIP:e.lines+=r*(t-1);break;case i.LINE_LOOP:e.lines+=r*t;break;case i.POINTS:e.points+=r*t;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",n)}}}}function mc(i,e,t){const n=new WeakMap,r=new rt;return{update:function(a,o,u){const s=a.morphTargetInfluences,c=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,l=c!==void 0?c.length:0;let h=n.get(o);if(h===void 0||h.count!==l){let q=function(){P.dispose(),n.delete(o),o.removeEventListener("dispose",q)};h!==void 0&&h.texture.dispose();const d=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,v=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],f=o.morphAttributes.color||[];let x=0;d===!0&&(x=1),p===!0&&(x=2),m===!0&&(x=3);let M=o.attributes.position.count*x,S=1;M>e.maxTextureSize&&(S=Math.ceil(M/e.maxTextureSize),M=e.maxTextureSize);const w=new Float32Array(M*S*4*l),P=new Qo(w,M,S,l);P.type=on,P.needsUpdate=!0;const L=4*x;for(let U=0;U<l;U++){const z=v[U],Z=g[U],G=f[U],J=M*S*4*U;for(let W=0;W<z.count;W++){const $=W*L;d===!0&&(r.fromBufferAttribute(z,W),w[J+$+0]=r.x,w[J+$+1]=r.y,w[J+$+2]=r.z,w[J+$+3]=0),p===!0&&(r.fromBufferAttribute(Z,W),w[J+$+4]=r.x,w[J+$+5]=r.y,w[J+$+6]=r.z,w[J+$+7]=0),m===!0&&(r.fromBufferAttribute(G,W),w[J+$+8]=r.x,w[J+$+9]=r.y,w[J+$+10]=r.z,w[J+$+11]=G.itemSize===4?r.w:1)}}h={count:l,texture:P,size:new Ge(M,S)},n.set(o,h),o.addEventListener("dispose",q)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)u.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let d=0;for(let m=0;m<s.length;m++)d+=s[m];const p=o.morphTargetsRelative?1:1-d;u.getUniforms().setValue(i,"morphTargetBaseInfluence",p),u.getUniforms().setValue(i,"morphTargetInfluences",s)}u.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),u.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}}}function gc(i,e,t,n){let r=new WeakMap;function a(o){const u=o.target;u.removeEventListener("dispose",a),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:function(o){const u=n.render.frame,s=o.geometry,c=e.get(o,s);if(r.get(c)!==u&&(e.update(c),r.set(c,u)),o.isInstancedMesh&&(o.hasEventListener("dispose",a)===!1&&o.addEventListener("dispose",a),r.get(o)!==u&&(t.update(o.instanceMatrix,i.ARRAY_BUFFER),o.instanceColor!==null&&t.update(o.instanceColor,i.ARRAY_BUFFER),r.set(o,u))),o.isSkinnedMesh){const l=o.skeleton;r.get(l)!==u&&(l.update(),r.set(l,u))}return c},dispose:function(){r=new WeakMap}}}class sl extends Rt{constructor(e,t,n,r,a,o,u,s,c,l=1026){if(l!==qi&&l!==Ei)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&l===qi&&(n=qn),n===void 0&&l===Ei&&(n=yi),super(null,r,a,o,u,s,l,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=u!==void 0?u:Xt,this.minFilter=s!==void 0?s:Xt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const ol=new Rt,ro=new sl(1,1),ll=new Qo,cl=new Hl,ul=new rl,ao=[],so=[],oo=new Float32Array(16),lo=new Float32Array(9),co=new Float32Array(4);function Ci(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let a=ao[r];if(a===void 0&&(a=new Float32Array(r),ao[r]=a),e!==0){n.toArray(a,0);for(let o=1,u=0;o!==e;++o)u+=t,i[o].toArray(a,u)}return a}function vt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function xt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Vr(i,e){let t=so[e];t===void 0&&(t=new Int32Array(e),so[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function _c(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function vc(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(vt(t,e))return;i.uniform2fv(this.addr,e),xt(t,e)}}function xc(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(vt(t,e))return;i.uniform3fv(this.addr,e),xt(t,e)}}function Mc(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(vt(t,e))return;i.uniform4fv(this.addr,e),xt(t,e)}}function Sc(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(vt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),xt(t,e)}else{if(vt(t,n))return;co.set(n),i.uniformMatrix2fv(this.addr,!1,co),xt(t,n)}}function yc(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(vt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),xt(t,e)}else{if(vt(t,n))return;lo.set(n),i.uniformMatrix3fv(this.addr,!1,lo),xt(t,n)}}function Ec(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(vt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),xt(t,e)}else{if(vt(t,n))return;oo.set(n),i.uniformMatrix4fv(this.addr,!1,oo),xt(t,n)}}function bc(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function Tc(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(vt(t,e))return;i.uniform2iv(this.addr,e),xt(t,e)}}function wc(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(vt(t,e))return;i.uniform3iv(this.addr,e),xt(t,e)}}function Ac(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(vt(t,e))return;i.uniform4iv(this.addr,e),xt(t,e)}}function Rc(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Cc(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(vt(t,e))return;i.uniform2uiv(this.addr,e),xt(t,e)}}function Pc(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(vt(t,e))return;i.uniform3uiv(this.addr,e),xt(t,e)}}function Lc(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(vt(t,e))return;i.uniform4uiv(this.addr,e),xt(t,e)}}function Dc(i,e,t){const n=this.cache,r=t.allocateTextureUnit();let a;n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),this.type===i.SAMPLER_2D_SHADOW?(ro.compareFunction=Zo,a=ro):a=ol,t.setTexture2D(e||a,r)}function Uc(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||cl,r)}function Ic(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||ul,r)}function Nc(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||ll,r)}function Oc(i,e){i.uniform1fv(this.addr,e)}function Fc(i,e){const t=Ci(e,this.size,2);i.uniform2fv(this.addr,t)}function Bc(i,e){const t=Ci(e,this.size,3);i.uniform3fv(this.addr,t)}function zc(i,e){const t=Ci(e,this.size,4);i.uniform4fv(this.addr,t)}function Hc(i,e){const t=Ci(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Gc(i,e){const t=Ci(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Vc(i,e){const t=Ci(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function kc(i,e){i.uniform1iv(this.addr,e)}function Wc(i,e){i.uniform2iv(this.addr,e)}function Xc(i,e){i.uniform3iv(this.addr,e)}function jc(i,e){i.uniform4iv(this.addr,e)}function qc(i,e){i.uniform1uiv(this.addr,e)}function Yc(i,e){i.uniform2uiv(this.addr,e)}function Kc(i,e){i.uniform3uiv(this.addr,e)}function Zc(i,e){i.uniform4uiv(this.addr,e)}function Jc(i,e,t){const n=this.cache,r=e.length,a=Vr(t,r);vt(n,a)||(i.uniform1iv(this.addr,a),xt(n,a));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||ol,a[o])}function $c(i,e,t){const n=this.cache,r=e.length,a=Vr(t,r);vt(n,a)||(i.uniform1iv(this.addr,a),xt(n,a));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||cl,a[o])}function Qc(i,e,t){const n=this.cache,r=e.length,a=Vr(t,r);vt(n,a)||(i.uniform1iv(this.addr,a),xt(n,a));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||ul,a[o])}function eu(i,e,t){const n=this.cache,r=e.length,a=Vr(t,r);vt(n,a)||(i.uniform1iv(this.addr,a),xt(n,a));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||ll,a[o])}class tu{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=function(r){switch(r){case 5126:return _c;case 35664:return vc;case 35665:return xc;case 35666:return Mc;case 35674:return Sc;case 35675:return yc;case 35676:return Ec;case 5124:case 35670:return bc;case 35667:case 35671:return Tc;case 35668:case 35672:return wc;case 35669:case 35673:return Ac;case 5125:return Rc;case 36294:return Cc;case 36295:return Pc;case 36296:return Lc;case 35678:case 36198:case 36298:case 36306:case 35682:return Dc;case 35679:case 36299:case 36307:return Uc;case 35680:case 36300:case 36308:case 36293:return Ic;case 36289:case 36303:case 36311:case 36292:return Nc}}(t.type)}}class nu{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=function(r){switch(r){case 5126:return Oc;case 35664:return Fc;case 35665:return Bc;case 35666:return zc;case 35674:return Hc;case 35675:return Gc;case 35676:return Vc;case 5124:case 35670:return kc;case 35667:case 35671:return Wc;case 35668:case 35672:return Xc;case 35669:case 35673:return jc;case 5125:return qc;case 36294:return Yc;case 36295:return Kc;case 36296:return Zc;case 35678:case 36198:case 36298:case 36306:case 35682:return Jc;case 35679:case 36299:case 36307:return $c;case 35680:case 36300:case 36308:case 36293:return Qc;case 36289:case 36303:case 36311:case 36292:return eu}}(t.type)}}class iu{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let a=0,o=r.length;a!==o;++a){const u=r[a];u.setValue(e,t[u.id],n)}}}const ya=/(\w+)(\])?(\[|\.)?/g;function uo(i,e){i.seq.push(e),i.map[e.id]=e}function ru(i,e,t){const n=i.name,r=n.length;for(ya.lastIndex=0;;){const a=ya.exec(n),o=ya.lastIndex;let u=a[1];const s=a[2]==="]",c=a[3];if(s&&(u|=0),c===void 0||c==="["&&o+2===r){uo(t,c===void 0?new tu(u,i,e):new nu(u,i,e));break}{let l=t.map[u];l===void 0&&(l=new iu(u),uo(t,l)),t=l}}}class Cr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const a=e.getActiveUniform(t,r);ru(a,e.getUniformLocation(t,a.name),this)}}setValue(e,t,n,r){const a=this.map[t];a!==void 0&&a.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let a=0,o=t.length;a!==o;++a){const u=t[a],s=n[u.id];s.needsUpdate!==!1&&u.setValue(e,s.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,a=e.length;r!==a;++r){const o=e[r];o.id in t&&n.push(o)}return n}}function ho(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const au=37297;let su=0;function po(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+function(u,s){const c=u.split(`
`),l=[],h=Math.max(s-6,0),d=Math.min(s+6,c.length);for(let p=h;p<d;p++){const m=p+1;l.push(`${m===s?">":" "} ${m}: ${c[p]}`)}return l.join(`
`)}(i.getShaderSource(e),o)}return r}function ou(i,e){const t=function(n){const r=it.getPrimaries(it.workingColorSpace),a=it.getPrimaries(n);let o;switch(r===a?o="":r===Ur&&a===Dr?o="LinearDisplayP3ToLinearSRGB":r===Dr&&a===Ur&&(o="LinearSRGBToLinearDisplayP3"),n){case In:case Hr:return[o,"LinearTransferOETF"];case Vt:case xs:return[o,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[o,"LinearTransferOETF"]}}(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function lu(i,e){let t;switch(e){case wl:t="Linear";break;case Al:t="Reinhard";break;case Rl:t="Cineon";break;case zo:t="ACESFilmic";break;case Pl:t="AgX";break;case Ll:t="Neutral";break;case Cl:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const xr=new T;function cu(){return it.getLuminanceCoefficients(xr),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${xr.x.toFixed(4)}, ${xr.y.toFixed(4)}, ${xr.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Bi(i){return i!==""}function fo(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function mo(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const uu=/^[ \t]*#include +<([\w\d./]+)>/gm;function ls(i){return i.replace(uu,du)}const hu=new Map;function du(i,e){let t=ke[e];if(t===void 0){const n=hu.get(e);if(n===void 0)throw new Error("Can not resolve #include <"+e+">");t=ke[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n)}return ls(t)}const pu=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function go(i){return i.replace(pu,fu)}function fu(i,e,t,n){let r="";for(let a=parseInt(e);a<parseInt(t);a++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function _o(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function mu(i,e,t,n){const r=i.getContext(),a=t.defines;let o=t.vertexShader,u=t.fragmentShader;const s=function(Z){let G="SHADOWMAP_TYPE_BASIC";return Z.shadowMapType===Oo?G="SHADOWMAP_TYPE_PCF":Z.shadowMapType===Fo?G="SHADOWMAP_TYPE_PCF_SOFT":Z.shadowMapType===_n&&(G="SHADOWMAP_TYPE_VSM"),G}(t),c=function(Z){let G="ENVMAP_TYPE_CUBE";if(Z.envMap)switch(Z.envMapMode){case Mi:case Si:G="ENVMAP_TYPE_CUBE";break;case zr:G="ENVMAP_TYPE_CUBE_UV"}return G}(t),l=function(Z){let G="ENVMAP_MODE_REFLECTION";return Z.envMap&&Z.envMapMode===Si&&(G="ENVMAP_MODE_REFRACTION"),G}(t),h=function(Z){let G="ENVMAP_BLENDING_NONE";if(Z.envMap)switch(Z.combine){case Bo:G="ENVMAP_BLENDING_MULTIPLY";break;case bl:G="ENVMAP_BLENDING_MIX";break;case Tl:G="ENVMAP_BLENDING_ADD"}return G}(t),d=function(Z){const G=Z.envMapCubeUVHeight;if(G===null)return null;const J=Math.log2(G)-2,W=1/G;return{texelWidth:1/(3*Math.max(Math.pow(2,J),112)),texelHeight:W,maxMip:J}}(t),p=function(Z){return[Z.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",Z.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Bi).join(`
`)}(t),m=function(Z){const G=[];for(const J in Z){const W=Z[J];W!==!1&&G.push("#define "+J+" "+W)}return G.join(`
`)}(a),v=r.createProgram();let g,f,x=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Bi).join(`
`),g.length>0&&(g+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Bi).join(`
`),f.length>0&&(f+=`
`)):(g=[_o(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+s:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Bi).join(`
`),f=[_o(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+s:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ln?"#define TONE_MAPPING":"",t.toneMapping!==Ln?ke.tonemapping_pars_fragment:"",t.toneMapping!==Ln?lu("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ke.colorspace_pars_fragment,ou("linearToOutputTexel",t.outputColorSpace),cu(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Bi).join(`
`)),o=ls(o),o=fo(o,t),o=mo(o,t),u=ls(u),u=fo(u,t),u=mo(u,t),o=go(o),u=go(u),t.isRawShaderMaterial!==!0&&(x=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,f=["#define varying in",t.glslVersion===Us?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Us?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const M=x+g+o,S=x+f+u,w=ho(r,r.VERTEX_SHADER,M),P=ho(r,r.FRAGMENT_SHADER,S);function L(Z){if(i.debug.checkShaderErrors){const G=r.getProgramInfoLog(v).trim(),J=r.getShaderInfoLog(w).trim(),W=r.getShaderInfoLog(P).trim();let $=!0,ee=!0;if(r.getProgramParameter(v,r.LINK_STATUS)===!1)if($=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,v,w,P);else{const ce=po(r,w,"vertex"),ue=po(r,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(v,r.VALIDATE_STATUS)+`

Material Name: `+Z.name+`
Material Type: `+Z.type+`

Program Info Log: `+G+`
`+ce+`
`+ue)}else G!==""?console.warn("THREE.WebGLProgram: Program Info Log:",G):J!==""&&W!==""||(ee=!1);ee&&(Z.diagnostics={runnable:$,programLog:G,vertexShader:{log:J,prefix:g},fragmentShader:{log:W,prefix:f}})}r.deleteShader(w),r.deleteShader(P),q=new Cr(r,v),U=function(G,J){const W={},$=G.getProgramParameter(J,G.ACTIVE_ATTRIBUTES);for(let ee=0;ee<$;ee++){const ce=G.getActiveAttrib(J,ee),ue=ce.name;let Me=1;ce.type===G.FLOAT_MAT2&&(Me=2),ce.type===G.FLOAT_MAT3&&(Me=3),ce.type===G.FLOAT_MAT4&&(Me=4),W[ue]={type:ce.type,location:G.getAttribLocation(J,ue),locationSize:Me}}return W}(r,v)}let q,U;r.attachShader(v,w),r.attachShader(v,P),t.index0AttributeName!==void 0?r.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(v,0,"position"),r.linkProgram(v),this.getUniforms=function(){return q===void 0&&L(this),q},this.getAttributes=function(){return U===void 0&&L(this),U};let z=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return z===!1&&(z=r.getProgramParameter(v,au)),z},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=su++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=w,this.fragmentShader=P,this}let gu=0;class _u{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),a=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(a)===!1&&(o.add(a),a.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new vu(e),t.set(e,n)),n}}class vu{constructor(e){this.id=gu++,this.code=e,this.usedTimes=0}}function xu(i,e,t,n,r,a,o){const u=new Ms,s=new _u,c=new Set,l=[],h=r.logarithmicDepthBuffer,d=r.reverseDepthBuffer,p=r.vertexTextures;let m=r.precision;const v={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(f){return c.add(f),f===0?"uv":`uv${f}`}return{getParameters:function(f,x,M,S,w){const P=S.fog,L=w.geometry,q=f.isMeshStandardMaterial?S.environment:null,U=(f.isMeshStandardMaterial?t:e).get(f.envMap||q),z=U&&U.mapping===zr?U.image.height:null,Z=v[f.type];f.precision!==null&&(m=r.getMaxPrecision(f.precision),m!==f.precision&&console.warn("THREE.WebGLProgram.getParameters:",f.precision,"not supported, using",m,"instead."));const G=L.morphAttributes.position||L.morphAttributes.normal||L.morphAttributes.color,J=G!==void 0?G.length:0;let W,$,ee,ce,ue=0;if(L.morphAttributes.position!==void 0&&(ue=1),L.morphAttributes.normal!==void 0&&(ue=2),L.morphAttributes.color!==void 0&&(ue=3),Z){const Nn=an[Z];W=Nn.vertexShader,$=Nn.fragmentShader}else W=f.vertexShader,$=f.fragmentShader,s.update(f),ee=s.getVertexShaderID(f),ce=s.getFragmentShaderID(f);const Me=i.getRenderTarget(),Pe=w.isInstancedMesh===!0,ie=w.isBatchedMesh===!0,K=!!f.map,fe=!!f.matcap,Se=!!U,b=!!f.aoMap,y=!!f.lightMap,I=!!f.bumpMap,Y=!!f.normalMap,N=!!f.displacementMap,H=!!f.emissiveMap,E=!!f.metalnessMap,V=!!f.roughnessMap,k=f.anisotropy>0,le=f.clearcoat>0,X=f.dispersion>0,se=f.iridescence>0,he=f.sheen>0,re=f.transmission>0,ve=k&&!!f.anisotropyMap,ge=le&&!!f.clearcoatMap,Ee=le&&!!f.clearcoatNormalMap,Le=le&&!!f.clearcoatRoughnessMap,He=se&&!!f.iridescenceMap,Ke=se&&!!f.iridescenceThicknessMap,Te=he&&!!f.sheenColorMap,Ue=he&&!!f.sheenRoughnessMap,nt=!!f.specularMap,at=!!f.specularColorMap,xe=!!f.specularIntensityMap,qe=re&&!!f.transmissionMap,Ye=re&&!!f.thicknessMap,ln=!!f.gradientMap,cn=!!f.alphaMap,ct=f.alphaTest>0,Tt=!!f.alphaHash,Lt=!!f.extensions;let D=Ln;f.toneMapped&&(Me!==null&&Me.isXRRenderTarget!==!0||(D=i.toneMapping));const un={shaderID:Z,shaderType:f.type,shaderName:f.name,vertexShader:W,fragmentShader:$,defines:f.defines,customVertexShaderID:ee,customFragmentShaderID:ce,isRawShaderMaterial:f.isRawShaderMaterial===!0,glslVersion:f.glslVersion,precision:m,batching:ie,batchingColor:ie&&w._colorsTexture!==null,instancing:Pe,instancingColor:Pe&&w.instanceColor!==null,instancingMorph:Pe&&w.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:Me===null?i.outputColorSpace:Me.isXRRenderTarget===!0?Me.texture.colorSpace:In,alphaToCoverage:!!f.alphaToCoverage,map:K,matcap:fe,envMap:Se,envMapMode:Se&&U.mapping,envMapCubeUVHeight:z,aoMap:b,lightMap:y,bumpMap:I,normalMap:Y,displacementMap:p&&N,emissiveMap:H,normalMapObjectSpace:Y&&f.normalMapType===1,normalMapTangentSpace:Y&&f.normalMapType===0,metalnessMap:E,roughnessMap:V,anisotropy:k,anisotropyMap:ve,clearcoat:le,clearcoatMap:ge,clearcoatNormalMap:Ee,clearcoatRoughnessMap:Le,dispersion:X,iridescence:se,iridescenceMap:He,iridescenceThicknessMap:Ke,sheen:he,sheenColorMap:Te,sheenRoughnessMap:Ue,specularMap:nt,specularColorMap:at,specularIntensityMap:xe,transmission:re,transmissionMap:qe,thicknessMap:Ye,gradientMap:ln,opaque:f.transparent===!1&&f.blending===1&&f.alphaToCoverage===!1,alphaMap:cn,alphaTest:ct,alphaHash:Tt,combine:f.combine,mapUv:K&&g(f.map.channel),aoMapUv:b&&g(f.aoMap.channel),lightMapUv:y&&g(f.lightMap.channel),bumpMapUv:I&&g(f.bumpMap.channel),normalMapUv:Y&&g(f.normalMap.channel),displacementMapUv:N&&g(f.displacementMap.channel),emissiveMapUv:H&&g(f.emissiveMap.channel),metalnessMapUv:E&&g(f.metalnessMap.channel),roughnessMapUv:V&&g(f.roughnessMap.channel),anisotropyMapUv:ve&&g(f.anisotropyMap.channel),clearcoatMapUv:ge&&g(f.clearcoatMap.channel),clearcoatNormalMapUv:Ee&&g(f.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Le&&g(f.clearcoatRoughnessMap.channel),iridescenceMapUv:He&&g(f.iridescenceMap.channel),iridescenceThicknessMapUv:Ke&&g(f.iridescenceThicknessMap.channel),sheenColorMapUv:Te&&g(f.sheenColorMap.channel),sheenRoughnessMapUv:Ue&&g(f.sheenRoughnessMap.channel),specularMapUv:nt&&g(f.specularMap.channel),specularColorMapUv:at&&g(f.specularColorMap.channel),specularIntensityMapUv:xe&&g(f.specularIntensityMap.channel),transmissionMapUv:qe&&g(f.transmissionMap.channel),thicknessMapUv:Ye&&g(f.thicknessMap.channel),alphaMapUv:cn&&g(f.alphaMap.channel),vertexTangents:!!L.attributes.tangent&&(Y||k),vertexColors:f.vertexColors,vertexAlphas:f.vertexColors===!0&&!!L.attributes.color&&L.attributes.color.itemSize===4,pointsUvs:w.isPoints===!0&&!!L.attributes.uv&&(K||cn),fog:!!P,useFog:f.fog===!0,fogExp2:!!P&&P.isFogExp2,flatShading:f.flatShading===!0,sizeAttenuation:f.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:d,skinning:w.isSkinnedMesh===!0,morphTargets:L.morphAttributes.position!==void 0,morphNormals:L.morphAttributes.normal!==void 0,morphColors:L.morphAttributes.color!==void 0,morphTargetsCount:J,morphTextureStride:ue,numDirLights:x.directional.length,numPointLights:x.point.length,numSpotLights:x.spot.length,numSpotLightMaps:x.spotLightMap.length,numRectAreaLights:x.rectArea.length,numHemiLights:x.hemi.length,numDirLightShadows:x.directionalShadowMap.length,numPointLightShadows:x.pointShadowMap.length,numSpotLightShadows:x.spotShadowMap.length,numSpotLightShadowsWithMaps:x.numSpotLightShadowsWithMaps,numLightProbes:x.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:f.dithering,shadowMapEnabled:i.shadowMap.enabled&&M.length>0,shadowMapType:i.shadowMap.type,toneMapping:D,decodeVideoTexture:K&&f.map.isVideoTexture===!0&&it.getTransfer(f.map.colorSpace)===ot,premultipliedAlpha:f.premultipliedAlpha,doubleSided:f.side===2,flipSided:f.side===It,useDepthPacking:f.depthPacking>=0,depthPacking:f.depthPacking||0,index0AttributeName:f.index0AttributeName,extensionClipCullDistance:Lt&&f.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Lt&&f.extensions.multiDraw===!0||ie)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:f.customProgramCacheKey()};return un.vertexUv1s=c.has(1),un.vertexUv2s=c.has(2),un.vertexUv3s=c.has(3),c.clear(),un},getProgramCacheKey:function(f){const x=[];if(f.shaderID?x.push(f.shaderID):(x.push(f.customVertexShaderID),x.push(f.customFragmentShaderID)),f.defines!==void 0)for(const M in f.defines)x.push(M),x.push(f.defines[M]);return f.isRawShaderMaterial===!1&&(function(M,S){M.push(S.precision),M.push(S.outputColorSpace),M.push(S.envMapMode),M.push(S.envMapCubeUVHeight),M.push(S.mapUv),M.push(S.alphaMapUv),M.push(S.lightMapUv),M.push(S.aoMapUv),M.push(S.bumpMapUv),M.push(S.normalMapUv),M.push(S.displacementMapUv),M.push(S.emissiveMapUv),M.push(S.metalnessMapUv),M.push(S.roughnessMapUv),M.push(S.anisotropyMapUv),M.push(S.clearcoatMapUv),M.push(S.clearcoatNormalMapUv),M.push(S.clearcoatRoughnessMapUv),M.push(S.iridescenceMapUv),M.push(S.iridescenceThicknessMapUv),M.push(S.sheenColorMapUv),M.push(S.sheenRoughnessMapUv),M.push(S.specularMapUv),M.push(S.specularColorMapUv),M.push(S.specularIntensityMapUv),M.push(S.transmissionMapUv),M.push(S.thicknessMapUv),M.push(S.combine),M.push(S.fogExp2),M.push(S.sizeAttenuation),M.push(S.morphTargetsCount),M.push(S.morphAttributeCount),M.push(S.numDirLights),M.push(S.numPointLights),M.push(S.numSpotLights),M.push(S.numSpotLightMaps),M.push(S.numHemiLights),M.push(S.numRectAreaLights),M.push(S.numDirLightShadows),M.push(S.numPointLightShadows),M.push(S.numSpotLightShadows),M.push(S.numSpotLightShadowsWithMaps),M.push(S.numLightProbes),M.push(S.shadowMapType),M.push(S.toneMapping),M.push(S.numClippingPlanes),M.push(S.numClipIntersection),M.push(S.depthPacking)}(x,f),function(M,S){u.disableAll(),S.supportsVertexTextures&&u.enable(0),S.instancing&&u.enable(1),S.instancingColor&&u.enable(2),S.instancingMorph&&u.enable(3),S.matcap&&u.enable(4),S.envMap&&u.enable(5),S.normalMapObjectSpace&&u.enable(6),S.normalMapTangentSpace&&u.enable(7),S.clearcoat&&u.enable(8),S.iridescence&&u.enable(9),S.alphaTest&&u.enable(10),S.vertexColors&&u.enable(11),S.vertexAlphas&&u.enable(12),S.vertexUv1s&&u.enable(13),S.vertexUv2s&&u.enable(14),S.vertexUv3s&&u.enable(15),S.vertexTangents&&u.enable(16),S.anisotropy&&u.enable(17),S.alphaHash&&u.enable(18),S.batching&&u.enable(19),S.dispersion&&u.enable(20),S.batchingColor&&u.enable(21),M.push(u.mask),u.disableAll(),S.fog&&u.enable(0),S.useFog&&u.enable(1),S.flatShading&&u.enable(2),S.logarithmicDepthBuffer&&u.enable(3),S.reverseDepthBuffer&&u.enable(4),S.skinning&&u.enable(5),S.morphTargets&&u.enable(6),S.morphNormals&&u.enable(7),S.morphColors&&u.enable(8),S.premultipliedAlpha&&u.enable(9),S.shadowMapEnabled&&u.enable(10),S.doubleSided&&u.enable(11),S.flipSided&&u.enable(12),S.useDepthPacking&&u.enable(13),S.dithering&&u.enable(14),S.transmission&&u.enable(15),S.sheen&&u.enable(16),S.opaque&&u.enable(17),S.pointsUvs&&u.enable(18),S.decodeVideoTexture&&u.enable(19),S.alphaToCoverage&&u.enable(20),M.push(u.mask)}(x,f),x.push(i.outputColorSpace)),x.push(f.customProgramCacheKey),x.join()},getUniforms:function(f){const x=v[f.type];let M;if(x){const S=an[x];M=Jl.clone(S.uniforms)}else M=f.uniforms;return M},acquireProgram:function(f,x){let M;for(let S=0,w=l.length;S<w;S++){const P=l[S];if(P.cacheKey===x){M=P,++M.usedTimes;break}}return M===void 0&&(M=new mu(i,x,f,a),l.push(M)),M},releaseProgram:function(f){if(--f.usedTimes==0){const x=l.indexOf(f);l[x]=l[l.length-1],l.pop(),f.destroy()}},releaseShaderCache:function(f){s.remove(f)},programs:l,dispose:function(){s.dispose()}}}function Mu(){let i=new WeakMap;return{has:function(e){return i.has(e)},get:function(e){let t=i.get(e);return t===void 0&&(t={},i.set(e,t)),t},remove:function(e){i.delete(e)},update:function(e,t,n){i.get(e)[t]=n},dispose:function(){i=new WeakMap}}}function Su(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function vo(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function xo(){const i=[];let e=0;const t=[],n=[],r=[];function a(o,u,s,c,l,h){let d=i[e];return d===void 0?(d={id:o.id,object:o,geometry:u,material:s,groupOrder:c,renderOrder:o.renderOrder,z:l,group:h},i[e]=d):(d.id=o.id,d.object=o,d.geometry=u,d.material=s,d.groupOrder=c,d.renderOrder=o.renderOrder,d.z=l,d.group=h),e++,d}return{opaque:t,transmissive:n,transparent:r,init:function(){e=0,t.length=0,n.length=0,r.length=0},push:function(o,u,s,c,l,h){const d=a(o,u,s,c,l,h);s.transmission>0?n.push(d):s.transparent===!0?r.push(d):t.push(d)},unshift:function(o,u,s,c,l,h){const d=a(o,u,s,c,l,h);s.transmission>0?n.unshift(d):s.transparent===!0?r.unshift(d):t.unshift(d)},finish:function(){for(let o=e,u=i.length;o<u;o++){const s=i[o];if(s.id===null)break;s.id=null,s.object=null,s.geometry=null,s.material=null,s.group=null}},sort:function(o,u){t.length>1&&t.sort(o||Su),n.length>1&&n.sort(u||vo),r.length>1&&r.sort(u||vo)}}}function yu(){let i=new WeakMap;return{get:function(e,t){const n=i.get(e);let r;return n===void 0?(r=new xo,i.set(e,[r])):t>=n.length?(r=new xo,n.push(r)):r=n[t],r},dispose:function(){i=new WeakMap}}}function Eu(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new T,color:new ze};break;case"SpotLight":t={position:new T,direction:new T,color:new ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new T,color:new ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new T,skyColor:new ze,groundColor:new ze};break;case"RectAreaLight":t={color:new ze,position:new T,halfWidth:new T,halfHeight:new T}}return i[e.id]=t,t}}}let bu=0;function Tu(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function wu(i){const e=new Eu,t=function(){const u={};return{get:function(s){if(u[s.id]!==void 0)return u[s.id];let c;switch(s.type){case"DirectionalLight":case"SpotLight":c={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge};break;case"PointLight":c={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ge,shadowCameraNear:1,shadowCameraFar:1e3}}return u[s.id]=c,c}}}(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)n.probe.push(new T);const r=new T,a=new Ce,o=new Ce;return{setup:function(u){let s=0,c=0,l=0;for(let L=0;L<9;L++)n.probe[L].set(0,0,0);let h=0,d=0,p=0,m=0,v=0,g=0,f=0,x=0,M=0,S=0,w=0;u.sort(Tu);for(let L=0,q=u.length;L<q;L++){const U=u[L],z=U.color,Z=U.intensity,G=U.distance,J=U.shadow&&U.shadow.map?U.shadow.map.texture:null;if(U.isAmbientLight)s+=z.r*Z,c+=z.g*Z,l+=z.b*Z;else if(U.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(U.sh.coefficients[W],Z);w++}else if(U.isDirectionalLight){const W=e.get(U);if(W.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const $=U.shadow,ee=t.get(U);ee.shadowIntensity=$.intensity,ee.shadowBias=$.bias,ee.shadowNormalBias=$.normalBias,ee.shadowRadius=$.radius,ee.shadowMapSize=$.mapSize,n.directionalShadow[h]=ee,n.directionalShadowMap[h]=J,n.directionalShadowMatrix[h]=U.shadow.matrix,g++}n.directional[h]=W,h++}else if(U.isSpotLight){const W=e.get(U);W.position.setFromMatrixPosition(U.matrixWorld),W.color.copy(z).multiplyScalar(Z),W.distance=G,W.coneCos=Math.cos(U.angle),W.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),W.decay=U.decay,n.spot[p]=W;const $=U.shadow;if(U.map&&(n.spotLightMap[M]=U.map,M++,$.updateMatrices(U),U.castShadow&&S++),n.spotLightMatrix[p]=$.matrix,U.castShadow){const ee=t.get(U);ee.shadowIntensity=$.intensity,ee.shadowBias=$.bias,ee.shadowNormalBias=$.normalBias,ee.shadowRadius=$.radius,ee.shadowMapSize=$.mapSize,n.spotShadow[p]=ee,n.spotShadowMap[p]=J,x++}p++}else if(U.isRectAreaLight){const W=e.get(U);W.color.copy(z).multiplyScalar(Z),W.halfWidth.set(.5*U.width,0,0),W.halfHeight.set(0,.5*U.height,0),n.rectArea[m]=W,m++}else if(U.isPointLight){const W=e.get(U);if(W.color.copy(U.color).multiplyScalar(U.intensity),W.distance=U.distance,W.decay=U.decay,U.castShadow){const $=U.shadow,ee=t.get(U);ee.shadowIntensity=$.intensity,ee.shadowBias=$.bias,ee.shadowNormalBias=$.normalBias,ee.shadowRadius=$.radius,ee.shadowMapSize=$.mapSize,ee.shadowCameraNear=$.camera.near,ee.shadowCameraFar=$.camera.far,n.pointShadow[d]=ee,n.pointShadowMap[d]=J,n.pointShadowMatrix[d]=U.shadow.matrix,f++}n.point[d]=W,d++}else if(U.isHemisphereLight){const W=e.get(U);W.skyColor.copy(U.color).multiplyScalar(Z),W.groundColor.copy(U.groundColor).multiplyScalar(Z),n.hemi[v]=W,v++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=de.LTC_FLOAT_1,n.rectAreaLTC2=de.LTC_FLOAT_2):(n.rectAreaLTC1=de.LTC_HALF_1,n.rectAreaLTC2=de.LTC_HALF_2)),n.ambient[0]=s,n.ambient[1]=c,n.ambient[2]=l;const P=n.hash;P.directionalLength===h&&P.pointLength===d&&P.spotLength===p&&P.rectAreaLength===m&&P.hemiLength===v&&P.numDirectionalShadows===g&&P.numPointShadows===f&&P.numSpotShadows===x&&P.numSpotMaps===M&&P.numLightProbes===w||(n.directional.length=h,n.spot.length=p,n.rectArea.length=m,n.point.length=d,n.hemi.length=v,n.directionalShadow.length=g,n.directionalShadowMap.length=g,n.pointShadow.length=f,n.pointShadowMap.length=f,n.spotShadow.length=x,n.spotShadowMap.length=x,n.directionalShadowMatrix.length=g,n.pointShadowMatrix.length=f,n.spotLightMatrix.length=x+M-S,n.spotLightMap.length=M,n.numSpotLightShadowsWithMaps=S,n.numLightProbes=w,P.directionalLength=h,P.pointLength=d,P.spotLength=p,P.rectAreaLength=m,P.hemiLength=v,P.numDirectionalShadows=g,P.numPointShadows=f,P.numSpotShadows=x,P.numSpotMaps=M,P.numLightProbes=w,n.version=bu++)},setupView:function(u,s){let c=0,l=0,h=0,d=0,p=0;const m=s.matrixWorldInverse;for(let v=0,g=u.length;v<g;v++){const f=u[v];if(f.isDirectionalLight){const x=n.directional[c];x.direction.setFromMatrixPosition(f.matrixWorld),r.setFromMatrixPosition(f.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),c++}else if(f.isSpotLight){const x=n.spot[h];x.position.setFromMatrixPosition(f.matrixWorld),x.position.applyMatrix4(m),x.direction.setFromMatrixPosition(f.matrixWorld),r.setFromMatrixPosition(f.target.matrixWorld),x.direction.sub(r),x.direction.transformDirection(m),h++}else if(f.isRectAreaLight){const x=n.rectArea[d];x.position.setFromMatrixPosition(f.matrixWorld),x.position.applyMatrix4(m),o.identity(),a.copy(f.matrixWorld),a.premultiply(m),o.extractRotation(a),x.halfWidth.set(.5*f.width,0,0),x.halfHeight.set(0,.5*f.height,0),x.halfWidth.applyMatrix4(o),x.halfHeight.applyMatrix4(o),d++}else if(f.isPointLight){const x=n.point[l];x.position.setFromMatrixPosition(f.matrixWorld),x.position.applyMatrix4(m),l++}else if(f.isHemisphereLight){const x=n.hemi[p];x.direction.setFromMatrixPosition(f.matrixWorld),x.direction.transformDirection(m),p++}}},state:n}}function Mo(i){const e=new wu(i),t=[],n=[],r={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:function(a){r.camera=a,t.length=0,n.length=0},state:r,setupLights:function(){e.setup(t)},setupLightsView:function(a){e.setupView(t,a)},pushLight:function(a){t.push(a)},pushShadow:function(a){n.push(a)}}}function Au(i){let e=new WeakMap;return{get:function(t,n=0){const r=e.get(t);let a;return r===void 0?(a=new Mo(i),e.set(t,[a])):n>=r.length?(a=new Mo(i),r.push(a)):a=r[n],a},dispose:function(){e=new WeakMap}}}class Ru extends Ai{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Cu extends Ai{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function Pu(i,e,t){let n=new Gr;const r=new Ge,a=new Ge,o=new rt,u=new Ru({depthPacking:3201}),s=new Cu,c={},l=t.maxTextureSize,h={[Dn]:It,[It]:Dn,2:2},d=new Un({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ge},radius:{value:4}},vertexShader:`void main() {
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
}`}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const m=new Ot;m.setAttribute("position",new zt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new mt(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Oo;let f=this.type;function x(P,L){const q=e.update(v);d.defines.VSM_SAMPLES!==P.blurSamples&&(d.defines.VSM_SAMPLES=P.blurSamples,p.defines.VSM_SAMPLES=P.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new Yn(r.x,r.y)),d.uniforms.shadow_pass.value=P.map.texture,d.uniforms.resolution.value=P.mapSize,d.uniforms.radius.value=P.radius,i.setRenderTarget(P.mapPass),i.clear(),i.renderBufferDirect(L,null,q,d,v,null),p.uniforms.shadow_pass.value=P.mapPass.texture,p.uniforms.resolution.value=P.mapSize,p.uniforms.radius.value=P.radius,i.setRenderTarget(P.map),i.clear(),i.renderBufferDirect(L,null,q,p,v,null)}function M(P,L,q,U){let z=null;const Z=q.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(Z!==void 0)z=Z;else if(z=q.isPointLight===!0?s:u,i.localClippingEnabled&&L.clipShadows===!0&&Array.isArray(L.clippingPlanes)&&L.clippingPlanes.length!==0||L.displacementMap&&L.displacementScale!==0||L.alphaMap&&L.alphaTest>0||L.map&&L.alphaTest>0){const G=z.uuid,J=L.uuid;let W=c[G];W===void 0&&(W={},c[G]=W);let $=W[J];$===void 0&&($=z.clone(),W[J]=$,L.addEventListener("dispose",w)),z=$}return z.visible=L.visible,z.wireframe=L.wireframe,z.side=U===_n?L.shadowSide!==null?L.shadowSide:L.side:L.shadowSide!==null?L.shadowSide:h[L.side],z.alphaMap=L.alphaMap,z.alphaTest=L.alphaTest,z.map=L.map,z.clipShadows=L.clipShadows,z.clippingPlanes=L.clippingPlanes,z.clipIntersection=L.clipIntersection,z.displacementMap=L.displacementMap,z.displacementScale=L.displacementScale,z.displacementBias=L.displacementBias,z.wireframeLinewidth=L.wireframeLinewidth,z.linewidth=L.linewidth,q.isPointLight===!0&&z.isMeshDistanceMaterial===!0&&(i.properties.get(z).light=q),z}function S(P,L,q,U,z){if(P.visible===!1)return;if(P.layers.test(L.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&z===_n)&&(!P.frustumCulled||n.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,P.matrixWorld);const G=e.update(P),J=P.material;if(Array.isArray(J)){const W=G.groups;for(let $=0,ee=W.length;$<ee;$++){const ce=W[$],ue=J[ce.materialIndex];if(ue&&ue.visible){const Me=M(P,ue,U,z);P.onBeforeShadow(i,P,L,q,G,Me,ce),i.renderBufferDirect(q,null,G,Me,P,ce),P.onAfterShadow(i,P,L,q,G,Me,ce)}}}else if(J.visible){const W=M(P,J,U,z);P.onBeforeShadow(i,P,L,q,G,W,null),i.renderBufferDirect(q,null,G,W,P,null),P.onAfterShadow(i,P,L,q,G,W,null)}}const Z=P.children;for(let G=0,J=Z.length;G<J;G++)S(Z[G],L,q,U,z)}function w(P){P.target.removeEventListener("dispose",w);for(const L in c){const q=c[L],U=P.target.uuid;U in q&&(q[U].dispose(),delete q[U])}}this.render=function(P,L,q){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||P.length===0)return;const U=i.getRenderTarget(),z=i.getActiveCubeFace(),Z=i.getActiveMipmapLevel(),G=i.state;G.setBlending(0),G.buffers.color.setClear(1,1,1,1),G.buffers.depth.setTest(!0),G.setScissorTest(!1);const J=f!==_n&&this.type===_n,W=f===_n&&this.type!==_n;for(let $=0,ee=P.length;$<ee;$++){const ce=P[$],ue=ce.shadow;if(ue===void 0){console.warn("THREE.WebGLShadowMap:",ce,"has no shadow.");continue}if(ue.autoUpdate===!1&&ue.needsUpdate===!1)continue;r.copy(ue.mapSize);const Me=ue.getFrameExtents();if(r.multiply(Me),a.copy(ue.mapSize),(r.x>l||r.y>l)&&(r.x>l&&(a.x=Math.floor(l/Me.x),r.x=a.x*Me.x,ue.mapSize.x=a.x),r.y>l&&(a.y=Math.floor(l/Me.y),r.y=a.y*Me.y,ue.mapSize.y=a.y)),ue.map===null||J===!0||W===!0){const ie=this.type!==_n?{minFilter:Xt,magFilter:Xt}:{};ue.map!==null&&ue.map.dispose(),ue.map=new Yn(r.x,r.y,ie),ue.map.texture.name=ce.name+".shadowMap",ue.camera.updateProjectionMatrix()}i.setRenderTarget(ue.map),i.clear();const Pe=ue.getViewportCount();for(let ie=0;ie<Pe;ie++){const K=ue.getViewport(ie);o.set(a.x*K.x,a.y*K.y,a.x*K.z,a.y*K.w),G.viewport(o),ue.updateMatrices(ce,ie),n=ue.getFrustum(),S(L,q,ue.camera,ce,this.type)}ue.isPointLightShadow!==!0&&this.type===_n&&x(ue,q),ue.needsUpdate=!1}f=this.type,g.needsUpdate=!1,i.setRenderTarget(U,z,Z)}}const Lu={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3};function Du(i){const e=new function(){let E=!1;const V=new rt;let k=null;const le=new rt(0,0,0,0);return{setMask:function(X){k===X||E||(i.colorMask(X,X,X,X),k=X)},setLocked:function(X){E=X},setClear:function(X,se,he,re,ve){ve===!0&&(X*=re,se*=re,he*=re),V.set(X,se,he,re),le.equals(V)===!1&&(i.clearColor(X,se,he,re),le.copy(V))},reset:function(){E=!1,k=null,le.set(-1,0,0,0)}}},t=new function(){let E=!1,V=!1,k=null,le=null,X=null;return{setReversed:function(se){V=se},setTest:function(se){se?fe(i.DEPTH_TEST):Se(i.DEPTH_TEST)},setMask:function(se){k===se||E||(i.depthMask(se),k=se)},setFunc:function(se){if(V&&(se=Lu[se]),le!==se){switch(se){case 0:i.depthFunc(i.NEVER);break;case 1:i.depthFunc(i.ALWAYS);break;case 2:i.depthFunc(i.LESS);break;case 3:default:i.depthFunc(i.LEQUAL);break;case 4:i.depthFunc(i.EQUAL);break;case 5:i.depthFunc(i.GEQUAL);break;case 6:i.depthFunc(i.GREATER);break;case 7:i.depthFunc(i.NOTEQUAL)}le=se}},setLocked:function(se){E=se},setClear:function(se){X!==se&&(i.clearDepth(se),X=se)},reset:function(){E=!1,k=null,le=null,X=null}}},n=new function(){let E=!1,V=null,k=null,le=null,X=null,se=null,he=null,re=null,ve=null;return{setTest:function(ge){E||(ge?fe(i.STENCIL_TEST):Se(i.STENCIL_TEST))},setMask:function(ge){V===ge||E||(i.stencilMask(ge),V=ge)},setFunc:function(ge,Ee,Le){k===ge&&le===Ee&&X===Le||(i.stencilFunc(ge,Ee,Le),k=ge,le=Ee,X=Le)},setOp:function(ge,Ee,Le){se===ge&&he===Ee&&re===Le||(i.stencilOp(ge,Ee,Le),se=ge,he=Ee,re=Le)},setLocked:function(ge){E=ge},setClear:function(ge){ve!==ge&&(i.clearStencil(ge),ve=ge)},reset:function(){E=!1,V=null,k=null,le=null,X=null,se=null,he=null,re=null,ve=null}}},r=new WeakMap,a=new WeakMap;let o={},u={},s=new WeakMap,c=[],l=null,h=!1,d=null,p=null,m=null,v=null,g=null,f=null,x=null,M=new ze(0,0,0),S=0,w=!1,P=null,L=null,q=null,U=null,z=null;const Z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,J=0;const W=i.getParameter(i.VERSION);W.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(W)[1]),G=J>=1):W.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),G=J>=2);let $=null,ee={};const ce=i.getParameter(i.SCISSOR_BOX),ue=i.getParameter(i.VIEWPORT),Me=new rt().fromArray(ce),Pe=new rt().fromArray(ue);function ie(E,V,k,le){const X=new Uint8Array(4),se=i.createTexture();i.bindTexture(E,se),i.texParameteri(E,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(E,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let he=0;he<k;he++)E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY?i.texImage3D(V,0,i.RGBA,1,1,le,0,i.RGBA,i.UNSIGNED_BYTE,X):i.texImage2D(V+he,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,X);return se}const K={};function fe(E){o[E]!==!0&&(i.enable(E),o[E]=!0)}function Se(E){o[E]!==!1&&(i.disable(E),o[E]=!1)}K[i.TEXTURE_2D]=ie(i.TEXTURE_2D,i.TEXTURE_2D,1),K[i.TEXTURE_CUBE_MAP]=ie(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),K[i.TEXTURE_2D_ARRAY]=ie(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),K[i.TEXTURE_3D]=ie(i.TEXTURE_3D,i.TEXTURE_3D,1,1),e.setClear(0,0,0,1),t.setClear(1),n.setClear(0),fe(i.DEPTH_TEST),t.setFunc(3),Y(!1),N(1),fe(i.CULL_FACE),I(0);const b={[Xn]:i.FUNC_ADD,101:i.FUNC_SUBTRACT,102:i.FUNC_REVERSE_SUBTRACT};b[103]=i.MIN,b[104]=i.MAX;const y={200:i.ZERO,201:i.ONE,202:i.SRC_COLOR,[Pa]:i.SRC_ALPHA,210:i.SRC_ALPHA_SATURATE,208:i.DST_COLOR,206:i.DST_ALPHA,203:i.ONE_MINUS_SRC_COLOR,[La]:i.ONE_MINUS_SRC_ALPHA,209:i.ONE_MINUS_DST_COLOR,207:i.ONE_MINUS_DST_ALPHA,211:i.CONSTANT_COLOR,212:i.ONE_MINUS_CONSTANT_COLOR,213:i.CONSTANT_ALPHA,214:i.ONE_MINUS_CONSTANT_ALPHA};function I(E,V,k,le,X,se,he,re,ve,ge){if(E!==0){if(h===!1&&(fe(i.BLEND),h=!0),E===5)X=X||V,se=se||k,he=he||le,V===p&&X===g||(i.blendEquationSeparate(b[V],b[X]),p=V,g=X),k===m&&le===v&&se===f&&he===x||(i.blendFuncSeparate(y[k],y[le],y[se],y[he]),m=k,v=le,f=se,x=he),re.equals(M)!==!1&&ve===S||(i.blendColor(re.r,re.g,re.b,ve),M.copy(re),S=ve),d=E,w=!1;else if(E!==d||ge!==w){if(p===Xn&&g===Xn||(i.blendEquation(i.FUNC_ADD),p=Xn,g=Xn),ge)switch(E){case 1:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case 2:i.blendFunc(i.ONE,i.ONE);break;case 3:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case 4:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",E)}else switch(E){case 1:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case 2:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case 3:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case 4:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",E)}m=null,v=null,f=null,x=null,M.set(0,0,0),S=0,d=E,w=ge}}else h===!0&&(Se(i.BLEND),h=!1)}function Y(E){P!==E&&(E?i.frontFace(i.CW):i.frontFace(i.CCW),P=E)}function N(E){E!==0?(fe(i.CULL_FACE),E!==L&&(E===1?i.cullFace(i.BACK):E===2?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):Se(i.CULL_FACE),L=E}function H(E,V,k){E?(fe(i.POLYGON_OFFSET_FILL),U===V&&z===k||(i.polygonOffset(V,k),U=V,z=k)):Se(i.POLYGON_OFFSET_FILL)}return{buffers:{color:e,depth:t,stencil:n},enable:fe,disable:Se,bindFramebuffer:function(E,V){return u[E]!==V&&(i.bindFramebuffer(E,V),u[E]=V,E===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=V),E===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=V),!0)},drawBuffers:function(E,V){let k=c,le=!1;if(E){k=s.get(V),k===void 0&&(k=[],s.set(V,k));const X=E.textures;if(k.length!==X.length||k[0]!==i.COLOR_ATTACHMENT0){for(let se=0,he=X.length;se<he;se++)k[se]=i.COLOR_ATTACHMENT0+se;k.length=X.length,le=!0}}else k[0]!==i.BACK&&(k[0]=i.BACK,le=!0);le&&i.drawBuffers(k)},useProgram:function(E){return l!==E&&(i.useProgram(E),l=E,!0)},setBlending:I,setMaterial:function(E,V){E.side===2?Se(i.CULL_FACE):fe(i.CULL_FACE);let k=E.side===It;V&&(k=!k),Y(k),E.blending===1&&E.transparent===!1?I(0):I(E.blending,E.blendEquation,E.blendSrc,E.blendDst,E.blendEquationAlpha,E.blendSrcAlpha,E.blendDstAlpha,E.blendColor,E.blendAlpha,E.premultipliedAlpha),t.setFunc(E.depthFunc),t.setTest(E.depthTest),t.setMask(E.depthWrite),e.setMask(E.colorWrite);const le=E.stencilWrite;n.setTest(le),le&&(n.setMask(E.stencilWriteMask),n.setFunc(E.stencilFunc,E.stencilRef,E.stencilFuncMask),n.setOp(E.stencilFail,E.stencilZFail,E.stencilZPass)),H(E.polygonOffset,E.polygonOffsetFactor,E.polygonOffsetUnits),E.alphaToCoverage===!0?fe(i.SAMPLE_ALPHA_TO_COVERAGE):Se(i.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:Y,setCullFace:N,setLineWidth:function(E){E!==q&&(G&&i.lineWidth(E),q=E)},setPolygonOffset:H,setScissorTest:function(E){E?fe(i.SCISSOR_TEST):Se(i.SCISSOR_TEST)},activeTexture:function(E){E===void 0&&(E=i.TEXTURE0+Z-1),$!==E&&(i.activeTexture(E),$=E)},bindTexture:function(E,V,k){k===void 0&&(k=$===null?i.TEXTURE0+Z-1:$);let le=ee[k];le===void 0&&(le={type:void 0,texture:void 0},ee[k]=le),le.type===E&&le.texture===V||($!==k&&(i.activeTexture(k),$=k),i.bindTexture(E,V||K[E]),le.type=E,le.texture=V)},unbindTexture:function(){const E=ee[$];E!==void 0&&E.type!==void 0&&(i.bindTexture(E.type,null),E.type=void 0,E.texture=void 0)},compressedTexImage2D:function(){try{i.compressedTexImage2D.apply(i,arguments)}catch(E){console.error("THREE.WebGLState:",E)}},compressedTexImage3D:function(){try{i.compressedTexImage3D.apply(i,arguments)}catch(E){console.error("THREE.WebGLState:",E)}},texImage2D:function(){try{i.texImage2D.apply(i,arguments)}catch(E){console.error("THREE.WebGLState:",E)}},texImage3D:function(){try{i.texImage3D.apply(i,arguments)}catch(E){console.error("THREE.WebGLState:",E)}},updateUBOMapping:function(E,V){let k=a.get(V);k===void 0&&(k=new WeakMap,a.set(V,k));let le=k.get(E);le===void 0&&(le=i.getUniformBlockIndex(V,E.name),k.set(E,le))},uniformBlockBinding:function(E,V){const k=a.get(V).get(E);r.get(V)!==k&&(i.uniformBlockBinding(V,k,E.__bindingPointIndex),r.set(V,k))},texStorage2D:function(){try{i.texStorage2D.apply(i,arguments)}catch(E){console.error("THREE.WebGLState:",E)}},texStorage3D:function(){try{i.texStorage3D.apply(i,arguments)}catch(E){console.error("THREE.WebGLState:",E)}},texSubImage2D:function(){try{i.texSubImage2D.apply(i,arguments)}catch(E){console.error("THREE.WebGLState:",E)}},texSubImage3D:function(){try{i.texSubImage3D.apply(i,arguments)}catch(E){console.error("THREE.WebGLState:",E)}},compressedTexSubImage2D:function(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(E){console.error("THREE.WebGLState:",E)}},compressedTexSubImage3D:function(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(E){console.error("THREE.WebGLState:",E)}},scissor:function(E){Me.equals(E)===!1&&(i.scissor(E.x,E.y,E.z,E.w),Me.copy(E))},viewport:function(E){Pe.equals(E)===!1&&(i.viewport(E.x,E.y,E.z,E.w),Pe.copy(E))},reset:function(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),o={},$=null,ee={},u={},s=new WeakMap,c=[],l=null,h=!1,d=null,p=null,m=null,v=null,g=null,f=null,x=null,M=new ze(0,0,0),S=0,w=!1,P=null,L=null,q=null,U=null,z=null,Me.set(0,0,i.canvas.width,i.canvas.height),Pe.set(0,0,i.canvas.width,i.canvas.height),e.reset(),t.reset(),n.reset()}}}function So(i,e,t,n){const r=function(a){switch(a){case vn:case Go:return{byteLength:1,components:1};case ji:case Vo:case Ki:return{byteLength:2,components:1};case ps:case fs:return{byteLength:2,components:4};case qn:case ds:case on:return{byteLength:4,components:1};case ko:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${a}.`)}(n);switch(t){case Wo:case jo:return i*e;case qo:return i*e*2;case ms:case gs:return i*e/r.components*r.byteLength;case Yo:case _s:return i*e*2/r.components*r.byteLength;case Xo:return i*e*3/r.components*r.byteLength;case tn:case vs:return i*e*4/r.components*r.byteLength;case Er:case br:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Tr:case wr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Oa:case Ba:return Math.max(i,16)*Math.max(e,8)/4;case Na:case Fa:return Math.max(i,8)*Math.max(e,8)/2;case za:case Ha:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ga:case Va:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ka:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Wa:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Xa:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case ja:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case qa:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Ya:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Ka:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Za:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Ja:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case $a:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Qa:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case es:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case ts:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Ar:case ns:case is:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Ko:case rs:return Math.ceil(i/4)*Math.ceil(e/4)*8;case as:case ss:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Uu(i,e,t,n,r,a,o){const u=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,s=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),c=new Ge,l=new WeakMap;let h;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(b,y){return p?new OffscreenCanvas(b,y):Nr("canvas")}function v(b,y,I){let Y=1;const N=Se(b);if((N.width>I||N.height>I)&&(Y=I/Math.max(N.width,N.height)),Y<1){if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){const H=Math.floor(Y*N.width),E=Math.floor(Y*N.height);h===void 0&&(h=m(H,E));const V=y?m(H,E):h;return V.width=H,V.height=E,V.getContext("2d").drawImage(b,0,0,H,E),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+N.width+"x"+N.height+") to ("+H+"x"+E+")."),V}return"data"in b&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+N.width+"x"+N.height+")."),b}return b}function g(b){return b.generateMipmaps&&b.minFilter!==Xt&&b.minFilter!==sn}function f(b){i.generateMipmap(b)}function x(b,y,I,Y,N=!1){if(b!==null){if(i[b]!==void 0)return i[b];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let H=y;if(y===i.RED&&(I===i.FLOAT&&(H=i.R32F),I===i.HALF_FLOAT&&(H=i.R16F),I===i.UNSIGNED_BYTE&&(H=i.R8)),y===i.RED_INTEGER&&(I===i.UNSIGNED_BYTE&&(H=i.R8UI),I===i.UNSIGNED_SHORT&&(H=i.R16UI),I===i.UNSIGNED_INT&&(H=i.R32UI),I===i.BYTE&&(H=i.R8I),I===i.SHORT&&(H=i.R16I),I===i.INT&&(H=i.R32I)),y===i.RG&&(I===i.FLOAT&&(H=i.RG32F),I===i.HALF_FLOAT&&(H=i.RG16F),I===i.UNSIGNED_BYTE&&(H=i.RG8)),y===i.RG_INTEGER&&(I===i.UNSIGNED_BYTE&&(H=i.RG8UI),I===i.UNSIGNED_SHORT&&(H=i.RG16UI),I===i.UNSIGNED_INT&&(H=i.RG32UI),I===i.BYTE&&(H=i.RG8I),I===i.SHORT&&(H=i.RG16I),I===i.INT&&(H=i.RG32I)),y===i.RGB_INTEGER&&(I===i.UNSIGNED_BYTE&&(H=i.RGB8UI),I===i.UNSIGNED_SHORT&&(H=i.RGB16UI),I===i.UNSIGNED_INT&&(H=i.RGB32UI),I===i.BYTE&&(H=i.RGB8I),I===i.SHORT&&(H=i.RGB16I),I===i.INT&&(H=i.RGB32I)),y===i.RGBA_INTEGER&&(I===i.UNSIGNED_BYTE&&(H=i.RGBA8UI),I===i.UNSIGNED_SHORT&&(H=i.RGBA16UI),I===i.UNSIGNED_INT&&(H=i.RGBA32UI),I===i.BYTE&&(H=i.RGBA8I),I===i.SHORT&&(H=i.RGBA16I),I===i.INT&&(H=i.RGBA32I)),y===i.RGB&&I===i.UNSIGNED_INT_5_9_9_9_REV&&(H=i.RGB9_E5),y===i.RGBA){const E=N?Lr:it.getTransfer(Y);I===i.FLOAT&&(H=i.RGBA32F),I===i.HALF_FLOAT&&(H=i.RGBA16F),I===i.UNSIGNED_BYTE&&(H=E===ot?i.SRGB8_ALPHA8:i.RGBA8),I===i.UNSIGNED_SHORT_4_4_4_4&&(H=i.RGBA4),I===i.UNSIGNED_SHORT_5_5_5_1&&(H=i.RGB5_A1)}return H!==i.R16F&&H!==i.R32F&&H!==i.RG16F&&H!==i.RG32F&&H!==i.RGBA16F&&H!==i.RGBA32F||e.get("EXT_color_buffer_float"),H}function M(b,y){let I;return b?y===null||y===qn||y===yi?I=i.DEPTH24_STENCIL8:y===on?I=i.DEPTH32F_STENCIL8:y===ji&&(I=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===qn||y===yi?I=i.DEPTH_COMPONENT24:y===on?I=i.DEPTH_COMPONENT32F:y===ji&&(I=i.DEPTH_COMPONENT16),I}function S(b,y){return g(b)===!0||b.isFramebufferTexture&&b.minFilter!==Xt&&b.minFilter!==sn?Math.log2(Math.max(y.width,y.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?y.mipmaps.length:1}function w(b){const y=b.target;y.removeEventListener("dispose",w),function(I){const Y=n.get(I);if(Y.__webglInit===void 0)return;const N=I.source,H=d.get(N);if(H){const E=H[Y.__cacheKey];E.usedTimes--,E.usedTimes===0&&L(I),Object.keys(H).length===0&&d.delete(N)}n.remove(I)}(y),y.isVideoTexture&&l.delete(y)}function P(b){const y=b.target;y.removeEventListener("dispose",P),function(I){const Y=n.get(I);if(I.depthTexture&&I.depthTexture.dispose(),I.isWebGLCubeRenderTarget)for(let H=0;H<6;H++){if(Array.isArray(Y.__webglFramebuffer[H]))for(let E=0;E<Y.__webglFramebuffer[H].length;E++)i.deleteFramebuffer(Y.__webglFramebuffer[H][E]);else i.deleteFramebuffer(Y.__webglFramebuffer[H]);Y.__webglDepthbuffer&&i.deleteRenderbuffer(Y.__webglDepthbuffer[H])}else{if(Array.isArray(Y.__webglFramebuffer))for(let H=0;H<Y.__webglFramebuffer.length;H++)i.deleteFramebuffer(Y.__webglFramebuffer[H]);else i.deleteFramebuffer(Y.__webglFramebuffer);if(Y.__webglDepthbuffer&&i.deleteRenderbuffer(Y.__webglDepthbuffer),Y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(Y.__webglMultisampledFramebuffer),Y.__webglColorRenderbuffer)for(let H=0;H<Y.__webglColorRenderbuffer.length;H++)Y.__webglColorRenderbuffer[H]&&i.deleteRenderbuffer(Y.__webglColorRenderbuffer[H]);Y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(Y.__webglDepthRenderbuffer)}const N=I.textures;for(let H=0,E=N.length;H<E;H++){const V=n.get(N[H]);V.__webglTexture&&(i.deleteTexture(V.__webglTexture),o.memory.textures--),n.remove(N[H])}n.remove(I)}(y)}function L(b){const y=n.get(b);i.deleteTexture(y.__webglTexture);const I=b.source;delete d.get(I)[y.__cacheKey],o.memory.textures--}let q=0;function U(b,y){const I=n.get(b);if(b.isVideoTexture&&function(Y){const N=o.render.frame;l.get(Y)!==N&&(l.set(Y,N),Y.update())}(b),b.isRenderTargetTexture===!1&&b.version>0&&I.__version!==b.version){const Y=b.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else{if(Y.complete!==!1)return void $(I,b,y);console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")}}t.bindTexture(i.TEXTURE_2D,I.__webglTexture,i.TEXTURE0+y)}const z={[Wi]:i.REPEAT,[Xi]:i.CLAMP_TO_EDGE,[Ia]:i.MIRRORED_REPEAT},Z={[Xt]:i.NEAREST,[Dl]:i.NEAREST_MIPMAP_NEAREST,[Qi]:i.NEAREST_MIPMAP_LINEAR,[sn]:i.LINEAR,[qr]:i.LINEAR_MIPMAP_NEAREST,[gi]:i.LINEAR_MIPMAP_LINEAR},G={512:i.NEVER,519:i.ALWAYS,513:i.LESS,[Zo]:i.LEQUAL,514:i.EQUAL,518:i.GEQUAL,516:i.GREATER,517:i.NOTEQUAL};function J(b,y){if(y.type!==on||e.has("OES_texture_float_linear")!==!1||y.magFilter!==sn&&y.magFilter!==qr&&y.magFilter!==Qi&&y.magFilter!==gi&&y.minFilter!==sn&&y.minFilter!==qr&&y.minFilter!==Qi&&y.minFilter!==gi||console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(b,i.TEXTURE_WRAP_S,z[y.wrapS]),i.texParameteri(b,i.TEXTURE_WRAP_T,z[y.wrapT]),b!==i.TEXTURE_3D&&b!==i.TEXTURE_2D_ARRAY||i.texParameteri(b,i.TEXTURE_WRAP_R,z[y.wrapR]),i.texParameteri(b,i.TEXTURE_MAG_FILTER,Z[y.magFilter]),i.texParameteri(b,i.TEXTURE_MIN_FILTER,Z[y.minFilter]),y.compareFunction&&(i.texParameteri(b,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(b,i.TEXTURE_COMPARE_FUNC,G[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Xt||y.minFilter!==Qi&&y.minFilter!==gi||y.type===on&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const I=e.get("EXT_texture_filter_anisotropic");i.texParameterf(b,I.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,r.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function W(b,y){let I=!1;b.__webglInit===void 0&&(b.__webglInit=!0,y.addEventListener("dispose",w));const Y=y.source;let N=d.get(Y);N===void 0&&(N={},d.set(Y,N));const H=function(E){const V=[];return V.push(E.wrapS),V.push(E.wrapT),V.push(E.wrapR||0),V.push(E.magFilter),V.push(E.minFilter),V.push(E.anisotropy),V.push(E.internalFormat),V.push(E.format),V.push(E.type),V.push(E.generateMipmaps),V.push(E.premultiplyAlpha),V.push(E.flipY),V.push(E.unpackAlignment),V.push(E.colorSpace),V.join()}(y);if(H!==b.__cacheKey){N[H]===void 0&&(N[H]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,I=!0),N[H].usedTimes++;const E=N[b.__cacheKey];E!==void 0&&(N[b.__cacheKey].usedTimes--,E.usedTimes===0&&L(y)),b.__cacheKey=H,b.__webglTexture=N[H].texture}return I}function $(b,y,I){let Y=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(Y=i.TEXTURE_3D);const N=W(b,y),H=y.source;t.bindTexture(Y,b.__webglTexture,i.TEXTURE0+I);const E=n.get(H);if(H.version!==E.__version||N===!0){t.activeTexture(i.TEXTURE0+I);const V=it.getPrimaries(it.workingColorSpace),k=y.colorSpace===fi?null:it.getPrimaries(y.colorSpace),le=y.colorSpace===fi||V===k?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,le);let X=v(y.image,!1,r.maxTextureSize);X=fe(y,X);const se=a.convert(y.format,y.colorSpace),he=a.convert(y.type);let re,ve=x(y.internalFormat,se,he,y.colorSpace,y.isVideoTexture);J(Y,y);const ge=y.mipmaps,Ee=y.isVideoTexture!==!0,Le=E.__version===void 0||N===!0,He=H.dataReady,Ke=S(y,X);if(y.isDepthTexture)ve=M(y.format===Ei,y.type),Le&&(Ee?t.texStorage2D(i.TEXTURE_2D,1,ve,X.width,X.height):t.texImage2D(i.TEXTURE_2D,0,ve,X.width,X.height,0,se,he,null));else if(y.isDataTexture)if(ge.length>0){Ee&&Le&&t.texStorage2D(i.TEXTURE_2D,Ke,ve,ge[0].width,ge[0].height);for(let Te=0,Ue=ge.length;Te<Ue;Te++)re=ge[Te],Ee?He&&t.texSubImage2D(i.TEXTURE_2D,Te,0,0,re.width,re.height,se,he,re.data):t.texImage2D(i.TEXTURE_2D,Te,ve,re.width,re.height,0,se,he,re.data);y.generateMipmaps=!1}else Ee?(Le&&t.texStorage2D(i.TEXTURE_2D,Ke,ve,X.width,X.height),He&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,X.width,X.height,se,he,X.data)):t.texImage2D(i.TEXTURE_2D,0,ve,X.width,X.height,0,se,he,X.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Ee&&Le&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ke,ve,ge[0].width,ge[0].height,X.depth);for(let Te=0,Ue=ge.length;Te<Ue;Te++)if(re=ge[Te],y.format!==tn)if(se!==null)if(Ee){if(He)if(y.layerUpdates.size>0){const nt=So(re.width,re.height,y.format,y.type);for(const at of y.layerUpdates){const xe=re.data.subarray(at*nt/re.data.BYTES_PER_ELEMENT,(at+1)*nt/re.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Te,0,0,at,re.width,re.height,1,se,xe,0,0)}y.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,Te,0,0,0,re.width,re.height,X.depth,se,re.data,0,0)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,Te,ve,re.width,re.height,X.depth,0,re.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ee?He&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,Te,0,0,0,re.width,re.height,X.depth,se,he,re.data):t.texImage3D(i.TEXTURE_2D_ARRAY,Te,ve,re.width,re.height,X.depth,0,se,he,re.data)}else{Ee&&Le&&t.texStorage2D(i.TEXTURE_2D,Ke,ve,ge[0].width,ge[0].height);for(let Te=0,Ue=ge.length;Te<Ue;Te++)re=ge[Te],y.format!==tn?se!==null?Ee?He&&t.compressedTexSubImage2D(i.TEXTURE_2D,Te,0,0,re.width,re.height,se,re.data):t.compressedTexImage2D(i.TEXTURE_2D,Te,ve,re.width,re.height,0,re.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ee?He&&t.texSubImage2D(i.TEXTURE_2D,Te,0,0,re.width,re.height,se,he,re.data):t.texImage2D(i.TEXTURE_2D,Te,ve,re.width,re.height,0,se,he,re.data)}else if(y.isDataArrayTexture)if(Ee){if(Le&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ke,ve,X.width,X.height,X.depth),He)if(y.layerUpdates.size>0){const Te=So(X.width,X.height,y.format,y.type);for(const Ue of y.layerUpdates){const nt=X.data.subarray(Ue*Te/X.data.BYTES_PER_ELEMENT,(Ue+1)*Te/X.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Ue,X.width,X.height,1,se,he,nt)}y.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,X.width,X.height,X.depth,se,he,X.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ve,X.width,X.height,X.depth,0,se,he,X.data);else if(y.isData3DTexture)Ee?(Le&&t.texStorage3D(i.TEXTURE_3D,Ke,ve,X.width,X.height,X.depth),He&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,X.width,X.height,X.depth,se,he,X.data)):t.texImage3D(i.TEXTURE_3D,0,ve,X.width,X.height,X.depth,0,se,he,X.data);else if(y.isFramebufferTexture){if(Le)if(Ee)t.texStorage2D(i.TEXTURE_2D,Ke,ve,X.width,X.height);else{let Te=X.width,Ue=X.height;for(let nt=0;nt<Ke;nt++)t.texImage2D(i.TEXTURE_2D,nt,ve,Te,Ue,0,se,he,null),Te>>=1,Ue>>=1}}else if(ge.length>0){if(Ee&&Le){const Te=Se(ge[0]);t.texStorage2D(i.TEXTURE_2D,Ke,ve,Te.width,Te.height)}for(let Te=0,Ue=ge.length;Te<Ue;Te++)re=ge[Te],Ee?He&&t.texSubImage2D(i.TEXTURE_2D,Te,0,0,se,he,re):t.texImage2D(i.TEXTURE_2D,Te,ve,se,he,re);y.generateMipmaps=!1}else if(Ee){if(Le){const Te=Se(X);t.texStorage2D(i.TEXTURE_2D,Ke,ve,Te.width,Te.height)}He&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,se,he,X)}else t.texImage2D(i.TEXTURE_2D,0,ve,se,he,X);g(y)&&f(Y),E.__version=H.version,y.onUpdate&&y.onUpdate(y)}b.__version=y.version}function ee(b,y,I,Y,N,H){const E=a.convert(I.format,I.colorSpace),V=a.convert(I.type),k=x(I.internalFormat,E,V,I.colorSpace);if(!n.get(y).__hasExternalTextures){const le=Math.max(1,y.width>>H),X=Math.max(1,y.height>>H);N===i.TEXTURE_3D||N===i.TEXTURE_2D_ARRAY?t.texImage3D(N,H,k,le,X,y.depth,0,E,V,null):t.texImage2D(N,H,k,le,X,0,E,V,null)}t.bindFramebuffer(i.FRAMEBUFFER,b),K(y)?u.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,N,n.get(I).__webglTexture,0,ie(y)):(N===i.TEXTURE_2D||N>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&N<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,N,n.get(I).__webglTexture,H),t.bindFramebuffer(i.FRAMEBUFFER,null)}function ce(b,y,I){if(i.bindRenderbuffer(i.RENDERBUFFER,b),y.depthBuffer){const Y=y.depthTexture,N=Y&&Y.isDepthTexture?Y.type:null,H=M(y.stencilBuffer,N),E=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,V=ie(y);K(y)?u.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,V,H,y.width,y.height):I?i.renderbufferStorageMultisample(i.RENDERBUFFER,V,H,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,H,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,E,i.RENDERBUFFER,b)}else{const Y=y.textures;for(let N=0;N<Y.length;N++){const H=Y[N],E=a.convert(H.format,H.colorSpace),V=a.convert(H.type),k=x(H.internalFormat,E,V,H.colorSpace),le=ie(y);I&&K(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,le,k,y.width,y.height):K(y)?u.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,le,k,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,k,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ue(b){const y=n.get(b),I=b.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==b.depthTexture){const Y=b.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),Y){const N=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,Y.removeEventListener("dispose",N)};Y.addEventListener("dispose",N),y.__depthDisposeCallback=N}y.__boundDepthTexture=Y}if(b.depthTexture&&!y.__autoAllocateDepthBuffer){if(I)throw new Error("target.depthTexture not supported in Cube render targets");(function(Y,N){if(N&&N.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,Y),!N.depthTexture||!N.depthTexture.isDepthTexture)throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");n.get(N.depthTexture).__webglTexture&&N.depthTexture.image.width===N.width&&N.depthTexture.image.height===N.height||(N.depthTexture.image.width=N.width,N.depthTexture.image.height=N.height,N.depthTexture.needsUpdate=!0),U(N.depthTexture,0);const H=n.get(N.depthTexture).__webglTexture,E=ie(N);if(N.depthTexture.format===qi)K(N)?u.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,H,0,E):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,H,0);else{if(N.depthTexture.format!==Ei)throw new Error("Unknown depthTexture format");K(N)?u.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,H,0,E):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,H,0)}})(y.__webglFramebuffer,b)}else if(I){y.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[Y]),y.__webglDepthbuffer[Y]===void 0)y.__webglDepthbuffer[Y]=i.createRenderbuffer(),ce(y.__webglDepthbuffer[Y],b,!1);else{const N=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,H=y.__webglDepthbuffer[Y];i.bindRenderbuffer(i.RENDERBUFFER,H),i.framebufferRenderbuffer(i.FRAMEBUFFER,N,i.RENDERBUFFER,H)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),ce(y.__webglDepthbuffer,b,!1);else{const Y=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,N=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,N),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,N)}t.bindFramebuffer(i.FRAMEBUFFER,null)}const Me=[],Pe=[];function ie(b){return Math.min(r.maxSamples,b.samples)}function K(b){const y=n.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function fe(b,y){const I=b.colorSpace,Y=b.format,N=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||I!==In&&I!==fi&&(it.getTransfer(I)===ot?Y===tn&&N===vn||console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",I)),y}function Se(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=function(){const b=q;return b>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+b+" texture units while this GPU supports only "+r.maxTextures),q+=1,b},this.resetTextureUnits=function(){q=0},this.setTexture2D=U,this.setTexture2DArray=function(b,y){const I=n.get(b);b.version>0&&I.__version!==b.version?$(I,b,y):t.bindTexture(i.TEXTURE_2D_ARRAY,I.__webglTexture,i.TEXTURE0+y)},this.setTexture3D=function(b,y){const I=n.get(b);b.version>0&&I.__version!==b.version?$(I,b,y):t.bindTexture(i.TEXTURE_3D,I.__webglTexture,i.TEXTURE0+y)},this.setTextureCube=function(b,y){const I=n.get(b);b.version>0&&I.__version!==b.version?function(Y,N,H){if(N.image.length!==6)return;const E=W(Y,N),V=N.source;t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture,i.TEXTURE0+H);const k=n.get(V);if(V.version!==k.__version||E===!0){t.activeTexture(i.TEXTURE0+H);const le=it.getPrimaries(it.workingColorSpace),X=N.colorSpace===fi?null:it.getPrimaries(N.colorSpace),se=N.colorSpace===fi||le===X?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,N.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,N.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,se);const he=N.isCompressedTexture||N.image[0].isCompressedTexture,re=N.image[0]&&N.image[0].isDataTexture,ve=[];for(let xe=0;xe<6;xe++)ve[xe]=he||re?re?N.image[xe].image:N.image[xe]:v(N.image[xe],!0,r.maxCubemapSize),ve[xe]=fe(N,ve[xe]);const ge=ve[0],Ee=a.convert(N.format,N.colorSpace),Le=a.convert(N.type),He=x(N.internalFormat,Ee,Le,N.colorSpace),Ke=N.isVideoTexture!==!0,Te=k.__version===void 0||E===!0,Ue=V.dataReady;let nt,at=S(N,ge);if(J(i.TEXTURE_CUBE_MAP,N),he){Ke&&Te&&t.texStorage2D(i.TEXTURE_CUBE_MAP,at,He,ge.width,ge.height);for(let xe=0;xe<6;xe++){nt=ve[xe].mipmaps;for(let qe=0;qe<nt.length;qe++){const Ye=nt[qe];N.format!==tn?Ee!==null?Ke?Ue&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,qe,0,0,Ye.width,Ye.height,Ee,Ye.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,qe,He,Ye.width,Ye.height,0,Ye.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ke?Ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,qe,0,0,Ye.width,Ye.height,Ee,Le,Ye.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,qe,He,Ye.width,Ye.height,0,Ee,Le,Ye.data)}}}else{if(nt=N.mipmaps,Ke&&Te){nt.length>0&&at++;const xe=Se(ve[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,at,He,xe.width,xe.height)}for(let xe=0;xe<6;xe++)if(re){Ke?Ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,0,0,ve[xe].width,ve[xe].height,Ee,Le,ve[xe].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,He,ve[xe].width,ve[xe].height,0,Ee,Le,ve[xe].data);for(let qe=0;qe<nt.length;qe++){const Ye=nt[qe].image[xe].image;Ke?Ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,qe+1,0,0,Ye.width,Ye.height,Ee,Le,Ye.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,qe+1,He,Ye.width,Ye.height,0,Ee,Le,Ye.data)}}else{Ke?Ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,0,0,Ee,Le,ve[xe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,He,Ee,Le,ve[xe]);for(let qe=0;qe<nt.length;qe++){const Ye=nt[qe];Ke?Ue&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,qe+1,0,0,Ee,Le,Ye.image[xe]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+xe,qe+1,He,Ee,Le,Ye.image[xe])}}}g(N)&&f(i.TEXTURE_CUBE_MAP),k.__version=V.version,N.onUpdate&&N.onUpdate(N)}Y.__version=N.version}(I,b,y):t.bindTexture(i.TEXTURE_CUBE_MAP,I.__webglTexture,i.TEXTURE0+y)},this.rebindTextures=function(b,y,I){const Y=n.get(b);y!==void 0&&ee(Y.__webglFramebuffer,b,b.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),I!==void 0&&ue(b)},this.setupRenderTarget=function(b){const y=b.texture,I=n.get(b),Y=n.get(y);b.addEventListener("dispose",P);const N=b.textures,H=b.isWebGLCubeRenderTarget===!0,E=N.length>1;if(E||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=y.version,o.memory.textures++),H){I.__webglFramebuffer=[];for(let V=0;V<6;V++)if(y.mipmaps&&y.mipmaps.length>0){I.__webglFramebuffer[V]=[];for(let k=0;k<y.mipmaps.length;k++)I.__webglFramebuffer[V][k]=i.createFramebuffer()}else I.__webglFramebuffer[V]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){I.__webglFramebuffer=[];for(let V=0;V<y.mipmaps.length;V++)I.__webglFramebuffer[V]=i.createFramebuffer()}else I.__webglFramebuffer=i.createFramebuffer();if(E)for(let V=0,k=N.length;V<k;V++){const le=n.get(N[V]);le.__webglTexture===void 0&&(le.__webglTexture=i.createTexture(),o.memory.textures++)}if(b.samples>0&&K(b)===!1){I.__webglMultisampledFramebuffer=i.createFramebuffer(),I.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,I.__webglMultisampledFramebuffer);for(let V=0;V<N.length;V++){const k=N[V];I.__webglColorRenderbuffer[V]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,I.__webglColorRenderbuffer[V]);const le=a.convert(k.format,k.colorSpace),X=a.convert(k.type),se=x(k.internalFormat,le,X,k.colorSpace,b.isXRRenderTarget===!0),he=ie(b);i.renderbufferStorageMultisample(i.RENDERBUFFER,he,se,b.width,b.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+V,i.RENDERBUFFER,I.__webglColorRenderbuffer[V])}i.bindRenderbuffer(i.RENDERBUFFER,null),b.depthBuffer&&(I.__webglDepthRenderbuffer=i.createRenderbuffer(),ce(I.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(H){t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),J(i.TEXTURE_CUBE_MAP,y);for(let V=0;V<6;V++)if(y.mipmaps&&y.mipmaps.length>0)for(let k=0;k<y.mipmaps.length;k++)ee(I.__webglFramebuffer[V][k],b,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+V,k);else ee(I.__webglFramebuffer[V],b,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+V,0);g(y)&&f(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(E){for(let V=0,k=N.length;V<k;V++){const le=N[V],X=n.get(le);t.bindTexture(i.TEXTURE_2D,X.__webglTexture),J(i.TEXTURE_2D,le),ee(I.__webglFramebuffer,b,le,i.COLOR_ATTACHMENT0+V,i.TEXTURE_2D,0),g(le)&&f(i.TEXTURE_2D)}t.unbindTexture()}else{let V=i.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(V=b.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(V,Y.__webglTexture),J(V,y),y.mipmaps&&y.mipmaps.length>0)for(let k=0;k<y.mipmaps.length;k++)ee(I.__webglFramebuffer[k],b,y,i.COLOR_ATTACHMENT0,V,k);else ee(I.__webglFramebuffer,b,y,i.COLOR_ATTACHMENT0,V,0);g(y)&&f(V),t.unbindTexture()}b.depthBuffer&&ue(b)},this.updateRenderTargetMipmap=function(b){const y=b.textures;for(let I=0,Y=y.length;I<Y;I++){const N=y[I];if(g(N)){const H=b.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,E=n.get(N).__webglTexture;t.bindTexture(H,E),f(H),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(b){if(b.samples>0){if(K(b)===!1){const y=b.textures,I=b.width,Y=b.height;let N=i.COLOR_BUFFER_BIT;const H=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,E=n.get(b),V=y.length>1;if(V)for(let k=0;k<y.length;k++)t.bindFramebuffer(i.FRAMEBUFFER,E.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+k,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+k,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,E.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,E.__webglFramebuffer);for(let k=0;k<y.length;k++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(N|=i.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(N|=i.STENCIL_BUFFER_BIT)),V){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,E.__webglColorRenderbuffer[k]);const le=n.get(y[k]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,le,0)}i.blitFramebuffer(0,0,I,Y,0,0,I,Y,N,i.NEAREST),s===!0&&(Me.length=0,Pe.length=0,Me.push(i.COLOR_ATTACHMENT0+k),b.depthBuffer&&b.resolveDepthBuffer===!1&&(Me.push(H),Pe.push(H),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Pe)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,Me))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),V)for(let k=0;k<y.length;k++){t.bindFramebuffer(i.FRAMEBUFFER,E.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+k,i.RENDERBUFFER,E.__webglColorRenderbuffer[k]);const le=n.get(y[k]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,E.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+k,i.TEXTURE_2D,le,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,E.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.resolveDepthBuffer===!1&&s){const y=b.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}},this.setupDepthRenderbuffer=ue,this.setupFrameBufferTexture=ee,this.useMultisampledRTT=K}function Iu(i,e){return{convert:function(t,n=""){let r;const a=it.getTransfer(n);if(t===vn)return i.UNSIGNED_BYTE;if(t===ps)return i.UNSIGNED_SHORT_4_4_4_4;if(t===fs)return i.UNSIGNED_SHORT_5_5_5_1;if(t===ko)return i.UNSIGNED_INT_5_9_9_9_REV;if(t===Go)return i.BYTE;if(t===Vo)return i.SHORT;if(t===ji)return i.UNSIGNED_SHORT;if(t===ds)return i.INT;if(t===qn)return i.UNSIGNED_INT;if(t===on)return i.FLOAT;if(t===Ki)return i.HALF_FLOAT;if(t===Wo)return i.ALPHA;if(t===Xo)return i.RGB;if(t===tn)return i.RGBA;if(t===jo)return i.LUMINANCE;if(t===qo)return i.LUMINANCE_ALPHA;if(t===qi)return i.DEPTH_COMPONENT;if(t===Ei)return i.DEPTH_STENCIL;if(t===ms)return i.RED;if(t===gs)return i.RED_INTEGER;if(t===Yo)return i.RG;if(t===_s)return i.RG_INTEGER;if(t===vs)return i.RGBA_INTEGER;if(t===Er||t===br||t===Tr||t===wr)if(a===ot){if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r===null)return null;if(t===Er)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===br)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===Tr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===wr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(r=e.get("WEBGL_compressed_texture_s3tc"),r===null)return null;if(t===Er)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===br)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===Tr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===wr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===Na||t===Oa||t===Fa||t===Ba){if(r=e.get("WEBGL_compressed_texture_pvrtc"),r===null)return null;if(t===Na)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===Oa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===Fa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===Ba)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===za||t===Ha||t===Ga){if(r=e.get("WEBGL_compressed_texture_etc"),r===null)return null;if(t===za||t===Ha)return a===ot?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(t===Ga)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}if(t===Va||t===ka||t===Wa||t===Xa||t===ja||t===qa||t===Ya||t===Ka||t===Za||t===Ja||t===$a||t===Qa||t===es||t===ts){if(r=e.get("WEBGL_compressed_texture_astc"),r===null)return null;if(t===Va)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===ka)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===Wa)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===Xa)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===ja)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===qa)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===Ya)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===Ka)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===Za)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===Ja)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===$a)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===Qa)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===es)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===ts)return a===ot?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===Ar||t===ns||t===is){if(r=e.get("EXT_texture_compression_bptc"),r===null)return null;if(t===Ar)return a===ot?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===ns)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===is)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===Ko||t===rs||t===as||t===ss){if(r=e.get("EXT_texture_compression_rgtc"),r===null)return null;if(t===Ar)return r.COMPRESSED_RED_RGTC1_EXT;if(t===rs)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===as)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===ss)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===yi?i.UNSIGNED_INT_24_8:i[t]!==void 0?i[t]:null}}}class Nu extends kt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class jt extends yt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Ou={type:"move"};class Ea{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new jt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new jt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new T,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new T),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new jt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new T,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new T),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,a=null,o=null;const u=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const v of e.hand.values()){const g=t.getJointPose(v,n),f=this._getHandJoint(c,v);g!==null&&(f.matrix.fromArray(g.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=g.radius),f.visible=g!==null}const l=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=l.position.distanceTo(h.position),p=.02,m=.005;c.inputState.pinching&&d>p+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,n),a!==null&&(s.matrix.fromArray(a.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,a.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(a.linearVelocity)):s.hasLinearVelocity=!1,a.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(a.angularVelocity)):s.hasAngularVelocity=!1));u!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&a!==null&&(r=a),r!==null&&(u.matrix.fromArray(r.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,r.linearVelocity?(u.hasLinearVelocity=!0,u.linearVelocity.copy(r.linearVelocity)):u.hasLinearVelocity=!1,r.angularVelocity?(u.hasAngularVelocity=!0,u.angularVelocity.copy(r.angularVelocity)):u.hasAngularVelocity=!1,this.dispatchEvent(Ou)))}return u!==null&&(u.visible=r!==null),s!==null&&(s.visible=a!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new jt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Fu{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const r=new Rt;e.properties.get(r).__webglTexture=t.texture,t.depthNear==n.depthNear&&t.depthFar==n.depthFar||(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Un({vertexShader:`
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

}`,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new mt(new Ri(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Bu extends wi{constructor(e,t){super();const n=this;let r=null,a=1,o=null,u="local-floor",s=1,c=null,l=null,h=null,d=null,p=null,m=null;const v=new Fu,g=t.getContextAttributes();let f=null,x=null;const M=[],S=[],w=new Ge;let P=null;const L=new kt;L.layers.enable(1),L.viewport=new rt;const q=new kt;q.layers.enable(2),q.viewport=new rt;const U=[L,q],z=new Nu;z.layers.enable(1),z.layers.enable(2);let Z=null,G=null;function J(ie){const K=S.indexOf(ie.inputSource);if(K===-1)return;const fe=M[K];fe!==void 0&&(fe.update(ie.inputSource,ie.frame,c||o),fe.dispatchEvent({type:ie.type,data:ie.inputSource}))}function W(){r.removeEventListener("select",J),r.removeEventListener("selectstart",J),r.removeEventListener("selectend",J),r.removeEventListener("squeeze",J),r.removeEventListener("squeezestart",J),r.removeEventListener("squeezeend",J),r.removeEventListener("end",W),r.removeEventListener("inputsourceschange",$);for(let ie=0;ie<M.length;ie++){const K=S[ie];K!==null&&(S[ie]=null,M[ie].disconnect(K))}Z=null,G=null,v.reset(),e.setRenderTarget(f),p=null,d=null,h=null,r=null,x=null,Pe.stop(),n.isPresenting=!1,e.setPixelRatio(P),e.setSize(w.width,w.height,!1),n.dispatchEvent({type:"sessionend"})}function $(ie){for(let K=0;K<ie.removed.length;K++){const fe=ie.removed[K],Se=S.indexOf(fe);Se>=0&&(S[Se]=null,M[Se].disconnect(fe))}for(let K=0;K<ie.added.length;K++){const fe=ie.added[K];let Se=S.indexOf(fe);if(Se===-1){for(let y=0;y<M.length;y++){if(y>=S.length){S.push(fe),Se=y;break}if(S[y]===null){S[y]=fe,Se=y;break}}if(Se===-1)break}const b=M[Se];b&&b.connect(fe)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ie){let K=M[ie];return K===void 0&&(K=new Ea,M[ie]=K),K.getTargetRaySpace()},this.getControllerGrip=function(ie){let K=M[ie];return K===void 0&&(K=new Ea,M[ie]=K),K.getGripSpace()},this.getHand=function(ie){let K=M[ie];return K===void 0&&(K=new Ea,M[ie]=K),K.getHandSpace()},this.setFramebufferScaleFactor=function(ie){a=ie,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ie){u=ie,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(ie){c=ie},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return h},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(ie){if(r=ie,r!==null){if(f=e.getRenderTarget(),r.addEventListener("select",J),r.addEventListener("selectstart",J),r.addEventListener("selectend",J),r.addEventListener("squeeze",J),r.addEventListener("squeezestart",J),r.addEventListener("squeezeend",J),r.addEventListener("end",W),r.addEventListener("inputsourceschange",$),g.xrCompatible!==!0&&await t.makeXRCompatible(),P=e.getPixelRatio(),e.getSize(w),r.renderState.layers===void 0){const K={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:a};p=new XRWebGLLayer(r,t,K),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),x=new Yn(p.framebufferWidth,p.framebufferHeight,{format:tn,type:vn,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let K=null,fe=null,Se=null;g.depth&&(Se=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,K=g.stencil?Ei:qi,fe=g.stencil?yi:qn);const b={colorFormat:t.RGBA8,depthFormat:Se,scaleFactor:a};h=new XRWebGLBinding(r,t),d=h.createProjectionLayer(b),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),x=new Yn(d.textureWidth,d.textureHeight,{format:tn,type:vn,depthTexture:new sl(d.textureWidth,d.textureHeight,fe,void 0,void 0,void 0,void 0,void 0,void 0,K),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}x.isXRRenderTarget=!0,this.setFoveation(s),c=null,o=await r.requestReferenceSpace(u),Pe.setContext(r),Pe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};const ee=new T,ce=new T;function ue(ie,K){K===null?ie.matrixWorld.copy(ie.matrix):ie.matrixWorld.multiplyMatrices(K.matrixWorld,ie.matrix),ie.matrixWorldInverse.copy(ie.matrixWorld).invert()}this.updateCamera=function(ie){if(r===null)return;let K=ie.near,fe=ie.far;v.texture!==null&&(v.depthNear>0&&(K=v.depthNear),v.depthFar>0&&(fe=v.depthFar)),z.near=q.near=L.near=K,z.far=q.far=L.far=fe,Z===z.near&&G===z.far||(r.updateRenderState({depthNear:z.near,depthFar:z.far}),Z=z.near,G=z.far);const Se=ie.parent,b=z.cameras;ue(z,Se);for(let y=0;y<b.length;y++)ue(b[y],Se);b.length===2?function(y,I,Y){ee.setFromMatrixPosition(I.matrixWorld),ce.setFromMatrixPosition(Y.matrixWorld);const N=ee.distanceTo(ce),H=I.projectionMatrix.elements,E=Y.projectionMatrix.elements,V=H[14]/(H[10]-1),k=H[14]/(H[10]+1),le=(H[9]+1)/H[5],X=(H[9]-1)/H[5],se=(H[8]-1)/H[0],he=(E[8]+1)/E[0],re=V*se,ve=V*he,ge=N/(-se+he),Ee=ge*-se;if(I.matrixWorld.decompose(y.position,y.quaternion,y.scale),y.translateX(Ee),y.translateZ(ge),y.matrixWorld.compose(y.position,y.quaternion,y.scale),y.matrixWorldInverse.copy(y.matrixWorld).invert(),H[10]===-1)y.projectionMatrix.copy(I.projectionMatrix),y.projectionMatrixInverse.copy(I.projectionMatrixInverse);else{const Le=V+ge,He=k+ge,Ke=re-Ee,Te=ve+(N-Ee),Ue=le*k/He*Le,nt=X*k/He*Le;y.projectionMatrix.makePerspective(Ke,Te,Ue,nt,Le,He),y.projectionMatrixInverse.copy(y.projectionMatrix).invert()}}(z,L,q):z.projectionMatrix.copy(L.projectionMatrix),function(y,I,Y){Y===null?y.matrix.copy(I.matrixWorld):(y.matrix.copy(Y.matrixWorld),y.matrix.invert(),y.matrix.multiply(I.matrixWorld)),y.matrix.decompose(y.position,y.quaternion,y.scale),y.updateMatrixWorld(!0),y.projectionMatrix.copy(I.projectionMatrix),y.projectionMatrixInverse.copy(I.projectionMatrixInverse),y.isPerspectiveCamera&&(y.fov=2*os*Math.atan(1/y.projectionMatrix.elements[5]),y.zoom=1)}(ie,z,Se)},this.getCamera=function(){return z},this.getFoveation=function(){if(d!==null||p!==null)return s},this.setFoveation=function(ie){s=ie,d!==null&&(d.fixedFoveation=ie),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=ie)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(z)};let Me=null;const Pe=new al;Pe.setAnimationLoop(function(ie,K){if(l=K.getViewerPose(c||o),m=K,l!==null){const fe=l.views;p!==null&&(e.setRenderTargetFramebuffer(x,p.framebuffer),e.setRenderTarget(x));let Se=!1;fe.length!==z.cameras.length&&(z.cameras.length=0,Se=!0);for(let y=0;y<fe.length;y++){const I=fe[y];let Y=null;if(p!==null)Y=p.getViewport(I);else{const H=h.getViewSubImage(d,I);Y=H.viewport,y===0&&(e.setRenderTargetTextures(x,H.colorTexture,d.ignoreDepthValues?void 0:H.depthStencilTexture),e.setRenderTarget(x))}let N=U[y];N===void 0&&(N=new kt,N.layers.enable(y),N.viewport=new rt,U[y]=N),N.matrix.fromArray(I.transform.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale),N.projectionMatrix.fromArray(I.projectionMatrix),N.projectionMatrixInverse.copy(N.projectionMatrix).invert(),N.viewport.set(Y.x,Y.y,Y.width,Y.height),y===0&&(z.matrix.copy(N.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),Se===!0&&z.cameras.push(N)}const b=r.enabledFeatures;if(b&&b.includes("depth-sensing")){const y=h.getDepthInformation(fe[0]);y&&y.isValid&&y.texture&&v.init(e,y,r.renderState)}}for(let fe=0;fe<M.length;fe++){const Se=S[fe],b=M[fe];Se!==null&&b!==void 0&&b.update(Se,K,c||o)}Me&&Me(ie,K),K.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:K}),m=null}),this.setAnimationLoop=function(ie){Me=ie},this.dispose=function(){}}}const kn=new Nt,zu=new Ce;function Hu(i,e){function t(r,a){r.matrixAutoUpdate===!0&&r.updateMatrix(),a.value.copy(r.matrix)}function n(r,a){r.opacity.value=a.opacity,a.color&&r.diffuse.value.copy(a.color),a.emissive&&r.emissive.value.copy(a.emissive).multiplyScalar(a.emissiveIntensity),a.map&&(r.map.value=a.map,t(a.map,r.mapTransform)),a.alphaMap&&(r.alphaMap.value=a.alphaMap,t(a.alphaMap,r.alphaMapTransform)),a.bumpMap&&(r.bumpMap.value=a.bumpMap,t(a.bumpMap,r.bumpMapTransform),r.bumpScale.value=a.bumpScale,a.side===It&&(r.bumpScale.value*=-1)),a.normalMap&&(r.normalMap.value=a.normalMap,t(a.normalMap,r.normalMapTransform),r.normalScale.value.copy(a.normalScale),a.side===It&&r.normalScale.value.negate()),a.displacementMap&&(r.displacementMap.value=a.displacementMap,t(a.displacementMap,r.displacementMapTransform),r.displacementScale.value=a.displacementScale,r.displacementBias.value=a.displacementBias),a.emissiveMap&&(r.emissiveMap.value=a.emissiveMap,t(a.emissiveMap,r.emissiveMapTransform)),a.specularMap&&(r.specularMap.value=a.specularMap,t(a.specularMap,r.specularMapTransform)),a.alphaTest>0&&(r.alphaTest.value=a.alphaTest);const o=e.get(a),u=o.envMap,s=o.envMapRotation;u&&(r.envMap.value=u,kn.copy(s),kn.x*=-1,kn.y*=-1,kn.z*=-1,u.isCubeTexture&&u.isRenderTargetTexture===!1&&(kn.y*=-1,kn.z*=-1),r.envMapRotation.value.setFromMatrix4(zu.makeRotationFromEuler(kn)),r.flipEnvMap.value=u.isCubeTexture&&u.isRenderTargetTexture===!1?-1:1,r.reflectivity.value=a.reflectivity,r.ior.value=a.ior,r.refractionRatio.value=a.refractionRatio),a.lightMap&&(r.lightMap.value=a.lightMap,r.lightMapIntensity.value=a.lightMapIntensity,t(a.lightMap,r.lightMapTransform)),a.aoMap&&(r.aoMap.value=a.aoMap,r.aoMapIntensity.value=a.aoMapIntensity,t(a.aoMap,r.aoMapTransform))}return{refreshFogUniforms:function(r,a){a.color.getRGB(r.fogColor.value,il(i)),a.isFog?(r.fogNear.value=a.near,r.fogFar.value=a.far):a.isFogExp2&&(r.fogDensity.value=a.density)},refreshMaterialUniforms:function(r,a,o,u,s){a.isMeshBasicMaterial||a.isMeshLambertMaterial?n(r,a):a.isMeshToonMaterial?(n(r,a),function(c,l){l.gradientMap&&(c.gradientMap.value=l.gradientMap)}(r,a)):a.isMeshPhongMaterial?(n(r,a),function(c,l){c.specular.value.copy(l.specular),c.shininess.value=Math.max(l.shininess,1e-4)}(r,a)):a.isMeshStandardMaterial?(n(r,a),function(c,l){c.metalness.value=l.metalness,l.metalnessMap&&(c.metalnessMap.value=l.metalnessMap,t(l.metalnessMap,c.metalnessMapTransform)),c.roughness.value=l.roughness,l.roughnessMap&&(c.roughnessMap.value=l.roughnessMap,t(l.roughnessMap,c.roughnessMapTransform)),l.envMap&&(c.envMapIntensity.value=l.envMapIntensity)}(r,a),a.isMeshPhysicalMaterial&&function(c,l,h){c.ior.value=l.ior,l.sheen>0&&(c.sheenColor.value.copy(l.sheenColor).multiplyScalar(l.sheen),c.sheenRoughness.value=l.sheenRoughness,l.sheenColorMap&&(c.sheenColorMap.value=l.sheenColorMap,t(l.sheenColorMap,c.sheenColorMapTransform)),l.sheenRoughnessMap&&(c.sheenRoughnessMap.value=l.sheenRoughnessMap,t(l.sheenRoughnessMap,c.sheenRoughnessMapTransform))),l.clearcoat>0&&(c.clearcoat.value=l.clearcoat,c.clearcoatRoughness.value=l.clearcoatRoughness,l.clearcoatMap&&(c.clearcoatMap.value=l.clearcoatMap,t(l.clearcoatMap,c.clearcoatMapTransform)),l.clearcoatRoughnessMap&&(c.clearcoatRoughnessMap.value=l.clearcoatRoughnessMap,t(l.clearcoatRoughnessMap,c.clearcoatRoughnessMapTransform)),l.clearcoatNormalMap&&(c.clearcoatNormalMap.value=l.clearcoatNormalMap,t(l.clearcoatNormalMap,c.clearcoatNormalMapTransform),c.clearcoatNormalScale.value.copy(l.clearcoatNormalScale),l.side===It&&c.clearcoatNormalScale.value.negate())),l.dispersion>0&&(c.dispersion.value=l.dispersion),l.iridescence>0&&(c.iridescence.value=l.iridescence,c.iridescenceIOR.value=l.iridescenceIOR,c.iridescenceThicknessMinimum.value=l.iridescenceThicknessRange[0],c.iridescenceThicknessMaximum.value=l.iridescenceThicknessRange[1],l.iridescenceMap&&(c.iridescenceMap.value=l.iridescenceMap,t(l.iridescenceMap,c.iridescenceMapTransform)),l.iridescenceThicknessMap&&(c.iridescenceThicknessMap.value=l.iridescenceThicknessMap,t(l.iridescenceThicknessMap,c.iridescenceThicknessMapTransform))),l.transmission>0&&(c.transmission.value=l.transmission,c.transmissionSamplerMap.value=h.texture,c.transmissionSamplerSize.value.set(h.width,h.height),l.transmissionMap&&(c.transmissionMap.value=l.transmissionMap,t(l.transmissionMap,c.transmissionMapTransform)),c.thickness.value=l.thickness,l.thicknessMap&&(c.thicknessMap.value=l.thicknessMap,t(l.thicknessMap,c.thicknessMapTransform)),c.attenuationDistance.value=l.attenuationDistance,c.attenuationColor.value.copy(l.attenuationColor)),l.anisotropy>0&&(c.anisotropyVector.value.set(l.anisotropy*Math.cos(l.anisotropyRotation),l.anisotropy*Math.sin(l.anisotropyRotation)),l.anisotropyMap&&(c.anisotropyMap.value=l.anisotropyMap,t(l.anisotropyMap,c.anisotropyMapTransform))),c.specularIntensity.value=l.specularIntensity,c.specularColor.value.copy(l.specularColor),l.specularColorMap&&(c.specularColorMap.value=l.specularColorMap,t(l.specularColorMap,c.specularColorMapTransform)),l.specularIntensityMap&&(c.specularIntensityMap.value=l.specularIntensityMap,t(l.specularIntensityMap,c.specularIntensityMapTransform))}(r,a,s)):a.isMeshMatcapMaterial?(n(r,a),function(c,l){l.matcap&&(c.matcap.value=l.matcap)}(r,a)):a.isMeshDepthMaterial?n(r,a):a.isMeshDistanceMaterial?(n(r,a),function(c,l){const h=e.get(l).light;c.referencePosition.value.setFromMatrixPosition(h.matrixWorld),c.nearDistance.value=h.shadow.camera.near,c.farDistance.value=h.shadow.camera.far}(r,a)):a.isMeshNormalMaterial?n(r,a):a.isLineBasicMaterial?(function(c,l){c.diffuse.value.copy(l.color),c.opacity.value=l.opacity,l.map&&(c.map.value=l.map,t(l.map,c.mapTransform))}(r,a),a.isLineDashedMaterial&&function(c,l){c.dashSize.value=l.dashSize,c.totalSize.value=l.dashSize+l.gapSize,c.scale.value=l.scale}(r,a)):a.isPointsMaterial?function(c,l,h,d){c.diffuse.value.copy(l.color),c.opacity.value=l.opacity,c.size.value=l.size*h,c.scale.value=.5*d,l.map&&(c.map.value=l.map,t(l.map,c.uvTransform)),l.alphaMap&&(c.alphaMap.value=l.alphaMap,t(l.alphaMap,c.alphaMapTransform)),l.alphaTest>0&&(c.alphaTest.value=l.alphaTest)}(r,a,o,u):a.isSpriteMaterial?function(c,l){c.diffuse.value.copy(l.color),c.opacity.value=l.opacity,c.rotation.value=l.rotation,l.map&&(c.map.value=l.map,t(l.map,c.mapTransform)),l.alphaMap&&(c.alphaMap.value=l.alphaMap,t(l.alphaMap,c.alphaMapTransform)),l.alphaTest>0&&(c.alphaTest.value=l.alphaTest)}(r,a):a.isShadowMaterial?(r.color.value.copy(a.color),r.opacity.value=a.opacity):a.isShaderMaterial&&(a.uniformsNeedUpdate=!1)}}}function Gu(i,e,t,n){let r={},a={},o=[];const u=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function s(h,d,p,m){const v=h.value,g=d+"_"+p;if(m[g]===void 0)return m[g]=typeof v=="number"||typeof v=="boolean"?v:v.clone(),!0;{const f=m[g];if(typeof v=="number"||typeof v=="boolean"){if(f!==v)return m[g]=v,!0}else if(f.equals(v)===!1)return f.copy(v),!0}return!1}function c(h){const d={boundary:0,storage:0};return typeof h=="number"||typeof h=="boolean"?(d.boundary=4,d.storage=4):h.isVector2?(d.boundary=8,d.storage=8):h.isVector3||h.isColor?(d.boundary=16,d.storage=12):h.isVector4?(d.boundary=16,d.storage=16):h.isMatrix3?(d.boundary=48,d.storage=48):h.isMatrix4?(d.boundary=64,d.storage=64):h.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",h),d}function l(h){const d=h.target;d.removeEventListener("dispose",l);const p=o.indexOf(d.__bindingPointIndex);o.splice(p,1),i.deleteBuffer(r[d.id]),delete r[d.id],delete a[d.id]}return{bind:function(h,d){const p=d.program;n.uniformBlockBinding(h,p)},update:function(h,d){let p=r[h.id];p===void 0&&(function(g){const f=g.uniforms;let x=0;const M=16;for(let w=0,P=f.length;w<P;w++){const L=Array.isArray(f[w])?f[w]:[f[w]];for(let q=0,U=L.length;q<U;q++){const z=L[q],Z=Array.isArray(z.value)?z.value:[z.value];for(let G=0,J=Z.length;G<J;G++){const W=c(Z[G]),$=x%M,ee=$%W.boundary,ce=$+ee;x+=ee,ce!==0&&M-ce<W.storage&&(x+=M-ce),z.__data=new Float32Array(W.storage/Float32Array.BYTES_PER_ELEMENT),z.__offset=x,x+=W.storage}}}const S=x%M;S>0&&(x+=M-S),g.__size=x,g.__cache={}}(h),p=function(g){const f=function(){for(let w=0;w<u;w++)if(o.indexOf(w)===-1)return o.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}();g.__bindingPointIndex=f;const x=i.createBuffer(),M=g.__size,S=g.usage;return i.bindBuffer(i.UNIFORM_BUFFER,x),i.bufferData(i.UNIFORM_BUFFER,M,S),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,f,x),x}(h),r[h.id]=p,h.addEventListener("dispose",l));const m=d.program;n.updateUBOMapping(h,m);const v=e.render.frame;a[h.id]!==v&&(function(g){const f=r[g.id],x=g.uniforms,M=g.__cache;i.bindBuffer(i.UNIFORM_BUFFER,f);for(let S=0,w=x.length;S<w;S++){const P=Array.isArray(x[S])?x[S]:[x[S]];for(let L=0,q=P.length;L<q;L++){const U=P[L];if(s(U,S,L,M)===!0){const z=U.__offset,Z=Array.isArray(U.value)?U.value:[U.value];let G=0;for(let J=0;J<Z.length;J++){const W=Z[J],$=c(W);typeof W=="number"||typeof W=="boolean"?(U.__data[0]=W,i.bufferSubData(i.UNIFORM_BUFFER,z+G,U.__data)):W.isMatrix3?(U.__data[0]=W.elements[0],U.__data[1]=W.elements[1],U.__data[2]=W.elements[2],U.__data[3]=0,U.__data[4]=W.elements[3],U.__data[5]=W.elements[4],U.__data[6]=W.elements[5],U.__data[7]=0,U.__data[8]=W.elements[6],U.__data[9]=W.elements[7],U.__data[10]=W.elements[8],U.__data[11]=0):(W.toArray(U.__data,G),G+=$.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,z,U.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}(h),a[h.id]=v)},dispose:function(){for(const h in r)i.deleteBuffer(r[h]);o=[],r={},a={}}}}class Vu{constructor(e={}){const{canvas:t=Il(),context:n=null,depth:r=!0,stencil:a=!1,alpha:o=!1,antialias:u=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l="default",failIfMajorPerformanceCaveat:h=!1}=e;let d;if(this.isWebGLRenderer=!0,n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const p=new Uint32Array(4),m=new Int32Array(4);let v=null,g=null;const f=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Vt,this.toneMapping=Ln,this.toneMappingExposure=1;const M=this;let S=!1,w=0,P=0,L=null,q=-1,U=null;const z=new rt,Z=new rt;let G=null;const J=new ze(0);let W=0,$=t.width,ee=t.height,ce=1,ue=null,Me=null;const Pe=new rt(0,0,$,ee),ie=new rt(0,0,$,ee);let K=!1;const fe=new Gr;let Se=!1,b=!1;const y=new Ce,I=new Ce,Y=new T,N=new rt,H={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let E=!1;function V(){return L===null?ce:1}let k,le,X,se,he,re,ve,ge,Ee,Le,He,Ke,Te,Ue,nt,at,xe,qe,Ye,ln,cn,ct,Tt,Lt,D=n;function un(_,R){return t.getContext(_,R)}try{const _={alpha:!0,depth:r,stencil:a,antialias:u,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ca}`),t.addEventListener("webglcontextlost",C,!1),t.addEventListener("webglcontextrestored",A,!1),t.addEventListener("webglcontextcreationerror",Q,!1),D===null){const R="webgl2";if(D=un(R,_),D===null)throw un(R)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(_){throw console.error("THREE.WebGLRenderer: "+_.message),_}function Nn(){k=new hc(D),k.init(),ct=new Iu(D,k),le=new oc(D,k,e,ct),X=new Du(D),le.reverseDepthBuffer&&X.buffers.depth.setReversed(!0),se=new fc(D),he=new Mu,re=new Uu(D,k,X,he,le,ct,se),ve=new cc(M),ge=new uc(M),Ee=new nc(D),Tt=new ac(D,Ee),Le=new dc(D,Ee,se,Tt),He=new gc(D,Le,Ee,se),Ye=new mc(D,le,re),at=new lc(he),Ke=new xu(M,ve,ge,k,le,Tt,at),Te=new Hu(M,he),Ue=new yu,nt=new Au(k),qe=new rc(M,ve,ge,X,He,d,s),xe=new Pu(M,He,le),Lt=new Gu(D,se,le,X),ln=new sc(D,k,se),cn=new pc(D,k,se),se.programs=Ke.programs,M.capabilities=le,M.extensions=k,M.properties=he,M.renderLists=Ue,M.shadowMap=xe,M.state=X,M.info=se}Nn();const dt=new Bu(M,D);function C(_){_.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function A(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const _=se.autoReset,R=xe.enabled,O=xe.autoUpdate,j=xe.needsUpdate,F=xe.type;Nn(),se.autoReset=_,xe.enabled=R,xe.autoUpdate=O,xe.needsUpdate=j,xe.type=F}function Q(_){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",_.statusMessage)}function oe(_){const R=_.target;R.removeEventListener("dispose",oe),function(O){(function(j){const F=he.get(j).programs;F!==void 0&&(F.forEach(function(ae){Ke.releaseProgram(ae)}),j.isShaderMaterial&&Ke.releaseShaderCache(j))})(O),he.remove(O)}(R)}function te(_,R,O){_.transparent===!0&&_.side===2&&_.forceSinglePass===!1?(_.side=It,_.needsUpdate=!0,Oe(_,R,O),_.side=Dn,_.needsUpdate=!0,Oe(_,R,O),_.side=2):Oe(_,R,O)}this.xr=dt,this.getContext=function(){return D},this.getContextAttributes=function(){return D.getContextAttributes()},this.forceContextLoss=function(){const _=k.get("WEBGL_lose_context");_&&_.loseContext()},this.forceContextRestore=function(){const _=k.get("WEBGL_lose_context");_&&_.restoreContext()},this.getPixelRatio=function(){return ce},this.setPixelRatio=function(_){_!==void 0&&(ce=_,this.setSize($,ee,!1))},this.getSize=function(_){return _.set($,ee)},this.setSize=function(_,R,O=!0){dt.isPresenting?console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting."):($=_,ee=R,t.width=Math.floor(_*ce),t.height=Math.floor(R*ce),O===!0&&(t.style.width=_+"px",t.style.height=R+"px"),this.setViewport(0,0,_,R))},this.getDrawingBufferSize=function(_){return _.set($*ce,ee*ce).floor()},this.setDrawingBufferSize=function(_,R,O){$=_,ee=R,ce=O,t.width=Math.floor(_*O),t.height=Math.floor(R*O),this.setViewport(0,0,_,R)},this.getCurrentViewport=function(_){return _.copy(z)},this.getViewport=function(_){return _.copy(Pe)},this.setViewport=function(_,R,O,j){_.isVector4?Pe.set(_.x,_.y,_.z,_.w):Pe.set(_,R,O,j),X.viewport(z.copy(Pe).multiplyScalar(ce).round())},this.getScissor=function(_){return _.copy(ie)},this.setScissor=function(_,R,O,j){_.isVector4?ie.set(_.x,_.y,_.z,_.w):ie.set(_,R,O,j),X.scissor(Z.copy(ie).multiplyScalar(ce).round())},this.getScissorTest=function(){return K},this.setScissorTest=function(_){X.setScissorTest(K=_)},this.setOpaqueSort=function(_){ue=_},this.setTransparentSort=function(_){Me=_},this.getClearColor=function(_){return _.copy(qe.getClearColor())},this.setClearColor=function(){qe.setClearColor.apply(qe,arguments)},this.getClearAlpha=function(){return qe.getClearAlpha()},this.setClearAlpha=function(){qe.setClearAlpha.apply(qe,arguments)},this.clear=function(_=!0,R=!0,O=!0){let j=0;if(_){let F=!1;if(L!==null){const ae=L.texture.format;F=ae===vs||ae===_s||ae===gs}if(F){const ae=L.texture.type,pe=ae===vn||ae===qn||ae===ji||ae===yi||ae===ps||ae===fs,me=qe.getClearColor(),Ae=qe.getClearAlpha(),De=me.r,Fe=me.g,Ne=me.b;pe?(p[0]=De,p[1]=Fe,p[2]=Ne,p[3]=Ae,D.clearBufferuiv(D.COLOR,0,p)):(m[0]=De,m[1]=Fe,m[2]=Ne,m[3]=Ae,D.clearBufferiv(D.COLOR,0,m))}else j|=D.COLOR_BUFFER_BIT}R&&(j|=D.DEPTH_BUFFER_BIT,D.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),O&&(j|=D.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),D.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",C,!1),t.removeEventListener("webglcontextrestored",A,!1),t.removeEventListener("webglcontextcreationerror",Q,!1),Ue.dispose(),nt.dispose(),he.dispose(),ve.dispose(),ge.dispose(),He.dispose(),Tt.dispose(),Lt.dispose(),Ke.dispose(),dt.dispose(),dt.removeEventListener("sessionstart",we),dt.removeEventListener("sessionend",Ie),Ze.stop()},this.renderBufferDirect=function(_,R,O,j,F,ae){R===null&&(R=H);const pe=F.isMesh&&F.matrixWorld.determinant()<0,me=function(tt,ht,bt,Xe,Be){ht.isScene!==!0&&(ht=H),re.resetTextureUnits();const qt=ht.fog,ml=Xe.isMeshStandardMaterial?ht.environment:null,gl=L===null?M.outputColorSpace:L.isXRRenderTarget===!0?L.texture.colorSpace:In,$i=(Xe.isMeshStandardMaterial?ge:ve).get(Xe.envMap||ml),_l=Xe.vertexColors===!0&&!!bt.attributes.color&&bt.attributes.color.itemSize===4,vl=!!bt.attributes.tangent&&(!!Xe.normalMap||Xe.anisotropy>0),xl=!!bt.morphAttributes.position,Ml=!!bt.morphAttributes.normal,Sl=!!bt.morphAttributes.color;let As=Ln;Xe.toneMapped&&(L!==null&&L.isXRRenderTarget!==!0||(As=M.toneMapping));const Rs=bt.morphAttributes.position||bt.morphAttributes.normal||bt.morphAttributes.color,yl=Rs!==void 0?Rs.length:0,Qe=he.get(Xe),El=g.state.lights;if(Se===!0&&(b===!0||tt!==U)){const Ht=tt===U&&Xe.id===q;at.setState(Xe,tt,Ht)}let Yt=!1;Xe.version===Qe.__version?Qe.needsLights&&Qe.lightsStateVersion!==El.state.version||Qe.outputColorSpace!==gl||Be.isBatchedMesh&&Qe.batching===!1?Yt=!0:Be.isBatchedMesh||Qe.batching!==!0?Be.isBatchedMesh&&Qe.batchingColor===!0&&Be.colorTexture===null||Be.isBatchedMesh&&Qe.batchingColor===!1&&Be.colorTexture!==null||Be.isInstancedMesh&&Qe.instancing===!1?Yt=!0:Be.isInstancedMesh||Qe.instancing!==!0?Be.isSkinnedMesh&&Qe.skinning===!1?Yt=!0:Be.isSkinnedMesh||Qe.skinning!==!0?Be.isInstancedMesh&&Qe.instancingColor===!0&&Be.instanceColor===null||Be.isInstancedMesh&&Qe.instancingColor===!1&&Be.instanceColor!==null||Be.isInstancedMesh&&Qe.instancingMorph===!0&&Be.morphTexture===null||Be.isInstancedMesh&&Qe.instancingMorph===!1&&Be.morphTexture!==null||Qe.envMap!==$i||Xe.fog===!0&&Qe.fog!==qt?Yt=!0:Qe.numClippingPlanes===void 0||Qe.numClippingPlanes===at.numPlanes&&Qe.numIntersection===at.numIntersection?(Qe.vertexAlphas!==_l||Qe.vertexTangents!==vl||Qe.morphTargets!==xl||Qe.morphNormals!==Ml||Qe.morphColors!==Sl||Qe.toneMapping!==As||Qe.morphTargetsCount!==yl)&&(Yt=!0):Yt=!0:Yt=!0:Yt=!0:Yt=!0:(Yt=!0,Qe.__version=Xe.version);let On=Qe.currentProgram;Yt===!0&&(On=Oe(Xe,ht,Be));let Cs=!1,Pi=!1,Wr=!1;const ft=On.getUniforms(),Sn=Qe.uniforms;if(X.useProgram(On.program)&&(Cs=!0,Pi=!0,Wr=!0),Xe.id!==q&&(q=Xe.id,Pi=!0),Cs||U!==tt){le.reverseDepthBuffer?(y.copy(tt.projectionMatrix),function(Fn){const lt=Fn.elements;lt[2]=.5*lt[2]+.5*lt[3],lt[6]=.5*lt[6]+.5*lt[7],lt[10]=.5*lt[10]+.5*lt[11],lt[14]=.5*lt[14]+.5*lt[15]}(y),function(Fn){const lt=Fn.elements;lt[11]===-1?(lt[10]=-lt[10]-1,lt[14]=-lt[14]):(lt[10]=-lt[10],lt[14]=1-lt[14])}(y),ft.setValue(D,"projectionMatrix",y)):ft.setValue(D,"projectionMatrix",tt.projectionMatrix),ft.setValue(D,"viewMatrix",tt.matrixWorldInverse);const Ht=ft.map.cameraPosition;Ht!==void 0&&Ht.setValue(D,Y.setFromMatrixPosition(tt.matrixWorld)),le.logarithmicDepthBuffer&&ft.setValue(D,"logDepthBufFC",2/(Math.log(tt.far+1)/Math.LN2)),(Xe.isMeshPhongMaterial||Xe.isMeshToonMaterial||Xe.isMeshLambertMaterial||Xe.isMeshBasicMaterial||Xe.isMeshStandardMaterial||Xe.isShaderMaterial)&&ft.setValue(D,"isOrthographic",tt.isOrthographicCamera===!0),U!==tt&&(U=tt,Pi=!0,Wr=!0)}if(Be.isSkinnedMesh){ft.setOptional(D,Be,"bindMatrix"),ft.setOptional(D,Be,"bindMatrixInverse");const Ht=Be.skeleton;Ht&&(Ht.boneTexture===null&&Ht.computeBoneTexture(),ft.setValue(D,"boneTexture",Ht.boneTexture,re))}Be.isBatchedMesh&&(ft.setOptional(D,Be,"batchingTexture"),ft.setValue(D,"batchingTexture",Be._matricesTexture,re),ft.setOptional(D,Be,"batchingIdTexture"),ft.setValue(D,"batchingIdTexture",Be._indirectTexture,re),ft.setOptional(D,Be,"batchingColorTexture"),Be._colorsTexture!==null&&ft.setValue(D,"batchingColorTexture",Be._colorsTexture,re));const Xr=bt.morphAttributes;Xr.position===void 0&&Xr.normal===void 0&&Xr.color===void 0||Ye.update(Be,bt,On),(Pi||Qe.receiveShadow!==Be.receiveShadow)&&(Qe.receiveShadow=Be.receiveShadow,ft.setValue(D,"receiveShadow",Be.receiveShadow)),Xe.isMeshGouraudMaterial&&Xe.envMap!==null&&(Sn.envMap.value=$i,Sn.flipEnvMap.value=$i.isCubeTexture&&$i.isRenderTargetTexture===!1?-1:1),Xe.isMeshStandardMaterial&&Xe.envMap===null&&ht.environment!==null&&(Sn.envMapIntensity.value=ht.environmentIntensity),Pi&&(ft.setValue(D,"toneMappingExposure",M.toneMappingExposure),Qe.needsLights&&(Kt=Wr,(rn=Sn).ambientLightColor.needsUpdate=Kt,rn.lightProbe.needsUpdate=Kt,rn.directionalLights.needsUpdate=Kt,rn.directionalLightShadows.needsUpdate=Kt,rn.pointLights.needsUpdate=Kt,rn.pointLightShadows.needsUpdate=Kt,rn.spotLights.needsUpdate=Kt,rn.spotLightShadows.needsUpdate=Kt,rn.rectAreaLights.needsUpdate=Kt,rn.hemisphereLights.needsUpdate=Kt),qt&&Xe.fog===!0&&Te.refreshFogUniforms(Sn,qt),Te.refreshMaterialUniforms(Sn,Xe,ce,ee,g.state.transmissionRenderTarget[tt.id]),Cr.upload(D,Ve(Qe),Sn,re));var rn,Kt;if(Xe.isShaderMaterial&&Xe.uniformsNeedUpdate===!0&&(Cr.upload(D,Ve(Qe),Sn,re),Xe.uniformsNeedUpdate=!1),Xe.isSpriteMaterial&&ft.setValue(D,"center",Be.center),ft.setValue(D,"modelViewMatrix",Be.modelViewMatrix),ft.setValue(D,"normalMatrix",Be.normalMatrix),ft.setValue(D,"modelMatrix",Be.matrixWorld),Xe.isShaderMaterial||Xe.isRawShaderMaterial){const Ht=Xe.uniformsGroups;for(let Fn=0,lt=Ht.length;Fn<lt;Fn++){const Ps=Ht[Fn];Lt.update(Ps,On),Lt.bind(Ps,On)}}return On}(_,R,O,j,F);X.setMaterial(j,pe);let Ae=O.index,De=1;if(j.wireframe===!0){if(Ae=Le.getWireframeAttribute(O),Ae===void 0)return;De=2}const Fe=O.drawRange,Ne=O.attributes.position;let et=Fe.start*De,pt=(Fe.start+Fe.count)*De;ae!==null&&(et=Math.max(et,ae.start*De),pt=Math.min(pt,(ae.start+ae.count)*De)),Ae!==null?(et=Math.max(et,0),pt=Math.min(pt,Ae.count)):Ne!=null&&(et=Math.max(et,0),pt=Math.min(pt,Ne.count));const ut=pt-et;if(ut<0||ut===1/0)return;let Mt;Tt.setup(F,j,me,O,Ae);let st=ln;if(Ae!==null&&(Mt=Ee.get(Ae),st=cn,st.setIndex(Mt)),F.isMesh)j.wireframe===!0?(X.setLineWidth(j.wireframeLinewidth*V()),st.setMode(D.LINES)):st.setMode(D.TRIANGLES);else if(F.isLine){let tt=j.linewidth;tt===void 0&&(tt=1),X.setLineWidth(tt*V()),F.isLineSegments?st.setMode(D.LINES):F.isLineLoop?st.setMode(D.LINE_LOOP):st.setMode(D.LINE_STRIP)}else F.isPoints?st.setMode(D.POINTS):F.isSprite&&st.setMode(D.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)st.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(k.get("WEBGL_multi_draw"))st.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const tt=F._multiDrawStarts,ht=F._multiDrawCounts,bt=F._multiDrawCount,Xe=Ae?Ee.get(Ae).bytesPerElement:1,Be=he.get(j).currentProgram.getUniforms();for(let qt=0;qt<bt;qt++)Be.setValue(D,"_gl_DrawID",qt),st.render(tt[qt]/Xe,ht[qt])}else if(F.isInstancedMesh)st.renderInstances(et,ut,F.count);else if(O.isInstancedBufferGeometry){const tt=O._maxInstanceCount!==void 0?O._maxInstanceCount:1/0,ht=Math.min(O.instanceCount,tt);st.renderInstances(et,ut,ht)}else st.render(et,ut)},this.compile=function(_,R,O=null){O===null&&(O=_),g=nt.get(O),g.init(R),x.push(g),O.traverseVisible(function(F){F.isLight&&F.layers.test(R.layers)&&(g.pushLight(F),F.castShadow&&g.pushShadow(F))}),_!==O&&_.traverseVisible(function(F){F.isLight&&F.layers.test(R.layers)&&(g.pushLight(F),F.castShadow&&g.pushShadow(F))}),g.setupLights();const j=new Set;return _.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const ae=F.material;if(ae)if(Array.isArray(ae))for(let pe=0;pe<ae.length;pe++){const me=ae[pe];te(me,O,F),j.add(me)}else te(ae,O,F),j.add(ae)}),x.pop(),g=null,j},this.compileAsync=function(_,R,O=null){const j=this.compile(_,R,O);return new Promise(F=>{function ae(){j.forEach(function(pe){he.get(pe).currentProgram.isReady()&&j.delete(pe)}),j.size!==0?setTimeout(ae,10):F(_)}k.get("KHR_parallel_shader_compile")!==null?ae():setTimeout(ae,10)})};let be=null;function we(){Ze.stop()}function Ie(){Ze.start()}const Ze=new al;function $e(_,R,O,j){if(_.visible===!1)return;if(_.layers.test(R.layers)){if(_.isGroup)O=_.renderOrder;else if(_.isLOD)_.autoUpdate===!0&&_.update(R);else if(_.isLight)g.pushLight(_),_.castShadow&&g.pushShadow(_);else if(_.isSprite){if(!_.frustumCulled||fe.intersectsSprite(_)){j&&N.setFromMatrixPosition(_.matrixWorld).applyMatrix4(I);const ae=He.update(_),pe=_.material;pe.visible&&v.push(_,ae,pe,O,N.z,null)}}else if((_.isMesh||_.isLine||_.isPoints)&&(!_.frustumCulled||fe.intersectsObject(_))){const ae=He.update(_),pe=_.material;if(j&&(_.boundingSphere!==void 0?(_.boundingSphere===null&&_.computeBoundingSphere(),N.copy(_.boundingSphere.center)):(ae.boundingSphere===null&&ae.computeBoundingSphere(),N.copy(ae.boundingSphere.center)),N.applyMatrix4(_.matrixWorld).applyMatrix4(I)),Array.isArray(pe)){const me=ae.groups;for(let Ae=0,De=me.length;Ae<De;Ae++){const Fe=me[Ae],Ne=pe[Fe.materialIndex];Ne&&Ne.visible&&v.push(_,ae,Ne,O,N.z,Fe)}}else pe.visible&&v.push(_,ae,pe,O,N.z,null)}}const F=_.children;for(let ae=0,pe=F.length;ae<pe;ae++)$e(F[ae],R,O,j)}function Je(_,R,O,j){const F=_.opaque,ae=_.transmissive,pe=_.transparent;g.setupLightsView(O),Se===!0&&at.setGlobalState(M.clippingPlanes,O),j&&X.viewport(z.copy(j)),F.length>0&&ye(F,R,O),ae.length>0&&ye(ae,R,O),pe.length>0&&ye(pe,R,O),X.buffers.depth.setTest(!0),X.buffers.depth.setMask(!0),X.buffers.color.setMask(!0),X.setPolygonOffset(!1)}function Et(_,R,O,j){if((O.isScene===!0?O.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[j.id]===void 0&&(g.state.transmissionRenderTarget[j.id]=new Yn(1,1,{generateMipmaps:!0,type:k.has("EXT_color_buffer_half_float")||k.has("EXT_color_buffer_float")?Ki:vn,minFilter:gi,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:it.workingColorSpace}));const F=g.state.transmissionRenderTarget[j.id],ae=j.viewport||z;F.setSize(ae.z,ae.w);const pe=M.getRenderTarget();M.setRenderTarget(F),M.getClearColor(J),W=M.getClearAlpha(),W<1&&M.setClearColor(16777215,.5),M.clear(),E&&qe.render(O);const me=M.toneMapping;M.toneMapping=Ln;const Ae=j.viewport;if(j.viewport!==void 0&&(j.viewport=void 0),g.setupLightsView(j),Se===!0&&at.setGlobalState(M.clippingPlanes,j),ye(_,O,j),re.updateMultisampleRenderTarget(F),re.updateRenderTargetMipmap(F),k.has("WEBGL_multisampled_render_to_texture")===!1){let De=!1;for(let Fe=0,Ne=R.length;Fe<Ne;Fe++){const et=R[Fe],pt=et.object,ut=et.geometry,Mt=et.material,st=et.group;if(Mt.side===2&&pt.layers.test(j.layers)){const tt=Mt.side;Mt.side=It,Mt.needsUpdate=!0,_e(pt,O,j,ut,Mt,st),Mt.side=tt,Mt.needsUpdate=!0,De=!0}}De===!0&&(re.updateMultisampleRenderTarget(F),re.updateRenderTargetMipmap(F))}M.setRenderTarget(pe),M.setClearColor(J,W),Ae!==void 0&&(j.viewport=Ae),M.toneMapping=me}function ye(_,R,O){const j=R.isScene===!0?R.overrideMaterial:null;for(let F=0,ae=_.length;F<ae;F++){const pe=_[F],me=pe.object,Ae=pe.geometry,De=j===null?pe.material:j,Fe=pe.group;me.layers.test(O.layers)&&_e(me,R,O,Ae,De,Fe)}}function _e(_,R,O,j,F,ae){_.onBeforeRender(M,R,O,j,F,ae),_.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse,_.matrixWorld),_.normalMatrix.getNormalMatrix(_.modelViewMatrix),F.onBeforeRender(M,R,O,j,_,ae),F.transparent===!0&&F.side===2&&F.forceSinglePass===!1?(F.side=It,F.needsUpdate=!0,M.renderBufferDirect(O,R,j,F,_,ae),F.side=Dn,F.needsUpdate=!0,M.renderBufferDirect(O,R,j,F,_,ae),F.side=2):M.renderBufferDirect(O,R,j,F,_,ae),_.onAfterRender(M,R,O,j,F,ae)}function Oe(_,R,O){R.isScene!==!0&&(R=H);const j=he.get(_),F=g.state.lights,ae=g.state.shadowsArray,pe=F.state.version,me=Ke.getParameters(_,F.state,ae,R,O),Ae=Ke.getProgramCacheKey(me);let De=j.programs;j.environment=_.isMeshStandardMaterial?R.environment:null,j.fog=R.fog,j.envMap=(_.isMeshStandardMaterial?ge:ve).get(_.envMap||j.environment),j.envMapRotation=j.environment!==null&&_.envMap===null?R.environmentRotation:_.envMapRotation,De===void 0&&(_.addEventListener("dispose",oe),De=new Map,j.programs=De);let Fe=De.get(Ae);if(Fe!==void 0){if(j.currentProgram===Fe&&j.lightsStateVersion===pe)return Re(_,me),Fe}else me.uniforms=Ke.getUniforms(_),_.onBeforeCompile(me,M),Fe=Ke.acquireProgram(me,Ae),De.set(Ae,Fe),j.uniforms=me.uniforms;const Ne=j.uniforms;return(_.isShaderMaterial||_.isRawShaderMaterial)&&_.clipping!==!0||(Ne.clippingPlanes=at.uniform),Re(_,me),j.needsLights=function(et){return et.isMeshLambertMaterial||et.isMeshToonMaterial||et.isMeshPhongMaterial||et.isMeshStandardMaterial||et.isShadowMaterial||et.isShaderMaterial&&et.lights===!0}(_),j.lightsStateVersion=pe,j.needsLights&&(Ne.ambientLightColor.value=F.state.ambient,Ne.lightProbe.value=F.state.probe,Ne.directionalLights.value=F.state.directional,Ne.directionalLightShadows.value=F.state.directionalShadow,Ne.spotLights.value=F.state.spot,Ne.spotLightShadows.value=F.state.spotShadow,Ne.rectAreaLights.value=F.state.rectArea,Ne.ltc_1.value=F.state.rectAreaLTC1,Ne.ltc_2.value=F.state.rectAreaLTC2,Ne.pointLights.value=F.state.point,Ne.pointLightShadows.value=F.state.pointShadow,Ne.hemisphereLights.value=F.state.hemi,Ne.directionalShadowMap.value=F.state.directionalShadowMap,Ne.directionalShadowMatrix.value=F.state.directionalShadowMatrix,Ne.spotShadowMap.value=F.state.spotShadowMap,Ne.spotLightMatrix.value=F.state.spotLightMatrix,Ne.spotLightMap.value=F.state.spotLightMap,Ne.pointShadowMap.value=F.state.pointShadowMap,Ne.pointShadowMatrix.value=F.state.pointShadowMatrix),j.currentProgram=Fe,j.uniformsList=null,Fe}function Ve(_){if(_.uniformsList===null){const R=_.currentProgram.getUniforms();_.uniformsList=Cr.seqWithValue(R.seq,_.uniforms)}return _.uniformsList}function Re(_,R){const O=he.get(_);O.outputColorSpace=R.outputColorSpace,O.batching=R.batching,O.batchingColor=R.batchingColor,O.instancing=R.instancing,O.instancingColor=R.instancingColor,O.instancingMorph=R.instancingMorph,O.skinning=R.skinning,O.morphTargets=R.morphTargets,O.morphNormals=R.morphNormals,O.morphColors=R.morphColors,O.morphTargetsCount=R.morphTargetsCount,O.numClippingPlanes=R.numClippingPlanes,O.numIntersection=R.numClipIntersection,O.vertexAlphas=R.vertexAlphas,O.vertexTangents=R.vertexTangents,O.toneMapping=R.toneMapping}Ze.setAnimationLoop(function(_){be&&be(_)}),typeof self<"u"&&Ze.setContext(self),this.setAnimationLoop=function(_){be=_,dt.setAnimationLoop(_),_===null?Ze.stop():Ze.start()},dt.addEventListener("sessionstart",we),dt.addEventListener("sessionend",Ie),this.render=function(_,R){if(R!==void 0&&R.isCamera!==!0)return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(S===!0)return;if(_.matrixWorldAutoUpdate===!0&&_.updateMatrixWorld(),R.parent===null&&R.matrixWorldAutoUpdate===!0&&R.updateMatrixWorld(),dt.enabled===!0&&dt.isPresenting===!0&&(dt.cameraAutoUpdate===!0&&dt.updateCamera(R),R=dt.getCamera()),_.isScene===!0&&_.onBeforeRender(M,_,R,L),g=nt.get(_,x.length),g.init(R),x.push(g),I.multiplyMatrices(R.projectionMatrix,R.matrixWorldInverse),fe.setFromProjectionMatrix(I),b=this.localClippingEnabled,Se=at.init(this.clippingPlanes,b),v=Ue.get(_,f.length),v.init(),f.push(v),dt.enabled===!0&&dt.isPresenting===!0){const ae=M.xr.getDepthSensingMesh();ae!==null&&$e(ae,R,-1/0,M.sortObjects)}$e(_,R,0,M.sortObjects),v.finish(),M.sortObjects===!0&&v.sort(ue,Me),E=dt.enabled===!1||dt.isPresenting===!1||dt.hasDepthSensing()===!1,E&&qe.addToRenderList(v,_),this.info.render.frame++,Se===!0&&at.beginShadows();const O=g.state.shadowsArray;xe.render(O,_,R),Se===!0&&at.endShadows(),this.info.autoReset===!0&&this.info.reset();const j=v.opaque,F=v.transmissive;if(g.setupLights(),R.isArrayCamera){const ae=R.cameras;if(F.length>0)for(let pe=0,me=ae.length;pe<me;pe++)Et(j,F,_,ae[pe]);E&&qe.render(_);for(let pe=0,me=ae.length;pe<me;pe++){const Ae=ae[pe];Je(v,_,Ae,Ae.viewport)}}else F.length>0&&Et(j,F,_,R),E&&qe.render(_),Je(v,_,R);L!==null&&(re.updateMultisampleRenderTarget(L),re.updateRenderTargetMipmap(L)),_.isScene===!0&&_.onAfterRender(M,_,R),Tt.resetDefaultState(),q=-1,U=null,x.pop(),x.length>0?(g=x[x.length-1],Se===!0&&at.setGlobalState(M.clippingPlanes,g.state.camera)):g=null,f.pop(),v=f.length>0?f[f.length-1]:null},this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return P},this.getRenderTarget=function(){return L},this.setRenderTargetTextures=function(_,R,O){he.get(_.texture).__webglTexture=R,he.get(_.depthTexture).__webglTexture=O;const j=he.get(_);j.__hasExternalTextures=!0,j.__autoAllocateDepthBuffer=O===void 0,j.__autoAllocateDepthBuffer||k.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),j.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(_,R){const O=he.get(_);O.__webglFramebuffer=R,O.__useDefaultFramebuffer=R===void 0},this.setRenderTarget=function(_,R=0,O=0){L=_,w=R,P=O;let j=!0,F=null,ae=!1,pe=!1;if(_){const me=he.get(_);if(me.__useDefaultFramebuffer!==void 0)X.bindFramebuffer(D.FRAMEBUFFER,null),j=!1;else if(me.__webglFramebuffer===void 0)re.setupRenderTarget(_);else if(me.__hasExternalTextures)re.rebindTextures(_,he.get(_.texture).__webglTexture,he.get(_.depthTexture).__webglTexture);else if(_.depthBuffer){const Fe=_.depthTexture;if(me.__boundDepthTexture!==Fe){if(Fe!==null&&he.has(Fe)&&(_.width!==Fe.image.width||_.height!==Fe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");re.setupDepthRenderbuffer(_)}}const Ae=_.texture;(Ae.isData3DTexture||Ae.isDataArrayTexture||Ae.isCompressedArrayTexture)&&(pe=!0);const De=he.get(_).__webglFramebuffer;_.isWebGLCubeRenderTarget?(F=Array.isArray(De[R])?De[R][O]:De[R],ae=!0):F=_.samples>0&&re.useMultisampledRTT(_)===!1?he.get(_).__webglMultisampledFramebuffer:Array.isArray(De)?De[O]:De,z.copy(_.viewport),Z.copy(_.scissor),G=_.scissorTest}else z.copy(Pe).multiplyScalar(ce).floor(),Z.copy(ie).multiplyScalar(ce).floor(),G=K;if(X.bindFramebuffer(D.FRAMEBUFFER,F)&&j&&X.drawBuffers(_,F),X.viewport(z),X.scissor(Z),X.setScissorTest(G),ae){const me=he.get(_.texture);D.framebufferTexture2D(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,D.TEXTURE_CUBE_MAP_POSITIVE_X+R,me.__webglTexture,O)}else if(pe){const me=he.get(_.texture),Ae=R||0;D.framebufferTextureLayer(D.FRAMEBUFFER,D.COLOR_ATTACHMENT0,me.__webglTexture,O||0,Ae)}q=-1},this.readRenderTargetPixels=function(_,R,O,j,F,ae,pe){if(!_||!_.isWebGLRenderTarget)return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let me=he.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&pe!==void 0&&(me=me[pe]),me){X.bindFramebuffer(D.FRAMEBUFFER,me);try{const Ae=_.texture,De=Ae.format,Fe=Ae.type;if(!le.textureFormatReadable(De))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(!le.textureTypeReadable(Fe))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");R>=0&&R<=_.width-j&&O>=0&&O<=_.height-F&&D.readPixels(R,O,j,F,ct.convert(De),ct.convert(Fe),ae)}finally{const Ae=L!==null?he.get(L).__webglFramebuffer:null;X.bindFramebuffer(D.FRAMEBUFFER,Ae)}}},this.readRenderTargetPixelsAsync=async function(_,R,O,j,F,ae,pe){if(!_||!_.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let me=he.get(_).__webglFramebuffer;if(_.isWebGLCubeRenderTarget&&pe!==void 0&&(me=me[pe]),me){const Ae=_.texture,De=Ae.format,Fe=Ae.type;if(!le.textureFormatReadable(De))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!le.textureTypeReadable(Fe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(R>=0&&R<=_.width-j&&O>=0&&O<=_.height-F){X.bindFramebuffer(D.FRAMEBUFFER,me);const Ne=D.createBuffer();D.bindBuffer(D.PIXEL_PACK_BUFFER,Ne),D.bufferData(D.PIXEL_PACK_BUFFER,ae.byteLength,D.STREAM_READ),D.readPixels(R,O,j,F,ct.convert(De),ct.convert(Fe),0);const et=L!==null?he.get(L).__webglFramebuffer:null;X.bindFramebuffer(D.FRAMEBUFFER,et);const pt=D.fenceSync(D.SYNC_GPU_COMMANDS_COMPLETE,0);return D.flush(),await function(ut,Mt,st){return new Promise(function(tt,ht){setTimeout(function bt(){switch(ut.clientWaitSync(Mt,ut.SYNC_FLUSH_COMMANDS_BIT,0)){case ut.WAIT_FAILED:ht();break;case ut.TIMEOUT_EXPIRED:setTimeout(bt,st);break;default:tt()}},st)})}(D,pt,4),D.bindBuffer(D.PIXEL_PACK_BUFFER,Ne),D.getBufferSubData(D.PIXEL_PACK_BUFFER,0,ae),D.deleteBuffer(Ne),D.deleteSync(pt),ae}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(_,R=null,O=0){_.isTexture!==!0&&(Rr("WebGLRenderer: copyFramebufferToTexture function signature has changed."),R=arguments[0]||null,_=arguments[1]);const j=Math.pow(2,-O),F=Math.floor(_.image.width*j),ae=Math.floor(_.image.height*j),pe=R!==null?R.x:0,me=R!==null?R.y:0;re.setTexture2D(_,0),D.copyTexSubImage2D(D.TEXTURE_2D,O,0,0,pe,me,F,ae),X.unbindTexture()},this.copyTextureToTexture=function(_,R,O=null,j=null,F=0){let ae,pe,me,Ae,De,Fe;_.isTexture!==!0&&(Rr("WebGLRenderer: copyTextureToTexture function signature has changed."),j=arguments[0]||null,_=arguments[1],R=arguments[2],F=arguments[3]||0,O=null),O!==null?(ae=O.max.x-O.min.x,pe=O.max.y-O.min.y,me=O.min.x,Ae=O.min.y):(ae=_.image.width,pe=_.image.height,me=0,Ae=0),j!==null?(De=j.x,Fe=j.y):(De=0,Fe=0);const Ne=ct.convert(R.format),et=ct.convert(R.type);re.setTexture2D(R,0),D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,R.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,R.unpackAlignment);const pt=D.getParameter(D.UNPACK_ROW_LENGTH),ut=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Mt=D.getParameter(D.UNPACK_SKIP_PIXELS),st=D.getParameter(D.UNPACK_SKIP_ROWS),tt=D.getParameter(D.UNPACK_SKIP_IMAGES),ht=_.isCompressedTexture?_.mipmaps[F]:_.image;D.pixelStorei(D.UNPACK_ROW_LENGTH,ht.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ht.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,me),D.pixelStorei(D.UNPACK_SKIP_ROWS,Ae),_.isDataTexture?D.texSubImage2D(D.TEXTURE_2D,F,De,Fe,ae,pe,Ne,et,ht.data):_.isCompressedTexture?D.compressedTexSubImage2D(D.TEXTURE_2D,F,De,Fe,ht.width,ht.height,Ne,ht.data):D.texSubImage2D(D.TEXTURE_2D,F,De,Fe,ae,pe,Ne,et,ht),D.pixelStorei(D.UNPACK_ROW_LENGTH,pt),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ut),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Mt),D.pixelStorei(D.UNPACK_SKIP_ROWS,st),D.pixelStorei(D.UNPACK_SKIP_IMAGES,tt),F===0&&R.generateMipmaps&&D.generateMipmap(D.TEXTURE_2D),X.unbindTexture()},this.copyTextureToTexture3D=function(_,R,O=null,j=null,F=0){let ae,pe,me,Ae,De,Fe,Ne,et,pt;_.isTexture!==!0&&(Rr("WebGLRenderer: copyTextureToTexture3D function signature has changed."),O=arguments[0]||null,j=arguments[1]||null,_=arguments[2],R=arguments[3],F=arguments[4]||0);const ut=_.isCompressedTexture?_.mipmaps[F]:_.image;O!==null?(ae=O.max.x-O.min.x,pe=O.max.y-O.min.y,me=O.max.z-O.min.z,Ae=O.min.x,De=O.min.y,Fe=O.min.z):(ae=ut.width,pe=ut.height,me=ut.depth,Ae=0,De=0,Fe=0),j!==null?(Ne=j.x,et=j.y,pt=j.z):(Ne=0,et=0,pt=0);const Mt=ct.convert(R.format),st=ct.convert(R.type);let tt;if(R.isData3DTexture)re.setTexture3D(R,0),tt=D.TEXTURE_3D;else{if(!R.isDataArrayTexture&&!R.isCompressedArrayTexture)return void console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");re.setTexture2DArray(R,0),tt=D.TEXTURE_2D_ARRAY}D.pixelStorei(D.UNPACK_FLIP_Y_WEBGL,R.flipY),D.pixelStorei(D.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),D.pixelStorei(D.UNPACK_ALIGNMENT,R.unpackAlignment);const ht=D.getParameter(D.UNPACK_ROW_LENGTH),bt=D.getParameter(D.UNPACK_IMAGE_HEIGHT),Xe=D.getParameter(D.UNPACK_SKIP_PIXELS),Be=D.getParameter(D.UNPACK_SKIP_ROWS),qt=D.getParameter(D.UNPACK_SKIP_IMAGES);D.pixelStorei(D.UNPACK_ROW_LENGTH,ut.width),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,ut.height),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Ae),D.pixelStorei(D.UNPACK_SKIP_ROWS,De),D.pixelStorei(D.UNPACK_SKIP_IMAGES,Fe),_.isDataTexture||_.isData3DTexture?D.texSubImage3D(tt,F,Ne,et,pt,ae,pe,me,Mt,st,ut.data):R.isCompressedArrayTexture?D.compressedTexSubImage3D(tt,F,Ne,et,pt,ae,pe,me,Mt,ut.data):D.texSubImage3D(tt,F,Ne,et,pt,ae,pe,me,Mt,st,ut),D.pixelStorei(D.UNPACK_ROW_LENGTH,ht),D.pixelStorei(D.UNPACK_IMAGE_HEIGHT,bt),D.pixelStorei(D.UNPACK_SKIP_PIXELS,Xe),D.pixelStorei(D.UNPACK_SKIP_ROWS,Be),D.pixelStorei(D.UNPACK_SKIP_IMAGES,qt),F===0&&R.generateMipmaps&&D.generateMipmap(tt),X.unbindTexture()},this.initRenderTarget=function(_){he.get(_).__webglFramebuffer===void 0&&re.setupRenderTarget(_)},this.initTexture=function(_){_.isCubeTexture?re.setTextureCube(_,0):_.isData3DTexture?re.setTexture3D(_,0):_.isDataArrayTexture||_.isCompressedArrayTexture?re.setTexture2DArray(_,0):re.setTexture2D(_,0),X.unbindTexture()},this.resetState=function(){w=0,P=0,L=null,X.reset(),Tt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return bi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===xs?"display-p3":"srgb",t.unpackColorSpace=it.workingColorSpace===Hr?"display-p3":"srgb"}}class ku extends yt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Nt,this.environmentIntensity=1,this.environmentRotation=new Nt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}new T;new T;new T;new T;new Ge;new Ge;new Ce;new T;new T;new T;new Ge;new Ge;new Ge;new T;new T;new T;new rt;new rt;new T;new Ce;new T;new Mn;new Ce;new Ji;class Wu extends Rt{constructor(e=null,t=1,n=1,r,a,o,u,s,c=1003,l=1003,h,d){super(null,o,u,s,c,l,r,a,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}new Ce;new Ce;class yo extends zt{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const di=new Ce,Eo=new Ce,Mr=[],bo=new xn,Xu=new Ce,zi=new mt,Hi=new Mn;class mi extends mt{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new yo(new Float32Array(16*n),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,Xu)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new xn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,di),bo.copy(e.boundingBox).applyMatrix4(di),this.boundingBox.union(bo)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Mn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,di),Hi.copy(e.boundingSphere).applyMatrix4(di),this.boundingSphere.union(Hi)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,3*e)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,16*e)}getMorphAt(e,t){const n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,a=e*(n.length+1)+1;for(let o=0;o<n.length;o++)n[o]=r[a+o]}raycast(e,t){const n=this.matrixWorld,r=this.count;if(zi.geometry=this.geometry,zi.material=this.material,zi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Hi.copy(this.boundingSphere),Hi.applyMatrix4(n),e.ray.intersectsSphere(Hi)!==!1))for(let a=0;a<r;a++){this.getMatrixAt(a,di),Eo.multiplyMatrices(n,di),zi.matrixWorld=Eo,zi.raycast(e,Mr);for(let o=0,u=Mr.length;o<u;o++){const s=Mr[o];s.instanceId=a,s.object=this,t.push(s)}Mr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new yo(new Float32Array(3*this.instanceMatrix.count).fill(1),3)),t.toArray(this.instanceColor.array,3*e)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,16*e)}setMorphAt(e,t){const n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new Wu(new Float32Array(r*this.count),r,this.count,ms,on));const a=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const u=this.geometry.morphTargetsRelative?1:1-o,s=r*e;a[s]=u,a.set(n,s+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}new Ce;new Ce;new Ce;new ze(1,1,1);new Ce;new Gr;new xn;new Mn;new T;new T;new T;new mt;class hl extends Ai{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ze(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Or=new T,Fr=new T,To=new Ce,Gi=new Ji,Sr=new Mn,ba=new T,wo=new T;class ju extends yt{constructor(e=new Ot,t=new hl){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,a=t.count;r<a;r++)Or.fromBufferAttribute(t,r-1),Fr.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Or.distanceTo(Fr);e.setAttribute("lineDistance",new _t(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,a=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Sr.copy(n.boundingSphere),Sr.applyMatrix4(r),Sr.radius+=a,e.ray.intersectsSphere(Sr)===!1)return;To.copy(r).invert(),Gi.copy(e.ray).applyMatrix4(To);const u=a/((this.scale.x+this.scale.y+this.scale.z)/3),s=u*u,c=this.isLineSegments?2:1,l=n.index,h=n.attributes.position;if(l!==null){const d=Math.max(0,o.start),p=Math.min(l.count,o.start+o.count);for(let m=d,v=p-1;m<v;m+=c){const g=l.getX(m),f=l.getX(m+1),x=yr(this,e,Gi,s,g,f);x&&t.push(x)}if(this.isLineLoop){const m=l.getX(p-1),v=l.getX(d),g=yr(this,e,Gi,s,m,v);g&&t.push(g)}}else{const d=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let m=d,v=p-1;m<v;m+=c){const g=yr(this,e,Gi,s,m,m+1);g&&t.push(g)}if(this.isLineLoop){const m=yr(this,e,Gi,s,p-1,d);m&&t.push(m)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){const n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function yr(i,e,t,n,r,a){const o=i.geometry.attributes.position;if(Or.fromBufferAttribute(o,r),Fr.fromBufferAttribute(o,a),t.distanceSqToSegment(Or,Fr,ba,wo)>n)return;ba.applyMatrix4(i.matrixWorld);const u=e.ray.origin.distanceTo(ba);return u<e.near||u>e.far?void 0:{distance:u,point:wo.clone().applyMatrix4(i.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:i}}new T;new T;new Ce;new Ji;new Mn;new T;class dl extends Rt{constructor(e,t,n,r,a,o,u,s,c){super(e,t,n,r,a,o,u,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}new T;class Kn extends Ot{constructor(e=1,t=1,n=1,r=32,a=1,o=!1,u=0,s=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:a,openEnded:o,thetaStart:u,thetaLength:s};const c=this;r=Math.floor(r),a=Math.floor(a);const l=[],h=[],d=[],p=[];let m=0;const v=[],g=n/2;let f=0;function x(M){const S=m,w=new Ge,P=new T;let L=0;const q=M===!0?e:t,U=M===!0?1:-1;for(let Z=1;Z<=r;Z++)h.push(0,g*U,0),d.push(0,U,0),p.push(.5,.5),m++;const z=m;for(let Z=0;Z<=r;Z++){const G=Z/r*s+u,J=Math.cos(G),W=Math.sin(G);P.x=q*W,P.y=g*U,P.z=q*J,h.push(P.x,P.y,P.z),d.push(0,U,0),w.x=.5*J+.5,w.y=.5*W*U+.5,p.push(w.x,w.y),m++}for(let Z=0;Z<r;Z++){const G=S+Z,J=z+Z;M===!0?l.push(J,J+1,G):l.push(J+1,J,G),L+=3}c.addGroup(f,L,M===!0?1:2),f+=L}(function(){const M=new T,S=new T;let w=0;const P=(t-e)/n;for(let L=0;L<=a;L++){const q=[],U=L/a,z=U*(t-e)+e;for(let Z=0;Z<=r;Z++){const G=Z/r,J=G*s+u,W=Math.sin(J),$=Math.cos(J);S.x=z*W,S.y=-U*n+g,S.z=z*$,h.push(S.x,S.y,S.z),M.set(W,P,$).normalize(),d.push(M.x,M.y,M.z),p.push(G,1-U),q.push(m++)}v.push(q)}for(let L=0;L<r;L++)for(let q=0;q<a;q++){const U=v[q][L],z=v[q+1][L],Z=v[q+1][L+1],G=v[q][L+1];e>0&&(l.push(U,z,G),w+=3),t>0&&(l.push(z,Z,G),w+=3)}c.addGroup(f,w,0),f+=w})(),o===!1&&(e>0&&x(!0),t>0&&x(!1)),this.setIndex(l),this.setAttribute("position",new _t(h,3)),this.setAttribute("normal",new _t(d,3)),this.setAttribute("uv",new _t(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Kn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Br extends Kn{constructor(e=1,t=1,n=32,r=1,a=!1,o=0,u=2*Math.PI){super(0,e,t,n,r,a,o,u),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:u}}static fromJSON(e){return new Br(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class bs extends Ot{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};const a=[],o=[];function u(d,p,m,v){const g=v+1,f=[];for(let x=0;x<=g;x++){f[x]=[];const M=d.clone().lerp(m,x/g),S=p.clone().lerp(m,x/g),w=g-x;for(let P=0;P<=w;P++)f[x][P]=P===0&&x===g?M:M.clone().lerp(S,P/w)}for(let x=0;x<g;x++)for(let M=0;M<2*(g-x)-1;M++){const S=Math.floor(M/2);M%2==0?(s(f[x][S+1]),s(f[x+1][S]),s(f[x][S])):(s(f[x][S+1]),s(f[x+1][S+1]),s(f[x+1][S]))}}function s(d){a.push(d.x,d.y,d.z)}function c(d,p){const m=3*d;p.x=e[m+0],p.y=e[m+1],p.z=e[m+2]}function l(d,p,m,v){v<0&&d.x===1&&(o[p]=d.x-1),m.x===0&&m.z===0&&(o[p]=v/2/Math.PI+.5)}function h(d){return Math.atan2(d.z,-d.x)}(function(d){const p=new T,m=new T,v=new T;for(let g=0;g<t.length;g+=3)c(t[g+0],p),c(t[g+1],m),c(t[g+2],v),u(p,m,v,d)})(r),function(d){const p=new T;for(let m=0;m<a.length;m+=3)p.x=a[m+0],p.y=a[m+1],p.z=a[m+2],p.normalize().multiplyScalar(d),a[m+0]=p.x,a[m+1]=p.y,a[m+2]=p.z}(n),function(){const d=new T;for(let m=0;m<a.length;m+=3){d.x=a[m+0],d.y=a[m+1],d.z=a[m+2];const v=h(d)/2/Math.PI+.5,g=(p=d,Math.atan2(-p.y,Math.sqrt(p.x*p.x+p.z*p.z))/Math.PI+.5);o.push(v,1-g)}var p;(function(){const m=new T,v=new T,g=new T,f=new T,x=new Ge,M=new Ge,S=new Ge;for(let w=0,P=0;w<a.length;w+=9,P+=6){m.set(a[w+0],a[w+1],a[w+2]),v.set(a[w+3],a[w+4],a[w+5]),g.set(a[w+6],a[w+7],a[w+8]),x.set(o[P+0],o[P+1]),M.set(o[P+2],o[P+3]),S.set(o[P+4],o[P+5]),f.copy(m).add(v).add(g).divideScalar(3);const L=h(f);l(x,P+0,m,L),l(M,P+2,v,L),l(S,P+4,g,L)}})(),function(){for(let m=0;m<o.length;m+=6){const v=o[m+0],g=o[m+2],f=o[m+4],x=Math.max(v,g,f),M=Math.min(v,g,f);x>.9&&M<.1&&(v<.2&&(o[m+0]+=1),g<.2&&(o[m+2]+=1),f<.2&&(o[m+4]+=1))}}()}(),this.setAttribute("position",new _t(a,3)),this.setAttribute("normal",new _t(a.slice(),3)),this.setAttribute("uv",new _t(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bs(e.vertices,e.indices,e.radius,e.details)}}new T;new T;new T;new Wt;class Ts extends bs{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2;super([-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Ts(e.radius,e.detail)}}class kr extends Ot{constructor(e=1,t=32,n=16,r=0,a=2*Math.PI,o=0,u=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:a,thetaStart:o,thetaLength:u},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const s=Math.min(o+u,Math.PI);let c=0;const l=[],h=new T,d=new T,p=[],m=[],v=[],g=[];for(let f=0;f<=n;f++){const x=[],M=f/n;let S=0;f===0&&o===0?S=.5/t:f===n&&s===Math.PI&&(S=-.5/t);for(let w=0;w<=t;w++){const P=w/t;h.x=-e*Math.cos(r+P*a)*Math.sin(o+M*u),h.y=e*Math.cos(o+M*u),h.z=e*Math.sin(r+P*a)*Math.sin(o+M*u),m.push(h.x,h.y,h.z),d.copy(h).normalize(),v.push(d.x,d.y,d.z),g.push(P+S,1-M),x.push(c++)}l.push(x)}for(let f=0;f<n;f++)for(let x=0;x<t;x++){const M=l[f][x+1],S=l[f][x],w=l[f+1][x],P=l[f+1][x+1];(f!==0||o>0)&&p.push(M,S,P),(f!==n-1||s<Math.PI)&&p.push(S,w,P)}this.setIndex(p),this.setAttribute("position",new _t(m,3)),this.setAttribute("normal",new _t(v,3)),this.setAttribute("uv",new _t(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new kr(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Yi extends Ot{constructor(e=1,t=.4,n=12,r=48,a=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:a},n=Math.floor(n),r=Math.floor(r);const o=[],u=[],s=[],c=[],l=new T,h=new T,d=new T;for(let p=0;p<=n;p++)for(let m=0;m<=r;m++){const v=m/r*a,g=p/n*Math.PI*2;h.x=(e+t*Math.cos(g))*Math.cos(v),h.y=(e+t*Math.cos(g))*Math.sin(v),h.z=t*Math.sin(g),u.push(h.x,h.y,h.z),l.x=e*Math.cos(v),l.y=e*Math.sin(v),d.subVectors(h,l).normalize(),s.push(d.x,d.y,d.z),c.push(m/r),c.push(p/n)}for(let p=1;p<=n;p++)for(let m=1;m<=r;m++){const v=(r+1)*p+m-1,g=(r+1)*(p-1)+m-1,f=(r+1)*(p-1)+m,x=(r+1)*p+m;o.push(v,g,x),o.push(g,f,x)}this.setIndex(o),this.setAttribute("position",new _t(u,3)),this.setAttribute("normal",new _t(s,3)),this.setAttribute("uv",new _t(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yi(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Pt extends Ai{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new ze(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new Ge(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Nt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ws extends yt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ze(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class qu extends ws{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new ze(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Ta=new Ce,Ao=new T,Ro=new T;class pl{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ge(512,512),this.map=null,this.mapPass=null,this.matrix=new Ce,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Gr,this._frameExtents=new Ge(1,1),this._viewportCount=1,this._viewports=[new rt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Ao.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ao),Ro.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ro),t.updateMatrixWorld(),Ta.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ta),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ta)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),this.mapSize.x===512&&this.mapSize.y===512||(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Co=new Ce,Vi=new T,wa=new T;class Yu extends pl{constructor(){super(new kt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Ge(4,2),this._viewportCount=6,this._viewports=[new rt(2,1,1,1),new rt(0,1,1,1),new rt(3,1,1,1),new rt(1,1,1,1),new rt(3,0,1,1),new rt(1,0,1,1)],this._cubeDirections=[new T(1,0,0),new T(-1,0,0),new T(0,0,1),new T(0,0,-1),new T(0,1,0),new T(0,-1,0)],this._cubeUps=[new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,0,1),new T(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,r=this.matrix,a=e.distance||n.far;a!==n.far&&(n.far=a,n.updateProjectionMatrix()),Vi.setFromMatrixPosition(e.matrixWorld),n.position.copy(Vi),wa.copy(n.position),wa.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(wa),n.updateMatrixWorld(),r.makeTranslation(-Vi.x,-Vi.y,-Vi.z),Co.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Co)}}class Ku extends ws{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new Yu}get power(){return 4*this.intensity*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Zu extends pl{constructor(){super(new ys(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ju extends ws{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(yt.DEFAULT_UP),this.updateMatrix(),this.target=new yt,this.shadow=new Zu}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}new Ce;new Ce;new Ce;new T;new T;new T;new T;new T;new T;const fl="\\[\\]\\.:\\/",Aa="[^"+fl+"]",$u="[^"+fl.replace("\\.","")+"]";new RegExp("^"+/((?:WC+[\/:])*)/.source.replace("WC",Aa)+/(WCOD+)?/.source.replace("WCOD",$u)+/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Aa)+/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Aa)+"$");const Po=new Ce;class Qu{constructor(e,t,n=0,r=1/0){this.ray=new Ji(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new Ms,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Po.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Po),this}intersectObject(e,t=!0,n=[]){return cs(e,this,n,t),n.sort(Lo),n}intersectObjects(e,t=!0,n=[]){for(let r=0,a=e.length;r<a;r++)cs(e[r],this,n,t);return n.sort(Lo),n}}function Lo(i,e){return i.distance-e.distance}function cs(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){const a=i.children;for(let o=0,u=a.length;o<u;o++)cs(a[o],e,t,!0)}}new Ge;new T;new T;new T;new T;new Ce;new Ce;new T;new ze;new ze;new T;new T;new T;new T;new Ss;new xn;new T;typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ca}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ca);const B={cyl:new Kn(1,1,1,24),cyl8:new Kn(1,1,1,8),cone:new Br(1,1,16),pyr:new Br(1,1,4),box:new Jn(1,1,1),sph:new kr(1,12,9),tore:new Yi(1,.08,6,24),plan:new Ri(1,1)},Zn=new Map,eh=i=>{for(const e of Zn.values())if(e===i)return!0;return!1};function th(){var i;for(const e of Zn.values())(i=e.map)==null||i.dispose(),e.dispose();Zn.clear()}const ne=(i,e=.7,t=0,n=0)=>{const r=`${i}|${e}|${t}|${n}`;let a=Zn.get(r);return a||(a=new Pt({color:i,roughness:e,metalness:t}),n&&(a.emissive=new ze(i),a.emissiveIntensity=n),Zn.set(r,a)),a},je=()=>ne("#C9A74E",.32,.75),us=()=>ne("#E3C9A0",.7),Cn=()=>ne("#5A3A26",.65),hs=()=>ne("#FAF5EA",.9),en=()=>ne("#1C1A20",.5,.2),Pr=["#E8C3A0","#C99A72","#9A6B4A","#F0CFB0"];function _i(i){return(e,t,n,r,a,o,u=o,s=o)=>{const c=new mt(e,t);return c.position.set(n,r,a),c.scale.set(o,u,s),c.castShadow=!0,c.receiveShadow=!0,i.add(c),c}}function xi(i,e,t,n,r,a=0,o=1){i(B.cone,ne(r,.85),e,t+.36*o,n,.2*o,.72*o,.2*o),i(B.sph,ne(Pr[a%4],.8),e,t+.82*o,n,.11*o),i(B.sph,ne(a%3===0?"#2b1d16":"#3a2a20",.9),e,t+.87*o,n-.02*o,.115*o,.09*o,.115*o)}const Ra=()=>ne("#FFD98A",.4,0,1.4);function nh(i,e,t){const n=_i(i),r=e.hw>=e.hd,a=(r?e.hw:e.hd)*2,o=(r?e.hd:e.hw)*2,u=new jt;r||(u.rotation.y=Math.PI/2),i.add(u);const s=_i(u),c=e.id,l=ne(t.accent,.6);ne(t.deco,.35,.6);const h=ne(t.nappe,.95),d=ne(t.fleurs,.8);if(c==="estrade")s(B.box,ne("#6B4A33",.7),0,.15,0,a,.3,o),s(B.box,je(),0,.31,o/2-.02,a,.03,.04),s(B.box,l,0,.305,0,a*.9,.012,o*.8),s(B.box,ne("#6B4A33",.7),0,.07,o/2+.2,Math.min(1.4,a*.4),.15,.4),s(B.box,Cn(),-a*.28,.75,-o*.15,.4,.9,.3),s(B.box,je(),-a*.28,1.21,-o*.15,.44,.03,.34);else if(c==="dj"){s(B.box,en(),0,.45,0,a*.6,.9,o*.55),s(B.box,l,0,.92,o*.28,a*.6,.02,.02);for(const p of[-1,1])s(B.cyl,en(),p*a*.12,.94,0,.17,.03,.17),s(B.cyl,je(),p*a*.12,.96,0,.04,.02,.04);s(B.box,ne("#2a2a33",.4),0,.95,0,.18,.04,.3),s(B.box,ne("#cfd6e0",.3,.5),0,1.08,-o*.15,.4,.02,.28).rotation.x=-.9;for(const p of[-1,1])s(B.box,en(),p*a*.46,.55,0,.3,1.1,.3),s(B.cyl,ne("#3a3a44",.6),p*a*.46,.75,o*.16,.09,.02,.09).rotation.x=Math.PI/2,s(B.cyl,ne("#3a3a44",.6),p*a*.46,.4,o*.16,.12,.02,.12).rotation.x=Math.PI/2;xi(s,0,0,-o*.5,"#1c1a20",2)}else if(c==="regie"){s(B.box,Cn(),0,.37,0,a,.06,o*.9);for(const p of[-1,1])s(B.box,Cn(),p*(a/2-.05),.18,0,.06,.36,o*.9);for(const p of[-.5,0,.5])s(B.box,en(),p*a*.4,.62,-.1,.4,.26,.03),s(B.box,ne("#E8C27A",.3,0,.8),p*a*.4,.62,-.085,.36,.22,.01);s(B.box,ne("#cfd6e0",.3,.5),0,.4,.15,a*.5,.02,.16)}else if(c==="orch"){s(B.box,ne("#6B4A33",.7),0,.15,0,a,.3,o),s(B.box,je(),0,.31,o/2-.02,a,.03,.04);const p=Math.max(3,Math.min(5,Math.round(a/.9)));for(let m=0;m<p;m++){const v=((m+.5)/p-.5)*a*.85,g=s;g(B.cone,ne(m%2?"#1c1a20":"#F6EFDD",.85),v,.3+.36,0,.2,.72,.2),g(B.sph,ne(Pr[m%4],.8),v,.3+.82,0,.11),g(B.sph,ne("#2b1d16",.9),v,.3+.87,-.02,.115,.09,.115),m%2===0?(g(B.sph,ne("#8a4a24",.45),v,.3+.5,.2,.17,.1,.12),g(B.box,Cn(),v+.18,.3+.62,.22,.28,.03,.03)):g(B.cyl,ne("#d8c9a8",.6),v,.3+.35,.25,.13,.3,.13)}}else if(c==="troupe"){const p=["#C9A74E","#9C4A2C","#1F5A4C","#F1E6CE","#9C4A2C"];for(let m=0;m<5;m++){const v=(m-2)*.32,g=m%2*.22-.1;s(B.cone,ne(p[m],.85),v,.4,g,.2,.8,.2),s(B.sph,ne(Pr[m%4],.8),v,.9,g,.11),s(B.cyl,ne(m%2?"#9C4A2C":"#C9A74E",.5),v,.98,g,.14,.1,.14)}s(B.cyl,ne("#8a5a30",.7),-.65,.35,.3,.15,.2,.15),s(B.cyl,ne("#8a5a30",.7),.65,.35,.3,.15,.2,.15)}else if(c==="photobooth"){s(B.box,en(),0,2/2,-o/2+.05,a,2,.08);for(const m of[-1,1])s(B.box,en(),m*(a/2-.05),2/2,0,.08,2,o);s(B.box,Cn(),0,2+.04,0,a+.1,.08,o+.1),s(B.box,je(),0,2-.1,o/2,a,.05,.03),s(B.box,l,-a/2+.2,2*.55,o/2-.05,.4,2*.8,.04),s(B.box,ne("#FFF4D0",.3,0,1.2),0,2-.25,-o/2+.12,a*.6,.1,.04),s(B.tore,je(),0,1.2,-o/2+.14,.18,.18,.4),s(B.box,ne("#FFF4D0",.8),0,.1,0,a-.2,.2,o-.2)}else if(c==="candy"){s(B.box,h,0,.33,0,a,.66,o*.7),s(B.box,je(),0,.67,o*.35,a,.025,.03);const p=["#E8A6B0","#F4D774","#9DD3C8","#C9A0DC"];for(let m=0;m<6;m++){const v=((m+.5)/6-.5)*a*.9,g=p[m%4];s(B.cyl,ne("#E8F2F4",.1,0,0),v,.9,0,.1,.4,.1).material=ne("#DCEBF0",.1),s(B.cyl,ne(g,.5),v,.84,0,.085,.26,.085),s(B.cyl,je(),v,1.12,0,.07,.04,.07)}s(B.box,ne("#F6EFDD",.8),0,1.3,-o*.33,a,.04,.3),s(B.box,us(),0,.65,-o*.33,a,1.3,.04)}else if(c==="the"){s(B.box,us(),0,.4,0,a,.8,o*.7),s(B.cyl,je(),-a*.2,.84,0,.3,.03,.3);for(let p=0;p<3;p++){const m=-a*.2+(p-1)*.2;s(B.cyl,je(),m,.97,0,.09,.2,.09),s(B.sph,je(),m,1.1,0,.07),s(B.box,je(),m+.1,1,0,.1,.02,.02).rotation.z=.5}for(let p=0;p<6;p++)s(B.cyl,ne("#E8D9B0",.2,0,0),a*.15+p%3*.12,.88,(Math.floor(p/3)-.5)*.15,.035,.07,.035);s(B.cyl8,je(),a*.4,1.2,-o*.2,.01,.8,.01),s(B.cyl,ne("#FFD98A",.3,0,1.2),a*.4,1,-o*.2,.08,.14,.08)}else if(c==="salon"){s(B.box,ne(t.accent,.95),0,.01,.1,a,.02,o);const p=(m,v,g,f,x)=>{const M=new jt;M.position.set(m,0,v),M.rotation.y=x,u.add(M);const S=_i(M);S(B.box,ne("#9C4A2C",.9),0,.2,0,g,.4,f),S(B.box,ne("#9C4A2C",.9),0,.5,-f*.42,g,.4,f*.18);for(let w=0;w<Math.max(2,Math.floor(g/.55));w++)S(B.box,ne(w%2?"#C9A74E":"#1F5A4C",.9),((w+.5)/Math.max(2,Math.floor(g/.55))-.5)*g*.9,.5,f*.1,.3,.25,.1)};p(0,-o*.4,a*.95,.5,0),p(-a*.45,0,o*.6,.5,Math.PI/2),p(a*.45,0,o*.6,.5,-Math.PI/2),s(B.cyl,je(),0,.25,.1,.32,.05,.32),s(B.cyl8,je(),0,.12,.1,.06,.24,.06)}else if(c==="fontaine"){const p=e.hw;s(B.cyl8,ne("#1F5A4C",.4),0,.17,0,p,.34,p),s(B.cyl8,ne("#F1E6CE",.5),0,.35,0,p*.92,.04,p*.92),s(B.cyl,ne("#7fd0e0",.05,.1),0,.33,0,p*.82,.04,p*.82),s(B.cyl8,ne("#F1E6CE",.5),0,.6,0,.12,.5,.12),s(B.cyl,ne("#1F5A4C",.4),0,.88,0,.32,.1,.32),s(B.cyl,ne("#9fe0ee",.05,.1,.2),0,.94,0,.27,.03,.27),s(B.sph,ne("#bfeaf5",.1,0,.4),0,1.1,0,.07,.14,.07)}else if(c==="gateau")[[.5,.3],[.38,.28],[.27,.26]].forEach(([p,m],v)=>{const g=.3+[0,.3,.58][v];s(B.cyl,v%2?ne("#F6EFDD",.6):hs(),0,g+m/2,0,p*.85,m,p*.85),s(B.tore,je(),0,g+.02,0,p*.86,p*.86,.5).rotation.x=Math.PI/2}),s(B.cyl,h,0,.15,0,.46,.3,.46),s(B.sph,d,0,.95,0,.1);else if(c==="amariya"){const p=a*.6,m=o*.7,v=1.9;s(B.box,ne("#6B4A33",.7),0,.18,0,p,.18,m),s(B.box,l,0,.32,0,p*.8,.1,m*.8);for(const g of[-1,1])for(const f of[-1,1])s(B.cyl8,je(),g*(p/2-.08),v/2,f*(m/2-.08),.04,v,.04);s(B.pyr,je(),0,v+.2,0,p*.78,.5,m*.78).rotation.y=Math.PI/4,s(B.box,l,0,v-.02,0,p+.1,.06,m+.1);for(const g of[-1,1])s(B.box,ne("#9C4A2C",.9),0,v*.55,g*(m/2-.1),p*.85,v*.6,.02);for(const g of[-1,1])s(B.cyl8,Cn(),0,.12,g*(m/2+.25),p*.5+.2,.025,.025).rotation.z=Math.PI/2;s(B.box,ne("#F6EFDD",.8),0,.5,0,.5,.3,.35)}else if(c==="neggafa")s(B.cone,ne("#C9A74E",.5,.3),0,.5,0,.42,1,.42),s(B.cone,ne("#9C4A2C",.85),0,.55,.02,.32,.9,.3),s(B.sph,ne(Pr[1],.8),0,1.12,0,.12),s(B.cyl,je(),0,1.25,0,.14,.1,.14),s(B.tore,je(),0,.72,.28,.16,.16,.5).rotation.x=Math.PI/2;else if(c==="fauteuils"){s(B.box,ne("#6B4A33",.7),0,.1,0,a,.2,o),s(B.box,l,0,.21,.05,a*.9,.02,o*.85);for(const p of[-1,1]){const m=p*a*.22;s(B.box,ne("#F6EFDD",.8),m,.45,.02,.55,.3,.5),s(B.box,ne("#F6EFDD",.8),m,.9,-.2,.55,.8,.1),s(B.tore,je(),m,1.05,-.14,.26,.26,.4);for(const v of[-1,1])s(B.box,ne("#F6EFDD",.8),m+v*.3,.55,.02,.08,.3,.45)}s(B.cyl,ne("#9C4A2C",.9),0,.3,.3,.12,.2,.12),s(B.sph,d,0,.5,.3,.14,.1,.14)}else if(c==="henne"){s(B.box,ne(t.accent,.95),0,.01,0,a,.02,o);for(const[p,m,v,g]of[[0,-o*.38,a*.95,0],[-a*.4,0,o*.7,Math.PI/2]]){const f=new jt;f.position.set(p,0,m),f.rotation.y=g,u.add(f);const x=_i(f);x(B.box,ne("#9C4A2C",.9),0,.2,0,v,.4,.5),x(B.box,ne("#9C4A2C",.9),0,.5,-.2,v,.4,.1);for(let M=0;M<4;M++)x(B.box,ne(M%2?"#C9A74E":"#F1E6CE",.9),((M+.5)/4-.5)*v*.85,.5,0,.3,.25,.1)}s(B.cyl,je(),.1,.2,.1,.34,.04,.34),s(B.cyl8,je(),.1,.1,.1,.06,.2,.06);for(let p=0;p<4;p++)s(B.cone,ne("#7a4a22",.7),.1+(p-1.5)*.1,.27,.1,.025,.1,.025).rotation.z=1.2}else if(c==="livre")s(B.cyl,je(),0,.5,0,.18,1,.18),s(B.box,ne("#F6EFDD",.7),-.1,1.04,0,.2,.03,.28).rotation.z=.12,s(B.box,ne("#F6EFDD",.7),.1,1.04,0,.2,.03,.28).rotation.z=-.12,s(B.box,ne("#9C4A2C",.8),0,1.01,0,.44,.02,.32),s(B.cyl8,je(),.3,1.1,.05,.01,.2,.01).rotation.z=1.1;else if(c.startsWith("mic"))s(B.cyl,en(),0,.02,0,.14,.04,.14),s(B.cyl8,ne("#cfd6e0",.3,.6),0,.6,0,.012,1.2,.012),s(B.sph,ne("#2a2a33",.4),0,1.25,0,.05);else if(c==="enceintes")s(B.box,en(),0,.55,0,.5,1.1,.4),s(B.cyl,ne("#3a3a44",.6),0,.8,.205,.14,.02,.14).rotation.x=Math.PI/2,s(B.cyl,ne("#3a3a44",.6),0,.4,.205,.18,.02,.18).rotation.x=Math.PI/2;else if(c==="acoustique")s(B.cyl,Cn(),0,.3,0,.14,.6,.14),xi(n,0,0,0,"#3d352e",1,1),s(B.sph,ne("#a55a28",.4),.14,.55,.16,.15,.1,.07),s(B.box,Cn(),.35,.8,.16,.34,.03,.03).rotation.z=.5;else if(c==="photographe")xi(n,0,0,0,"#1f1d22",0,1.05),s(B.box,en(),.1,.8,.16,.16,.1,.1),s(B.cyl,en(),.1,.8,.26,.04,.06,.04).rotation.x=Math.PI/2;else if(c==="interv"){s(B.box,h,0,.36,0,a,.72,o*.6),s(B.box,je(),0,.73,o*.3,a,.025,.03);for(let p=0;p<3;p++){const m=((p+.5)/3-.5)*a*.8;s(B.box,ne("#F6EFDD",.7),m,.3,-o*.55,.3,.05,.3),s(B.box,ne("#F6EFDD",.7),m,.6,-o*.7,.3,.45,.04),s(B.cyl,ne("#E8F2F4",.1),m+.12,.82,.05,.035,.18,.035)}}else if(c==="enfants"){s(B.box,ne("#9DD3C8",.95),0,.015,0,a,.03,o);const p=["#E8A6B0","#F4D774","#C9A0DC","#9DD3C8"];for(let m=0;m<5;m++)s(B.box,ne(p[m%4],.8),(m-2)*.45,.13,(m%2-.5)*.7,.26,.26,.26).rotation.y=m;s(B.pyr,ne("#F6EFDD",.9),-a*.3,.55,-o*.25,.7,1.1,.7).rotation.y=Math.PI/4,s(B.sph,ne("#E8A6B0",.4),a*.3,.2,o*.2,.2)}else return!1;return!0}function ih(i,e,t){const n=new jt,r=i.salle.pos,a=i.salle.n,o=_i(n),u=(s,c)=>{const l=new jt;return l.position.set(s,0,c),n.add(l),_i(l)};if((i.accueils.includes("hotesses")||i.accueils.includes("maitre_hotel"))&&r.HOTESSES.forEach(([s,c],l)=>{xi(u(s,c),0,0,0,e.nappe,l,1.1)}),i.accueils.includes("maitre_hotel")){const[s,c]=r.MAITRE_HOTEL,[l,h]=r.HOTESSE_3;xi(u(s,c),0,0,0,"#1f1d22",3,1.15),xi(u(l,h),0,0,0,e.nappe,0,1.1)}if(i.accueils.includes("the")||i.accueils.includes("discret")){const s=u(r.COMPTOIR[0],r.COMPTOIR[1]);s(B.box,us(),0,.4,0,1.2,.8,.5),s(B.box,je(),0,.82,.24,1.2,.03,.03),i.accueils.includes("the")?(s(B.cyl,je(),-.2,.96,0,.09,.2,.09),s(B.sph,je(),-.2,1.08,0,.07),s(B.cyl,je(),.25,.84,0,.2,.03,.2)):s(B.box,ne("#F6EFDD",.8),0,.85,0,.5,.04,.3)}if(i.options.has("fleurs")&&r.BOUQUETS.forEach(([s,c])=>{const l=u(s,c);l(B.cyl,je(),0,.3,0,.14,.6,.14);for(let h=0;h<7;h++)l(B.sph,ne(h%2?e.fleurs:"#FBF6EA",.8),Math.cos(h*.9)*.18,.78+h%3*.08,Math.sin(h*.9)*.18,.13);l(B.sph,ne("#4F7A4A",.9),0,.7,0,.2,.1,.2)}),i.lumiere==="bougies"&&r.CANDELABRES.forEach(([s,c])=>{const l=u(s,c);l(B.cyl,je(),0,.03,0,.14,.06,.14),l(B.cyl8,je(),0,.5,0,.025,1,.025);for(const h of[-.16,0,.16])l(B.cyl8,je(),h,.98,0,.012,.06,.012),l(B.cyl8,hs(),h,1.1,0,.018,.16,.018),l(B.sph,Ra(),h,1.22,0,.03,.05,.03);l(B.box,je(),0,.98,0,.36,.015,.015)}),i.lumiere==="chaleureuse"&&r.POSTES_LANTERNES.forEach(([s,c])=>{const l=u(s,c);l(B.cyl8,je(),0,.9,0,.03,1.8,.03),l(B.cyl,je(),0,.03,0,.12,.06,.12),l(B.cyl8,je(),0,1.92,0,.1,.18,.1),l(B.cyl8,ne("#FFD98A",.3,0,1.3),0,1.78,0,.075,.2,.075),l(B.cone,je(),0,2.08,0,.14,.14,.14)}),i.options.has("feux_froids")&&r.FEUX.forEach(([s,c])=>{const l=u(s,c);l(B.cyl,en(),0,.1,0,.09,.2,.09);for(let h=0;h<6;h++)l(B.sph,ne("#BFE3FF",.3,0,1.4),(h-2.5)*.02,.4+h*.22,0,.035+h*.006)}),i.lumiere==="etoilee"){const s=i.salle.ax,c=3,l=[[[.3,a-.5],[.3,.3]],[[.3,.3],[a-.4,.3]],[[.3,a/2+.1],[a-.4,a/2+.1]],[[s-.9,a-.2],[a-.4,a/2+.1]]],h=[];for(const[[m,v],[g,f]]of l){const x=[];for(let S=0;S<=24;S++){const w=S/24;x.push(new T(m+(g-m)*w,c-Math.sin(w*Math.PI)*.35,v+(f-v)*w))}n.add(new ju(new Ot().setFromPoints(x),new hl({color:3813672})));const M=Math.round(Math.hypot(g-m,f-v)*1.3);for(let S=0;S<M;S++){const w=(S+.5)/M;h.push([m+(g-m)*w,c-Math.sin(w*Math.PI)*.35-.06,v+(f-v)*w])}}const d=new mi(B.sph,Ra(),h.length),p=new Ce;h.forEach(([m,v,g],f)=>{p.compose(new T(m,v,g),new nn,new T(.05,.05,.05)),d.setMatrixAt(f,p)}),n.add(d);for(const[m,v]of[[.3,a-.5],[.3,.3],[a-.4,.3],[.3,a/2+.1],[a-.4,a/2+.1]])o(B.cyl8,ne("#3a3128",.8),m,c/2,v,.03,c,.03)}if(i.lieu==="villa"){const s=t>.5,c=`eau|${s}|${i.options.has("piscine_lumiere")}`;let l=Zn.get(c);if(!l){const h=document.createElement("canvas");h.width=h.height=128;const d=h.getContext("2d");for(let m=0;m<2;m++)for(let v=0;v<2;v++)d.fillStyle=(m+v)%2?"#3FA79C":"#2F8F86",d.fillRect(m*64,v*64,64,64);d.strokeStyle="rgba(240,236,221,0.55)",d.lineWidth=2;for(const[m,v]of[[32,32],[96,96]]){d.beginPath();for(let g=0;g<16;g++){const f=g/16*Math.PI*2-Math.PI/2,x=g%2?8:22;d.lineTo(m+Math.cos(f)*x,v+Math.sin(f)*x)}d.closePath(),d.stroke()}const p=new dl(h);p.colorSpace=Vt,p.wrapS=p.wrapT=Wi,p.repeat.set(10,3),l=new Pt({map:p,color:s?"#2c5f5c":"#ffffff",roughness:.05,metalness:.3}),i.options.has("piscine_lumiere")&&(l.emissive=new ze("#3FD0C0"),l.emissiveIntensity=.55),Zn.set(c,l)}o(B.box,ne("#EFEADF",.6),a/2,-.12,-2.45,a+.4,.3,4.3),o(B.box,l,a/2,0,-2.45,a-.2,.06,3.9);for(let h=0;h<12;h++)o(B.cyl,ne(h%2?e.fleurs:"#FBF6EA",.8),.8+h*1.37%(a-1.6),.05,-.9-h*.73%3,i.options.has("piscine_fleurs")?.12:1e-4,.02,i.options.has("piscine_fleurs")?.12:1e-4);if(i.options.has("piscine_bougies"))for(let h=0;h<8;h++)o(B.cyl,hs(),1.2+h*((a-2.4)/8),.1,-1.4-h%3*.9,.05,.1,.05),o(B.sph,Ra(),1.2+h*((a-2.4)/8),.18,-1.4-h%3*.9,.025,.04,.025);for(const h of[a*.12,a*.37,a*.65]){o(B.cyl8,ne("#5c4630",.9),h,.8,-3.4,.07,1.6,.07);for(let d=0;d<6;d++){const p=d/6*Math.PI*2;o(B.cone,ne("#4F7A4A",.85),h+Math.cos(p)*.5,1.6,-3.4+Math.sin(p)*.5,.12,1,.12).rotation.set(Math.sin(p)*1.2,0,-Math.cos(p)*1.2)}}}return n}function rh(i){const e=i.salle.pos,t=i.options,n=i.salle.n,r=[],a=(s,c,l,h,d=h,p="generique",m=.6)=>r.push({id:s,a:[c,l],hw:h,hd:d,genre:p,h:m}),o=(s,c,l="generique",h=.6)=>a(s,c.gx+c.w/2,c.gy+c.d/2,c.w/2,c.d/2,l,h),u=jr[i.tables];if(i.tables!=="conference"&&i.salle.tables.forEach(([s,c],l)=>a(`t${l}`,s,c,u.dx,u.dy,i.tables==="rondes"?"ronde":i.tables==="rectangulaires"?"rect":"haute")),i.salle.hautes.forEach(([s,c],l)=>a(`th${l}`,s,c,jr.hautes.dx,jr.hautes.dy,"haute")),i.type!=="pro"&&i.type!=="conference"&&i.tables!=="hautes"&&o("honneur",e.HONNEUR,"honneur"),t.has("arche")&&a("arche",e.ARCHE.gx+e.ARCHE.largeur/2,e.ARCHE.gy+.4,e.ARCHE.largeur/2,.4,"arche"),t.has("amariya")&&a("amariya",e.AMARIYA[0]+1.15,e.AMARIYA[1]+.7,1.15,.7,"generique",1.1),t.has("fauteuils")&&a("fauteuils",e.FAUTEUILS[0]+1,e.FAUTEUILS[1]+.6,1,.6,"generique",.8),t.has("neggafa")&&a("neggafa",e.NEGGAFA[0],e.NEGGAFA[1],.45,.45,"generique",.9),t.has("gateau")&&a("gateau",e.GATEAU[0],e.GATEAU[1],.5,.5,"generique",.9),t.has("enfants")&&a("enfants",e.ENFANTS[0]+1.2,e.ENFANTS[1]+1,1.2,1,"generique",.4),t.has("henne")&&a("henne",e.HENNE[0]+1.1,e.HENNE[1]+1.1,1.1,1.1,"generique",.5),t.has("podium")&&o("estrade",e.ESTRADE,"generique",.3),t.has("table_intervenants")&&o("interv",e.INTERVENANTS,"generique",.5),t.has("micros")&&e.MICROS.forEach(([s,c],l)=>a(`mic${l}`,s,c,.3,.3,"generique",1.2)),t.has("regie")&&a("regie",e.REGIE[0]+.9,e.REGIE[1]+.4,.9,.4,"generique",.6),t.has("buffet_sandwichs")){const s=e.SANDWICHS,c=s[0]<=n-2,l=c?2.6:.9,h=c?.9:2.6;a("sandw",s[0]+l/2,s[1]+h/2,l/2,h/2,"buffet")}return i.musiques.includes("dj")&&o("dj",e.DJ,"generique",.7),i.musiques.includes("orchestre")&&o("orch",e.SCENE_ORCHESTRE,"generique",.3),i.musiques.includes("troupe")&&a("troupe",e.TROUPE[0]+.5,e.TROUPE[1]+.5,.6,.5,"generique",1),i.musiques.includes("playlist")&&a("enceintes",(e.ENCEINTES[0][0]+e.ENCEINTES[1][0])/2,.75,.25,.25,"generique",1.1),i.musiques.includes("acoustique")&&a("acoustique",e.ACOUSTIQUE[0]+.5,e.ACOUSTIQUE[1]+.5,.5,.5,"generique",.9),t.has("photobooth")&&o("photobooth",e.PHOTOBOOTH,"generique",1.6),t.has("nawar")&&o("nawar",e.NAWAR,"nawar"),t.has("buffet")&&o("buffet",e.BUFFET,"buffet"),t.has("candy_bar")&&o("candy",e.CANDY,"generique",.7),t.has("the_bar")&&o("the",e.THE_BAR,"generique",.7),t.has("livre_dor")&&a("livre",e.LIVRE_DOR[0],e.LIVRE_DOR[1],.5,.5,"generique",.7),t.has("salon")&&o("salon",e.SALON,"generique",.5),t.has("fontaine")&&a("fontaine",e.FONTAINE[0],e.FONTAINE[1],.9,.9,"generique",.7),t.has("photographe")&&a("photographe",e.PHOTOGRAPHE[0],e.PHOTOGRAPHE[1],.5,.5,"generique",1),t.has("piste")&&o("piste",e.PISTE,"piste"),r}const Do=(i,e)=>[i,e].includes("piste")&&[i,e].some(t=>t==="troupe"||t.startsWith("feu"));function ah(i,e,t,n,r){const a=n.find(l=>l.id===i);if(!a)return!1;const o=.04,u={x0:a.a[0]-a.hw+e,y0:a.a[1]-a.hd+t,x1:a.a[0]+a.hw+e,y1:a.a[1]+a.hd+t},s=l=>u.x0<l.x1-o&&l.x0<u.x1-o&&u.y0<l.y1-o&&l.y0<u.y1-o;for(const l of n){if(l.id===i||Do(i,l.id))continue;const[h,d]=r.deplacements[l.id]??[0,0];if(s({x0:l.a[0]-l.hw+h,y0:l.a[1]-l.hd+d,x1:l.a[0]+l.hw+h,y1:l.a[1]+l.hd+d}))return!0}const c=new Set(n.map(l=>l.id));for(const l of r.salle.pos.obstacles)if(!(/^(pl|cd|enc|feu)\d/.test(l.id)||c.has(l.id)||Do(i,l.id))&&s(l))return!0;return!1}const Qt=(i,e,t)=>i+(e-i)*t,pi=(i,e,t)=>new ze(i).lerp(new ze(e),t),Uo=(()=>{const r=.6000000000000001,a=3*(.2-.2)-r,o=1-r-a,u=3*.7,s=3*(1-.7)-u,c=1-u-s;return l=>{let h=l;for(let d=0;d<8;d++){const p=((o*h+a)*h+r)*h-l,m=(3*o*h+2*a)*h+r;if(Math.abs(p)<1e-5||!m)break;h-=p/m}return h=Math.max(0,Math.min(1,h)),((c*h+s)*h+u)*h}})();function Io(i){let e=i>>>0||1;return()=>(e=e*1664525+1013904223>>>0,e/4294967296)}function ki(i,e,t,n=!0){const r=document.createElement("canvas");r.width=i,r.height=e,t(r.getContext("2d"),i,e);const a=new dl(r);return a.colorSpace=Vt,n&&(a.wrapS=a.wrapT=Wi),a.anisotropy=4,a}function No(i){const e=i.map(([u,s])=>{const c=u.index?u.toNonIndexed():u.clone();return c.applyMatrix4(s),c});let t=0;e.forEach(u=>t+=u.attributes.position.count);const n=new Float32Array(t*3),r=new Float32Array(t*3);let a=0;e.forEach(u=>{n.set(u.attributes.position.array,a*3),r.set(u.attributes.normal.array,a*3),a+=u.attributes.position.count});const o=new Ot;return o.setAttribute("position",new zt(n,3)),o.setAttribute("normal",new zt(r,3)),o.computeBoundingSphere(),o}const gn=(i=0,e=0,t=0,n=0,r=1,a=r,o=r,u=0)=>new Ce().compose(new T(i,e,t),new nn().setFromEuler(new Nt(u,n,0)),new T(r,a,o)),sh={riad:{a:"#EBDDBF",b:"#D9C398",bord:"#1F5A4C",mur:"#E6D1AB",bande:"#1F5A4C",terre:"#C6A474"},villa:{a:"#B98E65",b:"#AA7F58",bord:"#8A6A47",mur:"#F1EDE4",bande:"#D8D1C2",terre:"#C8C2B2"},rooftop:{a:"#E8E1D6",b:"#DDD4C6",bord:"#9A7650",mur:"#EEE7DA",bande:"#CDC4B2",terre:"#3B3A57"},jardin:{a:"#BBCB8B",b:"#B0C382",bord:"#8FA86A",mur:"#6F8F55",bande:"#587A44",terre:"#9DB873"},salle:{a:"#E6D8BC",b:"#D8C6A2",bord:"#C9A74E",mur:"#F0E6D2",bande:"#C9A74E",terre:"#CDB79A"}};function fh(i,e,t){const n=new Vu({canvas:i,antialias:!0,alpha:!0,powerPreference:"high-performance"});n.setPixelRatio(Math.min(window.devicePixelRatio||1,matchMedia("(pointer: coarse)").matches?1.5:2)),n.setClearColor(0,0),n.toneMapping=zo,n.toneMappingExposure=1.05,n.shadowMap.enabled=!0,n.shadowMap.type=Fo,n.shadowMap.autoUpdate=!1;const r=matchMedia("(pointer: coarse)").matches,a=new ku,o=new ys(-1,1,1,-1,.1,300),u=new qu(16770760,9075302,1);a.add(u);const s=new Ju(16761994,2.2);s.castShadow=!0,s.shadow.mapSize.set(r?1024:2048,r?1024:2048),s.shadow.radius=6,s.shadow.bias=-6e-4,s.shadow.normalBias=.03,a.add(s,s.target);const c=[0,1,2,3].map(()=>{const C=new Ku(16758886,0,8,1.6);return a.add(C),C}),l={laiton:new Pt({color:13215566,metalness:.75,roughness:.32}),boisClair:new Pt({color:14928288,roughness:.7}),boisSombre:new Pt({color:5913126,roughness:.65}),blanc:new Pt({color:16446954,roughness:.9}),verre:new Pt({color:15254138,roughness:.12,metalness:.1,transparent:!0,opacity:.72}),bougie:new jn({color:16767370}),refusAnim:new jn({color:14831182,transparent:!0,opacity:.45,depthWrite:!1}),refus:new jn({color:14831182,transparent:!0,opacity:.45,depthWrite:!1}),halo:new jn({color:16045940,transparent:!0,opacity:.14,depthWrite:!1}),libre:new jn({color:16045940,transparent:!0,opacity:.35,depthWrite:!1})},h={cyl:new Kn(1,1,1,28),cyl8:new Kn(1,1,1,10),box:new Jn(1,1,1),sph:new kr(1,10,8),ico:new Ts(1,0),tore:new Yi(1,.1,6,28),plan:new Ri(1,1)},d=No([[h.box,gn(0,.3,0,0,.26,.05,.26)],[h.box,gn(-.11,.15,-.11,0,.03,.3,.03)],[h.box,gn(.11,.15,-.11,0,.03,.3,.03)],[h.box,gn(-.11,.15,.11,0,.03,.3,.03)],[h.box,gn(.11,.15,.11,0,.03,.3,.03)],[h.tore,gn(0,.58,-.12,0,.17,.2,.17)],[h.cyl,gn(0,.58,-.12,0,.15,.018,.17,Math.PI/2)],[h.box,gn(0,.4,-.12,0,.03,.2,.03)]]),p=No(Array.from({length:70},(C,A)=>{const Q=Io(A+3);return[h.ico,gn((Q()-.5)*3,-Q()*.45,(Q()-.5)*.5,Q()*3,.05+Q()*.05)]}));function m(C){C.traverse(A=>{var oe;if(A.isInstancedMesh&&A.dispose(),A.isLine){A.geometry.dispose(),A.material.dispose();return}const Q=Array.isArray(A.material)?A.material:A.material?[A.material]:[];for(const te of Q)!eh(te)&&!Object.values(l).includes(te)&&((oe=te.map)==null||oe.dispose(),te.dispose())})}let v=null,g=[],f=new Map,x=null,M="";const S=(C,A=!0,Q=!0)=>(C.castShadow=A,C.receiveShadow=Q,C),w=(C,A,Q,oe,te,be,we=be,Ie=be,Ze=!0)=>{const $e=S(new mt(C,A),Ze);return $e.position.set(Q,oe,te),$e.scale.set(be,we,Ie),$e};function P(C,A,Q){const oe=new jt,te=sh[C],be=C==="riad"||C==="salle",we=(_,R,O,j,F)=>{_.beginPath();for(let ae=0;ae<16;ae++){const pe=ae/16*Math.PI*2-Math.PI/2,me=ae%2?F:j;_.lineTo(R+Math.cos(pe)*me,O+Math.sin(pe)*me)}_.closePath()},Ie=be?ki(384,384,(_,R,O)=>{for(let j=0;j<3;j++)for(let F=0;F<3;F++)_.fillStyle=(j+F)%2?te.b:te.a,_.fillRect(j*128,F*128,128,128);_.globalAlpha=.55,we(_,192,192,62,30),_.fillStyle="#1F5A4C",_.fill(),_.strokeStyle="#A8933F",_.lineWidth=3,_.stroke(),_.globalAlpha=.07,_.strokeStyle="#000",_.lineWidth=2;for(let j=0;j<3;j++)_.strokeRect(j*128,0,128,O),_.strokeRect(0,j*128,R,128)}):ki(256,256,(_,R,O)=>{_.fillStyle=te.a,_.fillRect(0,0,R,O),_.fillStyle=te.b,_.fillRect(0,0,R/2,O/2),_.fillRect(R/2,O/2,R/2,O/2),_.globalAlpha=.08,_.strokeStyle="#000",_.lineWidth=2,_.strokeRect(0,0,R,O)});Ie.repeat.set(be?A/3:A/2,be?A/3:A/2);const Ze=S(new mt(h.box,new Pt({map:Ie,roughness:.75})),!1,!0);Ze.scale.set(A,.3,A),Ze.position.set(A/2,-.15,A/2),oe.add(Ze);const $e=S(new mt(h.box,new Pt({color:te.bord,roughness:.6})),!1,!0);$e.scale.set(A+.4,.28,A+.4),$e.position.set(A/2,-.17,A/2),oe.add($e);const Je=S(new mt(h.plan,new Pt({color:te.terre,roughness:1})),!1,!0);Je.rotation.x=-Math.PI/2,Je.scale.set(A*5,A*5,1),Je.position.set(A/2,-.32,A/2),oe.add(Je);const Et=3.4,ye=ki(512,256,(_,R,O)=>{_.fillStyle=te.mur,_.fillRect(0,0,R,O);for(let j=0;j<16;j++)_.fillStyle=j%2?be?"#1F5A4C":te.bande:"#F3ECDD",_.fillRect(j*32,0,32,40),_.fillStyle="#A8933F",_.fillRect(j*32+14,18,4,4);_.fillStyle="#C9A74E",_.fillRect(0,40,R,5),_.fillStyle="#E9DEC5",_.fillRect(0,206,R,42),_.fillStyle="#C9A74E",_.fillRect(0,204,R,3),_.fillRect(0,O-8,R,8);for(let j=0;j<3;j++){const F=40+j*150,ae=(me,Ae,De)=>{_.beginPath(),_.moveTo(F+me,De),_.lineTo(F+me,120+Ae),_.quadraticCurveTo(F+50,50+Ae*1.6,F+100-me,120+Ae),_.lineTo(F+100-me,De),_.closePath()},pe=_.createLinearGradient(0,70,0,204);pe.addColorStop(0,"#EDE2C8"),pe.addColorStop(1,"#D8C7A2"),ae(0,0,204),_.fillStyle=pe,_.fill(),_.strokeStyle="#C9A74E",_.lineWidth=4,_.stroke(),ae(8,8,204),_.strokeStyle="rgba(120,90,50,0.28)",_.lineWidth=3,_.stroke()}});ye.repeat.set(Math.max(1,Math.round(A/8)),1);const _e=new Pt({map:ye,roughness:.85}),Oe=S(new mt(h.plan,_e),!1,!0),Ve=C==="villa"?.9:Et;Oe.scale.set(A,Ve,1),Oe.position.set(A/2,Ve/2,0),C==="villa"&&(Oe.material=new Pt({color:"#EFEADF",roughness:.7,side:Ls})),oe.add(Oe);const Re=S(new mt(h.plan,_e),!1,!0);Re.scale.set(A,Et,1),Re.rotation.y=Math.PI/2,Re.position.set(0,Et/2,A/2),oe.add(Re);for(const[_,R]of[[.35,.35],[A-.4,.35],[.35,A-.4]])oe.add(w(h.cyl8,l.laiton,_,.45,R,.05,.9),w(h.cyl,l.laiton,_,1,R,.1,.22),w(h.sph,l.bougie,_,1,R,.07,.07,.07,!1));return oe}function L(C,A){let Q=0;for(const oe of C)Q=Q*31+oe.charCodeAt(0)>>>0;return pi(Q%2?A.accent:A.deco,"#3a2a22",.15+Q%5*.07)}function q(C,A,Q,oe){const te=new jt,be=[],we=(ye,_e,Oe)=>be.push({x:ye,z:_e,dos:[-Math.sin(Oe),-Math.cos(Oe)]}),Ie=ne(Q.nappe,.95),Ze=ne(Q.fleurs,.8),$e=(ye,_e,Oe,Ve)=>{const Re=S(new mi(d,Ve,ye)),_=new Ce;for(let R=0;R<ye;R++){const O=R/ye*Math.PI*2;_.compose(new T(Math.cos(O)*_e,Oe,Math.sin(O)*_e),new nn().setFromEuler(new Nt(0,-O-Math.PI/2,0)),new T(1,1,1)),Re.setMatrixAt(R,_)}return Re},Je=ne("#E3C9A0",.55);if(C.genre==="ronde")te.add(w(h.cyl,Ie,0,.21,0,yn,.42,yn)),te.add(w(h.cyl,Ie,0,.43,0,yn+.03,.03,yn+.03)),te.add(w(h.tore,l.laiton,0,.45,0,yn-.12,.6,yn-.12).rotateX(Math.PI/2)),te.add(w(h.box,ne("#9C4A2C",.9),0,.447,0,yn*1.9,.006,.17,!1),w(h.box,ne("#1F5A4C",.7),0,.449,0,.17,.006,.17,!1)),te.add(w(h.sph,Ze,0,.58,0,.13,.11,.13)),oe&&te.add(w(h.cyl8,l.bougie,.2,.5,.1,.012,.1,.012,!1)),te.add($e(10,yn+.22,0,Je));else if(C.genre==="rect"){te.add(w(h.box,Ie,0,.21,0,1.7,.42,.78)),te.add(w(h.sph,Ze,0,.55,0,.12,.1,.12));const ye=S(new mi(d,Je,6)),_e=new Ce;for(let Oe=0;Oe<6;Oe++){const Ve=Oe<3?-1:1,Re=(Oe%3-1)*.567;_e.compose(new T(Re,0,Ve*.64),new nn().setFromEuler(new Nt(0,Ve>0?Math.PI:0,0)),new T(1,1,1)),ye.setMatrixAt(Oe,_e),we(Re,Ve*.64,Ve>0?Math.PI:0)}te.add(ye)}else if(C.genre==="haute")te.add(w(h.cyl8,l.laiton,0,.3,0,.04,.6),w(h.cyl,l.laiton,0,.02,0,.2,.04,.2),w(h.cyl,Ie,0,.62,0,.3,.04,.3)),oe&&te.add(w(h.cyl8,l.bougie,0,.7,0,.012,.1,.012,!1));else if(C.genre==="honneur"){const ye=C.hw*2,_e=C.hd*2;te.add(w(h.box,Ie,0,.36,0,ye,.72,_e),w(h.box,ne("#1F5A4C",.7),0,.5,_e/2+.004,ye*.98,.12,.012,!1));for(const Ve of[.565,.435])te.add(w(h.box,l.laiton,0,Ve,_e/2+.008,ye*.98,.012,.012,!1));te.add(w(h.box,l.laiton,0,.73,_e/2,ye+.04,.03,.03,!1),w(h.box,l.laiton,0,.73,-_e/2,ye+.04,.03,.03,!1));for(const Ve of[-1,1])te.add(w(h.box,l.laiton,Ve*ye/2,.73,0,.03,.03,_e,!1));if(te.add(w(h.box,ne("#1F5A4C",.7),0,.726,0,ye*.94,.008,_e*.22,!1)),A.type==="mariage"){const Ve=S(new mi(d,Je,2)),Re=new Ce;[-.9,.9].forEach((_,R)=>{Re.compose(new T(_,0,-(_e/2+.3)),new nn().setFromEuler(new Nt(0,0,0)),new T(1.25,1.25,1.25)),Ve.setMatrixAt(R,Re),we(_,-(_e/2+.3),0)}),te.add(Ve)}te.add(w(h.box,l.laiton,0,2.3,-_e*.1,ye*1.05,.03,.03,!1));const Oe=new mt(p,l.blanc);Oe.scale.set(ye/3,1,1.2),Oe.position.set(0,2.25,-_e*.1),Oe.castShadow=!0,te.add(Oe);for(const Ve of[-.5,.5])te.add(w(h.cyl8,l.laiton,Ve*ye*.98,1.15,-_e*.1,.02,2.3,.02,!1))}else if(C.genre==="arche"){const ye=C.hw*2,_e=2,Oe=ki(128,128,(R,O,j)=>{R.clearRect(0,0,O,j),R.strokeStyle="#fff",R.lineWidth=6;for(let F=-1;F<5;F++)R.beginPath(),R.moveTo(F*32,0),R.lineTo(F*32+128,128),R.moveTo(F*32+128,0),R.lineTo(F*32,128),R.stroke()});Oe.repeat.set(ye*2,3);const Ve=new Pt({map:Oe,color:new ze(Q.deco),transparent:!0,alphaTest:.4,side:Ls,roughness:.5,metalness:.4});for(const R of[-1,1])te.add(w(h.box,l.laiton,R*(ye/2-.06),_e/2,0,.12,_e,.14));const Re=w(h.tore,l.laiton,0,_e,0,ye/2-.06,ye/2-.06,1.4);Re.scale.set(ye/2-.06,(ye/2-.06)*1,1.2),Re.geometry=new Yi(1,.06,6,24,Math.PI),te.add(Re);const _=w(h.plan,Ve,0,_e*.45,0,ye-.2,_e*.9,1,!0);te.add(_),te.add(w(h.sph,Ze,0,_e+ye/2*.98,0,.16,.14,.16))}else if(C.genre==="piste"){const ye=ki(128,128,(_e,Oe,Ve)=>{for(let Re=0;Re<2;Re++)for(let _=0;_<2;_++)_e.fillStyle=(Re+_)%2?"#EADFC6":"#1F5A4C",_e.fillRect(Re*64,_*64,64,64);_e.strokeStyle="#C9A74E",_e.lineWidth=2;for(const[Re,_]of[[32,32],[96,32],[32,96],[96,96]]){_e.beginPath();for(let R=0;R<16;R++){const O=R/16*Math.PI*2-Math.PI/2,j=R%2?9:22;_e.lineTo(Re+Math.cos(O)*j,_+Math.sin(O)*j)}_e.closePath(),_e.stroke()}});ye.repeat.set(C.hw*2,C.hd*2),te.add(S(w(h.box,new Pt({map:ye,roughness:.25,metalness:.2}),0,.03,0,C.hw*2,.06,C.hd*2,!1),!1,!0))}else if(C.genre==="buffet"){const ye=C.hw*2,_e=C.hd*2,Oe=ye>=_e;te.add(w(h.box,Ie,0,.3,0,ye,.6,_e));const Ve=Math.max(2,Math.floor((Oe?ye:_e)/.6));for(let Re=0;Re<Ve;Re++){const _=((Re+.5)/Ve-.5)*(Oe?ye:_e)*.9;te.add(w(h.cyl,l.laiton,Oe?_:0,.64,Oe?0:_,.17,.05,.17),w(h.sph,Re%2?Ze:l.boisSombre,Oe?_:0,.7,Oe?0:_,.1,.08,.1))}}else if(C.genre==="nawar"){const ye=C.hw*2,_e=C.hd*2;te.add(w(h.box,l.boisClair,0,.42,0,ye,.84,_e),w(h.box,l.boisSombre,0,.86,0,ye+.04,.04,_e+.04));const Oe=Math.max(3,Math.floor(_e/.32));for(let Ve=0;Ve<Oe;Ve++){const Re=((Ve+.5)/Oe-.5)*_e*.92;te.add(w(h.cyl,l.verre,0,1.02,Re,.09,.26,.09),w(h.cyl,l.laiton,0,1.18,Re,.04,.06,.04,!1))}te.add(w(h.box,l.boisClair,-ye*.42,1,0,.05,1.3,_e*.96));for(const Ve of[1.15,1.45]){te.add(w(h.box,l.laiton,-ye*.3,Ve,0,ye*.28,.025,_e*.94));for(let Re=0;Re<Math.max(3,Math.floor(_e/.4));Re++)te.add(w(h.cyl,l.verre,-ye*.3,Ve+.1,((Re+.5)/Math.max(3,Math.floor(_e/.4))-.5)*_e*.85,.045,.16,.045,!1))}}else if(!nh(te,C,Q)){te.userData.generique=!0;const ye=C.h??.6,_e=L(C.id,Q);te.add(w(h.box,new Pt({color:_e,roughness:.7}),0,ye/2,0,C.hw*2*.95,ye,C.hd*2*.95)),te.add(w(h.box,l.laiton,0,ye+.015,0,C.hw*2*.97,.03,C.hd*2*.97,!1))}const Et=new mt(h.box,l.libre);return Et.scale.set(C.hw*2+.1,.02,C.hd*2+.1),Et.position.y=.012,Et.visible=!1,Et.userData.zone=!0,te.add(Et),te.userData={...te.userData,id:C.id,zone:Et,chaises:be,w:C.hw*2,d:C.hd*2},te}function U(){for(const C of f.values()){const A=C.userData.zone;Ye&&Ye.grp===C||(A.material=l.halo,A.visible=!!(x!=null&&x.deplacable))}}let z=null;function Z(C){if(z&&(a.remove(z.corps,z.tete),z.corps.dispose(),z.tete.dispose(),z=null),!C.final||C.r.tables==="conference")return;const{r:A}=C,Q=A.salle.n,oe=A.salle.pos,te=A.salle.tables,be=Io(31),we=te.length?te:[[A.salle.ax,Q/2]],Ie=Math.min(40,14+Math.round(te.length/2)),Ze=$n.find(Re=>Re.id===A.palette)??$n[0],$e=new mi(h.cyl8,ne("#ffffff",.85),Ie),Je=new mi(h.sph,ne("#ffffff",.8),Ie);$e.castShadow=Je.castShadow=!0;const Et=[Ze.accent,"#3d352e",Ze.deco,"#F6EFDD"],ye=["#E8C3A0","#C99A72","#9A6B4A","#F0CFB0"],_e=[],Oe=[],Ve=[];for(let Re=0;Re<Ie;Re++){const[_,R]=we[Re%we.length],O=be()*Math.PI*2;_e.push([Math.min(Q-.6,Math.max(.8,_+Math.cos(O)*1.5)),Math.min(Q-.5,Math.max(1.2,R+Math.sin(O)*1.3+.2))]),Oe.push(Re%11*.22),Ve.push(2.3+Re%5*.3),$e.setColorAt(Re,new ze(Et[Re%4])),Je.setColorAt(Re,new ze(ye[Re%4]))}z={corps:$e,tete:Je,dep:[oe.DEPART_INVITES[0],oe.DEPART_INVITES[1]],cibles:_e,delai:Oe,duree:Ve,etat:C.final,t0:performance.now(),fini:!1},a.add($e,Je),W(performance.now())}const G=new Ce,J=new nn;function W(C){const A=z;if(!A)return!1;let Q=!1;const oe=(C-A.t0)/1e3;for(let te=0;te<A.cibles.length;te++){let be=A.etat==="assis"||x!=null&&x.reduit?A.etat==="avant"?0:1:A.etat==="arrive"?Math.max(0,Math.min(1,(oe-A.delai[te])/A.duree[te])):0;be>0&&be<1&&(Q=!0);const we=1-Math.pow(1-be,2),Ie=Qt(A.dep[0],A.cibles[te][0],we),Ze=Qt(A.dep[1],A.cibles[te][1],we),$e=be>0&&be<1?Math.abs(Math.sin(oe*9+te))*.035:0,Je=be===0?0:1;G.compose(new T(Ie,.3+$e,Ze),J,new T(.15*Je,.3*Je,.15*Je)),A.corps.setMatrixAt(te,G),G.compose(new T(Ie,.72+$e,Ze),J,new T(.1*Je,.1*Je,.1*Je)),A.tete.setMatrixAt(te,G)}return A.corps.instanceMatrix.needsUpdate=A.tete.instanceMatrix.needsUpdate=!0,A.corps.instanceColor&&(A.corps.instanceColor.needsUpdate=A.tete.instanceColor.needsUpdate=!0),n.shadowMap.needsUpdate=!0,Q}function $(C,A){if(!C.final){z&&Z({...C,final:null});return}if(z||Z(C),z&&(z.etat=C.final,z.t0=performance.now()),!A&&C.final==="avant"){const Q=C.r.salle.pos.DEPART_INVITES;K.cible.set(Q[0],.6,Math.min(Q[1],C.r.salle.n)),K.zoom=1.5,fe=null,b=1,E()}else C.final==="arrive"&&le();Ue()}let ee=new jt;a.add(ee);let ce=!1,ue=null;function Me(C){ue&&(a.remove(ue),m(ue));const A=$n.find(Q=>Q.id===C.r.palette)??$n[0];ue=ih(C.r,A,C.nuit),a.add(ue)}function Pe(C){const{r:A}=C,Q=$n.find(we=>we.id===A.palette)??$n[0],oe=A.salle.n,te=`${A.lieu}|${oe}|${A.palette}`;te!==M&&(v&&(a.remove(v),m(v)),v=P(A.lieu,oe),a.add(v),M=te,s.shadow.camera.left=-oe*.85,s.shadow.camera.right=oe*.85,s.shadow.camera.top=oe*.85,s.shadow.camera.bottom=-oe*.85,s.shadow.camera.far=oe*6,s.shadow.camera.updateProjectionMatrix(),s.position.set(oe/2-oe*.5,oe*1.6,oe/2+oe*.8),s.target.position.set(oe/2,0,oe/2),s.target.updateMatrixWorld(),le(!0));for(const we of[...ee.children])ee.remove(we),m(we);f.clear(),g=rh(A);for(const we of g){const Ie=q(we,A,Q,A.lumiere==="bougies"),[Ze,$e]=A.deplacements[we.id]??[0,0];Ie.position.set(we.a[0]+Ze,0,we.a[1]+$e),f.set(we.id,Ie),ee.add(Ie)}for(const we of ge.keys()){const Ie=f.get(we);Ie&&(Ie.position.y=.18)}U();const be=["honneur","nawar","piste","t0"].map(we=>f.get(we)).filter(Boolean).slice(0,4);c.forEach((we,Ie)=>{const Ze=be[Ie];Ze?(we.position.set(Ze.position.x,1.5,Ze.position.z),we.userData.actif=!0,we.userData.nawar=Ze.userData.id==="nawar"):we.userData.actif=!1})}function ie(C){const A=C;s.color.copy(pi("#FFE2B8","#9AA3C0",A)),s.intensity=Qt(1.9,.5,A),u.color.copy(pi("#FFE6C8","#9AA3C0",A)),u.groundColor.copy(pi("#8A7A66","#2A2E48",A)),u.intensity=Qt(1,.65,A),e.style.background=`linear-gradient(180deg, ${pi("#F3ECDD","#141414",A).getStyle()}, ${pi("#E9DCC2","#1B1A22",A).getStyle()})`,c.forEach(Q=>{Q.intensity=Q.userData.actif?Q.userData.nawar?Qt(1.8,7,A):Qt(.2,7,A):0}),n.toneMappingExposure=Qt(1.08,1.1,A),n.shadowMap.needsUpdate=!0}const K={cible:new T(6,.8,6),zoom:1,N:12};let fe=null,Se=1,b=0,y=0,I=new T,Y=1;const N=()=>{y=performance.now(),I.copy(K.cible),Y=K.zoom},H=new T(1,Math.tan(Math.PI/6)*Math.SQRT2,1).normalize();function E(){var Je;const C=e.clientWidth||1,A=e.clientHeight||1,Q=C/A,oe=K.N;let te=oe*.76,be=te/Q;const we=oe*.36+2.6;be<we&&(be=we,te=be*Q);const Ie=Q<1.5?.15:0;o.left=-te/K.zoom,o.right=te/K.zoom,o.top=be*(1-2*Ie)/K.zoom,o.bottom=-be*(1+2*Ie)/K.zoom,o.position.copy(K.cible).addScaledVector(H,80),o.lookAt(K.cible),o.updateProjectionMatrix();const Ze=k(),$e=Math.abs(K.zoom-Ze)>.06||Math.hypot(K.cible.x-K.N/2,K.cible.z-(K.N/2+(Ze>1?.4:0)))>.6;$e!==V&&(V=$e,(Je=t.onDecalee)==null||Je.call(t,$e))}let V=!1;const k=()=>{const C=(e.clientWidth||1)/(e.clientHeight||1);return C<1.5?Math.min(1.25,1+(1.5-C)*.4):1};function le(C=!1){const A=K.N=(x==null?void 0:x.r.salle.n)??12;fe=new T(A/2,.8,A/2+(k()>1?.4:0)),Se=k(),b=C||x!=null&&x.reduit?1:0,N(),(C||x!=null&&x.reduit)&&(K.cible.copy(fe),K.zoom=Se,E()),Ue()}function X(C){const A=C.focus?C.r.salle.pos.ANCRES[C.focus.cle]:null;A&&(fe=new T(A[0],.5,A[1]),Se=k()>1?Math.max(k(),1.3):1.6,b=C.reduit?1:0,N(),C.reduit&&(K.cible.copy(fe),K.zoom=Se,E()),Ue())}function se(){const C=e.clientWidth,A=e.clientHeight;!C||!A||(n.setSize(C,A,!1),E(),Ue())}const he=new ResizeObserver(se);he.observe(e);const re=C=>{var A;C.preventDefault(),(A=t.onPerdu)==null||A.call(t)};i.addEventListener("webglcontextlost",re),i.addEventListener("webglcontextrestored",Ue);let ve=!1;const ge=new Map;let Ee=null,Le=0,He=null,Ke=0,Te=0;function Ue(){ve||(ve=!0,requestAnimationFrame(nt))}function nt(C){let A=!1;if(fe&&b<1){const Q=Math.min(1,(performance.now()-y)/600),oe=1-Math.pow(1-Q,3);K.cible.lerpVectors(I,fe,oe),K.zoom=Qt(Y,Se,oe),Q>=1&&(b=1),E(),A=b<1}if(He){const Q=Math.min(1,(performance.now()-He.t0)/800),oe=Q*Q*(3-2*Q);Le=Qt(He.de,He.vers,oe),ie(Le),Q>=1?He=null:A=!0}for(const[Q,oe]of ge){const te=Math.min(1,(performance.now()-oe.t0)/350),be=f.get(Q);be&&(be.position.y=.18*(1-Uo(te))),n.shadowMap.needsUpdate=!0,te>=1?(ge.delete(Q),be&&(be.position.y=0)):A=!0}if(Ee){const Q=Ee,oe=f.get(Q.id),te=performance.now()-Q.t0,be=oe==null?void 0:oe.userData.zone;if(oe&&be){if(be.visible=!0,be.material=l.refusAnim,te<400)l.refusAnim.opacity=.2+.5*(.5-.5*Math.cos(te/400*Math.PI*4)),oe.position.set(Q.de[0],.18,Q.de[1]);else if(te<760){const we=(te-400)/360,Ie=Uo(we);oe.position.set(Qt(Q.de[0],Q.vers[0],Ie),.18*(1-Ie),Qt(Q.de[1],Q.vers[1],Ie)),l.refusAnim.opacity=.45}else te<880?(oe.position.set(Q.vers[0],0,Q.vers[1]),l.refusAnim.opacity=.45*(1-(te-760)/120)):(oe.position.set(Q.vers[0],0,Q.vers[1]),Ee=null,U());n.shadowMap.needsUpdate=!0}else Ee=null;Ee&&(A=!0)}z&&W(performance.now())&&(A=!0),Ye&&(A=!0),n.render(a,o),Ke=n.info.render.calls,Te=n.info.render.triangles,A?requestAnimationFrame(nt):ve=!1}const at=new Qu,xe=new Ge,qe=new Pn(new T(0,1,0),0);let Ye=null;const ln=(C,A)=>{const Q=i.getBoundingClientRect();xe.set((C-Q.left)/Q.width*2-1,-((A-Q.top)/Q.height)*2+1),at.setFromCamera(xe,o);const oe=new T;return at.ray.intersectPlane(qe,oe)?oe:null};function cn(C,A){var Ie,Ze;const Q=i.getBoundingClientRect();xe.set((C-Q.left)/Q.width*2-1,-((A-Q.top)/Q.height)*2+1),at.setFromCamera(xe,o);const oe=at.intersectObjects(ee.children,!0);for(const $e of oe){let Je=$e.object;for(;Je&&!((Ie=Je.userData)!=null&&Ie.id);)Je=Je.parent;if((Ze=Je==null?void 0:Je.userData)!=null&&Ze.id)return Je.userData.id}const te=ln(C,A);if(!te||!x)return null;let be=null,we=1e9;for(const $e of g){const[Je,Et]=x.r.deplacements[$e.id]??[0,0],ye=$e.a[0]+Je,_e=$e.a[1]+Et,Oe=.25;if(Math.abs(te.x-ye)<=$e.hw+Oe&&Math.abs(te.z-_e)<=$e.hd+Oe){const Ve=Math.hypot(te.x-ye,te.z-_e);Ve<we&&(we=Ve,be=$e.id)}}return be}const ct=new Map;let Tt=null,Lt=null;const D=()=>{const[C,A]=[...ct.values()];return Math.hypot(C.x-A.x,C.y-A.y)||1};function un(){const C=Ye;if(Ye=null,!C)return;const A=g.find(Q=>Q.id===C.id);C.grp.position.set(A.a[0]+C.depart[0],0,A.a[1]+C.depart[1]),U(),n.shadowMap.needsUpdate=!0}const Nn=()=>{const C=K.N;K.cible.x=Math.max(0,Math.min(C,K.cible.x)),K.cible.z=Math.max(0,Math.min(C,K.cible.z))};i.addEventListener("pointerdown",C=>{if(!x)return;ct.set(C.pointerId,{x:C.clientX,y:C.clientY});try{i.setPointerCapture(C.pointerId)}catch{}if(fe=null,b=1,ct.size===2){un(),Lt=null,Tt={d0:D(),z0:K.zoom};return}if(ct.size>2)return;const A=x.deplacable?cn(C.clientX,C.clientY):null,Q=A?f.get(A):null,oe=ln(C.clientX,C.clientY);if(!oe)return;if(C.preventDefault(),!A||!Q){Lt={p:oe};return}const te=g.find(we=>we.id===A),be=x.r.deplacements[A]??[0,0];Ye={id:A,grp:Q,depart:be,decal:new T(oe.x-(te.a[0]+be[0]),0,oe.z-(te.a[1]+be[1])),dernier:be,bloque:!1,pointeur:C.pointerId},Q.position.y=.18,Q.userData.zone.visible=!0,Q.userData.zone.material=l.libre,n.shadowMap.needsUpdate=!0,Ue()}),i.addEventListener("pointermove",C=>{if(ct.has(C.pointerId)&&ct.set(C.pointerId,{x:C.clientX,y:C.clientY}),Tt&&ct.size>=2){K.zoom=Math.max(.9,Math.min(3.2,Tt.z0*D()/Tt.d0)),E(),Ue();return}if(Lt){const Ie=ln(C.clientX,C.clientY);if(!Ie)return;K.cible.x+=Lt.p.x-Ie.x,K.cible.z+=Lt.p.z-Ie.z,Nn(),E(),Ue();return}const A=Ye;if(!A||!x)return;const Q=ln(C.clientX,C.clientY),oe=g.find(Ie=>Ie.id===A.id),te=x.r.salle.n;if(!Q)return;let be=Q.x-A.decal.x-oe.a[0],we=Q.z-A.decal.z-oe.a[1];be=Math.round(be*4)/4,we=Math.round(we*4)/4,be=Math.max(.6-oe.a[0],Math.min(te-.6-oe.a[0],be)),we=Math.max(.6-oe.a[1],Math.min(te-.6-oe.a[1],we)),(be!==A.dernier[0]||we!==A.dernier[1])&&(A.dernier=[be,we],A.grp.position.x=oe.a[0]+be,A.grp.position.z=oe.a[1]+we,A.bloque=ah(A.id,be,we,g,x.r),A.grp.userData.zone.material=A.bloque?l.refus:l.libre,n.shadowMap.needsUpdate=!0),Ue()});function dt(C){ct.delete(C.pointerId);try{i.releasePointerCapture(C.pointerId)}catch{}if(Tt){ct.size<2&&(Tt=null);return}Lt=null;const A=Ye;if(Ye=null,!A||!x)return;const Q=g.find(te=>te.id===A.id),oe=[Q.a[0]+A.depart[0],Q.a[1]+A.depart[1]];A.bloque?(t.onRefus(),x.reduit?(A.grp.position.set(oe[0],0,oe[1]),U()):Ee={id:A.id,t0:performance.now(),de:[Q.a[0]+A.dernier[0],Q.a[1]+A.dernier[1]],vers:oe}):(A.grp.userData.zone.material=l.halo,A.grp.userData.zone.visible=x.deplacable,(A.dernier[0]!==A.depart[0]||A.dernier[1]!==A.depart[1])&&t.onDeplacer(A.id,A.dernier[0],A.dernier[1]),x.reduit?A.grp.position.y=0:ge.set(A.id,{t0:performance.now()})),n.shadowMap.needsUpdate=!0,Ue()}return i.addEventListener("pointerup",dt),i.addEventListener("pointercancel",dt),i.addEventListener("wheel",C=>{C.preventDefault(),Se=Math.max(.9,Math.min(3.2,K.zoom*(C.deltaY<0?1.12:.9))),K.zoom=Se,fe=null,b=1,E(),Ue()},{passive:!1}),i.addEventListener("dblclick",()=>le()),{maj(C){var Q;const A=x;x=C,(!A||A.r!==C.r)&&(Pe(C),Z(C)),(!A||A.final!==C.final)&&$(C,A),A&&A.nuit!==C.nuit&&(C.reduit?(Le=C.nuit,He=null):He={t0:performance.now(),de:Le,vers:C.nuit}),A||(Le=C.nuit),(!A||A.nuit!==C.nuit||A.r!==C.r)&&(ie(Le),(!A||A.r!==C.r||A.nuit>.5!=C.nuit>.5)&&Me(C)),i.style.touchAction="none",A&&A.deplacable!==C.deplacable&&U(),C.focus&&A&&((Q=A.focus)==null?void 0:Q.n)!==C.focus.n&&X(C),i.style.cursor=C.deplacable?"grab":"default",ce||(ce=!0,se()),Ue()},vueEnsemble:()=>le(),position:C=>{const A=f.get(C);return A?[A.position.x,A.position.z]:null},ecran:(C,A)=>{const Q=new T(C,0,A).project(o),oe=i.getBoundingClientRect();return[oe.left+(Q.x+1)/2*oe.width,oe.top+(1-Q.y)/2*oe.height]},ecranObjet:C=>{const A=f.get(C);if(!A)return null;const Q=new T(A.position.x,.3,A.position.z).project(o),oe=i.getBoundingClientRect();return[oe.left+(Q.x+1)/2*oe.width,oe.top+(1-Q.y)/2*oe.height]},generiques:()=>[...f.values()].filter(C=>C.userData.generique).map(C=>C.userData.id),chaises:C=>{var A;return((A=f.get(C))==null?void 0:A.userData.chaises)??[]},dims:C=>{var Q;const A=(Q=f.get(C))==null?void 0:Q.userData;return A?{w:A.w,d:A.d}:null},vers(C,A){const Q=f.get(C);Q&&(fe=null,b=1,K.cible.set(Q.position.x,.4,Q.position.z),K.zoom=A,E(),Ue())},sous:(C,A)=>cn(C,A),stats:()=>({appels:Ke,triangles:Te,objets:g.length,zoom:+K.zoom.toFixed(3),cible:[+K.cible.x.toFixed(2),+K.cible.z.toFixed(2)],invites:(z==null?void 0:z.cibles.length)??0}),detruire(){he.disconnect(),i.removeEventListener("webglcontextlost",re),i.removeEventListener("webglcontextrestored",Ue);for(const C of[v,ue,ee])C&&m(C);z&&(z.corps.dispose(),z.tete.dispose()),th();for(const C of Object.values(l))C.dispose();for(const C of Object.values(h))C.dispose();d.dispose(),p.dispose(),n.dispose(),n.forceContextLoss()}}}export{fh as creerMoteur};
