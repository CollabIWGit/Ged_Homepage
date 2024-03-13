import { Version } from "@microsoft/sp-core-library";
import $ from "jquery";
import {
  type IPropertyPaneConfiguration,
  PropertyPaneTextField,
} from "@microsoft/sp-property-pane";
import { BaseClientSideWebPart } from "@microsoft/sp-webpart-base";
import type { IReadonlyTheme } from "@microsoft/sp-component-base";
import { escape } from "@microsoft/sp-lodash-subset";

import { MSGraphClientV3 } from "@microsoft/sp-http";
import styles from "./HomePageWebPart.module.scss";
import * as strings from "HomePageWebPartStrings";
// import 'bootstrap/dist/js/bootstrap.bundle.min';

// import 'bootstrap/dist/css/bootstrap.css';

import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/site-users/web";
import { sp, Web } from "@pnp/sp/presets/all";
import { SPComponentLoader } from "@microsoft/sp-loader";

import Swiper, {
  Navigation,
  Pagination,
  Grid,
  Autoplay,
  EffectFade,
} from "swiper";

Swiper.use([Navigation, Pagination, Grid, Autoplay, EffectFade]);

import * as _ from "lodash";

SPComponentLoader.loadScript(
  "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js"
);
SPComponentLoader.loadScript(
  "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.1/gsap.min.js"
);
SPComponentLoader.loadScript(
  "https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.2/TweenMax.min.js"
);
SPComponentLoader.loadScript(
  "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.1/CSSRulePlugin.min.js"
);
SPComponentLoader.loadScript(
  "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.6.1/ScrollTrigger.min.js"
);
SPComponentLoader.loadCss("https://unpkg.com/swiper@7/swiper-bundle.min.css");

export interface IHomepageWebPartProps {
  description: string;
}

export default class HomepageWebPart extends BaseClientSideWebPart<IHomepageWebPartProps> {
  [x: string]: any;

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = "";
  private graphClient: MSGraphClientV3;

  protected onInit(): Promise<void> {
    // this._environmentMessage = this._getEnvironmentMessage();
    // sp.setup({
    //     spfxContext: this.context
    // });

    // this._environmentMessage = this._getEnvironmentMessage();

    return new Promise<void>(
      (resolve: () => void, reject: (error: any) => void): void => {
        // this.user = this.context.pageContext.user;
        // sp.setup({
        //     spfxContext: this.context
        // });

        this.context.msGraphClientFactory.getClient("3").then(
          (client: MSGraphClientV3): void => {
            this.graphClient = client;
            resolve();
          },
          (err) => reject(err)
        );

        // this.context.msGraphClientFactory.getClient('3').then((client: MSGraphClientV3):void => {
        //         // get information about the current user from the Microsoft Graph
        //         client.api(
        //             '/me/transitiveMemberOf/microsoft.graph.group?$count=true&$top=999'
        //         ).get(
        //             (error: any, response: any, rawResponse?: any) => {
        //                 // handle the response
        //             });
        //     });
      }
    );
  }

  public render(): void {
    this.domElement.innerHTML = ` 
        <main>
            <div class="main-container w100">
                <section class="banner-section w100">
                    <div class="swiper">
                        <div class="swiper-wrapper" id="swiper_image"></div>
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-button-next"></div>
                    </div>  
                </section>

                <section class="cta-mg-section w100">
                    <div class="inner-ctamg-section w100 cnt-80 flex-basic" style="z-index: 121;" id="catBtn"></div>
                </section>

                <section class="mg-text-section w100 pda-75">
                    <div class="inner-mg-text w100 cnt-85 pda-50">
                        <div class="mg-text-bloc w100 cnt-95 flex-basic">
                            <div class="mg-text-repeated">
                                <!-- for mobile only -->
                                <div class="cta-mg-repeated">
                                    <a href="javascript:void(0)" style="background-image: url('${require<string>("./../../common/images/bg-cta1.png")}')">
                                        Divers
                                    </a>
                                </div>
                                <!-- end for mobile only -->
                                <div class="mg-cta-repeated w100" id="list1"></div>
                            </div>
                            <div class="mg-text-repeated">
                                <!-- for mobile only -->
                                <div class="cta-mg-repeated">
                                    <a href="javascript:void(0)" style="background-image: url('${require<string>("./../../common/images/bg-cta2.png")}')">
                                        Divers
                                    </a>
                                </div>
                                <!-- end for mobile only -->
                                <div class="mg-cta-repeated w100" id="list2"></div>
                            </div>
                            <div class="mg-text-repeated">
                                <!-- for mobile only -->
                                <div class="cta-mg-repeated">
                                    <a href="javascript:void(0)" style="background-image: url('${require<string>("./../../common/images/bg-cta3.png")}')">
                                        Divers
                                    </a>
                                </div>
                                <!-- end for mobile only -->
                                <div class="mg-cta-repeated w100" id="list3"></div>
                            </div>   
                            <div class="mg-text-repeated">
                                <!-- for mobile only -->
                                <div class="cta-mg-repeated">
                                    <a href="javascript:void(0)" style="background-image: url('${require<string>("./../../common/images/bg-cta4.png")}')">
                                        Divers
                                    </a>
                                </div>
                                <!-- end for mobile only -->
                                <div class="mg-cta-repeated w100" id="list4"></div>  
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <footer class="w100">
                <div class="footer-top w100 cnt-75">
                    © 2022 MyAircalin
                </div>
                <div class="footer-bottom w100">
                    <img src= "${require<string>("./../../common/images/img-footer-bottom.png")}" class="img-responsive" alt="">
                </div>
            </footer>
        </main>`;

    // require('./../../../lib/common/css/bootstrap/mi');
    // require('./../../../common/css/basic.css');
    require("./../../common/css/media.css");
    require("./../../common/css/basic.css");
    require("./../../common/css/global.css");
    require("./../../common/css/common.css");
    // require('./../../common/css/qlf5ifj.css');
    require("./../../common/js/jquery.min");
    require("./../../common/js/popper");
    // require('./../../common/js/bootstrap.min');
    require("./../../common/js/main");
    require("./../../common/js/custom.js");
    setTimeout(() => {
      require("./../../common/js/animation.js");
    }, 2000);

    this._renderNavImage();
    this._renderCatBtn();
    this._getBuildingsList();
    // this.hideWheel();
    $(document).ready(() => {
      var isAdmin = this.checkIfUserIsAdmin(this.graphClient);
      if (isAdmin) {
        // Hide the SharePoint wheel or spinner
        $("#O365_MainLink_Settings_container").css("display", "block");
      }
    });
  }

  //API to get navImage
  private async _getNavImage(): Promise<any> {
    //  const response = await this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + "/_api/web/lists/GetByTitle('PageDaccueilPhoto')/Items", SPHttpClient.configurations.v1);
    // const response: any[] = (await sp.web.lists.getByTitle("PageDaccueilPhoto").items.orderBy("Order", false).get());
    let web = Web(this.context.pageContext.web.absoluteUrl);
    const response: any[] = await web.lists
      .getByTitle("PageDaccueilPhoto")
      .items.orderBy("Order", false)
      .get();
    // console.log("order", response.sort);
    return response;
    // return await response.json();
  }

  private _renderNavImage(): void {
    const listContainerImage: Element =
      this.domElement.querySelector(".swiper-wrapper");

    let swiper_html: string = "";

    this._getNavImage()
      .then(async (response) => {
        // console.log("IMAGE", response);

        response.forEach(
          (item: {
            Image: string;
            PositionVerticale: any;
            PositionHorizontale: any;
          }) => {
            const imageJson = JSON.parse(item.Image).serverRelativeUrl;
            // console.log("JSONIMAGE", imageJson);
            let html = ` <div class="swiper-slide">
                    <div style="background-image: url('https://ncaircalin.sharepoint.com/${imageJson}'); background-position: ${item.PositionVerticale}% ${item.PositionHorizontale}%" class="banner">
                    </div>
                </div>`;
            swiper_html += html;
          }
        );
        listContainerImage.innerHTML = swiper_html;
      })
      .then(() => {
        this._swipe();
      });
  }

  private _swipe() {
    const swipercol = new Swiper(".swiper", {
      slidesPerView: 1,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      loop: true,
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },
    });
  }

  private _getBuildingsList() {
    var arrayLinks: any[];

    let html1: string = "";
    let html2: string = "";
    let html3: string = "";
    let html4: string = "";

    return new Promise(async (resolve, reject) => {
      try {
        let web = Web(this.context.pageContext.web.absoluteUrl);
        const response: any[] = await web.lists
          .getByTitle("HomepageLinks")
          .items();
        // console.log("RESPONSE", response);
        arrayLinks = response;
        // if ((item.Order === 1) || (item.Order === 2 )|| ( item.Order === 3 ) || (item.Order === 4) || (item.Order === 5 ) ) {
        arrayLinks.forEach((item: any) => {
          // console.log("URL", item.url);
          // if ((item.order0 == "1") || (item.order0 == "2") || (item.order0 == "3") || (item.order0 == "4") || (item.order0 == "5")) {
          if (item.linksType == "Divers") {
            // console.log("ORDER 1-5" , item.title);
            html1 += `<a class="w100 flex-basic flex-justify-center flex-align-center" onclick='window.open("${item.url}");return false;'>
                                        <div class="info-emploi-text w85">
                                            <div class="info-emploi-title">
                                                > ${item.Title}
                                            </div>
                                        </div>`;
          }
          // else if ((item.Order === 6) || (item.Order === 7) || (item.Order === 8) || (item.Order === 9)) {
          // else if ((item.order0 == "6") || (item.order0 == "7") || (item.order0 == "8") || (item.order0 == "9")) {
          else if (item.linksType == "Documentation") {
            html2 += `<a class="w100 flex-basic flex-justify-center flex-align-center" onclick='window.open("${item.url}");return false;'>
                                        <div class="info-emploi-text w85">
                                            <div class="info-emploi-title">
                                                > ${item.Title}
                                            </div>
                                        </div>`;
          }
          // else if ((item.Order === 10) || (item.Order === 11)) {
          // else if ((item.order0 == "10") || (item.order0 == "11")) {
          else if (item.linksType == "Crise") {
            html3 += `<a class="w100 flex-basic flex-justify-center flex-align-center" onclick='window.open("${item.url}");return false;'>
                                        <div class="info-emploi-text w85">
                                            <div class="info-emploi-title">
                                                > ${item.Title}
                                            </div>
                                        </div>`;
          } else {
            if (item.linksType == "PNT") {
              html4 += `<a class="w100 flex-basic flex-justify-center flex-align-center" onclick='window.open("${item.url}");return false;'>
                                        <div class="info-emploi-text w85">
                                            <div class="info-emploi-title">
                                                > ${item.Title}
                                            </div>
                                        </div>`;
            }
          }
        });

        const listContainer1: Element = this.domElement.querySelector("#list1");
        listContainer1.innerHTML += html1;

        const listContainer2: Element = this.domElement.querySelector("#list2");
        listContainer2.innerHTML += html2;

        const listContainer3: Element = this.domElement.querySelector("#list3");
        listContainer3.innerHTML += html3;

        const listContainer4: Element = this.domElement.querySelector("#list4");
        listContainer4.innerHTML += html4;

        // });
        // });
      } catch (error) {
        console.log(error);
        reject(error);
      }
    });
  }

  public hideWheel(): void {
    const accueilUrl2: string =
      "https://ncaircalin.sharepoint.com/sites/TestMyGed";
    const accueilUrl: string = "https://ncaircalin.sharepoint.com/sites/MyGed";

    // Check if the current URL matches accueilUrl2
    if (window.location.href.match(accueilUrl2)) {
      var isAdmin = this.checkIfUserIsAdmin(this.graphClient);
      if (isAdmin) {
        // Hide the SharePoint wheel or spinner
        $("#O365_MainLink_Settings_container").css("display", "none");
        console.log("testMyGed");
      }
    }
    // Call the hideWheel function when the document is ready
    $(document).ready(() => {
      this.hideWheel();
    });
  }

  public async checkIfUserIsAdmin(
    graphClient: MSGraphClientV3
  ): Promise<boolean> {
    try {
      const groups = await graphClient
        .api(
          "/me/transitiveMemberOf/microsoft.graph.group?$count=true&$top=999"
        )
        .get();
      const groupList = groups.value;

      if (!groupList.length) {
        return false;
      }

      const isAdmin = groupList.some(
        (group: { displayName: string }) => group.displayName === "MYGED_ADMIN"
      );
      const isRefUser = groupList.some(
        (group: { displayName: { startsWith: (arg0: string) => any } }) =>
          group.displayName.startsWith("MYGED_REF")
      );
      const isGuestUser = groupList.some(
        (group: { displayName: { startsWith: (arg0: string) => any } }) =>
          group.displayName.startsWith("MYGED_GUEST")
      );

      return isAdmin || isRefUser || isGuestUser;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  private async _renderCatBtn() {
    let web = Web(this.context.pageContext.web.absoluteUrl);
    const items = await web.lists
      .getByTitle("HomepageCatergoryLinks")
      .items.get();
    let htmlcatBtn = "";
    const catBtn: Element = this.domElement.querySelector("#catBtn");
    items.forEach((element: { Title: any; url: any; bgImage: any }) => {
      element = {
        Title: element.Title,
        url: element.url,
        bgImage: element.bgImage,
      };
      const imageJson2 = JSON.parse(element.bgImage).serverRelativeUrl;
      if (imageJson2 != null) {
        htmlcatBtn += `
                <div class="cta-mg-repeated">
                    <a href="${element.url}" style="background-image: url('https://ncaircalin.sharepoint.com/${imageJson2}')">
                        ${element.Title}
                    </a>
                </div>`;
      } else if (imageJson2 == null) {
        htmlcatBtn += `
                <div class="cta-mg-repeated">
                    <a href="${element.url
          }" style="background-image: url('${require<string>("./../../common/images/bg-cta4.png")}')">
                        ${element.Title}
                    </a>
                </div>`;
      }
      console.log("url", element.url);
    });
    catBtn.innerHTML += htmlcatBtn;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const { semanticColors } = currentTheme;
    this.domElement.style.setProperty("--bodyText", semanticColors.bodyText);
    this.domElement.style.setProperty("--link", semanticColors.link);
    this.domElement.style.setProperty(
      "--linkHovered",
      semanticColors.linkHovered
    );
  }

  // protected get dataVersion(): Version {
  //         return Version.parse('1.0');
  //     }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription,
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField("description", {
                  label: strings.DescriptionFieldLabel,
                }),
              ],
            },
          ],
        },
      ],
    };
  }
}
