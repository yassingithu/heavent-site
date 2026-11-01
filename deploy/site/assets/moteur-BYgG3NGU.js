import{G as jr,P as Ji,R as yn}from"./HeaventCityPage-M9kdTLpS.js";import"./ui-BOdoyUwa.js";import"./react-Bzi8RjEM.js";import"./index-BdnZ51qo.js";import"./supabase-CvE19BdH.js";import"./logo-heavent-or-B4tRtY98.js";import"./logo-nawar-CoKiAGys.js";/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ca="169",No=1,Oo=2,gn=3,Dn=0,Nt=1,Ls=2,Wn=100,Pa=204,La=205,Fo=0,El=1,bl=2,Ln=0,Tl=1,wl=2,Al=3,Bo=4,Rl=5,Cl=6,Pl=7,zo=300,vi=301,xi=302,Da=303,Ua=304,zr=306,Vi=1e3,ki=1001,Ia=1002,jt=1003,Ll=1004,$i=1005,sn=1006,qr=1007,fi=1008,_n=1009,Ho=1010,Go=1011,Wi=1012,ds=1013,jn=1014,on=1015,qi=1016,ps=1017,fs=1018,Mi=1020,Vo=35902,ko=1021,Wo=1022,tn=1023,Xo=1024,jo=1025,Xi=1026,Si=1027,ms=1028,gs=1029,qo=1030,_s=1031,vs=1033,yr=33776,Er=33777,br=33778,Tr=33779,Na=35840,Oa=35841,Fa=35842,Ba=35843,za=36196,Ha=37492,Ga=37496,Va=37808,ka=37809,Wa=37810,Xa=37811,ja=37812,qa=37813,Ya=37814,Ka=37815,Za=37816,Ja=37817,$a=37818,Qa=37819,es=37820,ts=37821,wr=36492,ns=36494,is=36495,Yo=36283,rs=36284,as=36285,ss=36286,pi="",kt="srgb",In="srgb-linear",xs="display-p3",Hr="display-p3-linear",Lr="linear",ct="srgb",Dr="rec709",Ur="p3",$n=7680,Ko=515,Ds=35044,Us="300 es",yi=2e3,Ir=2001;class bi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;const n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;const n=this._listeners[e];if(n!==void 0){const r=n.indexOf(t);r!==-1&&n.splice(r,1)}}dispatchEvent(e){if(this._listeners===void 0)return;const t=this._listeners[e.type];if(t!==void 0){e.target=this;const n=t.slice(0);for(let r=0,a=n.length;r<a;r++)n[r].call(this,e);e.target=null}}}const Rt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Yr=Math.PI/180,os=180/Math.PI;function Yi(){const i=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(Rt[255&i]+Rt[i>>8&255]+Rt[i>>16&255]+Rt[i>>24&255]+"-"+Rt[255&e]+Rt[e>>8&255]+"-"+Rt[e>>16&15|64]+Rt[e>>24&255]+"-"+Rt[63&t|128]+Rt[t>>8&255]+"-"+Rt[t>>16&255]+Rt[t>>24&255]+Rt[255&n]+Rt[n>>8&255]+Rt[n>>16&255]+Rt[n>>24&255]).toLowerCase()}function It(i,e,t){return Math.max(e,Math.min(t,i))}function Dl(i,e){return(i%e+e)%e}function Kr(i,e,t){return(1-t)*i+t*e}function Ci(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Ut(i,e){switch(e.constructor){case Float32Array:return i;case Uint32Array:return Math.round(4294967295*i);case Uint16Array:return Math.round(65535*i);case Uint8Array:return Math.round(255*i);case Int32Array:return Math.round(2147483647*i);case Int16Array:return Math.round(32767*i);case Int8Array:return Math.round(127*i);default:throw new Error("Invalid component type.")}}class ze{constructor(e=0,t=0){ze.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6],this.y=r[1]*t+r[4]*n+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(It(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),r=Math.sin(t),a=this.x-e.x,o=this.y-e.y;return this.x=a*n-o*r+e.x,this.y=a*r+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ge{constructor(e,t,n,r,a,o,u,s,c){Ge.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,r,a,o,u,s,c)}set(e,t,n,r,a,o,u,s,c){const l=this.elements;return l[0]=e,l[1]=r,l[2]=u,l[3]=t,l[4]=a,l[5]=s,l[6]=n,l[7]=o,l[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,a=this.elements,o=n[0],u=n[3],s=n[6],c=n[1],l=n[4],h=n[7],d=n[2],p=n[5],m=n[8],_=r[0],g=r[3],f=r[6],v=r[1],x=r[4],M=r[7],w=r[2],R=r[5],P=r[8];return a[0]=o*_+u*v+s*w,a[3]=o*g+u*x+s*R,a[6]=o*f+u*M+s*P,a[1]=c*_+l*v+h*w,a[4]=c*g+l*x+h*R,a[7]=c*f+l*M+h*P,a[2]=d*_+p*v+m*w,a[5]=d*g+p*x+m*R,a[8]=d*f+p*M+m*P,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],r=e[2],a=e[3],o=e[4],u=e[5],s=e[6],c=e[7],l=e[8];return t*o*l-t*u*c-n*a*l+n*u*s+r*a*c-r*o*s}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],a=e[3],o=e[4],u=e[5],s=e[6],c=e[7],l=e[8],h=l*o-u*c,d=u*s-l*a,p=c*a-o*s,m=t*h+n*d+r*p;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/m;return e[0]=h*_,e[1]=(r*c-l*n)*_,e[2]=(u*n-r*o)*_,e[3]=d*_,e[4]=(l*t-r*s)*_,e[5]=(r*a-u*t)*_,e[6]=p*_,e[7]=(n*s-c*t)*_,e[8]=(o*t-n*a)*_,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,r,a,o,u){const s=Math.cos(a),c=Math.sin(a);return this.set(n*s,n*c,-n*(s*o+c*u)+o+e,-r*c,r*s,-r*(-c*o+s*u)+u+t,0,0,1),this}scale(e,t){return this.premultiply(Zr.makeScale(e,t)),this}rotate(e){return this.premultiply(Zr.makeRotation(-e)),this}translate(e,t){return this.premultiply(Zr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<9;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Zr=new Ge;function Zo(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function Nr(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Ul(){const i=Nr("canvas");return i.style.display="block",i}const Is={};function Ar(i){i in Is||(Is[i]=!0,console.warn(i))}const Ns=new Ge().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Os=new Ge().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Pi={[In]:{transfer:Lr,primaries:Dr,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i,fromReference:i=>i},[kt]:{transfer:ct,primaries:Dr,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Hr]:{transfer:Lr,primaries:Ur,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.applyMatrix3(Os),fromReference:i=>i.applyMatrix3(Ns)},[xs]:{transfer:ct,primaries:Ur,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.convertSRGBToLinear().applyMatrix3(Os),fromReference:i=>i.applyMatrix3(Ns).convertLinearToSRGB()}},Il=new Set([In,Hr]),it={enabled:!0,_workingColorSpace:In,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Il.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,e,t){if(this.enabled===!1||e===t||!e||!t)return i;const n=Pi[e].toReference;return(0,Pi[t].fromReference)(n(i))},fromWorkingColorSpace:function(i,e){return this.convert(i,this._workingColorSpace,e)},toWorkingColorSpace:function(i,e){return this.convert(i,e,this._workingColorSpace)},getPrimaries:function(i){return Pi[i].primaries},getTransfer:function(i){return i===pi?Lr:Pi[i].transfer},getLuminanceCoefficients:function(i,e=this._workingColorSpace){return i.fromArray(Pi[e].luminanceCoefficients)}};function gi(i){return i<.04045?.0773993808*i:Math.pow(.9478672986*i+.0521327014,2.4)}function Jr(i){return i<.0031308?12.92*i:1.055*Math.pow(i,.41666)-.055}let Qn;class Nl{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Qn===void 0&&(Qn=Nr("canvas")),Qn.width=e.width,Qn.height=e.height;const n=Qn.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Qn}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Nr("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const r=n.getImageData(0,0,e.width,e.height),a=r.data;for(let o=0;o<a.length;o++)a[o]=255*gi(a[o]/255);return n.putImageData(r,0,0),t}if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(255*gi(t[n]/255)):t[n]=gi(t[n]);return{data:t,width:e.width,height:e.height}}return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Ol=0;class Jo{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ol++}),this.uuid=Yi(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},r=this.data;if(r!==null){let a;if(Array.isArray(r)){a=[];for(let o=0,u=r.length;o<u;o++)r[o].isDataTexture?a.push($r(r[o].image)):a.push($r(r[o]))}else a=$r(r);n.url=a}return t||(e.images[this.uuid]=n),n}}function $r(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?Nl.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Fl=0;class Pt extends bi{constructor(e=Pt.DEFAULT_IMAGE,t=Pt.DEFAULT_MAPPING,n=1001,r=1001,a=1006,o=1008,u=tn,s=_n,c=Pt.DEFAULT_ANISOTROPY,l=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Fl++}),this.uuid=Yi(),this.name="",this.source=new Jo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=r,this.magFilter=a,this.minFilter=o,this.anisotropy=c,this.format=u,this.internalFormat=null,this.type=s,this.offset=new ze(0,0),this.repeat=new ze(1,1),this.center=new ze(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ge,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=l,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==zo)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Vi:e.x=e.x-Math.floor(e.x);break;case ki:e.x=e.x<0?0:1;break;case Ia:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case Vi:e.y=e.y-Math.floor(e.y);break;case ki:e.y=e.y<0?0:1;break;case Ia:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Pt.DEFAULT_IMAGE=null,Pt.DEFAULT_MAPPING=zo,Pt.DEFAULT_ANISOTROPY=1;class rt{constructor(e=0,t=0,n=0,r=1){rt.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,r){return this.x=e,this.y=t,this.z=n,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,a=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*r+o[12]*a,this.y=o[1]*t+o[5]*n+o[9]*r+o[13]*a,this.z=o[2]*t+o[6]*n+o[10]*r+o[14]*a,this.w=o[3]*t+o[7]*n+o[11]*r+o[15]*a,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,r,a;const s=e.elements,c=s[0],l=s[4],h=s[8],d=s[1],p=s[5],m=s[9],_=s[2],g=s[6],f=s[10];if(Math.abs(l-d)<.01&&Math.abs(h-_)<.01&&Math.abs(m-g)<.01){if(Math.abs(l+d)<.1&&Math.abs(h+_)<.1&&Math.abs(m+g)<.1&&Math.abs(c+p+f-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const x=(c+1)/2,M=(p+1)/2,w=(f+1)/2,R=(l+d)/4,P=(h+_)/4,q=(m+g)/4;return x>M&&x>w?x<.01?(n=0,r=.707106781,a=.707106781):(n=Math.sqrt(x),r=R/n,a=P/n):M>w?M<.01?(n=.707106781,r=0,a=.707106781):(r=Math.sqrt(M),n=R/r,a=q/r):w<.01?(n=.707106781,r=.707106781,a=0):(a=Math.sqrt(w),n=P/a,r=q/a),this.set(n,r,a,t),this}let v=Math.sqrt((g-m)*(g-m)+(h-_)*(h-_)+(d-l)*(d-l));return Math.abs(v)<.001&&(v=1),this.x=(g-m)/v,this.y=(h-_)/v,this.z=(d-l)/v,this.w=Math.acos((c+p+f-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Bl extends bi{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new rt(0,0,e,t),this.scissorTest=!1,this.viewport=new rt(0,0,e,t);const r={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:sn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const a=new Pt(r,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);a.flipY=!1,a.generateMipmaps=n.generateMipmaps,a.internalFormat=n.internalFormat,this.textures=[];const o=n.count;for(let u=0;u<o;u++)this.textures[u]=a.clone(),this.textures[u].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let r=0,a=this.textures.length;r<a;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,r=e.textures.length;n<r;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const t=Object.assign({},e.texture.image);return this.texture.source=new Jo(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class qn extends Bl{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class $o extends Pt{constructor(e=null,t=1,n=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=jt,this.minFilter=jt,this.wrapR=ki,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class zl extends Pt{constructor(e=null,t=1,n=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:r},this.magFilter=jt,this.minFilter=jt,this.wrapR=ki,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ln{constructor(e=0,t=0,n=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=r}static slerpFlat(e,t,n,r,a,o,u){let s=n[r+0],c=n[r+1],l=n[r+2],h=n[r+3];const d=a[o+0],p=a[o+1],m=a[o+2],_=a[o+3];if(u===0)return e[t+0]=s,e[t+1]=c,e[t+2]=l,void(e[t+3]=h);if(u===1)return e[t+0]=d,e[t+1]=p,e[t+2]=m,void(e[t+3]=_);if(h!==_||s!==d||c!==p||l!==m){let g=1-u;const f=s*d+c*p+l*m+h*_,v=f>=0?1:-1,x=1-f*f;if(x>Number.EPSILON){const w=Math.sqrt(x),R=Math.atan2(w,f*v);g=Math.sin(g*R)/w,u=Math.sin(u*R)/w}const M=u*v;if(s=s*g+d*M,c=c*g+p*M,l=l*g+m*M,h=h*g+_*M,g===1-u){const w=1/Math.sqrt(s*s+c*c+l*l+h*h);s*=w,c*=w,l*=w,h*=w}}e[t]=s,e[t+1]=c,e[t+2]=l,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,r,a,o){const u=n[r],s=n[r+1],c=n[r+2],l=n[r+3],h=a[o],d=a[o+1],p=a[o+2],m=a[o+3];return e[t]=u*m+l*h+s*p-c*d,e[t+1]=s*m+l*d+c*h-u*p,e[t+2]=c*m+l*p+u*d-s*h,e[t+3]=l*m-u*h-s*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,r){return this._x=e,this._y=t,this._z=n,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,r=e._y,a=e._z,o=e._order,u=Math.cos,s=Math.sin,c=u(n/2),l=u(r/2),h=u(a/2),d=s(n/2),p=s(r/2),m=s(a/2);switch(o){case"XYZ":this._x=d*l*h+c*p*m,this._y=c*p*h-d*l*m,this._z=c*l*m+d*p*h,this._w=c*l*h-d*p*m;break;case"YXZ":this._x=d*l*h+c*p*m,this._y=c*p*h-d*l*m,this._z=c*l*m-d*p*h,this._w=c*l*h+d*p*m;break;case"ZXY":this._x=d*l*h-c*p*m,this._y=c*p*h+d*l*m,this._z=c*l*m+d*p*h,this._w=c*l*h-d*p*m;break;case"ZYX":this._x=d*l*h-c*p*m,this._y=c*p*h+d*l*m,this._z=c*l*m-d*p*h,this._w=c*l*h+d*p*m;break;case"YZX":this._x=d*l*h+c*p*m,this._y=c*p*h+d*l*m,this._z=c*l*m-d*p*h,this._w=c*l*h-d*p*m;break;case"XZY":this._x=d*l*h-c*p*m,this._y=c*p*h-d*l*m,this._z=c*l*m+d*p*h,this._w=c*l*h+d*p*m;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,r=Math.sin(n);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],r=t[4],a=t[8],o=t[1],u=t[5],s=t[9],c=t[2],l=t[6],h=t[10],d=n+u+h;if(d>0){const p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(l-s)*p,this._y=(a-c)*p,this._z=(o-r)*p}else if(n>u&&n>h){const p=2*Math.sqrt(1+n-u-h);this._w=(l-s)/p,this._x=.25*p,this._y=(r+o)/p,this._z=(a+c)/p}else if(u>h){const p=2*Math.sqrt(1+u-n-h);this._w=(a-c)/p,this._x=(r+o)/p,this._y=.25*p,this._z=(s+l)/p}else{const p=2*Math.sqrt(1+h-n-u);this._w=(o-r)/p,this._x=(a+c)/p,this._y=(s+l)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(It(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const r=Math.min(1,t/n);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,r=e._y,a=e._z,o=e._w,u=t._x,s=t._y,c=t._z,l=t._w;return this._x=n*l+o*u+r*c-a*s,this._y=r*l+o*s+a*u-n*c,this._z=a*l+o*c+n*s-r*u,this._w=o*l-n*u-r*s-a*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,r=this._y,a=this._z,o=this._w;let u=o*e._w+n*e._x+r*e._y+a*e._z;if(u<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,u=-u):this.copy(e),u>=1)return this._w=o,this._x=n,this._y=r,this._z=a,this;const s=1-u*u;if(s<=Number.EPSILON){const p=1-t;return this._w=p*o+t*this._w,this._x=p*n+t*this._x,this._y=p*r+t*this._y,this._z=p*a+t*this._z,this.normalize(),this}const c=Math.sqrt(s),l=Math.atan2(c,u),h=Math.sin((1-t)*l)/c,d=Math.sin(t*l)/c;return this._w=o*h+this._w*d,this._x=n*h+this._x*d,this._y=r*h+this._y*d,this._z=a*h+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),r=Math.sqrt(1-n),a=Math.sqrt(n);return this.set(r*Math.sin(e),r*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class A{constructor(e=0,t=0,n=0){A.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Fs.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Fs.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[3]*n+a[6]*r,this.y=a[1]*t+a[4]*n+a[7]*r,this.z=a[2]*t+a[5]*n+a[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,r=this.z,a=e.elements,o=1/(a[3]*t+a[7]*n+a[11]*r+a[15]);return this.x=(a[0]*t+a[4]*n+a[8]*r+a[12])*o,this.y=(a[1]*t+a[5]*n+a[9]*r+a[13])*o,this.z=(a[2]*t+a[6]*n+a[10]*r+a[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,r=this.z,a=e.x,o=e.y,u=e.z,s=e.w,c=2*(o*r-u*n),l=2*(u*t-a*r),h=2*(a*n-o*t);return this.x=t+s*c+o*h-u*l,this.y=n+s*l+u*c-a*h,this.z=r+s*h+a*l-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,r=this.z,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*r,this.y=a[1]*t+a[5]*n+a[9]*r,this.z=a[2]*t+a[6]*n+a[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,r=e.y,a=e.z,o=t.x,u=t.y,s=t.z;return this.x=r*s-a*u,this.y=a*o-n*s,this.z=n*u-r*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Qr.copy(this).projectOnVector(e),this.sub(Qr)}reflect(e){return this.sub(Qr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(It(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,r=this.z-e.z;return t*t+n*n+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const r=Math.sin(t)*e;return this.x=r*Math.sin(n),this.y=Math.cos(t)*e,this.z=r*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=2*Math.random()-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Qr=new A,Fs=new ln;class vn{constructor(e=new A(1/0,1/0,1/0),t=new A(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Jt.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Jt.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Jt.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const a=n.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0)for(let o=0,u=a.count;o<u;o++)e.isMesh===!0?e.getVertexPosition(o,Jt):Jt.fromBufferAttribute(a,o),Jt.applyMatrix4(e.matrixWorld),this.expandByPoint(Jt);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Qi.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Qi.copy(n.boundingBox)),Qi.applyMatrix4(e.matrixWorld),this.union(Qi)}const r=e.children;for(let a=0,o=r.length;a<o;a++)this.expandByObject(r[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Jt),Jt.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Li),er.subVectors(this.max,Li),ei.subVectors(e.a,Li),ti.subVectors(e.b,Li),ni.subVectors(e.c,Li),En.subVectors(ti,ei),bn.subVectors(ni,ti),Fn.subVectors(ei,ni);let t=[0,-En.z,En.y,0,-bn.z,bn.y,0,-Fn.z,Fn.y,En.z,0,-En.x,bn.z,0,-bn.x,Fn.z,0,-Fn.x,-En.y,En.x,0,-bn.y,bn.x,0,-Fn.y,Fn.x,0];return!!ea(t,ei,ti,ni,er)&&(t=[1,0,0,0,1,0,0,0,1],!!ea(t,ei,ti,ni,er)&&(tr.crossVectors(En,bn),t=[tr.x,tr.y,tr.z],ea(t,ei,ti,ni,er)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Jt).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(Jt).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(cn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),cn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),cn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),cn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),cn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),cn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),cn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),cn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(cn)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}}const cn=[new A,new A,new A,new A,new A,new A,new A,new A],Jt=new A,Qi=new vn,ei=new A,ti=new A,ni=new A,En=new A,bn=new A,Fn=new A,Li=new A,er=new A,tr=new A,Bn=new A;function ea(i,e,t,n,r){for(let a=0,o=i.length-3;a<=o;a+=3){Bn.fromArray(i,a);const u=r.x*Math.abs(Bn.x)+r.y*Math.abs(Bn.y)+r.z*Math.abs(Bn.z),s=e.dot(Bn),c=t.dot(Bn),l=n.dot(Bn);if(Math.max(-Math.max(s,c,l),Math.min(s,c,l))>u)return!1}return!0}const Hl=new vn,Di=new A,ta=new A;class xn{constructor(e=new A,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Hl.setFromPoints(e).getCenter(n);let r=0;for(let a=0,o=e.length;a<o;a++)r=Math.max(r,n.distanceToSquared(e[a]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Di.subVectors(e,this.center);const t=Di.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),r=.5*(n-this.radius);this.center.addScaledVector(Di,r/n),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(ta.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Di.copy(e.center).add(ta)),this.expandByPoint(Di.copy(e.center).sub(ta))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}}const un=new A,na=new A,nr=new A,Tn=new A,ia=new A,ir=new A,ra=new A;class Ki{constructor(e=new A,t=new A(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,un)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=un.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(un.copy(this.origin).addScaledVector(this.direction,t),un.distanceToSquared(e))}distanceSqToSegment(e,t,n,r){na.copy(e).add(t).multiplyScalar(.5),nr.copy(t).sub(e).normalize(),Tn.copy(this.origin).sub(na);const a=.5*e.distanceTo(t),o=-this.direction.dot(nr),u=Tn.dot(this.direction),s=-Tn.dot(nr),c=Tn.lengthSq(),l=Math.abs(1-o*o);let h,d,p,m;if(l>0)if(h=o*s-u,d=o*u-s,m=a*l,h>=0)if(d>=-m)if(d<=m){const _=1/l;h*=_,d*=_,p=h*(h+o*d+2*u)+d*(o*h+d+2*s)+c}else d=a,h=Math.max(0,-(o*d+u)),p=-h*h+d*(d+2*s)+c;else d=-a,h=Math.max(0,-(o*d+u)),p=-h*h+d*(d+2*s)+c;else d<=-m?(h=Math.max(0,-(-o*a+u)),d=h>0?-a:Math.min(Math.max(-a,-s),a),p=-h*h+d*(d+2*s)+c):d<=m?(h=0,d=Math.min(Math.max(-a,-s),a),p=d*(d+2*s)+c):(h=Math.max(0,-(o*a+u)),d=h>0?a:Math.min(Math.max(-a,-s),a),p=-h*h+d*(d+2*s)+c);else d=o>0?-a:a,h=Math.max(0,-(o*d+u)),p=-h*h+d*(d+2*s)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),r&&r.copy(na).addScaledVector(nr,d),p}intersectSphere(e,t){un.subVectors(e.center,this.origin);const n=un.dot(this.direction),r=un.dot(un)-n*n,a=e.radius*e.radius;if(r>a)return null;const o=Math.sqrt(a-r),u=n-o,s=n+o;return s<0?null:u<0?this.at(s,t):this.at(u,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,r,a,o,u,s;const c=1/this.direction.x,l=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),l>=0?(a=(e.min.y-d.y)*l,o=(e.max.y-d.y)*l):(a=(e.max.y-d.y)*l,o=(e.min.y-d.y)*l),n>o||a>r?null:((a>n||isNaN(n))&&(n=a),(o<r||isNaN(r))&&(r=o),h>=0?(u=(e.min.z-d.z)*h,s=(e.max.z-d.z)*h):(u=(e.max.z-d.z)*h,s=(e.min.z-d.z)*h),n>s||u>r?null:((u>n||n!=n)&&(n=u),(s<r||r!=r)&&(r=s),r<0?null:this.at(n>=0?n:r,t)))}intersectsBox(e){return this.intersectBox(e,un)!==null}intersectTriangle(e,t,n,r,a){ia.subVectors(t,e),ir.subVectors(n,e),ra.crossVectors(ia,ir);let o,u=this.direction.dot(ra);if(u>0){if(r)return null;o=1}else{if(!(u<0))return null;o=-1,u=-u}Tn.subVectors(this.origin,e);const s=o*this.direction.dot(ir.crossVectors(Tn,ir));if(s<0)return null;const c=o*this.direction.dot(ia.cross(Tn));if(c<0||s+c>u)return null;const l=-o*Tn.dot(ra);return l<0?null:this.at(l/u,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Pe{constructor(e,t,n,r,a,o,u,s,c,l,h,d,p,m,_,g){Pe.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,r,a,o,u,s,c,l,h,d,p,m,_,g)}set(e,t,n,r,a,o,u,s,c,l,h,d,p,m,_,g){const f=this.elements;return f[0]=e,f[4]=t,f[8]=n,f[12]=r,f[1]=a,f[5]=o,f[9]=u,f[13]=s,f[2]=c,f[6]=l,f[10]=h,f[14]=d,f[3]=p,f[7]=m,f[11]=_,f[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Pe().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,r=1/ii.setFromMatrixColumn(e,0).length(),a=1/ii.setFromMatrixColumn(e,1).length(),o=1/ii.setFromMatrixColumn(e,2).length();return t[0]=n[0]*r,t[1]=n[1]*r,t[2]=n[2]*r,t[3]=0,t[4]=n[4]*a,t[5]=n[5]*a,t[6]=n[6]*a,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,r=e.y,a=e.z,o=Math.cos(n),u=Math.sin(n),s=Math.cos(r),c=Math.sin(r),l=Math.cos(a),h=Math.sin(a);if(e.order==="XYZ"){const d=o*l,p=o*h,m=u*l,_=u*h;t[0]=s*l,t[4]=-s*h,t[8]=c,t[1]=p+m*c,t[5]=d-_*c,t[9]=-u*s,t[2]=_-d*c,t[6]=m+p*c,t[10]=o*s}else if(e.order==="YXZ"){const d=s*l,p=s*h,m=c*l,_=c*h;t[0]=d+_*u,t[4]=m*u-p,t[8]=o*c,t[1]=o*h,t[5]=o*l,t[9]=-u,t[2]=p*u-m,t[6]=_+d*u,t[10]=o*s}else if(e.order==="ZXY"){const d=s*l,p=s*h,m=c*l,_=c*h;t[0]=d-_*u,t[4]=-o*h,t[8]=m+p*u,t[1]=p+m*u,t[5]=o*l,t[9]=_-d*u,t[2]=-o*c,t[6]=u,t[10]=o*s}else if(e.order==="ZYX"){const d=o*l,p=o*h,m=u*l,_=u*h;t[0]=s*l,t[4]=m*c-p,t[8]=d*c+_,t[1]=s*h,t[5]=_*c+d,t[9]=p*c-m,t[2]=-c,t[6]=u*s,t[10]=o*s}else if(e.order==="YZX"){const d=o*s,p=o*c,m=u*s,_=u*c;t[0]=s*l,t[4]=_-d*h,t[8]=m*h+p,t[1]=h,t[5]=o*l,t[9]=-u*l,t[2]=-c*l,t[6]=p*h+m,t[10]=d-_*h}else if(e.order==="XZY"){const d=o*s,p=o*c,m=u*s,_=u*c;t[0]=s*l,t[4]=-h,t[8]=c*l,t[1]=d*h+_,t[5]=o*l,t[9]=p*h-m,t[2]=m*h-p,t[6]=u*l,t[10]=_*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(Gl,e,Vl)}lookAt(e,t,n){const r=this.elements;return Bt.subVectors(e,t),Bt.lengthSq()===0&&(Bt.z=1),Bt.normalize(),wn.crossVectors(n,Bt),wn.lengthSq()===0&&(Math.abs(n.z)===1?Bt.x+=1e-4:Bt.z+=1e-4,Bt.normalize(),wn.crossVectors(n,Bt)),wn.normalize(),rr.crossVectors(Bt,wn),r[0]=wn.x,r[4]=rr.x,r[8]=Bt.x,r[1]=wn.y,r[5]=rr.y,r[9]=Bt.y,r[2]=wn.z,r[6]=rr.z,r[10]=Bt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,r=t.elements,a=this.elements,o=n[0],u=n[4],s=n[8],c=n[12],l=n[1],h=n[5],d=n[9],p=n[13],m=n[2],_=n[6],g=n[10],f=n[14],v=n[3],x=n[7],M=n[11],w=n[15],R=r[0],P=r[4],q=r[8],U=r[12],k=r[1],K=r[5],F=r[9],Z=r[13],j=r[2],J=r[6],z=r[10],re=r[14],ue=r[3],fe=r[7],Ae=r[11],Q=r[15];return a[0]=o*R+u*k+s*j+c*ue,a[4]=o*P+u*K+s*J+c*fe,a[8]=o*q+u*F+s*z+c*Ae,a[12]=o*U+u*Z+s*re+c*Q,a[1]=l*R+h*k+d*j+p*ue,a[5]=l*P+h*K+d*J+p*fe,a[9]=l*q+h*F+d*z+p*Ae,a[13]=l*U+h*Z+d*re+p*Q,a[2]=m*R+_*k+g*j+f*ue,a[6]=m*P+_*K+g*J+f*fe,a[10]=m*q+_*F+g*z+f*Ae,a[14]=m*U+_*Z+g*re+f*Q,a[3]=v*R+x*k+M*j+w*ue,a[7]=v*P+x*K+M*J+w*fe,a[11]=v*q+x*F+M*z+w*Ae,a[15]=v*U+x*Z+M*re+w*Q,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],r=e[8],a=e[12],o=e[1],u=e[5],s=e[9],c=e[13],l=e[2],h=e[6],d=e[10],p=e[14];return e[3]*(+a*s*h-r*c*h-a*u*d+n*c*d+r*u*p-n*s*p)+e[7]*(+t*s*p-t*c*d+a*o*d-r*o*p+r*c*l-a*s*l)+e[11]*(+t*c*h-t*u*p-a*o*h+n*o*p+a*u*l-n*c*l)+e[15]*(-r*u*l-t*s*h+t*u*d+r*o*h-n*o*d+n*s*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],r=e[2],a=e[3],o=e[4],u=e[5],s=e[6],c=e[7],l=e[8],h=e[9],d=e[10],p=e[11],m=e[12],_=e[13],g=e[14],f=e[15],v=h*g*c-_*d*c+_*s*p-u*g*p-h*s*f+u*d*f,x=m*d*c-l*g*c-m*s*p+o*g*p+l*s*f-o*d*f,M=l*_*c-m*h*c+m*u*p-o*_*p-l*u*f+o*h*f,w=m*h*s-l*_*s-m*u*d+o*_*d+l*u*g-o*h*g,R=t*v+n*x+r*M+a*w;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const P=1/R;return e[0]=v*P,e[1]=(_*d*a-h*g*a-_*r*p+n*g*p+h*r*f-n*d*f)*P,e[2]=(u*g*a-_*s*a+_*r*c-n*g*c-u*r*f+n*s*f)*P,e[3]=(h*s*a-u*d*a-h*r*c+n*d*c+u*r*p-n*s*p)*P,e[4]=x*P,e[5]=(l*g*a-m*d*a+m*r*p-t*g*p-l*r*f+t*d*f)*P,e[6]=(m*s*a-o*g*a-m*r*c+t*g*c+o*r*f-t*s*f)*P,e[7]=(o*d*a-l*s*a+l*r*c-t*d*c-o*r*p+t*s*p)*P,e[8]=M*P,e[9]=(m*h*a-l*_*a-m*n*p+t*_*p+l*n*f-t*h*f)*P,e[10]=(o*_*a-m*u*a+m*n*c-t*_*c-o*n*f+t*u*f)*P,e[11]=(l*u*a-o*h*a-l*n*c+t*h*c+o*n*p-t*u*p)*P,e[12]=w*P,e[13]=(l*_*r-m*h*r+m*n*d-t*_*d-l*n*g+t*h*g)*P,e[14]=(m*u*r-o*_*r-m*n*s+t*_*s+o*n*g-t*u*g)*P,e[15]=(o*h*r-l*u*r+l*n*s-t*h*s-o*n*d+t*u*d)*P,this}scale(e){const t=this.elements,n=e.x,r=e.y,a=e.z;return t[0]*=n,t[4]*=r,t[8]*=a,t[1]*=n,t[5]*=r,t[9]*=a,t[2]*=n,t[6]*=r,t[10]*=a,t[3]*=n,t[7]*=r,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,r))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),r=Math.sin(t),a=1-n,o=e.x,u=e.y,s=e.z,c=a*o,l=a*u;return this.set(c*o+n,c*u-r*s,c*s+r*u,0,c*u+r*s,l*u+n,l*s-r*o,0,c*s-r*u,l*s+r*o,a*s*s+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,r,a,o){return this.set(1,n,a,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,n){const r=this.elements,a=t._x,o=t._y,u=t._z,s=t._w,c=a+a,l=o+o,h=u+u,d=a*c,p=a*l,m=a*h,_=o*l,g=o*h,f=u*h,v=s*c,x=s*l,M=s*h,w=n.x,R=n.y,P=n.z;return r[0]=(1-(_+f))*w,r[1]=(p+M)*w,r[2]=(m-x)*w,r[3]=0,r[4]=(p-M)*R,r[5]=(1-(d+f))*R,r[6]=(g+v)*R,r[7]=0,r[8]=(m+x)*P,r[9]=(g-v)*P,r[10]=(1-(d+_))*P,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,n){const r=this.elements;let a=ii.set(r[0],r[1],r[2]).length();const o=ii.set(r[4],r[5],r[6]).length(),u=ii.set(r[8],r[9],r[10]).length();this.determinant()<0&&(a=-a),e.x=r[12],e.y=r[13],e.z=r[14],$t.copy(this);const s=1/a,c=1/o,l=1/u;return $t.elements[0]*=s,$t.elements[1]*=s,$t.elements[2]*=s,$t.elements[4]*=c,$t.elements[5]*=c,$t.elements[6]*=c,$t.elements[8]*=l,$t.elements[9]*=l,$t.elements[10]*=l,t.setFromRotationMatrix($t),n.x=a,n.y=o,n.z=u,this}makePerspective(e,t,n,r,a,o,u=2e3){const s=this.elements,c=2*a/(t-e),l=2*a/(n-r),h=(t+e)/(t-e),d=(n+r)/(n-r);let p,m;if(u===yi)p=-(o+a)/(o-a),m=-2*o*a/(o-a);else{if(u!==Ir)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+u);p=-o/(o-a),m=-o*a/(o-a)}return s[0]=c,s[4]=0,s[8]=h,s[12]=0,s[1]=0,s[5]=l,s[9]=d,s[13]=0,s[2]=0,s[6]=0,s[10]=p,s[14]=m,s[3]=0,s[7]=0,s[11]=-1,s[15]=0,this}makeOrthographic(e,t,n,r,a,o,u=2e3){const s=this.elements,c=1/(t-e),l=1/(n-r),h=1/(o-a),d=(t+e)*c,p=(n+r)*l;let m,_;if(u===yi)m=(o+a)*h,_=-2*h;else{if(u!==Ir)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+u);m=a*h,_=-1*h}return s[0]=2*c,s[4]=0,s[8]=0,s[12]=-d,s[1]=0,s[5]=2*l,s[9]=0,s[13]=-p,s[2]=0,s[6]=0,s[10]=_,s[14]=-m,s[3]=0,s[7]=0,s[11]=0,s[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let r=0;r<16;r++)if(t[r]!==n[r])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const ii=new A,$t=new Pe,Gl=new A(0,0,0),Vl=new A(1,1,1),wn=new A,rr=new A,Bt=new A,Bs=new Pe,zs=new ln;class Ot{constructor(e=0,t=0,n=0,r=Ot.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,r=this._order){return this._x=e,this._y=t,this._z=n,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const r=e.elements,a=r[0],o=r[4],u=r[8],s=r[1],c=r[5],l=r[9],h=r[2],d=r[6],p=r[10];switch(t){case"XYZ":this._y=Math.asin(It(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(-l,p),this._z=Math.atan2(-o,a)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-It(l,-1,1)),Math.abs(l)<.9999999?(this._y=Math.atan2(u,p),this._z=Math.atan2(s,c)):(this._y=Math.atan2(-h,a),this._z=0);break;case"ZXY":this._x=Math.asin(It(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(s,a));break;case"ZYX":this._y=Math.asin(-It(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(s,a)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(It(s,-1,1)),Math.abs(s)<.9999999?(this._x=Math.atan2(-l,c),this._y=Math.atan2(-h,a)):(this._x=0,this._y=Math.atan2(u,p));break;case"XZY":this._z=Math.asin(-It(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(u,a)):(this._x=Math.atan2(-l,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Bs.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Bs,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return zs.setFromEuler(this),this.setFromQuaternion(zs,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ot.DEFAULT_ORDER="XYZ";class Ms{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!=0}isEnabled(e){return(this.mask&(1<<e|0))!=0}}let kl=0;const Hs=new A,ri=new ln,hn=new Pe,ar=new A,Ui=new A,Wl=new A,Xl=new ln,Gs=new A(1,0,0),Vs=new A(0,1,0),ks=new A(0,0,1),Ws={type:"added"},jl={type:"removed"},ai={type:"childadded",child:null},aa={type:"childremoved",child:null};class bt extends bi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:kl++}),this.uuid=Yi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=bt.DEFAULT_UP.clone();const e=new A,t=new Ot,n=new ln,r=new A(1,1,1);t._onChange(function(){n.setFromEuler(t,!1)}),n._onChange(function(){t.setFromQuaternion(n,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Pe},normalMatrix:{value:new Ge}}),this.matrix=new Pe,this.matrixWorld=new Pe,this.matrixAutoUpdate=bt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ms,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ri.setFromAxisAngle(e,t),this.quaternion.multiply(ri),this}rotateOnWorldAxis(e,t){return ri.setFromAxisAngle(e,t),this.quaternion.premultiply(ri),this}rotateX(e){return this.rotateOnAxis(Gs,e)}rotateY(e){return this.rotateOnAxis(Vs,e)}rotateZ(e){return this.rotateOnAxis(ks,e)}translateOnAxis(e,t){return Hs.copy(e).applyQuaternion(this.quaternion),this.position.add(Hs.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Gs,e)}translateY(e){return this.translateOnAxis(Vs,e)}translateZ(e){return this.translateOnAxis(ks,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(hn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ar.copy(e):ar.set(e,t,n);const r=this.parent;this.updateWorldMatrix(!0,!1),Ui.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?hn.lookAt(Ui,ar,this.up):hn.lookAt(ar,Ui,this.up),this.quaternion.setFromRotationMatrix(hn),r&&(hn.extractRotation(r.matrixWorld),ri.setFromRotationMatrix(hn),this.quaternion.premultiply(ri.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ws),ai.child=e,this.dispatchEvent(ai),ai.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(jl),aa.child=e,this.dispatchEvent(aa),aa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),hn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),hn.multiply(e.parent.matrixWorld)),e.applyMatrix4(hn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ws),ai.child=e,this.dispatchEvent(ai),ai.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,r=this.children.length;n<r;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ui,e,Wl),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ui,Xl,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,r=t.length;n<r;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const r={};function a(u,s){return u[s.uuid]===void 0&&(u[s.uuid]=s.toJSON(e)),s.uuid}if(r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.visibility=this._visibility,r.active=this._active,r.bounds=this._bounds.map(u=>({boxInitialized:u.boxInitialized,boxMin:u.box.min.toArray(),boxMax:u.box.max.toArray(),sphereInitialized:u.sphereInitialized,sphereRadius:u.sphere.radius,sphereCenter:u.sphere.center.toArray()})),r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.geometryCount=this._geometryCount,r.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere={center:r.boundingSphere.center.toArray(),radius:r.boundingSphere.radius}),this.boundingBox!==null&&(r.boundingBox={min:r.boundingBox.min.toArray(),max:r.boundingBox.max.toArray()})),this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=a(e.geometries,this.geometry);const u=this.geometry.parameters;if(u!==void 0&&u.shapes!==void 0){const s=u.shapes;if(Array.isArray(s))for(let c=0,l=s.length;c<l;c++){const h=s[c];a(e.shapes,h)}else a(e.shapes,s)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const u=[];for(let s=0,c=this.material.length;s<c;s++)u.push(a(e.materials,this.material[s]));r.material=u}else r.material=a(e.materials,this.material);if(this.children.length>0){r.children=[];for(let u=0;u<this.children.length;u++)r.children.push(this.children[u].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let u=0;u<this.animations.length;u++){const s=this.animations[u];r.animations.push(a(e.animations,s))}}if(t){const u=o(e.geometries),s=o(e.materials),c=o(e.textures),l=o(e.images),h=o(e.shapes),d=o(e.skeletons),p=o(e.animations),m=o(e.nodes);u.length>0&&(n.geometries=u),s.length>0&&(n.materials=s),c.length>0&&(n.textures=c),l.length>0&&(n.images=l),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),m.length>0&&(n.nodes=m)}return n.object=r,n;function o(u){const s=[];for(const c in u){const l=u[c];delete l.metadata,s.push(l)}return s}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const r=e.children[n];this.add(r.clone())}return this}}bt.DEFAULT_UP=new A(0,1,0),bt.DEFAULT_MATRIX_AUTO_UPDATE=!0,bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const Qt=new A,dn=new A,sa=new A,pn=new A,si=new A,oi=new A,Xs=new A,oa=new A,la=new A,ca=new A,ua=new rt,ha=new rt,da=new rt;class Xt{constructor(e=new A,t=new A,n=new A){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,r){r.subVectors(n,t),Qt.subVectors(e,t),r.cross(Qt);const a=r.lengthSq();return a>0?r.multiplyScalar(1/Math.sqrt(a)):r.set(0,0,0)}static getBarycoord(e,t,n,r,a){Qt.subVectors(r,t),dn.subVectors(n,t),sa.subVectors(e,t);const o=Qt.dot(Qt),u=Qt.dot(dn),s=Qt.dot(sa),c=dn.dot(dn),l=dn.dot(sa),h=o*c-u*u;if(h===0)return a.set(0,0,0),null;const d=1/h,p=(c*s-u*l)*d,m=(o*l-u*s)*d;return a.set(1-p-m,m,p)}static containsPoint(e,t,n,r){return this.getBarycoord(e,t,n,r,pn)!==null&&pn.x>=0&&pn.y>=0&&pn.x+pn.y<=1}static getInterpolation(e,t,n,r,a,o,u,s){return this.getBarycoord(e,t,n,r,pn)===null?(s.x=0,s.y=0,"z"in s&&(s.z=0),"w"in s&&(s.w=0),null):(s.setScalar(0),s.addScaledVector(a,pn.x),s.addScaledVector(o,pn.y),s.addScaledVector(u,pn.z),s)}static getInterpolatedAttribute(e,t,n,r,a,o){return ua.setScalar(0),ha.setScalar(0),da.setScalar(0),ua.fromBufferAttribute(e,t),ha.fromBufferAttribute(e,n),da.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(ua,a.x),o.addScaledVector(ha,a.y),o.addScaledVector(da,a.z),o}static isFrontFacing(e,t,n,r){return Qt.subVectors(n,t),dn.subVectors(e,t),Qt.cross(dn).dot(r)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,r){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,n,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Qt.subVectors(this.c,this.b),dn.subVectors(this.a,this.b),.5*Qt.cross(dn).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Xt.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Xt.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,r,a){return Xt.getInterpolation(e,this.a,this.b,this.c,t,n,r,a)}containsPoint(e){return Xt.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Xt.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,r=this.b,a=this.c;let o,u;si.subVectors(r,n),oi.subVectors(a,n),oa.subVectors(e,n);const s=si.dot(oa),c=oi.dot(oa);if(s<=0&&c<=0)return t.copy(n);la.subVectors(e,r);const l=si.dot(la),h=oi.dot(la);if(l>=0&&h<=l)return t.copy(r);const d=s*h-l*c;if(d<=0&&s>=0&&l<=0)return o=s/(s-l),t.copy(n).addScaledVector(si,o);ca.subVectors(e,a);const p=si.dot(ca),m=oi.dot(ca);if(m>=0&&p<=m)return t.copy(a);const _=p*c-s*m;if(_<=0&&c>=0&&m<=0)return u=c/(c-m),t.copy(n).addScaledVector(oi,u);const g=l*m-p*h;if(g<=0&&h-l>=0&&p-m>=0)return Xs.subVectors(a,r),u=(h-l)/(h-l+(p-m)),t.copy(r).addScaledVector(Xs,u);const f=1/(g+_+d);return o=_*f,u=d*f,t.copy(n).addScaledVector(si,o).addScaledVector(oi,u)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Qo={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},An={h:0,s:0,l:0},sr={h:0,s:0,l:0};function pa(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+6*(e-i)*t:t<.5?e:t<2/3?i+6*(e-i)*(2/3-t):i}class Be{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=kt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,it.toWorkingColorSpace(this,t),this}setRGB(e,t,n,r=it.workingColorSpace){return this.r=e,this.g=t,this.b=n,it.toWorkingColorSpace(this,r),this}setHSL(e,t,n,r=it.workingColorSpace){if(e=Dl(e,1),t=It(t,0,1),n=It(n,0,1),t===0)this.r=this.g=this.b=n;else{const a=n<=.5?n*(1+t):n+t-n*t,o=2*n-a;this.r=pa(o,a,e+1/3),this.g=pa(o,a,e),this.b=pa(o,a,e-1/3)}return it.toWorkingColorSpace(this,r),this}setStyle(e,t=kt){function n(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const o=r[1],u=r[2];switch(o){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return n(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return n(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,t);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(u))return n(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=r[1],o=a.length;if(o===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(a,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=kt){const n=Qo[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=gi(e.r),this.g=gi(e.g),this.b=gi(e.b),this}copyLinearToSRGB(e){return this.r=Jr(e.r),this.g=Jr(e.g),this.b=Jr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=kt){return it.fromWorkingColorSpace(Ct.copy(this),e),65536*Math.round(It(255*Ct.r,0,255))+256*Math.round(It(255*Ct.g,0,255))+Math.round(It(255*Ct.b,0,255))}getHexString(e=kt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=it.workingColorSpace){it.fromWorkingColorSpace(Ct.copy(this),t);const n=Ct.r,r=Ct.g,a=Ct.b,o=Math.max(n,r,a),u=Math.min(n,r,a);let s,c;const l=(u+o)/2;if(u===o)s=0,c=0;else{const h=o-u;switch(c=l<=.5?h/(o+u):h/(2-o-u),o){case n:s=(r-a)/h+(r<a?6:0);break;case r:s=(a-n)/h+2;break;case a:s=(n-r)/h+4}s/=6}return e.h=s,e.s=c,e.l=l,e}getRGB(e,t=it.workingColorSpace){return it.fromWorkingColorSpace(Ct.copy(this),t),e.r=Ct.r,e.g=Ct.g,e.b=Ct.b,e}getStyle(e=kt){it.fromWorkingColorSpace(Ct.copy(this),e);const t=Ct.r,n=Ct.g,r=Ct.b;return e!==kt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*n)},${Math.round(255*r)})`}offsetHSL(e,t,n){return this.getHSL(An),this.setHSL(An.h+e,An.s+t,An.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(An),e.getHSL(sr);const n=Kr(An.h,sr.h,t),r=Kr(An.s,sr.s,t),a=Kr(An.l,sr.l,t);return this.setHSL(n,r,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,r=this.b,a=e.elements;return this.r=a[0]*t+a[3]*n+a[6]*r,this.g=a[1]*t+a[4]*n+a[7]*r,this.b=a[2]*t+a[5]*n+a[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ct=new Be;Be.NAMES=Qo;let ql=0;class Ti extends bi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ql++}),this.uuid=Yi(),this.name="",this.type="Material",this.blending=1,this.side=Dn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Pa,this.blendDst=La,this.blendEquation=Wn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Be(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=$n,this.stencilZFail=$n,this.stencilZPass=$n,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const r=this[t];r!==void 0?r&&r.isColor?r.set(n):r&&r.isVector3&&n&&n.isVector3?r.copy(n):this[t]=n:console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};function r(a){const o=[];for(const u in a){const s=a[u];delete s.metadata,o.push(s)}return o}if(n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==Dn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Pa&&(n.blendSrc=this.blendSrc),this.blendDst!==La&&(n.blendDst=this.blendDst),this.blendEquation!==Wn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==$n&&(n.stencilFail=this.stencilFail),this.stencilZFail!==$n&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==$n&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData),t){const a=r(e.textures),o=r(e.images);a.length>0&&(n.textures=a),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const r=t.length;n=new Array(r);for(let a=0;a!==r;++a)n[a]=t[a].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class Xn extends Ti{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Be(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ot,this.combine=Fo,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}Yl();function Yl(){const i=new ArrayBuffer(4),e=new Float32Array(i),t=new Uint32Array(i),n=new Uint32Array(512),r=new Uint32Array(512);for(let s=0;s<256;++s){const c=s-127;c<-27?(n[s]=0,n[256|s]=32768,r[s]=24,r[256|s]=24):c<-14?(n[s]=1024>>-c-14,n[256|s]=1024>>-c-14|32768,r[s]=-c-1,r[256|s]=-c-1):c<=15?(n[s]=c+15<<10,n[256|s]=c+15<<10|32768,r[s]=13,r[256|s]=13):c<128?(n[s]=31744,n[256|s]=64512,r[s]=24,r[256|s]=24):(n[s]=31744,n[256|s]=64512,r[s]=13,r[256|s]=13)}const a=new Uint32Array(2048),o=new Uint32Array(64),u=new Uint32Array(64);for(let s=1;s<1024;++s){let c=s<<13,l=0;for(;!(8388608&c);)c<<=1,l-=8388608;c&=-8388609,l+=947912704,a[s]=c|l}for(let s=1024;s<2048;++s)a[s]=939524096+(s-1024<<13);for(let s=1;s<31;++s)o[s]=s<<23;o[31]=1199570944,o[32]=2147483648;for(let s=33;s<63;++s)o[s]=2147483648+(s-32<<23);o[63]=3347054592;for(let s=1;s<64;++s)s!==32&&(u[s]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:r,mantissaTable:a,exponentTable:o,offsetTable:u}}const vt=new A,or=new ze;class Ht{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Ds,this.updateRanges=[],this.gpuType=on,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let r=0,a=this.itemSize;r<a;r++)this.array[e+r]=t.array[n+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)or.fromBufferAttribute(this,t),or.applyMatrix3(e),this.setXY(t,or.x,or.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix3(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.applyMatrix4(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.applyNormalMatrix(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)vt.fromBufferAttribute(this,t),vt.transformDirection(e),this.setXYZ(t,vt.x,vt.y,vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Ci(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=Ut(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ci(t,this.array)),t}setX(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ci(t,this.array)),t}setY(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ci(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ci(t,this.array)),t}setW(e,t){return this.normalized&&(t=Ut(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),n=Ut(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,r){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),n=Ut(n,this.array),r=Ut(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this}setXYZW(e,t,n,r,a){return e*=this.itemSize,this.normalized&&(t=Ut(t,this.array),n=Ut(n,this.array),r=Ut(r,this.array),a=Ut(a,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=r,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Ds&&(e.usage=this.usage),e}}class el extends Ht{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class tl extends Ht{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class xt extends Ht{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Kl=0;const Vt=new Pe,fa=new bt,li=new A,zt=new vn,Ii=new vn,Et=new A;class Ft extends bi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Kl++}),this.uuid=Yi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Zo(e)?tl:el)(e,1):this.index=e,this}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const a=new Ge().getNormalMatrix(e);n.applyNormalMatrix(a),n.needsUpdate=!0}const r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Vt.makeRotationFromQuaternion(e),this.applyMatrix4(Vt),this}rotateX(e){return Vt.makeRotationX(e),this.applyMatrix4(Vt),this}rotateY(e){return Vt.makeRotationY(e),this.applyMatrix4(Vt),this}rotateZ(e){return Vt.makeRotationZ(e),this.applyMatrix4(Vt),this}translate(e,t,n){return Vt.makeTranslation(e,t,n),this.applyMatrix4(Vt),this}scale(e,t,n){return Vt.makeScale(e,t,n),this.applyMatrix4(Vt),this}lookAt(e){return fa.lookAt(e),fa.updateMatrix(),this.applyMatrix4(fa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(li).negate(),this.translate(li.x,li.y,li.z),this}setFromPoints(e){const t=[];for(let n=0,r=e.length;n<r;n++){const a=e[n];t.push(a.x,a.y,a.z||0)}return this.setAttribute("position",new xt(t,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new vn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new A(-1/0,-1/0,-1/0),new A(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,r=t.length;n<r;n++){const a=t[n];zt.setFromBufferAttribute(a),this.morphTargetsRelative?(Et.addVectors(this.boundingBox.min,zt.min),this.boundingBox.expandByPoint(Et),Et.addVectors(this.boundingBox.max,zt.max),this.boundingBox.expandByPoint(Et)):(this.boundingBox.expandByPoint(zt.min),this.boundingBox.expandByPoint(zt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new xn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new A,1/0);if(e){const n=this.boundingSphere.center;if(zt.setFromBufferAttribute(e),t)for(let a=0,o=t.length;a<o;a++){const u=t[a];Ii.setFromBufferAttribute(u),this.morphTargetsRelative?(Et.addVectors(zt.min,Ii.min),zt.expandByPoint(Et),Et.addVectors(zt.max,Ii.max),zt.expandByPoint(Et)):(zt.expandByPoint(Ii.min),zt.expandByPoint(Ii.max))}zt.getCenter(n);let r=0;for(let a=0,o=e.count;a<o;a++)Et.fromBufferAttribute(e,a),r=Math.max(r,n.distanceToSquared(Et));if(t)for(let a=0,o=t.length;a<o;a++){const u=t[a],s=this.morphTargetsRelative;for(let c=0,l=u.count;c<l;c++)Et.fromBufferAttribute(u,c),s&&(li.fromBufferAttribute(e,c),Et.add(li)),r=Math.max(r,n.distanceToSquared(Et))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");const n=t.position,r=t.normal,a=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Ht(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),u=[],s=[];for(let q=0;q<n.count;q++)u[q]=new A,s[q]=new A;const c=new A,l=new A,h=new A,d=new ze,p=new ze,m=new ze,_=new A,g=new A;function f(q,U,k){c.fromBufferAttribute(n,q),l.fromBufferAttribute(n,U),h.fromBufferAttribute(n,k),d.fromBufferAttribute(a,q),p.fromBufferAttribute(a,U),m.fromBufferAttribute(a,k),l.sub(c),h.sub(c),p.sub(d),m.sub(d);const K=1/(p.x*m.y-m.x*p.y);isFinite(K)&&(_.copy(l).multiplyScalar(m.y).addScaledVector(h,-p.y).multiplyScalar(K),g.copy(h).multiplyScalar(p.x).addScaledVector(l,-m.x).multiplyScalar(K),u[q].add(_),u[U].add(_),u[k].add(_),s[q].add(g),s[U].add(g),s[k].add(g))}let v=this.groups;v.length===0&&(v=[{start:0,count:e.count}]);for(let q=0,U=v.length;q<U;++q){const k=v[q],K=k.start;for(let F=K,Z=K+k.count;F<Z;F+=3)f(e.getX(F+0),e.getX(F+1),e.getX(F+2))}const x=new A,M=new A,w=new A,R=new A;function P(q){w.fromBufferAttribute(r,q),R.copy(w);const U=u[q];x.copy(U),x.sub(w.multiplyScalar(w.dot(U))).normalize(),M.crossVectors(R,U);const k=M.dot(s[q])<0?-1:1;o.setXYZW(q,x.x,x.y,x.z,k)}for(let q=0,U=v.length;q<U;++q){const k=v[q],K=k.start;for(let F=K,Z=K+k.count;F<Z;F+=3)P(e.getX(F+0)),P(e.getX(F+1)),P(e.getX(F+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Ht(new Float32Array(3*t.count),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);const r=new A,a=new A,o=new A,u=new A,s=new A,c=new A,l=new A,h=new A;if(e)for(let d=0,p=e.count;d<p;d+=3){const m=e.getX(d+0),_=e.getX(d+1),g=e.getX(d+2);r.fromBufferAttribute(t,m),a.fromBufferAttribute(t,_),o.fromBufferAttribute(t,g),l.subVectors(o,a),h.subVectors(r,a),l.cross(h),u.fromBufferAttribute(n,m),s.fromBufferAttribute(n,_),c.fromBufferAttribute(n,g),u.add(l),s.add(l),c.add(l),n.setXYZ(m,u.x,u.y,u.z),n.setXYZ(_,s.x,s.y,s.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let d=0,p=t.count;d<p;d+=3)r.fromBufferAttribute(t,d+0),a.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),l.subVectors(o,a),h.subVectors(r,a),l.cross(h),n.setXYZ(d+0,l.x,l.y,l.z),n.setXYZ(d+1,l.x,l.y,l.z),n.setXYZ(d+2,l.x,l.y,l.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Et.fromBufferAttribute(e,t),Et.normalize(),e.setXYZ(t,Et.x,Et.y,Et.z)}toNonIndexed(){function e(u,s){const c=u.array,l=u.itemSize,h=u.normalized,d=new c.constructor(s.length*l);let p=0,m=0;for(let _=0,g=s.length;_<g;_++){p=u.isInterleavedBufferAttribute?s[_]*u.data.stride+u.offset:s[_]*l;for(let f=0;f<l;f++)d[m++]=c[p++]}return new Ht(d,l,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Ft,n=this.index.array,r=this.attributes;for(const u in r){const s=e(r[u],n);t.setAttribute(u,s)}const a=this.morphAttributes;for(const u in a){const s=[],c=a[u];for(let l=0,h=c.length;l<h;l++){const d=e(c[l],n);s.push(d)}t.morphAttributes[u]=s}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let u=0,s=o.length;u<s;u++){const c=o[u];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const s=this.parameters;for(const c in s)s[c]!==void 0&&(e[c]=s[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const s in n){const c=n[s];e.data.attributes[s]=c.toJSON(e.data)}const r={};let a=!1;for(const s in this.morphAttributes){const c=this.morphAttributes[s],l=[];for(let h=0,d=c.length;h<d;h++){const p=c[h];l.push(p.toJSON(e.data))}l.length>0&&(r[s]=l,a=!0)}a&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const u=this.boundingSphere;return u!==null&&(e.data.boundingSphere={center:u.center.toArray(),radius:u.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone(t));const r=e.attributes;for(const c in r){const l=r[c];this.setAttribute(c,l.clone(t))}const a=e.morphAttributes;for(const c in a){const l=[],h=a[c];for(let d=0,p=h.length;d<p;d++)l.push(h[d].clone(t));this.morphAttributes[c]=l}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,l=o.length;c<l;c++){const h=o[c];this.addGroup(h.start,h.count,h.materialIndex)}const u=e.boundingBox;u!==null&&(this.boundingBox=u.clone());const s=e.boundingSphere;return s!==null&&(this.boundingSphere=s.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const js=new Pe,zn=new Ki,lr=new xn,qs=new A,cr=new A,ur=new A,hr=new A,ma=new A,dr=new A,Ys=new A,pr=new A;class _t extends bt{constructor(e=new Ft,t=new Xn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){const n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,r=n.attributes.position,a=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(r,e);const u=this.morphTargetInfluences;if(a&&u){dr.set(0,0,0);for(let s=0,c=a.length;s<c;s++){const l=u[s],h=a[s];l!==0&&(ma.fromBufferAttribute(h,e),o?dr.addScaledVector(ma,l):dr.addScaledVector(ma.sub(t),l))}t.add(dr)}return t}raycast(e,t){const n=this.geometry,r=this.material,a=this.matrixWorld;if(r!==void 0){if(n.boundingSphere===null&&n.computeBoundingSphere(),lr.copy(n.boundingSphere),lr.applyMatrix4(a),zn.copy(e.ray).recast(e.near),lr.containsPoint(zn.origin)===!1&&(zn.intersectSphere(lr,qs)===null||zn.origin.distanceToSquared(qs)>(e.far-e.near)**2))return;js.copy(a).invert(),zn.copy(e.ray).applyMatrix4(js),n.boundingBox!==null&&zn.intersectsBox(n.boundingBox)===!1||this._computeIntersections(e,t,zn)}}_computeIntersections(e,t,n){let r;const a=this.geometry,o=this.material,u=a.index,s=a.attributes.position,c=a.attributes.uv,l=a.attributes.uv1,h=a.attributes.normal,d=a.groups,p=a.drawRange;if(u!==null)if(Array.isArray(o))for(let m=0,_=d.length;m<_;m++){const g=d[m],f=o[g.materialIndex];for(let v=Math.max(g.start,p.start),x=Math.min(u.count,Math.min(g.start+g.count,p.start+p.count));v<x;v+=3)r=fr(this,f,e,n,c,l,h,u.getX(v),u.getX(v+1),u.getX(v+2)),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=g.materialIndex,t.push(r))}else for(let m=Math.max(0,p.start),_=Math.min(u.count,p.start+p.count);m<_;m+=3)r=fr(this,o,e,n,c,l,h,u.getX(m),u.getX(m+1),u.getX(m+2)),r&&(r.faceIndex=Math.floor(m/3),t.push(r));else if(s!==void 0)if(Array.isArray(o))for(let m=0,_=d.length;m<_;m++){const g=d[m],f=o[g.materialIndex];for(let v=Math.max(g.start,p.start),x=Math.min(s.count,Math.min(g.start+g.count,p.start+p.count));v<x;v+=3)r=fr(this,f,e,n,c,l,h,v,v+1,v+2),r&&(r.faceIndex=Math.floor(v/3),r.face.materialIndex=g.materialIndex,t.push(r))}else for(let m=Math.max(0,p.start),_=Math.min(s.count,p.start+p.count);m<_;m+=3)r=fr(this,o,e,n,c,l,h,m,m+1,m+2),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}function fr(i,e,t,n,r,a,o,u,s,c){i.getVertexPosition(u,cr),i.getVertexPosition(s,ur),i.getVertexPosition(c,hr);const l=function(h,d,p,m,_,g,f,v){let x;if(x=d.side===Nt?m.intersectTriangle(f,g,_,!0,v):m.intersectTriangle(_,g,f,d.side===Dn,v),x===null)return null;pr.copy(v),pr.applyMatrix4(h.matrixWorld);const M=p.ray.origin.distanceTo(pr);return M<p.near||M>p.far?null:{distance:M,point:pr.clone(),object:h}}(i,e,t,n,cr,ur,hr,Ys);if(l){const h=new A;Xt.getBarycoord(Ys,cr,ur,hr,h),r&&(l.uv=Xt.getInterpolatedAttribute(r,u,s,c,h,new ze)),a&&(l.uv1=Xt.getInterpolatedAttribute(a,u,s,c,h,new ze)),o&&(l.normal=Xt.getInterpolatedAttribute(o,u,s,c,h,new A),l.normal.dot(n.direction)>0&&l.normal.multiplyScalar(-1));const d={a:u,b:s,c,normal:new A,materialIndex:0};Xt.getNormal(cr,ur,hr,d.normal),l.face=d,l.barycoord=h}return l}class Zn extends Ft{constructor(e=1,t=1,n=1,r=1,a=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:r,heightSegments:a,depthSegments:o};const u=this;r=Math.floor(r),a=Math.floor(a),o=Math.floor(o);const s=[],c=[],l=[],h=[];let d=0,p=0;function m(_,g,f,v,x,M,w,R,P,q,U){const k=M/P,K=w/q,F=M/2,Z=w/2,j=R/2,J=P+1,z=q+1;let re=0,ue=0;const fe=new A;for(let Ae=0;Ae<z;Ae++){const Q=Ae*K-Z;for(let se=0;se<J;se++){const Se=se*k-F;fe[_]=Se*v,fe[g]=Q*x,fe[f]=j,c.push(fe.x,fe.y,fe.z),fe[_]=0,fe[g]=0,fe[f]=R>0?1:-1,l.push(fe.x,fe.y,fe.z),h.push(se/P),h.push(1-Ae/q),re+=1}}for(let Ae=0;Ae<q;Ae++)for(let Q=0;Q<P;Q++){const se=d+Q+J*Ae,Se=d+Q+J*(Ae+1),be=d+(Q+1)+J*(Ae+1),T=d+(Q+1)+J*Ae;s.push(se,Se,T),s.push(Se,be,T),ue+=6}u.addGroup(p,ue,U),p+=ue,d+=re}m("z","y","x",-1,-1,n,t,e,o,a,0),m("z","y","x",1,-1,n,t,-e,o,a,1),m("x","z","y",1,1,e,n,t,r,o,2),m("x","z","y",1,-1,e,n,-t,r,o,3),m("x","y","z",1,-1,e,t,n,r,a,4),m("x","y","z",-1,-1,e,t,-n,r,a,5),this.setIndex(s),this.setAttribute("position",new xt(c,3)),this.setAttribute("normal",new xt(l,3)),this.setAttribute("uv",new xt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Zn(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ei(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const r=i[t][n];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=r.clone():Array.isArray(r)?e[t][n]=r.slice():e[t][n]=r}}return e}function Lt(i){const e={};for(let t=0;t<i.length;t++){const n=Ei(i[t]);for(const r in n)e[r]=n[r]}return e}function nl(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:it.workingColorSpace}const Zl={clone:Ei,merge:Lt};class Un extends Ti{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,this.fragmentShader=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ei(e.uniforms),this.uniformsGroups=function(t){const n=[];for(let r=0;r<t.length;r++)n.push(t[r].clone());return n}(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const r in this.uniforms){const a=this.uniforms[r].value;a&&a.isTexture?t.uniforms[r]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[r]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[r]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[r]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[r]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[r]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[r]={type:"m4",value:a.toArray()}:t.uniforms[r]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const r in this.extensions)this.extensions[r]===!0&&(n[r]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Ss extends bt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Pe,this.projectionMatrix=new Pe,this.projectionMatrixInverse=new Pe,this.coordinateSystem=yi}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Rn=new A,Ks=new ze,Zs=new ze;class Wt extends Ss{constructor(e=50,t=1,n=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=2*os*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(.5*Yr*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*os*Math.atan(Math.tan(.5*Yr*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Rn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Rn.x,Rn.y).multiplyScalar(-e/Rn.z),Rn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Rn.x,Rn.y).multiplyScalar(-e/Rn.z)}getViewSize(e,t){return this.getViewBounds(e,Ks,Zs),t.subVectors(Zs,Ks)}setViewOffset(e,t,n,r,a,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(.5*Yr*this.fov)/this.zoom,n=2*t,r=this.aspect*n,a=-.5*r;const o=this.view;if(this.view!==null&&this.view.enabled){const s=o.fullWidth,c=o.fullHeight;a+=o.offsetX*r/s,t-=o.offsetY*n/c,r*=o.width/s,n*=o.height/c}const u=this.filmOffset;u!==0&&(a+=e*u/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+r,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const ci=-90;class Jl extends bt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const r=new Wt(ci,1,e,t);r.layers=this.layers,this.add(r);const a=new Wt(ci,1,e,t);a.layers=this.layers,this.add(a);const o=new Wt(ci,1,e,t);o.layers=this.layers,this.add(o);const u=new Wt(ci,1,e,t);u.layers=this.layers,this.add(u);const s=new Wt(ci,1,e,t);s.layers=this.layers,this.add(s);const c=new Wt(ci,1,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,r,a,o,u,s]=t;for(const c of t)this.remove(c);if(e===yi)n.up.set(0,1,0),n.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),u.up.set(0,1,0),u.lookAt(0,0,1),s.up.set(0,1,0),s.lookAt(0,0,-1);else{if(e!==Ir)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);n.up.set(0,-1,0),n.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),u.up.set(0,-1,0),u.lookAt(0,0,1),s.up.set(0,-1,0),s.lookAt(0,0,-1)}for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,o,u,s,c,l]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,r),e.render(t,a),e.setRenderTarget(n,1,r),e.render(t,o),e.setRenderTarget(n,2,r),e.render(t,u),e.setRenderTarget(n,3,r),e.render(t,s),e.setRenderTarget(n,4,r),e.render(t,c),n.texture.generateMipmaps=_,e.setRenderTarget(n,5,r),e.render(t,l),e.setRenderTarget(h,d,p),e.xr.enabled=m,n.texture.needsPMREMUpdate=!0}}class il extends Pt{constructor(e,t,n,r,a,o,u,s,c,l){super(e=e!==void 0?e:[],t=t!==void 0?t:vi,n,r,a,o,u,s,c,l),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class $l extends qn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},r=[n,n,n,n,n,n];this.texture=new il(r,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0&&t.generateMipmaps,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:sn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},r=new Zn(5,5,5),a=new Un({name:"CubemapFromEquirect",uniforms:Ei(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Nt,blending:0});a.uniforms.tEquirect.value=t;const o=new _t(r,a),u=t.minFilter;return t.minFilter===fi&&(t.minFilter=sn),new Jl(1,10,this).update(e,o),t.minFilter=u,o.geometry.dispose(),o.material.dispose(),this}clear(e,t,n,r){const a=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,r);e.setRenderTarget(a)}}const ga=new A,Ql=new A,ec=new Ge;class Pn{constructor(e=new A(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,r){return this.normal.set(e,t,n),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const r=ga.subVectors(n,t).cross(Ql.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(ga),r=this.normal.dot(n);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return a<0||a>1?null:t.copy(e.start).addScaledVector(n,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||ec.getNormalMatrix(e),r=this.coplanarPoint(ga).applyMatrix4(e),a=this.normal.applyMatrix3(n).normalize();return this.constant=-r.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Hn=new xn,mr=new A;class Gr{constructor(e=new Pn,t=new Pn,n=new Pn,r=new Pn,a=new Pn,o=new Pn){this.planes=[e,t,n,r,a,o]}set(e,t,n,r,a,o){const u=this.planes;return u[0].copy(e),u[1].copy(t),u[2].copy(n),u[3].copy(r),u[4].copy(a),u[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3){const n=this.planes,r=e.elements,a=r[0],o=r[1],u=r[2],s=r[3],c=r[4],l=r[5],h=r[6],d=r[7],p=r[8],m=r[9],_=r[10],g=r[11],f=r[12],v=r[13],x=r[14],M=r[15];if(n[0].setComponents(s-a,d-c,g-p,M-f).normalize(),n[1].setComponents(s+a,d+c,g+p,M+f).normalize(),n[2].setComponents(s+o,d+l,g+m,M+v).normalize(),n[3].setComponents(s-o,d-l,g-m,M-v).normalize(),n[4].setComponents(s-u,d-h,g-_,M-x).normalize(),t===yi)n[5].setComponents(s+u,d+h,g+_,M+x).normalize();else{if(t!==Ir)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);n[5].setComponents(u,h,_,x).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Hn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Hn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Hn)}intersectsSprite(e){return Hn.center.set(0,0,0),Hn.radius=.7071067811865476,Hn.applyMatrix4(e.matrixWorld),this.intersectsSphere(Hn)}intersectsSphere(e){const t=this.planes,n=e.center,r=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(n)<r)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const r=t[n];if(mr.x=r.normal.x>0?e.max.x:e.min.x,mr.y=r.normal.y>0?e.max.y:e.min.y,mr.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(mr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function rl(){let i=null,e=!1,t=null,n=null;function r(a,o){t(a,o),n=i.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(n=i.requestAnimationFrame(r),e=!0)},stop:function(){i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){i=a}}}function tc(i){const e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);const n=e.get(t);n&&(i.deleteBuffer(n.buffer),e.delete(t))},update:function(t,n){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){const a=e.get(t);return void((!a||a.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}const r=e.get(t);if(r===void 0)e.set(t,function(a,o){const u=a.array,s=a.usage,c=u.byteLength,l=i.createBuffer();let h;if(i.bindBuffer(o,l),i.bufferData(o,u,s),a.onUploadCallback(),u instanceof Float32Array)h=i.FLOAT;else if(u instanceof Uint16Array)h=a.isFloat16BufferAttribute?i.HALF_FLOAT:i.UNSIGNED_SHORT;else if(u instanceof Int16Array)h=i.SHORT;else if(u instanceof Uint32Array)h=i.UNSIGNED_INT;else if(u instanceof Int32Array)h=i.INT;else if(u instanceof Int8Array)h=i.BYTE;else if(u instanceof Uint8Array)h=i.UNSIGNED_BYTE;else{if(!(u instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);h=i.UNSIGNED_BYTE}return{buffer:l,type:h,bytesPerElement:u.BYTES_PER_ELEMENT,version:a.version,size:c}}(t,n));else if(r.version<t.version){if(r.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(a,o,u){const s=o.array,c=o.updateRanges;if(i.bindBuffer(u,a),c.length===0)i.bufferSubData(u,0,s);else{c.sort((h,d)=>h.start-d.start);let l=0;for(let h=1;h<c.length;h++){const d=c[l],p=c[h];p.start<=d.start+d.count+1?d.count=Math.max(d.count,p.start+p.count-d.start):(++l,c[l]=p)}c.length=l+1;for(let h=0,d=c.length;h<d;h++){const p=c[h];i.bufferSubData(u,p.start*s.BYTES_PER_ELEMENT,s,p.start,p.count)}o.clearUpdateRanges()}o.onUploadCallback()})(r.buffer,t,n),r.version=t.version}}}}class wi extends Ft{constructor(e=1,t=1,n=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:r};const a=e/2,o=t/2,u=Math.floor(n),s=Math.floor(r),c=u+1,l=s+1,h=e/u,d=t/s,p=[],m=[],_=[],g=[];for(let f=0;f<l;f++){const v=f*d-o;for(let x=0;x<c;x++){const M=x*h-a;m.push(M,-v,0),_.push(0,0,1),g.push(x/u),g.push(1-f/s)}}for(let f=0;f<s;f++)for(let v=0;v<u;v++){const x=v+c*f,M=v+c*(f+1),w=v+1+c*(f+1),R=v+1+c*f;p.push(x,M,R),p.push(M,w,R)}this.setIndex(p),this.setAttribute("position",new xt(m,3)),this.setAttribute("normal",new xt(_,3)),this.setAttribute("uv",new xt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new wi(e.width,e.height,e.widthSegments,e.heightSegments)}}const He={alphahash_fragment:`#ifdef USE_ALPHAHASH
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
}`},de={common:{diffuse:{value:new Be(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ge}},envmap:{envMap:{value:null},envMapRotation:{value:new Ge},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ge}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ge}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ge},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ge},normalScale:{value:new ze(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ge},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ge}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ge}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ge}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Be(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Be(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0},uvTransform:{value:new Ge}},sprite:{diffuse:{value:new Be(16777215)},opacity:{value:1},center:{value:new ze(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ge},alphaMap:{value:null},alphaMapTransform:{value:new Ge},alphaTest:{value:0}}},an={basic:{uniforms:Lt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:He.meshbasic_vert,fragmentShader:He.meshbasic_frag},lambert:{uniforms:Lt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Be(0)}}]),vertexShader:He.meshlambert_vert,fragmentShader:He.meshlambert_frag},phong:{uniforms:Lt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Be(0)},specular:{value:new Be(1118481)},shininess:{value:30}}]),vertexShader:He.meshphong_vert,fragmentShader:He.meshphong_frag},standard:{uniforms:Lt([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new Be(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag},toon:{uniforms:Lt([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new Be(0)}}]),vertexShader:He.meshtoon_vert,fragmentShader:He.meshtoon_frag},matcap:{uniforms:Lt([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:He.meshmatcap_vert,fragmentShader:He.meshmatcap_frag},points:{uniforms:Lt([de.points,de.fog]),vertexShader:He.points_vert,fragmentShader:He.points_frag},dashed:{uniforms:Lt([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:He.linedashed_vert,fragmentShader:He.linedashed_frag},depth:{uniforms:Lt([de.common,de.displacementmap]),vertexShader:He.depth_vert,fragmentShader:He.depth_frag},normal:{uniforms:Lt([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:He.meshnormal_vert,fragmentShader:He.meshnormal_frag},sprite:{uniforms:Lt([de.sprite,de.fog]),vertexShader:He.sprite_vert,fragmentShader:He.sprite_frag},background:{uniforms:{uvTransform:{value:new Ge},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:He.background_vert,fragmentShader:He.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ge}},vertexShader:He.backgroundCube_vert,fragmentShader:He.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:He.cube_vert,fragmentShader:He.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:He.equirect_vert,fragmentShader:He.equirect_frag},distanceRGBA:{uniforms:Lt([de.common,de.displacementmap,{referencePosition:{value:new A},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:He.distanceRGBA_vert,fragmentShader:He.distanceRGBA_frag},shadow:{uniforms:Lt([de.lights,de.fog,{color:{value:new Be(0)},opacity:{value:1}}]),vertexShader:He.shadow_vert,fragmentShader:He.shadow_frag}};an.physical={uniforms:Lt([an.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ge},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ge},clearcoatNormalScale:{value:new ze(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ge},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ge},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ge},sheen:{value:0},sheenColor:{value:new Be(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ge},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ge},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ge},transmissionSamplerSize:{value:new ze},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ge},attenuationDistance:{value:0},attenuationColor:{value:new Be(0)},specularColor:{value:new Be(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ge},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ge},anisotropyVector:{value:new ze},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ge}}]),vertexShader:He.meshphysical_vert,fragmentShader:He.meshphysical_frag};const gr={r:0,b:0,g:0},Gn=new Ot,nc=new Pe;function ic(i,e,t,n,r,a,o){const u=new Be(0);let s,c,l=a===!0?0:1,h=null,d=0,p=null;function m(g){let f=g.isScene===!0?g.background:null;return f&&f.isTexture&&(f=(g.backgroundBlurriness>0?t:e).get(f)),f}function _(g,f){g.getRGB(gr,nl(i)),n.buffers.color.setClear(gr.r,gr.g,gr.b,f,o)}return{getClearColor:function(){return u},setClearColor:function(g,f=1){u.set(g),l=f,_(u,l)},getClearAlpha:function(){return l},setClearAlpha:function(g){l=g,_(u,l)},render:function(g){let f=!1;const v=m(g);v===null?_(u,l):v&&v.isColor&&(_(v,1),f=!0);const x=i.xr.getEnvironmentBlendMode();x==="additive"?n.buffers.color.setClear(0,0,0,1,o):x==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(i.autoClear||f)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))},addToRenderList:function(g,f){const v=m(f);v&&(v.isCubeTexture||v.mapping===zr)?(c===void 0&&(c=new _t(new Zn(1,1,1),new Un({name:"BackgroundCubeMaterial",uniforms:Ei(an.backgroundCube.uniforms),vertexShader:an.backgroundCube.vertexShader,fragmentShader:an.backgroundCube.fragmentShader,side:Nt,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(x,M,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(c)),Gn.copy(f.backgroundRotation),Gn.x*=-1,Gn.y*=-1,Gn.z*=-1,v.isCubeTexture&&v.isRenderTargetTexture===!1&&(Gn.y*=-1,Gn.z*=-1),c.material.uniforms.envMap.value=v,c.material.uniforms.flipEnvMap.value=v.isCubeTexture&&v.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=f.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(nc.makeRotationFromEuler(Gn)),c.material.toneMapped=it.getTransfer(v.colorSpace)!==ct,h===v&&d===v.version&&p===i.toneMapping||(c.material.needsUpdate=!0,h=v,d=v.version,p=i.toneMapping),c.layers.enableAll(),g.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(s===void 0&&(s=new _t(new wi(2,2),new Un({name:"BackgroundMaterial",uniforms:Ei(an.background.uniforms),vertexShader:an.background.vertexShader,fragmentShader:an.background.fragmentShader,side:Dn,depthTest:!1,depthWrite:!1,fog:!1})),s.geometry.deleteAttribute("normal"),Object.defineProperty(s.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(s)),s.material.uniforms.t2D.value=v,s.material.uniforms.backgroundIntensity.value=f.backgroundIntensity,s.material.toneMapped=it.getTransfer(v.colorSpace)!==ct,v.matrixAutoUpdate===!0&&v.updateMatrix(),s.material.uniforms.uvTransform.value.copy(v.matrix),h===v&&d===v.version&&p===i.toneMapping||(s.material.needsUpdate=!0,h=v,d=v.version,p=i.toneMapping),s.layers.enableAll(),g.unshift(s,s.geometry,s.material,0,0,null))}}}function rc(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},r=c(null);let a=r,o=!1;function u(f){return i.bindVertexArray(f)}function s(f){return i.deleteVertexArray(f)}function c(f){const v=[],x=[],M=[];for(let w=0;w<t;w++)v[w]=0,x[w]=0,M[w]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:v,enabledAttributes:x,attributeDivisors:M,object:f,attributes:{},index:null}}function l(){const f=a.newAttributes;for(let v=0,x=f.length;v<x;v++)f[v]=0}function h(f){d(f,0)}function d(f,v){const x=a.newAttributes,M=a.enabledAttributes,w=a.attributeDivisors;x[f]=1,M[f]===0&&(i.enableVertexAttribArray(f),M[f]=1),w[f]!==v&&(i.vertexAttribDivisor(f,v),w[f]=v)}function p(){const f=a.newAttributes,v=a.enabledAttributes;for(let x=0,M=v.length;x<M;x++)v[x]!==f[x]&&(i.disableVertexAttribArray(x),v[x]=0)}function m(f,v,x,M,w,R,P){P===!0?i.vertexAttribIPointer(f,v,x,w,R):i.vertexAttribPointer(f,v,x,M,w,R)}function _(){g(),o=!0,a!==r&&(a=r,u(a.object))}function g(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:function(f,v,x,M,w){let R=!1;const P=function(q,U,k){const K=k.wireframe===!0;let F=n[q.id];F===void 0&&(F={},n[q.id]=F);let Z=F[U.id];Z===void 0&&(Z={},F[U.id]=Z);let j=Z[K];return j===void 0&&(j=c(i.createVertexArray()),Z[K]=j),j}(M,x,v);a!==P&&(a=P,u(a.object)),R=function(q,U,k,K){const F=a.attributes,Z=U.attributes;let j=0;const J=k.getAttributes();for(const z in J)if(J[z].location>=0){const re=F[z];let ue=Z[z];if(ue===void 0&&(z==="instanceMatrix"&&q.instanceMatrix&&(ue=q.instanceMatrix),z==="instanceColor"&&q.instanceColor&&(ue=q.instanceColor)),re===void 0||re.attribute!==ue||ue&&re.data!==ue.data)return!0;j++}return a.attributesNum!==j||a.index!==K}(f,M,x,w),R&&function(q,U,k,K){const F={},Z=U.attributes;let j=0;const J=k.getAttributes();for(const z in J)if(J[z].location>=0){let re=Z[z];re===void 0&&(z==="instanceMatrix"&&q.instanceMatrix&&(re=q.instanceMatrix),z==="instanceColor"&&q.instanceColor&&(re=q.instanceColor));const ue={};ue.attribute=re,re&&re.data&&(ue.data=re.data),F[z]=ue,j++}a.attributes=F,a.attributesNum=j,a.index=K}(f,M,x,w),w!==null&&e.update(w,i.ELEMENT_ARRAY_BUFFER),(R||o)&&(o=!1,function(q,U,k,K){l();const F=K.attributes,Z=k.getAttributes(),j=U.defaultAttributeValues;for(const J in Z){const z=Z[J];if(z.location>=0){let re=F[J];if(re===void 0&&(J==="instanceMatrix"&&q.instanceMatrix&&(re=q.instanceMatrix),J==="instanceColor"&&q.instanceColor&&(re=q.instanceColor)),re!==void 0){const ue=re.normalized,fe=re.itemSize,Ae=e.get(re);if(Ae===void 0)continue;const Q=Ae.buffer,se=Ae.type,Se=Ae.bytesPerElement,be=se===i.INT||se===i.UNSIGNED_INT||re.gpuType===ds;if(re.isInterleavedBufferAttribute){const T=re.data,S=T.stride,D=re.offset;if(T.isInstancedInterleavedBuffer){for(let Y=0;Y<z.locationSize;Y++)d(z.location+Y,T.meshPerAttribute);q.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=T.meshPerAttribute*T.count)}else for(let Y=0;Y<z.locationSize;Y++)h(z.location+Y);i.bindBuffer(i.ARRAY_BUFFER,Q);for(let Y=0;Y<z.locationSize;Y++)m(z.location+Y,fe/z.locationSize,se,ue,S*Se,(D+fe/z.locationSize*Y)*Se,be)}else{if(re.isInstancedBufferAttribute){for(let T=0;T<z.locationSize;T++)d(z.location+T,re.meshPerAttribute);q.isInstancedMesh!==!0&&K._maxInstanceCount===void 0&&(K._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let T=0;T<z.locationSize;T++)h(z.location+T);i.bindBuffer(i.ARRAY_BUFFER,Q);for(let T=0;T<z.locationSize;T++)m(z.location+T,fe/z.locationSize,se,ue,fe*Se,fe/z.locationSize*T*Se,be)}}else if(j!==void 0){const ue=j[J];if(ue!==void 0)switch(ue.length){case 2:i.vertexAttrib2fv(z.location,ue);break;case 3:i.vertexAttrib3fv(z.location,ue);break;case 4:i.vertexAttrib4fv(z.location,ue);break;default:i.vertexAttrib1fv(z.location,ue)}}}}p()}(f,v,x,M),w!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(w).buffer))},reset:_,resetDefaultState:g,dispose:function(){_();for(const f in n){const v=n[f];for(const x in v){const M=v[x];for(const w in M)s(M[w].object),delete M[w];delete v[x]}delete n[f]}},releaseStatesOfGeometry:function(f){if(n[f.id]===void 0)return;const v=n[f.id];for(const x in v){const M=v[x];for(const w in M)s(M[w].object),delete M[w];delete v[x]}delete n[f.id]},releaseStatesOfProgram:function(f){for(const v in n){const x=n[v];if(x[f.id]===void 0)continue;const M=x[f.id];for(const w in M)s(M[w].object),delete M[w];delete x[f.id]}},initAttributes:l,enableAttribute:h,disableUnusedAttributes:p}}function ac(i,e,t){let n;function r(a,o,u){u!==0&&(i.drawArraysInstanced(n,a,o,u),t.update(o,n,u))}this.setMode=function(a){n=a},this.render=function(a,o){i.drawArrays(n,a,o),t.update(o,n,1)},this.renderInstances=r,this.renderMultiDraw=function(a,o,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,a,0,o,0,u);let s=0;for(let c=0;c<u;c++)s+=o[c];t.update(s,n,1)},this.renderMultiDrawInstances=function(a,o,u,s){if(u===0)return;const c=e.get("WEBGL_multi_draw");if(c===null)for(let l=0;l<a.length;l++)r(a[l],o[l],s[l]);else{c.multiDrawArraysInstancedWEBGL(n,a,0,o,0,s,0,u);let l=0;for(let h=0;h<u;h++)l+=o[h];for(let h=0;h<s.length;h++)t.update(l,n,s[h])}}}function sc(i,e,t,n){let r;function a(d){if(d==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";d="mediump"}return d==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let o=t.precision!==void 0?t.precision:"highp";const u=a(o);u!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",u,"instead."),o=u);const s=t.logarithmicDepthBuffer===!0,c=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control");if(c===!0){const d=e.get("EXT_clip_control");d.clipControlEXT(d.LOWER_LEFT_EXT,d.ZERO_TO_ONE_EXT)}const l=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),h=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS);return{isWebGL2:!0,getMaxAnisotropy:function(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){const d=e.get("EXT_texture_filter_anisotropic");r=i.getParameter(d.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r},getMaxPrecision:a,textureFormatReadable:function(d){return d===tn||n.convert(d)===i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(d){const p=d===qi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(d!==_n&&n.convert(d)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&d!==on&&!p)},precision:o,logarithmicDepthBuffer:s,reverseDepthBuffer:c,maxTextures:l,maxVertexTextures:h,maxTextureSize:i.getParameter(i.MAX_TEXTURE_SIZE),maxCubemapSize:i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:i.getParameter(i.MAX_VERTEX_ATTRIBS),maxVertexUniforms:i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:i.getParameter(i.MAX_VARYING_VECTORS),maxFragmentUniforms:i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),vertexTextures:h>0,maxSamples:i.getParameter(i.MAX_SAMPLES)}}function oc(i){const e=this;let t=null,n=0,r=!1,a=!1;const o=new Pn,u=new Ge,s={value:null,needsUpdate:!1};function c(l,h,d,p){const m=l!==null?l.length:0;let _=null;if(m!==0){if(_=s.value,p!==!0||_===null){const g=d+4*m,f=h.matrixWorldInverse;u.getNormalMatrix(f),(_===null||_.length<g)&&(_=new Float32Array(g));for(let v=0,x=d;v!==m;++v,x+=4)o.copy(l[v]).applyMatrix4(f,u),o.normal.toArray(_,x),_[x+3]=o.constant}s.value=_,s.needsUpdate=!0}return e.numPlanes=m,e.numIntersection=0,_}this.uniform=s,this.numPlanes=0,this.numIntersection=0,this.init=function(l,h){const d=l.length!==0||h||n!==0||r;return r=h,n=l.length,d},this.beginShadows=function(){a=!0,c(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(l,h){t=c(l,h,0)},this.setState=function(l,h,d){const p=l.clippingPlanes,m=l.clipIntersection,_=l.clipShadows,g=i.get(l);if(!r||p===null||p.length===0||a&&!_)a?c(null):function(){s.value!==t&&(s.value=t,s.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}();else{const f=a?0:n,v=4*f;let x=g.clippingState||null;s.value=x,x=c(p,h,v,d);for(let M=0;M!==v;++M)x[M]=t[M];g.clippingState=x,this.numIntersection=m?this.numPlanes:0,this.numPlanes+=f}}}function lc(i){let e=new WeakMap;function t(r,a){return a===Da?r.mapping=vi:a===Ua&&(r.mapping=xi),r}function n(r){const a=r.target;a.removeEventListener("dispose",n);const o=e.get(a);o!==void 0&&(e.delete(a),o.dispose())}return{get:function(r){if(r&&r.isTexture){const a=r.mapping;if(a===Da||a===Ua){if(e.has(r))return t(e.get(r).texture,r.mapping);{const o=r.image;if(o&&o.height>0){const u=new $l(o.height);return u.fromEquirectangularTexture(i,r),e.set(r,u),r.addEventListener("dispose",n),t(u.texture,r.mapping)}return null}}}return r},dispose:function(){e=new WeakMap}}}class ys extends Ss{constructor(e=-1,t=1,n=1,r=-1,a=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=r,this.near=a,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,r,a,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=r,this.view.width=a,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,r=(this.top+this.bottom)/2;let a=n-e,o=n+e,u=r+t,s=r-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,l=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,o=a+c*this.view.width,u-=l*this.view.offsetY,s=u-l*this.view.height}this.projectionMatrix.makeOrthographic(a,o,u,s,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}const Js=[.125,.215,.35,.446,.526,.582],Ni=20,_a=new ys,$s=new Be;let va=null,xa=0,Ma=0,Sa=!1;const kn=(1+Math.sqrt(5))/2,ui=1/kn,Qs=[new A(-kn,ui,0),new A(kn,ui,0),new A(-ui,0,kn),new A(ui,0,kn),new A(0,kn,-ui),new A(0,kn,ui),new A(-1,1,-1),new A(1,1,-1),new A(-1,1,1),new A(1,1,1)];class eo{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,r=100){va=this._renderer.getRenderTarget(),xa=this._renderer.getActiveCubeFace(),Ma=this._renderer.getActiveMipmapLevel(),Sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(e,n,r,a),t>0&&this._blur(a,0,0,t),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=io(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=no(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(va,xa,Ma),this._renderer.xr.enabled=Sa,e.scissorTest=!1,_r(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===vi||e.mapping===xi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),va=this._renderer.getRenderTarget(),xa=this._renderer.getActiveCubeFace(),Ma=this._renderer.getActiveMipmapLevel(),Sa=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:sn,minFilter:sn,generateMipmaps:!1,type:qi,format:tn,colorSpace:In,depthBuffer:!1},r=to(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=to(e,t,n);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=function(o){const u=[],s=[],c=[];let l=o;const h=o-4+1+Js.length;for(let d=0;d<h;d++){const p=Math.pow(2,l);s.push(p);let m=1/p;d>o-4?m=Js[d-o+4-1]:d===0&&(m=0),c.push(m);const _=1/(p-2),g=-_,f=1+_,v=[g,g,f,g,f,f,g,g,f,f,g,f],x=6,M=6,w=3,R=2,P=1,q=new Float32Array(w*M*x),U=new Float32Array(R*M*x),k=new Float32Array(P*M*x);for(let F=0;F<x;F++){const Z=F%3*2/3-1,j=F>2?0:-1,J=[Z,j,0,Z+2/3,j,0,Z+2/3,j+1,0,Z,j,0,Z+2/3,j+1,0,Z,j+1,0];q.set(J,w*M*F),U.set(v,R*M*F);const z=[F,F,F,F,F,F];k.set(z,P*M*F)}const K=new Ft;K.setAttribute("position",new Ht(q,w)),K.setAttribute("uv",new Ht(U,R)),K.setAttribute("faceIndex",new Ht(k,P)),u.push(K),l>4&&l--}return{lodPlanes:u,sizeLods:s,sigmas:c}}(a)),this._blurMaterial=function(o,u,s){const c=new Float32Array(Ni),l=new A(0,1,0);return new Un({name:"SphericalGaussianBlur",defines:{n:Ni,CUBEUV_TEXEL_WIDTH:1/u,CUBEUV_TEXEL_HEIGHT:1/s,CUBEUV_MAX_MIP:`${o}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:c},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:l}},vertexShader:Es(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}(a,e,t)}return r}_compileMaterial(e){const t=new _t(this._lodPlanes[0],e);this._renderer.compile(t,_a)}_sceneToCubeUV(e,t,n,r){const a=new Wt(90,1,t,n),o=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],s=this._renderer,c=s.autoClear,l=s.toneMapping;s.getClearColor($s),s.toneMapping=Ln,s.autoClear=!1;const h=new Xn({name:"PMREM.Background",side:Nt,depthWrite:!1,depthTest:!1}),d=new _t(new Zn,h);let p=!1;const m=e.background;m?m.isColor&&(h.color.copy(m),e.background=null,p=!0):(h.color.copy($s),p=!0);for(let _=0;_<6;_++){const g=_%3;g===0?(a.up.set(0,o[_],0),a.lookAt(u[_],0,0)):g===1?(a.up.set(0,0,o[_]),a.lookAt(0,u[_],0)):(a.up.set(0,o[_],0),a.lookAt(0,0,u[_]));const f=this._cubeSize;_r(r,g*f,_>2?f:0,f,f),s.setRenderTarget(r),p&&s.render(d,a),s.render(e,a)}d.geometry.dispose(),d.material.dispose(),s.toneMapping=l,s.autoClear=c,e.background=m}_textureToCubeUV(e,t){const n=this._renderer,r=e.mapping===vi||e.mapping===xi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=io()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=no());const a=r?this._cubemapMaterial:this._equirectMaterial,o=new _t(this._lodPlanes[0],a);a.uniforms.envMap.value=e;const u=this._cubeSize;_r(t,0,0,3*u,2*u),n.setRenderTarget(t),n.render(o,_a)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const r=this._lodPlanes.length;for(let a=1;a<r;a++){const o=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),u=Qs[(r-a-1)%Qs.length];this._blur(e,a-1,a,o,u)}t.autoClear=n}_blur(e,t,n,r,a){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,r,"latitudinal",a),this._halfBlur(o,e,n,n,r,"longitudinal",a)}_halfBlur(e,t,n,r,a,o,u){const s=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const l=new _t(this._lodPlanes[r],c),h=c.uniforms,d=this._sizeLods[n]-1,p=isFinite(a)?Math.PI/(2*d):2*Math.PI/39,m=a/p,_=isFinite(a)?1+Math.floor(3*m):Ni;_>Ni&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${_} samples when the maximum is set to 20`);const g=[];let f=0;for(let M=0;M<Ni;++M){const w=M/m,R=Math.exp(-w*w/2);g.push(R),M===0?f+=R:M<_&&(f+=2*R)}for(let M=0;M<g.length;M++)g[M]=g[M]/f;h.envMap.value=e.texture,h.samples.value=_,h.weights.value=g,h.latitudinal.value=o==="latitudinal",u&&(h.poleAxis.value=u);const{_lodMax:v}=this;h.dTheta.value=p,h.mipInt.value=v-n;const x=this._sizeLods[r];_r(t,3*x*(r>v-4?r-v+4:0),4*(this._cubeSize-x),3*x,2*x),s.setRenderTarget(t),s.render(l,_a)}}function to(i,e,t){const n=new qn(i,e,t);return n.texture.mapping=zr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function _r(i,e,t,n,r){i.viewport.set(e,t,n,r),i.scissor.set(e,t,n,r)}function no(){return new Un({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Es(),fragmentShader:`

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
	`}function cc(i){let e=new WeakMap,t=null;function n(r){const a=r.target;a.removeEventListener("dispose",n);const o=e.get(a);o!==void 0&&(e.delete(a),o.dispose())}return{get:function(r){if(r&&r.isTexture){const a=r.mapping,o=a===Da||a===Ua,u=a===vi||a===xi;if(o||u){let s=e.get(r);const c=s!==void 0?s.texture.pmremVersion:0;if(r.isRenderTargetTexture&&r.pmremVersion!==c)return t===null&&(t=new eo(i)),s=o?t.fromEquirectangular(r,s):t.fromCubemap(r,s),s.texture.pmremVersion=r.pmremVersion,e.set(r,s),s.texture;if(s!==void 0)return s.texture;{const l=r.image;return o&&l&&l.height>0||u&&l&&function(h){let d=0;const p=6;for(let m=0;m<p;m++)h[m]!==void 0&&d++;return d===p}(l)?(t===null&&(t=new eo(i)),s=o?t.fromEquirectangular(r):t.fromCubemap(r),s.texture.pmremVersion=r.pmremVersion,e.set(r,s),r.addEventListener("dispose",n),s.texture):null}}}return r},dispose:function(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}}}function uc(i){const e={};function t(n){if(e[n]!==void 0)return e[n];let r;switch(n){case"WEBGL_depth_texture":r=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=i.getExtension(n)}return e[n]=r,r}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const r=t(n);return r===null&&Ar("THREE.WebGLRenderer: "+n+" extension not supported."),r}}}function hc(i,e,t,n){const r={},a=new WeakMap;function o(s){const c=s.target;c.index!==null&&e.remove(c.index);for(const h in c.attributes)e.remove(c.attributes[h]);for(const h in c.morphAttributes){const d=c.morphAttributes[h];for(let p=0,m=d.length;p<m;p++)e.remove(d[p])}c.removeEventListener("dispose",o),delete r[c.id];const l=a.get(c);l&&(e.remove(l),a.delete(c)),n.releaseStatesOfGeometry(c),c.isInstancedBufferGeometry===!0&&delete c._maxInstanceCount,t.memory.geometries--}function u(s){const c=[],l=s.index,h=s.attributes.position;let d=0;if(l!==null){const _=l.array;d=l.version;for(let g=0,f=_.length;g<f;g+=3){const v=_[g+0],x=_[g+1],M=_[g+2];c.push(v,x,x,M,M,v)}}else{if(h===void 0)return;{const _=h.array;d=h.version;for(let g=0,f=_.length/3-1;g<f;g+=3){const v=g+0,x=g+1,M=g+2;c.push(v,x,x,M,M,v)}}}const p=new(Zo(c)?tl:el)(c,1);p.version=d;const m=a.get(s);m&&e.remove(m),a.set(s,p)}return{get:function(s,c){return r[c.id]===!0||(c.addEventListener("dispose",o),r[c.id]=!0,t.memory.geometries++),c},update:function(s){const c=s.attributes;for(const h in c)e.update(c[h],i.ARRAY_BUFFER);const l=s.morphAttributes;for(const h in l){const d=l[h];for(let p=0,m=d.length;p<m;p++)e.update(d[p],i.ARRAY_BUFFER)}},getWireframeAttribute:function(s){const c=a.get(s);if(c){const l=s.index;l!==null&&c.version<l.version&&u(s)}else u(s);return a.get(s)}}}function dc(i,e,t){let n,r,a;function o(u,s,c){c!==0&&(i.drawElementsInstanced(n,s,r,u*a,c),t.update(s,n,c))}this.setMode=function(u){n=u},this.setIndex=function(u){r=u.type,a=u.bytesPerElement},this.render=function(u,s){i.drawElements(n,s,r,u*a),t.update(s,n,1)},this.renderInstances=o,this.renderMultiDraw=function(u,s,c){if(c===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,s,0,r,u,0,c);let l=0;for(let h=0;h<c;h++)l+=s[h];t.update(l,n,1)},this.renderMultiDrawInstances=function(u,s,c,l){if(c===0)return;const h=e.get("WEBGL_multi_draw");if(h===null)for(let d=0;d<u.length;d++)o(u[d]/a,s[d],l[d]);else{h.multiDrawElementsInstancedWEBGL(n,s,0,r,u,0,l,0,c);let d=0;for(let p=0;p<c;p++)d+=s[p];for(let p=0;p<l.length;p++)t.update(d,n,l[p])}}}function pc(i){const e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,n,r){switch(e.calls++,n){case i.TRIANGLES:e.triangles+=r*(t/3);break;case i.LINES:e.lines+=r*(t/2);break;case i.LINE_STRIP:e.lines+=r*(t-1);break;case i.LINE_LOOP:e.lines+=r*t;break;case i.POINTS:e.points+=r*t;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",n)}}}}function fc(i,e,t){const n=new WeakMap,r=new rt;return{update:function(a,o,u){const s=a.morphTargetInfluences,c=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,l=c!==void 0?c.length:0;let h=n.get(o);if(h===void 0||h.count!==l){let q=function(){R.dispose(),n.delete(o),o.removeEventListener("dispose",q)};h!==void 0&&h.texture.dispose();const d=o.morphAttributes.position!==void 0,p=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,_=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],f=o.morphAttributes.color||[];let v=0;d===!0&&(v=1),p===!0&&(v=2),m===!0&&(v=3);let x=o.attributes.position.count*v,M=1;x>e.maxTextureSize&&(M=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);const w=new Float32Array(x*M*4*l),R=new $o(w,x,M,l);R.type=on,R.needsUpdate=!0;const P=4*v;for(let U=0;U<l;U++){const k=_[U],K=g[U],F=f[U],Z=x*M*4*U;for(let j=0;j<k.count;j++){const J=j*P;d===!0&&(r.fromBufferAttribute(k,j),w[Z+J+0]=r.x,w[Z+J+1]=r.y,w[Z+J+2]=r.z,w[Z+J+3]=0),p===!0&&(r.fromBufferAttribute(K,j),w[Z+J+4]=r.x,w[Z+J+5]=r.y,w[Z+J+6]=r.z,w[Z+J+7]=0),m===!0&&(r.fromBufferAttribute(F,j),w[Z+J+8]=r.x,w[Z+J+9]=r.y,w[Z+J+10]=r.z,w[Z+J+11]=F.itemSize===4?r.w:1)}}h={count:l,texture:R,size:new ze(x,M)},n.set(o,h),o.addEventListener("dispose",q)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)u.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let d=0;for(let m=0;m<s.length;m++)d+=s[m];const p=o.morphTargetsRelative?1:1-d;u.getUniforms().setValue(i,"morphTargetBaseInfluence",p),u.getUniforms().setValue(i,"morphTargetInfluences",s)}u.getUniforms().setValue(i,"morphTargetsTexture",h.texture,t),u.getUniforms().setValue(i,"morphTargetsTextureSize",h.size)}}}function mc(i,e,t,n){let r=new WeakMap;function a(o){const u=o.target;u.removeEventListener("dispose",a),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:function(o){const u=n.render.frame,s=o.geometry,c=e.get(o,s);if(r.get(c)!==u&&(e.update(c),r.set(c,u)),o.isInstancedMesh&&(o.hasEventListener("dispose",a)===!1&&o.addEventListener("dispose",a),r.get(o)!==u&&(t.update(o.instanceMatrix,i.ARRAY_BUFFER),o.instanceColor!==null&&t.update(o.instanceColor,i.ARRAY_BUFFER),r.set(o,u))),o.isSkinnedMesh){const l=o.skeleton;r.get(l)!==u&&(l.update(),r.set(l,u))}return c},dispose:function(){r=new WeakMap}}}class al extends Pt{constructor(e,t,n,r,a,o,u,s,c,l=1026){if(l!==Xi&&l!==Si)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&l===Xi&&(n=jn),n===void 0&&l===Si&&(n=Mi),super(null,r,a,o,u,s,l,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=u!==void 0?u:jt,this.minFilter=s!==void 0?s:jt,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}const sl=new Pt,ro=new al(1,1),ol=new $o,ll=new zl,cl=new il,ao=[],so=[],oo=new Float32Array(16),lo=new Float32Array(9),co=new Float32Array(4);function Ai(i,e,t){const n=i[0];if(n<=0||n>0)return i;const r=e*t;let a=ao[r];if(a===void 0&&(a=new Float32Array(r),ao[r]=a),e!==0){n.toArray(a,0);for(let o=1,u=0;o!==e;++o)u+=t,i[o].toArray(a,u)}return a}function Mt(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function St(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function Vr(i,e){let t=so[e];t===void 0&&(t=new Int32Array(e),so[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function gc(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function _c(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;i.uniform2fv(this.addr,e),St(t,e)}}function vc(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Mt(t,e))return;i.uniform3fv(this.addr,e),St(t,e)}}function xc(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;i.uniform4fv(this.addr,e),St(t,e)}}function Mc(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,n))return;co.set(n),i.uniformMatrix2fv(this.addr,!1,co),St(t,n)}}function Sc(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,n))return;lo.set(n),i.uniformMatrix3fv(this.addr,!1,lo),St(t,n)}}function yc(i,e){const t=this.cache,n=e.elements;if(n===void 0){if(Mt(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),St(t,e)}else{if(Mt(t,n))return;oo.set(n),i.uniformMatrix4fv(this.addr,!1,oo),St(t,n)}}function Ec(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function bc(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;i.uniform2iv(this.addr,e),St(t,e)}}function Tc(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;i.uniform3iv(this.addr,e),St(t,e)}}function wc(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;i.uniform4iv(this.addr,e),St(t,e)}}function Ac(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function Rc(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Mt(t,e))return;i.uniform2uiv(this.addr,e),St(t,e)}}function Cc(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Mt(t,e))return;i.uniform3uiv(this.addr,e),St(t,e)}}function Pc(i,e){const t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Mt(t,e))return;i.uniform4uiv(this.addr,e),St(t,e)}}function Lc(i,e,t){const n=this.cache,r=t.allocateTextureUnit();let a;n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),this.type===i.SAMPLER_2D_SHADOW?(ro.compareFunction=Ko,a=ro):a=sl,t.setTexture2D(e||a,r)}function Dc(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture3D(e||ll,r)}function Uc(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTextureCube(e||cl,r)}function Ic(i,e,t){const n=this.cache,r=t.allocateTextureUnit();n[0]!==r&&(i.uniform1i(this.addr,r),n[0]=r),t.setTexture2DArray(e||ol,r)}function Nc(i,e){i.uniform1fv(this.addr,e)}function Oc(i,e){const t=Ai(e,this.size,2);i.uniform2fv(this.addr,t)}function Fc(i,e){const t=Ai(e,this.size,3);i.uniform3fv(this.addr,t)}function Bc(i,e){const t=Ai(e,this.size,4);i.uniform4fv(this.addr,t)}function zc(i,e){const t=Ai(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function Hc(i,e){const t=Ai(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function Gc(i,e){const t=Ai(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function Vc(i,e){i.uniform1iv(this.addr,e)}function kc(i,e){i.uniform2iv(this.addr,e)}function Wc(i,e){i.uniform3iv(this.addr,e)}function Xc(i,e){i.uniform4iv(this.addr,e)}function jc(i,e){i.uniform1uiv(this.addr,e)}function qc(i,e){i.uniform2uiv(this.addr,e)}function Yc(i,e){i.uniform3uiv(this.addr,e)}function Kc(i,e){i.uniform4uiv(this.addr,e)}function Zc(i,e,t){const n=this.cache,r=e.length,a=Vr(t,r);Mt(n,a)||(i.uniform1iv(this.addr,a),St(n,a));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||sl,a[o])}function Jc(i,e,t){const n=this.cache,r=e.length,a=Vr(t,r);Mt(n,a)||(i.uniform1iv(this.addr,a),St(n,a));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||ll,a[o])}function $c(i,e,t){const n=this.cache,r=e.length,a=Vr(t,r);Mt(n,a)||(i.uniform1iv(this.addr,a),St(n,a));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||cl,a[o])}function Qc(i,e,t){const n=this.cache,r=e.length,a=Vr(t,r);Mt(n,a)||(i.uniform1iv(this.addr,a),St(n,a));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||ol,a[o])}class eu{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=function(r){switch(r){case 5126:return gc;case 35664:return _c;case 35665:return vc;case 35666:return xc;case 35674:return Mc;case 35675:return Sc;case 35676:return yc;case 5124:case 35670:return Ec;case 35667:case 35671:return bc;case 35668:case 35672:return Tc;case 35669:case 35673:return wc;case 5125:return Ac;case 36294:return Rc;case 36295:return Cc;case 36296:return Pc;case 35678:case 36198:case 36298:case 36306:case 35682:return Lc;case 35679:case 36299:case 36307:return Dc;case 35680:case 36300:case 36308:case 36293:return Uc;case 36289:case 36303:case 36311:case 36292:return Ic}}(t.type)}}class tu{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=function(r){switch(r){case 5126:return Nc;case 35664:return Oc;case 35665:return Fc;case 35666:return Bc;case 35674:return zc;case 35675:return Hc;case 35676:return Gc;case 5124:case 35670:return Vc;case 35667:case 35671:return kc;case 35668:case 35672:return Wc;case 35669:case 35673:return Xc;case 5125:return jc;case 36294:return qc;case 36295:return Yc;case 36296:return Kc;case 35678:case 36198:case 36298:case 36306:case 35682:return Zc;case 35679:case 36299:case 36307:return Jc;case 35680:case 36300:case 36308:case 36293:return $c;case 36289:case 36303:case 36311:case 36292:return Qc}}(t.type)}}class nu{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const r=this.seq;for(let a=0,o=r.length;a!==o;++a){const u=r[a];u.setValue(e,t[u.id],n)}}}const ya=/(\w+)(\])?(\[|\.)?/g;function uo(i,e){i.seq.push(e),i.map[e.id]=e}function iu(i,e,t){const n=i.name,r=n.length;for(ya.lastIndex=0;;){const a=ya.exec(n),o=ya.lastIndex;let u=a[1];const s=a[2]==="]",c=a[3];if(s&&(u|=0),c===void 0||c==="["&&o+2===r){uo(t,c===void 0?new eu(u,i,e):new tu(u,i,e));break}{let l=t.map[u];l===void 0&&(l=new nu(u),uo(t,l)),t=l}}}class Rr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const a=e.getActiveUniform(t,r);iu(a,e.getUniformLocation(t,a.name),this)}}setValue(e,t,n,r){const a=this.map[t];a!==void 0&&a.setValue(e,n,r)}setOptional(e,t,n){const r=t[n];r!==void 0&&this.setValue(e,n,r)}static upload(e,t,n,r){for(let a=0,o=t.length;a!==o;++a){const u=t[a],s=n[u.id];s.needsUpdate!==!1&&u.setValue(e,s.value,r)}}static seqWithValue(e,t){const n=[];for(let r=0,a=e.length;r!==a;++r){const o=e[r];o.id in t&&n.push(o)}return n}}function ho(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const ru=37297;let au=0;function po(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=i.getShaderInfoLog(e).trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+function(u,s){const c=u.split(`
`),l=[],h=Math.max(s-6,0),d=Math.min(s+6,c.length);for(let p=h;p<d;p++){const m=p+1;l.push(`${m===s?">":" "} ${m}: ${c[p]}`)}return l.join(`
`)}(i.getShaderSource(e),o)}return r}function su(i,e){const t=function(n){const r=it.getPrimaries(it.workingColorSpace),a=it.getPrimaries(n);let o;switch(r===a?o="":r===Ur&&a===Dr?o="LinearDisplayP3ToLinearSRGB":r===Dr&&a===Ur&&(o="LinearSRGBToLinearDisplayP3"),n){case In:case Hr:return[o,"LinearTransferOETF"];case kt:case xs:return[o,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",n),[o,"LinearTransferOETF"]}}(e);return`vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`}function ou(i,e){let t;switch(e){case Tl:t="Linear";break;case wl:t="Reinhard";break;case Al:t="Cineon";break;case Bo:t="ACESFilmic";break;case Cl:t="AgX";break;case Pl:t="Neutral";break;case Rl:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const vr=new A;function lu(){return it.getLuminanceCoefficients(vr),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${vr.x.toFixed(4)}, ${vr.y.toFixed(4)}, ${vr.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Oi(i){return i!==""}function fo(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function mo(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const cu=/^[ \t]*#include +<([\w\d./]+)>/gm;function ls(i){return i.replace(cu,hu)}const uu=new Map;function hu(i,e){let t=He[e];if(t===void 0){const n=uu.get(e);if(n===void 0)throw new Error("Can not resolve #include <"+e+">");t=He[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n)}return ls(t)}const du=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function go(i){return i.replace(du,pu)}function pu(i,e,t,n){let r="";for(let a=parseInt(e);a<parseInt(t);a++)r+=n.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return r}function _o(i){let e=`precision ${i.precision} float;
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
#define LOW_PRECISION`),e}function fu(i,e,t,n){const r=i.getContext(),a=t.defines;let o=t.vertexShader,u=t.fragmentShader;const s=function(K){let F="SHADOWMAP_TYPE_BASIC";return K.shadowMapType===No?F="SHADOWMAP_TYPE_PCF":K.shadowMapType===Oo?F="SHADOWMAP_TYPE_PCF_SOFT":K.shadowMapType===gn&&(F="SHADOWMAP_TYPE_VSM"),F}(t),c=function(K){let F="ENVMAP_TYPE_CUBE";if(K.envMap)switch(K.envMapMode){case vi:case xi:F="ENVMAP_TYPE_CUBE";break;case zr:F="ENVMAP_TYPE_CUBE_UV"}return F}(t),l=function(K){let F="ENVMAP_MODE_REFLECTION";return K.envMap&&K.envMapMode===xi&&(F="ENVMAP_MODE_REFRACTION"),F}(t),h=function(K){let F="ENVMAP_BLENDING_NONE";if(K.envMap)switch(K.combine){case Fo:F="ENVMAP_BLENDING_MULTIPLY";break;case El:F="ENVMAP_BLENDING_MIX";break;case bl:F="ENVMAP_BLENDING_ADD"}return F}(t),d=function(K){const F=K.envMapCubeUVHeight;if(F===null)return null;const Z=Math.log2(F)-2,j=1/F;return{texelWidth:1/(3*Math.max(Math.pow(2,Z),112)),texelHeight:j,maxMip:Z}}(t),p=function(K){return[K.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",K.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Oi).join(`
`)}(t),m=function(K){const F=[];for(const Z in K){const j=K[Z];j!==!1&&F.push("#define "+Z+" "+j)}return F.join(`
`)}(a),_=r.createProgram();let g,f,v=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Oi).join(`
`),g.length>0&&(g+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Oi).join(`
`),f.length>0&&(f+=`
`)):(g=[_o(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+s:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Oi).join(`
`),f=[_o(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+s:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ln?"#define TONE_MAPPING":"",t.toneMapping!==Ln?He.tonemapping_pars_fragment:"",t.toneMapping!==Ln?ou("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",He.colorspace_pars_fragment,su("linearToOutputTexel",t.outputColorSpace),lu(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Oi).join(`
`)),o=ls(o),o=fo(o,t),o=mo(o,t),u=ls(u),u=fo(u,t),u=mo(u,t),o=go(o),u=go(u),t.isRawShaderMaterial!==!0&&(v=`#version 300 es
`,g=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,f=["#define varying in",t.glslVersion===Us?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Us?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const x=v+g+o,M=v+f+u,w=ho(r,r.VERTEX_SHADER,x),R=ho(r,r.FRAGMENT_SHADER,M);function P(K){if(i.debug.checkShaderErrors){const F=r.getProgramInfoLog(_).trim(),Z=r.getShaderInfoLog(w).trim(),j=r.getShaderInfoLog(R).trim();let J=!0,z=!0;if(r.getProgramParameter(_,r.LINK_STATUS)===!1)if(J=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(r,_,w,R);else{const re=po(r,w,"vertex"),ue=po(r,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(_,r.VALIDATE_STATUS)+`

Material Name: `+K.name+`
Material Type: `+K.type+`

Program Info Log: `+F+`
`+re+`
`+ue)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):Z!==""&&j!==""||(z=!1);z&&(K.diagnostics={runnable:J,programLog:F,vertexShader:{log:Z,prefix:g},fragmentShader:{log:j,prefix:f}})}r.deleteShader(w),r.deleteShader(R),q=new Rr(r,_),U=function(F,Z){const j={},J=F.getProgramParameter(Z,F.ACTIVE_ATTRIBUTES);for(let z=0;z<J;z++){const re=F.getActiveAttrib(Z,z),ue=re.name;let fe=1;re.type===F.FLOAT_MAT2&&(fe=2),re.type===F.FLOAT_MAT3&&(fe=3),re.type===F.FLOAT_MAT4&&(fe=4),j[ue]={type:re.type,location:F.getAttribLocation(Z,ue),locationSize:fe}}return j}(r,_)}let q,U;r.attachShader(_,w),r.attachShader(_,R),t.index0AttributeName!==void 0?r.bindAttribLocation(_,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(_,0,"position"),r.linkProgram(_),this.getUniforms=function(){return q===void 0&&P(this),q},this.getAttributes=function(){return U===void 0&&P(this),U};let k=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return k===!1&&(k=r.getProgramParameter(_,ru)),k},this.destroy=function(){n.releaseStatesOfProgram(this),r.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=au++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=w,this.fragmentShader=R,this}let mu=0;class gu{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,r=this._getShaderStage(t),a=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(a)===!1&&(o.add(a),a.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new _u(e),t.set(e,n)),n}}class _u{constructor(e){this.id=mu++,this.code=e,this.usedTimes=0}}function vu(i,e,t,n,r,a,o){const u=new Ms,s=new gu,c=new Set,l=[],h=r.logarithmicDepthBuffer,d=r.reverseDepthBuffer,p=r.vertexTextures;let m=r.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(f){return c.add(f),f===0?"uv":`uv${f}`}return{getParameters:function(f,v,x,M,w){const R=M.fog,P=w.geometry,q=f.isMeshStandardMaterial?M.environment:null,U=(f.isMeshStandardMaterial?t:e).get(f.envMap||q),k=U&&U.mapping===zr?U.image.height:null,K=_[f.type];f.precision!==null&&(m=r.getMaxPrecision(f.precision),m!==f.precision&&console.warn("THREE.WebGLProgram.getParameters:",f.precision,"not supported, using",m,"instead."));const F=P.morphAttributes.position||P.morphAttributes.normal||P.morphAttributes.color,Z=F!==void 0?F.length:0;let j,J,z,re,ue=0;if(P.morphAttributes.position!==void 0&&(ue=1),P.morphAttributes.normal!==void 0&&(ue=2),P.morphAttributes.color!==void 0&&(ue=3),K){const ie=an[K];j=ie.vertexShader,J=ie.fragmentShader}else j=f.vertexShader,J=f.fragmentShader,s.update(f),z=s.getVertexShaderID(f),re=s.getFragmentShaderID(f);const fe=i.getRenderTarget(),Ae=w.isInstancedMesh===!0,Q=w.isBatchedMesh===!0,se=!!f.map,Se=!!f.matcap,be=!!U,T=!!f.aoMap,S=!!f.lightMap,D=!!f.bumpMap,Y=!!f.normalMap,I=!!f.displacementMap,B=!!f.emissiveMap,b=!!f.metalnessMap,H=!!f.roughnessMap,V=f.anisotropy>0,le=f.clearcoat>0,G=f.dispersion>0,ne=f.iridescence>0,oe=f.sheen>0,ee=f.transmission>0,_e=V&&!!f.anisotropyMap,pe=le&&!!f.clearcoatMap,Te=le&&!!f.clearcoatNormalMap,Le=le&&!!f.clearcoatRoughnessMap,je=ne&&!!f.iridescenceMap,Ye=ne&&!!f.iridescenceThicknessMap,xe=oe&&!!f.sheenColorMap,Ke=oe&&!!f.sheenRoughnessMap,et=!!f.specularMap,Qe=!!f.specularColorMap,me=!!f.specularIntensityMap,Oe=ee&&!!f.transmissionMap,tt=ee&&!!f.thicknessMap,Jn=!!f.gradientMap,Mn=!!f.alphaMap,wt=f.alphaTest>0,L=!!f.alphaHash,C=!!f.extensions;let y=Ln;f.toneMapped&&(fe!==null&&fe.isXRRenderTarget!==!0||(y=i.toneMapping));const ae={shaderID:K,shaderType:f.type,shaderName:f.name,vertexShader:j,fragmentShader:J,defines:f.defines,customVertexShaderID:z,customFragmentShaderID:re,isRawShaderMaterial:f.isRawShaderMaterial===!0,glslVersion:f.glslVersion,precision:m,batching:Q,batchingColor:Q&&w._colorsTexture!==null,instancing:Ae,instancingColor:Ae&&w.instanceColor!==null,instancingMorph:Ae&&w.morphTexture!==null,supportsVertexTextures:p,outputColorSpace:fe===null?i.outputColorSpace:fe.isXRRenderTarget===!0?fe.texture.colorSpace:In,alphaToCoverage:!!f.alphaToCoverage,map:se,matcap:Se,envMap:be,envMapMode:be&&U.mapping,envMapCubeUVHeight:k,aoMap:T,lightMap:S,bumpMap:D,normalMap:Y,displacementMap:p&&I,emissiveMap:B,normalMapObjectSpace:Y&&f.normalMapType===1,normalMapTangentSpace:Y&&f.normalMapType===0,metalnessMap:b,roughnessMap:H,anisotropy:V,anisotropyMap:_e,clearcoat:le,clearcoatMap:pe,clearcoatNormalMap:Te,clearcoatRoughnessMap:Le,dispersion:G,iridescence:ne,iridescenceMap:je,iridescenceThicknessMap:Ye,sheen:oe,sheenColorMap:xe,sheenRoughnessMap:Ke,specularMap:et,specularColorMap:Qe,specularIntensityMap:me,transmission:ee,transmissionMap:Oe,thicknessMap:tt,gradientMap:Jn,opaque:f.transparent===!1&&f.blending===1&&f.alphaToCoverage===!1,alphaMap:Mn,alphaTest:wt,alphaHash:L,combine:f.combine,mapUv:se&&g(f.map.channel),aoMapUv:T&&g(f.aoMap.channel),lightMapUv:S&&g(f.lightMap.channel),bumpMapUv:D&&g(f.bumpMap.channel),normalMapUv:Y&&g(f.normalMap.channel),displacementMapUv:I&&g(f.displacementMap.channel),emissiveMapUv:B&&g(f.emissiveMap.channel),metalnessMapUv:b&&g(f.metalnessMap.channel),roughnessMapUv:H&&g(f.roughnessMap.channel),anisotropyMapUv:_e&&g(f.anisotropyMap.channel),clearcoatMapUv:pe&&g(f.clearcoatMap.channel),clearcoatNormalMapUv:Te&&g(f.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Le&&g(f.clearcoatRoughnessMap.channel),iridescenceMapUv:je&&g(f.iridescenceMap.channel),iridescenceThicknessMapUv:Ye&&g(f.iridescenceThicknessMap.channel),sheenColorMapUv:xe&&g(f.sheenColorMap.channel),sheenRoughnessMapUv:Ke&&g(f.sheenRoughnessMap.channel),specularMapUv:et&&g(f.specularMap.channel),specularColorMapUv:Qe&&g(f.specularColorMap.channel),specularIntensityMapUv:me&&g(f.specularIntensityMap.channel),transmissionMapUv:Oe&&g(f.transmissionMap.channel),thicknessMapUv:tt&&g(f.thicknessMap.channel),alphaMapUv:Mn&&g(f.alphaMap.channel),vertexTangents:!!P.attributes.tangent&&(Y||V),vertexColors:f.vertexColors,vertexAlphas:f.vertexColors===!0&&!!P.attributes.color&&P.attributes.color.itemSize===4,pointsUvs:w.isPoints===!0&&!!P.attributes.uv&&(se||Mn),fog:!!R,useFog:f.fog===!0,fogExp2:!!R&&R.isFogExp2,flatShading:f.flatShading===!0,sizeAttenuation:f.sizeAttenuation===!0,logarithmicDepthBuffer:h,reverseDepthBuffer:d,skinning:w.isSkinnedMesh===!0,morphTargets:P.morphAttributes.position!==void 0,morphNormals:P.morphAttributes.normal!==void 0,morphColors:P.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:ue,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:f.dithering,shadowMapEnabled:i.shadowMap.enabled&&x.length>0,shadowMapType:i.shadowMap.type,toneMapping:y,decodeVideoTexture:se&&f.map.isVideoTexture===!0&&it.getTransfer(f.map.colorSpace)===ct,premultipliedAlpha:f.premultipliedAlpha,doubleSided:f.side===2,flipSided:f.side===Nt,useDepthPacking:f.depthPacking>=0,depthPacking:f.depthPacking||0,index0AttributeName:f.index0AttributeName,extensionClipCullDistance:C&&f.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(C&&f.extensions.multiDraw===!0||Q)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:f.customProgramCacheKey()};return ae.vertexUv1s=c.has(1),ae.vertexUv2s=c.has(2),ae.vertexUv3s=c.has(3),c.clear(),ae},getProgramCacheKey:function(f){const v=[];if(f.shaderID?v.push(f.shaderID):(v.push(f.customVertexShaderID),v.push(f.customFragmentShaderID)),f.defines!==void 0)for(const x in f.defines)v.push(x),v.push(f.defines[x]);return f.isRawShaderMaterial===!1&&(function(x,M){x.push(M.precision),x.push(M.outputColorSpace),x.push(M.envMapMode),x.push(M.envMapCubeUVHeight),x.push(M.mapUv),x.push(M.alphaMapUv),x.push(M.lightMapUv),x.push(M.aoMapUv),x.push(M.bumpMapUv),x.push(M.normalMapUv),x.push(M.displacementMapUv),x.push(M.emissiveMapUv),x.push(M.metalnessMapUv),x.push(M.roughnessMapUv),x.push(M.anisotropyMapUv),x.push(M.clearcoatMapUv),x.push(M.clearcoatNormalMapUv),x.push(M.clearcoatRoughnessMapUv),x.push(M.iridescenceMapUv),x.push(M.iridescenceThicknessMapUv),x.push(M.sheenColorMapUv),x.push(M.sheenRoughnessMapUv),x.push(M.specularMapUv),x.push(M.specularColorMapUv),x.push(M.specularIntensityMapUv),x.push(M.transmissionMapUv),x.push(M.thicknessMapUv),x.push(M.combine),x.push(M.fogExp2),x.push(M.sizeAttenuation),x.push(M.morphTargetsCount),x.push(M.morphAttributeCount),x.push(M.numDirLights),x.push(M.numPointLights),x.push(M.numSpotLights),x.push(M.numSpotLightMaps),x.push(M.numHemiLights),x.push(M.numRectAreaLights),x.push(M.numDirLightShadows),x.push(M.numPointLightShadows),x.push(M.numSpotLightShadows),x.push(M.numSpotLightShadowsWithMaps),x.push(M.numLightProbes),x.push(M.shadowMapType),x.push(M.toneMapping),x.push(M.numClippingPlanes),x.push(M.numClipIntersection),x.push(M.depthPacking)}(v,f),function(x,M){u.disableAll(),M.supportsVertexTextures&&u.enable(0),M.instancing&&u.enable(1),M.instancingColor&&u.enable(2),M.instancingMorph&&u.enable(3),M.matcap&&u.enable(4),M.envMap&&u.enable(5),M.normalMapObjectSpace&&u.enable(6),M.normalMapTangentSpace&&u.enable(7),M.clearcoat&&u.enable(8),M.iridescence&&u.enable(9),M.alphaTest&&u.enable(10),M.vertexColors&&u.enable(11),M.vertexAlphas&&u.enable(12),M.vertexUv1s&&u.enable(13),M.vertexUv2s&&u.enable(14),M.vertexUv3s&&u.enable(15),M.vertexTangents&&u.enable(16),M.anisotropy&&u.enable(17),M.alphaHash&&u.enable(18),M.batching&&u.enable(19),M.dispersion&&u.enable(20),M.batchingColor&&u.enable(21),x.push(u.mask),u.disableAll(),M.fog&&u.enable(0),M.useFog&&u.enable(1),M.flatShading&&u.enable(2),M.logarithmicDepthBuffer&&u.enable(3),M.reverseDepthBuffer&&u.enable(4),M.skinning&&u.enable(5),M.morphTargets&&u.enable(6),M.morphNormals&&u.enable(7),M.morphColors&&u.enable(8),M.premultipliedAlpha&&u.enable(9),M.shadowMapEnabled&&u.enable(10),M.doubleSided&&u.enable(11),M.flipSided&&u.enable(12),M.useDepthPacking&&u.enable(13),M.dithering&&u.enable(14),M.transmission&&u.enable(15),M.sheen&&u.enable(16),M.opaque&&u.enable(17),M.pointsUvs&&u.enable(18),M.decodeVideoTexture&&u.enable(19),M.alphaToCoverage&&u.enable(20),x.push(u.mask)}(v,f),v.push(i.outputColorSpace)),v.push(f.customProgramCacheKey),v.join()},getUniforms:function(f){const v=_[f.type];let x;if(v){const M=an[v];x=Zl.clone(M.uniforms)}else x=f.uniforms;return x},acquireProgram:function(f,v){let x;for(let M=0,w=l.length;M<w;M++){const R=l[M];if(R.cacheKey===v){x=R,++x.usedTimes;break}}return x===void 0&&(x=new fu(i,v,f,a),l.push(x)),x},releaseProgram:function(f){if(--f.usedTimes==0){const v=l.indexOf(f);l[v]=l[l.length-1],l.pop(),f.destroy()}},releaseShaderCache:function(f){s.remove(f)},programs:l,dispose:function(){s.dispose()}}}function xu(){let i=new WeakMap;return{has:function(e){return i.has(e)},get:function(e){let t=i.get(e);return t===void 0&&(t={},i.set(e,t)),t},remove:function(e){i.delete(e)},update:function(e,t,n){i.get(e)[t]=n},dispose:function(){i=new WeakMap}}}function Mu(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.z!==e.z?i.z-e.z:i.id-e.id}function vo(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function xo(){const i=[];let e=0;const t=[],n=[],r=[];function a(o,u,s,c,l,h){let d=i[e];return d===void 0?(d={id:o.id,object:o,geometry:u,material:s,groupOrder:c,renderOrder:o.renderOrder,z:l,group:h},i[e]=d):(d.id=o.id,d.object=o,d.geometry=u,d.material=s,d.groupOrder=c,d.renderOrder=o.renderOrder,d.z=l,d.group=h),e++,d}return{opaque:t,transmissive:n,transparent:r,init:function(){e=0,t.length=0,n.length=0,r.length=0},push:function(o,u,s,c,l,h){const d=a(o,u,s,c,l,h);s.transmission>0?n.push(d):s.transparent===!0?r.push(d):t.push(d)},unshift:function(o,u,s,c,l,h){const d=a(o,u,s,c,l,h);s.transmission>0?n.unshift(d):s.transparent===!0?r.unshift(d):t.unshift(d)},finish:function(){for(let o=e,u=i.length;o<u;o++){const s=i[o];if(s.id===null)break;s.id=null,s.object=null,s.geometry=null,s.material=null,s.group=null}},sort:function(o,u){t.length>1&&t.sort(o||Mu),n.length>1&&n.sort(u||vo),r.length>1&&r.sort(u||vo)}}}function Su(){let i=new WeakMap;return{get:function(e,t){const n=i.get(e);let r;return n===void 0?(r=new xo,i.set(e,[r])):t>=n.length?(r=new xo,n.push(r)):r=n[t],r},dispose:function(){i=new WeakMap}}}function yu(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new A,color:new Be};break;case"SpotLight":t={position:new A,direction:new A,color:new Be,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new A,color:new Be,distance:0,decay:0};break;case"HemisphereLight":t={direction:new A,skyColor:new Be,groundColor:new Be};break;case"RectAreaLight":t={color:new Be,position:new A,halfWidth:new A,halfHeight:new A}}return i[e.id]=t,t}}}let Eu=0;function bu(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function Tu(i){const e=new yu,t=function(){const u={};return{get:function(s){if(u[s.id]!==void 0)return u[s.id];let c;switch(s.type){case"DirectionalLight":case"SpotLight":c={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze};break;case"PointLight":c={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ze,shadowCameraNear:1,shadowCameraFar:1e3}}return u[s.id]=c,c}}}(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let u=0;u<9;u++)n.probe.push(new A);const r=new A,a=new Pe,o=new Pe;return{setup:function(u){let s=0,c=0,l=0;for(let P=0;P<9;P++)n.probe[P].set(0,0,0);let h=0,d=0,p=0,m=0,_=0,g=0,f=0,v=0,x=0,M=0,w=0;u.sort(bu);for(let P=0,q=u.length;P<q;P++){const U=u[P],k=U.color,K=U.intensity,F=U.distance,Z=U.shadow&&U.shadow.map?U.shadow.map.texture:null;if(U.isAmbientLight)s+=k.r*K,c+=k.g*K,l+=k.b*K;else if(U.isLightProbe){for(let j=0;j<9;j++)n.probe[j].addScaledVector(U.sh.coefficients[j],K);w++}else if(U.isDirectionalLight){const j=e.get(U);if(j.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const J=U.shadow,z=t.get(U);z.shadowIntensity=J.intensity,z.shadowBias=J.bias,z.shadowNormalBias=J.normalBias,z.shadowRadius=J.radius,z.shadowMapSize=J.mapSize,n.directionalShadow[h]=z,n.directionalShadowMap[h]=Z,n.directionalShadowMatrix[h]=U.shadow.matrix,g++}n.directional[h]=j,h++}else if(U.isSpotLight){const j=e.get(U);j.position.setFromMatrixPosition(U.matrixWorld),j.color.copy(k).multiplyScalar(K),j.distance=F,j.coneCos=Math.cos(U.angle),j.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),j.decay=U.decay,n.spot[p]=j;const J=U.shadow;if(U.map&&(n.spotLightMap[x]=U.map,x++,J.updateMatrices(U),U.castShadow&&M++),n.spotLightMatrix[p]=J.matrix,U.castShadow){const z=t.get(U);z.shadowIntensity=J.intensity,z.shadowBias=J.bias,z.shadowNormalBias=J.normalBias,z.shadowRadius=J.radius,z.shadowMapSize=J.mapSize,n.spotShadow[p]=z,n.spotShadowMap[p]=Z,v++}p++}else if(U.isRectAreaLight){const j=e.get(U);j.color.copy(k).multiplyScalar(K),j.halfWidth.set(.5*U.width,0,0),j.halfHeight.set(0,.5*U.height,0),n.rectArea[m]=j,m++}else if(U.isPointLight){const j=e.get(U);if(j.color.copy(U.color).multiplyScalar(U.intensity),j.distance=U.distance,j.decay=U.decay,U.castShadow){const J=U.shadow,z=t.get(U);z.shadowIntensity=J.intensity,z.shadowBias=J.bias,z.shadowNormalBias=J.normalBias,z.shadowRadius=J.radius,z.shadowMapSize=J.mapSize,z.shadowCameraNear=J.camera.near,z.shadowCameraFar=J.camera.far,n.pointShadow[d]=z,n.pointShadowMap[d]=Z,n.pointShadowMatrix[d]=U.shadow.matrix,f++}n.point[d]=j,d++}else if(U.isHemisphereLight){const j=e.get(U);j.skyColor.copy(U.color).multiplyScalar(K),j.groundColor.copy(U.groundColor).multiplyScalar(K),n.hemi[_]=j,_++}}m>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=de.LTC_FLOAT_1,n.rectAreaLTC2=de.LTC_FLOAT_2):(n.rectAreaLTC1=de.LTC_HALF_1,n.rectAreaLTC2=de.LTC_HALF_2)),n.ambient[0]=s,n.ambient[1]=c,n.ambient[2]=l;const R=n.hash;R.directionalLength===h&&R.pointLength===d&&R.spotLength===p&&R.rectAreaLength===m&&R.hemiLength===_&&R.numDirectionalShadows===g&&R.numPointShadows===f&&R.numSpotShadows===v&&R.numSpotMaps===x&&R.numLightProbes===w||(n.directional.length=h,n.spot.length=p,n.rectArea.length=m,n.point.length=d,n.hemi.length=_,n.directionalShadow.length=g,n.directionalShadowMap.length=g,n.pointShadow.length=f,n.pointShadowMap.length=f,n.spotShadow.length=v,n.spotShadowMap.length=v,n.directionalShadowMatrix.length=g,n.pointShadowMatrix.length=f,n.spotLightMatrix.length=v+x-M,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=M,n.numLightProbes=w,R.directionalLength=h,R.pointLength=d,R.spotLength=p,R.rectAreaLength=m,R.hemiLength=_,R.numDirectionalShadows=g,R.numPointShadows=f,R.numSpotShadows=v,R.numSpotMaps=x,R.numLightProbes=w,n.version=Eu++)},setupView:function(u,s){let c=0,l=0,h=0,d=0,p=0;const m=s.matrixWorldInverse;for(let _=0,g=u.length;_<g;_++){const f=u[_];if(f.isDirectionalLight){const v=n.directional[c];v.direction.setFromMatrixPosition(f.matrixWorld),r.setFromMatrixPosition(f.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),c++}else if(f.isSpotLight){const v=n.spot[h];v.position.setFromMatrixPosition(f.matrixWorld),v.position.applyMatrix4(m),v.direction.setFromMatrixPosition(f.matrixWorld),r.setFromMatrixPosition(f.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(m),h++}else if(f.isRectAreaLight){const v=n.rectArea[d];v.position.setFromMatrixPosition(f.matrixWorld),v.position.applyMatrix4(m),o.identity(),a.copy(f.matrixWorld),a.premultiply(m),o.extractRotation(a),v.halfWidth.set(.5*f.width,0,0),v.halfHeight.set(0,.5*f.height,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),d++}else if(f.isPointLight){const v=n.point[l];v.position.setFromMatrixPosition(f.matrixWorld),v.position.applyMatrix4(m),l++}else if(f.isHemisphereLight){const v=n.hemi[p];v.direction.setFromMatrixPosition(f.matrixWorld),v.direction.transformDirection(m),p++}}},state:n}}function Mo(i){const e=new Tu(i),t=[],n=[],r={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:function(a){r.camera=a,t.length=0,n.length=0},state:r,setupLights:function(){e.setup(t)},setupLightsView:function(a){e.setupView(t,a)},pushLight:function(a){t.push(a)},pushShadow:function(a){n.push(a)}}}function wu(i){let e=new WeakMap;return{get:function(t,n=0){const r=e.get(t);let a;return r===void 0?(a=new Mo(i),e.set(t,[a])):n>=r.length?(a=new Mo(i),r.push(a)):a=r[n],a},dispose:function(){e=new WeakMap}}}class Au extends Ti{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Ru extends Ti{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function Cu(i,e,t){let n=new Gr;const r=new ze,a=new ze,o=new rt,u=new Au({depthPacking:3201}),s=new Ru,c={},l=t.maxTextureSize,h={[Dn]:Nt,[Nt]:Dn,2:2},d=new Un({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ze},radius:{value:4}},vertexShader:`void main() {
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
}`}),p=d.clone();p.defines.HORIZONTAL_PASS=1;const m=new Ft;m.setAttribute("position",new Ht(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new _t(m,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=No;let f=this.type;function v(R,P){const q=e.update(_);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,p.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new qn(r.x,r.y)),d.uniforms.shadow_pass.value=R.map.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,i.setRenderTarget(R.mapPass),i.clear(),i.renderBufferDirect(P,null,q,d,_,null),p.uniforms.shadow_pass.value=R.mapPass.texture,p.uniforms.resolution.value=R.mapSize,p.uniforms.radius.value=R.radius,i.setRenderTarget(R.map),i.clear(),i.renderBufferDirect(P,null,q,p,_,null)}function x(R,P,q,U){let k=null;const K=q.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(K!==void 0)k=K;else if(k=q.isPointLight===!0?s:u,i.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0){const F=k.uuid,Z=P.uuid;let j=c[F];j===void 0&&(j={},c[F]=j);let J=j[Z];J===void 0&&(J=k.clone(),j[Z]=J,P.addEventListener("dispose",w)),k=J}return k.visible=P.visible,k.wireframe=P.wireframe,k.side=U===gn?P.shadowSide!==null?P.shadowSide:P.side:P.shadowSide!==null?P.shadowSide:h[P.side],k.alphaMap=P.alphaMap,k.alphaTest=P.alphaTest,k.map=P.map,k.clipShadows=P.clipShadows,k.clippingPlanes=P.clippingPlanes,k.clipIntersection=P.clipIntersection,k.displacementMap=P.displacementMap,k.displacementScale=P.displacementScale,k.displacementBias=P.displacementBias,k.wireframeLinewidth=P.wireframeLinewidth,k.linewidth=P.linewidth,q.isPointLight===!0&&k.isMeshDistanceMaterial===!0&&(i.properties.get(k).light=q),k}function M(R,P,q,U,k){if(R.visible===!1)return;if(R.layers.test(P.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&k===gn)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,R.matrixWorld);const F=e.update(R),Z=R.material;if(Array.isArray(Z)){const j=F.groups;for(let J=0,z=j.length;J<z;J++){const re=j[J],ue=Z[re.materialIndex];if(ue&&ue.visible){const fe=x(R,ue,U,k);R.onBeforeShadow(i,R,P,q,F,fe,re),i.renderBufferDirect(q,null,F,fe,R,re),R.onAfterShadow(i,R,P,q,F,fe,re)}}}else if(Z.visible){const j=x(R,Z,U,k);R.onBeforeShadow(i,R,P,q,F,j,null),i.renderBufferDirect(q,null,F,j,R,null),R.onAfterShadow(i,R,P,q,F,j,null)}}const K=R.children;for(let F=0,Z=K.length;F<Z;F++)M(K[F],P,q,U,k)}function w(R){R.target.removeEventListener("dispose",w);for(const P in c){const q=c[P],U=R.target.uuid;U in q&&(q[U].dispose(),delete q[U])}}this.render=function(R,P,q){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||R.length===0)return;const U=i.getRenderTarget(),k=i.getActiveCubeFace(),K=i.getActiveMipmapLevel(),F=i.state;F.setBlending(0),F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const Z=f!==gn&&this.type===gn,j=f===gn&&this.type!==gn;for(let J=0,z=R.length;J<z;J++){const re=R[J],ue=re.shadow;if(ue===void 0){console.warn("THREE.WebGLShadowMap:",re,"has no shadow.");continue}if(ue.autoUpdate===!1&&ue.needsUpdate===!1)continue;r.copy(ue.mapSize);const fe=ue.getFrameExtents();if(r.multiply(fe),a.copy(ue.mapSize),(r.x>l||r.y>l)&&(r.x>l&&(a.x=Math.floor(l/fe.x),r.x=a.x*fe.x,ue.mapSize.x=a.x),r.y>l&&(a.y=Math.floor(l/fe.y),r.y=a.y*fe.y,ue.mapSize.y=a.y)),ue.map===null||Z===!0||j===!0){const Q=this.type!==gn?{minFilter:jt,magFilter:jt}:{};ue.map!==null&&ue.map.dispose(),ue.map=new qn(r.x,r.y,Q),ue.map.texture.name=re.name+".shadowMap",ue.camera.updateProjectionMatrix()}i.setRenderTarget(ue.map),i.clear();const Ae=ue.getViewportCount();for(let Q=0;Q<Ae;Q++){const se=ue.getViewport(Q);o.set(a.x*se.x,a.y*se.y,a.x*se.z,a.y*se.w),F.viewport(o),ue.updateMatrices(re,Q),n=ue.getFrustum(),M(P,q,ue.camera,re,this.type)}ue.isPointLightShadow!==!0&&this.type===gn&&v(ue,q),ue.needsUpdate=!1}f=this.type,g.needsUpdate=!1,i.setRenderTarget(U,k,K)}}const Pu={0:1,2:6,4:7,3:5,1:0,6:2,7:4,5:3};function Lu(i){const e=new function(){let b=!1;const H=new rt;let V=null;const le=new rt(0,0,0,0);return{setMask:function(G){V===G||b||(i.colorMask(G,G,G,G),V=G)},setLocked:function(G){b=G},setClear:function(G,ne,oe,ee,_e){_e===!0&&(G*=ee,ne*=ee,oe*=ee),H.set(G,ne,oe,ee),le.equals(H)===!1&&(i.clearColor(G,ne,oe,ee),le.copy(H))},reset:function(){b=!1,V=null,le.set(-1,0,0,0)}}},t=new function(){let b=!1,H=!1,V=null,le=null,G=null;return{setReversed:function(ne){H=ne},setTest:function(ne){ne?Se(i.DEPTH_TEST):be(i.DEPTH_TEST)},setMask:function(ne){V===ne||b||(i.depthMask(ne),V=ne)},setFunc:function(ne){if(H&&(ne=Pu[ne]),le!==ne){switch(ne){case 0:i.depthFunc(i.NEVER);break;case 1:i.depthFunc(i.ALWAYS);break;case 2:i.depthFunc(i.LESS);break;case 3:default:i.depthFunc(i.LEQUAL);break;case 4:i.depthFunc(i.EQUAL);break;case 5:i.depthFunc(i.GEQUAL);break;case 6:i.depthFunc(i.GREATER);break;case 7:i.depthFunc(i.NOTEQUAL)}le=ne}},setLocked:function(ne){b=ne},setClear:function(ne){G!==ne&&(i.clearDepth(ne),G=ne)},reset:function(){b=!1,V=null,le=null,G=null}}},n=new function(){let b=!1,H=null,V=null,le=null,G=null,ne=null,oe=null,ee=null,_e=null;return{setTest:function(pe){b||(pe?Se(i.STENCIL_TEST):be(i.STENCIL_TEST))},setMask:function(pe){H===pe||b||(i.stencilMask(pe),H=pe)},setFunc:function(pe,Te,Le){V===pe&&le===Te&&G===Le||(i.stencilFunc(pe,Te,Le),V=pe,le=Te,G=Le)},setOp:function(pe,Te,Le){ne===pe&&oe===Te&&ee===Le||(i.stencilOp(pe,Te,Le),ne=pe,oe=Te,ee=Le)},setLocked:function(pe){b=pe},setClear:function(pe){_e!==pe&&(i.clearStencil(pe),_e=pe)},reset:function(){b=!1,H=null,V=null,le=null,G=null,ne=null,oe=null,ee=null,_e=null}}},r=new WeakMap,a=new WeakMap;let o={},u={},s=new WeakMap,c=[],l=null,h=!1,d=null,p=null,m=null,_=null,g=null,f=null,v=null,x=new Be(0,0,0),M=0,w=!1,R=null,P=null,q=null,U=null,k=null;const K=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let F=!1,Z=0;const j=i.getParameter(i.VERSION);j.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(j)[1]),F=Z>=1):j.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),F=Z>=2);let J=null,z={};const re=i.getParameter(i.SCISSOR_BOX),ue=i.getParameter(i.VIEWPORT),fe=new rt().fromArray(re),Ae=new rt().fromArray(ue);function Q(b,H,V,le){const G=new Uint8Array(4),ne=i.createTexture();i.bindTexture(b,ne),i.texParameteri(b,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(b,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let oe=0;oe<V;oe++)b===i.TEXTURE_3D||b===i.TEXTURE_2D_ARRAY?i.texImage3D(H,0,i.RGBA,1,1,le,0,i.RGBA,i.UNSIGNED_BYTE,G):i.texImage2D(H+oe,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,G);return ne}const se={};function Se(b){o[b]!==!0&&(i.enable(b),o[b]=!0)}function be(b){o[b]!==!1&&(i.disable(b),o[b]=!1)}se[i.TEXTURE_2D]=Q(i.TEXTURE_2D,i.TEXTURE_2D,1),se[i.TEXTURE_CUBE_MAP]=Q(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),se[i.TEXTURE_2D_ARRAY]=Q(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),se[i.TEXTURE_3D]=Q(i.TEXTURE_3D,i.TEXTURE_3D,1,1),e.setClear(0,0,0,1),t.setClear(1),n.setClear(0),Se(i.DEPTH_TEST),t.setFunc(3),Y(!1),I(1),Se(i.CULL_FACE),D(0);const T={[Wn]:i.FUNC_ADD,101:i.FUNC_SUBTRACT,102:i.FUNC_REVERSE_SUBTRACT};T[103]=i.MIN,T[104]=i.MAX;const S={200:i.ZERO,201:i.ONE,202:i.SRC_COLOR,[Pa]:i.SRC_ALPHA,210:i.SRC_ALPHA_SATURATE,208:i.DST_COLOR,206:i.DST_ALPHA,203:i.ONE_MINUS_SRC_COLOR,[La]:i.ONE_MINUS_SRC_ALPHA,209:i.ONE_MINUS_DST_COLOR,207:i.ONE_MINUS_DST_ALPHA,211:i.CONSTANT_COLOR,212:i.ONE_MINUS_CONSTANT_COLOR,213:i.CONSTANT_ALPHA,214:i.ONE_MINUS_CONSTANT_ALPHA};function D(b,H,V,le,G,ne,oe,ee,_e,pe){if(b!==0){if(h===!1&&(Se(i.BLEND),h=!0),b===5)G=G||H,ne=ne||V,oe=oe||le,H===p&&G===g||(i.blendEquationSeparate(T[H],T[G]),p=H,g=G),V===m&&le===_&&ne===f&&oe===v||(i.blendFuncSeparate(S[V],S[le],S[ne],S[oe]),m=V,_=le,f=ne,v=oe),ee.equals(x)!==!1&&_e===M||(i.blendColor(ee.r,ee.g,ee.b,_e),x.copy(ee),M=_e),d=b,w=!1;else if(b!==d||pe!==w){if(p===Wn&&g===Wn||(i.blendEquation(i.FUNC_ADD),p=Wn,g=Wn),pe)switch(b){case 1:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case 2:i.blendFunc(i.ONE,i.ONE);break;case 3:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case 4:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",b)}else switch(b){case 1:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case 2:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case 3:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case 4:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",b)}m=null,_=null,f=null,v=null,x.set(0,0,0),M=0,d=b,w=pe}}else h===!0&&(be(i.BLEND),h=!1)}function Y(b){R!==b&&(b?i.frontFace(i.CW):i.frontFace(i.CCW),R=b)}function I(b){b!==0?(Se(i.CULL_FACE),b!==P&&(b===1?i.cullFace(i.BACK):b===2?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):be(i.CULL_FACE),P=b}function B(b,H,V){b?(Se(i.POLYGON_OFFSET_FILL),U===H&&k===V||(i.polygonOffset(H,V),U=H,k=V)):be(i.POLYGON_OFFSET_FILL)}return{buffers:{color:e,depth:t,stencil:n},enable:Se,disable:be,bindFramebuffer:function(b,H){return u[b]!==H&&(i.bindFramebuffer(b,H),u[b]=H,b===i.DRAW_FRAMEBUFFER&&(u[i.FRAMEBUFFER]=H),b===i.FRAMEBUFFER&&(u[i.DRAW_FRAMEBUFFER]=H),!0)},drawBuffers:function(b,H){let V=c,le=!1;if(b){V=s.get(H),V===void 0&&(V=[],s.set(H,V));const G=b.textures;if(V.length!==G.length||V[0]!==i.COLOR_ATTACHMENT0){for(let ne=0,oe=G.length;ne<oe;ne++)V[ne]=i.COLOR_ATTACHMENT0+ne;V.length=G.length,le=!0}}else V[0]!==i.BACK&&(V[0]=i.BACK,le=!0);le&&i.drawBuffers(V)},useProgram:function(b){return l!==b&&(i.useProgram(b),l=b,!0)},setBlending:D,setMaterial:function(b,H){b.side===2?be(i.CULL_FACE):Se(i.CULL_FACE);let V=b.side===Nt;H&&(V=!V),Y(V),b.blending===1&&b.transparent===!1?D(0):D(b.blending,b.blendEquation,b.blendSrc,b.blendDst,b.blendEquationAlpha,b.blendSrcAlpha,b.blendDstAlpha,b.blendColor,b.blendAlpha,b.premultipliedAlpha),t.setFunc(b.depthFunc),t.setTest(b.depthTest),t.setMask(b.depthWrite),e.setMask(b.colorWrite);const le=b.stencilWrite;n.setTest(le),le&&(n.setMask(b.stencilWriteMask),n.setFunc(b.stencilFunc,b.stencilRef,b.stencilFuncMask),n.setOp(b.stencilFail,b.stencilZFail,b.stencilZPass)),B(b.polygonOffset,b.polygonOffsetFactor,b.polygonOffsetUnits),b.alphaToCoverage===!0?Se(i.SAMPLE_ALPHA_TO_COVERAGE):be(i.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:Y,setCullFace:I,setLineWidth:function(b){b!==q&&(F&&i.lineWidth(b),q=b)},setPolygonOffset:B,setScissorTest:function(b){b?Se(i.SCISSOR_TEST):be(i.SCISSOR_TEST)},activeTexture:function(b){b===void 0&&(b=i.TEXTURE0+K-1),J!==b&&(i.activeTexture(b),J=b)},bindTexture:function(b,H,V){V===void 0&&(V=J===null?i.TEXTURE0+K-1:J);let le=z[V];le===void 0&&(le={type:void 0,texture:void 0},z[V]=le),le.type===b&&le.texture===H||(J!==V&&(i.activeTexture(V),J=V),i.bindTexture(b,H||se[b]),le.type=b,le.texture=H)},unbindTexture:function(){const b=z[J];b!==void 0&&b.type!==void 0&&(i.bindTexture(b.type,null),b.type=void 0,b.texture=void 0)},compressedTexImage2D:function(){try{i.compressedTexImage2D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},compressedTexImage3D:function(){try{i.compressedTexImage3D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},texImage2D:function(){try{i.texImage2D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},texImage3D:function(){try{i.texImage3D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},updateUBOMapping:function(b,H){let V=a.get(H);V===void 0&&(V=new WeakMap,a.set(H,V));let le=V.get(b);le===void 0&&(le=i.getUniformBlockIndex(H,b.name),V.set(b,le))},uniformBlockBinding:function(b,H){const V=a.get(H).get(b);r.get(H)!==V&&(i.uniformBlockBinding(H,V,b.__bindingPointIndex),r.set(H,V))},texStorage2D:function(){try{i.texStorage2D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},texStorage3D:function(){try{i.texStorage3D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},texSubImage2D:function(){try{i.texSubImage2D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},texSubImage3D:function(){try{i.texSubImage3D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},compressedTexSubImage2D:function(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},compressedTexSubImage3D:function(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(b){console.error("THREE.WebGLState:",b)}},scissor:function(b){fe.equals(b)===!1&&(i.scissor(b.x,b.y,b.z,b.w),fe.copy(b))},viewport:function(b){Ae.equals(b)===!1&&(i.viewport(b.x,b.y,b.z,b.w),Ae.copy(b))},reset:function(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),o={},J=null,z={},u={},s=new WeakMap,c=[],l=null,h=!1,d=null,p=null,m=null,_=null,g=null,f=null,v=null,x=new Be(0,0,0),M=0,w=!1,R=null,P=null,q=null,U=null,k=null,fe.set(0,0,i.canvas.width,i.canvas.height),Ae.set(0,0,i.canvas.width,i.canvas.height),e.reset(),t.reset(),n.reset()}}}function So(i,e,t,n){const r=function(a){switch(a){case _n:case Ho:return{byteLength:1,components:1};case Wi:case Go:case qi:return{byteLength:2,components:1};case ps:case fs:return{byteLength:2,components:4};case jn:case ds:case on:return{byteLength:4,components:1};case Vo:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${a}.`)}(n);switch(t){case ko:case Xo:return i*e;case jo:return i*e*2;case ms:case gs:return i*e/r.components*r.byteLength;case qo:case _s:return i*e*2/r.components*r.byteLength;case Wo:return i*e*3/r.components*r.byteLength;case tn:case vs:return i*e*4/r.components*r.byteLength;case yr:case Er:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case br:case Tr:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Oa:case Ba:return Math.max(i,16)*Math.max(e,8)/4;case Na:case Fa:return Math.max(i,8)*Math.max(e,8)/2;case za:case Ha:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Ga:case Va:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case ka:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Wa:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case Xa:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case ja:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case qa:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Ya:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Ka:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Za:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Ja:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case $a:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Qa:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case es:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case ts:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case wr:case ns:case is:return Math.ceil(i/4)*Math.ceil(e/4)*16;case Yo:case rs:return Math.ceil(i/4)*Math.ceil(e/4)*8;case as:case ss:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Du(i,e,t,n,r,a,o){const u=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,s=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),c=new ze,l=new WeakMap;let h;const d=new WeakMap;let p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(T,S){return p?new OffscreenCanvas(T,S):Nr("canvas")}function _(T,S,D){let Y=1;const I=be(T);if((I.width>D||I.height>D)&&(Y=D/Math.max(I.width,I.height)),Y<1){if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const B=Math.floor(Y*I.width),b=Math.floor(Y*I.height);h===void 0&&(h=m(B,b));const H=S?m(B,b):h;return H.width=B,H.height=b,H.getContext("2d").drawImage(T,0,0,B,b),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+I.width+"x"+I.height+") to ("+B+"x"+b+")."),H}return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+I.width+"x"+I.height+")."),T}return T}function g(T){return T.generateMipmaps&&T.minFilter!==jt&&T.minFilter!==sn}function f(T){i.generateMipmap(T)}function v(T,S,D,Y,I=!1){if(T!==null){if(i[T]!==void 0)return i[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let B=S;if(S===i.RED&&(D===i.FLOAT&&(B=i.R32F),D===i.HALF_FLOAT&&(B=i.R16F),D===i.UNSIGNED_BYTE&&(B=i.R8)),S===i.RED_INTEGER&&(D===i.UNSIGNED_BYTE&&(B=i.R8UI),D===i.UNSIGNED_SHORT&&(B=i.R16UI),D===i.UNSIGNED_INT&&(B=i.R32UI),D===i.BYTE&&(B=i.R8I),D===i.SHORT&&(B=i.R16I),D===i.INT&&(B=i.R32I)),S===i.RG&&(D===i.FLOAT&&(B=i.RG32F),D===i.HALF_FLOAT&&(B=i.RG16F),D===i.UNSIGNED_BYTE&&(B=i.RG8)),S===i.RG_INTEGER&&(D===i.UNSIGNED_BYTE&&(B=i.RG8UI),D===i.UNSIGNED_SHORT&&(B=i.RG16UI),D===i.UNSIGNED_INT&&(B=i.RG32UI),D===i.BYTE&&(B=i.RG8I),D===i.SHORT&&(B=i.RG16I),D===i.INT&&(B=i.RG32I)),S===i.RGB_INTEGER&&(D===i.UNSIGNED_BYTE&&(B=i.RGB8UI),D===i.UNSIGNED_SHORT&&(B=i.RGB16UI),D===i.UNSIGNED_INT&&(B=i.RGB32UI),D===i.BYTE&&(B=i.RGB8I),D===i.SHORT&&(B=i.RGB16I),D===i.INT&&(B=i.RGB32I)),S===i.RGBA_INTEGER&&(D===i.UNSIGNED_BYTE&&(B=i.RGBA8UI),D===i.UNSIGNED_SHORT&&(B=i.RGBA16UI),D===i.UNSIGNED_INT&&(B=i.RGBA32UI),D===i.BYTE&&(B=i.RGBA8I),D===i.SHORT&&(B=i.RGBA16I),D===i.INT&&(B=i.RGBA32I)),S===i.RGB&&D===i.UNSIGNED_INT_5_9_9_9_REV&&(B=i.RGB9_E5),S===i.RGBA){const b=I?Lr:it.getTransfer(Y);D===i.FLOAT&&(B=i.RGBA32F),D===i.HALF_FLOAT&&(B=i.RGBA16F),D===i.UNSIGNED_BYTE&&(B=b===ct?i.SRGB8_ALPHA8:i.RGBA8),D===i.UNSIGNED_SHORT_4_4_4_4&&(B=i.RGBA4),D===i.UNSIGNED_SHORT_5_5_5_1&&(B=i.RGB5_A1)}return B!==i.R16F&&B!==i.R32F&&B!==i.RG16F&&B!==i.RG32F&&B!==i.RGBA16F&&B!==i.RGBA32F||e.get("EXT_color_buffer_float"),B}function x(T,S){let D;return T?S===null||S===jn||S===Mi?D=i.DEPTH24_STENCIL8:S===on?D=i.DEPTH32F_STENCIL8:S===Wi&&(D=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):S===null||S===jn||S===Mi?D=i.DEPTH_COMPONENT24:S===on?D=i.DEPTH_COMPONENT32F:S===Wi&&(D=i.DEPTH_COMPONENT16),D}function M(T,S){return g(T)===!0||T.isFramebufferTexture&&T.minFilter!==jt&&T.minFilter!==sn?Math.log2(Math.max(S.width,S.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?S.mipmaps.length:1}function w(T){const S=T.target;S.removeEventListener("dispose",w),function(D){const Y=n.get(D);if(Y.__webglInit===void 0)return;const I=D.source,B=d.get(I);if(B){const b=B[Y.__cacheKey];b.usedTimes--,b.usedTimes===0&&P(D),Object.keys(B).length===0&&d.delete(I)}n.remove(D)}(S),S.isVideoTexture&&l.delete(S)}function R(T){const S=T.target;S.removeEventListener("dispose",R),function(D){const Y=n.get(D);if(D.depthTexture&&D.depthTexture.dispose(),D.isWebGLCubeRenderTarget)for(let B=0;B<6;B++){if(Array.isArray(Y.__webglFramebuffer[B]))for(let b=0;b<Y.__webglFramebuffer[B].length;b++)i.deleteFramebuffer(Y.__webglFramebuffer[B][b]);else i.deleteFramebuffer(Y.__webglFramebuffer[B]);Y.__webglDepthbuffer&&i.deleteRenderbuffer(Y.__webglDepthbuffer[B])}else{if(Array.isArray(Y.__webglFramebuffer))for(let B=0;B<Y.__webglFramebuffer.length;B++)i.deleteFramebuffer(Y.__webglFramebuffer[B]);else i.deleteFramebuffer(Y.__webglFramebuffer);if(Y.__webglDepthbuffer&&i.deleteRenderbuffer(Y.__webglDepthbuffer),Y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(Y.__webglMultisampledFramebuffer),Y.__webglColorRenderbuffer)for(let B=0;B<Y.__webglColorRenderbuffer.length;B++)Y.__webglColorRenderbuffer[B]&&i.deleteRenderbuffer(Y.__webglColorRenderbuffer[B]);Y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(Y.__webglDepthRenderbuffer)}const I=D.textures;for(let B=0,b=I.length;B<b;B++){const H=n.get(I[B]);H.__webglTexture&&(i.deleteTexture(H.__webglTexture),o.memory.textures--),n.remove(I[B])}n.remove(D)}(S)}function P(T){const S=n.get(T);i.deleteTexture(S.__webglTexture);const D=T.source;delete d.get(D)[S.__cacheKey],o.memory.textures--}let q=0;function U(T,S){const D=n.get(T);if(T.isVideoTexture&&function(Y){const I=o.render.frame;l.get(Y)!==I&&(l.set(Y,I),Y.update())}(T),T.isRenderTargetTexture===!1&&T.version>0&&D.__version!==T.version){const Y=T.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else{if(Y.complete!==!1)return void J(D,T,S);console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")}}t.bindTexture(i.TEXTURE_2D,D.__webglTexture,i.TEXTURE0+S)}const k={[Vi]:i.REPEAT,[ki]:i.CLAMP_TO_EDGE,[Ia]:i.MIRRORED_REPEAT},K={[jt]:i.NEAREST,[Ll]:i.NEAREST_MIPMAP_NEAREST,[$i]:i.NEAREST_MIPMAP_LINEAR,[sn]:i.LINEAR,[qr]:i.LINEAR_MIPMAP_NEAREST,[fi]:i.LINEAR_MIPMAP_LINEAR},F={512:i.NEVER,519:i.ALWAYS,513:i.LESS,[Ko]:i.LEQUAL,514:i.EQUAL,518:i.GEQUAL,516:i.GREATER,517:i.NOTEQUAL};function Z(T,S){if(S.type!==on||e.has("OES_texture_float_linear")!==!1||S.magFilter!==sn&&S.magFilter!==qr&&S.magFilter!==$i&&S.magFilter!==fi&&S.minFilter!==sn&&S.minFilter!==qr&&S.minFilter!==$i&&S.minFilter!==fi||console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(T,i.TEXTURE_WRAP_S,k[S.wrapS]),i.texParameteri(T,i.TEXTURE_WRAP_T,k[S.wrapT]),T!==i.TEXTURE_3D&&T!==i.TEXTURE_2D_ARRAY||i.texParameteri(T,i.TEXTURE_WRAP_R,k[S.wrapR]),i.texParameteri(T,i.TEXTURE_MAG_FILTER,K[S.magFilter]),i.texParameteri(T,i.TEXTURE_MIN_FILTER,K[S.minFilter]),S.compareFunction&&(i.texParameteri(T,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(T,i.TEXTURE_COMPARE_FUNC,F[S.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(S.magFilter===jt||S.minFilter!==$i&&S.minFilter!==fi||S.type===on&&e.has("OES_texture_float_linear")===!1)return;if(S.anisotropy>1||n.get(S).__currentAnisotropy){const D=e.get("EXT_texture_filter_anisotropic");i.texParameterf(T,D.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(S.anisotropy,r.getMaxAnisotropy())),n.get(S).__currentAnisotropy=S.anisotropy}}}function j(T,S){let D=!1;T.__webglInit===void 0&&(T.__webglInit=!0,S.addEventListener("dispose",w));const Y=S.source;let I=d.get(Y);I===void 0&&(I={},d.set(Y,I));const B=function(b){const H=[];return H.push(b.wrapS),H.push(b.wrapT),H.push(b.wrapR||0),H.push(b.magFilter),H.push(b.minFilter),H.push(b.anisotropy),H.push(b.internalFormat),H.push(b.format),H.push(b.type),H.push(b.generateMipmaps),H.push(b.premultiplyAlpha),H.push(b.flipY),H.push(b.unpackAlignment),H.push(b.colorSpace),H.join()}(S);if(B!==T.__cacheKey){I[B]===void 0&&(I[B]={texture:i.createTexture(),usedTimes:0},o.memory.textures++,D=!0),I[B].usedTimes++;const b=I[T.__cacheKey];b!==void 0&&(I[T.__cacheKey].usedTimes--,b.usedTimes===0&&P(S)),T.__cacheKey=B,T.__webglTexture=I[B].texture}return D}function J(T,S,D){let Y=i.TEXTURE_2D;(S.isDataArrayTexture||S.isCompressedArrayTexture)&&(Y=i.TEXTURE_2D_ARRAY),S.isData3DTexture&&(Y=i.TEXTURE_3D);const I=j(T,S),B=S.source;t.bindTexture(Y,T.__webglTexture,i.TEXTURE0+D);const b=n.get(B);if(B.version!==b.__version||I===!0){t.activeTexture(i.TEXTURE0+D);const H=it.getPrimaries(it.workingColorSpace),V=S.colorSpace===pi?null:it.getPrimaries(S.colorSpace),le=S.colorSpace===pi||H===V?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,S.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,S.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,S.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,le);let G=_(S.image,!1,r.maxTextureSize);G=Se(S,G);const ne=a.convert(S.format,S.colorSpace),oe=a.convert(S.type);let ee,_e=v(S.internalFormat,ne,oe,S.colorSpace,S.isVideoTexture);Z(Y,S);const pe=S.mipmaps,Te=S.isVideoTexture!==!0,Le=b.__version===void 0||I===!0,je=B.dataReady,Ye=M(S,G);if(S.isDepthTexture)_e=x(S.format===Si,S.type),Le&&(Te?t.texStorage2D(i.TEXTURE_2D,1,_e,G.width,G.height):t.texImage2D(i.TEXTURE_2D,0,_e,G.width,G.height,0,ne,oe,null));else if(S.isDataTexture)if(pe.length>0){Te&&Le&&t.texStorage2D(i.TEXTURE_2D,Ye,_e,pe[0].width,pe[0].height);for(let xe=0,Ke=pe.length;xe<Ke;xe++)ee=pe[xe],Te?je&&t.texSubImage2D(i.TEXTURE_2D,xe,0,0,ee.width,ee.height,ne,oe,ee.data):t.texImage2D(i.TEXTURE_2D,xe,_e,ee.width,ee.height,0,ne,oe,ee.data);S.generateMipmaps=!1}else Te?(Le&&t.texStorage2D(i.TEXTURE_2D,Ye,_e,G.width,G.height),je&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,G.width,G.height,ne,oe,G.data)):t.texImage2D(i.TEXTURE_2D,0,_e,G.width,G.height,0,ne,oe,G.data);else if(S.isCompressedTexture)if(S.isCompressedArrayTexture){Te&&Le&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ye,_e,pe[0].width,pe[0].height,G.depth);for(let xe=0,Ke=pe.length;xe<Ke;xe++)if(ee=pe[xe],S.format!==tn)if(ne!==null)if(Te){if(je)if(S.layerUpdates.size>0){const et=So(ee.width,ee.height,S.format,S.type);for(const Qe of S.layerUpdates){const me=ee.data.subarray(Qe*et/ee.data.BYTES_PER_ELEMENT,(Qe+1)*et/ee.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,xe,0,0,Qe,ee.width,ee.height,1,ne,me,0,0)}S.clearLayerUpdates()}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,xe,0,0,0,ee.width,ee.height,G.depth,ne,ee.data,0,0)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,xe,_e,ee.width,ee.height,G.depth,0,ee.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Te?je&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,xe,0,0,0,ee.width,ee.height,G.depth,ne,oe,ee.data):t.texImage3D(i.TEXTURE_2D_ARRAY,xe,_e,ee.width,ee.height,G.depth,0,ne,oe,ee.data)}else{Te&&Le&&t.texStorage2D(i.TEXTURE_2D,Ye,_e,pe[0].width,pe[0].height);for(let xe=0,Ke=pe.length;xe<Ke;xe++)ee=pe[xe],S.format!==tn?ne!==null?Te?je&&t.compressedTexSubImage2D(i.TEXTURE_2D,xe,0,0,ee.width,ee.height,ne,ee.data):t.compressedTexImage2D(i.TEXTURE_2D,xe,_e,ee.width,ee.height,0,ee.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Te?je&&t.texSubImage2D(i.TEXTURE_2D,xe,0,0,ee.width,ee.height,ne,oe,ee.data):t.texImage2D(i.TEXTURE_2D,xe,_e,ee.width,ee.height,0,ne,oe,ee.data)}else if(S.isDataArrayTexture)if(Te){if(Le&&t.texStorage3D(i.TEXTURE_2D_ARRAY,Ye,_e,G.width,G.height,G.depth),je)if(S.layerUpdates.size>0){const xe=So(G.width,G.height,S.format,S.type);for(const Ke of S.layerUpdates){const et=G.data.subarray(Ke*xe/G.data.BYTES_PER_ELEMENT,(Ke+1)*xe/G.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Ke,G.width,G.height,1,ne,oe,et)}S.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,G.width,G.height,G.depth,ne,oe,G.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,_e,G.width,G.height,G.depth,0,ne,oe,G.data);else if(S.isData3DTexture)Te?(Le&&t.texStorage3D(i.TEXTURE_3D,Ye,_e,G.width,G.height,G.depth),je&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,G.width,G.height,G.depth,ne,oe,G.data)):t.texImage3D(i.TEXTURE_3D,0,_e,G.width,G.height,G.depth,0,ne,oe,G.data);else if(S.isFramebufferTexture){if(Le)if(Te)t.texStorage2D(i.TEXTURE_2D,Ye,_e,G.width,G.height);else{let xe=G.width,Ke=G.height;for(let et=0;et<Ye;et++)t.texImage2D(i.TEXTURE_2D,et,_e,xe,Ke,0,ne,oe,null),xe>>=1,Ke>>=1}}else if(pe.length>0){if(Te&&Le){const xe=be(pe[0]);t.texStorage2D(i.TEXTURE_2D,Ye,_e,xe.width,xe.height)}for(let xe=0,Ke=pe.length;xe<Ke;xe++)ee=pe[xe],Te?je&&t.texSubImage2D(i.TEXTURE_2D,xe,0,0,ne,oe,ee):t.texImage2D(i.TEXTURE_2D,xe,_e,ne,oe,ee);S.generateMipmaps=!1}else if(Te){if(Le){const xe=be(G);t.texStorage2D(i.TEXTURE_2D,Ye,_e,xe.width,xe.height)}je&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ne,oe,G)}else t.texImage2D(i.TEXTURE_2D,0,_e,ne,oe,G);g(S)&&f(Y),b.__version=B.version,S.onUpdate&&S.onUpdate(S)}T.__version=S.version}function z(T,S,D,Y,I,B){const b=a.convert(D.format,D.colorSpace),H=a.convert(D.type),V=v(D.internalFormat,b,H,D.colorSpace);if(!n.get(S).__hasExternalTextures){const le=Math.max(1,S.width>>B),G=Math.max(1,S.height>>B);I===i.TEXTURE_3D||I===i.TEXTURE_2D_ARRAY?t.texImage3D(I,B,V,le,G,S.depth,0,b,H,null):t.texImage2D(I,B,V,le,G,0,b,H,null)}t.bindFramebuffer(i.FRAMEBUFFER,T),se(S)?u.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,Y,I,n.get(D).__webglTexture,0,Q(S)):(I===i.TEXTURE_2D||I>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&I<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,Y,I,n.get(D).__webglTexture,B),t.bindFramebuffer(i.FRAMEBUFFER,null)}function re(T,S,D){if(i.bindRenderbuffer(i.RENDERBUFFER,T),S.depthBuffer){const Y=S.depthTexture,I=Y&&Y.isDepthTexture?Y.type:null,B=x(S.stencilBuffer,I),b=S.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,H=Q(S);se(S)?u.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,H,B,S.width,S.height):D?i.renderbufferStorageMultisample(i.RENDERBUFFER,H,B,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,B,S.width,S.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,b,i.RENDERBUFFER,T)}else{const Y=S.textures;for(let I=0;I<Y.length;I++){const B=Y[I],b=a.convert(B.format,B.colorSpace),H=a.convert(B.type),V=v(B.internalFormat,b,H,B.colorSpace),le=Q(S);D&&se(S)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,le,V,S.width,S.height):se(S)?u.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,le,V,S.width,S.height):i.renderbufferStorage(i.RENDERBUFFER,V,S.width,S.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function ue(T){const S=n.get(T),D=T.isWebGLCubeRenderTarget===!0;if(S.__boundDepthTexture!==T.depthTexture){const Y=T.depthTexture;if(S.__depthDisposeCallback&&S.__depthDisposeCallback(),Y){const I=()=>{delete S.__boundDepthTexture,delete S.__depthDisposeCallback,Y.removeEventListener("dispose",I)};Y.addEventListener("dispose",I),S.__depthDisposeCallback=I}S.__boundDepthTexture=Y}if(T.depthTexture&&!S.__autoAllocateDepthBuffer){if(D)throw new Error("target.depthTexture not supported in Cube render targets");(function(Y,I){if(I&&I.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(i.FRAMEBUFFER,Y),!I.depthTexture||!I.depthTexture.isDepthTexture)throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");n.get(I.depthTexture).__webglTexture&&I.depthTexture.image.width===I.width&&I.depthTexture.image.height===I.height||(I.depthTexture.image.width=I.width,I.depthTexture.image.height=I.height,I.depthTexture.needsUpdate=!0),U(I.depthTexture,0);const B=n.get(I.depthTexture).__webglTexture,b=Q(I);if(I.depthTexture.format===Xi)se(I)?u.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,B,0,b):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,B,0);else{if(I.depthTexture.format!==Si)throw new Error("Unknown depthTexture format");se(I)?u.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,B,0,b):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,B,0)}})(S.__webglFramebuffer,T)}else if(D){S.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)if(t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer[Y]),S.__webglDepthbuffer[Y]===void 0)S.__webglDepthbuffer[Y]=i.createRenderbuffer(),re(S.__webglDepthbuffer[Y],T,!1);else{const I=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,B=S.__webglDepthbuffer[Y];i.bindRenderbuffer(i.RENDERBUFFER,B),i.framebufferRenderbuffer(i.FRAMEBUFFER,I,i.RENDERBUFFER,B)}}else if(t.bindFramebuffer(i.FRAMEBUFFER,S.__webglFramebuffer),S.__webglDepthbuffer===void 0)S.__webglDepthbuffer=i.createRenderbuffer(),re(S.__webglDepthbuffer,T,!1);else{const Y=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,I=S.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,I),i.framebufferRenderbuffer(i.FRAMEBUFFER,Y,i.RENDERBUFFER,I)}t.bindFramebuffer(i.FRAMEBUFFER,null)}const fe=[],Ae=[];function Q(T){return Math.min(r.maxSamples,T.samples)}function se(T){const S=n.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&S.__useRenderToTexture!==!1}function Se(T,S){const D=T.colorSpace,Y=T.format,I=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||D!==In&&D!==pi&&(it.getTransfer(D)===ct?Y===tn&&I===_n||console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",D)),S}function be(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=function(){const T=q;return T>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+r.maxTextures),q+=1,T},this.resetTextureUnits=function(){q=0},this.setTexture2D=U,this.setTexture2DArray=function(T,S){const D=n.get(T);T.version>0&&D.__version!==T.version?J(D,T,S):t.bindTexture(i.TEXTURE_2D_ARRAY,D.__webglTexture,i.TEXTURE0+S)},this.setTexture3D=function(T,S){const D=n.get(T);T.version>0&&D.__version!==T.version?J(D,T,S):t.bindTexture(i.TEXTURE_3D,D.__webglTexture,i.TEXTURE0+S)},this.setTextureCube=function(T,S){const D=n.get(T);T.version>0&&D.__version!==T.version?function(Y,I,B){if(I.image.length!==6)return;const b=j(Y,I),H=I.source;t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture,i.TEXTURE0+B);const V=n.get(H);if(H.version!==V.__version||b===!0){t.activeTexture(i.TEXTURE0+B);const le=it.getPrimaries(it.workingColorSpace),G=I.colorSpace===pi?null:it.getPrimaries(I.colorSpace),ne=I.colorSpace===pi||le===G?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,I.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,I.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ne);const oe=I.isCompressedTexture||I.image[0].isCompressedTexture,ee=I.image[0]&&I.image[0].isDataTexture,_e=[];for(let me=0;me<6;me++)_e[me]=oe||ee?ee?I.image[me].image:I.image[me]:_(I.image[me],!0,r.maxCubemapSize),_e[me]=Se(I,_e[me]);const pe=_e[0],Te=a.convert(I.format,I.colorSpace),Le=a.convert(I.type),je=v(I.internalFormat,Te,Le,I.colorSpace),Ye=I.isVideoTexture!==!0,xe=V.__version===void 0||b===!0,Ke=H.dataReady;let et,Qe=M(I,pe);if(Z(i.TEXTURE_CUBE_MAP,I),oe){Ye&&xe&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Qe,je,pe.width,pe.height);for(let me=0;me<6;me++){et=_e[me].mipmaps;for(let Oe=0;Oe<et.length;Oe++){const tt=et[Oe];I.format!==tn?Te!==null?Ye?Ke&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Oe,0,0,tt.width,tt.height,Te,tt.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Oe,je,tt.width,tt.height,0,tt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ye?Ke&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Oe,0,0,tt.width,tt.height,Te,Le,tt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Oe,je,tt.width,tt.height,0,Te,Le,tt.data)}}}else{if(et=I.mipmaps,Ye&&xe){et.length>0&&Qe++;const me=be(_e[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Qe,je,me.width,me.height)}for(let me=0;me<6;me++)if(ee){Ye?Ke&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,0,0,_e[me].width,_e[me].height,Te,Le,_e[me].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,je,_e[me].width,_e[me].height,0,Te,Le,_e[me].data);for(let Oe=0;Oe<et.length;Oe++){const tt=et[Oe].image[me].image;Ye?Ke&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Oe+1,0,0,tt.width,tt.height,Te,Le,tt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Oe+1,je,tt.width,tt.height,0,Te,Le,tt.data)}}else{Ye?Ke&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,0,0,Te,Le,_e[me]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,0,je,Te,Le,_e[me]);for(let Oe=0;Oe<et.length;Oe++){const tt=et[Oe];Ye?Ke&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Oe+1,0,0,Te,Le,tt.image[me]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+me,Oe+1,je,Te,Le,tt.image[me])}}}g(I)&&f(i.TEXTURE_CUBE_MAP),V.__version=H.version,I.onUpdate&&I.onUpdate(I)}Y.__version=I.version}(D,T,S):t.bindTexture(i.TEXTURE_CUBE_MAP,D.__webglTexture,i.TEXTURE0+S)},this.rebindTextures=function(T,S,D){const Y=n.get(T);S!==void 0&&z(Y.__webglFramebuffer,T,T.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),D!==void 0&&ue(T)},this.setupRenderTarget=function(T){const S=T.texture,D=n.get(T),Y=n.get(S);T.addEventListener("dispose",R);const I=T.textures,B=T.isWebGLCubeRenderTarget===!0,b=I.length>1;if(b||(Y.__webglTexture===void 0&&(Y.__webglTexture=i.createTexture()),Y.__version=S.version,o.memory.textures++),B){D.__webglFramebuffer=[];for(let H=0;H<6;H++)if(S.mipmaps&&S.mipmaps.length>0){D.__webglFramebuffer[H]=[];for(let V=0;V<S.mipmaps.length;V++)D.__webglFramebuffer[H][V]=i.createFramebuffer()}else D.__webglFramebuffer[H]=i.createFramebuffer()}else{if(S.mipmaps&&S.mipmaps.length>0){D.__webglFramebuffer=[];for(let H=0;H<S.mipmaps.length;H++)D.__webglFramebuffer[H]=i.createFramebuffer()}else D.__webglFramebuffer=i.createFramebuffer();if(b)for(let H=0,V=I.length;H<V;H++){const le=n.get(I[H]);le.__webglTexture===void 0&&(le.__webglTexture=i.createTexture(),o.memory.textures++)}if(T.samples>0&&se(T)===!1){D.__webglMultisampledFramebuffer=i.createFramebuffer(),D.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,D.__webglMultisampledFramebuffer);for(let H=0;H<I.length;H++){const V=I[H];D.__webglColorRenderbuffer[H]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,D.__webglColorRenderbuffer[H]);const le=a.convert(V.format,V.colorSpace),G=a.convert(V.type),ne=v(V.internalFormat,le,G,V.colorSpace,T.isXRRenderTarget===!0),oe=Q(T);i.renderbufferStorageMultisample(i.RENDERBUFFER,oe,ne,T.width,T.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+H,i.RENDERBUFFER,D.__webglColorRenderbuffer[H])}i.bindRenderbuffer(i.RENDERBUFFER,null),T.depthBuffer&&(D.__webglDepthRenderbuffer=i.createRenderbuffer(),re(D.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(B){t.bindTexture(i.TEXTURE_CUBE_MAP,Y.__webglTexture),Z(i.TEXTURE_CUBE_MAP,S);for(let H=0;H<6;H++)if(S.mipmaps&&S.mipmaps.length>0)for(let V=0;V<S.mipmaps.length;V++)z(D.__webglFramebuffer[H][V],T,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+H,V);else z(D.__webglFramebuffer[H],T,S,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+H,0);g(S)&&f(i.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(b){for(let H=0,V=I.length;H<V;H++){const le=I[H],G=n.get(le);t.bindTexture(i.TEXTURE_2D,G.__webglTexture),Z(i.TEXTURE_2D,le),z(D.__webglFramebuffer,T,le,i.COLOR_ATTACHMENT0+H,i.TEXTURE_2D,0),g(le)&&f(i.TEXTURE_2D)}t.unbindTexture()}else{let H=i.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(H=T.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(H,Y.__webglTexture),Z(H,S),S.mipmaps&&S.mipmaps.length>0)for(let V=0;V<S.mipmaps.length;V++)z(D.__webglFramebuffer[V],T,S,i.COLOR_ATTACHMENT0,H,V);else z(D.__webglFramebuffer,T,S,i.COLOR_ATTACHMENT0,H,0);g(S)&&f(H),t.unbindTexture()}T.depthBuffer&&ue(T)},this.updateRenderTargetMipmap=function(T){const S=T.textures;for(let D=0,Y=S.length;D<Y;D++){const I=S[D];if(g(I)){const B=T.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,b=n.get(I).__webglTexture;t.bindTexture(B,b),f(B),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(T){if(T.samples>0){if(se(T)===!1){const S=T.textures,D=T.width,Y=T.height;let I=i.COLOR_BUFFER_BIT;const B=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,b=n.get(T),H=S.length>1;if(H)for(let V=0;V<S.length;V++)t.bindFramebuffer(i.FRAMEBUFFER,b.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+V,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+V,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,b.__webglMultisampledFramebuffer),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,b.__webglFramebuffer);for(let V=0;V<S.length;V++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(I|=i.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(I|=i.STENCIL_BUFFER_BIT)),H){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,b.__webglColorRenderbuffer[V]);const le=n.get(S[V]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,le,0)}i.blitFramebuffer(0,0,D,Y,0,0,D,Y,I,i.NEAREST),s===!0&&(fe.length=0,Ae.length=0,fe.push(i.COLOR_ATTACHMENT0+V),T.depthBuffer&&T.resolveDepthBuffer===!1&&(fe.push(B),Ae.push(B),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,Ae)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,fe))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),H)for(let V=0;V<S.length;V++){t.bindFramebuffer(i.FRAMEBUFFER,b.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+V,i.RENDERBUFFER,b.__webglColorRenderbuffer[V]);const le=n.get(S[V]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,b.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+V,i.TEXTURE_2D,le,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,b.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&s){const S=T.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[S])}}},this.setupDepthRenderbuffer=ue,this.setupFrameBufferTexture=z,this.useMultisampledRTT=se}function Uu(i,e){return{convert:function(t,n=""){let r;const a=it.getTransfer(n);if(t===_n)return i.UNSIGNED_BYTE;if(t===ps)return i.UNSIGNED_SHORT_4_4_4_4;if(t===fs)return i.UNSIGNED_SHORT_5_5_5_1;if(t===Vo)return i.UNSIGNED_INT_5_9_9_9_REV;if(t===Ho)return i.BYTE;if(t===Go)return i.SHORT;if(t===Wi)return i.UNSIGNED_SHORT;if(t===ds)return i.INT;if(t===jn)return i.UNSIGNED_INT;if(t===on)return i.FLOAT;if(t===qi)return i.HALF_FLOAT;if(t===ko)return i.ALPHA;if(t===Wo)return i.RGB;if(t===tn)return i.RGBA;if(t===Xo)return i.LUMINANCE;if(t===jo)return i.LUMINANCE_ALPHA;if(t===Xi)return i.DEPTH_COMPONENT;if(t===Si)return i.DEPTH_STENCIL;if(t===ms)return i.RED;if(t===gs)return i.RED_INTEGER;if(t===qo)return i.RG;if(t===_s)return i.RG_INTEGER;if(t===vs)return i.RGBA_INTEGER;if(t===yr||t===Er||t===br||t===Tr)if(a===ct){if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r===null)return null;if(t===yr)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===Er)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===br)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===Tr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(r=e.get("WEBGL_compressed_texture_s3tc"),r===null)return null;if(t===yr)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===Er)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===br)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===Tr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===Na||t===Oa||t===Fa||t===Ba){if(r=e.get("WEBGL_compressed_texture_pvrtc"),r===null)return null;if(t===Na)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===Oa)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===Fa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===Ba)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===za||t===Ha||t===Ga){if(r=e.get("WEBGL_compressed_texture_etc"),r===null)return null;if(t===za||t===Ha)return a===ct?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(t===Ga)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}if(t===Va||t===ka||t===Wa||t===Xa||t===ja||t===qa||t===Ya||t===Ka||t===Za||t===Ja||t===$a||t===Qa||t===es||t===ts){if(r=e.get("WEBGL_compressed_texture_astc"),r===null)return null;if(t===Va)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===ka)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===Wa)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===Xa)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===ja)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===qa)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===Ya)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===Ka)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===Za)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===Ja)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===$a)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===Qa)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===es)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===ts)return a===ct?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===wr||t===ns||t===is){if(r=e.get("EXT_texture_compression_bptc"),r===null)return null;if(t===wr)return a===ct?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===ns)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===is)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===Yo||t===rs||t===as||t===ss){if(r=e.get("EXT_texture_compression_rgtc"),r===null)return null;if(t===wr)return r.COMPRESSED_RED_RGTC1_EXT;if(t===rs)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===as)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===ss)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===Mi?i.UNSIGNED_INT_24_8:i[t]!==void 0?i[t]:null}}}class Iu extends Wt{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}}class qt extends bt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Nu={type:"move"};class Ea{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new qt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new qt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new A,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new A),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new qt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new A,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new A),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let r=null,a=null,o=null;const u=this._targetRay,s=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const _ of e.hand.values()){const g=t.getJointPose(_,n),f=this._getHandJoint(c,_);g!==null&&(f.matrix.fromArray(g.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=g.radius),f.visible=g!==null}const l=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=l.position.distanceTo(h.position),p=.02,m=.005;c.inputState.pinching&&d>p+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else s!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,n),a!==null&&(s.matrix.fromArray(a.transform.matrix),s.matrix.decompose(s.position,s.rotation,s.scale),s.matrixWorldNeedsUpdate=!0,a.linearVelocity?(s.hasLinearVelocity=!0,s.linearVelocity.copy(a.linearVelocity)):s.hasLinearVelocity=!1,a.angularVelocity?(s.hasAngularVelocity=!0,s.angularVelocity.copy(a.angularVelocity)):s.hasAngularVelocity=!1));u!==null&&(r=t.getPose(e.targetRaySpace,n),r===null&&a!==null&&(r=a),r!==null&&(u.matrix.fromArray(r.transform.matrix),u.matrix.decompose(u.position,u.rotation,u.scale),u.matrixWorldNeedsUpdate=!0,r.linearVelocity?(u.hasLinearVelocity=!0,u.linearVelocity.copy(r.linearVelocity)):u.hasLinearVelocity=!1,r.angularVelocity?(u.hasAngularVelocity=!0,u.angularVelocity.copy(r.angularVelocity)):u.hasAngularVelocity=!1,this.dispatchEvent(Nu)))}return u!==null&&(u.visible=r!==null),s!==null&&(s.visible=a!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new qt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class Ou{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){const r=new Pt;e.properties.get(r).__webglTexture=t.texture,t.depthNear==n.depthNear&&t.depthFar==n.depthFar||(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=r}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Un({vertexShader:`
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

}`,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new _t(new wi(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Fu extends bi{constructor(e,t){super();const n=this;let r=null,a=1,o=null,u="local-floor",s=1,c=null,l=null,h=null,d=null,p=null,m=null;const _=new Ou,g=t.getContextAttributes();let f=null,v=null;const x=[],M=[],w=new ze;let R=null;const P=new Wt;P.layers.enable(1),P.viewport=new rt;const q=new Wt;q.layers.enable(2),q.viewport=new rt;const U=[P,q],k=new Iu;k.layers.enable(1),k.layers.enable(2);let K=null,F=null;function Z(Q){const se=M.indexOf(Q.inputSource);if(se===-1)return;const Se=x[se];Se!==void 0&&(Se.update(Q.inputSource,Q.frame,c||o),Se.dispatchEvent({type:Q.type,data:Q.inputSource}))}function j(){r.removeEventListener("select",Z),r.removeEventListener("selectstart",Z),r.removeEventListener("selectend",Z),r.removeEventListener("squeeze",Z),r.removeEventListener("squeezestart",Z),r.removeEventListener("squeezeend",Z),r.removeEventListener("end",j),r.removeEventListener("inputsourceschange",J);for(let Q=0;Q<x.length;Q++){const se=M[Q];se!==null&&(M[Q]=null,x[Q].disconnect(se))}K=null,F=null,_.reset(),e.setRenderTarget(f),p=null,d=null,h=null,r=null,v=null,Ae.stop(),n.isPresenting=!1,e.setPixelRatio(R),e.setSize(w.width,w.height,!1),n.dispatchEvent({type:"sessionend"})}function J(Q){for(let se=0;se<Q.removed.length;se++){const Se=Q.removed[se],be=M.indexOf(Se);be>=0&&(M[be]=null,x[be].disconnect(Se))}for(let se=0;se<Q.added.length;se++){const Se=Q.added[se];let be=M.indexOf(Se);if(be===-1){for(let S=0;S<x.length;S++){if(S>=M.length){M.push(Se),be=S;break}if(M[S]===null){M[S]=Se,be=S;break}}if(be===-1)break}const T=x[be];T&&T.connect(Se)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let se=x[Q];return se===void 0&&(se=new Ea,x[Q]=se),se.getTargetRaySpace()},this.getControllerGrip=function(Q){let se=x[Q];return se===void 0&&(se=new Ea,x[Q]=se),se.getGripSpace()},this.getHand=function(Q){let se=x[Q];return se===void 0&&(se=new Ea,x[Q]=se),se.getHandSpace()},this.setFramebufferScaleFactor=function(Q){a=Q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){u=Q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Q){c=Q},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return h},this.getFrame=function(){return m},this.getSession=function(){return r},this.setSession=async function(Q){if(r=Q,r!==null){if(f=e.getRenderTarget(),r.addEventListener("select",Z),r.addEventListener("selectstart",Z),r.addEventListener("selectend",Z),r.addEventListener("squeeze",Z),r.addEventListener("squeezestart",Z),r.addEventListener("squeezeend",Z),r.addEventListener("end",j),r.addEventListener("inputsourceschange",J),g.xrCompatible!==!0&&await t.makeXRCompatible(),R=e.getPixelRatio(),e.getSize(w),r.renderState.layers===void 0){const se={antialias:g.antialias,alpha:!0,depth:g.depth,stencil:g.stencil,framebufferScaleFactor:a};p=new XRWebGLLayer(r,t,se),r.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),v=new qn(p.framebufferWidth,p.framebufferHeight,{format:tn,type:_n,colorSpace:e.outputColorSpace,stencilBuffer:g.stencil})}else{let se=null,Se=null,be=null;g.depth&&(be=g.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,se=g.stencil?Si:Xi,Se=g.stencil?Mi:jn);const T={colorFormat:t.RGBA8,depthFormat:be,scaleFactor:a};h=new XRWebGLBinding(r,t),d=h.createProjectionLayer(T),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),v=new qn(d.textureWidth,d.textureHeight,{format:tn,type:_n,depthTexture:new al(d.textureWidth,d.textureHeight,Se,void 0,void 0,void 0,void 0,void 0,void 0,se),stencilBuffer:g.stencil,colorSpace:e.outputColorSpace,samples:g.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(s),c=null,o=await r.requestReferenceSpace(u),Ae.setContext(r),Ae.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};const z=new A,re=new A;function ue(Q,se){se===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(se.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(r===null)return;let se=Q.near,Se=Q.far;_.texture!==null&&(_.depthNear>0&&(se=_.depthNear),_.depthFar>0&&(Se=_.depthFar)),k.near=q.near=P.near=se,k.far=q.far=P.far=Se,K===k.near&&F===k.far||(r.updateRenderState({depthNear:k.near,depthFar:k.far}),K=k.near,F=k.far);const be=Q.parent,T=k.cameras;ue(k,be);for(let S=0;S<T.length;S++)ue(T[S],be);T.length===2?function(S,D,Y){z.setFromMatrixPosition(D.matrixWorld),re.setFromMatrixPosition(Y.matrixWorld);const I=z.distanceTo(re),B=D.projectionMatrix.elements,b=Y.projectionMatrix.elements,H=B[14]/(B[10]-1),V=B[14]/(B[10]+1),le=(B[9]+1)/B[5],G=(B[9]-1)/B[5],ne=(B[8]-1)/B[0],oe=(b[8]+1)/b[0],ee=H*ne,_e=H*oe,pe=I/(-ne+oe),Te=pe*-ne;if(D.matrixWorld.decompose(S.position,S.quaternion,S.scale),S.translateX(Te),S.translateZ(pe),S.matrixWorld.compose(S.position,S.quaternion,S.scale),S.matrixWorldInverse.copy(S.matrixWorld).invert(),B[10]===-1)S.projectionMatrix.copy(D.projectionMatrix),S.projectionMatrixInverse.copy(D.projectionMatrixInverse);else{const Le=H+pe,je=V+pe,Ye=ee-Te,xe=_e+(I-Te),Ke=le*V/je*Le,et=G*V/je*Le;S.projectionMatrix.makePerspective(Ye,xe,Ke,et,Le,je),S.projectionMatrixInverse.copy(S.projectionMatrix).invert()}}(k,P,q):k.projectionMatrix.copy(P.projectionMatrix),function(S,D,Y){Y===null?S.matrix.copy(D.matrixWorld):(S.matrix.copy(Y.matrixWorld),S.matrix.invert(),S.matrix.multiply(D.matrixWorld)),S.matrix.decompose(S.position,S.quaternion,S.scale),S.updateMatrixWorld(!0),S.projectionMatrix.copy(D.projectionMatrix),S.projectionMatrixInverse.copy(D.projectionMatrixInverse),S.isPerspectiveCamera&&(S.fov=2*os*Math.atan(1/S.projectionMatrix.elements[5]),S.zoom=1)}(Q,k,be)},this.getCamera=function(){return k},this.getFoveation=function(){if(d!==null||p!==null)return s},this.setFoveation=function(Q){s=Q,d!==null&&(d.fixedFoveation=Q),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Q)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(k)};let fe=null;const Ae=new rl;Ae.setAnimationLoop(function(Q,se){if(l=se.getViewerPose(c||o),m=se,l!==null){const Se=l.views;p!==null&&(e.setRenderTargetFramebuffer(v,p.framebuffer),e.setRenderTarget(v));let be=!1;Se.length!==k.cameras.length&&(k.cameras.length=0,be=!0);for(let S=0;S<Se.length;S++){const D=Se[S];let Y=null;if(p!==null)Y=p.getViewport(D);else{const B=h.getViewSubImage(d,D);Y=B.viewport,S===0&&(e.setRenderTargetTextures(v,B.colorTexture,d.ignoreDepthValues?void 0:B.depthStencilTexture),e.setRenderTarget(v))}let I=U[S];I===void 0&&(I=new Wt,I.layers.enable(S),I.viewport=new rt,U[S]=I),I.matrix.fromArray(D.transform.matrix),I.matrix.decompose(I.position,I.quaternion,I.scale),I.projectionMatrix.fromArray(D.projectionMatrix),I.projectionMatrixInverse.copy(I.projectionMatrix).invert(),I.viewport.set(Y.x,Y.y,Y.width,Y.height),S===0&&(k.matrix.copy(I.matrix),k.matrix.decompose(k.position,k.quaternion,k.scale)),be===!0&&k.cameras.push(I)}const T=r.enabledFeatures;if(T&&T.includes("depth-sensing")){const S=h.getDepthInformation(Se[0]);S&&S.isValid&&S.texture&&_.init(e,S,r.renderState)}}for(let Se=0;Se<x.length;Se++){const be=M[Se],T=x[Se];be!==null&&T!==void 0&&T.update(be,se,c||o)}fe&&fe(Q,se),se.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:se}),m=null}),this.setAnimationLoop=function(Q){fe=Q},this.dispose=function(){}}}const Vn=new Ot,Bu=new Pe;function zu(i,e){function t(r,a){r.matrixAutoUpdate===!0&&r.updateMatrix(),a.value.copy(r.matrix)}function n(r,a){r.opacity.value=a.opacity,a.color&&r.diffuse.value.copy(a.color),a.emissive&&r.emissive.value.copy(a.emissive).multiplyScalar(a.emissiveIntensity),a.map&&(r.map.value=a.map,t(a.map,r.mapTransform)),a.alphaMap&&(r.alphaMap.value=a.alphaMap,t(a.alphaMap,r.alphaMapTransform)),a.bumpMap&&(r.bumpMap.value=a.bumpMap,t(a.bumpMap,r.bumpMapTransform),r.bumpScale.value=a.bumpScale,a.side===Nt&&(r.bumpScale.value*=-1)),a.normalMap&&(r.normalMap.value=a.normalMap,t(a.normalMap,r.normalMapTransform),r.normalScale.value.copy(a.normalScale),a.side===Nt&&r.normalScale.value.negate()),a.displacementMap&&(r.displacementMap.value=a.displacementMap,t(a.displacementMap,r.displacementMapTransform),r.displacementScale.value=a.displacementScale,r.displacementBias.value=a.displacementBias),a.emissiveMap&&(r.emissiveMap.value=a.emissiveMap,t(a.emissiveMap,r.emissiveMapTransform)),a.specularMap&&(r.specularMap.value=a.specularMap,t(a.specularMap,r.specularMapTransform)),a.alphaTest>0&&(r.alphaTest.value=a.alphaTest);const o=e.get(a),u=o.envMap,s=o.envMapRotation;u&&(r.envMap.value=u,Vn.copy(s),Vn.x*=-1,Vn.y*=-1,Vn.z*=-1,u.isCubeTexture&&u.isRenderTargetTexture===!1&&(Vn.y*=-1,Vn.z*=-1),r.envMapRotation.value.setFromMatrix4(Bu.makeRotationFromEuler(Vn)),r.flipEnvMap.value=u.isCubeTexture&&u.isRenderTargetTexture===!1?-1:1,r.reflectivity.value=a.reflectivity,r.ior.value=a.ior,r.refractionRatio.value=a.refractionRatio),a.lightMap&&(r.lightMap.value=a.lightMap,r.lightMapIntensity.value=a.lightMapIntensity,t(a.lightMap,r.lightMapTransform)),a.aoMap&&(r.aoMap.value=a.aoMap,r.aoMapIntensity.value=a.aoMapIntensity,t(a.aoMap,r.aoMapTransform))}return{refreshFogUniforms:function(r,a){a.color.getRGB(r.fogColor.value,nl(i)),a.isFog?(r.fogNear.value=a.near,r.fogFar.value=a.far):a.isFogExp2&&(r.fogDensity.value=a.density)},refreshMaterialUniforms:function(r,a,o,u,s){a.isMeshBasicMaterial||a.isMeshLambertMaterial?n(r,a):a.isMeshToonMaterial?(n(r,a),function(c,l){l.gradientMap&&(c.gradientMap.value=l.gradientMap)}(r,a)):a.isMeshPhongMaterial?(n(r,a),function(c,l){c.specular.value.copy(l.specular),c.shininess.value=Math.max(l.shininess,1e-4)}(r,a)):a.isMeshStandardMaterial?(n(r,a),function(c,l){c.metalness.value=l.metalness,l.metalnessMap&&(c.metalnessMap.value=l.metalnessMap,t(l.metalnessMap,c.metalnessMapTransform)),c.roughness.value=l.roughness,l.roughnessMap&&(c.roughnessMap.value=l.roughnessMap,t(l.roughnessMap,c.roughnessMapTransform)),l.envMap&&(c.envMapIntensity.value=l.envMapIntensity)}(r,a),a.isMeshPhysicalMaterial&&function(c,l,h){c.ior.value=l.ior,l.sheen>0&&(c.sheenColor.value.copy(l.sheenColor).multiplyScalar(l.sheen),c.sheenRoughness.value=l.sheenRoughness,l.sheenColorMap&&(c.sheenColorMap.value=l.sheenColorMap,t(l.sheenColorMap,c.sheenColorMapTransform)),l.sheenRoughnessMap&&(c.sheenRoughnessMap.value=l.sheenRoughnessMap,t(l.sheenRoughnessMap,c.sheenRoughnessMapTransform))),l.clearcoat>0&&(c.clearcoat.value=l.clearcoat,c.clearcoatRoughness.value=l.clearcoatRoughness,l.clearcoatMap&&(c.clearcoatMap.value=l.clearcoatMap,t(l.clearcoatMap,c.clearcoatMapTransform)),l.clearcoatRoughnessMap&&(c.clearcoatRoughnessMap.value=l.clearcoatRoughnessMap,t(l.clearcoatRoughnessMap,c.clearcoatRoughnessMapTransform)),l.clearcoatNormalMap&&(c.clearcoatNormalMap.value=l.clearcoatNormalMap,t(l.clearcoatNormalMap,c.clearcoatNormalMapTransform),c.clearcoatNormalScale.value.copy(l.clearcoatNormalScale),l.side===Nt&&c.clearcoatNormalScale.value.negate())),l.dispersion>0&&(c.dispersion.value=l.dispersion),l.iridescence>0&&(c.iridescence.value=l.iridescence,c.iridescenceIOR.value=l.iridescenceIOR,c.iridescenceThicknessMinimum.value=l.iridescenceThicknessRange[0],c.iridescenceThicknessMaximum.value=l.iridescenceThicknessRange[1],l.iridescenceMap&&(c.iridescenceMap.value=l.iridescenceMap,t(l.iridescenceMap,c.iridescenceMapTransform)),l.iridescenceThicknessMap&&(c.iridescenceThicknessMap.value=l.iridescenceThicknessMap,t(l.iridescenceThicknessMap,c.iridescenceThicknessMapTransform))),l.transmission>0&&(c.transmission.value=l.transmission,c.transmissionSamplerMap.value=h.texture,c.transmissionSamplerSize.value.set(h.width,h.height),l.transmissionMap&&(c.transmissionMap.value=l.transmissionMap,t(l.transmissionMap,c.transmissionMapTransform)),c.thickness.value=l.thickness,l.thicknessMap&&(c.thicknessMap.value=l.thicknessMap,t(l.thicknessMap,c.thicknessMapTransform)),c.attenuationDistance.value=l.attenuationDistance,c.attenuationColor.value.copy(l.attenuationColor)),l.anisotropy>0&&(c.anisotropyVector.value.set(l.anisotropy*Math.cos(l.anisotropyRotation),l.anisotropy*Math.sin(l.anisotropyRotation)),l.anisotropyMap&&(c.anisotropyMap.value=l.anisotropyMap,t(l.anisotropyMap,c.anisotropyMapTransform))),c.specularIntensity.value=l.specularIntensity,c.specularColor.value.copy(l.specularColor),l.specularColorMap&&(c.specularColorMap.value=l.specularColorMap,t(l.specularColorMap,c.specularColorMapTransform)),l.specularIntensityMap&&(c.specularIntensityMap.value=l.specularIntensityMap,t(l.specularIntensityMap,c.specularIntensityMapTransform))}(r,a,s)):a.isMeshMatcapMaterial?(n(r,a),function(c,l){l.matcap&&(c.matcap.value=l.matcap)}(r,a)):a.isMeshDepthMaterial?n(r,a):a.isMeshDistanceMaterial?(n(r,a),function(c,l){const h=e.get(l).light;c.referencePosition.value.setFromMatrixPosition(h.matrixWorld),c.nearDistance.value=h.shadow.camera.near,c.farDistance.value=h.shadow.camera.far}(r,a)):a.isMeshNormalMaterial?n(r,a):a.isLineBasicMaterial?(function(c,l){c.diffuse.value.copy(l.color),c.opacity.value=l.opacity,l.map&&(c.map.value=l.map,t(l.map,c.mapTransform))}(r,a),a.isLineDashedMaterial&&function(c,l){c.dashSize.value=l.dashSize,c.totalSize.value=l.dashSize+l.gapSize,c.scale.value=l.scale}(r,a)):a.isPointsMaterial?function(c,l,h,d){c.diffuse.value.copy(l.color),c.opacity.value=l.opacity,c.size.value=l.size*h,c.scale.value=.5*d,l.map&&(c.map.value=l.map,t(l.map,c.uvTransform)),l.alphaMap&&(c.alphaMap.value=l.alphaMap,t(l.alphaMap,c.alphaMapTransform)),l.alphaTest>0&&(c.alphaTest.value=l.alphaTest)}(r,a,o,u):a.isSpriteMaterial?function(c,l){c.diffuse.value.copy(l.color),c.opacity.value=l.opacity,c.rotation.value=l.rotation,l.map&&(c.map.value=l.map,t(l.map,c.mapTransform)),l.alphaMap&&(c.alphaMap.value=l.alphaMap,t(l.alphaMap,c.alphaMapTransform)),l.alphaTest>0&&(c.alphaTest.value=l.alphaTest)}(r,a):a.isShadowMaterial?(r.color.value.copy(a.color),r.opacity.value=a.opacity):a.isShaderMaterial&&(a.uniformsNeedUpdate=!1)}}}function Hu(i,e,t,n){let r={},a={},o=[];const u=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function s(h,d,p,m){const _=h.value,g=d+"_"+p;if(m[g]===void 0)return m[g]=typeof _=="number"||typeof _=="boolean"?_:_.clone(),!0;{const f=m[g];if(typeof _=="number"||typeof _=="boolean"){if(f!==_)return m[g]=_,!0}else if(f.equals(_)===!1)return f.copy(_),!0}return!1}function c(h){const d={boundary:0,storage:0};return typeof h=="number"||typeof h=="boolean"?(d.boundary=4,d.storage=4):h.isVector2?(d.boundary=8,d.storage=8):h.isVector3||h.isColor?(d.boundary=16,d.storage=12):h.isVector4?(d.boundary=16,d.storage=16):h.isMatrix3?(d.boundary=48,d.storage=48):h.isMatrix4?(d.boundary=64,d.storage=64):h.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",h),d}function l(h){const d=h.target;d.removeEventListener("dispose",l);const p=o.indexOf(d.__bindingPointIndex);o.splice(p,1),i.deleteBuffer(r[d.id]),delete r[d.id],delete a[d.id]}return{bind:function(h,d){const p=d.program;n.uniformBlockBinding(h,p)},update:function(h,d){let p=r[h.id];p===void 0&&(function(g){const f=g.uniforms;let v=0;const x=16;for(let w=0,R=f.length;w<R;w++){const P=Array.isArray(f[w])?f[w]:[f[w]];for(let q=0,U=P.length;q<U;q++){const k=P[q],K=Array.isArray(k.value)?k.value:[k.value];for(let F=0,Z=K.length;F<Z;F++){const j=c(K[F]),J=v%x,z=J%j.boundary,re=J+z;v+=z,re!==0&&x-re<j.storage&&(v+=x-re),k.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=v,v+=j.storage}}}const M=v%x;M>0&&(v+=x-M),g.__size=v,g.__cache={}}(h),p=function(g){const f=function(){for(let w=0;w<u;w++)if(o.indexOf(w)===-1)return o.push(w),w;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}();g.__bindingPointIndex=f;const v=i.createBuffer(),x=g.__size,M=g.usage;return i.bindBuffer(i.UNIFORM_BUFFER,v),i.bufferData(i.UNIFORM_BUFFER,x,M),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,f,v),v}(h),r[h.id]=p,h.addEventListener("dispose",l));const m=d.program;n.updateUBOMapping(h,m);const _=e.render.frame;a[h.id]!==_&&(function(g){const f=r[g.id],v=g.uniforms,x=g.__cache;i.bindBuffer(i.UNIFORM_BUFFER,f);for(let M=0,w=v.length;M<w;M++){const R=Array.isArray(v[M])?v[M]:[v[M]];for(let P=0,q=R.length;P<q;P++){const U=R[P];if(s(U,M,P,x)===!0){const k=U.__offset,K=Array.isArray(U.value)?U.value:[U.value];let F=0;for(let Z=0;Z<K.length;Z++){const j=K[Z],J=c(j);typeof j=="number"||typeof j=="boolean"?(U.__data[0]=j,i.bufferSubData(i.UNIFORM_BUFFER,k+F,U.__data)):j.isMatrix3?(U.__data[0]=j.elements[0],U.__data[1]=j.elements[1],U.__data[2]=j.elements[2],U.__data[3]=0,U.__data[4]=j.elements[3],U.__data[5]=j.elements[4],U.__data[6]=j.elements[5],U.__data[7]=0,U.__data[8]=j.elements[6],U.__data[9]=j.elements[7],U.__data[10]=j.elements[8],U.__data[11]=0):(j.toArray(U.__data,F),F+=J.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,k,U.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}(h),a[h.id]=_)},dispose:function(){for(const h in r)i.deleteBuffer(r[h]);o=[],r={},a={}}}}class Gu{constructor(e={}){const{canvas:t=Ul(),context:n=null,depth:r=!0,stencil:a=!1,alpha:o=!1,antialias:u=!1,premultipliedAlpha:s=!0,preserveDrawingBuffer:c=!1,powerPreference:l="default",failIfMajorPerformanceCaveat:h=!1}=e;let d;if(this.isWebGLRenderer=!0,n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=o;const p=new Uint32Array(4),m=new Int32Array(4);let _=null,g=null;const f=[],v=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=kt,this.toneMapping=Ln,this.toneMappingExposure=1;const x=this;let M=!1,w=0,R=0,P=null,q=-1,U=null;const k=new rt,K=new rt;let F=null;const Z=new Be(0);let j=0,J=t.width,z=t.height,re=1,ue=null,fe=null;const Ae=new rt(0,0,J,z),Q=new rt(0,0,J,z);let se=!1;const Se=new Gr;let be=!1,T=!1;const S=new Pe,D=new Pe,Y=new A,I=new rt,B={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let b=!1;function H(){return P===null?re:1}let V,le,G,ne,oe,ee,_e,pe,Te,Le,je,Ye,xe,Ke,et,Qe,me,Oe,tt,Jn,Mn,wt,L,C,y=n;function ae(E,N){return t.getContext(E,N)}try{const E={alpha:!0,depth:r,stencil:a,antialias:u,premultipliedAlpha:s,preserveDrawingBuffer:c,powerPreference:l,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${Ca}`),t.addEventListener("webglcontextlost",Re,!1),t.addEventListener("webglcontextrestored",Ve,!1),t.addEventListener("webglcontextcreationerror",st,!1),y===null){const N="webgl2";if(y=ae(N,E),y===null)throw ae(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(E){throw console.error("THREE.WebGLRenderer: "+E.message),E}function ie(){V=new uc(y),V.init(),wt=new Uu(y,V),le=new sc(y,V,e,wt),G=new Lu(y),le.reverseDepthBuffer&&G.buffers.depth.setReversed(!0),ne=new pc(y),oe=new xu,ee=new Du(y,V,G,oe,le,wt,ne),_e=new lc(x),pe=new cc(x),Te=new tc(y),L=new rc(y,Te),Le=new hc(y,Te,ne,L),je=new mc(y,Le,Te,ne),tt=new fc(y,le,ee),Qe=new oc(oe),Ye=new vu(x,_e,pe,V,le,L,Qe),xe=new zu(x,oe),Ke=new Su,et=new wu(V),Oe=new ic(x,_e,pe,G,je,d,s),me=new Cu(x,je,le),C=new Hu(y,ne,le,G),Jn=new ac(y,V,ne),Mn=new dc(y,V,ne),ne.programs=Ye.programs,x.capabilities=le,x.extensions=V,x.properties=oe,x.renderLists=Ke,x.shadowMap=me,x.state=G,x.info=ne}ie();const ge=new Fu(x,y);function Re(E){E.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function Ve(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const E=ne.autoReset,N=me.enabled,X=me.autoUpdate,$=me.needsUpdate,W=me.type;ie(),ne.autoReset=E,me.enabled=N,me.autoUpdate=X,me.needsUpdate=$,me.type=W}function st(E){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function at(E){const N=E.target;N.removeEventListener("dispose",at),function(X){(function($){const W=oe.get($).programs;W!==void 0&&(W.forEach(function(ce){Ye.releaseProgram(ce)}),$.isShaderMaterial&&Ye.releaseShaderCache($))})(X),oe.remove(X)}(N)}function ot(E,N,X){E.transparent===!0&&E.side===2&&E.forceSinglePass===!1?(E.side=Nt,E.needsUpdate=!0,nt(E,N,X),E.side=Dn,E.needsUpdate=!0,nt(E,N,X),E.side=2):nt(E,N,X)}this.xr=ge,this.getContext=function(){return y},this.getContextAttributes=function(){return y.getContextAttributes()},this.forceContextLoss=function(){const E=V.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=V.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return re},this.setPixelRatio=function(E){E!==void 0&&(re=E,this.setSize(J,z,!1))},this.getSize=function(E){return E.set(J,z)},this.setSize=function(E,N,X=!0){ge.isPresenting?console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting."):(J=E,z=N,t.width=Math.floor(E*re),t.height=Math.floor(N*re),X===!0&&(t.style.width=E+"px",t.style.height=N+"px"),this.setViewport(0,0,E,N))},this.getDrawingBufferSize=function(E){return E.set(J*re,z*re).floor()},this.setDrawingBufferSize=function(E,N,X){J=E,z=N,re=X,t.width=Math.floor(E*X),t.height=Math.floor(N*X),this.setViewport(0,0,E,N)},this.getCurrentViewport=function(E){return E.copy(k)},this.getViewport=function(E){return E.copy(Ae)},this.setViewport=function(E,N,X,$){E.isVector4?Ae.set(E.x,E.y,E.z,E.w):Ae.set(E,N,X,$),G.viewport(k.copy(Ae).multiplyScalar(re).round())},this.getScissor=function(E){return E.copy(Q)},this.setScissor=function(E,N,X,$){E.isVector4?Q.set(E.x,E.y,E.z,E.w):Q.set(E,N,X,$),G.scissor(K.copy(Q).multiplyScalar(re).round())},this.getScissorTest=function(){return se},this.setScissorTest=function(E){G.setScissorTest(se=E)},this.setOpaqueSort=function(E){ue=E},this.setTransparentSort=function(E){fe=E},this.getClearColor=function(E){return E.copy(Oe.getClearColor())},this.setClearColor=function(){Oe.setClearColor.apply(Oe,arguments)},this.getClearAlpha=function(){return Oe.getClearAlpha()},this.setClearAlpha=function(){Oe.setClearAlpha.apply(Oe,arguments)},this.clear=function(E=!0,N=!0,X=!0){let $=0;if(E){let W=!1;if(P!==null){const ce=P.texture.format;W=ce===vs||ce===_s||ce===gs}if(W){const ce=P.texture.type,ve=ce===_n||ce===jn||ce===Wi||ce===Mi||ce===ps||ce===fs,ye=Oe.getClearColor(),we=Oe.getClearAlpha(),Ne=ye.r,Ie=ye.g,De=ye.b;ve?(p[0]=Ne,p[1]=Ie,p[2]=De,p[3]=we,y.clearBufferuiv(y.COLOR,0,p)):(m[0]=Ne,m[1]=Ie,m[2]=De,m[3]=we,y.clearBufferiv(y.COLOR,0,m))}else $|=y.COLOR_BUFFER_BIT}N&&($|=y.DEPTH_BUFFER_BIT,y.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),X&&($|=y.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),y.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Re,!1),t.removeEventListener("webglcontextrestored",Ve,!1),t.removeEventListener("webglcontextcreationerror",st,!1),Ke.dispose(),et.dispose(),oe.dispose(),_e.dispose(),pe.dispose(),je.dispose(),L.dispose(),C.dispose(),Ye.dispose(),ge.dispose(),ge.removeEventListener("sessionstart",Ee),ge.removeEventListener("sessionend",Me),Ue.stop()},this.renderBufferDirect=function(E,N,X,$,W,ce){N===null&&(N=B);const ve=W.isMesh&&W.matrixWorld.determinant()<0,ye=function($e,pt,Tt,We,Fe){pt.isScene!==!0&&(pt=B),ee.resetTextureUnits();const Yt=pt.fog,fl=We.isMeshStandardMaterial?pt.environment:null,ml=P===null?x.outputColorSpace:P.isXRRenderTarget===!0?P.texture.colorSpace:In,Zi=(We.isMeshStandardMaterial?pe:_e).get(We.envMap||fl),gl=We.vertexColors===!0&&!!Tt.attributes.color&&Tt.attributes.color.itemSize===4,_l=!!Tt.attributes.tangent&&(!!We.normalMap||We.anisotropy>0),vl=!!Tt.morphAttributes.position,xl=!!Tt.morphAttributes.normal,Ml=!!Tt.morphAttributes.color;let As=Ln;We.toneMapped&&(P!==null&&P.isXRRenderTarget!==!0||(As=x.toneMapping));const Rs=Tt.morphAttributes.position||Tt.morphAttributes.normal||Tt.morphAttributes.color,Sl=Rs!==void 0?Rs.length:0,Ze=oe.get(We),yl=g.state.lights;if(be===!0&&(T===!0||$e!==U)){const Gt=$e===U&&We.id===q;Qe.setState(We,$e,Gt)}let Kt=!1;We.version===Ze.__version?Ze.needsLights&&Ze.lightsStateVersion!==yl.state.version||Ze.outputColorSpace!==ml||Fe.isBatchedMesh&&Ze.batching===!1?Kt=!0:Fe.isBatchedMesh||Ze.batching!==!0?Fe.isBatchedMesh&&Ze.batchingColor===!0&&Fe.colorTexture===null||Fe.isBatchedMesh&&Ze.batchingColor===!1&&Fe.colorTexture!==null||Fe.isInstancedMesh&&Ze.instancing===!1?Kt=!0:Fe.isInstancedMesh||Ze.instancing!==!0?Fe.isSkinnedMesh&&Ze.skinning===!1?Kt=!0:Fe.isSkinnedMesh||Ze.skinning!==!0?Fe.isInstancedMesh&&Ze.instancingColor===!0&&Fe.instanceColor===null||Fe.isInstancedMesh&&Ze.instancingColor===!1&&Fe.instanceColor!==null||Fe.isInstancedMesh&&Ze.instancingMorph===!0&&Fe.morphTexture===null||Fe.isInstancedMesh&&Ze.instancingMorph===!1&&Fe.morphTexture!==null||Ze.envMap!==Zi||We.fog===!0&&Ze.fog!==Yt?Kt=!0:Ze.numClippingPlanes===void 0||Ze.numClippingPlanes===Qe.numPlanes&&Ze.numIntersection===Qe.numIntersection?(Ze.vertexAlphas!==gl||Ze.vertexTangents!==_l||Ze.morphTargets!==vl||Ze.morphNormals!==xl||Ze.morphColors!==Ml||Ze.toneMapping!==As||Ze.morphTargetsCount!==Sl)&&(Kt=!0):Kt=!0:Kt=!0:Kt=!0:Kt=!0:(Kt=!0,Ze.__version=We.version);let Nn=Ze.currentProgram;Kt===!0&&(Nn=nt(We,pt,Fe));let Cs=!1,Ri=!1,Wr=!1;const gt=Nn.getUniforms(),Sn=Ze.uniforms;if(G.useProgram(Nn.program)&&(Cs=!0,Ri=!0,Wr=!0),We.id!==q&&(q=We.id,Ri=!0),Cs||U!==$e){le.reverseDepthBuffer?(S.copy($e.projectionMatrix),function(On){const ht=On.elements;ht[2]=.5*ht[2]+.5*ht[3],ht[6]=.5*ht[6]+.5*ht[7],ht[10]=.5*ht[10]+.5*ht[11],ht[14]=.5*ht[14]+.5*ht[15]}(S),function(On){const ht=On.elements;ht[11]===-1?(ht[10]=-ht[10]-1,ht[14]=-ht[14]):(ht[10]=-ht[10],ht[14]=1-ht[14])}(S),gt.setValue(y,"projectionMatrix",S)):gt.setValue(y,"projectionMatrix",$e.projectionMatrix),gt.setValue(y,"viewMatrix",$e.matrixWorldInverse);const Gt=gt.map.cameraPosition;Gt!==void 0&&Gt.setValue(y,Y.setFromMatrixPosition($e.matrixWorld)),le.logarithmicDepthBuffer&&gt.setValue(y,"logDepthBufFC",2/(Math.log($e.far+1)/Math.LN2)),(We.isMeshPhongMaterial||We.isMeshToonMaterial||We.isMeshLambertMaterial||We.isMeshBasicMaterial||We.isMeshStandardMaterial||We.isShaderMaterial)&&gt.setValue(y,"isOrthographic",$e.isOrthographicCamera===!0),U!==$e&&(U=$e,Ri=!0,Wr=!0)}if(Fe.isSkinnedMesh){gt.setOptional(y,Fe,"bindMatrix"),gt.setOptional(y,Fe,"bindMatrixInverse");const Gt=Fe.skeleton;Gt&&(Gt.boneTexture===null&&Gt.computeBoneTexture(),gt.setValue(y,"boneTexture",Gt.boneTexture,ee))}Fe.isBatchedMesh&&(gt.setOptional(y,Fe,"batchingTexture"),gt.setValue(y,"batchingTexture",Fe._matricesTexture,ee),gt.setOptional(y,Fe,"batchingIdTexture"),gt.setValue(y,"batchingIdTexture",Fe._indirectTexture,ee),gt.setOptional(y,Fe,"batchingColorTexture"),Fe._colorsTexture!==null&&gt.setValue(y,"batchingColorTexture",Fe._colorsTexture,ee));const Xr=Tt.morphAttributes;Xr.position===void 0&&Xr.normal===void 0&&Xr.color===void 0||tt.update(Fe,Tt,Nn),(Ri||Ze.receiveShadow!==Fe.receiveShadow)&&(Ze.receiveShadow=Fe.receiveShadow,gt.setValue(y,"receiveShadow",Fe.receiveShadow)),We.isMeshGouraudMaterial&&We.envMap!==null&&(Sn.envMap.value=Zi,Sn.flipEnvMap.value=Zi.isCubeTexture&&Zi.isRenderTargetTexture===!1?-1:1),We.isMeshStandardMaterial&&We.envMap===null&&pt.environment!==null&&(Sn.envMapIntensity.value=pt.environmentIntensity),Ri&&(gt.setValue(y,"toneMappingExposure",x.toneMappingExposure),Ze.needsLights&&(Zt=Wr,(rn=Sn).ambientLightColor.needsUpdate=Zt,rn.lightProbe.needsUpdate=Zt,rn.directionalLights.needsUpdate=Zt,rn.directionalLightShadows.needsUpdate=Zt,rn.pointLights.needsUpdate=Zt,rn.pointLightShadows.needsUpdate=Zt,rn.spotLights.needsUpdate=Zt,rn.spotLightShadows.needsUpdate=Zt,rn.rectAreaLights.needsUpdate=Zt,rn.hemisphereLights.needsUpdate=Zt),Yt&&We.fog===!0&&xe.refreshFogUniforms(Sn,Yt),xe.refreshMaterialUniforms(Sn,We,re,z,g.state.transmissionRenderTarget[$e.id]),Rr.upload(y,ft(Ze),Sn,ee));var rn,Zt;if(We.isShaderMaterial&&We.uniformsNeedUpdate===!0&&(Rr.upload(y,ft(Ze),Sn,ee),We.uniformsNeedUpdate=!1),We.isSpriteMaterial&&gt.setValue(y,"center",Fe.center),gt.setValue(y,"modelViewMatrix",Fe.modelViewMatrix),gt.setValue(y,"normalMatrix",Fe.normalMatrix),gt.setValue(y,"modelMatrix",Fe.matrixWorld),We.isShaderMaterial||We.isRawShaderMaterial){const Gt=We.uniformsGroups;for(let On=0,ht=Gt.length;On<ht;On++){const Ps=Gt[On];C.update(Ps,Nn),C.bind(Ps,Nn)}}return Nn}(E,N,X,$,W);G.setMaterial($,ve);let we=X.index,Ne=1;if($.wireframe===!0){if(we=Le.getWireframeAttribute(X),we===void 0)return;Ne=2}const Ie=X.drawRange,De=X.attributes.position;let Je=Ie.start*Ne,mt=(Ie.start+Ie.count)*Ne;ce!==null&&(Je=Math.max(Je,ce.start*Ne),mt=Math.min(mt,(ce.start+ce.count)*Ne)),we!==null?(Je=Math.max(Je,0),mt=Math.min(mt,we.count)):De!=null&&(Je=Math.max(Je,0),mt=Math.min(mt,De.count));const dt=mt-Je;if(dt<0||dt===1/0)return;let yt;L.setup(W,$,ye,X,we);let lt=Jn;if(we!==null&&(yt=Te.get(we),lt=Mn,lt.setIndex(yt)),W.isMesh)$.wireframe===!0?(G.setLineWidth($.wireframeLinewidth*H()),lt.setMode(y.LINES)):lt.setMode(y.TRIANGLES);else if(W.isLine){let $e=$.linewidth;$e===void 0&&($e=1),G.setLineWidth($e*H()),W.isLineSegments?lt.setMode(y.LINES):W.isLineLoop?lt.setMode(y.LINE_LOOP):lt.setMode(y.LINE_STRIP)}else W.isPoints?lt.setMode(y.POINTS):W.isSprite&&lt.setMode(y.TRIANGLES);if(W.isBatchedMesh)if(W._multiDrawInstances!==null)lt.renderMultiDrawInstances(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount,W._multiDrawInstances);else if(V.get("WEBGL_multi_draw"))lt.renderMultiDraw(W._multiDrawStarts,W._multiDrawCounts,W._multiDrawCount);else{const $e=W._multiDrawStarts,pt=W._multiDrawCounts,Tt=W._multiDrawCount,We=we?Te.get(we).bytesPerElement:1,Fe=oe.get($).currentProgram.getUniforms();for(let Yt=0;Yt<Tt;Yt++)Fe.setValue(y,"_gl_DrawID",Yt),lt.render($e[Yt]/We,pt[Yt])}else if(W.isInstancedMesh)lt.renderInstances(Je,dt,W.count);else if(X.isInstancedBufferGeometry){const $e=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,pt=Math.min(X.instanceCount,$e);lt.renderInstances(Je,dt,pt)}else lt.render(Je,dt)},this.compile=function(E,N,X=null){X===null&&(X=E),g=et.get(X),g.init(N),v.push(g),X.traverseVisible(function(W){W.isLight&&W.layers.test(N.layers)&&(g.pushLight(W),W.castShadow&&g.pushShadow(W))}),E!==X&&E.traverseVisible(function(W){W.isLight&&W.layers.test(N.layers)&&(g.pushLight(W),W.castShadow&&g.pushShadow(W))}),g.setupLights();const $=new Set;return E.traverse(function(W){if(!(W.isMesh||W.isPoints||W.isLine||W.isSprite))return;const ce=W.material;if(ce)if(Array.isArray(ce))for(let ve=0;ve<ce.length;ve++){const ye=ce[ve];ot(ye,X,W),$.add(ye)}else ot(ce,X,W),$.add(ce)}),v.pop(),g=null,$},this.compileAsync=function(E,N,X=null){const $=this.compile(E,N,X);return new Promise(W=>{function ce(){$.forEach(function(ve){oe.get(ve).currentProgram.isReady()&&$.delete(ve)}),$.size!==0?setTimeout(ce,10):W(E)}V.get("KHR_parallel_shader_compile")!==null?ce():setTimeout(ce,10)})};let At=null;function Ee(){Ue.stop()}function Me(){Ue.start()}const Ue=new rl;function qe(E,N,X,$){if(E.visible===!1)return;if(E.layers.test(N.layers)){if(E.isGroup)X=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(N);else if(E.isLight)g.pushLight(E),E.castShadow&&g.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||Se.intersectsSprite(E)){$&&I.setFromMatrixPosition(E.matrixWorld).applyMatrix4(D);const ce=je.update(E),ve=E.material;ve.visible&&_.push(E,ce,ve,X,I.z,null)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||Se.intersectsObject(E))){const ce=je.update(E),ve=E.material;if($&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),I.copy(E.boundingSphere.center)):(ce.boundingSphere===null&&ce.computeBoundingSphere(),I.copy(ce.boundingSphere.center)),I.applyMatrix4(E.matrixWorld).applyMatrix4(D)),Array.isArray(ve)){const ye=ce.groups;for(let we=0,Ne=ye.length;we<Ne;we++){const Ie=ye[we],De=ve[Ie.materialIndex];De&&De.visible&&_.push(E,ce,De,X,I.z,Ie)}}else ve.visible&&_.push(E,ce,ve,X,I.z,null)}}const W=E.children;for(let ce=0,ve=W.length;ce<ve;ce++)qe(W[ce],N,X,$)}function ke(E,N,X,$){const W=E.opaque,ce=E.transmissive,ve=E.transparent;g.setupLightsView(X),be===!0&&Qe.setGlobalState(x.clippingPlanes,X),$&&G.viewport(k.copy($)),W.length>0&&Ce(W,N,X),ce.length>0&&Ce(ce,N,X),ve.length>0&&Ce(ve,N,X),G.buffers.depth.setTest(!0),G.buffers.depth.setMask(!0),G.buffers.color.setMask(!0),G.setPolygonOffset(!1)}function he(E,N,X,$){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[$.id]===void 0&&(g.state.transmissionRenderTarget[$.id]=new qn(1,1,{generateMipmaps:!0,type:V.has("EXT_color_buffer_half_float")||V.has("EXT_color_buffer_float")?qi:_n,minFilter:fi,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:it.workingColorSpace}));const W=g.state.transmissionRenderTarget[$.id],ce=$.viewport||k;W.setSize(ce.z,ce.w);const ve=x.getRenderTarget();x.setRenderTarget(W),x.getClearColor(Z),j=x.getClearAlpha(),j<1&&x.setClearColor(16777215,.5),x.clear(),b&&Oe.render(X);const ye=x.toneMapping;x.toneMapping=Ln;const we=$.viewport;if($.viewport!==void 0&&($.viewport=void 0),g.setupLightsView($),be===!0&&Qe.setGlobalState(x.clippingPlanes,$),Ce(E,X,$),ee.updateMultisampleRenderTarget(W),ee.updateRenderTargetMipmap(W),V.has("WEBGL_multisampled_render_to_texture")===!1){let Ne=!1;for(let Ie=0,De=N.length;Ie<De;Ie++){const Je=N[Ie],mt=Je.object,dt=Je.geometry,yt=Je.material,lt=Je.group;if(yt.side===2&&mt.layers.test($.layers)){const $e=yt.side;yt.side=Nt,yt.needsUpdate=!0,ut(mt,X,$,dt,yt,lt),yt.side=$e,yt.needsUpdate=!0,Ne=!0}}Ne===!0&&(ee.updateMultisampleRenderTarget(W),ee.updateRenderTargetMipmap(W))}x.setRenderTarget(ve),x.setClearColor(Z,j),we!==void 0&&($.viewport=we),x.toneMapping=ye}function Ce(E,N,X){const $=N.isScene===!0?N.overrideMaterial:null;for(let W=0,ce=E.length;W<ce;W++){const ve=E[W],ye=ve.object,we=ve.geometry,Ne=$===null?ve.material:$,Ie=ve.group;ye.layers.test(X.layers)&&ut(ye,N,X,we,Ne,Ie)}}function ut(E,N,X,$,W,ce){E.onBeforeRender(x,N,X,$,W,ce),E.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),W.onBeforeRender(x,N,X,$,E,ce),W.transparent===!0&&W.side===2&&W.forceSinglePass===!1?(W.side=Nt,W.needsUpdate=!0,x.renderBufferDirect(X,N,$,W,E,ce),W.side=Dn,W.needsUpdate=!0,x.renderBufferDirect(X,N,$,W,E,ce),W.side=2):x.renderBufferDirect(X,N,$,W,E,ce),E.onAfterRender(x,N,X,$,W,ce)}function nt(E,N,X){N.isScene!==!0&&(N=B);const $=oe.get(E),W=g.state.lights,ce=g.state.shadowsArray,ve=W.state.version,ye=Ye.getParameters(E,W.state,ce,N,X),we=Ye.getProgramCacheKey(ye);let Ne=$.programs;$.environment=E.isMeshStandardMaterial?N.environment:null,$.fog=N.fog,$.envMap=(E.isMeshStandardMaterial?pe:_e).get(E.envMap||$.environment),$.envMapRotation=$.environment!==null&&E.envMap===null?N.environmentRotation:E.envMapRotation,Ne===void 0&&(E.addEventListener("dispose",at),Ne=new Map,$.programs=Ne);let Ie=Ne.get(we);if(Ie!==void 0){if($.currentProgram===Ie&&$.lightsStateVersion===ve)return nn(E,ye),Ie}else ye.uniforms=Ye.getUniforms(E),E.onBeforeCompile(ye,x),Ie=Ye.acquireProgram(ye,we),Ne.set(we,Ie),$.uniforms=ye.uniforms;const De=$.uniforms;return(E.isShaderMaterial||E.isRawShaderMaterial)&&E.clipping!==!0||(De.clippingPlanes=Qe.uniform),nn(E,ye),$.needsLights=function(Je){return Je.isMeshLambertMaterial||Je.isMeshToonMaterial||Je.isMeshPhongMaterial||Je.isMeshStandardMaterial||Je.isShadowMaterial||Je.isShaderMaterial&&Je.lights===!0}(E),$.lightsStateVersion=ve,$.needsLights&&(De.ambientLightColor.value=W.state.ambient,De.lightProbe.value=W.state.probe,De.directionalLights.value=W.state.directional,De.directionalLightShadows.value=W.state.directionalShadow,De.spotLights.value=W.state.spot,De.spotLightShadows.value=W.state.spotShadow,De.rectAreaLights.value=W.state.rectArea,De.ltc_1.value=W.state.rectAreaLTC1,De.ltc_2.value=W.state.rectAreaLTC2,De.pointLights.value=W.state.point,De.pointLightShadows.value=W.state.pointShadow,De.hemisphereLights.value=W.state.hemi,De.directionalShadowMap.value=W.state.directionalShadowMap,De.directionalShadowMatrix.value=W.state.directionalShadowMatrix,De.spotShadowMap.value=W.state.spotShadowMap,De.spotLightMatrix.value=W.state.spotLightMatrix,De.spotLightMap.value=W.state.spotLightMap,De.pointShadowMap.value=W.state.pointShadowMap,De.pointShadowMatrix.value=W.state.pointShadowMatrix),$.currentProgram=Ie,$.uniformsList=null,Ie}function ft(E){if(E.uniformsList===null){const N=E.currentProgram.getUniforms();E.uniformsList=Rr.seqWithValue(N.seq,E.uniforms)}return E.uniformsList}function nn(E,N){const X=oe.get(E);X.outputColorSpace=N.outputColorSpace,X.batching=N.batching,X.batchingColor=N.batchingColor,X.instancing=N.instancing,X.instancingColor=N.instancingColor,X.instancingMorph=N.instancingMorph,X.skinning=N.skinning,X.morphTargets=N.morphTargets,X.morphNormals=N.morphNormals,X.morphColors=N.morphColors,X.morphTargetsCount=N.morphTargetsCount,X.numClippingPlanes=N.numClippingPlanes,X.numIntersection=N.numClipIntersection,X.vertexAlphas=N.vertexAlphas,X.vertexTangents=N.vertexTangents,X.toneMapping=N.toneMapping}Ue.setAnimationLoop(function(E){At&&At(E)}),typeof self<"u"&&Ue.setContext(self),this.setAnimationLoop=function(E){At=E,ge.setAnimationLoop(E),E===null?Ue.stop():Ue.start()},ge.addEventListener("sessionstart",Ee),ge.addEventListener("sessionend",Me),this.render=function(E,N){if(N!==void 0&&N.isCamera!==!0)return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(M===!0)return;if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),ge.enabled===!0&&ge.isPresenting===!0&&(ge.cameraAutoUpdate===!0&&ge.updateCamera(N),N=ge.getCamera()),E.isScene===!0&&E.onBeforeRender(x,E,N,P),g=et.get(E,v.length),g.init(N),v.push(g),D.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Se.setFromProjectionMatrix(D),T=this.localClippingEnabled,be=Qe.init(this.clippingPlanes,T),_=Ke.get(E,f.length),_.init(),f.push(_),ge.enabled===!0&&ge.isPresenting===!0){const ce=x.xr.getDepthSensingMesh();ce!==null&&qe(ce,N,-1/0,x.sortObjects)}qe(E,N,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(ue,fe),b=ge.enabled===!1||ge.isPresenting===!1||ge.hasDepthSensing()===!1,b&&Oe.addToRenderList(_,E),this.info.render.frame++,be===!0&&Qe.beginShadows();const X=g.state.shadowsArray;me.render(X,E,N),be===!0&&Qe.endShadows(),this.info.autoReset===!0&&this.info.reset();const $=_.opaque,W=_.transmissive;if(g.setupLights(),N.isArrayCamera){const ce=N.cameras;if(W.length>0)for(let ve=0,ye=ce.length;ve<ye;ve++)he($,W,E,ce[ve]);b&&Oe.render(E);for(let ve=0,ye=ce.length;ve<ye;ve++){const we=ce[ve];ke(_,E,we,we.viewport)}}else W.length>0&&he($,W,E,N),b&&Oe.render(E),ke(_,E,N);P!==null&&(ee.updateMultisampleRenderTarget(P),ee.updateRenderTargetMipmap(P)),E.isScene===!0&&E.onAfterRender(x,E,N),L.resetDefaultState(),q=-1,U=null,v.pop(),v.length>0?(g=v[v.length-1],be===!0&&Qe.setGlobalState(x.clippingPlanes,g.state.camera)):g=null,f.pop(),_=f.length>0?f[f.length-1]:null},this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return P},this.setRenderTargetTextures=function(E,N,X){oe.get(E.texture).__webglTexture=N,oe.get(E.depthTexture).__webglTexture=X;const $=oe.get(E);$.__hasExternalTextures=!0,$.__autoAllocateDepthBuffer=X===void 0,$.__autoAllocateDepthBuffer||V.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),$.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(E,N){const X=oe.get(E);X.__webglFramebuffer=N,X.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(E,N=0,X=0){P=E,w=N,R=X;let $=!0,W=null,ce=!1,ve=!1;if(E){const ye=oe.get(E);if(ye.__useDefaultFramebuffer!==void 0)G.bindFramebuffer(y.FRAMEBUFFER,null),$=!1;else if(ye.__webglFramebuffer===void 0)ee.setupRenderTarget(E);else if(ye.__hasExternalTextures)ee.rebindTextures(E,oe.get(E.texture).__webglTexture,oe.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const Ie=E.depthTexture;if(ye.__boundDepthTexture!==Ie){if(Ie!==null&&oe.has(Ie)&&(E.width!==Ie.image.width||E.height!==Ie.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ee.setupDepthRenderbuffer(E)}}const we=E.texture;(we.isData3DTexture||we.isDataArrayTexture||we.isCompressedArrayTexture)&&(ve=!0);const Ne=oe.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(W=Array.isArray(Ne[N])?Ne[N][X]:Ne[N],ce=!0):W=E.samples>0&&ee.useMultisampledRTT(E)===!1?oe.get(E).__webglMultisampledFramebuffer:Array.isArray(Ne)?Ne[X]:Ne,k.copy(E.viewport),K.copy(E.scissor),F=E.scissorTest}else k.copy(Ae).multiplyScalar(re).floor(),K.copy(Q).multiplyScalar(re).floor(),F=se;if(G.bindFramebuffer(y.FRAMEBUFFER,W)&&$&&G.drawBuffers(E,W),G.viewport(k),G.scissor(K),G.setScissorTest(F),ce){const ye=oe.get(E.texture);y.framebufferTexture2D(y.FRAMEBUFFER,y.COLOR_ATTACHMENT0,y.TEXTURE_CUBE_MAP_POSITIVE_X+N,ye.__webglTexture,X)}else if(ve){const ye=oe.get(E.texture),we=N||0;y.framebufferTextureLayer(y.FRAMEBUFFER,y.COLOR_ATTACHMENT0,ye.__webglTexture,X||0,we)}q=-1},this.readRenderTargetPixels=function(E,N,X,$,W,ce,ve){if(!E||!E.isWebGLRenderTarget)return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ye=oe.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ve!==void 0&&(ye=ye[ve]),ye){G.bindFramebuffer(y.FRAMEBUFFER,ye);try{const we=E.texture,Ne=we.format,Ie=we.type;if(!le.textureFormatReadable(Ne))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(!le.textureTypeReadable(Ie))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");N>=0&&N<=E.width-$&&X>=0&&X<=E.height-W&&y.readPixels(N,X,$,W,wt.convert(Ne),wt.convert(Ie),ce)}finally{const we=P!==null?oe.get(P).__webglFramebuffer:null;G.bindFramebuffer(y.FRAMEBUFFER,we)}}},this.readRenderTargetPixelsAsync=async function(E,N,X,$,W,ce,ve){if(!E||!E.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let ye=oe.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&ve!==void 0&&(ye=ye[ve]),ye){const we=E.texture,Ne=we.format,Ie=we.type;if(!le.textureFormatReadable(Ne))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!le.textureTypeReadable(Ie))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=E.width-$&&X>=0&&X<=E.height-W){G.bindFramebuffer(y.FRAMEBUFFER,ye);const De=y.createBuffer();y.bindBuffer(y.PIXEL_PACK_BUFFER,De),y.bufferData(y.PIXEL_PACK_BUFFER,ce.byteLength,y.STREAM_READ),y.readPixels(N,X,$,W,wt.convert(Ne),wt.convert(Ie),0);const Je=P!==null?oe.get(P).__webglFramebuffer:null;G.bindFramebuffer(y.FRAMEBUFFER,Je);const mt=y.fenceSync(y.SYNC_GPU_COMMANDS_COMPLETE,0);return y.flush(),await function(dt,yt,lt){return new Promise(function($e,pt){setTimeout(function Tt(){switch(dt.clientWaitSync(yt,dt.SYNC_FLUSH_COMMANDS_BIT,0)){case dt.WAIT_FAILED:pt();break;case dt.TIMEOUT_EXPIRED:setTimeout(Tt,lt);break;default:$e()}},lt)})}(y,mt,4),y.bindBuffer(y.PIXEL_PACK_BUFFER,De),y.getBufferSubData(y.PIXEL_PACK_BUFFER,0,ce),y.deleteBuffer(De),y.deleteSync(mt),ce}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(E,N=null,X=0){E.isTexture!==!0&&(Ar("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,E=arguments[1]);const $=Math.pow(2,-X),W=Math.floor(E.image.width*$),ce=Math.floor(E.image.height*$),ve=N!==null?N.x:0,ye=N!==null?N.y:0;ee.setTexture2D(E,0),y.copyTexSubImage2D(y.TEXTURE_2D,X,0,0,ve,ye,W,ce),G.unbindTexture()},this.copyTextureToTexture=function(E,N,X=null,$=null,W=0){let ce,ve,ye,we,Ne,Ie;E.isTexture!==!0&&(Ar("WebGLRenderer: copyTextureToTexture function signature has changed."),$=arguments[0]||null,E=arguments[1],N=arguments[2],W=arguments[3]||0,X=null),X!==null?(ce=X.max.x-X.min.x,ve=X.max.y-X.min.y,ye=X.min.x,we=X.min.y):(ce=E.image.width,ve=E.image.height,ye=0,we=0),$!==null?(Ne=$.x,Ie=$.y):(Ne=0,Ie=0);const De=wt.convert(N.format),Je=wt.convert(N.type);ee.setTexture2D(N,0),y.pixelStorei(y.UNPACK_FLIP_Y_WEBGL,N.flipY),y.pixelStorei(y.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),y.pixelStorei(y.UNPACK_ALIGNMENT,N.unpackAlignment);const mt=y.getParameter(y.UNPACK_ROW_LENGTH),dt=y.getParameter(y.UNPACK_IMAGE_HEIGHT),yt=y.getParameter(y.UNPACK_SKIP_PIXELS),lt=y.getParameter(y.UNPACK_SKIP_ROWS),$e=y.getParameter(y.UNPACK_SKIP_IMAGES),pt=E.isCompressedTexture?E.mipmaps[W]:E.image;y.pixelStorei(y.UNPACK_ROW_LENGTH,pt.width),y.pixelStorei(y.UNPACK_IMAGE_HEIGHT,pt.height),y.pixelStorei(y.UNPACK_SKIP_PIXELS,ye),y.pixelStorei(y.UNPACK_SKIP_ROWS,we),E.isDataTexture?y.texSubImage2D(y.TEXTURE_2D,W,Ne,Ie,ce,ve,De,Je,pt.data):E.isCompressedTexture?y.compressedTexSubImage2D(y.TEXTURE_2D,W,Ne,Ie,pt.width,pt.height,De,pt.data):y.texSubImage2D(y.TEXTURE_2D,W,Ne,Ie,ce,ve,De,Je,pt),y.pixelStorei(y.UNPACK_ROW_LENGTH,mt),y.pixelStorei(y.UNPACK_IMAGE_HEIGHT,dt),y.pixelStorei(y.UNPACK_SKIP_PIXELS,yt),y.pixelStorei(y.UNPACK_SKIP_ROWS,lt),y.pixelStorei(y.UNPACK_SKIP_IMAGES,$e),W===0&&N.generateMipmaps&&y.generateMipmap(y.TEXTURE_2D),G.unbindTexture()},this.copyTextureToTexture3D=function(E,N,X=null,$=null,W=0){let ce,ve,ye,we,Ne,Ie,De,Je,mt;E.isTexture!==!0&&(Ar("WebGLRenderer: copyTextureToTexture3D function signature has changed."),X=arguments[0]||null,$=arguments[1]||null,E=arguments[2],N=arguments[3],W=arguments[4]||0);const dt=E.isCompressedTexture?E.mipmaps[W]:E.image;X!==null?(ce=X.max.x-X.min.x,ve=X.max.y-X.min.y,ye=X.max.z-X.min.z,we=X.min.x,Ne=X.min.y,Ie=X.min.z):(ce=dt.width,ve=dt.height,ye=dt.depth,we=0,Ne=0,Ie=0),$!==null?(De=$.x,Je=$.y,mt=$.z):(De=0,Je=0,mt=0);const yt=wt.convert(N.format),lt=wt.convert(N.type);let $e;if(N.isData3DTexture)ee.setTexture3D(N,0),$e=y.TEXTURE_3D;else{if(!N.isDataArrayTexture&&!N.isCompressedArrayTexture)return void console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");ee.setTexture2DArray(N,0),$e=y.TEXTURE_2D_ARRAY}y.pixelStorei(y.UNPACK_FLIP_Y_WEBGL,N.flipY),y.pixelStorei(y.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),y.pixelStorei(y.UNPACK_ALIGNMENT,N.unpackAlignment);const pt=y.getParameter(y.UNPACK_ROW_LENGTH),Tt=y.getParameter(y.UNPACK_IMAGE_HEIGHT),We=y.getParameter(y.UNPACK_SKIP_PIXELS),Fe=y.getParameter(y.UNPACK_SKIP_ROWS),Yt=y.getParameter(y.UNPACK_SKIP_IMAGES);y.pixelStorei(y.UNPACK_ROW_LENGTH,dt.width),y.pixelStorei(y.UNPACK_IMAGE_HEIGHT,dt.height),y.pixelStorei(y.UNPACK_SKIP_PIXELS,we),y.pixelStorei(y.UNPACK_SKIP_ROWS,Ne),y.pixelStorei(y.UNPACK_SKIP_IMAGES,Ie),E.isDataTexture||E.isData3DTexture?y.texSubImage3D($e,W,De,Je,mt,ce,ve,ye,yt,lt,dt.data):N.isCompressedArrayTexture?y.compressedTexSubImage3D($e,W,De,Je,mt,ce,ve,ye,yt,dt.data):y.texSubImage3D($e,W,De,Je,mt,ce,ve,ye,yt,lt,dt),y.pixelStorei(y.UNPACK_ROW_LENGTH,pt),y.pixelStorei(y.UNPACK_IMAGE_HEIGHT,Tt),y.pixelStorei(y.UNPACK_SKIP_PIXELS,We),y.pixelStorei(y.UNPACK_SKIP_ROWS,Fe),y.pixelStorei(y.UNPACK_SKIP_IMAGES,Yt),W===0&&N.generateMipmaps&&y.generateMipmap($e),G.unbindTexture()},this.initRenderTarget=function(E){oe.get(E).__webglFramebuffer===void 0&&ee.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?ee.setTextureCube(E,0):E.isData3DTexture?ee.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?ee.setTexture2DArray(E,0):ee.setTexture2D(E,0),G.unbindTexture()},this.resetState=function(){w=0,R=0,P=null,G.reset(),L.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return yi}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=e===xs?"display-p3":"srgb",t.unpackColorSpace=it.workingColorSpace===Hr?"display-p3":"srgb"}}class Vu extends bt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Ot,this.environmentIntensity=1,this.environmentRotation=new Ot,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}new A;new A;new A;new A;new ze;new ze;new Pe;new A;new A;new A;new ze;new ze;new ze;new A;new A;new A;new rt;new rt;new A;new Pe;new A;new xn;new Pe;new Ki;class ku extends Pt{constructor(e=null,t=1,n=1,r,a,o,u,s,c=1003,l=1003,h,d){super(null,o,u,s,c,l,r,a,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}new Pe;new Pe;class yo extends Ht{constructor(e,t,n,r=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=r}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const hi=new Pe,Eo=new Pe,xr=[],bo=new vn,Wu=new Pe,Fi=new _t,Bi=new xn;class Cr extends _t{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new yo(new Float32Array(16*n),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let r=0;r<n;r++)this.setMatrixAt(r,Wu)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new vn),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,hi),bo.copy(e.boundingBox).applyMatrix4(hi),this.boundingBox.union(bo)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new xn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,hi),Bi.copy(e.boundingSphere).applyMatrix4(hi),this.boundingSphere.union(Bi)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,3*e)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,16*e)}getMorphAt(e,t){const n=t.morphTargetInfluences,r=this.morphTexture.source.data.data,a=e*(n.length+1)+1;for(let o=0;o<n.length;o++)n[o]=r[a+o]}raycast(e,t){const n=this.matrixWorld,r=this.count;if(Fi.geometry=this.geometry,Fi.material=this.material,Fi.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Bi.copy(this.boundingSphere),Bi.applyMatrix4(n),e.ray.intersectsSphere(Bi)!==!1))for(let a=0;a<r;a++){this.getMatrixAt(a,hi),Eo.multiplyMatrices(n,hi),Fi.matrixWorld=Eo,Fi.raycast(e,xr);for(let o=0,u=xr.length;o<u;o++){const s=xr[o];s.instanceId=a,s.object=this,t.push(s)}xr.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new yo(new Float32Array(3*this.instanceMatrix.count).fill(1),3)),t.toArray(this.instanceColor.array,3*e)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,16*e)}setMorphAt(e,t){const n=t.morphTargetInfluences,r=n.length+1;this.morphTexture===null&&(this.morphTexture=new ku(new Float32Array(r*this.count),r,this.count,ms,on));const a=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const u=this.geometry.morphTargetsRelative?1:1-o,s=r*e;a[s]=u,a.set(n,s+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}new Pe;new Pe;new Pe;new Be(1,1,1);new Pe;new Gr;new vn;new xn;new A;new A;new A;new _t;class ul extends Ti{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Be(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const Or=new A,Fr=new A,To=new Pe,zi=new Ki,Mr=new xn,ba=new A,wo=new A;class Xu extends bt{constructor(e=new Ft,t=new ul){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let r=1,a=t.count;r<a;r++)Or.fromBufferAttribute(t,r-1),Fr.fromBufferAttribute(t,r),n[r]=n[r-1],n[r]+=Or.distanceTo(Fr);e.setAttribute("lineDistance",new xt(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,r=this.matrixWorld,a=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Mr.copy(n.boundingSphere),Mr.applyMatrix4(r),Mr.radius+=a,e.ray.intersectsSphere(Mr)===!1)return;To.copy(r).invert(),zi.copy(e.ray).applyMatrix4(To);const u=a/((this.scale.x+this.scale.y+this.scale.z)/3),s=u*u,c=this.isLineSegments?2:1,l=n.index,h=n.attributes.position;if(l!==null){const d=Math.max(0,o.start),p=Math.min(l.count,o.start+o.count);for(let m=d,_=p-1;m<_;m+=c){const g=l.getX(m),f=l.getX(m+1),v=Sr(this,e,zi,s,g,f);v&&t.push(v)}if(this.isLineLoop){const m=l.getX(p-1),_=l.getX(d),g=Sr(this,e,zi,s,m,_);g&&t.push(g)}}else{const d=Math.max(0,o.start),p=Math.min(h.count,o.start+o.count);for(let m=d,_=p-1;m<_;m+=c){const g=Sr(this,e,zi,s,m,m+1);g&&t.push(g)}if(this.isLineLoop){const m=Sr(this,e,zi,s,p-1,d);m&&t.push(m)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){const n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=n.length;r<a;r++){const o=n[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function Sr(i,e,t,n,r,a){const o=i.geometry.attributes.position;if(Or.fromBufferAttribute(o,r),Fr.fromBufferAttribute(o,a),t.distanceSqToSegment(Or,Fr,ba,wo)>n)return;ba.applyMatrix4(i.matrixWorld);const u=e.ray.origin.distanceTo(ba);return u<e.near||u>e.far?void 0:{distance:u,point:wo.clone().applyMatrix4(i.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:i}}new A;new A;new Pe;new Ki;new xn;new A;class hl extends Pt{constructor(e,t,n,r,a,o,u,s,c){super(e,t,n,r,a,o,u,s,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}new A;class Yn extends Ft{constructor(e=1,t=1,n=1,r=32,a=1,o=!1,u=0,s=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:r,heightSegments:a,openEnded:o,thetaStart:u,thetaLength:s};const c=this;r=Math.floor(r),a=Math.floor(a);const l=[],h=[],d=[],p=[];let m=0;const _=[],g=n/2;let f=0;function v(x){const M=m,w=new ze,R=new A;let P=0;const q=x===!0?e:t,U=x===!0?1:-1;for(let K=1;K<=r;K++)h.push(0,g*U,0),d.push(0,U,0),p.push(.5,.5),m++;const k=m;for(let K=0;K<=r;K++){const F=K/r*s+u,Z=Math.cos(F),j=Math.sin(F);R.x=q*j,R.y=g*U,R.z=q*Z,h.push(R.x,R.y,R.z),d.push(0,U,0),w.x=.5*Z+.5,w.y=.5*j*U+.5,p.push(w.x,w.y),m++}for(let K=0;K<r;K++){const F=M+K,Z=k+K;x===!0?l.push(Z,Z+1,F):l.push(Z+1,Z,F),P+=3}c.addGroup(f,P,x===!0?1:2),f+=P}(function(){const x=new A,M=new A;let w=0;const R=(t-e)/n;for(let P=0;P<=a;P++){const q=[],U=P/a,k=U*(t-e)+e;for(let K=0;K<=r;K++){const F=K/r,Z=F*s+u,j=Math.sin(Z),J=Math.cos(Z);M.x=k*j,M.y=-U*n+g,M.z=k*J,h.push(M.x,M.y,M.z),x.set(j,R,J).normalize(),d.push(x.x,x.y,x.z),p.push(F,1-U),q.push(m++)}_.push(q)}for(let P=0;P<r;P++)for(let q=0;q<a;q++){const U=_[q][P],k=_[q+1][P],K=_[q+1][P+1],F=_[q][P+1];e>0&&(l.push(U,k,F),w+=3),t>0&&(l.push(k,K,F),w+=3)}c.addGroup(f,w,0),f+=w})(),o===!1&&(e>0&&v(!0),t>0&&v(!1)),this.setIndex(l),this.setAttribute("position",new xt(h,3)),this.setAttribute("normal",new xt(d,3)),this.setAttribute("uv",new xt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yn(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Br extends Yn{constructor(e=1,t=1,n=32,r=1,a=!1,o=0,u=2*Math.PI){super(0,e,t,n,r,a,o,u),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:u}}static fromJSON(e){return new Br(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class bs extends Ft{constructor(e=[],t=[],n=1,r=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:r};const a=[],o=[];function u(d,p,m,_){const g=_+1,f=[];for(let v=0;v<=g;v++){f[v]=[];const x=d.clone().lerp(m,v/g),M=p.clone().lerp(m,v/g),w=g-v;for(let R=0;R<=w;R++)f[v][R]=R===0&&v===g?x:x.clone().lerp(M,R/w)}for(let v=0;v<g;v++)for(let x=0;x<2*(g-v)-1;x++){const M=Math.floor(x/2);x%2==0?(s(f[v][M+1]),s(f[v+1][M]),s(f[v][M])):(s(f[v][M+1]),s(f[v+1][M+1]),s(f[v+1][M]))}}function s(d){a.push(d.x,d.y,d.z)}function c(d,p){const m=3*d;p.x=e[m+0],p.y=e[m+1],p.z=e[m+2]}function l(d,p,m,_){_<0&&d.x===1&&(o[p]=d.x-1),m.x===0&&m.z===0&&(o[p]=_/2/Math.PI+.5)}function h(d){return Math.atan2(d.z,-d.x)}(function(d){const p=new A,m=new A,_=new A;for(let g=0;g<t.length;g+=3)c(t[g+0],p),c(t[g+1],m),c(t[g+2],_),u(p,m,_,d)})(r),function(d){const p=new A;for(let m=0;m<a.length;m+=3)p.x=a[m+0],p.y=a[m+1],p.z=a[m+2],p.normalize().multiplyScalar(d),a[m+0]=p.x,a[m+1]=p.y,a[m+2]=p.z}(n),function(){const d=new A;for(let m=0;m<a.length;m+=3){d.x=a[m+0],d.y=a[m+1],d.z=a[m+2];const _=h(d)/2/Math.PI+.5,g=(p=d,Math.atan2(-p.y,Math.sqrt(p.x*p.x+p.z*p.z))/Math.PI+.5);o.push(_,1-g)}var p;(function(){const m=new A,_=new A,g=new A,f=new A,v=new ze,x=new ze,M=new ze;for(let w=0,R=0;w<a.length;w+=9,R+=6){m.set(a[w+0],a[w+1],a[w+2]),_.set(a[w+3],a[w+4],a[w+5]),g.set(a[w+6],a[w+7],a[w+8]),v.set(o[R+0],o[R+1]),x.set(o[R+2],o[R+3]),M.set(o[R+4],o[R+5]),f.copy(m).add(_).add(g).divideScalar(3);const P=h(f);l(v,R+0,m,P),l(x,R+2,_,P),l(M,R+4,g,P)}})(),function(){for(let m=0;m<o.length;m+=6){const _=o[m+0],g=o[m+2],f=o[m+4],v=Math.max(_,g,f),x=Math.min(_,g,f);v>.9&&x<.1&&(_<.2&&(o[m+0]+=1),g<.2&&(o[m+2]+=1),f<.2&&(o[m+4]+=1))}}()}(),this.setAttribute("position",new xt(a,3)),this.setAttribute("normal",new xt(a.slice(),3)),this.setAttribute("uv",new xt(o,2)),r===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bs(e.vertices,e.indices,e.radius,e.details)}}new A;new A;new A;new Xt;class Ts extends bs{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2;super([-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Ts(e.radius,e.detail)}}class kr extends Ft{constructor(e=1,t=32,n=16,r=0,a=2*Math.PI,o=0,u=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:r,phiLength:a,thetaStart:o,thetaLength:u},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const s=Math.min(o+u,Math.PI);let c=0;const l=[],h=new A,d=new A,p=[],m=[],_=[],g=[];for(let f=0;f<=n;f++){const v=[],x=f/n;let M=0;f===0&&o===0?M=.5/t:f===n&&s===Math.PI&&(M=-.5/t);for(let w=0;w<=t;w++){const R=w/t;h.x=-e*Math.cos(r+R*a)*Math.sin(o+x*u),h.y=e*Math.cos(o+x*u),h.z=e*Math.sin(r+R*a)*Math.sin(o+x*u),m.push(h.x,h.y,h.z),d.copy(h).normalize(),_.push(d.x,d.y,d.z),g.push(R+M,1-x),v.push(c++)}l.push(v)}for(let f=0;f<n;f++)for(let v=0;v<t;v++){const x=l[f][v+1],M=l[f][v],w=l[f+1][v],R=l[f+1][v+1];(f!==0||o>0)&&p.push(x,M,R),(f!==n-1||s<Math.PI)&&p.push(M,w,R)}this.setIndex(p),this.setAttribute("position",new xt(m,3)),this.setAttribute("normal",new xt(_,3)),this.setAttribute("uv",new xt(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new kr(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class ji extends Ft{constructor(e=1,t=.4,n=12,r=48,a=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:r,arc:a},n=Math.floor(n),r=Math.floor(r);const o=[],u=[],s=[],c=[],l=new A,h=new A,d=new A;for(let p=0;p<=n;p++)for(let m=0;m<=r;m++){const _=m/r*a,g=p/n*Math.PI*2;h.x=(e+t*Math.cos(g))*Math.cos(_),h.y=(e+t*Math.cos(g))*Math.sin(_),h.z=t*Math.sin(g),u.push(h.x,h.y,h.z),l.x=e*Math.cos(_),l.y=e*Math.sin(_),d.subVectors(h,l).normalize(),s.push(d.x,d.y,d.z),c.push(m/r),c.push(p/n)}for(let p=1;p<=n;p++)for(let m=1;m<=r;m++){const _=(r+1)*p+m-1,g=(r+1)*(p-1)+m-1,f=(r+1)*(p-1)+m,v=(r+1)*p+m;o.push(_,g,v),o.push(g,f,v)}this.setIndex(o),this.setAttribute("position",new xt(u,3)),this.setAttribute("normal",new xt(s,3)),this.setAttribute("uv",new xt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ji(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}}class Dt extends Ti{constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Be(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Be(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new ze(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Ot,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class ws extends bt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Be(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}class ju extends ws{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(bt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Be(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}}const Ta=new Pe,Ao=new A,Ro=new A;class dl{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ze(512,512),this.map=null,this.mapPass=null,this.matrix=new Pe,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Gr,this._frameExtents=new ze(1,1),this._viewportCount=1,this._viewports=[new rt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Ao.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ao),Ro.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Ro),t.updateMatrixWorld(),Ta.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Ta),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(Ta)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),this.mapSize.x===512&&this.mapSize.y===512||(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Co=new Pe,Hi=new A,wa=new A;class qu extends dl{constructor(){super(new Wt(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ze(4,2),this._viewportCount=6,this._viewports=[new rt(2,1,1,1),new rt(0,1,1,1),new rt(3,1,1,1),new rt(1,1,1,1),new rt(3,0,1,1),new rt(1,0,1,1)],this._cubeDirections=[new A(1,0,0),new A(-1,0,0),new A(0,0,1),new A(0,0,-1),new A(0,1,0),new A(0,-1,0)],this._cubeUps=[new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,1,0),new A(0,0,1),new A(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,r=this.matrix,a=e.distance||n.far;a!==n.far&&(n.far=a,n.updateProjectionMatrix()),Hi.setFromMatrixPosition(e.matrixWorld),n.position.copy(Hi),wa.copy(n.position),wa.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(wa),n.updateMatrixWorld(),r.makeTranslation(-Hi.x,-Hi.y,-Hi.z),Co.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Co)}}class Yu extends ws{constructor(e,t,n=0,r=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=r,this.shadow=new qu}get power(){return 4*this.intensity*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Ku extends dl{constructor(){super(new ys(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Zu extends ws{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(bt.DEFAULT_UP),this.updateMatrix(),this.target=new bt,this.shadow=new Ku}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}new Pe;new Pe;new Pe;new A;new A;new A;new A;new A;new A;const pl="\\[\\]\\.:\\/",Aa="[^"+pl+"]",Ju="[^"+pl.replace("\\.","")+"]";new RegExp("^"+/((?:WC+[\/:])*)/.source.replace("WC",Aa)+/(WCOD+)?/.source.replace("WCOD",Ju)+/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Aa)+/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Aa)+"$");const Po=new Pe;class $u{constructor(e,t,n=0,r=1/0){this.ray=new Ki(e,t),this.near=n,this.far=r,this.camera=null,this.layers=new Ms,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Po.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Po),this}intersectObject(e,t=!0,n=[]){return cs(e,this,n,t),n.sort(Lo),n}intersectObjects(e,t=!0,n=[]){for(let r=0,a=e.length;r<a;r++)cs(e[r],this,n,t);return n.sort(Lo),n}}function Lo(i,e){return i.distance-e.distance}function cs(i,e,t,n){let r=!0;if(i.layers.test(e.layers)&&i.raycast(e,t)===!1&&(r=!1),r===!0&&n===!0){const a=i.children;for(let o=0,u=a.length;o<u;o++)cs(a[o],e,t,!0)}}new ze;new A;new A;new A;new A;new Pe;new Pe;new A;new Be;new Be;new A;new A;new A;new A;new Ss;new vn;new A;typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ca}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ca);const O={cyl:new Yn(1,1,1,24),cyl8:new Yn(1,1,1,8),cone:new Br(1,1,16),pyr:new Br(1,1,4),box:new Zn(1,1,1),sph:new kr(1,12,9),tore:new ji(1,.08,6,24),plan:new wi(1,1)},Kn=new Map,Qu=i=>{for(const e of Kn.values())if(e===i)return!0;return!1};function eh(){var i;for(const e of Kn.values())(i=e.map)==null||i.dispose(),e.dispose();Kn.clear()}const te=(i,e=.7,t=0,n=0)=>{const r=`${i}|${e}|${t}|${n}`;let a=Kn.get(r);return a||(a=new Dt({color:i,roughness:e,metalness:t}),n&&(a.emissive=new Be(i),a.emissiveIntensity=n),Kn.set(r,a)),a},Xe=()=>te("#C9A74E",.32,.75),us=()=>te("#E3C9A0",.7),Cn=()=>te("#5A3A26",.65),hs=()=>te("#FAF5EA",.9),en=()=>te("#1C1A20",.5,.2),Pr=["#E8C3A0","#C99A72","#9A6B4A","#F0CFB0"];function mi(i){return(e,t,n,r,a,o,u=o,s=o)=>{const c=new _t(e,t);return c.position.set(n,r,a),c.scale.set(o,u,s),c.castShadow=!0,c.receiveShadow=!0,i.add(c),c}}function _i(i,e,t,n,r,a=0,o=1){i(O.cone,te(r,.85),e,t+.36*o,n,.2*o,.72*o,.2*o),i(O.sph,te(Pr[a%4],.8),e,t+.82*o,n,.11*o),i(O.sph,te(a%3===0?"#2b1d16":"#3a2a20",.9),e,t+.87*o,n-.02*o,.115*o,.09*o,.115*o)}const Ra=()=>te("#FFD98A",.4,0,1.4);function th(i,e,t){const n=mi(i),r=e.hw>=e.hd,a=(r?e.hw:e.hd)*2,o=(r?e.hd:e.hw)*2,u=new qt;r||(u.rotation.y=Math.PI/2),i.add(u);const s=mi(u),c=e.id,l=te(t.accent,.6);te(t.deco,.35,.6);const h=te(t.nappe,.95),d=te(t.fleurs,.8);if(c==="estrade")s(O.box,te("#6B4A33",.7),0,.15,0,a,.3,o),s(O.box,Xe(),0,.31,o/2-.02,a,.03,.04),s(O.box,l,0,.305,0,a*.9,.012,o*.8),s(O.box,te("#6B4A33",.7),0,.07,o/2+.2,Math.min(1.4,a*.4),.15,.4),s(O.box,Cn(),-a*.28,.75,-o*.15,.4,.9,.3),s(O.box,Xe(),-a*.28,1.21,-o*.15,.44,.03,.34);else if(c==="dj"){s(O.box,en(),0,.45,0,a*.6,.9,o*.55),s(O.box,l,0,.92,o*.28,a*.6,.02,.02);for(const p of[-1,1])s(O.cyl,en(),p*a*.12,.94,0,.17,.03,.17),s(O.cyl,Xe(),p*a*.12,.96,0,.04,.02,.04);s(O.box,te("#2a2a33",.4),0,.95,0,.18,.04,.3),s(O.box,te("#cfd6e0",.3,.5),0,1.08,-o*.15,.4,.02,.28).rotation.x=-.9;for(const p of[-1,1])s(O.box,en(),p*a*.46,.55,0,.3,1.1,.3),s(O.cyl,te("#3a3a44",.6),p*a*.46,.75,o*.16,.09,.02,.09).rotation.x=Math.PI/2,s(O.cyl,te("#3a3a44",.6),p*a*.46,.4,o*.16,.12,.02,.12).rotation.x=Math.PI/2;_i(s,0,0,-o*.5,"#1c1a20",2)}else if(c==="regie"){s(O.box,Cn(),0,.37,0,a,.06,o*.9);for(const p of[-1,1])s(O.box,Cn(),p*(a/2-.05),.18,0,.06,.36,o*.9);for(const p of[-.5,0,.5])s(O.box,en(),p*a*.4,.62,-.1,.4,.26,.03),s(O.box,te("#E8C27A",.3,0,.8),p*a*.4,.62,-.085,.36,.22,.01);s(O.box,te("#cfd6e0",.3,.5),0,.4,.15,a*.5,.02,.16)}else if(c==="orch"){s(O.box,te("#6B4A33",.7),0,.15,0,a,.3,o),s(O.box,Xe(),0,.31,o/2-.02,a,.03,.04);const p=Math.max(3,Math.min(5,Math.round(a/.9)));for(let m=0;m<p;m++){const _=((m+.5)/p-.5)*a*.85,g=s;g(O.cone,te(m%2?"#1c1a20":"#F6EFDD",.85),_,.3+.36,0,.2,.72,.2),g(O.sph,te(Pr[m%4],.8),_,.3+.82,0,.11),g(O.sph,te("#2b1d16",.9),_,.3+.87,-.02,.115,.09,.115),m%2===0?(g(O.sph,te("#8a4a24",.45),_,.3+.5,.2,.17,.1,.12),g(O.box,Cn(),_+.18,.3+.62,.22,.28,.03,.03)):g(O.cyl,te("#d8c9a8",.6),_,.3+.35,.25,.13,.3,.13)}}else if(c==="troupe"){const p=["#C9A74E","#9C4A2C","#1F5A4C","#F1E6CE","#9C4A2C"];for(let m=0;m<5;m++){const _=(m-2)*.32,g=m%2*.22-.1;s(O.cone,te(p[m],.85),_,.4,g,.2,.8,.2),s(O.sph,te(Pr[m%4],.8),_,.9,g,.11),s(O.cyl,te(m%2?"#9C4A2C":"#C9A74E",.5),_,.98,g,.14,.1,.14)}s(O.cyl,te("#8a5a30",.7),-.65,.35,.3,.15,.2,.15),s(O.cyl,te("#8a5a30",.7),.65,.35,.3,.15,.2,.15)}else if(c==="photobooth"){s(O.box,en(),0,2/2,-o/2+.05,a,2,.08);for(const m of[-1,1])s(O.box,en(),m*(a/2-.05),2/2,0,.08,2,o);s(O.box,Cn(),0,2+.04,0,a+.1,.08,o+.1),s(O.box,Xe(),0,2-.1,o/2,a,.05,.03),s(O.box,l,-a/2+.2,2*.55,o/2-.05,.4,2*.8,.04),s(O.box,te("#FFF4D0",.3,0,1.2),0,2-.25,-o/2+.12,a*.6,.1,.04),s(O.tore,Xe(),0,1.2,-o/2+.14,.18,.18,.4),s(O.box,te("#FFF4D0",.8),0,.1,0,a-.2,.2,o-.2)}else if(c==="candy"){s(O.box,h,0,.33,0,a,.66,o*.7),s(O.box,Xe(),0,.67,o*.35,a,.025,.03);const p=["#E8A6B0","#F4D774","#9DD3C8","#C9A0DC"];for(let m=0;m<6;m++){const _=((m+.5)/6-.5)*a*.9,g=p[m%4];s(O.cyl,te("#E8F2F4",.1,0,0),_,.9,0,.1,.4,.1).material=te("#DCEBF0",.1),s(O.cyl,te(g,.5),_,.84,0,.085,.26,.085),s(O.cyl,Xe(),_,1.12,0,.07,.04,.07)}s(O.box,te("#F6EFDD",.8),0,1.3,-o*.33,a,.04,.3),s(O.box,us(),0,.65,-o*.33,a,1.3,.04)}else if(c==="the"){s(O.box,us(),0,.4,0,a,.8,o*.7),s(O.cyl,Xe(),-a*.2,.84,0,.3,.03,.3);for(let p=0;p<3;p++){const m=-a*.2+(p-1)*.2;s(O.cyl,Xe(),m,.97,0,.09,.2,.09),s(O.sph,Xe(),m,1.1,0,.07),s(O.box,Xe(),m+.1,1,0,.1,.02,.02).rotation.z=.5}for(let p=0;p<6;p++)s(O.cyl,te("#E8D9B0",.2,0,0),a*.15+p%3*.12,.88,(Math.floor(p/3)-.5)*.15,.035,.07,.035);s(O.cyl8,Xe(),a*.4,1.2,-o*.2,.01,.8,.01),s(O.cyl,te("#FFD98A",.3,0,1.2),a*.4,1,-o*.2,.08,.14,.08)}else if(c==="salon"){s(O.box,te(t.accent,.95),0,.01,.1,a,.02,o);const p=(m,_,g,f,v)=>{const x=new qt;x.position.set(m,0,_),x.rotation.y=v,u.add(x);const M=mi(x);M(O.box,te("#9C4A2C",.9),0,.2,0,g,.4,f),M(O.box,te("#9C4A2C",.9),0,.5,-f*.42,g,.4,f*.18);for(let w=0;w<Math.max(2,Math.floor(g/.55));w++)M(O.box,te(w%2?"#C9A74E":"#1F5A4C",.9),((w+.5)/Math.max(2,Math.floor(g/.55))-.5)*g*.9,.5,f*.1,.3,.25,.1)};p(0,-o*.4,a*.95,.5,0),p(-a*.45,0,o*.6,.5,Math.PI/2),p(a*.45,0,o*.6,.5,-Math.PI/2),s(O.cyl,Xe(),0,.25,.1,.32,.05,.32),s(O.cyl8,Xe(),0,.12,.1,.06,.24,.06)}else if(c==="fontaine"){const p=e.hw;s(O.cyl8,te("#1F5A4C",.4),0,.17,0,p,.34,p),s(O.cyl8,te("#F1E6CE",.5),0,.35,0,p*.92,.04,p*.92),s(O.cyl,te("#7fd0e0",.05,.1),0,.33,0,p*.82,.04,p*.82),s(O.cyl8,te("#F1E6CE",.5),0,.6,0,.12,.5,.12),s(O.cyl,te("#1F5A4C",.4),0,.88,0,.32,.1,.32),s(O.cyl,te("#9fe0ee",.05,.1,.2),0,.94,0,.27,.03,.27),s(O.sph,te("#bfeaf5",.1,0,.4),0,1.1,0,.07,.14,.07)}else if(c==="gateau")[[.5,.3],[.38,.28],[.27,.26]].forEach(([p,m],_)=>{const g=.3+[0,.3,.58][_];s(O.cyl,_%2?te("#F6EFDD",.6):hs(),0,g+m/2,0,p*.85,m,p*.85),s(O.tore,Xe(),0,g+.02,0,p*.86,p*.86,.5).rotation.x=Math.PI/2}),s(O.cyl,h,0,.15,0,.46,.3,.46),s(O.sph,d,0,.95,0,.1);else if(c==="amariya"){const p=a*.6,m=o*.7,_=1.9;s(O.box,te("#6B4A33",.7),0,.18,0,p,.18,m),s(O.box,l,0,.32,0,p*.8,.1,m*.8);for(const g of[-1,1])for(const f of[-1,1])s(O.cyl8,Xe(),g*(p/2-.08),_/2,f*(m/2-.08),.04,_,.04);s(O.pyr,Xe(),0,_+.2,0,p*.78,.5,m*.78).rotation.y=Math.PI/4,s(O.box,l,0,_-.02,0,p+.1,.06,m+.1);for(const g of[-1,1])s(O.box,te("#9C4A2C",.9),0,_*.55,g*(m/2-.1),p*.85,_*.6,.02);for(const g of[-1,1])s(O.cyl8,Cn(),0,.12,g*(m/2+.25),p*.5+.2,.025,.025).rotation.z=Math.PI/2;s(O.box,te("#F6EFDD",.8),0,.5,0,.5,.3,.35)}else if(c==="neggafa")s(O.cone,te("#C9A74E",.5,.3),0,.5,0,.42,1,.42),s(O.cone,te("#9C4A2C",.85),0,.55,.02,.32,.9,.3),s(O.sph,te(Pr[1],.8),0,1.12,0,.12),s(O.cyl,Xe(),0,1.25,0,.14,.1,.14),s(O.tore,Xe(),0,.72,.28,.16,.16,.5).rotation.x=Math.PI/2;else if(c==="fauteuils"){s(O.box,te("#6B4A33",.7),0,.1,0,a,.2,o),s(O.box,l,0,.21,.05,a*.9,.02,o*.85);for(const p of[-1,1]){const m=p*a*.22;s(O.box,te("#F6EFDD",.8),m,.45,.02,.55,.3,.5),s(O.box,te("#F6EFDD",.8),m,.9,-.2,.55,.8,.1),s(O.tore,Xe(),m,1.05,-.14,.26,.26,.4);for(const _ of[-1,1])s(O.box,te("#F6EFDD",.8),m+_*.3,.55,.02,.08,.3,.45)}s(O.cyl,te("#9C4A2C",.9),0,.3,.3,.12,.2,.12),s(O.sph,d,0,.5,.3,.14,.1,.14)}else if(c==="henne"){s(O.box,te(t.accent,.95),0,.01,0,a,.02,o);for(const[p,m,_,g]of[[0,-o*.38,a*.95,0],[-a*.4,0,o*.7,Math.PI/2]]){const f=new qt;f.position.set(p,0,m),f.rotation.y=g,u.add(f);const v=mi(f);v(O.box,te("#9C4A2C",.9),0,.2,0,_,.4,.5),v(O.box,te("#9C4A2C",.9),0,.5,-.2,_,.4,.1);for(let x=0;x<4;x++)v(O.box,te(x%2?"#C9A74E":"#F1E6CE",.9),((x+.5)/4-.5)*_*.85,.5,0,.3,.25,.1)}s(O.cyl,Xe(),.1,.2,.1,.34,.04,.34),s(O.cyl8,Xe(),.1,.1,.1,.06,.2,.06);for(let p=0;p<4;p++)s(O.cone,te("#7a4a22",.7),.1+(p-1.5)*.1,.27,.1,.025,.1,.025).rotation.z=1.2}else if(c==="livre")s(O.cyl,Xe(),0,.5,0,.18,1,.18),s(O.box,te("#F6EFDD",.7),-.1,1.04,0,.2,.03,.28).rotation.z=.12,s(O.box,te("#F6EFDD",.7),.1,1.04,0,.2,.03,.28).rotation.z=-.12,s(O.box,te("#9C4A2C",.8),0,1.01,0,.44,.02,.32),s(O.cyl8,Xe(),.3,1.1,.05,.01,.2,.01).rotation.z=1.1;else if(c.startsWith("mic"))s(O.cyl,en(),0,.02,0,.14,.04,.14),s(O.cyl8,te("#cfd6e0",.3,.6),0,.6,0,.012,1.2,.012),s(O.sph,te("#2a2a33",.4),0,1.25,0,.05);else if(c==="enceintes")s(O.box,en(),0,.55,0,.5,1.1,.4),s(O.cyl,te("#3a3a44",.6),0,.8,.205,.14,.02,.14).rotation.x=Math.PI/2,s(O.cyl,te("#3a3a44",.6),0,.4,.205,.18,.02,.18).rotation.x=Math.PI/2;else if(c==="acoustique")s(O.cyl,Cn(),0,.3,0,.14,.6,.14),_i(n,0,0,0,"#3d352e",1,1),s(O.sph,te("#a55a28",.4),.14,.55,.16,.15,.1,.07),s(O.box,Cn(),.35,.8,.16,.34,.03,.03).rotation.z=.5;else if(c==="photographe")_i(n,0,0,0,"#1f1d22",0,1.05),s(O.box,en(),.1,.8,.16,.16,.1,.1),s(O.cyl,en(),.1,.8,.26,.04,.06,.04).rotation.x=Math.PI/2;else if(c==="interv"){s(O.box,h,0,.36,0,a,.72,o*.6),s(O.box,Xe(),0,.73,o*.3,a,.025,.03);for(let p=0;p<3;p++){const m=((p+.5)/3-.5)*a*.8;s(O.box,te("#F6EFDD",.7),m,.3,-o*.55,.3,.05,.3),s(O.box,te("#F6EFDD",.7),m,.6,-o*.7,.3,.45,.04),s(O.cyl,te("#E8F2F4",.1),m+.12,.82,.05,.035,.18,.035)}}else if(c==="enfants"){s(O.box,te("#9DD3C8",.95),0,.015,0,a,.03,o);const p=["#E8A6B0","#F4D774","#C9A0DC","#9DD3C8"];for(let m=0;m<5;m++)s(O.box,te(p[m%4],.8),(m-2)*.45,.13,(m%2-.5)*.7,.26,.26,.26).rotation.y=m;s(O.pyr,te("#F6EFDD",.9),-a*.3,.55,-o*.25,.7,1.1,.7).rotation.y=Math.PI/4,s(O.sph,te("#E8A6B0",.4),a*.3,.2,o*.2,.2)}else return!1;return!0}function nh(i,e,t){const n=new qt,r=i.salle.pos,a=i.salle.n,o=mi(n),u=(s,c)=>{const l=new qt;return l.position.set(s,0,c),n.add(l),mi(l)};if((i.accueils.includes("hotesses")||i.accueils.includes("maitre_hotel"))&&r.HOTESSES.forEach(([s,c],l)=>{_i(u(s,c),0,0,0,e.nappe,l,1.1)}),i.accueils.includes("maitre_hotel")){const[s,c]=r.MAITRE_HOTEL,[l,h]=r.HOTESSE_3;_i(u(s,c),0,0,0,"#1f1d22",3,1.15),_i(u(l,h),0,0,0,e.nappe,0,1.1)}if(i.accueils.includes("the")||i.accueils.includes("discret")){const s=u(r.COMPTOIR[0],r.COMPTOIR[1]);s(O.box,us(),0,.4,0,1.2,.8,.5),s(O.box,Xe(),0,.82,.24,1.2,.03,.03),i.accueils.includes("the")?(s(O.cyl,Xe(),-.2,.96,0,.09,.2,.09),s(O.sph,Xe(),-.2,1.08,0,.07),s(O.cyl,Xe(),.25,.84,0,.2,.03,.2)):s(O.box,te("#F6EFDD",.8),0,.85,0,.5,.04,.3)}if(i.options.has("fleurs")&&r.BOUQUETS.forEach(([s,c])=>{const l=u(s,c);l(O.cyl,Xe(),0,.3,0,.14,.6,.14);for(let h=0;h<7;h++)l(O.sph,te(h%2?e.fleurs:"#FBF6EA",.8),Math.cos(h*.9)*.18,.78+h%3*.08,Math.sin(h*.9)*.18,.13);l(O.sph,te("#4F7A4A",.9),0,.7,0,.2,.1,.2)}),i.lumiere==="bougies"&&r.CANDELABRES.forEach(([s,c])=>{const l=u(s,c);l(O.cyl,Xe(),0,.03,0,.14,.06,.14),l(O.cyl8,Xe(),0,.5,0,.025,1,.025);for(const h of[-.16,0,.16])l(O.cyl8,Xe(),h,.98,0,.012,.06,.012),l(O.cyl8,hs(),h,1.1,0,.018,.16,.018),l(O.sph,Ra(),h,1.22,0,.03,.05,.03);l(O.box,Xe(),0,.98,0,.36,.015,.015)}),i.lumiere==="chaleureuse"&&r.POSTES_LANTERNES.forEach(([s,c])=>{const l=u(s,c);l(O.cyl8,Xe(),0,.9,0,.03,1.8,.03),l(O.cyl,Xe(),0,.03,0,.12,.06,.12),l(O.cyl8,Xe(),0,1.92,0,.1,.18,.1),l(O.cyl8,te("#FFD98A",.3,0,1.3),0,1.78,0,.075,.2,.075),l(O.cone,Xe(),0,2.08,0,.14,.14,.14)}),i.options.has("feux_froids")&&r.FEUX.forEach(([s,c])=>{const l=u(s,c);l(O.cyl,en(),0,.1,0,.09,.2,.09);for(let h=0;h<6;h++)l(O.sph,te("#BFE3FF",.3,0,1.4),(h-2.5)*.02,.4+h*.22,0,.035+h*.006)}),i.lumiere==="etoilee"){const s=i.salle.ax,c=3,l=[[[.3,a-.5],[.3,.3]],[[.3,.3],[a-.4,.3]],[[.3,a/2+.1],[a-.4,a/2+.1]],[[s-.9,a-.2],[a-.4,a/2+.1]]],h=[];for(const[[m,_],[g,f]]of l){const v=[];for(let M=0;M<=24;M++){const w=M/24;v.push(new A(m+(g-m)*w,c-Math.sin(w*Math.PI)*.35,_+(f-_)*w))}n.add(new Xu(new Ft().setFromPoints(v),new ul({color:3813672})));const x=Math.round(Math.hypot(g-m,f-_)*1.3);for(let M=0;M<x;M++){const w=(M+.5)/x;h.push([m+(g-m)*w,c-Math.sin(w*Math.PI)*.35-.06,_+(f-_)*w])}}const d=new Cr(O.sph,Ra(),h.length),p=new Pe;h.forEach(([m,_,g],f)=>{p.compose(new A(m,_,g),new ln,new A(.05,.05,.05)),d.setMatrixAt(f,p)}),n.add(d);for(const[m,_]of[[.3,a-.5],[.3,.3],[a-.4,.3],[.3,a/2+.1],[a-.4,a/2+.1]])o(O.cyl8,te("#3a3128",.8),m,c/2,_,.03,c,.03)}if(i.lieu==="villa"){const s=t>.5,c=`eau|${s}|${i.options.has("piscine_lumiere")}`;let l=Kn.get(c);if(!l){const h=document.createElement("canvas");h.width=h.height=128;const d=h.getContext("2d");for(let m=0;m<2;m++)for(let _=0;_<2;_++)d.fillStyle=(m+_)%2?"#3FA79C":"#2F8F86",d.fillRect(m*64,_*64,64,64);d.strokeStyle="rgba(240,236,221,0.55)",d.lineWidth=2;for(const[m,_]of[[32,32],[96,96]]){d.beginPath();for(let g=0;g<16;g++){const f=g/16*Math.PI*2-Math.PI/2,v=g%2?8:22;d.lineTo(m+Math.cos(f)*v,_+Math.sin(f)*v)}d.closePath(),d.stroke()}const p=new hl(h);p.colorSpace=kt,p.wrapS=p.wrapT=Vi,p.repeat.set(10,3),l=new Dt({map:p,color:s?"#2c5f5c":"#ffffff",roughness:.05,metalness:.3}),i.options.has("piscine_lumiere")&&(l.emissive=new Be("#3FD0C0"),l.emissiveIntensity=.55),Kn.set(c,l)}o(O.box,te("#EFEADF",.6),a/2,-.12,-2.45,a+.4,.3,4.3),o(O.box,l,a/2,0,-2.45,a-.2,.06,3.9);for(let h=0;h<12;h++)o(O.cyl,te(h%2?e.fleurs:"#FBF6EA",.8),.8+h*1.37%(a-1.6),.05,-.9-h*.73%3,i.options.has("piscine_fleurs")?.12:1e-4,.02,i.options.has("piscine_fleurs")?.12:1e-4);if(i.options.has("piscine_bougies"))for(let h=0;h<8;h++)o(O.cyl,hs(),1.2+h*((a-2.4)/8),.1,-1.4-h%3*.9,.05,.1,.05),o(O.sph,Ra(),1.2+h*((a-2.4)/8),.18,-1.4-h%3*.9,.025,.04,.025);for(const h of[a*.12,a*.37,a*.65]){o(O.cyl8,te("#5c4630",.9),h,.8,-3.4,.07,1.6,.07);for(let d=0;d<6;d++){const p=d/6*Math.PI*2;o(O.cone,te("#4F7A4A",.85),h+Math.cos(p)*.5,1.6,-3.4+Math.sin(p)*.5,.12,1,.12).rotation.set(Math.sin(p)*1.2,0,-Math.cos(p)*1.2)}}}return n}function ih(i){const e=i.salle.pos,t=i.options,n=i.salle.n,r=[],a=(s,c,l,h,d=h,p="generique",m=.6)=>r.push({id:s,a:[c,l],hw:h,hd:d,genre:p,h:m}),o=(s,c,l="generique",h=.6)=>a(s,c.gx+c.w/2,c.gy+c.d/2,c.w/2,c.d/2,l,h),u=jr[i.tables];if(i.tables!=="conference"&&i.salle.tables.forEach(([s,c],l)=>a(`t${l}`,s,c,u.dx,u.dy,i.tables==="rondes"?"ronde":i.tables==="rectangulaires"?"rect":"haute")),i.salle.hautes.forEach(([s,c],l)=>a(`th${l}`,s,c,jr.hautes.dx,jr.hautes.dy,"haute")),i.type!=="pro"&&i.type!=="conference"&&i.tables!=="hautes"&&o("honneur",e.HONNEUR,"honneur"),t.has("arche")&&a("arche",e.ARCHE.gx+e.ARCHE.largeur/2,e.ARCHE.gy+.4,e.ARCHE.largeur/2,.4,"arche"),t.has("amariya")&&a("amariya",e.AMARIYA[0]+1.15,e.AMARIYA[1]+.7,1.15,.7,"generique",1.1),t.has("fauteuils")&&a("fauteuils",e.FAUTEUILS[0]+1,e.FAUTEUILS[1]+.6,1,.6,"generique",.8),t.has("neggafa")&&a("neggafa",e.NEGGAFA[0],e.NEGGAFA[1],.45,.45,"generique",.9),t.has("gateau")&&a("gateau",e.GATEAU[0],e.GATEAU[1],.5,.5,"generique",.9),t.has("enfants")&&a("enfants",e.ENFANTS[0]+1.2,e.ENFANTS[1]+1,1.2,1,"generique",.4),t.has("henne")&&a("henne",e.HENNE[0]+1.1,e.HENNE[1]+1.1,1.1,1.1,"generique",.5),t.has("podium")&&o("estrade",e.ESTRADE,"generique",.3),t.has("table_intervenants")&&o("interv",e.INTERVENANTS,"generique",.5),t.has("micros")&&e.MICROS.forEach(([s,c],l)=>a(`mic${l}`,s,c,.3,.3,"generique",1.2)),t.has("regie")&&a("regie",e.REGIE[0]+.9,e.REGIE[1]+.4,.9,.4,"generique",.6),t.has("buffet_sandwichs")){const s=e.SANDWICHS,c=s[0]<=n-2,l=c?2.6:.9,h=c?.9:2.6;a("sandw",s[0]+l/2,s[1]+h/2,l/2,h/2,"buffet")}return i.musiques.includes("dj")&&o("dj",e.DJ,"generique",.7),i.musiques.includes("orchestre")&&o("orch",e.SCENE_ORCHESTRE,"generique",.3),i.musiques.includes("troupe")&&a("troupe",e.TROUPE[0]+.5,e.TROUPE[1]+.5,.6,.5,"generique",1),i.musiques.includes("playlist")&&a("enceintes",(e.ENCEINTES[0][0]+e.ENCEINTES[1][0])/2,.75,.25,.25,"generique",1.1),i.musiques.includes("acoustique")&&a("acoustique",e.ACOUSTIQUE[0]+.5,e.ACOUSTIQUE[1]+.5,.5,.5,"generique",.9),t.has("photobooth")&&o("photobooth",e.PHOTOBOOTH,"generique",1.6),t.has("nawar")&&o("nawar",e.NAWAR,"nawar"),t.has("buffet")&&o("buffet",e.BUFFET,"buffet"),t.has("candy_bar")&&o("candy",e.CANDY,"generique",.7),t.has("the_bar")&&o("the",e.THE_BAR,"generique",.7),t.has("livre_dor")&&a("livre",e.LIVRE_DOR[0],e.LIVRE_DOR[1],.5,.5,"generique",.7),t.has("salon")&&o("salon",e.SALON,"generique",.5),t.has("fontaine")&&a("fontaine",e.FONTAINE[0],e.FONTAINE[1],.9,.9,"generique",.7),t.has("photographe")&&a("photographe",e.PHOTOGRAPHE[0],e.PHOTOGRAPHE[1],.5,.5,"generique",1),t.has("piste")&&o("piste",e.PISTE,"piste"),r}const Do=(i,e)=>[i,e].includes("piste")&&[i,e].some(t=>t==="troupe"||t.startsWith("feu"));function rh(i,e,t,n,r){const a=n.find(l=>l.id===i);if(!a)return!1;const o=.04,u={x0:a.a[0]-a.hw+e,y0:a.a[1]-a.hd+t,x1:a.a[0]+a.hw+e,y1:a.a[1]+a.hd+t},s=l=>u.x0<l.x1-o&&l.x0<u.x1-o&&u.y0<l.y1-o&&l.y0<u.y1-o;for(const l of n){if(l.id===i||Do(i,l.id))continue;const[h,d]=r.deplacements[l.id]??[0,0];if(s({x0:l.a[0]-l.hw+h,y0:l.a[1]-l.hd+d,x1:l.a[0]+l.hw+h,y1:l.a[1]+l.hd+d}))return!0}const c=new Set(n.map(l=>l.id));for(const l of r.salle.pos.obstacles)if(!(/^(pl|cd|enc|feu)\d/.test(l.id)||c.has(l.id)||Do(i,l.id))&&s(l))return!0;return!1}const fn=(i,e,t)=>i+(e-i)*t,di=(i,e,t)=>new Be(i).lerp(new Be(e),t),Uo=(()=>{const r=.6000000000000001,a=3*(.2-.2)-r,o=1-r-a,u=3*.7,s=3*(1-.7)-u,c=1-u-s;return l=>{let h=l;for(let d=0;d<8;d++){const p=((o*h+a)*h+r)*h-l,m=(3*o*h+2*a)*h+r;if(Math.abs(p)<1e-5||!m)break;h-=p/m}return h=Math.max(0,Math.min(1,h)),((c*h+s)*h+u)*h}})();function ah(i){let e=i>>>0||1;return()=>(e=e*1664525+1013904223>>>0,e/4294967296)}function Gi(i,e,t,n=!0){const r=document.createElement("canvas");r.width=i,r.height=e,t(r.getContext("2d"),i,e);const a=new hl(r);return a.colorSpace=kt,n&&(a.wrapS=a.wrapT=Vi),a.anisotropy=4,a}function Io(i){const e=i.map(([u,s])=>{const c=u.index?u.toNonIndexed():u.clone();return c.applyMatrix4(s),c});let t=0;e.forEach(u=>t+=u.attributes.position.count);const n=new Float32Array(t*3),r=new Float32Array(t*3);let a=0;e.forEach(u=>{n.set(u.attributes.position.array,a*3),r.set(u.attributes.normal.array,a*3),a+=u.attributes.position.count});const o=new Ft;return o.setAttribute("position",new Ht(n,3)),o.setAttribute("normal",new Ht(r,3)),o.computeBoundingSphere(),o}const mn=(i=0,e=0,t=0,n=0,r=1,a=r,o=r,u=0)=>new Pe().compose(new A(i,e,t),new ln().setFromEuler(new Ot(u,n,0)),new A(r,a,o)),sh={riad:{a:"#EBDDBF",b:"#D9C398",bord:"#1F5A4C",mur:"#E6D1AB",bande:"#1F5A4C",terre:"#C6A474"},villa:{a:"#B98E65",b:"#AA7F58",bord:"#8A6A47",mur:"#F1EDE4",bande:"#D8D1C2",terre:"#C8C2B2"},rooftop:{a:"#E8E1D6",b:"#DDD4C6",bord:"#9A7650",mur:"#EEE7DA",bande:"#CDC4B2",terre:"#3B3A57"},jardin:{a:"#BBCB8B",b:"#B0C382",bord:"#8FA86A",mur:"#6F8F55",bande:"#587A44",terre:"#9DB873"},salle:{a:"#E6D8BC",b:"#D8C6A2",bord:"#C9A74E",mur:"#F0E6D2",bande:"#C9A74E",terre:"#CDB79A"}};function fh(i,e,t){const n=new Gu({canvas:i,antialias:!0,alpha:!0,powerPreference:"high-performance"});n.setPixelRatio(Math.min(window.devicePixelRatio||1,matchMedia("(pointer: coarse)").matches?1.5:2)),n.setClearColor(0,0),n.toneMapping=Bo,n.toneMappingExposure=1.05,n.shadowMap.enabled=!0,n.shadowMap.type=Oo,n.shadowMap.autoUpdate=!1;const r=matchMedia("(pointer: coarse)").matches,a=new Vu,o=new ys(-1,1,1,-1,.1,300),u=new ju(16770760,9075302,1);a.add(u);const s=new Zu(16761994,2.2);s.castShadow=!0,s.shadow.mapSize.set(r?1024:2048,r?1024:2048),s.shadow.radius=6,s.shadow.bias=-6e-4,s.shadow.normalBias=.03,a.add(s,s.target);const c=[0,1,2,3].map(()=>{const L=new Yu(16758886,0,8,1.6);return a.add(L),L}),l={laiton:new Dt({color:13215566,metalness:.75,roughness:.32}),boisClair:new Dt({color:14928288,roughness:.7}),boisSombre:new Dt({color:5913126,roughness:.65}),blanc:new Dt({color:16446954,roughness:.9}),verre:new Dt({color:15254138,roughness:.12,metalness:.1,transparent:!0,opacity:.72}),bougie:new Xn({color:16767370}),refusAnim:new Xn({color:14831182,transparent:!0,opacity:.45,depthWrite:!1}),refus:new Xn({color:14831182,transparent:!0,opacity:.45,depthWrite:!1}),halo:new Xn({color:16045940,transparent:!0,opacity:.14,depthWrite:!1}),libre:new Xn({color:16045940,transparent:!0,opacity:.35,depthWrite:!1})},h={cyl:new Yn(1,1,1,28),cyl8:new Yn(1,1,1,10),box:new Zn(1,1,1),sph:new kr(1,10,8),ico:new Ts(1,0),tore:new ji(1,.1,6,28),plan:new wi(1,1)},d=Io([[h.box,mn(0,.3,0,0,.26,.05,.26)],[h.box,mn(-.11,.15,-.11,0,.03,.3,.03)],[h.box,mn(.11,.15,-.11,0,.03,.3,.03)],[h.box,mn(-.11,.15,.11,0,.03,.3,.03)],[h.box,mn(.11,.15,.11,0,.03,.3,.03)],[h.tore,mn(0,.58,-.12,0,.17,.2,.17)],[h.cyl,mn(0,.58,-.12,0,.15,.018,.17,Math.PI/2)],[h.box,mn(0,.4,-.12,0,.03,.2,.03)]]),p=Io(Array.from({length:70},(L,C)=>{const y=ah(C+3);return[h.ico,mn((y()-.5)*3,-y()*.45,(y()-.5)*.5,y()*3,.05+y()*.05)]}));function m(L){L.traverse(C=>{var ae;if(C.isInstancedMesh&&C.dispose(),C.isLine){C.geometry.dispose(),C.material.dispose();return}const y=Array.isArray(C.material)?C.material:C.material?[C.material]:[];for(const ie of y)!Qu(ie)&&!Object.values(l).includes(ie)&&((ae=ie.map)==null||ae.dispose(),ie.dispose())})}let _=null,g=[],f=new Map,v=null,x="";const M=(L,C=!0,y=!0)=>(L.castShadow=C,L.receiveShadow=y,L),w=(L,C,y,ae,ie,ge,Re=ge,Ve=ge,st=!0)=>{const at=M(new _t(L,C),st);return at.position.set(y,ae,ie),at.scale.set(ge,Re,Ve),at};function R(L,C,y){const ae=new qt,ie=sh[L],ge=L==="riad"||L==="salle",Re=(he,Ce,ut,nt,ft)=>{he.beginPath();for(let nn=0;nn<16;nn++){const E=nn/16*Math.PI*2-Math.PI/2,N=nn%2?ft:nt;he.lineTo(Ce+Math.cos(E)*N,ut+Math.sin(E)*N)}he.closePath()},Ve=ge?Gi(384,384,(he,Ce,ut)=>{for(let nt=0;nt<3;nt++)for(let ft=0;ft<3;ft++)he.fillStyle=(nt+ft)%2?ie.b:ie.a,he.fillRect(nt*128,ft*128,128,128);he.globalAlpha=.55,Re(he,192,192,62,30),he.fillStyle="#1F5A4C",he.fill(),he.strokeStyle="#A8933F",he.lineWidth=3,he.stroke(),he.globalAlpha=.07,he.strokeStyle="#000",he.lineWidth=2;for(let nt=0;nt<3;nt++)he.strokeRect(nt*128,0,128,ut),he.strokeRect(0,nt*128,Ce,128)}):Gi(256,256,(he,Ce,ut)=>{he.fillStyle=ie.a,he.fillRect(0,0,Ce,ut),he.fillStyle=ie.b,he.fillRect(0,0,Ce/2,ut/2),he.fillRect(Ce/2,ut/2,Ce/2,ut/2),he.globalAlpha=.08,he.strokeStyle="#000",he.lineWidth=2,he.strokeRect(0,0,Ce,ut)});Ve.repeat.set(ge?C/3:C/2,ge?C/3:C/2);const st=M(new _t(h.box,new Dt({map:Ve,roughness:.75})),!1,!0);st.scale.set(C,.3,C),st.position.set(C/2,-.15,C/2),ae.add(st);const at=M(new _t(h.box,new Dt({color:ie.bord,roughness:.6})),!1,!0);at.scale.set(C+.4,.28,C+.4),at.position.set(C/2,-.17,C/2),ae.add(at);const ot=M(new _t(h.plan,new Dt({color:ie.terre,roughness:1})),!1,!0);ot.rotation.x=-Math.PI/2,ot.scale.set(C*5,C*5,1),ot.position.set(C/2,-.32,C/2),ae.add(ot);const At=3.4,Ee=Gi(512,256,(he,Ce,ut)=>{he.fillStyle=ie.mur,he.fillRect(0,0,Ce,ut);for(let nt=0;nt<16;nt++)he.fillStyle=nt%2?ge?"#1F5A4C":ie.bande:"#F3ECDD",he.fillRect(nt*32,0,32,40),he.fillStyle="#A8933F",he.fillRect(nt*32+14,18,4,4);he.fillStyle="#C9A74E",he.fillRect(0,40,Ce,5),he.fillStyle="#E9DEC5",he.fillRect(0,206,Ce,42),he.fillStyle="#C9A74E",he.fillRect(0,204,Ce,3),he.fillRect(0,ut-8,Ce,8);for(let nt=0;nt<3;nt++){const ft=40+nt*150,nn=(N,X,$)=>{he.beginPath(),he.moveTo(ft+N,$),he.lineTo(ft+N,120+X),he.quadraticCurveTo(ft+50,50+X*1.6,ft+100-N,120+X),he.lineTo(ft+100-N,$),he.closePath()},E=he.createLinearGradient(0,70,0,204);E.addColorStop(0,"#EDE2C8"),E.addColorStop(1,"#D8C7A2"),nn(0,0,204),he.fillStyle=E,he.fill(),he.strokeStyle="#C9A74E",he.lineWidth=4,he.stroke(),nn(8,8,204),he.strokeStyle="rgba(120,90,50,0.28)",he.lineWidth=3,he.stroke()}});Ee.repeat.set(Math.max(1,Math.round(C/8)),1);const Me=new Dt({map:Ee,roughness:.85}),Ue=M(new _t(h.plan,Me),!1,!0),qe=L==="villa"?.9:At;Ue.scale.set(C,qe,1),Ue.position.set(C/2,qe/2,0),L==="villa"&&(Ue.material=new Dt({color:"#EFEADF",roughness:.7,side:Ls})),ae.add(Ue);const ke=M(new _t(h.plan,Me),!1,!0);ke.scale.set(C,At,1),ke.rotation.y=Math.PI/2,ke.position.set(0,At/2,C/2),ae.add(ke);for(const[he,Ce]of[[.35,.35],[C-.4,.35],[.35,C-.4]])ae.add(w(h.cyl8,l.laiton,he,.45,Ce,.05,.9),w(h.cyl,l.laiton,he,1,Ce,.1,.22),w(h.sph,l.bougie,he,1,Ce,.07,.07,.07,!1));return ae}function P(L,C){let y=0;for(const ae of L)y=y*31+ae.charCodeAt(0)>>>0;return di(y%2?C.accent:C.deco,"#3a2a22",.15+y%5*.07)}function q(L,C,y,ae){const ie=new qt,ge=[],Re=(Ee,Me,Ue)=>ge.push({x:Ee,z:Me,dos:[-Math.sin(Ue),-Math.cos(Ue)]}),Ve=te(y.nappe,.95),st=te(y.fleurs,.8),at=(Ee,Me,Ue,qe)=>{const ke=M(new Cr(d,qe,Ee)),he=new Pe;for(let Ce=0;Ce<Ee;Ce++){const ut=Ce/Ee*Math.PI*2;he.compose(new A(Math.cos(ut)*Me,Ue,Math.sin(ut)*Me),new ln().setFromEuler(new Ot(0,-ut-Math.PI/2,0)),new A(1,1,1)),ke.setMatrixAt(Ce,he)}return ke},ot=te("#E3C9A0",.55);if(L.genre==="ronde")ie.add(w(h.cyl,Ve,0,.21,0,yn,.42,yn)),ie.add(w(h.cyl,Ve,0,.43,0,yn+.03,.03,yn+.03)),ie.add(w(h.tore,l.laiton,0,.45,0,yn-.12,.6,yn-.12).rotateX(Math.PI/2)),ie.add(w(h.box,te("#9C4A2C",.9),0,.447,0,yn*1.9,.006,.17,!1),w(h.box,te("#1F5A4C",.7),0,.449,0,.17,.006,.17,!1)),ie.add(w(h.sph,st,0,.58,0,.13,.11,.13)),ae&&ie.add(w(h.cyl8,l.bougie,.2,.5,.1,.012,.1,.012,!1)),ie.add(at(10,yn+.22,0,ot));else if(L.genre==="rect"){ie.add(w(h.box,Ve,0,.21,0,1.7,.42,.78)),ie.add(w(h.sph,st,0,.55,0,.12,.1,.12));const Ee=M(new Cr(d,ot,6)),Me=new Pe;for(let Ue=0;Ue<6;Ue++){const qe=Ue<3?-1:1,ke=(Ue%3-1)*.567;Me.compose(new A(ke,0,qe*.64),new ln().setFromEuler(new Ot(0,qe>0?Math.PI:0,0)),new A(1,1,1)),Ee.setMatrixAt(Ue,Me),Re(ke,qe*.64,qe>0?Math.PI:0)}ie.add(Ee)}else if(L.genre==="haute")ie.add(w(h.cyl8,l.laiton,0,.3,0,.04,.6),w(h.cyl,l.laiton,0,.02,0,.2,.04,.2),w(h.cyl,Ve,0,.62,0,.3,.04,.3)),ae&&ie.add(w(h.cyl8,l.bougie,0,.7,0,.012,.1,.012,!1));else if(L.genre==="honneur"){const Ee=L.hw*2,Me=L.hd*2;ie.add(w(h.box,Ve,0,.36,0,Ee,.72,Me),w(h.box,te("#1F5A4C",.7),0,.5,Me/2+.004,Ee*.98,.12,.012,!1));for(const qe of[.565,.435])ie.add(w(h.box,l.laiton,0,qe,Me/2+.008,Ee*.98,.012,.012,!1));ie.add(w(h.box,l.laiton,0,.73,Me/2,Ee+.04,.03,.03,!1),w(h.box,l.laiton,0,.73,-Me/2,Ee+.04,.03,.03,!1));for(const qe of[-1,1])ie.add(w(h.box,l.laiton,qe*Ee/2,.73,0,.03,.03,Me,!1));if(ie.add(w(h.box,te("#1F5A4C",.7),0,.726,0,Ee*.94,.008,Me*.22,!1)),C.type==="mariage"){const qe=M(new Cr(d,ot,2)),ke=new Pe;[-.9,.9].forEach((he,Ce)=>{ke.compose(new A(he,0,-(Me/2+.3)),new ln().setFromEuler(new Ot(0,0,0)),new A(1.25,1.25,1.25)),qe.setMatrixAt(Ce,ke),Re(he,-(Me/2+.3),0)}),ie.add(qe)}ie.add(w(h.box,l.laiton,0,2.3,-Me*.1,Ee*1.05,.03,.03,!1));const Ue=new _t(p,l.blanc);Ue.scale.set(Ee/3,1,1.2),Ue.position.set(0,2.25,-Me*.1),Ue.castShadow=!0,ie.add(Ue);for(const qe of[-.5,.5])ie.add(w(h.cyl8,l.laiton,qe*Ee*.98,1.15,-Me*.1,.02,2.3,.02,!1))}else if(L.genre==="arche"){const Ee=L.hw*2,Me=2,Ue=Gi(128,128,(Ce,ut,nt)=>{Ce.clearRect(0,0,ut,nt),Ce.strokeStyle="#fff",Ce.lineWidth=6;for(let ft=-1;ft<5;ft++)Ce.beginPath(),Ce.moveTo(ft*32,0),Ce.lineTo(ft*32+128,128),Ce.moveTo(ft*32+128,0),Ce.lineTo(ft*32,128),Ce.stroke()});Ue.repeat.set(Ee*2,3);const qe=new Dt({map:Ue,color:new Be(y.deco),transparent:!0,alphaTest:.4,side:Ls,roughness:.5,metalness:.4});for(const Ce of[-1,1])ie.add(w(h.box,l.laiton,Ce*(Ee/2-.06),Me/2,0,.12,Me,.14));const ke=w(h.tore,l.laiton,0,Me,0,Ee/2-.06,Ee/2-.06,1.4);ke.scale.set(Ee/2-.06,(Ee/2-.06)*1,1.2),ke.geometry=new ji(1,.06,6,24,Math.PI),ie.add(ke);const he=w(h.plan,qe,0,Me*.45,0,Ee-.2,Me*.9,1,!0);ie.add(he),ie.add(w(h.sph,st,0,Me+Ee/2*.98,0,.16,.14,.16))}else if(L.genre==="piste"){const Ee=Gi(128,128,(Me,Ue,qe)=>{for(let ke=0;ke<2;ke++)for(let he=0;he<2;he++)Me.fillStyle=(ke+he)%2?"#EADFC6":"#1F5A4C",Me.fillRect(ke*64,he*64,64,64);Me.strokeStyle="#C9A74E",Me.lineWidth=2;for(const[ke,he]of[[32,32],[96,32],[32,96],[96,96]]){Me.beginPath();for(let Ce=0;Ce<16;Ce++){const ut=Ce/16*Math.PI*2-Math.PI/2,nt=Ce%2?9:22;Me.lineTo(ke+Math.cos(ut)*nt,he+Math.sin(ut)*nt)}Me.closePath(),Me.stroke()}});Ee.repeat.set(L.hw*2,L.hd*2),ie.add(M(w(h.box,new Dt({map:Ee,roughness:.25,metalness:.2}),0,.03,0,L.hw*2,.06,L.hd*2,!1),!1,!0))}else if(L.genre==="buffet"){const Ee=L.hw*2,Me=L.hd*2,Ue=Ee>=Me;ie.add(w(h.box,Ve,0,.3,0,Ee,.6,Me));const qe=Math.max(2,Math.floor((Ue?Ee:Me)/.6));for(let ke=0;ke<qe;ke++){const he=((ke+.5)/qe-.5)*(Ue?Ee:Me)*.9;ie.add(w(h.cyl,l.laiton,Ue?he:0,.64,Ue?0:he,.17,.05,.17),w(h.sph,ke%2?st:l.boisSombre,Ue?he:0,.7,Ue?0:he,.1,.08,.1))}}else if(L.genre==="nawar"){const Ee=L.hw*2,Me=L.hd*2;ie.add(w(h.box,l.boisClair,0,.42,0,Ee,.84,Me),w(h.box,l.boisSombre,0,.86,0,Ee+.04,.04,Me+.04));const Ue=Math.max(3,Math.floor(Me/.32));for(let qe=0;qe<Ue;qe++){const ke=((qe+.5)/Ue-.5)*Me*.92;ie.add(w(h.cyl,l.verre,0,1.02,ke,.09,.26,.09),w(h.cyl,l.laiton,0,1.18,ke,.04,.06,.04,!1))}ie.add(w(h.box,l.boisClair,-Ee*.42,1,0,.05,1.3,Me*.96));for(const qe of[1.15,1.45]){ie.add(w(h.box,l.laiton,-Ee*.3,qe,0,Ee*.28,.025,Me*.94));for(let ke=0;ke<Math.max(3,Math.floor(Me/.4));ke++)ie.add(w(h.cyl,l.verre,-Ee*.3,qe+.1,((ke+.5)/Math.max(3,Math.floor(Me/.4))-.5)*Me*.85,.045,.16,.045,!1))}}else if(!th(ie,L,y)){ie.userData.generique=!0;const Ee=L.h??.6,Me=P(L.id,y);ie.add(w(h.box,new Dt({color:Me,roughness:.7}),0,Ee/2,0,L.hw*2*.95,Ee,L.hd*2*.95)),ie.add(w(h.box,l.laiton,0,Ee+.015,0,L.hw*2*.97,.03,L.hd*2*.97,!1))}const At=new _t(h.box,l.libre);return At.scale.set(L.hw*2+.1,.02,L.hd*2+.1),At.position.y=.012,At.visible=!1,At.userData.zone=!0,ie.add(At),ie.userData={...ie.userData,id:L.id,zone:At,chaises:ge,w:L.hw*2,d:L.hd*2},ie}function U(){for(const L of f.values()){const C=L.userData.zone;xe&&xe.grp===L||(C.material=l.halo,C.visible=!!(v!=null&&v.deplacable))}}let k=new qt;a.add(k);let K=!1,F=null;function Z(L){F&&(a.remove(F),m(F));const C=Ji.find(y=>y.id===L.r.palette)??Ji[0];F=nh(L.r,C,L.nuit),a.add(F)}function j(L){const{r:C}=L,y=Ji.find(Re=>Re.id===C.palette)??Ji[0],ae=C.salle.n,ie=`${C.lieu}|${ae}|${C.palette}`;ie!==x&&(_&&(a.remove(_),m(_)),_=R(C.lieu,ae),a.add(_),x=ie,s.shadow.camera.left=-ae*.85,s.shadow.camera.right=ae*.85,s.shadow.camera.top=ae*.85,s.shadow.camera.bottom=-ae*.85,s.shadow.camera.far=ae*6,s.shadow.camera.updateProjectionMatrix(),s.position.set(ae/2-ae*.5,ae*1.6,ae/2+ae*.8),s.target.position.set(ae/2,0,ae/2),s.target.updateMatrixWorld(),Y(!0));for(const Re of[...k.children])k.remove(Re),m(Re);f.clear(),g=ih(C);for(const Re of g){const Ve=q(Re,C,y,C.lumiere==="bougies"),[st,at]=C.deplacements[Re.id]??[0,0];Ve.position.set(Re.a[0]+st,0,Re.a[1]+at),f.set(Re.id,Ve),k.add(Ve)}for(const Re of le.keys()){const Ve=f.get(Re);Ve&&(Ve.position.y=.18)}U();const ge=["honneur","nawar","piste","t0"].map(Re=>f.get(Re)).filter(Boolean).slice(0,4);c.forEach((Re,Ve)=>{const st=ge[Ve];st?(Re.position.set(st.position.x,1.5,st.position.z),Re.userData.actif=!0,Re.userData.nawar=st.userData.id==="nawar"):Re.userData.actif=!1})}function J(L){const C=L;s.color.copy(di("#FFE2B8","#9AA3C0",C)),s.intensity=fn(1.9,.5,C),u.color.copy(di("#FFE6C8","#9AA3C0",C)),u.groundColor.copy(di("#8A7A66","#2A2E48",C)),u.intensity=fn(1,.65,C),e.style.background=`linear-gradient(180deg, ${di("#F3ECDD","#141414",C).getStyle()}, ${di("#E9DCC2","#1B1A22",C).getStyle()})`,c.forEach(y=>{y.intensity=y.userData.actif?y.userData.nawar?fn(1.8,7,C):fn(.2,7,C):0}),n.toneMappingExposure=fn(1.08,1.1,C),n.shadowMap.needsUpdate=!0}const z={cible:new A(6,.8,6),zoom:1,N:12};let re=null,ue=1,fe=0,Ae=0,Q=new A,se=1;const Se=()=>{Ae=performance.now(),Q.copy(z.cible),se=z.zoom},be=new A(1,Math.tan(Math.PI/6)*Math.SQRT2,1).normalize();function T(){var ot;const L=e.clientWidth||1,C=e.clientHeight||1,y=L/C,ae=z.N;let ie=ae*.76,ge=ie/y;const Re=ae*.36+2.6;ge<Re&&(ge=Re,ie=ge*y);const Ve=y<1.5?.15:0;o.left=-ie/z.zoom,o.right=ie/z.zoom,o.top=ge*(1-2*Ve)/z.zoom,o.bottom=-ge*(1+2*Ve)/z.zoom,o.position.copy(z.cible).addScaledVector(be,80),o.lookAt(z.cible),o.updateProjectionMatrix();const st=D(),at=Math.abs(z.zoom-st)>.06||Math.hypot(z.cible.x-z.N/2,z.cible.z-(z.N/2+(st>1?.4:0)))>.6;at!==S&&(S=at,(ot=t.onDecalee)==null||ot.call(t,at))}let S=!1;const D=()=>{const L=(e.clientWidth||1)/(e.clientHeight||1);return L<1.5?Math.min(1.25,1+(1.5-L)*.4):1};function Y(L=!1){const C=z.N=(v==null?void 0:v.r.salle.n)??12;re=new A(C/2,.8,C/2+(D()>1?.4:0)),ue=D(),fe=L||v!=null&&v.reduit?1:0,Se(),(L||v!=null&&v.reduit)&&(z.cible.copy(re),z.zoom=ue,T()),pe()}function I(L){const C=L.focus?L.r.salle.pos.ANCRES[L.focus.cle]:null;C&&(re=new A(C[0],.5,C[1]),ue=D()>1?Math.max(D(),1.3):1.6,fe=L.reduit?1:0,Se(),L.reduit&&(z.cible.copy(re),z.zoom=ue,T()),pe())}function B(){const L=e.clientWidth,C=e.clientHeight;!L||!C||(n.setSize(L,C,!1),T(),pe())}const b=new ResizeObserver(B);b.observe(e);const H=L=>{var C;L.preventDefault(),(C=t.onPerdu)==null||C.call(t)};i.addEventListener("webglcontextlost",H),i.addEventListener("webglcontextrestored",pe);let V=!1;const le=new Map;let G=null,ne=0,oe=null,ee=0,_e=0;function pe(){V||(V=!0,requestAnimationFrame(Te))}function Te(L){let C=!1;if(re&&fe<1){const y=Math.min(1,(performance.now()-Ae)/600),ae=1-Math.pow(1-y,3);z.cible.lerpVectors(Q,re,ae),z.zoom=fn(se,ue,ae),y>=1&&(fe=1),T(),C=fe<1}if(oe){const y=Math.min(1,(performance.now()-oe.t0)/800),ae=y*y*(3-2*y);ne=fn(oe.de,oe.vers,ae),J(ne),y>=1?oe=null:C=!0}for(const[y,ae]of le){const ie=Math.min(1,(performance.now()-ae.t0)/350),ge=f.get(y);ge&&(ge.position.y=.18*(1-Uo(ie))),n.shadowMap.needsUpdate=!0,ie>=1?(le.delete(y),ge&&(ge.position.y=0)):C=!0}if(G){const y=G,ae=f.get(y.id),ie=performance.now()-y.t0,ge=ae==null?void 0:ae.userData.zone;if(ae&&ge){if(ge.visible=!0,ge.material=l.refusAnim,ie<400)l.refusAnim.opacity=.2+.5*(.5-.5*Math.cos(ie/400*Math.PI*4)),ae.position.set(y.de[0],.18,y.de[1]);else if(ie<760){const Re=(ie-400)/360,Ve=Uo(Re);ae.position.set(fn(y.de[0],y.vers[0],Ve),.18*(1-Ve),fn(y.de[1],y.vers[1],Ve)),l.refusAnim.opacity=.45}else ie<880?(ae.position.set(y.vers[0],0,y.vers[1]),l.refusAnim.opacity=.45*(1-(ie-760)/120)):(ae.position.set(y.vers[0],0,y.vers[1]),G=null,U());n.shadowMap.needsUpdate=!0}else G=null;G&&(C=!0)}xe&&(C=!0),n.render(a,o),ee=n.info.render.calls,_e=n.info.render.triangles,C?requestAnimationFrame(Te):V=!1}const Le=new $u,je=new ze,Ye=new Pn(new A(0,1,0),0);let xe=null;const Ke=(L,C)=>{const y=i.getBoundingClientRect();je.set((L-y.left)/y.width*2-1,-((C-y.top)/y.height)*2+1),Le.setFromCamera(je,o);const ae=new A;return Le.ray.intersectPlane(Ye,ae)?ae:null};function et(L,C){var Ve,st;const y=i.getBoundingClientRect();je.set((L-y.left)/y.width*2-1,-((C-y.top)/y.height)*2+1),Le.setFromCamera(je,o);const ae=Le.intersectObjects(k.children,!0);for(const at of ae){let ot=at.object;for(;ot&&!((Ve=ot.userData)!=null&&Ve.id);)ot=ot.parent;if((st=ot==null?void 0:ot.userData)!=null&&st.id)return ot.userData.id}const ie=Ke(L,C);if(!ie||!v)return null;let ge=null,Re=1e9;for(const at of g){const[ot,At]=v.r.deplacements[at.id]??[0,0],Ee=at.a[0]+ot,Me=at.a[1]+At,Ue=.25;if(Math.abs(ie.x-Ee)<=at.hw+Ue&&Math.abs(ie.z-Me)<=at.hd+Ue){const qe=Math.hypot(ie.x-Ee,ie.z-Me);qe<Re&&(Re=qe,ge=at.id)}}return ge}const Qe=new Map;let me=null,Oe=null;const tt=()=>{const[L,C]=[...Qe.values()];return Math.hypot(L.x-C.x,L.y-C.y)||1};function Jn(){const L=xe;if(xe=null,!L)return;const C=g.find(y=>y.id===L.id);L.grp.position.set(C.a[0]+L.depart[0],0,C.a[1]+L.depart[1]),U(),n.shadowMap.needsUpdate=!0}const Mn=()=>{const L=z.N;z.cible.x=Math.max(0,Math.min(L,z.cible.x)),z.cible.z=Math.max(0,Math.min(L,z.cible.z))};i.addEventListener("pointerdown",L=>{if(!v)return;Qe.set(L.pointerId,{x:L.clientX,y:L.clientY});try{i.setPointerCapture(L.pointerId)}catch{}if(re=null,fe=1,Qe.size===2){Jn(),Oe=null,me={d0:tt(),z0:z.zoom};return}if(Qe.size>2)return;const C=v.deplacable?et(L.clientX,L.clientY):null,y=C?f.get(C):null,ae=Ke(L.clientX,L.clientY);if(!ae)return;if(L.preventDefault(),!C||!y){Oe={p:ae};return}const ie=g.find(Re=>Re.id===C),ge=v.r.deplacements[C]??[0,0];xe={id:C,grp:y,depart:ge,decal:new A(ae.x-(ie.a[0]+ge[0]),0,ae.z-(ie.a[1]+ge[1])),dernier:ge,bloque:!1,pointeur:L.pointerId},y.position.y=.18,y.userData.zone.visible=!0,y.userData.zone.material=l.libre,n.shadowMap.needsUpdate=!0,pe()}),i.addEventListener("pointermove",L=>{if(Qe.has(L.pointerId)&&Qe.set(L.pointerId,{x:L.clientX,y:L.clientY}),me&&Qe.size>=2){z.zoom=Math.max(.9,Math.min(3.2,me.z0*tt()/me.d0)),T(),pe();return}if(Oe){const Ve=Ke(L.clientX,L.clientY);if(!Ve)return;z.cible.x+=Oe.p.x-Ve.x,z.cible.z+=Oe.p.z-Ve.z,Mn(),T(),pe();return}const C=xe;if(!C||!v)return;const y=Ke(L.clientX,L.clientY),ae=g.find(Ve=>Ve.id===C.id),ie=v.r.salle.n;if(!y)return;let ge=y.x-C.decal.x-ae.a[0],Re=y.z-C.decal.z-ae.a[1];ge=Math.round(ge*4)/4,Re=Math.round(Re*4)/4,ge=Math.max(.6-ae.a[0],Math.min(ie-.6-ae.a[0],ge)),Re=Math.max(.6-ae.a[1],Math.min(ie-.6-ae.a[1],Re)),(ge!==C.dernier[0]||Re!==C.dernier[1])&&(C.dernier=[ge,Re],C.grp.position.x=ae.a[0]+ge,C.grp.position.z=ae.a[1]+Re,C.bloque=rh(C.id,ge,Re,g,v.r),C.grp.userData.zone.material=C.bloque?l.refus:l.libre,n.shadowMap.needsUpdate=!0),pe()});function wt(L){Qe.delete(L.pointerId);try{i.releasePointerCapture(L.pointerId)}catch{}if(me){Qe.size<2&&(me=null);return}Oe=null;const C=xe;if(xe=null,!C||!v)return;const y=g.find(ie=>ie.id===C.id),ae=[y.a[0]+C.depart[0],y.a[1]+C.depart[1]];C.bloque?(t.onRefus(),v.reduit?(C.grp.position.set(ae[0],0,ae[1]),U()):G={id:C.id,t0:performance.now(),de:[y.a[0]+C.dernier[0],y.a[1]+C.dernier[1]],vers:ae}):(C.grp.userData.zone.material=l.halo,C.grp.userData.zone.visible=v.deplacable,(C.dernier[0]!==C.depart[0]||C.dernier[1]!==C.depart[1])&&t.onDeplacer(C.id,C.dernier[0],C.dernier[1]),v.reduit?C.grp.position.y=0:le.set(C.id,{t0:performance.now()})),n.shadowMap.needsUpdate=!0,pe()}return i.addEventListener("pointerup",wt),i.addEventListener("pointercancel",wt),i.addEventListener("wheel",L=>{L.preventDefault(),ue=Math.max(.9,Math.min(3.2,z.zoom*(L.deltaY<0?1.12:.9))),z.zoom=ue,re=null,fe=1,T(),pe()},{passive:!1}),i.addEventListener("dblclick",()=>Y()),{maj(L){var y;const C=v;v=L,(!C||C.r!==L.r)&&j(L),C&&C.nuit!==L.nuit&&(L.reduit?(ne=L.nuit,oe=null):oe={t0:performance.now(),de:ne,vers:L.nuit}),C||(ne=L.nuit),(!C||C.nuit!==L.nuit||C.r!==L.r)&&(J(ne),(!C||C.r!==L.r||C.nuit>.5!=L.nuit>.5)&&Z(L)),i.style.touchAction="none",C&&C.deplacable!==L.deplacable&&U(),L.focus&&C&&((y=C.focus)==null?void 0:y.n)!==L.focus.n&&I(L),i.style.cursor=L.deplacable?"grab":"default",K||(K=!0,B()),pe()},vueEnsemble:()=>Y(),position:L=>{const C=f.get(L);return C?[C.position.x,C.position.z]:null},ecran:(L,C)=>{const y=new A(L,0,C).project(o),ae=i.getBoundingClientRect();return[ae.left+(y.x+1)/2*ae.width,ae.top+(1-y.y)/2*ae.height]},ecranObjet:L=>{const C=f.get(L);if(!C)return null;const y=new A(C.position.x,.3,C.position.z).project(o),ae=i.getBoundingClientRect();return[ae.left+(y.x+1)/2*ae.width,ae.top+(1-y.y)/2*ae.height]},generiques:()=>[...f.values()].filter(L=>L.userData.generique).map(L=>L.userData.id),chaises:L=>{var C;return((C=f.get(L))==null?void 0:C.userData.chaises)??[]},dims:L=>{var y;const C=(y=f.get(L))==null?void 0:y.userData;return C?{w:C.w,d:C.d}:null},vers(L,C){const y=f.get(L);y&&(re=null,fe=1,z.cible.set(y.position.x,.4,y.position.z),z.zoom=C,T(),pe())},sous:(L,C)=>et(L,C),stats:()=>({appels:ee,triangles:_e,objets:g.length,zoom:+z.zoom.toFixed(3),cible:[+z.cible.x.toFixed(2),+z.cible.z.toFixed(2)]}),detruire(){b.disconnect(),i.removeEventListener("webglcontextlost",H),i.removeEventListener("webglcontextrestored",pe);for(const L of[_,F,k])L&&m(L);eh();for(const L of Object.values(l))L.dispose();for(const L of Object.values(h))L.dispose();d.dispose(),p.dispose(),n.dispose(),n.forceContextLoss()}}}export{fh as creerMoteur};
