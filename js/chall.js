require([
	"esri/domUtils",
	"esri/IdentityManager",
	"esri/arcgis/OAuthInfo",
	"esri/arcgis/Portal",
	"esri/request",

	"dojo/on",
	"dojo/dom",
	"dojo/dom-construct",
	"dojo/dom-style",
	"dojo/dom-attr",
	"dojo/dom-class"], function(domUtils, esriId, OAuthInfo, arcgisPortal, Request, on, dom, domConstruct, domStyle, domAttr, domClass){

		var info = new OAuthInfo({
					appId: "4TxsL8jXQ8G0MAeL",
					portalUrl: "https://arcgis.com",
					popup: false
				});
		//setting up 
		esriId.registerOAuthInfos([info]);

		esriId.checkSignInStatus(info.portalUrl + "/sharing").then(function(result){
			test(result);
		});


		on(dom.byId("sign-in"), "click", function(){
			esriId.getCredential(info.portalUrl + "/sharing", {
				oAuthPopupConfirmation: false
			}
			).then(function(result){
				domStyle.set("panel", "display", "block");
				domStyle.set("stop", "display", "none");
				dom.byId("title").innerHTML = "Welcome " + result.userId
				console.log(result);


				test(result);
			});
		});
//portal.urlkey
		function test(credResults){
			var request = new Request({
				url: "https://www.arcgis.com/sharing/rest/content/users/" + credResults.userId,
				content: {f: "json"},
				handleAs: "json",
				callbackParamName: "callback"
			});

			request.then(function(result){
				console.log(result)
			}, function(error){
				console.log(error);
			});
		}





	})