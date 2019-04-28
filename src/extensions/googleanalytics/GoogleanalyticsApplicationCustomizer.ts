import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'GoogleanalyticsApplicationCustomizerStrings';

const LOG_SOURCE: string = 'GoogleanalyticsApplicationCustomizer';

/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IGoogleanalyticsApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
  trackingID: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class GoogleanalyticsApplicationCustomizer
  extends BaseApplicationCustomizer<IGoogleanalyticsApplicationCustomizerProperties> {

  @override
  public onInit(): Promise<void> {
    Log.info(LOG_SOURCE, `Initialized ${strings.Title}`);
    console.log("It begins");
    // let message: string = this.properties.testMessage;
    // if (!message) {
    //   message = '(No properties were provided.)';
    // }

    // Dialog.alert(`Hello re ${strings.Title}:\n\n${message}`);
    let trackingID: string = "UA-139125641-1";
	if (!trackingID) {
    Log.info(LOG_SOURCE, "Tracking ID not provided");
    console.log("not found tracking"+ this.properties.trackingID);
	}else{
    console.log("Started analytics")
		var gtagScript = document.createElement("script");
		gtagScript.type = "text/javascript";
		gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${trackingID}`;    
		gtagScript.async = true;
		document.head.appendChild(gtagScript);  
 
		eval(`
			window.dataLayer = window.dataLayer || [];
			function gtag(){dataLayer.push(arguments);}
			gtag('js', new Date());    
			gtag('config',  '${trackingID}');
		`);
	}

    return Promise.resolve();
  }

  // @override
  // public onRender():void{
  //   console.log("Google Started rendering");
  //   let script2:HTMLScriptElement;
  //   let script:HTMLScriptElement;
  //   let html:string = '';
  //   html += `
  //   window.dataLayer = window.dataLayer || [];
  //   function gtag(){dataLayer.push(arguments);}
  //   gtag('js', new Date());
  //   gtag('config', 'UA-139125641-1');`;
  //   let head: any = document.getElementsByTagName("head")[0] || document.documentElement;

  //   script = document.createElement("script");
  //   script.type = "text/javascript";

  //   // script2 = document.createElement("script");
  //   // script2.async = true;
  //   // script2.src="https://www.googletagmanager.com/gtag/js?id=UA-139125641-1";

  //   // try{
  //   //   //append first script
  //   //   script2.appendChild(document);
  //   // }
  //   // catch{
  //   //   console.log("could not append asyn script");
  //   // }

  //   try {
  //     console.log('Google:Append child');
  //     script.appendChild(document.createTextNode(html));
  // } 
  // catch (e) {
  //     console.log('Google:Append child catch');
  //     script.text = html;
  // }
  // // head.insertBefore(script2, head.firstChild);
  // head.insertBefore(script, head.firstChild);
  // head.removeChild(script);
//   }
// @override
//   public onRender(): void {
//    let html: string = '';
//     html+= `var appInsights=window.appInsights||function(config){
//               function i(config){t[config]=function(){var i=arguments;t.queue.push(function(){t[config].apply(t,i)})}}var t={config:config},u=document,e=window,o="script",s="AuthenticatedUserContext",h="start",c="stop",l="Track",a=l+"Event",v=l+"Page",y=u.createElement(o),r,f;y.src=config.url||"https://az416426.vo.msecnd.net/scripts/a/ai.0.js";u.getElementsByTagName(o)[0].parentNode.appendChild(y);try{t.cookie=u.cookie}catch(p){}for(t.queue=[],t.version="1.0",r=["Event","Exception","Metric","PageView","Trace","Dependency"];r.length;)i("track"+r.pop());return i("set"+s),i("clear"+s),i(h+a),i(c+a),i(h+v),i(c+v),i("flush"),config.disableExceptionTracking||(r="onerror",i("_"+r),f=e[r],e[r]=function(config,i,u,e,o){var s=f&&f(config,i,u,e,o);return s!==!0&&t["_"+r](config,i,u,e,o),s}),t
//               }({
//                   instrumentationKey:"",
//                   enableDebug: true,
//               })
//               window.appInsights=appInsights;
//               appInsights.trackPageView();`;
//     let head: any = document.getElementsByTagName("head")[0] || document.documentElement,
//     script = document.createElement("script");
//     script.type = "text/javascript";

//     try {
//         // doesn't work on ie...
//         console.log('Append child');
//         script.appendChild(document.createTextNode(html));
//     } 
//     catch (e) {
//         // IE has funky script nodes
//         console.log('Append child catch');
//         script.text = html;
//     }

//     console.log('Right before inserting');
//     head.insertBefore(script, head.firstChild);
//     console.log('Before executing');
//     head.removeChild(script);
//   }
}
