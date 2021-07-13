!(function() {
    "use strict";
    const t = {
        "color-gull-gray": "#9db2bd",
        "color-brand": "#2962FF",
        "color-brand-hover": "#1E53E5",
        "color-brand-active": "#1848CC",
    };
    const e = document.createElement("a");

    function r(t) {
        (e.href = t), e.host || (e.href = e.href);
        let { host: r, pathname: i } = e;
        return (
            "http:" === e.protocol && (r = r.replace(/:80$/, "")),
            "https:" === e.protocol && (r = r.replace(/:443$/, "")),
            (i = ("/" === e.pathname[0] ? "" : "/") + e.pathname), { host: r, pathname: i, href: e.href }
        );
    }
    var i,
        n,
        s = {
            "crypto-mkt-screener": {
                width: 1e3,
                height: 490,
                defaultColumn: "overview",
                market: "crypto",
                screener_type: "crypto_mkt",
                displayCurrency: "USD",
                isTransparent: !1,
            },
            events: {
                width: 510,
                height: 600,
                isTransparent: !1,
                hideImportanceIndicator: !1,
                autosize: !1,
            },
            "forex-cross-rates": {
                width: 770,
                height: 400,
                isTransparent: !1,
                currencies: [
                    "EUR",
                    "USD",
                    "JPY",
                    "GBP",
                    "CHF",
                    "AUD",
                    "CAD",
                    "NZD",
                    "CNY",
                ],
                frameElementId: null,
                autosize: !1,
            },
            "forex-heat-map": {
                width: 770,
                height: 400,
                isTransparent: !1,
                currencies: [
                    "EUR",
                    "USD",
                    "JPY",
                    "GBP",
                    "CHF",
                    "AUD",
                    "CAD",
                    "NZD",
                    "CNY",
                ],
                frameElementId: null,
                autosize: !1,
            },
            hotlists: {
                width: 400,
                height: 600,
                isTransparent: !1,
                dateRange: "12M",
                showSymbolLogo: !1,
            },
            "market-overview": {
                width: 400,
                height: 650,
                isTransparent: !1,
                dateRange: "12M",
                showSymbolLogo: !0,
            },
            "market-quotes": {
                width: 770,
                height: 450,
                isTransparent: !1,
                showSymbolLogo: !1,
            },
            "mini-symbol-overview": {
                width: 350,
                height: 220,
                symbol: "FX:EURUSD",
                dateRange: "12M",
                trendLineColor: "rgba(41, 98, 255, 1)",
                underLineColor: "rgba(41, 98, 255, 0.3)",
                underLineBottomColor: "rgba(41, 98, 255, 0)",
                isTransparent: !1,
                autosize: !1,
                largeChartUrl: "",
            },
            screener: {
                width: 1100,
                height: 523,
                defaultColumn: "overview",
                defaultScreen: "general",
                market: "forex",
                showToolbar: !0,
                isTransparent: !1,
            },
            "single-quote": { width: 350, symbol: "FX:EURUSD", isTransparent: !1 },
            "symbol-profile": {
                width: 480,
                height: 650,
                symbol: "NASDAQ:AAPL",
                isTransparent: !1,
            },
            "symbol-info": { width: 1e3, symbol: "NASDAQ:AAPL", isTransparent: !1 },
            "technical-analysis": {
                interval: "1m",
                width: 425,
                isTransparent: !1,
                height: 450,
                symbol: "NASDAQ:AAPL",
                showIntervalTabs: !0,
            },
            "ticker-tape": {
                isTransparent: !1,
                displayMode: "adaptive",
                showSymbolLogo: !1,
            },
            tickers: { isTransparent: !1, showSymbolLogo: !1 },
            financials: {
                width: 480,
                height: 830,
                autosize: !1,
                symbol: "NASDAQ:AAPL",
                isTransparent: !1,
                displayMode: "regular",
                largeChartUrl: "",
            },
            timeline: {
                width: 480,
                height: 830,
                autosize: !1,
                isTransparent: !1,
                displayMode: "regular",
            },
        };
    !(function(t) {
        let e;
        !(function(t) {
            (t.SetSymbol = "set-symbol"), (t.SetInterval = "set-interval");
        })((e = t.Names || (t.Names = {})));
    })(i || (i = {})),
    (function(t) {
        let e;
        !(function(t) {
            (t.SymbolClick = "tv-widget-symbol-click"),
            (t.WidgetLoad = "tv-widget-load"),
            (t.ResizeIframe = "tv-widget-resize-iframe"),
            (t.NoData = "tv-widget-no-data");
        })((e = t.Names || (t.Names = {})));
    })(n || (n = {}));
    const o = ["locale", "symbol"];
    new(class extends class {
        constructor() {
            this._getScriptsInfo().forEach((t) => {
                this._replaceScript(t);
            });
        }
        get widgetId() {
            throw new Error("Method must be overridden");
        }
        get widgetUtmName() {
            return this.widgetId;
        }
        get defaultSettings() {
            return s[this.widgetId];
        }
        get propertiesToWorkWith() {
            return [];
        }
        get useWidgetHostForProduction() {
            return !1;
        }
        filterRawSettings(t) {
            const e = {};
            return (
                Object.keys(t).forEach((r) => {
                    -1 !== this.propertiesToWorkWith.indexOf(r) && (e[r] = t[r]);
                }),
                e
            );
        }
        get propertiesToSkipInHash() {
            return ["customer", "locale"];
        }
        get propertiesToAddToGetParams() {
            return ["locale"];
        }
        _getScriptsInfo() {
            const t = (function() {
                if (document.currentScript) return document.currentScript.src;
                const t = document.getElementsByTagName("script");
                for (let r = 0; r < t.length; r++)
                    if ("interactive" === t[r].readyState) return t[r].src;
                try {
                    throw new Error();
                } catch (e) {
                    const t = /\((.*?):\d+:\d+\)\s*$/m.exec(e.stack);
                    if (t) return t[1];
                }
                return null;
            })();
            if (!t)
                return (
                    console.error(
                        "Could not self-replace the script, widget embedding has been aborted"
                    ), []
                );
            const { host: e, href: i } = r(t),
                n = document.getElementsByTagName("script"),
                s = [];
            for (let a = 0; a < n.length; a++) {
                const t = n.item(a);
                t.src && r(t.src).href === i && s.push(t);
            }
            const o = (function(t = location.host) {
                return -1 !== [
                        "i18n.tradingview.com",
                        "partial.tradingview.com",
                        "www.tradingview.com",
                        "wwwcn.tradingview.com",
                    ].indexOf(t) ||
                    -1 !== [
                        "d33t3vvu2t2yu5.cloudfront.net",
                        "dwq4do82y8xi7.cloudfront.net",
                        "s.tradingview.com",
                        "s3.tradingview.com",
                    ].indexOf(t) ||
                    t.match(/^[a-z]{2}\.tradingview\.com/) ||
                    t.match(/prod-[^.]+.tradingview.com/) ?
                    "battle" :
                    t.includes("tradingview.com") || t.includes("staging") ?
                    "staging" :
                    t.match(/webcharts/) ?
                    "staging_local" :
                    (t.match(/^localhost(:\d+)?$/), "local");
            })(e);
            return s.map((t) => ({ scriptHost: e, scriptEnv: o, scriptElement: t }));
        }
        _replaceScript(e) {
            const { scriptEnv: r, scriptHost: i, scriptElement: s } = e;
            this.script = s;
            const o = this._scriptContentToJSON(),
                a = (function(t) {
                    if (null === t) return null;
                    const e = t.querySelector("#tradingview-copyright"),
                        r = t.querySelector("#tradingview-quotes"),
                        i = e || r;
                    return i && t.removeChild(i), i;
                })(this.script.parentNode),
                c = !!this.script.parentNode.querySelector(
                    ".tradingview-widget-copyright"
                );
            (this.hasCopyright = a || c),
            o && (this.settings = this.filterRawSettings(o)),
                (o && this._isValidSettings()) ||
                (console.error("Invalid settings provided, fall back to defaults"),
                    (this.settings = this.filterRawSettings(this.defaultSettings)));
            const h = "32px",
                l = isNaN(this.settings.height) ?
                this.settings.height :
                this.settings.height + "px",
                d = isNaN(this.settings.width) ?
                this.settings.width :
                this.settings.width + "px",
                g = this.script.parentNode.classList.contains(
                    "tradingview-widget-container"
                );
            this.script.parentNode && g ?
                (this.iframeContainer = this.script.parentNode) :
                (this.iframeContainer = document.createElement("div")),
                (this.iframeContainer.style.width = d),
                (this.iframeContainer.style.height = l),
                this.iframeContainer.appendChild(
                    (function() {
                        const e = document.createElement("style");
                        return (
                            (e.innerHTML = `\n\t.tradingview-widget-copyright {\n\t\tfont-size: 13px !important;\n\t\tline-height: 32px !important;\n\t\ttext-align: center !important;\n\t\tvertical-align: middle !important;\n\t\tfont-family: 'Trebuchet MS', Arial, sans-serif !important;\n\t\tcolor: ${t["color-gull-gray"]} !important;\n\t}\n\n\t.tradingview-widget-copyright .blue-text {\n\t\tcolor: ${t["color-brand"]} !important;\n\t}\n\n\t.tradingview-widget-copyright a {\n\t\ttext-decoration: none !important;\n\t\tcolor: ${t["color-gull-gray"]} !important;\n\t}\n\n\t.tradingview-widget-copyright a:visited {\n\t\tcolor: ${t["color-gull-gray"]} !important;\n\t}\n\n\t.tradingview-widget-copyright a:hover .blue-text {\n\t\tcolor: ${t["color-brand-hover"]} !important;\n\t}\n\n\t.tradingview-widget-copyright a:active .blue-text {\n\t\tcolor: ${t["color-brand-active"]} !important;\n\t}\n\n\t.tradingview-widget-copyright a:visited .blue-text {\n\t\tcolor: ${t["color-brand"]} !important;\n\t}\n\t`),
                            e
                        );
                    })()
                );
            const p = a && !this.settings.whitelabel,
                m = this.hasCopyright ? `calc(${l} - 32px)` : l;
            (this.settings.utm_source = location.hostname),
            (this.settings.utm_medium = c ? "widget_new" : "widget"),
            (this.settings.utm_campaign = this.widgetUtmName),
            (this.iframe = this._createIframe(m, d, i, r, s.id));
            const u = this.iframeContainer.querySelector(
                ".tradingview-widget-container__widget"
            );
            if (
                (u ?
                    (this.script.parentNode.replaceChild(this.iframe, u),
                        this.script.parentNode.removeChild(this.script)) :
                    g ?
                    (this.iframeContainer.appendChild(this.iframe),
                        this.script.parentNode.removeChild(this.script)) :
                    (this.iframeContainer.appendChild(this.iframe),
                        this.script.parentNode.replaceChild(
                            this.iframeContainer,
                            this.script
                        )),
                    (function(t, e, r) {
                        const i = e.contentWindow;
                        if (!i)
                            return (
                                console.error(
                                    "Cannot listen to the event from the provided iframe, contentWindow is not available"
                                ),
                                () => {}
                            );

                        function n(e) {
                            e.source &&
                                e.source === i &&
                                e.data &&
                                e.data.name &&
                                e.data.name === t &&
                                r(e.data.data);
                        }
                        window.addEventListener("message", n, !1);
                    })(n.Names.ResizeIframe, this.iframe, (t) => {
                        t.width &&
                            ((this.iframe.style.width = t.width + "px"),
                                (this.iframeContainer.style.width = t.width + "px")),
                            (this.iframe.style.height = t.height + "px"),
                            (this.iframeContainer.style.height =
                                t.height + (this.hasCopyright ? 32 : 0) + "px");
                    }),
                    p)
            ) {
                const t = document.createElement("div");
                (t.style.height = h),
                (t.style.lineHeight = h),
                (t.style.width = d),
                (t.style.textAlign = "center"),
                (t.style.verticalAlign = "middle"),
                (t.innerHTML = a.innerHTML),
                this.iframeContainer.appendChild(t);
            }
        }
        _iframeSrcBase(t, e) {
            const r = "https://www.tradingview-widget.com";
            let i = this.useWidgetHostForProduction ? r : "https://s.tradingview.com";
            return (
                this.settings.useWidgetHost ?
                (i = r) :
                "local" === e ?
                (i = `http://${t}`) :
                "staging" === e &&
                (i = -1 !== t.indexOf("beta.tradingview.com") ?
                    "https://betacdn.tradingview.com" :
                    `https://${t}`),
                (i += `/embed-widget/${this.widgetId}/`),
                this.settings.customer &&
                -1 !== this.propertiesToSkipInHash.indexOf("customer") &&
                (i += `${this.settings.customer}/`),
                i
            );
        }
        _isValidSettings() {
            const t = function(t) {
                if (void 0 === t) return !0;
                const e = parseInt(t) + "%" == t + "";
                return parseInt(t) + "" == t + "" || e || "auto" === t;
            };
            return t(this.settings.width) && t(this.settings.height);
        }
        _buildGetQueryString() {
            const t = this.propertiesToAddToGetParams.filter(
                (t) => -1 !== o.indexOf(t)
            );
            return 0 === t.length ?
                "" :
                "?" +
                (function(t) {
                    const e = [];
                    for (const r in t)
                        t.hasOwnProperty(r) &&
                        null != t[r] &&
                        e.push({
                            key: r,
                            pair: encodeURIComponent(r) + "=" + encodeURIComponent(t[r]),
                        });
                    return e
                        .sort((t, e) => (t.key > e.key ? 1 : t.key < e.key ? -1 : 0))
                        .map((t) => t.pair)
                        .join("&");
                })(
                    (function(t, e) {
                        const r = Object.create(Object.getPrototypeOf(t));
                        for (const i of e)
                            Object.prototype.hasOwnProperty.call(t, i) && (r[i] = t[i]);
                        return r;
                    })(this.settings, t)
                );
        }
        _buildHashString(t) {
            const e = {};
            t && (e.frameElementId = t),
                Object.keys(this.settings).forEach((t) => {
                    -1 === this.propertiesToSkipInHash.indexOf(t) &&
                        (e[t] = this.settings[t]);
                });
            return Object.keys(e).length > 0 ?
                "#" + encodeURIComponent(JSON.stringify(e)) :
                "";
        }
        _scriptContentToJSON() {
            const t = this.script.innerHTML.trim();
            try {
                return JSON.parse(t);
            } catch (e) {
                return console.error(`Widget settings parse error: ${e}`), null;
            }
        }
        _createIframe(t, e, r, i, n) {
            const s = document.createElement("iframe");
            n && (s.id = n),
                this.settings.enableScrolling || s.setAttribute("scrolling", "no"),
                s.setAttribute("allowtransparency", !0),
                s.setAttribute("frameborder", 0),
                (s.style.boxSizing = "border-box"),
                (s.style.height = t),
                (s.style.width = e);
            const o =
                this._iframeSrcBase(r, i) +
                this._buildGetQueryString() +
                this._buildHashString(n);
            return s.setAttribute("src", o), s;
        }
    } {
        get widgetId() {
            const t = this.settings;
            return t && "crypto_mkt" === t.screener_type ?
                "crypto-mkt-screener" :
                "screener";
        }
        get useWidgetHostForProduction() {
            return !0;
        }
        get widgetUtmName() {
            const t = this.settings;
            if (t) {
                if ("forex" === t.market) return "forexscreener";
                if ("crypto_mkt" === t.screener_type) return "cryptomktscreener";
                if ("crypto" === t.market) return "cryptoscreener";
            }
            return "screener";
        }
        get propertiesToWorkWith() {
            return [
                "colorTheme",
                "customer",
                "defaultColumn",
                "defaultScreen",
                "displayCurrency",
                "height",
                "largeChartUrl",
                "locale",
                "market",
                "screener_type",
                "showToolbar",
                "isTransparent",
                "useWidgetHost",
                "whitelabel",
                "width",
            ];
        }
        filterRawSettings(t) {
            const e = super.filterRawSettings(t);
            return (
                void 0 !== t.transparency && (e.isTransparent = t.transparency),
                "crypto_mkt" === e.screener_type && (e.market = "crypto"),
                (e.enableScrolling = !0),
                e
            );
        }
    })();
})();