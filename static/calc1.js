var files_path = "https://texno-proekt.ru/calc/",
    no_foto_img = files_path + "images/nofoto-icon.png",
    currency = "руб.";
jQuery(function(b) {
    var p = ["LV", "HIWATCH", "HIKVISION"],
        c = {
            ip: {},
            analog: {},
            hd: {}
        },
        m = 0,
        r = [],
        y = 0,
        z = 0;
    b.alerts.cancelButton = "&nbsp;Отмена&nbsp;";
    b(".head-logo").after('<div class="col-lg-9 col-sm-9 col-xs-9 head-res-price" style="display: none;"><div class="calc-solutions-result">Итого: <span class="total_sum">0</span> руб.</div></div>');
    b(window).scroll(function() {
        var c = b("#wrapper-calc").height();
        b("#wrapper-calc").offset();
        b(window).scrollTop() > b("#wrapper-calc").offset().top && b(window).scrollTop() < b("#wrapper-calc").offset().top + c ? (b(".head-logo").addClass("hide-mobile"), b(".head-cart").addClass("hide-mobile"), b(".head-res-price").addClass("mob-show")) : (b(".head-logo").removeClass("hide-mobile"), b(".head-cart").removeClass("hide-mobile"), b(".head-res-price").removeClass("mob-show"))
    });
    b.getJSON('/calc', {
        format: "json"
    }, function(h) {
        r = h;
        setTimeout(function() {
            b("#fixed-left-div").portamento({
                wrapper: b("#wrapper-calc"),
                gap: 60
            });
            E();
            m = 0;
            K(r);
            c.ip.cam = [];
            c.ip.additional = x(c.ip);
            c.ip.works = w(c.ip);
            c.analog.cam_type = 1;
            c.analog.cam = [];
            c.analog.additional = x(c.analog);
            c.analog.works = w(c.analog);
            if (F("d")) {
                var f = decodeURIComponent(F("d"));
                L(f)
            } else t(c), u();
            b("#invoice_btn").click(function(b) {
                b.preventDefault()
            })
        }, 0);
        b(".add-btn").magnificPopup({
            type: "inline",
            closeBtnInside: !0,
            preloader: !1,
            midClick: !0,
            removalDelay: 0,
            mainClass: "my-mfp-zoom-in",
            callbacks: {
                open: function() {
                    y = 0;
                    z = ""
                }
            }
        });
        b("input[name=installation-radio]").click(function() {
            var f = c.ip;
            1 == m && (f = c.analog);
            2 == m && (f = c.hd);
            1 == parseInt(b(this).val()) ? f.works = w(f) : f.works = [];
            t(c);
            u()
        });
        b("#pdf_btn").click(function() {
            var f = b.extend({}, c.ip);
            1 == m && (f = b.extend({}, c.analog));
            2 == m && (f = b.extend({}, c.hd));
            var d = b("#name_download"),
                e = b("#email_download"),
                g = b("#phone_download"),
                l = !0;
            b([]).add(d).add(e).add(g).removeClass("calc-error");
            if (l = (l = (l = (l = l && A(d, "name_download", 2, 16)) && A(e, "email_download", 6, 80)) && A(g, "phone_download", 4, 30)) && G(e, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
                    "")) f.orderid = c.orderid, f.cam_type = m, f.client_name = d.val(), f.client_phone = g.val(), f.client_email = e.val(), f.manager_id = 0, b("#frm_format").val("pdf"), "invoice_btn_xls" == b(this).attr("id") && b("#frm_format").val("xls"), b("#frm_data").val(JSON.stringify(f)), b("#invoice_frm").submit()
        })
    }).fail(function() {
        jAlert("Произошла ошибка при получении данных с сервера. <br />Повторите попытку позже.",
            "Ошибка")
    });
    var F = function(b) {
            for (var c = window.location.search.substring(1).split("&"), d = 0; d < c.length; d++) {
                var e = c[d].split("=");
                if (e[0] == b) return e[1]
            }
        },
        E = function() {
            c.ip.cam = [];
            c.ip.additional = [];
            c.ip.required = [];
            c.ip.works = [];
            c.ip.cam_total = 0;
            c.ip.cam_discount = 0;
            c.ip.add_total = 0;
            c.ip.add_discount = 0;
            c.ip.req_total = 0;
            c.ip.wrk_total = 0;
            c.ip.wrk_discount = 0;
            c.ip.cam_type = 0;
            c.ip.discount_eq = 0;
            c.ip.discount_wr = 0;
            c.analog.cam = [];
            c.analog.additional = [];
            c.analog.required = [];
            c.analog.works = [];
            c.analog.cam_total = 0;
            c.analog.cam_discount = 0;
            c.analog.add_total = 0;
            c.analog.add_discount = 0;
            c.analog.req_total = 0;
            c.analog.wrk_total = 0;
            c.analog.wrk_discount = 0;
            c.analog.cam_type = 1;
            c.analog.discount_eq = 0;
            c.analog.discount_wr = 0;
            c.hd.cam = [];
            c.hd.additional = [];
            c.hd.required = [];
            c.hd.works = [];
            c.hd.cam_total = 0;
            c.hd.cam_discount = 0;
            c.hd.add_total = 0;
            c.hd.add_discount = 0;
            c.hd.req_total = 0;
            c.hd.wrk_total = 0;
            c.hd.wrk_discount = 0;
            c.hd.cam_type = 2;
            c.hd.discount_eq = 0;
            c.hd.discount_wr = 0;
            c.orderid = 0;
            m = c.state =
                0;
            b("#name").val("");
            b("#phone").val("");
            b("#email").val("");
            b("#comment").val("");
            b("#order_number").html("*");
            b("#order_date").val(b.datepicker.formatDate("dd.mm.yy", new Date));
            b("#form_message").hide();
            b("#files_upload_div").hide();
            b(".file-details").hide()
        };
    b(".type-cctv").click(function() {
        b(".type-cctv").removeClass("selected");
        b(this).addClass("selected");
        "calc_hdd" == b(this).attr("id") ? (b(".list-items").hide(), b("#orderform-container").hide(), b("#calc_hdd_div").show(), b(".calc-bottom").hide(),
            b(".calc-links").hide()) : (b(".list-items").show(), b("#orderform-container").hide(), b("#calc_hdd_div").hide(), b(".calc-bottom").show(), b(".calc-links").show(), m = 0, "cctv_analog" == b(this).attr("id") && (m = 1), "cctv_hd" == b(this).attr("id") && (m = 2), t(c), 0 == m && (b("#cctv_title,#wn-cam-type").html("IP камеры видеонаблюдения"), b("#wn-camera1-sel-content").show(), b("#wn-camera2-sel-content").hide(), b("#wn-camera3-sel-content").hide(),
            b("#wn-cam-ip").click(), b("#wn-camera2-sel-content").hide(), b("#wn-additional1-sel-content").show(), b("#wn-additional2-sel-content").hide(), b("#wn-additional3-sel-content").hide(), b("#wn-add-ip").click(), b("#wn-works1-sel-content").show(), b("#wn-works2-sel-content").hide(), b("#wn-works3-sel-content").hide()), 1 == m && (b("#cctv_title,#wn-cam-type").html("Аналоговые камеры видеонаблюдения"),
            b("#wn-camera2-sel-content").show(), b("#wn-camera1-sel-content").hide(), b("#wn-camera3-sel-content").hide(), b("#wn-cam-analog").click(), b("#wn-additional1-sel-content").hide(), b("#wn-additional2-sel-content").show(), b("#wn-additional3-sel-content").hide(), b("#wn-add-analog").click(), b("#wn-works1-sel-content").hide(), b("#wn-works2-sel-content").show(), b("#wn-works3-sel-content").hide()), 2 == m && (b("#cctv_title,#wn-cam-type").html("HD камеры видеонаблюдения"),
            b("#wn-camera1-sel-content").hide(), b("#wn-camera2-sel-content").hide(), b("#wn-camera3-sel-content").show(), b("#wn-cam-hd").click(), b("#wn-additional1-sel-content").hide(), b("#wn-additional2-sel-content").hide(), b("#wn-additional3-sel-content").show(), b("#wn-add-hd").click(), b("#wn-works1-sel-content").hide(), b("#wn-works2-sel-content").hide(), b("#wn-works3-sel-content").show()), u())
    });
    var q = function(b, c, d) {
            c = "undefined" != typeof c ? c : 2;
            d = "undefined" != typeof d ? d : "";
            b = parseFloat(b);
            var e = Math.pow(10,
                c);
            b = Math.round(b * e) / e;
            c = Number(b).toFixed(c).toString().split(".");
            d = c[0].replace(/(\d{1,3}(?=(\d{3})+(?:\.\d|\b)))/g, "$1" + d);
            return b = c[1] ? d + "." + c[1] : d
        },
        K = function(h) {
            b("#wn-camera1-sel-content").html("");
            b("#wn-camera2-sel-content").html("");
            b("#wn-camera3-sel-content").html("");
            for (n = 0; 3 > n; n++) b.each(h[n], function(e, d) {
                if ("object" === typeof d) {
                    var g = b(".group-cameras-div-tpl").clone();
                    g.removeClass("group-cameras-div-tpl");
                    var c = "group-cam1";
                    2 == h[n].type && (c = "group-cam2");
                    4 == h[n].type && (c = "group-cam3");
                    b(".group-items-title", g).addClass(c);
                    b(".group-items-content", g).addClass(c);
                    g.addClass("group-close");
                    b(".open-close-icon", g).addClass("close");
                    b(".sel_wnd_item_title", g).html(d.name);
                    b.each(d, function(d, c) {
                        if (void 0 != c.name) {
                            var l = b(".wn-camera-line-tpl").clone();
                            l.removeClass("wn-camera-line-tpl");
                            0 == d && l.addClass("first-line");
                            var h = files_path + "images/products/" + c.img;
                            "" == c.img && (h = no_foto_img);
                            b(".camera_sel_img", l).attr("src", h);
                            h = c.sku;
                            "" != h && (h = "Артикул: " +
                                h);
                            b(".item-article", l).html(h);
                            b(".item-name", l).html(c.name).attr("id", "addcam1_" + n + "_" + e + "_" + d);
                            b(".item-description-span", l).html(c.description);
                            b(".item-description-span", l).attr("title", c.description).tooltip();
                            b(".item-price", l).html(q(c.price, 0, " "));
                            b(".wn-add-btn", l).attr("id", "addcam_" + n + "_" + e + "_" + d);
                            l.show();
                            b(".group-items-content", g).append(l)
                        }
                    });
                    b(".open-close-icon span:first", g).removeClass("close").addClass("open");
                    g.show();
                    1 == h[n].type && b("#wn-camera1-sel-content").append(g);
                    2 ==
                        h[n].type && b("#wn-camera2-sel-content").append(g.clone());
                    4 == h[n].type && b("#wn-camera3-sel-content").append(g.clone())
                }
            });
            b("#wn-additional-sel1-content").html("");
            b("#wn-additional-sel2-content").html("");
            b("#wn-additional-sel3-content").html("");
            for (n = 3; 17 > n; n++) {
                var f = h[n].name;
                b.each(h[n], function(e, d) {
                    if ("object" === typeof d) {
                        var g = b(".group-additional-div-tpl").clone();
                        g.removeClass("group-additional-div-tpl");
                        g.addClass("group-close");
                        b(".open-close-icon", g).addClass("close");
                        tmp = d.name;
                        tmp !=
                            f && (tmp = f + ". " + d.name);
                        b(".sel_wnd_item_title", g).html(tmp);
                        b.each(d, function(d, c) {
                            if (void 0 != c.name) {
                                var l = b(".wn-additional-line-tpl").clone();
                                l.removeClass("wn-additional-line-tpl");
                                0 == d && l.addClass("first-line");
                                var h = files_path + "images/products/" + c.img;
                                "" == c.img && (h = no_foto_img);
                                b(".additional_sel_img", l).attr("src", h);
                                h = c.sku;
                                "" != h && (h = "Артикул: " + h);
                                b(".item-article", l).html(h);
                                b(".item-name", l).html(c.name).attr("id", "addadt1_" + n + "_" + e + "_" + d);
                                b(".item-description-span",
                                    l).html(c.description);
                                b(".item-description-span", l).attr("title", c.description).tooltip();
                                b(".item-price", l).html(q(c.price, 0, " "));
                                b(".wn-add-btn", l).attr("id", "addadt_" + n + "_" + e + "_" + d);
                                l.show();
                                b(".group-items-content", g).append(l)
                            }
                        });
                        g.show();
                        0 != (h[n].type & 1) && b("#wn-additional1-sel-content").append(g.clone());
                        0 != (h[n].type & 2) && b("#wn-additional2-sel-content").append(g.clone());
                        0 != (h[n].type & 4) && b("#wn-additional3-sel-content").append(g)
                    }
                })
            }
            f = h[17].name;
            b.each(h[17], function(d, g) {
                if ("object" ===
                    typeof g) {
                    var e = b(".group-works-div-tpl").clone();
                    e.removeClass("group-works-div-tpl");
                    b.each(g, function(g, c) {
                        if (void 0 != c.name) {
                            var l = b(".wn-works-line-tpl").clone();
                            l.removeClass("wn-works-line-tpl");
                            0 == g && l.addClass("first-line");
                            b(".item-name", l).html(c.name).attr("id", "addwrk1_" + n + "_" + d + "_" + g);
                            b(".item-price", l).html(q(c.price, 0, " "));
                            b(".wn-add-btn", l).attr("id", "addwrk_" + n + "_" + d + "_" + g);
                            l.show();
                            e.append(l)
                        }
                    });
                    e.show();
                    0 != (h[n].type & 1) && b("#wn-works1-sel-content").append(e.clone());
                    0 != (h[n].type &
                        2) && b("#wn-works2-sel-content").append(e.clone());
                    0 != (h[n].type & 4) && b("#wn-works3-sel-content").append(e.clone())
                }
            });
            b(".group-items-title").click(function() {
                var d = "";
                b(this).hasClass("group-cam1") && (d = "group-cam1");
                b(this).hasClass("group-cam2") && (d = "group-cam2");
                b(this).hasClass("group-cam3") && (d = "group-cam3");
                b(this).hasClass("group-files") && (d = "group-files");
                b(this).hasClass("group-additional") && (d = "group-additional");
                b(".group-items-content." + d).hide("blind", "fast");
                b(".group-items-content." +
                    d).parent().addClass("group-close");
                b(".group-items-content." + d).find(".open-close-icon").removeClass("open").addClass("close");
                b(this).parent().parent().find(".open-close-icon").removeClass("open").addClass("close");
                b(this).parent().find(".group-items-content").is(":visible") ? (b(this).parent().find(".group-items-content").hide("blind", "fast"), b(this).parent().addClass("group-close"), b(this).find(".open-close-icon").removeClass("open").addClass("close")) : (b(this).parent().find(".group-items-content").show("blind",
                    "fast"), b(this).parent().removeClass("group-close"), b(this).find(".open-close-icon").removeClass("close").addClass("open"))
            });
            var d = function(d, g, l, h) {
                b.magnificPopup.close();
                var e = c.ip;
                1 == m && (e = c.analog);
                2 == m && (e = c.hd);
                switch (d) {
                    case "addcam":
                    case "addcam1":
                        d = e.cam.length;
                        1 == y ? (d = z.split("_"), d = parseInt(d[1]), e.cam[d] = b.extend({}, r[parseInt(g)][parseInt(l)][parseInt(h)])) : e.cam.push(b.extend({}, r[parseInt(g)][parseInt(l)][parseInt(h)]));
                        e.cam[d].cnt = 1;
                        e.cam[d].discount = 0; - 1 != b.inArray(e.cam[d].manufacturer.toUpperCase(),
                            p) && (e.cam[d].discount = v(b.inArray(e.cam[d].manufacturer.toUpperCase())));
                        e.additional = x(e);
                        e.works = w(e);
                        if (void 0 != e.cam[d].binding) {
                            var f = [];
                            b.each(e.cam[d].binding, function(d, g) {
                                var c = 0;
                                for (k = 0; k < e.works.length; k++)
                                    if (e.works[k].id == parseInt(g)) {
                                        e.works[k].cnt++;
                                        c = 1;
                                        break
                                    } 0 == c && b.each(r[17], function(d, e) {
                                    "object" === typeof e && b.each(e, function(d, e) {
                                        "object" === typeof e && e.id == parseInt(g) && (f.push(b.extend({}, e)), f[f.length - 1].cnt = 1, f[f.length - 1].discount = 0, -1 != b.inArray(f[f.length - 1].manufacturer.toUpperCase(),
                                            p) && (f[f.length - 1].discount = v(b.inArray(f[f.length - 1].manufacturer.toUpperCase(), p))))
                                    })
                                })
                            });
                            b.each(f, function(d, g) {
                                e.works.push(b.extend({}, g))
                            })
                        }
                        break;
                    case "addadt":
                    case "addadt1":
                        d = e.additional.length;
                        1 == y ? (d = z.split("_"), d = parseInt(d[1]), e.additional[d] = b.extend({}, r[parseInt(g)][parseInt(l)][parseInt(h)])) : e.additional.push(b.extend({}, r[parseInt(g)][parseInt(l)][parseInt(h)]));
                        e.additional[d].cnt = 1;
                        e.additional[d].discount = 0; - 1 != b.inArray(e.additional[d].manufacturer.toUpperCase(), p) && (e.additional[d].discount =
                            v(b.inArray(e.additional[d].manufacturer.toUpperCase(), p)));
                        void 0 != e.additional[d].binding && (f = [], b.each(e.additional[d].binding, function(d, g) {
                            var c = 0;
                            for (k = 0; k < e.works.length; k++)
                                if (e.works[k].id == parseInt(g)) {
                                    e.works[k].cnt++;
                                    c = 1;
                                    break
                                } 0 == c && b.each(r[17], function(d, e) {
                                "object" === typeof e && b.each(e, function(d, e) {
                                    "object" === typeof e && e.id == parseInt(g) && (f.push(b.extend({}, e)), f[f.length - 1].cnt = 1, f[f.length - 1].discount = 0, -1 != b.inArray(f[f.length - 1].manufacturer.toUpperCase(), p) && (f[f.length - 1].discount =
                                        v(b.inArray(f[f.length - 1].manufacturer.toUpperCase(), p))))
                                })
                            })
                        }), b.each(f, function(d, g) {
                            e.works.push(b.extend({}, g))
                        }));
                        break;
                    case "addwrk":
                    case "addwrk1":
                        d = e.works.length, 1 == y ? (d = z.split("_"), d = parseInt(d[1]), e.works[d] = b.extend({}, r[parseInt(g)][parseInt(l)][parseInt(h)])) : e.works.push(b.extend({}, r[parseInt(g)][parseInt(l)][parseInt(h)])), e.works[d].cnt = 1, e.works[d].discount = 0
                }
                t(c);
                u()
            };
            b(".wn-add-btn, .item-name").click(function() {
                var e = b(this).attr("id").split("_");
                d(e[0], e[1], e[2], e[3]);
                y = 0;
                z = ""
            });
            b("#add_btn").click(function() {
                var b = c.ip;
                1 == m && (b = c.analog);
                2 == m && (b = c.hd);
                if (0 != b.additional.length || 0 != b.works.length) b = c.ip, 1 == m && (b = c.analog), 2 == m && (b = c.hd);
                b.additional = x(b);
                b.works = w(b);
                t(c);
                u()
            });
            b("#clear_btn").click(function() {
                var b = c.ip;
                1 == m && (b = c.analog);
                2 == m && (b = c.hd);
                b.works = [];
                t(c);
                u()
            })
        },
        x = function(c) {
            a = [];
            for (var f = 0, d = 0; d < c.cam.length; d++) c.cam[d].type ? c.cam[d].type == 1 << c.cam_type && (f += c.cam[d].cnt) : (c.cam[d].type = 1 << c.cam_type, f += c.cam[d].cnt);
            if (0 != f) {
                d = [3 + c.cam_type, 6,
                    14, 15
                ];
                for (var e = 0; e < d.length; e++) {
                    var g = {},
                        l = 0;
                    0 != (r[d[e]].type & 1 << c.cam_type) && (b.each(r[d[e]], function(d, e) {
                        "object" === typeof e && 0 == l && b.each(e, function(d, e) {
                            "object" === typeof e && 0 == l && e.hasOwnProperty("fav") && (e.streams >= f ? (a.push(b.extend({}, e)), a[a.length - 1].cnt = 1, a[a.length - 1].discount = 0, -1 != b.inArray(a[a.length - 1].manufacturer.toUpperCase(), p) && (a[a.length - 1].discount = v(b.inArray(a[a.length - 1].manufacturer.toUpperCase(), p))), l = 1) : g = e)
                        })
                    }), 0 == l && (a.push(b.extend({}, g)), a[a.length - 1].cnt = Math.ceil(f /
                        g.streams), a[a.length - 1].discount = 0, -1 != b.inArray(a[a.length - 1].manufacturer.toUpperCase(), p) && (a[a.length - 1].discount = v(b.inArray(a[a.length - 1].manufacturer.toUpperCase(), p)))))
                }
                b.each(r[16], function(d, e) {
                    "object" === typeof e && b.each(e, function(d, e) {
                        "object" !== typeof e || !e.hasOwnProperty("fav") || e.hasOwnProperty("cam_type") && 0 == (e.cam_type & 1 << c.cam_type) || (a.push(b.extend({}, e)), e.hasOwnProperty("cnt") ? a[a.length - 1].cnt = e.cnt * f : a[a.length - 1].cnt = f, a[a.length - 1].discount = 0, -1 != b.inArray(a[a.length -
                            1].manufacturer.toUpperCase(), p) && (a[a.length - 1].discount = v(b.inArray(a[a.length - 1].manufacturer.toUpperCase(), p))))
                    })
                })
            }
            for (e = 0; 3 > e; e++) {
                f = 0;
                var h = e;
                if (h != c.cam_type) {
                    for (d = 0; d < c.cam.length; d++) c.cam[d].type ? c.cam[d].type == 1 << h && (f += c.cam[d].cnt) : (c.cam[d].type = 1 << h, f += c.cam[d].cnt);
                    if (0 != f) {
                        d = [3 + h, 6, 14, 15];
                        for (e = 0; e < d.length; e++) g = {}, l = 0, 0 != (r[d[e]].type & 1 << h) && (b.each(r[d[e]], function(d, e) {
                            "object" === typeof e && 0 == l && b.each(e, function(d, e) {
                                "object" === typeof e && 0 == l && e.hasOwnProperty("fav") && (e.streams >=
                                    f ? (a.push(b.extend({}, e)), a[a.length - 1].cnt = 1, a[a.length - 1].discount = 0, -1 != b.inArray(a[a.length - 1].manufacturer.toUpperCase(), p) && (a[a.length - 1].discount = v(b.inArray(a[a.length - 1].manufacturer.toUpperCase(), p))), l = 1) : g = e)
                            })
                        }), 0 == l && (a.push(b.extend({}, g)), a[a.length - 1].cnt = Math.ceil(f / g.streams), a[a.length - 1].discount = 0, -1 != b.inArray(a[a.length - 1].manufacturer.toUpperCase(), p) && (a[a.length - 1].discount = v(b.inArray(a[a.length - 1].manufacturer.toUpperCase(), p)))));
                        b.each(r[16], function(d, e) {
                            "object" ===
                            typeof e && b.each(e, function(d, e) {
                                "object" !== typeof e || !e.hasOwnProperty("fav") || e.hasOwnProperty("cam_type") && 0 == (e.cam_type & 1 << h) || (a.push(b.extend({}, e)), e.hasOwnProperty("cnt") ? a[a.length - 1].cnt = e.cnt * f : a[a.length - 1].cnt = f, a[a.length - 1].discount = 0, -1 != b.inArray(a[a.length - 1].manufacturer.toUpperCase(), p) && (a[a.length - 1].discount = v(b.inArray(a[a.length - 1].manufacturer.toUpperCase(), p))))
                            })
                        })
                    }
                }
            }
            return a
        },
        H = function(c) {
            var f = {};
            b.each(c.cam, function(d, e) {
                void 0 != e.binding && b.each(e.binding, function(b,
                    d) {
                    void 0 == f[parseInt(d)] && (f[parseInt(d)] = 0);
                    f[parseInt(d)] += parseInt(e.cnt)
                })
            });
            b.each(c.additional, function(d, e) {
                void 0 != e.binding && b.each(e.binding, function(b, d) {
                    void 0 == f[parseInt(d)] && (f[parseInt(d)] = 0);
                    f[parseInt(d)] += parseInt(e.cnt)
                })
            });
            b.each(c.works, function(d, e) {
                b.each(f, function(g, c) {
                    parseInt(g) == e.id && (cnt = c, e.cnt = cnt, b("#wrk_" + d).val(e.cnt))
                })
            })
        },
        w = function(c) {
            a = [];
            var f = {};
            b.each(c.cam, function(d, e) {
                void 0 != e.binding && b.each(e.binding, function(b, d) {
                    void 0 == f[parseInt(d)] && (f[parseInt(d)] =
                        0);
                    f[parseInt(d)] += e.cnt
                })
            });
            b.each(c.additional, function(d, e) {
                void 0 != e.binding && b.each(e.binding, function(b, d) {
                    void 0 == f[parseInt(d)] && (f[parseInt(d)] = 0);
                    f[parseInt(d)] += e.cnt
                })
            });
            b.each(r[17], function(d, e) {
                "object" === typeof e && b.each(e, function(d, e) {
                    if ("object" === typeof e) {
                        var g = 0;
                        b.each(f, function(b, d) {
                            parseInt(b) == e.id && (g = d)
                        });
                        0 < g && (a.push(b.extend({}, e)), a[a.length - 1].cnt = g, a[a.length - 1].discount = 0)
                    }
                })
            });
            b.each(r[17], function(d, e) {
                "object" === typeof e && b.each(e, function(d, e) {
                    "object" !== typeof e ||
                        !e.hasOwnProperty("fav") || e.hasOwnProperty("cam_type") && 0 == (e.cam_type & 1 << c.cam_type) || 0 == a.length || (a.push(b.extend({}, e)), e.hasOwnProperty("cnt") ? a[a.length - 1].cnt = e.cnt * cam_cnt : a[a.length - 1].cnt = 1, a[a.length - 1].discount = 0, -1 != b.inArray(a[a.length - 1].manufacturer.toUpperCase(), p) && (a[a.length - 1].discount = v(b.inArray(a[a.length - 1].manufacturer.toUpperCase(), p))))
                })
            });
            return a
        },
        t = function(h) {
            b("#list-cameras").html("");
            var f = h.ip;
            1 == m && (f = h.analog);
            2 == m && (f = h.hd);
            b.each(f.cam, function(d, e) {
                var g =
                    b(".item-type-camera-tpl").clone();
                g.removeClass("item-type-camera-tpl");
                g.attr("id", "cam_item_" + d);
                0 == d && g.addClass("first-type-line");
                var c = e.sku;
                "" != c ? c = "Артикул: " + c : b(".item-article", g).hide();
                b(".item-article", g).html(c);
                b(".item-name", g).html(e.name);
                b(".sel-cam-link", g).attr("id", "tcam_" + d);
                c = files_path + "images/products/" + e.img;
                "" == e.img && (c = no_foto_img, b(".item-img", g).hide(), b(".ci-bottom", g).addClass("no-padding-left"), g.addClass("without-photo"));
                b(".item-img",
                    g).attr("src", c);
                b(".description-text", g).html("<span>" + e.description + "</span>");
                "" == e.description && b(".more-span", g).hide();
                c = e.manufacturer;
                "" != c ? c = "Производитель: <span>" + c + "</span>" : b(".item-brend", g).hide();
                b(".item-brend", g).html(c);
                b(".item_price_span", g).val(e.price).attr("id", "camprice_" + d).attr("disabled", "true");
                c = e.youtube;
                "" == c && (b(".camera-video-sample", g).hide(), c = "#");
                b(".popup-youtube", g).attr("href", c);
                b(".calc-input",
                    g).attr("id", "cam_" + d);
                b(".calc-input", g).attr("value", e.cnt);
                b(".calc-input", g).addClass("spinner-input");
                b(".item-total-price", g).attr("id", "sumcam_" + d);
                b(".item-total-price", g).html(q(e.price, 0, " "));
                b(".item-total-price", g).html(e.total);
                b(".btn-del-line", g).attr("id", "delcam_" + d);
                b("#list-cameras").append(g);
                g.show();
                c = 560;
                b(".camera-video-sample", g).is(":visible") && (c = 440);
                b(".description-text span", g).width() < c && b(".more-span", g).hide()
            });
            0 == f.cam.length && b("#list-cameras").html('<div class="no_camera"><div class="nc-desc" style="padding:22px 0 22px 0;">Выберите камеры и их количество</div><div class="nc-desc " style="color:#ff1037; font-size:16px; padding:5px 0;">Расчет будет сформирован автоматически</div><div class="no-cam-arrow"></div></div>');
            b("#list-required-equipment").html("");
            b.each(f.required, function(d, e) {
                var c = b(".item-type-required-equipment-tpl").clone();
                c.removeClass("item-type-required-equipment-tpl");
                c.attr("id", "required_item_" + d);
                0 == d && c.addClass("first-type-line");
                var f = e.sku;
                "" != f ? f = "Артикул: " + f : b(".item-article", c).hide();
                b(".item-article", c).html(f);
                b(".item-name", c).html(e.name);
                f = files_path + "images/products/" + e.img;
                "" == e.img && (f = no_foto_img, b(".item-img", c).hide(), b(".ci-bottom",
                    c).addClass("no-padding-left"), c.addClass("without-photo"));
                b(".item-img", c).attr("src", f);
                b(".description-text", c).html("<span>" + e.description + "</span>");
                "" == e.description && b(".more-span", c).hide();
                f = e.manufacturer;
                "" != f ? f = "Производитель: <span>" + f + "</span>" : b(".item-brend", c).hide();
                b(".item-brend", c).html(f);
                b(".item_price_span", c).val(e.price).attr("id", "reqprice_" + d).attr("disabled", "true");
                f = e.youtube;
                "" == f && (f = "#", b(".camera-video-sample",
                    c).hide());
                b(".popup-youtube", c).attr("href", f);
                b(".calc-input", c).attr("id", "req_" + d);
                b(".calc-input", c).addClass("spinner-input");
                b(".calc-input", c).attr("value", e.cnt);
                b(".item-total-price", c).attr("id", "sumreq_" + d);
                b(".item-total-price", c).html(q(e.price, 0, " "));
                b(".item-total-price", c).html(e.total);
                b(".btn-del-line", c).attr("id", "delreq_" + d);
                b("#list-required-equipment").append(c);
                c.show();
                f = 560;
                b(".camera-video-sample", c).is(":visible") && (f = 440);
                b(".description-text span", c).width() < f && b(".more-span",
                    c).hide()
            });
            b("#list-optional-equipment").html("");
            b.each(f.additional, function(d, e) {
                var c = b(".item-type-optional-equipment-tpl").clone();
                c.removeClass("item-type-optional-equipment-tpl");
                c.attr("id", "additional_item_" + d);
                0 == d && c.addClass("first-type-line");
                var f = e.sku;
                "" != f ? f = "Артикул: " + f : b(".item-article", c).hide();
                b(".item-article", c).html(f);
                b(".item-name", c).html(e.name);
                b(".sel-add-link", c).attr("id", "tadd_" + d);
                f = files_path + "images/products/" + e.img;
                "" == e.img &&
                    (f = no_foto_img, b(".item-img", c).hide(), b(".ci-bottom", c).addClass("no-padding-left"), c.addClass("without-photo"));
                b(".item-img", c).attr("src", f);
                b(".description-text", c).html("<span>" + e.description + "</span>");
                "" == e.description && b(".more-span", c).hide();
                f = e.manufacturer;
                "" != f ? f = "Производитель: <span>" + f + "</span>" : b(".item-brend", c).hide();
                b(".item-brend", c).html(f);
                b(".item_price_span", c).val(e.price).attr("id", "addprice_" + d).attr("disabled",
                    "true");
                f = e.youtube;
                "" == f && (f = "#", b(".camera-video-sample", c).hide());
                b(".popup-youtube", c).attr("href", f);
                b(".calc-input", c).attr("id", "add_" + d);
                b(".calc-input", c).addClass("spinner-input");
                b(".calc-input", c).attr("value", e.cnt);
                b(".item-total-price", c).attr("id", "sumadd_" + d);
                b(".item-total-price", c).html(q(e.price, 0, " "));
                b(".item-total-price", c).html(e.total);
                b(".move-up-btn", c).attr("id", "moveup_" + d);
                b(".move-down-btn", c).attr("id", "movedown_" + d);
                b(".btn-del-line", c).attr("id", "deladd_" + d);
                b("#list-optional-equipment").append(c);
                c.show();
                f = 560;
                b(".camera-video-sample", c).is(":visible") && (f = 440);
                b(".description-text span", c).width() < f && b(".more-span", c).hide()
            });
            b("#list-works").html("");
            b.each(f.works, function(d, c) {
                var e = b(".item-installation-work-line-tpl").clone();
                e.removeClass("item-installation-work-line-tpl");
                e.attr("id", "works_item_" + d);
                0 == d && e.addClass("first-type-line");
                b(".name-installation-work", e).html(c.name);
                b(".sel-wrk-link", e).attr("id", "twrk_" + d);
                b(".item_price_span", e).val(c.price).attr("id", "wrkprice_" +
                    d).attr("disabled", "true");
                b(".calc-input", e).attr("id", "wrk_" + d);
                b(".calc-input", e).addClass("spinner-input");
                b(".calc-input", e).attr("value", c.cnt);
                b(".item-total-price", e).attr("id", "sumwrk_" + d);
                b(".item-total-price", e).html(q(c.price, 0, " "));
                b(".item-total-price", e).html(c.total);
                b(".btn-del-line", e).attr("id", "delwrk_" + d);
                b("#list-works").append(e);
                e.show()
            });
            b(".spinner-input").spinner({
                mouseWheel: !1,
                step: 1,
                min: 1,
                change: I,
                stop: I,
                icons: {
                    down: "custom-down-icon",
                    up: "custom-up-icon"
                }
            });
            b(".popup-youtube, .popup-vimeo, .popup-gmaps").magnificPopup({
                disableOn: 700,
                type: "iframe",
                mainClass: "mfp-fade",
                removalDelay: 0,
                preloader: !1,
                fixedContentPos: !1
            });
            b(".sel-cam-link").click(function() {
                y = 1;
                z = b(this).attr("id");
                b.magnificPopup.open({
                    items: {
                        src: b("#wn-sel-cameras"),
                        type: "inline"
                    },
                    closeBtnInside: !0,
                    preloader: !1,
                    midClick: !0,
                    removalDelay: 0,
                    mainClass: "my-mfp-zoom-in"
                });
                return !1
            });
            b(".sel-add-link").click(function() {
                y = 1;
                z = b(this).attr("id");
                b.magnificPopup.open({
                    items: {
                        src: b("#wn-sel-additional"),
                        type: "inline"
                    },
                    closeBtnInside: !0,
                    preloader: !1,
                    midClick: !0,
                    removalDelay: 0,
                    mainClass: "my-mfp-zoom-in"
                });
                return !1
            });
            b(".btn-del-line").click(function() {
                var d = b(this).attr("id").split("_");
                switch (d[0]) {
                    case "delcam":
                        if (void 0 != f.cam[parseInt(d[1])].binding) {
                            var e = [];
                            b.each(f.cam[parseInt(d[1])].binding, function(b, c) {
                                for (k = 0; k < f.works.length; k++)
                                    if (f.works[k].id == parseInt(c)) {
                                        f.works[k].cnt <= f.cam[parseInt(d[1])].cnt ? f.works.splice(k, 1) : f.works[k].cnt -= f.cam[parseInt(d[1])].cnt;
                                        break
                                    }
                            });
                            b.each(e, function(c, d) {
                                h.works.push(b.extend({}, d))
                            })
                        }
                        f.cam.splice(parseInt(d[1]), 1);
                        b("#cam_item_" +
                            d[1]).fadeOut("fast", function() {
                            t(c);
                            u()
                        });
                        break;
                    case "delreq":
                        f.required.splice(parseInt(d[1]), 1);
                        b("#required_item_" + d[1]).fadeOut("fast", function() {
                            t(c);
                            u()
                        });
                        break;
                    case "deladd":
                        void 0 != f.additional[parseInt(d[1])].binding && (e = [], b.each(f.additional[parseInt(d[1])].binding, function(b, c) {
                            for (k = 0; k < f.works.length; k++)
                                if (f.works[k].id == parseInt(c)) {
                                    f.works[k].cnt <= f.additional[parseInt(d[1])].cnt ? f.works.splice(k, 1) : f.works[k].cnt -= f.additional[parseInt(d[1])].cnt;
                                    break
                                }
                        }), b.each(e, function(c, d) {
                            h.works.push(b.extend({},
                                d))
                        }));
                        f.additional.splice(parseInt(d[1]), 1);
                        b("#additional_item_" + d[1]).fadeOut("fast", function() {
                            t(c);
                            u()
                        });
                        break;
                    case "delwrk":
                        f.works.splice(parseInt(d[1]), 1), b("#works_item_" + d[1]).fadeOut("fast", function() {
                            t(c);
                            u()
                        })
                }
            });
            b(".move-up-btn").click(function() {
                var d = c.ip;
                1 == m && (d = c.analog);
                2 == m && (d = c.hd);
                var e = b(this).attr("id").split("_");
                e = parseInt(e[1]);
                if (0 != e && !(2 > d.additional.length)) {
                    var f = d.additional[e];
                    d.additional[e] = d.additional[e - 1];
                    d.additional[e - 1] = f;
                    t(c);
                    u()
                }
            });
            b(".move-down-btn").click(function() {
                var d =
                    c.ip;
                1 == m && (d = c.analog);
                2 == m && (d = c.hd);
                var e = b(this).attr("id").split("_");
                e = parseInt(e[1]);
                if (!(e >= d.additional.length - 1 || 2 > d.additional.length)) {
                    var f = d.additional[e];
                    d.additional[e] = d.additional[e + 1];
                    d.additional[e + 1] = f;
                    t(c);
                    u()
                }
            });
            b(".spinner-down").click(function() {
                var c = parseFloat(b(this).parent().find(".calc-input").val());
                C(c) || (c = 2);
                1 < c && b(this).parent().find(".calc-input").val(--c);
                B(b(this).parent().find(".calc-input").attr("id"), c)
            });
            b(".spinner-up").click(function() {
                var c = parseFloat(b(this).parent().find(".calc-input").val());
                C(c) || (c = 0);
                b(this).parent().find(".calc-input").val(++c);
                B(b(this).parent().find(".calc-input").attr("id"), c)
            });
            b(".calc-input").change(function() {
                B(b(this).attr("id"), b(this).val())
            });
            b(".calc-input").keyup(function() {
                B(b(this).attr("id"), b(this).val())
            });
            b(".more-span").click(function() {
                b(this).hasClass("turn-span") ? (b(this).parent().find(".description-text").removeClass("dst-full", 300), b(this).removeClass("turn-span"), b(this).html("Подробнее")) : (b(this).parent().find(".description-text").addClass("dst-full",
                    300), b(this).addClass("turn-span"), b(this).html("Свернуть"))
            })
        },
        I = function() {
            var c = parseFloat(b(this).parent().find(".calc-input").val());
            C(c) || (c = 0);
            b(this).parent().find(".calc-input").val(c);
            B(b(this).parent().find(".calc-input").attr("id"), c)
        },
        C = function(b) {
            return isNaN(b) || !jQuery.isNumeric(b) || 0 >= b ? !1 : !0
        },
        B = function(h, f) {
            var d = c.ip;
            1 == m && (d = c.analog);
            2 == m && (d = c.hd);
            var e = h.split("_");
            b("#" + h).removeClass("input-error");
            if (C(f)) {
                switch (e[0]) {
                    case "cam":
                        d.cam[parseInt(e[1])].cnt =
                            parseInt(f);
                        d.additional = x(d);
                        1 == parseInt(b("input[name=installation-radio]:checked").val()) && (d.works = w(d));
                        t(c);
                        break;
                    case "req":
                        d.required[parseInt(e[1])].cnt = parseInt(f);
                        H(d);
                        break;
                    case "add":
                        d.additional[parseInt(e[1])].cnt = parseInt(f);
                        H(d);
                        break;
                    case "wrk":
                        d.works[parseInt(e[1])].cnt = parseInt(f)
                }
                u()
            } else b("#" + h).addClass("input-error")
        },
        u = function() {
            M();
            for (var c = 0; 3 > c; c++) c != m && J(c);
            J(m);
            N();
            b(".loading").hide()
        },
        J = function(h) {
            var f = 0,
                d = 0,
                e = 0,
                g = c.ip;
            1 == h && (g = c.analog);
            2 == h && (g = c.hd);
            b(".spinner-input").spinner("enable");
            b(".sel-wrk-link").removeClass("disabled");
            b.each(g.cam, function(c, f) {
                f.sum = (100 - f.discount) / 100 * f.price * f.cnt;
                e += f.cnt * f.price - f.sum;
                b("#sumcam_" + c).html(q(f.sum, 0, " "));
                d += f.sum
            });
            b(".total_cam").html(q(d, 0, " "));
            b(".camera-discount").hide();
            0 != e && (b(".camera-discount").show(), b("#camera-discount-id").html(q(e, 0, " ")));
            g.cam_discount = e;
            f += d;
            g.cam_total = d;
            e = d = 0;
            b.each(g.required, function(c, e) {
                e.sum = e.cnt * e.price;
                b("#sumreq_" + c).html(q(e.sum, 0, " "));
                d += e.sum
            });
            b(".total_req").html(q(d, 0, " "));
            f +=
                d;
            g.req_total = d;
            e = d = 0;
            b.each(g.additional, function(c, f) {
                f.sum = (100 - f.discount) / 100 * f.price * f.cnt;
                e += f.cnt * f.price - f.sum;
                b("#sumadd_" + c).html(q(f.sum, 0, " "));
                d += f.sum
            });
            b(".total_add").html(q(d, 0, " "));
            b(".equipment-discount").hide();
            0 != e && (b(".equipment-discount").show(), b("#equipment-discount-id").html(q(e, 0, " ")));
            f += d;
            g.add_total = d;
            g.add_discount = e;
            var l = e = d = 0,
                p = 0;
            b.each(g.works, function(c, f) {
                isNaN(f.rate) ? (f.sum = (100 - f.discount) / 100 * f.price * f.cnt, e += f.cnt * f.price - f.sum) : (l = f.rate, p = c, f.sum = 0);
                b("#sumwrk_" + c).html(q(f.sum, 0, " "));
                d += f.sum
            });
            0 != l && (g.works[p].sum = l / 100 * d, g.works[p].price = l / 100 * d, d += g.works[p].sum, b("#sumwrk_" + p).html(q(g.works[p].sum, 0, " ")), b("#wrkprice_" + p).val(q(g.works[p].sum, 0, "")).attr("readonly", ""), b("#wrk_" + p).spinner("disable"), b("#twrk_" + p).addClass("disabled"));
            b(".total_works").html(q(d, 0, " "));
            b(".installation-discount").hide();
            0 != e && (b(".installation-discount").show(), b("#installation-discount-id").html(q(e, 0, " ")));
            f += d;
            g.wrk_total = d;
            g.wrk_discount = e;
            g.total =
                f;
            0 < f ? b("#send_order_bottom").show() : b("#send_order_bottom").hide();
            h == m && (b(".total_sum").html(q(f, 0, " ")), b("#camera-sum-span").html(q(g.cam_total, 0, " ")), b("#equipment-sum-span").html(q(g.add_total, 0, " ")), b("#installation-sum-span").html(q(g.wrk_total, 0, " ")), 0 == g.cam.length ? b("#total-camera-amount").parent().hide() : b("#total-camera-amount").parent().show(), b("#total-camera-amount").html(g.cam.length + " " + D(g.cam.length, ["наименование",
                    "наименования", "наименований"
                ])), 0 == g.additional.length ? b("#total-equipment-amount").parent().hide() : b("#total-equipment-amount").parent().show(), b("#total-equipment-amount").html(g.additional.length + " " + D(g.additional.length, ["наименование", "наименования", "наименований"])),
                0 == g.works.length ? b("#total-installation-amount").parent().hide() : b("#total-installation-amount").parent().show(), b("#total-installation-amount").html(g.works.length + " " + D(g.works.length, ["наименование", "наименования", "наименований"])), h = g.cam.length + g.additional.length + g.works.length, 0 == h ? b(".result-d2").hide() : b(".result-d2").show(),
                b("#total-sumitem-span").html(h + " " + D(h, ["наименование", "наименования", "наименований"])), b(".total_sum").html(q(f, 0, " ")), b(".equipment-sum-span").html(q(g.cam_total + g.add_total, 0, " ")), b(".installation-sum-span").html(q(g.wrk_total, 0, " ")), b(".cpan-discount-num").html(r[19][m].rate + "%"), b("#inst_full_price").html(q(g.wrk_total +
                    g.wrk_discount, 0, " ") + " " + currency))
        },
        D = function(b, c) {
            var d = b % 100,
                e = b % 10;
            return 10 < d && 20 > d ? c[2] : 1 < e && 5 > e ? c[1] : 1 == e ? c[0] : c[2]
        },
        A = function(b, c, d, e) {
            return b.val().length > e || b.val().length < d ? (b.addClass("calc-error"), !1) : !0
        },
        G = function(b, c, d) {
            if (c.test(b.val())) return !0;
            b.addClass("calc-error");
            return !1
        },
        v = function(b) {
            return r[19][3 + b].rate
        },
        M = function() {
            var h = c.ip;
            1 == m && (h = c.analog);
            2 == m && (h = c.hd);
            h.discount_eq = v(m);
            h.discount_wr = r[19][m].rate;
            b.each(h.cam, function(c, d) {
                d.discount = 0; - 1 != b.inArray(d.manufacturer.toUpperCase(),
                    p) && (d.discount = v(b.inArray(d.manufacturer.toUpperCase(), p)))
            });
            b.each(h.additional, function(c, d) {
                d.discount = 0; - 1 != b.inArray(d.manufacturer.toUpperCase(), p) && (d.discount = v(b.inArray(d.manufacturer.toUpperCase(), p)))
            });
            b.each(h.works, function(b, c) {
                c.discount = r[19][m].rate
            })
        },
        O = function(c, f, d, e, g) {
            g.manager = r[18][0];
            b("#sel_order_msg").hide();
            b("#form-loading").show();
            b("#order-btn").hide();
            b.post('/calc', {
                data: JSON.stringify(g),
                name: c,
                phone: f,
                email: d,
                comment: e
            }, function(c) {
                c.success ?
                    (b("#form_popup_order").hide(), b("#form_message").attr("class", "alert alert-success"), b("#form_message").show(), b("#order-form").hide()) : (b("#form_message").attr("class", "alert alert-error"), b("#form_message").show());
                b("#form_message").html(c.message);
                b("#form_message").show();
                b("#form-loading").hide();
                b("#order-btn").show();
                return c
            }, "json").error(function() {
                b("#calc_messagebox").hide();
                b("#calc_message").html("Произошла ошибка при получении данных с сервера. Повторите попытку позже.");
                b("#calc_messagebox").fadeIn("slow");
                b("#form-loading").hide();
                b("#order-btn").show()
            });
            return !1
        };
    b("#order_btn").click(function() {
        var h = b("#name_input"),
            f = b("#email_input"),
            d = b("#phone_input"),
            e = !0;
        b([]).add(h).add(f).add(d).removeClass("calc-error");
        (e = (e = (e = (e = e && A(h, "name", 2, 16)) && A(f, "email", 6, 80)) && A(d, "phone", 4, 30)) && G(f, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i,
            "")) && O(h.val(), d.val(), f.val(), b("#comment").val(), c);
        return !1
    });
    b(".bucket-checkout").click(function() {
        b("#form_popup_order").show();
        b("#form_message").html("");
        b("#form_message").hide();
        b("#form_message").attr("class", "")
    });
    var N = function() {
            var h = {
                i: [],
                a: []
            };
            b.each(c.ip.cam, function(b, c) {
                h.i.push({
                    id: c.id - 1,
                    gid: c.gid,
                    t: c.type - 1,
                    c: c.cnt
                })
            });
            b.each(c.analog.cam, function(b, c) {
                h.a.push({
                    id: c.id - 1,
                    gid: c.gid,
                    t: c.type - 1,
                    c: c.cnt
                })
            });
            h.w = b("input[name=installation-radio]").val();
            JSON.stringify(h)
        },
        L = function(h) {
            h =
                b.parseJSON(b.base64.decode(h));
            void 0 != h && (E(), m = 0, void 0 != h.t && (m = parseInt(h.t)), void 0 != h.i && (c.ip.cam = [], b.each(h.i, function(f, d) {
                c.ip.cam.push(b.extend({}, r[d.t][d.gid][d.id]));
                c.ip.cam[c.ip.cam.length - 1].cnt = parseInt(d.c);
                c.ip.cam[c.ip.cam.length - 1].discount = 0
            }), c.ip.additional = [], c.ip.works = [], c.ip.additional = x(c.ip), 1 == parseInt(h.w) ? c.ip.works = w(c.ip) : b("#installation-radio-id1").attr("checked", "checked")), void 0 != h.a && (c.analog.cam_type = 1, c.analog.cam = [], b.each(h.a, function(f, d) {
                c.analog.cam.push(b.extend({},
                    r[d.t][d.gid][d.id]));
                c.analog.cam[c.analog.cam.length - 1].cnt = d.c;
                c.analog.cam[c.analog.cam.length - 1].discount = 0
            }), c.analog.additional = [], c.analog.works = [], c.analog.additional = x(c.analog), 1 == parseInt(h.w) ? c.analog.works = w(c.analog) : b("#installation-radio-id1").attr("checked", "checked")), void 0 != h.h && (c.hd.cam_type = 2, c.hd.cam = [], b.each(h.h, function(f, d) {
                c.hd.cam.push(b.extend({}, r[d.t][d.gid][d.id]));
                c.hd.cam[c.hd.cam.length - 1].cnt = d.c;
                c.hd.cam[c.hd.cam.length - 1].discount = 0
            }), c.hd.additional = [], c.hd.works = [], c.hd.additional = x(c.hd), 1 == parseInt(h.w) ? c.hd.works = w(c.hd) : b("#installation-radio-id1").attr("checked", "checked")), b(".type-cctv").removeClass("active"), 0 == m && b("#cctv_ip").click(), 1 == m && b("#cctv_analog").click(), 2 == m && b("#cctv_hd").click(), t(c), u())
        }
});